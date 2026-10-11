/**
 * Utility to extract clean, user-friendly error messages from API responses or client errors.
 *
 * @param {unknown} error - The caught error object (Axios error, Error, or string)
 * @param {string} fallbackMessage - Fallback message if no specific error can be parsed
 * @returns {string} User-facing error message
 */
export function getErrorMessage(
  error,
  fallbackMessage = "An unexpected error occurred. Please try again."
) {
  if (!error) return "";

  // 1. Axios response error from backend
  if (error.response) {
    const { status, data } = error.response;

    // Check backend message field
    if (data?.message) {
      const msg = data.message.toString();
      const lowerMsg = msg.toLowerCase();

      // Duplicate email / account error
      if (
        lowerMsg.includes("already exist") ||
        lowerMsg.includes("duplicate") ||
        lowerMsg.includes("e11000")
      ) {
        return "An account with this email address already exists. Please log in or use a different email.";
      }

      return msg;
    }

    // Check if backend returned an array of validation errors
    if (Array.isArray(data?.errors) && data.errors.length > 0) {
      return data.errors[0];
    }

    // Status code fallbacks
    if (status === 400) {
      return "Validation failed. Please verify that all fields are filled correctly.";
    }
    if (status === 401) {
      return "Invalid email or password. Please check your credentials and try again.";
    }
    if (status === 403) {
      return "Access denied. You do not have permission to perform this action.";
    }
    if (status === 404) {
      return "The requested service or endpoint was not found.";
    }
    if (status >= 500) {
      return "Server error occurred. Please try again in a few moments.";
    }
  }

  // 2. Request was made but no response was received (Network / backend down)
  if (error.request) {
    return "Unable to connect to the backend server. Please verify your connection or ensure the server is running on port 3000.";
  }

  // 3. Error string or Error instance
  if (typeof error === "string") {
    return error;
  }
  if (error.message) {
    return error.message;
  }

  return fallbackMessage;
}
