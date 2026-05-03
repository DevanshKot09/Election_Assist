/**
 * @fileoverview Google Cloud Platform services integration
 * @module google-cloud-services
 * @description Comprehensive integration with Google Cloud services including
 * Cloud Functions, BigQuery, Cloud Storage, Natural Language API, and Cloud Logging
 * @author Indian Election Assistant Team
 * @version 2.0.0
 */

'use strict';

import { GCP_CONFIG, FEATURE_FLAGS, SECURITY_CONFIG } from './config.js';
import { sanitizeInput, generateId, validateAgainstSQLInjection, validateLength, validateUrl } from './utils.js';

/**
 * Google Cloud Services Manager
 * @class
 */
class GoogleCloudServices {
  /**
   * Creates an instance of GoogleCloudServices
   */
  constructor() {
    this.projectId = GCP_CONFIG.PROJECT_ID;
    this.region = GCP_CONFIG.REGION;
    this.functionsUrl = GCP_CONFIG.FUNCTIONS_URL;
    this.initialized = false;
    this.rateLimitMap = new Map(); // Track API call rates
  }

  /**
   * Implements rate limiting for API calls
   * @private
   * @param {string} endpoint - API endpoint
   * @returns {boolean} True if request is allowed
   */
  checkRateLimit(endpoint) {
    const now = Date.now();
    const key = `${endpoint}_${Math.floor(now / 60000)}`; // Per minute window
    
    if (!this.rateLimitMap.has(key)) {
      this.rateLimitMap.set(key, 1);
      // Clean up old entries
      for (const [k] of this.rateLimitMap) {
        if (!k.startsWith(endpoint) || k !== key) {
          this.rateLimitMap.delete(k);
        }
      }
      return true;
    }

    const count = this.rateLimitMap.get(key);
    if (count >= SECURITY_CONFIG.RATE_LIMIT.MAX_API_CALLS_PER_MINUTE) {
      console.warn(`Rate limit exceeded for ${endpoint}`);
      return false;
    }

    this.rateLimitMap.set(key, count + 1);
    return true;
  }

  /**
   * Validates input data before sending to API
   * @private
   * @param {Object} data - Data to validate
   * @returns {boolean} True if valid
   * @throws {Error} If validation fails
   */
  validateInputData(data) {
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid input data');
    }

    // Check for SQL injection attempts in all string values
    for (const [key, value] of Object.entries(data)) {
      if (typeof value === 'string') {
        if (!validateAgainstSQLInjection(value)) {
          throw new Error(`Potential SQL injection detected in ${key}`);
        }
        if (!validateLength(value, 0, SECURITY_CONFIG.MAX_INPUT_LENGTH)) {
          throw new Error(`Input ${key} exceeds maximum length`);
        }
      }
    }

