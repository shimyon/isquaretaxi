(this.webpackJsonpchargezone=this.webpackJsonpchargezone||[]).push([[5],{120:function(e,a,t){"use strict";t.d(a,"a",(function(){return s})),t.d(a,"b",(function(){return l}));var r=t(1),o=t.n(r),n=t(170);const s=e=>o.a.createElement(n.a,Object.assign({},e,{widths:["xxs","xs","sm","md","lg","xl","xxl"]})),l=({className:e})=>o.a.createElement("div",{className:"separator ".concat(e)})},129:function(e,a,t){"use strict";var r=t(1),o=t.n(r),n=t(169),s=t(149);a.a=Object(s.c)(e=>o.a.createElement(n.a,e),{withRef:!1})},168:function(e,a,t){"use strict";var r=t(123),o=t(125),n=t(131),s=t(130),l=t(1),c=t.n(l),i=t(18),u=t.n(i),m=t(122),d=t.n(m),p=t(124),f={active:u.a.bool,"aria-label":u.a.string,block:u.a.bool,color:u.a.string,disabled:u.a.bool,outline:u.a.bool,tag:p.o,innerRef:u.a.oneOfType([u.a.object,u.a.func,u.a.string]),onClick:u.a.func,size:u.a.string,children:u.a.node,className:u.a.string,cssModule:u.a.object,close:u.a.bool},b=function(e){function a(a){var t;return(t=e.call(this,a)||this).onClick=t.onClick.bind(Object(n.a)(t)),t}Object(s.a)(a,e);var t=a.prototype;return t.onClick=function(e){if(!this.props.disabled)return this.props.onClick?this.props.onClick(e):void 0;e.preventDefault()},t.render=function(){var e=this.props,a=e.active,t=e["aria-label"],n=e.block,s=e.className,l=e.close,i=e.cssModule,u=e.color,m=e.outline,f=e.size,b=e.tag,g=e.innerRef,h=Object(o.a)(e,["active","aria-label","block","className","close","cssModule","color","outline","size","tag","innerRef"]);l&&"undefined"===typeof h.children&&(h.children=c.a.createElement("span",{"aria-hidden":!0},"\xd7"));var v="btn"+(m?"-outline":"")+"-"+u,y=Object(p.k)(d()(s,{close:l},l||"btn",l||v,!!f&&"btn-"+f,!!n&&"btn-block",{active:a,disabled:this.props.disabled}),i);h.href&&"button"===b&&(b="a");var E=l?"Close":null;return c.a.createElement(b,Object(r.a)({type:"button"===b&&h.onClick?"button":void 0},h,{className:y,ref:g,onClick:this.onClick,"aria-label":t||E}))},a}(c.a.Component);b.propTypes=f,b.defaultProps={color:"secondary",tag:"button"},a.a=b},169:function(e,a,t){"use strict";var r=t(1),o=t(149),n=t(132),s=t(148),l=t.n(s),c=function(){var e=function(a,t){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,a){e.__proto__=a}||function(e,a){for(var t in a)a.hasOwnProperty(t)&&(e[t]=a[t])})(a,t)};return function(a,t){function r(){this.constructor=a}e(a,t),a.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}}(),i=function(e,a){var t={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&a.indexOf(r)<0&&(t[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(e);o<r.length;o++)a.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(t[r[o]]=e[r[o]])}return t},u=function(){for(var e=0,a=0,t=arguments.length;a<t;a++)e+=arguments[a].length;var r=Array(e),o=0;for(a=0;a<t;a++)for(var n=arguments[a],s=0,l=n.length;s<l;s++,o++)r[o]=n[s];return r},m=l.a||s,d=function(e){function a(){return null!==e&&e.apply(this,arguments)||this}return c(a,e),a.prototype.shouldComponentUpdate=function(e){var a=this.props,t=a.values,r=i(a,["values"]),o=e.values,n=i(e,["values"]);return!m(o,t)||!m(r,n)},a.prototype.render=function(){var e=this;return r.createElement(o.a.Consumer,null,(function(a){Object(n.g)(a);var t=a.formatMessage,o=a.textComponent,s=void 0===o?r.Fragment:o,l=e.props,c=l.id,i=l.description,m=l.defaultMessage,d=l.values,p=l.children,f=l.tagName,b=void 0===f?s:f,g=t({id:c,description:i,defaultMessage:m},d);return Array.isArray(g)||(g=[g]),"function"===typeof p?p(g):b?r.createElement.apply(r,u([b,null],g)):g}))},a.displayName="FormattedMessage",a}(r.Component);a.a=d},170:function(e,a,t){"use strict";var r=t(123),o=t(125),n=t(1),s=t.n(n),l=t(18),c=t.n(l),i=t(122),u=t.n(i),m=t(124),d=c.a.oneOfType([c.a.number,c.a.string]),p=c.a.oneOfType([c.a.bool,c.a.number,c.a.string,c.a.shape({size:c.a.oneOfType([c.a.bool,c.a.number,c.a.string]),order:d,offset:d})]),f={tag:m.o,xs:p,sm:p,md:p,lg:p,xl:p,className:c.a.string,cssModule:c.a.object,widths:c.a.array},b={tag:"div",widths:["xs","sm","md","lg","xl"]},g=function(e,a,t){return!0===t||""===t?e?"col":"col-"+a:"auto"===t?e?"col-auto":"col-"+a+"-auto":e?"col-"+t:"col-"+a+"-"+t},h=function(e){var a=e.className,t=e.cssModule,n=e.widths,l=e.tag,c=Object(o.a)(e,["className","cssModule","widths","tag"]),i=[];n.forEach((function(a,r){var o=e[a];if(delete c[a],o||""===o){var n=!r;if(Object(m.i)(o)){var s,l=n?"-":"-"+a+"-",d=g(n,a,o.size);i.push(Object(m.k)(u()(((s={})[d]=o.size||""===o.size,s["order"+l+o.order]=o.order||0===o.order,s["offset"+l+o.offset]=o.offset||0===o.offset,s)),t))}else{var p=g(n,a,o);i.push(p)}}})),i.length||i.push("col");var d=Object(m.k)(u()(a,i),t);return s.a.createElement(l,Object(r.a)({},c,{className:d}))};h.propTypes=f,h.defaultProps=b,a.a=h},508:function(e,a,t){"use strict";t.r(a);var r=t(119),o=t(1),n=t.n(o),s=t(320),l=t(321),c=t(322),i=t(487),u=t(488),m=t(168),d=t(96),p=t(126),f=t(36),b=t(120),g=t(129),h=t(5),v=t(160);const y=e=>{let a;return e?/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e)||(a="Invalid email address"):a="Please enter your email address",a};a.default=Object(f.b)(({authUser:e})=>({forgotUserMail:e.forgotUserMail,loading:e.loading,error:e.error}),{forgotPasswordAction:h.y})(({history:e,forgotUserMail:a,loading:t,error:f,forgotPasswordAction:h})=>{const E=Object(o.useState)("demo@coloredstrategies.com"),N=Object(r.a)(E,1)[0];Object(o.useEffect)(()=>{f?v.b.warning(f,"Forgot Password Error",3e3,null,null,""):t||"success"!==a||v.b.success("Please check your email.","Forgot Password Success",3e3,null,null,"")},[f,a,t]);const O={email:N};return n.a.createElement(s.a,{className:"h-100"},n.a.createElement(b.a,{xxs:"12",md:"10",className:"mx-auto my-auto"},n.a.createElement(l.a,{className:"auth-card"},n.a.createElement("div",{className:"position-relative image-side "},n.a.createElement("p",{className:"text-white h2"},"MAGIC IS IN THE DETAILS"),n.a.createElement("p",{className:"white mb-0"},"Please use your e-mail to reset your password. ",n.a.createElement("br",null),"If you are not a member, please"," ",n.a.createElement(d.b,{to:"/user/register",className:"white"},"register"),".")),n.a.createElement("div",{className:"form-side"},n.a.createElement(d.b,{to:"/",className:"white"},n.a.createElement("span",{className:"logo-single"})),n.a.createElement(c.a,{className:"mb-4"},n.a.createElement(g.a,{id:"user.forgot-password"})),n.a.createElement(p.e,{initialValues:O,onSubmit:a=>{t||""!==a.email&&h(a,e)}},({errors:e,touched:a})=>n.a.createElement(p.d,{className:"av-tooltip tooltip-label-bottom"},n.a.createElement(i.a,{className:"form-group has-float-label"},n.a.createElement(u.a,null,n.a.createElement(g.a,{id:"user.email"})),n.a.createElement(p.b,{className:"form-control",name:"email",validate:y}),e.email&&a.email&&n.a.createElement("div",{className:"invalid-feedback d-block"},e.email)),n.a.createElement("div",{className:"d-flex justify-content-between align-items-center"},n.a.createElement(d.b,{to:"/user/forgot-password"},n.a.createElement(g.a,{id:"user.forgot-password-question"})),n.a.createElement(m.a,{color:"primary",className:"btn-shadow btn-multiple-state ".concat(t?"show-spinner":""),size:"lg"},n.a.createElement("span",{className:"spinner d-inline-block"},n.a.createElement("span",{className:"bounce1"}),n.a.createElement("span",{className:"bounce2"}),n.a.createElement("span",{className:"bounce3"})),n.a.createElement("span",{className:"label"},n.a.createElement(g.a,{id:"user.reset-password-button"}))))))))))})}}]);
//# sourceMappingURL=user-forgot-password.d4d61974.chunk.js.map