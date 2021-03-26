# Деплой приложения

## Предварительная установка

Требуется установить docker и docker-compose

### Команда для установки docker:

sudo apt install docker

### Команда для установки docker-compose:

sudo apt install docker-compose

### Команда для запуска docker:

sudo systemctl start docker

## Развертывание приложения:

Для создания образа приложения (серверной и клиентской части) выполняем команду в корневой папке проекта

docker build -t finance-account .

Для поднятия образа приложения и postgres выполняем команду в корневой папке проекта

docker-compose up -d 

## Остановка контейнеров:

docker-compose down

## Удаление образов:

docker image prune
