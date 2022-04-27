/*!
 @author: Oscar Alderete <wordpress@oscaralderete.com>
 @website: https://wpe.oscaralderete.com
 @editor: NetBeans IDE v12.3
 */
customElements.define('oa-loader', class extends HTMLElement {
	constructor() {
		const App = {
			init(self) {
				// parse inner html
				const svg = self.getElementsByTagName('svg');

				if (svg.length > 0) {
					// check if innerHtml is an svg
					self.style.backgroundImage = 'none'
					const inner = svg[0]
					self.innerHTML = '';
					self.appendChild(inner)
				}
				else {
					// to avoid display extra content
					self.innerHTML = '';
				}

			}
		}

		super();

		App.init(this)
	}

	show() {
		this.toggle(1)
		this.focus();
	}

	hide() {
		this.toggle(0)
	}

	toggle(bool) {
		this.classList.toggle('active', bool);
	}
});