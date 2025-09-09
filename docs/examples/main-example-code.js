const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// داده‌های نمونه
let users = [{
    id: 1,
    name: 'احمد محمدی',
    email: 'ahmad@example.com',
    age: 25
},
    {
        id: 2,
        name: 'فاطمه احمدی',
        email: 'fateme@example.com',
        age: 30
    }
];

// تنظیمات Swagger
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API مدیریت کاربران',
            version: '1.0.0',
            description: 'یک API ساده برای مدیریت کاربران با استفاده از OpenAPI',
            contact: {
                name: 'تیم توسعه',
                email: 'support@example.com'
            },
            license: {
                name: 'MIT',
                url: 'https://opensource.org/licenses/MIT'
            }
        },
        servers: [{
            url: `http://localhost:${PORT}`,
            description: 'سرور توسعه'
        }],
        components: {
            schemas: {
                User: {
                    type: 'object',
                    required: ['name', 'email'],
                    properties: {
                        id: {
                            type: 'integer',
                            description: 'شناسه یکتای کاربر',
                            example: 1
                        },
                        name: {
                            type: 'string',
                            description: 'نام کاربر',
                            example: 'احمد محمدی'
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'ایمیل کاربر',
                            example: 'ahmad@example.com'
                        },
                        age: {
                            type: 'integer',
                            minimum: 1,
                            maximum: 120,
                            description: 'سن کاربر',
                            example: 25
                        }
                    }
                },
                UserInput: {
                    type: 'object',
                    required: ['name', 'email'],
                    properties: {
                        name: {
                            type: 'string',
                            description: 'نام کاربر'
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'ایمیل کاربر'
                        },
                        age: {
                            type: 'integer',
                            minimum: 1,
                            maximum: 120,
                            description: 'سن کاربر'
                        }
                    }
                },
                Error: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string',
                            description: 'پیام خطا'
                        },
                        code: {
                            type: 'integer',
                            description: 'کد خطا'
                        }
                    }
                }
            }
        }
    },
    apis: ['./app.js'], // مسیر فایل‌هایی که حاوی annotation های OpenAPI هستند
};

const specs = swaggerJsdoc(options);

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: "مستندات API کاربران"
}));

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: دریافت لیست تمام کاربران
 *     description: این endpoint لیست تمام کاربران موجود در سیستم را برمی‌گرداند
 *     tags: [کاربران]
 *     responses:
 *       200:
 *         description: لیست کاربران با موفقیت دریافت شد
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *             example:
 *               - id: 1
 *                 name: "احمد محمدی"
 *                 email: "ahmad@example.com"
 *                 age: 25
 *               - id: 2
 *                 name: "فاطمه احمدی"
 *                 email: "fateme@example.com"
 *                 age: 30
 *       500:
 *         description: خطای سرور
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
app.get('/api/users', (req, res) => {
    try {
        res.json(users);
    } catch (error) {
        res.status(500).json({
            message: 'خطا در دریافت کاربران',
            code: 500
        });
    }
});

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: دریافت اطلاعات یک کاربر بر اساس ID
 *     tags: [کاربران]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: شناسه عددی کاربر
 *         example: 1
 *     responses:
 *       200:
 *         description: اطلاعات کاربر
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: کاربر یافت نشد
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: "کاربر یافت نشد"
 *               code: 404
 */
app.get('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({
            message: 'کاربر یافت نشد',
            code: 404
        });
    }

    res.json(user);
});

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: ایجاد کاربر جدید
 *     tags: [کاربران]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *           example:
 *             name: "علی رضایی"
 *             email: "ali@example.com"
 *             age: 28
 *     responses:
 *       201:
 *         description: کاربر با موفقیت ایجاد شد
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: داده‌های ورودی نامعتبر
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
app.post('/api/users', (req, res) => {
    const {
        name,
        email,
        age
    } = req.body;

    // اعتبارسنجی ساده
    if (!name || !email) {
        return res.status(400).json({
            message: 'نام و ایمیل الزامی هستند',
            code: 400
        });
    }

    // بررسی تکراری بودن ایمیل
    if (users.find(u => u.email === email)) {
        return res.status(400).json({
            message: 'این ایمیل قبلاً استفاده شده است',
            code: 400
        });
    }

    const newUser = {
        id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
        name,
        email,
        age: age || null
    };

    users.push(newUser);
    res.status(201).json(newUser);
});

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: به‌روزرسانی اطلاعات کاربر
 *     tags: [کاربران]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: شناسه کاربر
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       200:
 *         description: کاربر با موفقیت به‌روزرسانی شد
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: کاربر یافت نشد
 */
app.put('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === id);

    if (userIndex === -1) {
        return res.status(404).json({
            message: 'کاربر یافت نشد',
            code: 404
        });
    }

    const {
        name,
        email,
        age
    } = req.body;

    if (!name || !email) {
        return res.status(400).json({
            message: 'نام و ایمیل الزامی هستند',
            code: 400
        });
    }

    users[userIndex] = {
        ...users[userIndex],
        name,
        email,
        age
    };
    res.json(users[userIndex]);
});

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: حذف کاربر
 *     tags: [کاربران]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: شناسه کاربر
 *     responses:
 *       200:
 *         description: کاربر با موفقیت حذف شد
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "کاربر با موفقیت حذف شد"
 *       404:
 *         description: کاربر یافت نشد
 */
app.delete('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === id);

    if (userIndex === -1) {
        return res.status(404).json({
            message: 'کاربر یافت نشد',
            code: 404
        });
    }

    users.splice(userIndex, 1);
    res.json({
        message: 'کاربر با موفقیت حذف شد'
    });
});

// Route اصلی
app.get('/', (req, res) => {
    res.json({
        message: 'به API مدیریت کاربران خوش آمدید!',
        documentation: `http://localhost:${PORT}/api-docs`
    });
});

app.listen(PORT, () => {
    console.log(`🚀 سرور در حال اجراست: http://localhost:${PORT}`);
    console.log(`📚 مستندات API: http://localhost:${PORT}/api-docs`);
});

module.exports = app;