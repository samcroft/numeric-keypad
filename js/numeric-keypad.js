var numPad = (function(){
	var self;

	var inputEl;
	var numPadEl;

	var keys = [7,8,9,4,5,6,1,2,3,0,'.','Del','Ok','Cancel'];

	var initialValue;

	function init() {
		self = this;

		createKeyPad();

		bindEvents();
	}

	function createKeyPad() {
		numPadEl = document.createElement('ul');
		numPadEl.setAttribute('id', 'numeric-keypad');
		numPadEl.className = 'numeric-keypad';

		for (var i=0; i<keys.length;i++) {
			var numPadKeyEl = document.createElement('li');
			numPadKeyEl.className = 'numeric-keypad__key';

			if (keys[i] == 'Ok') {
				numPadKeyEl.classList.add('numeric-keypad__key--double');
			}

			var numPadButtonEl = document.createElement('button');
			numPadButtonEl.setAttribute('data-key', keys[i]);
			numPadButtonEl.className = 'numeric-keypad__button';

			numPadButtonEl.innerHTML = keys[i];

			numPadKeyEl.appendChild(numPadButtonEl);
			numPadEl.appendChild(numPadKeyEl);
		}

		console.log(numPadEl);

		document.body.appendChild(numPadEl);
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

		var confirm = numPadEl.querySelectorAll('[data-key="Ok"]');

		confirm[0].addEventListener('click', confirmValue, false);

		var cancel = numPadEl.querySelectorAll('[data-key="Cancel"]');

		cancel[0].addEventListener('click', cancelValue, false);
	}

	function showNumPad() {
		inputEl = this;

		initialValue = inputEl.value;

		numPadEl.style.top = (this.offsetTop + this.offsetHeight) + 'px';

		numPadEl.classList.add('numeric-keypad--show');
	}

	function hideNumPad() {
		numPadEl.classList.remove('numeric-keypad--show');
	}

	function keyPress(e) {
		e.preventDefault();

		var key = this.getAttribute('data-key');

		var currentInput = inputEl.value;

		if (key == '.') {
			if (currentInput.indexOf('.') !== -1) {

				return;
			}
		}

		if (key == 'Del') {
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

		confirmValueCallback(inputEl);
	}

	function confirmValueCallback(el) {
		console.log('default confirm value callback');
	}

	function cancelValue(e) {
		e.preventDefault();

		hideNumPad();

		inputEl.value = initialValue;

		cancelValueCallback(inputEl);
	}

	function cancelValueCallback(e) {
		console.log('default cancel value callback');
	}

	return {
		init: init
	}
}());