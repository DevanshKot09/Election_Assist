/**
 * @fileoverview Security utilities and middleware
 * @module security
 * @description Comprehensive security functions including CSP, headers, and validation
 * @author Indian Election Assistant Team
 * @version 2.0.0
 */

'use strict';

import { SECURITY_CONFIG } from './config.js';

/**
 * Security Manager Class
 * @class
 */
class SecurityManager {
  constructor() {
    this.initialized = false;
  }

  /**
   * Initializes security features
   * @returns {Promise<boolean>} True if initialization successful
   */
  async initialize() {
    try {
      this.setupCSP();
      this.setupSecurityHeaders();
      this.enforceHTTPS();
      this.setupEventListeners();
      this.initialized = true;
      console.log('Security features initialized');
      return true;
    } catch (error) {
      console.error('Failed to initialize security features:', error);
      return false;
    }
  }

  /**
   * Sets up Content Security Policy
   * @private
   */
  setupCSP() {
    const csp = SECURITY_CONFIG.CSP;
    const cspString = Object.entries(csp)
      .map(([directive, sources]) => {
        return `${directive} ${sources.join(' ')}`;
      })
      .join('; ');

    // Add CSP meta tag if not already present
    if (!document.querySelector('meta[http-equiv="Content-Security-Policy"]')) {
      const meta = document.createElement('meta');
      meta.httpEquiv = 'Content-Security-Policy';
      meta.content = cspString;
      document.head.appendChild(meta);
    }
  }

  /**
   * Sets up security headers (for client-side enforcement)
   * @private
   */
  setupSecurityHeaders() {
    // Add security-related meta tags
    const headers = {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN',
      'Referrer-Policy': 'strict-origin-when-cross-origin'
    };

    Object.entries(headers).forEach(([name, content]) => {
      if (!document.querySelector(`meta[http-equiv="${name}"]`)) {
        const meta = document.createElement('meta');
        meta.httpEquiv = name;
        meta.content = content;
        document.head.appendChild(meta);
      }
    });
  }

  /**
   * Enforces HTTPS in production
   * @private
   */
  enforceHTTPS() {
    if (window.location.protocol === 'http:' && 
        window.location.hostname !== 'localhost' &&
        !window.location.hostname.startsWith('127.')) {
      window.location.href = window.location.href.replace('http:', 'https:');
    }
  }

  /**
   * Sets up security event listeners
   * @private
   */
  setupEventListeners() {
    // Prevent clickjacking
    if (window.self !== window.top) {
      document.body.style.display = 'none';
      console.warn('Potential clickjacking attempt detected');
    }

    // Monitor for suspicious activity
    this.monitorConsoleAccess();
    this.preventDevToolsAbuse();
  }

  /**
   * Monitors console access for security
   * @private
   */
  monitorConsoleAccess() {
    const originalConsole = { ...console };
    
    // Warn about console usage in production
    if (process.env.NODE_ENV === 'production') {
      console.log = function(...args) {
        // Only log errors and warnings in production
      };
    }
  }

  /**
   * Prevents common DevTools abuse patterns
   * @private
   */
  preventDevToolsAbuse() {
    // Detect if DevTools is open (basic detection)
    const devtools = /./;
    devtools.toString = function() {
      this.opened = true;
    };

    // This is a basic check and can be bypassed, but adds a layer
    setInterval(() => {
      if (devtools.opened) {
        console.warn('Developer tools detected');
        devtools.opened = false;
      }
    }, 1000);
  }

  /**
   * Validates origin for CORS requests
   * @param {string} origin - Origin to validate
   * @returns {boolean} True if origin is allowed
   */
  validateOrigin(origin) {
    return SECURITY_CONFIG.ALLOWED_ORIGINS.includes(origin);
  }

