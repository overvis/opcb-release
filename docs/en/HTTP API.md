# OPCB-221 HTTP API

Avalable endpoints:

- `/api/ver`
- `/api/helpsta.json`
- `/api/get_sta.json`
- `/api/login.json`
- `/api/list_ser.json`, `/api/list_nif.json`, `/api/list_ap.json`
- `/api/helpconf.json`
- `/api/set_conf.json`, `/api/get_conf.son`
- `/api/cmd.json`
- `/api/mbgate.json`

## `/api/ver`: Get device version

Returns information about the version of the device.

No query parameters or additional request data.

Response is a JSON object with the following fields:

| Parameter  | Value Range | Description                                         |
| ---------- | ----------- | --------------------------------------------------- |
| `dev_type` | 42          | Manufacturer identification code (`42` - OPCB-221). |
| `ver`      | String      | Version of the software.                            |

_Example:_

Read the version information:

`/api/ver`

```json
{ "dev_type": 42, "ver": "OPCB-221-rpi3/0.0.3" }
```

## `/api/help_sta.json`: Get status parameters meta-information

Returns the meta-information about all status parameters.

No query parameters or additional request data.

Response is a JSON object with the following fields:

| Parameter     | Value Range                  | Description                                                                                                                                                                                                                 |
| ------------- | ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `params`      | Object, keys are param names | Optional field is present if the query succeeds. Contains state parameter information objects in the fields `type` (int16, uint16, ipv4_str or utf8_str), `size` (number of bytes occupied) and `descr` (text description). |
| `error_code`  | -32768...-1                  | Optional field. May contain an error code.                                                                                                                                                                                  |
| `error_descr` | String                       | Optional field. May contain a text description of the error (in English).                                                                                                                                                   |
| `param`       | String                       | Optional field. Can contain the name of the parameter, operation with which caused the error.                                                                                                                               |

## `/api/get_sta.json`: Get status parameters values

Returns current values of all status parameters.

Response is a JSON object with the following fields:

