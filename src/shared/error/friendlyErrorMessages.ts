export const getFriendlyErrorMessage = (statusCode: number): string => {
  switch (statusCode) {
    case 400:
      return "Something went wrong with your request. Please check your input and try again.";
    case 401:
      return "Your session has expired. Please log in again.";
    case 403:
      return "You don't have permission to perform this action.";
    case 404:
      return "We couldn't find what you were looking for.";
    case 409:
      return "This record already exists. Please try a different value.";
    case 413:
      return "The file you uploaded is too large. Please upload a smaller file.";
    case 422:
      return "The data provided is invalid. Please double-check your fields.";
    case 429:
      return "You're doing that too fast! Please wait a moment and try again.";
    case 500:
    case 502:
    case 503:
    case 504:
      return "Our servers are experiencing a temporary hiccup. Please try again later.";
    default:
      return "An unexpected error occurred. We're looking into it!";
  }
};