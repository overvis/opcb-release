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

## [0.3.7] - 2023-11-09

### Added

- _Runtime:_ WiFi password is automatically encoded in Base64 in configuration file.
- _Runtime:_ Default "admin" user password and WiFi Access Point password are randomised during the
  manufacturing.
- _Runtime:_ Printing default admin/AP password on the device label image.

### Changed

- _Runtime:_ Removed ttyS\* interfaces from RS-485 interfaces list.
- _Runtime:_ Internal refactoring of Redis/Sqlite communication code.
- _Runtime:_ During the manufacturing testing, OPCB sends API authentication token to the testing
  server, instead of relying on default password to be known.

### Fixed

- _Runtime:_ Incorrect WiFi mode information in `OPCB_INFO` command file.

## [0.3.6] - 2023-09-14

### Added

- _Runtime:_ Remote tests during the manufacturing process.
- _UI:_ Interface proxying through the Overvis server for the remote access.

### Changed

- _Runtime:_ Remote test server configuration changes.

## [0.3.5] - 2023-09-11

### Added

- _Runtime:_ New command file: insert USB stick with the file named `SSH_AUTH_KEY` and a public SSH
  key inside it, this file will be added to `/root/.ssh/authorized_keys` on the device.
- _Runtime:_ New command file: insert USB stick with the empty file named `OPCB_INFO` and wait 10
  seconds. OPCB runtime will write basic information in that file in the JSON format. This
  information includes the device's IP address in the local network.
- _UI:_ After successful background update, notification is displayed after the next user login.
- _UI:_ Disablable auto-scrolling in Modbus debug logs.
- _Runtime:_ Automated manufacturing testing scaffolding and UI.

### Changed

- _Runtime:_ Wi-Fi connection is established on the background, to reduce the time of device's
  settings changing procedure.
- _UI:_ Removed localhost IP address from the default value in the new Modbus TCP client creation
  form.
- _Runtime:_ Reordering in OPCB Modbus registers list, also some value multipliers were changed.
  OPCB Modbus registers table is still not frozen, and will probably be changed in the future
  updates.
- _Runtime:_ Code for the proxying the interface through the Overvis server, for the remote access
  from Overvis Cloud.
- _UI:_ Increased all requests timeouts to improve the usability for environment with slow network
  connections.

### Fixed

- _Runtime:_ Several small fixes in Linux management procedures.
- _UI:_ Correctly displaying the debug log output for the case when several Modbus TCP requests are
  packed into one TCP packet.
- _UI:_ Automatically reconnecting debug log Websocket on disconnection, displaying socket
  connection/disconnection messages in log.
- _UI:_ Fixed the link to Overvis network for the device binded to the cloud.
- _Runtime:_ RS-485 interfaces restarted on any settings change.

## [0.3.4] - 2023-07-11

### Added

- _UI_: Added ability to unbind device from the cloud account.
- _Runtime:_ Communications API for OCP servers integration.

### Changed

- _Runtime:_ Vaious performance and speed optimisations in RS-485 module.
- _Runtime:_ Performance and speed optimizations in Modbus TCP modules.
- _UI:_ New RS-485 connection is set to "RTU Master" by default.
- _UI_: Log output performance optimization.

### Fixed

- _Runtime:_ Some Modbus OPCB registers were incorrectly returning errors on read.
- _Runtime:_ Restore identity sometimes failed with timeout error. Increased timeout.
- _UI_: Fixed page footer styling.

## [0.3.3] - 2023-06-28

### Added

- _Runtime:_ Reporting runtime errors to Sentry.
- _Runtime:_ Storing last executed runtime version to config file.
- _Runtime:_ Subsystem to automatically migrate config and filesystem changes on start.
- _UI:_ Added label display on the manufacturing page.
- _Runtime:_ RS-485 time metrics logging and performance optimisations.
- _UI_: Request generator form now restrict incorrect numbers on input.

### Changed

- _Runtime:_ Reworked `opcb-runner` config schema. Specified defaults.
- _Runtime:_ Moved device label image to the user directory.

### Fixed

- _Runtime:_ Fixed an issue where the RS-485 configuration was not fully synchronized.
- _UI:_ UI was incorrectly displaying restart/reboot procedure counters.
- _UI:_ Quick setup page was not redirecting to dashboard after submitting.
- _UI:_ Log output optimizations. Temporarily restricted logs length to 1000 items, until proper
  performance fix is implemented.
- _UI:_ Hex switch in request generator wasn't working correctly.

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
[0.3.3]: https://github.com/overvis/opcb-release/tree/opcb/0.3.3
[0.3.4]: https://github.com/overvis/opcb-release/releases/tag/opcb%2F0.3.4
[0.3.5]: https://github.com/overvis/opcb-release/releases/tag/opcb%2F0.3.5
[0.3.6]: https://github.com/overvis/opcb-release/releases/tag/opcb%2F0.3.6
[0.3.7]: https://github.com/overvis/opcb-release/releases/tag/opcb%2F0.3.7
