#!/bin/bash

# base packages
apt -y update
apt -y install git
apt -y install npm
apt -y install postgresql
apt -y install toilet

# main folder
rm -R /home/serv
mkdir /home/serv
cd /home/serv

# source code
git clone https://github.com/operezcham90/vault-server.git .
npm install

# environment
printf "APP_KEY=" >> .env
uuidgen -r >> .env
echo "HOST=0.0.0.0" >> .env
echo "PORT=80" >> .env

# database
sudo -u postgres createdb vault
sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'pass';"
node ace.js migration:run

# daemon
npm install pm2 -g
pm2 start server.js
pm2 restart server.js
pm2 save
pm2 startup

# end notes
toilet -kf script "Vault Server"
echo "Vault Server installed."
echo "Main folder: /home/serv"
echo "Current IP address:"
hostname -I
