const path = require('path');
const result = require('dotenv').config({
    path: path.join(__dirname, `./.env.${process.env.NODE_ENV}`),
});

if (result.error) {
    throw new Error(result.error);
}

const express = require('express');
const cors = require('cors');
const { postgrator } = require('./lib/db');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/users', require('./routes/users'));
app.use('/pets', require('./routes/pets'));
app.use('/statuses', require('./routes/statuses'));
app.use('/hearties', require('./routes/hearties'));

const HOST = process.env.HOST;
const PORT = +process.env.PORT;

postgrator.migrate().then((result) => {
    console.log(`migrated db successfully:`, result)
    app.listen(PORT, HOST, () => {
        console.log(`server is listening at http://${HOST}:${PORT}`);
    });
}).catch(err => console.error(err));