| Parameter             | Value Range                                 | Description                                                                                                                                                                                                                                                                                                                                                     |
| --------------------- | ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dev_type`            | 42                                          | Device identification code (`42` - OPCB-221).                                                                                                                                                                                                                                                                                                                   |
| `ver`                 | String                                      | Version of the software.                                                                                                                                                                                                                                                                                                                                        |
| `access_level`        | 1 ... 2                                     | 1 - read access (except Overvis activation code); 2 - full read and write access.                                                                                                                                                                                                                                                                               |
| `challenge`           | String                                      | This string can be used to securely confirm access rights with the query `/api/login.json` (see below). An empty string means that the current level of access is the maximum for this client.                                                                                                                                                                  |
| `core_volt_mv`        | 0 / 500 ... 6000 / 9999                     | Core supply voltage in millivolts, 0 - unknown.                                                                                                                                                                                                                                                                                                                 |
| `core_temp_ddegc`     | -9999 / -2731 ... 2731 / 9999               | Core temperature in tenths of a degree Celsius, -9999 - unknown.                                                                                                                                                                                                                                                                                                |
| `sys_mem_total_mib`   | 0 ... 1 000 000 000                         | Volume of available memory in MB.                                                                                                                                                                                                                                                                                                                               |
| `sys_mem_used_mib`    | 0 ... 1 000 000 000                         | Exhausted memory size in MB.                                                                                                                                                                                                                                                                                                                                    |
| `sys_vol_total_mib`   | 0 ... 1 000 000 000                         | System partition size in MB.                                                                                                                                                                                                                                                                                                                                    |
| `sys_vol_used_mib`    | 0 ... 1 000 000 000                         | Capacity of the system partition in MB.                                                                                                                                                                                                                                                                                                                         |
| `mac`                 | MAC-48                                      | Globally unique MAC address used for identification by the cloud server.                                                                                                                                                                                                                                                                                        |
| `elan_ip`             | IPv4                                        | Current Ethernet interface IP address.                                                                                                                                                                                                                                                                                                                          |
| `wlan_ip`             | IPv4                                        | Current IP address of the Wi-Fi interface.                                                                                                                                                                                                                                                                                                                      |
| `gsm_ip`              | IPv4                                        | Current GSM interface address (not used, always 0.0.0.0).                                                                                                                                                                                                                                                                                                       |
| `mbtcp_srv_clients`   | 0 ... 4                                     | The number of clients connected to the Modbus TCP server.                                                                                                                                                                                                                                                                                                       |
| `ovb_last_error_code` | -20...0                                     | The code of the last connection error to the cloud server;<br>0 - no error.                                                                                                                                                                                                                                                                                     |
| `ovb_state`           | 0 / 1 / 2 / 3                               | State of connection to the cloud server:<br>0 - prohibited in settings;<br>1 - пауза между подключениями;<br>2 - connection being established;<br>3 - connected.                                                                                                                                                                                                |
| `ovb_act_code`        | 0 / 10 000 000 ... 99 999 999 / 100 000 000 | An 8-digit code that is transmitted by the cloud server when connecting back and can be read locally by the user. When the user enters the code on the cloud server, this reverse connection is activated (transmitted to the given user on the server). 0 - connection activated; 10 000 000 ... 99 999 999 - activation code; 100 000 000 - no code assigned. |
| `ovb_netif`           | 0 / 2 / 3 / 255                             | Cloud server connection:<br>0 - no connection;<br>2 – Ethernet;<br>3 - Wi-Fi;<br>255 - other interface.                                                                                                                                                                                                                                                         |
| `mbtcp_cli_0_netif`   | 0 / 2 / 3 / 255                             | Modbus TCP client 0 connection:<br>0 - no connection;<br>2 – Ethernet;<br>3 - Wi-Fi;<br>255 - other interface.                                                                                                                                                                                                                                                  |
| `mbtcp_cli_1_netif`   | 0 / 2 / 3 / 255                             | Modbus TCP client 1 connection:<br>0 - no connection;<br>2 – Ethernet;<br>3 - Wi-Fi;<br>255 - other interface.                                                                                                                                                                                                                                                  |
| `conf_changed`        | 0 / 1                                       | This flag is set when there are changes in the saved settings, which require a restart of the software to take effect.                                                                                                                                                                                                                                          |
| `os_run_time`         | 0 ... 1 000 000 000                         | System operation time, number of seconds since start.                                                                                                                                                                                                                                                                                                           |

_Example:_

Read the device status information:

`/api/get_sta.json`

```json
{
  "dev_type": 42,
  "ver": "OPCB-221-rpi3/0.0.3",
  "access_level": 2,
  "challenge": "",
  "core_volt_mv": 2,
  "core_temp_ddegc": 2,
  "sys_mem_total_mib": 2,
  "sys_mem_used_mib": 2,
  "sys_vol_total_mib": 29000,
  "sys_vol_used_mib": 5500,
  "mac": "00:11:22:33:44:55",
  "elan_ip": "192.168.0.107",
  "wlan_ip": "192.168.0.103",
  "gsm_ip": "0.0.0.0",
  "mbtcp_srv_clients": 0,
  "ovb_last_error_code": 0,
  "ovb_state": 3,
  "ovb_act_code": 0,
  "ovb_netif": 2,
  "mbtcp_cli_0_netif": 0,
  "mbtcp_cli_1_netif": 0,
  "conf_changed": 0,
  "os_run_time": 5704
}
```

## `/api/login.json`: Access level upgrade

Increase access rights in case the client's initial access level is less than 2.

The query must contain either the `password` parameter with the product
password, or The `passhash` parameter with a SHA1 hash of a string made up of:

1. the SHA1 hash of the product password;
2. the `challenge` string generated by the product, which can be retrieved,
   e.g., by querying `/api/get_sta.json`.

The query parameter can be passed in the url string (if the query method is
`GET`) or in the HTTP payload of the request in the format
`x-www-form-urlencoded` (if the request method `POST`).

Response is a JSON object with the following fields:

| Parameter      | Value Range | Description                                                                                                                                                                             |
| -------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dev_type`     | 42          | Device identification code (`42` - OPCB-221).                                                                                                                                           |
| `ver`          | String      | Version of the software.                                                                                                                                                                |
| `access_level` | 1...2       | 1 - read access (except Overvis activation code); 2 - full read and write access.                                                                                                       |
| `challenge`    | String      | The product password hash is used in conjunction with this string to securely verify access rights. An empty string means that the current access level is the maximum for this client. |

