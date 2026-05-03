/**
 * @fileoverview Configuration constants for Indian Election Assistant
 * @module config
 * @description Centralized configuration management for the application
 * @author Indian Election Assistant Team
 * @version 2.0.0
 */

'use strict';

/**
 * Application configuration constants
 * @constant {Object}
 */
export const CONFIG = {
  /** @type {string} Election Commission helpline number */
  HELPLINE: '1950',

  /** @type {string} Official ECI website URL */
  ECI_WEBSITE: 'https://eci.gov.in',

  /** @type {string} Default location for map initialization */
  DEFAULT_LOCATION: 'New Delhi',

  /** @type {number} Default map zoom level */
  MAP_ZOOM: 16,

  /** @type {number} Total number of quiz questions */
  QUIZ_TOTAL_QUESTIONS: 10,

  /** @type {number} Minimum voting age in India */
  MIN_VOTING_AGE: 18,

  /** @type {number} Total Lok Sabha constituencies */
  LOK_SABHA_SEATS: 543,

  /** @type {number} Lok Sabha term in years */
  LOK_SABHA_TERM: 5
};

/**
 * Google Cloud Platform configuration
 * @constant {Object}
 */
export const GCP_CONFIG = {
  /** @type {string} Google Cloud Project ID */
  PROJECT_ID: 'prompt-war-submission-1',

  /** @type {string} Google Cloud Region */
  REGION: 'asia-south1',

  /** @type {string} Cloud Functions base URL */
  FUNCTIONS_URL: 'https://asia-south1-prompt-war-submission-1.cloudfunctions.net',

  /** @type {string} BigQuery dataset ID */
  BIGQUERY_DATASET: 'election_analytics',

  /** @type {string} Cloud Storage bucket name */
  STORAGE_BUCKET: 'prompt-war-election-assets',

  /** @type {string} Firestore collection name */
  FIRESTORE_COLLECTION: 'user_preferences'
};

/**
 * Google Maps API configuration
 * @constant {Object}
 */
export const MAPS_CONFIG = {
  /** @type {string} Google Maps API key - Load from environment */
  API_KEY: typeof process !== 'undefined' && process.env?.VITE_GOOGLE_MAPS_API_KEY
    ? process.env.VITE_GOOGLE_MAPS_API_KEY
    : (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GOOGLE_MAPS_API_KEY)
      ? import.meta.env.VITE_GOOGLE_MAPS_API_KEY
      : '',

  /** @type {Array<string>} Required libraries */
  LIBRARIES: ['places', 'geometry'],

  /** @type {Object} Default map options */
  DEFAULT_OPTIONS: {
    zoom: 16,
    mapTypeControl: true,
    streetViewControl: true,
    fullscreenControl: true
  }
};

/**
 * Google Analytics configuration
 * @constant {Object}
 */
export const ANALYTICS_CONFIG = {
  /** @type {string} Google Analytics measurement ID */
  MEASUREMENT_ID: 'G-XXXXXXXXXX',

  /** @type {boolean} Anonymize IP addresses */
  ANONYMIZE_IP: true,

  /** @type {string} Cookie flags for security */
  COOKIE_FLAGS: 'SameSite=Strict;Secure'
};

/**
 * Firebase configuration
 * @constant {Object}
 */
export const FIREBASE_CONFIG = {
  apiKey: typeof import.meta !== 'undefined' && import.meta.env?.VITE_FIREBASE_API_KEY
    ? import.meta.env.VITE_FIREBASE_API_KEY
    : '',
  authDomain: 'prompt-war-submission-1.firebaseapp.com',
  projectId: 'prompt-war-submission-1',
  storageBucket: 'prompt-war-submission-1.appspot.com',
  messagingSenderId: typeof import.meta !== 'undefined' && import.meta.env?.VITE_FIREBASE_MESSAGING_SENDER_ID
    ? import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID
    : '',
  appId: typeof import.meta !== 'undefined' && import.meta.env?.VITE_FIREBASE_APP_ID
    ? import.meta.env.VITE_FIREBASE_APP_ID
    : '',
  measurementId: typeof import.meta !== 'undefined' && import.meta.env?.VITE_FIREBASE_MEASUREMENT_ID
    ? import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
    : ''
};

