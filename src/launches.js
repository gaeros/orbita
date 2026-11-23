import {t,locale,useLanguage,setLanguage} from './i18n';
export const format = (value, options) =>
  new Intl.DateTimeFormat(locale(), {timeZone:'Europe/Rome', ...options}).format(new Date(value));
export const exact = x => ['MIN','SEC'].includes(x.precision);
export const dated = x => ['SEC','MIN','HR','DAY'].includes(x.precision);
export function period(x) {
  const year = x.net.slice(0,4);
  if (x.precision === 'Y') return year;
  if (/^Q[1-4]$/.test(x.precision)) return locale()==='en-GB'?'Q'+x.precision[1]+' '+year:x.precision[1]+'Â° trimestre '+year;
  if (!dated(x) && x.precision !== 'M') return t('Data da definire');
  return format(x.net,{month:'long',year:'numeric'});
}
const clock = date => format(date,{hour:'2-digit',minute:'2-digit'});
export function timing(x) {
  if (dated(x) && x.start && Date.parse(x.end)>Date.parse(x.start)) {
    const day = date => format(date,{day:'numeric',month:'short'});
    const point = date => (day(date)===day(x.net)?'':day(date)+' ')+clock(date);
    return point(x.start)+' â€“ '+point(x.end);
  }
  if (exact(x)) return clock(x.net);
  if (x.precision==='HR') return t('Circa le')+' '+format(x.net,{hour:'2-digit'});
  return t('Ora da definire');
}
export function normalize(x) {
  const video=x.vid_urls?.find(v=>v.type?.name==='Official Webcast' && /^https:\/\//i.test(v.url));
  return {
    id:x.id, net:x.net, precision:x.net_precision?.abbrev, status:x.status?.id,
    mission:x.name.split(' | ').at(-1), provider:x.launch_service_provider?.name||'Da definire',
    rocket:x.rocket?.configuration?.name||'Da definire', pad:x.pad?.location?.name, orbit:x.mission?.orbit?.abbrev,
    start:x.window_start, end:x.window_end, stream:video?.url
  };
}
