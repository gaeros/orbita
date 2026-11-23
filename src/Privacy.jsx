import {createRoot} from 'react-dom/client';
import {useEffect} from 'react';
import {Header} from './Header';
import {LegalLinks} from './LegalLinks';
import {useLanguage} from './i18n';

function Privacy(){
  const en=useLanguage()==='en';
  const say=(it,english)=>en?english:it;
  const title=say('Privacy e crediti','Privacy and credits');
  useEffect(()=>{
    document.title=title+' | Orbita';
    document.querySelector('meta[name="description"]').content=say('Come Orbita tratta i dati di navigazione e quali fonti utilizza.','How Orbita handles browsing data and credits its sources.');
  },[en,title]);
  return <><a className="skip" href="#privacy">{say('Vai al contenuto','Skip to content')}</a><Header vehicle="privacy"/>
    <main id="privacy" className="privacy"><h1>{title}</h1>
      <p>{say('Aggiornamento del 23 novembre 2026. Orbita è un progetto informativo indipendente e senza scopo di lucro.','Updated 23 November 2026. Orbita is an independent, non-commercial information project.')}</p>
      <h2>{say('Chi gestisce il sito','Site operator')}</h2>
      <p>{say('Gestore indicato: gae. Informativa in preparazione per la pubblicazione: devono essere confermati l’identità completa e il recapito del titolare, il fornitore di hosting, i tempi di conservazione dei log e gli eventuali trasferimenti internazionali e relative garanzie.','Named operator: gae. This pre-publication notice awaits confirmation of the controller’s full identity and contact details, hosting provider, log retention and any international transfers and safeguards.')}</p>
      <h2>{say('Quando apri Orbita','When you open Orbita')}</h2>
      <p>{say('Per consegnare le pagine e proteggere il servizio, il server riceve l’indirizzo IP e informazioni tecniche sulla richiesta, come pagina, orario e tipo di browser. La base giuridica prevista è il legittimo interesse a fornire e mantenere sicuro il sito (art. 6, par. 1, lett. f GDPR). Orbita non richiede un account e non usa pubblicità, analytics o profilazione.','To deliver pages and keep the service secure, the server receives your IP address and technical request information such as the page, time and browser type. The intended legal basis is the legitimate interest in operating and securing the site (Article 6(1)(f) GDPR). Orbita has no accounts, advertising, analytics or profiling.')}</p>
      <p>{say('Per aggiornare il calendario, il browser contatta direttamente The Space Devs (Launch Library 2). Il fornitore riceve l’IP e i dati tecnici necessari alla risposta. Orbita invia queste richieste senza credenziali o indirizzo della pagina di provenienza. I collegamenti a dirette e siti ufficiali si aprono solo su tua scelta.','To update the calendar your browser contacts The Space Devs (Launch Library 2) directly. The provider receives your IP address and technical information needed to respond. Orbita sends these requests without credentials or a referring page address. External streams and official sites open only when you follow their links.')}</p>
      <h2>{say('Memoria sul dispositivo','Storage on your device')}</h2>
      <p>{say('Orbita salva la lingua scelta e l’ultima copia del calendario nella memoria locale del browser. Il calendario viene sostituito al successivo aggiornamento riuscito. Il service worker conserva pagine, font e media per l’uso offline e rimuove le vecchie cache quando si attiva una nuova versione. Puoi eliminare tutto cancellando i dati del sito nel browser.','Orbita saves your language preference and the latest schedule in browser local storage. The next successful update replaces the schedule. A service worker stores pages, fonts and media for offline use and deletes old caches when a new version activates. Clear this site’s browser data to remove these items.')}</p>
      <h2>{say('I tuoi diritti','Your rights')}</h2>
      <p>{say('Per i dati personali che ti riguardano puoi chiedere al titolare accesso, rettifica, cancellazione e limitazione nei casi previsti dal GDPR, e opporti al trattamento basato sul legittimo interesse. Puoi presentare reclamo al ','For personal data concerning you, you can request access, rectification, erasure and restriction where provided by the GDPR, and object to processing based on legitimate interests. You may lodge a complaint with the ')}<a href="https://www.garanteprivacy.it/">Garante per la protezione dei dati personali</a>.</p>
      <h2>{say('Fonti e licenze','Sources and licences')}</h2>
      <ul><li>{say('Calendario e orari: ','Launch schedule: ')}<a href="https://thespacedevs.com/llapi">The Space Devs · Launch Library 2</a>.</li>
      <li>{say('Video di apertura: estratto senza audio da ','Opening film: a silent excerpt from ')}<a href="https://images.nasa.gov/details/jsc2022m000270_Orion_First_Imagery_Timelapse_and_Original_221117">First Imagery of Earth From Orion Spacecraft</a> (NASA / Johnson Space Center, 2022).</li>
      <li>{say('Schemi illustrativi originali di Orbita, non in scala. Nomi e marchi identificano i rispettivi veicoli e operatori.','Original Orbita illustrations, not to scale. Names and trademarks identify the respective vehicles and operators.')}</li>
      <li>D-DIN · Datto Inc. · <a href="./fonts/OFL.txt">SIL Open Font License</a>.</li>
      <li>React, React DOM, Scheduler · <a href="./react-licenses.txt">MIT License</a>.</li></ul>
      <footer><a href="./">{say('Torna al calendario','Back to the calendar')}</a><LegalLinks/></footer>
    </main></>;
}
createRoot(document.getElementById('root')).render(<Privacy/>);
if('serviceWorker' in navigator)navigator.serviceWorker.register('./sw.js').catch(()=>{});
