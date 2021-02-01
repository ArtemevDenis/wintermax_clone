const express = require('express');
const path = require('path');
const mysql = require("mysql2");
const config = require('config');
const bodyParser = require("body-parser");

const app = express();

app.use('/images', express.static('public'))

app.use(express.json({extended: true}))
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/news', require('./routes/news.routes'))
app.use('/api/products', require('./routes/products.routes'))
app.use('/api/userData', require('./routes/userData.routes'))
app.use('/api/cart', require('./routes/cart.routes'))
app.use('/api/orders', require('./routes/orders.routes'))
app.use('/api/promo', require('./routes/promoCodes.routes'))
app.use('/api/slider', require('./routes/slider.routes'))
app.use('/api/reviews', require('./routes/reviews.routes'))



const PORT = config.get('port') || 5000;

const connection = mysql.createPool({
    connectionLimit: 100,
    host: config.get('host'),
    user: config.get('user'),
    database: config.get('database'),
    password: config.get('password')
});

function twoDigits(d) {
    if (0 <= d && d < 10) return "0" + d.toString();
    if (-10 < d && d < 0) return "-0" + (-1 * d).toString();
    return d.toString();
}

Date.prototype.toMysqlFormat = function () {
    return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate()) + " " + twoDigits(this.getUTCHours()) + ":" + twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds());
};


if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, '_client', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '_client', 'build', 'index.html'))
    })
}

async function start() {
    try {
        app.listen(PORT, () => {
            console.log(`Start server on port ${PORT}...`);
        })
    } catch (e) {
        console.error('Server Error', e.message)
        process.exit(1);
    }
}

start();
global.connectionMYSQL = connection;