#!/bin/bash
mkdir /home/server
cd /home/server
echo "* Folder ready."

apt -y update
echo "* Packages updated."

apt -y install git
git clone https://github.com/operezcham90/vault-server.git .
printf "APP_KEY=" >> .env
uuidgen -r >> .env
printf "HOST=" >> .env
hostname -I >> .env
cat resources/env >> .env
echo "* Git installed."

apt -y install postgresql
sudo -u postgres createdb adonis
echo "* PostgreSQL installed."

apt -y install npm
npm install
printf "#!/bin/bash\n" >> /usr/local/bin/vault
printf "npm --prefix /home/server start" >> /usr/local/bin/vault
chmod +x /usr/local/bin/vault
echo "* npm installed."
echo "Type vault to start."