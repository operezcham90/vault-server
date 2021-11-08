#!/bin/bash
apt-get -y update
apt-get -y upgrade
apt-get -y install openssh-server
/etc/init.d/ssh start
apt-get -y install curl
curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
apt-get -y install nodejs
apt-get -y install git