import{n as b,s as _}from"./scheduler.ff06a07f.js";const e=[];function d(n,l=b){let o;const i=new Set;function r(t){if(_(n,t)&&(n=t,o)){const c=!e.length;for(const s of i)s[1](),e.push(s,n);if(c){for(let s=0;s<e.length;s+=2)e[s][0](e[s+1]);e.length=0}}}function f(t){r(t(n))}function p(t,c=b){const s=[t,c];return i.add(s),i.size===1&&(o=l(r,f)||b),t(n),()=>{i.delete(s),i.size===0&&o&&(o(),o=null)}}return{set:r,update:f,subscribe:p}}var u;const g=((u=globalThis.__sveltekit_19kgopc)==null?void 0:u.base)??"/mc-pinger";var a;const k=((a=globalThis.__sveltekit_19kgopc)==null?void 0:a.assets)??g;export{k as a,g as b,d as w};