  /**
   * Generates a secure random token
   * @param {number} length - Token length
   * @returns {string} Random token
   */
  generateSecureToken(length = 32) {
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  /**
   * Implements CSRF token generation and validation
   * @returns {string} CSRF token
   */
  getCSRFToken() {
    let token = sessionStorage.getItem('csrf_token');
    if (!token) {
      token = this.generateSecureToken();
      sessionStorage.setItem('csrf_token', token);
    }
    return token;
  }

  /**
   * Validates CSRF token
   * @param {string} token - Token to validate
   * @returns {boolean} True if valid
   */
  validateCSRFToken(token) {
    const storedToken = sessionStorage.getItem('csrf_token');
    return storedToken === token;
  }

  /**
   * Sanitizes HTML to prevent XSS
   * @param {string} html - HTML to sanitize
   * @returns {string} Sanitized HTML
   */
  sanitizeHTML(html) {
    const temp = document.createElement('div');
    temp.textContent = html;
    return temp.innerHTML;
  }

  /**
   * Validates and sanitizes URL
   * @param {string} url - URL to validate
   * @returns {string|null} Sanitized URL or null if invalid
   */
  sanitizeURL(url) {
    try {
      const urlObj = new URL(url);
      const allowedProtocols = ['http:', 'https:'];
      
      if (!allowedProtocols.includes(urlObj.protocol)) {
        return null;
      }

      // Remove any javascript: or data: protocols
      if (url.toLowerCase().includes('javascript:') || 
          url.toLowerCase().includes('data:')) {
        return null;
      }

      return urlObj.href;
    } catch {
      return null;
    }
  }

  /**
   * Implements secure cookie settings
   * @param {string} name - Cookie name
   * @param {string} value - Cookie value
   * @param {number} days - Expiration in days
   */
  setSecureCookie(name, value, days = 7) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    const secure = window.location.protocol === 'https:' ? 'Secure;' : '';
    document.cookie = `${name}=${value};${expires};path=/;SameSite=Strict;${secure}`;
  }

  /**
   * Gets secure cookie value
   * @param {string} name - Cookie name
   * @returns {string|null} Cookie value or null
   */
  getSecureCookie(name) {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(nameEQ) === 0) {
        return c.substring(nameEQ.length, c.length);
      }
    }
    return null;
  }

  /**
   * Deletes secure cookie
   * @param {string} name - Cookie name
   */
  deleteSecureCookie(name) {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
  }

  /**
   * Implements subresource integrity check
   * @param {string} url - Resource URL
   * @param {string} integrity - Expected integrity hash
   * @returns {Promise<boolean>} True if integrity matches
   */
  async verifySubresourceIntegrity(url, integrity) {
    try {
      const response = await fetch(url);
      const content = await response.text();
      const encoder = new TextEncoder();
      const data = encoder.encode(content);
      const hashBuffer = await crypto.subtle.digest('SHA-384', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashBase64 = btoa(String.fromCharCode.apply(null, hashArray));
      return `sha384-${hashBase64}` === integrity;
    } catch (error) {
      console.error('SRI verification failed:', error);
      return false;
    }
  }

  /**
   * Logs security events
   * @param {string} event - Event type
   * @param {Object} details - Event details
   */
  logSecurityEvent(event, details = {}) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      event,
      details,
      userAgent: navigator.userAgent,
      url: window.location.href
    };

    // In production, send to logging service
    if (process.env.NODE_ENV === 'production') {
      // Send to cloud logging
      console.warn('Security Event:', logEntry);
    } else {
      console.log('Security Event:', logEntry);
    }
  }

  /**
   * Checks for common security vulnerabilities
   * @returns {Array<string>} List of detected issues
   */
  performSecurityAudit() {
    const issues = [];

    // Check for mixed content
    if (window.location.protocol === 'https:') {
      const insecureResources = document.querySelectorAll('[src^="http:"], [href^="http:"]');
      if (insecureResources.length > 0) {
        issues.push(`Mixed content detected: ${insecureResources.length} insecure resources`);
      }
    }

    // Check for inline scripts
    const inlineScripts = document.querySelectorAll('script:not([src])');
    if (inlineScripts.length > 0) {
      issues.push(`Inline scripts detected: ${inlineScripts.length}`);
    }

    // Check for eval usage
    if (typeof eval !== 'undefined') {
      issues.push('eval() is available and could be exploited');
    }

    return issues;
  }
}

// Create singleton instance
const securityManager = new SecurityManager();

// Auto-initialize on load
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    securityManager.initialize();
  });
}

export default securityManager;
export { SecurityManager };

// Made with Bob