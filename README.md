# Vault Server
A local storage server to organize home files 📦

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
* Navigate to `https://192.168.0.X`. Note: the HTTPS certificate is self-signed, accept the risk since the server is thrusted 

## References
* [Self Signed SSL/TLS Certificate with IP Address](https://nodeployfriday.com/posts/self-signed-cert/)
* [AdonisJs 4.1](https://legacy.adonisjs.com/docs/4.1/installation)
* [Water.css](https://watercss.kognise.dev/)
* [开启 SSL](https://kavience.github.io/adonisjs-cn/recipes/recipes/https.html)