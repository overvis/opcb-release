## Modbus Operation Manual

Depending on the settings, the OPCB-221 can receive and process Modbus requests
over multiple ports, including:

- Modbus TCP requests from the cloud server via a return connection to the cloud
  server;
- Modbus TCP requests from one or more clients (but not more than the number of
  clients indicated in the specifications) through the Modbus TCP port (for
  which the OPCB-221 acts as a Modbus TCP server);
- Modbus RTU or Modbus ASCII requests from a master device or a device via one
  or two serial ports (in this case the OPCB-221 acts as a slave device on the
  serial port).

The address (identifier) of the device in the request determines the direction
of the request for its processing and response.

If the request is addressed to another device then depending on the gateway
settings, it can be transmitted (with protocol conversion where required), to
one of the specified directions, including:

- to one of the two serial ports by means of Modbus RTU or Modbus ASCII request
  (for devices on these ports the OPCB-221 acts as the master);
- to one of the two remote servers as a Modbus TCP request (for which OPCB-221
  acts as a Modbus TCP client).

If a reply is received back in the correct format, it is returned to the
requesting party. If the response waiting time has elapsed or the format of the
response is incorrect, the OPCB-221 generates and transmits to the client the
appropriate Modbus exception code.

If the request is addressed to an internal OPCB-221 virtual device, it is not
transmitted, but processed by the device itself, and the response is returned to
the requesting party. The lists of parameters available in the Modbus registers
are shown below.

- the device supports read and/or write function requests to the storage
  registers;
- the listed register addresses correspond directly to the values of the address
  field in Modbus requests;
- for read-only parameters, the range of valid values is not specified;
- for parameters available for reading or writing, the range of valid values is
  specified;
- digital parameters that take up more than one register store bytes of two in
  each register, the highest one first;
- parameters of the _character string_ type store string character codes, one in
  each register, from left to right; if the string occupies less registers than
  specified in the address range, the string ends with the code 0; if the
  initial value is not specified, it equals an empty string;
- parameters like _IPv4 address_ and _MAC-48 address_ store address bytes one in
  each register, from left to right.

### Group of identification parameters

| Parameter   | Description                                                  | Address(es) |
| ----------- | ------------------------------------------------------------ | ----------- |
| Device type | Manufacturer identification code (42 - OPCB-221)             | 0           |
| Version     | Software version providing communication via Modbus protocol | 1           |

### Group of control parameters

| Parameter      | Permissible values | Initial value | Description                                                                                                                        | Address(es) |
| -------------- | ------------------ | ------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| Command        | 0...65535          | 0             | Command code (see below)                                                                                                           | 50          |
| Password entry | Character string   | –             | Writing a correct password into this parameter raises the access level of this client to 2, if it was less than 2 (see reg. 1300). | 68...99     |

#### Available command codes (register 50):

- `3034` – request the cloud server to cancel the activation (unlink the device
  account) and a new activation code;
- `3036` – disconnect from the cloud server (if connected) and reconnect (if the
  connection is allowed);
- `43943` – device restart;
- `43947` – software restart;
- `52271` – writing of configuration changes to the configuration file;
- `52719` – resetting the changes in the settings to the factory defaults and
  writing them to the configuration file;
- `53036` – cancelling the changes in the settings and loading the settings from
  the configuration file.

### Group of software setup parameters

#### WebAPI server

This support server is used by the Web user interface to manage the device.

**Changing these parameters is not recommended.**

