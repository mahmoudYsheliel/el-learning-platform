function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/quill-BQL2exU3.js","assets/_commonjsHelpers-Cpj98o6Y.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{d as ee,r as $,H as N,a3 as ce,o as v,c as C,e as o,b as p,f as b,l as D,_ as te,L as je,A as f,B as ie,aJ as Le,aT as Ue,aU as ot,P as ve,v as Ke,j as He,z as Ge,a4 as at,y as K,G as E,a1 as J,aV as pe,g as M,M as Qe,aW as rt,m as O,w as W,x as X,t as re,a8 as st,aX as ut,ax as dt,aP as ct,aY as pt,C as U,J as We,T as qe,aF as we,aZ as Ne,V as ye,a_ as bt,a$ as be,ah as mt,aG as ft,ap as ht,Y as vt,Z as Je,$ as Ye,a0 as $e,U as me,aD as qt,b0 as z,E as gt,i as wt,N as kt,a2 as ke,b1 as yt,b2 as $t,F as xt}from"./index-CmLhLd9c.js";import{s as Ze}from"./index-0KOvNlxv.js";import{a as Ct,s as Vt}from"./index-DPG-uh8K.js";import{G as It}from"./index-CdeYONtP.js";import{s as fe}from"./index-DuKKIvku.js";import"./index-B_rKrWuz.js";const St={class:"container"},Bt={class:"material-container"},Dt={class:"element"},At={class:"element"},Tt={class:"element"},_t={class:"element"},zt={class:"element"},Pt={class:"element"},Et=ee({__name:"AddSimulation",props:["addMaterial","materialId"],emits:["info"],setup(e,{emit:t}){const n=$({en:"",ar:""}),l=$({en:"",ar:""}),r=$(""),i=$(""),d=e,c=t;return d.materialId&&new N("get_simulation").callApi({simulation_id:d.materialId}).then(s=>{var a,u,m,k,w,x,_,S;s!=null&&s.success&&(n.value=(u=(a=s==null?void 0:s.data)==null?void 0:a.simulation)==null?void 0:u.title,l.value=(k=(m=s==null?void 0:s.data)==null?void 0:m.simulation)==null?void 0:k.description,r.value=(x=(w=s==null?void 0:s.data)==null?void 0:w.simulation)==null?void 0:x.source,i.value=(S=(_=s==null?void 0:s.data)==null?void 0:_.simulation)==null?void 0:S.image)}),ce(d,()=>{if(d.addMaterial){let s={title:n.value,description:l.value,source:r.value,image:i.value};if(d.materialId){let a={simulation_id:d.materialId,update:s};new N("update_simulation").callApi(a).then(u=>{u!=null&&u.success&&c("info",null)})}else{let a={new_simulation:s};new N("create_simulation").callApi(a).then(u=>{var m,k;if((m=u==null?void 0:u.data)!=null&&m.simulation_id){let w={Id:(k=u==null?void 0:u.data)==null?void 0:k.simulation_id,title:{en:n.value.en,ar:n.value.ar}};c("info",w)}})}}}),(s,a)=>(v(),C("div",St,[o("div",Bt,[o("div",Dt,[a[6]||(a[6]=o("h4",null,"English Title",-1)),p(b(D),{modelValue:n.value.en,"onUpdate:modelValue":a[0]||(a[0]=u=>n.value.en=u)},null,8,["modelValue"])]),o("div",At,[a[7]||(a[7]=o("h4",null,"Arabic Title",-1)),p(b(D),{modelValue:n.value.ar,"onUpdate:modelValue":a[1]||(a[1]=u=>n.value.ar=u)},null,8,["modelValue"])]),o("div",Tt,[a[8]||(a[8]=o("h4",null,"English Description",-1)),p(b(D),{modelValue:l.value.en,"onUpdate:modelValue":a[2]||(a[2]=u=>l.value.en=u)},null,8,["modelValue"])]),o("div",_t,[a[9]||(a[9]=o("h4",null,"Arabic Description",-1)),p(b(D),{modelValue:l.value.ar,"onUpdate:modelValue":a[3]||(a[3]=u=>l.value.ar=u)},null,8,["modelValue"])]),o("div",zt,[a[10]||(a[10]=o("h4",null,"Source",-1)),p(b(D),{modelValue:r.value,"onUpdate:modelValue":a[4]||(a[4]=u=>r.value=u)},null,8,["modelValue"])]),o("div",Pt,[a[11]||(a[11]=o("h4",null,"Image",-1)),p(b(D),{modelValue:i.value,"onUpdate:modelValue":a[5]||(a[5]=u=>i.value=u)},null,8,["modelValue"])])])]))}}),Lt=te(Et,[["__scopeId","data-v-bac4694c"]]);var Xe={name:"AngleDownIcon",extends:je};function Ut(e,t,n,l,r,i){return v(),C("svg",f({width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",xmlns:"http://www.w3.org/2000/svg"},e.pti()),t[0]||(t[0]=[o("path",{d:"M3.58659 4.5007C3.68513 4.50023 3.78277 4.51945 3.87379 4.55723C3.9648 4.59501 4.04735 4.65058 4.11659 4.7207L7.11659 7.7207L10.1166 4.7207C10.2619 4.65055 10.4259 4.62911 10.5843 4.65956C10.7427 4.69002 10.8871 4.77074 10.996 4.88976C11.1049 5.00877 11.1726 5.15973 11.1889 5.32022C11.2052 5.48072 11.1693 5.6422 11.0866 5.7807L7.58659 9.2807C7.44597 9.42115 7.25534 9.50004 7.05659 9.50004C6.85784 9.50004 6.66722 9.42115 6.52659 9.2807L3.02659 5.7807C2.88614 5.64007 2.80725 5.44945 2.80725 5.2507C2.80725 5.05195 2.88614 4.86132 3.02659 4.7207C3.09932 4.64685 3.18675 4.58911 3.28322 4.55121C3.37969 4.51331 3.48305 4.4961 3.58659 4.5007Z",fill:"currentColor"},null,-1)]),16)}Xe.render=Ut;var et={name:"AngleUpIcon",extends:je};function Nt(e,t,n,l,r,i){return v(),C("svg",f({width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",xmlns:"http://www.w3.org/2000/svg"},e.pti()),t[0]||(t[0]=[o("path",{d:"M10.4134 9.49931C10.3148 9.49977 10.2172 9.48055 10.1262 9.44278C10.0352 9.405 9.95263 9.34942 9.88338 9.27931L6.88338 6.27931L3.88338 9.27931C3.73811 9.34946 3.57409 9.3709 3.41567 9.34044C3.25724 9.30999 3.11286 9.22926 3.00395 9.11025C2.89504 8.99124 2.82741 8.84028 2.8111 8.67978C2.79478 8.51928 2.83065 8.35781 2.91338 8.21931L6.41338 4.71931C6.55401 4.57886 6.74463 4.49997 6.94338 4.49997C7.14213 4.49997 7.33276 4.57886 7.47338 4.71931L10.9734 8.21931C11.1138 8.35994 11.1927 8.55056 11.1927 8.74931C11.1927 8.94806 11.1138 9.13868 10.9734 9.27931C10.9007 9.35315 10.8132 9.41089 10.7168 9.44879C10.6203 9.48669 10.5169 9.5039 10.4134 9.49931Z",fill:"currentColor"},null,-1)]),16)}et.render=Nt;var Ot=({dt:e})=>`
.p-inputnumber {
    display: inline-flex;
    position: relative;
}

.p-inputnumber-button {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 auto;
    cursor: pointer;
    background: ${e("inputnumber.button.background")};
    color: ${e("inputnumber.button.color")};
    width: ${e("inputnumber.button.width")};
    transition: background ${e("inputnumber.transition.duration")}, color ${e("inputnumber.transition.duration")}, border-color ${e("inputnumber.transition.duration")}, outline-color ${e("inputnumber.transition.duration")};
}

.p-inputnumber-button:disabled {
    cursor: auto;
}

.p-inputnumber-button:not(:disabled):hover {
    background: ${e("inputnumber.button.hover.background")};
    color: ${e("inputnumber.button.hover.color")};
}

.p-inputnumber-button:not(:disabled):active {
    background: ${e("inputnumber.button.active.background")};
    color: ${e("inputnumber.button.active.color")};
}

.p-inputnumber-stacked .p-inputnumber-button {
    position: relative;
    border: 0 none;
}

.p-inputnumber-stacked .p-inputnumber-button-group {
    display: flex;
    flex-direction: column;
    position: absolute;
    inset-block-start: 1px;
    inset-inline-end: 1px;
    height: calc(100% - 2px);
    z-index: 1;
}

.p-inputnumber-stacked .p-inputnumber-increment-button {
    padding: 0;
    border-start-end-radius: calc(${e("inputnumber.button.border.radius")} - 1px);
}

.p-inputnumber-stacked .p-inputnumber-decrement-button {
    padding: 0;
    border-end-end-radius: calc(${e("inputnumber.button.border.radius")} - 1px);
}

.p-inputnumber-stacked .p-inputnumber-button {
    flex: 1 1 auto;
    border: 0 none;
}

.p-inputnumber-horizontal .p-inputnumber-button {
    border: 1px solid ${e("inputnumber.button.border.color")};
}

.p-inputnumber-horizontal .p-inputnumber-button:hover {
    border-color: ${e("inputnumber.button.hover.border.color")};
}

.p-inputnumber-horizontal .p-inputnumber-button:active {
    border-color: ${e("inputnumber.button.active.border.color")};
}

.p-inputnumber-horizontal .p-inputnumber-increment-button {
    order: 3;
    border-start-end-radius: ${e("inputnumber.button.border.radius")};
    border-end-end-radius: ${e("inputnumber.button.border.radius")};
    border-inline-start: 0 none;
}

.p-inputnumber-horizontal .p-inputnumber-input {
    order: 2;
    border-radius: 0;
}

.p-inputnumber-horizontal .p-inputnumber-decrement-button {
    order: 1;
    border-start-start-radius: ${e("inputnumber.button.border.radius")};
    border-end-start-radius: ${e("inputnumber.button.border.radius")};
    border-inline-end: 0 none;
}

.p-floatlabel:has(.p-inputnumber-horizontal) label {
    margin-inline-start: ${e("inputnumber.button.width")};
}

.p-inputnumber-vertical {
    flex-direction: column;
}

.p-inputnumber-vertical .p-inputnumber-button {
    border: 1px solid ${e("inputnumber.button.border.color")};
    padding: ${e("inputnumber.button.vertical.padding")};
}

.p-inputnumber-vertical .p-inputnumber-button:hover {
    border-color: ${e("inputnumber.button.hover.border.color")};
}

.p-inputnumber-vertical .p-inputnumber-button:active {
    border-color: ${e("inputnumber.button.active.border.color")};
}

.p-inputnumber-vertical .p-inputnumber-increment-button {
    order: 1;
    border-start-start-radius: ${e("inputnumber.button.border.radius")};
    border-start-end-radius: ${e("inputnumber.button.border.radius")};
    width: 100%;
    border-block-end: 0 none;
}

.p-inputnumber-vertical .p-inputnumber-input {
    order: 2;
    border-radius: 0;
    text-align: center;
}

.p-inputnumber-vertical .p-inputnumber-decrement-button {
    order: 3;
    border-end-start-radius: ${e("inputnumber.button.border.radius")};
    border-end-end-radius: ${e("inputnumber.button.border.radius")};
    width: 100%;
    border-block-start: 0 none;
}

.p-inputnumber-input {
    flex: 1 1 auto;
}

.p-inputnumber-fluid {
    width: 100%;
}

.p-inputnumber-fluid .p-inputnumber-input {
    width: 1%;
}

.p-inputnumber-fluid.p-inputnumber-vertical .p-inputnumber-input {
    width: 100%;
}

.p-inputnumber:has(.p-inputtext-sm) .p-inputnumber-button .p-icon {
    font-size: ${e("form.field.sm.font.size")};
    width: ${e("form.field.sm.font.size")};
    height: ${e("form.field.sm.font.size")};
}

.p-inputnumber:has(.p-inputtext-lg) .p-inputnumber-button .p-icon {
    font-size: ${e("form.field.lg.font.size")};
    width: ${e("form.field.lg.font.size")};
    height: ${e("form.field.lg.font.size")};
}
`,Mt={root:function(t){var n=t.instance,l=t.props;return["p-inputnumber p-component p-inputwrapper",{"p-invalid":n.$invalid,"p-inputwrapper-filled":n.$filled||l.allowEmpty===!1,"p-inputwrapper-focus":n.focused,"p-inputnumber-stacked":l.showButtons&&l.buttonLayout==="stacked","p-inputnumber-horizontal":l.showButtons&&l.buttonLayout==="horizontal","p-inputnumber-vertical":l.showButtons&&l.buttonLayout==="vertical","p-inputnumber-fluid":n.$fluid}]},pcInputText:"p-inputnumber-input",buttonGroup:"p-inputnumber-button-group",incrementButton:function(t){var n=t.instance,l=t.props;return["p-inputnumber-button p-inputnumber-increment-button",{"p-disabled":l.showButtons&&l.max!==null&&n.maxBoundry()}]},decrementButton:function(t){var n=t.instance,l=t.props;return["p-inputnumber-button p-inputnumber-decrement-button",{"p-disabled":l.showButtons&&l.min!==null&&n.minBoundry()}]}},Rt=ie.extend({name:"inputnumber",style:Ot,classes:Mt}),Ft={name:"BaseInputNumber",extends:Ke,props:{format:{type:Boolean,default:!0},showButtons:{type:Boolean,default:!1},buttonLayout:{type:String,default:"stacked"},incrementButtonClass:{type:String,default:null},decrementButtonClass:{type:String,default:null},incrementButtonIcon:{type:String,default:void 0},incrementIcon:{type:String,default:void 0},decrementButtonIcon:{type:String,default:void 0},decrementIcon:{type:String,default:void 0},locale:{type:String,default:void 0},localeMatcher:{type:String,default:void 0},mode:{type:String,default:"decimal"},prefix:{type:String,default:null},suffix:{type:String,default:null},currency:{type:String,default:void 0},currencyDisplay:{type:String,default:void 0},useGrouping:{type:Boolean,default:!0},minFractionDigits:{type:Number,default:void 0},maxFractionDigits:{type:Number,default:void 0},roundingMode:{type:String,default:"halfExpand",validator:function(t){return["ceil","floor","expand","trunc","halfCeil","halfFloor","halfExpand","halfTrunc","halfEven"].includes(t)}},min:{type:Number,default:null},max:{type:Number,default:null},step:{type:Number,default:1},allowEmpty:{type:Boolean,default:!0},highlightOnFocus:{type:Boolean,default:!1},readonly:{type:Boolean,default:!1},placeholder:{type:String,default:null},inputId:{type:String,default:null},inputClass:{type:[String,Object],default:null},inputStyle:{type:Object,default:null},ariaLabelledby:{type:String,default:null},ariaLabel:{type:String,default:null},required:{type:Boolean,default:!1}},style:Rt,provide:function(){return{$pcInputNumber:this,$parentInstance:this}}};function se(e){"@babel/helpers - typeof";return se=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},se(e)}function Oe(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);t&&(l=l.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),n.push.apply(n,l)}return n}function Me(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?Oe(Object(n),!0).forEach(function(l){xe(e,l,n[l])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Oe(Object(n)).forEach(function(l){Object.defineProperty(e,l,Object.getOwnPropertyDescriptor(n,l))})}return e}function xe(e,t,n){return(t=jt(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function jt(e){var t=Kt(e,"string");return se(t)=="symbol"?t:t+""}function Kt(e,t){if(se(e)!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var l=n.call(e,t);if(se(l)!="object")return l;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function Ht(e){return Jt(e)||Wt(e)||Qt(e)||Gt()}function Gt(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Qt(e,t){if(e){if(typeof e=="string")return Ce(e,t);var n={}.toString.call(e).slice(8,-1);return n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set"?Array.from(e):n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Ce(e,t):void 0}}function Wt(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function Jt(e){if(Array.isArray(e))return Ce(e)}function Ce(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,l=Array(t);n<t;n++)l[n]=e[n];return l}var tt={name:"InputNumber",extends:Ft,inheritAttrs:!1,emits:["input","focus","blur"],inject:{$pcFluid:{default:null}},numberFormat:null,_numeral:null,_decimal:null,_group:null,_minusSign:null,_currency:null,_suffix:null,_prefix:null,_index:null,groupChar:"",isSpecialChar:null,prefixChar:null,suffixChar:null,timer:null,data:function(){return{d_modelValue:this.d_value,focused:!1}},watch:{d_value:function(t){this.d_modelValue=t},locale:function(t,n){this.updateConstructParser(t,n)},localeMatcher:function(t,n){this.updateConstructParser(t,n)},mode:function(t,n){this.updateConstructParser(t,n)},currency:function(t,n){this.updateConstructParser(t,n)},currencyDisplay:function(t,n){this.updateConstructParser(t,n)},useGrouping:function(t,n){this.updateConstructParser(t,n)},minFractionDigits:function(t,n){this.updateConstructParser(t,n)},maxFractionDigits:function(t,n){this.updateConstructParser(t,n)},suffix:function(t,n){this.updateConstructParser(t,n)},prefix:function(t,n){this.updateConstructParser(t,n)}},created:function(){this.constructParser()},methods:{getOptions:function(){return{localeMatcher:this.localeMatcher,style:this.mode,currency:this.currency,currencyDisplay:this.currencyDisplay,useGrouping:this.useGrouping,minimumFractionDigits:this.minFractionDigits,maximumFractionDigits:this.maxFractionDigits,roundingMode:this.roundingMode}},constructParser:function(){this.numberFormat=new Intl.NumberFormat(this.locale,this.getOptions());var t=Ht(new Intl.NumberFormat(this.locale,{useGrouping:!1}).format(9876543210)).reverse(),n=new Map(t.map(function(l,r){return[l,r]}));this._numeral=new RegExp("[".concat(t.join(""),"]"),"g"),this._group=this.getGroupingExpression(),this._minusSign=this.getMinusSignExpression(),this._currency=this.getCurrencyExpression(),this._decimal=this.getDecimalExpression(),this._suffix=this.getSuffixExpression(),this._prefix=this.getPrefixExpression(),this._index=function(l){return n.get(l)}},updateConstructParser:function(t,n){t!==n&&this.constructParser()},escapeRegExp:function(t){return t.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&")},getDecimalExpression:function(){var t=new Intl.NumberFormat(this.locale,Me(Me({},this.getOptions()),{},{useGrouping:!1}));return new RegExp("[".concat(t.format(1.1).replace(this._currency,"").trim().replace(this._numeral,""),"]"),"g")},getGroupingExpression:function(){var t=new Intl.NumberFormat(this.locale,{useGrouping:!0});return this.groupChar=t.format(1e6).trim().replace(this._numeral,"").charAt(0),new RegExp("[".concat(this.groupChar,"]"),"g")},getMinusSignExpression:function(){var t=new Intl.NumberFormat(this.locale,{useGrouping:!1});return new RegExp("[".concat(t.format(-1).trim().replace(this._numeral,""),"]"),"g")},getCurrencyExpression:function(){if(this.currency){var t=new Intl.NumberFormat(this.locale,{style:"currency",currency:this.currency,currencyDisplay:this.currencyDisplay,minimumFractionDigits:0,maximumFractionDigits:0,roundingMode:this.roundingMode});return new RegExp("[".concat(t.format(1).replace(/\s/g,"").replace(this._numeral,"").replace(this._group,""),"]"),"g")}return new RegExp("[]","g")},getPrefixExpression:function(){if(this.prefix)this.prefixChar=this.prefix;else{var t=new Intl.NumberFormat(this.locale,{style:this.mode,currency:this.currency,currencyDisplay:this.currencyDisplay});this.prefixChar=t.format(1).split("1")[0]}return new RegExp("".concat(this.escapeRegExp(this.prefixChar||"")),"g")},getSuffixExpression:function(){if(this.suffix)this.suffixChar=this.suffix;else{var t=new Intl.NumberFormat(this.locale,{style:this.mode,currency:this.currency,currencyDisplay:this.currencyDisplay,minimumFractionDigits:0,maximumFractionDigits:0,roundingMode:this.roundingMode});this.suffixChar=t.format(1).split("1")[1]}return new RegExp("".concat(this.escapeRegExp(this.suffixChar||"")),"g")},formatValue:function(t){if(t!=null){if(t==="-")return t;if(this.format){var n=new Intl.NumberFormat(this.locale,this.getOptions()),l=n.format(t);return this.prefix&&(l=this.prefix+l),this.suffix&&(l=l+this.suffix),l}return t.toString()}return""},parseValue:function(t){var n=t.replace(this._suffix,"").replace(this._prefix,"").trim().replace(/\s/g,"").replace(this._currency,"").replace(this._group,"").replace(this._minusSign,"-").replace(this._decimal,".").replace(this._numeral,this._index);if(n){if(n==="-")return n;var l=+n;return isNaN(l)?null:l}return null},repeat:function(t,n,l){var r=this;if(!this.readonly){var i=n||500;this.clearTimer(),this.timer=setTimeout(function(){r.repeat(t,40,l)},i),this.spin(t,l)}},spin:function(t,n){if(this.$refs.input){var l=this.step*n,r=this.parseValue(this.$refs.input.$el.value)||0,i=this.validateValue(r+l);this.updateInput(i,null,"spin"),this.updateModel(t,i),this.handleOnInput(t,r,i)}},onUpButtonMouseDown:function(t){this.disabled||(this.$refs.input.$el.focus(),this.repeat(t,null,1),t.preventDefault())},onUpButtonMouseUp:function(){this.disabled||this.clearTimer()},onUpButtonMouseLeave:function(){this.disabled||this.clearTimer()},onUpButtonKeyUp:function(){this.disabled||this.clearTimer()},onUpButtonKeyDown:function(t){(t.code==="Space"||t.code==="Enter"||t.code==="NumpadEnter")&&this.repeat(t,null,1)},onDownButtonMouseDown:function(t){this.disabled||(this.$refs.input.$el.focus(),this.repeat(t,null,-1),t.preventDefault())},onDownButtonMouseUp:function(){this.disabled||this.clearTimer()},onDownButtonMouseLeave:function(){this.disabled||this.clearTimer()},onDownButtonKeyUp:function(){this.disabled||this.clearTimer()},onDownButtonKeyDown:function(t){(t.code==="Space"||t.code==="Enter"||t.code==="NumpadEnter")&&this.repeat(t,null,-1)},onUserInput:function(){this.isSpecialChar&&(this.$refs.input.$el.value=this.lastValue),this.isSpecialChar=!1},onInputKeyDown:function(t){if(!this.readonly){if(t.altKey||t.ctrlKey||t.metaKey){this.isSpecialChar=!0,this.lastValue=this.$refs.input.$el.value;return}this.lastValue=t.target.value;var n=t.target.selectionStart,l=t.target.selectionEnd,r=l-n,i=t.target.value,d=null,c=t.code||t.key;switch(c){case"ArrowUp":this.spin(t,1),t.preventDefault();break;case"ArrowDown":this.spin(t,-1),t.preventDefault();break;case"ArrowLeft":if(r>1){var s=this.isNumeralChar(i.charAt(n))?n+1:n+2;this.$refs.input.$el.setSelectionRange(s,s)}else this.isNumeralChar(i.charAt(n-1))||t.preventDefault();break;case"ArrowRight":if(r>1){var a=l-1;this.$refs.input.$el.setSelectionRange(a,a)}else this.isNumeralChar(i.charAt(n))||t.preventDefault();break;case"Tab":case"Enter":case"NumpadEnter":d=this.validateValue(this.parseValue(i)),this.$refs.input.$el.value=this.formatValue(d),this.$refs.input.$el.setAttribute("aria-valuenow",d),this.updateModel(t,d);break;case"Backspace":{if(t.preventDefault(),n===l){var u=i.charAt(n-1),m=this.getDecimalCharIndexes(i),k=m.decimalCharIndex,w=m.decimalCharIndexWithoutPrefix;if(this.isNumeralChar(u)){var x=this.getDecimalLength(i);if(this._group.test(u))this._group.lastIndex=0,d=i.slice(0,n-2)+i.slice(n-1);else if(this._decimal.test(u))this._decimal.lastIndex=0,x?this.$refs.input.$el.setSelectionRange(n-1,n-1):d=i.slice(0,n-1)+i.slice(n);else if(k>0&&n>k){var _=this.isDecimalMode()&&(this.minFractionDigits||0)<x?"":"0";d=i.slice(0,n-1)+_+i.slice(n)}else w===1?(d=i.slice(0,n-1)+"0"+i.slice(n),d=this.parseValue(d)>0?d:""):d=i.slice(0,n-1)+i.slice(n)}this.updateValue(t,d,null,"delete-single")}else d=this.deleteRange(i,n,l),this.updateValue(t,d,null,"delete-range");break}case"Delete":if(t.preventDefault(),n===l){var S=i.charAt(n),H=this.getDecimalCharIndexes(i),R=H.decimalCharIndex,B=H.decimalCharIndexWithoutPrefix;if(this.isNumeralChar(S)){var h=this.getDecimalLength(i);if(this._group.test(S))this._group.lastIndex=0,d=i.slice(0,n)+i.slice(n+2);else if(this._decimal.test(S))this._decimal.lastIndex=0,h?this.$refs.input.$el.setSelectionRange(n+1,n+1):d=i.slice(0,n)+i.slice(n+1);else if(R>0&&n>R){var g=this.isDecimalMode()&&(this.minFractionDigits||0)<h?"":"0";d=i.slice(0,n)+g+i.slice(n+1)}else B===1?(d=i.slice(0,n)+"0"+i.slice(n+1),d=this.parseValue(d)>0?d:""):d=i.slice(0,n)+i.slice(n+1)}this.updateValue(t,d,null,"delete-back-single")}else d=this.deleteRange(i,n,l),this.updateValue(t,d,null,"delete-range");break;case"Home":t.preventDefault(),Le(this.min)&&this.updateModel(t,this.min);break;case"End":t.preventDefault(),Le(this.max)&&this.updateModel(t,this.max);break}}},onInputKeyPress:function(t){if(!this.readonly){var n=t.key,l=this.isDecimalSign(n),r=this.isMinusSign(n);t.code!=="Enter"&&t.preventDefault(),(Number(n)>=0&&Number(n)<=9||r||l)&&this.insert(t,n,{isDecimalSign:l,isMinusSign:r})}},onPaste:function(t){t.preventDefault();var n=(t.clipboardData||window.clipboardData).getData("Text");if(n){var l=this.parseValue(n);l!=null&&this.insert(t,l.toString())}},allowMinusSign:function(){return this.min===null||this.min<0},isMinusSign:function(t){return this._minusSign.test(t)||t==="-"?(this._minusSign.lastIndex=0,!0):!1},isDecimalSign:function(t){var n;return(n=this.locale)!==null&&n!==void 0&&n.includes("fr")&&[".",","].includes(t)||this._decimal.test(t)?(this._decimal.lastIndex=0,!0):!1},isDecimalMode:function(){return this.mode==="decimal"},getDecimalCharIndexes:function(t){var n=t.search(this._decimal);this._decimal.lastIndex=0;var l=t.replace(this._prefix,"").trim().replace(/\s/g,"").replace(this._currency,""),r=l.search(this._decimal);return this._decimal.lastIndex=0,{decimalCharIndex:n,decimalCharIndexWithoutPrefix:r}},getCharIndexes:function(t){var n=t.search(this._decimal);this._decimal.lastIndex=0;var l=t.search(this._minusSign);this._minusSign.lastIndex=0;var r=t.search(this._suffix);this._suffix.lastIndex=0;var i=t.search(this._currency);return this._currency.lastIndex=0,{decimalCharIndex:n,minusCharIndex:l,suffixCharIndex:r,currencyCharIndex:i}},insert:function(t,n){var l=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{isDecimalSign:!1,isMinusSign:!1},r=n.search(this._minusSign);if(this._minusSign.lastIndex=0,!(!this.allowMinusSign()&&r!==-1)){var i=this.$refs.input.$el.selectionStart,d=this.$refs.input.$el.selectionEnd,c=this.$refs.input.$el.value.trim(),s=this.getCharIndexes(c),a=s.decimalCharIndex,u=s.minusCharIndex,m=s.suffixCharIndex,k=s.currencyCharIndex,w;if(l.isMinusSign){var x=u===-1;(i===0||i===k+1)&&(w=c,(x||d!==0)&&(w=this.insertText(c,n,0,d)),this.updateValue(t,w,n,"insert"))}else if(l.isDecimalSign)a>0&&i===a?this.updateValue(t,c,n,"insert"):a>i&&a<d?(w=this.insertText(c,n,i,d),this.updateValue(t,w,n,"insert")):a===-1&&this.maxFractionDigits&&(w=this.insertText(c,n,i,d),this.updateValue(t,w,n,"insert"));else{var _=this.numberFormat.resolvedOptions().maximumFractionDigits,S=i!==d?"range-insert":"insert";if(a>0&&i>a){if(i+n.length-(a+1)<=_){var H=k>=i?k-1:m>=i?m:c.length;w=c.slice(0,i)+n+c.slice(i+n.length,H)+c.slice(H),this.updateValue(t,w,n,S)}}else w=this.insertText(c,n,i,d),this.updateValue(t,w,n,S)}}},insertText:function(t,n,l,r){var i=n==="."?n:n.split(".");if(i.length===2){var d=t.slice(l,r).search(this._decimal);return this._decimal.lastIndex=0,d>0?t.slice(0,l)+this.formatValue(n)+t.slice(r):this.formatValue(n)||t}else return r-l===t.length?this.formatValue(n):l===0?n+t.slice(r):r===t.length?t.slice(0,l)+n:t.slice(0,l)+n+t.slice(r)},deleteRange:function(t,n,l){var r;return l-n===t.length?r="":n===0?r=t.slice(l):l===t.length?r=t.slice(0,n):r=t.slice(0,n)+t.slice(l),r},initCursor:function(){var t=this.$refs.input.$el.selectionStart,n=this.$refs.input.$el.value,l=n.length,r=null,i=(this.prefixChar||"").length;n=n.replace(this._prefix,""),t=t-i;var d=n.charAt(t);if(this.isNumeralChar(d))return t+i;for(var c=t-1;c>=0;)if(d=n.charAt(c),this.isNumeralChar(d)){r=c+i;break}else c--;if(r!==null)this.$refs.input.$el.setSelectionRange(r+1,r+1);else{for(c=t;c<l;)if(d=n.charAt(c),this.isNumeralChar(d)){r=c+i;break}else c++;r!==null&&this.$refs.input.$el.setSelectionRange(r,r)}return r||0},onInputClick:function(){var t=this.$refs.input.$el.value;!this.readonly&&t!==Ue()&&this.initCursor()},isNumeralChar:function(t){return t.length===1&&(this._numeral.test(t)||this._decimal.test(t)||this._group.test(t)||this._minusSign.test(t))?(this.resetRegex(),!0):!1},resetRegex:function(){this._numeral.lastIndex=0,this._decimal.lastIndex=0,this._group.lastIndex=0,this._minusSign.lastIndex=0},updateValue:function(t,n,l,r){var i=this.$refs.input.$el.value,d=null;n!=null&&(d=this.parseValue(n),d=!d&&!this.allowEmpty?this.min||0:d,this.updateInput(d,l,r,n),this.handleOnInput(t,i,d))},handleOnInput:function(t,n,l){if(this.isValueChanged(n,l)){var r,i;this.$emit("input",{originalEvent:t,value:l,formattedValue:n}),(r=(i=this.formField).onInput)===null||r===void 0||r.call(i,{originalEvent:t,value:l})}},isValueChanged:function(t,n){if(n===null&&t!==null)return!0;if(n!=null){var l=typeof t=="string"?this.parseValue(t):t;return n!==l}return!1},validateValue:function(t){return t==="-"||t==null?null:this.min!=null&&t<this.min?this.min:this.max!=null&&t>this.max?this.max:t},updateInput:function(t,n,l,r){n=n||"";var i=this.$refs.input.$el.value,d=this.formatValue(t),c=i.length;if(d!==r&&(d=this.concatValues(d,r)),c===0){this.$refs.input.$el.value=d,this.$refs.input.$el.setSelectionRange(0,0);var s=this.initCursor(),a=s+n.length;this.$refs.input.$el.setSelectionRange(a,a)}else{var u=this.$refs.input.$el.selectionStart,m=this.$refs.input.$el.selectionEnd;this.$refs.input.$el.value=d;var k=d.length;if(l==="range-insert"){var w=this.parseValue((i||"").slice(0,u)),x=w!==null?w.toString():"",_=x.split("").join("(".concat(this.groupChar,")?")),S=new RegExp(_,"g");S.test(d);var H=n.split("").join("(".concat(this.groupChar,")?")),R=new RegExp(H,"g");R.test(d.slice(S.lastIndex)),m=S.lastIndex+R.lastIndex,this.$refs.input.$el.setSelectionRange(m,m)}else if(k===c)l==="insert"||l==="delete-back-single"?this.$refs.input.$el.setSelectionRange(m+1,m+1):l==="delete-single"?this.$refs.input.$el.setSelectionRange(m-1,m-1):(l==="delete-range"||l==="spin")&&this.$refs.input.$el.setSelectionRange(m,m);else if(l==="delete-back-single"){var B=i.charAt(m-1),h=i.charAt(m),g=c-k,P=this._group.test(h);P&&g===1?m+=1:!P&&this.isNumeralChar(B)&&(m+=-1*g+1),this._group.lastIndex=0,this.$refs.input.$el.setSelectionRange(m,m)}else if(i==="-"&&l==="insert"){this.$refs.input.$el.setSelectionRange(0,0);var T=this.initCursor(),F=T+n.length+1;this.$refs.input.$el.setSelectionRange(F,F)}else m=m+(k-c),this.$refs.input.$el.setSelectionRange(m,m)}this.$refs.input.$el.setAttribute("aria-valuenow",t)},concatValues:function(t,n){if(t&&n){var l=n.search(this._decimal);return this._decimal.lastIndex=0,this.suffixChar?l!==-1?t.replace(this.suffixChar,"").split(this._decimal)[0]+n.replace(this.suffixChar,"").slice(l)+this.suffixChar:t:l!==-1?t.split(this._decimal)[0]+n.slice(l):t}return t},getDecimalLength:function(t){if(t){var n=t.split(this._decimal);if(n.length===2)return n[1].replace(this._suffix,"").trim().replace(/\s/g,"").replace(this._currency,"").length}return 0},updateModel:function(t,n){this.writeValue(n,t)},onInputFocus:function(t){this.focused=!0,!this.disabled&&!this.readonly&&this.$refs.input.$el.value!==Ue()&&this.highlightOnFocus&&t.target.select(),this.$emit("focus",t)},onInputBlur:function(t){var n,l;this.focused=!1;var r=t.target,i=this.validateValue(this.parseValue(r.value));this.$emit("blur",{originalEvent:t,value:r.value}),(n=(l=this.formField).onBlur)===null||n===void 0||n.call(l,t),r.value=this.formatValue(i),r.setAttribute("aria-valuenow",i),this.updateModel(t,i),!this.disabled&&!this.readonly&&this.highlightOnFocus&&ot()},clearTimer:function(){this.timer&&clearTimeout(this.timer)},maxBoundry:function(){return this.d_value>=this.max},minBoundry:function(){return this.d_value<=this.min}},computed:{upButtonListeners:function(){var t=this;return{mousedown:function(l){return t.onUpButtonMouseDown(l)},mouseup:function(l){return t.onUpButtonMouseUp(l)},mouseleave:function(l){return t.onUpButtonMouseLeave(l)},keydown:function(l){return t.onUpButtonKeyDown(l)},keyup:function(l){return t.onUpButtonKeyUp(l)}}},downButtonListeners:function(){var t=this;return{mousedown:function(l){return t.onDownButtonMouseDown(l)},mouseup:function(l){return t.onDownButtonMouseUp(l)},mouseleave:function(l){return t.onDownButtonMouseLeave(l)},keydown:function(l){return t.onDownButtonKeyDown(l)},keyup:function(l){return t.onDownButtonKeyUp(l)}}},formattedValue:function(){var t=!this.d_value&&!this.allowEmpty?0:this.d_value;return this.formatValue(t)},getFormatter:function(){return this.numberFormat},dataP:function(){return ve(xe(xe({invalid:this.$invalid,fluid:this.$fluid,filled:this.$variant==="filled"},this.size,this.size),this.buttonLayout,this.showButtons&&this.buttonLayout))}},components:{InputText:D,AngleUpIcon:et,AngleDownIcon:Xe}},Yt=["data-p"],Zt=["data-p"],Xt=["disabled","data-p"],en=["disabled","data-p"],tn=["disabled","data-p"],nn=["disabled","data-p"];function ln(e,t,n,l,r,i){var d=He("InputText");return v(),C("span",f({class:e.cx("root")},e.ptmi("root"),{"data-p":i.dataP}),[p(d,{ref:"input",id:e.inputId,name:e.$formName,role:"spinbutton",class:Ge([e.cx("pcInputText"),e.inputClass]),style:at(e.inputStyle),value:i.formattedValue,"aria-valuemin":e.min,"aria-valuemax":e.max,"aria-valuenow":e.d_value,inputmode:e.mode==="decimal"&&!e.minFractionDigits?"numeric":"decimal",disabled:e.disabled,readonly:e.readonly,placeholder:e.placeholder,"aria-labelledby":e.ariaLabelledby,"aria-label":e.ariaLabel,required:e.required,size:e.size,invalid:e.invalid,variant:e.variant,onInput:i.onUserInput,onKeydown:i.onInputKeyDown,onKeypress:i.onInputKeyPress,onPaste:i.onPaste,onClick:i.onInputClick,onFocus:i.onInputFocus,onBlur:i.onInputBlur,pt:e.ptm("pcInputText"),unstyled:e.unstyled,"data-p":i.dataP},null,8,["id","name","class","style","value","aria-valuemin","aria-valuemax","aria-valuenow","inputmode","disabled","readonly","placeholder","aria-labelledby","aria-label","required","size","invalid","variant","onInput","onKeydown","onKeypress","onPaste","onClick","onFocus","onBlur","pt","unstyled","data-p"]),e.showButtons&&e.buttonLayout==="stacked"?(v(),C("span",f({key:0,class:e.cx("buttonGroup")},e.ptm("buttonGroup"),{"data-p":i.dataP}),[K(e.$slots,"incrementbutton",{listeners:i.upButtonListeners},function(){return[o("button",f({class:[e.cx("incrementButton"),e.incrementButtonClass]},pe(i.upButtonListeners,!0),{disabled:e.disabled,tabindex:-1,"aria-hidden":"true",type:"button"},e.ptm("incrementButton"),{"data-p":i.dataP}),[K(e.$slots,e.$slots.incrementicon?"incrementicon":"incrementbuttonicon",{},function(){return[(v(),E(J(e.incrementIcon||e.incrementButtonIcon?"span":"AngleUpIcon"),f({class:[e.incrementIcon,e.incrementButtonIcon]},e.ptm("incrementIcon"),{"data-pc-section":"incrementicon"}),null,16,["class"]))]})],16,Xt)]}),K(e.$slots,"decrementbutton",{listeners:i.downButtonListeners},function(){return[o("button",f({class:[e.cx("decrementButton"),e.decrementButtonClass]},pe(i.downButtonListeners,!0),{disabled:e.disabled,tabindex:-1,"aria-hidden":"true",type:"button"},e.ptm("decrementButton"),{"data-p":i.dataP}),[K(e.$slots,e.$slots.decrementicon?"decrementicon":"decrementbuttonicon",{},function(){return[(v(),E(J(e.decrementIcon||e.decrementButtonIcon?"span":"AngleDownIcon"),f({class:[e.decrementIcon,e.decrementButtonIcon]},e.ptm("decrementIcon"),{"data-pc-section":"decrementicon"}),null,16,["class"]))]})],16,en)]})],16,Zt)):M("",!0),K(e.$slots,"incrementbutton",{listeners:i.upButtonListeners},function(){return[e.showButtons&&e.buttonLayout!=="stacked"?(v(),C("button",f({key:0,class:[e.cx("incrementButton"),e.incrementButtonClass]},pe(i.upButtonListeners,!0),{disabled:e.disabled,tabindex:-1,"aria-hidden":"true",type:"button"},e.ptm("incrementButton"),{"data-p":i.dataP}),[K(e.$slots,e.$slots.incrementicon?"incrementicon":"incrementbuttonicon",{},function(){return[(v(),E(J(e.incrementIcon||e.incrementButtonIcon?"span":"AngleUpIcon"),f({class:[e.incrementIcon,e.incrementButtonIcon]},e.ptm("incrementIcon"),{"data-pc-section":"incrementicon"}),null,16,["class"]))]})],16,tn)):M("",!0)]}),K(e.$slots,"decrementbutton",{listeners:i.downButtonListeners},function(){return[e.showButtons&&e.buttonLayout!=="stacked"?(v(),C("button",f({key:0,class:[e.cx("decrementButton"),e.decrementButtonClass]},pe(i.downButtonListeners,!0),{disabled:e.disabled,tabindex:-1,"aria-hidden":"true",type:"button"},e.ptm("decrementButton"),{"data-p":i.dataP}),[K(e.$slots,e.$slots.decrementicon?"decrementicon":"decrementbuttonicon",{},function(){return[(v(),E(J(e.decrementIcon||e.decrementButtonIcon?"span":"AngleDownIcon"),f({class:[e.decrementIcon,e.decrementButtonIcon]},e.ptm("decrementIcon"),{"data-pc-section":"decrementicon"}),null,16,["class"]))]})],16,nn)):M("",!0)]})],16,Yt)}tt.render=ln;var on=({dt:e})=>`
.p-radiobutton {
    position: relative;
    display: inline-flex;
    user-select: none;
    vertical-align: bottom;
    width: ${e("radiobutton.width")};
    height: ${e("radiobutton.height")};
}

.p-radiobutton-input {
    cursor: pointer;
    appearance: none;
    position: absolute;
    top: 0;
    inset-inline-start: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    opacity: 0;
    z-index: 1;
    outline: 0 none;
    border: 1px solid transparent;
    border-radius: 50%;
}

.p-radiobutton-box {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    border: 1px solid ${e("radiobutton.border.color")};
    background: ${e("radiobutton.background")};
    width: ${e("radiobutton.width")};
    height: ${e("radiobutton.height")};
    transition: background ${e("radiobutton.transition.duration")}, color ${e("radiobutton.transition.duration")}, border-color ${e("radiobutton.transition.duration")}, box-shadow ${e("radiobutton.transition.duration")}, outline-color ${e("radiobutton.transition.duration")};
    outline-color: transparent;
    box-shadow: ${e("radiobutton.shadow")};
}

.p-radiobutton-icon {
    transition-duration: ${e("radiobutton.transition.duration")};
    background: transparent;
    font-size: ${e("radiobutton.icon.size")};
    width: ${e("radiobutton.icon.size")};
    height: ${e("radiobutton.icon.size")};
    border-radius: 50%;
    backface-visibility: hidden;
    transform: translateZ(0) scale(0.1);
}

.p-radiobutton:not(.p-disabled):has(.p-radiobutton-input:hover) .p-radiobutton-box {
    border-color: ${e("radiobutton.hover.border.color")};
}

.p-radiobutton-checked .p-radiobutton-box {
    border-color: ${e("radiobutton.checked.border.color")};
    background: ${e("radiobutton.checked.background")};
}

.p-radiobutton-checked .p-radiobutton-box .p-radiobutton-icon {
    background: ${e("radiobutton.icon.checked.color")};
    transform: translateZ(0) scale(1, 1);
    visibility: visible;
}

.p-radiobutton-checked:not(.p-disabled):has(.p-radiobutton-input:hover) .p-radiobutton-box {
    border-color: ${e("radiobutton.checked.hover.border.color")};
    background: ${e("radiobutton.checked.hover.background")};
}

.p-radiobutton:not(.p-disabled):has(.p-radiobutton-input:hover).p-radiobutton-checked .p-radiobutton-box .p-radiobutton-icon {
    background: ${e("radiobutton.icon.checked.hover.color")};
}

.p-radiobutton:not(.p-disabled):has(.p-radiobutton-input:focus-visible) .p-radiobutton-box {
    border-color: ${e("radiobutton.focus.border.color")};
    box-shadow: ${e("radiobutton.focus.ring.shadow")};
    outline: ${e("radiobutton.focus.ring.width")} ${e("radiobutton.focus.ring.style")} ${e("radiobutton.focus.ring.color")};
    outline-offset: ${e("radiobutton.focus.ring.offset")};
}

.p-radiobutton-checked:not(.p-disabled):has(.p-radiobutton-input:focus-visible) .p-radiobutton-box {
    border-color: ${e("radiobutton.checked.focus.border.color")};
}

.p-radiobutton.p-invalid > .p-radiobutton-box {
    border-color: ${e("radiobutton.invalid.border.color")};
}

.p-radiobutton.p-variant-filled .p-radiobutton-box {
    background: ${e("radiobutton.filled.background")};
}

.p-radiobutton.p-variant-filled.p-radiobutton-checked .p-radiobutton-box {
    background: ${e("radiobutton.checked.background")};
}

.p-radiobutton.p-variant-filled:not(.p-disabled):has(.p-radiobutton-input:hover).p-radiobutton-checked .p-radiobutton-box {
    background: ${e("radiobutton.checked.hover.background")};
}

.p-radiobutton.p-disabled {
    opacity: 1;
}

.p-radiobutton.p-disabled .p-radiobutton-box {
    background: ${e("radiobutton.disabled.background")};
    border-color: ${e("radiobutton.checked.disabled.border.color")};
}

.p-radiobutton-checked.p-disabled .p-radiobutton-box .p-radiobutton-icon {
    background: ${e("radiobutton.icon.disabled.color")};
}

.p-radiobutton-sm,
.p-radiobutton-sm .p-radiobutton-box {
    width: ${e("radiobutton.sm.width")};
    height: ${e("radiobutton.sm.height")};
}

.p-radiobutton-sm .p-radiobutton-icon {
    font-size: ${e("radiobutton.icon.sm.size")};
    width: ${e("radiobutton.icon.sm.size")};
    height: ${e("radiobutton.icon.sm.size")};
}

.p-radiobutton-lg,
.p-radiobutton-lg .p-radiobutton-box {
    width: ${e("radiobutton.lg.width")};
    height: ${e("radiobutton.lg.height")};
}

.p-radiobutton-lg .p-radiobutton-icon {
    font-size: ${e("radiobutton.icon.lg.size")};
    width: ${e("radiobutton.icon.lg.size")};
    height: ${e("radiobutton.icon.lg.size")};
}
`,an={root:function(t){var n=t.instance,l=t.props;return["p-radiobutton p-component",{"p-radiobutton-checked":n.checked,"p-disabled":l.disabled,"p-invalid":n.$pcRadioButtonGroup?n.$pcRadioButtonGroup.$invalid:n.$invalid,"p-variant-filled":n.$variant==="filled","p-radiobutton-sm p-inputfield-sm":l.size==="small","p-radiobutton-lg p-inputfield-lg":l.size==="large"}]},box:"p-radiobutton-box",input:"p-radiobutton-input",icon:"p-radiobutton-icon"},rn=ie.extend({name:"radiobutton",style:on,classes:an}),sn={name:"BaseRadioButton",extends:Ke,props:{value:null,binary:Boolean,readonly:{type:Boolean,default:!1},tabindex:{type:Number,default:null},inputId:{type:String,default:null},inputClass:{type:[String,Object],default:null},inputStyle:{type:Object,default:null},ariaLabelledby:{type:String,default:null},ariaLabel:{type:String,default:null}},style:rn,provide:function(){return{$pcRadioButton:this,$parentInstance:this}}};function ue(e){"@babel/helpers - typeof";return ue=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},ue(e)}function un(e,t,n){return(t=dn(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function dn(e){var t=cn(e,"string");return ue(t)=="symbol"?t:t+""}function cn(e,t){if(ue(e)!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var l=n.call(e,t);if(ue(l)!="object")return l;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var he={name:"RadioButton",extends:sn,inheritAttrs:!1,emits:["change","focus","blur"],inject:{$pcRadioButtonGroup:{default:void 0}},methods:{getPTOptions:function(t){var n=t==="root"?this.ptmi:this.ptm;return n(t,{context:{checked:this.checked,disabled:this.disabled}})},onChange:function(t){if(!this.disabled&&!this.readonly){var n=this.binary?!this.checked:this.value;this.$pcRadioButtonGroup?this.$pcRadioButtonGroup.writeValue(n,t):this.writeValue(n,t),this.$emit("change",t)}},onFocus:function(t){this.$emit("focus",t)},onBlur:function(t){var n,l;this.$emit("blur",t),(n=(l=this.formField).onBlur)===null||n===void 0||n.call(l,t)}},computed:{groupName:function(){return this.$pcRadioButtonGroup?this.$pcRadioButtonGroup.groupName:this.$formName},checked:function(){var t=this.$pcRadioButtonGroup?this.$pcRadioButtonGroup.d_value:this.d_value;return t!=null&&(this.binary?!!t:Qe(t,this.value))},dataP:function(){return ve(un({invalid:this.$invalid,checked:this.checked,disabled:this.disabled,filled:this.$variant==="filled"},this.size,this.size))}}},pn=["data-p-checked","data-p-disabled","data-p"],bn=["id","value","name","checked","tabindex","disabled","readonly","aria-labelledby","aria-label","aria-invalid"],mn=["data-p"],fn=["data-p"];function hn(e,t,n,l,r,i){return v(),C("div",f({class:e.cx("root")},i.getPTOptions("root"),{"data-p-checked":i.checked,"data-p-disabled":e.disabled,"data-p":i.dataP}),[o("input",f({id:e.inputId,type:"radio",class:[e.cx("input"),e.inputClass],style:e.inputStyle,value:e.value,name:i.groupName,checked:i.checked,tabindex:e.tabindex,disabled:e.disabled,readonly:e.readonly,"aria-labelledby":e.ariaLabelledby,"aria-label":e.ariaLabel,"aria-invalid":e.invalid||void 0,onFocus:t[0]||(t[0]=function(){return i.onFocus&&i.onFocus.apply(i,arguments)}),onBlur:t[1]||(t[1]=function(){return i.onBlur&&i.onBlur.apply(i,arguments)}),onChange:t[2]||(t[2]=function(){return i.onChange&&i.onChange.apply(i,arguments)})},i.getPTOptions("input")),null,16,bn),o("div",f({class:e.cx("box")},i.getPTOptions("box"),{"data-p":i.dataP}),[o("div",f({class:e.cx("icon")},i.getPTOptions("icon"),{"data-p":i.dataP}),null,16,fn)],16,mn)],16,pn)}he.render=hn;const vn={key:0,class:"smart_extract"},qn={class:"element"},gn={key:1,class:"container"},wn={class:"material-container"},kn={class:"element"},yn={class:"element"},$n={class:"element"},xn={class:"element"},Cn={class:"element"},Vn={class:"questions"},In={class:"question"},Sn=["onClick"],Bn={class:"element-container"},Dn={class:"element"},An={class:"element"},Tn={class:"choices"},_n=["for"],zn=["onClick"],Pn={class:"element-container"},En={class:"element"},Ln={class:"element"},Un={class:"btn-container"},Nn={class:"btn-container"},On="AIzaSyB6WTXMQsbP9QJCe1ymDInuXRQ0a_uk4uQ",Mn=`I will send you a quiz and i want you to generate json file like this format:
{
  "title": {
    "en": " Quiz - History of Military Aviation",
    "ar": "اختبار - تاريخ الطيران العسكري"
  },
  "description": {
    "en": "Test your knowledge of the history of military aviation and its advancements through the ages!",
    "ar": "اختبر معلوماتك عن تاريخ الطيران العسكري وتطوراته عبر العصور!"
  },
  "questions": [
    {
      "id": 1,
      "question": {
        "en": "What was the first aerial vehicle used for military reconnaissance?",
        "ar": "ما هي وسيلة الطيران الأولى التي استخدمت للاستطلاع العسكري؟"
      },
      "choices": [
        {
          "id": 1,
          "choice": {
            "en": "Jet planes",
            "ar": "الطائرات النفاثة"
          }
        },
        {
          "id": 2,
          "choice": {
            "en": "Airships",
            "ar": "المناطيد"
          }
        },
        {
          "id": 3,
          "choice": {
            "en": "Helicopters",
            "ar": "الطائرات المروحية"
          }
        },
        {
          "id": 4,
          "choice": {
            "en": "Supersonic planes",
            "ar": "الطائرات الأسرع من الصوت"
          }
        }
      ],
      "correct_answer_id": 2
    },
    {
      "id": 2,
      "question": {
        "en": "Drones are part of modern warfare because they don’t put pilots' lives at risk.",
        "ar": "الطائرات بدون طيار (Drones) تعتبر جزءً من الحروب الحديثة لأنها لا تعرض حياة الطيارين للخطر"
      },
      "choices": [
        {
          "id": 1,
          "choice": {
            "en": "True",
            "ar": "صح"
          }
        },
        {
          "id": 2,
          "choice": {
            "en": "False",
            "ar": "خطأ"
          }
        }
      ],
      "correct_answer_id": 0
    },
  ],
  "duration": 15,
  "last_question_number": 6
}
  the quiz is:
`,Rn=ee({__name:"AddQuiz",props:["addMaterial","materialId"],emits:["info"],setup(e,{emit:t}){const n=$({en:"",ar:""}),l=$({en:"",ar:""}),r=$();$();const i=$([]);function d(){i.value.push({id:0,question:{en:"",ar:""},choices:[{id:0,choice:{en:"",ar:""}}],correct_answer_id:0})}function c(B){i.value[B].choices.push({id:0,choice:{en:"",ar:""}})}function s(B){i.value.splice(B,1)}function a(B,h){i.value[B].choices.splice(h,1)}const u=e,m=t;u.materialId&&new N("get_quiz").callApi({quiz_id:u.materialId}).then(B=>{var h,g,P,T,F,Q,ne,oe;B!=null&&B.success&&(n.value=(g=(h=B==null?void 0:B.data)==null?void 0:h.quiz)==null?void 0:g.title,l.value=(T=(P=B==null?void 0:B.data)==null?void 0:P.quiz)==null?void 0:T.description,r.value=(Q=(F=B==null?void 0:B.data)==null?void 0:F.quiz)==null?void 0:Q.duration,i.value=(oe=(ne=B==null?void 0:B.data)==null?void 0:ne.quiz)==null?void 0:oe.questions)}),ce(u,()=>{if(u.addMaterial){for(let h=0;h<i.value.length;h++){i.value[h].id=h+1;for(let g=0;g<i.value[h].choices.length;g++)i.value[h].choices[g].id=g+1}let B={title:n.value,description:l.value,questions:i.value,duration:r.value,last_question_number:i.value.length};if(u.materialId){let h={quiz_id:u.materialId,update:B};new N("update_quiz").callApi(h).then(g=>{g!=null&&g.success&&m("info",null)})}else{let h={new_quiz:B};new N("create_quiz").callApi(h).then(g=>{var P,T;if((P=g==null?void 0:g.data)!=null&&P.quiz_id){let F={Id:(T=g==null?void 0:g.data)==null?void 0:T.quiz_id,title:{en:n.value.en,ar:n.value.ar}};m("info",F)}})}}});const x=new It(On).getGenerativeModel({model:"gemini-1.5-flash",generationConfig:{temperature:1}}).startChat({history:[]}),_=$("");async function S(){H.value="edit";const B=await x.sendMessage(Mn+R.value);_.value=B.response.text();const g=_.value.match(/```json([\s\S]*?)```/);if(g){const P=g[1].trim(),T=JSON.parse(P);n.value=T==null?void 0:T.title,l.value=T==null?void 0:T.description,r.value=T==null?void 0:T.duration,i.value=T==null?void 0:T.questions}else console.log("No JSON found.")}const H=$("smart"),R=$("");return(B,h)=>(v(),C(W,null,[H.value=="smart"?(v(),C("div",vn,[o("div",qn,[h[6]||(h[6]=o("h4",null,"Smart Extraction",-1)),p(b(rt),{modelValue:R.value,"onUpdate:modelValue":h[0]||(h[0]=g=>R.value=g)},null,8,["modelValue"])]),p(b(O),{onClick:S,label:"Proceed"})])):M("",!0),H.value=="edit"?(v(),C("div",gn,[o("div",wn,[o("div",kn,[h[7]||(h[7]=o("h4",null,"English Title",-1)),p(b(D),{modelValue:n.value.en,"onUpdate:modelValue":h[1]||(h[1]=g=>n.value.en=g)},null,8,["modelValue"])]),o("div",yn,[h[8]||(h[8]=o("h4",null,"Arabic Title",-1)),p(b(D),{modelValue:n.value.ar,"onUpdate:modelValue":h[2]||(h[2]=g=>n.value.ar=g)},null,8,["modelValue"])]),o("div",$n,[h[9]||(h[9]=o("h4",null,"English Description",-1)),p(b(D),{modelValue:l.value.en,"onUpdate:modelValue":h[3]||(h[3]=g=>l.value.en=g)},null,8,["modelValue"])]),o("div",xn,[h[10]||(h[10]=o("h4",null,"Arabic Description",-1)),p(b(D),{modelValue:l.value.ar,"onUpdate:modelValue":h[4]||(h[4]=g=>l.value.ar=g)},null,8,["modelValue"])]),o("div",Cn,[h[11]||(h[11]=o("h4",null,"Duration",-1)),p(b(tt),{modelValue:r.value,"onUpdate:modelValue":h[5]||(h[5]=g=>r.value=g)},null,8,["modelValue"])]),o("div",Vn,[h[16]||(h[16]=o("h4",null,"Questions",-1)),(v(!0),C(W,null,X(i.value,(g,P)=>(v(),C("div",In,[o("p",null,[o("span",null," Question "+re(P+1),1),o("i",{class:"pi pi-times-circle",onClick:()=>{s(P)}},null,8,Sn)]),o("div",Bn,[o("div",Dn,[h[12]||(h[12]=o("span",null,"En",-1)),p(b(D),{modelValue:g.question.en,"onUpdate:modelValue":T=>g.question.en=T},null,8,["modelValue","onUpdate:modelValue"])]),o("div",An,[h[13]||(h[13]=o("span",null,"Ar",-1)),p(b(D),{modelValue:g.question.ar,"onUpdate:modelValue":T=>g.question.ar=T},null,8,["modelValue","onUpdate:modelValue"])])]),(v(!0),C(W,null,X(g.choices,(T,F)=>(v(),C("div",Tn,[p(b(he),{modelValue:g.correct_answer_id,"onUpdate:modelValue":Q=>g.correct_answer_id=Q,inputId:P.toString()+F.toString(),name:P.toString(),value:F+1},null,8,["modelValue","onUpdate:modelValue","inputId","name","value"]),o("label",{class:"choice",for:P.toString()+F.toString()},[o("p",null,[o("span",null," Choice "+re(F+1),1),o("i",{class:"pi pi-times-circle",onClick:()=>{a(P,F)}},null,8,zn)]),o("div",Pn,[o("div",En,[h[14]||(h[14]=o("span",null,"En",-1)),p(b(D),{modelValue:T.choice.en,"onUpdate:modelValue":Q=>T.choice.en=Q},null,8,["modelValue","onUpdate:modelValue"])]),o("div",Ln,[h[15]||(h[15]=o("span",null,"Ar",-1)),p(b(D),{modelValue:T.choice.ar,"onUpdate:modelValue":Q=>T.choice.ar=Q},null,8,["modelValue","onUpdate:modelValue"])])])],8,_n)]))),256)),o("div",Un,[p(b(O),{label:"Add Choice",style:{"font-size":"0.6rem"},onClick:()=>{c(P)}},null,8,["onClick"])])]))),256)),o("div",Nn,[p(b(O),{style:{width:"fit-content","font-size":"0.7rem"},label:"Add Question",onClick:d})])])])])):M("",!0)],64))}}),Fn=te(Rn,[["__scopeId","data-v-6dcf6282"]]),jn={class:"container"},Kn={class:"material-container"},Hn={class:"element"},Gn={class:"element"},Qn={class:"element"},Wn={class:"element"},Jn={class:"element"},Yn=ee({__name:"AddLesson",props:["addMaterial","materialId"],emits:["info"],setup(e,{emit:t}){const n=$({en:"",ar:""}),l=$({en:"",ar:""}),r=$(),i=e,d=t;return i.materialId&&new N("get_lesson").callApi({lesson_id:i.materialId}).then(c=>{var s,a,u,m,k,w;c!=null&&c.success&&(n.value=(a=(s=c==null?void 0:c.data)==null?void 0:s.lesson)==null?void 0:a.title,l.value=(m=(u=c==null?void 0:c.data)==null?void 0:u.lesson)==null?void 0:m.description,r.value=(w=(k=c==null?void 0:c.data)==null?void 0:k.lesson)==null?void 0:w.source)}),ce(i,()=>{if(i.addMaterial){let c={title:n.value,description:l.value,source:r.value};if(i.materialId){let s={lesson_id:i.materialId,update:c};new N("update_lesson").callApi(s).then(a=>{a!=null&&a.success&&d("info",null)})}else{let s={new_lesson:c};new N("create_lesson").callApi(s).then(a=>{var u,m;if((u=a==null?void 0:a.data)!=null&&u.lesson_id){let k={Id:(m=a==null?void 0:a.data)==null?void 0:m.lesson_id,title:{en:n.value.en,ar:n.value.ar}};d("info",k)}})}}}),(c,s)=>(v(),C("div",jn,[o("div",Kn,[o("div",Hn,[s[5]||(s[5]=o("h4",null,"English Title",-1)),p(b(D),{modelValue:n.value.en,"onUpdate:modelValue":s[0]||(s[0]=a=>n.value.en=a)},null,8,["modelValue"])]),o("div",Gn,[s[6]||(s[6]=o("h4",null,"Arabic Title",-1)),p(b(D),{modelValue:n.value.ar,"onUpdate:modelValue":s[1]||(s[1]=a=>n.value.ar=a)},null,8,["modelValue"])]),o("div",Qn,[s[7]||(s[7]=o("h4",null,"English Description",-1)),p(b(D),{modelValue:l.value.en,"onUpdate:modelValue":s[2]||(s[2]=a=>l.value.en=a)},null,8,["modelValue"])]),o("div",Wn,[s[8]||(s[8]=o("h4",null,"Arabic Description",-1)),p(b(D),{modelValue:l.value.ar,"onUpdate:modelValue":s[3]||(s[3]=a=>l.value.ar=a)},null,8,["modelValue"])]),o("div",Jn,[s[9]||(s[9]=o("h4",null,"Source",-1)),p(b(D),{modelValue:r.value,"onUpdate:modelValue":s[4]||(s[4]=a=>r.value=a)},null,8,["modelValue"])])])]))}}),Zn=te(Yn,[["__scopeId","data-v-a1297840"]]);var Xn=({dt:e})=>`
/*!
* Quill Editor v1.3.3
* https://quilljs.com/
* Copyright (c) 2014, Jason Chen
* Copyright (c) 2013, salesforce.com
*/
.ql-container {
    box-sizing: border-box;
    font-family: Helvetica, Arial, sans-serif;
    font-size: 13px;
    height: 100%;
    margin: 0;
    position: relative;
}
.ql-container.ql-disabled .ql-tooltip {
    visibility: hidden;
}
.ql-container.ql-disabled .ql-editor ul[data-checked] > li::before {
    pointer-events: none;
}
.ql-clipboard {
    inset-inline-start: -100000px;
    height: 1px;
    overflow-y: hidden;
    position: absolute;
    top: 50%;
}
.ql-clipboard p {
    margin: 0;
    padding: 0;
}
.ql-editor {
    box-sizing: border-box;
    line-height: 1.42;
    height: 100%;
    outline: none;
    overflow-y: auto;
    padding: 12px 15px;
    tab-size: 4;
    -moz-tab-size: 4;
    text-align: left;
    white-space: pre-wrap;
    word-wrap: break-word;
}
.ql-editor > * {
    cursor: text;
}
.ql-editor p,
.ql-editor ol,
.ql-editor ul,
.ql-editor pre,
.ql-editor blockquote,
.ql-editor h1,
.ql-editor h2,
.ql-editor h3,
.ql-editor h4,
.ql-editor h5,
.ql-editor h6 {
    margin: 0;
    padding: 0;
    counter-reset: list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;
}
.ql-editor ol,
.ql-editor ul {
    padding-inline-start: 1.5rem;
}
.ql-editor ol > li,
.ql-editor ul > li {
    list-style-type: none;
}
.ql-editor ul > li::before {
    content: '\\2022';
}
.ql-editor ul[data-checked='true'],
.ql-editor ul[data-checked='false'] {
    pointer-events: none;
}
.ql-editor ul[data-checked='true'] > li *,
.ql-editor ul[data-checked='false'] > li * {
    pointer-events: all;
}
.ql-editor ul[data-checked='true'] > li::before,
.ql-editor ul[data-checked='false'] > li::before {
    color: #777;
    cursor: pointer;
    pointer-events: all;
}
.ql-editor ul[data-checked='true'] > li::before {
    content: '\\2611';
}
.ql-editor ul[data-checked='false'] > li::before {
    content: '\\2610';
}
.ql-editor li::before {
    display: inline-block;
    white-space: nowrap;
    width: 1.2rem;
}
.ql-editor li:not(.ql-direction-rtl)::before {
    margin-inline-start: -1.5rem;
    margin-inline-end: 0.3rem;
    text-align: right;
}
.ql-editor li.ql-direction-rtl::before {
    margin-inline-start: 0.3rem;
    margin-inline-end: -1.5rem;
}
.ql-editor ol li:not(.ql-direction-rtl),
.ql-editor ul li:not(.ql-direction-rtl) {
    padding-inline-start: 1.5rem;
}
.ql-editor ol li.ql-direction-rtl,
.ql-editor ul li.ql-direction-rtl {
    padding-inline-end: 1.5rem;
}
.ql-editor ol li {
    counter-reset: list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;
    counter-increment: list-0;
}
.ql-editor ol li:before {
    content: counter(list-0, decimal) '. ';
}
.ql-editor ol li.ql-indent-1 {
    counter-increment: list-1;
}
.ql-editor ol li.ql-indent-1:before {
    content: counter(list-1, lower-alpha) '. ';
}
.ql-editor ol li.ql-indent-1 {
    counter-reset: list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;
}
.ql-editor ol li.ql-indent-2 {
    counter-increment: list-2;
}
.ql-editor ol li.ql-indent-2:before {
    content: counter(list-2, lower-roman) '. ';
}
.ql-editor ol li.ql-indent-2 {
    counter-reset: list-3 list-4 list-5 list-6 list-7 list-8 list-9;
}
.ql-editor ol li.ql-indent-3 {
    counter-increment: list-3;
}
.ql-editor ol li.ql-indent-3:before {
    content: counter(list-3, decimal) '. ';
}
.ql-editor ol li.ql-indent-3 {
    counter-reset: list-4 list-5 list-6 list-7 list-8 list-9;
}
.ql-editor ol li.ql-indent-4 {
    counter-increment: list-4;
}
.ql-editor ol li.ql-indent-4:before {
    content: counter(list-4, lower-alpha) '. ';
}
.ql-editor ol li.ql-indent-4 {
    counter-reset: list-5 list-6 list-7 list-8 list-9;
}
.ql-editor ol li.ql-indent-5 {
    counter-increment: list-5;
}
.ql-editor ol li.ql-indent-5:before {
    content: counter(list-5, lower-roman) '. ';
}
.ql-editor ol li.ql-indent-5 {
    counter-reset: list-6 list-7 list-8 list-9;
}
.ql-editor ol li.ql-indent-6 {
    counter-increment: list-6;
}
.ql-editor ol li.ql-indent-6:before {
    content: counter(list-6, decimal) '. ';
}
.ql-editor ol li.ql-indent-6 {
    counter-reset: list-7 list-8 list-9;
}
.ql-editor ol li.ql-indent-7 {
    counter-increment: list-7;
}
.ql-editor ol li.ql-indent-7:before {
    content: counter(list-7, lower-alpha) '. ';
}
.ql-editor ol li.ql-indent-7 {
    counter-reset: list-8 list-9;
}
.ql-editor ol li.ql-indent-8 {
    counter-increment: list-8;
}
.ql-editor ol li.ql-indent-8:before {
    content: counter(list-8, lower-roman) '. ';
}
.ql-editor ol li.ql-indent-8 {
    counter-reset: list-9;
}
.ql-editor ol li.ql-indent-9 {
    counter-increment: list-9;
}
.ql-editor ol li.ql-indent-9:before {
    content: counter(list-9, decimal) '. ';
}
.ql-editor .ql-video {
    display: block;
    max-width: 100%;
}
.ql-editor .ql-video.ql-align-center {
    margin: 0 auto;
}
.ql-editor .ql-video.ql-align-right {
    margin: 0 0 0 auto;
}
.ql-editor .ql-bg-black {
    background: #000;
}
.ql-editor .ql-bg-red {
    background: #e60000;
}
.ql-editor .ql-bg-orange {
    background: #f90;
}
.ql-editor .ql-bg-yellow {
    background: #ff0;
}
.ql-editor .ql-bg-green {
    background: #008a00;
}
.ql-editor .ql-bg-blue {
    background: #06c;
}
.ql-editor .ql-bg-purple {
    background: #93f;
}
.ql-editor .ql-color-white {
    color: #fff;
}
.ql-editor .ql-color-red {
    color: #e60000;
}
.ql-editor .ql-color-orange {
    color: #f90;
}
.ql-editor .ql-color-yellow {
    color: #ff0;
}
.ql-editor .ql-color-green {
    color: #008a00;
}
.ql-editor .ql-color-blue {
    color: #06c;
}
.ql-editor .ql-color-purple {
    color: #93f;
}
.ql-editor .ql-font-serif {
    font-family: Georgia, Times New Roman, serif;
}
.ql-editor .ql-font-monospace {
    font-family: Monaco, Courier New, monospace;
}
.ql-editor .ql-size-small {
    font-size: 0.75rem;
}
.ql-editor .ql-size-large {
    font-size: 1.5rem;
}
.ql-editor .ql-size-huge {
    font-size: 2.5rem;
}
.ql-editor .ql-direction-rtl {
    direction: rtl;
    text-align: inherit;
}
.ql-editor .ql-align-center {
    text-align: center;
}
.ql-editor .ql-align-justify {
    text-align: justify;
}
.ql-editor .ql-align-right {
    text-align: right;
}
.ql-editor.ql-blank::before {
    color: rgba(0, 0, 0, 0.6);
    content: attr(data-placeholder);
    font-style: italic;
    inset-inline-start: 15px;
    pointer-events: none;
    position: absolute;
    inset-inline-end: 15px;
}
.ql-snow.ql-toolbar:after,
.ql-snow .ql-toolbar:after {
    clear: both;
    content: '';
    display: table;
}
.ql-snow.ql-toolbar button,
.ql-snow .ql-toolbar button {
    background: none;
    border: none;
    cursor: pointer;
    display: inline-block;
    float: left;
    height: 24px;
    padding-block: 3px;
    padding-inline: 5px;
    width: 28px;
}
.ql-snow.ql-toolbar button svg,
.ql-snow .ql-toolbar button svg {
    float: left;
    height: 100%;
}
.ql-snow.ql-toolbar button:active:hover,
.ql-snow .ql-toolbar button:active:hover {
    outline: none;
}
.ql-snow.ql-toolbar input.ql-image[type='file'],
.ql-snow .ql-toolbar input.ql-image[type='file'] {
    display: none;
}
.ql-snow.ql-toolbar button:hover,
.ql-snow .ql-toolbar button:hover,
.ql-snow.ql-toolbar button:focus,
.ql-snow .ql-toolbar button:focus,
.ql-snow.ql-toolbar button.ql-active,
.ql-snow .ql-toolbar button.ql-active,
.ql-snow.ql-toolbar .ql-picker-label:hover,
.ql-snow .ql-toolbar .ql-picker-label:hover,
.ql-snow.ql-toolbar .ql-picker-label.ql-active,
.ql-snow .ql-toolbar .ql-picker-label.ql-active,
.ql-snow.ql-toolbar .ql-picker-item:hover,
.ql-snow .ql-toolbar .ql-picker-item:hover,
.ql-snow.ql-toolbar .ql-picker-item.ql-selected,
.ql-snow .ql-toolbar .ql-picker-item.ql-selected {
    color: #06c;
}
.ql-snow.ql-toolbar button:hover .ql-fill,
.ql-snow .ql-toolbar button:hover .ql-fill,
.ql-snow.ql-toolbar button:focus .ql-fill,
.ql-snow .ql-toolbar button:focus .ql-fill,
.ql-snow.ql-toolbar button.ql-active .ql-fill,
.ql-snow .ql-toolbar button.ql-active .ql-fill,
.ql-snow.ql-toolbar .ql-picker-label:hover .ql-fill,
.ql-snow .ql-toolbar .ql-picker-label:hover .ql-fill,
.ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-fill,
.ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-fill,
.ql-snow.ql-toolbar .ql-picker-item:hover .ql-fill,
.ql-snow .ql-toolbar .ql-picker-item:hover .ql-fill,
.ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-fill,
.ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-fill,
.ql-snow.ql-toolbar button:hover .ql-stroke.ql-fill,
.ql-snow .ql-toolbar button:hover .ql-stroke.ql-fill,
.ql-snow.ql-toolbar button:focus .ql-stroke.ql-fill,
.ql-snow .ql-toolbar button:focus .ql-stroke.ql-fill,
.ql-snow.ql-toolbar button.ql-active .ql-stroke.ql-fill,
.ql-snow .ql-toolbar button.ql-active .ql-stroke.ql-fill,
.ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill,
.ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill,
.ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill,
.ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill,
.ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill,
.ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill,
.ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill,
.ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill {
    fill: #06c;
}
.ql-snow.ql-toolbar button:hover .ql-stroke,
.ql-snow .ql-toolbar button:hover .ql-stroke,
.ql-snow.ql-toolbar button:focus .ql-stroke,
.ql-snow .ql-toolbar button:focus .ql-stroke,
.ql-snow.ql-toolbar button.ql-active .ql-stroke,
.ql-snow .ql-toolbar button.ql-active .ql-stroke,
.ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke,
.ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke,
.ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke,
.ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke,
.ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke,
.ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke,
.ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke,
.ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke,
.ql-snow.ql-toolbar button:hover .ql-stroke-miter,
.ql-snow .ql-toolbar button:hover .ql-stroke-miter,
.ql-snow.ql-toolbar button:focus .ql-stroke-miter,
.ql-snow .ql-toolbar button:focus .ql-stroke-miter,
.ql-snow.ql-toolbar button.ql-active .ql-stroke-miter,
.ql-snow.ql-toolbar button.ql-active .ql-stroke-miter,
.ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke-miter,
.ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke-miter,
.ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,
.ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,
.ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke-miter,
.ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke-miter,
.ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter,
.ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter {
    stroke: #06c;
}
@media (pointer: coarse) {
    .ql-snow.ql-toolbar button:hover:not(.ql-active),
    .ql-snow .ql-toolbar button:hover:not(.ql-active) {
        color: #444;
    }
    .ql-snow.ql-toolbar button:hover:not(.ql-active) .ql-fill,
    .ql-snow .ql-toolbar button:hover:not(.ql-active) .ql-fill,
    .ql-snow.ql-toolbar button:hover:not(.ql-active) .ql-stroke.ql-fill,
    .ql-snow .ql-toolbar button:hover:not(.ql-active) .ql-stroke.ql-fill {
        fill: #444;
    }
    .ql-snow.ql-toolbar button:hover:not(.ql-active) .ql-stroke,
    .ql-snow .ql-toolbar button:hover:not(.ql-active) .ql-stroke,
    .ql-snow.ql-toolbar button:hover:not(.ql-active) .ql-stroke-miter,
    .ql-snow .ql-toolbar button:hover:not(.ql-active) .ql-stroke-miter {
        stroke: #444;
    }
}
.ql-snow {
    box-sizing: border-box;
}
.ql-snow * {
    box-sizing: border-box;
}
.ql-snow .ql-hidden {
    display: none;
}
.ql-snow .ql-out-bottom,
.ql-snow .ql-out-top {
    visibility: hidden;
}
.ql-snow .ql-tooltip {
    position: absolute;
    transform: translateY(10px);
}
.ql-snow .ql-tooltip a {
    cursor: pointer;
    text-decoration: none;
}
.ql-snow .ql-tooltip.ql-flip {
    transform: translateY(-10px);
}
.ql-snow .ql-formats {
    display: inline-block;
    vertical-align: middle;
}
.ql-snow .ql-formats:after {
    clear: both;
    content: '';
    display: table;
}
.ql-snow .ql-stroke {
    fill: none;
    stroke: #444;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 2;
}
.ql-snow .ql-stroke-miter {
    fill: none;
    stroke: #444;
    stroke-miterlimit: 10;
    stroke-width: 2;
}
.ql-snow .ql-fill,
.ql-snow .ql-stroke.ql-fill {
    fill: #444;
}
.ql-snow .ql-empty {
    fill: none;
}
.ql-snow .ql-even {
    fill-rule: evenodd;
}
.ql-snow .ql-thin,
.ql-snow .ql-stroke.ql-thin {
    stroke-width: 1;
}
.ql-snow .ql-transparent {
    opacity: 0.4;
}
.ql-snow .ql-direction svg:last-child {
    display: none;
}
.ql-snow .ql-direction.ql-active svg:last-child {
    display: inline;
}
.ql-snow .ql-direction.ql-active svg:first-child {
    display: none;
}
.ql-snow .ql-editor h1 {
    font-size: 2rem;
}
.ql-snow .ql-editor h2 {
    font-size: 1.5rem;
}
.ql-snow .ql-editor h3 {
    font-size: 1.17rem;
}
.ql-snow .ql-editor h4 {
    font-size: 1rem;
}
.ql-snow .ql-editor h5 {
    font-size: 0.83rem;
}
.ql-snow .ql-editor h6 {
    font-size: 0.67rem;
}
.ql-snow .ql-editor a {
    text-decoration: underline;
}
.ql-snow .ql-editor blockquote {
    border-inline-start: 4px solid #ccc;
    margin-block-end: 5px;
    margin-block-start: 5px;
    padding-inline-start: 16px;
}
.ql-snow .ql-editor code,
.ql-snow .ql-editor pre {
    background: #f0f0f0;
    border-radius: 3px;
}
.ql-snow .ql-editor pre {
    white-space: pre-wrap;
    margin-block-end: 5px;
    margin-block-start: 5px;
    padding: 5px 10px;
}
.ql-snow .ql-editor code {
    font-size: 85%;
    padding: 2px 4px;
}
.ql-snow .ql-editor pre.ql-syntax {
    background: #23241f;
    color: #f8f8f2;
    overflow: visible;
}
.ql-snow .ql-editor img {
    max-width: 100%;
}
.ql-snow .ql-picker {
    color: #444;
    display: inline-block;
    float: left;
    inset-inline-start: 0;
    font-size: 14px;
    font-weight: 500;
    height: 24px;
    position: relative;
    vertical-align: middle;
}
.ql-snow .ql-picker-label {
    cursor: pointer;
    display: inline-block;
    height: 100%;
    padding-inline-start: 8px;
    padding-inline-end: 2px;
    position: relative;
    width: 100%;
}
.ql-snow .ql-picker-label::before {
    display: inline-block;
    line-height: 22px;
}
.ql-snow .ql-picker-options {
    background: #fff;
    display: none;
    min-width: 100%;
    padding: 4px 8px;
    position: absolute;
    white-space: nowrap;
}
.ql-snow .ql-picker-options .ql-picker-item {
    cursor: pointer;
    display: block;
    padding-block-end: 5px;
    padding-block-start: 5px;
}
.ql-snow .ql-picker.ql-expanded .ql-picker-label {
    color: #ccc;
    z-index: 2;
}
.ql-snow .ql-picker.ql-expanded .ql-picker-label .ql-fill {
    fill: #ccc;
}
.ql-snow .ql-picker.ql-expanded .ql-picker-label .ql-stroke {
    stroke: #ccc;
}
.ql-snow .ql-picker.ql-expanded .ql-picker-options {
    display: block;
    margin-block-start: -1px;
    top: 100%;
    z-index: 1;
}
.ql-snow .ql-color-picker,
.ql-snow .ql-icon-picker {
    width: 28px;
}
.ql-snow .ql-color-picker .ql-picker-label,
.ql-snow .ql-icon-picker .ql-picker-label {
    padding: 2px 4px;
}
.ql-snow .ql-color-picker .ql-picker-label svg,
.ql-snow .ql-icon-picker .ql-picker-label svg {
    inset-inline-end: 4px;
}
.ql-snow .ql-icon-picker .ql-picker-options {
    padding: 4px 0;
}
.ql-snow .ql-icon-picker .ql-picker-item {
    height: 24px;
    width: 24px;
    padding: 2px 4px;
}
.ql-snow .ql-color-picker .ql-picker-options {
    padding: 3px 5px;
    width: 152px;
}
.ql-snow .ql-color-picker .ql-picker-item {
    border: 1px solid transparent;
    float: left;
    height: 16px;
    margin: 2px;
    padding: 0;
    width: 16px;
}
.ql-snow .ql-picker:not(.ql-color-picker):not(.ql-icon-picker) svg {
    position: absolute;
    margin-block-start: -9px;
    inset-inline-end: 0;
    top: 50%;
    width: 18px;
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-label]:not([data-label=''])::before,
.ql-snow .ql-picker.ql-font .ql-picker-label[data-label]:not([data-label=''])::before,
.ql-snow .ql-picker.ql-size .ql-picker-label[data-label]:not([data-label=''])::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-label]:not([data-label=''])::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-label]:not([data-label=''])::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-label]:not([data-label=''])::before {
    content: attr(data-label);
}
.ql-snow .ql-picker.ql-header {
    width: 98px;
}
.ql-snow .ql-picker.ql-header .ql-picker-label::before,
.ql-snow .ql-picker.ql-header .ql-picker-item::before {
    content: 'Normal';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='1']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='1']::before {
    content: 'Heading 1';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='2']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='2']::before {
    content: 'Heading 2';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='3']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='3']::before {
    content: 'Heading 3';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='4']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='4']::before {
    content: 'Heading 4';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='5']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='5']::before {
    content: 'Heading 5';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='6']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='6']::before {
    content: 'Heading 6';
}
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='1']::before {
    font-size: 2rem;
}
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='2']::before {
    font-size: 1.5rem;
}
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='3']::before {
    font-size: 1.17rem;
}
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='4']::before {
    font-size: 1rem;
}
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='5']::before {
    font-size: 0.83rem;
}
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='6']::before {
    font-size: 0.67rem;
}
.ql-snow .ql-picker.ql-font {
    width: 108px;
}
.ql-snow .ql-picker.ql-font .ql-picker-label::before,
.ql-snow .ql-picker.ql-font .ql-picker-item::before {
    content: 'Sans Serif';
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value='serif']::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value='serif']::before {
    content: 'Serif';
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value='monospace']::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value='monospace']::before {
    content: 'Monospace';
}
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value='serif']::before {
    font-family: Georgia, Times New Roman, serif;
}
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value='monospace']::before {
    font-family: Monaco, Courier New, monospace;
}
.ql-snow .ql-picker.ql-size {
    width: 98px;
}
.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
    content: 'Normal';
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='small']::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='small']::before {
    content: 'Small';
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='large']::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='large']::before {
    content: 'Large';
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='huge']::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='huge']::before {
    content: 'Huge';
}
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='small']::before {
    font-size: 10px;
}
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='large']::before {
    font-size: 18px;
}
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='huge']::before {
    font-size: 32px;
}
.ql-snow .ql-color-picker.ql-background .ql-picker-item {
    background: #fff;
}
.ql-snow .ql-color-picker.ql-color .ql-picker-item {
    background: #000;
}
.ql-toolbar.ql-snow {
    border: 1px solid #ccc;
    box-sizing: border-box;
    font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
    padding: 8px;
}
.ql-toolbar.ql-snow .ql-formats {
    margin-inline-end: 15px;
}
.ql-toolbar.ql-snow .ql-picker-label {
    border: 1px solid transparent;
}
.ql-toolbar.ql-snow .ql-picker-options {
    border: 1px solid transparent;
    box-shadow: rgba(0, 0, 0, 0.2) 0 2px 8px;
}
.ql-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-label {
    border-color: #ccc;
}
.ql-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-options {
    border-color: #ccc;
}
.ql-toolbar.ql-snow .ql-color-picker .ql-picker-item.ql-selected,
.ql-toolbar.ql-snow .ql-color-picker .ql-picker-item:hover {
    border-color: #000;
}
.ql-toolbar.ql-snow + .ql-container.ql-snow {
    border-block-start: 0;
}
.ql-snow .ql-tooltip {
    background: #fff;
    border: 1px solid #ccc;
    box-shadow: 0 0 5px #ddd;
    color: #444;
    padding: 5px 12px;
    white-space: nowrap;
}
.ql-snow .ql-tooltip::before {
    content: 'Visit URL:';
    line-height: 26px;
    margin-inline-end: 8px;
}
.ql-snow .ql-tooltip input[type='text'] {
    display: none;
    border: 1px solid #ccc;
    font-size: 13px;
    height: 26px;
    margin: 0;
    padding: 3px 5px;
    width: 170px;
}
.ql-snow .ql-tooltip a.ql-preview {
    display: inline-block;
    max-width: 200px;
    overflow-x: hidden;
    text-overflow: ellipsis;
    vertical-align: top;
}
.ql-snow .ql-tooltip a.ql-action::after {
    border-inline-end: 1px solid #ccc;
    content: 'Edit';
    margin-inline-start: 16px;
    padding-inline-end: 8px;
}
.ql-snow .ql-tooltip a.ql-remove::before {
    content: 'Remove';
    margin-inline-start: 8px;
}
.ql-snow .ql-tooltip a {
    line-height: 26px;
}
.ql-snow .ql-tooltip.ql-editing a.ql-preview,
.ql-snow .ql-tooltip.ql-editing a.ql-remove {
    display: none;
}
.ql-snow .ql-tooltip.ql-editing input[type='text'] {
    display: inline-block;
}
.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
    border-inline-end: 0;
    content: 'Save';
    padding-inline-end: 0;
}
.ql-snow .ql-tooltip[data-mode='link']::before {
    content: 'Enter link:';
}
.ql-snow .ql-tooltip[data-mode='formula']::before {
    content: 'Enter formula:';
}
.ql-snow .ql-tooltip[data-mode='video']::before {
    content: 'Enter video:';
}
.ql-snow a {
    color: #06c;
}
.ql-container.ql-snow {
    border: 1px solid #ccc;
}

