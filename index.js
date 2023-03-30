const express = require('express')
const path = require('path');
const mongoose = require('mongoose')
const authRouter = require('./auth/authRouter')
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000


const app = express()


app.use(express.json())
app.use("/auth", authRouter)
app.use(express.static(path.join(__dirname)));

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
            res.sendFile(`C:\\Users\\User\\Desktop\\booksaw-book-store-html-template\\index.html`);
        });
       app.get('/shop', (req, res) => {
           res.sendFile(`C:\\Users\\User\\Desktop\\booksaw-book-store-html-template\\shop.html`);
       });

        app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}


start()