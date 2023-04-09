const express = require('express');
const router = express.Router();
const Product = require('../cart/Product');
const productController = require('../cart/productController')
const multer = require('multer');
const authRouter = require("../auth/authRouter");
const authMiddleware = require('../middleware/authMiddleware')
const {getCart} = require("./productController");
const roleMiddleware = require('../middleware/roleMiddleware')


const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');


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

router.use("/auth", authRouter);
// Обработчик GET-запроса для отображения формы добавления продукта
router.get('/add',roleMiddleware(["ADMIN"]), (req, res) => {
    res.render('C:\\Users\\User\\Desktop\\book-store\\views\\add_product.dust');
});

router.get('/all',productController.getAllProductsAndCategories);
router.get('/cart',authMiddleware,productController.getCart);
router.post('/order',authMiddleware,productController.createOrder)
router.post('/', upload.single('image'), async (req, res, next) => {
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
        res.redirect('/products');
    } catch (err) {
        next(err);
    }
});



module.exports = router;
