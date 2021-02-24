!function(t){"use strict";
/**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */const e="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,s=(t,e,s=null)=>{for(;e!==s;){const s=e.nextSibling;t.removeChild(e),e=s}},n=`{{lit-${String(Math.random()).slice(2)}}}`,o=`\x3c!--${n}--\x3e`,i=new RegExp(`${n}|${o}`),r="$lit$";class a{constructor(t,e){this.parts=[],this.element=e;const s=[],o=[],a=document.createTreeWalker(e.content,133,null,!1);let c=0,u=-1,p=0;const{strings:g,values:{length:m}}=t;for(;p<m;){const t=a.nextNode();if(null!==t){if(u++,1===t.nodeType){if(t.hasAttributes()){const e=t.attributes,{length:s}=e;let n=0;for(let t=0;t<s;t++)l(e[t].name,r)&&n++;for(;n-- >0;){const e=g[p],s=h.exec(e)[2],n=s.toLowerCase()+r,o=t.getAttribute(n);t.removeAttribute(n);const a=o.split(i);this.parts.push({type:"attribute",index:u,name:s,strings:a}),p+=a.length-1}}"TEMPLATE"===t.tagName&&(o.push(t),a.currentNode=t.content)}else if(3===t.nodeType){const e=t.data;if(e.indexOf(n)>=0){const n=t.parentNode,o=e.split(i),a=o.length-1;for(let e=0;e<a;e++){let s,i=o[e];if(""===i)s=d();else{const t=h.exec(i);null!==t&&l(t[2],r)&&(i=i.slice(0,t.index)+t[1]+t[2].slice(0,-r.length)+t[3]),s=document.createTextNode(i)}n.insertBefore(s,t),this.parts.push({type:"node",index:++u})}""===o[a]?(n.insertBefore(d(),t),s.push(t)):t.data=o[a],p+=a}}else if(8===t.nodeType)if(t.data===n){const e=t.parentNode;null!==t.previousSibling&&u!==c||(u++,e.insertBefore(d(),t)),c=u,this.parts.push({type:"node",index:u}),null===t.nextSibling?t.data="":(s.push(t),u--),p++}else{let e=-1;for(;-1!==(e=t.data.indexOf(n,e+1));)this.parts.push({type:"node",index:-1}),p++}}else a.currentNode=o.pop()}for(const t of s)t.parentNode.removeChild(t)}}const l=(t,e)=>{const s=t.length-e.length;return s>=0&&t.slice(s)===e},c=t=>-1!==t.index,d=()=>document.createComment(""),h=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function u(t,e){const{element:{content:s},parts:n}=t,o=document.createTreeWalker(s,133,null,!1);let i=g(n),r=n[i],a=-1,l=0;const c=[];let d=null;for(;o.nextNode();){a++;const t=o.currentNode;for(t.previousSibling===d&&(d=null),e.has(t)&&(c.push(t),null===d&&(d=t)),null!==d&&l++;void 0!==r&&r.index===a;)r.index=null!==d?-1:r.index-l,i=g(n,i),r=n[i]}c.forEach((t=>t.parentNode.removeChild(t)))}const p=t=>{let e=11===t.nodeType?0:1;const s=document.createTreeWalker(t,133,null,!1);for(;s.nextNode();)e++;return e},g=(t,e=-1)=>{for(let s=e+1;s<t.length;s++){const e=t[s];if(c(e))return s}return-1};
/**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */
const m=new WeakMap,f=t=>(...e)=>{const s=t(...e);return m.set(s,!0),s},y=t=>"function"==typeof t&&m.has(t),b={},v={};
/**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */
class _{constructor(t,e,s){this.__parts=[],this.template=t,this.processor=e,this.options=s}update(t){let e=0;for(const s of this.__parts)void 0!==s&&s.setValue(t[e]),e++;for(const t of this.__parts)void 0!==t&&t.commit()}_clone(){const t=e?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),s=[],n=this.template.parts,o=document.createTreeWalker(t,133,null,!1);let i,r=0,a=0,l=o.nextNode();for(;r<n.length;)if(i=n[r],c(i)){for(;a<i.index;)a++,"TEMPLATE"===l.nodeName&&(s.push(l),o.currentNode=l.content),null===(l=o.nextNode())&&(o.currentNode=s.pop(),l=o.nextNode());if("node"===i.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(l.previousSibling),this.__parts.push(t)}else this.__parts.push(...this.processor.handleAttributeExpressions(l,i.name,i.strings,this.options));r++}else this.__parts.push(void 0),r++;return e&&(document.adoptNode(t),customElements.upgrade(t)),t}}
/**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */const w=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:t=>t}),S=` ${n} `;class x{constructor(t,e,s,n){this.strings=t,this.values=e,this.type=s,this.processor=n}getHTML(){const t=this.strings.length-1;let e="",s=!1;for(let i=0;i<t;i++){const t=this.strings[i],a=t.lastIndexOf("\x3c!--");s=(a>-1||s)&&-1===t.indexOf("--\x3e",a+1);const l=h.exec(t);e+=null===l?t+(s?S:o):t.substr(0,l.index)+l[1]+l[2]+r+l[3]+n}return e+=this.strings[t],e}getTemplateElement(){const t=document.createElement("template");let e=this.getHTML();return void 0!==w&&(e=w.createHTML(e)),t.innerHTML=e,t}}
/**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */const k=t=>null===t||!("object"==typeof t||"function"==typeof t),C=t=>Array.isArray(t)||!(!t||!t[Symbol.iterator]);class E{constructor(t,e,s){this.dirty=!0,this.element=t,this.name=e,this.strings=s,this.parts=[];for(let t=0;t<s.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new P(this)}_getValue(){const t=this.strings,e=t.length-1,s=this.parts;if(1===e&&""===t[0]&&""===t[1]){const t=s[0].value;if("symbol"==typeof t)return String(t);if("string"==typeof t||!C(t))return t}let n="";for(let o=0;o<e;o++){n+=t[o];const e=s[o];if(void 0!==e){const t=e.value;if(k(t)||!C(t))n+="string"==typeof t?t:String(t);else for(const e of t)n+="string"==typeof e?e:String(e)}}return n+=t[e],n}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class P{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===b||k(t)&&t===this.value||(this.value=t,y(t)||(this.committer.dirty=!0))}commit(){for(;y(this.value);){const t=this.value;this.value=b,t(this)}this.value!==b&&this.committer.commit()}}class ${constructor(t){this.value=void 0,this.__pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(d()),this.endNode=t.appendChild(d())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t.__insert(this.startNode=d()),t.__insert(this.endNode=d())}insertAfterPart(t){t.__insert(this.startNode=d()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this.__pendingValue=t}commit(){if(null===this.startNode.parentNode)return;for(;y(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=b,t(this)}const t=this.__pendingValue;t!==b&&(k(t)?t!==this.value&&this.__commitText(t):t instanceof x?this.__commitTemplateResult(t):t instanceof Node?this.__commitNode(t):C(t)?this.__commitIterable(t):t===v?(this.value=v,this.clear()):this.__commitText(t))}__insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}__commitNode(t){this.value!==t&&(this.clear(),this.__insert(t),this.value=t)}__commitText(t){const e=this.startNode.nextSibling,s="string"==typeof(t=null==t?"":t)?t:String(t);e===this.endNode.previousSibling&&3===e.nodeType?e.data=s:this.__commitNode(document.createTextNode(s)),this.value=t}__commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof _&&this.value.template===e)this.value.update(t.values);else{const s=new _(e,t.processor,this.options),n=s._clone();s.update(t.values),this.__commitNode(n),this.value=s}}__commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let s,n=0;for(const o of t)s=e[n],void 0===s&&(s=new $(this.options),e.push(s),0===n?s.appendIntoPart(this):s.insertAfterPart(e[n-1])),s.setValue(o),s.commit(),n++;n<e.length&&(e.length=n,this.clear(s&&s.endNode))}clear(t=this.startNode){s(this.startNode.parentNode,t.nextSibling,this.endNode)}}class T{constructor(t,e,s){if(this.value=void 0,this.__pendingValue=void 0,2!==s.length||""!==s[0]||""!==s[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=s}setValue(t){this.__pendingValue=t}commit(){for(;y(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=b,t(this)}if(this.__pendingValue===b)return;const t=!!this.__pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=t),this.__pendingValue=b}}class N extends E{constructor(t,e,s){super(t,e,s),this.single=2===s.length&&""===s[0]&&""===s[1]}_createPart(){return new B(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class B extends P{}let A=!1;(()=>{try{const t={get capture(){return A=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}})();class q{constructor(t,e,s){this.value=void 0,this.__pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=s,this.__boundHandleEvent=t=>this.handleEvent(t)}setValue(t){this.__pendingValue=t}commit(){for(;y(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=b,t(this)}if(this.__pendingValue===b)return;const t=this.__pendingValue,e=this.value,s=null==t||null!=e&&(t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive),n=null!=t&&(null==e||s);s&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),n&&(this.__options=R(t),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=t,this.__pendingValue=b}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const R=t=>t&&(A?{capture:t.capture,passive:t.passive,once:t.once}:t.capture)
/**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */;function O(t){let e=V.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},V.set(t.type,e));let s=e.stringsArray.get(t.strings);if(void 0!==s)return s;const o=t.strings.join(n);return s=e.keyString.get(o),void 0===s&&(s=new a(t,t.getTemplateElement()),e.keyString.set(o,s)),e.stringsArray.set(t.strings,s),s}const V=new Map,I=new WeakMap;
/**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */const M=new
/**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */
class{handleAttributeExpressions(t,e,s,n){const o=e[0];if("."===o){return new N(t,e.slice(1),s).parts}if("@"===o)return[new q(t,e.slice(1),n.eventContext)];if("?"===o)return[new T(t,e.slice(1),s)];return new E(t,e,s).parts}handleTextExpression(t){return new $(t)}};
/**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.3.0");const U=(t,...e)=>new x(t,e,"html",M)
/**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */,z=(t,e)=>`${t}--${e}`;let j=!0;void 0===window.ShadyCSS?j=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),j=!1);const H=t=>e=>{const s=z(e.type,t);let o=V.get(s);void 0===o&&(o={stringsArray:new WeakMap,keyString:new Map},V.set(s,o));let i=o.stringsArray.get(e.strings);if(void 0!==i)return i;const r=e.strings.join(n);if(i=o.keyString.get(r),void 0===i){const s=e.getTemplateElement();j&&window.ShadyCSS.prepareTemplateDom(s,t),i=new a(e,s),o.keyString.set(r,i)}return o.stringsArray.set(e.strings,i),i},L=["html","svg"],D=new Set,F=(t,e,s)=>{D.add(t);const n=s?s.element:document.createElement("template"),o=e.querySelectorAll("style"),{length:i}=o;if(0===i)return void window.ShadyCSS.prepareTemplateStyles(n,t);const r=document.createElement("style");for(let t=0;t<i;t++){const e=o[t];e.parentNode.removeChild(e),r.textContent+=e.textContent}(t=>{L.forEach((e=>{const s=V.get(z(e,t));void 0!==s&&s.keyString.forEach((t=>{const{element:{content:e}}=t,s=new Set;Array.from(e.querySelectorAll("style")).forEach((t=>{s.add(t)})),u(t,s)}))}))})(t);const a=n.content;s?function(t,e,s=null){const{element:{content:n},parts:o}=t;if(null==s)return void n.appendChild(e);const i=document.createTreeWalker(n,133,null,!1);let r=g(o),a=0,l=-1;for(;i.nextNode();)for(l++,i.currentNode===s&&(a=p(e),s.parentNode.insertBefore(e,s));-1!==r&&o[r].index===l;){if(a>0){for(;-1!==r;)o[r].index+=a,r=g(o,r);return}r=g(o,r)}}(s,r,a.firstChild):a.insertBefore(r,a.firstChild),window.ShadyCSS.prepareTemplateStyles(n,t);const l=a.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==l)e.insertBefore(l.cloneNode(!0),e.firstChild);else if(s){a.insertBefore(r,a.firstChild);const t=new Set;t.add(r),u(s,t)}};window.JSCompiler_renameProperty=(t,e)=>t;const W={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:return null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return null!==t;case Number:return null===t?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}},J=(t,e)=>e!==t&&(e==e||t==t),Y={attribute:!0,type:String,converter:W,reflect:!1,hasChanged:J},K="finalized";class G extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const t=[];return this._classProperties.forEach(((e,s)=>{const n=this._attributeNameForProperty(s,e);void 0!==n&&(this._attributeToPropertyMap.set(n,s),t.push(n))})),t}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach(((t,e)=>this._classProperties.set(e,t)))}}static createProperty(t,e=Y){if(this._ensureClassProperties(),this._classProperties.set(t,e),e.noAccessor||this.prototype.hasOwnProperty(t))return;const s="symbol"==typeof t?Symbol():`__${t}`,n=this.getPropertyDescriptor(t,s,e);void 0!==n&&Object.defineProperty(this.prototype,t,n)}static getPropertyDescriptor(t,e,s){return{get(){return this[e]},set(n){const o=this[t];this[e]=n,this.requestUpdateInternal(t,o,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this._classProperties&&this._classProperties.get(t)||Y}static finalize(){const t=Object.getPrototypeOf(this);if(t.hasOwnProperty(K)||t.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties,e=[...Object.getOwnPropertyNames(t),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[]];for(const s of e)this.createProperty(s,t[s])}}static _attributeNameForProperty(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}static _valueHasChanged(t,e,s=J){return s(t,e)}static _propertyValueFromAttribute(t,e){const s=e.type,n=e.converter||W,o="function"==typeof n?n:n.fromAttribute;return o?o(t,s):t}static _propertyValueToAttribute(t,e){if(void 0===e.reflect)return;const s=e.type,n=e.converter;return(n&&n.toAttribute||W.toAttribute)(t,s)}initialize(){this._updateState=0,this._updatePromise=new Promise((t=>this._enableUpdatingResolver=t)),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach(((t,e)=>{if(this.hasOwnProperty(e)){const t=this[e];delete this[e],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(e,t)}}))}_applyInstanceProperties(){this._instanceProperties.forEach(((t,e)=>this[e]=t)),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(t,e,s){e!==s&&this._attributeToProperty(t,s)}_propertyToAttribute(t,e,s=Y){const n=this.constructor,o=n._attributeNameForProperty(t,s);if(void 0!==o){const t=n._propertyValueToAttribute(e,s);if(void 0===t)return;this._updateState=8|this._updateState,null==t?this.removeAttribute(o):this.setAttribute(o,t),this._updateState=-9&this._updateState}}_attributeToProperty(t,e){if(8&this._updateState)return;const s=this.constructor,n=s._attributeToPropertyMap.get(t);if(void 0!==n){const t=s.getPropertyOptions(n);this._updateState=16|this._updateState,this[n]=s._propertyValueFromAttribute(e,t),this._updateState=-17&this._updateState}}requestUpdateInternal(t,e,s){let n=!0;if(void 0!==t){const o=this.constructor;s=s||o.getPropertyOptions(t),o._valueHasChanged(this[t],e,s.hasChanged)?(this._changedProperties.has(t)||this._changedProperties.set(t,e),!0!==s.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,s))):n=!1}!this._hasRequestedUpdate&&n&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(t,e){return this.requestUpdateInternal(t,e),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(t){}const t=this.performUpdate();return null!=t&&await t,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let t=!1;const e=this._changedProperties;try{t=this.shouldUpdate(e),t?this.update(e):this._markUpdated()}catch(e){throw t=!1,this._markUpdated(),e}t&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(e)),this.updated(e))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(t){return!0}update(t){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach(((t,e)=>this._propertyToAttribute(e,this[e],t))),this._reflectingProperties=void 0),this._markUpdated()}updated(t){}firstUpdated(t){}}G.finalized=!0;
/**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */
const Q=t=>e=>"function"==typeof e?((t,e)=>(window.customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:s,elements:n}=e;return{kind:s,elements:n,finisher(e){window.customElements.define(t,e)}}})(t,e),X=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?Object.assign(Object.assign({},e),{finisher(s){s.createProperty(e.key,t)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(s){s.createProperty(e.key,t)}};function Z(t){return(e,s)=>void 0!==s?((t,e,s)=>{e.constructor.createProperty(s,t)})(t,e,s):X(t,e)}
/**
    @license
    Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
    This code may only be used under the BSD style license found at
    http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
    http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
    found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
    part of the polymer project is also subject to an additional IP rights grant
    found at http://polymer.github.io/PATENTS.txt
    */const tt=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,et=Symbol();class st{constructor(t,e){if(e!==et)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return void 0===this._styleSheet&&(tt?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const nt=t=>new st(String(t),et),ot=(t,...e)=>{const s=e.reduce(((e,s,n)=>e+(t=>{if(t instanceof st)return t.cssText;if("number"==typeof t)return t;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(s)+t[n+1]),t[0]);return new st(s,et)};
/**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */
(window.litElementVersions||(window.litElementVersions=[])).push("2.4.0");const it={};class rt extends G{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const t=this.getStyles();if(Array.isArray(t)){const e=(t,s)=>t.reduceRight(((t,s)=>Array.isArray(s)?e(s,t):(t.add(s),t)),s),s=e(t,new Set),n=[];s.forEach((t=>n.unshift(t))),this._styles=n}else this._styles=void 0===t?[]:[t];this._styles=this._styles.map((t=>{if(t instanceof CSSStyleSheet&&!tt){const e=Array.prototype.slice.call(t.cssRules).reduce(((t,e)=>t+e.cssText),"");return nt(e)}return t}))}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const t=this.constructor._styles;0!==t.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?tt?this.renderRoot.adoptedStyleSheets=t.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map((t=>t.cssText)),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(t){const e=this.render();super.update(t),e!==it&&this.constructor.render(e,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach((t=>{const e=document.createElement("style");e.textContent=t.cssText,this.renderRoot.appendChild(e)})))}render(){return it}}rt.finalized=!0,rt.render=(t,e,n)=>{if(!n||"object"!=typeof n||!n.scopeName)throw new Error("The `scopeName` option is required.");const o=n.scopeName,i=I.has(e),r=j&&11===e.nodeType&&!!e.host,a=r&&!D.has(o),l=a?document.createDocumentFragment():e;if(((t,e,n)=>{let o=I.get(e);void 0===o&&(s(e,e.firstChild),I.set(e,o=new $(Object.assign({templateFactory:O},n))),o.appendInto(e)),o.setValue(t),o.commit()})(t,l,Object.assign({templateFactory:H(o)},n)),a){const t=I.get(l);I.delete(l);const n=t.value instanceof _?t.value.template:void 0;F(o,l,n),s(e,e.firstChild),e.appendChild(l),I.set(e,t)}!i&&r&&window.ShadyCSS.styleElement(e.host)};var at=function(t,e,s,n){var o,i=arguments.length,r=i<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,s):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,s,n);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(i<3?o(r):i>3?o(e,s,r):o(e,s))||r);return i>3&&r&&Object.defineProperty(e,s,r),r};let lt=class extends rt{constructor(){super(...arguments),this.disabled=!1,this.autofocus=!1,this.href="",this.btnStyle="",this.canSelect=!1,this.selected=!1,this.disableSelectedStyle=!1,this.buttonElement=null}static get styles(){return[ot`
        :host {
          display: inline-block;
        }
        button {
          background-color: #e7e7e7;
          color: black;
          border: 0;
          border-radius: 0;
          text-align: center;
          text-decoration: none;
          display: inline-block;
          cursor: pointer;
          font-size: 1rem;
          padding: 0.6rem 0.9rem;
          transition: all 0.3s ease 0s;
        }
        button:hover {
          opacity: 0.8;
        }
        button:active,
        button.selected {
          filter: brightness(80%);
        }
        button:disabled {
          pointer-events: none;
          opacity: 0.6;
        }
        button:focus {
          box-shadow: inset 0 0 0 0.2rem var(--button-outline-color, #8dc3eb);
          outline: none;
        }
      `]}firstUpdated(){if(!this.shadowRoot)throw new Error("Unexpected undefined shadowRoot");this.buttonElement=this.shadowRoot.querySelector("button")}render(){return U`
      <button
        class=${this.selected&&!this.disableSelectedStyle?"selected":""}
        part="button"
        ?disabled=${this.disabled}
        ?autofocus=${this.autofocus}
        @click=${this.handleClick}
      >
        <slot></slot>
      </button>
    `}focus(){this.buttonElement&&this.buttonElement.focus()}handleClick(t){t.preventDefault(),t.stopImmediatePropagation(),this.href?window.location.href=this.href:(this.canSelect&&(this.selected=!this.selected),this.dispatchEvent(new CustomEvent("click")))}};at([Z({type:Boolean,reflect:!0})],lt.prototype,"disabled",void 0),at([Z({type:Boolean,reflect:!0})],lt.prototype,"autofocus",void 0),at([Z({type:String,reflect:!0})],lt.prototype,"href",void 0),at([Z({type:String,reflect:!0})],lt.prototype,"btnStyle",void 0),at([Z({type:Boolean,reflect:!0})],lt.prototype,"canSelect",void 0),at([Z({type:Boolean,reflect:!0})],lt.prototype,"selected",void 0),at([Z({type:Boolean,reflect:!0})],lt.prototype,"disableSelectedStyle",void 0),lt=at([Q("qing-button")],lt);var ct=function(t,e,s,n){var o,i=arguments.length,r=i<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,s):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,s,n);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(i<3?o(r):i>3?o(e,s,r):o(e,s))||r);return i>3&&r&&Object.defineProperty(e,s,r),r};const dt="overlay",ht="overlay-background",ut="open";let pt=class extends rt{constructor(){super(...arguments),this.open=!1}static get styles(){return ot`
      :host {
        display: block;
      }

      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }

      .overlay-background {
        height: 100vh;
        width: 100vw;
        position: fixed;
        z-index: 1000;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.3);
        align-items: center;
        justify-content: center;
      }

      .overlay {
        max-height: 100vh;
        max-width: 100vw;
        color: black;
        background-color: white;
        padding: 0;
      }

      @media (min-width: 768px) {
        .overlay {
          width: 80%;
        }
      }
    `}firstUpdated(){if(!this.shadowRoot)throw new Error("Unexpected undefined shadowRoot")}render(){return U`
      <div
        style="display: ${this.open?"flex":"none"}"
        class=${ht}
        part=${ht}
      >
        <div class=${dt} part=${dt}>
          <slot></slot>
        </div>
      </div>
    `}updated(t){t.has(ut)&&!!t.get(ut)!==this.open&&setTimeout((()=>this.onOpenChanged()),0)}onOpenChanged(){this.dispatchEvent(new CustomEvent("openChanged",{detail:this.open}))}};ct([Z({type:Boolean,reflect:!0})],pt.prototype,"open",void 0),pt=ct([Q("qing-dialog-core")],pt);
