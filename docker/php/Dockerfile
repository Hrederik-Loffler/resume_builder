FROM php:8-fpm

RUN apt-get update && \
    apt-get install -y --allow-remove-essential --no-install-recommends \
        wget \
        libmemcached-dev \
        libz-dev \
        libpq-dev \
        libjpeg-dev \
        libpng-dev \
        libfreetype6-dev \
        libssl-dev \
        libmcrypt-dev \
        openssh-server \
        libmagickwand-dev \
        git \
        cron \
        nano \
        libxml2-dev \
        bash nano curl libzip-dev supervisor findutils \
        zip libzip-dev \
        && docker-php-ext-configure zip \
        && docker-php-ext-install zip \
        && docker-php-ext-install soap \
        && docker-php-ext-install exif \
        && docker-php-ext-install pcntl \
        && docker-php-ext-install zip \
        && docker-php-ext-install pdo_mysql \
        && docker-php-ext-install bcmath \
        && docker-php-ext-install gd \
        && curl -sS https://getcomposer.org/installer -o composer-setup.php \
        && php composer-setup.php --install-dir=/usr/local/bin --filename=composer

RUN groupadd -g 1000 developer
RUN useradd -d /home/developer -s /bin/bash -u 1000 -g 1000 developer
RUN mkdir /home/developer
RUN chown -R developer:developer /home/developer
USER developer

WORKDIR /var/www/resume
