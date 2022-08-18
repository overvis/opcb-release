# OPCB-221-BPI4 runtime release for Banana Pi 4

OPCB-221-BPI4 is a device that functions as MODBUS RTU <> MODBUS TCP converter.
It connects the industrial equipment (RS-485) to the internet (TCP/IP).

![OPCB-221-BPI4](./docs/en/images/opcb-221.png)

OPCB-221-BPI4 is used to connect:

- Refrigeration controllers
- HVAC systems controllers
- Agricultural smart devices
- Power network relays, meters, and other electrical equipment
- Industrial IoT devices
- Industrial sensors and meters
- Any other MODBUS-compatible electronics

![Operation diagram](./docs/en/images/operation-diagram.svg)

OPCB-221-BPI4 device can be acquired as a product from
[www.overvis.com](https://www.overvis.com/) or manufactured by anyone using any
single-board computer. **This set of files automatically installs OPCB-221-BPI4
runtime and works with
[Banana Pi 5](https://wiki.banana-pi.org/Banana_Pi_BPI-M5) (Banana Pi OS). If
you have another board, please check other branches in this repository.**

OPCB-221-BPI4 can be used as a stand-alone device, but its main goal is to be
compatible with the [Overvis monitoring system.](https://www.overvis.com/) In
conjunction with Overvis it provides:

**Data collection:**

- Gather operational data points (any numeric values) from your equipment.
- Store history of operational data, get insights and analytics.
- Collected data is fully exportable (Excel, CSV).
- Hazard Analysis Critical Control Point (HACCP) reporting.

**SMS and email notifications:**

- Configure alarms for operational parameters thresholds or connection errors.
- Set up a “chain of responsibility” requiring alarm confirmations from
  personnel and escalating them in the absence of response.
- All alarm actions are logged and ready for review.

**Real-time monitoring and control:**

- Create dashboards with real-time information received from the equipment.
- Visualize the data using open SVG format.
- Use Google Maps API to display objects’ locations.
- Use JavaScript and Overvis API to set up quick action controls for operation
  personnel.

**And more:**

- Use templates to quickly create devices and alarms.
- Manage access levels for different accounts inside one organization.
- Works with dynamic IPs and bypasses firewalls.
- Optimized mobile access.
- Industry-standard encryption.
- Overvis API allows the automation of control and can be used to load data into
  other management systems.

![Overvis distributed objects monitoring visualization example.](./docs/en/images/overvis-display.jpeg)

## Feature list

- MODBUS RTU/TCP converter.
- Built-in Overvis cloud support (www.overvis.com).
- Serving as TCP server or client, MODBUS RTU master or slave.
- RS-485 network extension.
- MODBUS ASCII mode support.
- Supporting LAN and/or Wi-Fi connection.
- Optional 3G/LTE connection using an external USB modem.
- Wi-Fi Access Point mode.
- Web-interface, accessible from the local network or via WiFi Access Point.
- Remote configuration (using MODBUS or web-interface).
- RS-485 network settings: baud rate, parity, response timeout.
- Multiple RS-485 networks support.
- MODBUS request debugging tools.
- Automatic or manual firmware update.
- HTTP API.

## Installation

### Hardware requirements

Required hardware:

- Banana Pi 5 (<https://www.raspberrypi.com/for-industry/>)
- Micro SD card, 4GB or more.
- High-quality 2.5A micro USB power supply (e.g.,
  [Banana Pi Universal Power Supply](https://www.raspberrypi.com/products/raspberry-pi-universal-power-supply/))
- Any USB<>RS485 converter (e.g.,
  <https://www.amazon.com/Industrial-USB-RS485-Converter-Communication/dp/B081MB6PN2>)

Optional hardware:

- _If LAN connection is required:_ RJ45 (Ethernet) cable.
- _If the mobile network connection is required:_ 3G/LTE USB modem with a local
  carrier SIM card.
- _For debugging console in case of network connection issues:_ USB-RS232TTL
  3.3V CH340 with pin connection cords (e.g.,
  <https://robotdyn.com/usb-serial-adapter-ch340g-5v-3-3v.html>)
- Case for the Banana Pi.

_TODO: hardware connection schematic_

### Installing the Banana Pi OS

See Banana Pi documentation for details on how to prepare an SD card with fresh
Banana Pi OS installation:

<https://www.raspberrypi.com/documentation/computers/getting-started.html#installing-the-operating-system>

_TODO: link for more information about debugging using the console._

### Installing the OPCB-221-BPI4 runtime

1. Boot the Banana Pi from the SD card with a fresh OS installation.
2. Login to Banana Pi
   [remotely using SSH](https://www.raspberrypi.com/documentation/computers/remote-access.html#introduction-to-remote-access)
   or using the debugging console with USB-RS232TTL. Make sure that Banana Pi
   has access to the internet.
3. Insert USB<>RS485 converter into the Banana Pi USB port.
4. Run the following Bash command:

```bash
sudo git clone --branch opcb-221-rpi3 --depth 1 --single-branch https://github.com/overvis/opcb-release.git /opt/opcb-release && sudo /opt/opcb-release/setup.sh
```

Enter the password if requested.

After this command completes, OPCB-221-BPI4 services should be installed and
running. A web interface is provided and accessible by entering Banana Pi's IP
address in the browser of any computer or mobile device in the same local
network or Wi-Fi.

_TODO: web interface screenshot._

### Connecting to RS-485 MODBUS equipment

Connect your equipment to the USB<>RS485 converter and insert it into the Banana
Pi with OPCB-221-BPI4 services running. Consult your equipment manual for RS-485
connection.

_TODO: expand this section with examples, debugging howtos and the supported
equipment list._

### Connecting OPCB-221-BPI4 to Overvis monitoring system

_TODO_

## Maintenance

### Runtime details

OPCB-221-BPI4 runtime is installed as a systemd service `opcb`. Start, stop or
restart this service as needed.

### Checking the system journal

To check the OPCB-221-BPI4 runtime log use this command:

```bash
journalctl -u opcb
```

Log level can be changed in the OPCB-221-BPI4 configuration.

### Versioning

OPCB-221-BPI4 follows [semantic versioning.](https://semver.org/) Each version
is tagged in this repository with a tag in the format `opcb-221-rpi3/A.B.C`

The current version of the OPCB-221-BPI4 services is displayed on the bottom of
the configuration web interface page or can be accessed through the API.

### Automatic updates

Automatic updates are implemented using cron job and are being run daily. See
`/etc/cron.daily/opcb-update.sh` file on your device.

### Update manually

A manual update process can be initialized by running:

```bash
sudo /opt/opcb-release/update.sh
```

## User documentation

See [OPCB-221-BPI4 User Documentation.](./docs/en/README.md)

## Contributing

Please use GitHub issues to report any errors or ask questions. We plan to
release the OPCB-221-BPI4 source code as soon as it is documented.

## License (Apache)

See [LICENSE](./LICENSE)
