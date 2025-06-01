/**
 * parseLogLine Function
 *
 * Parses a single log line and extracts relevant information such as IP address, datetime, HTTP method, URL, status code, and user agent.
 *
 * The function uses a regular expression to match the expected log format and returns an object containing the parsed data.
 * If the log line does not match the expected format, it returns `null`.
 *
 * @param line - A string representing a single log line.
 * @returns An object containing parsed log data or `null` if the line does not match the expected format.
 */
export const parseLogLine = (line: string) => {
  // Regular expression to match the log line format
  const regex =
    /^(\S+) \S+ \S+ \[([^\]]+)] "(GET|POST|PUT|DELETE|HEAD) ([^ ]+) [^"]+" (\d{3}) \d+ "[^"]*" "([^"]*)"/;

  // Attempt to match the log line against the regular expression
  const match = line.match(regex);
  if (!match) return null; // Return null if the line does not match

  // Destructure the matched groups into variables
  const [, ip, datetime, method, url, status, userAgent] = match;

  // Return an object containing the parsed log data
  return {
    ip, // IP address of the client
    datetime, // Date and time of the request
    method, // HTTP method (e.g., GET, POST)
    url: url.replace(/^https?:\/\/[^/]+/, ""), // URL with the domain stripped
    status: parseInt(status, 10), // HTTP status code as a number
    userAgent, // User agent string
  };
};
