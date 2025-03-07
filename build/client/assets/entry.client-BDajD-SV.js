import{E as p,i as v,d as C,c as R,m as h,s as M,a as y,g,b as E,e as S,f as b,r as i,h as F,k as P,l as k,n as D,o as z,p as H,j as L}from"./components-DEsfW1mq.js";/**
 * @remix-run/react v2.16.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function O(u){if(!u)return null;let m=Object.entries(u),s={};for(let[a,e]of m)if(e&&e.__type==="RouteErrorResponse")s[a]=new p(e.status,e.statusText,e.data,e.internal===!0);else if(e&&e.__type==="Error"){if(e.__subType){let o=window[e.__subType];if(typeof o=="function")try{let r=new o(e.message);r.stack=e.stack,s[a]=r}catch{}}if(s[a]==null){let o=new Error(e.message);o.stack=e.stack,s[a]=o}}else s[a]=e;return s}/**
 * @remix-run/react v2.16.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */let n,t,c=!1,f;new Promise(u=>{f=u}).catch(()=>{});function T(u){if(!t){if(window.__remixContext.future.v3_singleFetch){if(!n){let d=window.__remixContext.stream;v(d,"No stream found for single fetch decoding"),window.__remixContext.stream=void 0,n=C(d,window).then(_=>{window.__remixContext.state=_.value,n.value=!0}).catch(_=>{n.error=_})}if(n.error)throw n.error;if(!n.value)throw n}let o=R(window.__remixManifest.routes,window.__remixRouteModules,window.__remixContext.state,window.__remixContext.future,window.__remixContext.isSpaMode),r;if(!window.__remixContext.isSpaMode){r={...window.__remixContext.state,loaderData:{...window.__remixContext.state.loaderData}};let d=h(o,window.location,window.__remixContext.basename);if(d)for(let _ of d){let l=_.route.id,x=window.__remixRouteModules[l],w=window.__remixManifest.routes[l];x&&M(w,x,window.__remixContext.isSpaMode)&&(x.HydrateFallback||!w.hasLoader)?r.loaderData[l]=void 0:w&&!w.hasLoader&&(r.loaderData[l]=null)}r&&r.errors&&(r.errors=O(r.errors))}t=y({routes:o,history:S(),basename:window.__remixContext.basename,future:{v7_normalizeFormMethod:!0,v7_fetcherPersist:window.__remixContext.future.v3_fetcherPersist,v7_partialHydration:!0,v7_prependBasename:!0,v7_relativeSplatPath:window.__remixContext.future.v3_relativeSplatPath,v7_skipActionErrorRevalidation:window.__remixContext.future.v3_singleFetch===!0},hydrationData:r,mapRouteProperties:z,dataStrategy:window.__remixContext.future.v3_singleFetch&&!window.__remixContext.isSpaMode?E(window.__remixManifest,window.__remixRouteModules,()=>t):void 0,patchRoutesOnNavigation:g(window.__remixManifest,window.__remixRouteModules,window.__remixContext.future,window.__remixContext.isSpaMode,window.__remixContext.basename)}),t.state.initialized&&(c=!0,t.initialize()),t.createRoutesForHMR=b,window.__remixRouter=t,f&&f(t)}let[m,s]=i.useState(void 0),[a,e]=i.useState(t.state.location);return i.useLayoutEffect(()=>{c||(c=!0,t.initialize())},[]),i.useLayoutEffect(()=>t.subscribe(o=>{o.location!==a&&e(o.location)}),[a]),F(t,window.__remixManifest,window.__remixRouteModules,window.__remixContext.future,window.__remixContext.isSpaMode),i.createElement(i.Fragment,null,i.createElement(P.Provider,{value:{manifest:window.__remixManifest,routeModules:window.__remixRouteModules,future:window.__remixContext.future,criticalCss:m,isSpaMode:window.__remixContext.isSpaMode}},i.createElement(k,{location:a},i.createElement(D,{router:t,fallbackElement:null,future:{v7_startTransition:!0}}))),window.__remixContext.future.v3_singleFetch?i.createElement(i.Fragment,null):null)}H.hydrate(L.jsx(T,{}),document);
