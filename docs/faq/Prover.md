## Prover

Currently, only Linux mining is supported

### 1、Installing Dependencies

qbittorrent-nox

- Ubuntu ≥ 18.04

<font color='red'>*The Sysbench plug-in was added</font>

```
sudo apt-get update && sudo apt install -y axel software-properties-common dirmngr apt-transport-https lsb-release ca-certificates iproute2 curl wget libssl-dev sysbench
sudo add-apt-repository ppa:qbittorrent-team/qbittorrent-stable -y && \
sudo apt-get update && sudo apt-get install qbittorrent-nox -y
```

- CentOS ≥ 7.3

```
sudo yum -y install qbittorrent-nox
```

Source Address：[https://github.com/userdocs/qbittorrent-nox-static/](https://github.com/userdocs/qbittorrent-nox-static/)

**Please be sure to install the dependency as root, otherwise many unexpected problems may occur.**

### 2、Download the Prover binaries and grant them execution permission

<font color='red'>Link for Download:[https://file.zktube.io/package/zkTube_prover_3.1.2](https://file.zktube.io/package/zkTube_prover_3.1.2)</font>

[Historical versions](#version)

```
sudo wget https://file.zktube.io/package/zkTube_prover_3.1.2 /bin/zkTube_prover
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


## <a id='version'>Version</a>

- [3.1.2](https://file.zktube.io/package/zkTube_prover_3.1.2) 2022-04-15

Upgrade calculation force calibration mechanism

Link stability enhancement

Fixed some bugs

- [2.3.16](https://file.zktube.io/package/zkTube_prover_2.3.16) 2021-12-16

Solve the compatibility problems of some models

Fix some known bugs

- [2.3.15](https://file.zktube.io/package/zkTube_prover_2.3.15) 2021-12-10

The distribution of the problem of Partial Mining Equipment with Multiple Openings on Single Machine

Fix some known bugs

- [2.3.01](https://file.zktube.io/package/zkTube_prover) 2021-12-02

The transition version compatible with the Partial Mining Equipment with Multiple Openings on Single Machine