/**
     * @license
     * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */
class gt{constructor(t){this.classes=new Set,this.changed=!1,this.element=t;const e=(t.getAttribute("class")||"").split(/\s+/);for(const t of e)this.classes.add(t)}add(t){this.classes.add(t),this.changed=!0}remove(t){this.classes.delete(t),this.changed=!0}commit(){if(this.changed){let t="";this.classes.forEach((e=>t+=e+" ")),this.element.setAttribute("class",t)}}}const mt=new WeakMap,ft=f((t=>e=>{if(!(e instanceof P)||e instanceof B||"class"!==e.committer.name||e.committer.parts.length>1)throw new Error("The `classMap` directive must be used in the `class` attribute and must be the only part in the attribute.");const{committer:s}=e,{element:n}=s;let o=mt.get(e);void 0===o&&(n.setAttribute("class",s.strings.join(" ")),mt.set(e,o=new Set));const i=n.classList||new gt(n);o.forEach((e=>{e in t||(i.remove(e),o.delete(e))}));for(const e in t){const s=t[e];s!=o.has(e)&&(s?(i.add(e),o.add(e)):(i.remove(e),o.delete(e)))}"function"==typeof i.commit&&i.commit()}));var yt,bt=function(t,e,s,n){var o,i=arguments.length,r=i<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,s):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,s,n);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(i<3?o(r):i>3?o(e,s,r):o(e,s))||r);return i>3&&r&&Object.defineProperty(e,s,r),r};let vt={ok:"OK",yes:"Yes",no:"No",cancel:"Cancel"};const _t="__default_button",wt="__cancel_button",St="__button-container";let xt=yt=class extends rt{constructor(){super(...arguments),this.open=!1,this.buttons=[],this.defaultButtonIndex=0}static get styles(){return ot`
      :host {
        display: block;
      }

      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }

      .dialog {
        display: flex;
        max-height: 100vh;
        max-width: 100vw;
        flex-direction: column;
        padding: 0.625rem 1.25rem;
      }

      .${nt(St)} {
        display: flex;
        justify-content: center;
      }

      .${nt(St)} qing-button {
        margin: 0 0.33rem;
      }

      .${nt(St)} qing-button::part(button) {
        margin: 0;
      }
    `}static get localizedButtonStrings(){return vt}static set localizedButtonString(t){vt=t}firstUpdated(){document.addEventListener("keydown",this.handleKeyDown.bind(this))}render(){return U`
      <qing-dialog-core
        id=${"core"}
        exportparts=${[dt,ht].join(", ")}
        ?open=${this.open}
        @openChanged=${this.handleOpenChanged}
      >
        <div class="dialog">
          <slot part="content"></slot>
          <div part="footer">${this.renderButtons()}</div>
        </div>
      </qing-dialog-core>
    `}close(t){this.closeButton=t,this.open=!1}renderButtons(){const{buttons:t}=this;return t.length?U`
      <div class=${St} part="footer-buttons">
        ${t.map(((t,e)=>{const s="string"==typeof t?{type:t}:t;return s.type&&(s.text=yt.localizedButtonStrings[s.type]),U`
            <qing-button
              exportparts="button: footer-button"
              class=${ft({[s.style||"_"]:!!s.style,[_t]:e===this.defaultButtonIndex,[wt]:e===this.cancelButtonIndex})}
              @click=${()=>this.handleButtonClick(s)}
              >${s.text}</qing-button
            >
          `}))}
      </div>
    `:U``}handleButtonClick(t){this.dispatchEvent(new CustomEvent("buttonClick",{detail:t})),(t.autoClose??1)&&this.close(t)}handleOpenChanged(t){this.open=t.detail,this.open?(this.getDefaultButtonElement()?.focus(),this.dispatchEvent(new CustomEvent("requestFocus")),this.dispatchEvent(new CustomEvent("shown"))):(this.dispatchEvent(new CustomEvent("closed",{composed:!0,detail:this.closeButton})),this.closeButton=void 0)}handleKeyDown(t){this.open&&("Escape"!==t.key&&"Esc"!==t.key||this.getCancelButtonElement()?.click(),"Enter"===t.key&&this.getDefaultButtonElement()?.click())}getDefaultButtonElement(){const t=this.shadowRoot?.querySelector(".__default_button");return t instanceof HTMLElement?t:null}getCancelButtonElement(){const t=this.shadowRoot?.querySelector(".__cancel_button");return t instanceof HTMLElement?t:null}};bt([Z({type:Boolean,reflect:!0})],xt.prototype,"open",void 0),bt([Z({type:Array})],xt.prototype,"buttons",void 0),bt([Z({type:Number,reflect:!0})],xt.prototype,"defaultButtonIndex",void 0),bt([Z({type:Number,reflect:!0})],xt.prototype,"cancelButtonIndex",void 0),xt=yt=bt([Q("qing-dialog")],xt);
