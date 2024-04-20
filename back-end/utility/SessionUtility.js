const Session = require('../models/Session.js');
const SessionCache = require('../classes/SessionCache.js');

// flush expired sessions from db and cache
const flushExpiredSessions = async () => {
  await Session.flushExpiredSessions();
  SessionCache.flushExpiredSessions();
  console.log('Flushed expired sessions from db and cache');
};

// sync db and cache
const sync = async () => {
  SessionCache.flush();
  const sessions = await Session.find();
  for (let session of sessions) {
    SessionCache.addSession(session.sessionId, session.username);
  }
  console.log('Synced cache with db');
};

module.exports = { flushExpiredSessions, sync };