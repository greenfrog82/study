# iptables

iptables은 Linux 운영체제에서 사용되는 방화벽 툴이다.
이를 사용하는 방법에 대해서 정리하였다.

## How to block incomming port

```bash
$ sudo iptables -A INPUT -p tcp -dport <PORT NUMBER> -j DROP
```

예를들어서, MySQL의 Port(3306)를 막는다고 하면 다음과 같이 하면된다.

```bash
$ sudo iptables -A INPUT -p tcp -dport 3306 -j DROP
```

## How to view blocked ports rules

#### All settings

```bash
$ iptables -L -n -v
```

#### In-Bound or Out-Bound settings

```bash
$ iptables -L INPUT -n -v
```
```bash
$ iptables -L OUTPUT -n -v
```

## Reference

* [Linux:Block Port With IPtables](https://www.cyberciti.biz/faq/iptables-block-port/)
* [The Beginner’s Guide to iptables, the Linux Firewall](https://www.howtogeek.com/177621/the-beginners-guide-to-iptables-the-linux-firewall/)
