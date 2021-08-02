const express = require('express');
const db = require('./db/connection');
const apiRoutes = require('./routes/apiRoutes');
const index = require('./index')

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', index)

app.use((req, res) => {
    res.status(404).end();
})

db.connect(err => {
    if (err) throw err;
    app.listen(PORT, () => { })
})