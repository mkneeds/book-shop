process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const express = require('express')
const path = require('path');
const mongoose = require('mongoose')
const authRouter = require('./auth/authRouter')
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000
const cons = require('consolidate');
const dust = require('dustjs-linkedin');
const productRoutes = require('./cart/productRoutes')

const app = express()


app.use(express.json());
app.use(express.static(path.join(__dirname)));
app.use("/auth", authRouter);

app.engine('dust', cons.dust);
app.set('view engine', 'dust');
app.set('views', path.join(__dirname, '/views'));


app.use(bodyParser.urlencoded({ extended: true }));
app.use('/products', productRoutes);

const start = async () => {
    try {
       await mongoose.connect('mongodb://localhost:27017/someRandomDB')
            .then(() => {
                console.log(`CONNECTED TO MONGO!`);
            })
            .catch((err) => {
                console.log(`OH NO! MONGO CONNECTION ERROR!`);
                console.log(err);
            })

        app.get('/', (req, res) => {
            res.render(`C:\\Users\\User\\Desktop\\book-store\\index.html`);
        });
        app.use(function(req, res, next) {
            res.status(404);
            res.sendFile('C:\\Users\\User\\Desktop\\book-store\\views\\error.html');
        });



        app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}


start()