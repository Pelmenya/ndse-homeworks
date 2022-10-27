### Задание №1 - Docker CLI

Загрузите образ busybox последней версии
```
docker pull busybox:latest

latest: Pulling from library/busybox
f5b7ce95afea: Pull complete
Digest: sha256:9810966b5f712084ea05bf28fc8ba2c8fb110baa2531a10e2da52c1efc504698
Status: Downloaded newer image for busybox:latest
docker.io/library/busybox:latest
```
Запустите новый контейнер busybox с командой ping сайта netology.ru, и количеством пингов 7, поименуйте контейнер pinger
```
docker run --name pinger busybox ping netology.ru -c 7

PING netology.ru (188.114.98.229): 56 data bytes
64 bytes from 188.114.98.229: seq=0 ttl=37 time=7.208 ms
64 bytes from 188.114.98.229: seq=1 ttl=37 time=22.928 ms
64 bytes from 188.114.98.229: seq=2 ttl=37 time=8.135 ms
64 bytes from 188.114.98.229: seq=3 ttl=37 time=5.383 ms
64 bytes from 188.114.98.229: seq=4 ttl=37 time=8.031 ms
64 bytes from 188.114.98.229: seq=5 ttl=37 time=7.739 ms
64 bytes from 188.114.98.229: seq=6 ttl=37 time=10.317 ms

--- netology.ru ping statistics ---
7 packets transmitted, 7 packets received, 0% packet loss
round-trip min/avg/max = 5.383/9.963/22.928 ms
```
Выведите на список всех контейнеров - запущенных и остановленных
```
docker ps --all

CONTAINER ID   IMAGE     COMMAND                  CREATED              STATUS                          PORTS     NAMES
e96d036e0e23   busybox   "ping netology.ru -c…"   About a minute ago   Exited (0) About a minute ago             pinger
```
Выведите на экран логи контейнера с именем pinger
```
docker logs pinger

PING netology.ru (188.114.98.229): 56 data bytes
64 bytes from 188.114.98.229: seq=0 ttl=37 time=7.208 ms
64 bytes from 188.114.98.229: seq=1 ttl=37 time=22.928 ms
64 bytes from 188.114.98.229: seq=2 ttl=37 time=8.135 ms
64 bytes from 188.114.98.229: seq=3 ttl=37 time=5.383 ms
64 bytes from 188.114.98.229: seq=4 ttl=37 time=8.031 ms
64 bytes from 188.114.98.229: seq=5 ttl=37 time=7.739 ms
64 bytes from 188.114.98.229: seq=6 ttl=37 time=10.317 ms

--- netology.ru ping statistics ---
7 packets transmitted, 7 packets received, 0% packet loss
round-trip min/avg/max = 5.383/9.963/22.928 ms
```
Запустите второй раз контейнера с именем pinger
```
docker start pinger

pinger
```
Выведите на список всех контейнеров - запущенных и остановленных
```
docker ps --all

CONTAINER ID   IMAGE     COMMAND                  CREATED         STATUS                      PORTS     NAMES
e96d036e0e23   busybox   "ping netology.ru -c…"   3 minutes ago   Exited (0) 19 seconds ago             pinger
```
Выведите на экран логи контейнера с именем pinger
```
docker logs pinger

PING netology.ru (188.114.98.229): 56 data bytes
64 bytes from 188.114.98.229: seq=0 ttl=37 time=7.208 ms
64 bytes from 188.114.98.229: seq=1 ttl=37 time=22.928 ms
64 bytes from 188.114.98.229: seq=2 ttl=37 time=8.135 ms
64 bytes from 188.114.98.229: seq=3 ttl=37 time=5.383 ms
64 bytes from 188.114.98.229: seq=4 ttl=37 time=8.031 ms
64 bytes from 188.114.98.229: seq=5 ttl=37 time=7.739 ms
64 bytes from 188.114.98.229: seq=6 ttl=37 time=10.317 ms

--- netology.ru ping statistics ---
7 packets transmitted, 7 packets received, 0% packet loss
round-trip min/avg/max = 5.383/9.963/22.928 ms
PING netology.ru (188.114.98.229): 56 data bytes
64 bytes from 188.114.98.229: seq=0 ttl=37 time=4.327 ms
64 bytes from 188.114.98.229: seq=1 ttl=37 time=29.380 ms
64 bytes from 188.114.98.229: seq=2 ttl=37 time=6.374 ms
64 bytes from 188.114.98.229: seq=3 ttl=37 time=7.558 ms
64 bytes from 188.114.98.229: seq=4 ttl=37 time=17.026 ms
64 bytes from 188.114.98.229: seq=5 ttl=37 time=5.498 ms
64 bytes from 188.114.98.229: seq=6 ttl=37 time=7.785 ms

--- netology.ru ping statistics ---
7 packets transmitted, 7 packets received, 0% packet loss
round-trip min/avg/max = 4.327/11.135/29.380 ms
```
Определите по логам общее количество запусков команды ping и какое общее количество отправленых запросов
```
2 раза команда PING, 14 количество отправленых запросов
```
Удалите контейнер с именем pinger
```
docker rm pinger

pinger
```
Удалите образ busybox
```
docker rmi busybox

Untagged: busybox:latest
Untagged: busybox@sha256:9810966b5f712084ea05bf28fc8ba2c8fb110baa2531a10e2da52c1efc504698
Deleted: sha256:ff4a8eb070e12018233797e865841d877a7835c4c6d5cfc52e5481995da6b2f7
Deleted: sha256:0b16ab2571f4b3e0d5a96b66a00e5016ddc0d268e8bc45dc612948c4c95b94cd
```