If successful the access level parameter in the response is equal to 2.

_Example:_

Gain write-access:

`/api/login.json?password=<pass>`

```json
{
  "dev_type": 42,
  "ver": "OPCB-221-rpi3/0.0.3",
  "access_level": 2,
  "challenge": "",
```

## `/api/list_ser.json`, `/api/list_nif.json`, `/api/list_ap.json`: Get interfaces information.

- `/api/list_ser.json` - get all serial ports information.
- `/api/list_nif.json` - get network interfaces information.
- `/api/list_ap.json` - get Wi-Fi access-points information.

Input:

`list_size` can be specified with a value from 1 to 20 to limit the list size.

The query parameter can be passed in the url string (if the query method is
`GET`) or in the HTTP payload of the request in the format
`x-www-form-urlencoded` (if the request method `POST`).

Response is a JSON object with the following fields:

| Parameter     | Value Range      | Description                                                                                                                                                                                                                                                                                                                                                                                             |
| ------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `list_ser`    | Array of objects | Optional field is present if the query `/api/list_ser.json` succeeds. Contains an array of objects with serial port information with the fields:`dev_name` (device name).                                                                                                                                                                                                                               |
| `list_nif`    | Array of objects | Optional field is present if the query `/api/list_nif.json` succeeds. Contains an array of objects with information about network interfaces with the fields: `dev_name` (device name), `mac` (optional field with MAC address if non-zero address is known), `type` (optional type field if interface type was recognized, may contain `loopback` for local, `elan` for Ethernet or `wlan` for Wi-Fi). |
| `list_ap`     | Array of objects | Optional field is present if the query `/api/list_ap.json` succeeds. Contains an array of objects with information about Wi-Fi access points with the fields: `ssid` (access point name), `mac` (access point MAC address), `ignal` (radio signal level, dBm).                                                                                                                                          |
| `error_code`  | -32768...-1      | Optional field. May contain an error code.                                                                                                                                                                                                                                                                                                                                                              |
| `error_descr` | String           | Optional field. May contain a text description of the error (in English).                                                                                                                                                                                                                                                                                                                               |

_Example:_

Read the information about the serial ports:

`/api/list_ser.json`

```json
{ "list_ser": [{ "dev_name": "ttyUSB0" }] }
```

## `/api/help_cnf.json`: Get configuration parameters meta-information.

Returns the meta-information about all configuration parameters.

The parameter names from the `opcb-default.conf` file are allowed as query
parameters. Incorrect parameter names are omitted, correct names get into the
result returned after a successful query.

Query parameters may be missing for information, or a list of parameter names
without values must be a list of parameter names without values (up to 30
parameters) must be specified.

The query parameter can be passed in the url string (if the query method is
`GET`) or in the HTTP payload of the request in the format
`x-www-form-urlencoded` (if the request method `POST`).

Response is a JSON object with the following fields:

| Parameter     | Value Range                  | Description                                                                                                                                                                                                                                                                                   |
| ------------- | ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `params`      | Object, keys are param names | Optional field is present on successful execution of request. Contains objects of information about configuration parameters in fields `type` (int16, uint16, ipv4_str or utf8_str), `size` (number of bytes occupied) and `descr` (text description similar to that in `opcb-default.conf`). |
| `error_code`  | -32768...-1                  | Optional field. May contain an error code.                                                                                                                                                                                                                                                    |
| `error_descr` | String                       | Optional field. May contain a text description of the error (in English).                                                                                                                                                                                                                     |
| `param`       | String                       | Optional field. Can contain the name of the parameter, operation with which caused the error.                                                                                                                                                                                                 |

_Example:_

Read the meta-information about the setting parameter that contains the name of
serial interface 1.

`/api/help_cnf.json?rs485_0_dev_name`

```json
{
  "params": {
    "rs485_0_dev_name": {
      "type": "utf8_str",
      "size": 20,
      "descr": "RS-485 device 0 name, max 20 chars"
    }
  }
}
```

## `/api/get_cnfs.json`, `/api/get_cnfa.json`, `/api/set_cnfs.json`: Managing configuration parameters.

