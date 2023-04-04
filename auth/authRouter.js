const Router = require('express')
const router = new Router()
const controller = require('./authController')
const {check} = require("express-validator")
const authMiddleware = require('../middleware/authMiddleware')
const roleMiddleware = require('../middleware/roleMiddleware')
const Product = require('../cart/Product')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const multer = require("multer");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(cookieParser());



router.post('/registration', [
    check('username', "Имя пользователя не может быть пустым").notEmpty(),
    check('password', "Пароль должен быть больше 4 и меньше 10 символов").isLength({min:4, max:10})
], controller.registration)
router.post('/login', controller.login)
router.get('/users', roleMiddleware(["ADMIN"]), controller.getUsers)
router.get('/logout',authMiddleware,(req,res)=>{
    res.clearCookie('username');
    res.clearCookie('token');
    res.redirect('/');
})
router.get('/profile', authMiddleware,controller.getProfile)

router.post('/forgot-password', controller.forgotPassword);
router.post('/edit-profile',authMiddleware,controller.editProfile)

module.exports = router