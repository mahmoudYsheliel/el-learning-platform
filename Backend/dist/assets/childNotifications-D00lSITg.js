import{C as p}from"./ChildSidebar-BN99AEXE.js";import{d as f,a as h,c as o,b as c,e as a,t,f as s,x as d,y as m,i as y,o as l,N as b,s as i,k as n,B as v,v as g,l as k,g as C,F as N,_ as w}from"./index-C9xH4jq0.js";const z={class:"container"},B={class:"wrapper"},x={class:"requests"},I={class:"table-container"},q={class:"row head"},F={class:"row"},V=f({__name:"childNotifications",setup(L){const u=y(),_=h();return(S,$)=>{var r;return l(),o(d,null,[c(b),a("div",z,[c(p,{class:"sidebar",selected:"notifications"}),a("div",B,[a("div",x,[a("h2",null,t(s(i)(s(n).notifications)),1),a("div",I,[a("div",q,[a("h3",null,t(s(i)(s(n).title)),1),a("h3",null,t(s(i)(s(n).type)),1),a("h3",null,t(s(i)(s(n).status)),1),a("h3",null,t(s(i)(s(n).actions)),1)]),(l(!0),o(d,null,m((r=s(_).getInfo)==null?void 0:r.notifications,(e,D)=>(l(),o("div",F,[a("span",null,t(s(i)(e.title)),1),a("span",null,t(e.type),1),a("span",{class:v({waiting:e.status=="waiting",done:e.status=="done"})},t(e==null?void 0:e.status),3),a("span",null,[e.type=="analysis quiz"?(l(),g(s(k),{key:0,onClick:E=>s(u).push(`/analysisQuiz/${e.analysis_quiz_id}`),disabled:e.status=="done",style:{"font-size":"0.75rem"},label:s(i)(s(n).startTest)},null,8,["onClick","disabled","label"])):C("",!0)])]))),256))])])])]),c(N)],64)}}}),Q=w(V,[["__scopeId","data-v-da460d2d"]]);export{Q as default};