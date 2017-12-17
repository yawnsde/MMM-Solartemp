/* global Module */

/* Magic Mirror
 * Module: MMM-Solartemp
 *
 * By yawnsde
 * MIT Licensed.
 */

Module.register("MMM-Solartemp", {
	defaults: {
		updateInterval: 5 * 60 * 1000,
		retryDelay: 5000,
		baseURL: null,
		key: null,
		group: null
	},

	requiresVersion: "2.1.0", // Required version of MagicMirror

	start: function() {
		var self = this;
		var dataRequest = null;
		var dataNotification = null;

		//Flag for check if module is loaded
		this.loaded = false;

		// Schedule update timer.
		this.sendSocketNotification('MMM-Solartemp-GET-DATA', this.config);				
	},

	getDom: function() {
		var self = this;

		// create element wrapper for show into the module
		var wrapper = document.createElement("div");
		wrapper.className = "small thin light";

		// Data from helper
		if (this.dataNotification) {
			var ks = this.dataNotification.split(/\r|\n/);

			for (var i in ks) {
				var wrapperDataNotification = document.createElement("div");
				wrapperDataNotification.className = "figures";
				var tmpSensor = ks[i].split(" ");
				var spanSensor = document.createElement("span");
				spanSensor.innerHTML = tmpSensor[0];
				spanSensor.className = "sensor";
				var spanValue = document.createElement("span");
				spanValue.innerHTML = tmpSensor[1];				
				spanValue.className = "temperature";
				wrapperDataNotification.appendChild(spanSensor);
				wrapperDataNotification.appendChild(spanValue);				
				wrapper.appendChild(wrapperDataNotification);				
			}
		}
		return wrapper;
	},

	getScripts: function() {
		return [];
	},

	getStyles: function () {
		return [
			"MMM-Solartemp.css",
		];
	},

	// socketNotificationReceived from helper
	socketNotificationReceived: function (notification, payload) {
		if(notification === "MMM-Solartemp-DATA") {
			// set dataNotification
			this.dataNotification = payload;
			this.updateDom();
		}
	},
});
