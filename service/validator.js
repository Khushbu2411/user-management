const DBOperation = require('../helpers/DBOperation');

module.exports.verifyRequest = (body) => {
    // const validKeys = {
    //     firstname: true,
    //     lastname: true,
    //     email: true,
    //     age: true,
    //     mobile: true,
    //     active: true,
    //     address: true,
    // };
    // // eslint-disable-next-line no-plusplus
    // for (let i = 0; i < Object.keys(body).length; i++) {
    //     if (!validKeys[Object.keys(body)[i]]) {
    //         return false;
    //     }
    // }
    const bodyObj = { };
    const keys = Object.keys(body);
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < keys.length; i++) {
        if (body[keys[i]]) {
            bodyObj[keys[i]] = body[keys[i]];
        }
    }
    if (bodyObj.age) {
        bodyObj.age = parseInt(bodyObj.age, 10);
    }
    if (bodyObj.active) {
        if (bodyObj.active === 'true') {
            bodyObj.active = true;
        } else if (bodyObj.active === 'false') {
            bodyObj.active = false;
        }
    }
    return bodyObj;
};

// eslint-disable-next-line consistent-return
module.exports.validateInsertion = async (myObj) => {
    if (myObj.email !== '') {
        const existEmail = await DBOperation.findOne({ email: myObj.email });
        if (existEmail != null) {
            return 'Email already exists.';
        }
    }
    if (myObj.mobile !== '') {
        const existMobile = await DBOperation.findOne({ mobile: myObj.mobile });
        if (existMobile != null) {
            return 'Mobile already exists.';
        }
    }
    console.log(myObj.password);
    if ((myObj.password).length < 8) {
        return 'Password length is small. It should be minimum 8 character long.';
    // eslint-disable-next-line no-else-return
    } else if (myObj.mobile !== '' && myObj.mobile.length !== 10) {
        return 'Mobile digit value should be equal to 10.';
    } else {
        const result = await DBOperation.insert(myObj);
        if (result) {
            return 'Success';
        }
    }
};
