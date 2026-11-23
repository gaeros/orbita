import {join,relative,sep} from 'node:path';
import {build} from 'esbuild';
import {cp,readFile,writeFile,readdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';

await cp('public','dist',{recursive:true});
await build({entryPoints:{app:'src/App.jsx',starship:'src/Starship.jsx',privacy:'src/Privacy.jsx'},bundle:true,jsx:'automatic',minify:true,
  define:{'process.env.NODE_ENV':'"production"'},outdir:'dist'});
const digest=createHash('sha256');
const publicFiles=(await readdir('public',{recursive:true,withFileTypes:true})).filter(f=>f.isFile()).map(f=>relative('public',join(f.parentPath,f.name)).split(sep).join('/'));
const files=[...publicFiles,'app.js','starship.js','privacy.js'].sort();
for(const path of files){
  digest.update(path);
  digest.update(await readFile('dist/'+path));
}
const template=await readFile('scripts/sw.template','utf8');
await writeFile('dist/sw.js',template.replace('__FILES__',JSON.stringify(['./',...files.map(f=>'./'+f)])).replace('orbita-shell-v1','orbita-shell-'+digest.digest('hex').slice(0,12)));

