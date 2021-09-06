const adminDBOperation = require('../helpers/adminDBOperation');

module.exports.login = (req, res) => {
    res.render('login');
};

module.exports.verifyLogin = async (req, res) => {
    const data = await adminDBOperation.find(req.body);
    if (data[0]) {
        res.redirect('/index');
    } else {
        res.send('Invalid login for admin');
    }
};
