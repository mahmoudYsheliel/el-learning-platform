import{C as w}from"./ChildSidebar-B91454IC.js";import{d as R,i as x,r as h,H as v,o as t,c as n,e,t as g,f as r,s as i,b as d,k as C,l as N,_ as q,x as m,y as I,N as B,v as V,g as $,F as b}from"./index-CF0mUiIM.js";const y={class:"container"},A=["src"],F=R({__name:"ChildCourseCard",props:["programId"],setup(f){const u=f,o=x(),c=h();return new v("get_course").callApi({course_id:u.programId}).then(s=>c.value=s.data.course),(s,p)=>{var a,l;return t(),n("main",null,[e("div",y,[e("img",{src:(a=c.value)==null?void 0:a.image,alt:""},null,8,A),e("h2",null,g(r(i)((l=c.value)==null?void 0:l.title)),1),d(r(N),{onClick:p[0]||(p[0]=()=>{r(o).push(`/ViewCourseDetails/${u.programId}`)}),label:r(i)(r(C).learnMore)},null,8,["label"])])])}}}),k=q(F,[["__scopeId","data-v-88c31ba0"]]),D={class:"container"},E={class:"wrapper"},H={class:"courses"},L={class:"child-courses"},M={class:"enrolled-courses"},S={class:"course-container"},z={class:"availavle-courses"},G={class:"unenrolled-courses"},J={class:"course-container"},K=R({__name:"childCourses",setup(f){const u=new v("get_enrollments"),o=h();u.callApi().then(s=>{s.data.enrollments&&(o.value=s.data.enrollments)});const c=new v("get_courses"),_=h([]);return c.callApi().then(s=>{s.data.courses&&(_.value=s.data.courses)}),(s,p)=>(t(),n(m,null,[d(B),e("div",D,[d(w,{class:"sidebar",selected:"home"}),e("div",E,[e("div",H,[e("div",L,[e("h1",null,g(r(i)(r(C).enrolledCourses)),1),e("div",M,[(t(!0),n(m,null,I(o.value,a=>(t(),n("div",S,[d(k,{class:"card",programId:a.course_id},null,8,["programId"])]))),256))])]),e("div",z,[e("h1",null,g(r(i)(r(C).canEnroll)),1),e("div",G,[(t(!0),n(m,null,I(_.value,a=>(t(),n("div",J,[!o.value||!o.value.some(l=>(l==null?void 0:l.course_id)==(a==null?void 0:a.id))?(t(),V(k,{key:0,class:"card",programId:a.id},null,8,["programId"])):$("",!0)]))),256))])])])])]),d(b)],64))}}),Q=q(K,[["__scopeId","data-v-00838471"]]);export{Q as default};