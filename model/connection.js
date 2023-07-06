const mongoose = require('mongoose')
const { schema } = require('mongoose');
const app = express();
const PORT = 4000;
//Connection to the mongodb database
const dbURL = 'mongodb://127.0.0.1:27017/HospitalApi'

const doctors = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true }
})
const connection = {}

collection.getDoctorsData = async () => {
    try {
        let dbConnection = await mongoose.connect(dbURL);
        let model = await dbConnection.model('doctors', doctors);
        return model;
    } catch (error) {
        let err = new Error("Could not connect to database");
        err.status = 500;
        throw err;
    }
}

module.exports = connection;