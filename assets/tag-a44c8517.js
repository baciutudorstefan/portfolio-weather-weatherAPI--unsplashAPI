import{p as c,g as i,r as u,a1 as g,N as m,O as d,af as f,e as p}from"./index-03e85a2e.js";const v=c({class:[String,Array],style:{type:[String,Array,Object],default:null}},"component");function y(t){const r=i("useRender");r.render=t}function l(t){let r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"content";const o=u(),n=u();if(g){const s=new ResizeObserver(e=>{t==null||t(e,s),e.length&&(r==="content"?n.value=e[0].contentRect:n.value=e[0].target.getBoundingClientRect())});m(()=>{s.disconnect()}),d(o,(e,a)=>{a&&(s.unobserve(f(a)),n.value=void 0),e&&s.observe(f(e))},{flush:"post"})}return{resizeRef:o,contentRect:p(n)}}const O=c({tag:{type:String,default:"div"}},"tag");export{O as a,y as b,v as m,l as u};