class SessionCache {
  constructor() {
    // use map because O(1) lookup time
    this.cache = new Map();
    console.log('SessionCache initialized');
  }
  
  addSession(sessionId, username) {
    if (!sessionId || !username) {
      throw new Error('Session ID and username are required');
    }
    if (!this.getSession(sessionId)) {
      // 7 days
      const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000;
      this.cache.set(sessionId, { username, expiresAt });
    }
  }
  
  getSession(sessionId) {
    const session = this.cache.get(sessionId);
    if (session && session.expiresAt > Date.now()) {
      return session;
    } else {
      this.cache.delete(sessionId);
      return null;
    }
  }
  
  removeSession(sessionId) {
    this.cache.delete(sessionId);
  }
  
  toString() {
    return JSON.stringify([...this.cache]);
  }
  
  print() {
    for (let [sessionId, data] of this.cache.entries()) {
      console.log(sessionId, data);
    }
  }
  
  length() {
    return this.cache.size;
  }
  
  flushExpiredSessions() {
    const now = Date.now();
    for (let [sessionId, data] of this.cache.entries()) {
      if (data.expiresAt <= now) {
        this.cache.delete(sessionId);
      }
    }
  }
  
  flush() {
    this.cache.clear();
  }
}

module.exports = new SessionCache();
