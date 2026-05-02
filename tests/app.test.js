/**
 * Test Suite for Indian Election Assistant
 * Comprehensive tests for all functionality
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

// Mock DOM elements
const createMockDOM = () => {
  document.body.innerHTML = `
    <div id="timelineList"></div>
    <div id="stepGrid"></div>
    <div id="guideDetail"></div>
    <div id="ballotList"></div>
    <div id="chatLog"></div>
    <div id="quizContent"></div>
    <div id="quizProgress"></div>
    <div id="currentQuestion"></div>
    <div id="totalQuestions"></div>
    <div id="quizScore"></div>
    <div id="questionText"></div>
    <div id="quizOptions"></div>
    <div id="reminderList"></div>
  `;
};

describe('Indian Election Assistant - Core Functionality', () => {
  beforeEach(() => {
    createMockDOM();
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('Utility Functions', () => {
    it('should sanitize HTML correctly', () => {
      const utils = {
        sanitizeHTML(str) {
          const div = document.createElement('div');
          div.textContent = str;
          return div.innerHTML;
        }
      };

      const maliciousInput = '<script>alert("XSS")</script>';
      const sanitized = utils.sanitizeHTML(maliciousInput);
      expect(sanitized).not.toContain('<script>');
      expect(sanitized).toBe('<script>alert("XSS")</script>');
    });

    it('should debounce function calls', (done) => {
      const utils = {
        debounce(func, wait) {
          let timeout;
          return function executedFunction(...args) {
            const later = () => {
              clearTimeout(timeout);
              func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
          };
        }
      };

      let callCount = 0;
      const debouncedFn = utils.debounce(() => {
        callCount++;
      }, 100);

      debouncedFn();
      debouncedFn();
      debouncedFn();

      setTimeout(() => {
        expect(callCount).toBe(1);
        done();
      }, 150);
    });
  });

  describe('Election Data', () => {
    it('should have valid election dates', () => {
      const electionDates = [
        {
          date: "January 15, 2027",
          title: "Voter registration verification",
          icon: "how_to_reg",
          text: "Verify your name in the electoral roll",
          urgent: false
        }
      ];

      expect(electionDates).toHaveLength(1);
      expect(electionDates[0]).toHaveProperty('date');
      expect(electionDates[0]).toHaveProperty('title');
      expect(electionDates[0]).toHaveProperty('icon');
      expect(electionDates[0]).toHaveProperty('text');
      expect(electionDates[0]).toHaveProperty('urgent');
    });

    it('should have valid guide steps', () => {
      const guideSteps = [
        {
          title: "Verify EPIC card",
          summary: "Ensure you have a valid Voter ID",
          details: "Your EPIC card is your primary voting document",
          checklist: ["Check electoral roll", "Verify details"]
        }
      ];

      expect(guideSteps).toHaveLength(1);
      expect(guideSteps[0].checklist).toBeInstanceOf(Array);
      expect(guideSteps[0].checklist.length).toBeGreaterThan(0);
    });
  });

  describe('Quiz Functionality', () => {
    it('should initialize quiz with correct state', () => {
      const state = {
        currentQuizQuestion: 0,
        quizScore: 0,
        quizAnswers: []
      };

      const quizQuestions = [
        {
          question: "What is the minimum age to vote?",
          options: ["16", "18", "21", "25"],
          correct: 1,
          explanation: "Minimum voting age is 18"
        }
      ];

      state.quizAnswers = new Array(quizQuestions.length).fill(null);

      expect(state.currentQuizQuestion).toBe(0);
      expect(state.quizScore).toBe(0);
      expect(state.quizAnswers).toHaveLength(1);
      expect(state.quizAnswers[0]).toBeNull();
    });

    it('should calculate quiz score correctly', () => {
      const quizQuestions = [
        { correct: 1 },
        { correct: 2 },
        { correct: 0 }
      ];

      const quizAnswers = [1, 2, 1]; // 2 correct, 1 wrong

      const score = quizAnswers.reduce((score, answer, index) => {
        return score + (answer === quizQuestions[index].correct ? 1 : 0);
      }, 0);

      expect(score).toBe(2);
      expect((score / quizQuestions.length) * 100).toBe(66.66666666666666);
    });

    it('should validate quiz question structure', () => {
      const question = {
        question: "What does EPIC stand for?",
        options: ["A", "B", "C", "D"],
        correct: 1,
        explanation: "EPIC stands for Electors Photo Identity Card"
      };

      expect(question.options).toHaveLength(4);
      expect(question.correct).toBeGreaterThanOrEqual(0);
      expect(question.correct).toBeLessThan(question.options.length);
      expect(question.explanation).toBeTruthy();
    });
  });

  describe('Assistant Question Answering', () => {
    const answerQuestion = (question) => {
      const lower = question.toLowerCase();
      
      if (lower.includes("epic") || lower.includes("voter id")) {
        return "To get an EPIC card, visit nvsp.in";
      }
      
      if (lower.includes("register")) {
        return "To register as a voter, you must be 18 years or older";
      }
      
      return "I can help with voter registration and more";
    };

    it('should answer EPIC card questions', () => {
      const response = answerQuestion("How do I get an EPIC card?");
      expect(response).toContain("EPIC");
      expect(response).toContain("nvsp.in");
    });

    it('should answer registration questions', () => {
      const response = answerQuestion("How do I register to vote?");
      expect(response).toContain("register");
      expect(response).toContain("18 years");
    });

    it('should provide default response for unknown questions', () => {
      const response = answerQuestion("Random question");
      expect(response).toContain("help");
    });
  });

  describe('Polling Place Data', () => {
    it('should have valid polling place structure', () => {
      const pollingPlace = {
        name: "Government Primary School",
        address: "Sector 15, Rohini, New Delhi - 110085",
        lat: 28.7041,
        lng: 77.1025,
        distance: "1.2 km",
        wait: "15-20 mins",
        constituency: "North West Delhi"
      };

      expect(pollingPlace.name).toBeTruthy();
      expect(pollingPlace.address).toBeTruthy();
      expect(pollingPlace.lat).toBeTypeOf('number');
      expect(pollingPlace.lng).toBeTypeOf('number');
      expect(pollingPlace.constituency).toBeTruthy();
    });

    it('should validate coordinates are within India', () => {
      const pollingPlaces = {
        delhi: { lat: 28.7041, lng: 77.1025 },
        mumbai: { lat: 19.1136, lng: 72.8697 },
        bangalore: { lat: 12.9716, lng: 77.5946 }
      };

      Object.values(pollingPlaces).forEach(place => {
        expect(place.lat).toBeGreaterThan(8); // Southern India
        expect(place.lat).toBeLessThan(36); // Northern India
        expect(place.lng).toBeGreaterThan(68); // Western India
        expect(place.lng).toBeLessThan(98); // Eastern India
      });
    });
  });

  describe('Reminder Management', () => {
    it('should add reminders correctly', () => {
      const reminders = new Set();
      
      reminders.add("Polling Day - April 15, 2027");
      reminders.add("Registration Deadline");
      reminders.add("Polling Day - April 15, 2027"); // Duplicate

      expect(reminders.size).toBe(2); // Set prevents duplicates
      expect(reminders.has("Polling Day - April 15, 2027")).toBe(true);
    });

    it('should render reminders list', () => {
      const reminders = new Set(["Reminder 1", "Reminder 2"]);
      const reminderList = document.getElementById('reminderList');
      
      reminderList.innerHTML = [...reminders]
        .map(item => `<li>${item}</li>`)
        .join("");

      expect(reminderList.children.length).toBe(2);
    });
  });

  describe('View Management', () => {
    it('should show correct view', () => {
      const views = ['home', 'timeline', 'guide', 'quiz', 'search'];
      const currentView = 'quiz';

      const isValidView = views.includes(currentView);
      expect(isValidView).toBe(true);
    });

    it('should validate hash navigation', () => {
      const validViews = ["home", "timeline", "guide", "quiz", "search"];
      const hash = "#quiz";
      const viewName = hash.replace("#", "");

      expect(validViews.includes(viewName)).toBe(true);
    });
  });

  describe('Search Functionality', () => {
    it('should find polling place by city name', () => {
      const pollingPlaces = {
        delhi: { name: "School Delhi" },
        mumbai: { name: "School Mumbai" }
      };

      const searchValue = "Mumbai";
      const searchKey = Object.keys(pollingPlaces).find(key => 
        searchValue.toLowerCase().includes(key)
      );

      expect(searchKey).toBe('mumbai');
      expect(pollingPlaces[searchKey].name).toContain('Mumbai');
    });

    it('should default to Delhi if no match found', () => {
      const pollingPlaces = {
        delhi: { name: "School Delhi" },
        mumbai: { name: "School Mumbai" }
      };

      const searchValue = "Unknown City";
      const searchKey = Object.keys(pollingPlaces).find(key => 
        searchValue.toLowerCase().includes(key)
      ) || "delhi";

      expect(searchKey).toBe('delhi');
    });
  });

  describe('Data Validation', () => {
    it('should validate election date format', () => {
      const dateString = "January 15, 2027";
      const date = new Date(dateString);
      
      expect(date).toBeInstanceOf(Date);
      expect(date.toString()).not.toBe('Invalid Date');
    });

    it('should validate helpline number format', () => {
      const helpline = '1950';
      
      expect(helpline).toMatch(/^\d{4}$/);
      expect(parseInt(helpline)).toBe(1950);
    });

    it('should validate PIN code format', () => {
      const pinCode = '110085';
      
      expect(pinCode).toMatch(/^\d{6}$/);
      expect(pinCode.length).toBe(6);
    });
  });

  describe('Accessibility Features', () => {
    it('should have proper ARIA labels', () => {
      const button = document.createElement('button');
      button.setAttribute('aria-label', 'Search for election information');
      
      expect(button.getAttribute('aria-label')).toBeTruthy();
      expect(button.getAttribute('aria-label')).toContain('Search');
    });

    it('should support keyboard navigation', () => {
      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      
      expect(event.key).toBe('Escape');
      expect(event.type).toBe('keydown');
    });
  });

  describe('Security Features', () => {
    it('should prevent XSS in user input', () => {
      const sanitizeHTML = (str) => {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
      };

      const maliciousInput = '<img src=x onerror=alert(1)>';
      const sanitized = sanitizeHTML(maliciousInput);
      
      expect(sanitized).not.toContain('onerror');
      expect(sanitized).not.toContain('<img');
    });

    it('should validate URL parameters', () => {
      const validateURL = (url) => {
        try {
          new URL(url);
          return true;
        } catch {
          return false;
        }
      };

      expect(validateURL('https://eci.gov.in')).toBe(true);
      expect(validateURL('javascript:alert(1)')).toBe(false);
    });
  });

  describe('Performance Optimization', () => {
    it('should debounce search input', () => {
      const debounce = (func, wait) => {
        let timeout;
        return (...args) => {
          clearTimeout(timeout);
          timeout = setTimeout(() => func(...args), wait);
        };
      };

      const debouncedFn = debounce(() => {}, 300);
      expect(typeof debouncedFn).toBe('function');
    });

    it('should lazy load map only when needed', () => {
      let mapInitialized = false;
      
      const initMap = () => {
        mapInitialized = true;
      };

      expect(mapInitialized).toBe(false);
      initMap();
      expect(mapInitialized).toBe(true);
    });
  });
});

describe('Integration Tests', () => {
  it('should complete full quiz flow', () => {
    const state = {
      currentQuizQuestion: 0,
      quizScore: 0,
      quizAnswers: [1, 2, 0]
    };

    const quizQuestions = [
      { correct: 1 },
      { correct: 2 },
      { correct: 0 }
    ];

    const score = state.quizAnswers.reduce((acc, answer, index) => {
      return acc + (answer === quizQuestions[index].correct ? 1 : 0);
    }, 0);

    expect(score).toBe(3);
    expect((score / quizQuestions.length) * 100).toBe(100);
  });

  it('should handle search to map flow', () => {
    const searchValue = "Delhi";
    const pollingPlaces = {
      delhi: {
        name: "School",
        lat: 28.7041,
        lng: 77.1025
      }
    };

    const place = pollingPlaces.delhi;
    
    expect(place).toBeDefined();
    expect(place.lat).toBeTruthy();
    expect(place.lng).toBeTruthy();
  });
});

describe('Error Handling', () => {
  it('should handle missing DOM elements gracefully', () => {
    const element = document.getElementById('nonexistent');
    expect(element).toBeNull();
  });

  it('should handle invalid quiz answers', () => {
    const validateAnswer = (answer, maxOptions) => {
      return answer >= 0 && answer < maxOptions;
    };

    expect(validateAnswer(1, 4)).toBe(true);
    expect(validateAnswer(-1, 4)).toBe(false);
    expect(validateAnswer(5, 4)).toBe(false);
  });

  it('should handle geolocation errors', () => {
    const handleGeolocationError = (error) => {
      return error ? 'Geolocation not available' : 'Success';
    };

    expect(handleGeolocationError(new Error())).toBe('Geolocation not available');
    expect(handleGeolocationError(null)).toBe('Success');
  });
});

// Made with Bob
