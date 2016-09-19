/* 3 canvasses : 1 for definite answer, one for unconfirmed cut + 1 textarea for comments
N[i][j], D[i][j] array of objects of Number class, i horizontal location of term, j vertical, depending on nb of cuts (j=1 if cut once, at start j=0)
ncut dcut global in fraction, iscut for each Number in N[][] or D[][]
nanswer int of nguess global in Fraction
*/

var xo=100; var yo=250;
var space=50;
var comments=null;

var NNumber=function(n){
	this.iscut=false;
	this.Factors=[];
	nboffactors=0;
	this.n=n;
	this.getFactors=function(){
		for(var i=1;i<(1+Math.sqrt(this.n));i++)
			{if((this.n)%i===0){this.Factors.append(i); this.Factors.append(this.n/i);}}
		this.nboffactors=this.factors.length;
		return this.Factors;
		}
	this.getNb=function(){
		return this.n;}
	this.getcut=function(N){
		return this.iscut;}
	this.isafactor=function(xx){
		for (var j=0; j<this.nboffactors;j++){
			if(xx==this.Factors[j]){return true;}}
		return false;	
		}
	}
 var LongText=function(){
	this.c= document.createElement("canvas");
	this.c.width=window.innerWidth/2;
	this.c.height=Math.min(450,window.innerWidth*3/4);
	this.c.style="position:absolute";
	this.c.style.left=window.innerWidth/2+"px";
	this.c.style.top="0px";
	this.ctx=this.c.getContext('2d');
		
	this.ctx.fillStyle="rgb(255,196,136)"; 
	this.ctx.fillRect(0,0,this.c.width, this.c.height);
	document.getElementById("the_div").appendChild(this.c);
	this.y=30;
	
	this.addLine=function(mytext){
		this.ctx.fillStyle="black";
		this.ctx.font="normal 22px Verdana";
		this.ctx.fillText(mytext,50,this.y);
		this.y+=30;
		if(this.y===this.c.height){
			this.y=30;
			this.ctx.fillStyle="rgb(255,196,136)"; 
			this.ctx.fillRect(0,0,this.c.width, this.c.height);
			}
		}
	}
	

