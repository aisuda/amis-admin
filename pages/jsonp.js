(function() {
	const response = {
		data: {
			type: "page",
			title: "标题",
			body: "this result is from jsonp"
		},
		status: 0
	}

	window.jsonpCallback && window.jsonpCallback(response);
})();
