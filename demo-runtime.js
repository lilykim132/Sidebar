// Demo mode: sample data in memory, pre-written Claude responses, nothing is saved.
(() => {
  const now = Date.parse("2026-11-11T14:00:00Z");
  const day = 86400000;
  const store = { projects: new Map(), captures: new Map(), drafts: new Map() };
  const subs = { projects: [], captures: [], drafts: [] };
  const fire = (n) => { const docs=[...store[n].entries()].map(([id,d])=>({id,data:()=>d})); subs[n].forEach(f=>f({docs,metadata:{fromCache:false}})); };
  const seedP = (id,d)=>store.projects.set(id,d);
  const seedC = (id,d)=>store.captures.set(id,d);
  seedP("pfit",{name:"Fit AI (Depop)",description:"A fit-confidence feature concept for secondhand fashion",role:"Product designer",timeline:"Sep 2026",scope:"Research, UX, prototyping",createdAt:"2026-09-02T12:00:00Z"});
  seedP("pside",{name:"Sidecar",description:"An AI sidebar that captures my design process as I work",role:"Designer and builder",timeline:"Nov 2026 · 4 days",scope:"Research, UX, prototyping, build",createdAt:"2026-11-09T21:00:00Z"});
  const fit=[["Discover","Insight","Vintage size tags can't be trusted","Buyers can't trust vintage size tags, and sellers rarely answer sizing questions."],["Discover","Insight","No returns raises the stakes","Most listings have no returns, so every purchase feels like a guess."],["Define","Decision","Need statement v2","Need statement: secondhand buyers need to know how a garment fits before buying."],["Develop","Feedback","Crit: is try-on necessary?","Professor asked whether try-on is really necessary."],["Develop","Decision","Cut try-on from prototype","Cutting try-on. Focusing on scanner + fit breakdown."]];
  fit.forEach(([phase,type,title,note],i)=>seedC("f"+i,{projectId:"pfit",phase,type,title,note,assetId:null,starred:i>=3,createdAt:new Date(Date.parse("2026-09-03T12:00:00Z")+i*day*3).toISOString(),tagStatus:"done",visual:""}));
  const C=[
   ["c1","Discover","Insight","Lost screenshots when writing case studies","Couldn't find old screenshots when writing the Fit AI case study","img_figma.png","Figma file with Fit AI prototype screens: scanner, fit breakdown, try-on",true,"figma.com"],
   ["c2","Discover","Insight","Small fixes never got logged","Fixed things in the moment and forgot to log them, so the why was gone",null,"",false,""],
   ["c3","Define","Decision","Picked the case study builder","Picked the case study builder: the pain is lost evidence, not writing",null,"",true,"claude.ai"],
   ["c4","Develop","Iteration","First wireframes: sidebar + web app","First wireframes: sidebar captures, web app does the AI","img_wireframes.png","Four grayscale wireframes: home, sidebar, timeline, case study",false,"claude.ai"],
   ["c5","Develop","Decision","Cut the inbox","Cut the inbox, capturing is already intentional","img_inbox.png","Inbox wireframe with a confirm step, marked as cut",true,"claude.ai"],
   ["c6","Develop","Decision","Quick note + phase buttons","Swapped \"What changed, and why?\" for Quick note + phase buttons","img_sidebar.png","Sidecar sidebar with phase buttons and a quick note field",false,"figma.com"],
   ["c7","Develop","Decision","Picked logo A","Picked logo A: it shows the browser + sidebar at a glance","img_logos.png","Four Sidecar logo options, option A highlighted",false,"claude.ai"],
   ["c8","Deliver","Iteration","First live end-to-end capture","First real end-to-end test: capture showed up live on the timeline",null,"",true,""],
  ];
  C.forEach(([id,phase,type,title,note,asset,visual,starred,host],i)=>seedC(id,{projectId:"pside",phase,type,title,note,assetId:asset,visual,starred,url:host?"https://"+host+"/":"",createdAt:new Date(Date.parse("2026-11-09T22:00:00Z")+i*day*0.27).toISOString(),tagStatus:"done"}));
  const db = { collection:(n)=>({
    doc:(id)=>({ set:async d=>{store[n].set(id,d);fire(n)}, update:async d=>{store[n].set(id,{...store[n].get(id),...d});fire(n)}, delete:async()=>{store[n].delete(id);fire(n)} }),
    onSnapshot:(next)=>{subs[n].push(next); setTimeout(()=>fire(n),10); return ()=>{}; } }) };
  const DRAFT = {"meta":{"role":"","timeline":"","scope":""},"sections":[
   {"name":"Overview","heading":"A sidebar that keeps my process","status":"drafted","blocks":[{"heading":"","text":"Sidecar is a Chrome sidebar and web app that captures my design process while I work, then turns it into a case study where every paragraph points to real evidence.","sources":["c3","c6"],"visual":"c6"}],"questions":[]},
   {"name":"Problem","heading":"Where did my screenshots go?","status":"drafted","blocks":[{"heading":"","text":"When I wrote my Fit AI case study, I couldn't find the old screenshots I needed as proof of work.","sources":["c1"],"visual":"c1"},{"heading":"","text":"Small fixes I made in the moment never got logged, so the reasons behind them were gone.","sources":["c2"],"visual":null}],"questions":[]},
   {"name":"Research","heading":"My own work was the research","status":"drafted","blocks":[{"heading":"","text":"Looking back at Fit AI, the hard part wasn't writing. It was missing evidence.","sources":["c1","c2"],"visual":null}],"questions":[]},
   {"name":"Solution","heading":"Capture now, write later","status":"drafted","blocks":[{"heading":"","text":"I chose a case study builder because the real pain was lost evidence, not writing. Capture happens in a sidebar. Claude files and drafts in the web app.","sources":["c3","c4"],"visual":"c4"}],"questions":[]},
   {"name":"Design decisions","heading":"Design decisions","status":"drafted","blocks":[
     {"heading":"Do I need to confirm every capture?","text":"I first designed an inbox to review each capture. But taking a screenshot is already intentional, so I cut it. Captures go straight onto the timeline.","sources":["c5"],"visual":"c5"},
     {"heading":"How fast can a capture be?","text":"I replaced \"What changed, and why?\" with a quick note and one-tap phase buttons, so capturing takes seconds.","sources":["c6"],"visual":"c6"},
     {"heading":"What should the mark say?","text":"I picked a logo that shows a browser window with a panel beside it: the product at a glance.","sources":["c7"],"visual":"c7"}],"questions":[]},
   {"name":"Testing","heading":"Testing","status":"thin","blocks":[],"questions":["Beyond the first end-to-end test, what happened when you used Sidecar on a real project?","Did anything about capturing slow you down?"]},
   {"name":"Reflection","heading":"Reflection","status":"thin","blocks":[],"questions":["What would you change about Sidecar next?"]}],
  "gaps":[{"title":"Why a Chrome sidebar?","detail":"The draft says capture happens in a sidebar, but no capture explains why you chose it.","question":"Why did you choose a sidebar for capturing?","phase":"Develop"},
   {"title":"Key moments without visuals","detail":"2 starred captures are notes only: \"Picked the case study builder\" and \"First live end-to-end capture\".","question":"","phase":"Define"},
   {"title":"No testing with other people","detail":"Deliver only has your own end-to-end test.","question":"Did anyone else try Sidecar?","phase":"Deliver"}]};
  const sample = async () => ({text:""});
  sample.limits = async () => ({});
  sample.json = async (prompt, opts={}) => {
    if (prompt.includes("Classify it")) return {phase:"Develop",type:"Note",title:"Note",visual:""};
    const s = JSON.stringify(DRAFT, null, 1); let i = 0;
    await new Promise(r=>setTimeout(r,1200));
    while (i < s.length) { i = Math.min(s.length, i + 90); opts.onText && opts.onText({text:s.slice(0,i), delta:""}); await new Promise(r=>setTimeout(r,70)); }
    return DRAFT;
  };
  window.claude = { use: async (n) => n==="db"?db : n==="sample"?sample : n==="assets"?{upload:async()=>{throw new Error("demo")}} : null };
})();
