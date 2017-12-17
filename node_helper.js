/* Magic Mirror
 * Node Helper: MMM-Solartemp
 *
 * By yawnsde
 * MIT Licensed.
 */

var NodeHelper = require("node_helper");
var request = require('request');

module.exports = NodeHelper.create({

	getData: function(payload) {
		var self = this;
		console.log();
		
		var myUrl = payload.baseURL + "?key=" + payload.key + "&group=" + payload.group;
		request({
			url: myUrl,
			method: 'GET',
		}, function (error, response, body) {
			
			if (!error && response.statusCode == 200) {
				self.sendSocketNotification("MMM-Solartemp-DATA", body);
			}
		});

		setTimeout(function() { self.getData(payload); }, payload.updateInterval);
	},

	// Override socketNotificationReceived method.

	/* socketNotificationReceived(notification, payload)
	 * This method is called when a socket notification arrives.
	 *
	 * argument notification string - The identifier of the noitication.
	 * argument payload mixed - The payload of the notification.
	 */
	socketNotificationReceived: function(notification, payload) {
		//console.log
		if (notification === "MMM-Solartemp-GET-DATA") {
			// Send notification
			//this.sendNotificationTest(this.anotherFunction()); //Is possible send objects :)
			this.getData(payload);
		}
	},

});