var Fraction=new function(){
		this.ncut=0; this.dcut=0; //double use with lastclickup?
		this.nflicker=0; this.dflicker=0;
		this.nguess=""; this.dguess="";
		this.nanswer=-1;
		this.danswer=-1;
		this.lastflickerup=0;
		this.evaluated=false;
	//this.initialize = function()	{
		this.canvas = document.getElementById('workarea');
		this.canvas.width=Math.floor(window.innerWidth/2);
		this.canvas.height=Math.min(450,window.innerWidth*3/4);
		this.canvas.style.position='absolute';
		this.canvas.style.top="0px";
		this.canvas.style.left="0px";
		
		this.overlay=document.createElement('canvas');
		this.overlay.width=this.canvas.width;
		this.overlay.height=this.canvas.height;
		this.overlay.style.position='absolute';
		this.overlay.style.top="0px";
		this.overlay.style.left="0px";
		this.overlay.style.zIndex="20";
		//this.overlay.addEventListener('mousedown', this.resolveTerm);
		this.overl=null;
		document.getElementById("the_div").appendChild(this.overlay);
	 
		comments = new LongText();
			
		this.W=3; this.max=10;
		this.ctx = this.canvas.getContext && this.canvas.getContext('2d');
		if(!this.ctx) { return alert("Upgrade your browser to see this app"); }
		else{
			this.overl=this.overlay.getContext('2d');
			this.ctx.font="normal 22px Verdana";
			this.ctx.fillStyle="black";
			this.overl.font="normal 22px Verdana";
			this.overl.fillStyle="blue";
					
			//this.nextquestion();
			}
	//}

	this.nextquestion=function(){
		console.log("this"+this);//document.getElementById("the_div").childNodes);	
		this.N=new Array(this.W);
		this.D=new Array(this.W);
		this.nflicker=0; this.dflicker=0;
		this.nguess=""; this.dguess="";
		this.nanswer=-1;
		this.danswer=-1;
		this.lastflickerup=0;
		this.evaluated=true;
		this.ctx.fillStyle="orange";
		this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
		var nresult=1; var dresult=1; 
		this.nguess=""; this.dguess="";
		for(i=0;i<this.W;i++){
			do{cf=Math.floor(Math.random()*this.max);}while(cf<=1)
			do{a=Math.round(Math.random()*this.max);}while(a<=0)
			do{ b=Math.round(Math.random()*this.max);}while((b<=0)||(b==a))
			 this.N[i]=new Array();
			 this.N[i][0]=new NNumber(a*cf);
			 this.D[i]=new Array();
			 this.D[i][0]=new NNumber(b*cf);
			 nresult*=a;
			 dresult*=b;
			 }
		////smallest term = endresult
		var div=this.HCF(nresult,dresult);
		this.endnres=nresult/div;
		this.enddres=dresult/div;
		//console.log(nresult,dresult,div,this.endnres,this.enddres);
		this.render();
		this.ctx.fillStyle="black";
		this.ctx.fillText("click on number to simplify",20,50);
		this.ctx.fillText("then type new simplified number",20,80);
		this.ctx.fillText("and type Enter",20,110);
 
		}
		
		this.HCF= function(firstnb,secondnb){
			var hh=1;
			var aa=firstnb;
			var bb=secondnb;
			if(aa<bb){hh=aa;}
			else{hh=bb;}
			for (var i=hh;i>1;i--){
				if(((aa%i)===0)&&((bb%i)===0)){return i;}
				}
			return 1;
			}
		this.render=function(){
			//var space=60; xo yo
				this.ctx.fillStyle="black";
				this.ctx.font="normal 22px Verdana";
			for ( var i=0;i<(this.W-1);i++){
				this.ctx.fillText(""+this.N[i][0].n+" X",xo+i*space, yo-10);
				this.ctx.fillText(""+this.D[i][0].n+" X",xo+i*space, yo+25);
				}
			this.ctx.fillText(""+this.N[this.W-1][0].n,xo+i*space, yo-10);
			this.ctx.fillText(""+this.D[this.W-1][0].n,xo+i*space, yo+25);
			this.ctx.fillText("=",xo+this.W*space+space/2, yo+2);
			this.ctx.strokeStyle="black";
			this.ctx.beginPath();
			this.ctx.moveTo(xo,yo);
			this.ctx.lineTo(xo+space*this.W,yo);
			this.ctx.stroke();
			}
		this.checkForFullSimplified=function(){
			var numerator=1;
			var denominator=1;
			
			for(var i=0;i<(this.W);i++){
				var j=0;
				while(j<5){
						if((Fraction.N[i][j])&&(Fraction.N[i][j].getcut()==true)){j++;}
						else{numerator*=Fraction.N[i][j].getNb(); break;}///todo if while j<5 needs break;
						
				//console.log("N "+Fraction.N[i][j].getNb()+"at  "+i+","+j);
						}}
			for(var i=0;i<(this.W);i++){
				var j=0;
				while(j<5){
						if((Fraction.D[i][j])&&(Fraction.D[i][j].getcut()==true)){j++;}
						else{denominator*=Fraction.D[i][j].getNb(); break;}
						
				//console.log("at  "+i+","+j+"; D "+(Fraction.D[i][j].getNb()));
				}}
				console.log("PN "+numerator+"="+this.endnres+";  PD "+denominator+" ="+this.enddres);
			if((numerator==this.endnres)&&(denominator==this.enddres)){
				comments.addLine("You have reached simplest terms");
				comments.addLine("Type in Nominator and press Enter");
				Fraction.nflicker=(this.W+1); Fraction.dflicker=(this.W+1);
				Fraction.lastclickup=1;
				Fraction.ncut=1; Fraction.dcut=-1;
				Fraction.ctx.strokeStyle="black";
				Fraction.ctx.beginPath();
				Fraction.ctx.moveTo(xo+this.nflicker*space,yo);
				Fraction.ctx.lineTo(xo+space*(this.nflicker+1),yo);
				Fraction.ctx.stroke();
				}
			else{
					comments.addLine("Go on simplifying");}
			
			}
			
		this.resolveTerm=function(event){
			//if((this.ncut>0)||(this.dcut<0)){
				if(Fraction.evaluated==false){
						Fraction.evaluate();
						//setTimeout(function(){Fraction.resolveTerm(event);},10);
						}//}
				if(Fraction.evaluated==true){
				var nx=event.clientX;
				var ny=event.clientY;
				//console.log(nx,ny,space,Fraction.W);
				Fraction.overl.strokeStyle="red";
				Fraction.overl.lineWidth=2;
				if((nx>xo)&&(nx<xo+Fraction.W*space)){
					if ((ny<yo)&&(ny>yo-200)){///////////in numerator
					//if((lastclickup===1)&&(nanswer!=-1)){ checkForCommonFactor(ndivider,this.D);}
					//else{
					Fraction.nflicker=Math.floor((nx-xo)/space);
					console.log("nflicker "+Fraction.nflicker);
					var c=0; while(c<5){if(Fraction.N[Fraction.nflicker][c].getcut()==true){c++;} else {Fraction.ncut=c+1;break;}}
					//console.log("ncut "+Fraction.ncut);
					Fraction.lastclickup=1;
					//Fraction.ncut=1;
					Fraction.nselect=Fraction.N[Fraction.nflicker][c]; //ncut=1+(yo-ny)/30;
					Fraction.overl.beginPath();
					Fraction.overl.moveTo(xo+Fraction.nflicker*space-4,yo-30*(Fraction.ncut-1)-5);
					Fraction.overl.lineTo(xo+Fraction.nflicker*space+30,yo-30*Fraction.ncut+2);
					Fraction.overl.stroke();
					}
				else if((ny>yo)&&(ny<yo+150)){
					//if((lastclickup===2)&&(danswer!=-1)){ checkForCommonFactor(ddivider,this.N);}
					//else{
					Fraction.dflicker=Math.floor((nx-xo)/space);
					console.log("dflicker "+Fraction.dflicker);
					var c=0; while(c<5){if(Fraction.D[Fraction.dflicker][c].getcut()==true){c++;} else {Fraction.dcut=-c-1;break;}}////asking N[][].iscut returns not a function
					//console.log("dcut"+Fraction.dcut);
					Fraction.lastclickup=2;
					Fraction.dselect=Fraction.D[Fraction.dflicker][c]; //iso c : [-Fraction.dcut-1]?dcut=-1+(yo-ny)/30;
					Fraction.overl.beginPath();
					Fraction.overl.moveTo(xo+Fraction.dflicker*space-4,yo-30*(Fraction.dcut)-2);
					Fraction.overl.lineTo(xo+Fraction.dflicker*space+30,yo-30*(Fraction.dcut+1)+5);
					Fraction.overl.stroke();
				}
		}}}
	this.keyTyped=function(event){
		console.log("keyevent "+event.key+"last"+Fraction.lastclickup);//event.keycode||event.charcode
		
		if(event.key=="Enter"){Fraction.evaluate();}
		else if(Fraction.lastclickup==1){if(!isNaN(event.key)){Fraction.evaluated=false;
							Fraction.nguess=Fraction.nguess+event.key;
							//console.log("nguess"+Fraction.nguess);
							Fraction.overl.fillStyle="blue";
							Fraction.overl.fillText(Fraction.nguess,xo+Fraction.nflicker*space, yo-10-30*Fraction.ncut);
							}}
		else if(Fraction.lastclickup==2){if(!isNaN(event.key)){		
							Fraction.dguess=Fraction.dguess+event.key;
							//console.log("dguess"+Fraction.dguess);
							Fraction.overl.fillStyle="blue";
							Fraction.overl.fillText(Fraction.dguess,xo+Fraction.dflicker*space, yo-5-30*(Fraction.dcut-1));
							
							Fraction.evaluated=false;
							}}
		}
	
		
				
	
	this.keyDowned =function(event){
			console.log("keydownevent "+event.key);//event.keycode||event.charcode
		//if(event.key=="Enter"){	Fraction.evaluate();}
		if(event.key=="Backspace"){
				if (Fraction.lastclickup==1){
							Fraction.nguess="";console.log("ncut"+Fraction.ncut);
							Fraction.overl.clearRect(xo+Fraction.nflicker*space, yo-30*(Fraction.ncut+1),space,30);
							}
				else if(Fraction.lastclickup==2){
							Fraction.dguess="";
							//Fraction.overl.fillStyle="blue";
							Fraction.overl.clearRect(xo+Fraction.dflicker*space, yo-3-30*Fraction.dcut,space,30);
							}	
							
		 return ;
			}
		}
		
	this.evaluate=function(){
				if((this.evaluated==false)&&(this.nflicker<Fraction.W)){
			if((Fraction.lastclickup===1)&&(Fraction.nanswer==-1)){
				
				if(!isNaN(Fraction.nguess)){
					Fraction.nanswer=parseInt(Fraction.nguess);
					console.log("nanswer "+Fraction.nanswer+",nselect "+Fraction.nselect.getNb());
					//if(Fraction.nselect.isafactor(this.nanswer)==true){this.ndivider=this.nselect.getNb()/this.nanswer;
					if((this.nselect.getNb()%this.nanswer)==0){
						this.ndivider=this.nselect.getNb()/this.nanswer;
						comments.addLine("OK, "+Fraction.nselect.getNb()+" / "+Fraction.ndivider+"="+Fraction.nanswer);
						}
					else{
						comments.addLine("No, "+Fraction.nanswer+" is not a factor of "+Fraction.nselect.getNb());
						}
					}
				Fraction.nguess="";
			}
		if((Fraction.lastclickup===2)&&(Fraction.danswer==-1)){
				if(!isNaN(Fraction.dguess)){
					Fraction.danswer=parseInt(Fraction.dguess);
					//	console.log("after parse"+Fraction.danswer);
					//if(Fraction.nselect.isafactor(this.nanswer)==true){this.ndivider=this.nselect.getNb()/this.nanswer;
					if((this.dselect.getNb()%this.danswer)==0){
						this.ddivider=this.dselect.getNb()/this.danswer;
						comments.addLine("OK, "+Fraction.dselect.getNb()+" / "+Fraction.ddivider+"="+Fraction.danswer);
						}
					else{
						comments.addLine("No, "+Fraction.danswer+" is not a factor of "+Fraction.dselect.getNb());
						//Fraction.lastclickup=0; Fraction.danswer=-1;
						}
					}
				Fraction.dguess="";
				}
		if((Fraction.danswer!=-1)&&(Fraction.nanswer!=-1))	{
			if(Fraction.ndivider==Fraction.ddivider){
				Fraction.N[Fraction.nflicker][Fraction.ncut]=new NNumber(Fraction.nanswer);
				Fraction.D[Fraction.dflicker][-Fraction.dcut]=new NNumber(Fraction.danswer);
				Fraction.N[Fraction.nflicker][Fraction.ncut-1].iscut=true;
				Fraction.D[Fraction.dflicker][-Fraction.dcut-1].iscut=true;
				Fraction.overl.clearRect(0,100,Fraction.overlay.width,300);
				Fraction.ctx.fillStyle="black"; this.ctx.strokeStyle="red";
				Fraction.ctx.fillText(""+Fraction.nanswer,xo+Fraction.nflicker*space, yo-10-30*(Fraction.ncut));
					Fraction.ctx.beginPath();
					Fraction.ctx.moveTo(xo+Fraction.nflicker*space-4,yo-30*(Fraction.ncut-1)-5);
					Fraction.ctx.lineTo(xo+Fraction.nflicker*space+30,yo-30*Fraction.ncut+2);
					Fraction.ctx.stroke();
				Fraction.ctx.fillText(""+Fraction.danswer,xo+Fraction.dflicker*space, yo-5-30*(Fraction.dcut-1));
					Fraction.ctx.beginPath();
					Fraction.ctx.moveTo(xo+Fraction.dflicker*space-4,yo-30*(Fraction.dcut)-2);
					Fraction.ctx.lineTo(xo+Fraction.dflicker*space+30,yo-30*(Fraction.dcut+1)+5);
					Fraction.ctx.stroke();
			Fraction.nguess="";Fraction.dguess="";
					Fraction.nanswer=-1; Fraction.danswer=-1;
				comments.addLine("OK, divided up and down by "+Fraction.ddivider);
					Fraction.checkForFullSimplified();
			
				Fraction.ndivider=-1; Fraction.ddivider=-1; Fraction.ncut=0; Fraction.dcut=0; Fraction.lastclickup=1;
				}
				else{
					comments.addLine("Wrong, you divided "+Fraction.nselect.getNb()+" by "+Fraction.ndivider);
					comments.addLine(" and "+Fraction.dselect.getNb()+" by "+Fraction.ddivider);
					Fraction.nguess="";Fraction.dguess="";
					Fraction.nanswer=-1; Fraction.danswer=-1;
					Fraction.ndivider=-1;Fraction.ddivider=-1;
					Fraction.ncut=0; Fraction.dcut=0;
					Fraction.lastclickup=0;
					Fraction.overl.clearRect(0,100,Fraction.overlay.width,300);
					}
				}
				this.evaluated=true;
		
		}
		else if(Fraction.nflicker<(Fraction.W+3)){
			if((Fraction.lastclickup===1)&&(Fraction.nanswer==-1)){
				if(!isNaN(Fraction.nguess)){
					Fraction.nanswer=parseInt(Fraction.nguess);
					console.log("last nanswer "+Fraction.nanswer);
					if (Fraction.nanswer===Fraction.endnres){
							comments.addLine("Correct, now input the denominator");
							Fraction.overl.clearRect(xo+space*Fraction.nflicker,yo-35,100,32);
							Fraction.ctx.fillStyle="black"; 
							Fraction.ctx.fillText(""+Fraction.nanswer,xo+Fraction.nflicker*space, yo-10);
							Fraction.lastclickup=2;
							}
					else if (Fraction.nanswer!=Fraction.endnres){
					
							comments.addLine("Wrong input for numerator");
							Fraction.nguess="";
							Fraction.nanswer=-1;
							Fraction.overl.clearRect(xo+Fraction.nflicker*space,yo-35,100,32);
						}
					}}
			else if((Fraction.lastclickup===2)&&(Fraction.danswer==-1)){
				if(!isNaN(Fraction.dguess)){
					Fraction.danswer=parseInt(Fraction.dguess);
					console.log("danswer "+Fraction.danswer);
					if(Fraction.danswer===Fraction.enddres){
							comments.addLine("Correct");
							Fraction.overl.clearRect(xo+space*Fraction.dflicker,yo+2,100,30);
				Fraction.ctx.fillStyle="black"; 
				Fraction.ctx.fillText(""+Fraction.danswer,xo+Fraction.dflicker*space, yo+30);
				
							}
					else {
							comments.addLine("Wrong input for denominator");
							Fraction.dguess="";
							Fraction.danswer=-1;
							Fraction.overl.clearRect((Fraction.W+2)*space,100,100,yo-99);
						}
				}}
			if((Fraction.danswer===Fraction.enddres)&&(Fraction.nanswer===Fraction.endnres)){
							comments.addLine("Very good, next question...");
							//this.N=new Array(this.W);
							//this.D=new Array(this.W);
							window.setTimeout(function(){Fraction.nextquestion()},200);
							}
		}
		}
	
//this.canvas.addEventListener('mousedown', this.resolveTerm);
//this.canvas.addEventListener('mouseup', this.checkTarget);
				
		
}
window.addEventListener('keydown', Fraction.keyDowned);
window.addEventListener('keypress', Fraction.keyTyped);
window.addEventListener('mousedown', Fraction.resolveTerm);
			
window.addEventListener("load",function(){Fraction.nextquestion()});