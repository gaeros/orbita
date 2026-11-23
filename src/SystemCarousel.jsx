import {Diagram} from './Diagram';
import {t,locale,useLanguage,setLanguage} from './i18n';
import {useEffect,useRef,useState} from 'react';

export function SystemCarousel({chapter}){
  const [index,setIndex]=useState(0);
  const [vacuum,setVacuum]=useState(false);
  const [paused,setPaused]=useState(()=>matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [visible,setVisible]=useState(false);
  const section=useRef(null), touch=useRef(null);
  const slides=chapter.slides;
  const [title,image,description,stats]=slides[index];
  const clip=image==='raptor' && vacuum?'rvac':image;
  function go(i){setIndex(Math.max(0,Math.min(slides.length-1,i)));}
  useEffect(()=>{
    const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting));
    observer.observe(section.current);
    const preference=matchMedia('(prefers-reduced-motion: reduce)');
    const change=()=>setPaused(preference.matches);
    preference.addEventListener('change',change);
    return ()=>{observer.disconnect();preference.removeEventListener('change',change);};
  },[]);
  return <section id="sistema-starship" className="vehicle-chapter system-carousel" aria-label={t("Sistema Starship")} aria-roledescription={t("carosello")}
    ref={section} tabIndex={0} onKeyDown={e=>{
      if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();go(index+(e.key==='ArrowRight'?1:-1));}
    }} onTouchStart={e=>{touch.current=[e.touches[0].clientX,e.touches[0].clientY];}}
    onTouchEnd={e=>{if(!touch.current)return;const x=e.changedTouches[0].clientX-touch.current[0],y=e.changedTouches[0].clientY-touch.current[1];touch.current=null;if(Math.abs(x)>55 && Math.abs(x)>Math.abs(y)*1.5)go(index+(x<0?1:-1));}}>
    <Diagram shape={image==="raptor"?"engine":image} animated paused={paused||!visible}/>
    <div className="vehicle-panel" aria-live="polite">
      <h2>{t(title)}</h2>
      {image==='raptor' && <div className="vehicle-options" role="group" aria-label={t("Versione del motore")}>
        <button aria-pressed={!vacuum} onClick={()=>setVacuum(false)}>Raptor</button>
        <button aria-pressed={vacuum} onClick={()=>setVacuum(true)}>Raptor Vacuum</button>
      </div>}
      <p>{clip==='rvac'?t('Il Raptor Vacuum ha un ugello piÃ¹ ampio, progettato per consentire ai gas di espandersi nello spazio.'):t(description)}</p>
      {stats && <dl>{stats.map(([name,value])=><div key={name}><dt>{t(name)}</dt><dd>{t(value)}</dd></div>)}</dl>}
    </div>
    <button className="rotation-toggle" aria-label={paused?t('Avvia rotazione'):t('Pausa rotazione')} title={paused?t('Avvia rotazione'):t('Pausa rotazione')} onClick={()=>setPaused(!paused)}>{paused?'â–·':'â…¡'}</button>
    <div className="system-controls">
      <button className="step prev" disabled={!index} aria-label={t("Sezione precedente")} onClick={()=>go(index-1)}><i/></button>
      <div className="slide-dots">{slides.map(([name],i)=><button key={name} aria-label={t(name)} aria-current={i===index?'step':undefined} onClick={()=>go(i)}><i/></button>)}</div>
      <button className="step next" disabled={index===slides.length-1} aria-label={t("Sezione successiva")} onClick={()=>go(index+1)}><i/></button>
    </div>
  </section>;
}