- `/api/set_cnfs.json` - set configuration parameters values.
- `/api/get_cnfs.json` - list configuration file stored parameter values.
- `/api/get_cnfa.json` - list active parameter values. Active parameter values
  are unchanged until device restart (configuration file reload).

Configuration parameter names for all requests are the same as listed in
`opcb-default.conf` file. Incorrect names are ignored.

Read requests (`/api/get_cnfs.json` and `/api/get_cnfa.json`) accept optional
list of up to 120 names of configuration parameters.

Write request (`/api/set_cnfs.json`) requires a list of pairs: parameter name,
parameter value of correct type (number or string). Write request is atomic, it
operates upon a memory-copy of configuration file, changes to actual file are
stored only if the request is successful.

The query parameter can be passed in the url string (if the query method is
`GET`) or in the HTTP payload of the request in the format
`x-www-form-urlencoded` (if the request method `POST`).

Response is a JSON object with the following fields:

| Parameter     | Value Range                  | Description                                                                                                                                                      |
| ------------- | ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `params`      | Object, keys are param names | Optional field, present when the query is successfully executed. Contains current parameter values (in-memory copy of settings read from `opcb-user.json` file). |
| `error_code`  | -32768...-1                  | Optional field. May contain an error code.                                                                                                                       |
| `error_descr` | String                       | Optional field. May contain a text description of the error (in English).                                                                                        |
| `param`       | String                       | Optional field. Can contain the name of the parameter, operation with which caused the error.                                                                    |

_Examples:_

Read Modbus address of the device configuration parameter (`mbgate_viu_id`):

`/api/get_cnfs.json?mbgate_viu_id`

```json
{ "params": { "mbgate_viu_id": 111 } }
```

Change RS-485 serial port 1 byte format to uneven (code 4):

`/api/set_cnfs.json?rs485_0_parity_stop=4`

```json
{ "params": { "rs485_0_parity_stop": 4 } }
```

Change the mode of Wi-Fi interface to incorrect value (9):

`/api/set_cnfs.json?wlan_mode=9`

```json
{ "error_code": -6, "error_descr": "Value illegal", "param": "wlan_mode" }
```

## `/api/cmd.json`: Command execution

Executes a command:

| Command              | Description                                                                                                                                                                                                         |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `cmd_ovb_disconnect` | Disconnect from the cloud server (if a connection has been established). If the connection to the cloud server is allowed in the settings, the connection will be established again after the specified time.       |
| `cmd_ovb_deactivate` | Request a deactivation on the cloud server (for example, by doing this, OPCB-221 can be detached from the Overvis account and will receive a new activation code, which can be used to link it to another account). |
| `cmd_conf_def`       | Re-read the settings from the `opcb-default.conf` file to a copy in memory. This will discard any changes that have been made and not saved.                                                                        |
| `cmd_abort`          | Abort the runtime (in service mode it will start up again and all configuration changes will take effect).                                                                                                          |
| `cmd_abort_all`      | Restart the device (may be necessary for the correct application of some interface settings).                                                                                                                       |

Request should contain exactly one command name.

The query parameter can be passed in the url string (if the query method is
`GET`) or in the HTTP payload of the request in the format
`x-www-form-urlencoded` (if the request method `POST`).

Response is a JSON object with the following fields:

| Parameter     | Value Range | Description                                    |
| ------------- | ----------- | ---------------------------------------------- |
| `error_code`  | -32768...0  | Contains an error code. 0 - success.           |
| `error_descr` | String      | Optional. Description of the error in english. |

_Examples:_

Save changes to configuration file `opcb-user.conf` (command `cmd_conf_c2f`):

`/api/cmd.json?cmd_conf_c2f`

```json
{ "error_code": 0 }
```

Close the runtime (restarts automatically with full configuration reload):

`/api/cmd.json?cmd_abort`

```json
{ "error_code": 0 }
```

## `/api/mbgate.json`: Modbus request

Input parameters:

