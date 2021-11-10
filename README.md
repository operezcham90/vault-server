# Introduction 📖
A local storage server to organize home files 🏠

# Requirements 📃
* A computer 💻
* An external hard drive 💿
* A local area network 🌐

# Installation ⚒
* Install [Ubuntu 16.04 LTS](https://releases.ubuntu.com/16.04/)
* Install SSH (optional)
```
sudo apt-get -y install openssh-server
sudo /etc/init.d/ssh start
```
* Run [setup.sh](https://github.com/operezcham90/vault-server/blob/master/setup.sh)
```
wget https://raw.githubusercontent.com/operezcham90/vault-server/master/setup.sh
chmod +x setup.sh
sudo ./setup.sh
```
* Run server
```
cd vault*
sudo npm start
```