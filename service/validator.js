const DBOperation = require('../helpers/DBOperation');

module.exports.verifyRequest = (body) => {
    const validKeys = {
        firstname: true,
        lastname: true,
        email: true,
        age: true,
        mobile: true,
        active: true,
        address: true,
    };
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < Object.keys(body).length; i++) {
        if (!validKeys[Object.keys(body)[i]]) {
            return false;
        }
    }
    return true;
};

// eslint-disable-next-line consistent-return
module.exports.validateInsertion = async (myObj) => {
    const existEmail = await DBOperation.findOne({ email: myObj.email });
    const existMobile = await DBOperation.findOne({ mobile: myObj.mobile });
    if (existEmail != null) {
        return 'Email already exists';
    // eslint-disable-next-line no-else-return
    } else if (existMobile != null) {
        return 'Mobile already exists';
    } else if ((myObj.password).length < 8) {
        return 'Password length is small. It should be minimum 8 character long';
    } else if ((myObj.mobile).length !== 10) {
        return 'Mobile digit value should be equal to 10';
    } else {
        console.log(myObj);
        const result = await DBOperation.insert(myObj);
        console.log(result);
        if (result) {
            return 'Success';
        }
    }
};
