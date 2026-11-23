import {useEffect, useState} from 'react';
import {normalize} from './launches';

const cacheKey = 'orbita-schedule-v4';
const endpoint = 'https://ll.thespacedevs.com/2.3.0/launches/upcoming/?limit=50&mode=detailed';
function readCache(){
  try {
    for(const old of ['orbita-schedule-v1','orbita-schedule-v2','orbita-schedule-v3']) localStorage.removeItem(old);
    const saved = JSON.parse(localStorage.getItem(cacheKey));
    if(Array.isArray(saved?.items)) return saved;
  } catch {}
  return null;
}
export function useSchedule(){
  const [saved] = useState(readCache);
  const [feed,setFeed] = useState(saved);
  const [busy,setBusy] = useState(true);
  const [notice,setNotice] = useState('');
  const [retryAt,setRetryAt] = useState(0);
  const [revision,setRevision] = useState(0);
  useEffect(()=>{
    const controller = new AbortController();
    async function load(){
      setBusy(true);
      try {
        if(!saved && !revision){
          const snapshot = await fetch('./schedule.json',{signal:controller.signal});
          if(snapshot.ok) setFeed(await snapshot.json());
        }
        if(!revision && saved && Date.now()-Date.parse(saved.updated)<3600000) return;
        const options={credentials:'omit',referrerPolicy:'no-referrer',signal:AbortSignal.any([controller.signal,AbortSignal.timeout(15000)])};
        async function readLaunches(url){
          const response=await fetch(url,options);
          if(response.status===429){
            const delay=Math.max(60,Number(response.headers.get('retry-after'))||3600)*1000;
            setRetryAt(Date.now()+delay);
            throw Error('quota');
          }
          if(!response.ok)throw Error('network');
          return (await response.json()).results.map(normalize);
        }
        const general=await readLaunches(endpoint);
        const blue=await readLaunches(endpoint.replace('limit=50','limit=10&lsp__id=141'));
        const unique=new Map([...blue,...general].map(launch=>[launch.id,launch]));
        const next={updated:new Date().toISOString(),items:[...unique.values()]};
        setFeed(next);
        setNotice('Aggiornato il ');
        try{localStorage.setItem(cacheKey,JSON.stringify(next));}catch{}
      } catch(error){
        if(!controller.signal.aborted) setNotice(error.message==='quota'?'Limite della fonte raggiunto. ':'Fonte non raggiungibile. ');
      } finally{if(!controller.signal.aborted)setBusy(false);}
    }
    load();
    return ()=>controller.abort();
  },[saved,revision]);
  useEffect(()=>{
    if(!retryAt)return;
    const timer=setTimeout(()=>setRetryAt(0),Math.max(0,retryAt-Date.now()));
    return ()=>clearTimeout(timer);
  },[retryAt]);
  return {feed,busy:busy||Boolean(retryAt),notice,refresh:()=>setRevision(n=>n+1)};
}

