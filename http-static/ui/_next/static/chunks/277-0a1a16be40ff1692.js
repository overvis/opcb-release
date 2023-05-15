"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[277],{9533:function(e,t,n){n.d(t,{Z:function(){return r}});var r=(0,n(2516).Z)("circle-off","IconCircleOff",[["path",{d:"M20.042 16.045a9 9 0 0 0 -12.087 -12.087m-2.318 1.677a9 9 0 1 0 12.725 12.73",key:"svg-0"}],["path",{d:"M3 3l18 18",key:"svg-1"}]])},7874:function(e,t,n){t.kQ=t.ZP=void 0;var r=n(8507);Object.defineProperty(t,"ZP",{enumerable:!0,get:function(){return r.useWebSocket}}),n(3706);var o=n(2984);Object.defineProperty(t,"kQ",{enumerable:!0,get:function(){return o.ReadyState}}),n(5025),n(2614)},8589:function(e,t,n){var r=this&&this.__assign||function(){return(r=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)};Object.defineProperty(t,"__esModule",{value:!0}),t.attachListeners=void 0;var o=n(7900),c=n(2984),u=n(2614),s=function(e,t,n){e.onmessage=function(e){t.current.onMessage&&t.current.onMessage(e),("function"!=typeof t.current.filter||!0===t.current.filter(e))&&n(e)}},a=function(e,t,n,r){e.onopen=function(e){t.current.onOpen&&t.current.onOpen(e),r.current=0,n(c.ReadyState.OPEN)}},i=function(e,t,n,r,o){var s;return c.isEventSourceSupported&&e instanceof EventSource?function(){}:((0,u.assertIsWebSocket)(e,t.current.skipAssert),e.onclose=function(e){var u;if(t.current.onClose&&t.current.onClose(e),n(c.ReadyState.CLOSED),t.current.shouldReconnect&&t.current.shouldReconnect(e)){var a=null!==(u=t.current.reconnectAttempts)&&void 0!==u?u:c.DEFAULT_RECONNECT_LIMIT;if(o.current<a){var i="function"==typeof t.current.reconnectInterval?t.current.reconnectInterval(o.current):t.current.reconnectInterval;s=window.setTimeout(function(){o.current++,r()},null!=i?i:c.DEFAULT_RECONNECT_INTERVAL_MS)}else t.current.onReconnectStop&&t.current.onReconnectStop(a),console.warn("Max reconnect attempts of ".concat(a," exceeded"))}},function(){return s&&window.clearTimeout(s)})},f=function(e,t,n,o,u){var s;return e.onerror=function(a){var i;if(t.current.onError&&t.current.onError(a),c.isEventSourceSupported&&e instanceof EventSource&&(t.current.onClose&&t.current.onClose(r(r({},a),{code:1006,reason:"An error occurred with the EventSource: ".concat(a),wasClean:!1})),n(c.ReadyState.CLOSED),e.close()),t.current.retryOnError){if(u.current<(null!==(i=t.current.reconnectAttempts)&&void 0!==i?i:c.DEFAULT_RECONNECT_LIMIT)){var f="function"==typeof t.current.reconnectInterval?t.current.reconnectInterval(u.current):t.current.reconnectInterval;s=window.setTimeout(function(){u.current++,o()},null!=f?f:c.DEFAULT_RECONNECT_INTERVAL_MS)}else t.current.onReconnectStop&&t.current.onReconnectStop(t.current.reconnectAttempts),console.warn("Max reconnect attempts of ".concat(t.current.reconnectAttempts," exceeded"))}},function(){return s&&window.clearTimeout(s)}};t.attachListeners=function(e,t,n,r,u,l){var d,S,p,v=t.setLastMessage,b=t.setReadyState;return n.current.fromSocketIO&&(d=(0,o.setUpSocketIOPing)(l)),s(e,n,v),a(e,n,b,u),S=i(e,n,b,r,u),p=f(e,n,b,r,u),function(){b(c.ReadyState.CLOSING),S(),p(),e.close(),d&&clearInterval(d)}}},4926:function(e,t,n){var r=this&&this.__assign||function(){return(r=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)};Object.defineProperty(t,"__esModule",{value:!0}),t.attachSharedListeners=void 0;var o=n(9217),c=n(2984),u=n(1336),s=n(7900),a=function(e,t){e.onmessage=function(e){(0,u.getSubscribers)(t).forEach(function(t){t.optionsRef.current.onMessage&&t.optionsRef.current.onMessage(e),("function"!=typeof t.optionsRef.current.filter||!0===t.optionsRef.current.filter(e))&&t.setLastMessage(e)})}},i=function(e,t){e.onopen=function(e){(0,u.getSubscribers)(t).forEach(function(t){t.reconnectCount.current=0,t.optionsRef.current.onOpen&&t.optionsRef.current.onOpen(e),t.setReadyState(c.ReadyState.OPEN)})}},f=function(e,t){e instanceof WebSocket&&(e.onclose=function(e){(0,u.getSubscribers)(t).forEach(function(t){t.optionsRef.current.onClose&&t.optionsRef.current.onClose(e),t.setReadyState(c.ReadyState.CLOSED)}),delete o.sharedWebSockets[t],(0,u.getSubscribers)(t).forEach(function(t){var n;if(t.optionsRef.current.shouldReconnect&&t.optionsRef.current.shouldReconnect(e)){var r=null!==(n=t.optionsRef.current.reconnectAttempts)&&void 0!==n?n:c.DEFAULT_RECONNECT_LIMIT;if(t.reconnectCount.current<r){var o="function"==typeof t.optionsRef.current.reconnectInterval?t.optionsRef.current.reconnectInterval(t.reconnectCount.current):t.optionsRef.current.reconnectInterval;setTimeout(function(){t.reconnectCount.current++,t.reconnect.current()},null!=o?o:c.DEFAULT_RECONNECT_INTERVAL_MS)}else t.optionsRef.current.onReconnectStop&&t.optionsRef.current.onReconnectStop(t.optionsRef.current.reconnectAttempts),console.warn("Max reconnect attempts of ".concat(r," exceeded"))}})})},l=function(e,t){e.onerror=function(n){(0,u.getSubscribers)(t).forEach(function(t){t.optionsRef.current.onError&&t.optionsRef.current.onError(n),c.isEventSourceSupported&&e instanceof EventSource&&(t.optionsRef.current.onClose&&t.optionsRef.current.onClose(r(r({},n),{code:1006,reason:"An error occurred with the EventSource: ".concat(n),wasClean:!1})),t.setReadyState(c.ReadyState.CLOSED))}),c.isEventSourceSupported&&e instanceof EventSource&&e.close()}};t.attachSharedListeners=function(e,t,n,r){var o;return n.current.fromSocketIO&&(o=(0,s.setUpSocketIOPing)(r)),a(e,t),f(e,t),i(e,t),l(e,t),function(){o&&clearInterval(o)}}},2984:function(e,t){var n;Object.defineProperty(t,"__esModule",{value:!0}),t.isEventSourceSupported=t.isReactNative=t.ReadyState=t.UNPARSABLE_JSON_OBJECT=t.DEFAULT_RECONNECT_INTERVAL_MS=t.DEFAULT_RECONNECT_LIMIT=t.SOCKET_IO_PING_CODE=t.SOCKET_IO_PATH=t.SOCKET_IO_PING_INTERVAL=t.DEFAULT_EVENT_SOURCE_OPTIONS=t.EMPTY_EVENT_HANDLERS=t.DEFAULT_OPTIONS=void 0,t.DEFAULT_OPTIONS={},t.EMPTY_EVENT_HANDLERS={},t.DEFAULT_EVENT_SOURCE_OPTIONS={withCredentials:!1,events:t.EMPTY_EVENT_HANDLERS},t.SOCKET_IO_PING_INTERVAL=25e3,t.SOCKET_IO_PATH="/socket.io/?EIO=3&transport=websocket",t.SOCKET_IO_PING_CODE="2",t.DEFAULT_RECONNECT_LIMIT=20,t.DEFAULT_RECONNECT_INTERVAL_MS=5e3,t.UNPARSABLE_JSON_OBJECT={},(n=t.ReadyState||(t.ReadyState={}))[n.UNINSTANTIATED=-1]="UNINSTANTIATED",n[n.CONNECTING=0]="CONNECTING",n[n.OPEN=1]="OPEN",n[n.CLOSING=2]="CLOSING",n[n.CLOSED=3]="CLOSED",t.isReactNative="undefined"!=typeof navigator&&"ReactNative"===navigator.product,t.isEventSourceSupported=!t.isReactNative&&function(){try{return"EventSource"in globalThis}catch(e){return!1}}()},2080:function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),t.createOrJoinSocket=void 0;var r=n(9217),o=n(2984),c=n(8589),u=n(4926),s=n(1336);t.createOrJoinSocket=function(e,t,n,a,i,f,l,d){if(!o.isEventSourceSupported&&a.current.eventSourceOptions){if(o.isReactNative)throw Error("EventSource is not supported in ReactNative");throw Error("EventSource is not supported")}if(a.current.share){var S,p=null;void 0===r.sharedWebSockets[t]?(r.sharedWebSockets[t]=a.current.eventSourceOptions?new EventSource(t,a.current.eventSourceOptions):new WebSocket(t,a.current.protocols),e.current=r.sharedWebSockets[t],n(o.ReadyState.CONNECTING),p=(0,u.attachSharedListeners)(r.sharedWebSockets[t],t,a,d)):(e.current=r.sharedWebSockets[t],n(r.sharedWebSockets[t].readyState));var v={setLastMessage:i,setReadyState:n,optionsRef:a,reconnectCount:l,reconnect:f};return(0,s.addSubscriber)(t,v),S=p,function(){if((0,s.removeSubscriber)(t,v),!(0,s.hasSubscribers)(t)){try{var e=r.sharedWebSockets[t];e instanceof WebSocket&&(e.onclose=function(e){a.current.onClose&&a.current.onClose(e),n(o.ReadyState.CLOSED)}),e.close()}catch(e){}S&&S(),delete r.sharedWebSockets[t]}}}if(e.current=a.current.eventSourceOptions?new EventSource(t,a.current.eventSourceOptions):new WebSocket(t,a.current.protocols),n(o.ReadyState.CONNECTING),!e.current)throw Error("WebSocket failed to be created");return(0,c.attachListeners)(e.current,{setLastMessage:i,setReadyState:n},a,f.current,l,d)}},6908:function(e,t,n){var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))(function(o,c){function u(e){try{a(r.next(e))}catch(e){c(e)}}function s(e){try{a(r.throw(e))}catch(e){c(e)}}function a(e){var t;e.done?o(e.value):((t=e.value)instanceof n?t:new n(function(e){e(t)})).then(u,s)}a((r=r.apply(e,t||[])).next())})},o=this&&this.__generator||function(e,t){var n,r,o,c,u={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return c={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(c[Symbol.iterator]=function(){return this}),c;function s(c){return function(s){return function(c){if(n)throw TypeError("Generator is already executing.");for(;u;)try{if(n=1,r&&(o=2&c[0]?r.return:c[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,c[1])).done)return o;switch(r=0,o&&(c=[2&c[0],o.value]),c[0]){case 0:case 1:o=c;break;case 4:return u.label++,{value:c[1],done:!1};case 5:u.label++,r=c[1],c=[0];continue;case 7:c=u.ops.pop(),u.trys.pop();continue;default:if(!(o=(o=u.trys).length>0&&o[o.length-1])&&(6===c[0]||2===c[0])){u=0;continue}if(3===c[0]&&(!o||c[1]>o[0]&&c[1]<o[3])){u.label=c[1];break}if(6===c[0]&&u.label<o[1]){u.label=o[1],o=c;break}if(o&&u.label<o[2]){u.label=o[2],u.ops.push(c);break}o[2]&&u.ops.pop(),u.trys.pop();continue}c=t.call(e,u)}catch(e){c=[6,e],r=0}finally{n=o=0}if(5&c[0])throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}([c,s])}}};Object.defineProperty(t,"__esModule",{value:!0}),t.getUrl=void 0;var c=n(7900);t.getUrl=function(e,t){return r(void 0,void 0,void 0,function(){var n,r;return o(this,function(o){switch(o.label){case 0:if("function"!=typeof e)return[3,2];return[4,e()];case 1:return n=o.sent(),[3,3];case 2:n=e,o.label=3;case 3:return r=t.current.fromSocketIO?(0,c.parseSocketIOUrl)(n):n,[2,t.current.queryParams?(0,c.appendQueryParams)(r,t.current.queryParams):r]}})})}},9217:function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.resetWebSockets=t.sharedWebSockets=void 0,t.sharedWebSockets={},t.resetWebSockets=function(e){if(e&&t.sharedWebSockets.hasOwnProperty(e))delete t.sharedWebSockets[e];else for(var n in t.sharedWebSockets)t.sharedWebSockets.hasOwnProperty(n)&&delete t.sharedWebSockets[n]}},1336:function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.resetSubscribers=t.removeSubscriber=t.addSubscriber=t.hasSubscribers=t.getSubscribers=void 0;var n={},r=[];t.getSubscribers=function(e){return(0,t.hasSubscribers)(e)?Array.from(n[e]):r},t.hasSubscribers=function(e){var t;return(null===(t=n[e])||void 0===t?void 0:t.size)>0},t.addSubscriber=function(e,t){n[e]=n[e]||new Set,n[e].add(t)},t.removeSubscriber=function(e,t){n[e].delete(t)},t.resetSubscribers=function(e){if(e&&n.hasOwnProperty(e))delete n[e];else for(var t in n)n.hasOwnProperty(t)&&delete n[t]}},4625:function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.websocketWrapper=void 0,t.websocketWrapper=function(e,t){return new Proxy(e,{get:function(e,n){var r=e[n];return"reconnect"===n?t:"function"==typeof r?(console.error("Calling methods directly on the websocket is not supported at this moment. You must use the methods returned by useWebSocket."),function(){}):r},set:function(e,t,n){return/^on/.test(t)?(console.warn("The websocket's event handlers should be defined through the options object passed into useWebSocket."),!1):(e[t]=n,!0)}})},t.default=t.websocketWrapper},7900:function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),t.setUpSocketIOPing=t.appendQueryParams=t.parseSocketIOUrl=void 0;var r=n(2984);t.parseSocketIOUrl=function(e){if(e){var t=/^https|wss/.test(e),n=e.replace(/^(https?|wss?)(:\/\/)?/,"").replace(/\/$/,""),o=t?"wss":"ws";return"".concat(o,"://").concat(n).concat(r.SOCKET_IO_PATH)}if(""===e){var t=/^https/.test(window.location.protocol),o=t?"wss":"ws",c=window.location.port?":".concat(window.location.port):"";return"".concat(o,"://").concat(window.location.hostname).concat(c).concat(r.SOCKET_IO_PATH)}return e},t.appendQueryParams=function(e,t){void 0===t&&(t={});var n=/\?([\w]+=[\w]+)/.test(e),r="".concat(Object.entries(t).reduce(function(e,t){var n=t[0],r=t[1];return e+"".concat(n,"=").concat(r,"&")},"").slice(0,-1));return"".concat(e).concat(n?"&":"?").concat(r)},t.setUpSocketIOPing=function(e,t){return void 0===t&&(t=r.SOCKET_IO_PING_INTERVAL),window.setInterval(function(){return e(r.SOCKET_IO_PING_CODE)},t)}},5025:function(e,t,n){var r=this&&this.__assign||function(){return(r=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},o=this&&this.__rest||function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&0>t.indexOf(r)&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var o=0,r=Object.getOwnPropertySymbols(e);o<r.length;o++)0>t.indexOf(r[o])&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]]);return n};Object.defineProperty(t,"__esModule",{value:!0}),t.useEventSource=void 0;var c=n(5721),u=n(8507),s=n(2984);t.useEventSource=function(e,t,n){void 0===t&&(t=s.DEFAULT_EVENT_SOURCE_OPTIONS);var a=t.withCredentials,i=t.events,f=o(t,["withCredentials","events"]);void 0===n&&(n=!0);var l=r(r({},f),{eventSourceOptions:{withCredentials:a}}),d=(0,c.useRef)(s.EMPTY_EVENT_HANDLERS);i&&(d.current=i);var S=(0,u.useWebSocket)(e,l,n),p=S.lastMessage,v=S.readyState,b=S.getWebSocket;return(0,c.useEffect)(function(){(null==p?void 0:p.type)&&Object.entries(d.current).forEach(function(e){var t=e[0],n=e[1];t===p.type&&n(p)})},[p]),{lastEvent:p,readyState:v,getEventSource:b}}},3706:function(e,t,n){var r=this&&this.__assign||function(){return(r=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)};Object.defineProperty(t,"__esModule",{value:!0}),t.useSocketIO=void 0;var o=n(5721),c=n(8507),u=n(2984),s={type:"empty",payload:null},a=function(e){if(!e||!e.data)return s;var t=e.data.match(/\[.*]/);if(!t)return s;var n=JSON.parse(t);return Array.isArray(n)&&n[1]?{type:n[0],payload:n[1]}:s};t.useSocketIO=function(e,t,n){void 0===t&&(t=u.DEFAULT_OPTIONS),void 0===n&&(n=!0);var s=(0,o.useMemo)(function(){return r(r({},t),{fromSocketIO:!0})},[]),i=(0,c.useWebSocket)(e,s,n),f=i.sendMessage,l=i.sendJsonMessage,d=i.lastMessage,S=i.readyState,p=i.getWebSocket,v=(0,o.useMemo)(function(){return a(d)},[d]);return{sendMessage:f,sendJsonMessage:l,lastMessage:v,lastJsonMessage:v,readyState:S,getWebSocket:p}}},8507:function(e,t,n){var r=this&&this.__assign||function(){return(r=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},o=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))(function(o,c){function u(e){try{a(r.next(e))}catch(e){c(e)}}function s(e){try{a(r.throw(e))}catch(e){c(e)}}function a(e){var t;e.done?o(e.value):((t=e.value)instanceof n?t:new n(function(e){e(t)})).then(u,s)}a((r=r.apply(e,t||[])).next())})},c=this&&this.__generator||function(e,t){var n,r,o,c,u={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return c={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(c[Symbol.iterator]=function(){return this}),c;function s(c){return function(s){return function(c){if(n)throw TypeError("Generator is already executing.");for(;u;)try{if(n=1,r&&(o=2&c[0]?r.return:c[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,c[1])).done)return o;switch(r=0,o&&(c=[2&c[0],o.value]),c[0]){case 0:case 1:o=c;break;case 4:return u.label++,{value:c[1],done:!1};case 5:u.label++,r=c[1],c=[0];continue;case 7:c=u.ops.pop(),u.trys.pop();continue;default:if(!(o=(o=u.trys).length>0&&o[o.length-1])&&(6===c[0]||2===c[0])){u=0;continue}if(3===c[0]&&(!o||c[1]>o[0]&&c[1]<o[3])){u.label=c[1];break}if(6===c[0]&&u.label<o[1]){u.label=o[1],o=c;break}if(o&&u.label<o[2]){u.label=o[2],u.ops.push(c);break}o[2]&&u.ops.pop(),u.trys.pop();continue}c=t.call(e,u)}catch(e){c=[6,e],r=0}finally{n=o=0}if(5&c[0])throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}([c,s])}}},u=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.useWebSocket=void 0;var s=n(5721),a=n(2718),i=n(2984),f=n(2080),l=n(6908),d=u(n(4625)),S=n(2614);t.useWebSocket=function(e,t,n){void 0===t&&(t=i.DEFAULT_OPTIONS),void 0===n&&(n=!0);var u=(0,s.useState)(null),p=u[0],v=u[1],b=(0,s.useState)({}),E=b[0],h=b[1],O=(0,s.useMemo)(function(){if(p)try{return JSON.parse(p.data)}catch(e){return i.UNPARSABLE_JSON_OBJECT}return null},[p]),y=(0,s.useRef)(null),_=(0,s.useRef)(null),N=(0,s.useRef)(function(){}),R=(0,s.useRef)(0),T=(0,s.useRef)([]),w=(0,s.useRef)(null),C=(0,s.useRef)(t);C.current=t;var I=y.current&&void 0!==E[y.current]?E[y.current]:null!==e&&!0===n?i.ReadyState.CONNECTING:i.ReadyState.UNINSTANTIATED,k=t.queryParams?JSON.stringify(t.queryParams):null,g=(0,s.useCallback)(function(e,t){var n;if(void 0===t&&(t=!0),i.isEventSourceSupported&&_.current instanceof EventSource){console.warn("Unable to send a message from an eventSource");return}(null===(n=_.current)||void 0===n?void 0:n.readyState)===i.ReadyState.OPEN?((0,S.assertIsWebSocket)(_.current,C.current.skipAssert),_.current.send(e)):t&&T.current.push(e)},[]),P=(0,s.useCallback)(function(e,t){void 0===t&&(t=!0),g(JSON.stringify(e),t)},[g]),A=(0,s.useCallback)(function(){return!0!==C.current.share||i.isEventSourceSupported&&_.current instanceof EventSource?_.current:(null===w.current&&_.current&&((0,S.assertIsWebSocket)(_.current,C.current.skipAssert),w.current=(0,d.default)(_.current,N)),w.current)},[]);return(0,s.useEffect)(function(){if(null!==e&&!0===n){var t,u=!1,s=!0,d=function(){return o(void 0,void 0,void 0,function(){var n,o,i;return c(this,function(c){switch(c.label){case 0:return n=y,[4,(0,l.getUrl)(e,C)];case 1:return n.current=c.sent(),o=function(e){u||(0,a.flushSync)(function(){return v(e)})},i=function(e){u||(0,a.flushSync)(function(){return h(function(t){var n;return r(r({},t),y.current&&((n={})[y.current]=e,n))})})},s&&(t=(0,f.createOrJoinSocket)(_,y.current,i,C,o,N,R,g)),[2]}})})};return N.current=function(){u||(w.current&&(w.current=null),null==t||t(),d())},d(),function(){u=!0,s=!1,w.current&&(w.current=null),null==t||t(),v(null)}}(null===e||!1===n)&&(R.current=0,h(function(e){var t;return r(r({},e),y.current&&((t={})[y.current]=i.ReadyState.CLOSED,t))}))},[e,n,k,g]),(0,s.useEffect)(function(){I===i.ReadyState.OPEN&&T.current.splice(0).forEach(function(e){g(e)})},[I]),{sendMessage:g,sendJsonMessage:P,lastMessage:p,lastJsonMessage:O,readyState:I,getWebSocket:A}}},2614:function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),t.resetGlobalState=t.assertIsWebSocket=void 0;var r=n(9217),o=n(1336);t.assertIsWebSocket=function(e,t){if(!t&&e instanceof WebSocket==!1)throw Error("")},t.resetGlobalState=function(e){(0,o.resetSubscribers)(e),(0,r.resetWebSockets)(e)}}}]);