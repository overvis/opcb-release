(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[636],{5658:function(e,t,i){(window.__NEXT_P=window.__NEXT_P||[]).push(["/manufacture/finalize",function(){return i(1296)}])},9121:function(e,t,i){"use strict";i.d(t,{Z:function(){return m}});var n=i(6521),r=i(2104),s=i(899),a=i(5263),c=i(5750),o=i(4572),l=i(8584),u=i(9114),d=i(3073),f=i(4130),h=i(9296);let x=(0,r.k)(e=>({tabsList:{borderBottom:"1px solid ".concat(e.colors.gray[4])},tab:{color:e.colors.blue[6],textTransform:"uppercase",fontSize:e.fontSizes.xs,"&:hover":{backgroundColor:"transparent",border:"transparent",color:e.colors.dark},"&[data-active]":{borderBottom:"2px solid #000",pointerEvents:"none"}}}));function m(e){let{children:t,title:i,id:r,wireguardConnected:m,internetConnected:g}=e,{classes:j}=x(),p=(0,f.useRouter)();return(0,n.jsxs)(h.Z,{pageTitle:"Manufacture :: ".concat(i),children:[("restore"===r||"register"===r)&&(0,n.jsxs)(n.Fragment,{children:[m&&(0,n.jsx)(s.b,{my:"lg",icon:(0,n.jsx)(c.Z,{}),title:"Already authenticated.",color:"yellow",children:"This device is already authenticated on the remote server and has an access. By submitting this form you may lose the access or change the device's identity."}),!g&&(0,n.jsx)(s.b,{my:"lg",icon:(0,n.jsx)(c.Z,{}),title:"No internet access.",color:"yellow",children:"Active internet connection is required to restore the device's identity. Please check the device's settings."})]}),(0,n.jsxs)(a.m,{color:"dark",value:r,variant:"default",classNames:{tabsList:j.tabsList,tab:j.tab},onTabChange:e=>p.push("/manufacture/".concat(e)),children:[(0,n.jsxs)(a.m.List,{mb:"lg",children:[(0,n.jsx)(a.m.Tab,{value:"restore",icon:(0,n.jsx)(o.Z,{size:16}),children:"Restore identity"}),(0,n.jsx)(a.m.Tab,{value:"register",icon:(0,n.jsx)(l.Z,{size:16}),children:"Register"}),(0,n.jsx)(a.m.Tab,{value:"test",icon:(0,n.jsx)(u.Z,{size:16}),children:"Test"}),(0,n.jsx)(a.m.Tab,{value:"finalize",icon:(0,n.jsx)(d.Z,{size:16}),children:"Finalize"})]}),(0,n.jsx)(a.m.Panel,{value:r,children:t})]})]})}},3611:function(e,t,i){"use strict";i.d(t,{Z:function(){return u}});var n=i(6521),r=i(5400),s=i(5388),a=i(8202),c=i(1876),o=i(5885),l=i(5721);function u(e){let{children:t,title:i,description:u,buttonText:d}=e,[f,h]=(0,l.useState)(!1);return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.u,{opened:f,onClose:()=>h(!1),withCloseButton:!1,children:(0,n.jsxs)(s.K,{children:[(0,n.jsx)(a.x,{fz:"md",weight:500,align:"center",children:i}),(0,n.jsx)(a.x,{fz:"sm",c:"gray.7",align:"center",children:u}),(0,n.jsxs)(c.Z,{position:"center",children:[(0,n.jsx)(o.z,{color:"orange",onClick:()=>{t.props.onClick(),h(!1)},children:d}),(0,n.jsx)(o.z,{color:"green",onClick:()=>h(!1),children:"Cancel"})]})]})}),(0,n.jsx)(t.type,{...t.props,onClick:()=>h(!0)})]})}},1296:function(e,t,i){"use strict";i.r(t),i.d(t,{default:function(){return f}});var n=i(6521),r=i(5388),s=i(8202),a=i(1876),c=i(5885),o=i(8519),l=i(9121),u=i(3611),d=i(4579);function f(){return(0,n.jsx)(l.Z,{id:"finalize",title:"Finalize manufacturing",children:(0,n.jsx)(h,{})})}function h(){let{actionHandler:e}=(0,o.vu)(),t=async()=>{let e=(0,d.bH)(),t=await (0,d.ri)(e,"/api/manufacture/finalize/",{method:"POST",body:JSON.stringify({})});if((null==t?void 0:t.status)!==200)throw Error("request failed with status "+(null==t?void 0:t.status))};return(0,n.jsxs)(r.K,{h:"100%",children:[(0,n.jsx)(s.x,{fz:"xs",c:"gray",children:"The following action will finalize the manufacturing process and will restore the interface to default user-mode. To restore the manufacturer's interface, put empty MANUFACTURER_LICENSE file in the root directory of device's SD card."}),(0,n.jsx)(a.Z,{children:(0,n.jsx)(u.Z,{title:"Finalize manufacturing",description:"Are you sure you want to finalize manufacturing?",buttonText:"Finalize",children:(0,n.jsx)(c.z,{color:"orange",onClick:()=>{e({actionProcess:t,title:"Finalize manufacturing",failedTitle:"Finalize failed.",failedId:"finalize-failed",startActionText:"Sending the command to the device...",afterActionText:"Finalizing the manufacturing process...",successId:"finalize-success",successTitle:"Manufacturing process has been finalized.",successMessage:"Operation completed successfully..",redirectToDashboardAfterAction:!0,delayBeforeDeviceWait:5e3})},children:"Finalize manufacturing"})})})]})}}},function(e){e.O(0,[634,733,301,166,296,774,888,179],function(){return e(e.s=5658)}),_N_E=e.O()}]);