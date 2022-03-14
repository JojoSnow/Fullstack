(this["webpackJsonpbloglist-frontend"]=this["webpackJsonpbloglist-frontend"]||[]).push([[0],{50:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n(10),c=n.n(a),o=n(7),u=n(3),i=n(5),s=n(2),l=n.n(s),b=n(1),d=function(e){var t=e.blog,n=e.addLikes,a=e.removeBlog,c=Object(r.useState)(!1),o=Object(i.a)(c,2),u=o[0],s=o[1],l=localStorage.getItem("loggedBlogUser"),d=JSON.stringify(l),j=JSON.parse(d),p=JSON.parse(j),f={display:u?"none":""},h={display:u?"":"none"},O=function(){s(!u)};return Object(b.jsxs)("div",{style:{padding:5,border:"solid",borderWidth:1,marginBottom:5},id:t.id,children:[Object(b.jsxs)("div",{style:f,children:[Object(b.jsxs)("p",{children:[t.title," ",t.author]}),Object(b.jsx)("button",{onClick:O,children:"View"})]}),Object(b.jsxs)("div",{style:h,className:"togglableContent",children:[Object(b.jsxs)("p",{children:[t.title," by ",t.author," "]}),Object(b.jsx)("button",{onClick:O,children:"Hide"}),Object(b.jsx)("p",{children:t.url}),Object(b.jsxs)("p",{children:["likes ",t.likes]}),Object(b.jsx)("button",{onClick:function(){var e=t.likes+=1,r=t.id;n(r,{user:t.user.id,likes:e,author:t.author,title:t.title,url:t.url})},children:"Like"}),Object(b.jsx)("p",{children:t.user.name}),p.username===t.user.username?Object(b.jsx)("button",{onClick:function(){var e="Remove blog ".concat(t.title," by ").concat(t.author,"?");window.confirm(e)&&a(t.id)},children:"Remove"}):""]})]})},j=function(e){var t=e.createBlog,n=Object(r.useState)(""),a=Object(i.a)(n,2),c=a[0],o=a[1],u=Object(r.useState)(""),s=Object(i.a)(u,2),l=s[0],d=s[1],j=Object(r.useState)(""),p=Object(i.a)(j,2),f=p[0],h=p[1];return Object(b.jsxs)("form",{onSubmit:function(e){e.preventDefault(),t({title:c,author:l,url:f}),o(""),d(""),h("")},children:[Object(b.jsx)("h2",{children:"create new"}),Object(b.jsx)("label",{htmlFor:"Title",children:"Title:"}),Object(b.jsx)("input",{type:"text",value:c,name:"Title",id:"title",onChange:function(e){var t=e.target;return o(t.value)}})," ",Object(b.jsx)("br",{}),Object(b.jsx)("label",{htmlFor:"Author",children:"Author:"}),Object(b.jsx)("input",{type:"text",value:l,name:"Author",id:"author",onChange:function(e){var t=e.target;return d(t.value)}})," ",Object(b.jsx)("br",{}),Object(b.jsx)("label",{htmlFor:"Url",children:"Url:"}),Object(b.jsx)("input",{type:"text",value:f,name:"Url",id:"url",onChange:function(e){var t=e.target;return h(t.value)}})," ",Object(b.jsx)("br",{}),Object(b.jsx)("button",{type:"submit",id:"createBtns",children:"Create"})]})},p=n(6),f=n.n(p),h=function(){var e=Object(u.a)(l.a.mark((function e(t){var n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,f.a.post("/api/login",t);case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),O={login:h},v="/api/blogs",g=null,x=function(){var e=Object(u.a)(l.a.mark((function e(){var t,n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=f.a.get(v),e.next=3,t;case 3:return n=e.sent,e.abrupt("return",n.data);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),m=function(){var e=Object(u.a)(l.a.mark((function e(t){var n,r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={headers:{Authorization:g}},e.next=3,f.a.post(v,t,n);case 3:return r=e.sent,e.abrupt("return",r.data);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),y=function(){var e=Object(u.a)(l.a.mark((function e(t,n){var r,a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=f.a.put("".concat(v,"/").concat(t),n),e.next=3,r;case 3:return a=e.sent,e.abrupt("return",a.data);case 5:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),w=function(){var e=Object(u.a)(l.a.mark((function e(t){var n,r,a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={headers:{Authorization:g}},r=f.a.delete("".concat(v,"/").concat(t),n),e.next=4,r;case 4:return a=e.sent,e.abrupt("return",a.data);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),k={getAll:x,create:m,update:y,del:w,setToken:function(e){g="bearer ".concat(e)}},S=function(e){var t=e.login,n=Object(r.useState)(""),a=Object(i.a)(n,2),c=a[0],o=a[1],s=Object(r.useState)(""),d=Object(i.a)(s,2),j=d[0],p=d[1],f=function(){var e=Object(u.a)(l.a.mark((function e(n){var r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.preventDefault(),e.prev=1,e.next=4,O.login({username:c,password:j});case 4:r=e.sent,localStorage.setItem("loggedBlogUser",JSON.stringify(r)),k.setToken(r.token),t(r),o(""),p(""),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(1),console.log("wrong credentials");case 15:case"end":return e.stop()}}),e,null,[[1,12]])})));return function(t){return e.apply(this,arguments)}}();return Object(b.jsxs)("form",{id:"loginForm",onSubmit:f,children:[Object(b.jsx)("h2",{children:"log in to application"}),Object(b.jsxs)("div",{children:["username",Object(b.jsx)("input",{type:"text",value:c,name:"Username",id:"username",onChange:function(e){var t=e.target;return o(t.value)}})]}),Object(b.jsxs)("div",{children:["password",Object(b.jsx)("input",{type:"password",value:j,name:"Password",id:"password",onChange:function(e){var t=e.target;return p(t.value)}})]}),Object(b.jsx)("button",{type:"submit",id:"loginBtn",children:"Login"})]})},B=Object(r.forwardRef)((function(e,t){var n=Object(r.useState)(!1),a=Object(i.a)(n,2),c=a[0],o=a[1],u={display:c?"none":""},s={display:c?"":"none"},l=function(){o(!c)};return Object(r.useImperativeHandle)(t,(function(){return{toggleVisibility:l}})),Object(b.jsxs)("div",{children:[Object(b.jsx)("div",{style:u,children:Object(b.jsx)("button",{onClick:l,children:e.buttonLabel})}),Object(b.jsxs)("div",{style:s,children:[e.children,Object(b.jsx)("button",{onClick:l,children:"Cancel"})]})]})}));B.displayName="Togglable";var C=B,L=n(11),N=Object(L.b)({name:"blogs",initialState:[],reducers:{setBlogs:function(e,t){return t.payload},appendBlog:function(e,t){e.push(t.payload)},addLike:function(e,t){console.log(e),console.log(t.payload)}}}),U=N.actions,A=U.setBlogs,J=U.appendBlog,T=U.addLike,I=function(e){return function(){var t=Object(u.a)(l.a.mark((function t(n){var r;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,k.create(e);case 2:r=t.sent,n(J(r));case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},F=function(e){return function(){var t=Object(u.a)(l.a.mark((function t(n){var r;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,k.update(e);case 2:r=t.sent,n(T(r));case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},R=N.reducer,E=function(){var e=Object(o.b)();Object(r.useEffect)((function(){e(function(){var e=Object(u.a)(l.a.mark((function e(t){var n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,k.getAll();case 2:n=e.sent,t(A(n));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}),[e]);var t=Object(o.c)((function(e){return e.blogs})),n=Object(r.useState)(null),a=Object(i.a)(n,2),c=a[0],s=a[1],p=Object(r.useRef)();Object(r.useEffect)((function(){var e=localStorage.getItem("loggedBlogUser");if(e){var t=JSON.parse(e);s(t),k.setToken(t.token)}}),[]);var f=function(){var t=Object(u.a)(l.a.mark((function t(n){return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:p.current.toggleVisibility(),e(I(n));case 2:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),h=function(){var e=Object(u.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,k.del(t).catch((function(e){return console.log(e)}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),O=function(){var t=Object(u.a)(l.a.mark((function t(n,r){return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e(F(n));case 1:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}();return Object(b.jsx)("div",{children:null===c?Object(b.jsx)(S,{login:function(e){s(e)}}):Object(b.jsxs)("div",{children:[Object(b.jsx)("h2",{children:"blogs"}),Object(b.jsxs)("p",{children:[c.name," logged in"," ",Object(b.jsx)("button",{id:"logoutBtn",onClick:function(){localStorage.removeItem("loggedBlogUser"),s(null)},children:"Logout"})]}),Object(b.jsx)(C,{buttonLabel:"Create New Blog",ref:p,children:Object(b.jsx)(j,{createBlog:f})}),Object(b.jsx)("div",{children:t.map((function(e){return Object(b.jsx)(d,{blog:e,addLikes:O,removeBlog:h},e.id)}))})]})})},V=Object(L.a)({reducer:{blogs:R}});c.a.render(Object(b.jsx)(o.a,{store:V,children:Object(b.jsx)(E,{})}),document.getElementById("root"))}},[[50,1,2]]]);
//# sourceMappingURL=main.bfdf034e.chunk.js.map