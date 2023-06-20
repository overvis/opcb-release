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

## [0.3.2] - 2023-06-20

### Changed

- _UI:_ Device name is now saved on input focus lose.

### Fixed

- _Runtime:_ MAC was not updating during runtime, only after restart.
- _Runtime:_ Runtime failed on start without internet connection, because `git fetch` command
  exited with error status code.
- _Runtime:_ Default config file should not contain any RS-485 connections.
- _UI:_ Bug that was constantly refreshing error display component during the connection loss.
- _UI:_ Quick setup was adding the `ttyS0` RS-485 device instead of `ttyUSB0`.
- _UI:_ Expecting `Failed to fetch` error on all fetch requests.
- _UI:_ Wi-Fi password was not sent correctly to backend.
- _UI:_ Increased timeout on Wi-Fi settings saving.
- _UI:_ All dropdowns in forms were cut off by modal windows.
- _UI:_ Quick setup page was sending multiple slow requests, merged them into one.
- _UI:_ Increased timeout for all settings change requests.
- _Runtime:_ Runtime failed on start without internet connection, because wireguard service
  couldn't be started.

## [0.3.1] - 2023-06-19

### Added

- _UI:_ Redirection to the Quick Setup interface when accessing OPCB through Wi-Fi Access Point.
- _UI:_ Additional information in the connection loss error messages.

### Changed

- _UI:_ Updated Next.JS to the latest version.
- _UI:_ Updated Mantine UI to the latest version.
- _UI:_ General clean-up of the UI code.
- _Runtime:_ Automatically installing `iputils-ping` package instead of the default ping package.
  Since this package can receive the delay as a fractional value.
- _Runtime:_ Additional logging for debugging.

### Fixed

- _UI:_ Copying Modbus log content to clipboard was broken.
- _Runtime:_ Error while saving factory configuration.
- _Runtime:_ Incorrect network mask was set for AP/station wifi which prevented the assignment of
  the IP address for the connected clients.
- _UI:_ Manufacturing interface displayed the incorrect message about the device being already
  registered for the unregistered device.
- _UI:_ Properly displaying errors on manufacturer's pages: restore / register.

## [0.3.0] - 2023-06-14

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
[0.3.1]: https://github.com/overvis/opcb-release/tree/opcb/0.3.1
[0.3.2]: https://github.com/overvis/opcb-release/tree/opcb/0.3.2
