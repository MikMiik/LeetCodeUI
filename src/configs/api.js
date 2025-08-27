/**
 * API Configuration for LeetCode API integration
 */

export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1",
  TIMEOUT: 30000, // 30 seconds

  // Language IDs for Judge0
  LANGUAGES: {
    JAVASCRIPT: 63,
    PYTHON: 71,
    JAVA: 62,
    CPP: 54,
    C: 50,
    CSHARP: 51,
    GO: 60,
    RUST: 73,
  },

  // Polling configuration for submission results
  POLLING: {
    INTERVAL: 1000, // 1 second
    MAX_ATTEMPTS: 30, // 30 seconds max
  },
};

export default API_CONFIG;
