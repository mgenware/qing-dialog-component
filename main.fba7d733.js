!function(t){"use strict";
/**
     * @license
     * Copyright 2019 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */const e=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol();class s{constructor(t,e){if(e!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return e&&void 0===this.t&&(this.t=new CSSStyleSheet,this.t.replaceSync(this.cssText)),this.t}toString(){return this.cssText}}const n=new Map,o=t=>{let e=n.get(t);return void 0===e&&n.set(t,e=new s(t,i)),e},r=(t,...e)=>{const i=1===t.length?t[0]:e.reduce(((e,i,n)=>e+(t=>{if(t instanceof s)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[n+1]),t[0]);return o(i)},l=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>o("string"==typeof t?t:t+""))(e)})(t):t
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */;var h,a,d,c;const u={toAttribute(t,e){switch(e){case Boolean:t=t?"":null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},p=(t,e)=>e!==t&&(e==e||t==t),v={attribute:!0,type:String,converter:u,reflect:!1,hasChanged:p};class m extends HTMLElement{constructor(){super(),this.Πi=new Map,this.Πo=void 0,this.Πl=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this.Πh=null,this.u()}static addInitializer(t){var e;null!==(e=this.v)&&void 0!==e||(this.v=[]),this.v.push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,i)=>{const s=this.Πp(i,e);void 0!==s&&(this.Πm.set(s,i),t.push(s))})),t}static createProperty(t,e=v){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,s=this.getPropertyDescriptor(t,i,e);void 0!==s&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){const n=this[t];this[e]=s,this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||v}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this.Πm=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(l(t))}else void 0!==t&&e.push(l(t));return e}static"Πp"(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}u(){var t;this.Πg=new Promise((t=>this.enableUpdating=t)),this.L=new Map,this.Π_(),this.requestUpdate(),null===(t=this.constructor.v)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,i;(null!==(e=this.ΠU)&&void 0!==e?e:this.ΠU=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this.ΠU)||void 0===e||e.splice(this.ΠU.indexOf(t)>>>0,1)}"Π_"(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this.Πi.set(e,this[e]),delete this[e])}))}createRenderRoot(){var t;const i=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{e?t.adoptedStyleSheets=i.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):i.forEach((e=>{const i=document.createElement("style");i.textContent=e.cssText,t.appendChild(i)}))})(i,this.constructor.elementStyles),i}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this.ΠU)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)})),this.Πl&&(this.Πl(),this.Πo=this.Πl=void 0)}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this.ΠU)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)})),this.Πo=new Promise((t=>this.Πl=t))}attributeChangedCallback(t,e,i){this.K(t,i)}"Πj"(t,e,i=v){var s,n;const o=this.constructor.Πp(t,i);if(void 0!==o&&!0===i.reflect){const r=(null!==(n=null===(s=i.converter)||void 0===s?void 0:s.toAttribute)&&void 0!==n?n:u.toAttribute)(e,i.type);this.Πh=t,null==r?this.removeAttribute(o):this.setAttribute(o,r),this.Πh=null}}K(t,e){var i,s,n;const o=this.constructor,r=o.Πm.get(t);if(void 0!==r&&this.Πh!==r){const t=o.getPropertyOptions(r),l=t.converter,h=null!==(n=null!==(s=null===(i=l)||void 0===i?void 0:i.fromAttribute)&&void 0!==s?s:"function"==typeof l?l:null)&&void 0!==n?n:u.fromAttribute;this.Πh=r,this[r]=h(e,t.type),this.Πh=null}}requestUpdate(t,e,i){let s=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||p)(this[t],e)?(this.L.has(t)||this.L.set(t,e),!0===i.reflect&&this.Πh!==t&&(void 0===this.Πk&&(this.Πk=new Map),this.Πk.set(t,i))):s=!1),!this.isUpdatePending&&s&&(this.Πg=this.Πq())}async"Πq"(){this.isUpdatePending=!0;try{for(await this.Πg;this.Πo;)await this.Πo}catch(t){Promise.reject(t)}const t=this.performUpdate();return null!=t&&await t,!this.isUpdatePending}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this.Πi&&(this.Πi.forEach(((t,e)=>this[e]=t)),this.Πi=void 0);let e=!1;const i=this.L;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this.ΠU)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(i)):this.Π$()}catch(t){throw e=!1,this.Π$(),t}e&&this.E(i)}willUpdate(t){}E(t){var e;null===(e=this.ΠU)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}"Π$"(){this.L=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this.Πg}shouldUpdate(t){return!0}update(t){void 0!==this.Πk&&(this.Πk.forEach(((t,e)=>this.Πj(e,this[e],t))),this.Πk=void 0),this.Π$()}updated(t){}firstUpdated(t){}}
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
var f,y,g,b;m.finalized=!0,m.elementProperties=new Map,m.elementStyles=[],m.shadowRootOptions={mode:"open"},null===(a=(h=globalThis).reactiveElementPlatformSupport)||void 0===a||a.call(h,{ReactiveElement:m}),(null!==(d=(c=globalThis).reactiveElementVersions)&&void 0!==d?d:c.reactiveElementVersions=[]).push("1.0.0-rc.2");const w=globalThis.trustedTypes,x=w?w.createPolicy("lit-html",{createHTML:t=>t}):void 0,S=`lit$${(Math.random()+"").slice(9)}$`,$="?"+S,k=`<${$}>`,E=document,C=(t="")=>E.createComment(t),H=t=>null===t||"object"!=typeof t&&"function"!=typeof t,A=Array.isArray,T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,P=/-->/g,N=/>/g,R=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,B=/'/g,U=/"/g,I=/^(?:script|style|textarea)$/i,O=Symbol.for("lit-noChange"),L=Symbol.for("lit-nothing"),M=new WeakMap,z=E.createTreeWalker(E,129,null,!1);class _{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,o=0;const r=t.length-1,l=this.parts,[h,a]=((t,e)=>{const i=t.length-1,s=[];let n,o=2===e?"<svg>":"",r=T;for(let e=0;e<i;e++){const i=t[e];let l,h,a=-1,d=0;for(;d<i.length&&(r.lastIndex=d,h=r.exec(i),null!==h);)d=r.lastIndex,r===T?"!--"===h[1]?r=P:void 0!==h[1]?r=N:void 0!==h[2]?(I.test(h[2])&&(n=RegExp("</"+h[2],"g")),r=R):void 0!==h[3]&&(r=R):r===R?">"===h[0]?(r=null!=n?n:T,a=-1):void 0===h[1]?a=-2:(a=r.lastIndex-h[2].length,l=h[1],r=void 0===h[3]?R:'"'===h[3]?U:B):r===U||r===B?r=R:r===P||r===N?r=T:(r=R,n=void 0);const c=r===R&&t[e+1].startsWith("/>")?" ":"";o+=r===T?i+k:a>=0?(s.push(l),i.slice(0,a)+"$lit$"+i.slice(a)+S+c):i+S+(-2===a?(s.push(void 0),e):c)}const l=o+(t[i]||"<?>")+(2===e?"</svg>":"");return[void 0!==x?x.createHTML(l):l,s]})(t,e);if(this.el=_.createElement(h,i),z.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(s=z.nextNode())&&l.length<r;){if(1===s.nodeType){if(s.hasAttributes()){const t=[];for(const e of s.getAttributeNames())if(e.endsWith("$lit$")||e.startsWith(S)){const i=a[o++];if(t.push(e),void 0!==i){const t=s.getAttribute(i.toLowerCase()+"$lit$").split(S),e=/([.?@])?(.*)/.exec(i);l.push({type:1,index:n,name:e[2],strings:t,ctor:"."===e[1]?V:"?"===e[1]?K:"@"===e[1]?Z:q})}else l.push({type:6,index:n})}for(const e of t)s.removeAttribute(e)}if(I.test(s.tagName)){const t=s.textContent.split(S),e=t.length-1;if(e>0){s.textContent=w?w.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],C()),z.nextNode(),l.push({type:2,index:++n});s.append(t[e],C())}}}else if(8===s.nodeType)if(s.data===$)l.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf(S,t+1));)l.push({type:7,index:n}),t+=S.length-1}n++}}static createElement(t,e){const i=E.createElement("template");return i.innerHTML=t,i}}function D(t,e,i=t,s){var n,o,r,l;if(e===O)return e;let h=void 0!==s?null===(n=i.Σi)||void 0===n?void 0:n[s]:i.Σo;const a=H(e)?void 0:e._$litDirective$;return(null==h?void 0:h.constructor)!==a&&(null===(o=null==h?void 0:h.O)||void 0===o||o.call(h,!1),void 0===a?h=void 0:(h=new a(t),h.T(t,i,s)),void 0!==s?(null!==(r=(l=i).Σi)&&void 0!==r?r:l.Σi=[])[s]=h:i.Σo=h),void 0!==h&&(e=D(t,h.S(t,e.values),h,s)),e}class j{constructor(t,e){this.l=[],this.N=void 0,this.D=t,this.M=e}u(t){var e;const{el:{content:i},parts:s}=this.D,n=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:E).importNode(i,!0);z.currentNode=n;let o=z.nextNode(),r=0,l=0,h=s[0];for(;void 0!==h;){if(r===h.index){let e;2===h.type?e=new W(o,o.nextSibling,this,t):1===h.type?e=new h.ctor(o,h.name,h.strings,this,t):6===h.type&&(e=new F(o,this,t)),this.l.push(e),h=s[++l]}r!==(null==h?void 0:h.index)&&(o=z.nextNode(),r++)}return n}v(t){let e=0;for(const i of this.l)void 0!==i&&(void 0!==i.strings?(i.I(t,i,e),e+=i.strings.length-2):i.I(t[e])),e++}}class W{constructor(t,e,i,s){this.type=2,this.N=void 0,this.A=t,this.B=e,this.M=i,this.options=s}setConnected(t){var e;null===(e=this.P)||void 0===e||e.call(this,t)}get parentNode(){return this.A.parentNode}get startNode(){return this.A}get endNode(){return this.B}I(t,e=this){t=D(this,t,e),H(t)?t===L||null==t||""===t?(this.H!==L&&this.R(),this.H=L):t!==this.H&&t!==O&&this.m(t):void 0!==t._$litType$?this._(t):void 0!==t.nodeType?this.$(t):(t=>{var e;return A(t)||"function"==typeof(null===(e=t)||void 0===e?void 0:e[Symbol.iterator])})(t)?this.g(t):this.m(t)}k(t,e=this.B){return this.A.parentNode.insertBefore(t,e)}$(t){this.H!==t&&(this.R(),this.H=this.k(t))}m(t){const e=this.A.nextSibling;null!==e&&3===e.nodeType&&(null===this.B?null===e.nextSibling:e===this.B.previousSibling)?e.data=t:this.$(E.createTextNode(t)),this.H=t}_(t){var e;const{values:i,_$litType$:s}=t,n="number"==typeof s?this.C(t):(void 0===s.el&&(s.el=_.createElement(s.h,this.options)),s);if((null===(e=this.H)||void 0===e?void 0:e.D)===n)this.H.v(i);else{const t=new j(n,this),e=t.u(this.options);t.v(i),this.$(e),this.H=t}}C(t){let e=M.get(t.strings);return void 0===e&&M.set(t.strings,e=new _(t)),e}g(t){A(this.H)||(this.H=[],this.R());const e=this.H;let i,s=0;for(const n of t)s===e.length?e.push(i=new W(this.k(C()),this.k(C()),this,this.options)):i=e[s],i.I(n),s++;s<e.length&&(this.R(i&&i.B.nextSibling,s),e.length=s)}R(t=this.A.nextSibling,e){var i;for(null===(i=this.P)||void 0===i||i.call(this,!1,!0,e);t&&t!==this.B;){const e=t.nextSibling;t.remove(),t=e}}}class q{constructor(t,e,i,s,n){this.type=1,this.H=L,this.N=void 0,this.V=void 0,this.element=t,this.name=e,this.M=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this.H=Array(i.length-1).fill(L),this.strings=i):this.H=L}get tagName(){return this.element.tagName}I(t,e=this,i,s){const n=this.strings;let o=!1;if(void 0===n)t=D(this,t,e,0),o=!H(t)||t!==this.H&&t!==O,o&&(this.H=t);else{const s=t;let r,l;for(t=n[0],r=0;r<n.length-1;r++)l=D(this,s[i+r],e,r),l===O&&(l=this.H[r]),o||(o=!H(l)||l!==this.H[r]),l===L?t=L:t!==L&&(t+=(null!=l?l:"")+n[r+1]),this.H[r]=l}o&&!s&&this.W(t)}W(t){t===L?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class V extends q{constructor(){super(...arguments),this.type=3}W(t){this.element[this.name]=t===L?void 0:t}}class K extends q{constructor(){super(...arguments),this.type=4}W(t){t&&t!==L?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name)}}class Z extends q{constructor(){super(...arguments),this.type=5}I(t,e=this){var i;if((t=null!==(i=D(this,t,e,0))&&void 0!==i?i:L)===O)return;const s=this.H,n=t===L&&s!==L||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==L&&(s===L||n);n&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this.H=t}handleEvent(t){var e,i;"function"==typeof this.H?this.H.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this.H.handleEvent(t)}}class F{constructor(t,e,i){this.element=t,this.type=6,this.N=void 0,this.V=void 0,this.M=e,this.options=i}I(t){D(this,t)}}
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
var J,G,Q,X;null===(y=(f=globalThis).litHtmlPlatformSupport)||void 0===y||y.call(f,_,W),(null!==(g=(b=globalThis).litHtmlVersions)&&void 0!==g?g:b.litHtmlVersions=[]).push("2.0.0-rc.3");const Y=globalThis.trustedTypes,tt=Y?Y.createPolicy("lit-html",{createHTML:t=>t}):void 0,et=`lit$${(Math.random()+"").slice(9)}$`,it="?"+et,st=`<${it}>`,nt=document,ot=(t="")=>nt.createComment(t),rt=t=>null===t||"object"!=typeof t&&"function"!=typeof t,lt=Array.isArray,ht=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,at=/-->/g,dt=/>/g,ct=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,ut=/'/g,pt=/"/g,vt=/^(?:script|style|textarea)$/i,mt=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),ft=Symbol.for("lit-noChange"),yt=Symbol.for("lit-nothing"),gt=new WeakMap,bt=nt.createTreeWalker(nt,129,null,!1),wt=(t,e)=>{const i=t.length-1,s=[];let n,o=2===e?"<svg>":"",r=ht;for(let e=0;e<i;e++){const i=t[e];let l,h,a=-1,d=0;for(;d<i.length&&(r.lastIndex=d,h=r.exec(i),null!==h);)d=r.lastIndex,r===ht?"!--"===h[1]?r=at:void 0!==h[1]?r=dt:void 0!==h[2]?(vt.test(h[2])&&(n=RegExp("</"+h[2],"g")),r=ct):void 0!==h[3]&&(r=ct):r===ct?">"===h[0]?(r=null!=n?n:ht,a=-1):void 0===h[1]?a=-2:(a=r.lastIndex-h[2].length,l=h[1],r=void 0===h[3]?ct:'"'===h[3]?pt:ut):r===pt||r===ut?r=ct:r===at||r===dt?r=ht:(r=ct,n=void 0);const c=r===ct&&t[e+1].startsWith("/>")?" ":"";o+=r===ht?i+st:a>=0?(s.push(l),i.slice(0,a)+"$lit$"+i.slice(a)+et+c):i+et+(-2===a?(s.push(void 0),e):c)}const l=o+(t[i]||"<?>")+(2===e?"</svg>":"");return[void 0!==tt?tt.createHTML(l):l,s]};class xt{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,o=0;const r=t.length-1,l=this.parts,[h,a]=wt(t,e);if(this.el=xt.createElement(h,i),bt.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(s=bt.nextNode())&&l.length<r;){if(1===s.nodeType){if(s.hasAttributes()){const t=[];for(const e of s.getAttributeNames())if(e.endsWith("$lit$")||e.startsWith(et)){const i=a[o++];if(t.push(e),void 0!==i){const t=s.getAttribute(i.toLowerCase()+"$lit$").split(et),e=/([.?@])?(.*)/.exec(i);l.push({type:1,index:n,name:e[2],strings:t,ctor:"."===e[1]?Ct:"?"===e[1]?Ht:"@"===e[1]?At:Et})}else l.push({type:6,index:n})}for(const e of t)s.removeAttribute(e)}if(vt.test(s.tagName)){const t=s.textContent.split(et),e=t.length-1;if(e>0){s.textContent=Y?Y.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],ot()),bt.nextNode(),l.push({type:2,index:++n});s.append(t[e],ot())}}}else if(8===s.nodeType)if(s.data===it)l.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf(et,t+1));)l.push({type:7,index:n}),t+=et.length-1}n++}}static createElement(t,e){const i=nt.createElement("template");return i.innerHTML=t,i}}function St(t,e,i=t,s){var n,o,r,l;if(e===ft)return e;let h=void 0!==s?null===(n=i.Σi)||void 0===n?void 0:n[s]:i.Σo;const a=rt(e)?void 0:e._$litDirective$;return(null==h?void 0:h.constructor)!==a&&(null===(o=null==h?void 0:h.O)||void 0===o||o.call(h,!1),void 0===a?h=void 0:(h=new a(t),h.T(t,i,s)),void 0!==s?(null!==(r=(l=i).Σi)&&void 0!==r?r:l.Σi=[])[s]=h:i.Σo=h),void 0!==h&&(e=St(t,h.S(t,e.values),h,s)),e}class $t{constructor(t,e){this.l=[],this.N=void 0,this.D=t,this.M=e}u(t){var e;const{el:{content:i},parts:s}=this.D,n=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:nt).importNode(i,!0);bt.currentNode=n;let o=bt.nextNode(),r=0,l=0,h=s[0];for(;void 0!==h;){if(r===h.index){let e;2===h.type?e=new kt(o,o.nextSibling,this,t):1===h.type?e=new h.ctor(o,h.name,h.strings,this,t):6===h.type&&(e=new Tt(o,this,t)),this.l.push(e),h=s[++l]}r!==(null==h?void 0:h.index)&&(o=bt.nextNode(),r++)}return n}v(t){let e=0;for(const i of this.l)void 0!==i&&(void 0!==i.strings?(i.I(t,i,e),e+=i.strings.length-2):i.I(t[e])),e++}}class kt{constructor(t,e,i,s){this.type=2,this.N=void 0,this.A=t,this.B=e,this.M=i,this.options=s}setConnected(t){var e;null===(e=this.P)||void 0===e||e.call(this,t)}get parentNode(){return this.A.parentNode}get startNode(){return this.A}get endNode(){return this.B}I(t,e=this){t=St(this,t,e),rt(t)?t===yt||null==t||""===t?(this.H!==yt&&this.R(),this.H=yt):t!==this.H&&t!==ft&&this.m(t):void 0!==t._$litType$?this._(t):void 0!==t.nodeType?this.$(t):(t=>{var e;return lt(t)||"function"==typeof(null===(e=t)||void 0===e?void 0:e[Symbol.iterator])})(t)?this.g(t):this.m(t)}k(t,e=this.B){return this.A.parentNode.insertBefore(t,e)}$(t){this.H!==t&&(this.R(),this.H=this.k(t))}m(t){const e=this.A.nextSibling;null!==e&&3===e.nodeType&&(null===this.B?null===e.nextSibling:e===this.B.previousSibling)?e.data=t:this.$(nt.createTextNode(t)),this.H=t}_(t){var e;const{values:i,_$litType$:s}=t,n="number"==typeof s?this.C(t):(void 0===s.el&&(s.el=xt.createElement(s.h,this.options)),s);if((null===(e=this.H)||void 0===e?void 0:e.D)===n)this.H.v(i);else{const t=new $t(n,this),e=t.u(this.options);t.v(i),this.$(e),this.H=t}}C(t){let e=gt.get(t.strings);return void 0===e&&gt.set(t.strings,e=new xt(t)),e}g(t){lt(this.H)||(this.H=[],this.R());const e=this.H;let i,s=0;for(const n of t)s===e.length?e.push(i=new kt(this.k(ot()),this.k(ot()),this,this.options)):i=e[s],i.I(n),s++;s<e.length&&(this.R(i&&i.B.nextSibling,s),e.length=s)}R(t=this.A.nextSibling,e){var i;for(null===(i=this.P)||void 0===i||i.call(this,!1,!0,e);t&&t!==this.B;){const e=t.nextSibling;t.remove(),t=e}}}class Et{constructor(t,e,i,s,n){this.type=1,this.H=yt,this.N=void 0,this.V=void 0,this.element=t,this.name=e,this.M=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this.H=Array(i.length-1).fill(yt),this.strings=i):this.H=yt}get tagName(){return this.element.tagName}I(t,e=this,i,s){const n=this.strings;let o=!1;if(void 0===n)t=St(this,t,e,0),o=!rt(t)||t!==this.H&&t!==ft,o&&(this.H=t);else{const s=t;let r,l;for(t=n[0],r=0;r<n.length-1;r++)l=St(this,s[i+r],e,r),l===ft&&(l=this.H[r]),o||(o=!rt(l)||l!==this.H[r]),l===yt?t=yt:t!==yt&&(t+=(null!=l?l:"")+n[r+1]),this.H[r]=l}o&&!s&&this.W(t)}W(t){t===yt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class Ct extends Et{constructor(){super(...arguments),this.type=3}W(t){this.element[this.name]=t===yt?void 0:t}}class Ht extends Et{constructor(){super(...arguments),this.type=4}W(t){t&&t!==yt?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name)}}class At extends Et{constructor(){super(...arguments),this.type=5}I(t,e=this){var i;if((t=null!==(i=St(this,t,e,0))&&void 0!==i?i:yt)===ft)return;const s=this.H,n=t===yt&&s!==yt||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==yt&&(s===yt||n);n&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this.H=t}handleEvent(t){var e,i;"function"==typeof this.H?this.H.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this.H.handleEvent(t)}}class Tt{constructor(t,e,i){this.element=t,this.type=6,this.N=void 0,this.V=void 0,this.M=e,this.options=i}I(t){St(this,t)}}
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
var Pt,Nt,Rt,Bt,Ut,It;null===(G=(J=globalThis).litHtmlPlatformSupport)||void 0===G||G.call(J,xt,kt),(null!==(Q=(X=globalThis).litHtmlVersions)&&void 0!==Q?Q:X.litHtmlVersions=[]).push("2.0.0-rc.3"),(null!==(Pt=(It=globalThis).litElementVersions)&&void 0!==Pt?Pt:It.litElementVersions=[]).push("3.0.0-rc.2");class Ot extends m{constructor(){super(...arguments),this.renderOptions={host:this},this.Φt=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();super.update(t),this.Φt=((t,e,i)=>{var s,n;const o=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:e;let r=o._$litPart$;if(void 0===r){const t=null!==(n=null==i?void 0:i.renderBefore)&&void 0!==n?n:null;o._$litPart$=r=new kt(e.insertBefore(ot(),t),t,void 0,i)}return r.I(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this.Φt)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this.Φt)||void 0===t||t.setConnected(!1)}render(){return ft}}Ot.finalized=!0,Ot._$litElement$=!0,null===(Rt=(Nt=globalThis).litElementHydrateSupport)||void 0===Rt||Rt.call(Nt,{LitElement:Ot}),null===(Ut=(Bt=globalThis).litElementPlatformSupport)||void 0===Ut||Ut.call(Bt,{LitElement:Ot});
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
const Lt=t=>e=>"function"==typeof e?((t,e)=>(window.customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:i,elements:s}=e;return{kind:i,elements:s,finisher(e){window.customElements.define(t,e)}}})(t,e)
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */,Mt=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(i){i.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}};function zt(t){return(e,i)=>void 0!==i?((t,e,i)=>{e.constructor.createProperty(i,t)})(t,e,i):Mt(t,e)}var _t=function(t,e,i,s){var n,o=arguments.length,r=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var l=t.length-1;l>=0;l--)(n=t[l])&&(r=(o<3?n(r):o>3?n(e,i,r):n(e,i))||r);return o>3&&r&&Object.defineProperty(e,i,r),r};let Dt=class extends Ot{constructor(){super(...arguments),this.disabled=!1,this.autofocus=!1,this.canSelect=!1,this.disableSelectedStyle=!1,this.href="",this.btnStyle="",this.selected=!1,this.buttonElement=null}static get styles(){return[r`
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
      `]}firstUpdated(){if(!this.shadowRoot)throw new Error("Unexpected undefined shadowRoot");this.buttonElement=this.shadowRoot.querySelector("button")}render(){return mt`
      <button
        class=${this.selected&&!this.disableSelectedStyle?"selected":""}
        part="button"
        ?disabled=${this.disabled}
        ?autofocus=${this.autofocus}
        @click=${this.handleClick}
      >
        <slot></slot>
      </button>
    `}focus(){this.buttonElement&&this.buttonElement.focus()}handleClick(t){t.preventDefault(),t.stopImmediatePropagation(),this.href?window.location.href=this.href:(this.canSelect&&(this.selected=!this.selected),this.dispatchEvent(new CustomEvent("click")))}};_t([zt({type:Boolean})],Dt.prototype,"disabled",void 0),_t([zt({type:Boolean})],Dt.prototype,"autofocus",void 0),_t([zt({type:Boolean})],Dt.prototype,"canSelect",void 0),_t([zt({type:Boolean})],Dt.prototype,"disableSelectedStyle",void 0),_t([zt({type:String})],Dt.prototype,"href",void 0),_t([zt({type:String})],Dt.prototype,"btnStyle",void 0),_t([zt({type:Boolean,reflect:!0})],Dt.prototype,"selected",void 0),Dt=_t([Lt("qing-button")],Dt);
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
const jt=1;
/**
     * @license
     * Copyright 2018 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
const Wt=(t=>(...e)=>({_$litDirective$:t,values:e}))(class extends class{constructor(t){}T(t,e,i){this.Σdt=t,this.M=e,this.Σct=i}S(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}{constructor(t){var e;if(super(t),t.type!==jt||"style"!==t.name||(null===(e=t.strings)||void 0===e?void 0:e.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce(((e,i)=>{const s=t[i];return null==s?e:e+`${i=i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`}),"")}update(t,[e]){const{style:i}=t.element;if(void 0===this.St){this.St=new Set;for(const t in e)this.St.add(t);return this.render(e)}this.St.forEach((t=>{null==e[t]&&(this.St.delete(t),t.includes("-")?i.removeProperty(t):i[t]="")}));for(const t in e){const s=e[t];null!=s&&(this.St.add(t),t.includes("-")?i.setProperty(t,s):i[t]=s)}return O}});var qt=function(t,e,i,s){var n,o=arguments.length,r=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var l=t.length-1;l>=0;l--)(n=t[l])&&(r=(o<3?n(r):o>3?n(e,i,r):n(e,i))||r);return o>3&&r&&Object.defineProperty(e,i,r),r};const Vt="overlay",Kt="overlay-background",Zt="open";let Ft=class extends Ot{constructor(){super(...arguments),this.open=!1}static get styles(){return r`
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
        z-index: var(--overlay-z-index, 1000);
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
        display: flex;
        flex-direction: column;
        overflow: auto;
      }
    `}firstUpdated(){document.addEventListener("keyup",this.handleKeyUp.bind(this))}render(){const{open:t}=this;return mt`
      <div
        style=${Wt({display:t?"flex":"none"})}
        class=${Kt}
        part=${Kt}
      >
        <div class=${Vt} part=${Vt}>
          <slot></slot>
        </div>
      </div>
    `}updated(t){t.has(Zt)&&!!t.get(Zt)!==this.open&&setTimeout((()=>this.onOpenChanged()),0)}onOpenChanged(){this.dispatchEvent(new CustomEvent("openChanged",{detail:this.open}))}handleKeyUp(t){this.open&&("Escape"===t.key||"Esc"===t.key?this.dispatchEvent(new CustomEvent("escKeyDown")):"Enter"===t.key&&this.dispatchEvent(new CustomEvent("enterKeyDown")))}};qt([zt({type:Boolean,reflect:!0})],Ft.prototype,"open",void 0),Ft=qt([Lt("qing-overlay")],Ft);const Jt=r`
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
`;class Gt extends Ot{render(){return mt` <h2>Title</h2>
      <p>
        <span id="span">Hello world <button @click=${this.handleClick}>Expand</button></span>
      </p>`}handleClick(){this.shadowRoot.getElementById("span").textContent="The div element has no special meaning at all. It represents its children. It can be\n    used with the class, lang, and title attributes to mark up semantics common to a group\n    of consecutive elements. The div element has no special meaning at all. It represents\n    its children. It can be used with the class, lang, and title attributes to mark up\n    semantics common to a group of consecutive elements. The div element has no special\n    meaning at all. It represents its children. It can be used with the class, lang, and\n    title attributes to mark up semantics common to a group of consecutive elements."}}Gt.styles=[Jt,r`
    :host {
      display: flex;
      flex-grow: 1;
      flex-direction: column;
    }
  `],customElements.define("dynamic-content",Gt);class Qt extends Ot{render(){return mt`
      <div id="main">
        <h2>Layouts</h2>
        ${this.r("Width: 80%, Height: auto","layout-w-80")}
        ${this.r("Width: auto + min value, Height: auto","layout-auto-min-width")}
        ${this.r("Fullscreen with margins","layout-full-margins")}
        <h2>Events</h2>
        ${this.r("Handle events","handle-events",void 0,(t=>alert(t.detail?"Opening":"Closing")))}
        <h2>Focus</h2>
        ${this.r("Focus","focus",mt` <h2>Title</h2>
            <p>Hello world</p>
            <p>
              <input type="text" value="name" id="textInput" />
            </p>`,(t=>{t.detail&&this.shadowRoot.getElementById("textInput").focus()}))}
        <h2>Styles</h2>
        ${this.r("Long text","long-text",mt`<h2>Long text</h2>
            <pre style="overflow-y: auto">
${`${"2020 is coming. ".repeat(20)}\n`.repeat(500)}</pre
            >`)}
        ${this.r("Border styles","border-styles")}
        ${this.rElement("Themes","themes",mt` <qing-overlay id="themes">
            <h2>Title</h2>
            <p>
              <button @click=${this.handleLightBtnClick}>Light</button>
              <button @click=${this.handleDarkBtnClick}>Dark</button>
              <button
                @click=${()=>this.shadowRoot.getElementById("themes").removeAttribute("open")}
              >
                Close
              </button>
            </p>
          </qing-overlay>`)}
      </div>
    `}r(t,e,i,s){const n=`${e}-btn`;return mt`
      <p>
        <button @click=${()=>this.shadowRoot.getElementById(e).setAttribute("open","")}>
          ${t}
        </button>
      </p>
      <qing-overlay
        id=${e}
        @escKeyDown=${()=>this.shadowRoot.getElementById(e).removeAttribute("open")}
        @openChanged=${t=>{t.detail&&this.shadowRoot.getElementById(n).focus(),s&&s(t)}}
      >
        ${i??mt`<dynamic-content></dynamic-content>`}
        <p style="text-align:center">
          <button
            id=${n}
            @click=${()=>this.shadowRoot.getElementById(e).removeAttribute("open")}
          >
            OK
          </button>
        </p>
      </qing-overlay>
    `}rElement(t,e,i){return mt`
      <p>
        <button @click=${()=>this.shadowRoot.getElementById(e).setAttribute("open","")}>
          ${t}
        </button>
      </p>
      ${i}
    `}get mainElement(){return this.shadowRoot.getElementById("main")}handleLightBtnClick(){this.mainElement.classList.remove("theme-dark")}handleDarkBtnClick(){this.mainElement.classList.add("theme-dark")}}Qt.styles=[Jt,r`
    qing-overlay::part(overlay) {
      padding: 0.625rem 1.25rem;
    }

    @media (min-width: 768px) {
      qing-overlay::part(overlay) {
        width: 80%;
      }

      qing-overlay#layout-auto-min-width::part(overlay) {
        width: auto;
        min-width: 400px;
        max-width: min(100vw, 1000px);
      }
    }

    qing-overlay#layout-full-margins::part(overlay) {
      width: calc(100vw - 1rem);
      height: calc(100vh - 1rem);
    }
    @media (min-width: 768px) {
      qing-overlay#layout-full-margins::part(overlay) {
        width: calc(100vw - 4rem);
        height: calc(100vh - 4rem);
      }
    }

    h2 {
      margin-bottom: 0;
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
    #themes button {
      border: 1px solid #818181;
      color: var(--default-fore-color);
      background-color: var(--default-btn-back-color);
    }
  `],customElements.define("example-app",Qt),t.ExampleApp=Qt,Object.defineProperty(t,"__esModule",{value:!0})}({});
