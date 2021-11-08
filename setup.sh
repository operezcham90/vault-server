#!/bin/bash
apt-get update
apt-get upgrade
apt-get install openssh-server
/etc/init.d/ssh start
apt-get install curl
curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
apt-get install nodejs