.p-editor .p-editor-toolbar {
    background: ${e("editor.toolbar.background")};
    border-start-end-radius: ${e("editor.toolbar.border.radius")};
    border-start-start-radius: ${e("editor.toolbar.border.radius")};
}

.p-editor .p-editor-toolbar.ql-snow {
    border: 1px solid ${e("editor.toolbar.border.color")};
}

.p-editor .p-editor-toolbar.ql-snow .ql-stroke {
    stroke: ${e("editor.toolbar.item.color")};
}

.p-editor .p-editor-toolbar.ql-snow .ql-fill {
    fill: ${e("editor.toolbar.item.color")};
}

.p-editor .p-editor-toolbar.ql-snow .ql-picker .ql-picker-label {
    border: 0 none;
    color: ${e("editor.toolbar.item.color")};
}

.p-editor .p-editor-toolbar.ql-snow .ql-picker .ql-picker-label:hover {
    color: ${e("editor.toolbar.item.hover.color")};
}

.p-editor .p-editor-toolbar.ql-snow .ql-picker .ql-picker-label:hover .ql-stroke {
    stroke: ${e("editor.toolbar.item.hover.color")};
}

.p-editor .p-editor-toolbar.ql-snow .ql-picker .ql-picker-label:hover .ql-fill {
    fill: ${e("editor.toolbar.item.hover.color")};
}

