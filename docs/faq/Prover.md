# Prover

Currently, only Linux mining is supported

### 1、Installing Dependencies

```
qbittorrent-nox
```

- Ubuntu ≥ 18.04

```
sudo apt-get update && sudo apt install -y axel software-properties-common dirmngr apt-transport-https lsb-release ca-certificates iproute2 curl wget libssl-dev && \
sudo add-apt-repository ppa:qbittorrent-team/qbittorrent-stable -y && \
sudo apt-get update && sudo apt-get install qbittorrent-nox -y
```

- CentOS ≥ 7.3

```
sudo yum -y install qbittorrent-nox
```

Source Address：[https://github.com/userdocs/qbittorrent-nox-static/](https://github.com/userdocs/qbittorrent-nox-static/)

**Please be sure to install the dependency as root, otherwise many unexpected problems may occur.**

### 2、Download the Prover binaries and grant them execution permission

Link for Download:[https://file.zktube.io/package/zkTube_prover](https://file.zktube.io/package/zkTube_prover)

```
sudo wget https://file.zktube.io/package/zkTube_prover /bin/zkTube_prover
sudo chmod +x /bin/zkTube_prover
```

### 3、Setting up revenue_address

```
echo 'you revenue address' >/revenue_address
```

### 4、Start Prover

```
sudo /bin/zkTube_prover
```
