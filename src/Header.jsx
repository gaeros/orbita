import {t,locale,useLanguage,setLanguage} from './i18n';
import {useEffect,useRef,useState} from 'react';
import {format} from './launches';

const operators=[
  {name:'SpaceX',id:'spacex',vehicles:[['starship','Starship'],['falcon-9','Falcon 9']]},
  {name:'Blue Origin',id:'blue-origin',vehicles:[['new-glenn','New Glenn'],['new-shepard','New Shepard']]}
];
const desktop=()=>matchMedia('(hover:hover) and (min-width:761px)').matches;

export function Header({vehicle=''}) {
  const language=useLanguage();
  useEffect(()=>{
    document.documentElement.lang=language;
    if(!vehicle)document.title='Orbita — '+t('Calendario dei lanci');
    const meta=document.querySelector('meta[name="description"]');
    if(meta){
      meta.dataset.it ||= meta.content;
      meta.content=language==='it'?meta.dataset.it:vehicle?'Explore '+document.title.split(' | ')[0]+' specifications and flight details.':'Upcoming space launches, with operator and vehicle filters and times in Rome.';
    }
  },[language,vehicle]);
  const [now,setNow]=useState(Date.now);
  const [hidden,setHidden]=useState(false);
  const [open,setOpen]=useState(false);
  const [group,setGroup]=useState(null);
  const groupTriggers=useRef({});
  const trigger=useRef(null);
  const header=useRef(null);

  useEffect(()=>{
    const timer=setInterval(()=>setNow(Date.now()),15000);
    let previous=Math.max(0,window.scrollY);
    function onScroll(){
      const y=Math.max(0,window.scrollY);
      if(Math.abs(y-previous)<4 && y>0)return;
      const descending=y>header.current.offsetHeight && y>previous;
      setHidden(descending);
      if(descending && !mobile.matches)setGroup(null);
      previous=y;
    }
    const mobile=matchMedia('(max-width:760px)');
    const resize=()=>{setOpen(false);setGroup(null);};
    mobile.addEventListener('change',resize);
    window.addEventListener('scroll',onScroll,{passive:true});
    return ()=>{
      clearInterval(timer);
      window.removeEventListener('scroll',onScroll);
      mobile.removeEventListener('change',resize);
    };
  },[]);

  function closeMenu(){
    setOpen(false);
    trigger.current?.focus();
  }
  useEffect(()=>{
    if(!open && !group)return;
    const dismiss=e=>{if(!header.current.contains(e.target)){setOpen(false);setGroup(null);}};
    document.addEventListener('pointerdown',dismiss);
    return ()=>document.removeEventListener('pointerdown',dismiss);
  },[open,group]);

  return <header ref={header} className="orbita-header" data-hidden={hidden&&!open}
    data-open={open} onKeyDown={e=>{if(e.key!=='Escape')return; if(group){setGroup(null);groupTriggers.current[group]?.focus();}else if(open)closeMenu();}}
    onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget))setOpen(false);}}>
    <div className="wrap mast">
      <a className="brand" href="./"><img src="./segnale.png" width="46" height="46" alt=""/>orbita</a>
      <button ref={trigger} className="menu-toggle" aria-label={open?t('Chiudi menu'):t('Apri menu')}
        aria-controls="orbita-nav" aria-expanded={open} onClick={()=>{setGroup(null);setOpen(!open);}}>
        <span/><span/><span/>
      </button>
      <nav className="site-nav" id="orbita-nav" aria-label={t("Navigazione principale")} onClick={e=>{if(e.target.closest('a')){setOpen(false);setGroup(null);}}}>
        <a href="./#calendario">{t("Calendario")}</a>
        {operators.map(({name,id,vehicles})=>{
          const expanded=group===id;
          return <div className="space-group" key={id}
            onPointerEnter={e=>{if(e.pointerType==='mouse' && desktop())setGroup(id);}}
            onPointerLeave={e=>{if(e.pointerType==='mouse' && desktop() && !e.currentTarget.contains(document.activeElement))setGroup(current=>current===id?null:current);}}
            onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget))setGroup(current=>current===id?null:current);}}>
            <button className="space-trigger" ref={el=>{groupTriggers.current[id]=el;}}
              aria-expanded={expanded} aria-controls={id+'-links'}
              onClick={e=>setGroup(e.detail && desktop()?id:expanded?null:id)}>{name}</button>
            <div id={id+'-links'} className="rocket-links" hidden={!expanded}>
              {vehicles.map(([slug,label])=><a key={slug} href={'./'+slug+'.html'} aria-current={vehicle===slug?'page':undefined}>{label}</a>)}
            </div>
          </div>;
        })}
      </nav>
      <select className="language-switch" aria-label={language==='it'?'Lingua':'Language'} value={language} onChange={e=>setLanguage(e.target.value)}>
        <option value="it" lang="it">IT</option><option value="en" lang="en">EN</option>
      </select>
      <span className="clock">{t("Roma")} <b id="clock">{format(now,{hour:'2-digit',minute:'2-digit'})}</b></span>
    </div>
  </header>;
}
