/*!
 @author: Oscar Alderete <oscaralderete@gmail.com>
 @website: https://wpe.oscaralderete.com
 */


export class OaLoader extends HTMLElement {
  constructor() {
    const App = {
      init(self: HTMLElement): void {
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

  show(): void {
    this.toggle(true)
    this.focus();
  }

  hide(): void {
    this.toggle(false)
  }

  toggle(bool: boolean): void {
    this.classList.toggle('active', bool);
  }
};

export class OaToast extends HTMLElement {
  // properties
  time = 3.5;			// in seconds
  #resetTime = 400;	// in milliseconds, this is a private property
  #timeout: any | null = null;	// this is a private property

  constructor() {
    super();

    // set inner elements
    const section = document.createElement('section');
    this.appendChild(section);
  }

  // toggle() is a private function
  #toggle(bool: boolean): void {
    this.classList.toggle('active', bool);
  }

  // nullTimeout() is a private function
  #nullTimeout(): void {
    this.#toggle(false)
    clearTimeout(this.#timeout)
    this.#timeout = null;
  }

  // displayMsg() is a private function
  #displayMsg(obj: any): void {
    const App = {
      sanitize(str: string) {
        return str.replace(/<(.|\n)*?>/g, '')
      }
    }

    // set message
    const section: HTMLElement = this.querySelector('section') as HTMLElement
    section.innerHTML = App.sanitize(obj.message)
    section.onclick = () => {
      this.#nullTimeout()
    }
    section.className = ''
    if (obj.hasOwnProperty('type') && typeof obj.type === 'string') {
      section.classList.add(App.sanitize(obj.type))
    }

    // remove all classes and assign 'top' if necessary
    this.className = '';
    if (obj.hasOwnProperty('position') && typeof obj.position === 'string') {
      this.classList.add(App.sanitize(obj.position))
    }

    // display toast
    this.#toggle(true)
    this.#timeout = setTimeout(() => {
      this.#nullTimeout()
    }, this.time * 1000)
  }

  show(param: any): void {
    let x = { type: 'default', message: '' }
    // check the typeof param
    if (typeof param === 'string') {
      x.message = param
    }
    else if (typeof param === 'object' && param.hasOwnProperty('message') && typeof param.message === 'string') {
      x = { ...param }
    }

    if (x.hasOwnProperty('message') && typeof x.message === 'string') {

      // nullify current timeout if exists
      this.#nullTimeout()
      // checking for a previous instantia
      setTimeout(() => {
        this.#displayMsg(x)
      }, this.#resetTime)
    }
    else {
      console.error('OAToast error: You need to pass a valid message.')
    }
  }

  // new shorcuts: error, success + warning
  error(str: string): void {
    this.show({
      type: 'error',
      message: str,
    })
  }

  success(str: string): void {
    this.show({
      type: 'success',
      message: str,
    })
  }

  warning(str: string): void {
    this.show({
      type: 'warning',
      message: str,
    })
  }
}

export class OaDialog extends HTMLElement {
  labelOK = 'OK';
  labelCANCEL = 'CANCEL';
  labelTitle = '';

  constructor() {
    super()

    // inner functions
    function getAttrText(str: string, def: string, self: any): string {
      return self.getAttribute(str) !== null ? self.getAttribute(str) : def;
    }

    // set inner elements
    const section = document.createElement('section'),
      header = document.createElement('header'),
      main = document.createElement('main'),
      footer = document.createElement('footer'),
      btnOK: HTMLButtonElement = document.createElement('button') as HTMLButtonElement,
      btnCANCEL: HTMLButtonElement = document.createElement('button') as HTMLButtonElement;

    // buttons
    btnOK.innerHTML = getAttrText('label-ok', this.labelOK, this)
    btnOK.classList.add('ok')
    btnCANCEL.innerHTML = getAttrText('label-cancel', this.labelCANCEL, this)
    btnCANCEL.classList.add('cancel')
    btnCANCEL.disabled = true;

    // dialog title
    header.setAttribute('label-title', getAttrText('label-title', this.labelTitle, this))

    // set default inner html
    section.appendChild(header)
    section.appendChild(main)

    // add buttons
    footer.appendChild(btnOK)
    footer.appendChild(btnCANCEL)
    section.appendChild(footer)

    this.appendChild(section);
  }

  deploy(obj: any, onSuccess: Function, onCancel: Function): void {
    if (typeof obj === 'object' && obj.hasOwnProperty('message') && typeof obj.message === 'string') {
      this.focus()

      const App = {
        setDialogContent(obj: any, self: any) {
          const main = self.querySelector('main'),
            header = self.querySelector('header');

          // message
          main.innerHTML = this.sanitize(obj.message)

          // title
          header.innerHTML = obj.hasOwnProperty('title') && typeof obj.title === 'string' ? this.sanitize(obj.title) : header.getAttribute('label-title');
        },
        sanitize(str: string) {
          return str.replace(/<(.|\n)*?>/g, '')
        },
        setActions(obj: any, self: any, onSuccess: Function, onCancel: Function) {
          const buttons = self.querySelectorAll('button');

          // button OK
          buttons[0].onclick = () => {
            App.toggle(self, false);
            if (typeof onSuccess === 'function') {
              onSuccess()
            }
          }

          // show button CANCEL if proceed
          if (obj.hasOwnProperty('showCancelButton') && obj.showCancelButton && typeof onCancel === 'undefined') {
            buttons[1].disabled = false;
            buttons[1].onclick = () => {
              App.toggle(self, false);
            }
          }
          else {
            buttons[1].disabled = true;
          }

          // button CANCEL
          if (typeof onCancel === 'function') {
            buttons[1].disabled = false;
            buttons[1].onclick = () => {
              App.toggle(self, false);
              onCancel()
            }
          }
        },
        toggle(self: any, bool: boolean) {
          self.classList.toggle('active', bool);
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

  // new methods
  show(obj: any, callback: Function): void {
    this.deploy(obj, callback, () => { })
  }

  set(str: string, callback: Function): void {
    this.deploy({
      message: str,
    }, callback, () => { })
  }
}

customElements.define('oa-loader', OaLoader);

customElements.define('oa-toast', OaToast)

customElements.define('oa-dialogs', OaDialog)
