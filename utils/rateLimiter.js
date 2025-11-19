// Simple in-memory rate limiter
// Production: 5 minutes per request
// Development: No limit

const requestTimestamps = new Map();
const RATE_LIMIT_MS = 5 * 60 * 1000; // 5 minutes in milliseconds

export function checkRateLimit(identifier) {
  // No rate limiting in development
  if (process.env.NODE_ENV !== 'production') {
    return { allowed: true };
  }

  const now = Date.now();
  const lastRequestTime = requestTimestamps.get(identifier);

  if (!lastRequestTime) {
    // First request, allow it
    requestTimestamps.set(identifier, now);
    return { allowed: true };
  }

  const timeSinceLastRequest = now - lastRequestTime;

  if (timeSinceLastRequest >= RATE_LIMIT_MS) {
    // Enough time has passed, allow request
    requestTimestamps.set(identifier, now);
    return { allowed: true };
  } else {
    // Rate limit exceeded
    const remainingTime = Math.ceil((RATE_LIMIT_MS - timeSinceLastRequest) / 1000); // in seconds
    const remainingMinutes = Math.floor(remainingTime / 60);
    const remainingSeconds = remainingTime % 60;
    
    return {
      allowed: false,
      remainingTime: remainingTime,
      remainingMinutes: remainingMinutes,
      remainingSeconds: remainingSeconds,
      message: `Vui lòng đợi ${remainingMinutes} phút ${remainingSeconds} giây trước khi bói lại.`
    };
  }
}

// Clean up old entries periodically (optional, to prevent memory leak)
if (process.env.NODE_ENV === 'production') {
  setInterval(() => {
    const now = Date.now();
    for (const [identifier, timestamp] of requestTimestamps.entries()) {
      if (now - timestamp > RATE_LIMIT_MS * 2) {
        requestTimestamps.delete(identifier);
      }
    }
  }, 10 * 60 * 1000); // Clean up every 10 minutes
}

