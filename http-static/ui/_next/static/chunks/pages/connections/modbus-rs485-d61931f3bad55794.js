(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[469],{9116:function(e,t,n){"use strict";function a(e,t){let n=t||!0;return t=>"string"!=typeof t?n:e.test(t)?null:n}n.d(t,{w:function(){return a}})},6993:function(e,t,n){"use strict";n.d(t,{Z:function(){return a}});var a=(0,n(7557).Z)("refresh","IconRefresh",[["path",{d:"M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4",key:"svg-0"}],["path",{d:"M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4",key:"svg-1"}]])},7764:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/connections/modbus-rs485",function(){return n(588)}])},806:function(e,t,n){"use strict";n.d(t,{Z:function(){return l}});var a=n(6521),i=n(2251),s=n(4584),o=n(1876),r=n(641),d=n(4116),c=n(6993);function l(e){let t=(0,i.rZ)();return(0,a.jsx)(s.Ph,{...Object.fromEntries(Object.entries(e).filter(e=>{let[t]=e;return -1===["addValue","update","isLoading"].indexOf(t)})),searchable:!0,creatable:!0,withinPortal:!0,label:e.label,nothingFound:"Nothing found",getCreateLabel:e=>"+ Add interface: ".concat(e),onCreate:t=>(e.addValue(t),{value:t,label:t}),rightSectionWidth:50,rightSection:(0,a.jsxs)(o.Z,{spacing:"xs",position:"right",children:[e.isLoading?(0,a.jsx)(r.a,{size:14}):(0,a.jsx)(c.Z,{color:t.colors.blue[6],size:14,onClick:()=>{e.update()},style:{cursor:"pointer",pointerEvents:"all"}}),(0,a.jsx)(d.D,{size:"md",error:e.error})]}),styles:{rightSection:{pointerEvents:"none"}}})}},8688:function(e,t,n){"use strict";n.d(t,{$b:function(){return s},Cu:function(){return d},Mn:function(){return o},tz:function(){return c},v4:function(){return r}});var a=n(4579),i=n(4911);function s(){return(0,a.tQ)("/api/rs485-connections/",i.ph)}async function o(e){let t=(0,a.bH)();await (0,a.ri)(t,"/api/rs485-connection/".concat(e.deviceName,"/update/"),{method:"POST",body:JSON.stringify(e),timeoutMs:3e4})}async function r(e){let t=(0,a.bH)();await (0,a.ri)(t,"/api/rs485-connections/create/",{method:"POST",body:JSON.stringify(e),timeoutMs:3e4})}async function d(e){let t=(0,a.bH)();return await (0,a.ri)(t,"/api/rs485-connection/".concat(e,"/remove/"),{method:"POST",body:JSON.stringify({}),timeoutMs:3e4}),(0,i.ph)(["/api/rs485-connections/",t])}let c={deviceName:"ttyUSB0",mode:"rtu-master",uidRange:"1-255",responseTimeoutMs:300,baudRate:9600,stopAndParityBits:"2N",broadcastIsEnabled:!0,isEnabled:!0,gatewayGeneratedExceptions:{pathUnavalableCode:1,targetDeviceFailedToRespondCode:2},portOpenRetryPeriod:5}},588:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return X}});var a=n(6521),i=n(5388),s=n(7961),o=n(8202),r=n(1876),d=n(5885),c=n(5789),l=n(5721),u=n(1120),m=n(594),x=n(9296),p=n(8997),v=n(8026),h=n(4584),b=n(8508),g=n(4094),f=n(3126),j=n(9116),y=n(823),S=n(6686),Z=n(3790),w=n(6338),R=n(4579);async function C(e){let[t,n]=e;return(await (0,R.ri)(n,t)).json()}var N=n(1685),E=n(7176),M=n(9578),O=n(2195),P=n(806);function T(e){let{initialValues:t,onSubmit:n,saving:s}=e,{classes:o}=(0,M.Z)(),r=(0,f.c)({initialValues:t,validate:{uidRange:(0,j.w)(/^(\d+-\d+,)*\d+-\d+$/,'Invalid range, use format "1-10,30-40"'),responseTimeoutMs:(0,y.m)({min:1,max:6e4},"Must be between 1 and 60000"),gatewayGeneratedExceptions:{pathUnavalableCode:(0,y.m)({min:1,max:255},"Must be between 1 and 255"),targetDeviceFailedToRespondCode:(0,y.m)({min:1,max:255},"Must be between 1 and 255")},portOpenRetryPeriod:(0,y.m)({min:1,max:600},"Must be between 1 and 600"),deviceName:(0,j.w)(/^[a-zA-Z0-9_-]{2,20}$/,"Invalid device name, can contain only letters and numbers, 20 cahracters max")}}),[c,u]=(0,l.useState)(!1),[m,x,T,z]=function(e,t){let[n,a]=(0,l.useState)(e),{data:i,mutate:s,isLoading:o}=function(){let e=(0,R.tQ)("/api/list/ttys/",C);return{data:e.data,isLoading:e.isLoading||e.isValidating,mutate:t=>{t?e.mutate(t,{revalidate:!1}):e.mutate()}}}(),r=[];return[r=(r=r.concat(...i?i.filter(e=>!t.includes(e)).map(e=>({value:e,label:e})):[])).concat(...n.map(e=>({value:e,label:e}))),o,s,a]}([],r.values.usedTtys||[]),I="create"===r.values.formMode;I&&""===r.values.deviceName&&m.length>0&&r.setFieldValue("deviceName",m[0].value);let V=(0,E.u)(r,"update"===r.values.formMode?o.dirtyInput:void 0);return(0,a.jsx)("form",{onSubmit:r.onSubmit(async e=>{let t=await n(e);t&&r.resetDirty()}),children:(0,a.jsxs)(i.K,{children:["create"===r.values.formMode?(0,a.jsx)(P.Z,{label:"Device (TTY):",data:m,isLoading:x,addValue:e=>{z(t=>t.concat(e))},update:T,...V("deviceName"),required:!0}):(0,a.jsx)(p.r,{label:"Enabled",...V("isEnabled","checkbox")}),(0,a.jsx)(v.U,{in:r.values.isEnabled,children:(0,a.jsxs)(i.K,{children:[(0,a.jsx)(h.Ph,{withinPortal:!0,label:"Mode:",data:w.EH,...V("mode")}),("rtu-master"===r.values.mode||"ascii-master"===r.values.mode)&&(0,a.jsx)(b.o,{label:"Device ID range:",...V("uidRange")}),(0,a.jsx)(h.Ph,{withinPortal:!0,label:"Baud rate:",data:w._.map(e=>({value:e.toString(),label:e.toString()})),...V("baudRate"),value:r.values.baudRate.toString(),onChange:e=>{r.setFieldValue("baudRate",parseInt(e||"9600",10))}}),(0,a.jsx)(h.Ph,{withinPortal:!0,label:"Stop and parity bits:",data:w.J4,...V("stopAndParityBits")}),c?(0,a.jsx)(d.z,{variant:"subtle",compact:!0,leftIcon:(0,a.jsx)(S.Z,{size:14}),size:"xs",onClick:()=>u(!1),children:"Hide advanced settings"}):(0,a.jsx)(d.z,{variant:"subtle",compact:!0,leftIcon:(0,a.jsx)(Z.Z,{size:14}),size:"xs",onClick:()=>u(!0),children:"Show advanced settings"}),(0,a.jsx)(v.U,{in:c,transitionDuration:100,children:(0,a.jsxs)(i.K,{children:[(0,a.jsx)(g.Y,{label:"Response timeout (ms):",required:!0,...V("responseTimeoutMs")}),(0,a.jsx)(g.Y,{label:"Retry period on port open failure (s):",required:!0,...V("portOpenRetryPeriod")}),(0,a.jsx)(O.Z,{label:"Path unavailable error code (HEX):",hex:!0,required:!0,...V("gatewayGeneratedExceptions.pathUnavalableCode")}),(0,a.jsx)(O.Z,{label:"Target device failed to respond error code (HEX):",hex:!0,required:!0,...V("gatewayGeneratedExceptions.targetDeviceFailedToRespondCode")})]})})]})}),(0,a.jsx)(N.Z,{type:"submit",inProgress:s,children:"Save"})]})})}var z=n(9011),I=n(9886),V=n(9710),k=n(2628),A=n(2737),B=n(218),D=n(8688),_=n(2404),L=n(9318),U=n(4166),F=n(8581),H=n(9016),K=n(3611);function q(e){let{settings:t,status:n,mutate:s,onSettingsUpdate:o}=e,[c,u]=(0,l.useState)(!1);return(0,a.jsx)(F.Z,{name:t.deviceName,icon:(null==n?void 0:n.info.status)==="connected"?(0,a.jsx)(V.Z,{}):(0,a.jsx)(k.Z,{}),status:(null==n?void 0:n.info.status)==="connected"?"connected":(null==n?void 0:n.info.status)==="attempting"?"disconnected":"disabled",settings:{title:"RS-485 port settings: ".concat(t.deviceName),form:T,useSettings:()=>({data:{...t,formMode:"update"},error:void 0,isValidating:!1,isLoading:!1,mutate:async()=>void 0}),save:D.Mn,onSettingsUpdate:o},addElRight:(0,a.jsx)(K.Z,{title:"Delete conection",description:'Are you sure you want to delete the connection "'.concat(t.deviceName,'"?'),buttonText:"Delete",children:(0,a.jsx)(z.A,{color:"red",onClick:()=>{(0,E.M)(()=>s((0,D.Cu)(t.deviceName),{optimisticData:e=>e.filter(e=>e.deviceName!==t.deviceName)}))},children:(0,a.jsx)(A.Z,{size:18})})}),children:n?(0,a.jsxs)(i.K,{spacing:0,children:["connected"===n.info.status?(0,a.jsxs)(r.Z,{align:"start",p:"sm",children:[(0,a.jsx)(H.Z,{name:"Connected as",nameColor:"green",mainVal:(n.mode.isAscii?"ASCII":"RTU")+("slave"===n.mode.status?" slave":" master"),subVal:(0,B.o0)(n.info.connectedOn,!0)}),"master"===n.mode.status&&(0,a.jsx)(H.Z,{name:"Routes",mainVal:n.mode.routes}),(0,a.jsx)(U.Z,{bytes:n.info.rxtx.rxTotalBytes,lastBytesSinceSec:n.info.rxtx.rxLastBytesSinceSec,speed:n.info.rxtx.rxSpeedBytesPerSec,oneline:!1}),(0,a.jsx)(U.Z,{bytes:n.info.rxtx.txTotalBytes,lastBytesSinceSec:n.info.rxtx.txLastBytesSinceSec,speed:n.info.rxtx.txSpeedBytesPerSec,tx:!0,oneline:!1})]}):"attempting"===n.info.status?(0,a.jsxs)(r.Z,{align:"start",p:"sm",children:[(0,a.jsx)(H.Z,{name:"Connecting as",nameColor:"red",mainVal:(n.mode.isAscii?"ASCII":"RTU")+("slave"===n.mode.status?" slave":" master"),subVal:n.info.lastConnectedOn&&(0,a.jsxs)(a.Fragment,{children:["Last successful connection was on ",(0,a.jsx)("br",{}),(0,B.o0)(n.info.lastConnectedOn)]})}),(0,a.jsx)(H.Z,{name:"Error",nameColor:"red",mainVal:n.info.lastError||"-",subVal:"Attempt: ".concat(n.info.attemptsNum)})]}):(0,a.jsx)(_.Z,{text:"Port disabled in settings."}),"connected"===n.info.status&&(0,a.jsxs)(i.K,{bg:"gray.0",sx:e=>({borderTop:"1px solid ".concat(e.colors.gray[3])}),p:2,spacing:0,children:[(0,a.jsx)(r.Z,{children:c?(0,a.jsx)(d.z,{variant:"subtle",compact:!0,leftIcon:(0,a.jsx)(S.Z,{size:14}),size:"xs",onClick:()=>u(!1),children:"Hide debug tools"}):(0,a.jsx)(d.z,{variant:"subtle",compact:!0,leftIcon:(0,a.jsx)(Z.Z,{size:14}),size:"xs",onClick:()=>u(!0),children:"Show debug tools"})}),(0,a.jsx)(v.U,{in:c,transitionDuration:100,children:(0,a.jsx)(L.Z,{dst:"RSO-".concat(t.deviceName),mode:"rtu-master"===t.mode||"rtu-slave"===t.mode?"rtu":"ascii",isMaster:"rtu-master"===t.mode||"ascii-master"===t.mode})})]})]}):(0,a.jsxs)(r.Z,{p:"xs",spacing:"xs",children:[(0,a.jsx)(I.O,{width:100,height:70,radius:"sm"}),(0,a.jsx)(I.O,{width:100,height:70,radius:"sm"}),(0,a.jsx)(I.O,{width:200,height:70,radius:"sm"})]})})}var G=n(5062);function X(){var e;let t=(0,D.$b)(),n=(0,G.RW)(),[p,v]=(0,l.useState)(!1),h=(null===(e=t.data)||void 0===e?void 0:e.length)?t.data.map(e=>e.deviceName):[];return t.data&&n.data?(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(m.Z,{title:"Add RS-485 connection",onSettingsUpdate:()=>{t.mutate()},form:T,useSettings:()=>({data:{formMode:"create",deviceName:"",isEnabled:!0,mode:"rtu-slave",uidRange:"1-255",responseTimeoutMs:300,baudRate:9600,stopAndParityBits:"2N",broadcastIsEnabled:!1,gatewayGeneratedExceptions:{pathUnavalableCode:10,targetDeviceFailedToRespondCode:11},portOpenRetryPeriod:5,usedTtys:h},error:void 0,isValidating:!1,isLoading:!1,mutate:async()=>void 0}),save:D.v4,opened:p,setOpened:v}),(0,a.jsx)(u.Z,{pageId:"modbus-rs485",title:"Modbus Over RS-485",children:(0,a.jsxs)(i.K,{children:[t.data.length>0?t.data.map(e=>(0,a.jsx)(q,{settings:e,status:n.data&&n.data[e.deviceName],onSettingsUpdate:()=>{t.mutate()},mutate:t.mutate},e.deviceName)):(0,a.jsx)(s.X,{p:"lg",bg:"gray.1",withBorder:!0,children:(0,a.jsx)(o.x,{ta:"center",fz:"sm",children:"No RS-485 connections created."})}),(0,a.jsx)(r.Z,{children:(0,a.jsx)(d.z,{onClick:()=>{v(!0)},leftIcon:(0,a.jsx)(c.Z,{}),children:"Add RS-485 connection"})})]})})]}):(0,a.jsx)(x.Z,{pageTitle:"Modbus Over RS-485",contentIsLoading:!0})}}},function(e){e.O(0,[634,733,301,979,964,105,691,296,205,39,774,888,179],function(){return e(e.s=7764)}),_N_E=e.O()}]);