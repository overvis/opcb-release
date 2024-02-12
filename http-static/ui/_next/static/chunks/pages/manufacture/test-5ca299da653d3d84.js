(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[411],{3979:function(e,t,r){"use strict";r.d(t,{k:function(){return w}});var s=r(3900),n=r(1949),a=r(5728),i=r(9025),o=r(6877),l=Object.defineProperty,c=Object.defineProperties,d=Object.getOwnPropertyDescriptors,u=Object.getOwnPropertySymbols,p=Object.prototype.hasOwnProperty,f=Object.prototype.propertyIsEnumerable,__defNormalProp=(e,t,r)=>t in e?l(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,__spreadValues=(e,t)=>{for(var r in t||(t={}))p.call(t,r)&&__defNormalProp(e,r,t[r]);if(u)for(var r of u(t))f.call(t,r)&&__defNormalProp(e,r,t[r]);return e},__spreadProps=(e,t)=>c(e,d(t));let m={xs:(0,a.h)(16),sm:(0,a.h)(20),md:(0,a.h)(26),lg:(0,a.h)(32),xl:(0,a.h)(40)},h=["filled","light","gradient","outline","default"];var y=(0,i.k)((e,{color:t,radius:r,gradient:s},{variant:n,size:i})=>{let l=(0,o.a)({size:i,sizes:m});return{root:__spreadValues(__spreadProps(__spreadValues({},e.fn.fontStyles()),{display:"inline-flex",alignItems:"center",justifyContent:"center",boxSizing:"border-box",width:l,height:l,minWidth:l,minHeight:l,borderRadius:e.fn.radius(r)}),function({theme:e,variant:t,color:r,gradient:s}){if(!h.includes(t))return null;let n=e.fn.variant({variant:t,color:r||e.primaryColor,gradient:s,primaryFallback:!1});return{backgroundColor:n.background,color:n.color,backgroundImage:"gradient"===t?n.background:void 0,border:`${(0,a.h)("gradient"===t?0:1)} solid ${n.border}`}}({theme:e,variant:n,gradient:s,color:t}))}}),g=r(3127),b=Object.defineProperty,x=Object.getOwnPropertySymbols,j=Object.prototype.hasOwnProperty,v=Object.prototype.propertyIsEnumerable,ThemeIcon_defNormalProp=(e,t,r)=>t in e?b(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,ThemeIcon_spreadValues=(e,t)=>{for(var r in t||(t={}))j.call(t,r)&&ThemeIcon_defNormalProp(e,r,t[r]);if(x)for(var r of x(t))v.call(t,r)&&ThemeIcon_defNormalProp(e,r,t[r]);return e},__objRest=(e,t)=>{var r={};for(var s in e)j.call(e,s)&&0>t.indexOf(s)&&(r[s]=e[s]);if(null!=e&&x)for(var s of x(e))0>t.indexOf(s)&&v.call(e,s)&&(r[s]=e[s]);return r};let _={size:"md",variant:"filled"},w=(0,s.forwardRef)((e,t)=>{let r=(0,n.N4)("ThemeIcon",_,e),{className:a,size:i,radius:o,variant:l,color:c,children:d,gradient:u,unstyled:p}=r,f=__objRest(r,["className","size","radius","variant","color","children","gradient","unstyled"]),{classes:m,cx:h}=y({variant:l,radius:o,color:c,gradient:u},{name:"ThemeIcon",unstyled:p,variant:l,size:i});return s.createElement(g.x,ThemeIcon_spreadValues({className:h(m.root,a),ref:t},f),d)});w.displayName="@mantine/core/ThemeIcon"},77:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/manufacture/test",function(){return r(9999)}])},6035:function(e,t,r){"use strict";r.d(t,{Z:function(){return ManufactureLayout}});var s=r(966),n=r(9025),a=r(7344),i=r(2671),o=r(6849),l=r(7579),c=r(2767),d=r(7992),u=r(4736),p=r(5807),f=r(1149),m=r(6446),h=r(8410),y=r(2094);let g=(0,n.k)(e=>({tabsList:{borderBottom:"1px solid ".concat(e.colors.gray[4])},tab:{color:e.colors.blue[6],textTransform:"uppercase",fontSize:e.fontSizes.xs,"&:hover":{backgroundColor:"transparent",border:"transparent",color:e.colors.dark},"&[data-active]":{borderBottom:"2px solid #000",pointerEvents:"none"}}}));function ManufactureLayout(e){let{children:t,title:r,id:n}=e,b=(0,h.H)(),{classes:x}=g(),j=(0,m.useRouter)();if(!b.data)return(0,s.jsx)(y.Z,{pageTitle:"Manufacturing",contentIsLoading:!0});let v=b.data.internetConnected,_=b.data.wireguardConnected;return(0,s.jsxs)(y.Z,{pageTitle:"Manufacture :: ".concat(r),children:[_&&(0,s.jsx)(a.Z,{position:"center",children:(0,s.jsx)("a",{href:"/dyn-media/label.png",target:"_blank",children:(0,s.jsx)(i.E,{src:"/dyn-media/label.png",alt:"OPCB VPN information label.",maw:"260px"})})}),("restore"===n||"register"===n)&&(0,s.jsxs)(s.Fragment,{children:[_&&(0,s.jsx)(o.b,{my:"lg",icon:(0,s.jsx)(c.Z,{}),title:"Already authenticated.",color:"yellow",children:"This device is already authenticated on the remote server and has an access. By submitting this form you may lose the access or change the device's identity."}),!v&&(0,s.jsx)(o.b,{my:"lg",icon:(0,s.jsx)(c.Z,{}),title:"No internet access.",color:"yellow",children:"Active internet connection is required to restore the device's identity. Please check the device's settings."})]}),"test"===n&&!v&&(0,s.jsx)(o.b,{my:"lg",icon:(0,s.jsx)(c.Z,{}),title:"No internet access.",color:"red",children:"Active internet connection is required to run the tests."}),(0,s.jsxs)(l.m,{color:"dark",value:n,variant:"default",classNames:{tabsList:x.tabsList,tab:x.tab},onTabChange:e=>j.push("/manufacture/".concat(e)),children:[(0,s.jsxs)(l.m.List,{mb:"lg",children:[(0,s.jsx)(l.m.Tab,{value:"restore",icon:(0,s.jsx)(d.Z,{size:16}),children:"Restore identity"}),(0,s.jsx)(l.m.Tab,{value:"register",icon:(0,s.jsx)(u.Z,{size:16}),children:"Register"}),(0,s.jsx)(l.m.Tab,{value:"test",icon:(0,s.jsx)(p.Z,{size:16}),children:"Test"}),(0,s.jsx)(l.m.Tab,{value:"finalize",icon:(0,s.jsx)(f.Z,{size:16}),children:"Finalize"})]}),(0,s.jsx)(l.m.Panel,{value:n,children:t})]})]})}},8410:function(e,t,r){"use strict";r.d(t,{H:function(){return useManufacturerStatus}});var s=r(52),n=r(3738);async function manufacturerFetcher(e){let[t,r]=e,s=await (0,n.UK)(r,["wg:ping","wg:pubkey","inet:ping","wg:ping","overvisRc:mac","manufacturer:modeEnabled","manufacturer:licenseUuid","manufacturer:licensePassword","manufacturer:batchDescription"]),a=await (0,n.wv)(r,["overvisVpn:wireguard:privateKey"]),i={internetConnected:!1,wireguardConnected:!1,pubkey:s["wg:pubkey"],mac:s["overvisRc:mac"],manufacturerModeEnabled:!!s["manufacturer:modeEnabled"],licenseUuid:s["manufacturer:licenseUuid"],licensePassword:s["manufacturer:licensePassword"],batchDescription:s["manufacturer:batchDescription"],privateKey:a["overvisVpn:wireguard:privateKey"]},o=s["wg:ping"];o&&"unreachable"!==o&&(i.wireguardConnected=!0);let l=s["inet:ping"];return l&&"unreachable"!==l&&(i.internetConnected=!0),i}function useManufacturerStatus(){return(0,s.tQ)("manufacturer-status",manufacturerFetcher)}},9999:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return Page}});var s=r(966),n=r(462),a=r(6849),i=r(9956),o=r(7344),l=r(3283),c=r(3624),d=r(3900),u=r(1949),p=r(9963);let[f,m]=(0,p.R)("List component was not found in tree");var h=r(9025),y=r(2243),g=r(6877),b=(0,h.k)((e,{spacing:t,center:r})=>({itemWrapper:{ref:(0,y.A)("itemWrapper"),display:"inline-flex",flexDirection:"column",whiteSpace:"normal"},item:{whiteSpace:"nowrap",lineHeight:r?1:e.lineHeight,"&:not(:first-of-type)":{marginTop:(0,g.a)({size:t,sizes:e.spacing})},"&[data-with-icon]":{listStyle:"none",[`& .${(0,y.A)("itemWrapper")}`]:{display:"inline-flex",alignItems:r?"center":"flex-start",flexDirection:"row"}}},itemIcon:{display:"inline-block",verticalAlign:"middle",marginRight:e.spacing.sm}})),x=r(3127),j=Object.defineProperty,v=Object.getOwnPropertySymbols,_=Object.prototype.hasOwnProperty,w=Object.prototype.propertyIsEnumerable,__defNormalProp=(e,t,r)=>t in e?j(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,__spreadValues=(e,t)=>{for(var r in t||(t={}))_.call(t,r)&&__defNormalProp(e,r,t[r]);if(v)for(var r of v(t))w.call(t,r)&&__defNormalProp(e,r,t[r]);return e},__objRest=(e,t)=>{var r={};for(var s in e)_.call(e,s)&&0>t.indexOf(s)&&(r[s]=e[s]);if(null!=e&&v)for(var s of v(e))0>t.indexOf(s)&&w.call(e,s)&&(r[s]=e[s]);return r};let O={},k=(0,d.forwardRef)((e,t)=>{let r=(0,u.N4)("ListItem",O,e),{className:s,children:n,icon:a}=r,i=__objRest(r,["className","children","icon"]),{icon:o,spacing:l,center:c,listStyleType:p,size:f,withPadding:h,classNames:y,styles:g,unstyled:j,variant:v}=m(),_=a||o,{classes:w,cx:k}=b({withPadding:h,listStyleType:p,center:c,spacing:l},{classNames:y,styles:g,unstyled:j,name:"List",variant:v,size:f});return d.createElement(x.x,__spreadValues({component:"li",className:k(w.item,s),"data-with-icon":!!_||void 0,ref:t},i),d.createElement("div",{className:w.itemWrapper},_&&d.createElement("span",{className:w.itemIcon},_),d.createElement("span",null,n)))});k.displayName="@mantine/core/ListItem";var P=Object.defineProperty,T=Object.defineProperties,N=Object.getOwnPropertyDescriptors,z=Object.getOwnPropertySymbols,I=Object.prototype.hasOwnProperty,S=Object.prototype.propertyIsEnumerable,List_styles_defNormalProp=(e,t,r)=>t in e?P(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,List_styles_spreadValues=(e,t)=>{for(var r in t||(t={}))I.call(t,r)&&List_styles_defNormalProp(e,r,t[r]);if(z)for(var r of z(t))S.call(t,r)&&List_styles_defNormalProp(e,r,t[r]);return e},__spreadProps=(e,t)=>T(e,N(t)),C=(0,h.k)((e,{withPadding:t,listStyleType:r},{size:s})=>({root:__spreadProps(List_styles_spreadValues({},e.fn.fontStyles()),{listStyleType:r,color:"dark"===e.colorScheme?e.colors.dark[0]:e.black,fontSize:(0,g.a)({size:s,sizes:e.fontSizes}),lineHeight:e.lineHeight,margin:0,paddingLeft:t?e.spacing.xl:0,listStylePosition:"inside"})})),L=Object.defineProperty,M=Object.getOwnPropertySymbols,E=Object.prototype.hasOwnProperty,Z=Object.prototype.propertyIsEnumerable,List_defNormalProp=(e,t,r)=>t in e?L(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,List_spreadValues=(e,t)=>{for(var r in t||(t={}))E.call(t,r)&&List_defNormalProp(e,r,t[r]);if(M)for(var r of M(t))Z.call(t,r)&&List_defNormalProp(e,r,t[r]);return e},List_objRest=(e,t)=>{var r={};for(var s in e)E.call(e,s)&&0>t.indexOf(s)&&(r[s]=e[s]);if(null!=e&&M)for(var s of M(e))0>t.indexOf(s)&&Z.call(e,s)&&(r[s]=e[s]);return r};let R={type:"unordered",size:"md",spacing:0},V=(0,d.forwardRef)((e,t)=>{let r=(0,u.N4)("List",R,e),{children:s,type:n,size:a,listStyleType:i,withPadding:o,center:l,spacing:c,icon:p,className:m,styles:h,classNames:y,unstyled:g,variant:b}=r,j=List_objRest(r,["children","type","size","listStyleType","withPadding","center","spacing","icon","className","styles","classNames","unstyled","variant"]),{classes:v,cx:_}=C({withPadding:o,listStyleType:i,center:l,spacing:c},{classNames:y,styles:h,name:"List",unstyled:g,size:a,variant:b});return d.createElement(f,{value:{spacing:c,center:l,icon:p,listStyleType:i,size:a,withPadding:o,classNames:y,styles:h,unstyled:g,variant:b}},d.createElement(x.x,List_spreadValues({component:"unordered"===n?"ul":"ol",className:_(v.root,m),ref:t},j),s))});V.Item=k,V.displayName="@mantine/core/List";var A=r(3979),F=r(6680),H=r(2922),B=r(2767),D=r(1098),K=r(4397),U=(0,K.Z)("loader","IconLoader",[["path",{d:"M12 6l0 -3",key:"svg-0"}],["path",{d:"M16.25 7.75l2.15 -2.15",key:"svg-1"}],["path",{d:"M18 12l3 0",key:"svg-2"}],["path",{d:"M16.25 16.25l2.15 2.15",key:"svg-3"}],["path",{d:"M12 18l0 3",key:"svg-4"}],["path",{d:"M7.75 16.25l-2.15 2.15",key:"svg-5"}],["path",{d:"M6 12l-3 0",key:"svg-6"}],["path",{d:"M7.75 7.75l-2.15 -2.15",key:"svg-7"}]]),W=(0,K.Z)("circle-dashed","IconCircleDashed",[["path",{d:"M8.56 3.69a9 9 0 0 0 -2.92 1.95",key:"svg-0"}],["path",{d:"M3.69 8.56a9 9 0 0 0 -.69 3.44",key:"svg-1"}],["path",{d:"M3.69 15.44a9 9 0 0 0 1.95 2.92",key:"svg-2"}],["path",{d:"M8.56 20.31a9 9 0 0 0 3.44 .69",key:"svg-3"}],["path",{d:"M15.44 20.31a9 9 0 0 0 2.92 -1.95",key:"svg-4"}],["path",{d:"M20.31 15.44a9 9 0 0 0 .69 -3.44",key:"svg-5"}],["path",{d:"M20.31 8.56a9 9 0 0 0 -1.95 -2.92",key:"svg-6"}],["path",{d:"M15.44 3.69a9 9 0 0 0 -3.44 -.69",key:"svg-7"}]]),q=(0,K.Z)("circle-minus","IconCircleMinus",[["path",{d:"M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0",key:"svg-0"}],["path",{d:"M9 12l6 0",key:"svg-1"}]]),$=r(9804),J=r(3738),X=r(52);async function runTests(){let e=(0,X.bH)(),t=await (0,X.ri)(e,"/api/manufacture/tests/run/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({authToken:e.token})}),{testRunId:r}=await t.json();return r}async function abortTests(e){let t=(0,X.bH)();await (0,X.ri)(t,"/api/manufacture/tests/abort/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({testRunId:e})})}async function checkTestsRun(e){let t=(0,X.bH)(),r=await (0,X.ri)(t,"/api/manufacture/tests/check/?testRunId=".concat(e),{method:"GET",headers:{"Content-Type":"application/json"}}),s=await r.json();return s}function ManufacturingTests(e){let{internetConnected:t}=e,[r,u]=(0,d.useState)(!1),[p,f]=(0,d.useState)(void 0),[m,h]=(0,d.useState)([]),[y,g]=(0,d.useState)(void 0);(0,d.useEffect)(()=>{if(!p)return;let testCheck=async()=>{let t;try{t=await checkTestsRun(p)}catch(t){(0,F.c0)({title:"Failed to check tests status",message:"Failed tests. Please start tests again.",withCloseButton:!0,color:"red",autoClose:5e3,icon:(0,s.jsx)(H.Z,{})}),e(),f(void 0),u(!1);return}if(h([...t.tests]),t.wasAborted)g({status:"aborted",startedOn:t.startedOn,finishedOn:t.finishedOn}),e(),f(void 0),u(!1);else if(t.finishedOn){let r=t.tests.some(e=>"failed"===e.result.status);g({status:r?"failed":"passed",startedOn:t.startedOn,finishedOn:t.finishedOn}),e(),f(void 0),u(!1)}},e=(0,J.As)(testCheck,1e3);return()=>{e(),f(void 0),u(!1)}},[p]);let b=m.map((e,t)=>(0,s.jsx)(TestItem,{test:e},t));return(0,s.jsxs)(n.K,{spacing:"xl",h:"100%",children:[y&&"failed"===y.status&&(0,s.jsx)(a.b,{icon:(0,s.jsx)(B.Z,{size:"1rem"}),title:"Tests failed",color:"red",children:"Test execution completed unsuccessfully. Please check errors in the individual tests results below."}),y&&"passed"===y.status&&(0,s.jsx)(a.b,{icon:(0,s.jsx)(D.Z,{size:"1rem"}),title:"Tests completed successfully",color:"green",children:"Test execution completed successfully. You can finalize the manufacturing process now."}),y&&"aborted"===y.status&&(0,s.jsx)(a.b,{icon:(0,s.jsx)(B.Z,{size:"1rem"}),title:"Tests aborted",color:"orange",children:"Test execution was aborted. Please restart."}),(0,s.jsx)(i.x,{fz:"xs",c:"gray",children:"This action will request the remote server to send a suit of testing commands to the device's API."}),(0,s.jsx)(i.x,{fz:"xs",fw:"bold",children:"To run tests successfully it is required to have Novatek-Electro OB-215 connected to OPCB through USB-RS485. OB-215 should have factory settings."}),(0,s.jsxs)(o.Z,{children:[r?(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(l.z,{color:"orange",onClick:async()=>{p&&(await abortTests(p),f(void 0))},children:"Abort tests"}),(0,s.jsx)(c.a,{})]}):(0,s.jsx)(l.z,{onClick:async()=>{let e;u(!0),h([]),g(void 0);try{e=await runTests()}catch(e){(0,F.c0)({title:"Failed to start tests",message:"Failed to start tests. Please try again.",withCloseButton:!0,color:"red",autoClose:5e3,icon:(0,s.jsx)(H.Z,{})}),u(!1);return}f(e)},disabled:!t,children:"Run tests"}),y&&(0,s.jsxs)(i.x,{fz:"xs",c:"dimmed",children:["Run started: ",(0,$.o0)(y.startedOn,!0,!0),","]}),y&&y.finishedOn&&(0,s.jsxs)(i.x,{fz:"xs",c:"dimmed",children:["Run finished: ",(0,$.o0)(y.finishedOn,!0,!0),","]})]}),(0,s.jsx)(V,{spacing:"md",size:"sm",children:b})]})}function TestItem(e){let{test:t}=e;return(0,s.jsxs)(V.Item,{icon:"waiting"===t.result.status&&(0,s.jsx)(A.k,{color:"grey",size:20,radius:"xl",p:"0",children:(0,s.jsx)(U,{size:"1rem"})})||"running"===t.result.status&&(0,s.jsx)(A.k,{color:"blue",size:20,radius:"xl",p:"0",children:(0,s.jsx)(W,{size:"1rem"})})||"aborted"===t.result.status&&(0,s.jsx)(A.k,{color:"grey",size:20,radius:"xl",p:"0",children:(0,s.jsx)(q,{size:"1rem"})})||"passed"===t.result.status&&(0,s.jsx)(A.k,{color:"teal",size:20,radius:"xl",p:"0",children:(0,s.jsx)(D.Z,{size:"1rem"})})||"failed"===t.result.status&&(0,s.jsx)(A.k,{color:"red",size:20,radius:"xl",p:"0",children:(0,s.jsx)(B.Z,{size:"1rem"})}),children:[(0,s.jsxs)(o.Z,{children:[(0,s.jsx)(i.x,{children:t.name}),"startedOn"in t.result&&(0,s.jsxs)(i.x,{c:"gray",children:["Started: ",(0,$.o0)(t.result.startedOn,!0,!0)]}),"finishedOn"in t.result&&(0,s.jsxs)(i.x,{c:"gray",children:["Finished: ",(0,$.o0)(t.result.finishedOn,!0,!0)]})]}),(0,s.jsxs)(V,{listStyleType:"inherit",children:[(0,s.jsxs)(V.Item,{children:[(0,s.jsx)(i.x,{fz:"xs",c:"grey",children:t.description}),"log"in t&&t.log.length>0&&(0,s.jsx)("pre",{children:t.log.split("\n").map(e=>{let t=(0,$.o0)(e.slice(0,e.indexOf(" ")-1),!0,!0),r=e.slice(e.indexOf(" ")+1);return"".concat(t," ").concat(r)}).join("\n")})]}),"error"in t.result&&(0,s.jsx)(V.Item,{children:(0,s.jsxs)(i.x,{fz:"xs",c:"red",children:["error: ",t.result.error]})})]})]})}var G=r(6035),Q=r(2094),Y=r(8410);function Page(){let e=(0,Y.H)();return e.data?(0,s.jsx)(G.Z,{id:"test",title:"Automated testing",children:(0,s.jsx)(ManufacturingTests,{internetConnected:e.data.internetConnected})}):(0,s.jsx)(Q.Z,{pageTitle:"Manufacturing tests",contentIsLoading:!0})}}},function(e){e.O(0,[217,666,161,767,94,774,888,179],function(){return e(e.s=77)}),_N_E=e.O()}]);