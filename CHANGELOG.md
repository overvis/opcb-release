# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added
- 
### Changed
- 
### Deprecated
- 
### Removed
- 
### Fixed
- 
### Security
- 

## [0.2.5] - 2022-09-23
### Fixed
- Fixed UI some bugs.


## [0.2.4] - 2022-09-21
### Fixed
- Fixed domain setup.overvis.com in Wi-Fi AP mode.
- Fixed bugs in module Modbus 485.
- Fixed other known bugs.
- Fixed UI.


## [0.2.3] - 2022-09-13
### Added
- Added CHANGELOG.md file to the device (/opt/opcb-release/CHANGELOG.md).

### Changed
- Documentation restructuring (/opt/opcb-release/docs).
- Modbus constructor (VIU, droped request if field `UID` incorrect).

### Removed
- Session support.

### Fixed
- Fixed memory leak in webapi status read.
- Fixed some bugs in manufacturer scripts.
- Fixed disable WiFi


## [0.0.13] - 2022-05-13
### Added
- Параметры статистики использования Modbus источников и приемников
- Инструкции быстрого запуска, иллюстрации по физическим подключениям
- Сеть VPN (Wireguard) для удаленного доступа к устройствам

## [0.0.12] - 2022-05-10
### Added
- Ресурс /api/get_cnfa.json
- Некоторые флаги состояния
- Паспорта схема подключения
- Документ с вариантами применения контроллера и логическими схемами подключений
- Modbus вход по хэшу пароля
- Параметр последней ошибки подключения к облачному серверу

### Changed
- Обновлена документация WebAPI

## [0.0.11] - 2022-04-29
### Added
- Сессии WebAPI
- Ресурс /api/login.json
- WebAPI вход по хэшу пароля

### Changed
- Обновлена документация WebAPI

## [0.0.10] - 2022-04-22
### Added
- Получение обновлений релиза, скрипты для установки релиза
- Web-интерфейс над WebAPI
- Добавлен ресурс /api/ver
- По запросу /set_conf.json или команде cmd_conf_def настройки сохраняются в файл автоматически 

### Fixed
- Улучшена работа с сетевыми интерфейсами

### Removed
- Убраны устаревшие команды cmd_conf_c2f и cmd_conf_f2c

## [0.0.9] - 2022-04-13
### Added
- Получение списков сетевых интерфейсов, точек доступа, последовательных интерфейсов
- Получение состояния (IP и MAC, IF подключения к Овервис) в mbreg и webapi
- Ресурсы WebAPI /list_nif.json, /list_ap.json, /list_ser.json, /state.json
- Modbus Slave

## [0.0.8] - 2022-04-08
### Added
- Режим Wi-Fi AP
- Настройки для режима Wi-Fi AP
- Ресурсы WebAPI /mbgate.json, /get_conf.json, /set_conf.json, /cmd.json
- Проверка вводимых символов строк на недопустимые символы

### Removed
- Убран устаревший параметр известности порядка следования TID в запросах (tid_order_ascend)

## [0.0.7] - 2022-04-01
### Added
- thread для поддержания подключений к двум удаленным серверам MBTCP
- Для серверов - настройки максимумов одновременных подключений

### Fixed
- Упрощена и улучшена обработка сервером MBTCP множественных запросов

## [0.0.6] - 2022-03-25
### Added
- Скрипты для настройки сетевых интерфейсов
- Параметры для настройки сетевых интерфейсов
- Поддержка подключений к двум удаленным серверам MBTCP

### Changed
- Количестов поддерживаемых портов RS-485 увеличено до двух

## [0.0.5] - 2022-03-23
### Added
- Обработка web-запросов (GET или POST с параметрами Modbus) и результат в JSON
- Маршрутизация по адресу Modbus

### Changed
- Упрощены списки настроек и добавление новых параметров к конфигурации

## [0.0.4] - 2022-03-19
### Added
- Обработка запросов GET (с параметрами Modbus) и результат в JSON
- Параметры для выбора сетевого интерфейса в Modbus TCP и Overvis Backward

### Fixed
- Проверено преобразование сообщений-ответов с ошибками в исключение Modbus
- Проверена запись настроек
- Исправлена сборка ответов в один TCP пакет перед отправкой

## [0.0.3] - 2022-03-16
### Added
- Запись регистров настроек в ВВУ

### Changed
- Оптимизирована запись настроек 

## [0.0.2] - 2022-03-14
### Added
- Чтение и запись настроек в файл
- Виртуальное внутреннее устройство (ВВУ)
- Чтение регистров настроек с ВВУ по Modbus
- Настройка уровня журналирования ошибок;
- Регистры Modbus для обратного подключения
- Чтение MAC-48 одного из сетевых интерфейсов
- Регистры для обратного подключения
- Режим Modbus ASCII для RS-485;
- Обратное подключение, совместимое с Overvis
- Сборка ответов в один TCP пакет перед отправкой

## [0.0.1] - 2022-03-10
### Added
- Преобразователь протоколов (Ведущий Modbus RTU по RS-485 и сервер Modbus TCP)
