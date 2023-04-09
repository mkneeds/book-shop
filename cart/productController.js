const Product = require('./Product');


exports.getAllProductsAndCategories = async (req, res) => {
    try {
        const products = await Product.find({});
        const categories = await Product.distinct('category');

        res.render('C:\\Users\\User\\Desktop\\book-store\\views\\products.dust', { products, categories });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

exports.getCart = (req, res) => {
    // Найти пользователя по имени
    let User =require('auth/User');
    User.findOne({ username: req.user.username })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'Пользователь не найден' });
            }

            // Получить массив корзины пользователя
            const cart = user.cart;

            // Сохранить массив в localStorage
            localStorage.setItem('myArray', JSON.stringify(cart));

            // Отправить успешный ответ
            res.status(200).json({ message: 'Массив успешно сохранен в localStorage' });
        })
        .catch(err => res.status(500).json({ message: err.message }));
};


exports.createOrder = async (req, res) => {
    const Order = require('C:\\Users\\User\\Desktop\\book-store\\cart\\orderSchema.js');
    const User = require('C:\\Users\\User\\Desktop\\book-store\\auth\\User.js');
    const Product = require('./Product')
    const username = req.cookies.username;
    const orders = req.body.orders;

    try {
        if (!orders || orders.length === 0) {
            return res.status(400).send({ message: 'Заказ не может быть пустым' });
        }

        for (const order of orders) {
            const { name, price, quantity } = order;

            const newOrder = new Order({
                user: username,
                productName: name,
                price: parseFloat(price.replace(/\$/g, '')),
                quantity,
            });
            await newOrder.save();
            await Product.updateOne({ name: name }, { $inc: { quantity: -quantity } });
        }

        await User.updateOne({ username: username }, { $set: { cart: [] } });

        res.status(201).send({ message: 'Заказ успешно оформлен!' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Ошибка при оформлении заказа' });
    }
};