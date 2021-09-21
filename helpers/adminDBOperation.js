const connectDB = require('./connectDB');

module.exports.find = async (query) => {
    const db = await connectDB();
    // eslint-disable-next-line quote-props
    const data = await db.collection('admin').find(query).toArray()
        .catch((err) => {
            console.log(`Error in admin database ${err}`);
        });
    return data;
};