.p-editor .p-editor-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-label {
    color: ${e("editor.toolbar.item.active.color")};
}

.p-editor .p-editor-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-label .ql-stroke {
    stroke: ${e("editor.toolbar.item.active.color")};
}

.p-editor .p-editor-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-label .ql-fill {
    fill: ${e("editor.toolbar.item.active.color")};
}

.p-editor .p-editor-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-options {
    background: ${e("editor.overlay.background")};
    border: 1px solid ${e("editor.overlay.border.color")};
    box-shadow: ${e("editor.overlay.shadow")};
    border-radius: ${e("editor.overlay.border.radius")};
    padding: ${e("editor.overlay.padding")};
}

.p-editor .p-editor-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-options .ql-picker-item {
    color: ${e("editor.overlay.option.color")};
    border-radius: ${e("editor.overlay.option.border.radius")};
}

.p-editor .p-editor-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-options .ql-picker-item:hover {
    background: ${e("editor.overlay.option.focus.background")};
    color: ${e("editor.overlay.option.focus.color")};
}

.p-editor .p-editor-toolbar.ql-snow .ql-picker.ql-expanded:not(.ql-icon-picker) .ql-picker-item {
    padding: ${e("editor.overlay.option.padding")};
}

.p-editor .p-editor-content {
    border-end-end-radius: ${e("editor.content.border.radius")};
    border-end-start-radius: ${e("editor.content.border.radius")};
}