| Parameter  | Value Range                             | Description                                                                                                                                                                                                                                                                                             |
| ---------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `request`  | HEX string, up to 255 bytes             | Modbus-ready request data (without checksum, starting from the Modbus address of the device). The presence of this parameter excludes all other parameters.                                                                                                                                             |
| `uid`      | 0...255                                 | Modbus device address. If the parameter is not specified, the address of the internal virtual device is selected.                                                                                                                                                                                       |
| `write`    | 0 / 1                                   | Write flag (functions 5, 6, 15 or 16). If the parameter is not specified, it is set to 0 - read (functions 1, 2, 3 or 4).                                                                                                                                                                               |
| `readonly` | 0 / 1                                   | Read flag from binary inputs (function 2) or input registers (function 4). It is incompatible with the `write` parameter enabled. If the parameter is not specified it is set to 0 (functions 1, 3, 5, 6, 15 or 16).                                                                                    |
| `bits`     | 0 / 1                                   | Data bit area flag (functions 1, 2, 5 or 15). If the parameter is not specified, it is taken as 0 - register data area (functions 3, 4, 6 or 16).                                                                                                                                                       |
| `address`  | 0...65535                               | Address of the first element (bit or register). Required.                                                                                                                                                                                                                                               |
| `count`    | 1...124 or 1...1984 (depends on `bits`) | Number of elements (bits or registers). Required parameter for reading (functions 1, 2, 3 or 4) and for writing to multiple elements (functions 15 or 16). Incompatible with the `value` parameter (writing to a single element).                                                                       |
| `value`    | -32768...65535                          | Value for writing to a bit or register. Required parameter for writing to a single element (functions 5 or 6). Incompatible with `count` and `data` parameters (read or write to multiple elements). The value is automatically converted to unsigned 16-bit for registers, or to a bit value (if ≠ 0). |
| `data`     | HEX string, up to 248 bytes             | Data to write to bits or registers. Obligatory with `count` parameter for writing to multiple elements (functions 15 or 16). Incompatible with the `value` parameter (write to a single element).                                                                                                       |

The query parameter can be passed in the url string (if the query method is
`GET`) or in the HTTP payload of the request in the format
`x-www-form-urlencoded` (if the request method `POST`).

Response is a JSON object with the following fields:

| Parameter        | Value Range                             | Description                                                                                                                                                                                                                                                                             |
| ---------------- | --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `response`       | HEX string, up to 255 bytes             | Optional. Response to successful request.                                                                                                                                                                                                                                               |
| `data`           | HEX string, up to 248 bytes             | Optional. Successful read response payload.                                                                                                                                                                                                                                             |
| `count`          | 1...124 or 1...1984 (depends on `bits`) | Optional. Successful write, number of written values.                                                                                                                                                                                                                                   |
| `value`          | 0...65535                               | Optional. Successful write, value.                                                                                                                                                                                                                                                      |
| `exception_code` | 0...255                                 | Optional. Modbus exception code. May represent an error that is compatible with Modbus (e.g. request timeout) in that case `error_code` will be empty. Perifery-returned exceptions are indistinguishable from exceptions generated by controller itself during the request processing. |
| `error_code`     | -255...0                                | Optional. Request processing error code.                                                                                                                                                                                                                                                |
| `error_descr`    | String                                  | Optional. Request processing error description.                                                                                                                                                                                                                                         |

Request processing and the response can take up to 15s (in most cases much
faster).

_Examples:_

Read OPCB-221 identification data (device type 42=0x2A, version 1):

- Option 1

`/api/mbgate.json?address=0&count=2`

```json
{ "data": "002A0001" }
```

- Option 2

`/api/mbgate.json?request=6F0300000002`

```json
{ "response": "6F0304002A0001" }
```

Change RS-485 serial port 0 byte format to uneven (code 4):

`/api/mbgate.json?write=1&address=502&value=4`

```json
{ "value": 4 }
```

Change address of the holding register 120 of the device with Modbus ID = 12
(not connected):

`/api/mbgate.json?uid=73&write=1&address=120&value=3`

```json
{ "exception_code": "0B" }
```

Roll-back temporary changes of configuration parameters of OPCB-221 to
configuration file values (command code `0xCF2C`):

`/api/mbgate.json?address=50&count=1&data=CF2C`

```json
{ "count": 1, "error_code": 0 }
```

Call function 0 on OPCB-221 (incorrect function code):

`/api/mbgate.json?request=6F00`

```json
{ "error_code": -2, "error_descr": "Input illegal" }
```
