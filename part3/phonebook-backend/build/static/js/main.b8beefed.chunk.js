(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{41:function(e,t,n){},42:function(e,t,n){"use strict";n.r(t);var r=n(0),c=n(2),o=n(18),a=n.n(o),s=n(9),u=n(8),i=n(3),d=n(4),b=n.n(d),j="/api/persons";b.a.defaults.validateStatus=function(e){return e>=200&&e<300};var f={getAll:function(){return b.a.get(j).then((function(e){return e.data}))},create:function(e){return b.a.post(j,e).then((function(e){return e.data}))},update:function(e,t){return b.a.put("".concat(j,"/").concat(e),t).then((function(e){return e.data}))},remove:function(e){return b.a.delete("".concat(j,"/").concat(e))}},l=(n(41),function(e){var t=e.handleAddContact,n=e.newName,c=e.newNumber,o=e.setNewName,a=e.setNewNumber;return Object(r.jsxs)("form",{onSubmit:t,children:[Object(r.jsxs)("div",{children:["name:"," ",Object(r.jsx)("input",{value:n,onChange:function(e){return o(e.target.value)}}),Object(r.jsx)("br",{}),"number:"," ",Object(r.jsx)("input",{type:"tel",value:c,onChange:function(e){return a(e.target.value)}})]}),Object(r.jsx)("div",{children:Object(r.jsx)("button",{type:"submit",children:"add"})})]})}),m=function(e){var t=e.person,n=t.id,c=t.name,o=t.number,a=e.removePerson;return Object(r.jsxs)("p",{children:[c," ",o,Object(r.jsx)("button",{onClick:function(){a(n,c)},children:"delete"})]})},p=function(e){var t=e.query,n=e.setQuery,c=e.persons,o=e.removePerson;return Object(r.jsxs)("div",{children:["filter shown with:"," ",Object(r.jsx)("input",{value:t,onChange:function(e){return n(e.target.value)}}),t?Object(r.jsx)("div",{children:c.map((function(e){return e.name.toLowerCase().includes(t.toLowerCase())?Object(r.jsx)(m,{person:e,removePerson:o},e.id):null}))}):null]})},h=function(e){var t=e.persons,n=e.removePerson;return Object(r.jsx)("div",{children:t.map((function(e){return Object(r.jsx)(m,{person:e,removePerson:n},e.id)}))})},v=function(e){var t=e.toast;return Object(r.jsx)("div",{className:"toast ".concat(t.type),children:t.message})},O=function(){var e=Object(c.useState)([]),t=Object(i.a)(e,2),n=t[0],o=t[1],a=Object(c.useState)(""),d=Object(i.a)(a,2),b=d[0],j=d[1],m=Object(c.useState)(""),O=Object(i.a)(m,2),w=O[0],x=O[1],g=Object(c.useState)(""),y=Object(i.a)(g,2),N=y[0],C=y[1],P=Object(c.useState)([]),S=Object(i.a)(P,2),k=S[0],L=S[1],A=Object(c.useState)(0),q=Object(i.a)(A,2),D=q[0],E=q[1];Object(c.useEffect)((function(){f.getAll().then((function(e){return o(e)}))}),[]);var J=function(e,t){var n=D+1;E(n),L([].concat(Object(u.a)(k),[Object(s.a)(Object(s.a)({},e),{},{id:n})])),setTimeout((function(){L((function(e){return e.filter((function(e){return e.id!==n}))}))}),t)},Q=function(e,t){window.confirm("Delete ".concat(t))&&f.remove(e).then((function(){o(n.filter((function(t){return t.id!==e}))),J({visible:!0,message:"Removed '".concat(t,"'"),type:"danger"},5e3)}))};return Object(r.jsxs)("div",{children:[Object(r.jsx)("h2",{children:"Phonebook"}),k.map((function(e){return Object(r.jsx)(v,{toast:e},e.id)})),Object(r.jsx)(p,{query:N,setQuery:C,persons:n,removePerson:Q}),Object(r.jsx)("h2",{children:"add a new"}),Object(r.jsx)(l,{handleAddContact:function(e){if(e.preventDefault(),n.some((function(e){return e.name.toLowerCase()===b.toLowerCase()}))){if(window.confirm("".concat(b," is already added to phonebook, replace the old number with a new one?"))){var t=n.find((function(e){return e.name.toLowerCase()===b.toLowerCase()})).id;f.update(t,{id:t,name:b,number:w}).then((function(e){o(n.map((function(t){return t.id!==e.id?t:e}))),J({visible:!0,message:"Updated '".concat(e.name,"'"),type:"success"},5e3),x(""),j("")})).catch((function(e){"404"===e.response.status&&o(n.filter((function(e){return e.id!==t}))),J({visible:!0,message:e.response.data.error,type:"danger"},5e3)}))}}else{var r={name:b,number:w};f.create(r).then((function(e){o([].concat(Object(u.a)(n),[e])),J({visible:!0,message:"Added '".concat(e.name,"'"),type:"success"},5e3),j(""),x("")})).catch((function(e){J({visible:!0,message:e.response.data.error,type:"danger"},5e3)}))}},newName:b,newNumber:w,setNewName:j,setNewNumber:x}),Object(r.jsx)("h2",{children:"Numbers"}),Object(r.jsx)(h,{persons:n,removePerson:Q})]})};a.a.render(Object(r.jsx)(O,{}),document.getElementById("root"))}},[[42,1,2]]]);
//# sourceMappingURL=main.b8beefed.chunk.js.map