.p-editor .p-editor-content.ql-snow {
    border: 1px solid ${e("editor.content.border.color")};
}

.p-editor .p-editor-content .ql-editor {
    background: ${e("editor.content.background")};
    color: ${e("editor.content.color")};
    border-end-end-radius: ${e("editor.content.border.radius")};
    border-end-start-radius: ${e("editor.content.border.radius")};
}

.p-editor .ql-snow.ql-toolbar button:hover,
.p-editor .ql-snow.ql-toolbar button:focus {
    color: ${e("editor.toolbar.item.hover.color")};
}

.p-editor .ql-snow.ql-toolbar button:hover .ql-stroke,
.p-editor .ql-snow.ql-toolbar button:focus .ql-stroke {
    stroke: ${e("editor.toolbar.item.hover.color")};
}

.p-editor .ql-snow.ql-toolbar button:hover .ql-fill,
.p-editor .ql-snow.ql-toolbar button:focus .ql-fill {
    fill: ${e("editor.toolbar.item.hover.color")};
}

.p-editor .ql-snow.ql-toolbar button.ql-active,
.p-editor .ql-snow.ql-toolbar .ql-picker-label.ql-active,
.p-editor .ql-snow.ql-toolbar .ql-picker-item.ql-selected {
    color: ${e("editor.toolbar.item.active.color")};
}

