import {useSyncExternalStore} from 'react';
import translations from './en.json';

const key='orbita-language';
let language='it';
try { if(localStorage.getItem(key)==='en') language='en'; } catch {}
const listeners=new Set();
function subscribe(listener){listeners.add(listener);return ()=>listeners.delete(listener);}
export const useLanguage=()=>useSyncExternalStore(subscribe,()=>language);
export const locale=()=>language==='en'?'en-GB':'it-IT';
export function t(text){return language==='en'?(translations[text]??text):text;}
export function setLanguage(next){
  language=next;
  try{localStorage.setItem(key,next);}catch{}
  listeners.forEach(listener=>listener());
}
