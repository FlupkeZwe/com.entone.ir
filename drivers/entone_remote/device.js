'use strict';

const Homey = require('homey');

module.exports = class EntoneRemoteDevice extends Homey.Device {
    onInit() {
        this.entoneSignal = this._initSignal();


        this.registerCapabilityListener('onoff', () => {return this._performCommand(this.entoneSignal, 'POWER_TOGGLE');});
        this.registerCapabilityListener('channel_up', () => {return this._performCommand(this.entoneSignal, 'CHANNEL_UP');});
        this.registerCapabilityListener('channel_down', () => {return this._performCommand(this.entoneSignal, 'CHANNEL_DOWN');});
        this.registerCapabilityListener('volume_up', () => {return this._performCommand(this.entoneSignal, 'VOLUME_UP');});
        this.registerCapabilityListener('volume_down', () => {return this._performCommand(this.entoneSignal, 'VOLUME_DOWN');});

        this.registerCapabilityListener('channel_switch', () => {return this._switchChannel(entoneSignal, value);});
        this.registerCapabilityListener('channel_switch', this._switchChannel.bind(this));
        let channelSwitchAction = new Homey.FlowCardAction('channel_switch');
        channelSwitchAction
            .register()
            .registerRunListener(( args ) => {
                return this._switchChannel(args['channel']);
            });

        this.registerCapabilityListener('volume_mute', () => {return this._performCommand(this.entoneSignal, 'MUTE_TOGGLE');});
        let volumeMuteAction = new Homey.FlowCardAction('volume_mute');
        volumeMuteAction
            .register()
            .registerRunListener(( ) => {
                return this._performCommand(this.entoneSignal, 'MUTE_TOGGLE')
            });
    }

    _initSignal() {
        let entoneSignal = new Homey.SignalInfrared('entone500');
        entoneSignal.register()
            .catch( err => {
                this.error('Received error (1)', err);
            });
        return entoneSignal;
    }


    _performCommand(entoneSignal, commandName) {
        entoneSignal.cmd(commandName)
        .catch( err => {
            this.error('Received error (2)', err);
        } )
        .then( this.log('Send signal', commandName));
        return Promise.resolve(true);
    }

    _switchChannel(value) {
        if (isNaN(value)) {
            this.log('Received a non-number', value);
            return Promise.reject('NaN');
        }
        const channelArray = value.toString().split('');
        channelArray.forEach( (digit) => {
            this._performCommand(this.entoneSignal, 'DIGIT_' + digit);
        });
        return Promise.resolve(true);
    }
};