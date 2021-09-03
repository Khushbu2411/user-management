// import connection file
const validator = require('../service/validator');

const DBOperation = require('../helpers/DBOperation');

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports.index = (req, res) => {
    res.render('index');
};

module.exports.userinfo = async (req, res) => {
    const data = await DBOperation.findValidId();
    res.render('userinfo', { data });
};

module.exports.create = (req, res) => {
    res.render('users');
};

module.exports.update = (req, res) => {
    res.render('update');
};

module.exports.users = async (req, res) => {
    const query = {};
    // eslint-disable-next-line quote-props
    if (req.query.firstname) query.firstname = capitalizeFirstLetter(req.query.firstname);
    if (req.query.age) query.age = parseInt(req.query.age, 10);
    if (req.query.mobile) query.mobile = req.query.mobile;
    if (req.query.email) query.email = req.query.email;
    if (req.query.lastname) query.lastname = capitalizeFirstLetter(req.query.lastname);
    if (req.query.address) query.address = req.query.address;
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

module.exports.user = async (req, res) => {
    try {
        const {
            firstName: firstname,
            lastName: lastname,
            email,
            password,
            age,
            mobile,
            address,
            active,
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
            res.send('Successfully inserted');
        } else {
            res.render('404', { message: data });
        }
    } catch {
        res.status(500)
            .send('Something went wrong on server side. ');
    }
};

module.exports.userById = async (req, res) => {
    try {
        const query = { id: parseInt(req.params.id, 10) };
        const data = await DBOperation.find(query);
        res.render('displayparticular', { data });
    } catch {
        res.status(500)
            .send('Something went wrong on server side. ');
    }
};

module.exports.updateById = async (req, res) => {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        const err = 'No data provided to update';
        res.status(400)
            .send(err);
    }
    if (validator.verifyRequest(req.body)) {
        try {
            const data = await DBOperation.update(req.params.id, req.body);
            if (data === true) {
                res.send('Successfully updated');
            } else {
                res.status(400)
                    .send('Couldn\'t update. Id don\'t exist ');
            }
        } catch {
            res.status(500)
                .send('Something went wrong on server side. ');
        }
    } else {
        res.send('Invalid field');
    }
};

module.exports.delete = (req, res) => {
    console.log(req.params.id);
};
