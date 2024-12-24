#!/bin/bash

if [ ! -d "/var/www/html/vendor" ]; then
    composer install --no-interaction --optimize-autoloader
fi

if [ ! -d "/var/www/html/node_modules" ]; then
    npm install
fi

if [ ! -d "/var/www/html/public/build" ]; then
    npm run dev
fi

if [ ! -d "/var/www/html/config/secrets" ]; then
    ./bin/console secrets:generate-keys
fi

./bin/console doctrine:migrations:migrate --no-interaction

exec "$@"
