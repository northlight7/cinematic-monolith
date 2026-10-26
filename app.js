import {T,mat,mesh,box,cyl,texture,noiseTexture,tube,createStage,cameraAt,span,mix,initUI} from './core.js?v=composition-8'
initUI()
const s=createStage({background:'#d7c9b4',exposure:1.05}),{scene,camera}=s
s.key.position.set(-7,10,6);s.key.intensity=3.5;s.fill.intensity=.6;scene.environmentIntensity=.5;scene.fog=new T.Fog('#d7c9b4',20,60);s.ground.material.color.set('#a2957f')
const concrete=mat('#d1c8b5',.87,0,{map:noiseTexture('#c8c1b4',28)}),stone=mat('#918975',.96),timber=mat('#65503a',.7),dark=mat('#2e342c',.65),windowMat=mat('#526560',.12,.62,{transparent:true,opacity:.34,envMapIntensity:1.4}),grassMat=mat('#6b7052',.97)
const house=new T.Group();scene.add(house)
box(9,.35,7.4,stone,house,[0,-.13,0],.03);box(8.5,.11,6.9,concrete,house,[0,.1,0],.02)
const pool=box(2.8,.05,2.1,mat('#486c6b',.12,.65),house,[-2.35,.18,2.3],.03)
for(let i=0;i<5;i++)box(3,.1,1.1,concrete,house,[2.3,-.3+i*.1,4.5-i*.25],.02)
function slab(parent,y){const shape=new T.Shape();shape.moveTo(-3.6,-2.5);shape.lineTo(3.6,-2.5);shape.lineTo(3.6,2.5);shape.lineTo(-3.6,2.5);shape.closePath();const h=new T.Path();h.moveTo(-1.25,-1.25);h.lineTo(-1.25,1.25);h.lineTo(1.25,1.25);h.lineTo(1.25,-1.25);h.closePath();shape.holes.push(h);const g=new T.ExtrudeGeometry(shape,{depth:.18,bevelEnabled:true,bevelSegments:2,steps:1,bevelSize:.035,bevelThickness:.025});g.rotateX(-Math.PI/2);return mesh(g,concrete,parent,[0,y,0])}
const levels=[]
for(let level=0;level<2;level++){const g=new T.Group();g.position.y=level*1.9+.2;house.add(g);levels.push(g);slab(g,0)
 for(const x of [-3.3,3.3])for(const z of [-2.2,2.2])box(.16,1.72,.16,concrete,g,[x,.94,z],.015)
 for(const z of [-2.35,2.35]){
  if(z>0&&level===0){box(4.05,1.55,.03,windowMat,g,[-1.175,.92,z],.005).castShadow=false;box(1.55,1.55,.03,windowMat,g,[2.425,.92,z],.005).castShadow=false}else box(6.4,1.55,.03,windowMat,g,[0,.92,z],.005).castShadow=false
  for(let i=0;i<9;i++)box(.035,1.6,.05,dark,g,[-3.2+i*.8,.93,z],.002)
 }
 for(const x of [-3.4,3.4]){box(.03,1.6,4.5,windowMat,g,[x,.94,0],.005).castShadow=false
  const geo=new T.BoxGeometry(.11,1.58,.08),im=new T.InstancedMesh(geo,timber,29),o=new T.Object3D();for(let i=0;i<29;i++){o.position.set(x+(x>0?.1:-.1),.94,-2.2+i*.157);o.rotation.y=.28;o.updateMatrix();im.setMatrixAt(i,o.matrix)}im.castShadow=im.receiveShadow=true;g.add(im)
 }
 // The courtyard stays open through both floors.
 for(const z of [-1.28,1.28]){if(z>0&&level===0){box(1.475,1.65,.03,windowMat,g,[-.4875,.95,z],.005).castShadow=false;box(.175,1.65,.03,windowMat,g,[1.1375,.95,z],.005).castShadow=false}else box(2.45,1.65,.03,windowMat,g,[0,.95,z],.005).castShadow=false;for(const x of [-1.2,1.2])box(.035,1.65,.04,dark,g,[x,.95,z],.003)}
 for(const x of [-1.28,1.28]){box(.03,1.65,2.45,windowMat,g,[x,.95,0],.005).castShadow=false}
 // Shelves, seating and warm ceilings remain visible during the close approach.
 box(1.4,.25,.6,timber,g,[-2.4,.45,.6],.05);box(1.4,.42,.18,mat('#b7ae98',.9),g,[-2.4,.75,.86],.05)
 box(.65,.045,.8,timber,g,[-2.4,.5,-.6],.03);for(const x of [-2.65,-2.15])cyl(.025,.45,dark,g,[x,.26,-.6],.025,12)
 box(.8,1.4,.15,timber,g,[2.3,.85,-2.1],.01);for(let i=0;i<5;i++)box(.8,.035,.26,concrete,g,[2.3,.3+i*.25,-1.98],.008)
 box(2.2,.02,.045,mat('#ffe1a0',.4,0,{emissive:'#ffa340',emissiveIntensity:1.5}),g,[-2.35,1.78,0],.004)
}
const roof=new T.Group();roof.position.y=4.0;house.add(roof);slab(roof,0);box(7.1,.12,.1,concrete,roof,[0,.2,-2.5],.01);box(7.1,.12,.1,concrete,roof,[0,.2,2.5],.01)
for(const x of [-3.55,3.55])box(.1,.12,5.1,concrete,roof,[x,.2,0],.01)
for(let i=0;i<10;i++)box(.1,.09,2.3,timber,roof,[-3.2+i*.22,.2,0],.006)
box(1.7,.16,1.6,grassMat,roof,[2.4,.18,0],.02)
// A stepped interior stair is an object to move around, not a painted backdrop.
for(let i=0;i<13;i++)box(.75,.1,.32,concrete,house,[2.2,.2+i*.14,-1.8+i*.27],.012)
box(2.28,.04,2.28,mat('#9b9077',.95),house,[0,.2,0],.02)
const tree=new T.Group();tree.position.set(0,.23,0);house.add(tree)
const bark=mat('#685540',.95);tube([[0,0,0],[.06,.7,.02],[-.1,1.4,0],[.06,2,.08],[.1,2.65,.05]],.065,bark,tree)
for(let i=0;i<7;i++){const a=i*2.399;const x=Math.cos(a)*.6,z=Math.sin(a)*.6;tube([[0,.8+i*.15,0],[x*.55,1.6+i*.15,z*.6],[x,2+i*.12,z]],.025,bark,tree)}
const leafGeo=new T.PlaneGeometry(2,2,8,2),leafMat=mat('#68724f',.72,0,{side:T.DoubleSide});const leafPositions=leafGeo.attributes.position;for(let i=0;i<leafPositions.count;i++){const x=leafPositions.getX(i);leafPositions.setY(i,leafPositions.getY(i)*Math.sqrt(Math.max(0,1-x*x)));leafPositions.setZ(i,(1-x*x)*.4+Math.sin(x*Math.PI)*.06)}leafGeo.computeVertexNormals()
const foliage=new T.InstancedMesh(leafGeo,leafMat,520),dummy=new T.Object3D()
for(let i=0;i<520;i++){const a=i*2.39996,r=Math.sqrt((i%97)/97)*.96;dummy.position.set(Math.cos(a)*r,2.28+Math.sin(i*.73)*.42+(1-r)*.18,Math.sin(a)*r*.8);dummy.scale.set(.09,.018,.03);dummy.rotation.set(i,i*.3,i*.6);dummy.updateMatrix();foliage.setMatrixAt(i,dummy.matrix)}foliage.castShadow=foliage.receiveShadow=true;tree.add(foliage)
// A ground plane with actual topography supplies changing depth in aerial and low views.
const terrainGeo=new T.PlaneGeometry(24,24,40,40);terrainGeo.rotateX(-Math.PI/2);const pos=terrainGeo.attributes.position
for(let i=0;i<pos.count;i++){const x=pos.getX(i),z=pos.getZ(i),d=Math.hypot(x,z),rise=span(d,8,24);pos.setY(i,-.4+rise*(Math.sin(x*.13+1)*Math.cos(z*.08)*1.3+Math.sin(z*.2+x*.1)*.7))}terrainGeo.computeVertexNormals();const terrain=mesh(terrainGeo,mat('#b5a58c',1),scene);terrain.castShadow=false
const sun=mesh(new T.SphereGeometry(1.3,24,16),new T.MeshBasicMaterial({color:'#fbe0ae'}),scene,[-12,10,-25]);sun.castShadow=false
const planMat=new T.LineBasicMaterial({color:'#5d6155',transparent:true,opacity:.35});const plan=new T.Group();scene.add(plan)
for(let i=-5;i<=5;i++){const g=new T.BufferGeometry().setFromPoints([new T.Vector3(i*1.1,-.32,-6),new T.Vector3(i*1.1,-.32,6)]);plan.add(new T.Line(g,planMat));const h=new T.BufferGeometry().setFromPoints([new T.Vector3(-6,-.32,i*1.1),new T.Vector3(6,-.32,i*1.1)]);plan.add(new T.Line(h,planMat))}
const probeRay=new T.Raycaster(),probeMouse=new T.Vector2(),probeTargets=[]
house.traverse(o=>{if(o.isMesh&&!o.isInstancedMesh&&[concrete,timber,windowMat].includes(o.material))probeTargets.push(o)})
const probe=mesh(new T.TorusGeometry(.12,.006,6,32),new T.MeshBasicMaterial({color:'#fff0ba',depthTest:false}),scene);probe.castShadow=probe.receiveShadow=false;probe.visible=false;probe.renderOrder=10
let probeIn=false,probeTime=0
s.canvas.addEventListener('pointermove',e=>{probeIn=true;probeMouse.set(e.clientX/innerWidth*2-1,-e.clientY/innerHeight*2+1)})
s.canvas.addEventListener('pointerleave',()=>{probeIn=false;probe.visible=false;document.querySelector('[data-probe]').textContent='';const c=document.querySelector('.cursor');c.classList.remove('expanded');c.textContent=''})
let lightStudy=.55
const range=document.querySelector('[data-light]')
range.addEventListener('input',()=>{lightStudy=Number(range.value)/100;document.querySelector('[data-hour]').textContent=lightStudy<.33?'09:00 / Morning':lightStudy<.67?'13:00 / Midday':'18:00 / Golden hour';s.wake()})
const shots=[{p:0,pos:[12,11,15],target:[0,1.8,0],frame:[.75,.55],mobile:[16,17,25],mobileTarget:[0,1.8,0],mobileFrame:[.5,.77]},{p:.33,pos:[8.6,10,16],target:[0,2.5,0],frame:[.75,.55],mobile:[13,16,26],mobileTarget:[0,2.5,0],mobileFrame:[.5,.77]},{p:.64,pos:[4.2,4.6,10.5],target:[0,1.8,0],frame:[.75,.55],mobile:[6,7,25],mobileTarget:[0,1.8,0],mobileFrame:[.5,.77]},{p:.82,pos:[2,1.6,5.6],target:[0,1.8,-.3],frame:[.64,.52],mobile:[2,2.7,9],mobileTarget:[0,1.8,-.3],mobileFrame:[.5,.55]},{p:.94,pos:[1.3,1.4,2.6],target:[.3,1.9,-1],frame:[.58,.5],mobile:[1.3,1.4,2.6],mobileTarget:[.3,1.9,-1],mobileFrame:[.5,.43]},{p:1,pos:[.65,1.35,.8],target:[0,2.2,-1.5],frame:[.56,.5],mobile:[.65,1.35,.8],mobileTarget:[0,2.2,-1.5],mobileFrame:[.5,.4]}]
s.update(({p,time,dt,mobile,pointer,activeMotion})=>{cameraAt(camera,p,shots,mobile,pointer)
 const explode=span(p,.12,.3)*(1-span(p,.4,.55));levels[1].position.y=2.1+explode*1.5;roof.position.y=4+explode*3.0;plan.visible=p<.55;planMat.opacity=.12+explode*.28
 const sunT=p>.5?lightStudy:mix(.25,.55,p*2);s.key.position.set(mix(-9,7,sunT),mix(11,3,sunT),mix(5,-3,sunT));s.key.color.set(new T.Color('#fff6df').lerp(new T.Color('#ffa764'),sunT));s.key.intensity=mix(3.2,4.4,sunT);const bg=new T.Color('#d7d1bf').lerp(new T.Color('#bb8f6c'),sunT*.7);document.querySelector('.scene-backdrop').style.background=`linear-gradient(140deg,#e7dfce,${bg.getStyle()})`;scene.fog.color.copy(bg);sun.position.x=mix(-15,12,sunT);sun.position.y=mix(13,5,sunT)
 foliage.rotation.y=activeMotion?Math.sin(time*.6)*.012:0
 if(probeIn&&!mobile&&time-probeTime>.05){probeTime=time;probeRay.setFromCamera(probeMouse,camera);const hit=probeRay.intersectObjects(probeTargets,false)[0];probe.visible=!!hit
 const label=document.querySelector('[data-probe]'),cursor=document.querySelector('.cursor')
 if(hit){const normal=hit.face.normal.clone().transformDirection(hit.object.matrixWorld);probe.position.copy(hit.point).addScaledVector(normal,.02);probe.scale.setScalar(Math.max(.02,camera.position.distanceTo(hit.point)*.04));probe.quaternion.setFromUnitVectors(new T.Vector3(0,0,1),normal);const name=hit.object.material===concrete?'CAST CONCRETE':hit.object.material===timber?'TIMBER SCREEN':'REFLECTIVE GLASS';label.textContent=name;cursor.textContent='MATERIAL';cursor.classList.add('expanded')}else{label.textContent='';cursor.textContent='';cursor.classList.remove('expanded')}
 }
 if(!probeIn||mobile)probe.visible=false
 const material=document.querySelector('[data-material]');material.style.opacity=p>.87?'1':'0';s.host.dataset.daylight=sunT.toFixed(2);s.host.dataset.explosion=explode.toFixed(2)
})