    return true;
  }

  /**
   * Initializes Google Cloud services
   * @returns {Promise<boolean>} True if initialization successful
   */
  async initialize() {
    try {
      console.log('Initializing Google Cloud Services...');

      if (FEATURE_FLAGS.ENABLE_CLOUD_FUNCTIONS) {
        await this.initializeCloudFunctions();
      }

      if (FEATURE_FLAGS.ENABLE_BIGQUERY) {
        await this.initializeBigQuery();
      }

      this.initialized = true;
      console.log('Google Cloud Services initialized successfully');
      return true;
    } catch (error) {
      console.error('Failed to initialize Google Cloud Services:', error);
      return false;
    }
  }

  /**
   * Initializes Cloud Functions integration
   * @private
   * @returns {Promise<void>}
   */
  async initializeCloudFunctions() {
    console.log('Cloud Functions integration ready');
    // Cloud Functions are called via HTTP endpoints
  }

  /**
   * Initializes BigQuery integration
   * @private
   * @returns {Promise<void>}
   */
  async initializeBigQuery() {
    console.log('BigQuery analytics integration ready');
    // BigQuery operations are performed server-side
  }

  /**
   * Calls a Cloud Function
   * @param {string} functionName - Name of the Cloud Function
   * @param {Object} data - Data to send to the function
   * @returns {Promise<Object>} Function response
   * @example
   * const result = await cloudServices.callCloudFunction('verifyVoter', { voterId: '123' });
   */
  async callCloudFunction(functionName, data) {
    if (!FEATURE_FLAGS.ENABLE_CLOUD_FUNCTIONS) {
      console.warn('Cloud Functions are disabled');
      return { success: false, message: 'Cloud Functions disabled' };
    }

    // Rate limiting check
    if (!this.checkRateLimit(functionName)) {
      return {
        success: false,
        error: 'Rate limit exceeded. Please try again later.',
        code: 'RATE_LIMIT_EXCEEDED'
      };
    }

    try {
      // Validate input data
      this.validateInputData(data);

      const url = `${this.functionsUrl}/${functionName}`;
      
      // Validate URL
      if (!validateUrl(url)) {
        throw new Error('Invalid function URL');
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest' // CSRF protection
        },
        body: JSON.stringify(data),
        credentials: 'same-origin', // Security: only send cookies to same origin
        mode: 'cors'
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Cloud Function error: ${response.statusText} - ${errorText}`);
      }

      const result = await response.json();
      
      // Validate response structure
      if (typeof result !== 'object') {
        throw new Error('Invalid response format');
      }

      return result;
    } catch (error) {
      console.error(`Error calling Cloud Function ${functionName}:`, error);
      
      // Don't expose internal error details to client
      return {
        success: false,
        error: error.message.includes('Rate limit') ? error.message : 'Service temporarily unavailable',
        code: error.message.includes('Rate limit') ? 'RATE_LIMIT_EXCEEDED' : 'SERVICE_ERROR'
      };
    }
  }

  /**
   * Verifies voter registration using Cloud Function
   * @param {string} voterId - Voter ID (EPIC number)
   * @param {string} name - Voter name
   * @returns {Promise<Object>} Verification result
   * @example
   * const result = await cloudServices.verifyVoterRegistration('ABC1234567', 'John Doe');
   */
  async verifyVoterRegistration(voterId, name) {
    // Enhanced validation
    if (!voterId || !name) {
      return { success: false, error: 'Voter ID and name are required' };
    }

    // Validate voter ID format (Indian EPIC format: 3 letters + 7 digits)
    const epicPattern = /^[A-Z]{3}[0-9]{7}$/i;
    if (!epicPattern.test(voterId)) {
      return { success: false, error: 'Invalid voter ID format' };
    }

    return await this.callCloudFunction('verifyVoter', {
      voterId: sanitizeInput(voterId.toUpperCase()),
      name: sanitizeInput(name),
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Searches for polling booth using Cloud Function
   * @param {string} location - Location query (address, PIN code, etc.)
   * @returns {Promise<Object>} Polling booth information
   * @example
   * const booth = await cloudServices.searchPollingBooth('110001');
   */
  async searchPollingBooth(location) {
    if (!location || typeof location !== 'string') {
      return { success: false, error: 'Location is required' };
    }

    if (!validateLength(location, 1, 200)) {
      return { success: false, error: 'Location must be between 1 and 200 characters' };
    }

    return await this.callCloudFunction('searchPollingBooth', {
      location: sanitizeInput(location),
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Logs analytics event to BigQuery
   * @param {string} eventName - Event name
   * @param {Object} eventData - Event data
   * @returns {Promise<boolean>} True if logged successfully
   * @example
   * await cloudServices.logAnalyticsEvent('page_view', { page: 'home' });
   */
  async logAnalyticsEvent(eventName, eventData) {
    if (!FEATURE_FLAGS.ENABLE_BIGQUERY) {
      return false;
    }

    try {
      const event = {
        event_id: generateId(),
        event_name: eventName,
        event_data: eventData,
        timestamp: new Date().toISOString(),
        user_agent: navigator.userAgent,
        screen_resolution: `${window.screen.width}x${window.screen.height}`
      };

      return await this.callCloudFunction('logToBigQuery', event);
    } catch (error) {
      console.error('Error logging to BigQuery:', error);
      return false;
    }
  }

  /**
   * Uploads file to Cloud Storage
   * @param {File} file - File to upload
   * @param {string} folder - Destination folder
   * @returns {Promise<Object>} Upload result with URL
   * @example
   * const result = await cloudServices.uploadToCloudStorage(file, 'user-uploads');
   */
  async uploadToCloudStorage(file, folder = 'uploads') {
    try {
      // Validate file
      if (!file || !(file instanceof File)) {
        throw new Error('Invalid file');
      }

      // Check file size
      if (file.size > SECURITY_CONFIG.MAX_FILE_SIZE) {
        throw new Error(`File size exceeds maximum of ${SECURITY_CONFIG.MAX_FILE_SIZE / (1024 * 1024)}MB`);
      }

      // Validate file type (whitelist approach)
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        throw new Error('File type not allowed');
      }

      // Sanitize folder name
      const sanitizedFolder = sanitizeInput(folder).replace(/[^a-zA-Z0-9-_]/g, '');

      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', sanitizedFolder);
      formData.append('bucket', GCP_CONFIG.STORAGE_BUCKET);

      const response = await fetch(`${this.functionsUrl}/uploadFile`, {
        method: 'POST',
        body: formData,
        credentials: 'same-origin'
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Error uploading to Cloud Storage:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Analyzes text using Google Natural Language API
   * @param {string} text - Text to analyze
   * @returns {Promise<Object>} Analysis result with sentiment and entities
   * @example
   * const analysis = await cloudServices.analyzeText('I love voting!');
   */
  async analyzeText(text) {
    if (!FEATURE_FLAGS.ENABLE_AI_CHATBOT) {
      return { success: false, message: 'AI features disabled' };
    }

    try {
      return await this.callCloudFunction('analyzeText', {
        text: sanitizeInput(text),
        features: ['sentiment', 'entities', 'syntax']
      });
    } catch (error) {
      console.error('Error analyzing text:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Gets AI-powered chatbot response
   * @param {string} question - User question
   * @param {Array<Object>} context - Conversation context
   * @returns {Promise<Object>} Chatbot response
   * @example
   * const response = await cloudServices.getChatbotResponse('How do I register to vote?', []);
   */
  async getChatbotResponse(question, context = []) {
    if (!FEATURE_FLAGS.ENABLE_AI_CHATBOT) {
      return this.getFallbackResponse(question);
    }

    // Validate question
    if (!question || typeof question !== 'string') {
      return { success: false, error: 'Question is required' };
    }

    if (!validateLength(question, 1, SECURITY_CONFIG.MAX_INPUT_LENGTH)) {
      return { success: false, error: 'Question length invalid' };
    }

    try {
      return await this.callCloudFunction('chatbot', {
        question: sanitizeInput(question),
        context: Array.isArray(context) ? context.slice(-5) : [], // Last 5 messages for context
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error getting chatbot response:', error);
      return this.getFallbackResponse(question);
    }
  }

  /**
   * Provides fallback response when AI is unavailable
   * @private
   * @param {string} question - User question
   * @returns {Object} Fallback response
   */
  getFallbackResponse(question) {
    const lowerQuestion = question.toLowerCase();

    if (lowerQuestion.includes('register')) {
      return {
        success: true,
        response: 'To register to vote, visit the National Voters\' Service Portal (nvsp.in) or contact your local Electoral Registration Officer. You need to be 18 years or older and have proof of residence.'
      };
    }

    if (lowerQuestion.includes('epic') || lowerQuestion.includes('voter id')) {
      return {
        success: true,
        response: 'EPIC (Electors Photo Identity Card) is your voter ID card. You can apply for it online at nvsp.in or visit your local ERO office. It typically takes 2-4 weeks to receive.'
      };
    }

    if (lowerQuestion.includes('polling') || lowerQuestion.includes('booth')) {
      return {
        success: true,
        response: 'You can find your polling booth by entering your address or PIN code in the Search section. Polling booths are typically open from 7:00 AM to 6:00 PM on election day.'
      };
    }

    return {
      success: true,
      response: 'For detailed information about Indian elections, please visit the Election Commission of India website at eci.gov.in or call the helpline at 1950.'
    };
  }

  /**
   * Logs structured event to Cloud Logging
   * @param {string} severity - Log severity (INFO, WARNING, ERROR)
   * @param {string} message - Log message
   * @param {Object} metadata - Additional metadata
   * @returns {Promise<boolean>} True if logged successfully
   * @example
   * await cloudServices.logToCloudLogging('INFO', 'User searched for polling booth', { location: 'Delhi' });
   */
  async logToCloudLogging(severity, message, metadata = {}) {
    try {
      const logEntry = {
        severity,
        message,
        metadata,
        timestamp: new Date().toISOString(),
        resource: {
          type: 'global',
          labels: {
            project_id: this.projectId
          }
        }
      };

      return await this.callCloudFunction('logToCloudLogging', logEntry);
    } catch (error) {
      console.error('Error logging to Cloud Logging:', error);
      return false;
    }
  }

  /**
   * Retrieves election data from Firestore
   * @param {string} collection - Firestore collection name
   * @param {string} documentId - Document ID
   * @returns {Promise<Object>} Document data
   * @example
   * const data = await cloudServices.getFirestoreDocument('elections', '2027-lok-sabha');
   */
  async getFirestoreDocument(collection, documentId) {
    try {
      return await this.callCloudFunction('getFirestoreDoc', {
        collection,
        documentId
      });
    } catch (error) {
      console.error('Error getting Firestore document:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Saves user preferences to Firestore
   * @param {string} userId - User ID
   * @param {Object} preferences - User preferences
   * @returns {Promise<boolean>} True if saved successfully
   * @example
   * await cloudServices.saveUserPreferences('user123', { language: 'hi', notifications: true });
   */
  async saveUserPreferences(userId, preferences) {
    try {
      const result = await this.callCloudFunction('saveFirestoreDoc', {
        collection: GCP_CONFIG.FIRESTORE_COLLECTION,
        documentId: userId,
        data: preferences
      });
      return result.success;
    } catch (error) {
      console.error('Error saving user preferences:', error);
      return false;
    }
  }

  /**
   * Queries BigQuery for analytics insights
   * @param {string} query - SQL query
   * @returns {Promise<Object>} Query results
   * @example
   * const results = await cloudServices.queryBigQuery('SELECT COUNT(*) FROM events WHERE event_name = "page_view"');
   */
  async queryBigQuery(query) {
    if (!FEATURE_FLAGS.ENABLE_BIGQUERY) {
      return { success: false, message: 'BigQuery disabled' };
    }

    try {
      return await this.callCloudFunction('queryBigQuery', {
        query,
        dataset: GCP_CONFIG.BIGQUERY_DATASET
      });
    } catch (error) {
      console.error('Error querying BigQuery:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Gets real-time election statistics from BigQuery
   * @returns {Promise<Object>} Election statistics
   * @example
   * const stats = await cloudServices.getElectionStatistics();
   */
  async getElectionStatistics() {
    const query = `
      SELECT 
        COUNT(DISTINCT user_id) as total_users,
        COUNT(*) as total_events,
        COUNTIF(event_name = 'voter_search') as voter_searches,
        COUNTIF(event_name = 'quiz_completed') as quiz_completions
      FROM \`${this.projectId}.${GCP_CONFIG.BIGQUERY_DATASET}.events\`
      WHERE DATE(timestamp) = CURRENT_DATE()
    `;

    return await this.queryBigQuery(query);
  }
}

// Create singleton instance
const googleCloudServices = new GoogleCloudServices();

export default googleCloudServices;
export { GoogleCloudServices };

// Made with Bob
