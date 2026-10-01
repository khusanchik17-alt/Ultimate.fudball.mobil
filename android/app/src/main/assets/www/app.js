(()=>{var Ko="160";var fu=0,Rl=1,pu=2;var Kr=1,mu=2,Un=3,ni=0,qe=1,Fn=2;var Qn=0,es=1,Pl=2,Ll=3,Il=4,gu=5,yi=100,_u=101,xu=102,Dl=103,Ul=104,yu=200,vu=201,Mu=202,bu=203,ro=204,ao=205,Su=206,wu=207,Eu=208,Tu=209,Au=210,Cu=211,Ru=212,Pu=213,Lu=214,Iu=0,Du=1,Uu=2,vr=3,Nu=4,Fu=5,Ou=6,ku=7,Jo=0,Bu=1,zu=2,ti=0,Hu=1,Vu=2,Gu=3,Wu=4,Xu=5,qu=6;var ih=300,ss=301,rs=302,oo=303,lo=304,Jr=306,Is=1e3,fn=1001,co=1002,Ve=1003,Nl=1004;var wa=1005;var rn=1006,$u=1007;var Ds=1008;var ei=1009,Yu=1010,Zu=1011,jo=1012,sh=1013,Jn=1014,jn=1015,Us=1016,rh=1017,ah=1018,Mi=1020,Ku=1021,pn=1023,Ju=1024,ju=1025,bi=1026,as=1027,Qu=1028,oh=1029,td=1030,lh=1031,ch=1033,Ea=33776,Ta=33777,Aa=33778,Ca=33779,Fl=35840,Ol=35841,kl=35842,Bl=35843,hh=36196,zl=37492,Hl=37496,Vl=37808,Gl=37809,Wl=37810,Xl=37811,ql=37812,$l=37813,Yl=37814,Zl=37815,Kl=37816,Jl=37817,jl=37818,Ql=37819,tc=37820,ec=37821,Ra=36492,nc=36494,ic=36495,ed=36283,sc=36284,rc=36285,ac=36286;var Mr=2300,br=2301,Pa=2302,oc=2400,lc=2401,cc=2402;var uh=3e3,Si=3001,nd=3200,id=3201,dh=0,sd=1,an="",me="srgb",kn="srgb-linear",Qo="display-p3",jr="display-p3-linear",Sr="linear",le="srgb",wr="rec709",Er="p3";var Ni=7680;var hc=519,rd=512,ad=513,od=514,fh=515,ld=516,cd=517,hd=518,ud=519,uc=35044;var dc="300 es",ho=1035,On=2e3,Tr=2001,ii=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;let n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;let s=this._listeners[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;let n=this._listeners[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}},Ne=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var La=Math.PI/180,uo=180/Math.PI;function zs(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ne[i&255]+Ne[i>>8&255]+Ne[i>>16&255]+Ne[i>>24&255]+"-"+Ne[t&255]+Ne[t>>8&255]+"-"+Ne[t>>16&15|64]+Ne[t>>24&255]+"-"+Ne[e&63|128]+Ne[e>>8&255]+"-"+Ne[e>>16&255]+Ne[e>>24&255]+Ne[n&255]+Ne[n>>8&255]+Ne[n>>16&255]+Ne[n>>24&255]).toLowerCase()}function Ie(i,t,e){return Math.max(t,Math.min(e,i))}function dd(i,t){return(i%t+t)%t}function Ia(i,t,e){return(1-e)*i+e*t}function fc(i){return(i&i-1)===0&&i!==0}function fo(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Ms(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Xe(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var gt=class i{constructor(t=0,e=0){i.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Ie(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Zt=class i{constructor(t,e,n,s,r,a,o,l,c){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c)}set(t,e,n,s,r,a,o,l,c){let h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],d=n[7],u=n[2],p=n[5],g=n[8],_=s[0],m=s[3],f=s[6],M=s[1],x=s[4],b=s[7],C=s[2],T=s[5],A=s[8];return r[0]=a*_+o*M+l*C,r[3]=a*m+o*x+l*T,r[6]=a*f+o*b+l*A,r[1]=c*_+h*M+d*C,r[4]=c*m+h*x+d*T,r[7]=c*f+h*b+d*A,r[2]=u*_+p*M+g*C,r[5]=u*m+p*x+g*T,r[8]=u*f+p*b+g*A,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-n*r*h+n*o*l+s*r*c-s*a*l}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],d=h*a-o*c,u=o*l-h*r,p=c*r-a*l,g=e*d+n*u+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/g;return t[0]=d*_,t[1]=(s*c-h*n)*_,t[2]=(o*n-s*a)*_,t[3]=u*_,t[4]=(h*e-s*l)*_,t[5]=(s*r-o*e)*_,t[6]=p*_,t[7]=(n*l-c*e)*_,t[8]=(a*e-n*r)*_,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-s*c,s*l,-s*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(Da.makeScale(t,e)),this}rotate(t){return this.premultiply(Da.makeRotation(-t)),this}translate(t,e){return this.premultiply(Da.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},Da=new Zt;function ph(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Ar(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function fd(){let i=Ar("canvas");return i.style.display="block",i}var pc={};function Cs(i){i in pc||(pc[i]=!0,console.warn(i))}var mc=new Zt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),gc=new Zt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Zs={[kn]:{transfer:Sr,primaries:wr,toReference:i=>i,fromReference:i=>i},[me]:{transfer:le,primaries:wr,toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[jr]:{transfer:Sr,primaries:Er,toReference:i=>i.applyMatrix3(gc),fromReference:i=>i.applyMatrix3(mc)},[Qo]:{transfer:le,primaries:Er,toReference:i=>i.convertSRGBToLinear().applyMatrix3(gc),fromReference:i=>i.applyMatrix3(mc).convertLinearToSRGB()}},pd=new Set([kn,jr]),ne={enabled:!0,_workingColorSpace:kn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!pd.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,t,e){if(this.enabled===!1||t===e||!t||!e)return i;let n=Zs[t].toReference,s=Zs[e].fromReference;return s(n(i))},fromWorkingColorSpace:function(i,t){return this.convert(i,this._workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this._workingColorSpace)},getPrimaries:function(i){return Zs[i].primaries},getTransfer:function(i){return i===an?Sr:Zs[i].transfer}};function ns(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Ua(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Fi,Cr=class{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Fi===void 0&&(Fi=Ar("canvas")),Fi.width=t.width,Fi.height=t.height;let n=Fi.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Fi}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=Ar("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=ns(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(ns(e[n]/255)*255):e[n]=ns(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},md=0,Rr=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:md++}),this.uuid=zs(),this.data=t,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Na(s[a].image)):r.push(Na(s[a]))}else r=Na(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function Na(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Cr.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var gd=0,on=class i extends ii{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=fn,s=fn,r=rn,a=Ds,o=pn,l=ei,c=i.DEFAULT_ANISOTROPY,h=an){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:gd++}),this.uuid=zs(),this.name="",this.source=new Rr(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new gt(0,0),this.repeat=new gt(1,1),this.center=new gt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Zt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h=="string"?this.colorSpace=h:(Cs("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=h===Si?me:an),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==ih)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Is:t.x=t.x-Math.floor(t.x);break;case fn:t.x=t.x<0?0:1;break;case co:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Is:t.y=t.y-Math.floor(t.y);break;case fn:t.y=t.y<0?0:1;break;case co:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Cs("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===me?Si:uh}set encoding(t){Cs("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=t===Si?me:an}};on.DEFAULT_IMAGE=null;on.DEFAULT_MAPPING=ih;on.DEFAULT_ANISOTROPY=1;var Le=class i{constructor(t=0,e=0,n=0,s=1){i.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,l=t.elements,c=l[0],h=l[4],d=l[8],u=l[1],p=l[5],g=l[9],_=l[2],m=l[6],f=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+f-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let x=(c+1)/2,b=(p+1)/2,C=(f+1)/2,T=(h+u)/4,A=(d+_)/4,B=(g+m)/4;return x>b&&x>C?x<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(x),s=T/n,r=A/n):b>C?b<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(b),n=T/s,r=B/s):C<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(C),n=A/r,s=B/r),this.set(n,s,r,e),this}let M=Math.sqrt((m-g)*(m-g)+(d-_)*(d-_)+(u-h)*(u-h));return Math.abs(M)<.001&&(M=1),this.x=(m-g)/M,this.y=(d-_)/M,this.z=(u-h)/M,this.w=Math.acos((c+p+f-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},po=class extends ii{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new Le(0,0,t,e),this.scissorTest=!1,this.viewport=new Le(0,0,t,e);let s={width:t,height:e,depth:1};n.encoding!==void 0&&(Cs("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===Si?me:an),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:rn,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new on(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(t,e,n=1){(this.width!==t||this.height!==e||this.depth!==n)&&(this.width=t,this.height=e,this.depth=n,this.texture.image.width=t,this.texture.image.height=e,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.texture=t.texture.clone(),this.texture.isRenderTargetTexture=!0;let e=Object.assign({},t.texture.image);return this.texture.source=new Rr(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Bn=class extends po{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},Pr=class extends on{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ve,this.minFilter=Ve,this.wrapR=fn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var mo=class extends on{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ve,this.minFilter=Ve,this.wrapR=fn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Sn=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let l=n[s+0],c=n[s+1],h=n[s+2],d=n[s+3],u=r[a+0],p=r[a+1],g=r[a+2],_=r[a+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d;return}if(o===1){t[e+0]=u,t[e+1]=p,t[e+2]=g,t[e+3]=_;return}if(d!==_||l!==u||c!==p||h!==g){let m=1-o,f=l*u+c*p+h*g+d*_,M=f>=0?1:-1,x=1-f*f;if(x>Number.EPSILON){let C=Math.sqrt(x),T=Math.atan2(C,f*M);m=Math.sin(m*T)/C,o=Math.sin(o*T)/C}let b=o*M;if(l=l*m+u*b,c=c*m+p*b,h=h*m+g*b,d=d*m+_*b,m===1-o){let C=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=C,c*=C,h*=C,d*=C}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,s,r,a){let o=n[s],l=n[s+1],c=n[s+2],h=n[s+3],d=r[a],u=r[a+1],p=r[a+2],g=r[a+3];return t[e]=o*g+h*d+l*p-c*u,t[e+1]=l*g+h*u+c*d-o*p,t[e+2]=c*g+h*p+o*u-l*d,t[e+3]=h*g-o*d-l*u-c*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(s/2),d=o(r/2),u=l(n/2),p=l(s/2),g=l(r/2);switch(a){case"XYZ":this._x=u*h*d+c*p*g,this._y=c*p*d-u*h*g,this._z=c*h*g+u*p*d,this._w=c*h*d-u*p*g;break;case"YXZ":this._x=u*h*d+c*p*g,this._y=c*p*d-u*h*g,this._z=c*h*g-u*p*d,this._w=c*h*d+u*p*g;break;case"ZXY":this._x=u*h*d-c*p*g,this._y=c*p*d+u*h*g,this._z=c*h*g+u*p*d,this._w=c*h*d-u*p*g;break;case"ZYX":this._x=u*h*d-c*p*g,this._y=c*p*d+u*h*g,this._z=c*h*g-u*p*d,this._w=c*h*d+u*p*g;break;case"YZX":this._x=u*h*d+c*p*g,this._y=c*p*d+u*h*g,this._z=c*h*g-u*p*d,this._w=c*h*d-u*p*g;break;case"XZY":this._x=u*h*d-c*p*g,this._y=c*p*d-u*h*g,this._z=c*h*g+u*p*d,this._w=c*h*d+u*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],d=e[10],u=n+o+d;if(u>0){let p=.5/Math.sqrt(u+1);this._w=.25/p,this._x=(h-l)*p,this._y=(r-c)*p,this._z=(a-s)*p}else if(n>o&&n>d){let p=2*Math.sqrt(1+n-o-d);this._w=(h-l)/p,this._x=.25*p,this._y=(s+a)/p,this._z=(r+c)/p}else if(o>d){let p=2*Math.sqrt(1+o-n-d);this._w=(r-c)/p,this._x=(s+a)/p,this._y=.25*p,this._z=(l+h)/p}else{let p=2*Math.sqrt(1+d-n-o);this._w=(a-s)/p,this._x=(r+c)/p,this._y=(l+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ie(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-s*o,this._w=a*h-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let n=this._x,s=this._y,r=this._z,a=this._w,o=a*t._w+n*t._x+s*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;let l=1-o*o;if(l<=Number.EPSILON){let p=1-e;return this._w=p*a+e*this._w,this._x=p*n+e*this._x,this._y=p*s+e*this._y,this._z=p*r+e*this._z,this.normalize(),this}let c=Math.sqrt(l),h=Math.atan2(c,o),d=Math.sin((1-e)*h)/c,u=Math.sin(e*h)/c;return this._w=a*d+this._w*u,this._x=n*d+this._x*u,this._y=s*d+this._y*u,this._z=r*d+this._z*u,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=Math.random(),e=Math.sqrt(1-t),n=Math.sqrt(t),s=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(e*Math.cos(s),n*Math.sin(r),n*Math.cos(r),e*Math.sin(s))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},L=class i{constructor(t=0,e=0,n=0){i.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(_c.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(_c.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*s-o*n),h=2*(o*e-r*s),d=2*(r*n-a*e);return this.x=e+l*c+a*d-o*h,this.y=n+l*h+o*c-r*d,this.z=s+l*d+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Fa.copy(this).projectOnVector(t),this.sub(Fa)}reflect(t){return this.sub(Fa.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Ie(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=(Math.random()-.5)*2,e=Math.random()*Math.PI*2,n=Math.sqrt(1-t**2);return this.x=n*Math.cos(e),this.y=n*Math.sin(e),this.z=t,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Fa=new L,_c=new Sn,zn=class{constructor(t=new L(1/0,1/0,1/0),e=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(hn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(hn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=hn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,hn):hn.fromBufferAttribute(r,a),hn.applyMatrix4(t.matrixWorld),this.expandByPoint(hn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ks.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ks.copy(n.boundingBox)),Ks.applyMatrix4(t.matrixWorld),this.union(Ks)}let s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,hn),hn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(bs),Js.subVectors(this.max,bs),Oi.subVectors(t.a,bs),ki.subVectors(t.b,bs),Bi.subVectors(t.c,bs),qn.subVectors(ki,Oi),$n.subVectors(Bi,ki),pi.subVectors(Oi,Bi);let e=[0,-qn.z,qn.y,0,-$n.z,$n.y,0,-pi.z,pi.y,qn.z,0,-qn.x,$n.z,0,-$n.x,pi.z,0,-pi.x,-qn.y,qn.x,0,-$n.y,$n.x,0,-pi.y,pi.x,0];return!Oa(e,Oi,ki,Bi,Js)||(e=[1,0,0,0,1,0,0,0,1],!Oa(e,Oi,ki,Bi,Js))?!1:(js.crossVectors(qn,$n),e=[js.x,js.y,js.z],Oa(e,Oi,ki,Bi,Js))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,hn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(hn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Rn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Rn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Rn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Rn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Rn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Rn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Rn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Rn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Rn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}},Rn=[new L,new L,new L,new L,new L,new L,new L,new L],hn=new L,Ks=new zn,Oi=new L,ki=new L,Bi=new L,qn=new L,$n=new L,pi=new L,bs=new L,Js=new L,js=new L,mi=new L;function Oa(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){mi.fromArray(i,r);let o=s.x*Math.abs(mi.x)+s.y*Math.abs(mi.y)+s.z*Math.abs(mi.z),l=t.dot(mi),c=e.dot(mi),h=n.dot(mi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var _d=new zn,Ss=new L,ka=new L,wi=class{constructor(t=new L,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):_d.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ss.subVectors(t,this.center);let e=Ss.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Ss,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(ka.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ss.copy(t.center).add(ka)),this.expandByPoint(Ss.copy(t.center).sub(ka))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}},Pn=new L,Ba=new L,Qs=new L,Yn=new L,za=new L,tr=new L,Ha=new L,go=class{constructor(t=new L,e=new L(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Pn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Pn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Pn.copy(this.origin).addScaledVector(this.direction,e),Pn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Ba.copy(t).add(e).multiplyScalar(.5),Qs.copy(e).sub(t).normalize(),Yn.copy(this.origin).sub(Ba);let r=t.distanceTo(e)*.5,a=-this.direction.dot(Qs),o=Yn.dot(this.direction),l=-Yn.dot(Qs),c=Yn.lengthSq(),h=Math.abs(1-a*a),d,u,p,g;if(h>0)if(d=a*l-o,u=a*o-l,g=r*h,d>=0)if(u>=-g)if(u<=g){let _=1/h;d*=_,u*=_,p=d*(d+a*u+2*o)+u*(a*d+u+2*l)+c}else u=r,d=Math.max(0,-(a*u+o)),p=-d*d+u*(u+2*l)+c;else u=-r,d=Math.max(0,-(a*u+o)),p=-d*d+u*(u+2*l)+c;else u<=-g?(d=Math.max(0,-(-a*r+o)),u=d>0?-r:Math.min(Math.max(-r,-l),r),p=-d*d+u*(u+2*l)+c):u<=g?(d=0,u=Math.min(Math.max(-r,-l),r),p=u*(u+2*l)+c):(d=Math.max(0,-(a*r+o)),u=d>0?r:Math.min(Math.max(-r,-l),r),p=-d*d+u*(u+2*l)+c);else u=a>0?-r:r,d=Math.max(0,-(a*u+o)),p=-d*d+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(Ba).addScaledVector(Qs,u),p}intersectSphere(t,e){Pn.subVectors(t.center,this.origin);let n=Pn.dot(this.direction),s=Pn.dot(Pn)-n*n,r=t.radius*t.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,l,c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(n=(t.min.x-u.x)*c,s=(t.max.x-u.x)*c):(n=(t.max.x-u.x)*c,s=(t.min.x-u.x)*c),h>=0?(r=(t.min.y-u.y)*h,a=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,a=(t.min.y-u.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(t.min.z-u.z)*d,l=(t.max.z-u.z)*d):(o=(t.max.z-u.z)*d,l=(t.min.z-u.z)*d),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Pn)!==null}intersectTriangle(t,e,n,s,r){za.subVectors(e,t),tr.subVectors(n,t),Ha.crossVectors(za,tr);let a=this.direction.dot(Ha),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Yn.subVectors(this.origin,t);let l=o*this.direction.dot(tr.crossVectors(Yn,tr));if(l<0)return null;let c=o*this.direction.dot(za.cross(Yn));if(c<0||l+c>a)return null;let h=-o*Yn.dot(Ha);return h<0?null:this.at(h/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},oe=class i{constructor(t,e,n,s,r,a,o,l,c,h,d,u,p,g,_,m){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c,h,d,u,p,g,_,m)}set(t,e,n,s,r,a,o,l,c,h,d,u,p,g,_,m){let f=this.elements;return f[0]=t,f[4]=e,f[8]=n,f[12]=s,f[1]=r,f[5]=a,f[9]=o,f[13]=l,f[2]=c,f[6]=h,f[10]=d,f[14]=u,f[3]=p,f[7]=g,f[11]=_,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,n=t.elements,s=1/zi.setFromMatrixColumn(t,0).length(),r=1/zi.setFromMatrixColumn(t,1).length(),a=1/zi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){let u=a*h,p=a*d,g=o*h,_=o*d;e[0]=l*h,e[4]=-l*d,e[8]=c,e[1]=p+g*c,e[5]=u-_*c,e[9]=-o*l,e[2]=_-u*c,e[6]=g+p*c,e[10]=a*l}else if(t.order==="YXZ"){let u=l*h,p=l*d,g=c*h,_=c*d;e[0]=u+_*o,e[4]=g*o-p,e[8]=a*c,e[1]=a*d,e[5]=a*h,e[9]=-o,e[2]=p*o-g,e[6]=_+u*o,e[10]=a*l}else if(t.order==="ZXY"){let u=l*h,p=l*d,g=c*h,_=c*d;e[0]=u-_*o,e[4]=-a*d,e[8]=g+p*o,e[1]=p+g*o,e[5]=a*h,e[9]=_-u*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){let u=a*h,p=a*d,g=o*h,_=o*d;e[0]=l*h,e[4]=g*c-p,e[8]=u*c+_,e[1]=l*d,e[5]=_*c+u,e[9]=p*c-g,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){let u=a*l,p=a*c,g=o*l,_=o*c;e[0]=l*h,e[4]=_-u*d,e[8]=g*d+p,e[1]=d,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=p*d+g,e[10]=u-_*d}else if(t.order==="XZY"){let u=a*l,p=a*c,g=o*l,_=o*c;e[0]=l*h,e[4]=-d,e[8]=c*h,e[1]=u*d+_,e[5]=a*h,e[9]=p*d-g,e[2]=g*d-p,e[6]=o*h,e[10]=_*d+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(xd,t,yd)}lookAt(t,e,n){let s=this.elements;return Ke.subVectors(t,e),Ke.lengthSq()===0&&(Ke.z=1),Ke.normalize(),Zn.crossVectors(n,Ke),Zn.lengthSq()===0&&(Math.abs(n.z)===1?Ke.x+=1e-4:Ke.z+=1e-4,Ke.normalize(),Zn.crossVectors(n,Ke)),Zn.normalize(),er.crossVectors(Ke,Zn),s[0]=Zn.x,s[4]=er.x,s[8]=Ke.x,s[1]=Zn.y,s[5]=er.y,s[9]=Ke.y,s[2]=Zn.z,s[6]=er.z,s[10]=Ke.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],d=n[5],u=n[9],p=n[13],g=n[2],_=n[6],m=n[10],f=n[14],M=n[3],x=n[7],b=n[11],C=n[15],T=s[0],A=s[4],B=s[8],y=s[12],E=s[1],N=s[5],W=s[9],Y=s[13],R=s[2],U=s[6],G=s[10],q=s[14],$=s[3],X=s[7],Z=s[11],j=s[15];return r[0]=a*T+o*E+l*R+c*$,r[4]=a*A+o*N+l*U+c*X,r[8]=a*B+o*W+l*G+c*Z,r[12]=a*y+o*Y+l*q+c*j,r[1]=h*T+d*E+u*R+p*$,r[5]=h*A+d*N+u*U+p*X,r[9]=h*B+d*W+u*G+p*Z,r[13]=h*y+d*Y+u*q+p*j,r[2]=g*T+_*E+m*R+f*$,r[6]=g*A+_*N+m*U+f*X,r[10]=g*B+_*W+m*G+f*Z,r[14]=g*y+_*Y+m*q+f*j,r[3]=M*T+x*E+b*R+C*$,r[7]=M*A+x*N+b*U+C*X,r[11]=M*B+x*W+b*G+C*Z,r[15]=M*y+x*Y+b*q+C*j,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],d=t[6],u=t[10],p=t[14],g=t[3],_=t[7],m=t[11],f=t[15];return g*(+r*l*d-s*c*d-r*o*u+n*c*u+s*o*p-n*l*p)+_*(+e*l*p-e*c*u+r*a*u-s*a*p+s*c*h-r*l*h)+m*(+e*c*d-e*o*p-r*a*d+n*a*p+r*o*h-n*c*h)+f*(-s*o*h-e*l*d+e*o*u+s*a*d-n*a*u+n*l*h)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],d=t[9],u=t[10],p=t[11],g=t[12],_=t[13],m=t[14],f=t[15],M=d*m*c-_*u*c+_*l*p-o*m*p-d*l*f+o*u*f,x=g*u*c-h*m*c-g*l*p+a*m*p+h*l*f-a*u*f,b=h*_*c-g*d*c+g*o*p-a*_*p-h*o*f+a*d*f,C=g*d*l-h*_*l-g*o*u+a*_*u+h*o*m-a*d*m,T=e*M+n*x+s*b+r*C;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/T;return t[0]=M*A,t[1]=(_*u*r-d*m*r-_*s*p+n*m*p+d*s*f-n*u*f)*A,t[2]=(o*m*r-_*l*r+_*s*c-n*m*c-o*s*f+n*l*f)*A,t[3]=(d*l*r-o*u*r-d*s*c+n*u*c+o*s*p-n*l*p)*A,t[4]=x*A,t[5]=(h*m*r-g*u*r+g*s*p-e*m*p-h*s*f+e*u*f)*A,t[6]=(g*l*r-a*m*r-g*s*c+e*m*c+a*s*f-e*l*f)*A,t[7]=(a*u*r-h*l*r+h*s*c-e*u*c-a*s*p+e*l*p)*A,t[8]=b*A,t[9]=(g*d*r-h*_*r-g*n*p+e*_*p+h*n*f-e*d*f)*A,t[10]=(a*_*r-g*o*r+g*n*c-e*_*c-a*n*f+e*o*f)*A,t[11]=(h*o*r-a*d*r-h*n*c+e*d*c+a*n*p-e*o*p)*A,t[12]=C*A,t[13]=(h*_*s-g*d*s+g*n*u-e*_*u-h*n*m+e*d*m)*A,t[14]=(g*o*s-a*_*s-g*n*l+e*_*l+a*n*m-e*o*m)*A,t[15]=(a*d*s-h*o*s+h*n*l-e*d*l-a*n*u+e*o*u)*A,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+n,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,d=o+o,u=r*c,p=r*h,g=r*d,_=a*h,m=a*d,f=o*d,M=l*c,x=l*h,b=l*d,C=n.x,T=n.y,A=n.z;return s[0]=(1-(_+f))*C,s[1]=(p+b)*C,s[2]=(g-x)*C,s[3]=0,s[4]=(p-b)*T,s[5]=(1-(u+f))*T,s[6]=(m+M)*T,s[7]=0,s[8]=(g+x)*A,s[9]=(m-M)*A,s[10]=(1-(u+_))*A,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements,r=zi.set(s[0],s[1],s[2]).length(),a=zi.set(s[4],s[5],s[6]).length(),o=zi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],un.copy(this);let c=1/r,h=1/a,d=1/o;return un.elements[0]*=c,un.elements[1]*=c,un.elements[2]*=c,un.elements[4]*=h,un.elements[5]*=h,un.elements[6]*=h,un.elements[8]*=d,un.elements[9]*=d,un.elements[10]*=d,e.setFromRotationMatrix(un),n.x=r,n.y=a,n.z=o,this}makePerspective(t,e,n,s,r,a,o=On){let l=this.elements,c=2*r/(e-t),h=2*r/(n-s),d=(e+t)/(e-t),u=(n+s)/(n-s),p,g;if(o===On)p=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===Tr)p=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=h,l[9]=u,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=On){let l=this.elements,c=1/(e-t),h=1/(n-s),d=1/(a-r),u=(e+t)*c,p=(n+s)*h,g,_;if(o===On)g=(a+r)*d,_=-2*d;else if(o===Tr)g=r*d,_=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-u,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},zi=new L,un=new oe,xd=new L(0,0,0),yd=new L(1,1,1),Zn=new L,er=new L,Ke=new L,xc=new oe,yc=new Sn,os=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],d=s[2],u=s[6],p=s[10];switch(e){case"XYZ":this._y=Math.asin(Ie(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ie(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ie(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ie(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Ie(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Ie(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return xc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(xc,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return yc.setFromEuler(this),this.setFromQuaternion(yc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};os.DEFAULT_ORDER="XYZ";var Lr=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},vd=0,vc=new L,Hi=new Sn,Ln=new oe,nr=new L,ws=new L,Md=new L,bd=new Sn,Mc=new L(1,0,0),bc=new L(0,1,0),Sc=new L(0,0,1),Sd={type:"added"},wd={type:"removed"},De=class i extends ii{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:vd++}),this.uuid=zs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new L,e=new os,n=new Sn,s=new L(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new oe},normalMatrix:{value:new Zt}}),this.matrix=new oe,this.matrixWorld=new oe,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Lr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Hi.setFromAxisAngle(t,e),this.quaternion.multiply(Hi),this}rotateOnWorldAxis(t,e){return Hi.setFromAxisAngle(t,e),this.quaternion.premultiply(Hi),this}rotateX(t){return this.rotateOnAxis(Mc,t)}rotateY(t){return this.rotateOnAxis(bc,t)}rotateZ(t){return this.rotateOnAxis(Sc,t)}translateOnAxis(t,e){return vc.copy(t).applyQuaternion(this.quaternion),this.position.add(vc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Mc,t)}translateY(t){return this.translateOnAxis(bc,t)}translateZ(t){return this.translateOnAxis(Sc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Ln.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?nr.copy(t):nr.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),ws.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ln.lookAt(ws,nr,this.up):Ln.lookAt(nr,ws,this.up),this.quaternion.setFromRotationMatrix(Ln),s&&(Ln.extractRotation(s.matrixWorld),Hi.setFromRotationMatrix(Ln),this.quaternion.premultiply(Hi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.parent!==null&&t.parent.remove(t),t.parent=this,this.children.push(t),t.dispatchEvent(Sd)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(wd)),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Ln.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Ln.multiply(t.parent.matrixWorld)),t.applyMatrix4(Ln),this.add(t),t.updateWorldMatrix(!1,!0),this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ws,t,Md),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ws,bd,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++){let r=e[n];(r.matrixWorldAutoUpdate===!0||t===!0)&&r.updateMatrixWorld(t)}}updateWorldMatrix(t,e){let n=this.parent;if(t===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),e===!0){let s=this.children;for(let r=0,a=s.length;r<a;r++){let o=s[r];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxGeometryCount=this._maxGeometryCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let d=l[c];r(t.shapes,d)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(r(t.animations,l))}}if(e){let o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),d=a(t.shapes),u=a(t.skeletons),p=a(t.animations),g=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}};De.DEFAULT_UP=new L(0,1,0);De.DEFAULT_MATRIX_AUTO_UPDATE=!0;De.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var dn=new L,In=new L,Va=new L,Dn=new L,Vi=new L,Gi=new L,wc=new L,Ga=new L,Wa=new L,Xa=new L,ir=!1,ji=class i{constructor(t=new L,e=new L,n=new L){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),dn.subVectors(t,e),s.cross(dn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){dn.subVectors(s,e),In.subVectors(n,e),Va.subVectors(t,e);let a=dn.dot(dn),o=dn.dot(In),l=dn.dot(Va),c=In.dot(In),h=In.dot(Va),d=a*c-o*o;if(d===0)return r.set(0,0,0),null;let u=1/d,p=(c*l-o*h)*u,g=(a*h-o*l)*u;return r.set(1-p-g,g,p)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Dn)===null?!1:Dn.x>=0&&Dn.y>=0&&Dn.x+Dn.y<=1}static getUV(t,e,n,s,r,a,o,l){return ir===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),ir=!0),this.getInterpolation(t,e,n,s,r,a,o,l)}static getInterpolation(t,e,n,s,r,a,o,l){return this.getBarycoord(t,e,n,s,Dn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Dn.x),l.addScaledVector(a,Dn.y),l.addScaledVector(o,Dn.z),l)}static isFrontFacing(t,e,n,s){return dn.subVectors(n,e),In.subVectors(t,e),dn.cross(In).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return dn.subVectors(this.c,this.b),In.subVectors(this.a,this.b),dn.cross(In).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getUV(t,e,n,s,r){return ir===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),ir=!0),i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,a,o;Vi.subVectors(s,n),Gi.subVectors(r,n),Ga.subVectors(t,n);let l=Vi.dot(Ga),c=Gi.dot(Ga);if(l<=0&&c<=0)return e.copy(n);Wa.subVectors(t,s);let h=Vi.dot(Wa),d=Gi.dot(Wa);if(h>=0&&d<=h)return e.copy(s);let u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(n).addScaledVector(Vi,a);Xa.subVectors(t,r);let p=Vi.dot(Xa),g=Gi.dot(Xa);if(g>=0&&p<=g)return e.copy(r);let _=p*c-l*g;if(_<=0&&c>=0&&g<=0)return o=c/(c-g),e.copy(n).addScaledVector(Gi,o);let m=h*g-p*d;if(m<=0&&d-h>=0&&p-g>=0)return wc.subVectors(r,s),o=(d-h)/(d-h+(p-g)),e.copy(s).addScaledVector(wc,o);let f=1/(m+_+u);return a=_*f,o=u*f,e.copy(n).addScaledVector(Vi,a).addScaledVector(Gi,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},mh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Kn={h:0,s:0,l:0},sr={h:0,s:0,l:0};function qa(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var qt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=me){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ne.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=ne.workingColorSpace){return this.r=t,this.g=e,this.b=n,ne.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=ne.workingColorSpace){if(t=dd(t,1),e=Ie(e,0,1),n=Ie(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=qa(a,r,t+1/3),this.g=qa(a,r,t),this.b=qa(a,r,t-1/3)}return ne.toWorkingColorSpace(this,s),this}setStyle(t,e=me){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=me){let n=mh[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=ns(t.r),this.g=ns(t.g),this.b=ns(t.b),this}copyLinearToSRGB(t){return this.r=Ua(t.r),this.g=Ua(t.g),this.b=Ua(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=me){return ne.fromWorkingColorSpace(Fe.copy(this),t),Math.round(Ie(Fe.r*255,0,255))*65536+Math.round(Ie(Fe.g*255,0,255))*256+Math.round(Ie(Fe.b*255,0,255))}getHexString(t=me){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ne.workingColorSpace){ne.fromWorkingColorSpace(Fe.copy(this),e);let n=Fe.r,s=Fe.g,r=Fe.b,a=Math.max(n,s,r),o=Math.min(n,s,r),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let d=a-o;switch(c=h<=.5?d/(a+o):d/(2-a-o),a){case n:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-n)/d+2;break;case r:l=(n-s)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=ne.workingColorSpace){return ne.fromWorkingColorSpace(Fe.copy(this),e),t.r=Fe.r,t.g=Fe.g,t.b=Fe.b,t}getStyle(t=me){ne.fromWorkingColorSpace(Fe.copy(this),t);let e=Fe.r,n=Fe.g,s=Fe.b;return t!==me?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Kn),this.setHSL(Kn.h+t,Kn.s+e,Kn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Kn),t.getHSL(sr);let n=Ia(Kn.h,sr.h,e),s=Ia(Kn.s,sr.s,e),r=Ia(Kn.l,sr.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Fe=new qt;qt.NAMES=mh;var Ed=0,Ei=class extends ii{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ed++}),this.uuid=zs(),this.name="",this.type="Material",this.blending=es,this.side=ni,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ro,this.blendDst=ao,this.blendEquation=yi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new qt(0,0,0),this.blendAlpha=0,this.depthFunc=vr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=hc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ni,this.stencilZFail=Ni,this.stencilZPass=Ni,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==es&&(n.blending=this.blending),this.side!==ni&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ro&&(n.blendSrc=this.blendSrc),this.blendDst!==ao&&(n.blendDst=this.blendDst),this.blendEquation!==yi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==vr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==hc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ni&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ni&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ni&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(e){let r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}},$e=class extends Ei{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new qt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Jo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var be=new L,rr=new gt,je=class{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=uc,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=jn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)rr.fromBufferAttribute(this,e),rr.applyMatrix3(t),this.setXY(e,rr.x,rr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)be.fromBufferAttribute(this,e),be.applyMatrix3(t),this.setXYZ(e,be.x,be.y,be.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)be.fromBufferAttribute(this,e),be.applyMatrix4(t),this.setXYZ(e,be.x,be.y,be.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)be.fromBufferAttribute(this,e),be.applyNormalMatrix(t),this.setXYZ(e,be.x,be.y,be.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)be.fromBufferAttribute(this,e),be.transformDirection(t),this.setXYZ(e,be.x,be.y,be.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Ms(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Xe(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Ms(e,this.array)),e}setX(t,e){return this.normalized&&(e=Xe(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Ms(e,this.array)),e}setY(t,e){return this.normalized&&(e=Xe(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Ms(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Xe(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Ms(e,this.array)),e}setW(t,e){return this.normalized&&(e=Xe(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Xe(e,this.array),n=Xe(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=Xe(e,this.array),n=Xe(n,this.array),s=Xe(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=Xe(e,this.array),n=Xe(n,this.array),s=Xe(s,this.array),r=Xe(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==uc&&(t.usage=this.usage),t}};var Ir=class extends je{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var Dr=class extends je{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var ue=class extends je{constructor(t,e,n){super(new Float32Array(t),e,n)}};var Td=0,sn=new oe,$a=new De,Wi=new L,Je=new zn,Es=new zn,Pe=new L,ln=class i extends ii{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Td++}),this.uuid=zs(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(ph(t)?Dr:Ir)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Zt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return sn.makeRotationFromQuaternion(t),this.applyMatrix4(sn),this}rotateX(t){return sn.makeRotationX(t),this.applyMatrix4(sn),this}rotateY(t){return sn.makeRotationY(t),this.applyMatrix4(sn),this}rotateZ(t){return sn.makeRotationZ(t),this.applyMatrix4(sn),this}translate(t,e,n){return sn.makeTranslation(t,e,n),this.applyMatrix4(sn),this}scale(t,e,n){return sn.makeScale(t,e,n),this.applyMatrix4(sn),this}lookAt(t){return $a.lookAt(t),$a.updateMatrix(),this.applyMatrix4($a.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Wi).negate(),this.translate(Wi.x,Wi.y,Wi.z),this}setFromPoints(t){let e=[];for(let n=0,s=t.length;n<s;n++){let r=t[n];e.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new ue(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new zn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];Je.setFromBufferAttribute(r),this.morphTargetsRelative?(Pe.addVectors(this.boundingBox.min,Je.min),this.boundingBox.expandByPoint(Pe),Pe.addVectors(this.boundingBox.max,Je.max),this.boundingBox.expandByPoint(Pe)):(this.boundingBox.expandByPoint(Je.min),this.boundingBox.expandByPoint(Je.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new wi);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new L,1/0);return}if(t){let n=this.boundingSphere.center;if(Je.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){let o=e[r];Es.setFromBufferAttribute(o),this.morphTargetsRelative?(Pe.addVectors(Je.min,Es.min),Je.expandByPoint(Pe),Pe.addVectors(Je.max,Es.max),Je.expandByPoint(Pe)):(Je.expandByPoint(Es.min),Je.expandByPoint(Es.max))}Je.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)Pe.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Pe));if(e)for(let r=0,a=e.length;r<a;r++){let o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Pe.fromBufferAttribute(o,c),l&&(Wi.fromBufferAttribute(t,c),Pe.add(Wi)),s=Math.max(s,n.distanceToSquared(Pe))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.array,s=e.position.array,r=e.normal.array,a=e.uv.array,o=s.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new je(new Float32Array(4*o),4));let l=this.getAttribute("tangent").array,c=[],h=[];for(let E=0;E<o;E++)c[E]=new L,h[E]=new L;let d=new L,u=new L,p=new L,g=new gt,_=new gt,m=new gt,f=new L,M=new L;function x(E,N,W){d.fromArray(s,E*3),u.fromArray(s,N*3),p.fromArray(s,W*3),g.fromArray(a,E*2),_.fromArray(a,N*2),m.fromArray(a,W*2),u.sub(d),p.sub(d),_.sub(g),m.sub(g);let Y=1/(_.x*m.y-m.x*_.y);isFinite(Y)&&(f.copy(u).multiplyScalar(m.y).addScaledVector(p,-_.y).multiplyScalar(Y),M.copy(p).multiplyScalar(_.x).addScaledVector(u,-m.x).multiplyScalar(Y),c[E].add(f),c[N].add(f),c[W].add(f),h[E].add(M),h[N].add(M),h[W].add(M))}let b=this.groups;b.length===0&&(b=[{start:0,count:n.length}]);for(let E=0,N=b.length;E<N;++E){let W=b[E],Y=W.start,R=W.count;for(let U=Y,G=Y+R;U<G;U+=3)x(n[U+0],n[U+1],n[U+2])}let C=new L,T=new L,A=new L,B=new L;function y(E){A.fromArray(r,E*3),B.copy(A);let N=c[E];C.copy(N),C.sub(A.multiplyScalar(A.dot(N))).normalize(),T.crossVectors(B,N);let Y=T.dot(h[E])<0?-1:1;l[E*4]=C.x,l[E*4+1]=C.y,l[E*4+2]=C.z,l[E*4+3]=Y}for(let E=0,N=b.length;E<N;++E){let W=b[E],Y=W.start,R=W.count;for(let U=Y,G=Y+R;U<G;U+=3)y(n[U+0]),y(n[U+1]),y(n[U+2])}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new je(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,p=n.count;u<p;u++)n.setXYZ(u,0,0,0);let s=new L,r=new L,a=new L,o=new L,l=new L,c=new L,h=new L,d=new L;if(t)for(let u=0,p=t.count;u<p;u+=3){let g=t.getX(u+0),_=t.getX(u+1),m=t.getX(u+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,_),a.fromBufferAttribute(e,m),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,m),o.add(h),l.add(h),c.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,p=e.count;u<p;u+=3)s.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),a.fromBufferAttribute(e,u+2),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Pe.fromBufferAttribute(t,e),Pe.normalize(),t.setXYZ(e,Pe.x,Pe.y,Pe.z)}toNonIndexed(){function t(o,l){let c=o.array,h=o.itemSize,d=o.normalized,u=new c.constructor(l.length*h),p=0,g=0;for(let _=0,m=l.length;_<m;_++){o.isInterleavedBufferAttribute?p=l[_]*o.data.stride+o.offset:p=l[_]*h;for(let f=0;f<h;f++)u[g++]=c[p++]}return new je(u,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=t(l,n);e.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let h=0,d=c.length;h<d;h++){let u=c[h],p=t(u,n);l.push(p)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let l in n){let c=n[l];t.data.attributes[l]=c.toJSON(t.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){let p=c[d];h.push(p.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone(e));let s=t.attributes;for(let c in s){let h=s[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],d=r[c];for(let u=0,p=d.length;u<p;u++)h.push(d[u].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let c=0,h=a.length;c<h;c++){let d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Ec=new oe,gi=new go,ar=new wi,Tc=new L,Xi=new L,qi=new L,$i=new L,Ya=new L,or=new L,lr=new gt,cr=new gt,hr=new gt,Ac=new L,Cc=new L,Rc=new L,ur=new L,dr=new L,Qt=class extends De{constructor(t=new ln,e=new $e){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let o=this.morphTargetInfluences;if(r&&o){or.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=o[l],d=r[l];h!==0&&(Ya.fromBufferAttribute(d,t),a?or.addScaledVector(Ya,h):or.addScaledVector(Ya.sub(e),h))}e.add(or)}return e}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ar.copy(n.boundingSphere),ar.applyMatrix4(r),gi.copy(t.ray).recast(t.near),!(ar.containsPoint(gi.origin)===!1&&(gi.intersectSphere(ar,Tc)===null||gi.origin.distanceToSquared(Tc)>(t.far-t.near)**2))&&(Ec.copy(r).invert(),gi.copy(t.ray).applyMatrix4(Ec),!(n.boundingBox!==null&&gi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,gi)))}_computeIntersections(t,e,n){let s,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=u.length;g<_;g++){let m=u[g],f=a[m.materialIndex],M=Math.max(m.start,p.start),x=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let b=M,C=x;b<C;b+=3){let T=o.getX(b),A=o.getX(b+1),B=o.getX(b+2);s=fr(this,f,t,n,c,h,d,T,A,B),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,p.start),_=Math.min(o.count,p.start+p.count);for(let m=g,f=_;m<f;m+=3){let M=o.getX(m),x=o.getX(m+1),b=o.getX(m+2);s=fr(this,a,t,n,c,h,d,M,x,b),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,_=u.length;g<_;g++){let m=u[g],f=a[m.materialIndex],M=Math.max(m.start,p.start),x=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let b=M,C=x;b<C;b+=3){let T=b,A=b+1,B=b+2;s=fr(this,f,t,n,c,h,d,T,A,B),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,p.start),_=Math.min(l.count,p.start+p.count);for(let m=g,f=_;m<f;m+=3){let M=m,x=m+1,b=m+2;s=fr(this,a,t,n,c,h,d,M,x,b),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}};function Ad(i,t,e,n,s,r,a,o){let l;if(t.side===qe?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,t.side===ni,o),l===null)return null;dr.copy(o),dr.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(dr);return c<e.near||c>e.far?null:{distance:c,point:dr.clone(),object:i}}function fr(i,t,e,n,s,r,a,o,l,c){i.getVertexPosition(o,Xi),i.getVertexPosition(l,qi),i.getVertexPosition(c,$i);let h=Ad(i,t,e,n,Xi,qi,$i,ur);if(h){s&&(lr.fromBufferAttribute(s,o),cr.fromBufferAttribute(s,l),hr.fromBufferAttribute(s,c),h.uv=ji.getInterpolation(ur,Xi,qi,$i,lr,cr,hr,new gt)),r&&(lr.fromBufferAttribute(r,o),cr.fromBufferAttribute(r,l),hr.fromBufferAttribute(r,c),h.uv1=ji.getInterpolation(ur,Xi,qi,$i,lr,cr,hr,new gt),h.uv2=h.uv1),a&&(Ac.fromBufferAttribute(a,o),Cc.fromBufferAttribute(a,l),Rc.fromBufferAttribute(a,c),h.normal=ji.getInterpolation(ur,Xi,qi,$i,Ac,Cc,Rc,new L),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a:o,b:l,c,normal:new L,materialIndex:0};ji.getNormal(Xi,qi,$i,d.normal),h.face=d}return h}var wn=class i extends ln{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],h=[],d=[],u=0,p=0;g("z","y","x",-1,-1,n,e,t,a,r,0),g("z","y","x",1,-1,n,e,-t,a,r,1),g("x","z","y",1,1,t,n,e,s,a,2),g("x","z","y",1,-1,t,n,-e,s,a,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new ue(c,3)),this.setAttribute("normal",new ue(h,3)),this.setAttribute("uv",new ue(d,2));function g(_,m,f,M,x,b,C,T,A,B,y){let E=b/A,N=C/B,W=b/2,Y=C/2,R=T/2,U=A+1,G=B+1,q=0,$=0,X=new L;for(let Z=0;Z<G;Z++){let j=Z*N-Y;for(let it=0;it<U;it++){let H=it*E-W;X[_]=H*M,X[m]=j*x,X[f]=R,c.push(X.x,X.y,X.z),X[_]=0,X[m]=0,X[f]=T>0?1:-1,h.push(X.x,X.y,X.z),d.push(it/A),d.push(1-Z/B),q+=1}}for(let Z=0;Z<B;Z++)for(let j=0;j<A;j++){let it=u+j+U*Z,H=u+j+U*(Z+1),K=u+(j+1)+U*(Z+1),ct=u+(j+1)+U*Z;l.push(it,H,ct),l.push(H,K,ct),$+=6}o.addGroup(p,$,y),p+=$,u+=q}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function ls(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function He(i){let t={};for(let e=0;e<i.length;e++){let n=ls(i[e]);for(let s in n)t[s]=n[s]}return t}function Cd(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function gh(i){return i.getRenderTarget()===null?i.outputColorSpace:ne.workingColorSpace}var Rd={clone:ls,merge:He},Pd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Ld=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Hn=class extends Ei{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Pd,this.fragmentShader=Ld,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=ls(t.uniforms),this.uniformsGroups=Cd(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}},Ur=class extends De{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new oe,this.projectionMatrix=new oe,this.projectionMatrixInverse=new oe,this.coordinateSystem=On}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},ve=class extends Ur{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=uo*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(La*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return uo*2*Math.atan(Math.tan(La*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(La*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,e-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},Yi=-90,Zi=1,_o=class extends De{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new ve(Yi,Zi,t,e);s.layers=this.layers,this.add(s);let r=new ve(Yi,Zi,t,e);r.layers=this.layers,this.add(r);let a=new ve(Yi,Zi,t,e);a.layers=this.layers,this.add(a);let o=new ve(Yi,Zi,t,e);o.layers=this.layers,this.add(o);let l=new ve(Yi,Zi,t,e);l.layers=this.layers,this.add(l);let c=new ve(Yi,Zi,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,l]=e;for(let c of e)this.remove(c);if(t===On)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Tr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,h]=this.children,d=t.getRenderTarget(),u=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,a),t.setRenderTarget(n,2,s),t.render(e,o),t.setRenderTarget(n,3,s),t.render(e,l),t.setRenderTarget(n,4,s),t.render(e,c),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(d,u,p),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},Nr=class extends on{constructor(t,e,n,s,r,a,o,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:ss,super(t,e,n,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},xo=class extends Bn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];e.encoding!==void 0&&(Cs("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),e.colorSpace=e.encoding===Si?me:an),this.texture=new Nr(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:rn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new wn(5,5,5),r=new Hn({name:"CubemapFromEquirect",uniforms:ls(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:qe,blending:Qn});r.uniforms.tEquirect.value=e;let a=new Qt(s,r),o=e.minFilter;return e.minFilter===Ds&&(e.minFilter=rn),new _o(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,n,s){let r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}},Za=new L,Id=new L,Dd=new Zt,Nn=class{constructor(t=new L(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=Za.subVectors(n,e).cross(Id.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let n=t.delta(Za),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||Dd.getNormalMatrix(t),s=this.coplanarPoint(Za).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},_i=new wi,pr=new L,Ns=class{constructor(t=new Nn,e=new Nn,n=new Nn,s=new Nn,r=new Nn,a=new Nn){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){let o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=On){let n=this.planes,s=t.elements,r=s[0],a=s[1],o=s[2],l=s[3],c=s[4],h=s[5],d=s[6],u=s[7],p=s[8],g=s[9],_=s[10],m=s[11],f=s[12],M=s[13],x=s[14],b=s[15];if(n[0].setComponents(l-r,u-c,m-p,b-f).normalize(),n[1].setComponents(l+r,u+c,m+p,b+f).normalize(),n[2].setComponents(l+a,u+h,m+g,b+M).normalize(),n[3].setComponents(l-a,u-h,m-g,b-M).normalize(),n[4].setComponents(l-o,u-d,m-_,b-x).normalize(),e===On)n[5].setComponents(l+o,u+d,m+_,b+x).normalize();else if(e===Tr)n[5].setComponents(o,d,_,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),_i.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),_i.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(_i)}intersectsSprite(t){return _i.center.set(0,0,0),_i.radius=.7071067811865476,_i.applyMatrix4(t.matrixWorld),this.intersectsSphere(_i)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(pr.x=s.normal.x>0?t.max.x:t.min.x,pr.y=s.normal.y>0?t.max.y:t.min.y,pr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(pr)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function _h(){let i=null,t=!1,e=null,n=null;function s(r,a){e(r,a),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Ud(i,t){let e=t.isWebGL2,n=new WeakMap;function s(c,h){let d=c.array,u=c.usage,p=d.byteLength,g=i.createBuffer();i.bindBuffer(h,g),i.bufferData(h,d,u),c.onUploadCallback();let _;if(d instanceof Float32Array)_=i.FLOAT;else if(d instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(e)_=i.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else _=i.UNSIGNED_SHORT;else if(d instanceof Int16Array)_=i.SHORT;else if(d instanceof Uint32Array)_=i.UNSIGNED_INT;else if(d instanceof Int32Array)_=i.INT;else if(d instanceof Int8Array)_=i.BYTE;else if(d instanceof Uint8Array)_=i.UNSIGNED_BYTE;else if(d instanceof Uint8ClampedArray)_=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+d);return{buffer:g,type:_,bytesPerElement:d.BYTES_PER_ELEMENT,version:c.version,size:p}}function r(c,h,d){let u=h.array,p=h._updateRange,g=h.updateRanges;if(i.bindBuffer(d,c),p.count===-1&&g.length===0&&i.bufferSubData(d,0,u),g.length!==0){for(let _=0,m=g.length;_<m;_++){let f=g[_];e?i.bufferSubData(d,f.start*u.BYTES_PER_ELEMENT,u,f.start,f.count):i.bufferSubData(d,f.start*u.BYTES_PER_ELEMENT,u.subarray(f.start,f.start+f.count))}h.clearUpdateRanges()}p.count!==-1&&(e?i.bufferSubData(d,p.offset*u.BYTES_PER_ELEMENT,u,p.offset,p.count):i.bufferSubData(d,p.offset*u.BYTES_PER_ELEMENT,u.subarray(p.offset,p.offset+p.count)),p.count=-1),h.onUploadCallback()}function a(c){return c.isInterleavedBufferAttribute&&(c=c.data),n.get(c)}function o(c){c.isInterleavedBufferAttribute&&(c=c.data);let h=n.get(c);h&&(i.deleteBuffer(h.buffer),n.delete(c))}function l(c,h){if(c.isGLBufferAttribute){let u=n.get(c);(!u||u.version<c.version)&&n.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);let d=n.get(c);if(d===void 0)n.set(c,s(c,h));else if(d.version<c.version){if(d.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(d.buffer,c,h),d.version=c.version}}return{get:a,remove:o,update:l}}var mn=class i extends ln{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,a=e/2,o=Math.floor(n),l=Math.floor(s),c=o+1,h=l+1,d=t/o,u=e/l,p=[],g=[],_=[],m=[];for(let f=0;f<h;f++){let M=f*u-a;for(let x=0;x<c;x++){let b=x*d-r;g.push(b,-M,0),_.push(0,0,1),m.push(x/o),m.push(1-f/l)}}for(let f=0;f<l;f++)for(let M=0;M<o;M++){let x=M+c*f,b=M+c*(f+1),C=M+1+c*(f+1),T=M+1+c*f;p.push(x,b,T),p.push(b,C,T)}this.setIndex(p),this.setAttribute("position",new ue(g,3)),this.setAttribute("normal",new ue(_,3)),this.setAttribute("uv",new ue(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}},Nd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Fd=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Od=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,kd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Bd=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,zd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Hd=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Vd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Gd=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Wd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,Xd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,qd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,$d=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Yd=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Zd=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Kd=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,Jd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,jd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Qd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,tf=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,ef=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,nf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,sf=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,rf=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,af=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,of=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,lf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,cf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,hf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,uf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,df="gl_FragColor = linearToOutputTexel( gl_FragColor );",ff=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,pf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,mf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,gf=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,_f=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,xf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,yf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,vf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Mf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,bf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Sf=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,wf=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Ef=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Tf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Af=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Cf=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Rf=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Pf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Lf=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,If=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Df=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Uf=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Nf=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Ff=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Of=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,kf=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Bf=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,zf=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Hf=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Vf=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,Gf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Wf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Xf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,qf=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,$f=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Yf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Zf=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Kf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,Jf=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,jf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,Qf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,tp=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,ep=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,np=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ip=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,sp=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,rp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ap=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,op=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,lp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,cp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,hp=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,up=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,dp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,fp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,pp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,mp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,gp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,_p=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,xp=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,yp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,vp=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Mp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,bp=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Sp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,wp=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Ep=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Tp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Ap=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Cp=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Rp=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Pp=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Lp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Ip=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Dp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Up=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Np=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Fp=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Op=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,kp=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Bp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,zp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Hp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Vp=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,Gp=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Wp=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Xp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,qp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$p=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Yp=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Zp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Kp=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Jp=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,jp=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Qp=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,tm=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,em=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,nm=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,im=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,sm=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,rm=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,am=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,om=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,lm=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,cm=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,hm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,um=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,dm=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,fm=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,pm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Vt={alphahash_fragment:Nd,alphahash_pars_fragment:Fd,alphamap_fragment:Od,alphamap_pars_fragment:kd,alphatest_fragment:Bd,alphatest_pars_fragment:zd,aomap_fragment:Hd,aomap_pars_fragment:Vd,batching_pars_vertex:Gd,batching_vertex:Wd,begin_vertex:Xd,beginnormal_vertex:qd,bsdfs:$d,iridescence_fragment:Yd,bumpmap_pars_fragment:Zd,clipping_planes_fragment:Kd,clipping_planes_pars_fragment:Jd,clipping_planes_pars_vertex:jd,clipping_planes_vertex:Qd,color_fragment:tf,color_pars_fragment:ef,color_pars_vertex:nf,color_vertex:sf,common:rf,cube_uv_reflection_fragment:af,defaultnormal_vertex:of,displacementmap_pars_vertex:lf,displacementmap_vertex:cf,emissivemap_fragment:hf,emissivemap_pars_fragment:uf,colorspace_fragment:df,colorspace_pars_fragment:ff,envmap_fragment:pf,envmap_common_pars_fragment:mf,envmap_pars_fragment:gf,envmap_pars_vertex:_f,envmap_physical_pars_fragment:Rf,envmap_vertex:xf,fog_vertex:yf,fog_pars_vertex:vf,fog_fragment:Mf,fog_pars_fragment:bf,gradientmap_pars_fragment:Sf,lightmap_fragment:wf,lightmap_pars_fragment:Ef,lights_lambert_fragment:Tf,lights_lambert_pars_fragment:Af,lights_pars_begin:Cf,lights_toon_fragment:Pf,lights_toon_pars_fragment:Lf,lights_phong_fragment:If,lights_phong_pars_fragment:Df,lights_physical_fragment:Uf,lights_physical_pars_fragment:Nf,lights_fragment_begin:Ff,lights_fragment_maps:Of,lights_fragment_end:kf,logdepthbuf_fragment:Bf,logdepthbuf_pars_fragment:zf,logdepthbuf_pars_vertex:Hf,logdepthbuf_vertex:Vf,map_fragment:Gf,map_pars_fragment:Wf,map_particle_fragment:Xf,map_particle_pars_fragment:qf,metalnessmap_fragment:$f,metalnessmap_pars_fragment:Yf,morphcolor_vertex:Zf,morphnormal_vertex:Kf,morphtarget_pars_vertex:Jf,morphtarget_vertex:jf,normal_fragment_begin:Qf,normal_fragment_maps:tp,normal_pars_fragment:ep,normal_pars_vertex:np,normal_vertex:ip,normalmap_pars_fragment:sp,clearcoat_normal_fragment_begin:rp,clearcoat_normal_fragment_maps:ap,clearcoat_pars_fragment:op,iridescence_pars_fragment:lp,opaque_fragment:cp,packing:hp,premultiplied_alpha_fragment:up,project_vertex:dp,dithering_fragment:fp,dithering_pars_fragment:pp,roughnessmap_fragment:mp,roughnessmap_pars_fragment:gp,shadowmap_pars_fragment:_p,shadowmap_pars_vertex:xp,shadowmap_vertex:yp,shadowmask_pars_fragment:vp,skinbase_vertex:Mp,skinning_pars_vertex:bp,skinning_vertex:Sp,skinnormal_vertex:wp,specularmap_fragment:Ep,specularmap_pars_fragment:Tp,tonemapping_fragment:Ap,tonemapping_pars_fragment:Cp,transmission_fragment:Rp,transmission_pars_fragment:Pp,uv_pars_fragment:Lp,uv_pars_vertex:Ip,uv_vertex:Dp,worldpos_vertex:Up,background_vert:Np,background_frag:Fp,backgroundCube_vert:Op,backgroundCube_frag:kp,cube_vert:Bp,cube_frag:zp,depth_vert:Hp,depth_frag:Vp,distanceRGBA_vert:Gp,distanceRGBA_frag:Wp,equirect_vert:Xp,equirect_frag:qp,linedashed_vert:$p,linedashed_frag:Yp,meshbasic_vert:Zp,meshbasic_frag:Kp,meshlambert_vert:Jp,meshlambert_frag:jp,meshmatcap_vert:Qp,meshmatcap_frag:tm,meshnormal_vert:em,meshnormal_frag:nm,meshphong_vert:im,meshphong_frag:sm,meshphysical_vert:rm,meshphysical_frag:am,meshtoon_vert:om,meshtoon_frag:lm,points_vert:cm,points_frag:hm,shadow_vert:um,shadow_frag:dm,sprite_vert:fm,sprite_frag:pm},rt={common:{diffuse:{value:new qt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Zt},alphaMap:{value:null},alphaMapTransform:{value:new Zt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Zt}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Zt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Zt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Zt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Zt},normalScale:{value:new gt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Zt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Zt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Zt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Zt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new qt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new qt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Zt},alphaTest:{value:0},uvTransform:{value:new Zt}},sprite:{diffuse:{value:new qt(16777215)},opacity:{value:1},center:{value:new gt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Zt},alphaMap:{value:null},alphaMapTransform:{value:new Zt},alphaTest:{value:0}}},Mn={basic:{uniforms:He([rt.common,rt.specularmap,rt.envmap,rt.aomap,rt.lightmap,rt.fog]),vertexShader:Vt.meshbasic_vert,fragmentShader:Vt.meshbasic_frag},lambert:{uniforms:He([rt.common,rt.specularmap,rt.envmap,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.fog,rt.lights,{emissive:{value:new qt(0)}}]),vertexShader:Vt.meshlambert_vert,fragmentShader:Vt.meshlambert_frag},phong:{uniforms:He([rt.common,rt.specularmap,rt.envmap,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.fog,rt.lights,{emissive:{value:new qt(0)},specular:{value:new qt(1118481)},shininess:{value:30}}]),vertexShader:Vt.meshphong_vert,fragmentShader:Vt.meshphong_frag},standard:{uniforms:He([rt.common,rt.envmap,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.roughnessmap,rt.metalnessmap,rt.fog,rt.lights,{emissive:{value:new qt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Vt.meshphysical_vert,fragmentShader:Vt.meshphysical_frag},toon:{uniforms:He([rt.common,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.gradientmap,rt.fog,rt.lights,{emissive:{value:new qt(0)}}]),vertexShader:Vt.meshtoon_vert,fragmentShader:Vt.meshtoon_frag},matcap:{uniforms:He([rt.common,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.fog,{matcap:{value:null}}]),vertexShader:Vt.meshmatcap_vert,fragmentShader:Vt.meshmatcap_frag},points:{uniforms:He([rt.points,rt.fog]),vertexShader:Vt.points_vert,fragmentShader:Vt.points_frag},dashed:{uniforms:He([rt.common,rt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Vt.linedashed_vert,fragmentShader:Vt.linedashed_frag},depth:{uniforms:He([rt.common,rt.displacementmap]),vertexShader:Vt.depth_vert,fragmentShader:Vt.depth_frag},normal:{uniforms:He([rt.common,rt.bumpmap,rt.normalmap,rt.displacementmap,{opacity:{value:1}}]),vertexShader:Vt.meshnormal_vert,fragmentShader:Vt.meshnormal_frag},sprite:{uniforms:He([rt.sprite,rt.fog]),vertexShader:Vt.sprite_vert,fragmentShader:Vt.sprite_frag},background:{uniforms:{uvTransform:{value:new Zt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Vt.background_vert,fragmentShader:Vt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Vt.backgroundCube_vert,fragmentShader:Vt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Vt.cube_vert,fragmentShader:Vt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Vt.equirect_vert,fragmentShader:Vt.equirect_frag},distanceRGBA:{uniforms:He([rt.common,rt.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Vt.distanceRGBA_vert,fragmentShader:Vt.distanceRGBA_frag},shadow:{uniforms:He([rt.lights,rt.fog,{color:{value:new qt(0)},opacity:{value:1}}]),vertexShader:Vt.shadow_vert,fragmentShader:Vt.shadow_frag}};Mn.physical={uniforms:He([Mn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Zt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Zt},clearcoatNormalScale:{value:new gt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Zt},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Zt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Zt},sheen:{value:0},sheenColor:{value:new qt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Zt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Zt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Zt},transmissionSamplerSize:{value:new gt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Zt},attenuationDistance:{value:0},attenuationColor:{value:new qt(0)},specularColor:{value:new qt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Zt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Zt},anisotropyVector:{value:new gt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Zt}}]),vertexShader:Vt.meshphysical_vert,fragmentShader:Vt.meshphysical_frag};var mr={r:0,b:0,g:0};function mm(i,t,e,n,s,r,a){let o=new qt(0),l=r===!0?0:1,c,h,d=null,u=0,p=null;function g(m,f){let M=!1,x=f.isScene===!0?f.background:null;x&&x.isTexture&&(x=(f.backgroundBlurriness>0?e:t).get(x)),x===null?_(o,l):x&&x.isColor&&(_(x,1),M=!0);let b=i.xr.getEnvironmentBlendMode();b==="additive"?n.buffers.color.setClear(0,0,0,1,a):b==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||M)&&i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil),x&&(x.isCubeTexture||x.mapping===Jr)?(h===void 0&&(h=new Qt(new wn(1,1,1),new Hn({name:"BackgroundCubeMaterial",uniforms:ls(Mn.backgroundCube.uniforms),vertexShader:Mn.backgroundCube.vertexShader,fragmentShader:Mn.backgroundCube.fragmentShader,side:qe,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(C,T,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),h.material.uniforms.envMap.value=x,h.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=f.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=f.backgroundIntensity,h.material.toneMapped=ne.getTransfer(x.colorSpace)!==le,(d!==x||u!==x.version||p!==i.toneMapping)&&(h.material.needsUpdate=!0,d=x,u=x.version,p=i.toneMapping),h.layers.enableAll(),m.unshift(h,h.geometry,h.material,0,0,null)):x&&x.isTexture&&(c===void 0&&(c=new Qt(new mn(2,2),new Hn({name:"BackgroundMaterial",uniforms:ls(Mn.background.uniforms),vertexShader:Mn.background.vertexShader,fragmentShader:Mn.background.fragmentShader,side:ni,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=x,c.material.uniforms.backgroundIntensity.value=f.backgroundIntensity,c.material.toneMapped=ne.getTransfer(x.colorSpace)!==le,x.matrixAutoUpdate===!0&&x.updateMatrix(),c.material.uniforms.uvTransform.value.copy(x.matrix),(d!==x||u!==x.version||p!==i.toneMapping)&&(c.material.needsUpdate=!0,d=x,u=x.version,p=i.toneMapping),c.layers.enableAll(),m.unshift(c,c.geometry,c.material,0,0,null))}function _(m,f){m.getRGB(mr,gh(i)),n.buffers.color.setClear(mr.r,mr.g,mr.b,f,a)}return{getClearColor:function(){return o},setClearColor:function(m,f=1){o.set(m),l=f,_(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(m){l=m,_(o,l)},render:g}}function gm(i,t,e,n){let s=i.getParameter(i.MAX_VERTEX_ATTRIBS),r=n.isWebGL2?null:t.get("OES_vertex_array_object"),a=n.isWebGL2||r!==null,o={},l=m(null),c=l,h=!1;function d(R,U,G,q,$){let X=!1;if(a){let Z=_(q,G,U);c!==Z&&(c=Z,p(c.object)),X=f(R,q,G,$),X&&M(R,q,G,$)}else{let Z=U.wireframe===!0;(c.geometry!==q.id||c.program!==G.id||c.wireframe!==Z)&&(c.geometry=q.id,c.program=G.id,c.wireframe=Z,X=!0)}$!==null&&e.update($,i.ELEMENT_ARRAY_BUFFER),(X||h)&&(h=!1,B(R,U,G,q),$!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get($).buffer))}function u(){return n.isWebGL2?i.createVertexArray():r.createVertexArrayOES()}function p(R){return n.isWebGL2?i.bindVertexArray(R):r.bindVertexArrayOES(R)}function g(R){return n.isWebGL2?i.deleteVertexArray(R):r.deleteVertexArrayOES(R)}function _(R,U,G){let q=G.wireframe===!0,$=o[R.id];$===void 0&&($={},o[R.id]=$);let X=$[U.id];X===void 0&&(X={},$[U.id]=X);let Z=X[q];return Z===void 0&&(Z=m(u()),X[q]=Z),Z}function m(R){let U=[],G=[],q=[];for(let $=0;$<s;$++)U[$]=0,G[$]=0,q[$]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:G,attributeDivisors:q,object:R,attributes:{},index:null}}function f(R,U,G,q){let $=c.attributes,X=U.attributes,Z=0,j=G.getAttributes();for(let it in j)if(j[it].location>=0){let K=$[it],ct=X[it];if(ct===void 0&&(it==="instanceMatrix"&&R.instanceMatrix&&(ct=R.instanceMatrix),it==="instanceColor"&&R.instanceColor&&(ct=R.instanceColor)),K===void 0||K.attribute!==ct||ct&&K.data!==ct.data)return!0;Z++}return c.attributesNum!==Z||c.index!==q}function M(R,U,G,q){let $={},X=U.attributes,Z=0,j=G.getAttributes();for(let it in j)if(j[it].location>=0){let K=X[it];K===void 0&&(it==="instanceMatrix"&&R.instanceMatrix&&(K=R.instanceMatrix),it==="instanceColor"&&R.instanceColor&&(K=R.instanceColor));let ct={};ct.attribute=K,K&&K.data&&(ct.data=K.data),$[it]=ct,Z++}c.attributes=$,c.attributesNum=Z,c.index=q}function x(){let R=c.newAttributes;for(let U=0,G=R.length;U<G;U++)R[U]=0}function b(R){C(R,0)}function C(R,U){let G=c.newAttributes,q=c.enabledAttributes,$=c.attributeDivisors;G[R]=1,q[R]===0&&(i.enableVertexAttribArray(R),q[R]=1),$[R]!==U&&((n.isWebGL2?i:t.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](R,U),$[R]=U)}function T(){let R=c.newAttributes,U=c.enabledAttributes;for(let G=0,q=U.length;G<q;G++)U[G]!==R[G]&&(i.disableVertexAttribArray(G),U[G]=0)}function A(R,U,G,q,$,X,Z){Z===!0?i.vertexAttribIPointer(R,U,G,$,X):i.vertexAttribPointer(R,U,G,q,$,X)}function B(R,U,G,q){if(n.isWebGL2===!1&&(R.isInstancedMesh||q.isInstancedBufferGeometry)&&t.get("ANGLE_instanced_arrays")===null)return;x();let $=q.attributes,X=G.getAttributes(),Z=U.defaultAttributeValues;for(let j in X){let it=X[j];if(it.location>=0){let H=$[j];if(H===void 0&&(j==="instanceMatrix"&&R.instanceMatrix&&(H=R.instanceMatrix),j==="instanceColor"&&R.instanceColor&&(H=R.instanceColor)),H!==void 0){let K=H.normalized,ct=H.itemSize,xt=e.get(H);if(xt===void 0)continue;let ft=xt.buffer,Nt=xt.type,Dt=xt.bytesPerElement,St=n.isWebGL2===!0&&(Nt===i.INT||Nt===i.UNSIGNED_INT||H.gpuType===sh);if(H.isInterleavedBufferAttribute){let Kt=H.data,F=Kt.stride,ke=H.offset;if(Kt.isInstancedInterleavedBuffer){for(let Et=0;Et<it.locationSize;Et++)C(it.location+Et,Kt.meshPerAttribute);R.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=Kt.meshPerAttribute*Kt.count)}else for(let Et=0;Et<it.locationSize;Et++)b(it.location+Et);i.bindBuffer(i.ARRAY_BUFFER,ft);for(let Et=0;Et<it.locationSize;Et++)A(it.location+Et,ct/it.locationSize,Nt,K,F*Dt,(ke+ct/it.locationSize*Et)*Dt,St)}else{if(H.isInstancedBufferAttribute){for(let Kt=0;Kt<it.locationSize;Kt++)C(it.location+Kt,H.meshPerAttribute);R.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=H.meshPerAttribute*H.count)}else for(let Kt=0;Kt<it.locationSize;Kt++)b(it.location+Kt);i.bindBuffer(i.ARRAY_BUFFER,ft);for(let Kt=0;Kt<it.locationSize;Kt++)A(it.location+Kt,ct/it.locationSize,Nt,K,ct*Dt,ct/it.locationSize*Kt*Dt,St)}}else if(Z!==void 0){let K=Z[j];if(K!==void 0)switch(K.length){case 2:i.vertexAttrib2fv(it.location,K);break;case 3:i.vertexAttrib3fv(it.location,K);break;case 4:i.vertexAttrib4fv(it.location,K);break;default:i.vertexAttrib1fv(it.location,K)}}}}T()}function y(){W();for(let R in o){let U=o[R];for(let G in U){let q=U[G];for(let $ in q)g(q[$].object),delete q[$];delete U[G]}delete o[R]}}function E(R){if(o[R.id]===void 0)return;let U=o[R.id];for(let G in U){let q=U[G];for(let $ in q)g(q[$].object),delete q[$];delete U[G]}delete o[R.id]}function N(R){for(let U in o){let G=o[U];if(G[R.id]===void 0)continue;let q=G[R.id];for(let $ in q)g(q[$].object),delete q[$];delete G[R.id]}}function W(){Y(),h=!0,c!==l&&(c=l,p(c.object))}function Y(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:d,reset:W,resetDefaultState:Y,dispose:y,releaseStatesOfGeometry:E,releaseStatesOfProgram:N,initAttributes:x,enableAttribute:b,disableUnusedAttributes:T}}function _m(i,t,e,n){let s=n.isWebGL2,r;function a(h){r=h}function o(h,d){i.drawArrays(r,h,d),e.update(d,r,1)}function l(h,d,u){if(u===0)return;let p,g;if(s)p=i,g="drawArraysInstanced";else if(p=t.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",p===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[g](r,h,d,u),e.update(d,r,u)}function c(h,d,u){if(u===0)return;let p=t.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<u;g++)this.render(h[g],d[g]);else{p.multiDrawArraysWEBGL(r,h,0,d,0,u);let g=0;for(let _=0;_<u;_++)g+=d[_];e.update(g,r,1)}}this.setMode=a,this.render=o,this.renderInstances=l,this.renderMultiDraw=c}function xm(i,t,e){let n;function s(){if(n!==void 0)return n;if(t.has("EXT_texture_filter_anisotropic")===!0){let A=t.get("EXT_texture_filter_anisotropic");n=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function r(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let a=typeof WebGL2RenderingContext<"u"&&i.constructor.name==="WebGL2RenderingContext",o=e.precision!==void 0?e.precision:"highp",l=r(o);l!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",l,"instead."),o=l);let c=a||t.has("WEBGL_draw_buffers"),h=e.logarithmicDepthBuffer===!0,d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),u=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),p=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),_=i.getParameter(i.MAX_VERTEX_ATTRIBS),m=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),f=i.getParameter(i.MAX_VARYING_VECTORS),M=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),x=u>0,b=a||t.has("OES_texture_float"),C=x&&b,T=a?i.getParameter(i.MAX_SAMPLES):0;return{isWebGL2:a,drawBuffers:c,getMaxAnisotropy:s,getMaxPrecision:r,precision:o,logarithmicDepthBuffer:h,maxTextures:d,maxVertexTextures:u,maxTextureSize:p,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:m,maxVaryings:f,maxFragmentUniforms:M,vertexTextures:x,floatFragmentTextures:b,floatVertexTextures:C,maxSamples:T}}function ym(i){let t=this,e=null,n=0,s=!1,r=!1,a=new Nn,o=new Zt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){let p=d.length!==0||u||n!==0||s;return s=u,n=d.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){e=h(d,u,0)},this.setState=function(d,u,p){let g=d.clippingPlanes,_=d.clipIntersection,m=d.clipShadows,f=i.get(d);if(!s||g===null||g.length===0||r&&!m)r?h(null):c();else{let M=r?0:n,x=M*4,b=f.clippingState||null;l.value=b,b=h(g,u,x,p);for(let C=0;C!==x;++C)b[C]=e[C];f.clippingState=b,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(d,u,p,g){let _=d!==null?d.length:0,m=null;if(_!==0){if(m=l.value,g!==!0||m===null){let f=p+_*4,M=u.matrixWorldInverse;o.getNormalMatrix(M),(m===null||m.length<f)&&(m=new Float32Array(f));for(let x=0,b=p;x!==_;++x,b+=4)a.copy(d[x]).applyMatrix4(M,o),a.normal.toArray(m,b),m[b+3]=a.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}function vm(i){let t=new WeakMap;function e(a,o){return o===oo?a.mapping=ss:o===lo&&(a.mapping=rs),a}function n(a){if(a&&a.isTexture){let o=a.mapping;if(o===oo||o===lo)if(t.has(a)){let l=t.get(a).texture;return e(l,a.mapping)}else{let l=a.image;if(l&&l.height>0){let c=new xo(l.height/2);return c.fromEquirectangularTexture(i,a),t.set(a,c),a.addEventListener("dispose",s),e(c.texture,a.mapping)}else return null}}return a}function s(a){let o=a.target;o.removeEventListener("dispose",s);let l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}var Fr=class extends Ur{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,a=n+t,o=s+e,l=s-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},Qi=4,Pc=[.125,.215,.35,.446,.526,.582],vi=20,Ka=new Fr,Lc=new qt,Ja=null,ja=0,Qa=0,xi=(1+Math.sqrt(5))/2,Ki=1/xi,Ic=[new L(1,1,1),new L(-1,1,1),new L(1,1,-1),new L(-1,1,-1),new L(0,xi,Ki),new L(0,xi,-Ki),new L(Ki,0,xi),new L(-Ki,0,xi),new L(xi,Ki,0),new L(-xi,Ki,0)],Or=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){Ja=this._renderer.getRenderTarget(),ja=this._renderer.getActiveCubeFace(),Qa=this._renderer.getActiveMipmapLevel(),this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Nc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Uc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Ja,ja,Qa),t.scissorTest=!1,gr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===ss||t.mapping===rs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Ja=this._renderer.getRenderTarget(),ja=this._renderer.getActiveCubeFace(),Qa=this._renderer.getActiveMipmapLevel();let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:rn,minFilter:rn,generateMipmaps:!1,type:Us,format:pn,colorSpace:kn,depthBuffer:!1},s=Dc(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Dc(t,e,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Mm(r)),this._blurMaterial=bm(r,t,e)}return s}_compileMaterial(t){let e=new Qt(this._lodPlanes[0],t);this._renderer.compile(e,Ka)}_sceneToCubeUV(t,e,n,s){let o=new ve(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,u=h.toneMapping;h.getClearColor(Lc),h.toneMapping=ti,h.autoClear=!1;let p=new $e({name:"PMREM.Background",side:qe,depthWrite:!1,depthTest:!1}),g=new Qt(new wn,p),_=!1,m=t.background;m?m.isColor&&(p.color.copy(m),t.background=null,_=!0):(p.color.copy(Lc),_=!0);for(let f=0;f<6;f++){let M=f%3;M===0?(o.up.set(0,l[f],0),o.lookAt(c[f],0,0)):M===1?(o.up.set(0,0,l[f]),o.lookAt(0,c[f],0)):(o.up.set(0,l[f],0),o.lookAt(0,0,c[f]));let x=this._cubeSize;gr(s,M*x,f>2?x:0,x,x),h.setRenderTarget(s),_&&h.render(g,o),h.render(t,o)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=u,h.autoClear=d,t.background=m}_textureToCubeUV(t,e){let n=this._renderer,s=t.mapping===ss||t.mapping===rs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Nc()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Uc());let r=s?this._cubemapMaterial:this._equirectMaterial,a=new Qt(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;let l=this._cubeSize;gr(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,Ka)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;for(let s=1;s<this._lodPlanes.length;s++){let r=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=Ic[(s-1)%Ic.length];this._blur(t,s-1,s,r,a)}e.autoClear=n}_blur(t,e,n,s,r){let a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,s,"latitudinal",r),this._halfBlur(a,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,a,o){let l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,d=new Qt(this._lodPlanes[s],c),u=c.uniforms,p=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*vi-1),_=r/g,m=isFinite(r)?1+Math.floor(h*_):vi;m>vi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${vi}`);let f=[],M=0;for(let A=0;A<vi;++A){let B=A/_,y=Math.exp(-B*B/2);f.push(y),A===0?M+=y:A<m&&(M+=2*y)}for(let A=0;A<f.length;A++)f[A]=f[A]/M;u.envMap.value=t.texture,u.samples.value=m,u.weights.value=f,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);let{_lodMax:x}=this;u.dTheta.value=g,u.mipInt.value=x-n;let b=this._sizeLods[s],C=3*b*(s>x-Qi?s-x+Qi:0),T=4*(this._cubeSize-b);gr(e,C,T,3*b,2*b),l.setRenderTarget(e),l.render(d,Ka)}};function Mm(i){let t=[],e=[],n=[],s=i,r=i-Qi+1+Pc.length;for(let a=0;a<r;a++){let o=Math.pow(2,s);e.push(o);let l=1/o;a>i-Qi?l=Pc[a-i+Qi-1]:a===0&&(l=0),n.push(l);let c=1/(o-2),h=-c,d=1+c,u=[h,h,d,h,d,d,h,h,d,d,h,d],p=6,g=6,_=3,m=2,f=1,M=new Float32Array(_*g*p),x=new Float32Array(m*g*p),b=new Float32Array(f*g*p);for(let T=0;T<p;T++){let A=T%3*2/3-1,B=T>2?0:-1,y=[A,B,0,A+2/3,B,0,A+2/3,B+1,0,A,B,0,A+2/3,B+1,0,A,B+1,0];M.set(y,_*g*T),x.set(u,m*g*T);let E=[T,T,T,T,T,T];b.set(E,f*g*T)}let C=new ln;C.setAttribute("position",new je(M,_)),C.setAttribute("uv",new je(x,m)),C.setAttribute("faceIndex",new je(b,f)),t.push(C),s>Qi&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Dc(i,t,e){let n=new Bn(i,t,e);return n.texture.mapping=Jr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function gr(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function bm(i,t,e){let n=new Float32Array(vi),s=new L(0,1,0);return new Hn({name:"SphericalGaussianBlur",defines:{n:vi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:tl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Qn,depthTest:!1,depthWrite:!1})}function Uc(){return new Hn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:tl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Qn,depthTest:!1,depthWrite:!1})}function Nc(){return new Hn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:tl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Qn,depthTest:!1,depthWrite:!1})}function tl(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Sm(i){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){let l=o.mapping,c=l===oo||l===lo,h=l===ss||l===rs;if(c||h)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let d=t.get(o);return e===null&&(e=new Or(i)),d=c?e.fromEquirectangular(o,d):e.fromCubemap(o,d),t.set(o,d),d.texture}else{if(t.has(o))return t.get(o).texture;{let d=o.image;if(c&&d&&d.height>0||h&&d&&s(d)){e===null&&(e=new Or(i));let u=c?e.fromEquirectangular(o):e.fromCubemap(o);return t.set(o,u),o.addEventListener("dispose",r),u.texture}else return null}}}return o}function s(o){let l=0,c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function r(o){let l=o.target;l.removeEventListener("dispose",r);let c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function wm(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(n){n.isWebGL2?(e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance")):(e("WEBGL_depth_texture"),e("OES_texture_float"),e("OES_texture_half_float"),e("OES_texture_half_float_linear"),e("OES_standard_derivatives"),e("OES_element_index_uint"),e("OES_vertex_array_object"),e("ANGLE_instanced_arrays")),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture")},get:function(n){let s=e(n);return s===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Em(i,t,e,n){let s={},r=new WeakMap;function a(d){let u=d.target;u.index!==null&&t.remove(u.index);for(let g in u.attributes)t.remove(u.attributes[g]);for(let g in u.morphAttributes){let _=u.morphAttributes[g];for(let m=0,f=_.length;m<f;m++)t.remove(_[m])}u.removeEventListener("dispose",a),delete s[u.id];let p=r.get(u);p&&(t.remove(p),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function o(d,u){return s[u.id]===!0||(u.addEventListener("dispose",a),s[u.id]=!0,e.memory.geometries++),u}function l(d){let u=d.attributes;for(let g in u)t.update(u[g],i.ARRAY_BUFFER);let p=d.morphAttributes;for(let g in p){let _=p[g];for(let m=0,f=_.length;m<f;m++)t.update(_[m],i.ARRAY_BUFFER)}}function c(d){let u=[],p=d.index,g=d.attributes.position,_=0;if(p!==null){let M=p.array;_=p.version;for(let x=0,b=M.length;x<b;x+=3){let C=M[x+0],T=M[x+1],A=M[x+2];u.push(C,T,T,A,A,C)}}else if(g!==void 0){let M=g.array;_=g.version;for(let x=0,b=M.length/3-1;x<b;x+=3){let C=x+0,T=x+1,A=x+2;u.push(C,T,T,A,A,C)}}else return;let m=new(ph(u)?Dr:Ir)(u,1);m.version=_;let f=r.get(d);f&&t.remove(f),r.set(d,m)}function h(d){let u=r.get(d);if(u){let p=d.index;p!==null&&u.version<p.version&&c(d)}else c(d);return r.get(d)}return{get:o,update:l,getWireframeAttribute:h}}function Tm(i,t,e,n){let s=n.isWebGL2,r;function a(p){r=p}let o,l;function c(p){o=p.type,l=p.bytesPerElement}function h(p,g){i.drawElements(r,g,o,p*l),e.update(g,r,1)}function d(p,g,_){if(_===0)return;let m,f;if(s)m=i,f="drawElementsInstanced";else if(m=t.get("ANGLE_instanced_arrays"),f="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[f](r,g,o,p*l,_),e.update(g,r,_)}function u(p,g,_){if(_===0)return;let m=t.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<_;f++)this.render(p[f]/l,g[f]);else{m.multiDrawElementsWEBGL(r,g,0,o,p,0,_);let f=0;for(let M=0;M<_;M++)f+=g[M];e.update(f,r,1)}}this.setMode=a,this.setIndex=c,this.render=h,this.renderInstances=d,this.renderMultiDraw=u}function Am(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Cm(i,t){return i[0]-t[0]}function Rm(i,t){return Math.abs(t[1])-Math.abs(i[1])}function Pm(i,t,e){let n={},s=new Float32Array(8),r=new WeakMap,a=new Le,o=[];for(let c=0;c<8;c++)o[c]=[c,0];function l(c,h,d){let u=c.morphTargetInfluences;if(t.isWebGL2===!0){let p=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,g=p!==void 0?p.length:0,_=r.get(h);if(_===void 0||_.count!==g){let R=function(){W.dispose(),r.delete(h),h.removeEventListener("dispose",R)};_!==void 0&&_.texture.dispose();let M=h.morphAttributes.position!==void 0,x=h.morphAttributes.normal!==void 0,b=h.morphAttributes.color!==void 0,C=h.morphAttributes.position||[],T=h.morphAttributes.normal||[],A=h.morphAttributes.color||[],B=0;M===!0&&(B=1),x===!0&&(B=2),b===!0&&(B=3);let y=h.attributes.position.count*B,E=1;y>t.maxTextureSize&&(E=Math.ceil(y/t.maxTextureSize),y=t.maxTextureSize);let N=new Float32Array(y*E*4*g),W=new Pr(N,y,E,g);W.type=jn,W.needsUpdate=!0;let Y=B*4;for(let U=0;U<g;U++){let G=C[U],q=T[U],$=A[U],X=y*E*4*U;for(let Z=0;Z<G.count;Z++){let j=Z*Y;M===!0&&(a.fromBufferAttribute(G,Z),N[X+j+0]=a.x,N[X+j+1]=a.y,N[X+j+2]=a.z,N[X+j+3]=0),x===!0&&(a.fromBufferAttribute(q,Z),N[X+j+4]=a.x,N[X+j+5]=a.y,N[X+j+6]=a.z,N[X+j+7]=0),b===!0&&(a.fromBufferAttribute($,Z),N[X+j+8]=a.x,N[X+j+9]=a.y,N[X+j+10]=a.z,N[X+j+11]=$.itemSize===4?a.w:1)}}_={count:g,texture:W,size:new gt(y,E)},r.set(h,_),h.addEventListener("dispose",R)}let m=0;for(let M=0;M<u.length;M++)m+=u[M];let f=h.morphTargetsRelative?1:1-m;d.getUniforms().setValue(i,"morphTargetBaseInfluence",f),d.getUniforms().setValue(i,"morphTargetInfluences",u),d.getUniforms().setValue(i,"morphTargetsTexture",_.texture,e),d.getUniforms().setValue(i,"morphTargetsTextureSize",_.size)}else{let p=u===void 0?0:u.length,g=n[h.id];if(g===void 0||g.length!==p){g=[];for(let x=0;x<p;x++)g[x]=[x,0];n[h.id]=g}for(let x=0;x<p;x++){let b=g[x];b[0]=x,b[1]=u[x]}g.sort(Rm);for(let x=0;x<8;x++)x<p&&g[x][1]?(o[x][0]=g[x][0],o[x][1]=g[x][1]):(o[x][0]=Number.MAX_SAFE_INTEGER,o[x][1]=0);o.sort(Cm);let _=h.morphAttributes.position,m=h.morphAttributes.normal,f=0;for(let x=0;x<8;x++){let b=o[x],C=b[0],T=b[1];C!==Number.MAX_SAFE_INTEGER&&T?(_&&h.getAttribute("morphTarget"+x)!==_[C]&&h.setAttribute("morphTarget"+x,_[C]),m&&h.getAttribute("morphNormal"+x)!==m[C]&&h.setAttribute("morphNormal"+x,m[C]),s[x]=T,f+=T):(_&&h.hasAttribute("morphTarget"+x)===!0&&h.deleteAttribute("morphTarget"+x),m&&h.hasAttribute("morphNormal"+x)===!0&&h.deleteAttribute("morphNormal"+x),s[x]=0)}let M=h.morphTargetsRelative?1:1-f;d.getUniforms().setValue(i,"morphTargetBaseInfluence",M),d.getUniforms().setValue(i,"morphTargetInfluences",s)}}return{update:l}}function Lm(i,t,e,n){let s=new WeakMap;function r(l){let c=n.render.frame,h=l.geometry,d=t.get(l,h);if(s.get(d)!==c&&(t.update(d),s.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){let u=l.skeleton;s.get(u)!==c&&(u.update(),s.set(u,c))}return d}function a(){s=new WeakMap}function o(l){let c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:a}}var kr=class extends on{constructor(t,e,n,s,r,a,o,l,c,h){if(h=h!==void 0?h:bi,h!==bi&&h!==as)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===bi&&(n=Jn),n===void 0&&h===as&&(n=Mi),super(null,s,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:Ve,this.minFilter=l!==void 0?l:Ve,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},xh=new on,yh=new kr(1,1);yh.compareFunction=fh;var vh=new Pr,Mh=new mo,bh=new Nr,Fc=[],Oc=[],kc=new Float32Array(16),Bc=new Float32Array(9),zc=new Float32Array(4);function us(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=Fc[s];if(r===void 0&&(r=new Float32Array(s),Fc[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function Ee(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Te(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Qr(i,t){let e=Oc[t];e===void 0&&(e=new Int32Array(t),Oc[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Im(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Dm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ee(e,t))return;i.uniform2fv(this.addr,t),Te(e,t)}}function Um(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ee(e,t))return;i.uniform3fv(this.addr,t),Te(e,t)}}function Nm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ee(e,t))return;i.uniform4fv(this.addr,t),Te(e,t)}}function Fm(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ee(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Te(e,t)}else{if(Ee(e,n))return;zc.set(n),i.uniformMatrix2fv(this.addr,!1,zc),Te(e,n)}}function Om(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ee(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Te(e,t)}else{if(Ee(e,n))return;Bc.set(n),i.uniformMatrix3fv(this.addr,!1,Bc),Te(e,n)}}function km(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ee(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Te(e,t)}else{if(Ee(e,n))return;kc.set(n),i.uniformMatrix4fv(this.addr,!1,kc),Te(e,n)}}function Bm(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function zm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ee(e,t))return;i.uniform2iv(this.addr,t),Te(e,t)}}function Hm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ee(e,t))return;i.uniform3iv(this.addr,t),Te(e,t)}}function Vm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ee(e,t))return;i.uniform4iv(this.addr,t),Te(e,t)}}function Gm(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Wm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ee(e,t))return;i.uniform2uiv(this.addr,t),Te(e,t)}}function Xm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ee(e,t))return;i.uniform3uiv(this.addr,t),Te(e,t)}}function qm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ee(e,t))return;i.uniform4uiv(this.addr,t),Te(e,t)}}function $m(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r=this.type===i.SAMPLER_2D_SHADOW?yh:xh;e.setTexture2D(t||r,s)}function Ym(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Mh,s)}function Zm(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||bh,s)}function Km(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||vh,s)}function Jm(i){switch(i){case 5126:return Im;case 35664:return Dm;case 35665:return Um;case 35666:return Nm;case 35674:return Fm;case 35675:return Om;case 35676:return km;case 5124:case 35670:return Bm;case 35667:case 35671:return zm;case 35668:case 35672:return Hm;case 35669:case 35673:return Vm;case 5125:return Gm;case 36294:return Wm;case 36295:return Xm;case 36296:return qm;case 35678:case 36198:case 36298:case 36306:case 35682:return $m;case 35679:case 36299:case 36307:return Ym;case 35680:case 36300:case 36308:case 36293:return Zm;case 36289:case 36303:case 36311:case 36292:return Km}}function jm(i,t){i.uniform1fv(this.addr,t)}function Qm(i,t){let e=us(t,this.size,2);i.uniform2fv(this.addr,e)}function tg(i,t){let e=us(t,this.size,3);i.uniform3fv(this.addr,e)}function eg(i,t){let e=us(t,this.size,4);i.uniform4fv(this.addr,e)}function ng(i,t){let e=us(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function ig(i,t){let e=us(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function sg(i,t){let e=us(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function rg(i,t){i.uniform1iv(this.addr,t)}function ag(i,t){i.uniform2iv(this.addr,t)}function og(i,t){i.uniform3iv(this.addr,t)}function lg(i,t){i.uniform4iv(this.addr,t)}function cg(i,t){i.uniform1uiv(this.addr,t)}function hg(i,t){i.uniform2uiv(this.addr,t)}function ug(i,t){i.uniform3uiv(this.addr,t)}function dg(i,t){i.uniform4uiv(this.addr,t)}function fg(i,t,e){let n=this.cache,s=t.length,r=Qr(e,s);Ee(n,r)||(i.uniform1iv(this.addr,r),Te(n,r));for(let a=0;a!==s;++a)e.setTexture2D(t[a]||xh,r[a])}function pg(i,t,e){let n=this.cache,s=t.length,r=Qr(e,s);Ee(n,r)||(i.uniform1iv(this.addr,r),Te(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||Mh,r[a])}function mg(i,t,e){let n=this.cache,s=t.length,r=Qr(e,s);Ee(n,r)||(i.uniform1iv(this.addr,r),Te(n,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||bh,r[a])}function gg(i,t,e){let n=this.cache,s=t.length,r=Qr(e,s);Ee(n,r)||(i.uniform1iv(this.addr,r),Te(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||vh,r[a])}function _g(i){switch(i){case 5126:return jm;case 35664:return Qm;case 35665:return tg;case 35666:return eg;case 35674:return ng;case 35675:return ig;case 35676:return sg;case 5124:case 35670:return rg;case 35667:case 35671:return ag;case 35668:case 35672:return og;case 35669:case 35673:return lg;case 5125:return cg;case 36294:return hg;case 36295:return ug;case 36296:return dg;case 35678:case 36198:case 36298:case 36306:case 35682:return fg;case 35679:case 36299:case 36307:return pg;case 35680:case 36300:case 36308:case 36293:return mg;case 36289:case 36303:case 36311:case 36292:return gg}}var yo=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Jm(e.type)}},vo=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=_g(e.type)}},Mo=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(t,e[o.id],n)}}},to=/(\w+)(\])?(\[|\.)?/g;function Hc(i,t){i.seq.push(t),i.map[t.id]=t}function xg(i,t,e){let n=i.name,s=n.length;for(to.lastIndex=0;;){let r=to.exec(n),a=to.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){Hc(e,c===void 0?new yo(o,i,t):new vo(o,i,t));break}else{let d=e.map[o];d===void 0&&(d=new Mo(o),Hc(e,d)),e=d}}}var is=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){let r=t.getActiveUniform(e,s),a=t.getUniformLocation(e,r.name);xg(r,a,this)}}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){let o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let a=t[s];a.id in e&&n.push(a)}return n}};function Vc(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var yg=37297,vg=0;function Mg(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}function bg(i){let t=ne.getPrimaries(ne.workingColorSpace),e=ne.getPrimaries(i),n;switch(t===e?n="":t===Er&&e===wr?n="LinearDisplayP3ToLinearSRGB":t===wr&&e===Er&&(n="LinearSRGBToLinearDisplayP3"),i){case kn:case jr:return[n,"LinearTransferOETF"];case me:case Qo:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function Gc(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";let r=/ERROR: 0:(\d+)/.exec(s);if(r){let a=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+Mg(i.getShaderSource(t),a)}else return s}function Sg(i,t){let e=bg(t);return`vec4 ${i}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function wg(i,t){let e;switch(t){case Hu:e="Linear";break;case Vu:e="Reinhard";break;case Gu:e="OptimizedCineon";break;case Wu:e="ACESFilmic";break;case qu:e="AgX";break;case Xu:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function Eg(i){return[i.extensionDerivatives||i.envMapCubeUVHeight||i.bumpMap||i.normalMapTangentSpace||i.clearcoatNormalMap||i.flatShading||i.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(i.extensionFragDepth||i.logarithmicDepthBuffer)&&i.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",i.extensionDrawBuffers&&i.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(i.extensionShaderTextureLOD||i.envMap||i.transmission)&&i.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(ts).join(`
`)}function Tg(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(ts).join(`
`)}function Ag(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Cg(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function ts(i){return i!==""}function Wc(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Xc(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Rg=/^[ \t]*#include +<([\w\d./]+)>/gm;function bo(i){return i.replace(Rg,Lg)}var Pg=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function Lg(i,t){let e=Vt[t];if(e===void 0){let n=Pg.get(t);if(n!==void 0)e=Vt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return bo(e)}var Ig=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function qc(i){return i.replace(Ig,Dg)}function Dg(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function $c(i){let t="precision "+i.precision+` float;
precision `+i.precision+" int;";return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Ug(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Kr?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===mu?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Un&&(t="SHADOWMAP_TYPE_VSM"),t}function Ng(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case ss:case rs:t="ENVMAP_TYPE_CUBE";break;case Jr:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Fg(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case rs:t="ENVMAP_MODE_REFRACTION";break}return t}function Og(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Jo:t="ENVMAP_BLENDING_MULTIPLY";break;case Bu:t="ENVMAP_BLENDING_MIX";break;case zu:t="ENVMAP_BLENDING_ADD";break}return t}function kg(i){let t=i.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function Bg(i,t,e,n){let s=i.getContext(),r=e.defines,a=e.vertexShader,o=e.fragmentShader,l=Ug(e),c=Ng(e),h=Fg(e),d=Og(e),u=kg(e),p=e.isWebGL2?"":Eg(e),g=Tg(e),_=Ag(r),m=s.createProgram(),f,M,x=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(ts).join(`
`),f.length>0&&(f+=`
`),M=[p,"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(ts).join(`
`),M.length>0&&(M+=`
`)):(f=[$c(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors&&e.isWebGL2?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ts).join(`
`),M=[p,$c(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==ti?"#define TONE_MAPPING":"",e.toneMapping!==ti?Vt.tonemapping_pars_fragment:"",e.toneMapping!==ti?wg("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Vt.colorspace_pars_fragment,Sg("linearToOutputTexel",e.outputColorSpace),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ts).join(`
`)),a=bo(a),a=Wc(a,e),a=Xc(a,e),o=bo(o),o=Wc(o,e),o=Xc(o,e),a=qc(a),o=qc(o),e.isWebGL2&&e.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,f=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,M=["precision mediump sampler2DArray;","#define varying in",e.glslVersion===dc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===dc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+M);let b=x+f+a,C=x+M+o,T=Vc(s,s.VERTEX_SHADER,b),A=Vc(s,s.FRAGMENT_SHADER,C);s.attachShader(m,T),s.attachShader(m,A),e.index0AttributeName!==void 0?s.bindAttribLocation(m,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(m,0,"position"),s.linkProgram(m);function B(W){if(i.debug.checkShaderErrors){let Y=s.getProgramInfoLog(m).trim(),R=s.getShaderInfoLog(T).trim(),U=s.getShaderInfoLog(A).trim(),G=!0,q=!0;if(s.getProgramParameter(m,s.LINK_STATUS)===!1)if(G=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,m,T,A);else{let $=Gc(s,T,"vertex"),X=Gc(s,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(m,s.VALIDATE_STATUS)+`

Program Info Log: `+Y+`
`+$+`
`+X)}else Y!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Y):(R===""||U==="")&&(q=!1);q&&(W.diagnostics={runnable:G,programLog:Y,vertexShader:{log:R,prefix:f},fragmentShader:{log:U,prefix:M}})}s.deleteShader(T),s.deleteShader(A),y=new is(s,m),E=Cg(s,m)}let y;this.getUniforms=function(){return y===void 0&&B(this),y};let E;this.getAttributes=function(){return E===void 0&&B(this),E};let N=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return N===!1&&(N=s.getProgramParameter(m,yg)),N},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(m),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=vg++,this.cacheKey=t,this.usedTimes=1,this.program=m,this.vertexShader=T,this.fragmentShader=A,this}var zg=0,So=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new wo(t),e.set(t,n)),n}},wo=class{constructor(t){this.id=zg++,this.code=t,this.usedTimes=0}};function Hg(i,t,e,n,s,r,a){let o=new Lr,l=new So,c=[],h=s.isWebGL2,d=s.logarithmicDepthBuffer,u=s.vertexTextures,p=s.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(y){return y===0?"uv":`uv${y}`}function m(y,E,N,W,Y){let R=W.fog,U=Y.geometry,G=y.isMeshStandardMaterial?W.environment:null,q=(y.isMeshStandardMaterial?e:t).get(y.envMap||G),$=q&&q.mapping===Jr?q.image.height:null,X=g[y.type];y.precision!==null&&(p=s.getMaxPrecision(y.precision),p!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",p,"instead."));let Z=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,j=Z!==void 0?Z.length:0,it=0;U.morphAttributes.position!==void 0&&(it=1),U.morphAttributes.normal!==void 0&&(it=2),U.morphAttributes.color!==void 0&&(it=3);let H,K,ct,xt;if(X){let Be=Mn[X];H=Be.vertexShader,K=Be.fragmentShader}else H=y.vertexShader,K=y.fragmentShader,l.update(y),ct=l.getVertexShaderID(y),xt=l.getFragmentShaderID(y);let ft=i.getRenderTarget(),Nt=Y.isInstancedMesh===!0,Dt=Y.isBatchedMesh===!0,St=!!y.map,Kt=!!y.matcap,F=!!q,ke=!!y.aoMap,Et=!!y.lightMap,Ot=!!y.bumpMap,yt=!!y.normalMap,fe=!!y.displacementMap,Gt=!!y.emissiveMap,w=!!y.metalnessMap,v=!!y.roughnessMap,k=y.anisotropy>0,et=y.clearcoat>0,tt=y.iridescence>0,nt=y.sheen>0,vt=y.transmission>0,ht=k&&!!y.anisotropyMap,pt=et&&!!y.clearcoatMap,Rt=et&&!!y.clearcoatNormalMap,Wt=et&&!!y.clearcoatRoughnessMap,Q=tt&&!!y.iridescenceMap,ee=tt&&!!y.iridescenceThicknessMap,Jt=nt&&!!y.sheenColorMap,Ft=nt&&!!y.sheenRoughnessMap,wt=!!y.specularMap,mt=!!y.specularColorMap,Ht=!!y.specularIntensityMap,te=vt&&!!y.transmissionMap,ge=vt&&!!y.thicknessMap,$t=!!y.gradientMap,st=!!y.alphaMap,P=y.alphaTest>0,ot=!!y.alphaHash,lt=!!y.extensions,Lt=!!U.attributes.uv1,Tt=!!U.attributes.uv2,se=!!U.attributes.uv3,re=ti;return y.toneMapped&&(ft===null||ft.isXRRenderTarget===!0)&&(re=i.toneMapping),{isWebGL2:h,shaderID:X,shaderType:y.type,shaderName:y.name,vertexShader:H,fragmentShader:K,defines:y.defines,customVertexShaderID:ct,customFragmentShaderID:xt,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:p,batching:Dt,instancing:Nt,instancingColor:Nt&&Y.instanceColor!==null,supportsVertexTextures:u,outputColorSpace:ft===null?i.outputColorSpace:ft.isXRRenderTarget===!0?ft.texture.colorSpace:kn,map:St,matcap:Kt,envMap:F,envMapMode:F&&q.mapping,envMapCubeUVHeight:$,aoMap:ke,lightMap:Et,bumpMap:Ot,normalMap:yt,displacementMap:u&&fe,emissiveMap:Gt,normalMapObjectSpace:yt&&y.normalMapType===sd,normalMapTangentSpace:yt&&y.normalMapType===dh,metalnessMap:w,roughnessMap:v,anisotropy:k,anisotropyMap:ht,clearcoat:et,clearcoatMap:pt,clearcoatNormalMap:Rt,clearcoatRoughnessMap:Wt,iridescence:tt,iridescenceMap:Q,iridescenceThicknessMap:ee,sheen:nt,sheenColorMap:Jt,sheenRoughnessMap:Ft,specularMap:wt,specularColorMap:mt,specularIntensityMap:Ht,transmission:vt,transmissionMap:te,thicknessMap:ge,gradientMap:$t,opaque:y.transparent===!1&&y.blending===es,alphaMap:st,alphaTest:P,alphaHash:ot,combine:y.combine,mapUv:St&&_(y.map.channel),aoMapUv:ke&&_(y.aoMap.channel),lightMapUv:Et&&_(y.lightMap.channel),bumpMapUv:Ot&&_(y.bumpMap.channel),normalMapUv:yt&&_(y.normalMap.channel),displacementMapUv:fe&&_(y.displacementMap.channel),emissiveMapUv:Gt&&_(y.emissiveMap.channel),metalnessMapUv:w&&_(y.metalnessMap.channel),roughnessMapUv:v&&_(y.roughnessMap.channel),anisotropyMapUv:ht&&_(y.anisotropyMap.channel),clearcoatMapUv:pt&&_(y.clearcoatMap.channel),clearcoatNormalMapUv:Rt&&_(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Wt&&_(y.clearcoatRoughnessMap.channel),iridescenceMapUv:Q&&_(y.iridescenceMap.channel),iridescenceThicknessMapUv:ee&&_(y.iridescenceThicknessMap.channel),sheenColorMapUv:Jt&&_(y.sheenColorMap.channel),sheenRoughnessMapUv:Ft&&_(y.sheenRoughnessMap.channel),specularMapUv:wt&&_(y.specularMap.channel),specularColorMapUv:mt&&_(y.specularColorMap.channel),specularIntensityMapUv:Ht&&_(y.specularIntensityMap.channel),transmissionMapUv:te&&_(y.transmissionMap.channel),thicknessMapUv:ge&&_(y.thicknessMap.channel),alphaMapUv:st&&_(y.alphaMap.channel),vertexTangents:!!U.attributes.tangent&&(yt||k),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,vertexUv1s:Lt,vertexUv2s:Tt,vertexUv3s:se,pointsUvs:Y.isPoints===!0&&!!U.attributes.uv&&(St||st),fog:!!R,useFog:y.fog===!0,fogExp2:R&&R.isFogExp2,flatShading:y.flatShading===!0,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:d,skinning:Y.isSkinnedMesh===!0,morphTargets:U.morphAttributes.position!==void 0,morphNormals:U.morphAttributes.normal!==void 0,morphColors:U.morphAttributes.color!==void 0,morphTargetsCount:j,morphTextureStride:it,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:y.dithering,shadowMapEnabled:i.shadowMap.enabled&&N.length>0,shadowMapType:i.shadowMap.type,toneMapping:re,useLegacyLights:i._useLegacyLights,decodeVideoTexture:St&&y.map.isVideoTexture===!0&&ne.getTransfer(y.map.colorSpace)===le,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===Fn,flipSided:y.side===qe,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionDerivatives:lt&&y.extensions.derivatives===!0,extensionFragDepth:lt&&y.extensions.fragDepth===!0,extensionDrawBuffers:lt&&y.extensions.drawBuffers===!0,extensionShaderTextureLOD:lt&&y.extensions.shaderTextureLOD===!0,extensionClipCullDistance:lt&&y.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:h||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()}}function f(y){let E=[];if(y.shaderID?E.push(y.shaderID):(E.push(y.customVertexShaderID),E.push(y.customFragmentShaderID)),y.defines!==void 0)for(let N in y.defines)E.push(N),E.push(y.defines[N]);return y.isRawShaderMaterial===!1&&(M(E,y),x(E,y),E.push(i.outputColorSpace)),E.push(y.customProgramCacheKey),E.join()}function M(y,E){y.push(E.precision),y.push(E.outputColorSpace),y.push(E.envMapMode),y.push(E.envMapCubeUVHeight),y.push(E.mapUv),y.push(E.alphaMapUv),y.push(E.lightMapUv),y.push(E.aoMapUv),y.push(E.bumpMapUv),y.push(E.normalMapUv),y.push(E.displacementMapUv),y.push(E.emissiveMapUv),y.push(E.metalnessMapUv),y.push(E.roughnessMapUv),y.push(E.anisotropyMapUv),y.push(E.clearcoatMapUv),y.push(E.clearcoatNormalMapUv),y.push(E.clearcoatRoughnessMapUv),y.push(E.iridescenceMapUv),y.push(E.iridescenceThicknessMapUv),y.push(E.sheenColorMapUv),y.push(E.sheenRoughnessMapUv),y.push(E.specularMapUv),y.push(E.specularColorMapUv),y.push(E.specularIntensityMapUv),y.push(E.transmissionMapUv),y.push(E.thicknessMapUv),y.push(E.combine),y.push(E.fogExp2),y.push(E.sizeAttenuation),y.push(E.morphTargetsCount),y.push(E.morphAttributeCount),y.push(E.numDirLights),y.push(E.numPointLights),y.push(E.numSpotLights),y.push(E.numSpotLightMaps),y.push(E.numHemiLights),y.push(E.numRectAreaLights),y.push(E.numDirLightShadows),y.push(E.numPointLightShadows),y.push(E.numSpotLightShadows),y.push(E.numSpotLightShadowsWithMaps),y.push(E.numLightProbes),y.push(E.shadowMapType),y.push(E.toneMapping),y.push(E.numClippingPlanes),y.push(E.numClipIntersection),y.push(E.depthPacking)}function x(y,E){o.disableAll(),E.isWebGL2&&o.enable(0),E.supportsVertexTextures&&o.enable(1),E.instancing&&o.enable(2),E.instancingColor&&o.enable(3),E.matcap&&o.enable(4),E.envMap&&o.enable(5),E.normalMapObjectSpace&&o.enable(6),E.normalMapTangentSpace&&o.enable(7),E.clearcoat&&o.enable(8),E.iridescence&&o.enable(9),E.alphaTest&&o.enable(10),E.vertexColors&&o.enable(11),E.vertexAlphas&&o.enable(12),E.vertexUv1s&&o.enable(13),E.vertexUv2s&&o.enable(14),E.vertexUv3s&&o.enable(15),E.vertexTangents&&o.enable(16),E.anisotropy&&o.enable(17),E.alphaHash&&o.enable(18),E.batching&&o.enable(19),y.push(o.mask),o.disableAll(),E.fog&&o.enable(0),E.useFog&&o.enable(1),E.flatShading&&o.enable(2),E.logarithmicDepthBuffer&&o.enable(3),E.skinning&&o.enable(4),E.morphTargets&&o.enable(5),E.morphNormals&&o.enable(6),E.morphColors&&o.enable(7),E.premultipliedAlpha&&o.enable(8),E.shadowMapEnabled&&o.enable(9),E.useLegacyLights&&o.enable(10),E.doubleSided&&o.enable(11),E.flipSided&&o.enable(12),E.useDepthPacking&&o.enable(13),E.dithering&&o.enable(14),E.transmission&&o.enable(15),E.sheen&&o.enable(16),E.opaque&&o.enable(17),E.pointsUvs&&o.enable(18),E.decodeVideoTexture&&o.enable(19),y.push(o.mask)}function b(y){let E=g[y.type],N;if(E){let W=Mn[E];N=Rd.clone(W.uniforms)}else N=y.uniforms;return N}function C(y,E){let N;for(let W=0,Y=c.length;W<Y;W++){let R=c[W];if(R.cacheKey===E){N=R,++N.usedTimes;break}}return N===void 0&&(N=new Bg(i,E,y,r),c.push(N)),N}function T(y){if(--y.usedTimes===0){let E=c.indexOf(y);c[E]=c[c.length-1],c.pop(),y.destroy()}}function A(y){l.remove(y)}function B(){l.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:b,acquireProgram:C,releaseProgram:T,releaseShaderCache:A,programs:c,dispose:B}}function Vg(){let i=new WeakMap;function t(r){let a=i.get(r);return a===void 0&&(a={},i.set(r,a)),a}function e(r){i.delete(r)}function n(r,a,o){i.get(r)[a]=o}function s(){i=new WeakMap}return{get:t,remove:e,update:n,dispose:s}}function Gg(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function Yc(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Zc(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(d,u,p,g,_,m){let f=i[t];return f===void 0?(f={id:d.id,object:d,geometry:u,material:p,groupOrder:g,renderOrder:d.renderOrder,z:_,group:m},i[t]=f):(f.id=d.id,f.object=d,f.geometry=u,f.material=p,f.groupOrder=g,f.renderOrder=d.renderOrder,f.z=_,f.group=m),t++,f}function o(d,u,p,g,_,m){let f=a(d,u,p,g,_,m);p.transmission>0?n.push(f):p.transparent===!0?s.push(f):e.push(f)}function l(d,u,p,g,_,m){let f=a(d,u,p,g,_,m);p.transmission>0?n.unshift(f):p.transparent===!0?s.unshift(f):e.unshift(f)}function c(d,u){e.length>1&&e.sort(d||Gg),n.length>1&&n.sort(u||Yc),s.length>1&&s.sort(u||Yc)}function h(){for(let d=t,u=i.length;d<u;d++){let p=i[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:o,unshift:l,finish:h,sort:c}}function Wg(){let i=new WeakMap;function t(n,s){let r=i.get(n),a;return r===void 0?(a=new Zc,i.set(n,[a])):s>=r.length?(a=new Zc,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function Xg(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new L,color:new qt};break;case"SpotLight":e={position:new L,direction:new L,color:new qt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new L,color:new qt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new L,skyColor:new qt,groundColor:new qt};break;case"RectAreaLight":e={color:new qt,position:new L,halfWidth:new L,halfHeight:new L};break}return i[t.id]=e,e}}}function qg(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new gt};break;case"SpotLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new gt};break;case"PointLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new gt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var $g=0;function Yg(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function Zg(i,t){let e=new Xg,n=qg(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)s.probe.push(new L);let r=new L,a=new oe,o=new oe;function l(h,d){let u=0,p=0,g=0;for(let W=0;W<9;W++)s.probe[W].set(0,0,0);let _=0,m=0,f=0,M=0,x=0,b=0,C=0,T=0,A=0,B=0,y=0;h.sort(Yg);let E=d===!0?Math.PI:1;for(let W=0,Y=h.length;W<Y;W++){let R=h[W],U=R.color,G=R.intensity,q=R.distance,$=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)u+=U.r*G*E,p+=U.g*G*E,g+=U.b*G*E;else if(R.isLightProbe){for(let X=0;X<9;X++)s.probe[X].addScaledVector(R.sh.coefficients[X],G);y++}else if(R.isDirectionalLight){let X=e.get(R);if(X.color.copy(R.color).multiplyScalar(R.intensity*E),R.castShadow){let Z=R.shadow,j=n.get(R);j.shadowBias=Z.bias,j.shadowNormalBias=Z.normalBias,j.shadowRadius=Z.radius,j.shadowMapSize=Z.mapSize,s.directionalShadow[_]=j,s.directionalShadowMap[_]=$,s.directionalShadowMatrix[_]=R.shadow.matrix,b++}s.directional[_]=X,_++}else if(R.isSpotLight){let X=e.get(R);X.position.setFromMatrixPosition(R.matrixWorld),X.color.copy(U).multiplyScalar(G*E),X.distance=q,X.coneCos=Math.cos(R.angle),X.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),X.decay=R.decay,s.spot[f]=X;let Z=R.shadow;if(R.map&&(s.spotLightMap[A]=R.map,A++,Z.updateMatrices(R),R.castShadow&&B++),s.spotLightMatrix[f]=Z.matrix,R.castShadow){let j=n.get(R);j.shadowBias=Z.bias,j.shadowNormalBias=Z.normalBias,j.shadowRadius=Z.radius,j.shadowMapSize=Z.mapSize,s.spotShadow[f]=j,s.spotShadowMap[f]=$,T++}f++}else if(R.isRectAreaLight){let X=e.get(R);X.color.copy(U).multiplyScalar(G),X.halfWidth.set(R.width*.5,0,0),X.halfHeight.set(0,R.height*.5,0),s.rectArea[M]=X,M++}else if(R.isPointLight){let X=e.get(R);if(X.color.copy(R.color).multiplyScalar(R.intensity*E),X.distance=R.distance,X.decay=R.decay,R.castShadow){let Z=R.shadow,j=n.get(R);j.shadowBias=Z.bias,j.shadowNormalBias=Z.normalBias,j.shadowRadius=Z.radius,j.shadowMapSize=Z.mapSize,j.shadowCameraNear=Z.camera.near,j.shadowCameraFar=Z.camera.far,s.pointShadow[m]=j,s.pointShadowMap[m]=$,s.pointShadowMatrix[m]=R.shadow.matrix,C++}s.point[m]=X,m++}else if(R.isHemisphereLight){let X=e.get(R);X.skyColor.copy(R.color).multiplyScalar(G*E),X.groundColor.copy(R.groundColor).multiplyScalar(G*E),s.hemi[x]=X,x++}}M>0&&(t.isWebGL2?i.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=rt.LTC_FLOAT_1,s.rectAreaLTC2=rt.LTC_FLOAT_2):(s.rectAreaLTC1=rt.LTC_HALF_1,s.rectAreaLTC2=rt.LTC_HALF_2):i.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=rt.LTC_FLOAT_1,s.rectAreaLTC2=rt.LTC_FLOAT_2):i.has("OES_texture_half_float_linear")===!0?(s.rectAreaLTC1=rt.LTC_HALF_1,s.rectAreaLTC2=rt.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),s.ambient[0]=u,s.ambient[1]=p,s.ambient[2]=g;let N=s.hash;(N.directionalLength!==_||N.pointLength!==m||N.spotLength!==f||N.rectAreaLength!==M||N.hemiLength!==x||N.numDirectionalShadows!==b||N.numPointShadows!==C||N.numSpotShadows!==T||N.numSpotMaps!==A||N.numLightProbes!==y)&&(s.directional.length=_,s.spot.length=f,s.rectArea.length=M,s.point.length=m,s.hemi.length=x,s.directionalShadow.length=b,s.directionalShadowMap.length=b,s.pointShadow.length=C,s.pointShadowMap.length=C,s.spotShadow.length=T,s.spotShadowMap.length=T,s.directionalShadowMatrix.length=b,s.pointShadowMatrix.length=C,s.spotLightMatrix.length=T+A-B,s.spotLightMap.length=A,s.numSpotLightShadowsWithMaps=B,s.numLightProbes=y,N.directionalLength=_,N.pointLength=m,N.spotLength=f,N.rectAreaLength=M,N.hemiLength=x,N.numDirectionalShadows=b,N.numPointShadows=C,N.numSpotShadows=T,N.numSpotMaps=A,N.numLightProbes=y,s.version=$g++)}function c(h,d){let u=0,p=0,g=0,_=0,m=0,f=d.matrixWorldInverse;for(let M=0,x=h.length;M<x;M++){let b=h[M];if(b.isDirectionalLight){let C=s.directional[u];C.direction.setFromMatrixPosition(b.matrixWorld),r.setFromMatrixPosition(b.target.matrixWorld),C.direction.sub(r),C.direction.transformDirection(f),u++}else if(b.isSpotLight){let C=s.spot[g];C.position.setFromMatrixPosition(b.matrixWorld),C.position.applyMatrix4(f),C.direction.setFromMatrixPosition(b.matrixWorld),r.setFromMatrixPosition(b.target.matrixWorld),C.direction.sub(r),C.direction.transformDirection(f),g++}else if(b.isRectAreaLight){let C=s.rectArea[_];C.position.setFromMatrixPosition(b.matrixWorld),C.position.applyMatrix4(f),o.identity(),a.copy(b.matrixWorld),a.premultiply(f),o.extractRotation(a),C.halfWidth.set(b.width*.5,0,0),C.halfHeight.set(0,b.height*.5,0),C.halfWidth.applyMatrix4(o),C.halfHeight.applyMatrix4(o),_++}else if(b.isPointLight){let C=s.point[p];C.position.setFromMatrixPosition(b.matrixWorld),C.position.applyMatrix4(f),p++}else if(b.isHemisphereLight){let C=s.hemi[m];C.direction.setFromMatrixPosition(b.matrixWorld),C.direction.transformDirection(f),m++}}}return{setup:l,setupView:c,state:s}}function Kc(i,t){let e=new Zg(i,t),n=[],s=[];function r(){n.length=0,s.length=0}function a(d){n.push(d)}function o(d){s.push(d)}function l(d){e.setup(n,d)}function c(d){e.setupView(n,d)}return{init:r,state:{lightsArray:n,shadowsArray:s,lights:e},setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function Kg(i,t){let e=new WeakMap;function n(r,a=0){let o=e.get(r),l;return o===void 0?(l=new Kc(i,t),e.set(r,[l])):a>=o.length?(l=new Kc(i,t),o.push(l)):l=o[a],l}function s(){e=new WeakMap}return{get:n,dispose:s}}var Eo=class extends Ei{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=nd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},To=class extends Ei{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}},Jg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,jg=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Qg(i,t,e){let n=new Ns,s=new gt,r=new gt,a=new Le,o=new Eo({depthPacking:id}),l=new To,c={},h=e.maxTextureSize,d={[ni]:qe,[qe]:ni,[Fn]:Fn},u=new Hn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new gt},radius:{value:4}},vertexShader:Jg,fragmentShader:jg}),p=u.clone();p.defines.HORIZONTAL_PASS=1;let g=new ln;g.setAttribute("position",new je(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new Qt(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Kr;let f=this.type;this.render=function(T,A,B){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;let y=i.getRenderTarget(),E=i.getActiveCubeFace(),N=i.getActiveMipmapLevel(),W=i.state;W.setBlending(Qn),W.buffers.color.setClear(1,1,1,1),W.buffers.depth.setTest(!0),W.setScissorTest(!1);let Y=f!==Un&&this.type===Un,R=f===Un&&this.type!==Un;for(let U=0,G=T.length;U<G;U++){let q=T[U],$=q.shadow;if($===void 0){console.warn("THREE.WebGLShadowMap:",q,"has no shadow.");continue}if($.autoUpdate===!1&&$.needsUpdate===!1)continue;s.copy($.mapSize);let X=$.getFrameExtents();if(s.multiply(X),r.copy($.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/X.x),s.x=r.x*X.x,$.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/X.y),s.y=r.y*X.y,$.mapSize.y=r.y)),$.map===null||Y===!0||R===!0){let j=this.type!==Un?{minFilter:Ve,magFilter:Ve}:{};$.map!==null&&$.map.dispose(),$.map=new Bn(s.x,s.y,j),$.map.texture.name=q.name+".shadowMap",$.camera.updateProjectionMatrix()}i.setRenderTarget($.map),i.clear();let Z=$.getViewportCount();for(let j=0;j<Z;j++){let it=$.getViewport(j);a.set(r.x*it.x,r.y*it.y,r.x*it.z,r.y*it.w),W.viewport(a),$.updateMatrices(q,j),n=$.getFrustum(),b(A,B,$.camera,q,this.type)}$.isPointLightShadow!==!0&&this.type===Un&&M($,B),$.needsUpdate=!1}f=this.type,m.needsUpdate=!1,i.setRenderTarget(y,E,N)};function M(T,A){let B=t.update(_);u.defines.VSM_SAMPLES!==T.blurSamples&&(u.defines.VSM_SAMPLES=T.blurSamples,p.defines.VSM_SAMPLES=T.blurSamples,u.needsUpdate=!0,p.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new Bn(s.x,s.y)),u.uniforms.shadow_pass.value=T.map.texture,u.uniforms.resolution.value=T.mapSize,u.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(A,null,B,u,_,null),p.uniforms.shadow_pass.value=T.mapPass.texture,p.uniforms.resolution.value=T.mapSize,p.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(A,null,B,p,_,null)}function x(T,A,B,y){let E=null,N=B.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(N!==void 0)E=N;else if(E=B.isPointLight===!0?l:o,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){let W=E.uuid,Y=A.uuid,R=c[W];R===void 0&&(R={},c[W]=R);let U=R[Y];U===void 0&&(U=E.clone(),R[Y]=U,A.addEventListener("dispose",C)),E=U}if(E.visible=A.visible,E.wireframe=A.wireframe,y===Un?E.side=A.shadowSide!==null?A.shadowSide:A.side:E.side=A.shadowSide!==null?A.shadowSide:d[A.side],E.alphaMap=A.alphaMap,E.alphaTest=A.alphaTest,E.map=A.map,E.clipShadows=A.clipShadows,E.clippingPlanes=A.clippingPlanes,E.clipIntersection=A.clipIntersection,E.displacementMap=A.displacementMap,E.displacementScale=A.displacementScale,E.displacementBias=A.displacementBias,E.wireframeLinewidth=A.wireframeLinewidth,E.linewidth=A.linewidth,B.isPointLight===!0&&E.isMeshDistanceMaterial===!0){let W=i.properties.get(E);W.light=B}return E}function b(T,A,B,y,E){if(T.visible===!1)return;if(T.layers.test(A.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&E===Un)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,T.matrixWorld);let Y=t.update(T),R=T.material;if(Array.isArray(R)){let U=Y.groups;for(let G=0,q=U.length;G<q;G++){let $=U[G],X=R[$.materialIndex];if(X&&X.visible){let Z=x(T,X,y,E);T.onBeforeShadow(i,T,A,B,Y,Z,$),i.renderBufferDirect(B,null,Y,Z,T,$),T.onAfterShadow(i,T,A,B,Y,Z,$)}}}else if(R.visible){let U=x(T,R,y,E);T.onBeforeShadow(i,T,A,B,Y,U,null),i.renderBufferDirect(B,null,Y,U,T,null),T.onAfterShadow(i,T,A,B,Y,U,null)}}let W=T.children;for(let Y=0,R=W.length;Y<R;Y++)b(W[Y],A,B,y,E)}function C(T){T.target.removeEventListener("dispose",C);for(let B in c){let y=c[B],E=T.target.uuid;E in y&&(y[E].dispose(),delete y[E])}}}function t0(i,t,e){let n=e.isWebGL2;function s(){let P=!1,ot=new Le,lt=null,Lt=new Le(0,0,0,0);return{setMask:function(Tt){lt!==Tt&&!P&&(i.colorMask(Tt,Tt,Tt,Tt),lt=Tt)},setLocked:function(Tt){P=Tt},setClear:function(Tt,se,re,Ce,Be){Be===!0&&(Tt*=Ce,se*=Ce,re*=Ce),ot.set(Tt,se,re,Ce),Lt.equals(ot)===!1&&(i.clearColor(Tt,se,re,Ce),Lt.copy(ot))},reset:function(){P=!1,lt=null,Lt.set(-1,0,0,0)}}}function r(){let P=!1,ot=null,lt=null,Lt=null;return{setTest:function(Tt){Tt?Dt(i.DEPTH_TEST):St(i.DEPTH_TEST)},setMask:function(Tt){ot!==Tt&&!P&&(i.depthMask(Tt),ot=Tt)},setFunc:function(Tt){if(lt!==Tt){switch(Tt){case Iu:i.depthFunc(i.NEVER);break;case Du:i.depthFunc(i.ALWAYS);break;case Uu:i.depthFunc(i.LESS);break;case vr:i.depthFunc(i.LEQUAL);break;case Nu:i.depthFunc(i.EQUAL);break;case Fu:i.depthFunc(i.GEQUAL);break;case Ou:i.depthFunc(i.GREATER);break;case ku:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}lt=Tt}},setLocked:function(Tt){P=Tt},setClear:function(Tt){Lt!==Tt&&(i.clearDepth(Tt),Lt=Tt)},reset:function(){P=!1,ot=null,lt=null,Lt=null}}}function a(){let P=!1,ot=null,lt=null,Lt=null,Tt=null,se=null,re=null,Ce=null,Be=null;return{setTest:function(ae){P||(ae?Dt(i.STENCIL_TEST):St(i.STENCIL_TEST))},setMask:function(ae){ot!==ae&&!P&&(i.stencilMask(ae),ot=ae)},setFunc:function(ae,ze,vn){(lt!==ae||Lt!==ze||Tt!==vn)&&(i.stencilFunc(ae,ze,vn),lt=ae,Lt=ze,Tt=vn)},setOp:function(ae,ze,vn){(se!==ae||re!==ze||Ce!==vn)&&(i.stencilOp(ae,ze,vn),se=ae,re=ze,Ce=vn)},setLocked:function(ae){P=ae},setClear:function(ae){Be!==ae&&(i.clearStencil(ae),Be=ae)},reset:function(){P=!1,ot=null,lt=null,Lt=null,Tt=null,se=null,re=null,Ce=null,Be=null}}}let o=new s,l=new r,c=new a,h=new WeakMap,d=new WeakMap,u={},p={},g=new WeakMap,_=[],m=null,f=!1,M=null,x=null,b=null,C=null,T=null,A=null,B=null,y=new qt(0,0,0),E=0,N=!1,W=null,Y=null,R=null,U=null,G=null,q=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),$=!1,X=0,Z=i.getParameter(i.VERSION);Z.indexOf("WebGL")!==-1?(X=parseFloat(/^WebGL (\d)/.exec(Z)[1]),$=X>=1):Z.indexOf("OpenGL ES")!==-1&&(X=parseFloat(/^OpenGL ES (\d)/.exec(Z)[1]),$=X>=2);let j=null,it={},H=i.getParameter(i.SCISSOR_BOX),K=i.getParameter(i.VIEWPORT),ct=new Le().fromArray(H),xt=new Le().fromArray(K);function ft(P,ot,lt,Lt){let Tt=new Uint8Array(4),se=i.createTexture();i.bindTexture(P,se),i.texParameteri(P,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(P,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let re=0;re<lt;re++)n&&(P===i.TEXTURE_3D||P===i.TEXTURE_2D_ARRAY)?i.texImage3D(ot,0,i.RGBA,1,1,Lt,0,i.RGBA,i.UNSIGNED_BYTE,Tt):i.texImage2D(ot+re,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Tt);return se}let Nt={};Nt[i.TEXTURE_2D]=ft(i.TEXTURE_2D,i.TEXTURE_2D,1),Nt[i.TEXTURE_CUBE_MAP]=ft(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(Nt[i.TEXTURE_2D_ARRAY]=ft(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Nt[i.TEXTURE_3D]=ft(i.TEXTURE_3D,i.TEXTURE_3D,1,1)),o.setClear(0,0,0,1),l.setClear(1),c.setClear(0),Dt(i.DEPTH_TEST),l.setFunc(vr),Gt(!1),w(Rl),Dt(i.CULL_FACE),yt(Qn);function Dt(P){u[P]!==!0&&(i.enable(P),u[P]=!0)}function St(P){u[P]!==!1&&(i.disable(P),u[P]=!1)}function Kt(P,ot){return p[P]!==ot?(i.bindFramebuffer(P,ot),p[P]=ot,n&&(P===i.DRAW_FRAMEBUFFER&&(p[i.FRAMEBUFFER]=ot),P===i.FRAMEBUFFER&&(p[i.DRAW_FRAMEBUFFER]=ot)),!0):!1}function F(P,ot){let lt=_,Lt=!1;if(P)if(lt=g.get(ot),lt===void 0&&(lt=[],g.set(ot,lt)),P.isWebGLMultipleRenderTargets){let Tt=P.texture;if(lt.length!==Tt.length||lt[0]!==i.COLOR_ATTACHMENT0){for(let se=0,re=Tt.length;se<re;se++)lt[se]=i.COLOR_ATTACHMENT0+se;lt.length=Tt.length,Lt=!0}}else lt[0]!==i.COLOR_ATTACHMENT0&&(lt[0]=i.COLOR_ATTACHMENT0,Lt=!0);else lt[0]!==i.BACK&&(lt[0]=i.BACK,Lt=!0);Lt&&(e.isWebGL2?i.drawBuffers(lt):t.get("WEBGL_draw_buffers").drawBuffersWEBGL(lt))}function ke(P){return m!==P?(i.useProgram(P),m=P,!0):!1}let Et={[yi]:i.FUNC_ADD,[_u]:i.FUNC_SUBTRACT,[xu]:i.FUNC_REVERSE_SUBTRACT};if(n)Et[Dl]=i.MIN,Et[Ul]=i.MAX;else{let P=t.get("EXT_blend_minmax");P!==null&&(Et[Dl]=P.MIN_EXT,Et[Ul]=P.MAX_EXT)}let Ot={[yu]:i.ZERO,[vu]:i.ONE,[Mu]:i.SRC_COLOR,[ro]:i.SRC_ALPHA,[Au]:i.SRC_ALPHA_SATURATE,[Eu]:i.DST_COLOR,[Su]:i.DST_ALPHA,[bu]:i.ONE_MINUS_SRC_COLOR,[ao]:i.ONE_MINUS_SRC_ALPHA,[Tu]:i.ONE_MINUS_DST_COLOR,[wu]:i.ONE_MINUS_DST_ALPHA,[Cu]:i.CONSTANT_COLOR,[Ru]:i.ONE_MINUS_CONSTANT_COLOR,[Pu]:i.CONSTANT_ALPHA,[Lu]:i.ONE_MINUS_CONSTANT_ALPHA};function yt(P,ot,lt,Lt,Tt,se,re,Ce,Be,ae){if(P===Qn){f===!0&&(St(i.BLEND),f=!1);return}if(f===!1&&(Dt(i.BLEND),f=!0),P!==gu){if(P!==M||ae!==N){if((x!==yi||T!==yi)&&(i.blendEquation(i.FUNC_ADD),x=yi,T=yi),ae)switch(P){case es:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Pl:i.blendFunc(i.ONE,i.ONE);break;case Ll:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Il:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",P);break}else switch(P){case es:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Pl:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Ll:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Il:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",P);break}b=null,C=null,A=null,B=null,y.set(0,0,0),E=0,M=P,N=ae}return}Tt=Tt||ot,se=se||lt,re=re||Lt,(ot!==x||Tt!==T)&&(i.blendEquationSeparate(Et[ot],Et[Tt]),x=ot,T=Tt),(lt!==b||Lt!==C||se!==A||re!==B)&&(i.blendFuncSeparate(Ot[lt],Ot[Lt],Ot[se],Ot[re]),b=lt,C=Lt,A=se,B=re),(Ce.equals(y)===!1||Be!==E)&&(i.blendColor(Ce.r,Ce.g,Ce.b,Be),y.copy(Ce),E=Be),M=P,N=!1}function fe(P,ot){P.side===Fn?St(i.CULL_FACE):Dt(i.CULL_FACE);let lt=P.side===qe;ot&&(lt=!lt),Gt(lt),P.blending===es&&P.transparent===!1?yt(Qn):yt(P.blending,P.blendEquation,P.blendSrc,P.blendDst,P.blendEquationAlpha,P.blendSrcAlpha,P.blendDstAlpha,P.blendColor,P.blendAlpha,P.premultipliedAlpha),l.setFunc(P.depthFunc),l.setTest(P.depthTest),l.setMask(P.depthWrite),o.setMask(P.colorWrite);let Lt=P.stencilWrite;c.setTest(Lt),Lt&&(c.setMask(P.stencilWriteMask),c.setFunc(P.stencilFunc,P.stencilRef,P.stencilFuncMask),c.setOp(P.stencilFail,P.stencilZFail,P.stencilZPass)),k(P.polygonOffset,P.polygonOffsetFactor,P.polygonOffsetUnits),P.alphaToCoverage===!0?Dt(i.SAMPLE_ALPHA_TO_COVERAGE):St(i.SAMPLE_ALPHA_TO_COVERAGE)}function Gt(P){W!==P&&(P?i.frontFace(i.CW):i.frontFace(i.CCW),W=P)}function w(P){P!==fu?(Dt(i.CULL_FACE),P!==Y&&(P===Rl?i.cullFace(i.BACK):P===pu?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):St(i.CULL_FACE),Y=P}function v(P){P!==R&&($&&i.lineWidth(P),R=P)}function k(P,ot,lt){P?(Dt(i.POLYGON_OFFSET_FILL),(U!==ot||G!==lt)&&(i.polygonOffset(ot,lt),U=ot,G=lt)):St(i.POLYGON_OFFSET_FILL)}function et(P){P?Dt(i.SCISSOR_TEST):St(i.SCISSOR_TEST)}function tt(P){P===void 0&&(P=i.TEXTURE0+q-1),j!==P&&(i.activeTexture(P),j=P)}function nt(P,ot,lt){lt===void 0&&(j===null?lt=i.TEXTURE0+q-1:lt=j);let Lt=it[lt];Lt===void 0&&(Lt={type:void 0,texture:void 0},it[lt]=Lt),(Lt.type!==P||Lt.texture!==ot)&&(j!==lt&&(i.activeTexture(lt),j=lt),i.bindTexture(P,ot||Nt[P]),Lt.type=P,Lt.texture=ot)}function vt(){let P=it[j];P!==void 0&&P.type!==void 0&&(i.bindTexture(P.type,null),P.type=void 0,P.texture=void 0)}function ht(){try{i.compressedTexImage2D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function pt(){try{i.compressedTexImage3D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Rt(){try{i.texSubImage2D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Wt(){try{i.texSubImage3D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Q(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function ee(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Jt(){try{i.texStorage2D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Ft(){try{i.texStorage3D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function wt(){try{i.texImage2D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function mt(){try{i.texImage3D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Ht(P){ct.equals(P)===!1&&(i.scissor(P.x,P.y,P.z,P.w),ct.copy(P))}function te(P){xt.equals(P)===!1&&(i.viewport(P.x,P.y,P.z,P.w),xt.copy(P))}function ge(P,ot){let lt=d.get(ot);lt===void 0&&(lt=new WeakMap,d.set(ot,lt));let Lt=lt.get(P);Lt===void 0&&(Lt=i.getUniformBlockIndex(ot,P.name),lt.set(P,Lt))}function $t(P,ot){let Lt=d.get(ot).get(P);h.get(ot)!==Lt&&(i.uniformBlockBinding(ot,Lt,P.__bindingPointIndex),h.set(ot,Lt))}function st(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),n===!0&&(i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null)),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},j=null,it={},p={},g=new WeakMap,_=[],m=null,f=!1,M=null,x=null,b=null,C=null,T=null,A=null,B=null,y=new qt(0,0,0),E=0,N=!1,W=null,Y=null,R=null,U=null,G=null,ct.set(0,0,i.canvas.width,i.canvas.height),xt.set(0,0,i.canvas.width,i.canvas.height),o.reset(),l.reset(),c.reset()}return{buffers:{color:o,depth:l,stencil:c},enable:Dt,disable:St,bindFramebuffer:Kt,drawBuffers:F,useProgram:ke,setBlending:yt,setMaterial:fe,setFlipSided:Gt,setCullFace:w,setLineWidth:v,setPolygonOffset:k,setScissorTest:et,activeTexture:tt,bindTexture:nt,unbindTexture:vt,compressedTexImage2D:ht,compressedTexImage3D:pt,texImage2D:wt,texImage3D:mt,updateUBOMapping:ge,uniformBlockBinding:$t,texStorage2D:Jt,texStorage3D:Ft,texSubImage2D:Rt,texSubImage3D:Wt,compressedTexSubImage2D:Q,compressedTexSubImage3D:ee,scissor:Ht,viewport:te,reset:st}}function e0(i,t,e,n,s,r,a){let o=s.isWebGL2,l=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new WeakMap,d,u=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(w,v){return p?new OffscreenCanvas(w,v):Ar("canvas")}function _(w,v,k,et){let tt=1;if((w.width>et||w.height>et)&&(tt=et/Math.max(w.width,w.height)),tt<1||v===!0)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap){let nt=v?fo:Math.floor,vt=nt(tt*w.width),ht=nt(tt*w.height);d===void 0&&(d=g(vt,ht));let pt=k?g(vt,ht):d;return pt.width=vt,pt.height=ht,pt.getContext("2d").drawImage(w,0,0,vt,ht),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+w.width+"x"+w.height+") to ("+vt+"x"+ht+")."),pt}else return"data"in w&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+w.width+"x"+w.height+")."),w;return w}function m(w){return fc(w.width)&&fc(w.height)}function f(w){return o?!1:w.wrapS!==fn||w.wrapT!==fn||w.minFilter!==Ve&&w.minFilter!==rn}function M(w,v){return w.generateMipmaps&&v&&w.minFilter!==Ve&&w.minFilter!==rn}function x(w){i.generateMipmap(w)}function b(w,v,k,et,tt=!1){if(o===!1)return v;if(w!==null){if(i[w]!==void 0)return i[w];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let nt=v;if(v===i.RED&&(k===i.FLOAT&&(nt=i.R32F),k===i.HALF_FLOAT&&(nt=i.R16F),k===i.UNSIGNED_BYTE&&(nt=i.R8)),v===i.RED_INTEGER&&(k===i.UNSIGNED_BYTE&&(nt=i.R8UI),k===i.UNSIGNED_SHORT&&(nt=i.R16UI),k===i.UNSIGNED_INT&&(nt=i.R32UI),k===i.BYTE&&(nt=i.R8I),k===i.SHORT&&(nt=i.R16I),k===i.INT&&(nt=i.R32I)),v===i.RG&&(k===i.FLOAT&&(nt=i.RG32F),k===i.HALF_FLOAT&&(nt=i.RG16F),k===i.UNSIGNED_BYTE&&(nt=i.RG8)),v===i.RGBA){let vt=tt?Sr:ne.getTransfer(et);k===i.FLOAT&&(nt=i.RGBA32F),k===i.HALF_FLOAT&&(nt=i.RGBA16F),k===i.UNSIGNED_BYTE&&(nt=vt===le?i.SRGB8_ALPHA8:i.RGBA8),k===i.UNSIGNED_SHORT_4_4_4_4&&(nt=i.RGBA4),k===i.UNSIGNED_SHORT_5_5_5_1&&(nt=i.RGB5_A1)}return(nt===i.R16F||nt===i.R32F||nt===i.RG16F||nt===i.RG32F||nt===i.RGBA16F||nt===i.RGBA32F)&&t.get("EXT_color_buffer_float"),nt}function C(w,v,k){return M(w,k)===!0||w.isFramebufferTexture&&w.minFilter!==Ve&&w.minFilter!==rn?Math.log2(Math.max(v.width,v.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?v.mipmaps.length:1}function T(w){return w===Ve||w===Nl||w===wa?i.NEAREST:i.LINEAR}function A(w){let v=w.target;v.removeEventListener("dispose",A),y(v),v.isVideoTexture&&h.delete(v)}function B(w){let v=w.target;v.removeEventListener("dispose",B),N(v)}function y(w){let v=n.get(w);if(v.__webglInit===void 0)return;let k=w.source,et=u.get(k);if(et){let tt=et[v.__cacheKey];tt.usedTimes--,tt.usedTimes===0&&E(w),Object.keys(et).length===0&&u.delete(k)}n.remove(w)}function E(w){let v=n.get(w);i.deleteTexture(v.__webglTexture);let k=w.source,et=u.get(k);delete et[v.__cacheKey],a.memory.textures--}function N(w){let v=w.texture,k=n.get(w),et=n.get(v);if(et.__webglTexture!==void 0&&(i.deleteTexture(et.__webglTexture),a.memory.textures--),w.depthTexture&&w.depthTexture.dispose(),w.isWebGLCubeRenderTarget)for(let tt=0;tt<6;tt++){if(Array.isArray(k.__webglFramebuffer[tt]))for(let nt=0;nt<k.__webglFramebuffer[tt].length;nt++)i.deleteFramebuffer(k.__webglFramebuffer[tt][nt]);else i.deleteFramebuffer(k.__webglFramebuffer[tt]);k.__webglDepthbuffer&&i.deleteRenderbuffer(k.__webglDepthbuffer[tt])}else{if(Array.isArray(k.__webglFramebuffer))for(let tt=0;tt<k.__webglFramebuffer.length;tt++)i.deleteFramebuffer(k.__webglFramebuffer[tt]);else i.deleteFramebuffer(k.__webglFramebuffer);if(k.__webglDepthbuffer&&i.deleteRenderbuffer(k.__webglDepthbuffer),k.__webglMultisampledFramebuffer&&i.deleteFramebuffer(k.__webglMultisampledFramebuffer),k.__webglColorRenderbuffer)for(let tt=0;tt<k.__webglColorRenderbuffer.length;tt++)k.__webglColorRenderbuffer[tt]&&i.deleteRenderbuffer(k.__webglColorRenderbuffer[tt]);k.__webglDepthRenderbuffer&&i.deleteRenderbuffer(k.__webglDepthRenderbuffer)}if(w.isWebGLMultipleRenderTargets)for(let tt=0,nt=v.length;tt<nt;tt++){let vt=n.get(v[tt]);vt.__webglTexture&&(i.deleteTexture(vt.__webglTexture),a.memory.textures--),n.remove(v[tt])}n.remove(v),n.remove(w)}let W=0;function Y(){W=0}function R(){let w=W;return w>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+s.maxTextures),W+=1,w}function U(w){let v=[];return v.push(w.wrapS),v.push(w.wrapT),v.push(w.wrapR||0),v.push(w.magFilter),v.push(w.minFilter),v.push(w.anisotropy),v.push(w.internalFormat),v.push(w.format),v.push(w.type),v.push(w.generateMipmaps),v.push(w.premultiplyAlpha),v.push(w.flipY),v.push(w.unpackAlignment),v.push(w.colorSpace),v.join()}function G(w,v){let k=n.get(w);if(w.isVideoTexture&&fe(w),w.isRenderTargetTexture===!1&&w.version>0&&k.__version!==w.version){let et=w.image;if(et===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(et.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ct(k,w,v);return}}e.bindTexture(i.TEXTURE_2D,k.__webglTexture,i.TEXTURE0+v)}function q(w,v){let k=n.get(w);if(w.version>0&&k.__version!==w.version){ct(k,w,v);return}e.bindTexture(i.TEXTURE_2D_ARRAY,k.__webglTexture,i.TEXTURE0+v)}function $(w,v){let k=n.get(w);if(w.version>0&&k.__version!==w.version){ct(k,w,v);return}e.bindTexture(i.TEXTURE_3D,k.__webglTexture,i.TEXTURE0+v)}function X(w,v){let k=n.get(w);if(w.version>0&&k.__version!==w.version){xt(k,w,v);return}e.bindTexture(i.TEXTURE_CUBE_MAP,k.__webglTexture,i.TEXTURE0+v)}let Z={[Is]:i.REPEAT,[fn]:i.CLAMP_TO_EDGE,[co]:i.MIRRORED_REPEAT},j={[Ve]:i.NEAREST,[Nl]:i.NEAREST_MIPMAP_NEAREST,[wa]:i.NEAREST_MIPMAP_LINEAR,[rn]:i.LINEAR,[$u]:i.LINEAR_MIPMAP_NEAREST,[Ds]:i.LINEAR_MIPMAP_LINEAR},it={[rd]:i.NEVER,[ud]:i.ALWAYS,[ad]:i.LESS,[fh]:i.LEQUAL,[od]:i.EQUAL,[hd]:i.GEQUAL,[ld]:i.GREATER,[cd]:i.NOTEQUAL};function H(w,v,k){if(k?(i.texParameteri(w,i.TEXTURE_WRAP_S,Z[v.wrapS]),i.texParameteri(w,i.TEXTURE_WRAP_T,Z[v.wrapT]),(w===i.TEXTURE_3D||w===i.TEXTURE_2D_ARRAY)&&i.texParameteri(w,i.TEXTURE_WRAP_R,Z[v.wrapR]),i.texParameteri(w,i.TEXTURE_MAG_FILTER,j[v.magFilter]),i.texParameteri(w,i.TEXTURE_MIN_FILTER,j[v.minFilter])):(i.texParameteri(w,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(w,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),(w===i.TEXTURE_3D||w===i.TEXTURE_2D_ARRAY)&&i.texParameteri(w,i.TEXTURE_WRAP_R,i.CLAMP_TO_EDGE),(v.wrapS!==fn||v.wrapT!==fn)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),i.texParameteri(w,i.TEXTURE_MAG_FILTER,T(v.magFilter)),i.texParameteri(w,i.TEXTURE_MIN_FILTER,T(v.minFilter)),v.minFilter!==Ve&&v.minFilter!==rn&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),v.compareFunction&&(i.texParameteri(w,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(w,i.TEXTURE_COMPARE_FUNC,it[v.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){let et=t.get("EXT_texture_filter_anisotropic");if(v.magFilter===Ve||v.minFilter!==wa&&v.minFilter!==Ds||v.type===jn&&t.has("OES_texture_float_linear")===!1||o===!1&&v.type===Us&&t.has("OES_texture_half_float_linear")===!1)return;(v.anisotropy>1||n.get(v).__currentAnisotropy)&&(i.texParameterf(w,et.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy)}}function K(w,v){let k=!1;w.__webglInit===void 0&&(w.__webglInit=!0,v.addEventListener("dispose",A));let et=v.source,tt=u.get(et);tt===void 0&&(tt={},u.set(et,tt));let nt=U(v);if(nt!==w.__cacheKey){tt[nt]===void 0&&(tt[nt]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,k=!0),tt[nt].usedTimes++;let vt=tt[w.__cacheKey];vt!==void 0&&(tt[w.__cacheKey].usedTimes--,vt.usedTimes===0&&E(v)),w.__cacheKey=nt,w.__webglTexture=tt[nt].texture}return k}function ct(w,v,k){let et=i.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(et=i.TEXTURE_2D_ARRAY),v.isData3DTexture&&(et=i.TEXTURE_3D);let tt=K(w,v),nt=v.source;e.bindTexture(et,w.__webglTexture,i.TEXTURE0+k);let vt=n.get(nt);if(nt.version!==vt.__version||tt===!0){e.activeTexture(i.TEXTURE0+k);let ht=ne.getPrimaries(ne.workingColorSpace),pt=v.colorSpace===an?null:ne.getPrimaries(v.colorSpace),Rt=v.colorSpace===an||ht===pt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Rt);let Wt=f(v)&&m(v.image)===!1,Q=_(v.image,Wt,!1,s.maxTextureSize);Q=Gt(v,Q);let ee=m(Q)||o,Jt=r.convert(v.format,v.colorSpace),Ft=r.convert(v.type),wt=b(v.internalFormat,Jt,Ft,v.colorSpace,v.isVideoTexture);H(et,v,ee);let mt,Ht=v.mipmaps,te=o&&v.isVideoTexture!==!0&&wt!==hh,ge=vt.__version===void 0||tt===!0,$t=C(v,Q,ee);if(v.isDepthTexture)wt=i.DEPTH_COMPONENT,o?v.type===jn?wt=i.DEPTH_COMPONENT32F:v.type===Jn?wt=i.DEPTH_COMPONENT24:v.type===Mi?wt=i.DEPTH24_STENCIL8:wt=i.DEPTH_COMPONENT16:v.type===jn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),v.format===bi&&wt===i.DEPTH_COMPONENT&&v.type!==jo&&v.type!==Jn&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),v.type=Jn,Ft=r.convert(v.type)),v.format===as&&wt===i.DEPTH_COMPONENT&&(wt=i.DEPTH_STENCIL,v.type!==Mi&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),v.type=Mi,Ft=r.convert(v.type))),ge&&(te?e.texStorage2D(i.TEXTURE_2D,1,wt,Q.width,Q.height):e.texImage2D(i.TEXTURE_2D,0,wt,Q.width,Q.height,0,Jt,Ft,null));else if(v.isDataTexture)if(Ht.length>0&&ee){te&&ge&&e.texStorage2D(i.TEXTURE_2D,$t,wt,Ht[0].width,Ht[0].height);for(let st=0,P=Ht.length;st<P;st++)mt=Ht[st],te?e.texSubImage2D(i.TEXTURE_2D,st,0,0,mt.width,mt.height,Jt,Ft,mt.data):e.texImage2D(i.TEXTURE_2D,st,wt,mt.width,mt.height,0,Jt,Ft,mt.data);v.generateMipmaps=!1}else te?(ge&&e.texStorage2D(i.TEXTURE_2D,$t,wt,Q.width,Q.height),e.texSubImage2D(i.TEXTURE_2D,0,0,0,Q.width,Q.height,Jt,Ft,Q.data)):e.texImage2D(i.TEXTURE_2D,0,wt,Q.width,Q.height,0,Jt,Ft,Q.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){te&&ge&&e.texStorage3D(i.TEXTURE_2D_ARRAY,$t,wt,Ht[0].width,Ht[0].height,Q.depth);for(let st=0,P=Ht.length;st<P;st++)mt=Ht[st],v.format!==pn?Jt!==null?te?e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,st,0,0,0,mt.width,mt.height,Q.depth,Jt,mt.data,0,0):e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,st,wt,mt.width,mt.height,Q.depth,0,mt.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):te?e.texSubImage3D(i.TEXTURE_2D_ARRAY,st,0,0,0,mt.width,mt.height,Q.depth,Jt,Ft,mt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,st,wt,mt.width,mt.height,Q.depth,0,Jt,Ft,mt.data)}else{te&&ge&&e.texStorage2D(i.TEXTURE_2D,$t,wt,Ht[0].width,Ht[0].height);for(let st=0,P=Ht.length;st<P;st++)mt=Ht[st],v.format!==pn?Jt!==null?te?e.compressedTexSubImage2D(i.TEXTURE_2D,st,0,0,mt.width,mt.height,Jt,mt.data):e.compressedTexImage2D(i.TEXTURE_2D,st,wt,mt.width,mt.height,0,mt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):te?e.texSubImage2D(i.TEXTURE_2D,st,0,0,mt.width,mt.height,Jt,Ft,mt.data):e.texImage2D(i.TEXTURE_2D,st,wt,mt.width,mt.height,0,Jt,Ft,mt.data)}else if(v.isDataArrayTexture)te?(ge&&e.texStorage3D(i.TEXTURE_2D_ARRAY,$t,wt,Q.width,Q.height,Q.depth),e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,Jt,Ft,Q.data)):e.texImage3D(i.TEXTURE_2D_ARRAY,0,wt,Q.width,Q.height,Q.depth,0,Jt,Ft,Q.data);else if(v.isData3DTexture)te?(ge&&e.texStorage3D(i.TEXTURE_3D,$t,wt,Q.width,Q.height,Q.depth),e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,Jt,Ft,Q.data)):e.texImage3D(i.TEXTURE_3D,0,wt,Q.width,Q.height,Q.depth,0,Jt,Ft,Q.data);else if(v.isFramebufferTexture){if(ge)if(te)e.texStorage2D(i.TEXTURE_2D,$t,wt,Q.width,Q.height);else{let st=Q.width,P=Q.height;for(let ot=0;ot<$t;ot++)e.texImage2D(i.TEXTURE_2D,ot,wt,st,P,0,Jt,Ft,null),st>>=1,P>>=1}}else if(Ht.length>0&&ee){te&&ge&&e.texStorage2D(i.TEXTURE_2D,$t,wt,Ht[0].width,Ht[0].height);for(let st=0,P=Ht.length;st<P;st++)mt=Ht[st],te?e.texSubImage2D(i.TEXTURE_2D,st,0,0,Jt,Ft,mt):e.texImage2D(i.TEXTURE_2D,st,wt,Jt,Ft,mt);v.generateMipmaps=!1}else te?(ge&&e.texStorage2D(i.TEXTURE_2D,$t,wt,Q.width,Q.height),e.texSubImage2D(i.TEXTURE_2D,0,0,0,Jt,Ft,Q)):e.texImage2D(i.TEXTURE_2D,0,wt,Jt,Ft,Q);M(v,ee)&&x(et),vt.__version=nt.version,v.onUpdate&&v.onUpdate(v)}w.__version=v.version}function xt(w,v,k){if(v.image.length!==6)return;let et=K(w,v),tt=v.source;e.bindTexture(i.TEXTURE_CUBE_MAP,w.__webglTexture,i.TEXTURE0+k);let nt=n.get(tt);if(tt.version!==nt.__version||et===!0){e.activeTexture(i.TEXTURE0+k);let vt=ne.getPrimaries(ne.workingColorSpace),ht=v.colorSpace===an?null:ne.getPrimaries(v.colorSpace),pt=v.colorSpace===an||vt===ht?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,pt);let Rt=v.isCompressedTexture||v.image[0].isCompressedTexture,Wt=v.image[0]&&v.image[0].isDataTexture,Q=[];for(let st=0;st<6;st++)!Rt&&!Wt?Q[st]=_(v.image[st],!1,!0,s.maxCubemapSize):Q[st]=Wt?v.image[st].image:v.image[st],Q[st]=Gt(v,Q[st]);let ee=Q[0],Jt=m(ee)||o,Ft=r.convert(v.format,v.colorSpace),wt=r.convert(v.type),mt=b(v.internalFormat,Ft,wt,v.colorSpace),Ht=o&&v.isVideoTexture!==!0,te=nt.__version===void 0||et===!0,ge=C(v,ee,Jt);H(i.TEXTURE_CUBE_MAP,v,Jt);let $t;if(Rt){Ht&&te&&e.texStorage2D(i.TEXTURE_CUBE_MAP,ge,mt,ee.width,ee.height);for(let st=0;st<6;st++){$t=Q[st].mipmaps;for(let P=0;P<$t.length;P++){let ot=$t[P];v.format!==pn?Ft!==null?Ht?e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,P,0,0,ot.width,ot.height,Ft,ot.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,P,mt,ot.width,ot.height,0,ot.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ht?e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,P,0,0,ot.width,ot.height,Ft,wt,ot.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,P,mt,ot.width,ot.height,0,Ft,wt,ot.data)}}}else{$t=v.mipmaps,Ht&&te&&($t.length>0&&ge++,e.texStorage2D(i.TEXTURE_CUBE_MAP,ge,mt,Q[0].width,Q[0].height));for(let st=0;st<6;st++)if(Wt){Ht?e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,0,0,Q[st].width,Q[st].height,Ft,wt,Q[st].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,mt,Q[st].width,Q[st].height,0,Ft,wt,Q[st].data);for(let P=0;P<$t.length;P++){let lt=$t[P].image[st].image;Ht?e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,P+1,0,0,lt.width,lt.height,Ft,wt,lt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,P+1,mt,lt.width,lt.height,0,Ft,wt,lt.data)}}else{Ht?e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,0,0,Ft,wt,Q[st]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,mt,Ft,wt,Q[st]);for(let P=0;P<$t.length;P++){let ot=$t[P];Ht?e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,P+1,0,0,Ft,wt,ot.image[st]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,P+1,mt,Ft,wt,ot.image[st])}}}M(v,Jt)&&x(i.TEXTURE_CUBE_MAP),nt.__version=tt.version,v.onUpdate&&v.onUpdate(v)}w.__version=v.version}function ft(w,v,k,et,tt,nt){let vt=r.convert(k.format,k.colorSpace),ht=r.convert(k.type),pt=b(k.internalFormat,vt,ht,k.colorSpace);if(!n.get(v).__hasExternalTextures){let Wt=Math.max(1,v.width>>nt),Q=Math.max(1,v.height>>nt);tt===i.TEXTURE_3D||tt===i.TEXTURE_2D_ARRAY?e.texImage3D(tt,nt,pt,Wt,Q,v.depth,0,vt,ht,null):e.texImage2D(tt,nt,pt,Wt,Q,0,vt,ht,null)}e.bindFramebuffer(i.FRAMEBUFFER,w),yt(v)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,et,tt,n.get(k).__webglTexture,0,Ot(v)):(tt===i.TEXTURE_2D||tt>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&tt<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,et,tt,n.get(k).__webglTexture,nt),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Nt(w,v,k){if(i.bindRenderbuffer(i.RENDERBUFFER,w),v.depthBuffer&&!v.stencilBuffer){let et=o===!0?i.DEPTH_COMPONENT24:i.DEPTH_COMPONENT16;if(k||yt(v)){let tt=v.depthTexture;tt&&tt.isDepthTexture&&(tt.type===jn?et=i.DEPTH_COMPONENT32F:tt.type===Jn&&(et=i.DEPTH_COMPONENT24));let nt=Ot(v);yt(v)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,nt,et,v.width,v.height):i.renderbufferStorageMultisample(i.RENDERBUFFER,nt,et,v.width,v.height)}else i.renderbufferStorage(i.RENDERBUFFER,et,v.width,v.height);i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.RENDERBUFFER,w)}else if(v.depthBuffer&&v.stencilBuffer){let et=Ot(v);k&&yt(v)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,et,i.DEPTH24_STENCIL8,v.width,v.height):yt(v)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,et,i.DEPTH24_STENCIL8,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,i.DEPTH_STENCIL,v.width,v.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.RENDERBUFFER,w)}else{let et=v.isWebGLMultipleRenderTargets===!0?v.texture:[v.texture];for(let tt=0;tt<et.length;tt++){let nt=et[tt],vt=r.convert(nt.format,nt.colorSpace),ht=r.convert(nt.type),pt=b(nt.internalFormat,vt,ht,nt.colorSpace),Rt=Ot(v);k&&yt(v)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Rt,pt,v.width,v.height):yt(v)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Rt,pt,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,pt,v.width,v.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Dt(w,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,w),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(v.depthTexture).__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),G(v.depthTexture,0);let et=n.get(v.depthTexture).__webglTexture,tt=Ot(v);if(v.depthTexture.format===bi)yt(v)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,et,0,tt):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,et,0);else if(v.depthTexture.format===as)yt(v)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,et,0,tt):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,et,0);else throw new Error("Unknown depthTexture format")}function St(w){let v=n.get(w),k=w.isWebGLCubeRenderTarget===!0;if(w.depthTexture&&!v.__autoAllocateDepthBuffer){if(k)throw new Error("target.depthTexture not supported in Cube render targets");Dt(v.__webglFramebuffer,w)}else if(k){v.__webglDepthbuffer=[];for(let et=0;et<6;et++)e.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[et]),v.__webglDepthbuffer[et]=i.createRenderbuffer(),Nt(v.__webglDepthbuffer[et],w,!1)}else e.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer=i.createRenderbuffer(),Nt(v.__webglDepthbuffer,w,!1);e.bindFramebuffer(i.FRAMEBUFFER,null)}function Kt(w,v,k){let et=n.get(w);v!==void 0&&ft(et.__webglFramebuffer,w,w.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),k!==void 0&&St(w)}function F(w){let v=w.texture,k=n.get(w),et=n.get(v);w.addEventListener("dispose",B),w.isWebGLMultipleRenderTargets!==!0&&(et.__webglTexture===void 0&&(et.__webglTexture=i.createTexture()),et.__version=v.version,a.memory.textures++);let tt=w.isWebGLCubeRenderTarget===!0,nt=w.isWebGLMultipleRenderTargets===!0,vt=m(w)||o;if(tt){k.__webglFramebuffer=[];for(let ht=0;ht<6;ht++)if(o&&v.mipmaps&&v.mipmaps.length>0){k.__webglFramebuffer[ht]=[];for(let pt=0;pt<v.mipmaps.length;pt++)k.__webglFramebuffer[ht][pt]=i.createFramebuffer()}else k.__webglFramebuffer[ht]=i.createFramebuffer()}else{if(o&&v.mipmaps&&v.mipmaps.length>0){k.__webglFramebuffer=[];for(let ht=0;ht<v.mipmaps.length;ht++)k.__webglFramebuffer[ht]=i.createFramebuffer()}else k.__webglFramebuffer=i.createFramebuffer();if(nt)if(s.drawBuffers){let ht=w.texture;for(let pt=0,Rt=ht.length;pt<Rt;pt++){let Wt=n.get(ht[pt]);Wt.__webglTexture===void 0&&(Wt.__webglTexture=i.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&w.samples>0&&yt(w)===!1){let ht=nt?v:[v];k.__webglMultisampledFramebuffer=i.createFramebuffer(),k.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let pt=0;pt<ht.length;pt++){let Rt=ht[pt];k.__webglColorRenderbuffer[pt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,k.__webglColorRenderbuffer[pt]);let Wt=r.convert(Rt.format,Rt.colorSpace),Q=r.convert(Rt.type),ee=b(Rt.internalFormat,Wt,Q,Rt.colorSpace,w.isXRRenderTarget===!0),Jt=Ot(w);i.renderbufferStorageMultisample(i.RENDERBUFFER,Jt,ee,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+pt,i.RENDERBUFFER,k.__webglColorRenderbuffer[pt])}i.bindRenderbuffer(i.RENDERBUFFER,null),w.depthBuffer&&(k.__webglDepthRenderbuffer=i.createRenderbuffer(),Nt(k.__webglDepthRenderbuffer,w,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(tt){e.bindTexture(i.TEXTURE_CUBE_MAP,et.__webglTexture),H(i.TEXTURE_CUBE_MAP,v,vt);for(let ht=0;ht<6;ht++)if(o&&v.mipmaps&&v.mipmaps.length>0)for(let pt=0;pt<v.mipmaps.length;pt++)ft(k.__webglFramebuffer[ht][pt],w,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ht,pt);else ft(k.__webglFramebuffer[ht],w,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ht,0);M(v,vt)&&x(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(nt){let ht=w.texture;for(let pt=0,Rt=ht.length;pt<Rt;pt++){let Wt=ht[pt],Q=n.get(Wt);e.bindTexture(i.TEXTURE_2D,Q.__webglTexture),H(i.TEXTURE_2D,Wt,vt),ft(k.__webglFramebuffer,w,Wt,i.COLOR_ATTACHMENT0+pt,i.TEXTURE_2D,0),M(Wt,vt)&&x(i.TEXTURE_2D)}e.unbindTexture()}else{let ht=i.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(o?ht=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),e.bindTexture(ht,et.__webglTexture),H(ht,v,vt),o&&v.mipmaps&&v.mipmaps.length>0)for(let pt=0;pt<v.mipmaps.length;pt++)ft(k.__webglFramebuffer[pt],w,v,i.COLOR_ATTACHMENT0,ht,pt);else ft(k.__webglFramebuffer,w,v,i.COLOR_ATTACHMENT0,ht,0);M(v,vt)&&x(ht),e.unbindTexture()}w.depthBuffer&&St(w)}function ke(w){let v=m(w)||o,k=w.isWebGLMultipleRenderTargets===!0?w.texture:[w.texture];for(let et=0,tt=k.length;et<tt;et++){let nt=k[et];if(M(nt,v)){let vt=w.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,ht=n.get(nt).__webglTexture;e.bindTexture(vt,ht),x(vt),e.unbindTexture()}}}function Et(w){if(o&&w.samples>0&&yt(w)===!1){let v=w.isWebGLMultipleRenderTargets?w.texture:[w.texture],k=w.width,et=w.height,tt=i.COLOR_BUFFER_BIT,nt=[],vt=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ht=n.get(w),pt=w.isWebGLMultipleRenderTargets===!0;if(pt)for(let Rt=0;Rt<v.length;Rt++)e.bindFramebuffer(i.FRAMEBUFFER,ht.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Rt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,ht.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Rt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,ht.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,ht.__webglFramebuffer);for(let Rt=0;Rt<v.length;Rt++){nt.push(i.COLOR_ATTACHMENT0+Rt),w.depthBuffer&&nt.push(vt);let Wt=ht.__ignoreDepthValues!==void 0?ht.__ignoreDepthValues:!1;if(Wt===!1&&(w.depthBuffer&&(tt|=i.DEPTH_BUFFER_BIT),w.stencilBuffer&&(tt|=i.STENCIL_BUFFER_BIT)),pt&&i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ht.__webglColorRenderbuffer[Rt]),Wt===!0&&(i.invalidateFramebuffer(i.READ_FRAMEBUFFER,[vt]),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[vt])),pt){let Q=n.get(v[Rt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Q,0)}i.blitFramebuffer(0,0,k,et,0,0,k,et,tt,i.NEAREST),c&&i.invalidateFramebuffer(i.READ_FRAMEBUFFER,nt)}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),pt)for(let Rt=0;Rt<v.length;Rt++){e.bindFramebuffer(i.FRAMEBUFFER,ht.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Rt,i.RENDERBUFFER,ht.__webglColorRenderbuffer[Rt]);let Wt=n.get(v[Rt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,ht.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Rt,i.TEXTURE_2D,Wt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,ht.__webglMultisampledFramebuffer)}}function Ot(w){return Math.min(s.maxSamples,w.samples)}function yt(w){let v=n.get(w);return o&&w.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function fe(w){let v=a.render.frame;h.get(w)!==v&&(h.set(w,v),w.update())}function Gt(w,v){let k=w.colorSpace,et=w.format,tt=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||w.format===ho||k!==kn&&k!==an&&(ne.getTransfer(k)===le?o===!1?t.has("EXT_sRGB")===!0&&et===pn?(w.format=ho,w.minFilter=rn,w.generateMipmaps=!1):v=Cr.sRGBToLinear(v):(et!==pn||tt!==ei)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",k)),v}this.allocateTextureUnit=R,this.resetTextureUnits=Y,this.setTexture2D=G,this.setTexture2DArray=q,this.setTexture3D=$,this.setTextureCube=X,this.rebindTextures=Kt,this.setupRenderTarget=F,this.updateRenderTargetMipmap=ke,this.updateMultisampleRenderTarget=Et,this.setupDepthRenderbuffer=St,this.setupFrameBufferTexture=ft,this.useMultisampledRTT=yt}function n0(i,t,e){let n=e.isWebGL2;function s(r,a=an){let o,l=ne.getTransfer(a);if(r===ei)return i.UNSIGNED_BYTE;if(r===rh)return i.UNSIGNED_SHORT_4_4_4_4;if(r===ah)return i.UNSIGNED_SHORT_5_5_5_1;if(r===Yu)return i.BYTE;if(r===Zu)return i.SHORT;if(r===jo)return i.UNSIGNED_SHORT;if(r===sh)return i.INT;if(r===Jn)return i.UNSIGNED_INT;if(r===jn)return i.FLOAT;if(r===Us)return n?i.HALF_FLOAT:(o=t.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(r===Ku)return i.ALPHA;if(r===pn)return i.RGBA;if(r===Ju)return i.LUMINANCE;if(r===ju)return i.LUMINANCE_ALPHA;if(r===bi)return i.DEPTH_COMPONENT;if(r===as)return i.DEPTH_STENCIL;if(r===ho)return o=t.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(r===Qu)return i.RED;if(r===oh)return i.RED_INTEGER;if(r===td)return i.RG;if(r===lh)return i.RG_INTEGER;if(r===ch)return i.RGBA_INTEGER;if(r===Ea||r===Ta||r===Aa||r===Ca)if(l===le)if(o=t.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(r===Ea)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===Ta)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===Aa)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===Ca)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=t.get("WEBGL_compressed_texture_s3tc"),o!==null){if(r===Ea)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===Ta)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===Aa)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===Ca)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===Fl||r===Ol||r===kl||r===Bl)if(o=t.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(r===Fl)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===Ol)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===kl)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===Bl)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===hh)return o=t.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===zl||r===Hl)if(o=t.get("WEBGL_compressed_texture_etc"),o!==null){if(r===zl)return l===le?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(r===Hl)return l===le?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===Vl||r===Gl||r===Wl||r===Xl||r===ql||r===$l||r===Yl||r===Zl||r===Kl||r===Jl||r===jl||r===Ql||r===tc||r===ec)if(o=t.get("WEBGL_compressed_texture_astc"),o!==null){if(r===Vl)return l===le?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===Gl)return l===le?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===Wl)return l===le?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===Xl)return l===le?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===ql)return l===le?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===$l)return l===le?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===Yl)return l===le?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===Zl)return l===le?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===Kl)return l===le?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===Jl)return l===le?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===jl)return l===le?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===Ql)return l===le?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===tc)return l===le?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===ec)return l===le?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===Ra||r===nc||r===ic)if(o=t.get("EXT_texture_compression_bptc"),o!==null){if(r===Ra)return l===le?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===nc)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===ic)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===ed||r===sc||r===rc||r===ac)if(o=t.get("EXT_texture_compression_rgtc"),o!==null){if(r===Ra)return o.COMPRESSED_RED_RGTC1_EXT;if(r===sc)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===rc)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===ac)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===Mi?n?i.UNSIGNED_INT_24_8:(o=t.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):i[r]!==void 0?i[r]:null}return{convert:s}}var Ao=class extends ve{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}},bn=class extends De{constructor(){super(),this.isGroup=!0,this.type="Group"}},i0={type:"move"},Rs=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new bn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new bn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new bn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(let _ of t.hand.values()){let m=e.getJointPose(_,n),f=this._getHandJoint(c,_);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}let h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),p=.02,g=.005;c.inputState.pinching&&u>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(i0)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new bn;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},Co=class extends ii{constructor(t,e){super();let n=this,s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,d=null,u=null,p=null,g=null,_=e.getContextAttributes(),m=null,f=null,M=[],x=[],b=new gt,C=null,T=new ve;T.layers.enable(1),T.viewport=new Le;let A=new ve;A.layers.enable(2),A.viewport=new Le;let B=[T,A],y=new Ao;y.layers.enable(1),y.layers.enable(2);let E=null,N=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(H){let K=M[H];return K===void 0&&(K=new Rs,M[H]=K),K.getTargetRaySpace()},this.getControllerGrip=function(H){let K=M[H];return K===void 0&&(K=new Rs,M[H]=K),K.getGripSpace()},this.getHand=function(H){let K=M[H];return K===void 0&&(K=new Rs,M[H]=K),K.getHandSpace()};function W(H){let K=x.indexOf(H.inputSource);if(K===-1)return;let ct=M[K];ct!==void 0&&(ct.update(H.inputSource,H.frame,c||a),ct.dispatchEvent({type:H.type,data:H.inputSource}))}function Y(){s.removeEventListener("select",W),s.removeEventListener("selectstart",W),s.removeEventListener("selectend",W),s.removeEventListener("squeeze",W),s.removeEventListener("squeezestart",W),s.removeEventListener("squeezeend",W),s.removeEventListener("end",Y),s.removeEventListener("inputsourceschange",R);for(let H=0;H<M.length;H++){let K=x[H];K!==null&&(x[H]=null,M[H].disconnect(K))}E=null,N=null,t.setRenderTarget(m),p=null,u=null,d=null,s=null,f=null,it.stop(),n.isPresenting=!1,t.setPixelRatio(C),t.setSize(b.width,b.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(H){r=H,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(H){o=H,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(H){c=H},this.getBaseLayer=function(){return u!==null?u:p},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(H){if(s=H,s!==null){if(m=t.getRenderTarget(),s.addEventListener("select",W),s.addEventListener("selectstart",W),s.addEventListener("selectend",W),s.addEventListener("squeeze",W),s.addEventListener("squeezestart",W),s.addEventListener("squeezeend",W),s.addEventListener("end",Y),s.addEventListener("inputsourceschange",R),_.xrCompatible!==!0&&await e.makeXRCompatible(),C=t.getPixelRatio(),t.getSize(b),s.renderState.layers===void 0||t.capabilities.isWebGL2===!1){let K={antialias:s.renderState.layers===void 0?_.antialias:!0,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,e,K),s.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),f=new Bn(p.framebufferWidth,p.framebufferHeight,{format:pn,type:ei,colorSpace:t.outputColorSpace,stencilBuffer:_.stencil})}else{let K=null,ct=null,xt=null;_.depth&&(xt=_.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,K=_.stencil?as:bi,ct=_.stencil?Mi:Jn);let ft={colorFormat:e.RGBA8,depthFormat:xt,scaleFactor:r};d=new XRWebGLBinding(s,e),u=d.createProjectionLayer(ft),s.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),f=new Bn(u.textureWidth,u.textureHeight,{format:pn,type:ei,depthTexture:new kr(u.textureWidth,u.textureHeight,ct,void 0,void 0,void 0,void 0,void 0,void 0,K),stencilBuffer:_.stencil,colorSpace:t.outputColorSpace,samples:_.antialias?4:0});let Nt=t.properties.get(f);Nt.__ignoreDepthValues=u.ignoreDepthValues}f.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),it.setContext(s),it.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode};function R(H){for(let K=0;K<H.removed.length;K++){let ct=H.removed[K],xt=x.indexOf(ct);xt>=0&&(x[xt]=null,M[xt].disconnect(ct))}for(let K=0;K<H.added.length;K++){let ct=H.added[K],xt=x.indexOf(ct);if(xt===-1){for(let Nt=0;Nt<M.length;Nt++)if(Nt>=x.length){x.push(ct),xt=Nt;break}else if(x[Nt]===null){x[Nt]=ct,xt=Nt;break}if(xt===-1)break}let ft=M[xt];ft&&ft.connect(ct)}}let U=new L,G=new L;function q(H,K,ct){U.setFromMatrixPosition(K.matrixWorld),G.setFromMatrixPosition(ct.matrixWorld);let xt=U.distanceTo(G),ft=K.projectionMatrix.elements,Nt=ct.projectionMatrix.elements,Dt=ft[14]/(ft[10]-1),St=ft[14]/(ft[10]+1),Kt=(ft[9]+1)/ft[5],F=(ft[9]-1)/ft[5],ke=(ft[8]-1)/ft[0],Et=(Nt[8]+1)/Nt[0],Ot=Dt*ke,yt=Dt*Et,fe=xt/(-ke+Et),Gt=fe*-ke;K.matrixWorld.decompose(H.position,H.quaternion,H.scale),H.translateX(Gt),H.translateZ(fe),H.matrixWorld.compose(H.position,H.quaternion,H.scale),H.matrixWorldInverse.copy(H.matrixWorld).invert();let w=Dt+fe,v=St+fe,k=Ot-Gt,et=yt+(xt-Gt),tt=Kt*St/v*w,nt=F*St/v*w;H.projectionMatrix.makePerspective(k,et,tt,nt,w,v),H.projectionMatrixInverse.copy(H.projectionMatrix).invert()}function $(H,K){K===null?H.matrixWorld.copy(H.matrix):H.matrixWorld.multiplyMatrices(K.matrixWorld,H.matrix),H.matrixWorldInverse.copy(H.matrixWorld).invert()}this.updateCamera=function(H){if(s===null)return;y.near=A.near=T.near=H.near,y.far=A.far=T.far=H.far,(E!==y.near||N!==y.far)&&(s.updateRenderState({depthNear:y.near,depthFar:y.far}),E=y.near,N=y.far);let K=H.parent,ct=y.cameras;$(y,K);for(let xt=0;xt<ct.length;xt++)$(ct[xt],K);ct.length===2?q(y,T,A):y.projectionMatrix.copy(T.projectionMatrix),X(H,y,K)};function X(H,K,ct){ct===null?H.matrix.copy(K.matrixWorld):(H.matrix.copy(ct.matrixWorld),H.matrix.invert(),H.matrix.multiply(K.matrixWorld)),H.matrix.decompose(H.position,H.quaternion,H.scale),H.updateMatrixWorld(!0),H.projectionMatrix.copy(K.projectionMatrix),H.projectionMatrixInverse.copy(K.projectionMatrixInverse),H.isPerspectiveCamera&&(H.fov=uo*2*Math.atan(1/H.projectionMatrix.elements[5]),H.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(u===null&&p===null))return l},this.setFoveation=function(H){l=H,u!==null&&(u.fixedFoveation=H),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=H)};let Z=null;function j(H,K){if(h=K.getViewerPose(c||a),g=K,h!==null){let ct=h.views;p!==null&&(t.setRenderTargetFramebuffer(f,p.framebuffer),t.setRenderTarget(f));let xt=!1;ct.length!==y.cameras.length&&(y.cameras.length=0,xt=!0);for(let ft=0;ft<ct.length;ft++){let Nt=ct[ft],Dt=null;if(p!==null)Dt=p.getViewport(Nt);else{let Kt=d.getViewSubImage(u,Nt);Dt=Kt.viewport,ft===0&&(t.setRenderTargetTextures(f,Kt.colorTexture,u.ignoreDepthValues?void 0:Kt.depthStencilTexture),t.setRenderTarget(f))}let St=B[ft];St===void 0&&(St=new ve,St.layers.enable(ft),St.viewport=new Le,B[ft]=St),St.matrix.fromArray(Nt.transform.matrix),St.matrix.decompose(St.position,St.quaternion,St.scale),St.projectionMatrix.fromArray(Nt.projectionMatrix),St.projectionMatrixInverse.copy(St.projectionMatrix).invert(),St.viewport.set(Dt.x,Dt.y,Dt.width,Dt.height),ft===0&&(y.matrix.copy(St.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),xt===!0&&y.cameras.push(St)}}for(let ct=0;ct<M.length;ct++){let xt=x[ct],ft=M[ct];xt!==null&&ft!==void 0&&ft.update(xt,K,c||a)}Z&&Z(H,K),K.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:K}),g=null}let it=new _h;it.setAnimationLoop(j),this.setAnimationLoop=function(H){Z=H},this.dispose=function(){}}};function s0(i,t){function e(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function n(m,f){f.color.getRGB(m.fogColor.value,gh(i)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function s(m,f,M,x,b){f.isMeshBasicMaterial||f.isMeshLambertMaterial?r(m,f):f.isMeshToonMaterial?(r(m,f),d(m,f)):f.isMeshPhongMaterial?(r(m,f),h(m,f)):f.isMeshStandardMaterial?(r(m,f),u(m,f),f.isMeshPhysicalMaterial&&p(m,f,b)):f.isMeshMatcapMaterial?(r(m,f),g(m,f)):f.isMeshDepthMaterial?r(m,f):f.isMeshDistanceMaterial?(r(m,f),_(m,f)):f.isMeshNormalMaterial?r(m,f):f.isLineBasicMaterial?(a(m,f),f.isLineDashedMaterial&&o(m,f)):f.isPointsMaterial?l(m,f,M,x):f.isSpriteMaterial?c(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,e(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===qe&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,e(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===qe&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,e(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,e(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,e(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);let M=t.get(f).envMap;if(M&&(m.envMap.value=M,m.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap){m.lightMap.value=f.lightMap;let x=i._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=f.lightMapIntensity*x,e(f.lightMap,m.lightMapTransform)}f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,e(f.aoMap,m.aoMapTransform))}function a(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform))}function o(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function l(m,f,M,x){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*M,m.scale.value=x*.5,f.map&&(m.map.value=f.map,e(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function c(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function h(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function d(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function u(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,e(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,e(f.roughnessMap,m.roughnessMapTransform)),t.get(f).envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,M){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,e(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,e(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,e(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,e(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,e(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===qe&&m.clearcoatNormalScale.value.negate())),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,e(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,e(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,e(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,e(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,e(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,e(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,e(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function _(m,f){let M=t.get(f).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function r0(i,t,e,n){let s={},r={},a=[],o=e.isWebGL2?i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(M,x){let b=x.program;n.uniformBlockBinding(M,b)}function c(M,x){let b=s[M.id];b===void 0&&(g(M),b=h(M),s[M.id]=b,M.addEventListener("dispose",m));let C=x.program;n.updateUBOMapping(M,C);let T=t.render.frame;r[M.id]!==T&&(u(M),r[M.id]=T)}function h(M){let x=d();M.__bindingPointIndex=x;let b=i.createBuffer(),C=M.__size,T=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,b),i.bufferData(i.UNIFORM_BUFFER,C,T),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,x,b),b}function d(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(M){let x=s[M.id],b=M.uniforms,C=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,x);for(let T=0,A=b.length;T<A;T++){let B=Array.isArray(b[T])?b[T]:[b[T]];for(let y=0,E=B.length;y<E;y++){let N=B[y];if(p(N,T,y,C)===!0){let W=N.__offset,Y=Array.isArray(N.value)?N.value:[N.value],R=0;for(let U=0;U<Y.length;U++){let G=Y[U],q=_(G);typeof G=="number"||typeof G=="boolean"?(N.__data[0]=G,i.bufferSubData(i.UNIFORM_BUFFER,W+R,N.__data)):G.isMatrix3?(N.__data[0]=G.elements[0],N.__data[1]=G.elements[1],N.__data[2]=G.elements[2],N.__data[3]=0,N.__data[4]=G.elements[3],N.__data[5]=G.elements[4],N.__data[6]=G.elements[5],N.__data[7]=0,N.__data[8]=G.elements[6],N.__data[9]=G.elements[7],N.__data[10]=G.elements[8],N.__data[11]=0):(G.toArray(N.__data,R),R+=q.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,W,N.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(M,x,b,C){let T=M.value,A=x+"_"+b;if(C[A]===void 0)return typeof T=="number"||typeof T=="boolean"?C[A]=T:C[A]=T.clone(),!0;{let B=C[A];if(typeof T=="number"||typeof T=="boolean"){if(B!==T)return C[A]=T,!0}else if(B.equals(T)===!1)return B.copy(T),!0}return!1}function g(M){let x=M.uniforms,b=0,C=16;for(let A=0,B=x.length;A<B;A++){let y=Array.isArray(x[A])?x[A]:[x[A]];for(let E=0,N=y.length;E<N;E++){let W=y[E],Y=Array.isArray(W.value)?W.value:[W.value];for(let R=0,U=Y.length;R<U;R++){let G=Y[R],q=_(G),$=b%C;$!==0&&C-$<q.boundary&&(b+=C-$),W.__data=new Float32Array(q.storage/Float32Array.BYTES_PER_ELEMENT),W.__offset=b,b+=q.storage}}}let T=b%C;return T>0&&(b+=C-T),M.__size=b,M.__cache={},this}function _(M){let x={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(x.boundary=4,x.storage=4):M.isVector2?(x.boundary=8,x.storage=8):M.isVector3||M.isColor?(x.boundary=16,x.storage=12):M.isVector4?(x.boundary=16,x.storage=16):M.isMatrix3?(x.boundary=48,x.storage=48):M.isMatrix4?(x.boundary=64,x.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),x}function m(M){let x=M.target;x.removeEventListener("dispose",m);let b=a.indexOf(x.__bindingPointIndex);a.splice(b,1),i.deleteBuffer(s[x.id]),delete s[x.id],delete r[x.id]}function f(){for(let M in s)i.deleteBuffer(s[M]);a=[],s={},r={}}return{bind:l,update:c,dispose:f}}var Fs=class{constructor(t={}){let{canvas:e=fd(),context:n=null,depth:s=!0,stencil:r=!0,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1}=t;this.isWebGLRenderer=!0;let u;n!==null?u=n.getContextAttributes().alpha:u=a;let p=new Uint32Array(4),g=new Int32Array(4),_=null,m=null,f=[],M=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=me,this._useLegacyLights=!1,this.toneMapping=ti,this.toneMappingExposure=1;let x=this,b=!1,C=0,T=0,A=null,B=-1,y=null,E=new Le,N=new Le,W=null,Y=new qt(0),R=0,U=e.width,G=e.height,q=1,$=null,X=null,Z=new Le(0,0,U,G),j=new Le(0,0,U,G),it=!1,H=new Ns,K=!1,ct=!1,xt=null,ft=new oe,Nt=new gt,Dt=new L,St={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Kt(){return A===null?q:1}let F=n;function ke(S,D){for(let z=0;z<S.length;z++){let V=S[z],O=e.getContext(V,D);if(O!==null)return O}return null}try{let S={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Ko}`),e.addEventListener("webglcontextlost",st,!1),e.addEventListener("webglcontextrestored",P,!1),e.addEventListener("webglcontextcreationerror",ot,!1),F===null){let D=["webgl2","webgl","experimental-webgl"];if(x.isWebGL1Renderer===!0&&D.shift(),F=ke(D,S),F===null)throw ke(D)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&F instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),F.getShaderPrecisionFormat===void 0&&(F.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(S){throw console.error("THREE.WebGLRenderer: "+S.message),S}let Et,Ot,yt,fe,Gt,w,v,k,et,tt,nt,vt,ht,pt,Rt,Wt,Q,ee,Jt,Ft,wt,mt,Ht,te;function ge(){Et=new wm(F),Ot=new xm(F,Et,t),Et.init(Ot),mt=new n0(F,Et,Ot),yt=new t0(F,Et,Ot),fe=new Am(F),Gt=new Vg,w=new e0(F,Et,yt,Gt,Ot,mt,fe),v=new vm(x),k=new Sm(x),et=new Ud(F,Ot),Ht=new gm(F,Et,et,Ot),tt=new Em(F,et,fe,Ht),nt=new Lm(F,tt,et,fe),Jt=new Pm(F,Ot,w),Wt=new ym(Gt),vt=new Hg(x,v,k,Et,Ot,Ht,Wt),ht=new s0(x,Gt),pt=new Wg,Rt=new Kg(Et,Ot),ee=new mm(x,v,k,yt,nt,u,l),Q=new Qg(x,nt,Ot),te=new r0(F,fe,Ot,yt),Ft=new _m(F,Et,fe,Ot),wt=new Tm(F,Et,fe,Ot),fe.programs=vt.programs,x.capabilities=Ot,x.extensions=Et,x.properties=Gt,x.renderLists=pt,x.shadowMap=Q,x.state=yt,x.info=fe}ge();let $t=new Co(x,F);this.xr=$t,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){let S=Et.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){let S=Et.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return q},this.setPixelRatio=function(S){S!==void 0&&(q=S,this.setSize(U,G,!1))},this.getSize=function(S){return S.set(U,G)},this.setSize=function(S,D,z=!0){if($t.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}U=S,G=D,e.width=Math.floor(S*q),e.height=Math.floor(D*q),z===!0&&(e.style.width=S+"px",e.style.height=D+"px"),this.setViewport(0,0,S,D)},this.getDrawingBufferSize=function(S){return S.set(U*q,G*q).floor()},this.setDrawingBufferSize=function(S,D,z){U=S,G=D,q=z,e.width=Math.floor(S*z),e.height=Math.floor(D*z),this.setViewport(0,0,S,D)},this.getCurrentViewport=function(S){return S.copy(E)},this.getViewport=function(S){return S.copy(Z)},this.setViewport=function(S,D,z,V){S.isVector4?Z.set(S.x,S.y,S.z,S.w):Z.set(S,D,z,V),yt.viewport(E.copy(Z).multiplyScalar(q).floor())},this.getScissor=function(S){return S.copy(j)},this.setScissor=function(S,D,z,V){S.isVector4?j.set(S.x,S.y,S.z,S.w):j.set(S,D,z,V),yt.scissor(N.copy(j).multiplyScalar(q).floor())},this.getScissorTest=function(){return it},this.setScissorTest=function(S){yt.setScissorTest(it=S)},this.setOpaqueSort=function(S){$=S},this.setTransparentSort=function(S){X=S},this.getClearColor=function(S){return S.copy(ee.getClearColor())},this.setClearColor=function(){ee.setClearColor.apply(ee,arguments)},this.getClearAlpha=function(){return ee.getClearAlpha()},this.setClearAlpha=function(){ee.setClearAlpha.apply(ee,arguments)},this.clear=function(S=!0,D=!0,z=!0){let V=0;if(S){let O=!1;if(A!==null){let ut=A.texture.format;O=ut===ch||ut===lh||ut===oh}if(O){let ut=A.texture.type,Mt=ut===ei||ut===Jn||ut===jo||ut===Mi||ut===rh||ut===ah,Ct=ee.getClearColor(),It=ee.getClearAlpha(),Xt=Ct.r,kt=Ct.g,zt=Ct.b;Mt?(p[0]=Xt,p[1]=kt,p[2]=zt,p[3]=It,F.clearBufferuiv(F.COLOR,0,p)):(g[0]=Xt,g[1]=kt,g[2]=zt,g[3]=It,F.clearBufferiv(F.COLOR,0,g))}else V|=F.COLOR_BUFFER_BIT}D&&(V|=F.DEPTH_BUFFER_BIT),z&&(V|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),F.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",st,!1),e.removeEventListener("webglcontextrestored",P,!1),e.removeEventListener("webglcontextcreationerror",ot,!1),pt.dispose(),Rt.dispose(),Gt.dispose(),v.dispose(),k.dispose(),nt.dispose(),Ht.dispose(),te.dispose(),vt.dispose(),$t.dispose(),$t.removeEventListener("sessionstart",Be),$t.removeEventListener("sessionend",ae),xt&&(xt.dispose(),xt=null),ze.stop()};function st(S){S.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),b=!0}function P(){console.log("THREE.WebGLRenderer: Context Restored."),b=!1;let S=fe.autoReset,D=Q.enabled,z=Q.autoUpdate,V=Q.needsUpdate,O=Q.type;ge(),fe.autoReset=S,Q.enabled=D,Q.autoUpdate=z,Q.needsUpdate=V,Q.type=O}function ot(S){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function lt(S){let D=S.target;D.removeEventListener("dispose",lt),Lt(D)}function Lt(S){Tt(S),Gt.remove(S)}function Tt(S){let D=Gt.get(S).programs;D!==void 0&&(D.forEach(function(z){vt.releaseProgram(z)}),S.isShaderMaterial&&vt.releaseShaderCache(S))}this.renderBufferDirect=function(S,D,z,V,O,ut){D===null&&(D=St);let Mt=O.isMesh&&O.matrixWorld.determinant()<0,Ct=cu(S,D,z,V,O);yt.setMaterial(V,Mt);let It=z.index,Xt=1;if(V.wireframe===!0){if(It=tt.getWireframeAttribute(z),It===void 0)return;Xt=2}let kt=z.drawRange,zt=z.attributes.position,ye=kt.start*Xt,Ze=(kt.start+kt.count)*Xt;ut!==null&&(ye=Math.max(ye,ut.start*Xt),Ze=Math.min(Ze,(ut.start+ut.count)*Xt)),It!==null?(ye=Math.max(ye,0),Ze=Math.min(Ze,It.count)):zt!=null&&(ye=Math.max(ye,0),Ze=Math.min(Ze,zt.count));let Re=Ze-ye;if(Re<0||Re===1/0)return;Ht.setup(O,V,Ct,z,It);let Cn,pe=Ft;if(It!==null&&(Cn=et.get(It),pe=wt,pe.setIndex(Cn)),O.isMesh)V.wireframe===!0?(yt.setLineWidth(V.wireframeLinewidth*Kt()),pe.setMode(F.LINES)):pe.setMode(F.TRIANGLES);else if(O.isLine){let Yt=V.linewidth;Yt===void 0&&(Yt=1),yt.setLineWidth(Yt*Kt()),O.isLineSegments?pe.setMode(F.LINES):O.isLineLoop?pe.setMode(F.LINE_LOOP):pe.setMode(F.LINE_STRIP)}else O.isPoints?pe.setMode(F.POINTS):O.isSprite&&pe.setMode(F.TRIANGLES);if(O.isBatchedMesh)pe.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else if(O.isInstancedMesh)pe.renderInstances(ye,Re,O.count);else if(z.isInstancedBufferGeometry){let Yt=z._maxInstanceCount!==void 0?z._maxInstanceCount:1/0,va=Math.min(z.instanceCount,Yt);pe.renderInstances(ye,Re,va)}else pe.render(ye,Re)};function se(S,D,z){S.transparent===!0&&S.side===Fn&&S.forceSinglePass===!1?(S.side=qe,S.needsUpdate=!0,Ys(S,D,z),S.side=ni,S.needsUpdate=!0,Ys(S,D,z),S.side=Fn):Ys(S,D,z)}this.compile=function(S,D,z=null){z===null&&(z=S),m=Rt.get(z),m.init(),M.push(m),z.traverseVisible(function(O){O.isLight&&O.layers.test(D.layers)&&(m.pushLight(O),O.castShadow&&m.pushShadow(O))}),S!==z&&S.traverseVisible(function(O){O.isLight&&O.layers.test(D.layers)&&(m.pushLight(O),O.castShadow&&m.pushShadow(O))}),m.setupLights(x._useLegacyLights);let V=new Set;return S.traverse(function(O){let ut=O.material;if(ut)if(Array.isArray(ut))for(let Mt=0;Mt<ut.length;Mt++){let Ct=ut[Mt];se(Ct,z,O),V.add(Ct)}else se(ut,z,O),V.add(ut)}),M.pop(),m=null,V},this.compileAsync=function(S,D,z=null){let V=this.compile(S,D,z);return new Promise(O=>{function ut(){if(V.forEach(function(Mt){Gt.get(Mt).currentProgram.isReady()&&V.delete(Mt)}),V.size===0){O(S);return}setTimeout(ut,10)}Et.get("KHR_parallel_shader_compile")!==null?ut():setTimeout(ut,10)})};let re=null;function Ce(S){re&&re(S)}function Be(){ze.stop()}function ae(){ze.start()}let ze=new _h;ze.setAnimationLoop(Ce),typeof self<"u"&&ze.setContext(self),this.setAnimationLoop=function(S){re=S,$t.setAnimationLoop(S),S===null?ze.stop():ze.start()},$t.addEventListener("sessionstart",Be),$t.addEventListener("sessionend",ae),this.render=function(S,D){if(D!==void 0&&D.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(b===!0)return;S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),$t.enabled===!0&&$t.isPresenting===!0&&($t.cameraAutoUpdate===!0&&$t.updateCamera(D),D=$t.getCamera()),S.isScene===!0&&S.onBeforeRender(x,S,D,A),m=Rt.get(S,M.length),m.init(),M.push(m),ft.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),H.setFromProjectionMatrix(ft),ct=this.localClippingEnabled,K=Wt.init(this.clippingPlanes,ct),_=pt.get(S,f.length),_.init(),f.push(_),vn(S,D,0,x.sortObjects),_.finish(),x.sortObjects===!0&&_.sort($,X),this.info.render.frame++,K===!0&&Wt.beginShadows();let z=m.state.shadowsArray;if(Q.render(z,S,D),K===!0&&Wt.endShadows(),this.info.autoReset===!0&&this.info.reset(),ee.render(_,S),m.setupLights(x._useLegacyLights),D.isArrayCamera){let V=D.cameras;for(let O=0,ut=V.length;O<ut;O++){let Mt=V[O];Sl(_,S,Mt,Mt.viewport)}}else Sl(_,S,D);A!==null&&(w.updateMultisampleRenderTarget(A),w.updateRenderTargetMipmap(A)),S.isScene===!0&&S.onAfterRender(x,S,D),Ht.resetDefaultState(),B=-1,y=null,M.pop(),M.length>0?m=M[M.length-1]:m=null,f.pop(),f.length>0?_=f[f.length-1]:_=null};function vn(S,D,z,V){if(S.visible===!1)return;if(S.layers.test(D.layers)){if(S.isGroup)z=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(D);else if(S.isLight)m.pushLight(S),S.castShadow&&m.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||H.intersectsSprite(S)){V&&Dt.setFromMatrixPosition(S.matrixWorld).applyMatrix4(ft);let Mt=nt.update(S),Ct=S.material;Ct.visible&&_.push(S,Mt,Ct,z,Dt.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||H.intersectsObject(S))){let Mt=nt.update(S),Ct=S.material;if(V&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Dt.copy(S.boundingSphere.center)):(Mt.boundingSphere===null&&Mt.computeBoundingSphere(),Dt.copy(Mt.boundingSphere.center)),Dt.applyMatrix4(S.matrixWorld).applyMatrix4(ft)),Array.isArray(Ct)){let It=Mt.groups;for(let Xt=0,kt=It.length;Xt<kt;Xt++){let zt=It[Xt],ye=Ct[zt.materialIndex];ye&&ye.visible&&_.push(S,Mt,ye,z,Dt.z,zt)}}else Ct.visible&&_.push(S,Mt,Ct,z,Dt.z,null)}}let ut=S.children;for(let Mt=0,Ct=ut.length;Mt<Ct;Mt++)vn(ut[Mt],D,z,V)}function Sl(S,D,z,V){let O=S.opaque,ut=S.transmissive,Mt=S.transparent;m.setupLightsView(z),K===!0&&Wt.setGlobalState(x.clippingPlanes,z),ut.length>0&&lu(O,ut,D,z),V&&yt.viewport(E.copy(V)),O.length>0&&$s(O,D,z),ut.length>0&&$s(ut,D,z),Mt.length>0&&$s(Mt,D,z),yt.buffers.depth.setTest(!0),yt.buffers.depth.setMask(!0),yt.buffers.color.setMask(!0),yt.setPolygonOffset(!1)}function lu(S,D,z,V){if((z.isScene===!0?z.overrideMaterial:null)!==null)return;let ut=Ot.isWebGL2;xt===null&&(xt=new Bn(1,1,{generateMipmaps:!0,type:Et.has("EXT_color_buffer_half_float")?Us:ei,minFilter:Ds,samples:ut?4:0})),x.getDrawingBufferSize(Nt),ut?xt.setSize(Nt.x,Nt.y):xt.setSize(fo(Nt.x),fo(Nt.y));let Mt=x.getRenderTarget();x.setRenderTarget(xt),x.getClearColor(Y),R=x.getClearAlpha(),R<1&&x.setClearColor(16777215,.5),x.clear();let Ct=x.toneMapping;x.toneMapping=ti,$s(S,z,V),w.updateMultisampleRenderTarget(xt),w.updateRenderTargetMipmap(xt);let It=!1;for(let Xt=0,kt=D.length;Xt<kt;Xt++){let zt=D[Xt],ye=zt.object,Ze=zt.geometry,Re=zt.material,Cn=zt.group;if(Re.side===Fn&&ye.layers.test(V.layers)){let pe=Re.side;Re.side=qe,Re.needsUpdate=!0,wl(ye,z,V,Ze,Re,Cn),Re.side=pe,Re.needsUpdate=!0,It=!0}}It===!0&&(w.updateMultisampleRenderTarget(xt),w.updateRenderTargetMipmap(xt)),x.setRenderTarget(Mt),x.setClearColor(Y,R),x.toneMapping=Ct}function $s(S,D,z){let V=D.isScene===!0?D.overrideMaterial:null;for(let O=0,ut=S.length;O<ut;O++){let Mt=S[O],Ct=Mt.object,It=Mt.geometry,Xt=V===null?Mt.material:V,kt=Mt.group;Ct.layers.test(z.layers)&&wl(Ct,D,z,It,Xt,kt)}}function wl(S,D,z,V,O,ut){S.onBeforeRender(x,D,z,V,O,ut),S.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),O.onBeforeRender(x,D,z,V,S,ut),O.transparent===!0&&O.side===Fn&&O.forceSinglePass===!1?(O.side=qe,O.needsUpdate=!0,x.renderBufferDirect(z,D,V,O,S,ut),O.side=ni,O.needsUpdate=!0,x.renderBufferDirect(z,D,V,O,S,ut),O.side=Fn):x.renderBufferDirect(z,D,V,O,S,ut),S.onAfterRender(x,D,z,V,O,ut)}function Ys(S,D,z){D.isScene!==!0&&(D=St);let V=Gt.get(S),O=m.state.lights,ut=m.state.shadowsArray,Mt=O.state.version,Ct=vt.getParameters(S,O.state,ut,D,z),It=vt.getProgramCacheKey(Ct),Xt=V.programs;V.environment=S.isMeshStandardMaterial?D.environment:null,V.fog=D.fog,V.envMap=(S.isMeshStandardMaterial?k:v).get(S.envMap||V.environment),Xt===void 0&&(S.addEventListener("dispose",lt),Xt=new Map,V.programs=Xt);let kt=Xt.get(It);if(kt!==void 0){if(V.currentProgram===kt&&V.lightsStateVersion===Mt)return Tl(S,Ct),kt}else Ct.uniforms=vt.getUniforms(S),S.onBuild(z,Ct,x),S.onBeforeCompile(Ct,x),kt=vt.acquireProgram(Ct,It),Xt.set(It,kt),V.uniforms=Ct.uniforms;let zt=V.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(zt.clippingPlanes=Wt.uniform),Tl(S,Ct),V.needsLights=uu(S),V.lightsStateVersion=Mt,V.needsLights&&(zt.ambientLightColor.value=O.state.ambient,zt.lightProbe.value=O.state.probe,zt.directionalLights.value=O.state.directional,zt.directionalLightShadows.value=O.state.directionalShadow,zt.spotLights.value=O.state.spot,zt.spotLightShadows.value=O.state.spotShadow,zt.rectAreaLights.value=O.state.rectArea,zt.ltc_1.value=O.state.rectAreaLTC1,zt.ltc_2.value=O.state.rectAreaLTC2,zt.pointLights.value=O.state.point,zt.pointLightShadows.value=O.state.pointShadow,zt.hemisphereLights.value=O.state.hemi,zt.directionalShadowMap.value=O.state.directionalShadowMap,zt.directionalShadowMatrix.value=O.state.directionalShadowMatrix,zt.spotShadowMap.value=O.state.spotShadowMap,zt.spotLightMatrix.value=O.state.spotLightMatrix,zt.spotLightMap.value=O.state.spotLightMap,zt.pointShadowMap.value=O.state.pointShadowMap,zt.pointShadowMatrix.value=O.state.pointShadowMatrix),V.currentProgram=kt,V.uniformsList=null,kt}function El(S){if(S.uniformsList===null){let D=S.currentProgram.getUniforms();S.uniformsList=is.seqWithValue(D.seq,S.uniforms)}return S.uniformsList}function Tl(S,D){let z=Gt.get(S);z.outputColorSpace=D.outputColorSpace,z.batching=D.batching,z.instancing=D.instancing,z.instancingColor=D.instancingColor,z.skinning=D.skinning,z.morphTargets=D.morphTargets,z.morphNormals=D.morphNormals,z.morphColors=D.morphColors,z.morphTargetsCount=D.morphTargetsCount,z.numClippingPlanes=D.numClippingPlanes,z.numIntersection=D.numClipIntersection,z.vertexAlphas=D.vertexAlphas,z.vertexTangents=D.vertexTangents,z.toneMapping=D.toneMapping}function cu(S,D,z,V,O){D.isScene!==!0&&(D=St),w.resetTextureUnits();let ut=D.fog,Mt=V.isMeshStandardMaterial?D.environment:null,Ct=A===null?x.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:kn,It=(V.isMeshStandardMaterial?k:v).get(V.envMap||Mt),Xt=V.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,kt=!!z.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),zt=!!z.morphAttributes.position,ye=!!z.morphAttributes.normal,Ze=!!z.morphAttributes.color,Re=ti;V.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(Re=x.toneMapping);let Cn=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,pe=Cn!==void 0?Cn.length:0,Yt=Gt.get(V),va=m.state.lights;if(K===!0&&(ct===!0||S!==y)){let nn=S===y&&V.id===B;Wt.setState(V,S,nn)}let _e=!1;V.version===Yt.__version?(Yt.needsLights&&Yt.lightsStateVersion!==va.state.version||Yt.outputColorSpace!==Ct||O.isBatchedMesh&&Yt.batching===!1||!O.isBatchedMesh&&Yt.batching===!0||O.isInstancedMesh&&Yt.instancing===!1||!O.isInstancedMesh&&Yt.instancing===!0||O.isSkinnedMesh&&Yt.skinning===!1||!O.isSkinnedMesh&&Yt.skinning===!0||O.isInstancedMesh&&Yt.instancingColor===!0&&O.instanceColor===null||O.isInstancedMesh&&Yt.instancingColor===!1&&O.instanceColor!==null||Yt.envMap!==It||V.fog===!0&&Yt.fog!==ut||Yt.numClippingPlanes!==void 0&&(Yt.numClippingPlanes!==Wt.numPlanes||Yt.numIntersection!==Wt.numIntersection)||Yt.vertexAlphas!==Xt||Yt.vertexTangents!==kt||Yt.morphTargets!==zt||Yt.morphNormals!==ye||Yt.morphColors!==Ze||Yt.toneMapping!==Re||Ot.isWebGL2===!0&&Yt.morphTargetsCount!==pe)&&(_e=!0):(_e=!0,Yt.__version=V.version);let di=Yt.currentProgram;_e===!0&&(di=Ys(V,D,O));let Al=!1,vs=!1,Ma=!1,Ue=di.getUniforms(),fi=Yt.uniforms;if(yt.useProgram(di.program)&&(Al=!0,vs=!0,Ma=!0),V.id!==B&&(B=V.id,vs=!0),Al||y!==S){Ue.setValue(F,"projectionMatrix",S.projectionMatrix),Ue.setValue(F,"viewMatrix",S.matrixWorldInverse);let nn=Ue.map.cameraPosition;nn!==void 0&&nn.setValue(F,Dt.setFromMatrixPosition(S.matrixWorld)),Ot.logarithmicDepthBuffer&&Ue.setValue(F,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&Ue.setValue(F,"isOrthographic",S.isOrthographicCamera===!0),y!==S&&(y=S,vs=!0,Ma=!0)}if(O.isSkinnedMesh){Ue.setOptional(F,O,"bindMatrix"),Ue.setOptional(F,O,"bindMatrixInverse");let nn=O.skeleton;nn&&(Ot.floatVertexTextures?(nn.boneTexture===null&&nn.computeBoneTexture(),Ue.setValue(F,"boneTexture",nn.boneTexture,w)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}O.isBatchedMesh&&(Ue.setOptional(F,O,"batchingTexture"),Ue.setValue(F,"batchingTexture",O._matricesTexture,w));let ba=z.morphAttributes;if((ba.position!==void 0||ba.normal!==void 0||ba.color!==void 0&&Ot.isWebGL2===!0)&&Jt.update(O,z,di),(vs||Yt.receiveShadow!==O.receiveShadow)&&(Yt.receiveShadow=O.receiveShadow,Ue.setValue(F,"receiveShadow",O.receiveShadow)),V.isMeshGouraudMaterial&&V.envMap!==null&&(fi.envMap.value=It,fi.flipEnvMap.value=It.isCubeTexture&&It.isRenderTargetTexture===!1?-1:1),vs&&(Ue.setValue(F,"toneMappingExposure",x.toneMappingExposure),Yt.needsLights&&hu(fi,Ma),ut&&V.fog===!0&&ht.refreshFogUniforms(fi,ut),ht.refreshMaterialUniforms(fi,V,q,G,xt),is.upload(F,El(Yt),fi,w)),V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(is.upload(F,El(Yt),fi,w),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&Ue.setValue(F,"center",O.center),Ue.setValue(F,"modelViewMatrix",O.modelViewMatrix),Ue.setValue(F,"normalMatrix",O.normalMatrix),Ue.setValue(F,"modelMatrix",O.matrixWorld),V.isShaderMaterial||V.isRawShaderMaterial){let nn=V.uniformsGroups;for(let Sa=0,du=nn.length;Sa<du;Sa++)if(Ot.isWebGL2){let Cl=nn[Sa];te.update(Cl,di),te.bind(Cl,di)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return di}function hu(S,D){S.ambientLightColor.needsUpdate=D,S.lightProbe.needsUpdate=D,S.directionalLights.needsUpdate=D,S.directionalLightShadows.needsUpdate=D,S.pointLights.needsUpdate=D,S.pointLightShadows.needsUpdate=D,S.spotLights.needsUpdate=D,S.spotLightShadows.needsUpdate=D,S.rectAreaLights.needsUpdate=D,S.hemisphereLights.needsUpdate=D}function uu(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(S,D,z){Gt.get(S.texture).__webglTexture=D,Gt.get(S.depthTexture).__webglTexture=z;let V=Gt.get(S);V.__hasExternalTextures=!0,V.__hasExternalTextures&&(V.__autoAllocateDepthBuffer=z===void 0,V.__autoAllocateDepthBuffer||Et.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),V.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(S,D){let z=Gt.get(S);z.__webglFramebuffer=D,z.__useDefaultFramebuffer=D===void 0},this.setRenderTarget=function(S,D=0,z=0){A=S,C=D,T=z;let V=!0,O=null,ut=!1,Mt=!1;if(S){let It=Gt.get(S);It.__useDefaultFramebuffer!==void 0?(yt.bindFramebuffer(F.FRAMEBUFFER,null),V=!1):It.__webglFramebuffer===void 0?w.setupRenderTarget(S):It.__hasExternalTextures&&w.rebindTextures(S,Gt.get(S.texture).__webglTexture,Gt.get(S.depthTexture).__webglTexture);let Xt=S.texture;(Xt.isData3DTexture||Xt.isDataArrayTexture||Xt.isCompressedArrayTexture)&&(Mt=!0);let kt=Gt.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(kt[D])?O=kt[D][z]:O=kt[D],ut=!0):Ot.isWebGL2&&S.samples>0&&w.useMultisampledRTT(S)===!1?O=Gt.get(S).__webglMultisampledFramebuffer:Array.isArray(kt)?O=kt[z]:O=kt,E.copy(S.viewport),N.copy(S.scissor),W=S.scissorTest}else E.copy(Z).multiplyScalar(q).floor(),N.copy(j).multiplyScalar(q).floor(),W=it;if(yt.bindFramebuffer(F.FRAMEBUFFER,O)&&Ot.drawBuffers&&V&&yt.drawBuffers(S,O),yt.viewport(E),yt.scissor(N),yt.setScissorTest(W),ut){let It=Gt.get(S.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+D,It.__webglTexture,z)}else if(Mt){let It=Gt.get(S.texture),Xt=D||0;F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,It.__webglTexture,z||0,Xt)}B=-1},this.readRenderTargetPixels=function(S,D,z,V,O,ut,Mt){if(!(S&&S.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ct=Gt.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Mt!==void 0&&(Ct=Ct[Mt]),Ct){yt.bindFramebuffer(F.FRAMEBUFFER,Ct);try{let It=S.texture,Xt=It.format,kt=It.type;if(Xt!==pn&&mt.convert(Xt)!==F.getParameter(F.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}let zt=kt===Us&&(Et.has("EXT_color_buffer_half_float")||Ot.isWebGL2&&Et.has("EXT_color_buffer_float"));if(kt!==ei&&mt.convert(kt)!==F.getParameter(F.IMPLEMENTATION_COLOR_READ_TYPE)&&!(kt===jn&&(Ot.isWebGL2||Et.has("OES_texture_float")||Et.has("WEBGL_color_buffer_float")))&&!zt){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=S.width-V&&z>=0&&z<=S.height-O&&F.readPixels(D,z,V,O,mt.convert(Xt),mt.convert(kt),ut)}finally{let It=A!==null?Gt.get(A).__webglFramebuffer:null;yt.bindFramebuffer(F.FRAMEBUFFER,It)}}},this.copyFramebufferToTexture=function(S,D,z=0){let V=Math.pow(2,-z),O=Math.floor(D.image.width*V),ut=Math.floor(D.image.height*V);w.setTexture2D(D,0),F.copyTexSubImage2D(F.TEXTURE_2D,z,0,0,S.x,S.y,O,ut),yt.unbindTexture()},this.copyTextureToTexture=function(S,D,z,V=0){let O=D.image.width,ut=D.image.height,Mt=mt.convert(z.format),Ct=mt.convert(z.type);w.setTexture2D(z,0),F.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,z.flipY),F.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,z.premultiplyAlpha),F.pixelStorei(F.UNPACK_ALIGNMENT,z.unpackAlignment),D.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,V,S.x,S.y,O,ut,Mt,Ct,D.image.data):D.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,V,S.x,S.y,D.mipmaps[0].width,D.mipmaps[0].height,Mt,D.mipmaps[0].data):F.texSubImage2D(F.TEXTURE_2D,V,S.x,S.y,Mt,Ct,D.image),V===0&&z.generateMipmaps&&F.generateMipmap(F.TEXTURE_2D),yt.unbindTexture()},this.copyTextureToTexture3D=function(S,D,z,V,O=0){if(x.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}let ut=S.max.x-S.min.x+1,Mt=S.max.y-S.min.y+1,Ct=S.max.z-S.min.z+1,It=mt.convert(V.format),Xt=mt.convert(V.type),kt;if(V.isData3DTexture)w.setTexture3D(V,0),kt=F.TEXTURE_3D;else if(V.isDataArrayTexture||V.isCompressedArrayTexture)w.setTexture2DArray(V,0),kt=F.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}F.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,V.flipY),F.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,V.premultiplyAlpha),F.pixelStorei(F.UNPACK_ALIGNMENT,V.unpackAlignment);let zt=F.getParameter(F.UNPACK_ROW_LENGTH),ye=F.getParameter(F.UNPACK_IMAGE_HEIGHT),Ze=F.getParameter(F.UNPACK_SKIP_PIXELS),Re=F.getParameter(F.UNPACK_SKIP_ROWS),Cn=F.getParameter(F.UNPACK_SKIP_IMAGES),pe=z.isCompressedTexture?z.mipmaps[O]:z.image;F.pixelStorei(F.UNPACK_ROW_LENGTH,pe.width),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,pe.height),F.pixelStorei(F.UNPACK_SKIP_PIXELS,S.min.x),F.pixelStorei(F.UNPACK_SKIP_ROWS,S.min.y),F.pixelStorei(F.UNPACK_SKIP_IMAGES,S.min.z),z.isDataTexture||z.isData3DTexture?F.texSubImage3D(kt,O,D.x,D.y,D.z,ut,Mt,Ct,It,Xt,pe.data):z.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),F.compressedTexSubImage3D(kt,O,D.x,D.y,D.z,ut,Mt,Ct,It,pe.data)):F.texSubImage3D(kt,O,D.x,D.y,D.z,ut,Mt,Ct,It,Xt,pe),F.pixelStorei(F.UNPACK_ROW_LENGTH,zt),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,ye),F.pixelStorei(F.UNPACK_SKIP_PIXELS,Ze),F.pixelStorei(F.UNPACK_SKIP_ROWS,Re),F.pixelStorei(F.UNPACK_SKIP_IMAGES,Cn),O===0&&V.generateMipmaps&&F.generateMipmap(kt),yt.unbindTexture()},this.initTexture=function(S){S.isCubeTexture?w.setTextureCube(S,0):S.isData3DTexture?w.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?w.setTexture2DArray(S,0):w.setTexture2D(S,0),yt.unbindTexture()},this.resetState=function(){C=0,T=0,A=null,yt.reset(),Ht.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return On}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=t===Qo?"display-p3":"srgb",e.unpackColorSpace=ne.workingColorSpace===jr?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===me?Si:uh}set outputEncoding(t){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=t===Si?me:kn}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(t){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=t}},Ro=class extends Fs{};Ro.prototype.isWebGL1Renderer=!0;var Br=class i{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new qt(t),this.near=e,this.far=n}clone(){return new i(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},En=class extends De{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e}};var zr=class extends je{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},Ji=new oe,Jc=new oe,_r=[],jc=new zn,a0=new oe,Ts=new Qt,As=new wi,gn=class extends Qt{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new zr(new Float32Array(n*16),16),this.instanceColor=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,a0)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new zn),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Ji),jc.copy(t.boundingBox).applyMatrix4(Ji),this.boundingBox.union(jc)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new wi),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Ji),As.copy(t.boundingSphere).applyMatrix4(Ji),this.boundingSphere.union(As)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}raycast(t,e){let n=this.matrixWorld,s=this.count;if(Ts.geometry=this.geometry,Ts.material=this.material,Ts.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),As.copy(this.boundingSphere),As.applyMatrix4(n),t.ray.intersectsSphere(As)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Ji),Jc.multiplyMatrices(n,Ji),Ts.matrixWorld=Jc,Ts.raycast(t,_r);for(let a=0,o=_r.length;a<o;a++){let l=_r[a];l.instanceId=r,l.object=this,e.push(l)}_r.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new zr(new Float32Array(this.instanceMatrix.count*3),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}};var Ti=class extends on{constructor(t,e,n,s,r,a,o,l,c){super(t,e,n,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},cn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,s=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){let n=this.getLengths(),s=0,r=n.length,a;e?a=e:a=t*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=n[s]-a,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===a)return s/(r-1);let h=n[s],u=n[s+1]-h,p=(a-h)/u;return(s+p)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let a=this.getPoint(s),o=this.getPoint(r),l=e||(a.isVector2?new gt:new L);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){let n=new L,s=[],r=[],a=[],o=new L,l=new oe;for(let p=0;p<=t;p++){let g=p/t;s[p]=this.getTangentAt(g,new L)}r[0]=new L,a[0]=new L;let c=Number.MAX_VALUE,h=Math.abs(s[0].x),d=Math.abs(s[0].y),u=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),d<=c&&(c=d,n.set(0,1,0)),u<=c&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let p=1;p<=t;p++){if(r[p]=r[p-1].clone(),a[p]=a[p-1].clone(),o.crossVectors(s[p-1],s[p]),o.length()>Number.EPSILON){o.normalize();let g=Math.acos(Ie(s[p-1].dot(s[p]),-1,1));r[p].applyMatrix4(l.makeRotationAxis(o,g))}a[p].crossVectors(s[p],r[p])}if(e===!0){let p=Math.acos(Ie(r[0].dot(r[t]),-1,1));p/=t,s[0].dot(o.crossVectors(r[0],r[t]))>0&&(p=-p);for(let g=1;g<=t;g++)r[g].applyMatrix4(l.makeRotationAxis(s[g],p*g)),a[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},Os=class extends cn{constructor(t=0,e=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e){let n=e||new gt,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);let o=this.aStartAngle+t*r,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),u=l-this.aX,p=c-this.aY;l=u*h-p*d+this.aX,c=u*d+p*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},Po=class extends Os{constructor(t,e,n,s,r,a){super(t,e,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function el(){let i=0,t=0,e=0,n=0;function s(r,a,o,l){i=r,t=o,e=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){s(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,d){let u=(a-r)/c-(o-r)/(c+h)+(o-a)/h,p=(o-a)/h-(l-a)/(h+d)+(l-o)/d;u*=h,p*=h,s(a,o,u,p)},calc:function(r){let a=r*r,o=a*r;return i+t*r+e*a+n*o}}}var xr=new L,eo=new el,no=new el,io=new el,Lo=class extends cn{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new L){let n=e,s=this.points,r=s.length,a=(r-(this.closed?0:1))*t,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=s[(o-1)%r]:(xr.subVectors(s[0],s[1]).add(s[0]),c=xr);let d=s[o%r],u=s[(o+1)%r];if(this.closed||o+2<r?h=s[(o+2)%r]:(xr.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=xr),this.curveType==="centripetal"||this.curveType==="chordal"){let p=this.curveType==="chordal"?.5:.25,g=Math.pow(c.distanceToSquared(d),p),_=Math.pow(d.distanceToSquared(u),p),m=Math.pow(u.distanceToSquared(h),p);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),eo.initNonuniformCatmullRom(c.x,d.x,u.x,h.x,g,_,m),no.initNonuniformCatmullRom(c.y,d.y,u.y,h.y,g,_,m),io.initNonuniformCatmullRom(c.z,d.z,u.z,h.z,g,_,m)}else this.curveType==="catmullrom"&&(eo.initCatmullRom(c.x,d.x,u.x,h.x,this.tension),no.initCatmullRom(c.y,d.y,u.y,h.y,this.tension),io.initCatmullRom(c.z,d.z,u.z,h.z,this.tension));return n.set(eo.calc(l),no.calc(l),io.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new L().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function Qc(i,t,e,n,s){let r=(n-t)*.5,a=(s-e)*.5,o=i*i,l=i*o;return(2*e-2*n+r+a)*l+(-3*e+3*n-2*r-a)*o+r*i+e}function o0(i,t){let e=1-i;return e*e*t}function l0(i,t){return 2*(1-i)*i*t}function c0(i,t){return i*i*t}function Ps(i,t,e,n){return o0(i,t)+l0(i,e)+c0(i,n)}function h0(i,t){let e=1-i;return e*e*e*t}function u0(i,t){let e=1-i;return 3*e*e*i*t}function d0(i,t){return 3*(1-i)*i*i*t}function f0(i,t){return i*i*i*t}function Ls(i,t,e,n,s){return h0(i,t)+u0(i,e)+d0(i,n)+f0(i,s)}var Hr=class extends cn{constructor(t=new gt,e=new gt,n=new gt,s=new gt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new gt){let n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Ls(t,s.x,r.x,a.x,o.x),Ls(t,s.y,r.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Io=class extends cn{constructor(t=new L,e=new L,n=new L,s=new L){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new L){let n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Ls(t,s.x,r.x,a.x,o.x),Ls(t,s.y,r.y,a.y,o.y),Ls(t,s.z,r.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Vr=class extends cn{constructor(t=new gt,e=new gt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new gt){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new gt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Do=class extends cn{constructor(t=new L,e=new L){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new L){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new L){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Gr=class extends cn{constructor(t=new gt,e=new gt,n=new gt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new gt){let n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(Ps(t,s.x,r.x,a.x),Ps(t,s.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Uo=class extends cn{constructor(t=new L,e=new L,n=new L){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new L){let n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(Ps(t,s.x,r.x,a.x),Ps(t,s.y,r.y,a.y),Ps(t,s.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Wr=class extends cn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new gt){let n=e,s=this.points,r=(s.length-1)*t,a=Math.floor(r),o=r-a,l=s[a===0?a:a-1],c=s[a],h=s[a>s.length-2?s.length-1:a+1],d=s[a>s.length-3?s.length-1:a+2];return n.set(Qc(o,l.x,c.x,h.x,d.x),Qc(o,l.y,c.y,h.y,d.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new gt().fromArray(s))}return this}},th=Object.freeze({__proto__:null,ArcCurve:Po,CatmullRomCurve3:Lo,CubicBezierCurve:Hr,CubicBezierCurve3:Io,EllipseCurve:Os,LineCurve:Vr,LineCurve3:Do,QuadraticBezierCurve:Gr,QuadraticBezierCurve3:Uo,SplineCurve:Wr}),No=class extends cn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new th[n](e,t))}return this}getPoint(t,e){let n=t*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let a=s[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],n;for(let s=0,r=this.curves;s<r.length;s++){let a=r[s],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,l=a.getPoints(o);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){let s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(new th[s.type]().fromJSON(s))}return this}},Fo=class extends No{constructor(t){super(),this.type="Path",this.currentPoint=new gt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let n=new Vr(this.currentPoint.clone(),new gt(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){let r=new Gr(this.currentPoint.clone(),new gt(t,e),new gt(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,a){let o=new Hr(this.currentPoint.clone(),new gt(t,e),new gt(n,s),new gt(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),n=new Wr(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,a){let o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+o,e+l,n,s,r,a),this}absarc(t,e,n,s,r,a){return this.absellipse(t,e,n,n,s,r,a),this}ellipse(t,e,n,s,r,a,o,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,s,r,a,o,l),this}absellipse(t,e,n,s,r,a,o,l){let c=new Os(t,e,n,s,r,a,o,l);if(this.curves.length>0){let d=c.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},Oo=class i extends ln{constructor(t=[new gt(0,-.5),new gt(.5,0),new gt(0,.5)],e=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:s},e=Math.floor(e),s=Ie(s,0,Math.PI*2);let r=[],a=[],o=[],l=[],c=[],h=1/e,d=new L,u=new gt,p=new L,g=new L,_=new L,m=0,f=0;for(let M=0;M<=t.length-1;M++)switch(M){case 0:m=t[M+1].x-t[M].x,f=t[M+1].y-t[M].y,p.x=f*1,p.y=-m,p.z=f*0,_.copy(p),p.normalize(),l.push(p.x,p.y,p.z);break;case t.length-1:l.push(_.x,_.y,_.z);break;default:m=t[M+1].x-t[M].x,f=t[M+1].y-t[M].y,p.x=f*1,p.y=-m,p.z=f*0,g.copy(p),p.x+=_.x,p.y+=_.y,p.z+=_.z,p.normalize(),l.push(p.x,p.y,p.z),_.copy(g)}for(let M=0;M<=e;M++){let x=n+M*h*s,b=Math.sin(x),C=Math.cos(x);for(let T=0;T<=t.length-1;T++){d.x=t[T].x*b,d.y=t[T].y,d.z=t[T].x*C,a.push(d.x,d.y,d.z),u.x=M/e,u.y=T/(t.length-1),o.push(u.x,u.y);let A=l[3*T+0]*b,B=l[3*T+1],y=l[3*T+0]*C;c.push(A,B,y)}}for(let M=0;M<e;M++)for(let x=0;x<t.length-1;x++){let b=x+M*t.length,C=b,T=b+t.length,A=b+t.length+1,B=b+1;r.push(C,T,B),r.push(A,B,T)}this.setIndex(r),this.setAttribute("position",new ue(a,3)),this.setAttribute("uv",new ue(o,2)),this.setAttribute("normal",new ue(c,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.points,t.segments,t.phiStart,t.phiLength)}},si=class i extends Oo{constructor(t=1,e=1,n=4,s=8){let r=new Fo;r.absarc(0,-e/2,t,Math.PI*1.5,0),r.absarc(0,e/2,t,0,Math.PI*.5),super(r.getPoints(n),s),this.type="CapsuleGeometry",this.parameters={radius:t,length:e,capSegments:n,radialSegments:s}}static fromJSON(t){return new i(t.radius,t.length,t.capSegments,t.radialSegments)}},Xr=class i extends ln{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);let r=[],a=[],o=[],l=[],c=new L,h=new gt;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let d=0,u=3;d<=e;d++,u+=3){let p=n+d/e*s;c.x=t*Math.cos(p),c.y=t*Math.sin(p),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[u]/t+1)/2,h.y=(a[u+1]/t+1)/2,l.push(h.x,h.y)}for(let d=1;d<=e;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new ue(a,3)),this.setAttribute("normal",new ue(o,3)),this.setAttribute("uv",new ue(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.segments,t.thetaStart,t.thetaLength)}},Ai=class i extends ln{constructor(t=1,e=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let h=[],d=[],u=[],p=[],g=0,_=[],m=n/2,f=0;M(),a===!1&&(t>0&&x(!0),e>0&&x(!1)),this.setIndex(h),this.setAttribute("position",new ue(d,3)),this.setAttribute("normal",new ue(u,3)),this.setAttribute("uv",new ue(p,2));function M(){let b=new L,C=new L,T=0,A=(e-t)/n;for(let B=0;B<=r;B++){let y=[],E=B/r,N=E*(e-t)+t;for(let W=0;W<=s;W++){let Y=W/s,R=Y*l+o,U=Math.sin(R),G=Math.cos(R);C.x=N*U,C.y=-E*n+m,C.z=N*G,d.push(C.x,C.y,C.z),b.set(U,A,G).normalize(),u.push(b.x,b.y,b.z),p.push(Y,1-E),y.push(g++)}_.push(y)}for(let B=0;B<s;B++)for(let y=0;y<r;y++){let E=_[y][B],N=_[y+1][B],W=_[y+1][B+1],Y=_[y][B+1];h.push(E,N,Y),h.push(N,W,Y),T+=6}c.addGroup(f,T,0),f+=T}function x(b){let C=g,T=new gt,A=new L,B=0,y=b===!0?t:e,E=b===!0?1:-1;for(let W=1;W<=s;W++)d.push(0,m*E,0),u.push(0,E,0),p.push(.5,.5),g++;let N=g;for(let W=0;W<=s;W++){let R=W/s*l+o,U=Math.cos(R),G=Math.sin(R);A.x=y*G,A.y=m*E,A.z=y*U,d.push(A.x,A.y,A.z),u.push(0,E,0),T.x=U*.5+.5,T.y=G*.5*E+.5,p.push(T.x,T.y),g++}for(let W=0;W<s;W++){let Y=C+W,R=N+W;b===!0?h.push(R,R+1,Y):h.push(R+1,R,Y),B+=3}c.addGroup(f,B,b===!0?1:2),f+=B}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},qr=class i extends Ai{constructor(t=1,e=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new i(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}};var cs=class i extends ln{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let l=Math.min(a+o,Math.PI),c=0,h=[],d=new L,u=new L,p=[],g=[],_=[],m=[];for(let f=0;f<=n;f++){let M=[],x=f/n,b=0;f===0&&a===0?b=.5/e:f===n&&l===Math.PI&&(b=-.5/e);for(let C=0;C<=e;C++){let T=C/e;d.x=-t*Math.cos(s+T*r)*Math.sin(a+x*o),d.y=t*Math.cos(a+x*o),d.z=t*Math.sin(s+T*r)*Math.sin(a+x*o),g.push(d.x,d.y,d.z),u.copy(d).normalize(),_.push(u.x,u.y,u.z),m.push(T+b,1-x),M.push(c++)}h.push(M)}for(let f=0;f<n;f++)for(let M=0;M<e;M++){let x=h[f][M+1],b=h[f][M],C=h[f+1][M],T=h[f+1][M+1];(f!==0||a>0)&&p.push(x,b,T),(f!==n-1||l<Math.PI)&&p.push(b,C,T)}this.setIndex(p),this.setAttribute("position",new ue(g,3)),this.setAttribute("normal",new ue(_,3)),this.setAttribute("uv",new ue(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var $r=class i extends ln{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);let a=[],o=[],l=[],c=[],h=new L,d=new L,u=new L;for(let p=0;p<=n;p++)for(let g=0;g<=s;g++){let _=g/s*r,m=p/n*Math.PI*2;d.x=(t+e*Math.cos(m))*Math.cos(_),d.y=(t+e*Math.cos(m))*Math.sin(_),d.z=e*Math.sin(m),o.push(d.x,d.y,d.z),h.x=t*Math.cos(_),h.y=t*Math.sin(_),u.subVectors(d,h).normalize(),l.push(u.x,u.y,u.z),c.push(g/s),c.push(p/n)}for(let p=1;p<=n;p++)for(let g=1;g<=s;g++){let _=(s+1)*p+g-1,m=(s+1)*(p-1)+g-1,f=(s+1)*(p-1)+g,M=(s+1)*p+g;a.push(_,m,M),a.push(m,f,M)}this.setIndex(a),this.setAttribute("position",new ue(o,3)),this.setAttribute("normal",new ue(l,3)),this.setAttribute("uv",new ue(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}};var Ge=class extends Ei{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new qt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new qt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=dh,this.normalScale=new gt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Jo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};function yr(i,t,e){return!i||!e&&i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function p0(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}var hs=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let a;e:{i:if(!(t<s)){for(let o=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=e[++n],t<s)break t}a=e.length;break e}if(!(t>=r)){let o=e[1];t<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=e[--n-1],t>=r)break t}a=n,n=0;break e}break n}for(;n<a;){let o=n+a>>>1;t<e[o]?a=o:n=o+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let a=0;a!==s;++a)e[a]=n[r+a];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},ko=class extends hs{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:oc,endingEnd:oc}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,a=t+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case lc:r=t,o=2*e-n;break;case cc:r=s.length-2,o=e+s[r]-s[r+1];break;default:r=t,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case lc:a=t,l=2*n-e;break;case cc:a=1,l=n+s[1]-s[0];break;default:a=t-1,l=e}let c=(n-e)*.5,h=this.valueSize;this._weightPrev=c/(e-o),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this._offsetPrev,d=this._offsetNext,u=this._weightPrev,p=this._weightNext,g=(n-e)/(s-e),_=g*g,m=_*g,f=-u*m+2*u*_-u*g,M=(1+u)*m+(-1.5-2*u)*_+(-.5+u)*g+1,x=(-1-p)*m+(1.5+p)*_+.5*g,b=p*m-p*_;for(let C=0;C!==o;++C)r[C]=f*a[h+C]+M*a[c+C]+x*a[l+C]+b*a[d+C];return r}},Bo=class extends hs{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=(n-e)/(s-e),d=1-h;for(let u=0;u!==o;++u)r[u]=a[c+u]*d+a[l+u]*h;return r}},zo=class extends hs{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},_n=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=yr(e,this.TimeBufferType),this.values=yr(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:yr(t.times,Array),values:yr(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new zo(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Bo(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new ko(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case Mr:e=this.InterpolantFactoryMethodDiscrete;break;case br:e=this.InterpolantFactoryMethodLinear;break;case Pa:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Mr;case this.InterpolantFactoryMethodLinear:return br;case this.InterpolantFactoryMethodSmooth:return Pa}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t}return this}trim(t,e){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<t;)++r;for(;a!==-1&&n[a]>e;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==r;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),t=!1;break}if(a!==null&&a>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,a),t=!1;break}a=l}if(s!==void 0&&p0(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Pa,r=t.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=t[o],h=t[o+1];if(c!==h&&(o!==1||c!==t[0]))if(s)l=!0;else{let d=o*n,u=d-n,p=d+n;for(let g=0;g!==n;++g){let _=e[d+g];if(_!==e[u+g]||_!==e[p+g]){l=!0;break}}}if(l){if(o!==a){t[a]=t[o];let d=o*n,u=a*n;for(let p=0;p!==n;++p)e[u+p]=e[d+p]}++a}}if(r>0){t[a]=t[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)e[l+c]=e[o+c];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,s}};_n.prototype.TimeBufferType=Float32Array;_n.prototype.ValueBufferType=Float32Array;_n.prototype.DefaultInterpolation=br;var Ci=class extends _n{};Ci.prototype.ValueTypeName="bool";Ci.prototype.ValueBufferType=Array;Ci.prototype.DefaultInterpolation=Mr;Ci.prototype.InterpolantFactoryMethodLinear=void 0;Ci.prototype.InterpolantFactoryMethodSmooth=void 0;var Ho=class extends _n{};Ho.prototype.ValueTypeName="color";var Vo=class extends _n{};Vo.prototype.ValueTypeName="number";var Go=class extends hs{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-e)/(s-e),c=t*o;for(let h=c+o;c!==h;c+=4)Sn.slerpFlat(r,0,a,c-o,a,c,l);return r}},ks=class extends _n{InterpolantFactoryMethodLinear(t){return new Go(this.times,this.values,this.getValueSize(),t)}};ks.prototype.ValueTypeName="quaternion";ks.prototype.DefaultInterpolation=br;ks.prototype.InterpolantFactoryMethodSmooth=void 0;var Ri=class extends _n{};Ri.prototype.ValueTypeName="string";Ri.prototype.ValueBufferType=Array;Ri.prototype.DefaultInterpolation=Mr;Ri.prototype.InterpolantFactoryMethodLinear=void 0;Ri.prototype.InterpolantFactoryMethodSmooth=void 0;var Wo=class extends _n{};Wo.prototype.ValueTypeName="vector";var Xo=class{constructor(t,e,n){let s=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){let d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=c.length;d<u;d+=2){let p=c[d],g=c[d+1];if(p.global&&(p.lastIndex=0),p.test(h))return g}return null}}},m0=new Xo,qo=class{constructor(t){this.manager=t!==void 0?t:m0,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}};qo.DEFAULT_MATERIAL_NAME="__DEFAULT";var Yr=class extends De{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new qt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),e}},Zr=class extends Yr{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(De.DEFAULT_UP),this.updateMatrix(),this.groundColor=new qt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}},so=new oe,eh=new L,nh=new L,$o=class{constructor(t){this.camera=t,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new gt(512,512),this.map=null,this.mapPass=null,this.matrix=new oe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ns,this._frameExtents=new gt(1,1),this._viewportCount=1,this._viewports=[new Le(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,n=this.matrix;eh.setFromMatrixPosition(t.matrixWorld),e.position.copy(eh),nh.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(nh),e.updateMatrixWorld(),so.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(so),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(so)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}};var Yo=class extends $o{constructor(){super(new Fr(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Bs=class extends Yr{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(De.DEFAULT_UP),this.updateMatrix(),this.target=new De,this.shadow=new Yo}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}};var nl="\\[\\]\\.:\\/",g0=new RegExp("["+nl+"]","g"),il="[^"+nl+"]",_0="[^"+nl.replace("\\.","")+"]",x0=/((?:WC+[\/:])*)/.source.replace("WC",il),y0=/(WCOD+)?/.source.replace("WCOD",_0),v0=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",il),M0=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",il),b0=new RegExp("^"+x0+y0+v0+M0+"$"),S0=["material","materials","bones","map"],Zo=class{constructor(t,e,n){let s=n||he.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},he=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(g0,"")}static parseTrackName(t){let e=b0.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);S0.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===e||o.uuid===e)return o;let l=n(o.children);if(l)return l}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let a=t[s];if(a===void 0){let c=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};he.Composite=Zo;he.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};he.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};he.prototype.GetterByBindingType=[he.prototype._getValue_direct,he.prototype._getValue_array,he.prototype._getValue_arrayElement,he.prototype._getValue_toArray];he.prototype.SetterByBindingTypeAndVersioning=[[he.prototype._setValue_direct,he.prototype._setValue_direct_setNeedsUpdate,he.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[he.prototype._setValue_array,he.prototype._setValue_array_setNeedsUpdate,he.prototype._setValue_array_setMatrixWorldNeedsUpdate],[he.prototype._setValue_arrayElement,he.prototype._setValue_arrayElement_setNeedsUpdate,he.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[he.prototype._setValue_fromArray,he.prototype._setValue_fromArray_setNeedsUpdate,he.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var q0=new Float32Array(1);typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ko}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ko);var xn={id:"ufm",name:"Ultimate Football Mobile",shortName:"UFM",tagline:"Own The Pitch",version:"1.0.0",saveKey:"ufm_save_v1",season:"Season 2026"},_t={length:105,width:68,goalWidth:7.32,goalHeight:2.44,goalDepth:2.1,boxW:40.3,boxD:16.5,box6W:18.32,box6D:5.5},Ut=_t.length/2,ce=_t.width/2,Se=_t.goalWidth/2,Sh={short:180,normal:300,long:480},Vs={low:{label:"LOW",pixelRatio:.8,shadows:!1,crowd:1600,fx:!1},medium:{label:"MEDIUM",pixelRatio:1,shadows:!1,crowd:3600,fx:!0},high:{label:"HIGH",pixelRatio:1.35,shadows:!0,crowd:6800,fx:!0}};var Bt=(i,t,e)=>i<t?t:i>e?e:i,ri=i=>Bt(i,0,1),Me=(i,t,e)=>i+(t-i)*e;function ds(i,t,e){let n=(t-i)%(Math.PI*2);return n>Math.PI&&(n-=Math.PI*2),n<-Math.PI&&(n+=Math.PI*2),i+n*e}function Qe(i){let t=i>>>0;return function(){t|=0,t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}var sl=(i,t)=>t[Math.floor(i()*t.length)%t.length];function Gs(i,t){let e=t.slice();for(let n=e.length-1;n>0;n--){let s=Math.floor(i()*(n+1)),r=e[n];e[n]=e[s],e[s]=r}return e}function rl(){let i=new Date;return`${i.getFullYear()}-${i.getMonth()+1}-${i.getDate()}`}function Tn(i){try{window.AndroidBridge&&window.AndroidBridge.vibrate?window.AndroidBridge.vibrate(i):navigator.vibrate&&navigator.vibrate(i)}catch{}}function J(i,t,e){let n=document.createElement(i);return t&&(n.className=t),e!==void 0&&(n.innerHTML=e),n}var wh=xn.saveKey;function Eh(){return{graphics:"auto",fps:60,sound:.8,music:.5,cameraSens:.6,joystickSize:1,language:"en",dayNight:"night",matchLength:"normal",difficulty:"normal",autoDetected:""}}function ol(){return{v:1,created:Date.now(),profile:{name:"Manager",xp:0,level:1,matches:0,wins:0,draws:0,losses:0,goalsFor:0,goalsAgainst:0,trophies:[]},coins:2500,settings:Eh(),squad:[],players:{},lineup:{formation:"4-3-3",slots:[]},market:{day:"",items:[]},career:null,tournament:null,training:{best:0},penalty:{best:0}}}var Ae=null;function ll(){if(Ae)return Ae;try{let i=localStorage.getItem(wh);if(i){let t=JSON.parse(i);return Ae=w0(t),Ae}}catch(i){console.warn("save load failed",i)}return Ae=ol(),we(),Ae}function w0(i){let t=ol();for(let e of Object.keys(t))i[e]===void 0&&(i[e]=t[e]);return i.settings=Object.assign(Eh(),i.settings||{}),i.profile=Object.assign(t.profile,i.profile||{}),i}function Pt(){return Ae||ll()}var al=null;function we(){try{localStorage.setItem(wh,JSON.stringify(Ae))}catch(i){console.warn("save failed",i)}}function xe(){al||(al=setTimeout(()=>{al=null,we()},400))}function Th(){Ae=ol(),we()}function ea(i){return 100*i*i}function ta(i){let t=1;for(;i>=ea(t);)t++;return t}function na(i){Ae.coins=Math.max(0,Ae.coins+i),xe()}function ia(i){let t=ta(Ae.profile.xp);return Ae.profile.xp+=i,Ae.profile.level=ta(Ae.profile.xp),xe(),Ae.profile.level>t?Ae.profile.level:0}function Ah({userScore:i,oppScore:t}){let e=Ae.profile;e.matches++,i>t?e.wins++:i===t?e.draws++:e.losses++,e.goalsFor+=i,e.goalsAgainst+=t,xe()}function cl(i){Ae.profile.trophies.push({name:i,at:Date.now()}),xe()}var hl={en:{name_full:"Ultimate Football Mobile",tagline:"Own The Pitch",play:"Play",match:"Match",tournament:"Tournament",team:"Team",players:"Players",shop:"Shop",settings:"Settings",profile:"Profile",quick_match:"Quick Match",career:"Career",penalty:"Penalty Shootout",training:"Training",online:"Online Match",soon:"Coming soon",choose_mode:"Choose Mode",quick_desc:"Single friendly match. Pick opponent and difficulty.",career_desc:"Play a league season and win the title.",tournament_desc:"8-team knockout cup. Lift the trophy.",penalty_desc:"5 kicks. Beat the keeper from the spot.",training_desc:"Free shooting range. Hit targets for coins.",online_desc:"Play against real managers worldwide.",back:"Back",coins:"Coins",level:"Level",xp:"XP",goal:"GOAL!",own_goal:"OWN GOAL",half_time:"HALF TIME",full_time:"FULL TIME",kickoff:"KICK OFF",you_win:"VICTORY!",you_lose:"DEFEAT",draw:"DRAW",paused:"PAUSED",resume:"Resume",controls_help:"Controls",quit_match:"Quit Match",graphics:"Graphics",fps:"Frame Rate",sound:"Sound",music:"Music",camera_sens:"Camera Sensitivity",joystick_size:"Joystick Size",language:"Language",time_of_day:"Time of Day",day:"Day",night:"Night",match_length:"Match Length",short:"Short",normal:"Normal",long:"Long",difficulty:"Difficulty",easy:"Easy",hard:"Hard",pro:"Pro",legendary:"Legendary",auto_quality:"Auto Graphics",reset_save:"Reset Save Data",reset_confirm:"Delete all progress?",confirm:"Confirm",cancel:"Cancel",ok:"OK",yes:"Yes",no:"No",formation:"Formation",auto_pick:"Auto Pick",team_ovr:"Team OVR",lineup_hint:"Tap two players to swap positions.",starters:"Starting XI",bench:"Bench",upgrade:"Upgrade",sell:"Sell",buy:"Buy",value:"Value",cost:"Cost",max_level:"Max",stats:"Attributes",speed:"Speed",shooting:"Shooting",passing:"Passing",dribbling:"Dribbling",defending:"Defending",physical:"Physical",stamina:"Stamina",rating:"Rating",position:"Position",market:"Transfer Market",refresh_daily:"New offers every day",not_enough:"Not enough coins",purchased:"Signed!",sold:"Player sold",squad_full:"Squad is full",season:"Season",fixture:"Fixture",standings:"Standings",champion:"CHAMPION!",next_match:"Next Match",quarter_final:"Quarter-final",semi_final:"Semi-final",final:"Final",trophy:"Trophy",shoot_hint:"Tap a zone to shoot",save_hint:"Tap a zone to dive",scored:"SCORED",saved:"SAVED",missed:"MISSED",round_k:"Kick",your_shot:"You shoot",your_save:"You save",targets:"Targets",time_left:"Time",best:"Best",match_rewards:"Match Rewards",win_bonus:"Win bonus",goal_bonus:"Goals",cont:"Continue",manager:"Manager",matches:"Matches",wins:"W",draws:"D",losses:"L",goals_for:"Goals scored",goals_con:"Goals conceded",tap_name:"Tap to change name",opp_choose:"Opponent",home:"Home",away:"Away",start_match:"Start Match",power:"Power",sprint:"Sprint",pass:"Pass",shoot:"Shoot",through:"Through",tackle:"Tackle",press:"Press",switchp:"Switch",long_pass:"Long Pass",controls_text:"Left \u2014 joystick: move. Right \u2014 action buttons.<br>Hold SHOOT for power, quick tap = finesse, double-tap = chip.<br>Hold PASS for a long ball, THROUGH leads the runner.<br>On defense: TACKLE to steal, PRESS to chase, SWITCH to change player.",quality_changed:"Graphics applied",welcome:"Welcome, Manager!",season_start:"Season begins. Good luck!",cup_start:"Cup run begins!",eliminated:"Eliminated",career_done:"Season complete!",daily_ready:"Market refreshed",reward_claimed:"Reward claimed",quit_confirm:"Quit the match? Progress will be lost.",offline_note:"Works fully offline",club_pick:"Your Team"},uz:{name_full:"Ultimate Football Mobile",tagline:"Maydon Seniki",play:"O'ynash",match:"O'yin",tournament:"Turnir",team:"Jamoa",players:"Futbolchilar",shop:"Do'kon",settings:"Sozlamalar",profile:"Profil",quick_match:"Tezkor o'yin",career:"Karyera",penalty:"Penalti seriyasi",training:"Mashg'ulot",online:"Onlayn o'yin",soon:"Tez orada",choose_mode:"Rejimni tanlang",quick_desc:"Bitta o'rtoqlik uchrashuvi. Raqib va qiyinlikni tanlang.",career_desc:"Liga mavsumini o'ynab, chempionlikni qo'lga kiriting.",tournament_desc:"8 jamoali kubok. Sovrinni yutib oling.",penalty_desc:"5 ta zarba. Darvozabondan o'zingizni o'tib oling.",training_desc:"Erkin zarba maydoni. Nishonlarga tegib tanga yutib oling.",online_desc:"Butun dunyo murabbiylariga qarshi o'ynang.",back:"Orqaga",coins:"Tanga",level:"Daraja",xp:"Tajriba",goal:"GOL!",own_goal:"AVTOGOL",half_time:"TANAFFUS",full_time:"O'YIN TUGADI",kickoff:"BOSHLANDI",you_win:"G'ALABA!",you_lose:"MAG'LUBIYAT",draw:"DURRANG",paused:"TO'XTATILDI",resume:"Davom etish",controls_help:"Boshqaruv",quit_match:"O'yindan chiqish",graphics:"Grafika",fps:"Kadrlar chastotasi",sound:"Ovoz",music:"Musiqa",camera_sens:"Kamera sezgirligi",joystick_size:"Joystik hajmi",language:"Til",time_of_day:"Kun vaqti",day:"Kunduz",night:"Kechki",match_length:"O'yin davomiyligi",short:"Qisqa",normal:"O'rta",long:"Uzoq",difficulty:"Qiyinlik darajasi",easy:"Oson",hard:"Qiyin",pro:"Pro",legendary:"Afsonaviy",auto_quality:"Avto grafika",reset_save:"Saqlangan ma'lumotlarni o'chirish",reset_confirm:"Barcha natijalar o'chirilsinmi?",confirm:"Tasdiqlash",cancel:"Bekor qilish",ok:"OK",yes:"Ha",no:"Yo'q",formation:"Formatsiya",auto_pick:"Avto tanlash",team_ovr:"Jamoa OVR",lineup_hint:"Ikki futbolchini bosib o'rin almashtiring.",starters:"Asosiy tarkib",bench:"Zaxira",upgrade:"Yaxshilash",sell:"Sotish",buy:"Sotib olish",value:"Qiymat",cost:"Narx",max_level:"Maksimum",stats:"Ko'rsatkichlar",speed:"Tezlik",shooting:"Zarba",passing:"Pas",dribbling:"Dribling",defending:"Himoya",physical:"Jismoniy",stamina:"Chidam",rating:"Reyting",position:"Pozitsiya",market:"Transfer bozori",refresh_daily:"Har kuni yangi takliflar",not_enough:"Tanga yetarli emas",purchased:"Sotib olindi!",sold:"Futbolchi sotildi",squad_full:"Jamoa to'lib ketgan",season:"Mavsum",fixture:"Tur",standings:"Jadval",champion:"CHEMPION!",next_match:"Keyingi o'yin",quarter_final:"Chorak final",semi_final:"Yarim final",final:"Final",trophy:"Kubok",shoot_hint:"Zarba yo'nalishini tanlang",save_hint:"Sakrash yo'nalishini tanlang",scored:"GOL",saved:"QAYTARILDI",missed:"PROMAH",round_k:"Zarba",your_shot:"Siz tepasiz",your_save:"Siz himoyadasiz",targets:"Nishonlar",time_left:"Vaqt",best:"Rekord",match_rewards:"Mukofotlar",win_bonus:"G'alaba bonusi",goal_bonus:"Gollar",cont:"Davom etish",manager:"Murabbiy",matches:"O'yinlar",wins:"G'",draws:"D",losses:"M",goals_for:"Urilgan gollar",goals_con:"O'tkazilgan gollar",tap_name:"Ismni o'zgartirish",opp_choose:"Raqib",home:"Uy",away:"Mehmon",start_match:"O'yinni boshlash",power:"Kuch",sprint:"Sprint",pass:"Pas",shoot:"Zarba",through:"Yorib o'tish",tackle:"Tackl",press:"Pressing",switchp:"Almashtirish",long_pass:"Uzun pas",controls_text:"Chap \u2014 joystik: harakat. O'ng \u2014 amal tugmalari.<br>Zarba tugmasini bosib turing \u2014 kuch oshadi, tez bosish \u2014 aniq zarba, ikki marta bosish \u2014 chip.<br>Pasni bosib turing \u2014 uzun pas, THROUGH \u2014 yugurayotgan hamkorlarga.<br>Himoyada: TACKLE \u2014 to'pni olish, PRESS \u2014 quvish, SWITCH \u2014 futbolchini almashtirish.",quality_changed:"Grafika qo'llandi",welcome:"Xush kelibsiz, murabbiy!",season_start:"Mavsum boshlandi. Omad!",cup_start:"Kubok yo'li boshlandi!",eliminated:"Turnirdan chiqdingiz",career_done:"Mavsum yakunlandi!",daily_ready:"Bozor yangilandi",reward_claimed:"Mukofot olindi",quit_confirm:"O'yindan chiqasizmi? Natija saqlanmaydi.",offline_note:"Internetsiz to'liq ishlaydi",club_pick:"Sizning jamoangiz"},ru:{name_full:"Ultimate Football Mobile",tagline:"\u041F\u043E\u043B\u0435 \u2014 \u0442\u0432\u043E\u0451",play:"\u0418\u0433\u0440\u0430\u0442\u044C",match:"\u041C\u0430\u0442\u0447",tournament:"\u0422\u0443\u0440\u043D\u0438\u0440",team:"\u041A\u043E\u043C\u0430\u043D\u0434\u0430",players:"\u0418\u0433\u0440\u043E\u043A\u0438",shop:"\u041C\u0430\u0433\u0430\u0437\u0438\u043D",settings:"\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438",profile:"\u041F\u0440\u043E\u0444\u0438\u043B\u044C",quick_match:"\u0411\u044B\u0441\u0442\u0440\u044B\u0439 \u043C\u0430\u0442\u0447",career:"\u041A\u0430\u0440\u044C\u0435\u0440\u0430",penalty:"\u0421\u0435\u0440\u0438\u044F \u043F\u0435\u043D\u0430\u043B\u044C\u0442\u0438",training:"\u0422\u0440\u0435\u043D\u0438\u0440\u043E\u0432\u043A\u0430",online:"\u041E\u043D\u043B\u0430\u0439\u043D \u043C\u0430\u0442\u0447",soon:"\u0421\u043A\u043E\u0440\u043E",choose_mode:"\u0412\u044B\u0431\u043E\u0440 \u0440\u0435\u0436\u0438\u043C\u0430",quick_desc:"\u041E\u0434\u0438\u043D \u0442\u043E\u0432\u0430\u0440\u0438\u0449\u0435\u0441\u043A\u0438\u0439 \u043C\u0430\u0442\u0447. \u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0441\u043E\u043F\u0435\u0440\u043D\u0438\u043A\u0430 \u0438 \u0441\u043B\u043E\u0436\u043D\u043E\u0441\u0442\u044C.",career_desc:"\u0421\u044B\u0433\u0440\u0430\u0439\u0442\u0435 \u0441\u0435\u0437\u043E\u043D \u043B\u0438\u0433\u0438 \u0438 \u0432\u043E\u0437\u044C\u043C\u0438\u0442\u0435 \u0442\u0438\u0442\u0443\u043B.",tournament_desc:"\u041A\u0443\u0431\u043E\u043A \u0438\u0437 8 \u043A\u043E\u043C\u0430\u043D\u0434. \u041F\u043E\u0434\u043D\u0438\u043C\u0438\u0442\u0435 \u0442\u0440\u043E\u0444\u0435\u0439.",penalty_desc:"5 \u0443\u0434\u0430\u0440\u043E\u0432. \u041E\u0431\u044B\u0433\u0440\u0430\u0439\u0442\u0435 \u0432\u0440\u0430\u0442\u0430\u0440\u044F \u0441 \u0442\u043E\u0447\u043A\u0438.",training_desc:"\u0421\u0432\u043E\u0431\u043E\u0434\u043D\u044B\u0439 \u0442\u0438\u0440. \u041F\u043E\u043F\u0430\u0434\u0430\u0439\u0442\u0435 \u043F\u043E \u043C\u0438\u0448\u0435\u043D\u044F\u043C \u0437\u0430 \u043C\u043E\u043D\u0435\u0442\u044B.",online_desc:"\u0418\u0433\u0440\u0430\u0439\u0442\u0435 \u043F\u0440\u043E\u0442\u0438\u0432 \u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440\u043E\u0432 \u0441\u043E \u0432\u0441\u0435\u0433\u043E \u043C\u0438\u0440\u0430.",back:"\u041D\u0430\u0437\u0430\u0434",coins:"\u041C\u043E\u043D\u0435\u0442\u044B",level:"\u0423\u0440\u043E\u0432\u0435\u043D\u044C",xp:"\u041E\u043F\u044B\u0442",goal:"\u0413\u041E\u041B!",own_goal:"\u0410\u0412\u0422\u041E\u0413\u041E\u041B",half_time:"\u041F\u0415\u0420\u0415\u0420\u042B\u0412",full_time:"\u041C\u0410\u0422\u0427 \u041E\u041A\u041E\u041D\u0427\u0415\u041D",kickoff:"\u0421\u0422\u0410\u0420\u0422",you_win:"\u041F\u041E\u0411\u0415\u0414\u0410!",you_lose:"\u041F\u041E\u0420\u0410\u0416\u0415\u041D\u0418\u0415",draw:"\u041D\u0418\u0427\u042C\u042F",paused:"\u041F\u0410\u0423\u0417\u0410",resume:"\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C",controls_help:"\u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435",quit_match:"\u0412\u044B\u0439\u0442\u0438 \u0438\u0437 \u043C\u0430\u0442\u0447\u0430",graphics:"\u0413\u0440\u0430\u0444\u0438\u043A\u0430",fps:"\u0427\u0430\u0441\u0442\u043E\u0442\u0430 \u043A\u0430\u0434\u0440\u043E\u0432",sound:"\u0417\u0432\u0443\u043A",music:"\u041C\u0443\u0437\u044B\u043A\u0430",camera_sens:"\u0427\u0443\u0432\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C \u043A\u0430\u043C\u0435\u0440\u044B",joystick_size:"\u0420\u0430\u0437\u043C\u0435\u0440 \u0434\u0436\u043E\u0439\u0441\u0442\u0438\u043A\u0430",language:"\u042F\u0437\u044B\u043A",time_of_day:"\u0412\u0440\u0435\u043C\u044F \u0441\u0443\u0442\u043E\u043A",day:"\u0414\u0435\u043D\u044C",night:"\u0412\u0435\u0447\u0435\u0440",match_length:"\u0414\u043B\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C \u043C\u0430\u0442\u0447\u0430",short:"\u041A\u043E\u0440\u043E\u0442\u043A\u0438\u0439",normal:"\u0421\u0440\u0435\u0434\u043D\u0438\u0439",long:"\u0414\u043B\u0438\u043D\u043D\u044B\u0439",difficulty:"\u0421\u043B\u043E\u0436\u043D\u043E\u0441\u0442\u044C",easy:"\u041B\u0451\u0433\u043A\u0438\u0439",hard:"\u0421\u043B\u043E\u0436\u043D\u044B\u0439",pro:"\u041F\u0440\u043E",legendary:"\u041B\u0435\u0433\u0435\u043D\u0434\u0430\u0440\u043D\u044B\u0439",auto_quality:"\u0410\u0432\u0442\u043E-\u0433\u0440\u0430\u0444\u0438\u043A\u0430",reset_save:"\u0421\u0431\u0440\u043E\u0441\u0438\u0442\u044C \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u0435",reset_confirm:"\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0432\u0435\u0441\u044C \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441?",confirm:"\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C",cancel:"\u041E\u0442\u043C\u0435\u043D\u0430",ok:"OK",yes:"\u0414\u0430",no:"\u041D\u0435\u0442",formation:"\u0424\u043E\u0440\u043C\u0430\u0446\u0438\u044F",auto_pick:"\u0410\u0432\u0442\u043E-\u0441\u043E\u0441\u0442\u0430\u0432",team_ovr:"OVR \u043A\u043E\u043C\u0430\u043D\u0434\u044B",lineup_hint:"\u041D\u0430\u0436\u043C\u0438\u0442\u0435 \u043D\u0430 \u0434\u0432\u0443\u0445 \u0438\u0433\u0440\u043E\u043A\u043E\u0432, \u0447\u0442\u043E\u0431\u044B \u043F\u043E\u043C\u0435\u043D\u044F\u0442\u044C \u043C\u0435\u0441\u0442\u0430\u043C\u0438.",starters:"\u041E\u0441\u043D\u043E\u0432\u043D\u043E\u0439 \u0441\u043E\u0441\u0442\u0430\u0432",bench:"\u0417\u0430\u043F\u0430\u0441\u043D\u044B\u0435",upgrade:"\u0423\u043B\u0443\u0447\u0448\u0438\u0442\u044C",sell:"\u041F\u0440\u043E\u0434\u0430\u0442\u044C",buy:"\u041A\u0443\u043F\u0438\u0442\u044C",value:"\u0426\u0435\u043D\u0430",cost:"\u0421\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C",max_level:"\u041C\u0430\u043A\u0441\u0438\u043C\u0443\u043C",stats:"\u0425\u0430\u0440\u0430\u043A\u0442\u0435\u0440\u0438\u0441\u0442\u0438\u043A\u0438",speed:"\u0421\u043A\u043E\u0440\u043E\u0441\u0442\u044C",shooting:"\u0423\u0434\u0430\u0440",passing:"\u041F\u0430\u0441",dribbling:"\u0414\u0440\u0438\u0431\u043B\u0438\u043D\u0433",defending:"\u0417\u0430\u0449\u0438\u0442\u0430",physical:"\u0424\u0438\u0437\u0438\u043A\u0430",stamina:"\u0412\u044B\u043D\u043E\u0441\u043B\u0438\u0432\u043E\u0441\u0442\u044C",rating:"\u0420\u0435\u0439\u0442\u0438\u043D\u0433",position:"\u041F\u043E\u0437\u0438\u0446\u0438\u044F",market:"\u0422\u0440\u0430\u043D\u0441\u0444\u0435\u0440\u043D\u044B\u0439 \u0440\u044B\u043D\u043E\u043A",refresh_daily:"\u041D\u043E\u0432\u044B\u0435 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u044F \u043A\u0430\u0436\u0434\u044B\u0439 \u0434\u0435\u043D\u044C",not_enough:"\u041D\u0435\u0434\u043E\u0441\u0442\u0430\u0442\u043E\u0447\u043D\u043E \u043C\u043E\u043D\u0435\u0442",purchased:"\u041F\u043E\u0434\u043F\u0438\u0441\u0430\u043D!",sold:"\u0418\u0433\u0440\u043E\u043A \u043F\u0440\u043E\u0434\u0430\u043D",squad_full:"\u0421\u043E\u0441\u0442\u0430\u0432 \u0437\u0430\u043F\u043E\u043B\u043D\u0435\u043D",season:"\u0421\u0435\u0437\u043E\u043D",fixture:"\u0422\u0443\u0440",standings:"\u0422\u0430\u0431\u043B\u0438\u0446\u0430",champion:"\u0427\u0415\u041C\u041F\u0418\u041E\u041D!",next_match:"\u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0439 \u043C\u0430\u0442\u0447",quarter_final:"\u0427\u0435\u0442\u0432\u0435\u0440\u0442\u044C\u0444\u0438\u043D\u0430\u043B",semi_final:"\u041F\u043E\u043B\u0443\u0444\u0438\u043D\u0430\u043B",final:"\u0424\u0438\u043D\u0430\u043B",trophy:"\u041A\u0443\u0431\u043E\u043A",shoot_hint:"\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0437\u043E\u043D\u0443 \u0443\u0434\u0430\u0440\u0430",save_hint:"\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0437\u043E\u043D\u0443 \u043F\u0440\u044B\u0436\u043A\u0430",scored:"\u0413\u041E\u041B",saved:"\u0421\u0415\u0419\u0412",missed:"\u041C\u0418\u041C\u041E",round_k:"\u0423\u0434\u0430\u0440",your_shot:"\u0412\u044B \u0431\u044C\u0451\u0442\u0435",your_save:"\u0412\u044B \u0432 \u0432\u043E\u0440\u043E\u0442\u0430\u0445",targets:"\u041C\u0438\u0448\u0435\u043D\u0438",time_left:"\u0412\u0440\u0435\u043C\u044F",best:"\u0420\u0435\u043A\u043E\u0440\u0434",match_rewards:"\u041D\u0430\u0433\u0440\u0430\u0434\u044B \u043C\u0430\u0442\u0447\u0430",win_bonus:"\u0411\u043E\u043D\u0443\u0441 \u0437\u0430 \u043F\u043E\u0431\u0435\u0434\u0443",goal_bonus:"\u0413\u043E\u043B\u044B",cont:"\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C",manager:"\u041C\u0435\u043D\u0435\u0434\u0436\u0435\u0440",matches:"\u041C\u0430\u0442\u0447\u0438",wins:"\u0412",draws:"\u041D",losses:"\u041F",goals_for:"\u0413\u043E\u043B\u044B \u0437\u0430\u0431\u0438\u0442\u044B",goals_con:"\u0413\u043E\u043B\u044B \u043F\u0440\u043E\u043F\u0443\u0449\u0435\u043D\u044B",tap_name:"\u041D\u0430\u0436\u043C\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u0441\u043C\u0435\u043D\u0438\u0442\u044C \u0438\u043C\u044F",opp_choose:"\u0421\u043E\u043F\u0435\u0440\u043D\u0438\u043A",home:"\u0414\u043E\u043C\u0430",away:"\u0412 \u0433\u043E\u0441\u0442\u044F\u0445",start_match:"\u041D\u0430\u0447\u0430\u0442\u044C \u043C\u0430\u0442\u0447",power:"\u0421\u0438\u043B\u0430",sprint:"\u0421\u043F\u0440\u0438\u043D\u0442",pass:"\u041F\u0430\u0441",shoot:"\u0423\u0434\u0430\u0440",through:"\u0412 \u0440\u0430\u0437\u0440\u0435\u0437",tackle:"\u041E\u0442\u0431\u043E\u0440",press:"\u041F\u0440\u0435\u0441\u0441\u0438\u043D\u0433",switchp:"\u0421\u043C\u0435\u043D\u0430",long_pass:"\u0414\u043B\u0438\u043D\u043D\u044B\u0439 \u043F\u0430\u0441",controls_text:"\u0421\u043B\u0435\u0432\u0430 \u2014 \u0434\u0436\u043E\u0439\u0441\u0442\u0438\u043A: \u0434\u0432\u0438\u0436\u0435\u043D\u0438\u0435. \u0421\u043F\u0440\u0430\u0432\u0430 \u2014 \u043A\u043D\u043E\u043F\u043A\u0438 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0439.<br>\u0414\u0435\u0440\u0436\u0438\u0442\u0435 \u0423\u0414\u0410\u0420 \u0434\u043B\u044F \u0441\u0438\u043B\u044B, \u0431\u044B\u0441\u0442\u0440\u044B\u0439 \u0442\u0430\u043F \u2014 \u0442\u043E\u0447\u043D\u044B\u0439 \u0443\u0434\u0430\u0440, \u0434\u0432\u043E\u0439\u043D\u043E\u0439 \u0442\u0430\u043F \u2014 \u043F\u043E\u0434\u0441\u0435\u0447\u043A\u0430.<br>\u0414\u0435\u0440\u0436\u0438\u0442\u0435 \u041F\u0410\u0421 \u0434\u043B\u044F \u0434\u043B\u0438\u043D\u043D\u043E\u0439 \u043F\u0435\u0440\u0435\u0434\u0430\u0447\u0438, \u0412 \u0420\u0410\u0417\u0420\u0415\u0417 \u2014 \u043D\u0430 \u0445\u043E\u0434 \u043F\u0430\u0440\u0442\u043D\u0451\u0440\u0443.<br>\u0412 \u0437\u0430\u0449\u0438\u0442\u0435: \u041E\u0422\u0411\u041E\u0420 \u2014 \u043E\u0442\u043E\u0431\u0440\u0430\u0442\u044C \u043C\u044F\u0447, \u041F\u0420\u0415\u0421\u0421\u0418\u041D\u0413 \u2014 \u043F\u0440\u0435\u0441\u043B\u0435\u0434\u043E\u0432\u0430\u0442\u044C, \u0421\u041C\u0415\u041D\u0410 \u2014 \u0441\u043C\u0435\u043D\u0438\u0442\u044C \u0438\u0433\u0440\u043E\u043A\u0430.",quality_changed:"\u0413\u0440\u0430\u0444\u0438\u043A\u0430 \u043F\u0440\u0438\u043C\u0435\u043D\u0435\u043D\u0430",welcome:"\u0414\u043E\u0431\u0440\u043E \u043F\u043E\u0436\u0430\u043B\u043E\u0432\u0430\u0442\u044C, \u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440!",season_start:"\u0421\u0435\u0437\u043E\u043D \u043D\u0430\u0447\u0430\u043B\u0441\u044F. \u0423\u0434\u0430\u0447\u0438!",cup_start:"\u041A\u0443\u0431\u043A\u043E\u0432\u044B\u0439 \u043F\u0443\u0442\u044C \u043D\u0430\u0447\u0430\u043B\u0441\u044F!",eliminated:"\u0412\u044B \u0432\u044B\u0431\u044B\u043B\u0438",career_done:"\u0421\u0435\u0437\u043E\u043D \u0437\u0430\u0432\u0435\u0440\u0448\u0451\u043D!",daily_ready:"\u0420\u044B\u043D\u043E\u043A \u043E\u0431\u043D\u043E\u0432\u043B\u0451\u043D",reward_claimed:"\u041D\u0430\u0433\u0440\u0430\u0434\u0430 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0430",quit_confirm:"\u0412\u044B\u0439\u0442\u0438 \u0438\u0437 \u043C\u0430\u0442\u0447\u0430? \u041F\u0440\u043E\u0433\u0440\u0435\u0441\u0441 \u0431\u0443\u0434\u0435\u0442 \u043F\u043E\u0442\u0435\u0440\u044F\u043D.",offline_note:"\u041F\u043E\u043B\u043D\u043E\u0441\u0442\u044C\u044E \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442 \u043E\u0444\u043B\u0430\u0439\u043D",club_pick:"\u0412\u0430\u0448\u0430 \u043A\u043E\u043C\u0430\u043D\u0434\u0430"}},Ch="en";function sa(i){hl[i]&&(Ch=i)}function I(i,t){let e=hl[Ch]||hl.en;return e&&e[i]!==void 0?e[i]:t!==void 0?t:i}var Rh=[{id:"en",label:"English"},{id:"uz",label:"O'zbekcha"},{id:"ru",label:"\u0420\u0443\u0441\u0441\u043A\u0438\u0439"}];var bt=null,fs=null,ps=null,aa=null,ul=null,tn=null,Ph=null,ra=null,Lh=!1;function E0(){if(bt)return!0;try{let i=window.AudioContext||window.webkitAudioContext;if(!i)return!1;bt=new i,fs=bt.createGain(),fs.gain.value=1,fs.connect(bt.destination),ps=bt.createGain(),ps.connect(fs),aa=bt.createGain(),aa.connect(fs),ul=bt.createGain(),ul.connect(fs),Li()}catch{return!1}return!0}function dl(){E0()&&(bt.state==="suspended"&&bt.resume().catch(()=>{}),Lh||(Lh=!0,T0(),A0()))}function Li(){if(!bt)return;let i=Pt().settings;ps.gain.value=i.sound,aa.gain.value=i.music*.5,tn&&tn.gain.setTargetAtTime(.32*i.sound,bt.currentTime,.3)}function Uh(i){let t=Math.floor(bt.sampleRate*i),e=bt.createBuffer(1,t,bt.sampleRate),n=e.getChannelData(0);for(let s=0;s<t;s++)n[s]=Math.random()*2-1;return e}function T0(){if(!bt||Ph)return;let i=bt.createBufferSource();i.buffer=Uh(2.5),i.loop=!0;let t=bt.createBiquadFilter();t.type="bandpass",t.frequency.value=520,t.Q.value=.6;let e=bt.createBiquadFilter();e.type="lowpass",e.frequency.value=2400,tn=bt.createGain(),tn.gain.value=0;let n=bt.createOscillator();n.frequency.value=.13;let s=bt.createGain();s.gain.value=.09,n.connect(s),s.connect(tn.gain),i.connect(t),t.connect(e),e.connect(tn),tn.connect(ul),i.start(),n.start(),Ph=i,Li()}function fl(i=1,t=3){if(!bt||!tn)return;let e=Pt().settings,n=bt.currentTime,s=.32*e.sound,r=s+i*.5*e.sound;tn.gain.cancelScheduledValues(n),tn.gain.setValueAtTime(tn.gain.value,n),tn.gain.linearRampToValueAtTime(r,n+.12),tn.gain.setTargetAtTime(s,n+t*.5,t*.35)}function Ye(i,t,e,n,s=0){if(!bt)return;let r=bt.createOscillator(),a=bt.createGain();r.type=e,r.frequency.value=i,s&&r.frequency.exponentialRampToValueAtTime(Math.max(30,i+s),bt.currentTime+t),a.gain.setValueAtTime(n,bt.currentTime),a.gain.exponentialRampToValueAtTime(.001,bt.currentTime+t),r.connect(a),a.connect(ps),r.start(),r.stop(bt.currentTime+t+.02)}function Pi(i,t,e,n){if(!bt)return;let s=bt.createBufferSource();s.buffer=Uh(i+.05);let r=bt.createBiquadFilter();r.type="bandpass",r.frequency.value=t,r.Q.value=e;let a=bt.createGain();a.gain.setValueAtTime(n,bt.currentTime),a.gain.exponentialRampToValueAtTime(.001,bt.currentTime+i),s.connect(r),r.connect(a),a.connect(ps),s.start(),s.stop(bt.currentTime+i+.05)}var At={click(){Ye(660,.06,"triangle",.25,-180)},hover(){Ye(880,.03,"sine",.08)},kick(i=.5){Pi(.09,900+i*900,1.2,.28+i*.3),Ye(120+i*60,.1,"sine",.3,-60)},pass(){Pi(.06,1200,1.4,.2),Ye(180,.06,"sine",.16,-60)},bounce(){Pi(.05,600,2,.12)},whistle(i=!1){if(!bt)return;let t=i?.75:.34,e=bt.createOscillator(),n=bt.createGain();e.type="square",e.frequency.value=2350;let s=bt.createOscillator(),r=bt.createGain();s.frequency.value=38,r.gain.value=90,s.connect(r),r.connect(e.frequency),n.gain.setValueAtTime(1e-4,bt.currentTime),n.gain.exponentialRampToValueAtTime(.16,bt.currentTime+.02),n.gain.setValueAtTime(.16,bt.currentTime+t-.05),n.gain.exponentialRampToValueAtTime(.001,bt.currentTime+t),e.connect(n),n.connect(ps),e.start(),s.start(),e.stop(bt.currentTime+t),s.stop(bt.currentTime+t)},goal(){fl(1,4),Ye(523,.14,"triangle",.3),setTimeout(()=>Ye(659,.14,"triangle",.3),130),setTimeout(()=>Ye(784,.24,"triangle",.34),260),Pi(.8,1600,.7,.2)},catchBall(){Pi(.07,500,1.5,.2)},tackle(){Pi(.12,420,1,.3)},post(){Ye(320,.5,"square",.2,-140),Pi(.08,2400,3,.2)},error(){Ye(220,.18,"sawtooth",.2,-80)},success(){Ye(520,.08,"triangle",.24),setTimeout(()=>Ye(760,.12,"triangle",.24),90)},coin(){Ye(1180,.07,"square",.14,240),setTimeout(()=>Ye(1560,.1,"square",.12,200),60)},levelUp(){[440,554,659,880].forEach((i,t)=>setTimeout(()=>Ye(i,.16,"triangle",.26),t*110))}},Ih=[[110,164.81,220,329.63],[98,146.83,196,293.66],[87.31,130.81,174.61,261.63],[98,146.83,196,293.66]],Dh=0;function A0(){if(!bt||ra)return;let i=()=>{if(ra===null)return;Pt().settings.music>.01&&(Ih[Dh%Ih.length].forEach((n,s)=>{let r=bt.createOscillator(),a=bt.createGain();r.type=s<2?"sine":"triangle",r.frequency.value=n;let o=bt.currentTime+s*.05;a.gain.setValueAtTime(1e-4,o),a.gain.linearRampToValueAtTime(.05,o+.4),a.gain.exponentialRampToValueAtTime(.001,o+2.2),r.connect(a),a.connect(aa),r.start(o),r.stop(o+2.3)}),Dh++),ra=setTimeout(i,2400)};ra=setTimeout(i,400)}function Oh(i,t){let e=new Fs({canvas:i,antialias:t==="high",powerPreference:"high-performance"}),n=Vs[t]||Vs.medium;return e.setPixelRatio(Math.min(window.devicePixelRatio||1,n.pixelRatio)),e.setSize(window.innerWidth,window.innerHeight,!1),e.outputColorSpace=me,n.shadows&&(e.shadowMap.enabled=!0,e.shadowMap.type=Kr),e}function oa(i,t){let e=document.createElement("canvas");return e.width=i,e.height=t,e}function C0(i){let t=i?2048:1024,e=Math.round(t*(_t.width+14)/(_t.length+14)),n=oa(t,e),s=n.getContext("2d"),r=14/(_t.length+14)*t*.5;s.fillStyle="#0a4423",s.fillRect(0,0,t,e);let a=14,o=r,l=t-r*2;for(let _=0;_<a;_++)s.fillStyle=_%2?"#0f6a35":"#0c5c2e",s.fillRect(o+l/a*_,7/(_t.width+14)*e,l/a+1,e-2*(7/(_t.width+14))*e);let c=Qe(7);s.globalAlpha=.05;for(let _=0;_<(i?2600:900);_++)s.fillStyle=c()>.5?"#128044":"#08391d",s.fillRect(c()*t,c()*e,2.2,2.2);s.globalAlpha=1;let h=l/_t.length,d=(e-2*(7/(_t.width+14))*e)/_t.width,u=_=>o+(_+Ut)*h,p=_=>7/(_t.width+14)*e+(_+ce)*d;s.strokeStyle="rgba(255,255,255,0.92)",s.lineWidth=Math.max(2,t*.0024),s.strokeRect(u(-Ut),p(-ce),_t.length*h,_t.width*d),s.beginPath(),s.moveTo(u(0),p(-ce)),s.lineTo(u(0),p(ce)),s.stroke(),s.beginPath(),s.arc(u(0),p(0),9.15*h,0,Math.PI*2),s.stroke(),s.fillStyle="rgba(255,255,255,0.92)",s.beginPath(),s.arc(u(0),p(0),.35*h,0,Math.PI*2),s.fill();for(let _ of[-1,1]){let m=_*Ut;s.strokeRect(Math.min(u(m),u(m-_*_t.boxD)),p(-_t.boxW/2),_t.boxD*h,_t.boxW*d),s.strokeRect(Math.min(u(m),u(m-_*_t.box6D)),p(-_t.boxW/2*.45),_t.box6D*h,_t.boxW*d*.45),s.beginPath(),s.arc(u(m-_*11),p(0),.3*h,0,Math.PI*2),s.fill(),s.beginPath(),s.arc(u(m-_*11),p(0),9.15*h,_===1?Math.PI*.68:-Math.PI*.32,_===1?Math.PI*.32:Math.PI*.68,_===-1),s.stroke()}let g=new Ti(n);return g.colorSpace=me,g.anisotropy=4,g}var Nh=["UFM SPORT","ZAFAR AIR","OLTIN BANK","BAHOR TEA","CHIQMOQ ENERGY","DARYO WATER","QUYOSH SOLAR","TEKNO PLUS"];function R0(i){let t=oa(i?1024:512,64),e=t.getContext("2d");e.fillStyle="#0b1526",e.fillRect(0,0,t.width,t.height);let n=Qe(99),s=["#f5c542","#ffffff","#3e9bff","#ff8a1e","#2fae5c"],r=8,a=t.width/4;for(let l=0;l<4;l++)e.fillStyle=s[Math.floor(n()*s.length)],e.font=`900 ${Math.round(t.height*.46)}px Arial`,e.textBaseline="middle",e.fillText(Nh[(l+Math.floor(n()*8))%Nh.length],l*a+14,t.height/2+2);let o=new Ti(t);return o.colorSpace=me,o.wrapS=Is,o}function Fh(i,t,e,n,s,r,a){i.fillStyle=a?"#050b16":"#0b1526",i.fillRect(0,0,t,e),i.strokeStyle="#f5c542",i.lineWidth=e*.03,i.strokeRect(i.lineWidth,i.lineWidth,t-i.lineWidth*2,e-i.lineWidth*2),i.fillStyle="#ffffff",i.font=`900 ${e*.34}px Arial`,i.textAlign="center",i.textBaseline="middle",i.fillText(`${n}  ${s}`,t/2,e*.34),i.fillStyle="#f5c542",i.font=`900 ${e*.3}px Arial`,i.fillText(r,t/2,e*.72)}function P0(i,t,e){let n=oa(512,160),s=n.getContext("2d");Fh(s,512,160,i,t,"00:00",e);let r=new Ti(n);r.colorSpace=me;let a=new $e({map:r}),o=new Qt(new mn(16,5),a);return o.userData.update=(l,c,h)=>{Fh(s,512,160,l,c,h,e),r.needsUpdate=!0},o}function ai(i,t){let{quality:e="medium",night:n=!1}=t,s=Vs[e]||Vs.medium,r=new bn,a=C0(e==="high"),o=new Qt(new mn(_t.length+14,_t.width+14),new Ge({map:a}));o.rotation.x=-Math.PI/2,s.shadows&&(o.receiveShadow=!0),r.add(o);let l=new Ge({color:16777215}),c=new $e({color:14540253,wireframe:!0,transparent:!0,opacity:.28});for(let W of[-1,1]){let Y=new bn,R=W*Ut,U=new Ai(.07,.07,_t.goalHeight,6);for(let X of[-1,1]){let Z=new Qt(U,l);Z.position.set(R,_t.goalHeight/2,X*Se),Y.add(Z)}let G=new Qt(new Ai(.07,.07,_t.goalWidth+.14,6),l);G.rotation.x=Math.PI/2,G.position.set(R,_t.goalHeight,0),Y.add(G);let q=new Qt(new mn(_t.goalWidth,_t.goalHeight,12,5),c);q.position.set(R+W*_t.goalDepth,_t.goalHeight/2,0),q.rotation.y=W*Math.PI/2,Y.add(q);let $=new Qt(new mn(_t.goalDepth,_t.goalWidth,5,12),c);$.rotation.x=Math.PI/2,$.rotation.z=Math.PI/2,$.position.set(R+W*_t.goalDepth/2,_t.goalHeight,0),Y.add($);for(let X of[-1,1]){let Z=new Qt(new mn(_t.goalDepth,_t.goalHeight,5,5),c);Z.rotation.y=W*Math.PI/2,Z.position.set(R+W*_t.goalDepth/2,_t.goalHeight/2,X*Se),Y.add(Z)}r.add(Y)}let h=new Ge({color:n?2304568:3752527}),d=new wn(.42,.55,.32),u=new Ge({color:16777215}),p=s.crowd,g=new gn(d,u,p);g.frustumCulled=!1;let _=new De,m=new qt,f=Qe(4242),M=["#e5484d","#3e9bff","#f5c542","#2fae5c","#ffffff","#ff8a1e","#8b5cf6","#16a3b8","#d9d9d9","#20242a"],x=0;function b(W,Y,R,U){let X=new Qt(new wn(W,1,17),h);X.geometry=new wn(W,13,17),X.position.set(Y,17/2,R),X.rotation.y=U,X.rotation.x=0;let Z=.42;X.rotation.x=Math.cos(U)*-Z,X.rotation.z=Math.sin(U)*Z,r.add(X);let j=9,it=Math.floor(p/4/j);for(let H=0;H<j&&x<p;H++)for(let K=0;K<it&&x<p;K++){let ct=H/(j-1),xt=(K/it-.5)*W*.94+(f()-.5)*1.2,ft=1.2+ct*(17-2.5)+(f()-.5)*.9,Nt=2+.9+ct*(13-1.2),Dt,St,Kt;U===0?(Dt=Y+xt,St=R-Math.cos(0)*(R>0?ft:-ft),Kt=R>0?Math.PI:0,St=R>0?R-ft:R+ft):(St=R+xt,Dt=Y>0?Y-ft:Y+ft,Kt=Y>0?-Math.PI/2:Math.PI/2),_.position.set(Dt,Nt,St),_.rotation.set(0,Kt+(f()-.5)*.5,0),_.scale.setScalar(.85+f()*.5),_.updateMatrix(),g.setMatrixAt(x,_.matrix),m.set(M[Math.floor(f()*M.length)]),g.setColorAt(x,m),x++}}b(_t.length+34,0,-(ce+17.5),0),b(_t.length+34,0,ce+17.5,0),b(_t.width+22,-(Ut+17.5),0,Math.PI/2),b(_t.width+22,Ut+17.5,0,Math.PI/2),g.instanceMatrix.needsUpdate=!0,g.instanceColor&&(g.instanceColor.needsUpdate=!0),r.add(g);let C=R0(e==="high"),T=new $e({map:C}),A=(W,Y,R,U)=>{let G=new Qt(new mn(W,1),T);G.position.set(Y,.5,R),G.rotation.y=U,r.add(G);let q=new Qt(new mn(W,1),T);q.position.set(Y,.5,R),q.rotation.y=U+Math.PI,r.add(q)},B=1.2;C.repeat.set(_t.length/16,1),A(_t.length+8,0,-(ce+B),0),A(_t.length+8,0,ce+B,Math.PI),A(_t.width+6,-(Ut+B),0,Math.PI/2),A(_t.width+6,Ut+B,0,-Math.PI/2);let y=new Ge({color:10134445}),E=new $e({color:n?16774872:13620957});for(let W of[-1,1])for(let Y of[-1,1]){let R=W*(Ut+12),U=Y*(ce+12),G=new Qt(new Ai(.35,.6,30,6),y);G.position.set(R,15,U),r.add(G);let q=new Qt(new wn(5.4,3,.8),E);q.position.set(R,30.5,U),q.lookAt(0,0,0),r.add(q)}let N=P0("HOME","AWAY",n);return N.position.set(0,18.5,-(ce+20)),r.add(N),i.add(r),{board:N,crowd:g}}function oi(i,t){let e=new Zr(t?3359070:12573951,t?660488:1852451,t?.75:1);i.add(e);let n=new Bs(t?13622527:16773840,t?1.05:1.25);if(n.position.set(-38,55,24),i.add(n),t){let s=new Bs(9414911,.35);s.position.set(40,40,-30),i.add(s)}return i.background=new qt(t?396572:8897772),i.fog=new Br(t?396572:8897772,120,320),{hemi:e,sun:n}}function li(){let i=oa(256,256),t=i.getContext("2d");t.fillStyle="#f8f8f8",t.fillRect(0,0,256,256),t.fillStyle="#14181d";let e=Qe(5);for(let r=0;r<14;r++){let a=e()*256,o=e()*256,l=14+e()*10;t.beginPath();for(let c=0;c<5;c++){let h=c/5*Math.PI*2-Math.PI/2+e(),d=a+Math.cos(h)*l,u=o+Math.sin(h)*l;c===0?t.moveTo(d,u):t.lineTo(d,u)}t.closePath(),t.fill()}let n=new Ti(i);return n.colorSpace=me,new Qt(new cs(.24,14,12),new Ge({map:n}))}var Vn=26;function ms(i){let t=new si(.17,.36,3,8),e=new cs(.115,8,8),n=new si(.052,.3,3,6),s=new Xr(.32,12),r=new Ge({color:16777215}),a=new Ge({color:16777215}),o=new Ge({color:1580066}),l=new $e({color:0,transparent:!0,opacity:.35}),c={torso:new gn(t,r,Vn),head:new gn(e,a,Vn),armL:new gn(n,r,Vn),armR:new gn(n,r,Vn),legL:new gn(n,o,Vn),legR:new gn(n,o,Vn),shadow:new gn(s,l,Vn)};for(let x in c)c[x].frustumCulled=!1,c[x].count=0,i.add(c[x]);let h=new oe().makeScale(0,0,0);for(let x=0;x<Vn;x++)for(let b in c)c[b].setMatrixAt(x,h);let d=new oe,u=new oe,p=new L,g=new Sn,_=new os,m=new L(1,1,1),f=new qt;function M(x,b,C,T,A,B,y,E,N=1,W=1,Y=1){p.set(C,T,A),_.set(B,y,E),g.setFromEuler(_),m.set(N,W,Y),d.compose(p,g,m),x.setMatrixAt(b,d)}return{MAX:Vn,meshes:c,allocIndex:0,allocate(){let x=this.allocIndex++;for(let b in c)c[b].count=this.allocIndex;return x},setColor(x,{jersey:b,shorts:C,skin:T,socks:A}){b&&(f.set(b),c.torso.setColorAt(x,f),c.armL.setColorAt(x,f),c.armR.setColorAt(x,f)),A&&(f.set(A),c.legL.setColorAt(x,f),c.legR.setColorAt(x,f)),T&&(f.set(T),c.head.setColorAt(x,f));for(let B in c)c[B].instanceColor&&(c[B].instanceColor.needsUpdate=!0)},setFigure(x,b){let T=Math.abs(Math.cos(b.phase))*.04*b.speed01,A=(b.y||0)+T,B=.14*b.speed01+(b.kick>0?-.1:0),y=b.facing;if(b.dive>0){let j=Math.min(1,b.dive),it=b.diveDir*(1.35*j),H=.55-.35*j;M(c.torso,x,b.x,H+.12,b.z,0,y,it,1,1,1),M(c.head,x,b.x-Math.sin(it)*.42,H+.45*Math.cos(it),b.z,0,y,it);let K=-2.4*j;M(c.armL,x,b.x,H+.3,b.z,0,y,it+K),M(c.armR,x,b.x,H+.3,b.z,0,y,it+K),M(c.legL,x,b.x+Math.sin(it)*.3,H-.28,b.z,0,y,it,1,.8,1),M(c.legR,x,b.x+Math.sin(it)*.3,H-.28,b.z,0,y,it,1,.8,1),M(c.shadow,x,b.x,.02,b.z,-Math.PI/2,0,0,1+j,1,1);return}let E=Math.sin(b.phase)*(.35+b.speed01*.75),N=b.kick>0?Math.sin(Math.min(b.kick,1)*Math.PI):0;M(c.torso,x,b.x,A+.55+.26,b.z,B,y,0);let W=b.x+Math.sin(y)*Math.sin(B)*.4;M(c.head,x,W,A+.55+.56,b.z,B*.5,y,0);let Y=A+.55+.42,R=.235,U=b.x+Math.cos(y)*-R,G=b.z+Math.sin(y)*-R*-1,q=b.x+Math.cos(y)*R,$=b.z+Math.sin(y)*R;M(c.armL,x,U,Y-.16+Math.sin(E)*.06,G,-E*.8+B,y,.12),M(c.armR,x,q,Y-.16-Math.sin(E)*.06,$,E*.8+B,y,-.12);let X=E,Z=b.kick>0?1.1-2.5*N:-E;M(c.legL,x,b.x+Math.cos(y)*-.095,A+.55-.2,b.z-Math.sin(y)*-.095*-1,X,y,0),M(c.legR,x,b.x+Math.cos(y)*.095,A+.55-.2,b.z+Math.sin(y)*.095*-1,Z,y,0),M(c.shadow,x,b.x,.02,b.z,-Math.PI/2,0,0)},hide(x){for(let b in c)c[b].setMatrixAt(x,h)},flush(){for(let x in c)c[x].instanceMatrix.needsUpdate=!0}}}function kh(){let i=new bn,t=new Ge({color:15914044}),e=new Ge({color:1580066}),n=new Ge({color:13208926}),s=new Qt(new si(.17,.36,3,8),t);s.position.y=.95,i.add(s);let r=new Qt(new cs(.115,8,8),n);r.position.y=1.45,i.add(r);for(let a of[-1,1]){let o=new Qt(new si(.052,.3,3,6),e);o.position.set(a*.095,.32,0),i.add(o);let l=new Qt(new si(.048,.26,3,6),t);l.position.set(a*.24,1.05,0),l.rotation.z=a*.25,i.add(l)}return i}var la={GK:"GK",DF:"DF",MF:"MF",FW:"FW"};function gs(i){return i==="GK"?la.GK:i==="CB"||i==="LB"||i==="RB"?la.DF:i==="CDM"||i==="CM"||i==="CAM"||i==="LM"||i==="RM"?la.MF:la.FW}var yn=[{id:"zafar",name:"Zafar FK",short:"ZFK",color:"#2e6fe0",color2:"#ffffff",strength:82},{id:"sitora",name:"Sitora SK",short:"SIT",color:"#e5484d",color2:"#1c1c22",strength:80},{id:"oqbars",name:"Oqbars FC",short:"OQB",color:"#f2f2f2",color2:"#20242a",strength:79},{id:"tufon",name:"Tufon FK",short:"TUF",color:"#ff8a1e",color2:"#14243a",strength:77},{id:"bahor",name:"Bahor SK",short:"BAH",color:"#2fae5c",color2:"#ffffff",strength:76},{id:"chaqmoq",name:"Chaqmoq FC",short:"CHA",color:"#8b5cf6",color2:"#ffd76a",strength:75},{id:"daryo",name:"Daryo FK",short:"DAR",color:"#16a3b8",color2:"#0e2a33",strength:74},{id:"quyosh",name:"Quyosh SK",short:"QUY",color:"#f5c542",color2:"#20304a",strength:73}],ie=i=>yn.find(t=>t.id===i)||yn[0],L0=["Aziz","Dilshod","Jasur","Bekzod","Sanjar","Otabek","Temur","Islom","Farrux","Nodir","Marco","Luca","Jonas","Erik","Taro","Diego","Mateo","Rafael","Andre","Viktor","Samir","Elbek","Khusan","Ruslan","Artyom","Daniyar","Zafar","Bobur","Umar","Ali","Kenji","Milan","Pavel","Oscar","Bruno","Ivan","Sergio","Nicolas","Felix","Hugo"],I0=["Rahmonov","Karimov","Toshpo'latov","Yusupov","Abdullayev","Nazarov","Sattorov","Mirzayev","Qodirov","Ergashev","Vellor","Kracht","Kimishita","Sorensen","Valente","Moretti","Novak","Haddad","Ondiviela","Bergstr\xF6m","Ortiqov","Saidov","Petrov","Kovalenko","Tanaka","Rossi","Silvestri","Marchetti","Duarte","Ferreira","Nishida","Larsen","Volkov","Iglesias","Costa","Smirnov","Almeida","Roche","Mendel","Gruber"],Bh={GK:{speed:.08,shooting:.02,passing:.15,dribbling:.05,defending:.45,physical:.25,stamina:0},CB:{speed:.1,shooting:.04,passing:.1,dribbling:.08,defending:.45,physical:.18,stamina:.05},LB:{speed:.2,shooting:.03,passing:.15,dribbling:.12,defending:.35,physical:.08,stamina:.07},RB:{speed:.2,shooting:.03,passing:.15,dribbling:.12,defending:.35,physical:.08,stamina:.07},CDM:{speed:.1,shooting:.05,passing:.2,dribbling:.1,defending:.35,physical:.12,stamina:.08},CM:{speed:.12,shooting:.1,passing:.28,dribbling:.15,defending:.18,physical:.07,stamina:.1},CAM:{speed:.13,shooting:.17,passing:.27,dribbling:.22,defending:.06,physical:.05,stamina:.1},LM:{speed:.22,shooting:.1,passing:.18,dribbling:.22,defending:.1,physical:.06,stamina:.12},RM:{speed:.22,shooting:.1,passing:.18,dribbling:.22,defending:.1,physical:.06,stamina:.12},LW:{speed:.24,shooting:.2,passing:.14,dribbling:.28,defending:.03,physical:.04,stamina:.07},RW:{speed:.24,shooting:.2,passing:.14,dribbling:.28,defending:.03,physical:.04,stamina:.07},ST:{speed:.22,shooting:.36,passing:.1,dribbling:.18,defending:.02,physical:.08,stamina:.04}};function ca(i){let t=Bh[i.pos]||Bh.CM,e=0,n=0;for(let s in t)e+=(i[s]||50)*t[s],n+=t[s];return Bt(Math.round(e/Math.max(.001,n)),40,99)}var D0=["GK","GK","CB","CB","CB","LB","RB","CDM","CM","CM","CAM","LM","RM","LW","RW","ST","ST","CB"],pl=null;function ha(){if(pl)return pl;let i=Qe(20261001),t=[];for(let e of yn){let n=new Set;D0.forEach((s,r)=>{let a;do a=`${sl(i,L0)} ${sl(i,I0)}`;while(n.has(a));n.add(a);let o=e.strength+(i()*14-9),l=()=>Math.round(i()*12-6),c={id:`${e.id}_${r}`,name:a,club:e.id,pos:s,speed:0,shooting:0,passing:0,dribbling:0,defending:0,physical:0,stamina:0,seed:Math.floor(i()*1e9)},h=o+l();for(let d of["speed","shooting","passing","dribbling","defending","physical","stamina"])c[d]=Bt(Math.round(h+l()*1.4),45,94);s==="GK"&&(c.defending=Bt(c.defending+8,50,95),c.shooting=Bt(c.shooting-25,30,99)),gs(s)==="FW"&&(c.shooting=Bt(c.shooting+6,40,96),c.defending=Bt(c.defending-14,30,99)),gs(s)==="DF"&&(c.defending=Bt(c.defending+7,40,96),c.shooting=Bt(c.shooting-12,30,99)),(s==="LW"||s==="RW"||s==="LB"||s==="RB")&&(c.speed=Bt(c.speed+5,40,97)),c.ovr=ca(c),t.push(c)})}return pl=t,t}function Ws(i){return ha().find(t=>t.id===i)||null}function ml(i){return ha().filter(t=>t.club===i)}function Ii(i){let t=i.ovr||ca(i);return Math.round((250+Math.pow(Math.max(0,t-55),2.35)*3.2)/10)*10}function ua(i){return Math.round(Ii(i)*.45)+150}var An={"4-3-3":[{pos:"GK",x:.045,y:0},{pos:"LB",x:.2,y:-.62},{pos:"CB",x:.16,y:-.21},{pos:"CB",x:.16,y:.21},{pos:"RB",x:.2,y:.62},{pos:"CM",x:.4,y:-.32},{pos:"CDM",x:.33,y:0},{pos:"CM",x:.4,y:.32},{pos:"LW",x:.68,y:-.6},{pos:"ST",x:.74,y:0},{pos:"RW",x:.68,y:.6}],"4-4-2":[{pos:"GK",x:.045,y:0},{pos:"LB",x:.2,y:-.62},{pos:"CB",x:.16,y:-.21},{pos:"CB",x:.16,y:.21},{pos:"RB",x:.2,y:.62},{pos:"LM",x:.46,y:-.66},{pos:"CM",x:.4,y:-.22},{pos:"CM",x:.4,y:.22},{pos:"RM",x:.46,y:.66},{pos:"ST",x:.72,y:-.18},{pos:"ST",x:.72,y:.18}],"4-2-3-1":[{pos:"GK",x:.045,y:0},{pos:"LB",x:.2,y:-.62},{pos:"CB",x:.16,y:-.21},{pos:"CB",x:.16,y:.21},{pos:"RB",x:.2,y:.62},{pos:"CDM",x:.34,y:-.2},{pos:"CDM",x:.34,y:.2},{pos:"LM",x:.55,y:-.55},{pos:"CAM",x:.56,y:0},{pos:"RM",x:.55,y:.55},{pos:"ST",x:.76,y:0}],"4-3-1-2":[{pos:"GK",x:.045,y:0},{pos:"LB",x:.2,y:-.62},{pos:"CB",x:.16,y:-.21},{pos:"CB",x:.16,y:.21},{pos:"RB",x:.2,y:.62},{pos:"CM",x:.38,y:-.34},{pos:"CDM",x:.32,y:0},{pos:"CM",x:.38,y:.34},{pos:"CAM",x:.56,y:0},{pos:"ST",x:.74,y:-.16},{pos:"ST",x:.74,y:.16}],"3-5-2":[{pos:"GK",x:.045,y:0},{pos:"CB",x:.16,y:-.3},{pos:"CB",x:.15,y:0},{pos:"CB",x:.16,y:.3},{pos:"LM",x:.44,y:-.78},{pos:"CM",x:.38,y:-.32},{pos:"CDM",x:.32,y:0},{pos:"CM",x:.38,y:.32},{pos:"RM",x:.44,y:.78},{pos:"ST",x:.73,y:-.16},{pos:"ST",x:.73,y:.16}]},We={easy:{label:"easy",aiSpeed:.8,passErr:.3,shotSkill:.35,press:.3,gk:.4,reaction:.45,decision:.35,reward:.7},normal:{label:"normal",aiSpeed:.9,passErr:.22,shotSkill:.5,press:.5,gk:.55,reaction:.6,decision:.55,reward:1},hard:{label:"hard",aiSpeed:.97,passErr:.15,shotSkill:.65,press:.7,gk:.7,reaction:.75,decision:.72,reward:1.35},pro:{label:"pro",aiSpeed:1.03,passErr:.1,shotSkill:.78,press:.85,gk:.82,reaction:.88,decision:.85,reward:1.7},legendary:{label:"legendary",aiSpeed:1.08,passErr:.06,shotSkill:.9,press:1,gk:.93,reaction:.96,decision:.94,reward:2.2}};function ci(i,t){let e=An[t]||An["4-3-3"],n=i.slice().sort((a,o)=>o.ovr-a.ovr),s=[],r=new Set;for(let a of e){let o=null;for(let l of n)if(!r.has(l.id)&&l.pos===a.pos){o=l;break}if(!o){for(let l of n)if(!r.has(l.id)&&gs(l.pos)===gs(a.pos)){o=l;break}}if(!o){for(let l of n)if(!r.has(l.id)){o=l;break}}o?(r.add(o.id),s.push(o.id)):s.push(null)}return s}function U0(i,t){let e=(We[i.difficulty]||We.normal).reward,n=i.result==="win"?300:i.result==="draw"?150:80,s=Math.round(n*e)+t*45,r=i.result==="win"?110:i.result==="draw"?65:35,a=Math.round(r*e);return{coins:s,xp:a,winBonus:Math.round(n*e),goalBonus:t*45}}function gl(i,t="quick"){let e=Pt();Ah({userScore:i.userScore,oppScore:i.oppScore});let n=U0(i,i.userScore);na(n.coins);let s=ia(n.xp);return n.levelUp=s,we(),n}function zh(i){let t=Pt(),e=Ii(i);return t.coins<e?{ok:!1,reason:I("not_enough")}:t.squad.includes(i.id)?{ok:!1,reason:I("squad_full")}:t.squad.length>=26?{ok:!1,reason:I("squad_full")}:(t.coins-=e,t.squad.push(i.id),t.players[i.id]=JSON.parse(JSON.stringify(i)),we(),{ok:!0})}function Hh(i){let t=Pt(),e=t.squad.indexOf(i);if(e<0)return{ok:!1};let n=t.players[i]||Ws(i),s=Math.round(Ii(n)*.8);return t.squad.splice(e,1),delete t.players[i],t.lineup.slots=t.lineup.slots.map(r=>r===i?null:r),t.coins+=s,we(),{ok:!0,gain:s}}function Vh(i){let t=Pt(),e=t.players[i];if(!e)return{ok:!1};if(e.ovr>=95)return{ok:!1,reason:I("max_level")};let n=ua(e);if(t.coins<n)return{ok:!1,reason:I("not_enough")};t.coins-=n;let s=["speed","shooting","passing","dribbling","defending","physical","stamina"];for(let r of s)e[r]=Math.min(99,e[r]+1);return e.ovr=ca(e),we(),{ok:!0,ovr:e.ovr}}function Di(){let i=Pt();return i.squad.map(t=>i.players[t]||Ws(t)).filter(Boolean)}function Xs(i){return Pt().players[i]||null}function Gh(){let i=Pt(),t=rl();if(i.market.day!==t){let e=Qe(t.split("-").reduce((s,r)=>s+Number(r),0)*7919),n=ha().filter(s=>!i.squad.includes(s.id));i.market.items=Gs(e,n).slice(0,6).map(s=>s.id),i.market.day=t,we()}return i.market.items.map(e=>Ws(e)).filter(Boolean)}function da(){let i=Pt(),t=Qe(Date.now()%1e6),e=Gs(t,yn.filter(r=>r.id!==i.clubId)).slice(0,7),n=Gs(t,[ie(i.clubId),...e]),s=[];for(let r=0;r<4;r++)s.push({a:n[r*2].id,b:n[r*2+1].id,winner:null});return i.tournament={rounds:[s],stage:0,alive:!0},we(),i.tournament}function N0(i){let t=Qe((i.a.length*31+i.b.length*17+Date.now())%999983),e=ie(i.a),n=ie(i.b),s=Math.floor(t()*3*(e.strength/80)),r=Math.floor(t()*3*(n.strength/80));s===r&&(t()>.5?s++:r++),i.score=[s,r],i.winner=s>r?i.a:i.b}function Wh(i,t,e){let n=Pt(),s=n.tournament;if(!s)return{out:!0};let r=s.rounds[s.stage],a=r.find(c=>c.a===n.clubId||c.b===n.clubId);a&&(a.score=a.a===n.clubId?[t,e]:[e,t],a.winner=i?n.clubId:a.a===n.clubId?a.b:a.a);for(let c of r)c.winner===null&&N0(c);if(!i)return s.alive=!1,we(),{out:!0};let o=r.map(c=>c.winner);if(o.length===1)return s.champion=o[0],s.champion===n.clubId&&cl("cup"),we(),{champion:s.champion,rounds:s.rounds};let l=[];for(let c=0;c<o.length;c+=2)l.push({a:o[c],b:o[c+1],winner:null});return s.rounds.push(l),s.stage++,we(),{continues:!0,rounds:s.rounds,stage:s.stage}}function _l(){let i=Pt(),t=Qe(Date.now()%777777),e=Gs(t,yn.slice()),n=[];for(let s=0;s<e.length;s++)for(let r=s+1;r<e.length;r++)n.push({a:e[s].id,b:e[r].id,played:!1,sa:0,sb:0});return n.sort(()=>t()-.5),i.career={clubs:e.map(s=>s.id),fixtures:n,done:!1,season:i.career?i.career.season+1:1},we(),i.career}function Xh(){let i=Pt().career;return!i||i.done?null:i.fixtures.find(e=>!e.played&&(e.a===Pt().clubId||e.b===Pt().clubId))||null}function F0(i){let t=Pt(),e=t.career;if(!e)return;let n=Qe(Date.now()%333331);for(let s of e.fixtures){if(s.played||s===i||s.a===t.clubId||s.b===t.clubId)continue;let r=ie(s.a),a=ie(s.b);s.sa=Math.floor(n()*3.4*(r.strength/(r.strength+a.strength)+.25)),s.sb=Math.floor(n()*3.4*(a.strength/(r.strength+a.strength)+.25)),s.played=!0}}function qh(i,t){let e=Pt(),n=e.career;if(!n)return null;let s=n.fixtures.find(a=>!a.played&&(a.a===e.clubId||a.b===e.clubId));if(!s)return null;if(s.a===e.clubId?(s.sa=i,s.sb=t):(s.sa=t,s.sb=i),s.played=!0,F0(s),n.fixtures.filter(a=>!a.played&&(a.a===e.clubId||a.b===e.clubId)).length===0){n.done=!0;let a=fa();a[0]&&a[0].id===e.clubId&&cl("league")}return we(),n}function fa(){let t=Pt().career;if(!t)return[];let e={};for(let n of t.clubs)e[n]={id:n,p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0};for(let n of t.fixtures){if(!n.played)continue;let s=e[n.a],r=e[n.b];s.p++,r.p++,s.gf+=n.sa,s.ga+=n.sb,r.gf+=n.sb,r.ga+=n.sa,n.sa>n.sb?(s.w++,s.pts+=3,r.l++):n.sa<n.sb?(r.w++,r.pts+=3,s.l++):(s.d++,r.d++,s.pts++,r.pts++)}return Object.values(e).sort((n,s)=>s.pts-n.pts||s.gf-s.ga-(n.gf-n.ga))}function xl(){let i=Pt(),t=ta(i.profile.xp),e=t<=1?0:ea(t-1),n=ea(t);return{lvl:t,cur:i.profile.xp-e,need:n-e}}function _s(){let i=Pt(),t=Di(),e=i.lineup.formation||"4-3-3";if(!i.lineup.slots||i.lineup.slots.length!==11){i.lineup.slots=ci(t,e),xe();return}let n=!1;if(i.lineup.slots=i.lineup.slots.map(s=>s&&t.some(r=>r.id===s)?s:(n=!0,null)),n||i.lineup.slots.some(s=>!s)){let s=new Set(i.lineup.slots.filter(Boolean)),r=t.filter(o=>!s.has(o.id)).sort((o,l)=>l.ovr-o.ovr),a=An[e];i.lineup.slots=i.lineup.slots.map((o,l)=>{if(o)return o;let c=r.find(h=>h.pos===a[l].pos)||r.find(h=>!s.has(h.id));return c?(s.add(c.id),r.splice(r.indexOf(c),1),c.id):null}),xe()}}function $h(){return _s(),Pt().lineup.slots.map(t=>Xs(t)||Ws(t)).filter(Boolean)}var pa=6.1,Yh=1.42,jt={KICKOFF:0,PLAY:1,GOAL:2,HALFTIME:3,FULLTIME:4,RESTART:5,PAUSED:6},ma=class{constructor(t,e={}){this.canvas=t,this.opts=e,this.home=e.home,this.away=e.away,this.homeXI=e.homeXI,this.awayXI=e.awayXI,this.userSide=0,this.diff=We[e.difficulty]||We.normal,this.totalSec=Sh[e.length||"normal"]||300,this.night=!!e.night,this.onFinish=e.onFinish||(()=>{}),this.allowDraw=e.allowDraw!==!1,this.quality=e.quality||"medium",this.targetFps=e.fps||60,this.camSens=e.cameraSens!==void 0?e.cameraSens:.6,this.state=jt.KICKOFF,this.prevState=jt.KICKOFF,this.stateTimer=0,this.clock=0,this.half=1,this.score=[0,0],this.kickoffTeam=0,this.finished=!1,this.disposed=!1,this.joy={x:0,y:0,active:!1},this.buttons={},this.controlled=null,this.lastShootTap=-10,this.shootCharge=-1,this.passHoldStart=-1,this.pressHeld=!1,this._setupScene(),this._setupTeams(),this._setupBall(),this._setupHUD(),this._setupInput(),this._acc=0,this._last=performance.now(),this._raf=0,this._frameToggle=!1,this._loop=this._loop.bind(this),this._raf=requestAnimationFrame(this._loop),this._setState(jt.KICKOFF,1.4)}_setupScene(){this.renderer=this.opts.renderer,this.scene=new En,this.camera=new ve(52,window.innerWidth/window.innerHeight,.5,500),this.camera.position.set(0,18,ce+16),this.camera.lookAt(0,0,0),oi(this.scene,this.night),this.stadium=ai(this.scene,{quality:this.quality,night:this.night}),this.figures=ms(this.scene),this.referee=kh(),this.referee.position.set(3,0,5),this.scene.add(this.referee),this.marker=new Qt(new qr(.32,.6,4),new $e({color:16106818})),this.marker.rotation.x=Math.PI,this.scene.add(this.marker),this._onResize=()=>{this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix()},window.addEventListener("resize",this._onResize)}_setupTeams(){this.teams=[this._makeTeam(this.home,this.homeXI,1,this.opts.homeFormation||"4-3-3"),this._makeTeam(this.away,this.awayXI,-1,this.opts.awayFormation||"4-3-3")],this.players=[...this.teams[0].players,...this.teams[1].players]}_makeTeam(t,e,n,s){let r={club:t,attackDir:n,players:[],possession:!1,passTarget:null,slots:An[s]||An["4-3-3"]},a=["#e8b98c","#c98d5e","#9c6b43","#f0cba4","#7d5233"];return e.forEach((o,l)=>{let c=this.figures.allocate(),h={id:o.id,stats:o,team:r,idx:l,fig:c,pos:o.pos,role:gs(o.pos),anchor:{x:0,y:0},x:0,z:0,vx:0,vz:0,facing:n>0?0:Math.PI,phase:Math.random()*6,speed01:0,hasBall:!1,kickAnim:0,diveT:0,diveDir:1,stamina:100,sprinting:!1,thinkT:Math.random()*.3,isUser:!1,burstT:0};this.figures.setColor(c,{jersey:t.color,socks:t.color2,skin:a[(o.seed||l)%a.length]}),r.players.push(h)}),r.gk=r.players.find(o=>o.role==="GK")||r.players[0],r}_setupBall(){this.ballMesh=li(),this.scene.add(this.ballMesh),this.ball={x:0,y:.24,z:0,vx:0,vy:0,vz:0,spin:0,owner:null,lastTeam:-1,rolling:!0}}_formationPoint(t,e,n){let s=t.slots[e]||t.slots[0],r=t.attackDir;n.x=r*(s.x*_t.length-Ut),n.y=s.y*ce*.9}_setupHUD(){let t=this.opts.hudRoot||document.getElementById("hud-root");this.hud=J("div","match-hud"),this.hud.style.cssText="position:absolute;inset:0;pointer-events:none;",t.appendChild(this.hud);let e=J("div","hud-top"),n=a=>`<span class="sw" style="background:${a.color}"></span>`;e.innerHTML=`
      <div class="team">${n(this.home)}<span>${this.home.short}</span></div>
      <div class="score"><span id="hud-hs">0</span><span style="opacity:.5">:</span><span id="hud-as">0</span></div>
      <div class="team"><span>${this.away.short}</span>${n(this.away)}</div>
      <div class="clock" id="hud-clock">00:00</div>`,this.hud.appendChild(e),this.elHS=e.querySelector("#hud-hs"),this.elAS=e.querySelector("#hud-as"),this.elClock=e.querySelector("#hud-clock");let s=J("button","hud-pause","\u275A\u275A");s.style.pointerEvents="auto",s.addEventListener("click",()=>{At.click(),this.openPause()}),this.hud.appendChild(s),this.joyZone=J("div","ctl-joy"),this.joyBase=J("div","base"),this.joyKnob=J("div","knob"),this.joyZone.appendChild(this.joyBase),this.joyZone.appendChild(this.joyKnob);let r=this.opts.joystickSize||1;this.joyBase.style.width=this.joyBase.style.height=`${128*r}px`,this.joyKnob.style.width=this.joyKnob.style.height=`${56*r}px`,this.joyZone.style.pointerEvents="auto",this.hud.appendChild(this.joyZone),this.btnWrap=J("div","ctl-btns"),this.btnWrap.style.pointerEvents="auto",this.hud.appendChild(this.btnWrap),this._makeButtons(!0),this.powerBar=J("div","power-bar"),this.powerFill=J("i"),this.powerBar.appendChild(this.powerFill),this.hud.appendChild(this.powerBar),this.msg=J("div","match-msg"),this.msg.style.display="none",this.hud.appendChild(this.msg)}_makeButtons(t){this.btnWrap.innerHTML="",this.btnEls={};let e=t?[["pass",I("pass"),"\u2934"],["shoot",I("shoot"),"\u26BD","gold"],["through",I("through"),"\u2197"],["sprint",I("sprint"),"\u26A1","wide"]]:[["tackle",I("tackle"),"\u26D4","red"],["press",I("press"),"\u{1F3C3}"],["switch",I("switchp"),"\u{1F504}"],["sprint",I("sprint"),"\u26A1","wide"]];for(let[n,s,r,a]of e){let o=J("button","ctl-btn"+(a?" "+a:""),`<span class="em">${r}</span><span>${s}</span>`);this._bindAction(o,n),this.btnWrap.appendChild(o),this.btnEls[n]=o}this.attackButtons=t}_bindAction(t,e){let n=r=>{r.preventDefault(),t.classList.add("active"),this.buttons[e]=!0,this._onButtonDown(e)},s=r=>{r&&r.preventDefault(),t.classList.remove("active"),this.buttons[e]&&(this.buttons[e]=!1,this._onButtonUp(e))};t.addEventListener("pointerdown",n),t.addEventListener("pointerup",s),t.addEventListener("pointercancel",s),t.addEventListener("pointerleave",s)}_setupInput(){this._joyId=null,this._joyOrigin={x:0,y:0};let t=this.joyZone,e=()=>parseFloat(this.joyBase.style.width)/2||64,n=(a,o)=>{let l=e(),c=Math.hypot(a,o),h=c>l?l/c:1,d=a*h,u=o*h;this.joyKnob.style.left=`${this._joyOrigin.x+d}px`,this.joyKnob.style.top=`${this._joyOrigin.y+u}px`,this.joy.x=ri(d/l)*(Math.abs(d/l)>.14?1:0)*Math.min(1,c/l+.15),this.joy.y=ri(u/l)*(Math.abs(u/l)>.14?1:0)*Math.min(1,c/l+.15),c/l<.14?(this.joy.x=0,this.joy.y=0):(this.joy.x=a/c*Math.min(1,c/l),this.joy.y=o/c*Math.min(1,c/l))};t.addEventListener("pointerdown",a=>{a.preventDefault(),this._joyId===null&&(this._joyId=a.pointerId,this._joyOrigin={x:a.clientX,y:a.clientY},t.setPointerCapture(a.pointerId),this.joyBase.style.display=this.joyKnob.style.display="block",this.joyBase.style.left=this.joyKnob.style.left=`${a.clientX}px`,this.joyBase.style.top=this.joyKnob.style.top=`${a.clientY}px`,this.joy.active=!0,n(0,0))});let s=a=>{a.pointerId===this._joyId&&n(a.clientX-this._joyOrigin.x,a.clientY-this._joyOrigin.y)},r=a=>{a.pointerId===this._joyId&&(this._joyId=null,this.joy.active=!1,this.joy.x=0,this.joy.y=0,this.joyBase.style.display=this.joyKnob.style.display="none")};t.addEventListener("pointermove",s),t.addEventListener("pointerup",r),t.addEventListener("pointercancel",r),this._keyDown=a=>{let o={KeyW:"up",KeyS:"down",KeyA:"left",KeyD:"right",ArrowUp:"up",ArrowDown:"down",ArrowLeft:"left",ArrowRight:"right"};o[a.code]&&(this._keys=this._keys||{},this._keys[o[a.code]]=!0),a.code==="Space"&&this._onButtonDown("shoot"),a.code==="KeyX"&&this._onButtonDown("pass"),a.code==="KeyC"&&this._onButtonDown("tackle"),a.code==="ShiftLeft"&&(this.buttons.sprint=!0),a.code==="Escape"&&this.openPause()},this._keyUp=a=>{let o={KeyW:"up",KeyS:"down",KeyA:"left",KeyD:"right",ArrowUp:"up",ArrowDown:"down",ArrowLeft:"left",ArrowRight:"right"};o[a.code]&&this._keys&&(this._keys[o[a.code]]=!1),a.code==="Space"&&this._onButtonUp("shoot"),a.code==="KeyX"&&this._onButtonUp("pass"),a.code==="ShiftLeft"&&(this.buttons.sprint=!1)},window.addEventListener("keydown",this._keyDown),window.addEventListener("keyup",this._keyUp)}_keyboardVec(){let t=this._keys;if(!t)return null;let e=0,n=0;if(t.left&&(e-=1),t.right&&(e+=1),t.up&&(n-=1),t.down&&(n+=1),!e&&!n)return null;let s=Math.hypot(e,n);return{x:e/s,y:n/s}}_onButtonDown(t){if(this.state===jt.PAUSED)return;let e=this.controlled,n=e&&e.hasBall;if(t==="shoot"&&n){if(this._pendingTap){clearTimeout(this._pendingTap.timer),this._pendingTap=null,this._doShoot(.25,!0);return}this.shootCharge=0,this.powerBar.style.display="block"}t==="pass"&&n&&(this.passHoldStart=performance.now()/1e3),t==="through"&&n&&this._doPass(!0),t==="tackle"&&this._doTackle(),t==="switch"&&this._doSwitch(),t==="press"&&(this.pressHeld=!0)}_onButtonUp(t){if(t==="shoot"){if(this.shootCharge>=0&&this.controlled&&this.controlled.hasBall){let e=this.shootCharge;this.shootCharge=-1,this.powerBar.style.display="none",this.powerFill.style.width="0%",e<.2?this._pendingTap={timer:setTimeout(()=>{this._pendingTap=null,this.controlled&&this.controlled.hasBall&&this._doShoot(e,!1)},250)}:this._doShoot(e,!1);return}this.shootCharge=-1,this.powerBar.style.display="none",this.powerFill.style.width="0%"}if(t==="pass"){if(this.passHoldStart>=0&&this.controlled&&this.controlled.hasBall){let e=performance.now()/1e3-this.passHoldStart;this._doPass(!1,e>.34)}this.passHoldStart=-1}t==="press"&&(this.pressHeld=!1)}_goalCenter(t){return{x:this.teams[t].attackDir*Ut,z:0}}_doShoot(t,e=!1){let n=this.controlled;if(!n||!n.hasBall)return;let s=this.teams.indexOf(n.team),r=this._goalCenter(s),a=r.x-n.x,o=r.z-n.z,l=Math.hypot(a,o),c=this.joy.x,h=this.joy.y;if(Math.hypot(c,h)<.25)c=a/l,h=o/l;else{let b=Math.hypot(c,h);c/=b,h/=b}let d=e?.35:t>.6?.45:.7;c=Me(c,a/l,d),h=Me(h,o/l,d);let u=Math.hypot(c,h)||1;c/=u,h/=u;let p,g,_=0,m=!1;if(e)p=11+l*.1,g=5.2+l*.1;else if(t<.18&&l>12){m=!0,p=13.5+l*.12,g=1.1;let b=o>0?-1:1;_=b*1.6,h+=b*.16}else{let b=ri(t);p=14+b*15+l*.06,g=.8+b*2.4+Math.max(0,l-18)*.06;let C=(1-b*.55)*.05+Math.max(0,b-.85)*.35,T=Math.atan2(h,c)+(Math.random()*2-1)*C;c=Math.cos(T),h=Math.sin(T)}let M=(1-(n.stats.shooting||60)/100)*.1*(m?.4:1),x=Math.atan2(h,c)+(Math.random()*2-1)*M;c=Math.cos(x),h=Math.sin(x),this._kickBall(n,c*p,g,h*p,_),n.kickAnim=1e-4,At.kick(ri(t)),Tn(18)}_doPass(t,e){let n=this.controlled;if(!n||!n.hasBall)return;let s=this.teams.indexOf(n.team),r=n.team.players.filter(C=>C!==n&&C.role!=="GK"),a=this.joy.x,o=this.joy.y;Math.hypot(a,o)<.2&&(a=n.team.attackDir,o=0);let l=Math.hypot(a,o)||1;a/=l,o/=l;let c=null,h=-1e9;for(let C of r){let T=C.x-n.x,A=C.z-n.z,B=Math.hypot(T,A);if(B<2||B>55)continue;let y=T/B*a+A/B*o;if(t){let E=T*n.team.attackDir/B,N=y*1.2+E*1.6-Math.abs(B-22)*.02;N>h&&(h=N,c=C)}else if(e){let E=y*1.5+Math.min(1,B/40)*1.2;E>h&&(h=E,c=C)}else{let E=this._openness(C),N=y*1.6-Math.abs(B-12)*.03+E*.9;N>h&&(h=N,c=C)}}if(!c){this._doShoot(.25);return}let d=(n.stats.passing||60)/100,u=c.x,p=c.z;t&&(u+=c.vx*.7+n.team.attackDir*6,p+=c.vz*.7);let g=u-n.x,_=p-n.z,m=Math.hypot(g,_)||1,f=(1-d)*.22+this.diff.passErr*0,M=Math.atan2(_,g)+(Math.random()*2-1)*f,x=Bt(m*1.15,9,e?30:22),b=e?4.5+m*.05:t?1.6:.35;this._kickBall(n,Math.cos(M)*x,b,Math.sin(M)*x,0),n.kickAnim=1e-4,n.team.passTarget=c,At.pass()}_openness(t){let e=99;for(let n of this.players){if(n.team===t.team)continue;let s=Math.hypot(n.x-t.x,n.z-t.z);s<e&&(e=s)}return ri(e/8)}_doTackle(){let t=this.controlled;if(!t)return;let e=this.ball.owner;if(!e||e.team===t.team)return;if(Math.hypot(e.x-t.x,e.z-t.z)>2.6){t.vx+=Math.cos(t.facing)*7,t.vz+=Math.sin(t.facing)*7;return}let s=(t.stats.defending||55)+(t.stats.physical||55)*.3,r=(e.stats.dribbling||55)+(e.stats.speed||55)*.2,a=Bt(.42+(s-r)*.006,.15,.85);t.kickAnim=1e-4,At.tackle(),Tn(25),Math.random()<a?this._setOwner(t):Math.random()<.4&&this._foul(t,e)}_foul(t,e){At.whistle(),this._showMsg(I("tackle")+"!",""),this._setOwner(e),this._setState(jt.RESTART,.9)}_doSwitch(){let e=this.teams[this.userSide].players.filter(n=>n.role!=="GK"&&n!==this.controlled);e.sort((n,s)=>Math.hypot(n.x-this.ball.x,n.z-this.ball.z)-Math.hypot(s.x-this.ball.x,s.z-this.ball.z)),e[0]&&(this.controlled=e[0]),At.click()}_kickBall(t,e,n,s,r){let a=this.ball;a.owner=null,a.x=t.x+Math.cos(t.facing)*.5,a.z=t.z+Math.sin(t.facing)*.5,a.y=.24,a.vx=e,a.vy=n,a.vz=s,a.spin=r||0,a.lastTeam=this.teams.indexOf(t.team),t.hasBall=!1,t.team.possession=!1}_setOwner(t){this.ball.owner&&(this.ball.owner.hasBall=!1),this.ball.owner=t,t.hasBall=!0,this.ball.vx=this.ball.vy=this.ball.vz=0,this.ball.spin=0,t.team.possession=!0;let e=this.teams[1-this.teams.indexOf(t.team)];e.possession=!1,this.ball.lastTeam=this.teams.indexOf(t.team)}_setState(t,e){t===jt.PAUSED&&(this.prevState=this.prevState===jt.PAUSED?this.prevState:this.state),this.state=t,this.stateTimer=e||0,t===jt.KICKOFF&&this._arrangeKickoff(),jt.GOAL}_arrangeKickoff(){for(let e of this.teams)e.players.forEach((n,s)=>{this._formationPoint(e,s,n.anchor),n.x=n.anchor.x,n.z=n.anchor.y,e!==this.teams[this.kickoffTeam]&&Math.abs(n.x)<8&&(n.x+=e.attackDir*-2),n.vx=n.vz=0,n.facing=e.attackDir>0?0:Math.PI,n.hasBall=!1,n.diveT=0,n.kickAnim=0});this.ball.x=0,this.ball.z=0,this.ball.y=.24,this.ball.vx=this.ball.vy=this.ball.vz=0,this.ball.spin=0;let t=this.teams[this.kickoffTeam].players.find(e=>e.pos==="ST")||this.teams[this.kickoffTeam].players[9];t.x=this.teams[this.kickoffTeam].attackDir*-1.2,t.z=0,this._setOwner(t)}_scoreGoal(t,e){this.score[t]++,this.elHS.textContent=this.score[0],this.elAS.textContent=this.score[1],this.stadium.board.userData.update(`${this.home.short} ${this.score[0]}-${this.score[1]} ${this.away.short}`,"",this._lastClockTxt||"00:00"),At.goal(),Tn(60),this._showMsg(e?I("own_goal"):I("goal"),`${this.home.short} ${this.score[0]} - ${this.score[1]} ${this.away.short}`),this.kickoffTeam=1-t,this._setState(jt.GOAL,3),this._goalCamT=0}_showMsg(t,e,n){this.msg.innerHTML=`<div class="big">${t}</div>${e?`<div class="small">${e}</div>`:""}`,this.msg.style.display="block",clearTimeout(this._msgT),this._msgT=setTimeout(()=>{this.msg.style.display="none"},n||2200)}_loop(t){if(this.disposed)return;this._raf=requestAnimationFrame(this._loop);let e=(t-this._last)/1e3;if(this._last=t,e>.1&&(e=.1),this.targetFps===30){if(this._frameToggle=!this._frameToggle,this._frameToggle){this._acc+=e;return}e+=this._acc,this._acc=0}this.state!==jt.PAUSED&&this._update(e),this._render()}_update(t){this.stateTimer>0&&(this.stateTimer-=t,this.stateTimer<=0&&this._onStateEnd()),this.state===jt.PLAY||this.state===jt.KICKOFF||this.state===jt.RESTART?(this.state===jt.PLAY&&(this.clock+=t),this._updateControl(),this._updateAI(t),this._updateBall(t)):this.state===jt.GOAL&&this._updateBall(t*.6),this.shootCharge>=0&&(this.shootCharge=ri(this.shootCharge+t/.95),this.powerFill.style.width=`${Math.round(this.shootCharge*100)}%`),this._updateFigures(t),this._updateCamera(t),this._updateHUD()}_onStateEnd(){switch(this.state){case jt.KICKOFF:At.whistle(),this._setState(jt.PLAY,0);break;case jt.RESTART:this._setState(jt.PLAY,0);break;case jt.GOAL:this._setState(jt.KICKOFF,1.2);break;case jt.HALFTIME:this.half=2,this.teams[0].attackDir=-1,this.teams[1].attackDir=1,this.kickoffTeam=1,this._setState(jt.KICKOFF,1.4);break;case jt.FULLTIME:this.finished||(this.finished=!0,this._finishMatch());break}}_finishMatch(){let t=this.score[0],e=this.score[1];if(!this.allowDraw&&t===e){let a=this.teams[0].players.reduce((o,l)=>o+(l.stats.ovr||70),0)>=this.teams[1].players.reduce((o,l)=>o+(l.stats.ovr||70),0)?0:1;this.score[a]++}let n=this.score[this.userSide],s=this.score[1-this.userSide],r={homeScore:t,awayScore:e,userScore:n,oppScore:s,result:n>s?"win":n<s?"lose":"draw",home:this.home,away:this.away,difficulty:this.opts.difficulty||"normal"};setTimeout(()=>this.onFinish(r),60)}_updateControl(){let t=this.teams[this.userSide];if(this.ball.owner&&this.ball.owner.team===t)this.controlled=this.ball.owner;else if(!this.controlled||this.controlled.team!==t||this.ball.owner&&this.ball.owner.team!==t&&this.controlled.hasBall)this._autoSwitch();else if(!this.ball.owner){let u=this.controlled;Math.hypot(u.x-this.ball.x,u.z-this.ball.z)>12&&this._autoSwitch()}let e=this.controlled;if(!e)return;e.isUser=!0;for(let u of t.players)u!==e&&(u.isUser=!1);let n=this.joy.x,s=this.joy.y,r=this._keyboardVec();r&&(n=r.x,s=r.y);let a=Math.hypot(n,s),o=n,l=s;e.sprinting=!!this.buttons.sprint&&e.stamina>4;let c=e.stamina<15?.8:1,h=pa*(e.sprinting?Yh:1)*c*(.92+(e.stats.speed||60)/100*.18);if(a>.05){let u=Math.hypot(o,l)||1,p=o/u,g=l/u;e.vx=Me(e.vx,p*h*Math.min(1,a*1.6),.22),e.vz=Me(e.vz,g*h*Math.min(1,a*1.6),.22),e.facing=ds(e.facing,Math.atan2(g,p),.3)}else if(e.vx=Me(e.vx,0,.25),e.vz=Me(e.vz,0,.25),this.ball.owner!==e){let u=Math.atan2(this.ball.z-e.z,this.ball.x-e.x);e.facing=ds(e.facing,u,.08)}e.sprinting?e.stamina=Math.max(0,e.stamina-dt*9):e.stamina=Math.min(100,e.stamina+dt*4.5);let d=t.possession;d!==this.attackButtons&&this._makeButtons(d)}_autoSwitch(){let t=this.teams[this.userSide],e=null,n=1e9;for(let s of t.players){if(s.role==="GK"&&Math.abs(this.ball.x)<Ut-20)continue;let r=Math.hypot(s.x-this.ball.x,s.z-this.ball.z);r<n&&(n=r,e=s)}e&&(this.controlled=e);for(let s of t.players)s.isUser=s===e}_updateAI(t){let e=this.ball;for(let n of this.teams){let s=this.teams.indexOf(n)===this.userSide,r=s?null:this.diff,a=null,o=1e9,l=null,c=1e9;for(let u of n.players){if(u.isUser||u.hasBall||u.role==="GK")continue;let p=Math.hypot(u.x-e.x,u.z-e.z);p<o?(l=a,c=o,a=u,o=p):p<c&&(l=u,c=p)}let h=n.possession,d=s?this.pressHeld?.9:.45:r.press;n.players.forEach((u,p)=>{if(u.isUser)return;if(u.thinkT-=t,u.hasBall){this._aiCarrier(u,t);return}if(u.role==="GK"){this._aiGK(u,t);return}let g,_,m=.86;if(!e.owner)u===a||u===l&&o>6?(g=e.x+e.vx*.25,_=e.z+e.vz*.25,m=1):(this._formationPoint(n,p,u.anchor),g=u.anchor.x+e.x*.22,_=u.anchor.y+e.z*.18);else if(e.owner.team===n){this._formationPoint(n,p,u.anchor);let f=u.role==="FW"?8:u.role==="MF"?3:-3;g=u.anchor.x+n.attackDir*f+e.x*.18,_=u.anchor.y*1.06+e.z*.14,n.passTarget===u&&Math.hypot(u.x-e.x,u.z-e.z)>3&&(g=e.x,_=e.z,m=1)}else{this._formationPoint(n,p,u.anchor);let f=u.role==="DF"?2:u.role==="MF"?6:12;g=u.anchor.x-n.attackDir*f+e.x*.3,_=u.anchor.y+e.z*.3;let M=e.owner,x=Math.hypot(u.x-M.x,u.z-M.z);if((u===a&&d>.35||u===l&&d>.75)&&x<26*d+6&&(g=M.x+M.vx*.2,_=M.z+M.vz*.2,m=.95+d*.12),!s&&x<1.5&&Math.random()<this.diff.reaction*t*3){let C=u.stats.defending||55,T=M.stats.dribbling||55;Math.random()<Bt(.3+(C-T)*.005+this.diff.reaction*.15,.1,.8)&&(this._setOwner(u),At.tackle())}}g=Bt(g,-Ut+1,Ut-1),_=Bt(_,-ce+1,ce-1),this._seek(u,g,_,m*(r?r.aiSpeed:1),t)})}}_seek(t,e,n,s,r){let a=e-t.x,o=n-t.z,l=Math.hypot(a,o),c=pa*s*(.88+(t.stats.speed||60)/100*.2)*(t.stamina<12?.82:1);if(l>.6){let h=Math.min(1,l/3);t.vx=Me(t.vx,a/l*c*h,.12),t.vz=Me(t.vz,o/l*c*h,.12),Math.hypot(t.vx,t.vz)>.6&&(t.facing=ds(t.facing,Math.atan2(t.vz,t.vx),.18))}else t.vx=Me(t.vx,0,.2),t.vz=Me(t.vz,0,.2),t.facing=ds(t.facing,Math.atan2(this.ball.z-t.z,this.ball.x-t.x),.05);t.stamina=Math.min(100,t.stamina+r*3.5-Math.hypot(t.vx,t.vz)*r*.12)}_aiCarrier(t,e){let n=this.teams.indexOf(t.team),s=n===this.userSide,r=this._goalCenter(n),a=r.x-t.x,o=r.z-t.z,l=Math.hypot(a,o),c=s?We.normal:this.diff,h=null,d=1e9;for(let m of this.players){if(m.team===t.team)continue;let f=Math.hypot(m.x-t.x,m.z-t.z);f<d&&(d=f,h=m)}if(t.thinkT-=e,t.thinkT<=0){t.thinkT=.22+Math.random()*.2;let m=l<24?Bt(.5-l*.014+c.shotSkill*.4,0,.85):0,f=d<3?.75:d<6?.3:.06,M=Math.random();if(l<26&&M<m){this._aiShoot(t,r,l,c);return}if(M<m+f*c.decision){this._aiPass(t,c,d<3.5);return}}let u=a/l,p=o/l;if(h&&d<5){let m=t.x-h.x,f=t.z-h.z,M=Math.hypot(m,f)||1;u+=m/M*.8,p+=f/M*.8;let x=Math.hypot(u,p)||1;u/=x,p/=x}let g=(t.stats.dribbling||55)/100,_=pa*(.82+g*.26)*c.aiSpeed;t.vx=Me(t.vx,u*_,.14),t.vz=Me(t.vz,p*_,.14),t.facing=ds(t.facing,Math.atan2(t.vz,t.vx),.2)}_aiShoot(t,e,n,s){let r=(t.stats.shooting||55)/100*.6+s.shotSkill*.4,a=e.x,o=(Math.random()*2-1)*Se*.75,l=(1-r)*3.2;o+=(Math.random()*2-1)*l;let c=a-t.x,h=o-t.z,d=Math.hypot(c,h)||1,u=16+Math.random()*9+n*.12,p=Math.random()<.4?1.6+Math.random()*1.6:.7;this._kickBall(t,c/d*u,p,h/d*u,0),t.kickAnim=1e-4,At.kick(.8)}_aiPass(t,e,n){let s=t.team.players.filter(_=>_!==t&&_.role!=="GK"),r=null,a=-1e9,o=t.team.attackDir;for(let _ of s){let m=_.x-t.x,f=_.z-t.z,M=Math.hypot(m,f);if(M<3||M>45)continue;let x=m*o/M,b=this._openness(_),C=x*1.4+b*1.6-Math.abs(M-(n?10:18))*.03+Math.random()*.5;C>a&&(a=C,r=_)}if(!r){this._aiShoot(t,this._goalCenter(this.teams.indexOf(t.team)),30,e);return}let l=r.x+r.vx*.4,c=r.z+r.vz*.4,h=l-t.x,d=c-t.z,u=Math.hypot(h,d)||1,p=Math.atan2(d,h)+(Math.random()*2-1)*e.passErr,g=Bt(u*1.1,9,24);this._kickBall(t,Math.cos(p)*g,u>25?3.8:.3,Math.sin(p)*g,0),t.team.passTarget=r,t.kickAnim=1e-4,At.pass()}_aiGK(t,e){let n=this.teams.indexOf(t.team),s=t.team.attackDir,r=-s*(Ut-.7),a=this.ball,o=r+s*Bt(3.2-Math.abs(a.x-r)*.05,0,3.2),l=Bt(a.z*.75,-Se+.5,Se-.5);if(a.owner&&a.owner.team===t.team)this._gkHold||(this._gkHold={t:1.1,gk:t}),o=r,l=Bt(a.z*.5,-Se,Se);else{this._gkHold=null;let c=-s;if(!a.owner&&Math.abs(a.vx)>8&&(a.vx>0&&r>0||a.vx<0&&r<0)){let h=Math.abs((r-a.x)/a.vx);if(h<.9){let d=a.z+a.vz*h+a.spin*h*h*.5,u=this.teams.indexOf(t.team)===this.userSide?.72:this.diff.gk,p=1+u*1.1;if(Math.abs(d)<Se+.3&&(l=Bt(d,-Se-.6,Se+.6),o=r,Math.abs(d-t.z)<p&&Math.random()<u*.95&&(t.diveT<=0&&(t.diveT=1e-4,t.diveDir=Math.sign(d-t.z)||1),h<.25))){let g=Bt(u-Math.hypot(a.vx,a.vz)*.012+.25,.25,.95);Math.random()<g?(this._setOwner(t),At.catchBall(),this._gkHold={t:1,gk:t}):(a.vx=s*(3+Math.random()*4),a.vz=(Math.random()*2-1)*6,a.vy=2.5,At.tackle())}}}}if(this._gkHold&&this._gkHold.gk===t&&t.hasBall&&(this._gkHold.t-=e,this._gkHold.t<=0)){this._gkHold=null;let c=t.team.players.filter(g=>g!==t&&g.role==="DF"),h=c[Math.floor(Math.random()*c.length)]||t.team.players[2],d=h.x-t.x,u=h.z-t.z,p=Math.hypot(d,u)||1;this._kickBall(t,d/p*Bt(p*1.05,10,22),p>22?4.2:1.2,u/p*Bt(p*1.05,10,22),0),t.team.passTarget=h,At.pass()}this._seek(t,o,l,.95,e)}_updateBall(t){let e=this.ball;for(let n of this.players)n.x+=n.vx*t,n.z+=n.vz*t,n.x=Bt(n.x,-Ut-2,Ut+2),n.z=Bt(n.z,-ce-2,ce+2),n.speed01=ri(Math.hypot(n.vx,n.vz)/(pa*Yh)),Math.hypot(n.vx,n.vz)>.5&&(n.phase+=t*(6+n.speed01*9)),n.kickAnim>0&&(n.kickAnim+=t*3.2,n.kickAnim>1&&(n.kickAnim=0)),n.diveT>0&&(n.diveT+=t*1.4,n.diveT>1.6&&(n.diveT=0));if(e.owner){let n=e.owner,r=.42+Math.hypot(n.vx,n.vz)*.045;if(e.x=n.x+Math.cos(n.facing)*r,e.z=n.z+Math.sin(n.facing)*r,e.y=.24,this.state===jt.PLAY)for(let a of this.players){if(a.team===n.team||a.isUser)continue;if(Math.hypot(a.x-e.x,a.z-e.z)<.9&&Math.random()<this.diff.reaction*t*1.2){this._setOwner(a),At.tackle();break}}}else{if(e.vy-=22*t,e.vx*=1-.012*t*60*.016,e.vz*=1-.012*t*60*.016,Math.abs(e.spin)>.01){let s=Math.hypot(e.vx,e.vz)||1;e.vx+=-e.vz/s*e.spin*t*2.2,e.vz+=e.vx/s*e.spin*t*2.2,e.spin*=1-.4*t}if(e.x+=e.vx*t,e.y+=e.vy*t,e.z+=e.vz*t,e.y<=.24){e.y=.24,e.vy<-1.2?(e.vy=-e.vy*.45,At.bounce()):e.vy=0;let s=Math.pow(.35,t);e.vx*=s,e.vz*=s}let n=Math.abs(e.z)<Se&&e.y<_t.goalHeight;if(Math.abs(e.x)>Ut&&n){let s=this.teams[0].attackDir===Math.sign(e.x)?0:1;this.state===jt.PLAY&&(this._scoreGoal(s,!1),e.x=Math.sign(e.x)*(Ut+.8),e.vx=e.vy=e.vz=0)}else Math.abs(e.x)>Ut+.2&&Math.abs(e.x)<Ut+_t.goalDepth&&n&&(e.vx*=.7,e.vz*=.7);if(this.state===jt.PLAY&&(Math.abs(e.z)>ce+.6||Math.abs(e.x)>Ut+1.5)&&this._outOfBounds(),this.state===jt.PLAY&&Math.hypot(e.vx,e.vz)<14)for(let s of this.players){let r=Math.hypot(s.x-e.x,s.z-e.z),a=e.y<1.1;if(r<.85&&a){this._setOwner(s);break}}}this.ballMesh.position.set(e.x,e.y,e.z),this.ballMesh.rotation.x+=e.vz!==0||e.vx!==0?t*Math.hypot(e.vx,e.vz)*1.6:0,this.ballMesh.rotation.z-=t*Math.hypot(e.vx,e.vz)*.8,this.state===jt.PLAY&&(this.half===1&&this.clock>=this.totalSec/2?(At.whistle(!0),this._showMsg(I("half_time"),"",2e3),this._setState(jt.HALFTIME,2.2)):this.half===2&&this.clock>=this.totalSec&&(At.whistle(!0),this._showMsg(I("full_time"),`${this.home.short} ${this.score[0]} - ${this.score[1]} ${this.away.short}`,2400),this._setState(jt.FULLTIME,2.2)))}_outOfBounds(){let t=this.ball,e=t.lastTeam>=0?t.lastTeam:0,n=Math.abs(t.z)>ce+.5?1-e:e;t.x=Bt(t.x,-Ut+2,Ut-2),t.z=Bt(t.z,-ce+1,ce-1),t.y=.24,t.vx=t.vy=t.vz=0,t.spin=0;let s=this.teams[n],r=s.players[1],a=1e9;for(let o of s.players){if(o.role==="GK"&&Math.abs(t.x)>Ut-25)continue;let l=Math.hypot(o.x-t.x,o.z-t.z);l<a&&(a=l,r=o)}r.x=t.x-s.attackDir*.8,r.z=t.z,this._setOwner(r),this._setState(jt.RESTART,.7),At.whistle()}_updateFigures(t){for(let s of this.players)this.figures.setFigure(s.fig,{x:s.x,z:s.z,facing:s.facing,speed01:s.speed01,phase:s.phase,kick:s.kickAnim,dive:s.diveT,diveDir:s.diveDir});this.figures.flush();let e=Bt(this.ball.x*.6,-Ut+8,Ut-8),n=Bt(this.ball.z*.5+6,-ce+4,ce-4);this.referee.position.x=Me(this.referee.position.x,e,.02),this.referee.position.z=Me(this.referee.position.z,n,.02),this.controlled?(this.marker.visible=!0,this.marker.position.set(this.controlled.x,2.15+Math.sin(performance.now()/260)*.1,this.controlled.z)):this.marker.visible=!1}_updateCamera(t){let e=this.ball,n=.04+this.camSens*.12,s=Bt(e.x*.82,-Ut+10,Ut-10),r=17.5,a=ce+15,o=e.x*.85,l=.5,c=e.z*.45;if(this.state===jt.GOAL){this._goalCamT=(this._goalCamT||0)+t;let h=Math.sign(e.x||1)*(Ut-4);s=h*.72,r=7,a=Math.sign(this.camera.position.z)*24,o=h,l=1.4,c=0}this.camera.position.x=Me(this.camera.position.x,s,n),this.camera.position.y=Me(this.camera.position.y,r,n*.7),this.camera.position.z=Me(this.camera.position.z,a,n*.5),this._look=this._look||new L,this._look.x=Me(this._look.x,o,n*1.3),this._look.y=Me(this._look.y,l,n),this._look.z=Me(this._look.z,c,n*1.3),this.camera.lookAt(this._look)}_updateHUD(){let t=Math.floor(this.clock/this.totalSec*90),e=Math.floor(this.clock/this.totalSec*90%1*60),n=`${String(Math.min(90,t)).padStart(2,"0")}:${String(e).padStart(2,"0")}`;this._lastClockTxt!==n&&(this._lastClockTxt=n,this.elClock.textContent=n,this.stadium.board.userData.update(`${this.home.short} ${this.score[0]}-${this.score[1]} ${this.away.short}`,"",n))}_render(){this.renderer.render(this.scene,this.camera)}openPause(){this.state===jt.PAUSED||this.finished||(this.prevState=this.state,this.state=jt.PAUSED,this.opts.onPause&&this.opts.onPause())}closePause(){this.state=this.prevState,this.opts.onResume&&this.opts.onResume()}setTargetFps(t){this.targetFps=t}setCamSens(t){this.camSens=t}dispose(){this.disposed=!0,cancelAnimationFrame(this._raf),window.removeEventListener("resize",this._onResize),window.removeEventListener("keydown",this._keyDown),window.removeEventListener("keyup",this._keyUp),clearTimeout(this._msgT),this.hud&&this.hud.parentNode&&this.hud.parentNode.removeChild(this.hud),this.scene.traverse(t=>{if(t.geometry&&t.geometry.dispose(),t.material){let e=Array.isArray(t.material)?t.material:[t.material];for(let n of e)n.map&&n.map.dispose(),n.dispose()}})}};var Zh=[[-2.5,.7],[0,.7],[2.5,.7],[-2.2,1.9],[0,1.9],[2.2,1.9]],ga=class{constructor(t,e={}){this.opts=e,this.renderer=e.renderer,this.diff=We[e.difficulty]||We.normal,this.home=e.home,this.away=e.away,this.onFinish=e.onFinish||(()=>{}),this.disposed=!1,this.kicks=[],this.totalPerSide=5,this.phase="ready",this.userToShoot=!0,this.scene=new En,this.camera=new ve(55,window.innerWidth/window.innerHeight,.3,500),oi(this.scene,!!e.night),ai(this.scene,{quality:e.quality||"medium",night:!!e.night}),this.figures=ms(this.scene),this.spot={x:Ut-11,z:0};let n="#d8a878";this.keeperFig=this.figures.allocate(),this.figures.setColor(this.keeperFig,{jersey:this.away.color,socks:this.away.color2,skin:n}),this.strikerFig=this.figures.allocate(),this.figures.setColor(this.strikerFig,{jersey:this.home.color,socks:this.home.color2,skin:n}),this.gk={x:Ut-.4,z:0,facing:Math.PI,diveT:0,diveDir:1,phase:0,speed01:0,kick:0},this.striker={x:this.spot.x-1.6,z:.4,facing:0,diveT:0,phase:0,speed01:0,kick:0},this.ball=li(),this.ball.position.set(this.spot.x,.24,0),this.scene.add(this.ball),this.camera.position.set(this.spot.x-6.5,2.6,0),this._look=new L(Ut,1.2,0),this.camera.lookAt(this._look),this._buildHUD(),this._last=performance.now(),this._loop=this._loop.bind(this),this._raf=requestAnimationFrame(this._loop),this._promptUser()}_buildHUD(){let t=this.opts.hudRoot||document.getElementById("hud-root");this.hud=J("div"),this.hud.style.cssText="position:absolute;inset:0;pointer-events:none;",t.appendChild(this.hud),this.title=J("div","match-msg"),this.title.style.top="16%",this.hud.appendChild(this.title),this.dots=J("div"),this.dots.style.cssText="position:absolute;top:12px;left:50%;transform:translateX(-50%);display:flex;gap:22px;background:rgba(5,18,10,0.8);padding:8px 16px;border-radius:12px;border:1px solid rgba(255,255,255,0.14);",this.hud.appendChild(this.dots),this._renderDots(),this.grid=J("div","penal-grid"),this.grid.style.cssText+=";position:absolute;bottom:26px;left:50%;transform:translateX(-50%);pointer-events:auto;display:none;";let e=["\u25E4","\u25B2","\u25E5","\u25C0","\u25CF","\u25B6"];for(let n=0;n<6;n++){let s=J("div","penal-cell",e[n]);s.addEventListener("pointerdown",r=>{r.preventDefault(),this._pick(n)}),this.grid.appendChild(s)}this.hud.appendChild(this.grid)}_renderDots(){let t=s=>{let r="#666";return s&&(r=s.result==="goal"?"#41d17a":s.result==="saved"?"#3e9bff":"#e5484d"),`<span style="width:12px;height:12px;border-radius:50%;display:inline-block;background:${r};border:1px solid rgba(255,255,255,.3)"></span>`},e=[],n=[];for(let s=0;s<Math.max(this.totalPerSide,this.kicks.filter(r=>r.by===0).length);s++)e.push(t(this.kicks.filter(r=>r.by===0)[s]));for(let s=0;s<Math.max(this.totalPerSide,this.kicks.filter(r=>r.by===1).length);s++)n.push(t(this.kicks.filter(r=>r.by===1)[s]));this.dots.innerHTML=`
      <div style="text-align:center;font-size:11px;font-weight:800;color:${this.home.color==="#f2f2f2"?"#fff":this.home.color}">${this.home.short}<div style="display:flex;gap:5px;margin-top:4px">${e.join("")}</div></div>
      <div style="text-align:center;font-size:11px;font-weight:800;color:${this.away.color==="#f2f2f2"?"#fff":this.away.color}">${this.away.short}<div style="display:flex;gap:5px;margin-top:4px">${n.join("")}</div></div>`}_promptUser(){this.disposed||(this.userToShoot=this.kicks.filter(t=>t.by===0).length<=this.kicks.filter(t=>t.by===1).length,this.title.innerHTML=`<div class="big" style="font-size:30px">${this.userToShoot?I("your_shot"):I("your_save")}</div><div class="small">${this.userToShoot?I("shoot_hint"):I("save_hint")}</div>`,this.title.style.display="block",this.grid.style.display="grid",this.phase="ready",this.gk.diveT=0,this.gk.z=0,this.striker.kick=0,this.striker.x=this.spot.x-1.6,this.striker.z=.4,this.ball.position.set(this.spot.x,.24,0))}_pick(t){if(this.phase==="ready")if(At.click(),this.grid.style.display="none",this.title.style.display="none",this.phase="flight",this.userToShoot){let n=Math.random()<this.diff.gk*.85?t:Math.floor(Math.random()*6),s=Math.random()<.07;this._animateShot(t,n,s,0)}else{let n=Math.random()<.6?[0,2,3,5][Math.floor(Math.random()*4)]:Math.floor(Math.random()*6),s=Math.random()<.1;this._animateShot(n,t,s,1)}}_animateShot(t,e,n,s){this._flight={t:0,zone:t,gkZone:e,miss:n,by:s},this.striker.kick=1e-4,At.kick(.9),Tn(20);let r=Zh[e][0];this.gk.diveDir=Math.sign(r)||(Math.random()>.5?1:-1),e%3===1&&(this.gk.diveDir=Math.random()>.5?1:-1),setTimeout(()=>{this.disposed||(this.gk.diveT=1e-4)},120)}_finishKick(t,e){this.kicks.push({by:e,result:t}),this._renderDots(),t==="goal"?(At.goal(),fl(1,3),Tn(50)):t==="saved"?At.catchBall():At.post();let n=t==="goal"?I("scored"):t==="saved"?I("saved"):I("missed");this.title.innerHTML=`<div class="big" style="font-size:34px">${n}</div>`,this.title.style.display="block",this.phase="result",setTimeout(()=>{this.disposed||(this.title.style.display="none",this._nextOrEnd())},1300)}_nextOrEnd(){let t=this.kicks.filter(l=>l.by===0),e=this.kicks.filter(l=>l.by===1),n=t.filter(l=>l.result==="goal").length,s=e.filter(l=>l.result==="goal").length,r=Math.max(0,this.totalPerSide-t.length),a=Math.max(0,this.totalPerSide-e.length),o=!1;if(t.length>=this.totalPerSide&&e.length>=this.totalPerSide?(o=n!==s,!o&&t.length===e.length&&n!==s&&(o=!0)):(n>s+a||s>n+r)&&(o=!0),o){this.phase="done";let l=n>s,c={userScore:n,oppScore:s,result:l?"win":"lose",home:this.home,away:this.away,difficulty:this.opts.difficulty||"normal",mode:"penalty"};this.title.innerHTML=`<div class="big">${l?I("you_win"):I("you_lose")}</div><div class="small">${n} - ${s}</div>`,this.title.style.display="block",setTimeout(()=>this.onFinish(c),1400);return}this._promptUser()}_loop(t){if(this.disposed)return;this._raf=requestAnimationFrame(this._loop);let e=Math.min(.05,(t-this._last)/1e3);if(this._last=t,this._flight){let n=this._flight;n.t+=e/.72;let[s,r]=Zh[n.zone],a=s,o=r;n.miss&&(Math.random()<.5&&!n._missSet&&(n._missSet=!0,n.missZ=Math.random()<.5?-Se-.7:Se+.7,n.missY=r),n.missZ!==void 0?a=n.missZ:o=_t.goalHeight+.9);let l=Bt(n.t,0,1),c=this.spot.x+(Ut+.3-this.spot.x)*l,h=.24+(o-.24)*l+Math.sin(l*Math.PI)*.7,d=a*l;if(this.ball.position.set(c,h,d),this.ball.rotation.x+=e*14,this.striker.x=Math.min(this.spot.x-.5,this.striker.x+e*3.4),this.striker.phase+=e*12,this.striker.speed01=.7,n.t>=1){let u=this._flight;this._flight=null;let p;if(u.miss)p="miss";else{let g=u.gkZone===u.zone,_=u.gkZone%3===u.zone%3,m=g?.8:_?.3:.04;p=Math.random()<m?"saved":"goal"}this._finishKick(p,u.by)}}this.striker.kick>0&&this.striker.kick<1&&(this.striker.kick+=e*2.6),this.figures.setFigure(this.strikerFig,{x:this.striker.x,z:this.striker.z,facing:this.striker.facing,speed01:this.striker.speed01,phase:this.striker.phase,kick:this.striker.kick,dive:0}),this.gk.diveT>0&&(this.gk.diveT=Math.min(1.2,this.gk.diveT+e*2.2)),this.figures.setFigure(this.keeperFig,{x:this.gk.x,z:this.gk.z,facing:this.gk.facing,speed01:0,phase:0,kick:0,dive:this.gk.diveT,diveDir:this.gk.diveDir}),this.figures.flush(),this.camera.position.z=Math.sin(t/2600)*.4,this.camera.lookAt(this._look),this.renderer.render(this.scene,this.camera)}dispose(){this.disposed=!0,cancelAnimationFrame(this._raf),this.hud&&this.hud.parentNode&&this.hud.parentNode.removeChild(this.hud),this.scene.traverse(t=>{if(t.geometry&&t.geometry.dispose(),t.material){let e=Array.isArray(t.material)?t.material:[t.material];for(let n of e)n.map&&n.map.dispose(),n.dispose()}})}};var O0=[{z:-2.7,y:.9},{z:2.7,y:.9},{z:-1.1,y:2},{z:1.1,y:2}],_a=class{constructor(t,e={}){this.opts=e,this.renderer=e.renderer,this.home=e.home,this.onFinish=e.onFinish||(()=>{}),this.disposed=!1,this.timeLeft=60,this.score=0,this.best=Pt().training.best||0,this.scene=new En,this.camera=new ve(55,window.innerWidth/window.innerHeight,.3,500),oi(this.scene,!!e.night),ai(this.scene,{quality:e.quality||"medium",night:!!e.night}),this.figures=ms(this.scene),this.rings=[];let n=new $r(.85,.09,8,24);for(let s of O0){let r=new $e({color:16106818}),a=new Qt(n,r);a.position.set(Ut-.3,s.y,s.z),a.rotation.y=Math.PI/2,this.scene.add(a),this.rings.push({mesh:a,...s,flash:0})}this.strikerFig=this.figures.allocate(),this.figures.setColor(this.strikerFig,{jersey:this.home.color,socks:this.home.color2,skin:"#d8a878"}),this.player={x:Ut-22,z:0,facing:0,phase:0,speed01:0,kick:0},this.ball=li(),this.scene.add(this.ball),this._respawnBall(),this.camera.position.set(this.player.x-8,4.5,0),this._look=new L(Ut,1.2,0),this._buildHUD(),this._bindSwipe(),this._last=performance.now(),this._loop=this._loop.bind(this),this._raf=requestAnimationFrame(this._loop)}_respawnBall(){this.ballState={x:Ut-18-Math.random()*8,z:(Math.random()*2-1)*14,flight:null},this.ball.position.set(this.ballState.x,.24,this.ballState.z),this.player.x=this.ballState.x-1.4,this.player.z=this.ballState.z+.4}_buildHUD(){let t=this.opts.hudRoot||document.getElementById("hud-root");this.hud=J("div"),this.hud.style.cssText="position:absolute;inset:0;pointer-events:none;",t.appendChild(this.hud),this.info=J("div"),this.info.style.cssText="position:absolute;top:12px;left:50%;transform:translateX(-50%);display:flex;gap:10px;",this.info.innerHTML=`
      <span class="chip gold">\u{1F3AF} <span id="tr-score">0</span></span>
      <span class="chip">\u23F1 <span id="tr-time">60</span></span>
      <span class="chip">${I("best")}: <span id="tr-best">${this.best}</span></span>`,this.hud.appendChild(this.info),this.hint=J("div","muted center"),this.hint.style.cssText="position:absolute;bottom:16px;left:0;right:0;font-weight:700;text-shadow:0 2px 6px #000;",this.hint.textContent="\u21E1 Swipe toward the goal to shoot",this.hud.appendChild(this.hint),this.msg=J("div","match-msg"),this.msg.style.display="none",this.hud.appendChild(this.msg)}_bindSwipe(){this._down=null;let t=n=>{this._down={x:n.clientX,y:n.clientY,t:performance.now()}},e=n=>{if(!this._down||this.ballState.flight)return;let s=n.clientX-this._down.x,r=n.clientY-this._down.y,a=Math.hypot(s,r);if(this._down=null,a<36)return;let o=Bt(a/240,.3,1),l=Bt(s/160,-1,1);this._shoot(o,l,r<0)};window.addEventListener("pointerdown",t),window.addEventListener("pointerup",e),this._unSwipe=()=>{window.removeEventListener("pointerdown",t),window.removeEventListener("pointerup",e)}}_shoot(t,e,n){let s=this.ballState,r=Ut-s.x,a=Bt(e*(Se+1.2),-Se-1.4,Se+1.4),o=Bt(t*(n?2.6:1.6)-.2,.3,_t.goalHeight+.8);s.flight={t:0,dur:Bt(r/(16+t*14),.35,.9),from:{x:s.x,z:s.z},to:{x:Ut+.4,z:a,y:o}},this.player.kick=1e-4,At.kick(t),Tn(15)}_flash(t){this.msg.innerHTML=`<div class="big" style="font-size:30px">${t}</div>`,this.msg.style.display="block",clearTimeout(this._mt),this._mt=setTimeout(()=>{this.msg.style.display="none"},900)}_loop(t){if(this.disposed)return;this._raf=requestAnimationFrame(this._loop);let e=Math.min(.05,(t-this._last)/1e3);if(this._last=t,this.timeLeft>0){this.timeLeft-=e;let s=this.hud.querySelector("#tr-time");s&&(s.textContent=Math.max(0,Math.ceil(this.timeLeft))),this.timeLeft<=0&&this._end()}let n=this.ballState;if(n.flight){let s=n.flight;s.t+=e/s.dur;let r=Bt(s.t,0,1),a=s.from.x+(s.to.x-s.from.x)*r,o=s.from.z+(s.to.z-s.from.z)*r,l=.24+(s.to.y-.24)*r+Math.sin(r*Math.PI)*1.1;if(this.ball.position.set(a,l,o),this.ball.rotation.x+=e*16,r>=1){n.flight=null;let c=!1;for(let h of this.rings)if(Math.abs(s.to.z-h.z)<.95&&Math.abs(s.to.y-h.y)<.95&&s.to.y<_t.goalHeight+.5){c=!0,h.flash=1;break}if(c){this.score++;let h=this.hud.querySelector("#tr-score");h&&(h.textContent=this.score),At.goal(),this._flash("+1 "+I("targets")),Tn(30)}else At.bounce();setTimeout(()=>{!this.disposed&&this.timeLeft>0&&this._respawnBall()},550)}}for(let s of this.rings)s.flash>0?(s.flash-=e*1.6,s.mesh.material.color.setHex(4313466)):s.mesh.material.color.setHex(16106818),s.mesh.scale.setScalar(1+Math.sin(t/400+s.z)*.05+s.flash*.3);this.player.kick>0&&this.player.kick<1&&(this.player.kick+=e*2.8),this.figures.setFigure(this.strikerFig,{x:this.player.x,z:this.player.z,facing:this.player.facing,speed01:0,phase:this.player.phase,kick:this.player.kick,dive:0}),this.figures.flush(),this.camera.position.x=this.ballState.x-8,this.camera.position.z=this.ballState.z*.3,this.camera.lookAt(this._look.x,this._look.y,this.ballState.z*.4),this.renderer.render(this.scene,this.camera)}_end(){let t=Pt();this.score>(t.training.best||0)&&(t.training.best=this.score);let e=this.score*15+20;na(e),ia(30+this.score*3),xe(),this.onFinish({score:this.score,coins:e,best:t.training.best})}dispose(){this.disposed=!0,cancelAnimationFrame(this._raf),this._unSwipe&&this._unSwipe(),clearTimeout(this._mt),this.hud&&this.hud.parentNode&&this.hud.parentNode.removeChild(this.hud),this.scene.traverse(t=>{if(t.geometry&&t.geometry.dispose(),t.material){let e=Array.isArray(t.material)?t.material:[t.material];for(let n of e)n.map&&n.map.dispose(),n.dispose()}})}};var Wn=()=>document.getElementById("ui-root");function en(i,t=!1){let e=document.getElementById("toast-root"),n=J("div","toast"+(t?" bad":""),i);e.appendChild(n),setTimeout(()=>{n.style.opacity="0",n.style.transition="opacity .3s",setTimeout(()=>n.remove(),320)},1900)}function hi(i,t={}){let e=J("div","modal-wrap"),n=J("div","panel modal");return n.appendChild(i),e.appendChild(n),t.sticky||e.addEventListener("pointerdown",s=>{s.target===e&&e.remove()}),Wn().appendChild(e),e}function k0(i,t,e){let n=J("div","topbar");if(t){let r=J("button","back-btn","\u2039");r.addEventListener("click",()=>{At.click(),t()}),n.appendChild(r)}else n.appendChild(J("span"));let s=J("div","title",i);return n.appendChild(s),n.appendChild(e||J("span")),n}function yl(){let i=Pt();return J("span","chip gold",`<span class="coin"></span> ${i.coins.toLocaleString()}`)}function B0(){document.querySelectorAll(".coin-holder").forEach(i=>{i.innerHTML="",i.appendChild(yl())})}function Xn(i,t,e){Wn().innerHTML="";let n=J("div","screen");n.style.background="linear-gradient(180deg, rgba(3,14,7,0.30), rgba(3,14,7,0.78))",n.appendChild(k0(i,t,e));let s=J("div","content");return n.appendChild(s),Wn().appendChild(n),s}function de(i,t,e){let n=J("button","btn "+(t||""),i);return n.addEventListener("click",()=>{At.click(),e()}),n}function Gn(i,t,e){let n=J("div","seg");for(let s of i){let r=J("div","opt"+(s.id===t?" on":""),s.label);r.addEventListener("click",()=>{At.click(),n.querySelectorAll(".opt").forEach(a=>a.classList.remove("on")),r.classList.add("on"),e(s.id)}),n.appendChild(r)}return n}function Ui(i,t){return`<div class="stat-bar"><span class="nm">${i}</span><span class="tr"><span class="fl" style="width:${t}%"></span></span><span class="vl">${t}</span></div>`}function ui(i,t=52){return`<span class="crest-ball" style="width:${t}px;height:${t}px;background:radial-gradient(circle at 32% 28%, #ffffff22, ${i.color});border:2px solid ${i.color2}"></span>`}function Kh(i){Wn().innerHTML="";let t=J("div","splash");t.innerHTML=`
    <svg class="crest" viewBox="0 0 120 140">
      <defs>
        <linearGradient id="sh" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#1d7a41"/><stop offset="1" stop-color="#062814"/>
        </linearGradient>
        <linearGradient id="gd" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#ffe9a3"/><stop offset="1" stop-color="#c8871a"/>
        </linearGradient>
      </defs>
      <path d="M60 4 L112 22 V74 C112 108 88 128 60 137 C32 128 8 108 8 74 V22 Z" fill="url(#sh)" stroke="url(#gd)" stroke-width="4"/>
      <circle cx="60" cy="66" r="26" fill="#ffffff"/>
      <path d="M60 52 l9 7 -3.5 11 h-11 L51 59 Z" fill="#14181d"/>
      <path d="M60 4 l10 3.4 v7 L60 11 50 14.4 v-7 Z" fill="url(#gd)"/>
      <path d="M42 30 l18 -7 18 7 -4 5 -14 -5 -14 5 Z" fill="url(#gd)" opacity="0.9"/>
    </svg>
    <h1>${xn.name}</h1>
    <div class="tag">${I("tagline")} \xB7 ${xn.season}</div>
    <div class="bar"><i id="splash-bar"></i></div>`,Wn().appendChild(t);let e=0,n=t.querySelector("#splash-bar"),s=setInterval(()=>{e=Math.min(100,e+8+Math.random()*14),n.style.width=e+"%",e>=100&&(clearInterval(s),setTimeout(()=>{t.style.transition="opacity .5s",t.style.opacity="0",setTimeout(()=>{t.remove(),i()},480)},350))},120)}function Oe(i){Wn().innerHTML="";let t=J("div","screen home");t.style.background="linear-gradient(180deg, rgba(3,14,7,0.42) 0%, rgba(3,14,7,0.18) 40%, rgba(3,14,7,0.82) 100%)";let e=Pt(),n=xl(),s=J("span","coin-holder");s.appendChild(yl()),t.innerHTML="";let r=J("div","hero");r.innerHTML=`
    <div class="season">${xn.season} \xB7 ${I("offline_note")}</div>
    <div class="game-title">${xn.name}</div>`,t.appendChild(r);let a=J("div","menu"),o=J("button","btn big-play",`\u26BD ${I("play")}`);o.addEventListener("click",()=>{At.click(),Jh(i)}),a.appendChild(o);let l=[["\u{1F3DF}",I("match"),()=>jh(i)],["\u{1F3C6}",I("tournament"),()=>xs(i)],["\u{1F455}",I("team"),()=>z0(i)],["\u{1F0CF}",I("players"),()=>Qh(i)],["\u{1F6D2}",I("shop"),()=>nu(i)],["\u2699\uFE0F",I("settings"),()=>vl(i)],["\u{1F464}",I("profile"),()=>iu(i)],["\u26BD",I("career"),()=>qs(i)]];for(let[h,d,u]of l){let p=J("button","btn",`<span class="ico">${h}</span><span>${d}</span>`);p.addEventListener("click",()=>{At.click(),u()}),a.appendChild(p)}t.appendChild(a);let c=J("div","foot");c.innerHTML=`
    <span class="chip">\u{1F464} ${e.profile.name} \xB7 ${I("level")} ${n.lvl}</span>`,c.appendChild(s),t.appendChild(c),Wn().appendChild(t)}function Jh(i){let t=Xn(I("choose_mode"),()=>Oe(i)),e=J("div","list"),n=[["quick","\u26BD",I("quick_match"),I("quick_desc"),()=>jh(i)],["career","\u{1F4C5}",I("career"),I("career_desc"),()=>qs(i)],["tournament","\u{1F3C6}",I("tournament"),I("tournament_desc"),()=>xs(i)],["penalty","\u{1F945}",I("penalty"),I("penalty_desc"),()=>i.startPenalty()],["training","\u{1F3AF}",I("training"),I("training_desc"),()=>i.startTraining()],["online","\u{1F310}",I("online"),I("online_desc")+" \u2014 "+I("soon"),null]];for(let[s,r,a,o,l]of n){let c=J("div","row-item");c.innerHTML=`<span style="font-size:26px">${r}</span><div class="grow"><div class="t1">${a}</div><div class="t2">${o}</div></div>${l?"":'<span class="chip">\u{1F512}</span>'}`,l?c.addEventListener("click",()=>{At.click(),l()}):c.style.opacity="0.55",e.appendChild(c)}t.appendChild(e)}function jh(i){let t=Pt(),e=Xn(I("quick_match"),()=>Jh(i)),n=ie(t.clubId),s=yn.filter(u=>u.id!==t.clubId),r=s[0].id,a=t.settings.difficulty,o=t.settings.dayNight==="night",l=J("div","panel");l.style.cssText="padding:14px;margin-bottom:10px;",l.innerHTML=`
    <div class="row" style="justify-content:space-between">
      <div class="center">${ui(n)}<div class="t2" style="margin-top:4px;font-size:12px">${n.name}</div></div>
      <div style="font-weight:900;font-size:20px;color:var(--ufm-gold)">VS</div>
      <div class="center" id="opp-badge">${ui(ie(r))}<div class="t2" style="margin-top:4px;font-size:12px" id="opp-name">${ie(r).name}</div></div>
    </div>`,e.appendChild(l),e.appendChild(J("div","sect-title",I("opp_choose")));let c=J("div","seg");for(let u of s){let p=J("div","opt"+(u.id===r?" on":""),u.short);p.style.borderColor=u.color,p.addEventListener("click",()=>{r=u.id,c.querySelectorAll(".opt").forEach(g=>g.classList.remove("on")),p.classList.add("on"),e.querySelector("#opp-badge").innerHTML=ui(u)+`<div class="t2" style="margin-top:4px;font-size:12px">${u.name}</div>`,At.click()}),c.appendChild(p)}e.appendChild(c),e.appendChild(J("div","sect-title",I("difficulty")));let h=Gn(Object.keys(We).map(u=>({id:u,label:I(We[u].label)})),a,u=>{a=u});e.appendChild(h),e.appendChild(J("div","sect-title",I("time_of_day"))),e.appendChild(Gn([{id:"day",label:"\u2600\uFE0F "+I("day")},{id:"night",label:"\u{1F319} "+I("night")}],o?"night":"day",u=>{o=u==="night"}));let d=de("\u26BD "+I("start_match"),"primary block",()=>{t.settings.difficulty=a,t.settings.dayNight=o?"night":"day",xe(),i.startMatch({opponent:ie(r),difficulty:a,night:o,mode:"quick",allowDraw:!0})});d.style.marginTop="18px",e.appendChild(d)}function z0(i){let t=Pt();_s();let e=Xn(I("team"),()=>Oe(i)),n=t.lineup.formation,s=J("div","panel center");s.style.cssText="padding:10px;margin-bottom:10px;",s.innerHTML=`<span class="chip gold">${I("team_ovr")}: <b id="tovr"></b></span> <span class="chip">${ie(t.clubId).name}</span>`,e.appendChild(s),e.appendChild(J("div","sect-title",I("formation")));let r=Gn(Object.keys(An).map(g=>({id:g,label:g})),n,g=>{n=g,t.lineup.formation=g,t.lineup.slots=ci(Di(),g),xe(),c()});e.appendChild(r);let a=J("div","pitch2d");a.innerHTML='<div class="line half"></div><div class="circle"></div>',e.appendChild(a);let o=J("div","muted center mb",I("lineup_hint"));e.appendChild(o);let l=-1;function c(){let g=Di();_s();let _=An[n];a.querySelectorAll(".slot-token").forEach(f=>f.remove()),_.forEach((f,M)=>{let x=t.lineup.slots[M],b=x?Xs(x):null,C=J("div","slot-token");C.style.left=`${50+f.y*42}%`,C.style.top=`${92-f.x*82}%`,C.style.setProperty("--tk",ie(t.clubId).color),C.innerHTML=`<div class="dot">${b?b.ovr:f.pos}</div><div class="nm2">${b?b.name.split(" ")[1]||b.name:f.pos}</div>`,M===l&&C.classList.add("sel"),C.addEventListener("click",()=>{if(At.click(),l===-1)l=M;else if(l===M)l=-1;else{let T=t.lineup.slots[l];t.lineup.slots[l]=t.lineup.slots[M],t.lineup.slots[M]=T,l=-1,xe()}c()}),a.appendChild(C)});let m=e.querySelector("#tovr");if(m){let M=t.lineup.slots.filter(Boolean).map(x=>Xs(x)).filter(Boolean);m.textContent=M.length?Math.round(M.reduce((x,b)=>x+b.ovr,0)/M.length):"\u2014"}u()}let h=J("div","sect-title",I("bench"));e.appendChild(h);let d=J("div","grid-cards");e.appendChild(d);function u(){d.innerHTML="";let g=new Set(t.lineup.slots.filter(Boolean)),_=Di().filter(m=>!g.has(m.id)).sort((m,f)=>f.ovr-m.ovr);for(let m of _){let f=J("div","pcard");f.innerHTML=`<div class="row" style="justify-content:space-between"><span class="ovr">${m.ovr}</span><span class="pos">${m.pos}</span></div><div class="nm">${m.name}</div>`,f.addEventListener("click",()=>{if(l>=0){let M=t.lineup.slots[l];t.lineup.slots[l]=m.id,M&&t.lineup.slots.includes(M),l=-1,xe(),At.success(),c()}else en(I("lineup_hint"))}),d.appendChild(f)}}let p=de("\u2728 "+I("auto_pick"),"ghost block",()=>{t.lineup.slots=ci(Di(),n),xe(),c()});p.style.marginTop="12px",e.appendChild(p),c()}function Qh(i){let t=Xn(I("players"),()=>Oe(i),tu()),e=J("div","grid-cards"),n=Di().sort((s,r)=>r.ovr-s.ovr);for(let s of n){let r=J("div","pcard"),a=ie(s.club);r.style.setProperty("--pc",a.color+"33"),r.innerHTML=`
      <div class="row" style="justify-content:space-between"><span class="ovr">${s.ovr}</span><span class="pos">${s.pos}</span></div>
      <div class="nm">${s.name}</div>
      <div class="club">${a.name}</div>`,r.addEventListener("click",()=>{At.click(),eu(s.id,()=>{Qh(i)})}),e.appendChild(r)}t.appendChild(e)}function tu(){let i=J("span","coin-holder");return i.appendChild(yl()),i}function eu(i,t){let e=Pt(),n=Xs(i);if(!n)return;let s=ie(n.club),r=J("div"),a=Ii(n),o=ua(n);r.innerHTML=`
    <h3>${n.name}</h3>
    <div class="row" style="justify-content:space-between;margin-bottom:10px">
      <span class="chip">${n.pos} \xB7 ${s.name}</span>
      <span class="chip gold" style="font-size:18px">${n.ovr} OVR</span>
    </div>
    ${Ui(I("speed"),n.speed)}
    ${Ui(I("shooting"),n.shooting)}
    ${Ui(I("passing"),n.passing)}
    ${Ui(I("dribbling"),n.dribbling)}
    ${Ui(I("defending"),n.defending)}
    ${Ui(I("physical"),n.physical)}
    ${Ui(I("stamina"),n.stamina)}
    <hr class="hr">
    <div class="row" style="justify-content:space-between"><span class="muted">${I("value")}</span><b>${a.toLocaleString()} \u{1FA99}</b></div>`;let l=J("div","row mt"),c=de(`\u2B06 ${I("upgrade")} (${o} \u{1FA99})`,n.ovr>=95?"ghost":"primary",()=>{let u=Vh(i);if(!u.ok){en(u.reason||I("max_level"),!0),At.error();return}At.levelUp(),en(`${n.name} \u2192 ${u.ovr} OVR`),r.remove(),eu(i,t),B0()});n.ovr>=95&&(c.innerHTML=`\u2B06 ${I("max_level")}`,c.setAttribute("disabled","1"));let h=de(`\u{1F4B0} ${I("sell")} (+${Math.round(a*.8)})`,"danger",()=>{let u=Hh(i);u.ok&&(At.coin(),en(`${I("sold")} +${u.gain} \u{1FA99}`),r.remove(),t())});l.appendChild(c),l.appendChild(h),r.appendChild(l);let d=hi(r);r.remove=()=>d.remove()}function nu(i){let t=Xn(I("market"),()=>Oe(i),tu()),e=J("div","muted mb","\u{1F504} "+I("refresh_daily"));t.appendChild(e);let n=J("div","grid-cards"),s=Gh(),r=Pt();for(let a of s){let o=ie(a.club),l=r.squad.includes(a.id),c=Ii(a),h=J("div","pcard");h.style.setProperty("--pc",o.color+"33"),h.innerHTML=`
      <div class="row" style="justify-content:space-between"><span class="ovr">${a.ovr}</span><span class="pos">${a.pos}</span></div>
      <div class="nm">${a.name}</div>
      <div class="club">${o.name}</div>
      <div class="price">${l?"\u2713":c.toLocaleString()+" \u{1FA99}"}</div>`,l?h.style.opacity="0.5":h.addEventListener("click",()=>{let d=zh(a);if(!d.ok){en(d.reason,!0),At.error();return}At.coin(),en(`${I("purchased")} ${a.name}`),nu(i)}),n.appendChild(h)}t.appendChild(n)}function vl(i,t={}){let e=Pt(),n=!!t.inPause,s=n?J("div"):Xn(I("settings"),()=>Oe(i));function r(o,l,c){let h=J("div","set-row"),d=J("div");d.innerHTML=`<div class="lbl">${o}</div>${l?`<div class="desc">${l}</div>`:""}`,h.appendChild(d),h.appendChild(c),s.appendChild(h)}r(I("graphics"),"",Gn([{id:"auto",label:"AUTO"},{id:"low",label:"LOW"},{id:"medium",label:"MED"},{id:"high",label:"HIGH"}],e.settings.graphics,o=>{e.settings.graphics=o,xe(),i&&i.applyQuality&&i.applyQuality(),en(I("quality_changed"))})),r(I("fps"),"",Gn([{id:30,label:"30 FPS"},{id:60,label:"60 FPS"}],e.settings.fps,o=>{e.settings.fps=o,xe(),i&&i.onFpsChange&&i.onFpsChange()}));function a(o,l,c){let h=J("input");h.type="range",h.min=0,h.max=100,h.value=Math.round(e.settings[l]*100),h.addEventListener("input",()=>{e.settings[l]=h.value/100,xe(),c&&c()}),r(o,"",h)}if(a(I("sound"),"sound",Li),a(I("music"),"music",Li),a(I("camera_sens"),"cameraSens",()=>{i&&i.onCamChange&&i.onCamChange()}),a(I("joystick_size"),"joystickSize"),r(I("language"),"",Gn(Rh.map(o=>({id:o.id,label:o.label})),e.settings.language,o=>{e.settings.language=o,sa(o),xe(),n?t.reopen&&t.reopen():vl(i)})),!n){r(I("time_of_day"),"",Gn([{id:"day",label:"\u2600\uFE0F"},{id:"night",label:"\u{1F319}"}],e.settings.dayNight,l=>{e.settings.dayNight=l,xe()})),r(I("match_length"),"",Gn([{id:"short",label:I("short")},{id:"normal",label:I("normal")},{id:"long",label:I("long")}],e.settings.matchLength,l=>{e.settings.matchLength=l,xe()})),r(I("difficulty"),"",Gn(Object.keys(We).map(l=>({id:l,label:I(We[l].label)})),e.settings.difficulty,l=>{e.settings.difficulty=l,xe()}));let o=de("\u{1F5D1} "+I("reset_save"),"danger block",()=>{let l=J("div");l.innerHTML=`<h3>${I("reset_save")}</h3><p class="muted mb">${I("reset_confirm")}</p>`;let c=J("div","row");c.appendChild(de(I("confirm"),"danger",()=>{Th(),location.reload()})),c.appendChild(de(I("cancel"),"ghost",()=>h.remove())),l.appendChild(c);let h=hi(l)});o.style.marginTop="16px",s.appendChild(o)}if(n)return s}function iu(i){let t=Pt(),e=Xn(I("profile"),()=>Oe(i)),n=xl(),s=t.profile,r=J("div","panel");r.style.cssText="padding:16px;text-align:center;margin-bottom:12px;",r.innerHTML=`
    <div style="font-size:40px">\u{1F9D1}\u200D\u{1F4BC}</div>
    <div style="font-size:20px;font-weight:900;margin-top:6px">${s.name}</div>
    <div class="muted">${ie(t.clubId).name} \xB7 ${I("level")} ${n.lvl}</div>
    <div style="height:8px;border-radius:5px;background:rgba(255,255,255,0.12);overflow:hidden;margin-top:10px">
      <div style="height:100%;width:${Math.round(n.cur/n.need*100)}%;background:linear-gradient(90deg,#2e8b57,var(--ufm-gold))"></div>
    </div>
    <div class="muted" style="margin-top:4px">${n.cur} / ${n.need} ${I("xp")}</div>
    <button class="btn small ghost" id="rename" style="margin:10px auto 0;display:inline-flex">${I("tap_name")}</button>`,e.appendChild(r),r.querySelector("#rename").addEventListener("click",()=>{let o=J("div");o.innerHTML=`<h3>${I("manager")}</h3>`;let l=J("input");l.type="text",l.value=s.name,l.maxLength=18,o.appendChild(l);let c=J("div","row mt");c.appendChild(de(I("confirm"),"primary",()=>{s.name=l.value.trim()||s.name,we(),h.remove(),iu(i)})),c.appendChild(de(I("cancel"),"ghost",()=>h.remove())),o.appendChild(c);let h=hi(o);setTimeout(()=>l.focus(),100)});let a=J("div","panel");a.style.cssText="padding:14px;",a.innerHTML=`
    <div class="row" style="justify-content:space-around;text-align:center">
      <div><div style="font-size:22px;font-weight:900">${s.matches}</div><div class="muted">${I("matches")}</div></div>
      <div><div style="font-size:22px;font-weight:900;color:#41d17a">${s.wins}</div><div class="muted">${I("wins")}</div></div>
      <div><div style="font-size:22px;font-weight:900;color:#f5c542">${s.draws}</div><div class="muted">${I("draws")}</div></div>
      <div><div style="font-size:22px;font-weight:900;color:#e5484d">${s.losses}</div><div class="muted">${I("losses")}</div></div>
    </div>
    <hr class="hr">
    <div class="row" style="justify-content:space-around;text-align:center">
      <div><div style="font-size:18px;font-weight:800">${s.goalsFor}</div><div class="muted">${I("goals_for")}</div></div>
      <div><div style="font-size:18px;font-weight:800">${s.goalsAgainst}</div><div class="muted">${I("goals_con")}</div></div>
      <div><div style="font-size:18px;font-weight:800">\u{1F3C6} ${s.trophies.length}</div><div class="muted">${I("trophy")}</div></div>
    </div>`,e.appendChild(a)}function xs(i){let t=Pt(),e=Xn(I("tournament"),()=>Oe(i));if(!t.tournament||t.tournament.champion||!t.tournament.alive){let r=J("div","panel center");if(r.style.cssText="padding:26px;text-align:center;",t.tournament&&t.tournament.champion){let a=t.tournament.champion===t.clubId;r.innerHTML=`<div style="font-size:56px">${a?"\u{1F3C6}":"\u{1F3C5}"}</div>
        <h3 style="margin-top:8px">${a?I("champion"):I("eliminated")}</h3>
        <p class="muted mb">${a?ie(t.clubId).name:""}</p>`,r.appendChild(de(I("tournament"),"primary block",()=>{da(),xs(i)}))}else t.tournament&&!t.tournament.alive?(r.innerHTML=`<div style="font-size:56px">\u{1F61E}</div><h3>${I("eliminated")}</h3>`,r.appendChild(de(I("tournament"),"primary block",()=>{da(),xs(i)}))):(r.innerHTML=`<div style="font-size:56px">\u{1F3C6}</div>
        <p class="muted mb" style="margin-top:8px">${I("tournament_desc")}</p>`,r.appendChild(de(I("cup_start").replace("!",""),"primary block",()=>{da(),en(I("cup_start")),xs(i)})));e.appendChild(r);return}let n=t.tournament,s=["quarter_final","semi_final","final"];n.rounds.forEach((r,a)=>{e.appendChild(J("div","sect-title",I(s[a]||"final")));for(let o of r){let l=ie(o.a),c=ie(o.b),h=o.a===t.clubId||o.b===t.clubId,d=o.winner===null&&h,u=J("div","row-item");d&&(u.style.borderColor="var(--ufm-gold)"),u.innerHTML=`
        <div class="grow">
          <div class="t1" style="${o.winner===o.a?"color:var(--ufm-gold-2)":""}">${l.name} ${o.winner&&o.score?o.score[0]:""}</div>
          <div class="t1" style="${o.winner===o.b?"color:var(--ufm-gold-2)":""}">${c.name} ${o.winner&&o.score?o.score[1]:""}</div>
        </div>
        ${d?'<span class="chip gold">\u25B6</span>':o.winner?'<span class="muted">\u2713</span>':""}`,d&&u.addEventListener("click",()=>{let p=o.a===t.clubId?c:l;i.startMatch({opponent:p,difficulty:t.settings.difficulty,night:t.settings.dayNight==="night",mode:"tournament",allowDraw:!1})}),e.appendChild(u)}})}function qs(i){let t=Pt(),e=Xn(I("career"),()=>Oe(i));if(!t.career){let l=J("div","panel center");l.style.cssText="padding:26px;text-align:center;",l.innerHTML=`<div style="font-size:56px">\u{1F4C5}</div><p class="muted mb" style="margin-top:8px">${I("career_desc")}</p>`,l.appendChild(de(I("season_start").replace("!",""),"primary block",()=>{_l(),en(I("season_start")),qs(i)})),e.appendChild(l);return}let n=t.career,s=ie(t.clubId),r=Xh();if(r){let l=ie(r.a===t.clubId?r.b:r.a),c=r.a===t.clubId,h=J("div","panel");h.style.cssText="padding:16px;text-align:center;",h.innerHTML=`<div class="muted mb">${I("fixture")} \xB7 ${c?I("home"):I("away")}</div>
      <div class="result-score" style="margin:4px 0">
        <div class="club">${ui(c?s:l,44)}<span>${(c?s:l).short}</span></div>
        <div class="sc">VS</div>
        <div class="club">${ui(c?l:s,44)}<span>${(c?l:s).short}</span></div>
      </div>`,h.appendChild(de("\u26BD "+I("next_match"),"primary block",()=>{i.startMatch({opponent:l,difficulty:t.settings.difficulty,night:t.settings.dayNight==="night",mode:"career",allowDraw:!0})})),e.appendChild(h)}else if(n.done){let l=fa(),c=l[0]&&l[0].id===t.clubId,h=J("div","panel center");h.style.cssText="padding:20px;text-align:center;",h.innerHTML=`<div style="font-size:52px">${c?"\u{1F3C6}":"\u{1F396}"}</div><h3>${c?I("champion"):I("career_done")}</h3>`,h.appendChild(de(I("season")+" +1","primary block",()=>{_l(),qs(i)})),e.appendChild(h)}e.appendChild(J("div","sect-title",I("standings")));let a=fa(),o=J("div","panel");o.style.cssText="padding:10px 14px;font-size:13px;",o.innerHTML=`<div class="row" style="font-weight:900;color:var(--ufm-dim);font-size:11px"><span style="width:24px">#</span><span class="grow">${I("team")}</span><span style="width:30px;text-align:center">${I("matches")}</span><span style="width:30px;text-align:center">${I("wins")}</span><span style="width:36px;text-align:center">+/-</span><span style="width:36px;text-align:center">${I("xp")==="XP"?"PTS":"OCH"}</span></div>`,a.forEach((l,c)=>{let h=ie(l.id),d=l.id===t.clubId,u=J("div","row");u.style.cssText=`padding:5px 0;${d?"color:var(--ufm-gold-2);font-weight:900":""}`,u.innerHTML=`<span style="width:24px">${c+1}</span><span class="grow">${h.name}</span><span style="width:30px;text-align:center">${l.p}</span><span style="width:30px;text-align:center">${l.w}</span><span style="width:36px;text-align:center">${l.gf-l.ga}</span><span style="width:36px;text-align:center">${l.pts}</span>`,o.appendChild(u)}),e.appendChild(o)}function Ml(i,t,e){let n=J("div"),s=t.result==="win"?I("you_win"):t.result==="lose"?I("you_lose"):I("draw"),r=t.result==="win"?"#41d17a":t.result==="lose"?"#e5484d":"#f5c542";n.innerHTML=`
    <h3 style="color:${r};text-align:center;font-size:24px">${s}</h3>
    <div class="result-score">
      <div class="club">${ui(t.home,46)}<span>${t.home.short}</span></div>
      <div class="sc">${t.userScore} - ${t.oppScore}</div>
      <div class="club">${ui(t.away,46)}<span>${t.away.short}</span></div>
    </div>
    <div class="sect-title" style="margin-top:6px">${I("match_rewards")}</div>
    <div class="set-row" style="margin-bottom:6px"><span class="lbl">\u{1FA99} ${I("coins")}</span><b style="color:var(--ufm-gold-2)">+${e.coins}</b></div>
    <div class="set-row" style="margin-bottom:6px"><span class="lbl">\u2B50 ${I("xp")}</span><b>+${e.xp}</b></div>
    ${e.levelUp?`<div class="set-row" style="margin-bottom:6px;border-color:var(--ufm-gold)"><span class="lbl">\u{1F389} ${I("level")}</span><b style="color:var(--ufm-gold-2)">${e.levelUp}</b></div>`:""}`;let a=de(I("cont"),"primary block",()=>{o.remove(),H0(i,t)});a.style.marginTop="10px",n.appendChild(a);let o=hi(n,{sticky:!0})}function H0(i,t){let e=Pt();if(t.mode==="career"){qs(i);return}if(t.mode==="tournament"){xs(i);return}Oe(i)}function su(i,t){let e=J("div");e.innerHTML=`<h3 class="center">${I("paused")}</h3>`;let n=J("div","list");n.appendChild(de("\u25B6 "+I("resume"),"primary block",()=>{s.remove(),t.closePause()})),n.appendChild(de("\u{1F3AE} "+I("controls_help"),"ghost block",()=>{let r=J("div");r.innerHTML=`<h3>${I("controls_help")}</h3><p class="muted" style="line-height:1.7">${I("controls_text")}</p>`,r.appendChild(de(I("ok"),"primary block",()=>a.remove()));let a=hi(r)})),n.appendChild(de("\u2699\uFE0F "+I("settings"),"ghost block",()=>{let r=vl(i,{inPause:!0}),a=J("div");a.innerHTML=`<h3>${I("settings")}</h3>`,a.appendChild(r),a.appendChild(de(I("ok"),"primary block",()=>o.remove()));let o=hi(a)})),n.appendChild(de("\u{1F6AA} "+I("quit_match"),"danger block",()=>{let r=J("div");r.innerHTML=`<h3>${I("quit_match")}</h3><p class="muted mb">${I("quit_confirm")}</p>`;let a=J("div","row");a.appendChild(de(I("confirm"),"danger",()=>{s.remove(),i.quitMatch()})),a.appendChild(de(I("cancel"),"ghost",()=>o.remove())),r.appendChild(a);let o=hi(r)})),e.appendChild(n);let s=hi(e,{sticky:!0});return s}function ru(i,t){Wn().innerHTML="";let e=J("div","screen");e.style.background="linear-gradient(180deg, rgba(3,14,7,0.55), rgba(3,14,7,0.85))",e.innerHTML=`<div class="topbar"><span></span><div class="title">${I("club_pick")}</div><span></span></div>`;let n=J("div","content"),s=J("div","grid-cards");for(let r of yn){let a=J("div","pcard");a.style.setProperty("--pc",r.color+"44"),a.innerHTML=`
      <div class="center" style="margin:6px 0">${ui(r,46)}</div>
      <div class="nm center">${r.name}</div>
      <div class="club center">${I("team_ovr")} ${r.strength}</div>`,a.addEventListener("click",()=>{At.success(),t(r)}),s.appendChild(a)}n.appendChild(s),e.appendChild(n),Wn().appendChild(e)}var xa=document.getElementById("gl-canvas"),at={renderer:null,menuScene:null,match:null,penalty:null,training:null,pauseModal:null,resolvedQuality:"medium"};function au(){let i=Pt();if(i.settings.graphics!=="auto")return i.settings.graphics;let t=navigator.deviceMemory||4,e=navigator.hardwareConcurrency||4,n="medium";return t<=3||e<=4?n="low":t>=6&&e>=8&&(n="high"),i.settings.autoDetected=n,n}function ou(){if(at.renderer){try{at.renderer.dispose()}catch{}at.renderer.forceContextLoss&&at.renderer.forceContextLoss()}at.resolvedQuality=au(),at.renderer=Oh(xa,at.resolvedQuality)}at.applyQuality=()=>{au()!==at.resolvedQuality&&(at.match||at.penalty||at.training||(ya(),ou(),ys()))};at.onFpsChange=()=>{let i=Pt();at.match&&at.match.setTargetFps(i.settings.fps)};at.onCamChange=()=>{let i=Pt();at.match&&at.match.setCamSens(i.settings.cameraSens)};var bl=0;function ys(){if(at.menuScene)return;let i=new En,t=new ve(50,window.innerWidth/window.innerHeight,.5,500);oi(i,!0),ai(i,{quality:at.resolvedQuality,night:!0});let e=li();e.position.set(0,.24,0),i.add(e),at.menuScene={scene:i,camera:t,ball:e};let n=performance.now(),s=r=>{if(!at.menuScene)return;bl=requestAnimationFrame(s);let a=Math.min(.05,(r-n)/1e3);n=r;let o=r/1e3,l=78;t.position.set(Math.sin(o*.06)*l,24+Math.sin(o*.11)*3,Math.cos(o*.06)*l),t.lookAt(0,1,0),e.rotation.y+=a*.8,e.position.y=.24+Math.abs(Math.sin(o*1.4))*.8,at.renderer.render(i,t)};bl=requestAnimationFrame(s)}function ya(){if(!at.menuScene)return;cancelAnimationFrame(bl);let{scene:i}=at.menuScene;i.traverse(t=>{if(t.geometry&&t.geometry.dispose(),t.material){let e=Array.isArray(t.material)?t.material:[t.material];for(let n of e)n.map&&n.map.dispose(),n.dispose()}}),at.menuScene=null}function V0(){return _s(),$h()}at.startMatch=i=>{ya();let t=Pt(),e=ie(t.clubId),n=V0(),s=ci(ml(i.opponent.id),"4-3-3");if(n.length<11){en("Not enough players",!0),Oe(at);return}at.match=new ma(xa,{renderer:at.renderer,home:e,away:i.opponent,homeXI:n,awayXI:s,homeFormation:t.lineup.formation,awayFormation:"4-3-3",difficulty:i.difficulty,length:t.settings.matchLength,night:i.night,quality:at.resolvedQuality,fps:t.settings.fps,cameraSens:t.settings.cameraSens,joystickSize:t.settings.joystickSize,mode:i.mode,allowDraw:i.allowDraw!==!1,onFinish:r=>{r.mode=i.mode,at.match.dispose(),at.match=null,G0(r)},onPause:()=>{at.pauseModal=su(at,at.match)},onResume:()=>{at.pauseModal&&(at.pauseModal.remove(),at.pauseModal=null)}})};at.quitMatch=()=>{at.pauseModal&&(at.pauseModal.remove(),at.pauseModal=null),at.match&&(at.match.dispose(),at.match=null),at.penalty&&(at.penalty.dispose(),at.penalty=null),at.training&&(at.training.dispose(),at.training=null),ys(),Oe(at)};function G0(i){i.mode==="tournament"?Wh(i.result==="win",i.userScore,i.oppScore):i.mode==="career"&&qh(i.userScore,i.oppScore);let t=gl(i,i.mode);ys(),Ml(at,i,t)}at.startPenalty=()=>{ya();let i=Pt(),t=ie(i.clubId),e=yn.filter(s=>s.id!==i.clubId),n=e[Math.floor(Math.random()*e.length)];at.penalty=new ga(xa,{renderer:at.renderer,home:t,away:n,difficulty:i.settings.difficulty,night:i.settings.dayNight==="night",quality:at.resolvedQuality,onFinish:s=>{at.penalty.dispose(),at.penalty=null,s.mode="penalty";let r=gl(s,"penalty");ys(),Ml(at,s,r)}})};at.startTraining=()=>{ya();let i=Pt(),t=ie(i.clubId);at.training=new _a(xa,{renderer:at.renderer,home:t,night:i.settings.dayNight==="night",quality:at.resolvedQuality,onFinish:e=>{at.training.dispose(),at.training=null,ys(),en(`\u{1F3AF} ${e.score} \xB7 +${e.coins} \u{1FA99}`),At.coin(),Oe(at)}})};function W0(i){let t=Pt();t.clubId=i.id;let e=ml(i.id);t.squad=e.map(n=>n.id),t.players={};for(let n of e)t.players[n.id]=JSON.parse(JSON.stringify(n));t.lineup.formation="4-3-3",t.lineup.slots=ci(e,"4-3-3"),we()}window.UFM={version:xn.version,onAndroidBack(){if(at.match)return at.match.openPause(),!0;if(at.penalty||at.training)return at.quitMatch(),!0;let i=document.querySelectorAll(".modal-wrap");return i.length?(i[i.length-1].remove(),!0):document.querySelector(".screen.home")?!1:(Oe(at),!0)}};window.addEventListener("error",i=>{let t=document.getElementById("error-overlay");t&&(t.hidden=!1,t.textContent=`${xn.short} error:
${i.message}
${i.error&&i.error.stack||""}`)});document.addEventListener("visibilitychange",()=>{document.hidden&&we()});window.addEventListener("pointerdown",()=>dl(),{once:!0});window.addEventListener("keydown",()=>dl(),{once:!0});function X0(){let i=ll();sa(i.settings.language||"en"),ou(),ys(),Kh(()=>{i.clubId?Oe(at):ru(at,t=>{W0(t),Li(),en(I("welcome")),Oe(at)})})}document.title=xn.name;X0();})();
