/*!
 @author: Oscar Alderete <wordpress@oscaralderete.com>
 @website: https://wpe.oscaralderete.com
 @editor: NetBeans IDE v12.3
 */
customElements.define('oa-dialogs', class extends HTMLElement {
	labelOK = 'OK';
	labelCANCEL = 'CANCEL';

	constructor() {
		super()

		// inner functions
		function getAttrText(str, def, self) {
			return self.getAttribute(str) !== null ? self.getAttribute(str) : def;
		}

		// set inner elements
		const section = document.createElement('section'),
			header = document.createElement('header'),
			main = document.createElement('main'),
			footer = document.createElement('footer'),
			btnOK = document.createElement('button'),
			btnCANCEL = document.createElement('button');

		// buttons
		btnOK.innerHTML = getAttrText('label-ok', this.labelOK, this)
		btnOK.classList.add('ok')
		btnCANCEL.innerHTML = getAttrText('label-cancel', this.labelCANCEL, this)
		btnCANCEL.classList.add('cancel')
		btnCANCEL.disabled = true;

		// set default inner html
		section.appendChild(header)
		section.appendChild(main)

		// add buttons
		footer.appendChild(btnOK)
		footer.appendChild(btnCANCEL)
		section.appendChild(footer)

		this.appendChild(section);
	}

	deploy(obj, onSuccess, onCancel) {
		if (typeof obj === 'object' && obj.hasOwnProperty('message') && typeof obj.message === 'string') {
			this.focus()

			const App = {
				setDialogContent(obj, self) {
					const main = self.querySelector('main'),
						header = self.querySelector('header');

					// message
					main.innerHTML = this.sanitize(obj.message)

					// title
					header.innerHTML = obj.hasOwnProperty('title') && typeof obj.title === 'string' ? this.sanitize(obj.title) : '';
				},
				sanitize(str) {
					return str.replace(/<(.|\n)*?>/g, '')
				},
				setActions(obj, self, onSuccess, onCancel) {
					const buttons = self.querySelectorAll('button');

					// button OK
					buttons[0].onclick = e => {
						App.toggle(self, false);
						if (typeof onSuccess === 'function') {
							onSuccess()
						}
					}

					// show button CANCEL if proceed
					if(obj.hasOwnProperty('showCancelButton') && obj.showCancelButton && typeof onCancel === 'undefined'){
						buttons[1].disabled = false;
						buttons[1].onclick = e => {
							App.toggle(self, false);
						}
					}
					else{
						buttons[1].disabled = true;
					}

					// button CANCEL
					if (typeof onCancel === 'function') {
						buttons[1].disabled = false;
						buttons[1].onclick = e => {
							App.toggle(self, false);
							onCancel()
						}
					}
				},
				toggle(self, num) {
					self.classList.toggle('active', num);
				}
			}

			// set dialog content
			App.setDialogContent(obj, this);

			// set button actions
			App.setActions(obj, this, onSuccess, onCancel)

			// show the dialog
			App.toggle(this, true);
		}
		else {
			console.error('OADialogs error: You need to pass a valid message.')
		}
	}
})