.p-editor .ql-snow.ql-toolbar button.ql-active .ql-stroke,
.p-editor .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke,
.p-editor .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke {
    stroke: ${e("editor.toolbar.item.active.color")};
}

.p-editor .ql-snow.ql-toolbar button.ql-active .ql-fill,
.p-editor .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-fill,
.p-editor .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-fill {
    fill: ${e("editor.toolbar.item.active.color")};
}

.p-editor .ql-snow.ql-toolbar button.ql-active .ql-picker-label,
.p-editor .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-picker-label,
.p-editor .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-picker-label {
    color: ${e("editor.toolbar.item.active.color")};
}
`,el={root:function(t){var n=t.instance;return["p-editor",{"p-invalid":n.$invalid}]},toolbar:"p-editor-toolbar",content:"p-editor-content"},tl=ie.extend({name:"editor",style:Xn,classes:el}),nl={name:"BaseEditor",extends:dt,props:{placeholder:String,readonly:Boolean,formats:Array,editorStyle:null,modules:null},style:tl,provide:function(){return{$pcEditor:this,$parentInstance:this}}};function de(e){"@babel/helpers - typeof";return de=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},de(e)}function Re(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);t&&(l=l.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),n.push.apply(n,l)}return n}function ll(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?Re(Object(n),!0).forEach(function(l){il(e,l,n[l])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Re(Object(n)).forEach(function(l){Object.defineProperty(e,l,Object.getOwnPropertyDescriptor(n,l))})}return e}function il(e,t,n){return(t=ol(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function ol(e){var t=al(e,"string");return de(t)=="symbol"?t:t+""}function al(e,t){if(de(e)!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var l=n.call(e,t);if(de(l)!="object")return l;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var Fe=function(){try{return window.Quill}catch{return null}}(),Ve={name:"Editor",extends:nl,inheritAttrs:!1,emits:["text-change","selection-change","load"],quill:null,watch:{modelValue:function(t,n){t!==n&&this.quill&&!this.quill.hasFocus()&&this.renderValue(t)},readonly:function(){this.handleReadOnlyChange()}},mounted:function(){var t=this,n={modules:ll({toolbar:this.$refs.toolbarElement},this.modules),readOnly:this.readonly,theme:"snow",formats:this.formats,placeholder:this.placeholder};Fe?(this.quill=new Fe(this.$refs.editorElement,n),this.initQuill(),this.handleLoad()):st(()=>import("./quill-BQL2exU3.js"),__vite__mapDeps([0,1])).then(function(l){l&&ut(t.$refs.editorElement)&&(l.default?t.quill=new l.default(t.$refs.editorElement,n):t.quill=new l(t.$refs.editorElement,n),t.initQuill())}).then(function(){t.handleLoad()})},beforeUnmount:function(){this.quill=null},methods:{renderValue:function(t){if(this.quill)if(t){var n=this.quill.clipboard.convert({html:t});this.quill.setContents(n)}else this.quill.setText("")},initQuill:function(){var t=this;this.renderValue(this.d_value),this.quill.on("text-change",function(n,l,r){if(r==="user"){var i=t.quill.getSemanticHTML(),d=t.quill.getText().trim();i==="<p><br></p>"&&(i=""),t.writeValue(i),t.$emit("text-change",{htmlValue:i,textValue:d,delta:n,source:r,instance:t.quill})}}),this.quill.on("selection-change",function(n,l,r){var i=t.quill.getSemanticHTML(),d=t.quill.getText().trim();t.$emit("selection-change",{htmlValue:i,textValue:d,range:n,oldRange:l,source:r,instance:t.quill})})},handleLoad:function(){this.quill&&this.quill.getModule("toolbar")&&this.$emit("load",{instance:this.quill})},handleReadOnlyChange:function(){this.quill&&this.quill.enable(!this.readonly)}}};function rl(e,t,n,l,r,i){return v(),C("div",f({class:e.cx("root")},e.ptmi("root")),[o("div",f({ref:"toolbarElement",class:e.cx("toolbar")},e.ptm("toolbar")),[K(e.$slots,"toolbar",{},function(){return[o("span",f({class:"ql-formats"},e.ptm("formats")),[o("select",f({class:"ql-header",defaultValue:"0"},e.ptm("header")),[o("option",f({value:"1"},e.ptm("option")),"Heading",16),o("option",f({value:"2"},e.ptm("option")),"Subheading",16),o("option",f({value:"0"},e.ptm("option")),"Normal",16)],16),o("select",f({class:"ql-font"},e.ptm("font")),[o("option",ct(pt(e.ptm("option"))),null,16),o("option",f({value:"serif"},e.ptm("option")),null,16),o("option",f({value:"monospace"},e.ptm("option")),null,16)],16)],16),o("span",f({class:"ql-formats"},e.ptm("formats")),[o("button",f({class:"ql-bold",type:"button"},e.ptm("bold")),null,16),o("button",f({class:"ql-italic",type:"button"},e.ptm("italic")),null,16),o("button",f({class:"ql-underline",type:"button"},e.ptm("underline")),null,16)],16),o("span",f({class:"ql-formats"},e.ptm("formats")),[o("select",f({class:"ql-color"},e.ptm("color")),null,16),o("select",f({class:"ql-background"},e.ptm("background")),null,16)],16),o("span",f({class:"ql-formats"},e.ptm("formats")),[o("button",f({class:"ql-list",value:"ordered",type:"button"},e.ptm("list")),null,16),o("button",f({class:"ql-list",value:"bullet",type:"button"},e.ptm("list")),null,16),o("select",f({class:"ql-align"},e.ptm("select")),[o("option",f({defaultValue:""},e.ptm("option")),null,16),o("option",f({value:"center"},e.ptm("option")),null,16),o("option",f({value:"right"},e.ptm("option")),null,16),o("option",f({value:"justify"},e.ptm("option")),null,16)],16)],16),o("span",f({class:"ql-formats"},e.ptm("formats")),[o("button",f({class:"ql-link",type:"button"},e.ptm("link")),null,16),o("button",f({class:"ql-image",type:"button"},e.ptm("image")),null,16),o("button",f({class:"ql-code-block",type:"button"},e.ptm("codeBlock")),null,16)],16),o("span",f({class:"ql-formats"},e.ptm("formats")),[o("button",f({class:"ql-clean",type:"button"},e.ptm("clean")),null,16)],16)]})],16),o("div",f({ref:"editorElement",class:e.cx("content"),style:e.editorStyle},e.ptm("content")),null,16)],16)}Ve.render=rl;const sl={class:"container"},ul={class:"material-container"},dl={class:"element"},cl={class:"element"},pl={class:"element"},bl={class:"element"},ml={class:"editor_element"},fl={class:"editor_element"},hl=ee({__name:"AddActivity",props:["addMaterial","materialId"],emits:["info"],setup(e,{emit:t}){const n=$({en:"",ar:""}),l=$({en:"",ar:""}),r=$("<p> rb </p>"),i=$(""),d=e,c=t;return d.materialId&&new N("get_activity").callApi({activity_id:d.materialId}).then(s=>{var a,u,m,k,w,x,_,S;s!=null&&s.success&&(n.value=(u=(a=s==null?void 0:s.data)==null?void 0:a.activity)==null?void 0:u.title,l.value=(k=(m=s==null?void 0:s.data)==null?void 0:m.activity)==null?void 0:k.description,r.value=(x=(w=s==null?void 0:s.data)==null?void 0:w.activity)==null?void 0:x.content.en,i.value=(S=(_=s==null?void 0:s.data)==null?void 0:_.activity)==null?void 0:S.content.ar)}),ce(d,()=>{if(d.addMaterial){let s={title:n.value,description:l.value,content:{en:r.value,ar:i.value}};if(d.materialId){let a={activity_id:d.materialId,update:s};new N("update_activity").callApi(a).then(u=>{u!=null&&u.success&&c("info",null)})}else{let a={new_activity:s};new N("create_activity").callApi(a).then(u=>{var m,k;if((m=u==null?void 0:u.data)!=null&&m.activity_id){let w={Id:(k=u==null?void 0:u.data)==null?void 0:k.activity_id,title:{en:n.value.en,ar:n.value.ar}};c("info",w)}})}}}),(s,a)=>(v(),C("div",sl,[o("div",ul,[o("div",dl,[a[6]||(a[6]=o("h4",null,"English Title",-1)),p(b(D),{modelValue:n.value.en,"onUpdate:modelValue":a[0]||(a[0]=u=>n.value.en=u)},null,8,["modelValue"])]),o("div",cl,[a[7]||(a[7]=o("h4",null,"Arabic Title",-1)),p(b(D),{modelValue:n.value.ar,"onUpdate:modelValue":a[1]||(a[1]=u=>n.value.ar=u)},null,8,["modelValue"])]),o("div",pl,[a[8]||(a[8]=o("h4",null,"English Description",-1)),p(b(D),{modelValue:l.value.en,"onUpdate:modelValue":a[2]||(a[2]=u=>l.value.en=u)},null,8,["modelValue"])]),o("div",bl,[a[9]||(a[9]=o("h4",null,"Arabic Description",-1)),p(b(D),{modelValue:l.value.ar,"onUpdate:modelValue":a[3]||(a[3]=u=>l.value.ar=u)},null,8,["modelValue"])]),o("div",ml,[a[10]||(a[10]=o("h4",null,"English Content",-1)),p(b(Ve),{modelValue:r.value,"onUpdate:modelValue":a[4]||(a[4]=u=>r.value=u),style:{height:"300px"}},null,8,["modelValue"])]),o("div",fl,[a[11]||(a[11]=o("h4",null,"Arabic Content",-1)),p(b(Ve),{modelValue:i.value,"onUpdate:modelValue":a[5]||(a[5]=u=>i.value=u),style:{height:"300px"}},null,8,["modelValue"])])])]))}}),vl=te(hl,[["__scopeId","data-v-e23d711a"]]),ql={class:"container"},gl={class:"material-container"},wl={class:"element"},kl={class:"element"},yl={class:"element"},$l={class:"element"},xl={class:"element"},Cl={class:"element"},Vl=ee({__name:"AddProject",props:["addMaterial","materialId"],emits:["info"],setup(e,{emit:t}){const n=$({en:"",ar:""}),l=$({en:"",ar:""}),r=$(""),i=$(""),d=e,c=t;return d.materialId&&new N("get_project").callApi({project_id:d.materialId}).then(s=>{var a,u,m,k,w,x,_,S;s!=null&&s.success&&(n.value=(u=(a=s==null?void 0:s.data)==null?void 0:a.project)==null?void 0:u.title,l.value=(k=(m=s==null?void 0:s.data)==null?void 0:m.project)==null?void 0:k.description,r.value=(x=(w=s==null?void 0:s.data)==null?void 0:w.project)==null?void 0:x.source,i.value=(S=(_=s==null?void 0:s.data)==null?void 0:_.project)==null?void 0:S.source2)}),ce(d,()=>{if(d.addMaterial){let s={title:n.value,description:l.value,source:r.value,source2:i.value};if(d.materialId){let a={project_id:d.materialId,update:s};new N("update_project").callApi(a).then(u=>{u!=null&&u.success&&c("info",null)})}else{let a={new_project:s};new N("create_project").callApi(a).then(u=>{var m,k;if((m=u==null?void 0:u.data)!=null&&m.project_id){let w={Id:(k=u==null?void 0:u.data)==null?void 0:k.project_id,title:{en:n.value.en,ar:n.value.ar}};c("info",w)}})}}}),(s,a)=>(v(),C("div",ql,[o("div",gl,[o("div",wl,[a[6]||(a[6]=o("h4",null,"English Title",-1)),p(b(D),{modelValue:n.value.en,"onUpdate:modelValue":a[0]||(a[0]=u=>n.value.en=u)},null,8,["modelValue"])]),o("div",kl,[a[7]||(a[7]=o("h4",null,"Arabic Title",-1)),p(b(D),{modelValue:n.value.ar,"onUpdate:modelValue":a[1]||(a[1]=u=>n.value.ar=u)},null,8,["modelValue"])]),o("div",yl,[a[8]||(a[8]=o("h4",null,"English Description",-1)),p(b(D),{modelValue:l.value.en,"onUpdate:modelValue":a[2]||(a[2]=u=>l.value.en=u)},null,8,["modelValue"])]),o("div",$l,[a[9]||(a[9]=o("h4",null,"Arabic Description",-1)),p(b(D),{modelValue:l.value.ar,"onUpdate:modelValue":a[3]||(a[3]=u=>l.value.ar=u)},null,8,["modelValue"])]),o("div",xl,[a[10]||(a[10]=o("h4",null,"English Source",-1)),p(b(D),{modelValue:r.value,"onUpdate:modelValue":a[4]||(a[4]=u=>r.value=u)},null,8,["modelValue"])]),o("div",Cl,[a[11]||(a[11]=o("h4",null,"Arabic Source",-1)),p(b(D),{modelValue:i.value,"onUpdate:modelValue":a[5]||(a[5]=u=>i.value=u)},null,8,["modelValue"])])])]))}}),Il=te(Vl,[["__scopeId","data-v-de42d581"]]),Sl={class:"dialog"},Bl={class:"container"},Dl={class:"material-container"},Al={class:"material-btns"},Tl=ee({__name:"AddMaterialDialog",props:["showDialog","materialId","materialType"],emits:["removeDialog","info"],setup(e,{emit:t}){const n=e,l=t,r=$(n.materialType),i=["Lesson","Quiz","Activity","Simulation","Project"],d=$(!1),c=$(!1),s=$(!1),a=$(!1),u=$(!1);function m(){r.value=="Lesson"&&(d.value=!0),r.value=="Quiz"&&(c.value=!0),r.value=="Activity"&&(s.value=!0),r.value=="Simulation"&&(u.value=!0),r.value=="Project"&&(a.value=!0)}function k(w){if(w){let x={Id:w==null?void 0:w.Id,order:0,title:w==null?void 0:w.title,type:r.value};l("info",x)}l("removeDialog",!0)}return(w,x)=>(v(),E(b(We),{visible:n.showDialog,"onUpdate:visible":x[7]||(x[7]=_=>n.showDialog=_),modal:"",pt:{root:"border-none",mask:{style:"backdrop-filter: blur(2px)"}}},{container:U(({closeCallback:_})=>[o("div",Sl,[o("div",Bl,[r.value?M("",!0):(v(),E(b(Ze),{key:0,modelValue:r.value,"onUpdate:modelValue":x[0]||(x[0]=S=>r.value=S),options:i,placeholder:"Material Type"},null,8,["modelValue"])),o("div",Dl,[r.value=="Quiz"?(v(),E(Fn,{key:0,"add-material":c.value,"material-id":e.materialId,onInfo:x[1]||(x[1]=S=>{k(S)})},null,8,["add-material","material-id"])):M("",!0),r.value=="Lesson"?(v(),E(Zn,{key:1,"add-material":d.value,"material-id":e.materialId,onInfo:x[2]||(x[2]=S=>{k(S)})},null,8,["add-material","material-id"])):M("",!0),r.value=="Activity"?(v(),E(vl,{key:2,"add-material":s.value,"material-id":e.materialId,onInfo:x[3]||(x[3]=S=>{k(S)})},null,8,["add-material","material-id"])):M("",!0),r.value=="Simulation"?(v(),E(Lt,{key:3,"add-material":u.value,"material-id":e.materialId,onInfo:x[4]||(x[4]=S=>{k(S)})},null,8,["add-material","material-id"])):M("",!0),r.value=="Project"?(v(),E(Il,{key:4,"add-material":a.value,"material-id":e.materialId,onInfo:x[5]||(x[5]=S=>{k(S)})},null,8,["add-material","material-id"])):M("",!0)]),o("div",Al,[p(b(O),{label:"Save Changes",onClick:m}),p(b(O),{style:{"background-color":"red"},label:"Cancel",onClick:x[6]||(x[6]=()=>{w.$emit("removeDialog")})})])])])]),_:1},8,["visible"]))}}),_l=te(Tl,[["__scopeId","data-v-c229a480"]]);var zl=({dt:e})=>`
.p-tabs {
    display: flex;
    flex-direction: column;
}