/**
 * API endpoints configuration
 * @constant {Object}
 */
export const API_ENDPOINTS = {
  /** @type {string} Voter registration verification endpoint */
  VERIFY_VOTER: '/api/verify-voter',

  /** @type {string} Polling booth search endpoint */
  SEARCH_BOOTH: '/api/search-booth',

  /** @type {string} Election dates endpoint */
  ELECTION_DATES: '/api/election-dates',

  /** @type {string} AI chatbot endpoint */
  CHATBOT: '/api/chatbot',

  /** @type {string} Analytics logging endpoint */
  LOG_EVENT: '/api/log-event'
};

/**
 * UI configuration constants
 * @constant {Object}
 */
export const UI_CONFIG = {
  /** @type {number} Debounce delay for search inputs (ms) */
  SEARCH_DEBOUNCE: 300,

  /** @type {number} Toast notification duration (ms) */
  TOAST_DURATION: 3000,

  /** @type {number} Animation duration (ms) */
  ANIMATION_DURATION: 300,

  /** @type {number} Maximum chat history items */
  MAX_CHAT_HISTORY: 50
};

/**
 * Security configuration
 * @constant {Object}
 */
export const SECURITY_CONFIG = {
  /** @type {Array<string>} Allowed origins for CORS */
  ALLOWED_ORIGINS: [
    'https://prompt-war-submission-1.web.app',
    'https://prompt-war-submission-1.firebaseapp.com',
    'http://localhost:5173', // Development only
    'http://localhost:3000'  // Development only
  ],

  /** @type {number} Maximum input length */
  MAX_INPUT_LENGTH: 500,

  /** @type {number} Maximum file upload size (5MB) */
  MAX_FILE_SIZE: 5 * 1024 * 1024,

  /** @type {RegExp} Input sanitization pattern - Enhanced XSS protection */
  SANITIZE_PATTERN: /[<>'"&]/g,

  /** @type {RegExp} SQL injection pattern detection */
  SQL_INJECTION_PATTERN: /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION|SCRIPT)\b)/gi,

  /** @type {Object} Rate limiting configuration */
  RATE_LIMIT: {
    MAX_REQUESTS: 100,
    WINDOW_MS: 15 * 60 * 1000, // 15 minutes
    MAX_API_CALLS_PER_MINUTE: 20
  },

  /** @type {Object} Content Security Policy */
  CSP: {
    'default-src': ["'self'"],
    'script-src': ["'self'", "'unsafe-inline'", 'https://maps.googleapis.com', 'https://www.googletagmanager.com'],
    'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
    'font-src': ["'self'", 'https://fonts.gstatic.com'],
    'img-src': ["'self'", 'data:', 'https:', 'blob:'],
    'connect-src': ["'self'", 'https://maps.googleapis.com', 'https://*.cloudfunctions.net', 'https://firestore.googleapis.com'],
    'frame-ancestors': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"]
  },

  /** @type {Object} Security headers */
  HEADERS: {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'SAMEORIGIN',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'geolocation=(self), microphone=(), camera=()',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
  }
};

/**
 * Feature flags for progressive enhancement
 * @constant {Object}
 */
export const FEATURE_FLAGS = {
  /** @type {boolean} Enable Google Cloud Functions */
  ENABLE_CLOUD_FUNCTIONS: true,

  /** @type {boolean} Enable BigQuery analytics */
  ENABLE_BIGQUERY: true,

  /** @type {boolean} Enable AI chatbot */
  ENABLE_AI_CHATBOT: true,

  /** @type {boolean} Enable offline mode */
  ENABLE_OFFLINE: true,

  /** @type {boolean} Enable push notifications */
  ENABLE_NOTIFICATIONS: true
};

export default {
  CONFIG,
  GCP_CONFIG,
  MAPS_CONFIG,
  ANALYTICS_CONFIG,
  FIREBASE_CONFIG,
  API_ENDPOINTS,
  UI_CONFIG,
  SECURITY_CONFIG,
  FEATURE_FLAGS
};

// Made with Bob
