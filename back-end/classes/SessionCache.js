class SessionCache {
    constructor() {
        this.cache = new Map();
    }

    addSession(sessionId, sessionData) {
        // 7 days
        const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000;
        this.cache.set(sessionId, { ...sessionData, expiresAt });
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

    clearExpiredSessions() {
        const now = Date.now();
        for (let [sessionId, data] of this.cache.entries()) {
            if (data.expiresAt <= now) {
                this.cache.delete(sessionId);
            }
        }
    }
}

module.exports = new SessionCache();
