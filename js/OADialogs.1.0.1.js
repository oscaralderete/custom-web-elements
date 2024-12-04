/*!
@author: Oscar Alderete <me@oscaralderete.com>
@website: https://oscaralderete.com
@version: 1.0.1
*/"use strict";function _typeof(obj){"@babel/helpers - typeof";return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj},_typeof(obj)}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);Object.defineProperty(Constructor,"prototype",{writable:false});return Constructor}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function")}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,writable:true,configurable:true}});Object.defineProperty(subClass,"prototype",{writable:false});if(superClass)_setPrototypeOf(subClass,superClass)}function _createSuper(Derived){var hasNativeReflectConstruct=_isNativeReflectConstruct();return function _createSuperInternal(){var Super=_getPrototypeOf(Derived),result;if(hasNativeReflectConstruct){var NewTarget=_getPrototypeOf(this).constructor;result=Reflect.construct(Super,arguments,NewTarget)}else{result=Super.apply(this,arguments)}return _possibleConstructorReturn(this,result)}}function _possibleConstructorReturn(self,call){if(call&&(_typeof(call)==="object"||typeof call==="function")){return call}else if(call!==void 0){throw new TypeError("Derived constructors may only return object or undefined")}return _assertThisInitialized(self)}function _assertThisInitialized(self){if(self===void 0){throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}return self}function _wrapNativeSuper(Class){var _cache=typeof Map==="function"?new Map:undefined;_wrapNativeSuper=function _wrapNativeSuper(Class){if(Class===null||!_isNativeFunction(Class))return Class;if(typeof Class!=="function"){throw new TypeError("Super expression must either be null or a function")}if(typeof _cache!=="undefined"){if(_cache.has(Class))return _cache.get(Class);_cache.set(Class,Wrapper)}function Wrapper(){return _construct(Class,arguments,_getPrototypeOf(this).constructor)}Wrapper.prototype=Object.create(Class.prototype,{constructor:{value:Wrapper,enumerable:false,writable:true,configurable:true}});return _setPrototypeOf(Wrapper,Class)};return _wrapNativeSuper(Class)}function _construct(Parent,args,Class){if(_isNativeReflectConstruct()){_construct=Reflect.construct}else{_construct=function _construct(Parent,args,Class){var a=[null];a.push.apply(a,args);var Constructor=Function.bind.apply(Parent,a);var instance=new Constructor;if(Class)_setPrototypeOf(instance,Class.prototype);return instance}}return _construct.apply(null,arguments)}function _isNativeReflectConstruct(){if(typeof Reflect==="undefined"||!Reflect.construct)return false;if(Reflect.construct.sham)return false;if(typeof Proxy==="function")return true;try{Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}));return true}catch(e){return false}}function _isNativeFunction(fn){return Function.toString.call(fn).indexOf("[native code]")!==-1}function _setPrototypeOf(o,p){_setPrototypeOf=Object.setPrototypeOf||function _setPrototypeOf(o,p){o.__proto__=p;return o};return _setPrototypeOf(o,p)}function _getPrototypeOf(o){_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function _getPrototypeOf(o){return o.__proto__||Object.getPrototypeOf(o)};return _getPrototypeOf(o)}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true})}else{obj[key]=value}return obj}customElements.define("oa-dialogs",function(_HTMLElement){_inherits(_class2,_HTMLElement);var _super=_createSuper(_class2);function _class2(){var _this;_classCallCheck(this,_class2);_this=_super.call(this);_defineProperty(_assertThisInitialized(_this),"labelOK","OK");_defineProperty(_assertThisInitialized(_this),"labelCANCEL","CANCEL");function getAttrText(str,def,self){return self.getAttribute(str)!==null?self.getAttribute(str):def}var section=document.createElement("section"),header=document.createElement("header"),main=document.createElement("main"),footer=document.createElement("footer"),btnOK=document.createElement("button"),btnCANCEL=document.createElement("button");btnOK.innerHTML=getAttrText("label-ok",_this.labelOK,_assertThisInitialized(_this));btnOK.classList.add("ok");btnCANCEL.innerHTML=getAttrText("label-cancel",_this.labelCANCEL,_assertThisInitialized(_this));btnCANCEL.classList.add("cancel");btnCANCEL.disabled=true;section.appendChild(header);section.appendChild(main);footer.appendChild(btnOK);footer.appendChild(btnCANCEL);section.appendChild(footer);_this.appendChild(section);return _this}_createClass(_class2,[{key:"deploy",value:function deploy(obj,onSuccess,onCancel){if(_typeof(obj)==="object"&&obj.hasOwnProperty("message")&&typeof obj.message==="string"){this.focus();var App={setDialogContent:function setDialogContent(obj,self){var main=self.querySelector("main"),header=self.querySelector("header");main.innerHTML=this.sanitize(obj.message);header.innerHTML=obj.hasOwnProperty("title")&&typeof obj.title==="string"?this.sanitize(obj.title):""},sanitize:function sanitize(str){return str.replace(/<(.|\n)*?>/g,"")},setActions:function setActions(obj,self,onSuccess,onCancel){var buttons=self.querySelectorAll("button");buttons[0].onclick=function(e){App.toggle(self,false);if(typeof onSuccess==="function"){onSuccess()}};if(obj.hasOwnProperty("showCancelButton")&&obj.showCancelButton&&typeof onCancel==="undefined"){buttons[1].disabled=false;buttons[1].onclick=function(e){App.toggle(self,false)}}else{buttons[1].disabled=true}if(typeof onCancel==="function"){buttons[1].disabled=false;buttons[1].onclick=function(e){App.toggle(self,false);onCancel()}}},toggle:function toggle(self,num){self.classList.toggle("active",num)}};App.setDialogContent(obj,this);App.setActions(obj,this,onSuccess,onCancel);App.toggle(this,true)}else{console.error("OADialogs error: You need to pass a valid message.")}}},{key:"show",value:function show(obj,callback){this.deploy(obj,callback,function(){})}}]);return _class2}(_wrapNativeSuper(HTMLElement)));
