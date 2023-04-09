const User = require('./User')
const Role = require('./Role')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator')
const {secret} = require("./config")
const http = require('http');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const multer = require("multer");


const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret, {expiresIn: "24h"} )
}

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Ошибка при регистрации", errors})
            }
            const {username, password, email, fullName} = req.body;

            const candidate = await User.findOne({username})
            if (candidate) {
                return res.status(400).json({message: "Пользователь с таким именем уже существует"})
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({value: "USER"})
            const user = new User({username, password: hashPassword, roles: [userRole.value], fullName, email})
            await user.save()
            return res.json({message: "Пользователь успешно зарегистрирован"})
        } catch (e) {
            console.log(e)

            res.status(400).json({message: 'Registration error'})
        }
    }

    async login(req, res) {
        try {
            const {username, password} = req.body
            const user = await User.findOne({username})
            if (!user) {
                return res.status(400).json({message: `Пользователь не найден`})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.status(400).json({message: `Введен неверный пароль`})
            }
            const token = generateAccessToken(user._id, user.roles)
            res.cookie('token', token, {httpOnly: true});
            res.cookie('username', username);
            res.status(200)
            res.redirect('/');
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Login error'})
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find()
            res.json(users)
        } catch (e) {
            console.log(e)
        }
    }

    async getProfile(req, res) {
        const Order = require('C:\\Users\\User\\Desktop\\book-store\\cart\\orderSchema.js')
        try {
            const username = req.cookies.username;

            const user = await User.findOne({username: username});
            const users = await User.find({});
            const roles = await Role.find({});
            const order = await Order.find({user:username})
            if (!user) {
                throw new Error("User not found");
            }
            res.render("C:\\Users\\User\\Desktop\\book-store\\views\\profile.dust", {user,order,users,roles});
        } catch (error) {
            console.error(error);
            res.render("Error");
        }
    }

    async forgotPassword(req, res) {
        try {

            const user = await User.findOne({email: req.body.email});
            if (!user) {
                return res.status(404).json({message: 'Пользователь с такой электронной почтой не найден'});
            }

            // Генерировать временный токен сброса пароля
            const token = crypto.randomBytes(20).toString('hex');

            // Сохранить токен и время его истечения в базе данных
            user.resetPasswordToken = token;
            user.resetPasswordExpires = Date.now() + 3600000; // токен истечет через 1 час
            await user.save();

            // Отправить электронное письмо с инструкциями по сбросу пароля
            const transporter = nodemailer.createTransport({
                host: 'smtp.mail.ru',
                port: 465,
                secure: true,
                auth: {
                    user: 'mkkiramk@mail.ru',
                    pass: 'eNT6F7gzjNetpKkzvhMk'
                },
                rejectUnauthorized: false
            });

            const mailOptions = {
                to: user.email,
                from: 'mkkiramk@mail.ru',
                subject: 'Восстановление пароля (The Victors`s Book Co.)',
                text: `Вы получили это письмо, потому что вы (или кто-то другой) запросили пароль для вашей учетной записи.\n\n` +
                    `Вот ваш пароль:\n\n` +
                    `${user.password}\n\n` +
                    `Если вы не запрашивали пароль, проигнорируйте это письмо.\n`
            };

            await transporter.sendMail(mailOptions);
            res.status(200).json({message: 'Письмо со ссылкой для сброса пароля отправлено на вашу электронную почту.'});

        } catch (error) {
            console.error(error);
            res.status(500).json({message: 'Произошла ошибка при отправке письма для сброса пароля. Попробуйте позже.'});
        }
    }

    async editProfile(req, res) {
        const storage = multer.diskStorage({
            destination: 'C:\\Users\\User\\Desktop\\book-store\\images\\server',
            filename: function (req, file, cb) {
                cb(null, `${file.fieldname}-${Date.now()}.png`);
            },
        });

        const upload = multer({ storage: storage });

        upload.single('image')(req, res, async function (err) {
            if (err) {
                console.log(err);
                return res.status(500).send('Произошла ошибка на сервере');
            }

            const {fullName, email, birthdate, address} = req.body;
            const username = req.cookies.username;
            const imageName = req.file.filename;

            try {
                const updatedUser = await User.findOneAndUpdate(
                    {username: username},
                    {fullName, email, birthdate, address, image: imageName},
                    {new: true}
                );

                res.send('Данные успешно обновлены');
            } catch (err) {
                console.log(err);
                res.status(500).send('Произошла ошибка на сервере');
            }
        });
    }
    async deleteUser(req, res) {
        try {
            console.log(111);
            const userId = req.body.userId;
            await User.findByIdAndDelete(userId);
            console.log(userId);
            res.status(200).json({ message: "Пользователь успешно удалён" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
    async updateRoles(req,res){
        try {
            const userId = req.body.userId;
            const roles = req.body.roles || [];
            const user = await User.findOne({ _id: userId });

            user.roles = roles;
            await user.save();
            res.status(200).json({ message: "Роли пользователя обновлены" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}
    module.exports = new authController()