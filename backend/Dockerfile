FROM php:8.0.5-fpm-alpine

RUN apk update && apk add openssl zip unzip git mysql-client php8-pdo_mysql php8-mysqli

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN docker-php-ext-install mysqli pdo pdo_mysql && docker-php-ext-enable pdo_mysql

#RUN docker-php-ext-install mysqli pdo pdo_mysql
#RUN docker-php-ext-install pdo mbstring pdo_mysql


WORKDIR /app/backend
COPY . .
RUN composer install

EXPOSE 8000
CMD php artisan serve --host=0.0.0.0