| Parameter                                           | Permissible values  | Factory default | Description                                                                                                                                                                                                                                                                                 | Address(es) |
| --------------------------------------------------- | ------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| Interface for the WebAPI server                     | 0 / 1 / 2 / 3 / 255 | 1               | 0 – not used;<br>1 – on the local Loopback;<br>2 – on Ethernet;<br>3 – on Wi-Fi;<br>255 – on any available                                                                                                                                                                                  | 250         |
| WebAPI server port                                  | 0...65535           | 8502            |                                                                                                                                                                                                                                                                                             | 251         |
| Waiting time to re-open the Web server port, s      | 1...600             | 5               |                                                                                                                                                                                                                                                                                             | 252         |
| Standby time before Web client disconnection, s     | 15...3600           | 15              |                                                                                                                                                                                                                                                                                             | 253         |
| Initial level of Web client access                  | 0 / 1 / 2           | 2               | 0 – access to the identification parameters and password entry (to read and write the other parameters, password entry is required);<br>1 – full read access, access for password entry (password entry is required to write the rest of the parameters);<br>2 – full read and write access | 254         |
| Response time to the Web client, ms                 | 1...60000           | 8000            | Maximum number of processed requests                                                                                                                                                                                                                                                        | 255         |
| Maximum number of processed requests                | -                   | 1               | 1 – requests are accepted one by one                                                                                                                                                                                                                                                        | 256         |
| Maximum number of connections to the server         | 1...20              | 4               | Maximum number of simultaneously connected Web clients. If this number is exceeded, HTML errors and empty request responses may be generated, or new clients may be disconnected                                                                                                            | 257         |
| Period between data reception by the Web server, µs | 1...65535           | 5000            | Sleep time when this port is inactive. Determines the processor load<br>1 – minimum packet delay, maximum load                                                                                                                                                                              | 258         |
| HTML Interface                                      | 0 / 1               | 0               | 0 – API only (see. "Web-API");<br>1 – API and Web pages                                                                                                                                                                                                                                     | 259         |

#### Reconnecting to a cloud server

A set address connection is established and supported to accept Modbus TCP
requests. This allows remote control of the device and the devices connected to
it by the rights issued by the cloud server. In case the device is not activated
on the cloud server (to use remote management), the connection remains on
standby until activated.

It is not recommended to disable this connection even if remote control is not
required by the user.

| Parameter                                                     | Permissible values  | Factory default      | Description                                                                                                                                                                                                                          | Address(es) |
| ------------------------------------------------------------- | ------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- |
| Interface for reconnection                                    | 0 / 1 / 2 / 3 / 255 | 255                  | 0 – prohibited;<br>1 – via local Loopback;<br>2 – via Ethernet;<br>3 – via Wi-Fi;<br>255 – via any available                                                                                                                         | 300         |
| Cloud server port                                             | 1...65535           | 20502                |                                                                                                                                                                                                                                      | 301         |
| Waiting time before reconnecting to the cloud server, s       | 1...600             | 5                    |                                                                                                                                                                                                                                      | 302         |
| Standby time before disconnecting from the cloud server, s    | 60...3600           | 90                   |                                                                                                                                                                                                                                      | 303         |
| Sending identification data when connecting to a cloud server | 0 / 1               | 1                    |                                                                                                                                                                                                                                      | 304         |
| Response timeout to the cloud server, ms                      | 1...60000           | 1500                 | If there is no response for longer than the set time, a Modbus TCP exception is generated and sent instead of a response                                                                                                             | 305         |
| Maximum number of requests sent by the cloud server           | 1...20              | 8                    | The parameter is used to send requests and/or responses simultaneously (allows to optimize traffic, especially for wireless or mobile connections) 1 - requests are always delayed by the client before processing previous requests | 306         |
| Cloud server address                                          | Character string    | `modbus.overvis.com` | Host name or IP address of the cloud server                                                                                                                                                                                          | 336...399   |

#### Modbus gateway

When any Modbus requests are received, each request goes through the gateway and
is forwarded to the first direction that the request fits the rule of.

