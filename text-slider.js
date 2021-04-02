/**
  *  Text-Slider.js
  *  Author: Tisserand David
  *  Version: 1.0
  *  Date 2020-02-22
  *  Infos: Need JQUERY
  */

function TextSlider (target, options) {
	
	/* Construct */
	var obj = {};
	obj.target = $(target);
	obj.items = $(target+' > .item');

	var options = options || [];

	/* Default Config */
	var defaults = {
		pause: 4000,			// Pause when text fixed in ms
		speed: 1000,			// Speed Animation in ms
		centered: true,			// If the text is simply centered
		opacity: false,			// Opacity animation
		alternate: true,
		direction: 'random',
	}
	obj.options = $.extend({}, defaults, options);

	obj.interval = obj.options.pause+(obj.options.speed*2);
	obj.linesWidth = [];
	var opacity = obj.options.opacity ? '0' : '1';

	obj.state = -1;


	obj.setTransition = function (lines, enable) {
		if (enable)
			lines.css({'transition': 'all '+obj.options.speed+'ms linear'});
		else 
			lines.css({'transition' : 'none'});
	}

	obj.change = function () {

		$(obj.items).hide();

		if (obj.state+1 < $(obj.items).length) {
			obj.state++;
			
		} else {
			obj.state = 0;
		}

		obj.items.eq(obj.state).show();

		var lines = obj.items.eq(obj.state).children();

		obj.setTransition(lines, false);
		if (obj.options.opacity) {
			$(lines).css('opacity', '0');
		}

		if (obj.options.direction=='right' || obj.options.direction == 'left') {
			var direction = obj.options.direction;
		} else {
			var rand = Math.floor((Math.random() * 2) + 1);
			var direction = rand == 1 ? 'left' : 'right';
		}

		for (var i = 0; i < lines.length; i++) {
			if (direction == 'left') {
				if (obj.options.alternate && i % 2 == 0) {
					$(lines).eq(i).css('transform', 'translate(-100%)');
				} else {
					$(lines).eq(i).css('transform', 'translate(100%)');
				}
			} else {
				if (obj.options.alternate && i % 2 == 0) {
					console.log('left');
					$(lines).eq(i).css('transform', 'translate(100%)');
				} else {
					$(lines).eq(i).css('transform', 'translate(-100%)');
				}
			}
			$(lines).eq(i).css('transform');
		};
		obj.setTransition(lines, true);
		if (obj.options.opacity) {
			lines.css('opacity', '1');
		}
		lines.css('transform', 'translate(0)');


		// PAUSE
		setTimeout(function(){

			if (obj.options.direction=='right' || obj.options.direction == 'left') {
				var direction = obj.options.direction;
			} else {
				var rand = Math.floor((Math.random() * 2) + 1);
				var direction = rand == 1 ? 'left' : 'right';
			}

			if (direction == 'left') {
				for (var i = 0; i < lines.length; i++) {
					if (obj.options.alternate && i % 2 == 0) {
						$(lines).eq(i).css('transform', 'translate(100%)');
					} else {
						$(lines).eq(i).css('transform', 'translate(-100%)');
					}
				};
				
			} else {
				for (var i = 0; i < lines.length; i++) {
					if (obj.options.alternate && i % 2 == 0) {
						$(lines).eq(i).css('transform', 'translate(-100%)');
					} else {
						$(lines).eq(i).css('transform', 'translate(100%)');
					}
				};		
			}
			if (obj.options.opacity) {
				$(lines).css('opacity', '0');
			}
		}, obj.options.speed+obj.options.pause);

	};

	obj.change();
	setInterval(obj.change, obj.interval);

}