import{C as p}from"./ChildSidebar-B8wIcYy9.js";import{d as f,a as h,c as o,b as c,e as a,t,f as s,q as d,v as m,i as y,o as l,N as b,s as i,k as n,C as v,y as C,l as g,g as k,F as N,_ as w}from"./index-vIkyQCYi.js";const z={class:"container"},q={class:"wrapper"},B={class:"requests"},I={class:"table-container"},x={class:"row head"},F={class:"row"},V=f({__name:"childNotifications",setup(L){const u=y(),_=h();return(S,$)=>{var r;return l(),o(d,null,[c(b),a("div",z,[c(p,{class:"sidebar",selected:"notifications"}),a("div",q,[a("div",B,[a("h2",null,t(s(i)(s(n).notifications)),1),a("div",I,[a("div",x,[a("h3",null,t(s(i)(s(n).title)),1),a("h3",null,t(s(i)(s(n).type)),1),a("h3",null,t(s(i)(s(n).status)),1),a("h3",null,t(s(i)(s(n).actions)),1)]),(l(!0),o(d,null,m((r=s(_).getInfo)==null?void 0:r.notifications,(e,D)=>(l(),o("div",F,[a("span",null,t(s(i)(e.title)),1),a("span",null,t(e.type),1),a("span",{class:v({waiting:e.status=="waiting",done:e.status=="done"})},t(e==null?void 0:e.status),3),a("span",null,[e.type=="analysis quiz"?(l(),C(s(g),{key:0,onClick:E=>s(u).push(`/analysisQuiz/${e.analysis_quiz_id}`),disabled:e.status=="done",style:{"font-size":"0.75rem"},label:s(i)(s(n).startTest)},null,8,["onClick","disabled","label"])):k("",!0)])]))),256))])])])]),c(N)],64)}}}),Q=w(V,[["__scopeId","data-v-da460d2d"]]);export{Q as default};