| Parameter                                                   | Permissible values | Factory default | Description                                                                                                                                                      | Address(es) |
| ----------------------------------------------------------- | ------------------ | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| Route to virtual device                                     | 0 / 1              | 1               | 0 – internal virtual device is not available;<br>1 – virtual device is available                                                                                 | 400         |
| Virtual device address                                      | 0...255            | 111             | Requests to this address are handled by the internal virtual device                                                                                              | 401         |
| The first route address to the serial port №0               | 0...255            | 1               | Requests for addresses in this range are passed through serial port 0. If the last address is less than the first address, that port is unavailable              | 402         |
| Last route address to the serial port №0                    | 0...255            | 255             |                                                                                                                                                                  | 403         |
| First route address to the serial port №1                   | 0...255            | 1               | Requests for addresses in this range are passed through serial port 1. If the last address is less than the first, this port is unavailable                      | 404         |
| Last route address to the serial port №1                    | 0...255            | 0               |                                                                                                                                                                  | 405         |
| First address of the route to the client (remote server) №0 | 0...255            | 1               | Requests for addresses in this range are sent to the remote Modbus TCP server №0. If the last address is less than the first address, this server is unavailable | 406         |
| Last route address to the client (remote server) №0         | 0...255            | 255             |                                                                                                                                                                  | 407         |
| First address of the route to the client (remote server) №1 | 0...255            | 1               | Requests for addresses in this range are sent to the remote Modbus TCP server №1. If the last address is less than the first, the server is unavailable          | 408         |
| Last route address to the client (remote server) №1         | 0...255            | 0               |                                                                                                                                                                  | 409         |

#### Modbus TCP server

The server opens a port and accepts Modbus TCP client connections. The devices,
connected to the unit become available to the clients of this server. Connected
clients can send requests to the unit or devices connected to it.

| Parameter                                                     | Permissible values  | Factory default | Description                                                                                                                                                                                                                                                                                                                                             | Address(es) |
| ------------------------------------------------------------- | ------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| Interface for Modbus TCP server                               | 0 / 1 / 2 / 3 / 255 | 255             | 0 – not used;<br>1 – on the local Loopback;<br>2 – on Ethernet;<br>3 – on Wi-Fi;<br>255 – on any available                                                                                                                                                                                                                                              | 450         |
| Modbus TCP server port                                        | 1...65535           | 502             |                                                                                                                                                                                                                                                                                                                                                         | 451         |
| Waiting time until the Modbus TCP server port is reopened, s  | 1...600             | 5               |                                                                                                                                                                                                                                                                                                                                                         | 452         |
| Standby time before remote Modbus TCP client disconnection, s | 15...3600           | 60              |                                                                                                                                                                                                                                                                                                                                                         | 453         |
| Start level access Modbus TCP remote client                   | 0 / 1 / 2           | 2               | 0 – access to the identification parameters and password entry (to read and write the other parameters, you must enter the password);<br>1 – full read access, password access (password entry required to write the rest of the parameters);<br>2 - full read and write access;<br>2 – full read and write access                                      | 454         |
| Response timeout to a remote Modbus TCP client, ms            | 1...60000           | 1500            | If there is no response for longer than the set time, a Modbus TCP exception is generated and sent instead of a response                                                                                                                                                                                                                                | 455         |
| Maximum number of requests sent by a remote Modbus TCP client | 1...20              | 1               | The parameter is used to send requests and/or responses simultaneously (allows to optimize traffic, the remote client can send several requests simultaneously and must process several responses simultaneously, or have an incoming buffer of sufficient size)<br>1 – requests are always delayed by the client until previous requests are processed | 456         |
| Maximum number of connections to the server                   | 1...20              | 4               | Maximum number of simultaneously connected remote Modbus TCP clients. If this number is exceeded, it is possible to generate exceptions in response to requests, or disconnect new clients                                                                                                                                                              | 457         |
| Period between data reception via Modbus TCP port, µs         | 1...65535           | 2000            | Sleep time when this port is inactive\*. Determines the processor load<br>1 – minimum packet delay, maximum load                                                                                                                                                                                                                                        | 458         |

#### Serial port №0

In Master mode, the device acts as a Modbus master on this port. Other devices
on this port are considered slave devices _connected_ to the unit. The port
opens as one of the destinations to which requests passing through the gateway
can be sent. Received responses are returned to the party from which the request
came.

In Slave mode, the device acts as a Modbus slave on this port. Devices connected
on other directions become available to the Modbus master on this port. The port
opens to receive requests to the unit or devices connected to it.

