# Custom Web Elements

This is a series of 3 <a href="https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements" target="_blank">custom web elements</a> I developed starting for learning porpuses, then I tried them in my work with and without building tools successfully.

For these integrations I used building tools, Vite to be more precisely, Vite is pure gold so I recommend everyone that's not using it already.

These are web components that you don't have to markup more than once, because they are based in the principle: "declare once and use everywhere, every time", they're accessible even to deeply nested components.

HTML:

```html
<oa-loader>
  <!--
  You can put your own SVG here if you want to customize your spinner. Please check the samples.
  -->
</oa-loader>
<oa-toast></oa-toast>
<oa-dialogs></oa-dialogs>
```

JS:

```js
/*
Next declaration let you use App.loader or App.toast or App.dialog etc. inside your code:
*/
<script defer>
const App = {
  loader: document.querySelector("oa-loader"),
  toast: document.querySelector("oa-toast"),
  dialog: document.querySelector("oa-dialogs"),
  ...
};
<script>
```

```js
/*
I've got some problems with React or Svelte components to recognize my App variable, in that case the trick is to give to your variable 'App' the global scope, actually 'window' makes it accessible everywhere using the notation:
window.App.loader or window.App.toast or window.App.dialog
*/
<script defer>
window.App = {
  loader: document.querySelector("oa-loader"),
  toast: document.querySelector("oa-toast"),
  dialog: document.querySelector("oa-dialogs"),
  ...
};
<script>

```

CSS::

```css
/*
There are available some useful :root properties to customize every element. Below are listed all of them with their default values:
*/
:root {
  --oa-dialogs-modal-bg-color: rgba(0, 0, 0, 0.5);
  --oa-dialogs-font-family: Arial, Helvetica, sans-serif;
  --oa-dialogs-bg-color: #252525;
  --oa-dialogs-title-font-color: #fff;
  --oa-dialogs-message-font-color: #fff;
  --oa-dialogs-button-font-color: #fff;
  --oa-dialogs-font-size: 1em;
  --oa-dialogs-min-width: 220px;
  --oa-dialogs-max-width: 320px;

  --oa-loader-custom-svg-speed: 0.75s;
  --oa-loader-size: 4em;
  --oa-loader-spinner: url('data:image/svg+xml,%3Csvg viewBox="0 0 128 128" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" x="0px" y="0" width="128" height="128"%3E%3Cpath fill="%23fff" opacity="0.25" d="M 14 64 C 14 36.3854 36.3854 14 64 14 C 91.6146 14 114 36.3854 114 64 C 114 91.6146 91.6146 114 64 114 C 36.3854 114 14 91.6146 14 64 ZM 0 64 C 0 99.3467 28.6533 128 64 128 C 99.3467 128 128 99.3467 128 64 C 128 28.6533 99.3467 0 64 0 C 28.6533 0 0 28.6533 0 64 Z"/%3E%3Cg%3E%3Cpath fill="%23fff" d="M 14 64 C 14 36.3854 36.3854 14 64 14 C 67.866 14 71 10.866 71 7 C 71 3.134 67.866 0 64 0 C 28.6533 0 0 28.6533 0 64 L 14 64 Z"/%3E%3CanimateTransform attributeName="transform" type="rotate" from="0 64 64" to="360 64 64" dur="0.75s" repeatCount="indefinite"/%3E%3C/g%3E%3C/svg%3E');
  --oa-loader-bg-color: rgba(0, 0, 0, 0.5);
  --oa-loader-top: 4em;

  --oa-toast-default-bg-color: #252525;
  --oa-toast-font-family: Arial, Helvetica, sans-serif;
  --oa-toast-font-color: #fff;
  --oa-toast-success-bg-color: #2dcc70;
  --oa-toast-error-bg-color: #e54c3c;
  --oa-toast-warning-bg-color: #f1c30e;
}
```

## Live sample

- [https://oscaralderete.github.io/custom-web-elements/](https://oscaralderete.github.io/custom-web-elements/)

## Integration with JS frameworks samples

- [https://oscaralderete.github.io/custom-elements-vue/dist/](https://oscaralderete.github.io/custom-elements-vue/dist/)
- [https://oscaralderete.github.io/custom-elements-svelte/dist/](https://oscaralderete.github.io/custom-elements-svelte/dist/)
- [https://oscaralderete.github.io/custom-elements-react/dist/](https://oscaralderete.github.io/custom-elements-react/dist/)
