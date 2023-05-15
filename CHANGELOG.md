# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project
adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

### Added

### Changed

### Deprecated

### Removed

### Fixed

### Security

## [0.3.0] - 2023-05-15

This is the initial version of the OPCB firmware. Version 0.2.0 was a pure C-based code that was
rewritten from scratch in 0.3.0 release.

OPCB package in its current version supports the following:

- LAN connection.
- WiFi connection.
- RS-485 Modbus connection through TTY
- Modbus TCP client/server.
- Wireguard VPN connection.
- Communicating with OPCB using Modbus.
- HTTP UI + API.
- Simple Modbus debuging and logging UI tools.
- User accounts and authentication.
- Controlling execution (Linux) environment.
- Manufacturing UI for registration of the device in the cloud.
- Configuration is stored in JSON + Sqlite database.

---

[0.3.0]: https://github.com/overvis/opcb-release/tree/opcb/0.3.0
