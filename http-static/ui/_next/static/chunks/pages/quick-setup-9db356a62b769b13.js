(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[181],{2671:function(e,t,a){"use strict";a.d(t,{E:function(){return N}});var r=a(3900),n=a(1949),i=a(5728),s=a(3602),o=Object.defineProperty,l=Object.getOwnPropertySymbols,u=Object.prototype.hasOwnProperty,c=Object.prototype.propertyIsEnumerable,__defNormalProp=(e,t,a)=>t in e?o(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a,__spreadValues=(e,t)=>{for(var a in t||(t={}))u.call(t,a)&&__defNormalProp(e,a,t[a]);if(l)for(var a of l(t))c.call(t,a)&&__defNormalProp(e,a,t[a]);return e},__objRest=(e,t)=>{var a={};for(var r in e)u.call(e,r)&&0>t.indexOf(r)&&(a[r]=e[r]);if(null!=e&&l)for(var r of l(e))0>t.indexOf(r)&&c.call(e,r)&&(a[r]=e[r]);return a};function ImageIcon(e){let{width:t,height:a,style:n}=e,i=__objRest(e,["width","height","style"]);return r.createElement("svg",__spreadValues({viewBox:"0 0 15 15",fill:"none",xmlns:"http://www.w3.org/2000/svg",style:__spreadValues({width:t,height:a},n)},i),r.createElement("path",{d:"M2.5 1H12.5C13.3284 1 14 1.67157 14 2.5V12.5C14 13.3284 13.3284 14 12.5 14H2.5C1.67157 14 1 13.3284 1 12.5V2.5C1 1.67157 1.67157 1 2.5 1ZM2.5 2C2.22386 2 2 2.22386 2 2.5V8.3636L3.6818 6.6818C3.76809 6.59551 3.88572 6.54797 4.00774 6.55007C4.12975 6.55216 4.24568 6.60372 4.32895 6.69293L7.87355 10.4901L10.6818 7.6818C10.8575 7.50607 11.1425 7.50607 11.3182 7.6818L13 9.3636V2.5C13 2.22386 12.7761 2 12.5 2H2.5ZM2 12.5V9.6364L3.98887 7.64753L7.5311 11.4421L8.94113 13H2.5C2.22386 13 2 12.7761 2 12.5ZM12.5 13H10.155L8.48336 11.153L11 8.6364L13 10.6364V12.5C13 12.7761 12.7761 13 12.5 13ZM6.64922 5.5C6.64922 5.03013 7.03013 4.64922 7.5 4.64922C7.96987 4.64922 8.35078 5.03013 8.35078 5.5C8.35078 5.96987 7.96987 6.35078 7.5 6.35078C7.03013 6.35078 6.64922 5.96987 6.64922 5.5ZM7.5 3.74922C6.53307 3.74922 5.74922 4.53307 5.74922 5.5C5.74922 6.46693 6.53307 7.25078 7.5 7.25078C8.46693 7.25078 9.25078 6.46693 9.25078 5.5C9.25078 4.53307 8.46693 3.74922 7.5 3.74922Z",fill:"currentColor",fillRule:"evenodd",clipRule:"evenodd"}))}var d=a(9025),m=Object.defineProperty,p=Object.defineProperties,f=Object.getOwnPropertyDescriptors,g=Object.getOwnPropertySymbols,v=Object.prototype.hasOwnProperty,h=Object.prototype.propertyIsEnumerable,Image_styles_defNormalProp=(e,t,a)=>t in e?m(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a,Image_styles_spreadValues=(e,t)=>{for(var a in t||(t={}))v.call(t,a)&&Image_styles_defNormalProp(e,a,t[a]);if(g)for(var a of g(t))h.call(t,a)&&Image_styles_defNormalProp(e,a,t[a]);return e},__spreadProps=(e,t)=>p(e,f(t)),b=(0,d.k)((e,{radius:t})=>({root:{},imageWrapper:{position:"relative"},figure:{margin:0},image:__spreadProps(Image_styles_spreadValues({},e.fn.fontStyles()),{display:"block",width:"100%",height:"100%",border:0,borderRadius:e.fn.radius(t)}),caption:{color:"dark"===e.colorScheme?e.colors.dark[2]:e.colors.gray[7],marginTop:e.spacing.xs},placeholder:__spreadProps(Image_styles_spreadValues({},e.fn.cover()),{display:"flex",alignItems:"center",justifyContent:"center",color:"dark"===e.colorScheme?e.colors.dark[2]:e.colors.gray[6],backgroundColor:"dark"===e.colorScheme?e.colors.dark[8]:e.colors.gray[0],borderRadius:e.fn.radius(t)})})),y=a(3127),S=a(9956),w=Object.defineProperty,_=Object.defineProperties,j=Object.getOwnPropertyDescriptors,k=Object.getOwnPropertySymbols,P=Object.prototype.hasOwnProperty,x=Object.prototype.propertyIsEnumerable,Image_defNormalProp=(e,t,a)=>t in e?w(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a,Image_spreadValues=(e,t)=>{for(var a in t||(t={}))P.call(t,a)&&Image_defNormalProp(e,a,t[a]);if(k)for(var a of k(t))x.call(t,a)&&Image_defNormalProp(e,a,t[a]);return e},Image_spreadProps=(e,t)=>_(e,j(t)),Image_objRest=(e,t)=>{var a={};for(var r in e)P.call(e,r)&&0>t.indexOf(r)&&(a[r]=e[r]);if(null!=e&&k)for(var r of k(e))0>t.indexOf(r)&&x.call(e,r)&&(a[r]=e[r]);return a};let I={fit:"cover",width:"100%",height:"auto",radius:0},N=(0,r.forwardRef)((e,t)=>{let a=(0,n.N4)("Image",I,e),{className:o,alt:l,src:u,fit:c,width:d,height:m,radius:p,imageProps:f,withPlaceholder:g,placeholder:v,imageRef:h,classNames:w,styles:_,caption:j,unstyled:k,style:P,variant:x}=a,N=Image_objRest(a,["className","alt","src","fit","width","height","radius","imageProps","withPlaceholder","placeholder","imageRef","classNames","styles","caption","unstyled","style","variant"]),{classes:C,cx:O}=b({radius:p},{classNames:w,styles:_,unstyled:k,name:"Image",variant:x}),[E,T]=(0,r.useState)(!u),R=g&&E;return(0,s.l)(()=>{T(!u)},[u]),r.createElement(y.x,Image_spreadValues({className:O(C.root,o),style:Image_spreadValues({width:(0,i.h)(d)},P),ref:t},N),r.createElement("figure",{className:C.figure},r.createElement("div",{className:C.imageWrapper},r.createElement("img",Image_spreadProps(Image_spreadValues({src:u,alt:l,ref:h},f),{className:O(C.image,null==f?void 0:f.className),onError:e=>{T(!0),"function"==typeof(null==f?void 0:f.onError)&&f.onError(e)},style:Image_spreadValues(Image_spreadValues({objectFit:c,width:(0,i.h)(d),height:(0,i.h)(m)},R&&{overflow:"hidden"}),null==f?void 0:f.style)})),R&&r.createElement("div",{className:C.placeholder,title:l},v||r.createElement("div",null,r.createElement(ImageIcon,{width:(0,i.h)(40),height:(0,i.h)(40)})))),!!j&&r.createElement(S.x,{component:"figcaption",size:"sm",align:"center",className:C.caption},j)))});N.displayName="@mantine/core/Image"},1457:function(e,t,a){"use strict";a.d(t,{Z:function(){return r}});var r=(0,a(4397).Z)("alert-triangle","IconAlertTriangle",[["path",{d:"M12 9v4",key:"svg-0"}],["path",{d:"M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636 -2.87l-8.106 -13.536a1.914 1.914 0 0 0 -3.274 0z",key:"svg-1"}],["path",{d:"M12 16h.01",key:"svg-2"}]])},2968:function(e,t,a){"use strict";a.d(t,{Z:function(){return r}});var r=(0,a(4397).Z)("refresh","IconRefresh",[["path",{d:"M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4",key:"svg-0"}],["path",{d:"M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4",key:"svg-1"}]])},6876:function(e,t,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/quick-setup",function(){return a(6946)}])},4665:function(e,t,a){"use strict";a.d(t,{s:function(){return MainLoader}});var r=a(966),n=a(8070),i=a(2489),s=a(6446),o=a(3900);function MainLoader(e){let t=(0,s.useRouter)(),[a,l]=(0,o.useState)(!0);return(0,o.useEffect)(()=>{let handleStart=()=>{l(!1)},handleStop=()=>{l(!0)};return t.events.on("routeChangeStart",handleStart),t.events.on("routeChangeComplete",handleStop),t.events.on("routeChangeError",handleStop),()=>{t.events.off("routeChangeStart",handleStart),t.events.off("routeChangeComplete",handleStop),t.events.off("routeChangeError",handleStop)}},[t]),(0,o.useEffect)(()=>{e.dataLoaded&&a||e.dataErrored?!a||e.dataLoaded||e.dataErrored?(0,n.We)():(0,n.fD)(50):(0,n.QT)()},[e.dataLoaded,e.dataErrored,a]),(0,r.jsx)(i.V,{autoReset:!0})}},9804:function(e,t,a){"use strict";a.d(t,{LU:function(){return formatDuration},k6:function(){return localTimeString},o0:function(){return formatDateTime}});var r=a(9089),n=a.n(r),i=a(3572),s=a.n(i);function formatDateTime(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],a=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=a?"YYYY-MM-DD HH:mm:ss":"YYYY-MM-DD HH:mm";return t?n()(e).format(r):n()(e).utc().format(r)}function localTimeString(e){return"".concat(e.toLocaleTimeString(),".").concat(e.getMilliseconds().toString().padStart(3,"0"))}function formatDuration(e){let t=Math.floor(e/36e5),a=Math.floor((e-36e5*t)/6e4),r=Math.floor((e-36e5*t-6e4*a)/1e3);return"".concat(t,"h ").concat(a,"m ").concat(r,"s")}n().extend(s())},8575:function(e,t,a){"use strict";a.d(t,{$b:function(){return useRs485Settings},Cu:function(){return deleteRs485},Mn:function(){return updateRs485},tz:function(){return i},v4:function(){return createRs485}});var r=a(52),n=a(3738);function useRs485Settings(){return(0,r.tQ)("/api/rs485-connections/",n.ph)}async function updateRs485(e){let t=(0,r.bH)();await (0,r.ri)(t,"/api/rs485-connection/".concat(e.deviceName,"/update/"),{method:"POST",body:JSON.stringify(e),timeoutMs:3e4})}async function createRs485(e){let t=(0,r.bH)();await (0,r.ri)(t,"/api/rs485-connections/create/",{method:"POST",body:JSON.stringify(e),timeoutMs:3e4})}async function deleteRs485(e){let t=(0,r.bH)();return await (0,r.ri)(t,"/api/rs485-connection/".concat(e,"/remove/"),{method:"POST",body:JSON.stringify({}),timeoutMs:3e4}),(0,n.ph)(["/api/rs485-connections/",t])}let i={deviceName:"ttyUSB0",mode:"rtu-master",uidRange:"1-255",responseTimeoutMs:300,baudRate:9600,stopAndParityBits:"2N",broadcastIsEnabled:!0,isEnabled:!0,gatewayGeneratedExceptions:{pathUnavalableCode:1,targetDeviceFailedToRespondCode:2},portOpenRetryPeriod:5}},1260:function(e,t,a){"use strict";a.d(t,{cH:function(){return makeTimezoneRecord},rV:function(){return useSettings},zQ:function(){return saveSettings}});var r=a(52),n=a(3738);async function settingsFetcher(e){var t;let[a,r]=e,i=await (0,n.wv)(r,["global:time:timezone","global:time:useNtp"]),s=await (0,n.vn)(r,"/api/state/?keys=".concat("time:timezones"));return{timezone:i["global:time:timezone"]||"Etc/UTC",useNtp:"true"===i["global:time:useNtp"],timezonesList:(null===(t=s["time:timezones"])||void 0===t?void 0:t.split("\n"))||[],setTime:new Date}}function useSettings(){let e=(0,r.tQ)("time-settings",settingsFetcher);return{...e}}function makeTimezoneRecord(e){let t={"global:time:timezone":e.timezone,"global:time:useNtp":e.useNtp?"true":"false"};return t}async function saveSettings(e){let t=(0,r.bH)(),a=makeTimezoneRecord(e);if(await (0,r.ri)(t,"/api/confs/set/",{method:"POST",body:JSON.stringify(a),timeoutMs:3e4}),!e.useNtp&&e.setTime){let a=e.setTime;await (0,r.ri)(t,"/api/set-time/",{method:"POST",body:JSON.stringify({time:a.toISOString()}),timeoutMs:3e4})}}},1827:function(e,t,a){"use strict";a.d(t,{A:function(){return useBasicSettings}});var r=a(52),n=a(3738);async function basicSettingsFetcher(e){let[t,a]=e,r="global:modelName,global:userProvidedDeviceName,global:quickSetupIsDone",i=await (0,n.vn)(a,"/api/confs/?keys=".concat(r));r="release:date,release:version,release:updateState,release:latestPatch:version,release:latestMinor:version,release:latestMajor:version,release:scheduledUpgradeToTag,release:lastSuccessfulUpgradeRef,manufacturer:modeEnabled";let s=await (0,n.vn)(a,"/api/state/?keys=".concat(r)),o="no-update";if(s["release:scheduledUpgradeToTag"]){let e=s["release:scheduledUpgradeToTag"],t=e.split("/");t.length>1&&(e=t[1]),o={kind:"scheduled",version:e}}else"disabled"===s["release:updateState"]?o="disabled":"no-repo"===s["release:updateState"]?o="no-repo":"dirty-repo"===s["release:updateState"]?o="dirty-repo":"broken-repo"===s["release:updateState"]?o="broken-repo":"available-update-patch"===s["release:updateState"]?o={kind:"available",version:s["release:latestPatch:version"]||"unknown version"}:"available-update-minor"===s["release:updateState"]?o={kind:"available",version:s["release:latestMinor:version"]||"unknown version"}:"available-update-major"===s["release:updateState"]?o={kind:"available",version:s["release:latestMajor:version"]||"unknown version"}:"imminent-upgrade"===s["release:updateState"]&&(o="upgrading");return{userProvidedName:i["global:userProvidedDeviceName"]||void 0,modelName:i["global:modelName"]||"OPCB",quickSetupIsDone:"true"===i["global:quickSetupIsDone"],manufacturerModeEnabled:"true"===s["manufacturer:modeEnabled"],firmwareVersion:s["release:version"]||"unknown",firmwareDate:s["release:date"]||"-",updateState:o,lastSuccessfulUpgradeRef:s["release:lastSuccessfulUpgradeRef"]||void 0}}function useBasicSettings(){return(0,r.tQ)("basic-settings",basicSettingsFetcher)}},571:function(e,t,a){"use strict";a.d(t,{EH:function(){return s},_:function(){return i},dH:function(){return o},iC:function(){return isMaster},jz:function(){return useTtysSelectItems}});var r=a(3900),n=a(52);let i=[50,75,110,134,150,200,300,600,1200,1800,2400,4800,9600,19200,38400,57600,115200,230400,460800,5e5,576e3,921600,1e6,1152e3,15e5,2e6,25e5,3e6,35e5,4e6],s=[{label:"RTU slave",value:"rtu-slave"},{label:"ASCII slave",value:"ascii-slave"},{label:"RTU master",value:"rtu-master"},{label:"ASCII master",value:"ascii-master"},{label:"IPKA master",value:"ipka-master"}],o=[{label:"1N - 1 stop bit, no parity",value:"1N"},{label:"1E - 1 stop bit, even parity",value:"1E"},{label:"1O - 1 stop bit, odd parity",value:"1O"},{label:"2N - 2 stop bits, no parity",value:"2N"}];async function fetchTtys(e){let[t,a]=e;return(await (0,n.ri)(a,t)).json()}function useTtysSelectItems(e,t){let[a,i]=(0,r.useState)(e),{data:s,mutate:o,isLoading:l}=function(){let e=(0,n.tQ)("/api/list/ttys/",fetchTtys);return{data:e.data,isLoading:e.isLoading||e.isValidating,mutate:t=>{t?e.mutate(t,{revalidate:!1}):e.mutate()}}}(),u=[];return[u=(u=u.concat(...s?s.filter(e=>!t.includes(e)).map(e=>({value:e,label:e})):[])).concat(...a.map(e=>({value:e,label:e}))),l,o,i]}function isMaster(e){return"rtu-master"===e||"ascii-master"===e||"ipka-master"===e}},6946:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return Page}});var r=a(966),n=a(7696),i=a(7344),s=a(3624),o=a(462),l=a(2671),u=a(2763),c=a(480),d=a(9025),m=a(7432),p=a(6886),f=a(3283),g=a(9724),v=(0,a(4397).Z)("corner-down-right","IconCornerDownRight",[["path",{d:"M6 6v6a3 3 0 0 0 3 3h10l-4 -4m0 8l4 -4",key:"svg-0"}]]),h=a(717),b=a.n(h),y=a(6446),S=a(3900),w=a(4708),_=a(7219),j=a(7132),k=a(4665),P=a(4080),x=a(52),I=a(8512),N=a(3738),C=a(571),O=a(4859),E=a(8575),T=a(1260),R=a(281),M=a(1827);function Page(){let e=O.rV(),t=R.rV(),a=T.rV(),d=(0,x.pk)(),m=(0,M.A)(),[p,f]=(0,S.useState)(!1),g=(0,y.useRouter)();return(0,S.useEffect)(()=>{f("true"===g.query.standalone)},[g.query.standalone]),e.data&&t.data&&a.data&&m.data?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(k.s,{dataLoaded:!0,dataErrored:!1}),(0,r.jsx)(b(),{children:(0,r.jsx)("title",{children:"OPCB :: Quick Setup"})}),(0,r.jsx)(n.W,{size:420,my:40,mih:"950px",children:(0,r.jsxs)(o.K,{align:"center",children:[(0,r.jsx)(l.E,{src:"/media/opcb-top.png",width:150,height:150,alt:"OPCB"}),(0,r.jsx)(u.D,{align:"center",children:"OPCB :: Quick Setup"}),(0,r.jsx)(QuickSetupForm,{lanSettings:e,wifiSettings:t,timeSettings:a,basicSettings:m,isStandalone:p}),!p&&(0,r.jsxs)(c.e,{href:"/",onClick:()=>{d.token&&d.setToken({...d.token,skipQuickSetup:!0})},children:[(0,r.jsx)(v,{size:14,style:{marginRight:"5px"}}),"Skip and proceed to full interface"]})]})})]}):(0,r.jsx)(n.W,{size:"lg",mih:400,py:"lg",children:(0,r.jsx)(i.Z,{position:"center",p:"xl",children:(0,r.jsx)(s.a,{})})})}let z=(0,d.k)(()=>({form:{width:"100%"}}));function QuickSetupForm(e){let{lanSettings:t,wifiSettings:a,timeSettings:n,basicSettings:i,isStandalone:s}=e;if(!t.data||!a.data||!n.data)throw Error("Data is required for QuickSetupForm.");let{classes:l}=z(),c=s?n.data.timezone:(0,I.X6)(),{actionHandler:d}=(0,w.vu)(),[v,h]=(0,S.useState)("elan"),b=(0,g.c)({initialValues:{elan:{...t.data},wlan:{...a.data},time:{...n.data,timezone:c},rs485:{...E.tz}},validate:{elan:{...O.Rx},wlan:{...R.Rx}}}),y=(0,_.uA)(b),submitHandler=async()=>{await (0,N.NC)({...O.Up(b.values.elan),...R.Up(b.values.wlan),...T.cH(b.values.time),"global:quickSetupIsDone":"true"});try{await E.v4(b.values.rs485)}catch(e){await E.Mn(b.values.rs485)}await t.mutate(b.values.elan),await a.mutate(b.values.wlan),await n.mutate(b.values.time),await i.mutate()};return(0,r.jsx)("form",{className:l.form,onSubmit:b.onSubmit(async()=>{d({actionProcess:submitHandler,title:"Applying settings",failedTitle:"Setup failed.",failedId:"quick-setup-failed",startActionText:"Sending the settings to the device...",afterActionText:"Saving the settings...",successId:"quick-setup-success",successTitle:"Settings applied.",successMessage:"Internet connection, timezone and RS-485 connection saved in the device.",messageAfterDeviceWaitTimeout:(0,r.jsx)(w.zU,{}),redirectToDashboardAfterAction:!s,delayBeforeDeviceWait:5e3})}),children:(0,r.jsxs)(o.K,{spacing:"lg",children:[(0,r.jsxs)(o.K,{children:[(0,r.jsx)(u.D,{order:3,align:"center",children:"Internet Connection"}),(0,r.jsx)(m.s,{fullWidth:!0,data:[{value:"elan",label:"Ethernet"},{value:"wlan",label:"Wi-Fi"}],value:v,onChange:h}),"elan"===v?(0,r.jsx)(j.Z,{form:b}):(0,r.jsx)(P.Z,{form:b})]}),(0,r.jsxs)(o.K,{children:[(0,r.jsx)(u.D,{order:3,align:"center",children:"Timezone"}),(0,r.jsx)(p.Ph,{label:"Timezone:",data:b.values.time.timezonesList,...y("time.timezone"),searchable:!0})]}),(0,r.jsxs)(o.K,{children:[(0,r.jsx)(u.D,{order:3,align:"center",children:"RS-485"}),(0,r.jsx)(p.Ph,{label:"Mode:",data:C.EH,...y("rs485.mode")}),(0,r.jsx)(p.Ph,{label:"Baud rate:",data:C._.map(e=>({value:e.toString(),label:e.toString()})),...y("rs485.baudRate"),value:b.values.rs485.baudRate.toString(),onChange:e=>{b.setFieldValue("rs485.baudRate",parseInt(e||"9600",10))}}),(0,r.jsx)(p.Ph,{label:"Stop and parity bits:",data:C.dH,...y("rs485.stopAndParityBits")})]}),s?(0,r.jsx)(f.z,{type:"submit",variant:"outline",radius:"xl",children:"Save OPCB settings"}):(0,r.jsx)(f.z,{type:"submit",children:"Save"})]})})}}},function(e){e.O(0,[217,666,886,629,774,888,179],function(){return e(e.s=6876)}),_N_E=e.O()}]);