(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[640],{438:function(e,r,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/manufacture/register",function(){return t(4526)}])},735:function(e,r,t){"use strict";t.d(r,{Z:function(){return ManufactureLayout}});var i=t(966),a=t(9025),s=t(7344),n=t(2671),o=t(6849),c=t(7579),u=t(2767),l=t(7992),d=t(4736),h=t(5807),v=t(1149),g=t(6446),p=t(8410),f=t(2094);let m=(0,a.k)(e=>({tabsList:{borderBottom:"1px solid ".concat(e.colors.gray[4])},tab:{color:e.colors.blue[6],textTransform:"uppercase",fontSize:e.fontSizes.xs,"&:hover":{backgroundColor:"transparent",border:"transparent",color:e.colors.dark},"&[data-active]":{borderBottom:"2px solid #000",pointerEvents:"none"}}}));function ManufactureLayout(e){let{children:r,title:t,id:a}=e,b=(0,p.H)(),{classes:w}=m(),y=(0,g.useRouter)();if(!b.data)return(0,i.jsx)(f.Z,{pageTitle:"Manufacturing",contentIsLoading:!0});let x=b.data.internetConnected,j=b.data.wireguardConnected;return(0,i.jsxs)(f.Z,{pageTitle:"Manufacture :: ".concat(t),children:[j&&(0,i.jsx)(s.Z,{position:"center",children:(0,i.jsx)("a",{href:"/dyn-media/label.png",target:"_blank",children:(0,i.jsx)(n.E,{src:"/dyn-media/label.png",alt:"OPCB VPN information label.",maw:"260px"})})}),("restore"===a||"register"===a)&&(0,i.jsxs)(i.Fragment,{children:[j&&(0,i.jsx)(o.b,{my:"lg",icon:(0,i.jsx)(u.Z,{}),title:"Already authenticated.",color:"yellow",children:"This device is already authenticated on the remote server and has an access. By submitting this form you may lose the access or change the device's identity."}),!x&&(0,i.jsx)(o.b,{my:"lg",icon:(0,i.jsx)(u.Z,{}),title:"No internet access.",color:"yellow",children:"Active internet connection is required to restore the device's identity. Please check the device's settings."})]}),"test"===a&&!x&&(0,i.jsx)(o.b,{my:"lg",icon:(0,i.jsx)(u.Z,{}),title:"No internet access.",color:"red",children:"Active internet connection is required to run the tests."}),(0,i.jsxs)(c.m,{color:"dark",value:a,variant:"default",classNames:{tabsList:w.tabsList,tab:w.tab},onTabChange:e=>y.push("/manufacture/".concat(e)),children:[(0,i.jsxs)(c.m.List,{mb:"lg",children:[(0,i.jsx)(c.m.Tab,{value:"restore",icon:(0,i.jsx)(l.Z,{size:16}),children:"Restore identity"}),(0,i.jsx)(c.m.Tab,{value:"register",icon:(0,i.jsx)(d.Z,{size:16}),children:"Register"}),(0,i.jsx)(c.m.Tab,{value:"test",icon:(0,i.jsx)(h.Z,{size:16}),children:"Test"}),(0,i.jsx)(c.m.Tab,{value:"finalize",icon:(0,i.jsx)(v.Z,{size:16}),children:"Finalize"})]}),(0,i.jsx)(c.m.Panel,{value:a,children:r})]})]})}},1662:function(e,r,t){"use strict";t.d(r,{a:function(){return restoreDevice},t:function(){return registerDevice}});var i=t(52);async function registerDevice(e,r){let t=(0,i.bH)(),a=await (0,i.ri)(t,"/api/manufacture/register/",{method:"POST",body:JSON.stringify(e),timeoutMs:3e4},!1),throwError=e=>{throw r(e),Error(e)};if(200!==a.status){let e=await a.json();throw"MotherlandUnavailable"===e.errorCode&&throwError("Registration server is unavalable. Please contact support."),"IncorrectPrivateKey"===e.errorCode&&throwError("Incorrect device private key provided."),"InvalidLicense"===e.errorCode&&throwError("License ID or password is incorrect."),"LicenseQuotaExceeded"===e.errorCode&&throwError("The registration quota for this license is exceeded. Please contact Overvis support."),"DeviceRegisteredWithoutVpn"===e.errorCode&&throwError("This device was already registered without the VPN access. Please contact support."),"MacExists"===e.errorCode&&throwError('Device with the same MAC address was already registered with a different key. If you have an access to the previous private key (should be printed on the label), please use the "Restore" section. If the private key is lost, please contact support.'),Error("Registration request failed: ".concat(a.status,": ").concat(e.errorCode,": ").concat(e.errorMessage))}}async function restoreDevice(e,r){let t=(0,i.bH)(),a=await (0,i.ri)(t,"/api/manufacture/restore/",{method:"POST",body:JSON.stringify({privateKey:e}),timeoutMs:3e4},!1),throwError=e=>{throw r(e),Error(e)};if(200!==a.status){let e=await a.json();throw"MotherlandUnavailable"===e.errorCode&&throwError("Registration server is unavalable. Please contact support."),"IncorrectPrivateKey"===e.errorCode&&throwError("Can't generate public key. Incorrect device private key provided."),"DeviceNotFound"===e.errorCode&&throwError("Incorrect device private key provided. Device with resulting public key is not registered on server."),Error("Registration request failed: ".concat(a.status,": ").concat(e.errorCode,": ").concat(e.errorMessage))}}},8410:function(e,r,t){"use strict";t.d(r,{H:function(){return useManufacturerStatus}});var i=t(52),a=t(3738);async function manufacturerFetcher(e){let[r,t]=e,i=await (0,a.UK)(t,["wg:ping","wg:pubkey","inet:ping","wg:ping","overvisRc:mac","manufacturer:modeEnabled","manufacturer:licenseUuid","manufacturer:licensePassword","manufacturer:batchDescription"]),s=await (0,a.wv)(t,["overvisVpn:wireguard:privateKey"]),n={internetConnected:!1,wireguardConnected:!1,pubkey:i["wg:pubkey"],mac:i["overvisRc:mac"],manufacturerModeEnabled:!!i["manufacturer:modeEnabled"],licenseUuid:i["manufacturer:licenseUuid"],licensePassword:i["manufacturer:licensePassword"],batchDescription:i["manufacturer:batchDescription"],privateKey:s["overvisVpn:wireguard:privateKey"]},o=i["wg:ping"];o&&"unreachable"!==o&&(n.wireguardConnected=!0);let c=i["inet:ping"];return c&&"unreachable"!==c&&(n.internetConnected=!0),n}function useManufacturerStatus(){return(0,i.tQ)("manufacturer-status",manufacturerFetcher)}},4526:function(e,r,t){"use strict";t.r(r),t.d(r,{default:function(){return Page}});var i=t(966),a=t(462),s=t(6849),n=t(9956),o=t(480),c=t(7344),u=t(6078),l=t(1277),d=t(2701),h=t(3283),v=t(9724),g=t(5306),p=t(6654),f=t(4708),m=t(735),b=t(2094),w=t(1662),y=t(8410),x=t(3900),j=t(2767);function Page(){let e=(0,y.H)();if(!e.data)return(0,i.jsx)(b.Z,{pageTitle:"Manufacturing",contentIsLoading:!0});let r=e.data;return(0,i.jsx)(m.Z,{id:"register",title:"Register device",children:(0,i.jsx)(ManufactRegisterForm,{initialValues:{licenseUuid:r.licenseUuid,licensePassword:r.licensePassword,privateKey:r.privateKey,batchDescription:r.batchDescription},mac:r.mac})})}function ManufactRegisterForm(e){let{initialValues:r,mac:t}=e,{actionHandler:m}=(0,f.vu)(),[b,y]=(0,x.useState)(void 0),P=(0,v.c)({initialValues:{...r},validate:{licenseUuid:(0,g.w)(/^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i,"Must be valid UUID."),licensePassword:(0,p.d)({max:128},"Must be 128 characters long or less."),privateKey:(0,p.d)({max:44},"Must be 44 characters long.")}});return(0,i.jsxs)(a.K,{h:"100%",children:[b&&(0,i.jsx)(s.b,{my:"lg",icon:(0,i.jsx)(j.Z,{}),title:"Registration error",color:"red",children:b}),(0,i.jsxs)(n.x,{fz:"xs",c:"gray",children:["This form is for registering a new device on the remote Overvis servers. It requires manufacturer license to work. If you don't have a manufacturer license, please contact us: ",(0,i.jsx)(o.e,{href:"mailto:support@overvis.com",children:"support@overvis.com"}),"."]}),(0,i.jsx)("form",{onSubmit:P.onSubmit(()=>{m({actionProcess:async()=>(y(void 0),(0,w.t)(P.values,y)),title:"Registering OPCB",failedTitle:"Registration failed.",failedId:"registration-failed",startActionText:"Sending the data to the server...",afterActionText:"Registering the device...",successId:"registration-success",successTitle:"OPCB has been registered.",successMessage:"Device registration completed successfully."})}),children:(0,i.jsxs)(a.K,{h:"100%",children:[(0,i.jsxs)(c.Z,{grow:!0,children:[(0,i.jsx)(u.o,{label:"Manufacturer license key ID:",...P.getInputProps("licenseUuid"),required:!0}),(0,i.jsx)(l.W,{label:"Manufacturer license key password:",...P.getInputProps("licensePassword"),required:!0})]}),(0,i.jsxs)(c.Z,{grow:!0,children:[(0,i.jsx)(u.o,{label:"Device private key:",...P.getInputProps("privateKey"),required:!0}),(0,i.jsx)(u.o,{label:"Reported device MAC:",value:t,disabled:!0})]}),(0,i.jsx)(d.g,{label:"Additional comments (optional, will be saved on the server):",required:!0,...P.getInputProps("batchDescription")}),(0,i.jsx)(c.Z,{children:(0,i.jsx)(h.z,{type:"submit",children:"Register device"})})]})})]})}}},function(e){e.O(0,[217,666,388,767,514,94,774,888,179],function(){return e(e.s=438)}),_N_E=e.O()}]);