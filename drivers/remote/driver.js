'use strict';

const Homey = require('homey');

module.exports = class Remote extends Homey.Driver {

    onPairListDevices( data, callback ) {

        let devices = [
            {
                // Required properties:
                "name": "Entone Kamai 400/500 series setopbox",
                "data": {"id": "entone500"}
            }
        ]
        this.log('Pair List devices');
        callback(null, devices);

    }
}