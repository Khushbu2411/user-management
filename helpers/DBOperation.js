const connectDB = require('./connectDB');

module.exports.update = async (id, body) => {
    const db = await connectDB();
    // eslint-disable-next-line quote-props
    const data = await db.collection('user').findOneAndUpdate({ id: parseInt(id, 10) }, { '$set': body });
    return data.lastErrorObject.updatedExisting;
};

module.exports.find = async (query) => {
    const db = await connectDB();
    const data = await db.collection('user').find(query).toArray();
    return data;
};

module.exports.insert = async (myObj) => {
    const db = await connectDB();
    const result = await db.collection('user').insertOne(myObj);
    return result;
};

module.exports.findOne = async (query) => {
    const db = await connectDB();
    const data = await db.collection('user').findOne(query);
    return data;
};

module.exports.findId = async () => {
    const db = await connectDB();
    const id = await db.collection('user').find().project({ id: 1, _id: 0 }).sort({ id: -1 })
        .limit(1)
        .toArray();
    return id;
};

module.exports.findValidId = async () => {
    const db = await connectDB();
    const id = await db.collection('user').find().project({ id: 1, _id: 0 })
        .toArray();
    return id;
};