.p-tablist {
    display: flex;
    position: relative;
}

.p-tabs-scrollable > .p-tablist {
    overflow: hidden;
}

.p-tablist-viewport {
    overflow-x: auto;
    overflow-y: hidden;
    scroll-behavior: smooth;
    scrollbar-width: none;
    overscroll-behavior: contain auto;
}

.p-tablist-viewport::-webkit-scrollbar {
    display: none;
}

.p-tablist-tab-list {
    position: relative;
    display: flex;
    background: ${e("tabs.tablist.background")};
    border-style: solid;
    border-color: ${e("tabs.tablist.border.color")};
    border-width: ${e("tabs.tablist.border.width")};
}

.p-tablist-content {
    flex-grow: 1;
}

.p-tablist-nav-button {
    all: unset;
    position: absolute !important;
    flex-shrink: 0;
    inset-block-start: 0;
    z-index: 2;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${e("tabs.nav.button.background")};
    color: ${e("tabs.nav.button.color")};
    width: ${e("tabs.nav.button.width")};
    transition: color ${e("tabs.transition.duration")}, outline-color ${e("tabs.transition.duration")}, box-shadow ${e("tabs.transition.duration")};
    box-shadow: ${e("tabs.nav.button.shadow")};
    outline-color: transparent;
    cursor: pointer;
}

