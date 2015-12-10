
function connectWithTwitch() {
	window.open('https://api.twitch.tv/kraken/oauth2/authorize' +
    '?response_type=code' +
    '&client_id=1k39wvr3rqqflo62e50wovbfy8h519u' +
    '&redirect_uri=http://localhost:8080/twitch_redirect' +
    '&scope=user_read' +
    '&state=tmp_state', 'Log in with Twitch', 'width=600, height=600');
}