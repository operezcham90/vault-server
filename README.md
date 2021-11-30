# Vault Server
A local storage server to organize home files 🏠

## Requirements
* A computer 💻
* An external hard drive 💿
* A local area network 🌐

## Installation
* Install [Ubuntu 20.04 LTS](https://releases.ubuntu.com/20.04/)
* Install [SSH](https://www.openssh.com/) (optional)
```
sudo apt-get update
sudo apt-get -y install openssh-server
```
* Run [setup.sh](https://github.com/operezcham90/vault-server/blob/master/setup.sh)
```
wget https://raw.githubusercontent.com/operezcham90/vault-server/master/setup.sh
chmod +x setup.sh
sudo ./setup.sh
```

## References
* [AdonisJS 4 docs](https://legacy.adonisjs.com/docs/4.1/installation)