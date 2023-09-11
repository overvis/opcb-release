(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[640],{5583:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/manufacture/register",function(){return r(4610)}])},9121:function(e,t,r){"use strict";r.d(t,{Z:function(){return m}});var i=r(6521),s=r(2104),n=r(1876),a=r(4894),o=r(899),c=r(5263),l=r(5750),u=r(4572),d=r(8584),v=r(9114),h=r(3073),p=r(4130),g=r(4559),f=r(9296);let b=(0,s.k)(e=>({tabsList:{borderBottom:"1px solid ".concat(e.colors.gray[4])},tab:{color:e.colors.blue[6],textTransform:"uppercase",fontSize:e.fontSizes.xs,"&:hover":{backgroundColor:"transparent",border:"transparent",color:e.colors.dark},"&[data-active]":{borderBottom:"2px solid #000",pointerEvents:"none"}}}));function m(e){let{children:t,title:r,id:s}=e,m=(0,g.H)(),{classes:x}=b(),y=(0,p.useRouter)();if(!m.data)return(0,i.jsx)(f.Z,{pageTitle:"Manufacturing",contentIsLoading:!0});let w=m.data.internetConnected,j=m.data.wireguardConnected;return(0,i.jsxs)(f.Z,{pageTitle:"Manufacture :: ".concat(r),children:[j&&(0,i.jsx)(n.Z,{position:"center",children:(0,i.jsx)("a",{href:"/dyn-media/label.png",target:"_blank",children:(0,i.jsx)(a.E,{src:"/dyn-media/label.png",alt:"OPCB VPN information label.",maw:"260px"})})}),("restore"===s||"register"===s)&&(0,i.jsxs)(i.Fragment,{children:[j&&(0,i.jsx)(o.b,{my:"lg",icon:(0,i.jsx)(l.Z,{}),title:"Already authenticated.",color:"yellow",children:"This device is already authenticated on the remote server and has an access. By submitting this form you may lose the access or change the device's identity."}),!w&&(0,i.jsx)(o.b,{my:"lg",icon:(0,i.jsx)(l.Z,{}),title:"No internet access.",color:"yellow",children:"Active internet connection is required to restore the device's identity. Please check the device's settings."})]}),"test"===s&&!w&&(0,i.jsx)(o.b,{my:"lg",icon:(0,i.jsx)(l.Z,{}),title:"No internet access.",color:"red",children:"Active internet connection is required to run the tests."}),(0,i.jsxs)(c.m,{color:"dark",value:s,variant:"default",classNames:{tabsList:x.tabsList,tab:x.tab},onTabChange:e=>y.push("/manufacture/".concat(e)),children:[(0,i.jsxs)(c.m.List,{mb:"lg",children:[(0,i.jsx)(c.m.Tab,{value:"restore",icon:(0,i.jsx)(u.Z,{size:16}),children:"Restore identity"}),(0,i.jsx)(c.m.Tab,{value:"register",icon:(0,i.jsx)(d.Z,{size:16}),children:"Register"}),(0,i.jsx)(c.m.Tab,{value:"test",icon:(0,i.jsx)(v.Z,{size:16}),children:"Test"}),(0,i.jsx)(c.m.Tab,{value:"finalize",icon:(0,i.jsx)(h.Z,{size:16}),children:"Finalize"})]}),(0,i.jsx)(c.m.Panel,{value:s,children:t})]})]})}},9663:function(e,t,r){"use strict";r.d(t,{a:function(){return n},t:function(){return s}});var i=r(4579);async function s(e,t){let r=(0,i.bH)(),s=await (0,i.ri)(r,"/api/manufacture/register/",{method:"POST",body:JSON.stringify(e),timeoutMs:3e4},!1),n=e=>{throw t(e),Error(e)};if(200!==s.status){let e=await s.json();throw"MotherlandUnavailable"===e.errorCode&&n("Registration server is unavalable. Please contact support."),"IncorrectPrivateKey"===e.errorCode&&n("Incorrect device private key provided."),"InvalidLicense"===e.errorCode&&n("License ID or password is incorrect."),"LicenseQuotaExceeded"===e.errorCode&&n("The registration quota for this license is exceeded. Please contact Overvis support."),"DeviceRegisteredWithoutVpn"===e.errorCode&&n("This device was already registered without the VPN access. Please contact support."),"MacExists"===e.errorCode&&n('Device with the same MAC address was already registered with a different key. If you have an access to the previous private key (should be printed on the label), please use the "Restore" section. If the private key is lost, please contact support.'),Error("Registration request failed: ".concat(s.status,": ").concat(e.errorCode,": ").concat(e.errorMessage))}}async function n(e,t){let r=(0,i.bH)(),s=await (0,i.ri)(r,"/api/manufacture/restore/",{method:"POST",body:JSON.stringify({privateKey:e}),timeoutMs:3e4},!1),n=e=>{throw t(e),Error(e)};if(200!==s.status){let e=await s.json();throw"MotherlandUnavailable"===e.errorCode&&n("Registration server is unavalable. Please contact support."),"IncorrectPrivateKey"===e.errorCode&&n("Can't generate public key. Incorrect device private key provided."),"DeviceNotFound"===e.errorCode&&n("Incorrect device private key provided. Device with resulting public key is not registered on server."),Error("Registration request failed: ".concat(s.status,": ").concat(e.errorCode,": ").concat(e.errorMessage))}}},4559:function(e,t,r){"use strict";r.d(t,{H:function(){return a}});var i=r(4579),s=r(4911);async function n(e){let[t,r]=e,i=await (0,s.UK)(r,["wg:ping","wg:pubkey","inet:ping","wg:ping","overvisRc:mac","manufacturer:modeEnabled","manufacturer:licenseUuid","manufacturer:licensePassword","manufacturer:batchDescription"]),n=await (0,s.wv)(r,["overvisVpn:wireguard:privateKey"]),a={internetConnected:!1,wireguardConnected:!1,pubkey:i["wg:pubkey"],mac:i["overvisRc:mac"],manufacturerModeEnabled:!!i["manufacturer:modeEnabled"],licenseUuid:i["manufacturer:licenseUuid"],licensePassword:i["manufacturer:licensePassword"],batchDescription:i["manufacturer:batchDescription"],privateKey:n["overvisVpn:wireguard:privateKey"]},o=i["wg:ping"];o&&"unreachable"!==o&&(a.wireguardConnected=!0);let c=i["inet:ping"];return c&&"unreachable"!==c&&(a.internetConnected=!0),a}function a(){return(0,i.tQ)("manufacturer-status",n)}},4610:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return P}});var i=r(6521),s=r(5388),n=r(899),a=r(8202),o=r(4670),c=r(1876),l=r(8508),u=r(9960),d=r(4013),v=r(5885),h=r(3126),p=r(9116),g=r(82),f=r(8519),b=r(9121),m=r(9296),x=r(9663),y=r(4559),w=r(5721),j=r(5750);function P(){let e=(0,y.H)();if(!e.data)return(0,i.jsx)(m.Z,{pageTitle:"Manufacturing",contentIsLoading:!0});let t=e.data;return(0,i.jsx)(b.Z,{id:"register",title:"Register device",children:(0,i.jsx)(C,{initialValues:{licenseUuid:t.licenseUuid,licensePassword:t.licensePassword,privateKey:t.privateKey,batchDescription:t.batchDescription},mac:t.mac})})}function C(e){let{initialValues:t,mac:r}=e,{actionHandler:b}=(0,f.vu)(),[m,y]=(0,w.useState)(void 0),P=(0,h.c)({initialValues:{...t},validate:{licenseUuid:(0,p.w)(/^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i,"Must be valid UUID."),licensePassword:(0,g.d)({max:128},"Must be 128 characters long or less."),privateKey:(0,g.d)({max:44},"Must be 44 characters long.")}});return(0,i.jsxs)(s.K,{h:"100%",children:[m&&(0,i.jsx)(n.b,{my:"lg",icon:(0,i.jsx)(j.Z,{}),title:"Registration error",color:"red",children:m}),(0,i.jsxs)(a.x,{fz:"xs",c:"gray",children:["This form is for registering a new device on the remote Overvis servers. It requires manufacturer license to work. If you don't have a manufacturer license, please contact us: ",(0,i.jsx)(o.e,{href:"mailto:support@overvis.com",children:"support@overvis.com"}),"."]}),(0,i.jsx)("form",{onSubmit:P.onSubmit(()=>{b({actionProcess:async()=>(y(void 0),(0,x.t)(P.values,y)),title:"Registering OPCB",failedTitle:"Registration failed.",failedId:"registration-failed",startActionText:"Sending the data to the server...",afterActionText:"Registering the device...",successId:"registration-success",successTitle:"OPCB has been registered.",successMessage:"Device registration completed successfully."})}),children:(0,i.jsxs)(s.K,{h:"100%",children:[(0,i.jsxs)(c.Z,{grow:!0,children:[(0,i.jsx)(l.o,{label:"Manufacturer license key ID:",...P.getInputProps("licenseUuid"),required:!0}),(0,i.jsx)(u.W,{label:"Manufacturer license key password:",...P.getInputProps("licensePassword"),required:!0})]}),(0,i.jsxs)(c.Z,{grow:!0,children:[(0,i.jsx)(l.o,{label:"Device private key:",...P.getInputProps("privateKey"),required:!0}),(0,i.jsx)(l.o,{label:"Reported device MAC:",value:r,disabled:!0})]}),(0,i.jsx)(d.g,{label:"Additional comments (optional, will be saved on the server):",required:!0,...P.getInputProps("batchDescription")}),(0,i.jsx)(c.Z,{children:(0,i.jsx)(v.z,{type:"submit",children:"Register device"})})]})})]})}}},function(e){e.O(0,[634,558,210,125,473,296,774,888,179],function(){return e(e.s=5583)}),_N_E=e.O()}]);