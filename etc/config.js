module.exports = {
    port            : process.env.APP_PORT || 6666,
    startBalance    : 100,
    sessionDuration : '1h',
    secret          : process.env.SESSION_COOKIE_SECRET || 'fga7bsjiw9vsha5fukwnbxlw',
    salt            : 'faIomSvdUgdo2smp'
};
