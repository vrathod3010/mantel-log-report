export const parseLogLine = (line: string) => {
  const regex =
    /^(\S+) \S+ \S+ \[([^\]]+)] "(GET|POST|PUT|DELETE|HEAD) ([^ ]+) [^"]+" (\d{3}) \d+ "[^"]*" "([^"]*)"/;

  const match = line.match(regex);
  if (!match) return null;
  const [, ip, datetime, method, url, status, userAgent] = match;
  return {
    ip,
    datetime,
    method,
    url: url.replace(/^https?:\/\/[^/]+/, ""),
    status: parseInt(status, 10),
    userAgent,
  };
};
