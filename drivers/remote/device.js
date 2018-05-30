'use strict';

const Homey = require('homey');

module.exports = class RemoteDevice extends Homey.Device {

    onInit() {
        this.registerCapabilityListener('onoff', () => {return this._performCommand('POWER_TOGGLE');});
        this.registerCapabilityListener('channel_up', () => {return this._performCommand('CHANNEL_UP');})
        this.registerCapabilityListener('channel_down', () => {return this._performCommand('CHANNEL_DOWN');});
        this.registerCapabilityListener('volume_up', () => {return this._performCommand('VOLUME_UP');});
        this.registerCapabilityListener('volume_down', () => {return this._performCommand('VOLUME_DOWN');});
        this.registerCapabilityListener('channel_switch', () => {return this._switchChannel(value);});
        let channelSwitchAction = new Homey.FlowCardAction('channel_switch');
        channelSwitchAction
            .register()
            .registerRunListener(( args ) => {
                return this._switchChannel(args['channel']);
            })
    }

    _performCommand(commandName) {
        this.log('Called capability', commandName);
        this.log('value', commandName);
        let entoneSignal = new Homey.SignalInfrared('entone500');
        entoneSignal.register()
            .then( () => {
                entoneSignal.cmd(commandName)
                    .catch( err => {
                        this.error('Received error (2)', err);
                    } )
                    .then( this.log('Send signal', commandName) )

            })
            .catch( err => {
                this.error('Received error (1)', err);
            });
        return Promise.resolve();
    }

    _switchChannel(value) {
        if (isNaN(value)) {
            this.log('Received a non-number', value);
            return Promise.reject('NaN');
        }
        const channelArray = value.toString().split('');
        channelArray.forEach( (digit) => {
            this.log('Send digit ', digit);
            this._performCommand('DIGIT_' + digit);
        });
        return Promise.resolve();
    }
};