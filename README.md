# OPCB-221 executables release for Raspberry Pi 3/3B/3B+

OPCB-221 is a device that functions as MODBUS RTU <> MODBUS TCP converter. It
connects industrial equipment (RS-485) to the internet (TCP/IP).

OPCB-221 is used to connect:

-   Refrigeration controllers
-   HVAC systems controllers
-   Agricultural smart devices
-   Power network relays, meters and other equipment
-   Industrial IoT devices
-   Industrial sensors and meters
-   Any other MODBUS-compatible electronics

OPCB-221 device can be acquired as a product from
[www.overvis.com](www.overvis.com) or manufactured by anyone using any
single-board computer. **This set of files automatically installs OPCB-221
firmware and works with
[Raspberry Pi 3/3B/3B+](https://www.raspberrypi.com/for-industry/) (Raspberry Pi
OS). If you have another board, please check other branches in this
repository.**

OPCB-221 can be used as a stand-alone device, but its main goal is to be
compatible with [Overvis monitoring system.](www.overvis.com) In conjunction
with Overvis it provides:

**Data collection:**

-   Gather operational data points (any numeric values) from your equipment.
-   Store history of operational data, get insights and analytics.
-   Collected data is fully exportable (Excel, CSV).
-   Hazard Analysis Critical Control Point HACCP reporting.

**SMS and email notifications:**

-   Configure alarms for operational parameters thresholds or connection errors.
-   Set up a “chain of responsibility” requiring alarm confirmations from
    personnel and escalating them on the absence of response.
-   All alarm actions are logged and ready for review.

**Real-time monitoring and control:**

-   Create dashboards with real-time information received from the equipment.
-   Visualize the data using open SVG format.
-   Use Google Maps API to display objects’ locations.
-   Use JavaScript and Overvis API to set up quick action controls for operation
    personnel.

**And more:**

-   Use templates to quickly create devices and alarms.
-   Manage access levels for different accounts inside one organization.
-   Works with dynamic IPs and bypasses firewalls.
-   Optimized mobile access.
-   Industry-standard encryption.
-   Overvis API allows the automation of control and can be used to load data
    into other management systems.

![Display](./docs/overvis-display.jpeg)

## Feature list

-   MODBUS RTU/TCP converter
-   Serving as a TCP server and a MODBUS RTU master.
-   MODBUS RTU/TCP slave mode for RS-485 network extension tasks.
-   MODBUS ASCII mode support.
-   LAN + Wi-Fi.
-   Optional 3G/LTE connection with external USB modem.
-   Wi-Fi access point mode.
-   Configuration web-interface accessible from local network or WiFi access
    point.
-   Can be configured remotely using MODBUS.
-   RS-485 network configuration: baud rate, parity.
-   Multiple RS-485 networks support.

## Installation

### Hardware requirements

Required hardware:

-   Raspberry Pi 3/3B/3B+ (https://www.raspberrypi.com/for-industry/)
-   Micro SD card, 4GB or more.
-   High-quality 2.5A micro USB power supply (e.g.
    [Raspberry Pi Universal Power Supply](https://www.raspberrypi.com/products/raspberry-pi-universal-power-supply/))
-   Any USB<>RS485 converter (e.g.
    https://www.amazon.com/Industrial-USB-RS485-Converter-Communication/dp/B081MB6PN2)

Optional hardware:

-   _If LAN connection is required:_ RJ45 (Ethernet) cable.
-   _If mobile network connection is required:_ 3G/LTE USB modem with a local
    carrier SIM card.
-   _For debugging console in case of network connection issues:_ USB-RS232TTL
    3.3V CH340 with pin connection cords (e.g.
    https://robotdyn.com/usb-serial-adapter-ch340g-5v-3-3v.html)

### Installing the Raspberry Pi OS

See Raspberry Pi documentation for details on how to prepare SD card with fresh
Raspberry Pi OS installation:

https://www.raspberrypi.com/documentation/computers/getting-started.html#installing-the-operating-system

### Installing the OPCB-221 firmware

1. Boot the Raspberry Pi from SD card with a fresh OS installation.
2. Login to Raspberry Pi
   [remotely using SSH](https://www.raspberrypi.com/documentation/computers/remote-access.html#introduction-to-remote-access)
   or through debugging console using USB-RS232TTL. Make sure that Raspberry Pi
   has access to the internet.
3. Insert USB<>RS485 converter into the Raspberry Pi USB.
4. Run the following Bash command:

```bash
sudo git clone --branch opcb-221-rpi3 --depth 1 --single-branch https://github.com/overvis/opcb-release.git /opt/opcb-release && sudo /opt/opcb-release/setup.sh
```

After this command completes, OPCB-221 services should be installed and running.
Access web-interface by entering Raspberry Pi IP address in the browser of any
computer or mobile device that is in the same local network or Wi-Fi as your
Raspberry Pi.

### Connecting to RS-485 MODBUS equipment

## Updating

### Versioning

### Automatic updates

### Manual updates

## Contributing

## License
