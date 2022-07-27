// JS that Lasantha wrote to switch folks that go to netdonor

if (window.location.href.indexOf('netdonor.net') > 0) {
	window.location.href = window.location.href.replace('netdonor.net', 'e-activist.com');
}
