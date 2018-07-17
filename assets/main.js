var main = (function() {
	var listHolder = $('<div class="list-holder"></div>')
	
	function init() {
		var list = $('<ul></ul>')

		$.getJSON('/stos', function(res) {
			res.forEach(function(el) {
				list.append(
					'<li style="border-bottom: 1px solid black">' +
						'<p>' + el.id + '</p>' +
						'<p>' + el.name + '</p>' +
						'<p>' + el.address + '</p>' +
						'<p>' + el.tel + '</p>' +
						'<p><a href="/sto-details/' + el.id + '">Details</a></p>' +
					'</li>'
				)
			})

			listHolder.append(list)
			$('body').append(listHolder)
		})
	}

	return {
		init: init
	}
}())

main.init();