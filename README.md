# openapi-swagger
# تحقیق OpenAPI (Swagger) - درس برنامه نویسی وب

این مخزن شامل تحقیق جامع درباره OpenAPI (Swagger) و مثال عملی آن است.

## ساختار پروژه

```
.
├── LICENSE
├── README.md
└── docs
    ├── examples
    │   ├── main-example-code.js
    │   └── swagger.yaml
    ├── how-to-install.md
    ├── images
    │   ├── request-response-example.png
    │   ├── send-request-example.png
    │   ├── swagger-architecture.png
    │   └── swagger-ui-example.png
    ├── research-paper.md
    └── video
        └── video-link.txt
```

## نحوه اجرا

### پیش نیازها

bash
node --version  # باید >= 14 باشد
npm --version   # باید >= 6 باشد

### اجرای مثال

bash
cd examples/basic-api
npm install
npm start

سپس مراجعه کنید به:
- API: http://localhost:3000
- مستندات: http://localhost:3000/api-docs

## محتوای تحقیق

1. **بیان مسئله**: مشکلات مستندسازی API
2. **معرفی OpenAPI**: ویژگی‌ها و مزایا
3. **مثال عملی**: API مدیریت کاربران با Node.js
4. **مراجع**: 10 منبع معتبر

## ویژگی‌های مثال عملی

- ✅ API کامل CRUD برای مدیریت کاربران
- ✅ مستندسازی خودکار با Swagger
- ✅ رابط تعاملی برای تست
- ✅ اعتبارسنجی داده‌ها
- ✅ کد فارسی و قابل فهم

---

**تاریخ تحویل**: ۲۰ شهریورماه 1404  
**درس**: برنامه نویسی وب  
**مدرس**: استاد پورسلطانی
