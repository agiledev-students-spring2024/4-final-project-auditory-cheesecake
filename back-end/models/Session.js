const mongoose = require('mongoose');
const crypto = require('crypto');
const SessionCache = require('../classes/SessionCache');

const sessionSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  expiresAt: { type: Date, required: true }
});


// equivalent to:
// public static String generateSessionId() {
sessionSchema.statics.generateSessionId = async function() {
  let sessionId = crypto.randomBytes(32).toString('hex');
  let isUnique = false;

  while (!isUnique) {
    sessionId = crypto.randomBytes(32).toString('hex');;
    const existingSession = await this.findOne({ sessionId: sessionId });
    if (!existingSession) {
      isUnique = true;
    }
  }

  return sessionId;
};

// equivalent to:
// public static void createSession(String username) {
sessionSchema.statics.createSession = async function(username) {
  const sessionId = await this.generateSessionId();
  // 7 days from now
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const session = new this({
    sessionId,
    username,
    expiresAt
  });

  SessionCache.addSession(sessionId, session);
  await session.save();
  return sessionId;
};

// equivalent to:
// public static Session getSession(String sessionId) {
sessionSchema.statics.getSession = async function(sessionId) {
  const session = await this.findOne({ sessionId: sessionId });
  if (session && session.expiresAt > new Date()) {
    SessionCache.addSession(sessionId, session);
    return session;
  } else {
    if (session) {
      await session.remove();
      SessionCache.removeSession(sessionId);
    }
    return null;
  }
};

// equivalent to:
// public static void deleteSession(String sessionId) {
sessionSchema.statics.deleteSession = async function(sessionId) {
  await this.deleteOne({ sessionId: sessionId });
};

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;
