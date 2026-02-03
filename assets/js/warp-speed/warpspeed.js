window.requestAnimationFrame=window.requestAnimationFrame||(function(callback,element){setTimeout(callback,1000/60);});

function timeStamp(){
	if(window.performance.now)return window.performance.now(); else return Date.now();
}

function isVisible(el){
	var r = el.getBoundingClientRect();
	return r.top+r.height >= 0 &&r.left+r.width >= 0 &&r.bottom-r.height <= (window.innerHeight || document.documentElement.clientHeight) && r.right-r.width <= (window.innerWidth || document.documentElement.clientWidth);
}

function Star(x,y,z){
	this.x=x;
	this.y=y;
	this.z=z;
	this.size=0.5+Math.random();
}

function WarpSpeed(targetId,config){
	this.targetId=targetId;
	if(WarpSpeed.RUNNING_INSTANCES==undefined)WarpSpeed.RUNNING_INSTANCES={};
	if(WarpSpeed.RUNNING_INSTANCES[targetId]){WarpSpeed.RUNNING_INSTANCES[targetId].destroy();}
	config=config||{};
	if(typeof config == "string")try{config=JSON.parse(config);}catch(e){config={}}
	this.SPEED=config.speed==undefined||config.speed<0?0.7:config.speed;
	this.TARGET_SPEED=config.targetSpeed==undefined||config.targetSpeed<0?this.SPEED:config.targetSpeed;
	this._normalTargetSpeed=this.TARGET_SPEED;
	this._boostOn=false;
	this._boostStartTime=0;
	this._warpExiting=false;
	this._warpExitStartTime=0;
	this._exitStartSpeed=0;
	this._exitPhaseMs=0;
	this._exitShowWarp=false;
	this._wasInCruiseLastFrame=false;
	var warpEnterMs=config.warpEnterMs!=null?Math.max(0,config.warpEnterMs):2000;
	var warpExitMs=config.warpExitMs!=null?Math.max(0,config.warpExitMs):warpEnterMs;
	this.WARP_ENTER_MS=warpEnterMs;
	this.WARP_EXIT_MS=warpExitMs;
	this.SPEED_ADJ_FACTOR=config.speedAdjFactor==undefined?0.03:config.speedAdjFactor<0?0:config.speedAdjFactor>1?1:config.speedAdjFactor;
	this.DENSITY=config.density==undefined||config.density<=0?0.7:config.density;
	this.USE_CIRCLES=config.shape==undefined?true:config.shape=="circle";
	this.DEPTH_ALPHA=config.depthFade==undefined?true:config.depthFade;
	this.WARP_EFFECT=config.warpEffect==undefined?true:config.warpEffect;
	this.WARP_EFFECT_LENGTH=config.warpEffectLength==undefined?5:config.warpEffectLength<0?0:config.warpEffectLength;
	var warpStyle=config.warpEffectStyle;
	var validWarpStyles=["streaks","pulse","aurora","lenticular","passage","none"];
	this.WARP_EFFECT_STYLE=(typeof warpStyle==="string"&&validWarpStyles.indexOf(warpStyle)!==-1)?warpStyle:"none";
	this.STAR_SCALE=config.starSize==undefined||config.starSize<=0?3:config.starSize;
	this.BACKGROUND_COLOR=config.backgroundColor==undefined?"hsl(263,45%,7%)":config.backgroundColor;
	this.SUN_ENABLED=config.sun!==false;
	this.SUN_RADIUS=config.sunRadius==undefined?80:Math.max(20,config.sunRadius);
	this.SUN_GLOW=config.sunGlow==undefined?3:Math.max(1,config.sunGlow);
	var glowStyle=config.sunGlowStyle;
	var validStyles=["minimal","sharp","classic","soft","corona"];
	if(typeof glowStyle==="number"&&glowStyle>=0&&glowStyle<=4){var n2s={0:"minimal",1:"sharp",2:"classic",3:"soft",4:"corona"};glowStyle=n2s[Math.floor(glowStyle)];}
	this.SUN_GLOW_STYLE=typeof glowStyle==="string"&&validStyles.indexOf(glowStyle)!==-1?glowStyle:"soft";
	this.GALAXIES_ENABLED=config.galaxies!==false;
	this.GALAXY_COUNT=config.galaxyCount==undefined?4:Math.max(0,config.galaxyCount);
	this.NEBULAE_ENABLED=config.nebulae!==false;
	this.NEBULA_COUNT=config.nebulaCount==undefined?4:Math.max(0,config.nebulaCount);
	this.ZODIACAL_LIGHT=config.zodiacalLight!==false;
	this.galaxies=[];
	this.nebulae=[];
	this.currentSun=this.SUN_ENABLED?this._spawnSun(180+Math.random()*220):null;
	for(var n=0;n<this.NEBULA_COUNT;n++){
		var angle=(n/this.NEBULA_COUNT)*Math.PI*2*1.5+(Math.random()-0.5);
		var radius=400+Math.random()*600;
		var depth=2600+Math.random()*2000;
		this.nebulae.push({
			x:Math.cos(angle)*radius*(0.6+Math.random()*0.5),
			y:Math.sin(angle)*radius*(0.6+Math.random()*0.5),
			z:depth,
			scale:0.12+Math.random()*0.18,
			hue:220+Math.random()*50,
			aspect:0.4+Math.random()*0.35
		});
	}
	for(var g=0;g<this.GALAXY_COUNT;g++){
		var angle=(g/this.GALAXY_COUNT)*Math.PI*2*1.62+(Math.random()-0.5)*0.8;
		var radius=350+Math.random()*500;
		var depthBand=1800+(g/this.GALAXY_COUNT)*2200+Math.random()*280;
		this.galaxies.push({
			x:Math.cos(angle)*radius*(0.7+Math.random()*0.6),
			y:Math.sin(angle)*radius*(0.7+Math.random()*0.6),
			z:depthBand,
			scale:0.22+Math.random()*0.38,
			tilt:Math.random()*Math.PI*2,
			type:Math.floor(Math.random()*5)
		});
	}
	this.outerGalaxyCount=5;
	for(var o=0;o<this.outerGalaxyCount;o++){
		var angle=(o/this.outerGalaxyCount)*Math.PI*2*2.1+(Math.random()-0.5)*1.2;
		var radius=680+Math.random()*520;
		var depthBand=2200+Math.random()*1800;
		this.galaxies.push({
			x:Math.cos(angle)*radius*(0.8+Math.random()*0.5),
			y:Math.sin(angle)*radius*(0.8+Math.random()*0.5),
			z:depthBand,
			scale:0.2+Math.random()*0.35,
			tilt:Math.random()*Math.PI*2,
			type:Math.floor(Math.random()*5)
		});
	}
	this.cornerGalaxyCount=5;
	var cornerAngles=[Math.PI/4,3*Math.PI/4,5*Math.PI/4,7*Math.PI/4];
	for(var c=0;c<this.cornerGalaxyCount;c++){
		var baseAngle=cornerAngles[c%4]+(Math.random()-0.5)*0.6;
		var radius=750+Math.random()*450;
		var depthBand=2400+Math.random()*1600;
		this.galaxies.push({
			x:Math.cos(baseAngle)*radius*(0.85+Math.random()*0.4),
			y:Math.sin(baseAngle)*radius*(0.85+Math.random()*0.4),
			z:depthBand,
			scale:0.18+Math.random()*0.32,
			tilt:Math.random()*Math.PI*2,
			type:Math.floor(Math.random()*5)
		});
	}
	var canvas=document.getElementById(this.targetId);
	canvas.width=1; canvas.height=1;
	var ctx=canvas.getContext("2d");
	ctx.fillStyle=this.BACKGROUND_COLOR;
	ctx.fillRect(0,0,1,1);
	ctx.fillStyle=config.starColor==undefined?"#FFFFFF":config.starColor;
	ctx.fillRect(0,0,1,1);
	var color=ctx.getImageData(0,0,1,1).data;
	this.STAR_R=color[0]; this.STAR_G=color[1]; this.STAR_B=color[2];
	this.prevW=-1; this.prevH=-1; //width and height will be set at first draw call
	this.stars=[];
	for(var i=0;i<this.DENSITY*1000;i++){
		this.stars.push(new Star((Math.random()-0.5)*1000,(Math.random()-0.5)*1000,1000*Math.random()));
	}
	this.lastMoveTS=timeStamp();
	this.drawRequest=null;
	this.LAST_RENDER_T=0;
	this.perspectiveTiltX=0;
	this.perspectiveTiltY=0;
	this._perspectiveMaxTilt=1;
	this._perspectiveSensitivity=0.0008;
	this._perspectiveMinDragPx=15;
	this._leftMaybeBoost=false;
	this._leftPerspectiveDrag=false;
	this._leftStartX=0;
	this._leftStartY=0;
	this._leftLastX=0;
	this._leftLastY=0;
	this._leftDownTime=0;
	this._holdBoostMs=250;
	this._holdBoostTimerId=null;
	this._boostActivatedByMouse=false;
	WarpSpeed.RUNNING_INSTANCES[targetId]=this;
	this._bindPerspectiveDrag();
	this.draw();
}
WarpSpeed.prototype={
	constructor:WarpSpeed,
	_bindPerspectiveDrag:function(){
		var self=this;
		this._onPerspectiveMouseDown=function(e){
			if(e.button!==0)return;
			var canvas=document.getElementById(self.targetId);
			if(!canvas)return;
			var warpMenu=document.getElementById("warp-menu");
			var inMenu=warpMenu&&warpMenu.contains(e.target);
			var interactive=e.target&&["A","BUTTON","INPUT","SELECT","TEXTAREA"].indexOf(e.target.tagName)!==-1;
			var onBackground=e.target===canvas||(!inMenu&&!interactive);
			if(!onBackground)return;
			self._leftMaybeBoost=true;
			self._leftPerspectiveDrag=false;
			self._boostActivatedByMouse=false;
			self._leftStartX=self._leftLastX=e.clientX;
			self._leftStartY=self._leftLastY=e.clientY;
			self._leftDownTime=timeStamp();
			if(self._holdBoostTimerId!==null){clearTimeout(self._holdBoostTimerId);self._holdBoostTimerId=null;}
			self._holdBoostTimerId=setTimeout(function(){
				if(self._leftMaybeBoost&&!self._leftPerspectiveDrag){self.setBoost(true);self._boostActivatedByMouse=true;}
				self._holdBoostTimerId=null;
			},self._holdBoostMs);
		};
		this._onPerspectiveMouseMove=function(e){
			if(self._leftMaybeBoost&&(e.buttons&1)){
				var dx=e.clientX-self._leftStartX, dy=e.clientY-self._leftStartY;
				var dist=Math.sqrt(dx*dx+dy*dy);
				if(dist>=self._perspectiveMinDragPx){
					if(self._holdBoostTimerId!==null){clearTimeout(self._holdBoostTimerId);self._holdBoostTimerId=null;}
					if(self._boostActivatedByMouse){self.setBoost(false);self._boostActivatedByMouse=false;}
					self._leftMaybeBoost=false;
					self._leftPerspectiveDrag=true;
					var ddx=e.clientX-self._leftLastX, ddy=e.clientY-self._leftLastY;
					self.perspectiveTiltX+=ddx*self._perspectiveSensitivity;
					self.perspectiveTiltY+=ddy*self._perspectiveSensitivity;
					var m=self._perspectiveMaxTilt;
					self.perspectiveTiltX=Math.max(-m,Math.min(m,self.perspectiveTiltX));
					self.perspectiveTiltY=Math.max(-m,Math.min(m,self.perspectiveTiltY));
					self._leftLastX=e.clientX;
					self._leftLastY=e.clientY;
				}
			}else if(self._leftPerspectiveDrag&&(e.buttons&1)){
				var ddx=e.clientX-self._leftLastX, ddy=e.clientY-self._leftLastY;
				self.perspectiveTiltX+=ddx*self._perspectiveSensitivity;
				self.perspectiveTiltY+=ddy*self._perspectiveSensitivity;
				var m=self._perspectiveMaxTilt;
				self.perspectiveTiltX=Math.max(-m,Math.min(m,self.perspectiveTiltX));
				self.perspectiveTiltY=Math.max(-m,Math.min(m,self.perspectiveTiltY));
				self._leftLastX=e.clientX;
				self._leftLastY=e.clientY;
			}
		};
		this._onPerspectiveMouseUp=function(e){
			if(e.button===0){
				if(self._holdBoostTimerId!==null){clearTimeout(self._holdBoostTimerId);self._holdBoostTimerId=null;}
				if(self._boostActivatedByMouse){self.setBoost(false);self._boostActivatedByMouse=false;}
				self._leftMaybeBoost=false;
				self._leftPerspectiveDrag=false;
			}
		};
		document.addEventListener("mousedown",this._onPerspectiveMouseDown);
		document.addEventListener("mousemove",this._onPerspectiveMouseMove);
		document.addEventListener("mouseup",this._onPerspectiveMouseUp);
	},
	_spawnSun:function(initialZ){
		var hue=Math.random()<0.8?Math.random()*55:200+Math.random()*22;
		return{x:(Math.random()-0.5)*400,y:(Math.random()-0.5)*400,z:initialZ||600+Math.random()*500,radius:45+Math.random()*95,glow:2.4+Math.random()*2.2,hue:hue};
	},
	draw:function(){
		var TIME=timeStamp();
		if(!(document.getElementById(this.targetId))){
			this.destroy();
			return;
		}
		this.move();
		var canvas=document.getElementById(this.targetId);
		if(!this.PAUSED&&isVisible(canvas)){
			if(this.prevW!=canvas.clientWidth||this.prevH!=canvas.clientHeight){
				canvas.width=(canvas.clientWidth<10?10:canvas.clientWidth)*(window.devicePixelRatio||1);
				canvas.height=(canvas.clientHeight<10?10:canvas.clientHeight)*(window.devicePixelRatio||1);
			}
			this.size=(canvas.height<canvas.width?canvas.height:canvas.width)/(10/(this.STAR_SCALE<=0?0:this.STAR_SCALE));
			// Warp effects only in cruise mode: near max speed + minimum boost time
			var cruiseSpeedThreshold=this._normalTargetSpeed*4.5;
			var boostDuration=timeStamp()-this._boostStartTime;
			var inCruiseMode=this._boostOn&&boostDuration>=this.WARP_ENTER_MS&&this.SPEED>=cruiseSpeedThreshold;
			var showWarpLines;
			if(inCruiseMode){
				this._warpExiting=false;
				this._wasInCruiseLastFrame=true;
				showWarpLines=this.WARP_EFFECT_STYLE!=="none";
			}else{
				if(this._wasInCruiseLastFrame&&!this._boostOn){this._warpExitStartTime=timeStamp();this._exitStartSpeed=this.SPEED;this._exitPhaseMs=this.WARP_EXIT_MS;this._exitShowWarp=true;this._warpExiting=true;}
				else if(!this._warpExiting&&!this._boostOn&&this.SPEED>this._normalTargetSpeed){this._warpExitStartTime=timeStamp();this._exitStartSpeed=this.SPEED;this._exitPhaseMs=1000;this._exitShowWarp=false;this._warpExiting=true;}
				this._wasInCruiseLastFrame=false;
				var exitElapsed=timeStamp()-this._warpExitStartTime;
				showWarpLines=this._warpExiting&&exitElapsed<this._exitPhaseMs&&this._exitShowWarp&&this.WARP_EFFECT_STYLE!=="none";
				if(this._warpExiting&&exitElapsed>=this._exitPhaseMs)this._warpExiting=false;
			}
			if(showWarpLines||this.WARP_EFFECT) this.maxLineWidth=this.size/55;
			var ctx=canvas.getContext("2d");
			ctx.fillStyle=this.BACKGROUND_COLOR;
			ctx.fillRect(0,0,canvas.width,canvas.height);
			if(this.ZODIACAL_LIGHT){
				var zx=canvas.width*0.55, zy=canvas.height*1.15;
				var zg=ctx.createRadialGradient(zx,zy,0,zx,zy,Math.max(canvas.width,canvas.height)*0.7);
				zg.addColorStop(0,"rgba(255,248,230,0.04)");
				zg.addColorStop(0.4,"rgba(255,240,210,0.02)");
				zg.addColorStop(1,"rgba(200,190,180,0)");
				ctx.fillStyle=zg;
				ctx.fillRect(0,0,canvas.width,canvas.height);
			}
			if(this.NEBULAE_ENABLED){
				var innerEl=document.getElementById("inner");
				var innerR=innerEl?innerEl.getBoundingClientRect():null;
				var canvasR=canvas.getBoundingClientRect();
				for(var n=0;n<this.nebulae.length;n++){
					var neb=this.nebulae[n];
					var nx=neb.x/neb.z, ny=neb.y/neb.z;
					var tx=this.perspectiveTiltX, ty=this.perspectiveTiltY;
					if(nx<-1-tx||nx>1-tx||ny<-1-ty||ny>1-ty)continue;
					var screenR=Math.max(12,neb.scale*this.size*180/neb.z);
					if(screenR<4)continue;
					var ncx=canvas.width*(nx+0.5+this.perspectiveTiltX), ncy=canvas.height*(ny+0.5+this.perspectiveTiltY);
					if(innerR){
						var vx=canvasR.left+(ncx/canvas.width)*canvasR.width, vy=canvasR.top+(ncy/canvas.height)*canvasR.height;
						var pad=screenR*(canvasR.width/canvas.width)*1.6+60;
						if(vx>=innerR.left-pad&&vx<=innerR.right+pad&&vy>=innerR.top-pad&&vy<=innerR.bottom+pad)continue;
					}
					ctx.save();
					ctx.translate(ncx,ncy);
					ctx.scale(1,neb.aspect);
					var ng=ctx.createRadialGradient(0,0,0,0,0,screenR);
					ng.addColorStop(0,"hsla("+neb.hue+",25%,55%,0.08)");
					ng.addColorStop(0.5,"hsla("+(neb.hue+15)+",20%,50%,0.04)");
					ng.addColorStop(1,"hsla("+(neb.hue+25)+",15%,45%,0)");
					ctx.fillStyle=ng;
					ctx.beginPath();
					ctx.arc(0,0,screenR,0,2*Math.PI);
					ctx.fill();
					ctx.restore();
				}
			}
			if(this.GALAXIES_ENABLED){
				var innerEl=document.getElementById("inner");
				var innerR=innerEl?innerEl.getBoundingClientRect():null;
				var canvasR=canvas.getBoundingClientRect();
				for(var g=0;g<this.galaxies.length;g++){
					var gal=this.galaxies[g];
					var gx=gal.x/gal.z, gy=gal.y/gal.z;
					var tx=this.perspectiveTiltX, ty=this.perspectiveTiltY;
					if(gx<-1-tx||gx>1-tx||gy<-1-ty||gy>1-ty)continue;
					var screenR=Math.max(18,gal.scale*this.size*320/gal.z);
					if(screenR<3)continue;
					var cx=canvas.width*(gx+0.5+this.perspectiveTiltX), cy=canvas.height*(gy+0.5+this.perspectiveTiltY);
					if(innerR){
						var vx=canvasR.left+(cx/canvas.width)*canvasR.width, vy=canvasR.top+(cy/canvas.height)*canvasR.height;
												var pad=screenR*(canvasR.width/canvas.width)*1.6+60;
						if(vx>=innerR.left-pad&&vx<=innerR.right+pad&&vy>=innerR.top-pad&&vy<=innerR.bottom+pad)continue;
					}
					var aspect=0.45, c0,c1,c2,c3;
					switch(gal.type){
						case 0: aspect=0.42; c0="rgba(140,120,200,0.5)"; c1="rgba(100,80,160,0.3)"; c2="rgba(70,50,130,0.15)"; c3="rgba(50,30,100,0)"; break;
						case 1: aspect=0.72; c0="rgba(80,120,180,0.45)"; c1="rgba(60,90,150,0.28)"; c2="rgba(40,60,120,0.12)"; c3="rgba(30,40,90,0)"; break;
						case 2: aspect=0.38; c0="rgba(180,100,140,0.48)"; c1="rgba(140,70,110,0.3)"; c2="rgba(110,50,85,0.14)"; c3="rgba(80,30,60,0)"; break;
						case 3: aspect=0.65; c0="rgba(200,160,100,0.4)"; c1="rgba(160,120,70,0.25)"; c2="rgba(120,80,50,0.1)"; c3="rgba(80,50,30,0)"; break;
						default: aspect=0.55; c0="rgba(100,160,180,0.44)"; c1="rgba(70,130,150,0.27)"; c2="rgba(50,100,120,0.13)"; c3="rgba(35,70,90,0)";
					}
					ctx.save();
					ctx.translate(cx,cy);
					ctx.rotate(gal.tilt);
					ctx.scale(1,aspect);
					var grd=ctx.createRadialGradient(0,0,0,0,0,screenR);
					grd.addColorStop(0,c0);
					grd.addColorStop(0.35,c1);
					grd.addColorStop(0.65,c2);
					grd.addColorStop(1,c3);
					ctx.fillStyle=grd;
					ctx.beginPath();
					ctx.arc(0,0,screenR,0,2*Math.PI);
					ctx.fill();
					ctx.restore();
				}
			}
			var cxc=canvas.width/2, cyc=canvas.height/2;
			var warpStyle=showWarpLines?this.WARP_EFFECT_STYLE:null;
			var isWormhole=warpStyle==="aurora"||warpStyle==="lenticular"||warpStyle==="passage";
			var rgb="rgb("+this.STAR_R+","+this.STAR_G+","+this.STAR_B+")", rgba="rgba("+this.STAR_R+","+this.STAR_G+","+this.STAR_B+",";
			for(var i=0;i<this.stars.length;i++){
				var s=this.stars[i];
				var xOnDisplay=s.x/s.z, yOnDisplay=s.y/s.z;
				var tx=this.perspectiveTiltX, ty=this.perspectiveTiltY;
				var drawAsWarp=showWarpLines;
				if(!drawAsWarp&&(xOnDisplay<-0.5-tx||xOnDisplay>0.5-tx||yOnDisplay<-0.5-ty||yOnDisplay>0.5-ty))continue;
				var size=s.size*this.size/s.z;
				if(size<0.3) continue; //don't draw very small dots
				var sx=canvas.width*(xOnDisplay+0.5+this.perspectiveTiltX), sy=canvas.height*(yOnDisplay+0.5+this.perspectiveTiltY);
				if(this.DEPTH_ALPHA){
					var alpha=(1000-s.z)/1000;
					ctx.fillStyle=rgba+(alpha>1?1:alpha)+")";
				}else{
					ctx.fillStyle=rgb;
				}
				if(drawAsWarp){
					var effLen=this.WARP_EFFECT_LENGTH*this.SPEED;
					var style=warpStyle||"streaks";
					if(style==="pulse"){var t=timeStamp()*0.003;effLen*=0.85+0.25*Math.sin(t);}
					else if(style==="streaks")effLen*=2.2;
					else if(isWormhole)effLen*=2.0;
					var x2OnDisplay=s.x/(s.z+effLen), y2OnDisplay=s.y/(s.z+effLen);
					if(x2OnDisplay<-0.5-tx||x2OnDisplay>0.5-tx||y2OnDisplay<-0.5-ty||y2OnDisplay>0.5-ty)continue;
					var sx2=canvas.width*(x2OnDisplay+0.5+this.perspectiveTiltX), sy2=canvas.height*(y2OnDisplay+0.5+this.perspectiveTiltY);
					var lw=size>this.maxLineWidth?this.maxLineWidth:size;
					if(style==="streaks")lw*=0.5;
					ctx.lineWidth=lw;
					if(style==="streaks"){ctx.lineCap="butt";ctx.globalAlpha=0.85;}
					else{ctx.lineCap="round";}
					if(style==="aurora"){var u=(sx/canvas.width);var h=192+12*Math.sin(u*Math.PI*2);ctx.strokeStyle="hsla("+h+",48%,46%,0.58)";}
					else{ctx.strokeStyle=ctx.fillStyle;}
					ctx.beginPath();
					ctx.moveTo(sx-size/2,sy-size/2);
					ctx.lineTo(sx2-size/2,sy2-size/2);
					ctx.stroke();
					if(style==="lenticular"){var gx=(sx+sx2)*0.5,gy=(sy+sy2)*0.5;var gx2=cxc+(gx-cxc)*0.4,gy2=cyc+(gy-cyc)*0.4;ctx.globalAlpha=0.09;ctx.strokeStyle=ctx.fillStyle;ctx.beginPath();ctx.moveTo(gx-size/2,gy-size/2);ctx.lineTo(gx2-size/2,gy2-size/2);ctx.stroke();ctx.globalAlpha=1;}
					if(style==="streaks")ctx.globalAlpha=1;
				}else if(this.USE_CIRCLES){
					ctx.beginPath();
					ctx.arc(sx-size/2,sy-size/2,size/2,0,2*Math.PI);
					ctx.fill();
				}else{
					ctx.fillRect(sx-size/2,sy-size/2,size,size);
				}
			}
			if(this.SUN_ENABLED&&this.currentSun&&this.currentSun.z>5){
				var sun=this.currentSun;
				var sx=sun.x/sun.z, sy=sun.y/sun.z;
				var tx=this.perspectiveTiltX, ty=this.perspectiveTiltY;
				if(sx>=-0.8-tx&&sx<=0.8-tx&&sy>=-0.8-ty&&sy<=0.8-ty){
					var sunScreenR=Math.max(28,(sun.radius*this.size/sun.z))*((this.WARP_EFFECT||showWarpLines)?1.2:1);
					var glowR=Math.max(sunScreenR*sun.glow,55);
					var cx=canvas.width*(sx+0.5+this.perspectiveTiltX), cy=canvas.height*(sy+0.5+this.perspectiveTiltY);
					var h=sun.hue, sat=100, l=98;
					var core="hsla("+h+","+(sat*0.35)+"%,"+l+"%,1)";
					var mid="hsla("+(h+6)+","+sat+"%,68%,0.9)";
					var edge="hsla("+(h+12)+","+sat+"%,50%,0.25)";
					var out="hsla("+(h+18)+","+sat+"%,35%,0)";
					switch(this.SUN_GLOW_STYLE){
					case "minimal":
						var glowR4=sunScreenR*0.85;
						var grd=ctx.createRadialGradient(cx,cy,0,cx,cy,glowR4);
						grd.addColorStop(0,"hsla("+h+","+(sat*0.4)+"%,80%,0.12)");
						grd.addColorStop(1,"hsla("+(h+15)+","+sat+"%,40%,0)");
						ctx.fillStyle=grd;
						ctx.beginPath();
						ctx.arc(cx,cy,glowR4,0,2*Math.PI);
						ctx.fill();
						break;
					case "sharp":
						var glowR2=Math.max(sunScreenR*1.25,40);
						grd=ctx.createRadialGradient(cx,cy,0,cx,cy,glowR2);
						grd.addColorStop(0,core);
						grd.addColorStop(0.35,"hsla("+(h+10)+","+sat+"%,55%,0.15)");
						grd.addColorStop(1,"hsla("+(h+18)+","+sat+"%,35%,0)");
						ctx.fillStyle=grd;
						ctx.beginPath();
						ctx.arc(cx,cy,glowR2,0,2*Math.PI);
						ctx.fill();
						break;
					case "classic":
						grd=ctx.createRadialGradient(cx,cy,0,cx,cy,glowR);
						grd.addColorStop(0,core);
						grd.addColorStop(0.15,mid);
						grd.addColorStop(0.45,edge);
						grd.addColorStop(1,out);
						ctx.fillStyle=grd;
						ctx.beginPath();
						ctx.arc(cx,cy,glowR,0,2*Math.PI);
						ctx.fill();
						break;
					case "soft":
						var glowR1=glowR*1.15;
						grd=ctx.createRadialGradient(cx,cy,0,cx,cy,glowR1);
						grd.addColorStop(0,"hsla("+h+","+(sat*0.3)+"%,75%,0.95)");
						grd.addColorStop(0.12,"hsla("+(h+4)+","+sat+"%,65%,0.5)");
						grd.addColorStop(0.28,"hsla("+(h+8)+","+sat+"%,55%,0.2)");
						grd.addColorStop(0.5,"hsla("+(h+12)+","+sat+"%,45%,0.08)");
						grd.addColorStop(0.75,"hsla("+(h+16)+","+sat+"%,38%,0.02)");
						grd.addColorStop(1,"hsla("+(h+18)+","+sat+"%,35%,0)");
						ctx.fillStyle=grd;
						ctx.beginPath();
						ctx.arc(cx,cy,glowR1,0,2*Math.PI);
						ctx.fill();
						break;
					case "corona":
						grd=ctx.createRadialGradient(cx,cy,0,cx,cy,glowR);
						grd.addColorStop(0,core);
						grd.addColorStop(0.2,mid);
						grd.addColorStop(0.5,edge);
						grd.addColorStop(1,out);
						ctx.fillStyle=grd;
						ctx.beginPath();
						ctx.arc(cx,cy,glowR,0,2*Math.PI);
						ctx.fill();
						var ringR=glowR*0.45;
						var grd2=ctx.createRadialGradient(cx,cy,ringR*0.3,cx,cy,ringR*1.8);
						grd2.addColorStop(0,"rgba(255,248,240,0)");
						grd2.addColorStop(0.4,"rgba(255,245,230,0.06)");
						grd2.addColorStop(0.7,"rgba(255,242,225,0.02)");
						grd2.addColorStop(1,"rgba(255,238,220,0)");
						ctx.fillStyle=grd2;
						ctx.beginPath();
						ctx.arc(cx,cy,glowR,0,2*Math.PI);
						ctx.fill();
						break;
					}
					ctx.fillStyle="hsla("+h+","+(sat*0.4)+"%,96%,0.95)";
					ctx.beginPath();
					ctx.arc(cx,cy,sunScreenR*0.42,0,2*Math.PI);
					ctx.fill();
					var diskR=sunScreenR*0.42;
					var numSpots=5+Math.floor((sun.x*0.013+sun.y*0.011)%4);
					for(var sp=0;sp<numSpots;sp++){
						var angle=(sp/numSpots)*Math.PI*2*1.7+sun.x*0.005+sun.y*0.007;
						var dist=diskR*(0.48+0.38*((sp*0.2+sun.x*0.001)%1));
						var spx=cx+Math.cos(angle)*dist, spy=cy+Math.sin(angle)*dist;
						var spotR=Math.max(2,diskR*0.08*(0.6+(sp*0.17%0.5)));
						ctx.save();
						ctx.translate(spx,spy);
						ctx.rotate(sun.x*0.004+sp*0.5);
						ctx.scale(1,0.6+(sp*0.05%0.4));
						var spotG=ctx.createRadialGradient(0,0,0,0,0,spotR*2);
						spotG.addColorStop(0,"rgba(90,55,45,0.5)");
						spotG.addColorStop(0.4,"rgba(140,90,70,0.25)");
						spotG.addColorStop(0.75,"rgba(180,120,90,0.08)");
						spotG.addColorStop(1,"rgba(220,180,150,0)");
						ctx.fillStyle=spotG;
						ctx.beginPath();
						ctx.arc(0,0,spotR*1.5,0,2*Math.PI);
						ctx.fill();
						ctx.restore();
					}
				}
			}
			if(showWarpLines&&warpStyle==="aurora"){var g=ctx.createLinearGradient(0,0,canvas.width,0);g.addColorStop(0,"rgba(38,58,62,0.05)");g.addColorStop(0.25,"rgba(40,60,62,0.045)");g.addColorStop(0.5,"rgba(38,58,60,0.05)");g.addColorStop(0.75,"rgba(40,60,62,0.045)");g.addColorStop(1,"rgba(38,58,62,0.05)");ctx.fillStyle=g;ctx.fillRect(0,0,canvas.width,canvas.height);}
			if(showWarpLines&&warpStyle==="passage"){var flash=0.04+0.03*Math.sin(timeStamp()*0.004);ctx.fillStyle="rgba(255,255,255,"+flash+")";ctx.fillRect(0,0,canvas.width,canvas.height);}
			this.prevW=canvas.clientWidth;
			this.prevH=canvas.clientHeight;
		}
		if(this.drawRequest!=-1)this.drawRequest=requestAnimationFrame(this.draw.bind(this));
		this.LAST_RENDER_T=timeStamp()-TIME;
	},
	move:function(){
		var t=timeStamp(), delta=t-this.lastMoveTS, speedMulF=delta/(1000/60);
		// Cap catch-up when returning from background so stars don't bunch in one frame
		if(speedMulF>3)speedMulF=3;
		this.lastMoveTS=t;
		if(this.PAUSED)return;
		if(this._warpExiting){var exitElapsed=t-this._warpExitStartTime;if(exitElapsed>=this._exitPhaseMs){this._warpExiting=false;this.TARGET_SPEED=this._normalTargetSpeed;}else{this.TARGET_SPEED=this._normalTargetSpeed+(this._exitStartSpeed-this._normalTargetSpeed)*(1-exitElapsed/this._exitPhaseMs);}}
		var adjF=this.SPEED_ADJ_FACTOR<0?0:this.SPEED_ADJ_FACTOR>1?1:this.SPEED_ADJ_FACTOR;
		if(this.TARGET_SPEED<this.SPEED&&!this._warpExiting){adjF*=0.006;}
		var speedAdjF=Math.pow(adjF,1/speedMulF);
		this.SPEED=this.TARGET_SPEED*speedAdjF+this.SPEED*(1-speedAdjF);
		if(this.SPEED<0)this.SPEED=0;
		var speed=this.SPEED*speedMulF;
		for(var i=0;i<this.stars.length;i++){
			var s=this.stars[i];
			s.z-=speed;
			while(s.z<1){
				s.z+=1000;
				s.x=(Math.random()-0.5)*s.z;
				s.y=(Math.random()-0.5)*s.z;
			}
		}
		if(this.SUN_ENABLED&&this.currentSun){
			this.currentSun.z-=speed;
			if(this.currentSun.z<40){
				this.currentSun=null;
			}
		}
		if(this.NEBULAE_ENABLED){
			for(var n=0;n<this.nebulae.length;n++){
				var neb=this.nebulae[n];
				neb.z-=speed*0.22;
				if(neb.z<120){
					var angle=(n/this.NEBULA_COUNT)*Math.PI*2*1.5+(Math.random()-0.5);
					var radius=400+Math.random()*600;
					neb.z=2600+Math.random()*2000;
					neb.x=Math.cos(angle)*radius*(0.6+Math.random()*0.5);
					neb.y=Math.sin(angle)*radius*(0.6+Math.random()*0.5);
					neb.scale=0.12+Math.random()*0.18;
					neb.hue=220+Math.random()*50;
					neb.aspect=0.4+Math.random()*0.35;
				}
			}
		}
		if(this.GALAXIES_ENABLED){
			for(var g=0;g<this.galaxies.length;g++){
				var gal=this.galaxies[g];
				gal.z-=speed*0.35;
				if(gal.z<80){
					var idx=this.galaxies.indexOf(gal);
					var angle,radius,depthBand;
					if(idx<this.GALAXY_COUNT){
						angle=(idx/this.GALAXY_COUNT)*Math.PI*2*1.62+(Math.random()-0.5)*0.8;
						radius=350+Math.random()*500;
						depthBand=1800+(idx/this.GALAXY_COUNT)*2200+Math.random()*280;
						gal.x=Math.cos(angle)*radius*(0.7+Math.random()*0.6);
						gal.y=Math.sin(angle)*radius*(0.7+Math.random()*0.6);
						gal.scale=0.22+Math.random()*0.38;
					}else if(idx<this.GALAXY_COUNT+this.outerGalaxyCount){
						var o=idx-this.GALAXY_COUNT;
						angle=(o/this.outerGalaxyCount)*Math.PI*2*2.1+(Math.random()-0.5)*1.2;
						radius=680+Math.random()*520;
						depthBand=2200+Math.random()*1800;
						gal.x=Math.cos(angle)*radius*(0.8+Math.random()*0.5);
						gal.y=Math.sin(angle)*radius*(0.8+Math.random()*0.5);
						gal.scale=0.2+Math.random()*0.35;
					}else{
						var cornerAngles=[Math.PI/4,3*Math.PI/4,5*Math.PI/4,7*Math.PI/4];
						var c=idx-this.GALAXY_COUNT-this.outerGalaxyCount;
						angle=cornerAngles[c%4]+(Math.random()-0.5)*0.6;
						radius=750+Math.random()*450;
						depthBand=2400+Math.random()*1600;
						gal.x=Math.cos(angle)*radius*(0.85+Math.random()*0.4);
						gal.y=Math.sin(angle)*radius*(0.85+Math.random()*0.4);
						gal.scale=0.18+Math.random()*0.32;
					}
					gal.z=depthBand;
					gal.tilt=Math.random()*Math.PI*2;
					gal.type=Math.floor(Math.random()*5);
				}
			}
		}
	},
	destroy:function(targetId){
		if(targetId){
			if(WarpSpeed.RUNNING_INSTANCES[targetId])WarpSpeed.RUNNING_INSTANCES[targetId].destroy();
		}else{
			try{cancelAnimationFrame(this.drawRequest);}catch(e){this.drawRequest=-1;}
			if(this._onPerspectiveMouseDown){
				document.removeEventListener("mousedown",this._onPerspectiveMouseDown);
				document.removeEventListener("mousemove",this._onPerspectiveMouseMove);
				document.removeEventListener("mouseup",this._onPerspectiveMouseUp);
			}
			WarpSpeed.RUNNING_INSTANCES[this.targetId]=undefined;
		}
	},
	pause:function(){
		this.PAUSED=true;
	},
	resume:function(){
		this.PAUSED=false;
	},
	setBoost:function(on){
		if(on){this.TARGET_SPEED=this._normalTargetSpeed*5;if(!this._boostOn){this._boostStartTime=timeStamp();}this._boostOn=true;this._warpExiting=false;}else{this._boostOn=false;this.TARGET_SPEED=this._normalTargetSpeed;}
		}
}

WarpSpeed.destroy=WarpSpeed.prototype.destroy;