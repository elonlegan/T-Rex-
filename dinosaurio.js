document.addEventListener("keydown", function(evento){
  if(evento.keyCode == 32){
    console.log("salta");
    if (nivel.MUERTO == false)
    {
      saltar();
    }
    else
    {
      nivel.VELOCIDAD = 9;
      nube.VELOCIDAD = 2;
      cactus.X = ancho + 100;
      cactus.X = ancho + 100;
      nivel.MARCADOR = 0;
      nivel.MUERTO = false

    }
  }
});



var imgRex, imgNube, imgCactus, imgSuelo;

function cargaImagenes()
{
   imgRex = new Image();
   imgNube = new Image();
   imgCactus = new Image();
   imgSuelo = new Image();

   imgRex.src = "https://i.imgur.com/itnONwb.jpg";
   imgNube.src = "https://i.imgur.com/rEn1udz.png";
   imgCactus.src = "https://i.imgur.com/ylgO8cB.png";
   imgSuelo.src = "https://i.imgur.com/SfQfEWU.png";
}

var ancho = 700;
var alto = 300;

var canvas,ctx;

function inicializa()
{
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  cargaImagenes();
}

function borraCanvas()
{
  canvas.width = ancho;
  canvas.height = alto;
}

var suelo = 200;
var trex  = {Y: suelo, VY: 0, GRAVEDAD: 2, SALTO: 28, SALTANDO: false};
var nivel = {VELOCIDAD: 9, MARCADOR: 0, MUERTO: false};
var cactus = {X: ancho + 100, Y: suelo - 25};
var nube  = {X: 400, Y:100, VELOCIDAD: 2};
var suelog = {X: 0, Y: suelo + 30};

function dibujaRex()
{
  ctx.drawImage(imgRex,0,0,64,69,100,trex.Y,50,50);
}

//---------------------------------------
function dibujaCactus()
{
  ctx.drawImage(imgCactus,0,0,38,75,cactus.X,cactus.Y,38,75);
}

function logicaCactus()
{
  if (cactus.X < -100)
  {
    cactus.X = ancho + 100;
    nivel.MARCADOR++
  }
  else
  {
    cactus.X -= nivel.VELOCIDAD;
  }
}
//----------------------------------------
function dibujaSuelo()
{
  ctx.drawImage(imgSuelo,suelog.X,0,700,30,0,suelog.Y,700,30);
}

function logicaSuelo()
{
  if(suelog.X > 1600)
  {
    suelog.X = 0;
  }
  else
  {
    suelog.X += nivel.VELOCIDAD
  }
}


//---------------------------------------
function dibujaNube()
{
  ctx.drawImage(imgNube,0,0,82,29,nube.X,nube.Y,82,29);
}

function logicaNube()
{
  if (nube.X < -100)
  {
    nube.X = ancho + 100;
  }
  else
  {
    nube.X -= nube.VELOCIDAD;
  }
}
//-------------------------------------------

function saltar()
{
  if (trex.SALTANDO == false)
  {
    trex.VY = trex.SALTO;
  }
  trex.SALTANDO = true;
}


function gravedad()
{
  if(trex.SALTANDO == true)
  {
    if (trex.Y - trex.VY - trex.GRAVEDAD > suelo)
    {
      trex.SALTANDO = false;
      trex.VY = 0;
      trex.Y = suelo;
    }
    else
    {
      trex.VY -= trex.GRAVEDAD;
      trex.Y -= trex.VY;
    }

  }
}

function colision()
{
  if (cactus.X >=100 && cactus.X <=150)
  {
    if (trex.Y >= suelo - 25)
    {
      nivel.MUERTO = true;
      nivel.VELOCIDAD = 0;
      nube.VELOCIDAD = 0;
    }
  }
}

function puntuacion()
{
  ctx.font = "30px impact";
  ctx.fillStyle = "#555555";
  ctx.fillText(nivel.MARCADOR,600,50);

  if (nivel.MUERTO == true)
  {
    ctx.font = "60px impact";
    ctx.fillText("GAME OVER",240,150);
  }
}



//------------------------------------------------------
//BUCLE PRINCIPAL
var fps = 50;
setInterval(principal,1000/fps);

function principal()
{
  borraCanvas();
  gravedad();
  colision();
  logicaCactus();
  logicaNube();
  logicaSuelo();
  dibujaSuelo();
  dibujaNube();
  dibujaCactus();
  dibujaRex();
  puntuacion();
}
