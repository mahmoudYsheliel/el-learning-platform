import{B as v,A as c,T as g,o as i,G as s,C as h,a0 as k,a1 as u,e as B,y as p,as as D,g as A,ar as H,z as f,V as N,U as y,aD as F,P as _,aq as C,X as E,Z as U,$ as j,Y as L,j as m,c as P,w as O,x as z,b as T,t as V}from"./index-BsXmYjyP.js";var R={root:"p-accordioncontent",content:"p-accordioncontent-content"},q=v.extend({name:"accordioncontent",classes:R}),G={name:"BaseAccordionContent",extends:g,props:{as:{type:[String,Object],default:"DIV"},asChild:{type:Boolean,default:!1}},style:q,provide:function(){return{$pcAccordionContent:this,$parentInstance:this}}},I={name:"AccordionContent",extends:G,inheritAttrs:!1,inject:["$pcAccordion","$pcAccordionPanel"],computed:{id:function(){return"".concat(this.$pcAccordion.id,"_accordioncontent_").concat(this.$pcAccordionPanel.value)},ariaLabelledby:function(){return"".concat(this.$pcAccordion.id,"_accordionheader_").concat(this.$pcAccordionPanel.value)},attrs:function(){return c(this.a11yAttrs,this.ptmi("root",this.ptParams))},a11yAttrs:function(){return{id:this.id,role:"region","aria-labelledby":this.ariaLabelledby,"data-pc-name":"accordioncontent","data-p-active":this.$pcAccordionPanel.active}},ptParams:function(){return{context:{active:this.$pcAccordionPanel.active}}}}};function M(e,n,t,r,d,a){return e.asChild?p(e.$slots,"default",{key:1,class:f(e.cx("root")),active:a.$pcAccordionPanel.active,a11yAttrs:a.a11yAttrs}):(i(),s(H,c({key:0,name:"p-toggleable-content"},e.ptm("transition",a.ptParams)),{default:h(function(){return[!a.$pcAccordion.lazy||a.$pcAccordionPanel.active?k((i(),s(u(e.as),c({key:0,class:e.cx("root")},a.attrs),{default:h(function(){return[B("div",c({class:e.cx("content")},e.ptm("content",a.ptParams)),[p(e.$slots,"default")],16)]}),_:3},16,["class"])),[[D,a.$pcAccordion.lazy?!0:a.$pcAccordionPanel.active]]):A("",!0)]}),_:3},16))}I.render=M;var X={root:"p-accordionheader",toggleicon:"p-accordionheader-toggle-icon"},Y=v.extend({name:"accordionheader",classes:X}),Z={name:"BaseAccordionHeader",extends:g,props:{as:{type:[String,Object],default:"BUTTON"},asChild:{type:Boolean,default:!1}},style:Y,provide:function(){return{$pcAccordionHeader:this,$parentInstance:this}}},w={name:"AccordionHeader",extends:Z,inheritAttrs:!1,inject:["$pcAccordion","$pcAccordionPanel"],methods:{onFocus:function(){this.$pcAccordion.selectOnFocus&&this.changeActiveValue()},onClick:function(){this.changeActiveValue()},onKeydown:function(n){switch(n.code){case"ArrowDown":this.onArrowDownKey(n);break;case"ArrowUp":this.onArrowUpKey(n);break;case"Home":this.onHomeKey(n);break;case"End":this.onEndKey(n);break;case"Enter":case"NumpadEnter":case"Space":this.onEnterKey(n);break}},onArrowDownKey:function(n){var t=this.findNextPanel(this.findPanel(n.currentTarget));t?this.changeFocusedPanel(n,t):this.onHomeKey(n),n.preventDefault()},onArrowUpKey:function(n){var t=this.findPrevPanel(this.findPanel(n.currentTarget));t?this.changeFocusedPanel(n,t):this.onEndKey(n),n.preventDefault()},onHomeKey:function(n){var t=this.findFirstPanel();this.changeFocusedPanel(n,t),n.preventDefault()},onEndKey:function(n){var t=this.findLastPanel();this.changeFocusedPanel(n,t),n.preventDefault()},onEnterKey:function(n){this.changeActiveValue(),n.preventDefault()},findPanel:function(n){return n==null?void 0:n.closest('[data-pc-name="accordionpanel"]')},findHeader:function(n){return N(n,'[data-pc-name="accordionheader"]')},findNextPanel:function(n){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,r=t?n:n.nextElementSibling;return r?y(r,"data-p-disabled")?this.findNextPanel(r):this.findHeader(r):null},findPrevPanel:function(n){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,r=t?n:n.previousElementSibling;return r?y(r,"data-p-disabled")?this.findPrevPanel(r):this.findHeader(r):null},findFirstPanel:function(){return this.findNextPanel(this.$pcAccordion.$el.firstElementChild,!0)},findLastPanel:function(){return this.findPrevPanel(this.$pcAccordion.$el.lastElementChild,!0)},changeActiveValue:function(){this.$pcAccordion.updateValue(this.$pcAccordionPanel.value)},changeFocusedPanel:function(n,t){F(this.findHeader(t))}},computed:{id:function(){return"".concat(this.$pcAccordion.id,"_accordionheader_").concat(this.$pcAccordionPanel.value)},ariaControls:function(){return"".concat(this.$pcAccordion.id,"_accordioncontent_").concat(this.$pcAccordionPanel.value)},attrs:function(){return c(this.asAttrs,this.a11yAttrs,this.ptmi("root",this.ptParams))},asAttrs:function(){return this.as==="BUTTON"?{type:"button",disabled:this.$pcAccordionPanel.disabled}:void 0},a11yAttrs:function(){return{id:this.id,tabindex:this.$pcAccordion.tabindex,"aria-expanded":this.$pcAccordionPanel.active,"aria-controls":this.ariaControls,"data-pc-name":"accordionheader","data-p-disabled":this.$pcAccordionPanel.disabled,"data-p-active":this.$pcAccordionPanel.active,onFocus:this.onFocus,onKeydown:this.onKeydown}},ptParams:function(){return{context:{active:this.$pcAccordionPanel.active}}},dataP:function(){return _({active:this.$pcAccordionPanel.active})}},components:{ChevronUpIcon:C,ChevronDownIcon:E},directives:{ripple:U}};function J(e,n,t,r,d,a){var b=j("ripple");return e.asChild?p(e.$slots,"default",{key:1,class:f(e.cx("root")),active:a.$pcAccordionPanel.active,a11yAttrs:a.a11yAttrs,onClick:a.onClick}):k((i(),s(u(e.as),c({key:0,"data-p":a.dataP,class:e.cx("root"),onClick:a.onClick},a.attrs),{default:h(function(){return[p(e.$slots,"default",{active:a.$pcAccordionPanel.active}),p(e.$slots,"toggleicon",{active:a.$pcAccordionPanel.active,class:f(e.cx("toggleicon"))},function(){return[a.$pcAccordionPanel.active?(i(),s(u(a.$pcAccordion.$slots.collapseicon?a.$pcAccordion.$slots.collapseicon:a.$pcAccordion.collapseIcon?"span":"ChevronUpIcon"),c({key:0,class:[a.$pcAccordion.collapseIcon,e.cx("toggleicon")],"aria-hidden":"true"},e.ptm("toggleicon",a.ptParams)),null,16,["class"])):(i(),s(u(a.$pcAccordion.$slots.expandicon?a.$pcAccordion.$slots.expandicon:a.$pcAccordion.expandIcon?"span":"ChevronDownIcon"),c({key:1,class:[a.$pcAccordion.expandIcon,e.cx("toggleicon")],"aria-hidden":"true"},e.ptm("toggleicon",a.ptParams)),null,16,["class"]))]})]}),_:3},16,["data-p","class","onClick"])),[[b]])}w.render=J;var Q={root:function(n){var t=n.instance,r=n.props;return["p-accordionpanel",{"p-accordionpanel-active":t.active,"p-disabled":r.disabled}]}},W=v.extend({name:"accordionpanel",classes:Q}),ee={name:"BaseAccordionPanel",extends:g,props:{value:{type:[String,Number],default:void 0},disabled:{type:Boolean,default:!1},as:{type:[String,Object],default:"DIV"},asChild:{type:Boolean,default:!1}},style:W,provide:function(){return{$pcAccordionPanel:this,$parentInstance:this}}},x={name:"AccordionPanel",extends:ee,inheritAttrs:!1,inject:["$pcAccordion"],computed:{active:function(){return this.$pcAccordion.isItemActive(this.value)},attrs:function(){return c(this.a11yAttrs,this.ptmi("root",this.ptParams))},a11yAttrs:function(){return{"data-pc-name":"accordionpanel","data-p-disabled":this.disabled,"data-p-active":this.active}},ptParams:function(){return{context:{active:this.active}}}}};function ne(e,n,t,r,d,a){return e.asChild?p(e.$slots,"default",{key:1,class:f(e.cx("root")),active:a.active,a11yAttrs:a.a11yAttrs}):(i(),s(u(e.as),c({key:0,class:e.cx("root")},a.attrs),{default:h(function(){return[p(e.$slots,"default")]}),_:3},16,["class"]))}x.render=ne;var ae=({dt:e})=>`
.p-accordionpanel {
    display: flex;
    flex-direction: column;
    border-style: solid;
    border-width: ${e("accordion.panel.border.width")};
    border-color: ${e("accordion.panel.border.color")};
}

.p-accordionheader {
    all: unset;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${e("accordion.header.padding")};
    color: ${e("accordion.header.color")};
    background: ${e("accordion.header.background")};
    border-style: solid;
    border-width: ${e("accordion.header.border.width")};
    border-color: ${e("accordion.header.border.color")};
    font-weight: ${e("accordion.header.font.weight")};
    border-radius: ${e("accordion.header.border.radius")};
    transition: background ${e("accordion.transition.duration")}, color ${e("accordion.transition.duration")}, outline-color ${e("accordion.transition.duration")}, box-shadow ${e("accordion.transition.duration")};
    outline-color: transparent;
}

.p-accordionpanel:first-child > .p-accordionheader {
    border-width: ${e("accordion.header.first.border.width")};
    border-start-start-radius: ${e("accordion.header.first.top.border.radius")};
    border-start-end-radius: ${e("accordion.header.first.top.border.radius")};
}

.p-accordionpanel:last-child > .p-accordionheader {
    border-end-start-radius: ${e("accordion.header.last.bottom.border.radius")};
    border-end-end-radius: ${e("accordion.header.last.bottom.border.radius")};
}

.p-accordionpanel:last-child.p-accordionpanel-active > .p-accordionheader {
    border-end-start-radius: ${e("accordion.header.last.active.bottom.border.radius")};
    border-end-end-radius: ${e("accordion.header.last.active.bottom.border.radius")};
}

.p-accordionheader-toggle-icon {
    color: ${e("accordion.header.toggle.icon.color")};
}

.p-accordionpanel:not(.p-disabled) .p-accordionheader:focus-visible {
    box-shadow: ${e("accordion.header.focus.ring.shadow")};
    outline: ${e("accordion.header.focus.ring.width")} ${e("accordion.header.focus.ring.style")} ${e("accordion.header.focus.ring.color")};
    outline-offset: ${e("accordion.header.focus.ring.offset")};
}

.p-accordionpanel:not(.p-accordionpanel-active):not(.p-disabled) > .p-accordionheader:hover {
    background: ${e("accordion.header.hover.background")};
    color: ${e("accordion.header.hover.color")};
}

.p-accordionpanel:not(.p-accordionpanel-active):not(.p-disabled) .p-accordionheader:hover .p-accordionheader-toggle-icon {
    color: ${e("accordion.header.toggle.icon.hover.color")};
}

.p-accordionpanel:not(.p-disabled).p-accordionpanel-active > .p-accordionheader {
    background: ${e("accordion.header.active.background")};
    color: ${e("accordion.header.active.color")};
}

.p-accordionpanel:not(.p-disabled).p-accordionpanel-active > .p-accordionheader .p-accordionheader-toggle-icon {
    color: ${e("accordion.header.toggle.icon.active.color")};
}

.p-accordionpanel:not(.p-disabled).p-accordionpanel-active > .p-accordionheader:hover {
    background: ${e("accordion.header.active.hover.background")};
    color: ${e("accordion.header.active.hover.color")};
}

.p-accordionpanel:not(.p-disabled).p-accordionpanel-active > .p-accordionheader:hover .p-accordionheader-toggle-icon {
    color: ${e("accordion.header.toggle.icon.active.hover.color")};
}

.p-accordioncontent-content {
    border-style: solid;
    border-width: ${e("accordion.content.border.width")};
    border-color: ${e("accordion.content.border.color")};
    background-color: ${e("accordion.content.background")};
    color: ${e("accordion.content.color")};
    padding: ${e("accordion.content.padding")};
}
`,te={root:"p-accordion p-component"},re=v.extend({name:"accordion",style:ae,classes:te}),oe={name:"BaseAccordion",extends:g,props:{value:{type:[String,Number,Array],default:void 0},multiple:{type:Boolean,default:!1},lazy:{type:Boolean,default:!1},tabindex:{type:Number,default:0},selectOnFocus:{type:Boolean,default:!1},expandIcon:{type:String,default:void 0},collapseIcon:{type:String,default:void 0},activeIndex:{type:[Number,Array],default:null}},style:re,provide:function(){return{$pcAccordion:this,$parentInstance:this}}},ce={name:"Accordion",extends:oe,inheritAttrs:!1,emits:["update:value","update:activeIndex","tab-open","tab-close","tab-click"],data:function(){return{d_value:this.value}},watch:{value:function(n){this.d_value=n},activeIndex:{immediate:!0,handler:function(n){this.hasAccordionTab&&(this.d_value=this.multiple?n==null?void 0:n.map(String):n==null?void 0:n.toString())}}},methods:{isItemActive:function(n){var t;return this.multiple?(t=this.d_value)===null||t===void 0?void 0:t.includes(n):this.d_value===n},updateValue:function(n){var t,r=this.isItemActive(n);this.multiple?r?this.d_value=this.d_value.filter(function(d){return d!==n}):this.d_value?this.d_value.push(n):this.d_value=[n]:this.d_value=r?null:n,this.$emit("update:value",this.d_value),this.$emit("update:activeIndex",this.multiple?(t=this.d_value)===null||t===void 0?void 0:t.map(Number):Number(this.d_value)),this.$emit(r?"tab-close":"tab-open",{originalEvent:void 0,index:Number(n)})},isAccordionTab:function(n){return n.type.name==="AccordionTab"},getTabProp:function(n,t){return n.props?n.props[t]:void 0},getKey:function(n,t){return this.getTabProp(n,"header")||t},getHeaderPT:function(n,t){var r=this;return{root:c({onClick:function(a){return r.onTabClick(a,t)}},this.getTabProp(n,"headerProps"),this.getTabPT(n,"header",t)),toggleicon:c(this.getTabProp(n,"headeractionprops"),this.getTabPT(n,"headeraction",t))}},getContentPT:function(n,t){return{root:c(this.getTabProp(n,"contentProps"),this.getTabPT(n,"toggleablecontent",t)),transition:this.getTabPT(n,"transition",t),content:this.getTabPT(n,"content",t)}},getTabPT:function(n,t,r){var d=this.tabs.length,a={props:n.props||{},parent:{instance:this,props:this.$props,state:this.$data},context:{index:r,count:d,first:r===0,last:r===d-1,active:this.isItemActive("".concat(r))}};return c(this.ptm("accordiontab.".concat(t),a),this.ptmo(this.getTabProp(n,"pt"),t,a))},onTabClick:function(n,t){this.$emit("tab-click",{originalEvent:n,index:t})}},computed:{tabs:function(){var n=this;return this.$slots.default().reduce(function(t,r){return n.isAccordionTab(r)?t.push(r):r.children&&r.children instanceof Array&&r.children.forEach(function(d){n.isAccordionTab(d)&&t.push(d)}),t},[])},hasAccordionTab:function(){return this.tabs.length}},components:{AccordionPanel:x,AccordionHeader:w,AccordionContent:I,ChevronUpIcon:C,ChevronRightIcon:L}};function ie(e,n,t,r,d,a){var b=m("AccordionHeader"),K=m("AccordionContent"),S=m("AccordionPanel");return i(),P("div",c({class:e.cx("root")},e.ptmi("root")),[a.hasAccordionTab?(i(!0),P(O,{key:0},z(a.tabs,function(o,l){return i(),s(S,{key:a.getKey(o,l),value:"".concat(l),pt:{root:a.getTabPT(o,"root",l)},disabled:a.getTabProp(o,"disabled")},{default:h(function(){return[T(b,{class:f(a.getTabProp(o,"headerClass")),pt:a.getHeaderPT(o,l)},{toggleicon:h(function($){return[$.active?(i(),s(u(e.$slots.collapseicon?e.$slots.collapseicon:e.collapseIcon?"span":"ChevronDownIcon"),c({key:0,class:[e.collapseIcon,$.class],"aria-hidden":"true",ref_for:!0},a.getTabPT(o,"headericon",l)),null,16,["class"])):(i(),s(u(e.$slots.expandicon?e.$slots.expandicon:e.expandIcon?"span":"ChevronUpIcon"),c({key:1,class:[e.expandIcon,$.class],"aria-hidden":"true",ref_for:!0},a.getTabPT(o,"headericon",l)),null,16,["class"]))]}),default:h(function(){return[o.children&&o.children.headericon?(i(),s(u(o.children.headericon),{key:0,isTabActive:a.isItemActive("".concat(l)),active:a.isItemActive("".concat(l)),index:l},null,8,["isTabActive","active","index"])):A("",!0),o.props&&o.props.header?(i(),P("span",c({key:1,ref_for:!0},a.getTabPT(o,"headertitle",l)),V(o.props.header),17)):A("",!0),o.children&&o.children.header?(i(),s(u(o.children.header),{key:2})):A("",!0)]}),_:2},1032,["class","pt"]),T(K,{pt:a.getContentPT(o,l)},{default:h(function(){return[(i(),s(u(o)))]}),_:2},1032,["pt"])]}),_:2},1032,["value","pt","disabled"])}),128)):p(e.$slots,"default",{key:1})],16)}ce.render=ie;var de=v.extend({name:"accordiontab"}),se={name:"BaseAccordionTab",extends:g,props:{header:null,headerStyle:null,headerClass:null,headerProps:null,headerActionProps:null,contentStyle:null,contentClass:null,contentProps:null,disabled:Boolean},style:de,provide:function(){return{$pcAccordionTab:this,$parentInstance:this}}},le={name:"AccordionTab",extends:se,inheritAttrs:!1,mounted:function(){console.warn("Deprecated since v4. Use the new structure of Accordion instead.")}};function ue(e,n,t,r,d,a){return p(e.$slots,"default")}le.render=ue;export{ce as a,le as s};
