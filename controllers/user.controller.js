// import connection file
const validator = require('../service/validator');

const DBOperation = require('../helpers/DBOperation');

module.exports.signupPage = (req, res) => {
    res.render('signup');
};

module.exports.indexPage = (req, res) => {
    res.render('index');
};

module.exports.deletePage = (req, res) => {
    res.render('delete', { id: req.query.id });
};

module.exports.userinfo = async (req, res) => {
    const data = await DBOperation.findValidId();
    res.render('userinfo', { data });
};

module.exports.registerPage = (req, res) => {
    res.render('users');
};

module.exports.updatePage = (req, res) => {
    res.render('update', { id: req.query.id });
};

module.exports.listAllUsers = async (req, res) => {
    const query = {};
    // eslint-disable-next-line quote-props
    // constructor with string pattern as first argument
    if (req.query.firstname) {
        const firstname = new RegExp(req.query.firstname, 'i');
        query.firstname = { $regex: firstname };
    }
    if (req.query.age) query.age = parseInt(req.query.age, 10);
    if (req.query.mobile) query.mobile = req.query.mobile;
    if (req.query.email) query.email = req.query.email;
    if (req.query.lastname) {
        const lastname = new RegExp(req.query.lastname, 'i');
        query.lastname = { $regex: lastname };
    }
    if (req.query.address) {
        const address = new RegExp(req.query.address, 'i');
        query.address = { $regex: address };
    }
    if (req.query.active === 'true') {
        query.active = true;
    } else if (req.query.active === 'false') {
        query.active = false;
    }
    try {
        const data = await DBOperation.find(query);
        res.render('display', { data });
    } catch {
        res.status(500)
            .send('Something went wrong on server side. ');
    }
};

module.exports.insertUser = async (req, res) => {
    try {
        if (req.body.confirmPassword) {
            if (req.body.confirmPassword !== req.body.password) {
                res.send('Password and confim password didn\'t match');
            }
        }
        const {
            firstName: firstname,
            lastName: lastname = '',
            email,
            password,
            age = 0,
            mobile = '',
            address = '',
            active = '',
            likes = '',
        } = req.body;
        const likesArr = likes.split(',');
        let setActive = false;
        if (active === 'true' || active === 'True') {
            setActive = true;
        }
        const id = await DBOperation.findId();
        // eslint-disable-next-line prefer-const
        let myObj = {
            id: id[0].id + 1,
            firstname,
            lastname,
            email,
            password,
            age,
            mobile,
            address,
            active: setActive,
            likes: likesArr,
        };
        const data = await validator.validateInsertion(myObj);
        if (data === 'Success') {
            res.render('insert');
        } else {
            res.render('404', { message: data });
        }
    } catch {
        res.status(500)
            .send('Something went wrong on server side. ');
    }
};

module.exports.getUserById = async (req, res) => {
    try {
        const query = { id: parseInt(req.params.id, 10) };
        const data = await DBOperation.find(query);
        res.render('displayparticular', { data });
    } catch {
        res.status(500)
            .send('Something went wrong on server side. ');
    }
};

// eslint-disable-next-line consistent-return
module.exports.updateById = async (req, res) => {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        const err = 'No data provided to update';
        return res.status(400)
            .send(err);
    }
    const bodyObj = (validator.verifyRequest(req.body));
    try {
        const data = await DBOperation.update(req.params.id, bodyObj);
        if (data === true) {
            // eslint-disable-next-line prefer-template
            const url = '/user/' + req.params.id;
            res.send('updated');
        } else {
            res.status(400)
                .send('Couldn\'t update. Id don\'t exist ');
        }
    } catch (err) {
        console.log(err);
        res.status(500)
            .send('Something went wrong on server side. ');
    }
};

module.exports.delete = async (req, res) => {
    try {
        const data = await DBOperation.delete(parseInt(req.params.id, 10));
        if (data.deletedCount === 1) {
            res.send('Successfully deleted');
        } else {
            res.send('Can\'t delete. Id doesn\'t exist.');
        }
    } catch {
        res.status(500)
            .send('Something went wrong on server side. ');
    }
};