| Parameter                                                            | Permissible values                                                                     | Factory default | Description                                                                                                                                                                                                            | Address(es) |
| -------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| Speed, b/s                                                           | 300 / 600 / 1200 / 1800 / 2400 / 4800 / 9600 / 19200 / 38400 / 57600 / 115200 / 230400 | 9600            |                                                                                                                                                                                                                        | 500...501   |
| Byte format                                                          | 1 / 2 / 3 / 4                                                                          | 3               | 1 – no parity bit, 1 stop bit;<br>2 – no parity bit, 2 stop bits, or parity bit installed, 1 stop bit (MARK);<br>3 – parity bit with even-check, 1 stop bit (EVEN);<br>4 – parity bit with odd-check, 1 stop bit (ODD) | 502         |
| Modbus frame format                                                  | 0 / 1 / 2 / 3                                                                          | 0               | 0 – Modbus RTU Master;<br>1 – Modbus ASCII Master;<br>2 – Modbus RTU Slave;<br>3 – Modbus ASCII Slave                                                                                                                  | 503         |
| Modbus response start time, ms                                       | 1...60000                                                                              | 1000            |                                                                                                                                                                                                                        | 504         |
| Waiting time for the next byte in the Modbus RTU response, ms        | 1...60000                                                                              | 50              |                                                                                                                                                                                                                        | 505         |
| Waiting time for the next character in the Modbus ASCII response, ms | 1...60000                                                                              | 100             |                                                                                                                                                                                                                        | 506         |
| Waiting time before reopening the serial port, s                     | 1...600                                                                                | 5               |                                                                                                                                                                                                                        | 507         |
| Serial port interface                                                | Character string                                                                       | `ttyUSB0`       | \*\*                                                                                                                                                                                                                   | 530...549   |

#### Serial port №1

In Master mode, the device acts as a Modbus master on this port. Other devices
on this port are considered slave devices _connected_ to the unit. The port
opens as one of the destinations to which requests passing through the gateway
can be sent. Received responses are returned to the party from which the request
came.

In Slave mode, the device acts as a Modbus slave on this port. Devices connected
on other directions become available to the Modbus master on this port. The port
opens to receive requests to the unit or devices connected to it.

| Parameter                                                            | Permissible values                                                                     | Factory default | Description                                                                                                                                                                                                            | Address(es) |
| -------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| Speed, b/s                                                           | 300 / 600 / 1200 / 1800 / 2400 / 4800 / 9600 / 19200 / 38400 / 57600 / 115200 / 230400 | 9600            |                                                                                                                                                                                                                        | 550...551   |
| Byte format                                                          | 1 / 2 / 3 / 4                                                                          | 3               | 1 – no parity bit, 1 stop bit;<br>2 – no parity bit, 2 stop bits, or parity bit installed, 1 stop bit (MARK);<br>3 – parity bit with even-check, 1 stop bit (EVEN);<br>4 – parity bit with odd-check, 1 stop bit (ODD) | 552         |
| Modbus frame format                                                  | 0 / 1 / 2 / 3                                                                          | 0               | 0 – Modbus RTU Master;<br>1 – Modbus ASCII Master;<br>2 – Modbus RTU Slave;<br>3 – Modbus ASCII Slave                                                                                                                  | 553         |
| Modbus response start time, ms                                       | 1...60000                                                                              | 1000            |                                                                                                                                                                                                                        | 554         |
| Waiting time for the next byte in the Modbus RTU response, ms        | 1...60000                                                                              | 50              |                                                                                                                                                                                                                        | 555         |
| Waiting time for the next character in the Modbus ASCII response, ms | 1...60000                                                                              | 100             |                                                                                                                                                                                                                        | 556         |
| Waiting time before reopening the serial port, s                     | 1...600                                                                                | 5               |                                                                                                                                                                                                                        | 557         |
| Serial port interface                                                | Character string                                                                       | `ttyUSB1`       | \*\*                                                                                                                                                                                                                   | 580...599   |

#### Modbus TCP client №0

