"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[953],{9994:function(e,r,t){t.d(r,{Y:function(){return P}});var o=t(5721),n=t(2053),i=t(9202),l=t(8454),a=t(6360);let c=(e,r,t)=>Number.isInteger(e)&&e>=0&&0===r?"numeric":!Number.isInteger(e)&&e>=0&&0!==r?"decimal":Number.isInteger(e)&&e<0&&0===r||!Number.isInteger(e)&&e<0&&0!==r?"ios"===t?"text":"decimal":"numeric";function s({direction:e,size:r}){return o.createElement("svg",{style:{transform:"up"===e?"rotate(180deg)":void 0},width:r,height:r,viewBox:"0 0 15 15",fill:"none",xmlns:"http://www.w3.org/2000/svg"},o.createElement("path",{d:"M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z",fill:"currentColor",fillRule:"evenodd",clipRule:"evenodd"}))}var d=t(3497);let u={xs:20,sm:24,md:30,lg:34,xl:36};var p=(0,d.k)((e,{radius:r,size:t})=>({rightSection:{display:"flex",flexDirection:"column",height:"calc(100% - 2px)",margin:1,marginRight:1,overflow:"hidden",borderTopRightRadius:e.fn.radius(r),borderBottomRightRadius:e.fn.radius(r)},control:{margin:0,position:"relative",flex:"0 0 50%",display:"flex",alignItems:"center",justifyContent:"center",boxSizing:"border-box",width:e.fn.size({size:t,sizes:u}),padding:0,WebkitTapHighlightColor:"transparent",borderBottom:`1px solid ${"dark"===e.colorScheme?e.colors.dark[4]:e.colors.gray[4]}`,borderLeft:`1px solid ${"dark"===e.colorScheme?e.colors.dark[4]:e.colors.gray[4]}`,borderTop:0,borderRight:0,backgroundColor:"transparent",marginRight:1,color:"dark"===e.colorScheme?e.colors.dark[0]:e.black,"&:not(:disabled):hover":{backgroundColor:"dark"===e.colorScheme?e.colors.dark[5]:e.colors.gray[0]},"&:disabled":{color:"dark"===e.colorScheme?e.colors.dark[3]:e.colors.gray[4]}},controlUp:{},controlDown:{borderBottom:0}})),f=t(9458),m=Object.defineProperty,b=Object.defineProperties,g=Object.getOwnPropertyDescriptors,h=Object.getOwnPropertySymbols,y=Object.prototype.hasOwnProperty,v=Object.prototype.propertyIsEnumerable,w=(e,r,t)=>r in e?m(e,r,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[r]=t,k=(e,r)=>{for(var t in r||(r={}))y.call(r,t)&&w(e,t,r[t]);if(h)for(var t of h(r))v.call(r,t)&&w(e,t,r[t]);return e},x=(e,r)=>b(e,g(r)),O=(e,r)=>{var t={};for(var o in e)y.call(e,o)&&0>r.indexOf(o)&&(t[o]=e[o]);if(null!=e&&h)for(var o of h(e))0>r.indexOf(o)&&v.call(e,o)&&(t[o]=e[o]);return t};let S=e=>{if("-"===e)return e;let r=e;"."===r[0]&&(r=`0${e}`);let t=parseFloat(r);if(!Number.isNaN(t))return e},C={xs:10,sm:14,md:16,lg:18,xl:20},z={step:1,hideControls:!1,size:"sm",precision:0,noClampOnBlur:!1,removeTrailingZeros:!1,formatter:e=>e||"",parser:S,type:"text"},P=(0,o.forwardRef)((e,r)=>{let t=(0,a.N4)("NumberInput",z,e),{readOnly:d,disabled:m,value:b,onChange:g,decimalSeparator:h,min:y,max:v,startValue:w,step:S,stepHoldInterval:P,stepHoldDelay:N,onBlur:j,onFocus:E,onKeyDown:I,onKeyUp:R,hideControls:T,radius:$,variant:D,precision:F,removeTrailingZeros:W,defaultValue:L,noClampOnBlur:U,handlersRef:M,classNames:_,styles:B,size:A,rightSection:H,rightSectionWidth:K,formatter:V,parser:G,inputMode:Z,unstyled:Y,type:q}=t,J=O(t,["readOnly","disabled","value","onChange","decimalSeparator","min","max","startValue","step","stepHoldInterval","stepHoldDelay","onBlur","onFocus","onKeyDown","onKeyUp","hideControls","radius","variant","precision","removeTrailingZeros","defaultValue","noClampOnBlur","handlersRef","classNames","styles","size","rightSection","rightSectionWidth","formatter","parser","inputMode","unstyled","type"]),{classes:Q,cx:X,theme:ee}=p({radius:$,size:A},{classNames:_,styles:B,unstyled:Y,name:"NumberInput"}),er=e=>{if(void 0===e)return;let r=e.toFixed(F);return W&&F>0&&((r=r.replace(RegExp(`[0]{0,${F}}$`),"")).endsWith(".")||r.endsWith(h))&&(r=r.slice(0,-1)),r},[et,eo]=(0,o.useState)(!1),[en,ei]=(0,o.useState)("number"==typeof b?b:"number"==typeof L?L:void 0),el="number"==typeof b?b:en,[ea,ec]=(0,o.useState)("number"==typeof el?er(el):""),es=(0,o.useRef)(),ed=e=>{e===en||Number.isNaN(e)||("function"==typeof g&&g(e),ei(e))},eu=e=>{let r=e;return h&&(r=r.replace(RegExp(`\\${h}`,"g"),".")),G(r)},ep="number"==typeof y?y:-1/0,ef="number"==typeof v?v:1/0,em=(0,o.useRef)();em.current=()=>{var e,r,t;if(void 0===en)ed(null!=(e=null!=w?w:y)?e:0),ec(null!=(t=null!=(r=er(w))?r:er(y))?t:"0");else{let e=er((0,n.u)(en+S,ep,ef));ed(parseFloat(e)),ec(e)}};let eb=(0,o.useRef)();eb.current=()=>{var e,r,t;if(void 0===en)ed(null!=(e=null!=w?w:y)?e:0),ec(null!=(t=null!=(r=er(w))?r:er(y))?t:"0");else{let e=er((0,n.u)(en-S,ep,ef));ed(parseFloat(e)),ec(e)}},(0,i.k)(M,{increment:em.current,decrement:eb.current}),(0,o.useEffect)(()=>{"number"!=typeof b||et||(ei(b),ec(er(b))),void 0!==L||void 0!==b||et||(ei(b),ec(""))},[b,F]);let eg=void 0!==N&&void 0!==P,eh=(0,o.useRef)(null),ey=(0,o.useRef)(0),ev=()=>{eh.current&&window.clearTimeout(eh.current),eh.current=null,ey.current=0},ew=e=>{e?em.current():eb.current(),ey.current+=1},ek=e=>{if(ew(e),eg){let r="number"==typeof P?P:P(ey.current);eh.current=window.setTimeout(()=>ek(e),r)}},ex=(e,r)=>{e.preventDefault(),es.current.focus(),ew(r),eg&&(eh.current=window.setTimeout(()=>ek(r),N))};(0,o.useEffect)(()=>(ev(),ev),[]);let eO=o.createElement("div",{className:Q.rightSection},o.createElement("button",{type:"button",tabIndex:-1,"aria-hidden":!0,disabled:el>=v,className:X(Q.control,Q.controlUp),onPointerDown:e=>{ex(e,!0)},onPointerUp:ev,onPointerLeave:ev},o.createElement(s,{size:ee.fn.size({size:A,sizes:C}),direction:"up"})),o.createElement("button",{type:"button",tabIndex:-1,"aria-hidden":!0,disabled:el<=y,className:X(Q.control,Q.controlDown),onPointerDown:e=>{ex(e,!1)},onPointerUp:ev,onPointerLeave:ev},o.createElement(s,{size:ee.fn.size({size:A,sizes:C}),direction:"down"}))),eS=e=>{let r=e.nativeEvent;if(r.isComposing)return;let t=e.target.value,o=eu(t);ec(o),""===t||"-"===t?ed(void 0):""===t.trim()||Number.isNaN(o)||ed(parseFloat(o))},eC=e=>{var r;if(""===e.target.value)ec(""),ed(void 0);else{let t=e.target.value;(t[0]===`${h}`||"."===t[0])&&(t=`0${t}`);let o=eu(t),i=(0,n.u)(parseFloat(o),ep,ef);Number.isNaN(i)?ec(null!=(r=er(el))?r:""):U||(ec(er(i)),ed(parseFloat(er(i))))}eo(!1),"function"==typeof j&&j(e)},ez=e=>{eo(!0),"function"==typeof E&&E(e)},eP=e=>{if("function"==typeof I&&I(e),e.repeat&&eg&&("ArrowUp"===e.key||"ArrowDown"===e.key)){e.preventDefault();return}d||("ArrowUp"===e.key?ex(e,!0):"ArrowDown"===e.key&&ex(e,!1))},eN=e=>{"function"==typeof R&&R(e),("ArrowUp"===e.key||"ArrowDown"===e.key)&&ev()};return o.createElement(f.o,x(k({},J),{type:q,variant:D,value:((e="")=>{let r="number"==typeof e?String(e):e;return h&&(r=r.replace(/\./g,h)),V(r)})(ea),disabled:m,readOnly:d,ref:(0,l.Y)(es,r),onChange:eS,onBlur:eC,onFocus:ez,onKeyDown:eP,onKeyUp:eN,rightSection:H||(m||d||T||"unstyled"===D?null:eO),rightSectionWidth:K||ee.fn.size({size:A,sizes:u})+1,radius:$,max:v,min:y,step:S,size:A,styles:B,classNames:_,inputMode:Z||c(S,F,"undefined"!=typeof window?function(){let{userAgent:e}=window.navigator;return/(Macintosh)|(MacIntel)|(MacPPC)|(Mac68K)/i.test(e)?"macos":/(iPhone)|(iPad)|(iPod)/i.test(e)?"ios":/(Win32)|(Win64)|(Windows)|(WinCE)/i.test(e)?"windows":/Android/i.test(e)?"android":/Linux/i.test(e)?"linux":"undetermined"}():"undetermined"),__staticSelector:"NumberInput",unstyled:Y}))});P.displayName="@mantine/core/NumberInput"},5152:function(e,r,t){t.d(r,{r:function(){return q}});var o=t(5721),n=t(0),i=t(1814),l=t(6360),a=t(6130);let c=(0,o.createContext)(null),s=c.Provider,d=()=>(0,o.useContext)(c);var u=t(5939),p=Object.defineProperty,f=Object.getOwnPropertySymbols,m=Object.prototype.hasOwnProperty,b=Object.prototype.propertyIsEnumerable,g=(e,r,t)=>r in e?p(e,r,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[r]=t,h=(e,r)=>{for(var t in r||(r={}))m.call(r,t)&&g(e,t,r[t]);if(f)for(var t of f(r))b.call(r,t)&&g(e,t,r[t]);return e},y=(e,r)=>{var t={};for(var o in e)m.call(e,o)&&0>r.indexOf(o)&&(t[o]=e[o]);if(null!=e&&f)for(var o of f(e))0>r.indexOf(o)&&b.call(e,o)&&(t[o]=e[o]);return t};let v={orientation:"horizontal",spacing:"lg",size:"sm",offset:"xs"},w=(0,o.forwardRef)((e,r)=>{let t=(0,l.N4)("SwitchGroup",v,e),{children:n,value:c,defaultValue:d,onChange:p,orientation:f,spacing:m,size:b,wrapperProps:g,offset:w}=t,k=y(t,["children","value","defaultValue","onChange","orientation","spacing","size","wrapperProps","offset"]),[x,O]=(0,i.C)({value:c,defaultValue:d,finalValue:[],onChange:p}),S=e=>{let r=e.currentTarget.value;O(x.includes(r)?x.filter(e=>e!==r):[...x,r])};return o.createElement(s,{value:{value:x,onChange:S,size:b}},o.createElement(u.I.Wrapper,h(h({labelElement:"div",size:b,__staticSelector:"SwitchGroup",ref:r},g),k),o.createElement(a.K,{spacing:m,orientation:f,offset:w},n)))});w.displayName="@mantine/core/SwitchGroup";var k=t(3497),x=Object.defineProperty,O=Object.defineProperties,S=Object.getOwnPropertyDescriptors,C=Object.getOwnPropertySymbols,z=Object.prototype.hasOwnProperty,P=Object.prototype.propertyIsEnumerable,N=(e,r,t)=>r in e?x(e,r,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[r]=t,j=(e,r)=>{for(var t in r||(r={}))z.call(r,t)&&N(e,t,r[t]);if(C)for(var t of C(r))P.call(r,t)&&N(e,t,r[t]);return e},E=(e,r)=>O(e,S(r));let I={xs:16,sm:20,md:24,lg:30,xl:36},R={xs:32,sm:38,md:46,lg:56,xl:72},T={xs:12,sm:14,md:18,lg:22,xl:28},$={xs:5,sm:6,md:7,lg:9,xl:11},D={xs:4,sm:5,md:6,lg:8,xl:10};var F=(0,k.k)((e,{size:r,radius:t,color:o,labelPosition:n,error:i})=>{let l=e.fn.size({size:r,sizes:T}),a=e.fn.size({size:t,sizes:e.radius}),c=e.fn.variant({variant:"filled",color:o}),s=e.fn.size({size:r,sizes:R}),d="xs"===r?1:2,u=e.fn.variant({variant:"filled",color:"red"}).background;return{input:{clip:"rect(1px, 1px, 1px, 1px)",height:0,width:0,overflow:"hidden",whiteSpace:"nowrap",padding:0,WebkitClipPath:"inset(50%)",clipPath:"inset(50%)",position:"absolute"},track:E(j({},e.fn.focusStyles("input:focus + &")),{cursor:e.cursorType,overflow:"hidden",WebkitTapHighlightColor:"transparent",position:"relative",borderRadius:a,backgroundColor:"dark"===e.colorScheme?e.colors.dark[6]:e.colors.gray[2],border:`1px solid ${i?u:"dark"===e.colorScheme?e.colors.dark[4]:e.colors.gray[3]}`,height:e.fn.size({size:r,sizes:I}),minWidth:s,margin:0,transitionProperty:"background-color, border-color",transitionTimingFunction:e.transitionTimingFunction,transitionDuration:"150ms",boxSizing:"border-box",appearance:"none",display:"flex",alignItems:"center",fontSize:e.fn.size({size:r,sizes:$}),fontWeight:600,order:"left"===n?2:1,userSelect:"none",MozUserSelect:"none",WebkitUserSelect:"none",MsUserSelect:"none",zIndex:0,lineHeight:0,color:"dark"===e.colorScheme?e.colors.dark[1]:e.colors.gray[6],transition:`color 150ms ${e.transitionTimingFunction}`,"input:checked + &":{backgroundColor:c.background,borderColor:c.background,color:e.white,transition:`color 150ms ${e.transitionTimingFunction}`},"input:disabled + &":{backgroundColor:"dark"===e.colorScheme?e.colors.dark[4]:e.colors.gray[2],borderColor:"dark"===e.colorScheme?e.colors.dark[4]:e.colors.gray[2],cursor:"not-allowed"}}),thumb:{position:"absolute",zIndex:1,borderRadius:a,boxSizing:"border-box",display:"flex",backgroundColor:e.white,height:l,width:l,border:`1px solid ${"dark"===e.colorScheme?e.white:e.colors.gray[3]}`,left:`${d}px`,transition:`left 150ms ${e.transitionTimingFunction}`,"& > *":{margin:"auto"},"@media (prefers-reduced-motion)":{transitionDuration:e.respectReducedMotion?"0ms":""},"input:checked + * > &":{left:`calc(100% - ${l}px - ${d}px)`,borderColor:e.white},"input:disabled + * > &":{borderColor:"dark"===e.colorScheme?e.colors.dark[4]:e.colors.gray[2],backgroundColor:"dark"===e.colorScheme?e.colors.dark[3]:e.colors.gray[0]}},trackLabel:{height:"100%",display:"grid",placeContent:"center",minWidth:s-l,paddingInline:e.fn.size({size:r,sizes:D}),margin:`0 0 0 ${l+d}px`,transition:`margin 150ms ${e.transitionTimingFunction}`,"input:checked + * > &":{margin:`0 ${l+d}px 0 0`}}}}),W=t(3358),L=t(5482),U=Object.defineProperty,M=Object.defineProperties,_=Object.getOwnPropertyDescriptors,B=Object.getOwnPropertySymbols,A=Object.prototype.hasOwnProperty,H=Object.prototype.propertyIsEnumerable,K=(e,r,t)=>r in e?U(e,r,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[r]=t,V=(e,r)=>{for(var t in r||(r={}))A.call(r,t)&&K(e,t,r[t]);if(B)for(var t of B(r))H.call(r,t)&&K(e,t,r[t]);return e},G=(e,r)=>M(e,_(r)),Z=(e,r)=>{var t={};for(var o in e)A.call(e,o)&&0>r.indexOf(o)&&(t[o]=e[o]);if(null!=e&&B)for(var o of B(e))0>r.indexOf(o)&&H.call(e,o)&&(t[o]=e[o]);return t};let Y={offLabel:"",onLabel:"",size:"sm",radius:"xl",error:!1},q=(0,o.forwardRef)((e,r)=>{var t;let a=(0,l.N4)("Switch",Y,e),{className:c,color:s,label:u,offLabel:p,onLabel:f,id:m,style:b,size:g,radius:h,wrapperProps:y,children:v,unstyled:w,styles:k,classNames:x,thumbIcon:O,sx:S,checked:C,defaultChecked:z,onChange:P,labelPosition:N,description:j,error:E,disabled:I}=a,R=Z(a,["className","color","label","offLabel","onLabel","id","style","size","radius","wrapperProps","children","unstyled","styles","classNames","thumbIcon","sx","checked","defaultChecked","onChange","labelPosition","description","error","disabled"]),T=d(),{classes:$}=F({size:(null==T?void 0:T.size)||g,color:s,radius:h,labelPosition:N,error:!!E},{unstyled:w,styles:k,classNames:x,name:"Switch"}),{systemStyles:D,rest:U}=(0,W.x)(R),M=(0,n.M)(m),_=T?{checked:T.value.includes(U.value),onChange:T.onChange}:{},[B,A]=(0,i.C)({value:null!=(t=_.checked)?t:C,defaultValue:z,finalValue:!1});return o.createElement(L.Z,V(V({className:c,sx:S,style:b,id:M,size:(null==T?void 0:T.size)||g,labelPosition:N,label:u,description:j,error:E,disabled:I,__staticSelector:"Switch",classNames:x,styles:k,unstyled:w,"data-checked":_.checked||void 0},D),y),o.createElement("input",G(V({},U),{disabled:I,checked:B,onChange:e=>{T?_.onChange(e):null==P||P(e),A(e.currentTarget.checked)},id:M,ref:r,type:"checkbox",className:$.input})),o.createElement("label",{htmlFor:M,className:$.track},o.createElement("div",{className:$.thumb},O),o.createElement("div",{className:$.trackLabel},B?f:p)))});q.displayName="@mantine/core/Switch",q.Group=w},8349:function(e,r,t){t.d(r,{k:function(){return z}});var o=t(5721),n=t(6360),i=t(3497),l=Object.defineProperty,a=Object.defineProperties,c=Object.getOwnPropertyDescriptors,s=Object.getOwnPropertySymbols,d=Object.prototype.hasOwnProperty,u=Object.prototype.propertyIsEnumerable,p=(e,r,t)=>r in e?l(e,r,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[r]=t,f=(e,r)=>{for(var t in r||(r={}))d.call(r,t)&&p(e,t,r[t]);if(s)for(var t of s(r))u.call(r,t)&&p(e,t,r[t]);return e},m=(e,r)=>a(e,c(r));let b={xs:16,sm:20,md:26,lg:32,xl:40};var g=(0,i.k)((e,{color:r,size:t,radius:o,gradient:n,variant:i})=>{let l=e.fn.variant({variant:i,color:r||e.primaryColor,gradient:n,primaryFallback:!1}),a=e.fn.size({size:t,sizes:b});return{root:m(f({},e.fn.fontStyles()),{display:"inline-flex",alignItems:"center",justifyContent:"center",boxSizing:"border-box",width:a,height:a,minWidth:a,minHeight:a,borderRadius:e.fn.radius(o),backgroundColor:l.background,color:l.color,backgroundImage:"gradient"===i?l.background:void 0,border:`${"gradient"===i?0:1}px solid ${l.border}`})}}),h=t(5992),y=Object.defineProperty,v=Object.getOwnPropertySymbols,w=Object.prototype.hasOwnProperty,k=Object.prototype.propertyIsEnumerable,x=(e,r,t)=>r in e?y(e,r,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[r]=t,O=(e,r)=>{for(var t in r||(r={}))w.call(r,t)&&x(e,t,r[t]);if(v)for(var t of v(r))k.call(r,t)&&x(e,t,r[t]);return e},S=(e,r)=>{var t={};for(var o in e)w.call(e,o)&&0>r.indexOf(o)&&(t[o]=e[o]);if(null!=e&&v)for(var o of v(e))0>r.indexOf(o)&&k.call(e,o)&&(t[o]=e[o]);return t};let C={size:"md",variant:"filled"},z=(0,o.forwardRef)((e,r)=>{let t=(0,n.N4)("ThemeIcon",C,e),{className:i,size:l,radius:a,variant:c,color:s,children:d,gradient:u,unstyled:p}=t,f=S(t,["className","size","radius","variant","color","children","gradient","unstyled"]),{classes:m,cx:b}=g({variant:c,radius:a,color:s,size:l,gradient:u},{name:"ThemeIcon",unstyled:p});return o.createElement(h.x,O({className:b(m.root,i),ref:r},f),d)});z.displayName="@mantine/core/ThemeIcon"},7023:function(e,r,t){t.d(r,{m:function(){return o}});function o({min:e,max:r},t){let o=t||!0;return t=>{if("number"!=typeof t)return o;let n=!0;return"number"==typeof e&&t<e&&(n=!1),"number"==typeof r&&t>r&&(n=!1),n?null:o}}}}]);