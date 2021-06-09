const mongoose = require('mongoose');
const app = require('./app');
const PORT = process.env.PORT;


database = process.env.DATABASE;
mongoose.connect(database).then(connection => {
    console.log('DB Connection Successful')
})

app.listen(PORT, () => {
    console.log(`App Running on port ${PORT}...`)
})