.p-tablist-nav-button:focus-visible {
    z-index: 1;
    box-shadow: ${e("tabs.nav.button.focus.ring.shadow")};
    outline: ${e("tabs.nav.button.focus.ring.width")} ${e("tabs.nav.button.focus.ring.style")} ${e("tabs.nav.button.focus.ring.color")};
    outline-offset: ${e("tabs.nav.button.focus.ring.offset")};
}

.p-tablist-nav-button:hover {
    color: ${e("tabs.nav.button.hover.color")};
}

.p-tablist-prev-button {
    inset-inline-start: 0;
}

.p-tablist-next-button {
    inset-inline-end: 0;
}

.p-tablist-prev-button:dir(rtl),
.p-tablist-next-button:dir(rtl) {
    transform: rotate(180deg);
}

.p-tab {
    flex-shrink: 0;
    cursor: pointer;
    user-select: none;
    position: relative;
    border-style: solid;
    white-space: nowrap;
    gap: ${e("tabs.tab.gap")};
    background: ${e("tabs.tab.background")};
    border-width: ${e("tabs.tab.border.width")};
    border-color: ${e("tabs.tab.border.color")};
    color: ${e("tabs.tab.color")};
    padding: ${e("tabs.tab.padding")};
    font-weight: ${e("tabs.tab.font.weight")};
    transition: background ${e("tabs.transition.duration")}, border-color ${e("tabs.transition.duration")}, color ${e("tabs.transition.duration")}, outline-color ${e("tabs.transition.duration")}, box-shadow ${e("tabs.transition.duration")};
    margin: ${e("tabs.tab.margin")};
    outline-color: transparent;
}

.p-tab:not(.p-disabled):focus-visible {
    z-index: 1;
    box-shadow: ${e("tabs.tab.focus.ring.shadow")};
    outline: ${e("tabs.tab.focus.ring.width")} ${e("tabs.tab.focus.ring.style")} ${e("tabs.tab.focus.ring.color")};
    outline-offset: ${e("tabs.tab.focus.ring.offset")};
}

.p-tab:not(.p-tab-active):not(.p-disabled):hover {
    background: ${e("tabs.tab.hover.background")};
    border-color: ${e("tabs.tab.hover.border.color")};
    color: ${e("tabs.tab.hover.color")};
}

.p-tab-active {
    background: ${e("tabs.tab.active.background")};
    border-color: ${e("tabs.tab.active.border.color")};
    color: ${e("tabs.tab.active.color")};
}

.p-tabpanels {
    background: ${e("tabs.tabpanel.background")};
    color: ${e("tabs.tabpanel.color")};
    padding: ${e("tabs.tabpanel.padding")};
    outline: 0 none;
}

.p-tabpanel:focus-visible {
    box-shadow: ${e("tabs.tabpanel.focus.ring.shadow")};
    outline: ${e("tabs.tabpanel.focus.ring.width")} ${e("tabs.tabpanel.focus.ring.style")} ${e("tabs.tabpanel.focus.ring.color")};
    outline-offset: ${e("tabs.tabpanel.focus.ring.offset")};
}

