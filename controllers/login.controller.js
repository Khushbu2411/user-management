const bcrypt = require('bcryptjs');
const adminDBOperation = require('../helpers/adminDBOperation');

// eslint-disable-next-line import/order
const jwt = require('jsonwebtoken');

const config = require('../config');

module.exports.login = (req, res) => {
    res.render('login');
};

module.exports.logout = async (req, res) => {
    try {
        res.clearCookie('jwt');
        res.render('logout');
    } catch (error) {
        res.status(500).send(error);
    }
};

// eslint-disable-next-line consistent-return
module.exports.verifyLogin = async (req, res) => {
    try {
        const data = await adminDBOperation.find(req.body.username);
        if (data[0]) {
            const validPass = await bcrypt.compare(req.body.password, data[0].password);
            if (!validPass) return res.status(401).send('Password is wrong');
            // eslint-disable-next-line no-underscore-dangle
            const payload = { id: data[0]._id };
            // eslint-disable-next-line no-undef
            const token = jwt.sign(payload, config.TOKEN_SECRET);
            res.cookie('jwt', { token });
            res.status(200).header('auth-token', token).render('index');
        } else {
            res.send('Invalid login for admin');
        }
    } catch {
        res.status(500)
            .send('Something went wrong on server side. ');
    }
};
