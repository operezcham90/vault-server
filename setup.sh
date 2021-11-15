#!/bin/bash
mkdir /home/server
cd /home/server
apt -y update
apt -y install git
apt -y install npm
apt -y install sqlite3
git clone https://github.com/operezcham90/vault-server.git .
npm install
printf "PORT=80\n" >> .env
printf "CACHE_VIEWS=false\n" >> .env
printf "HASH_DRIVER=bcrypt\n" >> .env
printf "DB_DATABASE=adonis\n" >> .env
printf "NODE_ENV=development\n" >> .env
printf "SESSION_DRIVER=cookie\n" >> .env
printf "APP_KEY=" >> .env
uuidgen -r >> .env
printf "DB_PASSWORD=" >> .env
printf "HOST=" >> .env
ip addr | grep 'state UP' -A2 | tail -n1 | awk '{print $2}' | cut -f1  -d'/' >> .env
node ace.js migration:run --force