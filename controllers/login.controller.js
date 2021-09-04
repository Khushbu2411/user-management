module.exports.login = (req, res) => {
    res.render('login');
};

module.exports.verifyLogin = (req, res) => {
    if (req.body.login === 'admin') {
        if (req.body.password === 'admin123') {
            res.redirect('/index');
        } else {
            res.send('Wrong Password');
        }
    } else {
        res.send('Invalid login for admin');
    }
};
