"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[633],{4045:function(e,n,t){t.d(n,{Z:function(){return HexNumberInput}});var s=t(966),a=t(8393);function HexNumberInput(e){let{hex:n,...t}={...e};return n?(0,s.jsx)(InternalHexNumberInput,{...t}):(0,s.jsx)(a.Y,{...t})}function InternalHexNumberInput(e){return(0,s.jsx)(a.Y,{...e,formatter:e=>{let n=parseInt(e,10);return Number.isNaN(n)?"0x":"0x".concat(n.toString(16).toUpperCase())},parser:e=>e?parseInt(e.replace("0x",""),16).toString():""})}},1921:function(e,n,t){t.d(n,{Z:function(){return ModbusDebugTools}});var s=t(966),a=t(3127),r=t(5782),o=t(462),l=t(7344),u=t(9956),i=t(8482),c=t(2701),d=t(3283),x=t(3063),m=t(7673),p=t(3900),g=t(52),h=t(9342),j=t(8431),b=t(7452),v=t(6078),C=t(5041),f=t(6886),y=t(9724),I=t(9561),P=t(4045);function ModbusRequestGenerator(e){let{mode:n,onSubmit:t}=e,a=(0,y.c)({initialValues:{useHex:!0,deviceId:1,funcCode:"3",funcCodeCustom:1,address:0,quantity:1,value:0,subFunction:0,payload:""},validate:{deviceId:(0,I.m)({min:0,max:255},"Must be in range 0-255"),funcCodeCustom:(0,I.m)({min:0,max:255},"Must be in range 0-255"),address:(0,I.m)({min:0,max:65535},"Must be in range 0-65535"),quantity:(0,I.m)({min:0,max:2e3},"Must be in range 0-2000"),value:(0,I.m)({min:0,max:65535},"Must be in range 0-65535"),payload:e=>{let n=(0,j.uv)(e||"");return n.length%2!=0?"Payload must be even number of bytes":n.length>504?"Payload length must be not longer than 252 bytes":/^[0-9A-F]*$/.test(n)?void 0:"Payload must be in HEX format"}},validateInputOnBlur:!0}),r=h.eq.map(e=>({value:e.code.toString(),label:"".concat(a.values.useHex?"0x".concat(e.code.toString(16).toUpperCase().padStart(2,"0")):e.code.toString(10).padStart(2,"0")," (").concat(e.name,")")}));r.push({value:"custom",label:"Custom"});let l=(0,s.jsx)(s.Fragment,{children:(0,s.jsx)(v.o,{label:"Payload (HEX, without CRC):",placeholder:"00 20 00 0C",...a.getInputProps("payload")})}),u=a.values.funcCode;"custom"===u?l=(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(P.Z,{hex:a.values.useHex,label:"Function code:",min:0,max:128,...a.getInputProps("funcCodeCustom")}),(0,s.jsx)(v.o,{label:"Payload (HEX, without CRC):",placeholder:"00 20 00 0C",...a.getInputProps("payload")})]}):"1"===u||"2"===u||"3"===u||"4"===u?l=(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(P.Z,{hex:a.values.useHex,label:"Starting address:",min:0,max:65535,...a.getInputProps("address")}),(0,s.jsx)(P.Z,{hex:a.values.useHex,label:"Quantity:",min:0,max:2e3,...a.getInputProps("quantity")})]}):"5"===u||"6"===u?l=(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(P.Z,{hex:a.values.useHex,label:"Address:",min:0,max:65535,...a.getInputProps("address")}),(0,s.jsx)(P.Z,{hex:a.values.useHex,label:"Value:",...a.getInputProps("value")})]}):"7"===u||"11"===u||"12"===u||"17"===u?l=(0,s.jsx)(s.Fragment,{}):"8"===u?l=(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(P.Z,{hex:a.values.useHex,label:"Sub-function:",...a.getInputProps("subFunction")}),(0,s.jsx)(v.o,{label:"Data (HEX):",placeholder:"12 34 AB CD",...a.getInputProps("payload")})]}):("15"===u||"16"==u)&&(l=(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(P.Z,{hex:a.values.useHex,label:"Starting address:",min:0,max:65535,...a.getInputProps("address")}),(0,s.jsx)(P.Z,{hex:a.values.useHex,label:"Quantity:",min:0,max:2e3,...a.getInputProps("quantity")}),(0,s.jsx)(v.o,{label:"Values (HEX):",placeholder:"12 34 AB CD",...a.getInputProps("payload")})]}));let i="";return"rtu"===n?i=(0,h.aL)(getRequestData(a.values))[2]:"ascii"===n&&(i=(0,h.gY)(getRequestData(a.values))[1]),(0,s.jsx)("form",{onSubmit:a.onSubmit(()=>{t("rtu"===n?(0,h.aL)(getRequestData(a.values))[0]:"ascii"===n?(0,h.gY)(getRequestData(a.values))[0]:(0,h.nM)(getRequestData(a.values))[0])}),children:(0,s.jsxs)(o.K,{spacing:"xs",children:[(0,s.jsx)(C.r,{label:"Use HEX",onLabel:"HEX",offLabel:"DEC",checked:a.values.useHex,...a.getInputProps("useHex")}),(0,s.jsx)(P.Z,{hex:a.values.useHex,label:"Device ID:",min:0,max:255,...a.getInputProps("deviceId")}),(0,s.jsx)(f.Ph,{withinPortal:!0,label:"Function:",data:r,...a.getInputProps("funcCode")}),l,"tcp"!==n&&(0,s.jsx)(v.o,{label:"rtu"===n?"CRC:":"LRC:",value:(0,j.zF)(i),disabled:!0}),(0,s.jsx)(d.z,{type:"submit",children:"Add request"})]})})}function getRequestData(e){return{deviceId:e.deviceId,funcCode:"custom"===e.funcCode?e.funcCodeCustom:parseInt(e.funcCode,10),customPayload:"custom"===e.funcCode,address:e.address,quantity:e.quantity,value:e.value,subFunction:e.subFunction,payload:(0,j.uv)(e.payload||"")}}var H=t(4101);function ModbusDebugTools(e){let{mode:n,dst:t,isMaster:v}=e,[C,f]=(0,p.useState)(!1),[y,I]=(0,p.useState)(""),{token:P}=(0,g.pk)(),[S,Z]=(0,p.useState)(!1),[F,q]=(0,p.useState)("");return(0,s.jsx)(a.x,{w:"100%",children:(0,s.jsxs)(r.r,{p:"xs",maw:914,children:[(0,s.jsx)(r.r.Col,{sm:v?8:12,children:(0,s.jsx)(H.Z,{mode:n,streamName:t})}),v&&(0,s.jsx)(r.r.Col,{sm:4,children:(0,s.jsxs)(o.K,{spacing:0,children:[(0,s.jsx)(l.Z,{sx:e=>({borderBottom:"1px solid ".concat(e.colors.gray[3])}),py:"xs",children:(0,s.jsx)(u.x,{size:"sm",transform:"uppercase",weight:700,color:"gray.9",children:"Send request"})}),(0,s.jsxs)(o.K,{pt:"xs",spacing:"xs",children:[(0,s.jsx)(i.U,{in:!C,children:(0,s.jsxs)(o.K,{spacing:"xs",children:[(0,s.jsx)(c.g,{fz:"xs",autosize:!0,minRows:8,maxRows:15,placeholder:"Write Modbus RTU in HEX.\nSeparate multiple requests by newline.\n\nE.g.\n02 01 00 20 00 0C 3D F6\n01 03 00 00 00 01 84 0A\n...",value:y,onChange:e=>I(e.target.value),styles:{root:{flexGrow:1},input:{fontFamily:"monospace"}}}),(0,s.jsx)(b.Z,{inProgress:S,onClick:async()=>{P&&(q("Preparing."),Z(!0),await (0,h.PW)(P,t,y,!0,q),Z(!1))},children:"Send"})]})}),(0,s.jsx)(i.U,{in:C,children:(0,s.jsx)(ModbusRequestGenerator,{mode:n,onSubmit:e=>{let n=y;n.trim().length>0&&!n.endsWith("\n")&&(n+="\n"),I(n+(e=(0,j.zF)(e))+"\n"),f(!1)}})}),(0,s.jsx)(d.z,{compact:!0,size:"xs",variant:"subtle",onClick:()=>f(!C),children:C?(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(x.Z,{size:12,style:{marginRight:5}}),"Write request manually"]}):(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(m.Z,{size:12,style:{marginRight:5}}),"Show request generator"]})}),F&&(0,s.jsx)(a.x,{sx:{overflow:"scroll"},w:"100%",mah:200,children:(0,s.jsx)(u.x,{c:"orange",fz:12,ff:"monospace",sx:{whiteSpace:"pre"},children:F})})]})]})})]})})}},477:function(e,n,t){t.d(n,{Z:function(){return RxTxDisplay}});var s=t(966),a=t(1949),r=t(4137),o=t(2242),l=t(8431),u=t(3610);function RxTxDisplay(e){let{bytes:n,lastBytesSinceSec:t,speed:i,dbm:c,tx:d,oneline:x=!0}=e,m=(0,a.rZ)(),p=void 0!==t&&t<=2?m.colors.green[6]:m.colors.gray[6];return(0,s.jsx)(u.Z,{icon:d?(0,s.jsx)(r.Z,{stroke:1,height:15,color:p}):(0,s.jsx)(o.Z,{stroke:1,height:15,color:p}),name:d?"TX":"RX",subNameVal:c?"".concat(c," dBm"):void 0,nameColor:p,mainVal:(0,l.td)(n),subVal:{level:void 0!==t&&t<=2?"good":"dimmed",value:"".concat((0,l.td)(i),"/s")},oneline:x})}},829:function(e,n,t){t.d(n,{Z:function(){return WithConfirmation}});var s=t(966),a=t(4512),r=t(462),o=t(9956),l=t(7344),u=t(3283),i=t(3900);function WithConfirmation(e){let{children:n,title:t,description:c,buttonText:d,isLevelGood:x}=e,[m,p]=(0,i.useState)(!1);return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(a.u,{opened:m,onClose:()=>p(!1),withCloseButton:!1,zIndex:400,children:(0,s.jsxs)(r.K,{children:[(0,s.jsx)(o.x,{fz:"md",weight:500,align:"center",children:t}),(0,s.jsx)(o.x,{fz:"sm",c:"gray.7",align:"center",children:c}),(0,s.jsxs)(l.Z,{position:"center",children:[(0,s.jsx)(u.z,{color:x?"green":"orange",onClick:()=>{n.props.onClick(),p(!1)},children:d}),(0,s.jsx)(u.z,{color:x?"orange":"green",onClick:()=>p(!1),children:"Cancel"})]})]})}),(0,s.jsx)(n.type,{...n.props,onClick:()=>p(!0)})]})}}}]);