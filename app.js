'use strict';

const Homey = require('homey');

class EntoneIRApp extends Homey.App {
	
	onInit() {
		this.log('MyApp is running...');
			let entoneSignal = new Homey.SignalInfrared('entone');
         entoneSignal.register()
        .then( () => {

            entoneSignal.cmd('ON')
                .catch( this.error )
                .then( this.log )

        })
        .catch( this.error )
		
	}

}

module.exports = EntoneIRApp;