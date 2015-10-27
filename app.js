var numPad = (function(){
	var self;

	var inputEl;
	var numPadEl;

	function init(el) {
		self = this;

		inputEl = document.getElementById(el);

		var numPadElId = inputEl.getAttribute('data-num-pad');

		numPadEl = document.getElementById(numPadElId);

		bindEvents();
	}

	function bindEvents() {
		inputEl.addEventListener('focus', showNumPad, false);

		var keys = numPadEl.querySelectorAll('[data-key]');

		for (var i=0; i<keys.length;i++) {
			keys[i].addEventListener('click', keyPress, false);
		}
	}

	function showNumPad() {
		numPadEl.classList.add('num-pad--show');
	}

	function hideNumPad() {
		numPadEl.classList.remove('num-pad--show');
	}

	function keyPress(e) {
		e.preventDefault();

		var key = this.getAttribute('data-key');

		var currentInput = inputEl.value;

		if (key == 'delete') {
			if (inputEl.value.length) {
				inputEl.value = inputEl.value.substr(0,inputEl.value.length-1);
			}

			return;
		}

		inputEl.value = currentInput+key;
	}

	return {
		init: init
	}
}());