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
     */const e="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,n=(t,e,n=null)=>{for(;e!==n;){const n=e.nextSibling;t.removeChild(e),e=n}},s=`{{lit-${String(Math.random()).slice(2)}}}`,i=`\x3c!--${s}--\x3e`,o=new RegExp(`${s}|${i}`),r="$lit$";class a{constructor(t,e){this.parts=[],this.element=e;const n=[],i=[],a=document.createTreeWalker(e.content,133,null,!1);let c=0,u=-1,p=0;const{strings:g,values:{length:m}}=t;for(;p<m;){const t=a.nextNode();if(null!==t){if(u++,1===t.nodeType){if(t.hasAttributes()){const e=t.attributes,{length:n}=e;let s=0;for(let t=0;t<n;t++)l(e[t].name,r)&&s++;for(;s-- >0;){const e=g[p],n=h.exec(e)[2],s=n.toLowerCase()+r,i=t.getAttribute(s);t.removeAttribute(s);const a=i.split(o);this.parts.push({type:"attribute",index:u,name:n,strings:a}),p+=a.length-1}}"TEMPLATE"===t.tagName&&(i.push(t),a.currentNode=t.content)}else if(3===t.nodeType){const e=t.data;if(e.indexOf(s)>=0){const s=t.parentNode,i=e.split(o),a=i.length-1;for(let e=0;e<a;e++){let n,o=i[e];if(""===o)n=d();else{const t=h.exec(o);null!==t&&l(t[2],r)&&(o=o.slice(0,t.index)+t[1]+t[2].slice(0,-r.length)+t[3]),n=document.createTextNode(o)}s.insertBefore(n,t),this.parts.push({type:"node",index:++u})}""===i[a]?(s.insertBefore(d(),t),n.push(t)):t.data=i[a],p+=a}}else if(8===t.nodeType)if(t.data===s){const e=t.parentNode;null!==t.previousSibling&&u!==c||(u++,e.insertBefore(d(),t)),c=u,this.parts.push({type:"node",index:u}),null===t.nextSibling?t.data="":(n.push(t),u--),p++}else{let e=-1;for(;-1!==(e=t.data.indexOf(s,e+1));)this.parts.push({type:"node",index:-1}),p++}}else a.currentNode=i.pop()}for(const t of n)t.parentNode.removeChild(t)}}const l=(t,e)=>{const n=t.length-e.length;return n>=0&&t.slice(n)===e},c=t=>-1!==t.index,d=()=>document.createComment(""),h=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function u(t,e){const{element:{content:n},parts:s}=t,i=document.createTreeWalker(n,133,null,!1);let o=g(s),r=s[o],a=-1,l=0;const c=[];let d=null;for(;i.nextNode();){a++;const t=i.currentNode;for(t.previousSibling===d&&(d=null),e.has(t)&&(c.push(t),null===d&&(d=t)),null!==d&&l++;void 0!==r&&r.index===a;)r.index=null!==d?-1:r.index-l,o=g(s,o),r=s[o]}c.forEach((t=>t.parentNode.removeChild(t)))}const p=t=>{let e=11===t.nodeType?0:1;const n=document.createTreeWalker(t,133,null,!1);for(;n.nextNode();)e++;return e},g=(t,e=-1)=>{for(let n=e+1;n<t.length;n++){const e=t[n];if(c(e))return n}return-1};
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
const m=new WeakMap,f=t=>(...e)=>{const n=t(...e);return m.set(n,!0),n},y=t=>"function"==typeof t&&m.has(t),v={},b={};
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
class w{constructor(t,e,n){this.__parts=[],this.template=t,this.processor=e,this.options=n}update(t){let e=0;for(const n of this.__parts)void 0!==n&&n.setValue(t[e]),e++;for(const t of this.__parts)void 0!==t&&t.commit()}_clone(){const t=e?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),n=[],s=this.template.parts,i=document.createTreeWalker(t,133,null,!1);let o,r=0,a=0,l=i.nextNode();for(;r<s.length;)if(o=s[r],c(o)){for(;a<o.index;)a++,"TEMPLATE"===l.nodeName&&(n.push(l),i.currentNode=l.content),null===(l=i.nextNode())&&(i.currentNode=n.pop(),l=i.nextNode());if("node"===o.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(l.previousSibling),this.__parts.push(t)}else this.__parts.push(...this.processor.handleAttributeExpressions(l,o.name,o.strings,this.options));r++}else this.__parts.push(void 0),r++;return e&&(document.adoptNode(t),customElements.upgrade(t)),t}}
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
     */const _=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:t=>t}),S=` ${s} `;class x{constructor(t,e,n,s){this.strings=t,this.values=e,this.type=n,this.processor=s}getHTML(){const t=this.strings.length-1;let e="",n=!1;for(let o=0;o<t;o++){const t=this.strings[o],a=t.lastIndexOf("\x3c!--");n=(a>-1||n)&&-1===t.indexOf("--\x3e",a+1);const l=h.exec(t);e+=null===l?t+(n?S:i):t.substr(0,l.index)+l[1]+l[2]+r+l[3]+s}return e+=this.strings[t],e}getTemplateElement(){const t=document.createElement("template");let e=this.getHTML();return void 0!==_&&(e=_.createHTML(e)),t.innerHTML=e,t}}
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
     */const k=t=>null===t||!("object"==typeof t||"function"==typeof t),C=t=>Array.isArray(t)||!(!t||!t[Symbol.iterator]);class E{constructor(t,e,n){this.dirty=!0,this.element=t,this.name=e,this.strings=n,this.parts=[];for(let t=0;t<n.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new $(this)}_getValue(){const t=this.strings,e=t.length-1,n=this.parts;if(1===e&&""===t[0]&&""===t[1]){const t=n[0].value;if("symbol"==typeof t)return String(t);if("string"==typeof t||!C(t))return t}let s="";for(let i=0;i<e;i++){s+=t[i];const e=n[i];if(void 0!==e){const t=e.value;if(k(t)||!C(t))s+="string"==typeof t?t:String(t);else for(const e of t)s+="string"==typeof e?e:String(e)}}return s+=t[e],s}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class ${constructor(t){this.value=void 0,this.committer=t}setValue(t){t===v||k(t)&&t===this.value||(this.value=t,y(t)||(this.committer.dirty=!0))}commit(){for(;y(this.value);){const t=this.value;this.value=v,t(this)}this.value!==v&&this.committer.commit()}}class P{constructor(t){this.value=void 0,this.__pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(d()),this.endNode=t.appendChild(d())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t.__insert(this.startNode=d()),t.__insert(this.endNode=d())}insertAfterPart(t){t.__insert(this.startNode=d()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this.__pendingValue=t}commit(){if(null===this.startNode.parentNode)return;for(;y(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=v,t(this)}const t=this.__pendingValue;t!==v&&(k(t)?t!==this.value&&this.__commitText(t):t instanceof x?this.__commitTemplateResult(t):t instanceof Node?this.__commitNode(t):C(t)?this.__commitIterable(t):t===b?(this.value=b,this.clear()):this.__commitText(t))}__insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}__commitNode(t){this.value!==t&&(this.clear(),this.__insert(t),this.value=t)}__commitText(t){const e=this.startNode.nextSibling,n="string"==typeof(t=null==t?"":t)?t:String(t);e===this.endNode.previousSibling&&3===e.nodeType?e.data=n:this.__commitNode(document.createTextNode(n)),this.value=t}__commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof w&&this.value.template===e)this.value.update(t.values);else{const n=new w(e,t.processor,this.options),s=n._clone();n.update(t.values),this.__commitNode(s),this.value=n}}__commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let n,s=0;for(const i of t)n=e[s],void 0===n&&(n=new P(this.options),e.push(n),0===s?n.appendIntoPart(this):n.insertAfterPart(e[s-1])),n.setValue(i),n.commit(),s++;s<e.length&&(e.length=s,this.clear(n&&n.endNode))}clear(t=this.startNode){n(this.startNode.parentNode,t.nextSibling,this.endNode)}}class T{constructor(t,e,n){if(this.value=void 0,this.__pendingValue=void 0,2!==n.length||""!==n[0]||""!==n[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=n}setValue(t){this.__pendingValue=t}commit(){for(;y(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=v,t(this)}if(this.__pendingValue===v)return;const t=!!this.__pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=t),this.__pendingValue=v}}class N extends E{constructor(t,e,n){super(t,e,n),this.single=2===n.length&&""===n[0]&&""===n[1]}_createPart(){return new q(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class q extends ${}let A=!1;(()=>{try{const t={get capture(){return A=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}})();class B{constructor(t,e,n){this.value=void 0,this.__pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=n,this.__boundHandleEvent=t=>this.handleEvent(t)}setValue(t){this.__pendingValue=t}commit(){for(;y(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=v,t(this)}if(this.__pendingValue===v)return;const t=this.__pendingValue,e=this.value,n=null==t||null!=e&&(t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive),s=null!=t&&(null==e||n);n&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),s&&(this.__options=R(t),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=t,this.__pendingValue=v}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const R=t=>t&&(A?{capture:t.capture,passive:t.passive,once:t.once}:t.capture)
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
     */;function O(t){let e=V.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},V.set(t.type,e));let n=e.stringsArray.get(t.strings);if(void 0!==n)return n;const i=t.strings.join(s);return n=e.keyString.get(i),void 0===n&&(n=new a(t,t.getTemplateElement()),e.keyString.set(i,n)),e.stringsArray.set(t.strings,n),n}const V=new Map,I=new WeakMap;
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
class{handleAttributeExpressions(t,e,n,s){const i=e[0];if("."===i){return new N(t,e.slice(1),n).parts}if("@"===i)return[new B(t,e.slice(1),s.eventContext)];if("?"===i)return[new T(t,e.slice(1),n)];return new E(t,e,n).parts}handleTextExpression(t){return new P(t)}};
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
     */,z=(t,e)=>`${t}--${e}`;let H=!0;void 0===window.ShadyCSS?H=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),H=!1);const j=t=>e=>{const n=z(e.type,t);let i=V.get(n);void 0===i&&(i={stringsArray:new WeakMap,keyString:new Map},V.set(n,i));let o=i.stringsArray.get(e.strings);if(void 0!==o)return o;const r=e.strings.join(s);if(o=i.keyString.get(r),void 0===o){const n=e.getTemplateElement();H&&window.ShadyCSS.prepareTemplateDom(n,t),o=new a(e,n),i.keyString.set(r,o)}return i.stringsArray.set(e.strings,o),o},L=["html","svg"],D=new Set,F=(t,e,n)=>{D.add(t);const s=n?n.element:document.createElement("template"),i=e.querySelectorAll("style"),{length:o}=i;if(0===o)return void window.ShadyCSS.prepareTemplateStyles(s,t);const r=document.createElement("style");for(let t=0;t<o;t++){const e=i[t];e.parentNode.removeChild(e),r.textContent+=e.textContent}(t=>{L.forEach((e=>{const n=V.get(z(e,t));void 0!==n&&n.keyString.forEach((t=>{const{element:{content:e}}=t,n=new Set;Array.from(e.querySelectorAll("style")).forEach((t=>{n.add(t)})),u(t,n)}))}))})(t);const a=s.content;n?function(t,e,n=null){const{element:{content:s},parts:i}=t;if(null==n)return void s.appendChild(e);const o=document.createTreeWalker(s,133,null,!1);let r=g(i),a=0,l=-1;for(;o.nextNode();)for(l++,o.currentNode===n&&(a=p(e),n.parentNode.insertBefore(e,n));-1!==r&&i[r].index===l;){if(a>0){for(;-1!==r;)i[r].index+=a,r=g(i,r);return}r=g(i,r)}}(n,r,a.firstChild):a.insertBefore(r,a.firstChild),window.ShadyCSS.prepareTemplateStyles(s,t);const l=a.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==l)e.insertBefore(l.cloneNode(!0),e.firstChild);else if(n){a.insertBefore(r,a.firstChild);const t=new Set;t.add(r),u(n,t)}};window.JSCompiler_renameProperty=(t,e)=>t;const W={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:return null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return null!==t;case Number:return null===t?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}},J=(t,e)=>e!==t&&(e==e||t==t),Y={attribute:!0,type:String,converter:W,reflect:!1,hasChanged:J},K="finalized";class G extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const t=[];return this._classProperties.forEach(((e,n)=>{const s=this._attributeNameForProperty(n,e);void 0!==s&&(this._attributeToPropertyMap.set(s,n),t.push(s))})),t}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach(((t,e)=>this._classProperties.set(e,t)))}}static createProperty(t,e=Y){if(this._ensureClassProperties(),this._classProperties.set(t,e),e.noAccessor||this.prototype.hasOwnProperty(t))return;const n="symbol"==typeof t?Symbol():`__${t}`,s=this.getPropertyDescriptor(t,n,e);void 0!==s&&Object.defineProperty(this.prototype,t,s)}static getPropertyDescriptor(t,e,n){return{get(){return this[e]},set(s){const i=this[t];this[e]=s,this.requestUpdateInternal(t,i,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this._classProperties&&this._classProperties.get(t)||Y}static finalize(){const t=Object.getPrototypeOf(this);if(t.hasOwnProperty(K)||t.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties,e=[...Object.getOwnPropertyNames(t),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[]];for(const n of e)this.createProperty(n,t[n])}}static _attributeNameForProperty(t,e){const n=e.attribute;return!1===n?void 0:"string"==typeof n?n:"string"==typeof t?t.toLowerCase():void 0}static _valueHasChanged(t,e,n=J){return n(t,e)}static _propertyValueFromAttribute(t,e){const n=e.type,s=e.converter||W,i="function"==typeof s?s:s.fromAttribute;return i?i(t,n):t}static _propertyValueToAttribute(t,e){if(void 0===e.reflect)return;const n=e.type,s=e.converter;return(s&&s.toAttribute||W.toAttribute)(t,n)}initialize(){this._updateState=0,this._updatePromise=new Promise((t=>this._enableUpdatingResolver=t)),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach(((t,e)=>{if(this.hasOwnProperty(e)){const t=this[e];delete this[e],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(e,t)}}))}_applyInstanceProperties(){this._instanceProperties.forEach(((t,e)=>this[e]=t)),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(t,e,n){e!==n&&this._attributeToProperty(t,n)}_propertyToAttribute(t,e,n=Y){const s=this.constructor,i=s._attributeNameForProperty(t,n);if(void 0!==i){const t=s._propertyValueToAttribute(e,n);if(void 0===t)return;this._updateState=8|this._updateState,null==t?this.removeAttribute(i):this.setAttribute(i,t),this._updateState=-9&this._updateState}}_attributeToProperty(t,e){if(8&this._updateState)return;const n=this.constructor,s=n._attributeToPropertyMap.get(t);if(void 0!==s){const t=n.getPropertyOptions(s);this._updateState=16|this._updateState,this[s]=n._propertyValueFromAttribute(e,t),this._updateState=-17&this._updateState}}requestUpdateInternal(t,e,n){let s=!0;if(void 0!==t){const i=this.constructor;n=n||i.getPropertyOptions(t),i._valueHasChanged(this[t],e,n.hasChanged)?(this._changedProperties.has(t)||this._changedProperties.set(t,e),!0!==n.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,n))):s=!1}!this._hasRequestedUpdate&&s&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(t,e){return this.requestUpdateInternal(t,e),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(t){}const t=this.performUpdate();return null!=t&&await t,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let t=!1;const e=this._changedProperties;try{t=this.shouldUpdate(e),t?this.update(e):this._markUpdated()}catch(e){throw t=!1,this._markUpdated(),e}t&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(e)),this.updated(e))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(t){return!0}update(t){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach(((t,e)=>this._propertyToAttribute(e,this[e],t))),this._reflectingProperties=void 0),this._markUpdated()}updated(t){}firstUpdated(t){}}G.finalized=!0;
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
const Q=t=>e=>"function"==typeof e?((t,e)=>(window.customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:n,elements:s}=e;return{kind:n,elements:s,finisher(e){window.customElements.define(t,e)}}})(t,e),X=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?Object.assign(Object.assign({},e),{finisher(n){n.createProperty(e.key,t)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(n){n.createProperty(e.key,t)}};function Z(t){return(e,n)=>void 0!==n?((t,e,n)=>{e.constructor.createProperty(n,t)})(t,e,n):X(t,e)}
/**
    @license
    Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
    This code may only be used under the BSD style license found at
    http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
    http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
    found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
    part of the polymer project is also subject to an additional IP rights grant
    found at http://polymer.github.io/PATENTS.txt
    */const tt=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,et=Symbol();class nt{constructor(t,e){if(e!==et)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return void 0===this._styleSheet&&(tt?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const st=t=>new nt(String(t),et),it=(t,...e)=>{const n=e.reduce(((e,n,s)=>e+(t=>{if(t instanceof nt)return t.cssText;if("number"==typeof t)return t;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(n)+t[s+1]),t[0]);return new nt(n,et)};
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
(window.litElementVersions||(window.litElementVersions=[])).push("2.4.0");const ot={};class rt extends G{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const t=this.getStyles();if(Array.isArray(t)){const e=(t,n)=>t.reduceRight(((t,n)=>Array.isArray(n)?e(n,t):(t.add(n),t)),n),n=e(t,new Set),s=[];n.forEach((t=>s.unshift(t))),this._styles=s}else this._styles=void 0===t?[]:[t];this._styles=this._styles.map((t=>{if(t instanceof CSSStyleSheet&&!tt){const e=Array.prototype.slice.call(t.cssRules).reduce(((t,e)=>t+e.cssText),"");return st(e)}return t}))}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const t=this.constructor._styles;0!==t.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?tt?this.renderRoot.adoptedStyleSheets=t.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map((t=>t.cssText)),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(t){const e=this.render();super.update(t),e!==ot&&this.constructor.render(e,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach((t=>{const e=document.createElement("style");e.textContent=t.cssText,this.renderRoot.appendChild(e)})))}render(){return ot}}rt.finalized=!0,rt.render=(t,e,s)=>{if(!s||"object"!=typeof s||!s.scopeName)throw new Error("The `scopeName` option is required.");const i=s.scopeName,o=I.has(e),r=H&&11===e.nodeType&&!!e.host,a=r&&!D.has(i),l=a?document.createDocumentFragment():e;if(((t,e,s)=>{let i=I.get(e);void 0===i&&(n(e,e.firstChild),I.set(e,i=new P(Object.assign({templateFactory:O},s))),i.appendInto(e)),i.setValue(t),i.commit()})(t,l,Object.assign({templateFactory:j(i)},s)),a){const t=I.get(l);I.delete(l);const s=t.value instanceof w?t.value.template:void 0;F(i,l,s),n(e,e.firstChild),e.appendChild(l),I.set(e,t)}!o&&r&&window.ShadyCSS.styleElement(e.host)};var at=function(t,e,n,s){var i,o=arguments.length,r=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,n):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,n,s);else for(var a=t.length-1;a>=0;a--)(i=t[a])&&(r=(o<3?i(r):o>3?i(e,n,r):i(e,n))||r);return o>3&&r&&Object.defineProperty(e,n,r),r};let lt=class extends rt{constructor(){super(...arguments),this.disabled=!1,this.autofocus=!1,this.canSelect=!1,this.disableSelectedStyle=!1,this.href="",this.btnStyle="",this.selected=!1,this.buttonElement=null}static get styles(){return[it`
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
    `}focus(){this.buttonElement&&this.buttonElement.focus()}handleClick(t){t.preventDefault(),t.stopImmediatePropagation(),this.href?window.location.href=this.href:(this.canSelect&&(this.selected=!this.selected),this.dispatchEvent(new CustomEvent("click")))}};at([Z({type:Boolean})],lt.prototype,"disabled",void 0),at([Z({type:Boolean})],lt.prototype,"autofocus",void 0),at([Z({type:Boolean})],lt.prototype,"canSelect",void 0),at([Z({type:Boolean})],lt.prototype,"disableSelectedStyle",void 0),at([Z({type:String})],lt.prototype,"href",void 0),at([Z({type:String})],lt.prototype,"btnStyle",void 0),at([Z({type:Boolean,reflect:!0})],lt.prototype,"selected",void 0),lt=at([Q("qing-button")],lt);var ct=function(t,e,n,s){var i,o=arguments.length,r=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,n):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,n,s);else for(var a=t.length-1;a>=0;a--)(i=t[a])&&(r=(o<3?i(r):o>3?i(e,n,r):i(e,n))||r);return o>3&&r&&Object.defineProperty(e,n,r),r};const dt="overlay",ht="overlay-background",ut="open";let pt=class extends rt{constructor(){super(...arguments),this.open=!1}static get styles(){return it`
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
        width: 100vw;
        color: black;
        background-color: white;
        padding: 0;
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
class gt{constructor(t){this.classes=new Set,this.changed=!1,this.element=t;const e=(t.getAttribute("class")||"").split(/\s+/);for(const t of e)this.classes.add(t)}add(t){this.classes.add(t),this.changed=!0}remove(t){this.classes.delete(t),this.changed=!0}commit(){if(this.changed){let t="";this.classes.forEach((e=>t+=e+" ")),this.element.setAttribute("class",t)}}}const mt=new WeakMap,ft=f((t=>e=>{if(!(e instanceof $)||e instanceof q||"class"!==e.committer.name||e.committer.parts.length>1)throw new Error("The `classMap` directive must be used in the `class` attribute and must be the only part in the attribute.");const{committer:n}=e,{element:s}=n;let i=mt.get(e);void 0===i&&(s.setAttribute("class",n.strings.join(" ")),mt.set(e,i=new Set));const o=s.classList||new gt(s);i.forEach((e=>{e in t||(o.remove(e),i.delete(e))}));for(const e in t){const n=t[e];n!=i.has(e)&&(n?(o.add(e),i.add(e)):(o.remove(e),i.delete(e)))}"function"==typeof o.commit&&o.commit()}));var yt,vt=function(t,e,n,s){var i,o=arguments.length,r=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,n):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,n,s);else for(var a=t.length-1;a>=0;a--)(i=t[a])&&(r=(o<3?i(r):o>3?i(e,n,r):i(e,n))||r);return o>3&&r&&Object.defineProperty(e,n,r),r};let bt={ok:"OK",yes:"Yes",no:"No",cancel:"Cancel"};const wt="__default_button",_t="__cancel_button",St="__button-container";let xt=yt=class extends rt{constructor(){super(...arguments),this.open=!1,this.buttons=[],this.defaultButtonIndex=0}static get styles(){return it`
      :host {
        display: block;
      }

      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }

      .dialog {
        /** Fill horizontal space. The '.dialog' div's parent ('.overlay' div in dialog-core) is displayed as flex with default direction */
        flex-grow: 1;
        display: flex;
        max-height: 100vh;
        max-width: 100vw;
        flex-direction: column;
        padding: 0.625rem 1.25rem;
      }

      .${st(St)} {
        display: flex;
        justify-content: center;
      }

      .${st(St)} qing-button {
        margin: 0 0.33rem;
      }

      .${st(St)} qing-button::part(button) {
        margin: 0;
      }
    `}static get localizedButtonStrings(){return bt}static set localizedButtonString(t){bt=t}firstUpdated(){document.addEventListener("keydown",this.handleKeyDown.bind(this))}render(){return U`
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
        ${t.map(((t,e)=>{const n="string"==typeof t?{type:t}:t;return n.type&&(n.text=yt.localizedButtonStrings[n.type]),U`
            <qing-button
              exportparts="button: footer-button"
              class=${ft({[n.style||"_"]:!!n.style,[wt]:e===this.defaultButtonIndex,[_t]:e===this.cancelButtonIndex})}
              @click=${()=>this.handleButtonClick(n)}
              >${n.text}</qing-button
            >
          `}))}
      </div>
    `:U``}handleButtonClick(t){this.dispatchEvent(new CustomEvent("buttonClick",{detail:t})),(t.autoClose??1)&&this.close(t)}handleOpenChanged(t){this.open=t.detail,this.open?(this.getDefaultButtonElement()?.focus(),this.dispatchEvent(new CustomEvent("requestFocus")),this.dispatchEvent(new CustomEvent("shown"))):(this.dispatchEvent(new CustomEvent("closed",{detail:this.closeButton})),this.closeButton=void 0)}handleKeyDown(t){this.open&&("Escape"!==t.key&&"Esc"!==t.key||this.getCancelButtonElement()?.click(),"Enter"===t.key&&this.getDefaultButtonElement()?.click())}getDefaultButtonElement(){const t=this.shadowRoot?.querySelector(".__default_button");return t instanceof HTMLElement?t:null}getCancelButtonElement(){const t=this.shadowRoot?.querySelector(".__cancel_button");return t instanceof HTMLElement?t:null}};vt([Z({type:Boolean,reflect:!0})],xt.prototype,"open",void 0),vt([Z({type:Array})],xt.prototype,"buttons",void 0),vt([Z({type:Number,reflect:!0})],xt.prototype,"defaultButtonIndex",void 0),vt([Z({type:Number,reflect:!0})],xt.prototype,"cancelButtonIndex",void 0),xt=yt=vt([Q("qing-dialog")],xt);
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
const kt=new WeakMap,Ct=f((t=>e=>{if(!(e instanceof P))throw new Error("unsafeHTML can only be used in text bindings");const n=kt.get(e);if(void 0!==n&&k(t)&&t===n.value&&e.value===n.fragment)return;const s=document.createElement("template");s.innerHTML=t;const i=document.importNode(s.content,!0);e.setValue(i),kt.set(e,{value:t,fragment:i})}));function Et(t){const{type:e}=t,n=function(t){switch(t){case"error":return'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>';case"success":return'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0zm0 0h24v24H0V0z"/><path d="M16.59 7.58L10 14.17l-3.59-3.58L5 12l5 5 8-8zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>';case"warning":return'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>';default:return null}}(e);if(!n)return U``;const s=function(t,e,n,s){const i=(new DOMParser).parseFromString(n,"image/svg+xml").documentElement;return i.style.verticalAlign="middle",i.style.fill=s??function(t){switch(t){case"error":return"#e03d3d";case"success":return"#3ba62d";case"warning":return"#dba932";default:return null}}(t)??"black",i.setAttribute("class",`icon-${t}`),i.setAttribute("width",e.toString()),i.setAttribute("height",e.toString()),i.outerHTML}(e,t.size??48,n,t.color);return U`<span>${Ct(s)}</span>`}class $t extends rt{render(){return U`<p>
      <span id="span">Hello world <button @click=${this.handleClick}>Expand</button></span>
    </p>`}handleClick(){this.shadowRoot.getElementById("span").textContent="The div element has no special meaning at all. It represents its children. It can be\n    used with the class, lang, and title attributes to mark up semantics common to a group\n    of consecutive elements. The div element has no special meaning at all. It represents\n    its children. It can be used with the class, lang, and title attributes to mark up\n    semantics common to a group of consecutive elements. The div element has no special\n    meaning at all. It represents its children. It can be used with the class, lang, and\n    title attributes to mark up semantics common to a group of consecutive elements."}}$t.styles=it`
  :host {
    display: block;
  }
`,customElements.define("dynamic-content",$t);class Pt extends rt{render(){return U`
      <div id="main">
        <h2>Layouts</h2>
        ${this.r("Width: 80%, Height: auto",U`<qing-dialog id="layout-w-80" .buttons=${["ok"]} .cancelButtonIndex=${0}>
            <h2>Title</h2>
            <dynamic-content></dynamic-content>
          </qing-dialog>`)}
        ${this.r("Width: auto + min value, Height: auto",U`<qing-dialog id="layout-auto-min-width" .buttons=${["ok"]} .cancelButtonIndex=${0}>
            <h2>Title</h2>
            <dynamic-content></dynamic-content>
          </qing-dialog>`)}
        ${this.r("Fullscreen with margins",U`<qing-dialog id="layout-full-margins" .buttons=${["ok"]} .cancelButtonIndex=${0}>
            <div style="flex-grow:1">
              <h2>Title</h2>
              <dynamic-content></dynamic-content>
            </div>
          </qing-dialog>`)}
        <h2>Events</h2>
        ${this.r("Handle events",U` <qing-dialog
            id="handle-events"
            .buttons=${["ok"]}
            @buttonClick=${t=>alert(`You clicked ${t.detail.text}!`)}
            @shown=${()=>alert("Shown")}
            @closed=${()=>alert("Closed")}
          >
            <h2>Title</h2>
            <p>Hello world</p>
          </qing-dialog>`)}
        ${this.r("Auto-close",U` <qing-dialog id="auto-close" icon="success" @shown=${this.handleAutoCloseShown}
            >This will auto-close in 3s</qing-dialog
          >`)}
        ${this.r("Close programically",U` <qing-dialog
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
          </qing-dialog>`)}
        <h2>Buttons</h2>
        ${this.r("Multiple buttons",U` <qing-dialog
            id="multiple-btns"
            .buttons=${["yes","no","cancel"]}
            @buttonClick=${t=>alert(`You clicked ${t.detail.text}!`)}
          >
            <h2>Title</h2>
            <p>Hello world</p>
          </qing-dialog>`)}
        ${this.r("Right aligned buttons",U` <qing-dialog
            id="right-btns"
            .buttons=${["yes","no","cancel"]}
            @buttonClick=${t=>alert(`You clicked ${t.detail.text}!`)}
          >
            <h2>Title</h2>
            <p>Hello world</p>
          </qing-dialog>`)}
        ${this.r("isDefault and isCancel buttons",U` <qing-dialog
            id="default-cancel-buttons"
            .buttons=${["yes","no","cancel"]}
            .cancelButtonIndex=${2}
            @buttonClick=${t=>alert(`You clicked ${t.detail.text}!`)}
          >
            <h2>Title</h2>
            <p>Hello world</p>
          </qing-dialog>`)}
        <h2>Focus</h2>
        ${this.r("Focus",U` <qing-dialog
            id="focus"
            .buttons=${["ok"]}
            @requestFocus=${()=>{this.shadowRoot.getElementById("textInput").focus()}}
          >
            <h2>Title</h2>
            <p>Hello world</p>
            <p>
              <input type="text" value="name" id="textInput" />
            </p>
          </qing-dialog>`)}
        <h2>Styles</h2>
        ${this.r("Icon",U` <qing-dialog id="icon" .buttons=${["ok"]}>
            <h2>
              ${Et({type:"error"})}
              <span style="vertical-align: middle">Title</span>
            </h2>
            <p>Hello world</p>
          </qing-dialog>`)}
        ${this.r("Long text",U` <qing-dialog id="long-text" dialogTitle="Info" icon="info" .buttons=${["ok"]}>
            <h2>
              ${Et({type:"success"})}
              <span style="vertical-align: middle">Title</span>
            </h2>
            <pre style="overflow-y: auto">${`${"2020 is coming. ".repeat(20)}\n`.repeat(500)}</pre>
          </qing-dialog>`)}
        ${this.r("Border styles",U` <qing-dialog id="border-styles" .buttons=${["ok"]}>
            <h2>
              ${Et({type:"success"})}
              <span style="vertical-align: middle">Title</span>
            </h2>
            <p>Hello world</p>
          </qing-dialog>`)}
        ${this.r("Themes",U` <qing-dialog id="themes" dialogTitle="Themes" .buttons=${["ok"]}>
            <h2>
              ${Et({type:"success",color:""})}
              <span style="vertical-align: middle">Title</span>
            </h2>
            <p>
              <button @click=${this.handleLightBtnClick}>Light</button>
              <button @click=${this.handleDarkBtnClick}>Dark</button>
            </p>
          </qing-dialog>`)}
        ${this.r("Title-only",U` <qing-dialog id="title-only"><h1>Title</h1></qing-dialog>`)}
        ${this.r("A minimal overlay",U` <qing-dialog-core id="core-minimal"><p>Hello world</p></qing-dialog-core>`)}
      </div>
    `}r(t,e){return U`
      <p>
        <button @click=${this.handleButtonClick}>${t}</button>
        ${e}
      </p>
    `}handleButtonClick(t){t.target.parentElement.children[1].setAttribute("open","")}get mainElement(){return this.shadowRoot.getElementById("main")}handleLightBtnClick(){this.mainElement.classList.remove("theme-dark")}handleDarkBtnClick(){this.mainElement.classList.add("theme-dark")}handleAutoCloseShown(){setTimeout((()=>{this.shadowRoot.getElementById("auto-close").open=!1}),3e3)}}Pt.styles=it`
  @media (min-width: 768px) {
    /** Default style */
    qing-dialog::part(overlay) {
      width: 80%;
    }

    qing-dialog#layout-auto-min-width::part(overlay) {
      width: auto;
      min-width: 400px;
      max-width: min(100vw, 1000px);
    }
  }

  qing-dialog#layout-full-margins::part(overlay) {
    display: flex;
    width: calc(100vw - 100px);
    height: calc(100vh - 100px);
  }

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
