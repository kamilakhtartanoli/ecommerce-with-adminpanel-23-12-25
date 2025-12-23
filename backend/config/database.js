const mongoose = require('mongoose')

const database = async (req, res) => {
    const url = process.env.databaselink
    try {
        const response = await mongoose.connect(url, {
            serverSelectionTimeoutMS: 30000 // ✅ added (30 seconds)
        })
        console.log(`database-connected-successfully`)
    } catch (error) {
        console.log(`database-not-connected ${error.message}`)
    }
}

module.exports = { database }
