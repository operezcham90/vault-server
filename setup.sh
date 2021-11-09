#!/bin/bash
apt -y update
apt -y install git
apt -y install nodejs-legacy
apt -y install postgresql
git clone https://github.com/operezcham90/vault-server.git
node vault-server/app/server.js