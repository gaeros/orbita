import {Diagram} from './Diagram';
import {LegalLinks} from './LegalLinks';
import {t,locale,useLanguage,setLanguage} from './i18n';
import {SystemCarousel} from './SystemCarousel';
import {useState} from 'react';
import {createRoot} from 'react-dom/client';
import {Header} from './Header';
import {falcon,starship,glenn,shepard} from './vehicles';

function Chapter({chapter,brief=false}){
  const [selected,setSelected]=useState(0);
  const [label,image,description,stats]=chapter.slides[selected];
  return <section className={brief?"vehicle-brief":"vehicle-chapter"}>
    {!brief && <Diagram shape={chapter.title.includes("Merlin")?"engine":shapes[vehicle.slug]}/>}
    <div className="vehicle-panel">
      <p className="kicker">{t(chapter.title)}</p><h2>{t(label)}</h2>
      {chapter.slides.length>1 && <div role="group" aria-label={t(chapter.title)} className="vehicle-options">
        {chapter.slides.map(([name],i)=><button key={name} aria-pressed={selected===i} onClick={()=>setSelected(i)}>{t(name)}</button>)}
      </div>}
      <div aria-live="polite"><p>{t(description)}</p>
        {stats && <dl>{stats.map(([name,value])=><div key={name}><dt>{t(name)}</dt><dd>{t(value)}</dd></div>)}</dl>}
      </div>
    </div>
  </section>;
}
const shapes={'falcon-9':'falcon',starship:'stack','new-glenn':'glenn','new-shepard':'shepard'};
const vehicle=[falcon,starship,glenn,shepard].find(v=>location.pathname.endsWith('/'+v.slug+'.html')) || starship;
const blue=vehicle===glenn || vehicle===shepard;
const other=blue?(vehicle===glenn?shepard:glenn):(vehicle===falcon?starship:falcon);
const source=blue?'https://www.blueorigin.com/'+vehicle.slug:'https://www.spacex.com/vehicles/'+vehicle.slug+'/';
function VehiclePage(){
  useLanguage();
  return <><a className="skip" href="#veicolo">{t("Vai alla scheda tecnica")}</a><Header vehicle={vehicle.slug}/>
    <main id="veicolo" className="vehicle-page">
      <section className="vehicle-cover original-cover"><Diagram shape={shapes[vehicle.slug]}/>
        <div data-enter><h1>{vehicle.name}</h1><p>{t(vehicle.subtitle)}</p></div>
        <a href="#panoramica" aria-label={t("Vai alla panoramica")}><span aria-hidden="true">⌄</span></a>
      </section>
      <p id="panoramica" className="vehicle-intro">{t(vehicle.intro)}</p>
      {vehicle.sections.map((chapter,i)=>vehicle===starship && i===0 ? <SystemCarousel key={chapter.title} chapter={chapter}/> : <Chapter key={chapter.title} chapter={chapter} brief={blue}/>)}
      <footer><span>{t("Dati tecnici")} · <a href={source}>{blue?'Blue Origin':'SpaceX'}</a></span>
        <a href={'./'+other.slug+'.html'}>{t("Scopri")} {other.name}</a><a href={blue?'./?operatore=blue-origin#calendario':'./#calendario'}>{t("Calendario lanci")}</a><LegalLinks/></footer>
    </main></>;
}
createRoot(document.getElementById('root')).render(<VehiclePage/>);
if('serviceWorker' in navigator)navigator.serviceWorker.register('./sw.js').catch(()=>{});
