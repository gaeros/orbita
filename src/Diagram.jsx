import {useId} from 'react';

// Side profiles drawn for Orbita. Coordinates are illustrative, not engineering dimensions.
const outlines={
  stack:'M50 8 Q64 23 64 52 V186 L70 202 L62 198 V332 L67 350 H33 L38 332 V198 L30 202 L36 186 V52 Q36 23 50 8Z',
  ship:'M50 35 Q68 55 68 104 V212 L85 258 L69 247 V281 H31 V247 L15 258 L32 212 V104 Q32 55 50 35Z',
  booster:'M35 29 H65 V78 L71 86 H65 V305 L70 323 H30 L35 305 V86 H29 L35 78Z',
  falcon:'M50 7 Q65 19 65 39 V61 L60 70 V294 L73 329 L60 318 V345 H40 V318 L27 329 L40 294 V70 L35 61 V39 Q35 19 50 7Z',
  glenn:'M50 9 Q69 23 69 46 V86 L64 98 V291 L78 317 L65 312 V343 H35 V312 L22 317 L36 291 V98 L31 86 V46 Q31 23 50 9Z',
  shepard:'M35 50 Q50 35 65 50 L80 83 L73 100 H67 V226 L77 241 L67 238 V260 L77 276 L61 269 H39 L23 276 L33 260 V238 L23 241 L33 226 V100 H27 L20 83Z',
  engine:'M35 99 H65 V119 L59 126 V150 Q62 184 77 216 H23 Q38 184 41 150 V126 L35 119Z'
};
export function Diagram({shape,animated=false,paused=false}){
  const id=useId().replace(/:/g,'');
  const path=outlines[shape]||outlines.falcon;
  return <svg className={'orbita-diagram'+(animated?' rotating':'')} style={{animationPlayState:paused?'paused':'running'}} viewBox="0 0 100 360" aria-hidden="true">
    <defs><clipPath id={id}><path d={path}/></clipPath></defs>
    <path d={path} fill="#16191c" stroke="#d9dbdf" strokeWidth="1.4"/>
    <g clipPath={'url(#'+id+')'} fill="none" stroke="#aeb3b8" strokeWidth=".65">
      {[39,45,57,63].map(x=><path key={x} d={'M'+x+' 0 V360'}/>)}
      {Array.from({length:20},(_,i)=><path key={i} d={'M10 '+(22+i*17)+' Q50 '+(28+i*17)+' 90 '+(22+i*17)}/>)}
    </g>
  </svg>;
}
