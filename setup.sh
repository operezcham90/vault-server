#!/bin/bash

# install basic software
apt -y update
apt -y install git
apt -y install npm
apt -y install postgresql

# set main folder
mkdir /home/serv
cd /home/serv

# get source code
git clone https://github.com/operezcham90/vault-server.git .
npm install

# get random secret
printf "APP_KEY=" >> .env
uuidgen -r >> .env

# set local database
sudo -u postgres createdb vault
sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'pass';"
node ace.js migration:run

# set daemon process
npm install pm2 -g
pm2 start server.js
pm2 save

# end notes
echo "vault-server installed."
echo "Current IP address:"
hostname -I
