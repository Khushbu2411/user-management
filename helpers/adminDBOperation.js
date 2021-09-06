const connectDB = require('./connectDB');

module.exports.find = async (query) => {
    const db = await connectDB();
    // eslint-disable-next-line quote-props
    const data = await db.collection('admin').find(query).toArray();
    return data;
};
