import{P as q}from"./ParentSidebar-0uaiqKEe.js";import{d as A,r as d,H as S,s as o,c as B,b as n,e as s,B as F,f as e,t as u,v as R,k as t,o as G,N as H,m as x,a3 as I,C as M,l as r,a4 as E,a5 as J,a6 as L,F as T,_ as W}from"./index-BXeycJi2.js";import{s as U}from"./dropdown.esm-BlEucCS_.js";import{s as j}from"./calendar.esm-BBLKb5vW.js";import"./index.esm-CaP1WQXJ.js";const z={class:"container"},K={class:"dialog-container"},O={style:{color:"var(--secondary)"}},Q={class:"big-wrapper"},X={class:"wrapper"},Y={class:"element"},Z={class:"element"},ee={class:"element"},le={class:"element"},ae={class:"element"},se={class:"element"},oe={class:"element"},te={class:"element"},ne={class:"element"},ue={class:"element"},de=A({__name:"addChild",setup(ie){const v=d(),c=d(),p=d(),m=d(),V=d(),_=d(),f=d(),b=d(),h=d(),g=d(),y=d(),k=d(!1),w=d([]);new S("get_all_program").callApi().then(i=>{var a;if(i!=null&&i.success)for(let l of(a=i==null?void 0:i.data)==null?void 0:a.program)w.value.push({label:o(l==null?void 0:l.title),code:l==null?void 0:l.id})});function D(){var i,a,l,N;if(!v.value||!c.value||!p.value||!m.value||!V.value||!_.value||!f.value||!g.value||!b.value||!h.value)y.value=o(t.dataMissing);else if(m.value!==V.value)y.value=o(t.diffPass);else{const P=new S("add_child");let $={user:{email:p.value,hashed_pass:m.value,user_type:"Child",first_name:v.value,last_name:c.value,gender:(i=_.value)==null?void 0:i.value,birth_day:f.value},child:{user_id:"",grade:(a=g.value)==null?void 0:a.value,child_group:(l=b.value)==null?void 0:l.code,education_system:(N=h.value)==null?void 0:N.value}};P.callApi($).then(C=>{C!=null&&C.success?k.value=!0:C.msg=="email is already used once"&&(y.value=o(t.emailTaken))})}}return(i,a)=>(G(),B(R,null,[n(H),s("div",z,[n(e(M),{modal:"",visible:k.value,"onUpdate:visible":a[1]||(a[1]=l=>k.value=l),pt:{root:"border-none",mask:{style:"backdrop-filter: blur(2px)"},header:{style:"display:none"}}},{default:F(()=>[s("div",K,[s("h3",null,u(e(o)(e(t).childAdded)),1),s("h3",null,u(e(o)(e(t).loginWith)),1),s("h3",O,u(p.value)+" Account",1),s("h3",null,u(e(o)(e(t).toStartJourney)),1),n(e(x),{label:e(o)(e(t).viewChild),onClick:a[0]||(a[0]=l=>e(I).push("/childrenCourses"))},null,8,["label"])])]),_:1},8,["visible","pt"]),n(q,{class:"sidebar",selected:"addChild"}),s("div",Q,[s("h2",null,u(y.value),1),s("div",X,[s("div",Y,[s("p",null,u(e(o)(e(t).firstName)),1),n(e(r),{modelValue:v.value,"onUpdate:modelValue":a[2]||(a[2]=l=>v.value=l)},null,8,["modelValue"])]),s("div",Z,[s("p",null,u(e(o)(e(t).lastName)),1),n(e(r),{modelValue:c.value,"onUpdate:modelValue":a[3]||(a[3]=l=>c.value=l)},null,8,["modelValue"])]),s("div",ee,[s("p",null,u(e(o)(e(t).email)),1),n(e(r),{modelValue:p.value,"onUpdate:modelValue":a[4]||(a[4]=l=>p.value=l)},null,8,["modelValue"])]),s("div",le,[s("p",null,u(e(o)(e(t).pass)),1),n(e(r),{modelValue:m.value,"onUpdate:modelValue":a[5]||(a[5]=l=>m.value=l)},null,8,["modelValue"])]),s("div",ae,[s("p",null,u(e(o)(e(t).confirmPass)),1),n(e(r),{modelValue:V.value,"onUpdate:modelValue":a[6]||(a[6]=l=>V.value=l)},null,8,["modelValue"])]),s("div",se,[s("p",null,u(e(o)(e(t).gender)),1),n(e(U),{modelValue:_.value,"onUpdate:modelValue":a[7]||(a[7]=l=>_.value=l),options:e(E),"option-label":"label"},null,8,["modelValue","options"])]),s("div",oe,[s("p",null,u(e(o)(e(t).birthDate)),1),n(e(j),{modelValue:f.value,"onUpdate:modelValue":a[8]||(a[8]=l=>f.value=l),showIcon:"",iconDisplay:"input"},null,8,["modelValue"])]),s("div",te,[s("p",null,u(e(o)(e(t).grade)),1),n(e(U),{modelValue:g.value,"onUpdate:modelValue":a[9]||(a[9]=l=>g.value=l),options:e(J),"option-label":"label","option-group-label":"label",optionGroupChildren:"items"},null,8,["modelValue","options"])]),s("div",ne,[s("p",null,u(e(o)(e(t).programs)),1),n(e(U),{modelValue:b.value,"onUpdate:modelValue":a[10]||(a[10]=l=>b.value=l),options:w.value,"option-label":"label"},null,8,["modelValue","options"])]),s("div",ue,[s("p",null,u(e(o)(e(t).educationSystem)),1),n(e(U),{modelValue:h.value,"onUpdate:modelValue":a[11]||(a[11]=l=>h.value=l),options:e(L),"option-label":"label"},null,8,["modelValue","options"])])]),n(e(x),{label:e(o)(e(t).addChild),onClick:D},null,8,["label"])])]),n(T)],64))}}),_e=W(de,[["__scopeId","data-v-f080a197"]]);export{_e as default};