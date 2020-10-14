var Comment=function(mytext,coord,nbcols){
	this.input= document.createElement("TEXTAREA");
	this.input.cols=nbcols||40;
	this.input.rows=5;
	this.input.value=mytext;
	this.input.style="position:absolute";
	this.input.style.top=coord[1]+"px";
	this.input.style.left=coord[0]+"px";
	
	this.input.style.font="normal 22px Verdana";
	
	document.getElementById("the_div").appendChild(this.input);

	this.setBackground=function(bgground){
		this.input.style.background=bgground;
		}
	
	this.refreshtext=function(mytext,nbrows){
		this.input.value=mytext;
		this.input.rows=nbrows;
		}
	
	this.movetextbox=function(x,y){
		this.input.style.left=x;
		this.input.style.top=y;
		}
	} 