.p-tablist-active-bar {
    z-index: 1;
    display: block;
    position: absolute;
    inset-block-end: ${e("tabs.active.bar.bottom")};
    height: ${e("tabs.active.bar.height")};
    background: ${e("tabs.active.bar.background")};
    transition: 250ms cubic-bezier(0.35, 0, 0.25, 1);
}
`,Pl={root:function(t){var n=t.props;return["p-tabs p-component",{"p-tabs-scrollable":n.scrollable}]}},El=ie.extend({name:"tabs",style:zl,classes:Pl}),Ll={name:"BaseTabs",extends:qe,props:{value:{type:[String,Number],default:void 0},lazy:{type:Boolean,default:!1},scrollable:{type:Boolean,default:!1},showNavigators:{type:Boolean,default:!0},tabindex:{type:Number,default:0},selectOnFocus:{type:Boolean,default:!1}},style:El,provide:function(){return{$pcTabs:this,$parentInstance:this}}},nt={name:"Tabs",extends:Ll,inheritAttrs:!1,emits:["update:value"],data:function(){return{d_value:this.value}},watch:{value:function(t){this.d_value=t}},methods:{updateValue:function(t){this.d_value!==t&&(this.d_value=t,this.$emit("update:value",t))},isVertical:function(){return this.orientation==="vertical"}}};function Ul(e,t,n,l,r,i){return v(),C("div",f({class:e.cx("root")},e.ptmi("root")),[K(e.$slots,"default")],16)}nt.render=Ul;var Nl={root:"p-tablist",content:function(t){var n=t.instance;return["p-tablist-content",{"p-tablist-viewport":n.$pcTabs.scrollable}]},tabList:"p-tablist-tab-list",activeBar:"p-tablist-active-bar",prevButton:"p-tablist-prev-button p-tablist-nav-button",nextButton:"p-tablist-next-button p-tablist-nav-button"},Ol=ie.extend({name:"tablist",classes:Nl}),Ml={name:"BaseTabList",extends:qe,props:{},style:Ol,provide:function(){return{$pcTabList:this,$parentInstance:this}}},lt={name:"TabList",extends:Ml,inheritAttrs:!1,inject:["$pcTabs"],data:function(){return{isPrevButtonEnabled:!1,isNextButtonEnabled:!0}},resizeObserver:void 0,watch:{showNavigators:function(t){t?this.bindResizeObserver():this.unbindResizeObserver()},activeValue:{flush:"post",handler:function(){this.updateInkBar()}}},mounted:function(){var t=this;setTimeout(function(){t.updateInkBar()},150),this.showNavigators&&(this.updateButtonState(),this.bindResizeObserver())},updated:function(){this.showNavigators&&this.updateButtonState()},beforeUnmount:function(){this.unbindResizeObserver()},methods:{onScroll:function(t){this.showNavigators&&this.updateButtonState(),t.preventDefault()},onPrevButtonClick:function(){var t=this.$refs.content,n=this.getVisibleButtonWidths(),l=we(t)-n,r=Math.abs(t.scrollLeft),i=l*.8,d=r-i,c=Math.max(d,0);t.scrollLeft=Ne(t)?-1*c:c},onNextButtonClick:function(){var t=this.$refs.content,n=this.getVisibleButtonWidths(),l=we(t)-n,r=Math.abs(t.scrollLeft),i=l*.8,d=r+i,c=t.scrollWidth-l,s=Math.min(d,c);t.scrollLeft=Ne(t)?-1*s:s},bindResizeObserver:function(){var t=this;this.resizeObserver=new ResizeObserver(function(){return t.updateButtonState()}),this.resizeObserver.observe(this.$refs.list)},unbindResizeObserver:function(){var t;(t=this.resizeObserver)===null||t===void 0||t.unobserve(this.$refs.list),this.resizeObserver=void 0},updateInkBar:function(){var t=this.$refs,n=t.content,l=t.inkbar,r=t.tabs;if(l){var i=ye(n,'[data-pc-name="tab"][data-p-active="true"]');this.$pcTabs.isVertical()?(l.style.height=bt(i)+"px",l.style.top=be(i).top-be(r).top+"px"):(l.style.width=mt(i)+"px",l.style.left=be(i).left-be(r).left+"px")}},updateButtonState:function(){var t=this.$refs,n=t.list,l=t.content,r=l.scrollTop,i=l.scrollWidth,d=l.scrollHeight,c=l.offsetWidth,s=l.offsetHeight,a=Math.abs(l.scrollLeft),u=[we(l),ft(l)],m=u[0],k=u[1];this.$pcTabs.isVertical()?(this.isPrevButtonEnabled=r!==0,this.isNextButtonEnabled=n.offsetHeight>=s&&parseInt(r)!==d-k):(this.isPrevButtonEnabled=a!==0,this.isNextButtonEnabled=n.offsetWidth>=c&&parseInt(a)!==i-m)},getVisibleButtonWidths:function(){var t=this.$refs,n=t.prevButton,l=t.nextButton,r=0;return this.showNavigators&&(r=((n==null?void 0:n.offsetWidth)||0)+((l==null?void 0:l.offsetWidth)||0)),r}},computed:{templates:function(){return this.$pcTabs.$slots},activeValue:function(){return this.$pcTabs.d_value},showNavigators:function(){return this.$pcTabs.scrollable&&this.$pcTabs.showNavigators},prevButtonAriaLabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.previous:void 0},nextButtonAriaLabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.next:void 0},dataP:function(){return ve({scrollable:this.$pcTabs.scrollable})}},components:{ChevronLeftIcon:ht,ChevronRightIcon:vt},directives:{ripple:Je}},Rl=["data-p"],Fl=["aria-label","tabindex"],jl=["data-p"],Kl=["aria-orientation"],Hl=["aria-label","tabindex"];function Gl(e,t,n,l,r,i){var d=Ye("ripple");return v(),C("div",f({ref:"list",class:e.cx("root"),"data-p":i.dataP},e.ptmi("root")),[i.showNavigators&&r.isPrevButtonEnabled?$e((v(),C("button",f({key:0,ref:"prevButton",type:"button",class:e.cx("prevButton"),"aria-label":i.prevButtonAriaLabel,tabindex:i.$pcTabs.tabindex,onClick:t[0]||(t[0]=function(){return i.onPrevButtonClick&&i.onPrevButtonClick.apply(i,arguments)})},e.ptm("prevButton"),{"data-pc-group-section":"navigator"}),[(v(),E(J(i.templates.previcon||"ChevronLeftIcon"),f({"aria-hidden":"true"},e.ptm("prevIcon")),null,16))],16,Fl)),[[d]]):M("",!0),o("div",f({ref:"content",class:e.cx("content"),onScroll:t[1]||(t[1]=function(){return i.onScroll&&i.onScroll.apply(i,arguments)}),"data-p":i.dataP},e.ptm("content")),[o("div",f({ref:"tabs",class:e.cx("tabList"),role:"tablist","aria-orientation":i.$pcTabs.orientation||"horizontal"},e.ptm("tabList")),[K(e.$slots,"default"),o("span",f({ref:"inkbar",class:e.cx("activeBar"),role:"presentation","aria-hidden":"true"},e.ptm("activeBar")),null,16)],16,Kl)],16,jl),i.showNavigators&&r.isNextButtonEnabled?$e((v(),C("button",f({key:1,ref:"nextButton",type:"button",class:e.cx("nextButton"),"aria-label":i.nextButtonAriaLabel,tabindex:i.$pcTabs.tabindex,onClick:t[2]||(t[2]=function(){return i.onNextButtonClick&&i.onNextButtonClick.apply(i,arguments)})},e.ptm("nextButton"),{"data-pc-group-section":"navigator"}),[(v(),E(J(i.templates.nexticon||"ChevronRightIcon"),f({"aria-hidden":"true"},e.ptm("nextIcon")),null,16))],16,Hl)),[[d]]):M("",!0)],16,Rl)}lt.render=Gl;var Ql={root:function(t){var n=t.instance,l=t.props;return["p-tab",{"p-tab-active":n.active,"p-disabled":l.disabled}]}},Wl=ie.extend({name:"tab",classes:Ql}),Jl={name:"BaseTab",extends:qe,props:{value:{type:[String,Number],default:void 0},disabled:{type:Boolean,default:!1},as:{type:[String,Object],default:"BUTTON"},asChild:{type:Boolean,default:!1}},style:Wl,provide:function(){return{$pcTab:this,$parentInstance:this}}},ae={name:"Tab",extends:Jl,inheritAttrs:!1,inject:["$pcTabs","$pcTabList"],methods:{onFocus:function(){this.$pcTabs.selectOnFocus&&this.changeActiveValue()},onClick:function(){this.changeActiveValue()},onKeydown:function(t){switch(t.code){case"ArrowRight":this.onArrowRightKey(t);break;case"ArrowLeft":this.onArrowLeftKey(t);break;case"Home":this.onHomeKey(t);break;case"End":this.onEndKey(t);break;case"PageDown":this.onPageDownKey(t);break;case"PageUp":this.onPageUpKey(t);break;case"Enter":case"NumpadEnter":case"Space":this.onEnterKey(t);break}},onArrowRightKey:function(t){var n=this.findNextTab(t.currentTarget);n?this.changeFocusedTab(t,n):this.onHomeKey(t),t.preventDefault()},onArrowLeftKey:function(t){var n=this.findPrevTab(t.currentTarget);n?this.changeFocusedTab(t,n):this.onEndKey(t),t.preventDefault()},onHomeKey:function(t){var n=this.findFirstTab();this.changeFocusedTab(t,n),t.preventDefault()},onEndKey:function(t){var n=this.findLastTab();this.changeFocusedTab(t,n),t.preventDefault()},onPageDownKey:function(t){this.scrollInView(this.findLastTab()),t.preventDefault()},onPageUpKey:function(t){this.scrollInView(this.findFirstTab()),t.preventDefault()},onEnterKey:function(t){this.changeActiveValue(),t.preventDefault()},findNextTab:function(t){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,l=n?t:t.nextElementSibling;return l?me(l,"data-p-disabled")||me(l,"data-pc-section")==="activebar"?this.findNextTab(l):ye(l,'[data-pc-name="tab"]'):null},findPrevTab:function(t){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,l=n?t:t.previousElementSibling;return l?me(l,"data-p-disabled")||me(l,"data-pc-section")==="activebar"?this.findPrevTab(l):ye(l,'[data-pc-name="tab"]'):null},findFirstTab:function(){return this.findNextTab(this.$pcTabList.$refs.tabs.firstElementChild,!0)},findLastTab:function(){return this.findPrevTab(this.$pcTabList.$refs.tabs.lastElementChild,!0)},changeActiveValue:function(){this.$pcTabs.updateValue(this.value)},changeFocusedTab:function(t,n){qt(n),this.scrollInView(n)},scrollInView:function(t){var n;t==null||(n=t.scrollIntoView)===null||n===void 0||n.call(t,{block:"nearest"})}},computed:{active:function(){var t;return Qe((t=this.$pcTabs)===null||t===void 0?void 0:t.d_value,this.value)},id:function(){var t;return"".concat((t=this.$pcTabs)===null||t===void 0?void 0:t.$id,"_tab_").concat(this.value)},ariaControls:function(){var t;return"".concat((t=this.$pcTabs)===null||t===void 0?void 0:t.$id,"_tabpanel_").concat(this.value)},attrs:function(){return f(this.asAttrs,this.a11yAttrs,this.ptmi("root",this.ptParams))},asAttrs:function(){return this.as==="BUTTON"?{type:"button",disabled:this.disabled}:void 0},a11yAttrs:function(){return{id:this.id,tabindex:this.active?this.$pcTabs.tabindex:-1,role:"tab","aria-selected":this.active,"aria-controls":this.ariaControls,"data-pc-name":"tab","data-p-disabled":this.disabled,"data-p-active":this.active,onFocus:this.onFocus,onKeydown:this.onKeydown}},ptParams:function(){return{context:{active:this.active}}},dataP:function(){return ve({active:this.active})}},directives:{ripple:Je}};function Yl(e,t,n,l,r,i){var d=Ye("ripple");return e.asChild?K(e.$slots,"default",{key:1,dataP:i.dataP,class:Ge(e.cx("root")),active:i.active,a11yAttrs:i.a11yAttrs,onClick:i.onClick}):$e((v(),E(J(e.as),f({key:0,class:e.cx("root"),"data-p":i.dataP,onClick:i.onClick},i.attrs),{default:U(function(){return[K(e.$slots,"default")]}),_:3},16,["class","data-p","onClick"])),[[d]])}ae.render=Yl;var Zl={root:"p-tabpanels"},Xl=ie.extend({name:"tabpanels",classes:Zl}),ei={name:"BaseTabPanels",extends:qe,props:{},style:Xl,provide:function(){return{$pcTabPanels:this,$parentInstance:this}}},it={name:"TabPanels",extends:ei,inheritAttrs:!1};function ti(e,t,n,l,r,i){return v(),C("div",f({class:e.cx("root"),role:"presentation"},e.ptmi("root")),[K(e.$slots,"default")],16)}it.render=ti;const ni={class:"dialog"},li={class:"buttons"},ii=ee({__name:"RemoveChapterDialog",props:["showDialog","cost"],emits:["hideDialog","confirm"],setup(e,{emit:t}){const n=e;return(l,r)=>(v(),E(b(We),{visible:n.showDialog,"onUpdate:visible":r[2]||(r[2]=i=>n.showDialog=i),modal:"",pt:{root:"border-none",mask:{style:"backdrop-filter: blur(2px)"}}},{container:U(({closeCallback:i})=>[o("div",ni,[r[3]||(r[3]=o("h2",null,"Confirm Deletion",-1)),o("div",li,[p(b(O),{label:"Confirm",onClick:r[0]||(r[0]=()=>{l.$emit("confirm")})}),p(b(O),{label:"Cancel",style:{"background-color":"red"},onClick:r[1]||(r[1]=()=>{l.$emit("hideDialog")})})])])]),_:1},8,["visible"]))}}),oi=te(ii,[["__scopeId","data-v-13f3bd92"]]),ai={class:"container"},ri={class:"tab_container"},si={class:"element"},ui={class:"element"},di={style:{display:"flex","justify-content":"space-around"}},ci={style:{display:"flex","justify-content":"center","align-items":"center",gap:"0.5rem"}},pi={style:{display:"flex","justify-content":"center","align-items":"center",gap:"0.5rem"}},bi={class:"tab_container"},mi={class:"row"},fi={style:{display:"grid","grid-template-columns":"3fr 1fr",gap:"1rem"}},hi={class:"btn-container"},vi={class:"tab_container"},qi={class:"row"},gi={class:"element"},wi={class:"element"},ki={class:"btn-container"},yi={class:"tab_container"},$i={style:{display:"flex",gap:"0.5rem","align-items":"center",width:"80vw"}},xi={class:"options",style:{gap:"0.5rem"}},Ci=["onClick"],Vi=["onClick"],Ii={class:"element"},Si={class:"element"},Bi={class:"options"},Di=["onClick"],Ai=["onClick"],Ti={class:"mat-group"},_i={class:"element"},zi={class:"material-btns"},Pi={style:{display:"flex","justify-content":"end"}},Ei={class:"btn-container"},Li={class:"btn-container"},Ui=ee({__name:"editCourse",setup(e){const t=gt(),n=wt(),l=new N("get_course"),r=new N("get_categories"),i=$(),d=$([]),c=$([]),s=$([]),a=$([]),u=$(!1);r.callApi().then(V=>{var q,G;V!=null&&V.success&&(d.value=(q=V==null?void 0:V.data)==null?void 0:q.categories,l.callApi({course_id:(G=t.params)==null?void 0:G.courseId}).then(A=>{var y,I,j,L,Y,Z,Ie,Se,Be,De,Ae,Te,_e,ze,Pe,Ee;if(A!=null&&A.success){i.value=(y=A==null?void 0:A.data)==null?void 0:y.course,u.value=((I=i.value)==null?void 0:I.is_locked)??!1,z.value={...z.value,titleEn:{...z.value.titleEn,variable:((L=(j=i.value)==null?void 0:j.title)==null?void 0:L.en)||""},titleAr:{...z.value.titleAr,variable:((Z=(Y=i.value)==null?void 0:Y.title)==null?void 0:Z.ar)||""},descriptionEn:{...z.value.descriptionEn,variable:((Se=(Ie=i.value)==null?void 0:Ie.description)==null?void 0:Se.en)||""},descriptionAr:{...z.value.descriptionAr,variable:((De=(Be=i.value)==null?void 0:Be.description)==null?void 0:De.ar)||""},image:{...z.value.image,variable:((Ae=i.value)==null?void 0:Ae.image)||""},minAge:{...z.value.minAge,variable:((Te=i.value)==null?void 0:Te.min_age)||""},maxAge:{...z.value.maxAge,variable:((_e=i.value)==null?void 0:_e.max_age)||""},price:{...z.value.price,variable:((ze=i.value)==null?void 0:ze.price)||""},duration:{...z.value.duration,variable:((Pe=i.value)==null?void 0:Pe.duration)||""}};for(let le of i==null?void 0:i.value.objectives)c.value.push(le);for(let le of i==null?void 0:i.value.chapters)a.value.push(le);for(let le of i==null?void 0:i.value.categories)s.value.push((Ee=d.value)==null?void 0:Ee.find(ge=>(ge==null?void 0:ge.id)==(le==null?void 0:le.Id)))}}))});const m=$(""),k=$("");function w(){s.value.push({Id:null,ristriction_on_course:null})}function x(V){s.value.splice(V,1)}function _(){c.value.push({en:null,ar:null})}function S(V){c.value.splice(V,1)}function H(){var G,A,y;let V=[];for(let I=0;I<s.value.length;I++)V.push({Id:(G=s.value[I])==null?void 0:G.id,title:(A=s.value[I])==null?void 0:A.category});const q={course_id:(y=t.params)==null?void 0:y.courseId,update:{title:{en:z.value.titleEn.variable,ar:z.value.titleAr.variable},description:{en:z.value.descriptionEn.variable,ar:z.value.descriptionAr.variable},chapters:a.value,categories:V,objectives:c.value,price:Number(z.value.price.variable),min_age:Number(z.value.minAge.variable),max_age:Number(z.value.maxAge.variable),image:z.value.image.variable,duration:Number(z.value.duration.variable),is_locked:u.value}};new N("update_course").callApi(q).then(I=>{I!=null&&I.success&&n.push("/manageCourses")})}const R=$(!1),B=$(-1);function h(V){setTimeout(()=>{a.value[B.value].materials.push(V)},250)}function g(){a.value.push({title:{en:"",ar:""},materials:[]})}function P(V,q){var G;if(q>0){let A=a.value[V].materials[q-1];a.value[V].materials[q-1]=(G=a.value[V])==null?void 0:G.materials[q],a.value[V].materials[q]=A}}function T(V,q){var G,A,y,I;if(q<((A=(G=a.value[V])==null?void 0:G.materials)==null?void 0:A.length)-1){let j=(y=a.value[V])==null?void 0:y.materials[q+1];a.value[V].materials[q+1]=(I=a.value[V])==null?void 0:I.materials[q],a.value[V].materials[q]=j}}function F(V){let q=a.value[V];a.value[V]=a.value[V-1],a.value[V-1]=q}function Q(V){let q=a.value[V];a.value[V]=a.value[V+1],a.value[V+1]=q}const ne=$(!1),oe=$(-1);return(V,q)=>{const G=He("icon");return v(),C(W,null,[R.value?(v(),E(_l,{key:0,showDialog:R.value,"material-type":k.value,"material-id":m.value,onRemoveDialog:q[0]||(q[0]=A=>R.value=!1),onInfo:q[1]||(q[1]=A=>{h(A)})},null,8,["showDialog","material-type","material-id"])):M("",!0),p(oi,{showDialog:ne.value,onHideDialog:q[2]||(q[2]=A=>ne.value=!1),onConfirm:q[3]||(q[3]=A=>{a.value.splice(oe.value,1),ne.value=!1})},null,8,["showDialog"]),p(kt),o("div",ai,[p(b(nt),{value:"0"},{default:U(()=>[p(b(it),null,{default:U(()=>[p(b(lt),null,{default:U(()=>[p(b(ae),{value:"0",as:"div",class:"flex items-center gap-2"},{default:U(()=>q[6]||(q[6]=[o("div",{class:"tab_header"},[o("i",{class:"pi pi-info"}),o("p",null,"Basic Info")],-1)])),_:1}),p(b(ae),{value:"1",as:"div",class:"flex items-center gap-2"},{default:U(()=>q[7]||(q[7]=[o("div",{class:"tab_header"},[o("i",{class:"pi pi-align-justify"}),o("p",null,"Categories")],-1)])),_:1}),p(b(ae),{value:"2",as:"div"},{default:U(()=>q[8]||(q[8]=[o("div",{class:"tab_header"},[o("i",{class:"pi pi-star"}),o("p",null,"Objectives")],-1)])),_:1}),p(b(ae),{value:"3",as:"div"},{default:U(()=>q[9]||(q[9]=[o("div",{class:"tab_header"},[o("i",{class:"pi pi-book"}),o("p",null,"Chapters")],-1)])),_:1})]),_:1}),p(b(fe),{value:"0",as:"div"},{default:U(()=>[o("div",ri,[(v(!0),C(W,null,X(b(z),A=>(v(),C("div",si,[o("h3",null,re(A.label),1),(v(),E(J(A.component),{type:A.inputType,modelValue:A.variable,"onUpdate:modelValue":y=>A.variable=y},null,8,["type","modelValue","onUpdate:modelValue"]))]))),256)),o("div",ui,[q[12]||(q[12]=o("h3",null,"Is Locked",-1)),o("div",di,[o("div",ci,[p(b(he),{modelValue:u.value,"onUpdate:modelValue":q[4]||(q[4]=A=>u.value=A),inputId:"v1",name:"isLocked",value:!0},null,8,["modelValue"]),q[10]||(q[10]=o("label",{style:{"font-size":"1.25rem"},for:"v1"},"Yes",-1))]),o("div",pi,[p(b(he),{modelValue:u.value,"onUpdate:modelValue":q[5]||(q[5]=A=>u.value=A),inputId:"v2",name:"isLocked",value:!1},null,8,["modelValue"]),q[11]||(q[11]=o("label",{style:{"font-size":"1.25rem"},for:"v2"},"No",-1))])])])])]),_:1}),p(b(fe),{value:"1",as:"div"},{default:U(()=>[o("div",bi,[(v(!0),C(W,null,X(s.value,(A,y)=>(v(),C("div",mi,[o("div",fi,[p(b(Ze),{modelValue:s.value[y],"onUpdate:modelValue":I=>s.value[y]=I,options:d.value,optionLabel:"category.en"},null,8,["modelValue","onUpdate:modelValue","options"]),p(b(O),{onClick:()=>{x(y)},label:"Remove",style:{"background-color":"red"}},null,8,["onClick"])])]))),256)),o("div",hi,[p(b(O),{onClick:w,label:"Add Category "})])])]),_:1}),p(b(fe),{value:"2",as:"div"},{default:U(()=>[o("div",vi,[(v(!0),C(W,null,X(c.value,(A,y)=>(v(),C("div",qi,[o("div",gi,[q[13]||(q[13]=o("span",null,"English",-1)),p(b(D),{modelValue:c.value[y].en,"onUpdate:modelValue":I=>c.value[y].en=I},null,8,["modelValue","onUpdate:modelValue"])]),o("div",wi,[q[14]||(q[14]=o("span",null,"Arabic",-1)),p(b(D),{modelValue:c.value[y].ar,"onUpdate:modelValue":I=>c.value[y].ar=I},null,8,["modelValue","onUpdate:modelValue"])]),p(b(O),{onClick:()=>{S(y)},label:"Remove",style:{"background-color":"red"}},null,8,["onClick"])]))),256)),o("div",ki,[p(b(O),{onClick:_,label:"Add Objective "})])])]),_:1}),p(b(fe),{value:"3",as:"div"},{default:U(()=>[o("div",yi,[p(b(Ct),null,{default:U(()=>[(v(!0),C(W,null,X(a.value,(A,y)=>(v(),E(b(Vt),{class:"row",key:"chap"+y.toString()},{header:U(()=>[o("div",$i,[o("div",xi,[y>0?(v(),C("i",{key:0,class:"pi pi-arrow-up",style:{color:"var(--accent1)"},onClick:ke(I=>F(y),["stop"])},null,8,Ci)):M("",!0),y<a.value.length-1?(v(),C("i",{key:1,class:"pi pi-arrow-down",style:{color:"var(--accent1)"},onClick:ke(I=>Q(y),["stop"])},null,8,Vi)):M("",!0)]),o("h3",null,re(A.title.en),1),p(G,{onClick:ke(I=>{ne.value=!0,oe.value=y},["stop"]),class:"pi pi-trash",style:{color:"red","margin-left":"auto","margin-right":"0.5rem","font-size":"1.25rem"}},null,8,["onClick"])])]),default:U(()=>[o("div",Ii,[q[15]||(q[15]=o("span",null,"English Title",-1)),p(b(D),{modelValue:a.value[y].title.en,"onUpdate:modelValue":I=>a.value[y].title.en=I},null,8,["modelValue","onUpdate:modelValue"])]),o("div",Si,[q[16]||(q[16]=o("span",null,"Arabic Title",-1)),p(b(D),{modelValue:a.value[y].title.ar,"onUpdate:modelValue":I=>a.value[y].title.ar=I},null,8,["modelValue","onUpdate:modelValue"])]),q[17]||(q[17]=o("h3",null,"Materials",-1)),p(yt,{name:"swap",tag:"dev"},{default:U(()=>[(v(!0),C(W,null,X(a.value[y].materials,(I,j)=>(v(),C("li",{class:"row2 row",key:I},[o("div",Bi,[o("i",{class:"pi pi-arrow-up",style:{color:"var(--accent1)"},onClick:L=>P(y,j)},null,8,Di),o("i",{class:"pi pi-arrow-down",style:{color:"var(--accent1)"},onClick:L=>T(y,j)},null,8,Ai)]),o("div",Ti,[(v(!0),C(W,null,X(b($t),(L,Y)=>(v(),C("div",{key:"mask"+y.toString()+j.toString()+Y.toString()},[o("div",_i,[o("span",null,re(L.label),1),L.mask2?(v(),E(J(L.component),{key:"com"+y.toString()+j.toString()+Y.toString()+"a",disabled:L.disabled,modelValue:a.value[y].materials[j][L.mask1][L.mask2],"onUpdate:modelValue":Z=>a.value[y].materials[j][L.mask1][L.mask2]=Z},null,8,["disabled","modelValue","onUpdate:modelValue"])):(v(),E(J(L.component),{key:"com"+y.toString()+j.toString()+Y.toString()+"b",disabled:L.disabled,modelValue:a.value[y].materials[j][L.mask1],"onUpdate:modelValue":Z=>a.value[y].materials[j][L.mask1]=Z},null,8,["disabled","modelValue","onUpdate:modelValue"]))])]))),128)),o("div",zi,[p(b(O),{label:"Edit",onClick:L=>{m.value=I==null?void 0:I.Id,k.value=I==null?void 0:I.type,R.value=!0,B.value=y}},null,8,["onClick"]),p(b(O),{style:{"background-color":"red"},label:"delete",onClick:L=>{var Y,Z;return(Z=(Y=a.value[y])==null?void 0:Y.materials)==null?void 0:Z.splice(j,1)}},null,8,["onClick"])])])]))),128))]),_:2},1024),o("div",Pi,[p(b(O),{onClick:I=>{m.value="",k.value="",R.value=!0,B.value=y},label:"Add",style:{"margin-right":"2rem"}},null,8,["onClick"])])]),_:2},1024))),128))]),_:1}),o("div",Ei,[p(b(O),{label:"Add Chapter",onClick:g})])])]),_:1})]),_:1})]),_:1}),o("div",Li,[p(b(O),{onClick:H,label:"Save Changes"})])]),p(xt)],64)}}}),Ki=te(Ui,[["__scopeId","data-v-6722780e"]]);export{Ki as default};
