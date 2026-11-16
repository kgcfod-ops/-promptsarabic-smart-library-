/* Pure functions shared by the interface and the content checks. */
(function(root){
'use strict';
const normalize=s=>String(s??'').normalize('NFKD').replace(/[\u064B-\u065F\u0670\u0640]/g,'').replace(/[أإآٱ]/g,'ا').replace(/ى/g,'ي').replace(/ة/g,'ه').toLowerCase().replace(/\s+/g,' ').trim();
const groups=[['ورقة عمل','ورقه عمل','تدريبات','تدريب'],['سيرة','سيره','cv','resume'],['فيديو','سيناريو','video'],['موقع','مواقع','منصة','منصه','ويب'],['لعبة','لعبه','العاب','ألعاب'],['عرض','شرائح','بوربوينت','powerpoint'],['مطوية','مطويه','بروشور']].map(g=>g.map(normalize));
function matches(p,q,sections){const hay=normalize([p.title,p.description,p.audience,...p.tags,sections.find(s=>s.id===p.sectionId)?.title].join(' '));return normalize(q).split(' ').filter(Boolean).every(word=>{const group=groups.find(g=>g.some(t=>t===word||t.split(' ').includes(word)));return group?group.some(term=>hay.includes(term)):hay.includes(word);});}
function compile(p,values){return p.template.replace(/\[([^\]]+)\]/g,(token,key)=>String(values[key]??'').trim()||token);}
function filter(prompts,state,sections){return prompts.filter(p=>(!state.section||p.sectionId===state.section)&&(!state.audience||p.audience===state.audience)&&(!state.output||p.outputType===state.output)&&(!state.level||p.level===state.level)&&matches(p,state.q||'',sections));}
const api={normalize,matches,compile,filter};root.LibraryCore=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window==='undefined'?globalThis:window);
