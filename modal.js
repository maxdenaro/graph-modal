
class Modal {
	constructor() {
		this.$elements = document.querySelectorAll('[data-graph-path]');
		this.$modals = document.querySelectorAll('[data-graph-target]');
		this.$closeElements = document.querySelectorAll('.modal__close');
		this.$modal = document.querySelector('.modal');
		this.body = document.body;
		this.previousActiveElement;
		this.fixBlocks = document.querySelectorAll('.fix-block')
		this.events();
	}

	events() {
		if (this.$elements) {
			this.$elements.forEach(el => {
				el.addEventListener('click', (e) => {
					this.open(e.currentTarget.dataset.graphPath);
				});
			});

			this.$closeElements.forEach(el => {
				el.addEventListener('click', (e) => {
					this.close();
				});
			});

			document.addEventListener('keydown', (e) => {
				if (e.keyCode == 27) {
					this.close();
				}
			});

			this.$modal.addEventListener('click', (e) => {
				if (!e.target.classList.contains('modal__container') && !e.target.closest('.modal__container')) {
					this.close();
				}
			});
		}
	}

	open(path) {
		this.$modal.classList.add('is-open');
		this.disableScroll();
		document.querySelector(`[data-graph-target="${path}"]`).classList.add('modal-open');
	}
	
	close() {
		this.$modals.forEach(el => {
			el.classList.remove('modal-open');
		});
		this.$modal.classList.remove('is-open');
		this.enableScroll();
	}

	disableScroll() {
		let pagePosition = window.scrollY;
		this.lockPadding();
		this.body.classList.add('disable-scroll');
		this.body.dataset.position = pagePosition;
		this.body.style.top = -pagePosition + 'px';
	}

	enableScroll() {
		let pagePosition = parseInt(this.body.dataset.position, 10);
		this.unlockPadding();
		this.body.style.top = 'auto';
		this.body.classList.remove('disable-scroll');
		window.scroll({
			top: pagePosition,
			left: 0
		});
		this.body.removeAttribute('data-position');
	}

	lockPadding() {
		let paddingOffset = window.innerWidth - this.body.offsetWidth + 'px';
		this.fixBlocks.forEach((el) => {
			el.style.paddingRight = paddingOffset;
		});
		this.body.style.paddingRight = paddingOffset;
	}

	unlockPadding() {
		this.fixBlocks.forEach((el) => {
			el.style.paddingRight = '0px';
		});
		this.body.style.paddingRight = '0px';
	}
}

const modal = new Modal();

// this.$closeElements.forEach(el => {
// 	el.addEventListener('click', (e) => {
// 		this.close();
// 	});
// });

// this.$modal.addEventListener('click', (e) => {
// 	if (e.target !== document.querySelector('.modal-window')) {
// 		this.close();
// 	}
// });

// open(path) {
// 	const currentModal = document.querySelector(`[data-target="${path}"]`);
// 	this.$modal.classList.add('modal-open')
// 	currentModal.classList.add(this.themeClass);
// 	this.disableScroll();

// 	this.previousActiveElement = document.activeElement;

// 	Array.from(this.body.children).forEach((child) => {
// 		if (child !== document.querySelector('.modal')) {
// 			child.inert = true;
// 		}
// 	});

// 	currentModal.inert = false;

// 	setTimeout(() => {
// 		currentModal.querySelector('.modal-close').focus();
// 	}, 100);

// 	document.addEventListener('keydown', (e) => {
// 		if (e.keyCode == 27) {
// 			this.close();
// 		}
// 	});

// }

// close() {
// 	document.querySelectorAll('.modal-window').forEach(el => el.classList.remove((this.themeClass)));
// 	const currentModal = document.querySelector('.modal-window');
// 	currentModal.classList.remove(this.themeClass);
// 	this.$modal.classList.remove('modal-open');
// 	this.enableScroll();

// 	Array.from(this.body.children).forEach((child) => {
// 		if (child !== document.querySelector('.modal')) {
// 			child.inert = false;
// 		}
// 	});

// 	currentModal.inert = true;

// 	setTimeout(() => {
// 		this.previousActiveElement.focus();
// 	}, 100);
// }