Connection to a given address is established and maintained as one of the
directions to which requests that pass the gateway can be sent. Received
responses are returned to the party from which the request came. Other devices
accessible through the remote server are considered slaves, _connected_ to the
unit.

| Parameter                                                                  | Permissible values  | Factory default | Description                                                                                                                                                                                                                                                                                                                                        | Address(es) |
| -------------------------------------------------------------------------- | ------------------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| Interface for connecting the client to a remote Modbus TCP server          | 0 / 1 / 2 / 3 / 255 | 255             | 0 – not used;<br>1 – via local Loopback;<br>2 – via Ethernet;<br>3 – via Wi-Fi;<br>255 – via any available                                                                                                                                                                                                                                         | 700         |
| Remote server port                                                         | 1...65535           | 502             | \*\*\*                                                                                                                                                                                                                                                                                                                                             | 701         |
| Waiting time before reconnecting to the remote server, s                   | 1...600             | 5               |                                                                                                                                                                                                                                                                                                                                                    | 702         |
| Modbus address to control remote server                                    | –                   | 0               | 0 – unknown server type, specific control is not used                                                                                                                                                                                                                                                                                              | 703         |
| Silence period before the remote server is disconnected from the client, s | –                   | 0               | Serves for periodic readings from the server to maintain connection.<br>0 – untraceable                                                                                                                                                                                                                                                            | 704         |
| Waiting time for the remote server to respond to the request, ms           | 1...60000           | 8000            | If no answer is received for the given period, the waiting period stops and the client generates and returns an error                                                                                                                                                                                                                              | 705         |
| Maximum number of requests processed by the remote server                  | 1...20              | 1               | Parameter is used to send requests and / or responses simultaneously (allows to optimize traffic, the server can send multiple responses simultaneously and must handle multiple requests simultaneously or have an incoming buffer of sufficient capacity)<br>1 – requests are always delayed by the client until previous requests are processed | 706         |
| Modbus TCP remote server address                                           | IPv4 address        | `192.168.1.121` | \*\*\*                                                                                                                                                                                                                                                                                                                                             | 707...710   |

#### Modbus TCP client №1

Connection to a given address is established and maintained as one of the
directions to which requests that pass the gateway can be sent. Received
responses are returned to the party from which the request came. Other devices
accessible through the remote server are considered slaves, _connected_ to the
unit.

| Parameter                                                                  | Permissible values  | Factory default | Description                                                                                                                                                                                                                                                                                                                                    | Address(es) |
| -------------------------------------------------------------------------- | ------------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| Interface for connecting the client to a remote Modbus TCP server          | 0 / 1 / 2 / 3 / 255 | 255             | 0 – not used;<br>1 – via local Loopback;<br>2 – via Ethernet;<br>3 – via Wi-Fi;<br>255 – via any available                                                                                                                                                                                                                                     | 750         |
| Remote server port                                                         | 1...65535           | 502             | \*\*\*                                                                                                                                                                                                                                                                                                                                         | 751         |
| Waiting time before reconnecting to the remote server, s                   | 1...600             | 5               |                                                                                                                                                                                                                                                                                                                                                | 752         |
| Modbus address to control the remote server                                | –                   | 0               | 0 – unknown server type, specific control is not used                                                                                                                                                                                                                                                                                          | 753         |
| Silence period before the remote server is disconnected from the client, s | –                   | 0               | Serves for periodic readings from the server to maintain connection.<br>0 – untraceable                                                                                                                                                                                                                                                        | 754         |
| Waiting time for the remote server to respond to the request, ms           | 1...60000           | 8000            | If no answer is received for the given period, the waiting period stops and the client generates and returns an error                                                                                                                                                                                                                          | 755         |
| Maximum number of requests processed by the remote server                  | 1...20              | 4               | Parameter is used to send requests and / or responses simultaneously (allows to optimize traffic, the server can send multiple responses simultaneously and must handle multiple requests simultaneously or have an incoming buffer of sufficient size)<br>1 – requests are always delayed by the client until previous requests are processed | 756         |
| Modbus TCP remote server address                                           | IPv4 address        | `192.168.1.122` | \*\*\*                                                                                                                                                                                                                                                                                                                                         | 757...760   |

