# MMM-Solartemp

This is a module for the [MagicMirror²](https://github.com/MichMich/MagicMirror/).

Displays sensor data retrieved from a PHP script

## Installation

```
cd ~/MagicMirror/modules
git clone https://github.com/yawnsde/MMM-Solartemp.git
```

## Using the module

To use this module, add the following configuration block to the modules array in the `config/config.js` file:
```js
var config = {
    modules: [
        {
            module: 'MMM-Solartemp',
            config: {
                // See below for configurable options
            }
        }
    ]
}
```

## Configuration options

| Option           | Description
|----------------- |-----------
| `baseURL`        | *Required* The URL to the PHP script
| `key`        | *Required* your personal access key
| `group`        | *Required* your group id
| `updateInterval`        | *Optional* Update interval, how often temperatures should be retrieved<br><br>**Type:** `int`(milliseconds) <br>Default 300000 milliseconds (5 minutes)