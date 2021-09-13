const jwt = require('jsonwebtoken');

const config = require('../config');

// eslint-disable-next-line consistent-return
module.exports.verifyUserToken = (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) return res.status(401).send('Access Denied / Unauthorized request');

    try {
        // eslint-disable-next-line prefer-destructuring
        // token = token.[1]; // Remove Bearer from string
        if (token === 'null' || !token) return res.status(401).send('Unauthorized request');
        const verifiedUser = jwt.verify(token.token, config.TOKEN_SECRET);
        // config.TOKEN_SECRET => 'secretKey'
        if (!verifiedUser) return res.status(401).send('Unauthorized request');
        req.user = verifiedUser;
        next();
    } catch (error) {
        res.status(400).send('Invalid Token');
    }
};
