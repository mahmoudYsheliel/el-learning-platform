import{d as x,r as A,H as r,c as f,e as u,b as V,f as h,t as g,g as B,i as N,A as $,a as D,o as v,s as k,k as b,m as H,_ as L}from"./index-RyIBfkET.js";import{s as j}from"./dropdown.esm-CgzyU7Lp.js";const E={class:"container"},M={key:0,class:"selectedChildInfo"},O={class:"info"},P={class:"childImage"},U=["src"],z={key:1,class:"pi pi-user"},F={class:"childInfo"},G={style:{color:"var(--accent1)",margin:"0","line-height":"2rem","padding-top":"0.5rem"}},J={style:{color:"var(--text)",margin:"0","line-height":"0.75rem"}},K=x({__name:"SelectChild",emits:["selectedChild"],setup(Q){const w=A([]),a=A(null);new r("get_all_program").callApi().then(s=>{var t;const e=(t=s==null?void 0:s.data)==null?void 0:t.program;new r("personal_info").callApi().then(o=>{var c,d,l,i;if((d=(c=o==null?void 0:o.data)==null?void 0:c.info)!=null&&d.children)for(let n of(i=(l=o==null?void 0:o.data)==null?void 0:l.info)==null?void 0:i.children)new r("personal_another_user_info").callApi({another_userId:n}).then(p=>{var R,q,I,y;if((R=p==null?void 0:p.data)!=null&&R.info){let _=(q=p==null?void 0:p.data)==null?void 0:q.info;_.id=n,_.child_group_image=(I=e.find(C=>C.id==_.child_group))==null?void 0:I.image,_.child_group=(y=e.find(C=>C.id==_.child_group))==null?void 0:y.title,w.value.push(_)}})})});const S=N();function T(s){const e=$();new r("switch_to_child").callApi({child_id:s}).then(t=>{var o;if(t!=null&&t.success){e.logout(),e.addToken((o=t==null?void 0:t.data)==null?void 0:o.access_token);const c=new r("personal_info"),d=D();c.callApi().then(l=>{var i,n;l!=null&&l.success&&(d.addInfo({userType:(n=(i=l==null?void 0:l.data)==null?void 0:i.info)==null?void 0:n.user_type,notifications:[]}),S.push("/"))})}})}return(s,e)=>{var m,t,o,c,d,l;return v(),f("main",null,[u("div",E,[V(h(j),{onChange:e[0]||(e[0]=i=>{var n;return s.$emit("selectedChild",(n=a.value)==null?void 0:n.id)}),modelValue:a.value,"onUpdate:modelValue":e[1]||(e[1]=i=>a.value=i),options:w.value,optionLabel:"email",placeholder:h(k)(h(b).selectChild),class:"dropDown"},null,8,["modelValue","options","placeholder"]),a.value?(v(),f("div",M,[u("div",O,[u("div",P,[((m=a.value)==null?void 0:m.image)!=""?(v(),f("img",{key:0,src:(t=a.value)==null?void 0:t.image,alt:""},null,8,U)):(v(),f("i",z))]),u("div",F,[u("h2",G,g((o=a.value)==null?void 0:o.first_name)+" "+g((c=a.value)==null?void 0:c.last_name),1),u("p",J,g((d=a.value)==null?void 0:d.email),1),u("h3",null,g(h(k)((l=a.value)==null?void 0:l.child_group)),1)])]),V(h(H),{label:h(k)(h(b).switchToChild),onClick:e[2]||(e[2]=()=>{T(a.value.id)})},null,8,["label"])])):B("",!0)])])}}}),ee=L(K,[["__scopeId","data-v-03ad187a"]]);export{ee as S};