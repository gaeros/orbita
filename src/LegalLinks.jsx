import {useLanguage} from './i18n';

export function LegalLinks(){
  const en=useLanguage()==='en';
  return <div className="legal-links">
    <span>{en?'Independent, non-commercial project. Unaffiliated with SpaceX, Blue Origin or NASA.':'Progetto indipendente e senza scopo di lucro. Non affiliato a SpaceX, Blue Origin o NASA.'}</span>
    <a href="./privacy.html">{en?'Privacy and credits':'Privacy e crediti'}</a>
  </div>;
}
