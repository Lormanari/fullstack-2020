(this.webpackJsonppart2=this.webpackJsonppart2||[]).push([[0],{15:function(e,n,t){e.exports=t(38)},20:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),u=t(14),c=t.n(u),l=t(4),o=t(2),i=(t(20),function(e){var n=e.query,t=e.changehandler;return r.a.createElement("p",null,"Filter shown with ",r.a.createElement("input",{value:n,onChange:t}))}),m=function(e){var n=e.addName,t=e.newName,a=e.handleNameChange,u=e.newNumber,c=e.handleNumberChange;return r.a.createElement("form",{onSubmit:n},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:t,onChange:a})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:u,onChange:c})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"Add")))},d=function(e){var n=e.person,t=e.deletePerson;return r.a.createElement("p",{className:"mt-0 mb-5"},n.name," ",n.number,r.a.createElement("button",{onClick:t},"delete"),r.a.createElement("br",null))},f=function(e){var n=e.filteredPersons,t=e.deletePerson;return r.a.createElement(r.a.Fragment,null,n.map((function(e){return r.a.createElement(d,{key:e.id,person:e,deletePerson:function(){return t(e.id,e.name)}})})))},s=function(e){var n=e.message;return null===n?null:r.a.createElement("div",{className:"message"},n)},h=function(e){var n=e.message;return null===n?null:r.a.createElement("div",{className:"error"},n)},b=t(3),p=t.n(b),E="/api/persons",v=function(){return p.a.get(E).then((function(e){return e.data}))},g=function(e){return p.a.post(E,e).then((function(e){return e.data}))},w=function(e){return p.a.delete("".concat(E,"/").concat(e)).then((function(e){return e}))},O=function(e,n){return p.a.put("".concat(E,"/").concat(e),n).then((function(e){return e.data}))},j=function(){var e=Object(a.useState)([]),n=Object(o.a)(e,2),t=n[0],u=n[1],c=Object(a.useState)(""),d=Object(o.a)(c,2),b=d[0],p=d[1],E=Object(a.useState)(""),j=Object(o.a)(E,2),N=j[0],C=j[1],y=Object(a.useState)(""),P=Object(o.a)(y,2),S=P[0],k=P[1],A=Object(a.useState)(null),T=Object(o.a)(A,2),q=T[0],x=T[1],F=Object(a.useState)(null),I=Object(o.a)(F,2),J=I[0],B=I[1];Object(a.useEffect)((function(){v().then((function(e){u(e)}))}),[]);var D=S.length?t.filter((function(e){return e.name.toLowerCase().indexOf(S)>=0})):t;return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(s,{message:J}),r.a.createElement(h,{message:q}),r.a.createElement(i,{query:S,changehandler:function(e){k(e.target.value)}}),r.a.createElement("h2",null,"Add a new"),r.a.createElement(m,{addName:function(e){e.preventDefault();var n={name:b,number:N},a=[];if(t.map((function(e){return a.push(e.name)})),a.includes(b)){if(!0===window.confirm("".concat(b," is already added to phonebook, replace the old number with a new one?"))){var r=t.find((function(e){return e.name===b})).id,c=t.find((function(e){return e.id===r})),o=Object(l.a)(Object(l.a)({},c),{},{number:N});O(r,o).then((function(e){u(t.map((function(n){return n.id!==r?n:e}))),B("".concat(e.name,"'s number is updated")),setTimeout((function(){B(null)}),5e3)})).catch((function(e){x("Information of '".concat(c.name,"' has already been removed from server")),setTimeout((function(){x(null)}),5e3),u(t.filter((function(e){return e.id!==r})))}))}}else g(n).then((function(e){u(t.concat(e)),B("Added ".concat(e.name)),setTimeout((function(){B(null)}),5e3)}));p(""),C("")},newName:b,handleNameChange:function(e){p(e.target.value)},newNumber:N,handleNumberChange:function(e){C(e.target.value)}}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(f,{filteredPersons:D,deletePerson:function(e,n){!0===window.confirm("delete ".concat(n,"?"))&&w(e).then((function(){u(t.filter((function(n){return n.id!==e})))}))}}))};c.a.render(r.a.createElement(j,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.3e83d88e.chunk.js.map