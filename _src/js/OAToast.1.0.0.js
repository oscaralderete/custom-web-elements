/*!
@author: Oscar Alderete <wordpress@oscaralderete.com>
@website: https://wpe.oscaralderete.com
@editor: NetBeans IDE v12.3
*/
customElements.define('oa-toast', class extends HTMLElement{
	// properties
	time = 3.5;			// in seconds
	#resetTime = 400;	// in milliseconds, it's a private property
	#timeout = null;	// it's a private property

	constructor() {
		super();

		// set inner elements
		const section = document.createElement('section');
		this.appendChild(section);
	}

	// toggle() is a private function
	#toggle(num) {
		this.classList.toggle('active', num);
	}

	// nullTimeout() is a private function
	#nullTimeout() {
		this.#toggle(0)
		clearTimeout(this.#timeout)
		this.#timeout = null;
	}

	// displayMsg() is a private function
	#displayMsg(obj) {
		const App = {
			sanitize(str){
				return str.replace(/<(.|\n)*?>/g, '')
			}
		}

		// set message
		const section = this.querySelector('section')
		section.innerHTML = App.sanitize(obj.message)
		section.onclick = () => {
			this.#nullTimeout()
		}
		section.className = ''
		if(obj.hasOwnProperty('type') && typeof obj.type === 'string'){
			section.classList.add(App.sanitize(obj.type))
		}

		// remove all classes and assign 'top' if necessary
		this.className = '';
		if(obj.hasOwnProperty('position') && typeof obj.position === 'string'){
			this.classList.add(App.sanitize(obj.position))
		}

		// display toast
		this.#toggle(1)
		this.#timeout = setTimeout(() => {
			this.#nullTimeout()
		}, this.time * 1000)
	}

	show(obj) {
		if(typeof obj === 'object' && obj.hasOwnProperty('message') && typeof obj.message === 'string'){
			// nullify current timeout if exists
			this.#nullTimeout()
			// checking for a previous instantia
			setTimeout(() => {
				this.#displayMsg(obj)
			}, this.#resetTime)
		}
		else{
			console.error('OAToast error: You need to pass a valid message.')
		}
	}
})