#### Miscellaneous

| Parameter       | Permissible values | Factory default | Description                                                                                                                            | Address(es) |
| --------------- | ------------------ | --------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| Host Name       | Character string   | `OPCB-221`      |                                                                                                                                        | 900...963   |
| Access password | Character string   | `0000`          | The parameter is only available for writing. When reading, the string `********` returns (or an empty string if there is no password). | 968...999   |

#### Notes

\* – parameter is used for all Modbus TCP compatible ports (Modbus server TCP,
Modbus TCP client, cloud server connection)

\*\* – parameter must not be repeated for other serial ports

\*\*\* – combination of remote server address and port must not be repeated by
other Modbus TCP clients

### Group of parameters for the status of the reconnection to the cloud server

Parameters are used by the cloud server to identify the device when
reconnecting.

| Parameter          | Description                                                                                                                                                                                                                                                        | Address(es)   |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- |
| Type of device     | Manufacturer identification code (42 - OPCB-221)                                                                                                                                                                                                                   | 1000          |
| Version            | Software version providing communication via Modbus protocol                                                                                                                                                                                                       | 1001          |
| Unique MAC address | Globally unique MAC-48 address, which is used to identify the cloud server                                                                                                                                                                                         | 1002 ... 1007 |
| Backwire flags     | Bit 0 - the MAC address uniqueness confirmation (reg. 1002..1007).<br>Bit 1 - the activation code is set.<br>Bit 2 - the device requests a new activation code (e.g., after a local command to deactivate the reverse connection).<br>Bit 3 - connection activated | 1008          |

### Group of parameters for managing reconnection to the cloud server

Parameters are used by the cloud server to control the reconnection.

| Parameter                           | Permissible values                          | Description                                                                                                                                                                                                                                                                                                                                                        | Address(es)   |
| ----------------------------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- |
| Activation code on the cloud server | 0 / 10 000 000 ... 99 999 999 / 100 000 000 | 8-digit code that is transmitted by the cloud server when reconnecting and can be read locally by the user. When the user enters the code on the cloud server, this reverse connection is activated (transmitted to the given user on the server).<br>0 – connection activated;<br>10 000 000 ... 99 999 999 – activation code;<br>100 000 000 – code not assigned | 1009 ... 1010 |

### Group of state parameters

| Parameter                                    | Description                                                                                                                                                                                                                                                                                                                    | Address(es) |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- |
| Access level                                 | 0 – access to the identification parameters and password entry (to read and write the other parameters, password entry is required);<br>1 – full read access, password access ( to write the rest of the parameters password entry is required);<br>2 – full read and write access;<br>3 – special access for the cloud server | 1300        |
| Protection level                             | 0 – security and encryption are not supported \*                                                                                                                                                                                                                                                                               | 1301        |
| Number of Modbus TCP server clients          |                                                                                                                                                                                                                                                                                                                                | 1303        |
| Cloud server interface                       | 0 – not connected;<br>1 – via local Loopback;<br>2 – via Ethernet;<br>3 – via Wi-Fi;<br>255 – via another interface                                                                                                                                                                                                            | 1304        |
| Remote server client interface Modbus TCP #0 | 0 – not connected;<br>1 – via local Loopback;<br>2 – via Ethernet;<br>3 – via Wi-Fi;<br>255 – via another interface                                                                                                                                                                                                            | 1305        |
| Remote server client interface Modbus TCP #1 | 0 – not connected;<br>1 – via local Loopback;<br>2 – via Ethernet;<br>3 – via Wi-Fi;<br>255 – via another interface                                                                                                                                                                                                            | 1306        |
| Current IP address of the Ethernet interface |                                                                                                                                                                                                                                                                                                                                | 1310        |
| Current IP address of the Wi-Fi interface    |                                                                                                                                                                                                                                                                                                                                | 1330        |

\* - the channel can be partially or completely encrypted by third-party means
(e.g., a closed Wi-Fi channel)

