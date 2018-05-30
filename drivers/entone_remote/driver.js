'use strict';

const Homey = require('homey');

module.exports = class EntoneRemoteDriver extends Homey.Driver {

    onPairListDevices( data, callback ) {

        let devices = [
            {
                // Required properties:
                "name": "Entone Kamai 400/500 series settopbox",
                "data": {"id": "entone500"}
            }
        ];
        callback(null, devices);

    }
};