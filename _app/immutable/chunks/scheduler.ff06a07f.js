function y(){}function w(t,n){for(const e in n)t[e]=n[e];return t}function F(t){return!!t&&(typeof t=="object"||typeof t=="function")&&typeof t.then=="function"}function j(t){return t()}function P(){return Object.create(null)}function E(t){t.forEach(j)}function q(t){return typeof t=="function"}function S(t,n){return t!=t?n==n:t!==n||t&&typeof t=="object"||typeof t=="function"}let a;function U(t,n){return t===n?!0:(a||(a=document.createElement("a")),a.href=n,t===a.href)}function B(t){return Object.keys(t).length===0}function O(t,...n){if(t==null){for(const r of n)r(void 0);return y}const e=t.subscribe(...n);return e.unsubscribe?()=>e.unsubscribe():e}function C(t,n,e){t.$$.on_destroy.push(O(n,e))}function D(t,n,e,r){if(t){const o=m(t,n,e,r);return t[0](o)}}function m(t,n,e,r){return t[1]&&r?w(e.ctx.slice(),t[1](r(n))):e.ctx}function G(t,n,e,r){if(t[2]&&r){const o=t[2](r(e));if(n.dirty===void 0)return o;if(typeof o=="object"){const f=[],d=Math.max(n.dirty.length,o.length);for(let s=0;s<d;s+=1)f[s]=n.dirty[s]|o[s];return f}return n.dirty|o}return n.dirty}function H(t,n,e,r,o,f){if(o){const d=m(n,e,r,f);t.p(d,o)}}function I(t){if(t.ctx.length>32){const n=[],e=t.ctx.length/32;for(let r=0;r<e;r++)n[r]=-1;return n}return-1}function J(t){return t&&q(t.destroy)?t.destroy:y}let l;function _(t){l=t}function x(){if(!l)throw new Error("Function called outside component initialization");return l}function K(t){x().$$.on_mount.push(t)}function L(t){x().$$.after_update.push(t)}const i=[],b=[];let u=[];const g=[],k=Promise.resolve();let p=!1;function z(){p||(p=!0,k.then(v))}function N(){return z(),k}function M(t){u.push(t)}const h=new Set;let c=0;function v(){if(c!==0)return;const t=l;do{try{for(;c<i.length;){const n=i[c];c++,_(n),A(n.$$)}}catch(n){throw i.length=0,c=0,n}for(_(null),i.length=0,c=0;b.length;)b.pop()();for(let n=0;n<u.length;n+=1){const e=u[n];h.has(e)||(h.add(e),e())}u.length=0}while(i.length);for(;g.length;)g.pop()();p=!1,h.clear(),_(t)}function A(t){if(t.fragment!==null){t.update(),E(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(M)}}function Q(t){const n=[],e=[];u.forEach(r=>t.indexOf(r)===-1?n.push(r):e.push(r)),e.forEach(r=>r()),u=n}export{z as A,L as a,b,D as c,G as d,C as e,x as f,I as g,_ as h,F as i,v as j,U as k,M as l,J as m,y as n,K as o,P as p,q,E as r,S as s,N as t,H as u,B as v,Q as w,l as x,j as y,i as z};