### Group of interface settings parameters

During the initial setup of the device, it is usually necessary to set these
parameters in order to communicate with the device and to connect it to the
Internet.

#### Ethernet Settings

| Parameter       | Permissible values | Factory default                  | Description | Address(es) |
| --------------- | ------------------ | -------------------------------- | ----------- | ----------- |
| IP address      | IPv4 address       | 192.168.1.120                    |             | 1500...1503 |
| Subnet mask     | IPv4 address       | 255.255.255.0                    |             | 1504...1507 |
| Gateway address | IPv4 address       | 192.168.1.1                      |             | 1508...1511 |
| DNS 1 address   | IPv4 address       | 192.168.1.1                      |             | 1512...1515 |
| DNS 2 address   | IPv4 address       | 8.8.8.8                          |             | 1516...1519 |
| DHCP usage      | 0 / 1              | 1                                |             | 1520        |
| Device name     | Character string   | Depends on OS (as a rule `eth0`) |             | 1530...1549 |

#### Wi-Fi settings

| Parameter                           | Permissible values | Factory default                   | Description                                                                                                                            | Address(es) |
| ----------------------------------- | ------------------ | --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| IP address of the own access point  | IPv4 address       | `192.168.4.1`                     | Address is used in access point mode (entered in the browser to connect and configure)                                                 | 1700...1703 |
| Subnet mask of the own access point | IPv4 address       | `255.255.255.0`                   |                                                                                                                                        | 1704...1707 |
| First address of the own DHCP       | IPv4 address       | `192.168.4.100`                   | Range is used in access point mode (determines the number of connected devices)                                                        | 1708...1711 |
| Last address of the own DHCP        | IPv4 address       | `192.168.4.110`                   |                                                                                                                                        | 1712...1715 |
| Wi-Fi mode                          | 0 / 1 / 2          | 0                                 | 0 – Wi-Fi off;<br>1 – Wi-Fi station (client) ;<br>2 – Wi-Fi access point (server)                                                      | 1716        |
| ISO1366 country code                | 1...999            | 616                               | Before using Wi-Fi, you must correctly specify the country code of the transmitter location                                            | 1717        |
| Device name                         | Character string   | Depends on OS (as a rule `wlan0`) |                                                                                                                                        | 1730...1749 |
| SSID of the own access point        | Character string   | -                                 | Empty string means the default name `OPCB_XXXXXX` (where XXXXXXXX is the last 6 characters of the MAC address on the unit label)       | 1750...1781 |
| Password of the own access point    | Character string   | `12345678`                        | The parameter is only available for writing. When reading, the string `********` returns (or an empty string if there is no password). | 1785...1848 |
| IP address                          | IPv4 address       | `192.168.1.121`                   |                                                                                                                                        | 1850...1853 |
| Subnet mask                         | IPv4 address       | `255.255.255.0`                   |                                                                                                                                        | 1854...1857 |
| Gateway address                     | IPv4 address       | `192.168.1.1`                     |                                                                                                                                        | 1858...1861 |
| DNS 1 address                       | IPv4 address       | `192.168.1.1`                     |                                                                                                                                        | 1862...1865 |
| DNS 2 address                       | IPv4 address       | `8.8.8.8`                         |                                                                                                                                        | 1866...1869 |
| DHCP usage                          | 0 / 1              | 1                                 |                                                                                                                                        | 1870        |
| SSID of the access point            | Character string   | `YOUR_SSID`                       |                                                                                                                                        | 1900...1931 |
| Access point password               | Character string   | `YOUR_PASSWORD`                   | Parameter is only available for writing. When reading, the string `********` returns (or an empty string if there is no password).     | 1935...1998 |

### Group of user registers

| Parameter | Permissible values | Initial value | Description                                                                                            | Address(es) |
| --------- | ------------------ | ------------- | ------------------------------------------------------------------------------------------------------ | ----------- |
| User      | 0...65535          | 0             | Can be used to transfer data between the cloud server and other devices. The data is reset on restart. | 5000...5999 |
