# NestJS Template Project

This template project contains:

- NestJS v9.0
- Environment variables handling
- MySQL
- Redis
- Swagger
- API request body validator
- API response interceptor
- API exception handling
- Mocha test for service & controller


## Docker

* mysql: docker run -d -p 3306:3306 --name mysql -e MYSQL_ROOT_PASSWORD=[ROOT_PASSWORD] -e MYSQL_DATABASE=[DATABASE] -e MYSQL_USER=[USER] -e MYSQL_PASSWORD=[PASSWORD] mysql:5.7.39

* reids: docker run -d -p 6379:6379 --name redis:7.0.4-alpine3.16