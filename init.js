var tailleLigneEcriture=50;//espacement de la grille
var eche=tailleLigneEcriture*document.forms["form1"].zoom.value;
var  dx=parseInt(document.forms["form1"].TransX.value*eche);
var  dy=parseInt(document.forms["form1"].TransY.value*eche);


function modifEchelle(){
  document.forms["form1"].valZoom.value=document.forms["form1"].zoom.value;
  document.forms["form1"].ValTransX.value=document.forms["form1"].TransX.value;
  document.forms["form1"].ValTransY.value=document.forms["form1"].TransY.value;
 // let canvas = document.getElementById('c1');
//	let ctx = canvas.getContext('2d');
  var Cvas = document.getElementById("canvas1");
  var ctx = Cvas.getContext("2d");
	ctx.clearRect(0, 0, Cvas.width, Cvas.height);
  repere();
  aff();
}

function raz(){
   document.forms["form1"].zoom.value=1;
   document.forms["form1"].TransX.value=0;
   document.forms["form1"].TransY.value=0;
   document.forms["form1"].valZoom.value=1;
   document.forms["form1"].ValTransX.value=0;
   document.forms["form1"].ValTransY.value=0;
   repere();
   //aff();
}


 function razZoom(){
  document.forms["form1"].zoom.value=document.forms["form1"].valZoom.value;
  modifEchelle();
  //repere();
 }
 
 function razTx(){
  document.forms["form1"].TransX.value=document.forms["form1"].ValTransX.value;
  modifEchelle();
  //repere();
 }
 
 function razTy(){
  document.forms["form1"].TransY.value=document.forms["form1"].ValTransY.value;
  modifEchelle();
  //repere();
 }



function repere(){
  eche=tailleLigneEcriture*document.forms["form1"].zoom.value;
  dx=parseInt(document.forms["form1"].TransX.value*eche);
  dy=parseInt(document.forms["form1"].TransY.value*eche);
  var coulAxe,coulGrille,tailleAxe,tailleGrille;
  if(document.forms["form1"].repereNon.checked){
     coulAxe='white';
     coulGrille='white';
     tailleAxe=5;
     tailleGrille=5;
    }
    else{
     coulAxe='red';
     coulGrille='#FFAAAA';
     tailleAxe=3;
     tailleGrille=2;
    }
	var Cvas = document.getElementById("canvas1");
	var ctx = Cvas.getContext("2d");
	ctx.beginPath();//axe
  ctx.strokeStyle = coulAxe;
	ctx.moveTo(dx+document.getElementById("canvas1").clientWidth/2, 0);
	ctx.lineTo(dx+document.getElementById("canvas1").clientWidth/2, document.getElementById("canvas1").clientHeight);
	ctx.moveTo(0, -dy+document.getElementById("canvas1").clientHeight/2);
	ctx.lineTo(document.getElementById("canvas1").clientWidth, -dy+document.getElementById("canvas1").clientHeight/2);
  ctx.lineWidth=tailleAxe;   
	ctx.stroke();
	ctx.closePath();// fin axe
  ctx.beginPath();// grille
	ctx.strokeStyle = coulGrille;
  for(var i=1;i<document.getElementById("canvas1").clientWidth/10;i++){
    ctx.moveTo(dx+document.getElementById("canvas1").clientWidth/2-i*eche, 0);
    ctx.lineTo(dx+document.getElementById("canvas1").clientWidth/2-i*eche, document.getElementById("canvas1").clientHeight);
    ctx.moveTo(dx+document.getElementById("canvas1").clientWidth/2+i*eche, 0);
    ctx.lineTo(dx+document.getElementById("canvas1").clientWidth/2+i*eche, document.getElementById("canvas1").clientHeight);
  }
  for(var i=1;i<document.getElementById("canvas1").clientHeight/10;i++){
    ctx.moveTo(0,-dy+document.getElementById("canvas1").clientHeight/2-i*eche);
    ctx.lineTo(document.getElementById("canvas1").clientWidth, -dy+document.getElementById("canvas1").clientHeight/2-i*eche);
    ctx.moveTo(0,-dy+document.getElementById("canvas1").clientHeight/2+i*eche);
    ctx.lineTo(document.getElementById("canvas1").clientWidth, -dy+document.getElementById("canvas1").clientHeight/2+i*eche);
  }
  ctx.lineWidth=tailleGrille; 
  ctx.stroke();
  ctx.closePath();//fin repere
  aff();
}

function effaceCanvas(){
   var Cvas = document.getElementById("canvas1");
   var ctx = Cvas.getContext("2d");
   ctx.clearRect(0, 0, Cvas.width, Cvas.height);
   repere();
}//fin function effaceCanvas()


function abs(x0){
 return (dx+document.getElementById("canvas1").clientWidth/2+x0*eche);
} // fin fonction abs

function ord(y0){
 return (-dy+document.getElementById("canvas1").clientHeight/2-y0*eche);
} // fin fonction ord
 
function traceSegment(x0,y0,x1,y1,Coul,epaiDte){
   var Cvas = document.getElementById("canvas1");
   var ctx = Cvas.getContext("2d");
   var xD=abs(x0);
   var yD=ord(y0);
   var xF=abs(x1);
   var yF=ord(y1);
   ctx.beginPath();
     ctx.lineWidth=epaiDte*eche;
     ctx.strokeStyle = Coul;
     ctx.moveTo(xD,yD);
     ctx.lineTo(xF,yF);
     ctx.stroke();
   ctx.closePath();
} // fin fonction traceSegment

function tracePt(x0,y0,Coul,dimPt){
   var Cvas = document.getElementById("canvas1");
   var ctx = Cvas.getContext("2d");
   var dimPttmp=dimPt*eche;
   var xorigine=dx+document.getElementById("canvas1").clientWidth/2;
   var yorigine=-dy+document.getElementById("canvas1").clientHeight/2;
   ctx.beginPath();
   ctx.fillStyle=Coul;
   ctx.fillRect(abs(x0)-dimPttmp/2,ord(y0)-dimPttmp/2,dimPttmp,dimPttmp);
   ctx.stroke();
   ctx.closePath();
 }//fin tracePt
 
// E C R I R E    L E    C O D E   P L U S      B A S, 
// A P R E S    L A    L I G N E      146
 
function aff(){
var mes="x0=0 et y0=0 dans le repère rouge conduit à \n(";
mes+=abs(0)+" ; "+ord(0)+" dans le repère du canevas de dimension 900 par 500\n\n";
mes+="x0=1 et y0=0 dans le repère rouge conduit à \n(";
mes+=abs(1)+" ; "+ord(0)+" dans le repère du canevas de dimension 900 par 500\n\n";
mes+="x0=0 et y0=1 dans le repère rouge conduit à \n(";
mes+=abs(0)+" ; "+ord(1)+" dans le repère du canevas de dimension 900 par 500";
alert(mes);
  }//fin fonction aff
  