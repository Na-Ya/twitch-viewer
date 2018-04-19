//https://wind-bow.gomix.me/twitch-api/streams/<channel id>

$(document).ready(function() {
	var channels = [
		'ESL_SC2',
		'OgamingSC2',
		'cretetion',
		'freecodecamp',
		'storbeck',
		'habathcx',
		'RobotCaleb',
		'noobs2ninjas'
	];

	function generateHtml(data) {
		// if statement for online channels

		if (data.stream && data.stream.channel) {
			var channelName = data.stream.channel.display_name;
			var channelStatus = data.stream.channel.status;
			var channelLogo = data.stream.channel.logo;
			var channelUrl = data.stream.channel.url;
			var channelGame = data.stream.channel.game;
			$('#online').append(
				"<div class='row'>" +
					"<div class='col'>" +
					"<img class='mx-auto' src='" +
					channelLogo +
					"' alt='Logo'>" +
					'<h3>' +
					channelName +
					'</h3>' +
					"<a href='" +
					channelUrl +
					"'>" +
					'<p>' +
					channelGame +
					': ' +
					channelStatus +
					'</p>' +
					'</a>' +
					'</div>' +
					'</div>'
			);
		} else {
			//sets offlineName to the channel name
			var offlineName = data._links.channel
				.replace('https://api.twitch.tv/kraken/channels/', '')
				.toLowerCase();

			$('#offline').append(
				"<div class='row'>" +
					"<div class='col m-2'>" +
					'<h3>' +
					offlineName +
					': Offline' +
					'</h3>' +
					'</div>' +
					'</div>'
			);
		}
	} // closes out generateHtml function

	for (var i = 0; i < channels.length; i++) {
		$.ajax({
			method: 'get',
			url: 'https://wind-bow.gomix.me/twitch-api/streams/' + channels[i],
			dataType: 'jsonp',
			success: function(data) {
				generateHtml(data);
			} //closes out success function
		}); //closes out ajax request
	} //closes out for loop
}); //closes out document ready
