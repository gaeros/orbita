import {LegalLinks} from './LegalLinks';
import {t,locale,useLanguage,setLanguage} from './i18n';
import {Header} from './Header';
import {Fragment,useEffect,useRef,useState} from 'react';
import {createRoot} from 'react-dom/client';
import {format,period,timing,dated,exact} from './launches';
import {useSchedule} from './useSchedule';

const mission = x => x.mission==='Unknown Payload'?t('Carico da annunciare'):x.mission;
const choices = (items,key) => [...new Set(items.map(x=>x[key]))].sort((a,b)=>a.localeCompare(b,locale()));

function OrbitalFilm(){
  const [reduced,setReduced]=useState(()=>matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [playing,setPlaying]=useState(false);
  const [ready,setReady]=useState(false);
  const [failed,setFailed]=useState(false);
  const ref=useRef(null);
  useEffect(()=>{
    const preference=matchMedia('(prefers-reduced-motion: reduce)');
    const change=()=>{setReduced(preference.matches);setReady(false);setPlaying(false);};
    preference.addEventListener('change',change);
    return ()=>preference.removeEventListener('change',change);
  },[]);
  if(reduced || failed)return null;
  return <>
    <figure aria-hidden="true" hidden={!ready}><video ref={ref} src="./orion.mp4" loop muted autoPlay playsInline
      onLoadedData={()=>setReady(true)} onPlaying={()=>setPlaying(true)} onPause={()=>setPlaying(false)} onError={()=>setFailed(true)}/></figure>
    {ready && <><span className="film-credit">{t("Terra da Orion · Archivio NASA")}</span>
      <button className="film-toggle" onClick={()=>playing?ref.current.pause():ref.current.play().catch(()=>setFailed(true))}>
        {playing?t('Pausa video'):t('Riproduci video')}</button></>}
  </>;
}
function Featured({launch}){
  const date=launch && (dated(launch)?format(launch.net,{weekday:'long',day:'numeric',month:'long',year:'numeric'}):period(launch));
  return <section className="hero" aria-labelledby="featured">
    <OrbitalFilm/>
    <div className="feature" data-enter><div className="kicker"><i/> {t("Prossimo lancio")}</div>
      <h1 id="featured">{launch?mission(launch):t('Calendario lanci')}</h1>
      <p id="featuremeta">{launch && launch.provider+' / '+launch.rocket}</p>
      <p id="featuredate">{date||t('Nessun lancio disponibile')}{launch && dated(launch) && <strong>{timing(launch)} · {t("Ora di Roma")}</strong>}</p>
      <div className="actions">{launch?.stream && <a className="jump primary" href={launch.stream}>{t("Guarda la diretta")}</a>}
        <a className="jump" href="#calendario">{t("Calendario lanci")}</a></div>
    </div></section>;
}
function LaunchRow({launch:x}){
  return <details className="row"><summary>
    <span className="when"><span className="day">{dated(x)?format(x.net,{day:'2-digit'}):'—'}</span><span className="time">{dated(x)?timing(x):t('Stima')}</span></span>
    <span className="mission">{mission(x)}</span><span className="provider">{x.provider}<span className="sub">{x.rocket}</span></span>
    <span className="toggle" aria-hidden="true">+</span></summary>
    <div className="extra">{t("Base di lancio")} · {x.pad||t('Da definire')}{x.orbit && <p>{t("Orbita prevista")} · {x.orbit}</p>}{x.stream && <a className="stream" href={x.stream}>{t("Guarda la diretta")}</a>}</div>
  </details>;
}
function Calendar({items}){
  const [operator,setOperator]=useState(()=>new URLSearchParams(location.search).get('operatore')==='blue-origin'?'Blue Origin':''),[rocket,setRocket]=useState('');
  const operatorRef=useRef(null);
  const operators=choices([...items,{provider:'Blue Origin'}],'provider');
  const activeOperator=operators.includes(operator)?operator:'';
  const pool=items.filter(x=>!activeOperator||x.provider===activeOperator);
  const rockets=choices(pool,'rocket');
  const activeRocket=rockets.includes(rocket)?rocket:'';
  const shown=pool.filter(x=>!activeRocket||x.rocket===activeRocket);
  const groups=new Map();
  for(const launch of shown){
    const label=period(launch);
    if(!groups.has(label))groups.set(label,[]);
    groups.get(label).push(launch);
  }
  function changeOperator(value){
    setOperator(value);
    if(!items.some(x=>(!value||x.provider===value)&&x.rocket===rocket))setRocket('');
  }
  return <section id="calendario"><div className="heading"><h2>{t("Calendario dei lanci")}</h2></div>
    <div className="filters"><label>{t("Operatore")}<select ref={operatorRef} id="provider" value={activeOperator} onChange={e=>changeOperator(e.target.value)}>
      <option value="">{t("Tutti gli operatori")}</option>{operators.map(v=><option key={v}>{v}</option>)}</select></label>
      <label>{t("Vettore")}<select id="rocket" value={activeRocket} onChange={e=>setRocket(e.target.value)}>
      <option value="">{t("Tutti i vettori")}</option>{rockets.map(v=><option key={v}>{v}</option>)}</select></label>
      {(activeOperator||activeRocket) && <button id="reset" onClick={()=>{setOperator('');setRocket('');operatorRef.current.focus();}}>{t("Azzera filtri")}</button>}
      <span className="zone">{t("Orari di Roma")}</span></div>
    {activeOperator==='Blue Origin' && <p className="blue-vehicles">{t("I veicoli di Blue Origin")}: <a href="https://www.blueorigin.com/new-glenn">New Glenn</a> {t("(orbitale) e")} <a href="https://www.blueorigin.com/new-shepard">New Shepard</a> {t("(suborbitale).")}</p>}
    <p id="count" role="status">{shown.length} {shown.length===1?t('lancio in programma'):t('lanci in programma')}</p>
    <div id="list">{!shown.length && <p>{t("Nessun lancio per questa selezione.")}</p>}
      {[...groups].map(([label,rows])=><Fragment key={label}><h3 className="month">{label}</h3>{rows.map(x=><LaunchRow key={x.id} launch={x}/>)}</Fragment>)}</div>
  </section>;
}
function App(){
  useLanguage();
  const {feed,busy,notice,refresh}=useSchedule();
  const [now,setNow]=useState(Date.now);
  useEffect(()=>{const timer=setInterval(()=>setNow(Date.now()),15000);return ()=>clearInterval(timer);},[]);
  const today=new Date(now).toISOString().slice(0,10);
  const items=(feed?.items||[]).filter(x=>![3,4,7].includes(x.status)&&(exact(x)?Math.max(Date.parse(x.net),Date.parse(x.end)||0)>=now:x.net.slice(0,10)>=today)).sort((a,b)=>Date.parse(a.net)-Date.parse(b.net));
  const stamp=feed?.updated && format(feed.updated,{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'});
  const status=notice==='Aggiornato il '?t('Aggiornato il')+' '+stamp:(notice?t(notice.trim())+' ':'')+(stamp?t('Copia del')+' '+stamp:busy?t('Caricamento…'):t('Riprova più tardi.'));
  return <><a className="skip" href="#calendario">{t("Vai al calendario")}</a><Header/><main className="wrap">
    <Featured launch={items[0]}/><Calendar items={items}/>
    <footer><span>{t("Dati di")} <a href="https://thespacedevs.com/llapi">Launch Library 2</a></span><span id="sync" role="status">{status}</span><button disabled={busy} id="refresh" onClick={refresh}>{t("Aggiorna")}</button><LegalLinks/></footer>
  </main></>;
}
createRoot(document.getElementById('root')).render(<App/>);
if('serviceWorker' in navigator)navigator.serviceWorker.register('./sw.js').catch(()=>{});
