import{A as W}from"./AdminSidebar-cAR6MbMK.js";import{d as X,r as C,H as c,c as g,b as m,w as Z,f as a,e as s,h as w,t as i,x as y,y as M,o as _,N as b,B as P,l as $,A as ee,s as d,k as v,v as H,g as L,F as te,p as se,m as ne,_ as le}from"./index-C9xH4jq0.js";import{s as ae}from"./inputtext.esm-DTwoKbZ_.js";const f=k=>(se("data-v-eea9653c"),k=k(),ne(),k),oe={class:"msg-wrapper"},ie={class:"add-comment"},re={class:"container"},ue={class:"wrapper"},ce=f(()=>s("h2",null,"Enrollment Requests",-1)),de={class:"table-container"},pe={class:"row head"},me=f(()=>s("i",{class:"pi pi-sort-alt"},null,-1)),_e=f(()=>s("i",{class:"pi pi-sort-alt"},null,-1)),ve=f(()=>s("i",{class:"pi pi-sort-alt"},null,-1)),fe=f(()=>s("i",{class:"pi pi-sort-alt"},null,-1)),he=f(()=>s("i",{class:"pi pi-sort-alt"},null,-1)),we=f(()=>s("i",{class:"pi pi-sort-alt"},null,-1)),Ce={class:"row"},ge={style:{display:"flex","flex-direction":"column",gap:"0.5rem","margin-block":"1rem"}},ke=X({__name:"manageRequests",setup(k){const o=C([]),q=new c("get_all_request_enrollment");async function S(){o.value=[],q.callApi().then(n=>{var t;if(n.success==!0)for(let e of(t=n==null?void 0:n.data)==null?void 0:t.requests)new c("personal_another_user_info").callApi({another_userId:e==null?void 0:e.parent_id}).then(u=>{new c("personal_another_user_info").callApi({another_userId:e==null?void 0:e.student_id}).then(E=>{E.success==!0&&new c("get_course").callApi({course_id:e==null?void 0:e.course_id}).then(p=>{var T,V,D,N,R,j,B,z,F;p.success==!0&&((F=o.value)==null||F.push({id:e==null?void 0:e.id,parentEmail:(V=(T=u==null?void 0:u.data)==null?void 0:T.info)==null?void 0:V.email,childEmail:(N=(D=E==null?void 0:E.data)==null?void 0:D.info)==null?void 0:N.email,courseTitle:(j=(R=p==null?void 0:p.data)==null?void 0:R.course)==null?void 0:j.title,date:O(e==null?void 0:e.created_at),time:U(e==null?void 0:e.created_at),status:e==null?void 0:e.status,price:(z=(B=p==null?void 0:p.data)==null?void 0:B.course)==null?void 0:z.price,comments:e==null?void 0:e.comments,course_id:e==null?void 0:e.course_id,student_id:e==null?void 0:e.student_id}),A.value="",o.value.sort((K,Q)=>K.id.localeCompare(Q.id)))})})})})}S();function O(n){const t=new Date(n),e=t.getFullYear(),l=(t.getMonth()+1).toString().padStart(2,"0"),u=t.getDate().toString().padStart(2,"0");return`${e}-${l}-${u}`}function U(n){const t=new Date(n),e=t.getHours().toString().padStart(2,"0"),l=t.getMinutes().toString().padStart(2,"0");return`${e}:${l}`}const I=C(!1),x=C(-1),A=C("");function Y(){let n={enrollment_request_id:o.value[x.value].id,msg:{msg:A.value}};new c("add_comment").callApi(n).then(e=>{e.success&&S()})}function G(n){const t=new c("edit_request_status");new c("create_enrollment").callApi({new_enrollment:{student_id:n.student_id,course_id:n.course_id,created_at:new Date().toISOString()}}).then(l=>{l.success&&t.callApi({new_status:"Success",enrollment_request_id:n.id}).then(u=>{u.success&&S()})})}function J(n){new c("edit_request_status").callApi({new_status:"Rejected",enrollment_request_id:n}).then(e=>{e.success&&S()})}const r=C(!1);function h(n){n=="price"?(o.value.sort((t,e)=>(t==null?void 0:t.price)-(e==null?void 0:e.price)),r.value&&o.value.reverse()):n=="parent"?(o.value.sort((t,e)=>{var l;return(l=t==null?void 0:t.parentEmail)==null?void 0:l.localeCompare(e==null?void 0:e.parentEmail)}),r.value&&o.value.reverse()):n=="title"?(o.value.sort((t,e)=>{var l;return(l=t==null?void 0:t.courseTitle)==null?void 0:l.localeCompare(e==null?void 0:e.courseTitle)}),r.value&&o.value.reverse()):n=="date"?(o.value.sort((t,e)=>{var l;return(l=t==null?void 0:t.date)==null?void 0:l.localeCompare(e==null?void 0:e.date)}),r.value&&o.value.reverse()):n=="time"?(o.value.sort((t,e)=>{var l;return(l=t==null?void 0:t.time)==null?void 0:l.localeCompare(e==null?void 0:e.time)}),r.value&&o.value.reverse()):n=="status"&&(o.value.sort((t,e)=>{var l;return(l=t==null?void 0:t.status)==null?void 0:l.localeCompare(e==null?void 0:e.status)}),r.value&&o.value.reverse()),r.value=!r.value}return(n,t)=>(_(),g(y,null,[m(b),m(a(ee),{visible:I.value,"onUpdate:visible":t[1]||(t[1]=e=>I.value=e),modal:"",header:"Request Comments",style:{width:"50vw"}},{default:Z(()=>[s("div",oe,[(_(!0),g(y,null,M(o.value[x.value].comments,e=>(_(),g("div",{class:P(["msg",{admin:(e==null?void 0:e.sender_type)=="Admin",parent:(e==null?void 0:e.sender_type)=="Parent"}])},i(e.msg),3))),256))]),s("div",ie,[m(a(ae),{modelValue:A.value,"onUpdate:modelValue":t[0]||(t[0]=e=>A.value=e)},null,8,["modelValue"]),m(a($),{label:"Add Comment",onClick:Y})])]),_:1},8,["visible"]),s("div",re,[m(W,{class:"sidebar",selected:"Manage Requests"}),s("div",ue,[ce,s("div",de,[s("div",pe,[s("h3",{onClick:t[2]||(t[2]=e=>h("parent"))},[w(i(a(d)(a(v).parentEmail))+" ",1),me]),s("h3",{onClick:t[3]||(t[3]=e=>h("child"))},[w(i(a(d)(a(v).childEmail))+" ",1),_e]),s("h3",{onClick:t[4]||(t[4]=e=>h("title"))},[w(i(a(d)(a(v).courseTitle))+" ",1),ve]),s("h3",{onClick:t[5]||(t[5]=e=>h("price"))},[w(i(a(d)(a(v).price))+" ",1),fe]),s("h3",{onClick:t[6]||(t[6]=e=>h("date"))},[w(i(a(d)(a(v).date))+" ",1),he]),s("h3",{onClick:t[7]||(t[7]=e=>h("status"))},[w(i(a(d)(a(v).status))+" ",1),we]),s("h3",null,i(a(d)(a(v).actions)),1)]),(_(!0),g(y,null,M(o.value,(e,l)=>(_(),g("div",Ce,[s("span",null,i(e.parentEmail),1),s("span",null,i(e.childEmail),1),s("span",null,i(a(d)(e.courseTitle)),1),s("span",null,i(e.price)+" L.E.",1),s("span",null,i(e.date),1),s("span",{class:P({pending:e.status=="Pending",rejected:e.status=="Rejected",accepted:e.status=="Success"})},i(e.status),3),s("span",ge,[m(a($),{onClick:u=>{x.value=l,I.value=!0},style:{"font-size":"0.7rem",width:"100%"},label:"Show Comments"},null,8,["onClick"]),e.status=="Pending"?(_(),H(a($),{key:0,onClick:()=>{G(e)},style:{"font-size":"0.7rem",width:"100%","background-color":"var(--correctAnswer)",color:"black"},label:"Accept"},null,8,["onClick"])):L("",!0),e.status=="Pending"?(_(),H(a($),{key:1,onClick:()=>{J(e.id)},style:{"font-size":"0.7rem",width:"100%","background-color":"var(--wrongAnswer)"},label:"Reject"},null,8,["onClick"])):L("",!0)])]))),256))])])]),m(te)],64))}}),xe=le(ke,[["__scopeId","data-v-eea9653c"]]);export{xe as default};