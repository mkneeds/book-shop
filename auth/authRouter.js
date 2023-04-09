const Router = require('express')
const router = new Router()
const controller = require('./authController')
const {check} = require("express-validator")
const authMiddleware = require('../middleware/authMiddleware')
const roleMiddleware = require('../middleware/roleMiddleware')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const Product = require("../cart/Product");
const multer = require("multer");



router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(cookieParser());

const storage = multer.diskStorage({
    destination: 'C:\\Users\\User\\Desktop\\book-store\\images\\server',
    filename: function(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}.png`);
    }
});
const upload = multer({ storage: storage });

router.post('/registration', [
    check('username', "Имя пользователя не может быть пустым").notEmpty(),
    check('password', "Пароль должен быть больше 4 и меньше 10 символов").isLength({min:4, max:10})
], controller.registration)
router.post('/login', controller.login)
router.get('/users', roleMiddleware(["ADMIN"]), controller.getUsers);
router.get('/logout',authMiddleware,(req,res)=>{
    res.clearCookie('username');
    res.clearCookie('token');
    res.redirect('/');
})
router.get('/profile', authMiddleware,controller.getProfile);
router.post('/forgot-password', controller.forgotPassword);
router.post('/edit-profile',authMiddleware,controller.editProfile);
router.post('/delete-user',roleMiddleware(["ADMIN"]),controller.deleteUser);
router.post('/update-roles',roleMiddleware(["ADMIN"]),controller.updateRoles);
router.post('/delete-product',roleMiddleware(["ADMIN"]),controller.deleteProduct);
router.post('/send',roleMiddleware(["ADMIN"]),controller.sendEmail);
router.post('/add-product',roleMiddleware(["ADMIN"]), upload.single('image'), async (req, res, next) => {
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        quantity: req.body.quantity,
        image: {
            data: req.file.buffer,
            contentType: 'image/png'
        },
        imageName: req.file.filename
    });

    try {
        const savedProduct = await product.save();
        res.redirect('/products/all');
    } catch (err) {
        next(err);
    }
});

module.exports = router