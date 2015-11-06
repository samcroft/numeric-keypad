var numPad = (function(){
	var self;

	var inputEl;
	var numPadEl;

	var initialValue;

	function init(el) {
		self = this;

		numPadEl = document.getElementById(el);

		bindEvents();
	}

	function bindEvents() {
		var inputEls = document.querySelectorAll('[data-num-pad]');

		for (var i=0;i<inputEls.length;i++) {
			inputEls[i].addEventListener('focus', showNumPad, false);
		}

		var keys = numPadEl.querySelectorAll('[data-key]');

		for (var i=0; i<keys.length;i++) {
			keys[i].addEventListener('click', keyPress, false);
		}

		var confirm = numPadEl.querySelectorAll('[data-control="ok"]');

		confirm[0].addEventListener('click', confirmValue, false);

		var cancel = numPadEl.querySelectorAll('[data-control="cancel"]');

		cancel[0].addEventListener('click', cancelValue, false);
	}

	function showNumPad() {
		inputEl = this;

		initialValue = inputEl.value;

		numPadEl.style.top = (this.offsetTop + this.offsetHeight) + 'px';

		numPadEl.classList.add('num-pad--show');
	}

	function hideNumPad() {
		numPadEl.classList.remove('num-pad--show');
	}

	function keyPress(e) {
		e.preventDefault();

		var key = this.getAttribute('data-key');

		var currentInput = inputEl.value;

		if (key == 'period') {
			if (currentInput.indexOf('.') !== -1) {

				return;
			}

			key = '.';
		}

		if (key == 'delete') {
			if (inputEl.value.length) {
				inputEl.value = inputEl.value.substr(0,inputEl.value.length-1);
			}

			return;
		}

		var inputValue = currentInput+key;

		inputEl.value = inputValue;

		return;
	}

	function confirmValue(e) {
		e.preventDefault();

		hideNumPad();

		self.confirmValueCallback(inputEl);
	}

	function confirmValueCallback(el) {
		console.log('default confirm value callback');
	}

	function cancelValue(e) {
		e.preventDefault();

		hideNumPad();

		inputEl.value = initialValue;

		self.cancelValueCallback(inputEl);
	}

	function cancelValueCallback(e) {
		console.log('default cancel value callback');
	}

	return {
		init: init
	}
}());