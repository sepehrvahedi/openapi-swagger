## 🔧 نصب و راه‌اندازی محلی Swagger

این بخش راهنمای کاملی برای نصب و استفاده از ابزارهای Swagger در محیط محلی توسعه ارائه می‌دهد.

### پیش‌نیازها

قبل از شروع، اطمینان حاصل کنید که موارد زیر روی سیستم شما نصب شده باشد:

#### الزامی:
- **Node.js** (نسخه 14 یا بالاتر) - [دانلود از nodejs.org](https://nodejs.org/)
- **npm** یا **yarn** (به‌همراه Node.js نصب می‌شود)

#### اختیاری (برای تولید فایل OpenAPI):
- **Python 3.7+** و **pip** (برای استفاده از ابزارهای Python-based)
- **Java 11+** (برای استفاده از OpenAPI Generator)
- **Docker** (برای اجرای containerized)

---

### 🛠️ روش اول: نصب Swagger UI

#### نصب گلوبال Swagger UI

```bash
# نصب Swagger UI Server
npm install -g swagger-ui-serve

# یا با استفاده از yarn
yarn global add swagger-ui-serve
```

#### اجرای Swagger UI

```bash
# اجرای Swagger UI با فایل OpenAPI
swagger-ui-serve openapi.yaml

# یا برای فایل JSON
swagger-ui-serve openapi.json

# تعیین پورت سفارشی
swagger-ui-serve -p 8080 openapi.yaml
```

پس از اجرای دستور، رابط کاربری در آدرس `http://localhost:3000` (یا پورت انتخابی) در دسترس خواهد بود.

---

### 🐳 روش دوم: استفاده از Docker

#### اجرای سریع با Docker

```bash
# دانلود و اجرای Swagger UI
docker run -p 8080:8080 -e SWAGGER_JSON=/app/openapi.yaml -v $(pwd):/app swaggerapi/swagger-ui

# برای Windows PowerShell
docker run -p 8080:8080 -e SWAGGER_JSON=/app/openapi.yaml -v ${PWD}:/app swaggerapi/swagger-ui
```

#### ایجاد Dockerfile سفارشی

```dockerfile
# Dockerfile
FROM swaggerapi/swagger-ui:latest

# کپی فایل OpenAPI به container
COPY openapi.yaml /usr/share/nginx/html/

# تنظیم متغیر محیطی
ENV SWAGGER_JSON=/usr/share/nginx/html/openapi.yaml

EXPOSE 8080
```

```bash
# ساخت و اجرای Docker image
docker build -t my-swagger-ui .
docker run -p 8080:8080 my-swagger-ui
```

---

### 📝 روش سوم: نصب Swagger Editor (ویرایشگر)

#### نصب Swagger Editor

```bash
# نصب Swagger Editor
npm install -g swagger-editor-dist

# اجرای ویرایشگر
swagger-editor-serve

# یا با پورت سفارشی
swagger-editor-serve -p 8081
```

#### استفاده از Docker برای Editor

```bash
docker run -d -p 8081:8080 swaggerapi/swagger-editor
```

---

### ⚙️ تولید خودکار فایل OpenAPI

#### با استفاده از Python و Flask-RESTX

```bash
# نصب پیش‌نیازهای Python
pip install flask flask-restx

# یا از requirements.txt
pip install -r requirements.txt
```

**فایل `requirements.txt`:**

```txt
flask>=2.0.0
flask-restx>=1.0.0
marshmallow>=3.0.0
apispec>=6.0.0
```

**کد نمونه برای تولید OpenAPI:**

```python
# app.py
from flask import Flask
from flask_restx import Api, Resource, fields

app = Flask(__name__)
api = Api(app, doc='/docs/', title='User API', version='1.0.0')

# تعریف مدل User
user_model = api.model('User', {
    'id': fields.Integer(required=True, description='User ID'),
    'name': fields.String(required=True, description='User name'),
    'email': fields.String(required=True, description='User email')
})

@api.route('/users')
class UserList(Resource):
    @api.marshal_list_with(user_model)
    def get(self):
        """دریافت لیست کاربران"""
        return [{'id': 1, 'name': 'John', 'email': 'john@example.com'}]

if __name__ == '__main__':
    app.run(debug=True)
```

```bash
# اجرای برنامه
python app.py

# فایل OpenAPI در آدرس زیر قابل دسترسی است:
# http://localhost:5000/swagger.json
```

---

### 🔄 تولید کد کلاینت با OpenAPI Generator

#### نصب OpenAPI Generator

```bash
# نصب با npm
npm install -g @openapitools/openapi-generator-cli

# یا دانلود JAR file
wget https://repo1.maven.org/maven2/org/openapitools/openapi-generator-cli/7.0.1/openapi-generator-cli-7.0.1.jar
```

#### تولید کد کلاینت

```bash
# تولید کد JavaScript/TypeScript
openapi-generator-cli generate -i openapi.yaml -g javascript -o ./client-js

# تولید کد Python
openapi-generator-cli generate -i openapi.yaml -g python -o ./client-python

# تولید کد Java
openapi-generator-cli generate -i openapi.yaml -g java -o ./client-java

# لیست تمام generators موجود
openapi-generator-cli list
```

---

### 🧪 تست و اعتبارسنجی

#### نصب ابزارهای تست

```bash
# نصب Swagger Validator
npm install -g swagger-parser

# نصب Dredd برای API testing
npm install -g dredd
```

#### اعتبارسنجی فایل OpenAPI

```bash
# بررسی صحت فایل OpenAPI
swagger-parser validate openapi.yaml

# تست API با Dredd
dredd openapi.yaml http://localhost:3000
```

---

### 📋 اسکریپت‌های مفید

#### `package.json` برای پروژه Node.js

```json
{
  "name": "my-api-docs",
  "version": "1.0.0",
  "scripts": {
    "docs": "swagger-ui-serve openapi.yaml",
    "validate": "swagger-parser validate openapi.yaml",
    "generate-client": "openapi-generator-cli generate -i openapi.yaml -g javascript -o ./client",
    "docker-docs": "docker run -p 8080:8080 -v $(pwd):/app -e SWAGGER_JSON=/app/openapi.yaml swaggerapi/swagger-ui"
  },
  "devDependencies": {
    "swagger-ui-serve": "^4.15.5",
    "swagger-parser": "^10.0.3",
    "@openapitools/openapi-generator-cli": "^2.7.0"
  }
}
```

#### اجرای اسکریپت‌ها

```bash
# نمایش مستندات
npm run docs

# اعتبارسنجی فایل
npm run validate

# تولید کد کلاینت
npm run generate-client

# اجرای Docker
npm run docker-docs
```

---

### ⚡ نکات مفید

1. **Hot Reload**: برای تغییرات خودکار، از `swagger-ui-serve` با پارامتر `--watch` استفاده کنید
2. **CORS Issues**: در صورت بروز مشکل CORS، از `--cors` فلگ استفاده کنید
3. **Custom Theme**: می‌توانید ظاهر Swagger UI را سفارشی‌سازی کنید
4. **Environment Variables**: برای تنظیمات مختلف از متغیرهای محیطی استفاده کنید

با این راهنما می‌توانید به راحتی Swagger را در محیط محلی راه‌اندازی کرده و از قابلیت‌های آن بهره‌برداری کنید.