/**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */
const kt=new WeakMap,Ct=f((t=>e=>{if(!(e instanceof $))throw new Error("unsafeHTML can only be used in text bindings");const s=kt.get(e);if(void 0!==s&&k(t)&&t===s.value&&e.value===s.fragment)return;const n=document.createElement("template");n.innerHTML=t;const o=document.importNode(n.content,!0);e.setValue(o),kt.set(e,{value:t,fragment:o})}));function Et(t){const{type:e}=t,s=function(t){switch(t){case"error":return'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>';case"success":return'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0zm0 0h24v24H0V0z"/><path d="M16.59 7.58L10 14.17l-3.59-3.58L5 12l5 5 8-8zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>';case"warning":return'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>';default:return null}}(e);if(!s)return U``;const n=function(t,e,s,n){const o=(new DOMParser).parseFromString(s,"image/svg+xml").documentElement;return o.style.verticalAlign="middle",o.style.fill=n??function(t){switch(t){case"error":return"#e03d3d";case"success":return"#3ba62d";case"warning":return"#dba932";default:return null}}(t)??"black",o.setAttribute("class",`icon-${t}`),o.setAttribute("width",e.toString()),o.setAttribute("height",e.toString()),o.outerHTML}(e,t.size??48,s,t.color);return U`<span>${Ct(n)}</span>`}class Pt extends rt{render(){return U`
      <div id="main">
        <h2><code>qing-dialog</code></h2>
        <qing-dialog id="basic" .buttons=${["ok"]} .cancelButtonIndex=${0}>
          <h2>Title</h2>
          <p>
            The div element has no special meaning at all. It represents its children. It can be
            used with the class, lang, and title attributes to mark up semantics common to a group
            of consecutive elements. The div element has no special meaning at all. It represents
            its children. It can be used with the class, lang, and title attributes to mark up
            semantics common to a group of consecutive elements. The div element has no special
            meaning at all. It represents its children. It can be used with the class, lang, and
            title attributes to mark up semantics common to a group of consecutive elements.
          </p>
        </qing-dialog>
        ${this.renderButton("Basic","basic")}
        <qing-dialog
          id="handle-events"
          .buttons=${["ok"]}
          @buttonClick=${t=>alert(`You clicked ${t.detail.text}!`)}
          @shown=${()=>alert("Shown")}
          @closed=${()=>alert("Closed")}
        >
          <h2>Title</h2>
          <p>Hello world</p>
        </qing-dialog>
        ${this.renderButton("Handle events","handle-events")}
        <qing-dialog
          id="multiple-btns"
          .buttons=${["yes","no","cancel"]}
          @buttonClick=${t=>alert(`You clicked ${t.detail.text}!`)}
        >
          <h2>Title</h2>
          <p>Hello world</p>
        </qing-dialog>
        ${this.renderButton("Multiple buttons","multiple-btns")}
        <qing-dialog
          id="focus"
          .buttons=${["ok"]}
          @requestFocus=${t=>{this.shadowRoot.getElementById("textInput").focus()}}
        >
          <h2>Title</h2>
          <p>Hello world</p>
          <p>
            <input type="text" value="name" id="textInput" />
          </p>
        </qing-dialog>
        ${this.renderButton("Focus","focus")}
        <qing-dialog
          id="right-btns"
          .buttons=${["yes","no","cancel"]}
          @buttonClick=${t=>alert(`You clicked ${t.detail.text}!`)}
        >
          <h2>Title</h2>
          <p>Hello world</p>
        </qing-dialog>
        ${this.renderButton("Right aligned buttons","right-btns")}
        <qing-dialog
          id="default-cancel-buttons"
          .buttons=${["yes","no","cancel"]}
          .cancelButtonIndex=${2}
          @buttonClick=${t=>alert(`You clicked ${t.detail.text}!`)}
        >
          <h2>Title</h2>
          <p>Hello world</p>
        </qing-dialog>
        ${this.renderButton("isDefault and isCancel buttons","default-cancel-buttons")}
        <qing-dialog id="icon" .buttons=${["ok"]}>
          <h2>
            ${Et({type:"error"})}
            <span style="vertical-align: middle">Title</span>
          </h2>
          <p>Hello world</p>
        </qing-dialog>
        ${this.renderButton("Icon","icon")}
        <qing-dialog id="long-text" dialogTitle="Info" icon="info" .buttons=${["ok"]}>
          <h2>
            ${Et({type:"success"})}
            <span style="vertical-align: middle">Title</span>
          </h2>
          <pre style="overflow-y: auto">${`${"2020 is coming. ".repeat(20)}\n`.repeat(500)}</pre>
        </qing-dialog>
        ${this.renderButton("Long text","long-text")}
        <qing-dialog id="border-styles" .buttons=${["ok"]}>
          <h2>
            ${Et({type:"success"})}
            <span style="vertical-align: middle">Title</span>
          </h2>
          <p>Hello world</p>
        </qing-dialog>
        ${this.renderButton("Border styles","border-styles")}
        <qing-dialog id="themes" dialogTitle="Themes" .buttons=${["ok"]}>
          <h2>
            ${Et({type:"success",color:""})}
            <span style="vertical-align: middle">Title</span>
          </h2>
          <p>
            <button @click=${this.handleLightBtnClick}>Light</button>
            <button @click=${this.handleDarkBtnClick}>Dark</button>
          </p>
        </qing-dialog>
        ${this.renderButton("Themes","themes")}
        <qing-dialog id="auto-close" icon="success" @shown=${this.handleAutoCloseShown}
          >This will auto-close in 3s</qing-dialog
        >
        ${this.renderButton("Auto-close","auto-close")}
        <qing-dialog
          id="close-programically"
          .buttons=${[{type:"ok",autoClose:!1}]}
          @requestFocus=${()=>{this.shadowRoot.getElementById("nameInput").focus()}}
          @buttonClick=${()=>{"liu"===this.shadowRoot.getElementById("nameInput").value?this.shadowRoot.getElementById("close-programically").open=!1:alert("Name is not liu")}}
        >
          <h3>Only liu can close this dialog, try entering liu below and clicking ok</h3>
          <p>
            Name:<br />
            <input type="text" value="" id="nameInput" />
          </p>
        </qing-dialog>
        ${this.renderButton("Close programically","close-programically")}
        <qing-dialog id="title-and-buttons" .buttons=${["ok"]}>
          <h1>Title and buttons</h1>
        </qing-dialog>
        ${this.renderButton("Title and buttons","title-and-buttons")}
        <qing-dialog id="title-only"><h1>Title</h1></qing-dialog>
        ${this.renderButton("Title-only","title-only")}
        <hr />
        <h2><code>qing-dialog-core</code></h2>
        <div>
          <qing-dialog-core id="core-minimal"> Press Esc to exit </qing-dialog-core>
          ${this.renderButton("Core - Minimal","core-minimal")}
        </div>
      </div>
    `}renderButton(t,e){return U`
      <p>
        <button @click=${()=>this.handleButtonClick(e)}>${t}</button>
      </p>
    `}handleButtonClick(t){this.shadowRoot.getElementById(t).setAttribute("open","")}get mainElement(){return this.shadowRoot.getElementById("main")}handleLightBtnClick(){this.mainElement.classList.remove("theme-dark")}handleDarkBtnClick(){this.mainElement.classList.add("theme-dark")}handleAutoCloseShown(t){setTimeout((()=>{this.shadowRoot.getElementById("auto-close").removeAttribute("open")}),3e3)}}Pt.styles=ot`
  h2 {
    margin-bottom: 0;
  }
  #max-width {
    --dialog-max-width: 400px;
  }
  #right-btns::part(footer-buttons) {
    justify-content: flex-end;
  }
  #border-styles::part(overlay) {
    border: 4px dashed green;
    border-radius: 10px;
  }
  :host {
    --default-back-color: white;
    --default-fore-color: black;
    --default-btn-back-color: lightgray;
    --default-success-color: #89ec7c;
  }
  .theme-dark {
    --default-back-color: black;
    --default-fore-color: #777777;
    --default-btn-back-color: #1a1a1a;
    --default-success-color: #073f00;
  }
  #themes::part(overlay) {
    color: var(--default-fore-color);
    background-color: var(--default-back-color);
  }
  #themes::part(footer-button) {
    color: var(--default-fore-color);
    background-color: var(--default-btn-back-color);
  }
  #themes .icon-success {
    fill: var(--default-success-color);
  }
  #themes button {
    border: 1px solid #818181;
    color: var(--default-fore-color);
    background-color: var(--default-btn-back-color);
  }
`,customElements.define("example-app",Pt),t.ExampleApp=Pt,Object.defineProperty(t,"__esModule",{value:!0})}({});
