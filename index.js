
var cvs= document.getElementById("canvas");
var ctx=cvs.getContext("2d");

var startScreen = document.getElementById("startScreen");

var button1=document.createElement("button");
var parentDiv=document.querySelector("#button1");
parentDiv.appendChild(button1);
button1.innerText="Yardım Et";

button1.style.color="#ffffff";
button1.style.width="30%";
button1.style.height="75px";
button1.style.borderRadius="50px";
button1.style.backgroundColor="#1b70cc";
//button1.style.marginLeft="250px";
//button1.style.marginTop="10px";

var corona=new Image();
var kolonya=new Image();
var yarasa=new Image();
var bg=new Image();

corona.src="images_voices/corona3.png";
kolonya.src="images_voices/limon.png";
yarasa.src="images_voices/yarasa2.png";
bg.src="images_voices/wp.jpg";
bg.style.borderRadius="50px";

var gap=50;
//var constant=0;
var klnyY=10;
var gravity=200;
var yrsY=160;

//Corona konum
var cX=425;
var cY=435;

var score = 0;
var endOfGame=0;

//Yarasa toplama sesi
var ses= new Audio();
ses.src="images_voices/ses.mp3";

//Kolonya değme sesi
var die= new Audio();
die.src="images_voices/die.mp3";

var z=300;

//yön tuşlarını kullanma
document.addEventListener("keydown",move);
function move(event) {
    if(cX>=-10 && cX<=822){
    switch(event.keyCode) {
        case 37:
            cX -= 50;
            break;
        case 39:
            cX += 50;
            break;
        case 8:
            break;
    }
   }
   else if(cX<=-10){
       switch(event.keyCode){
           case 39:
               cX+=50;
            case 8:
                break;
       }
   }
   else   {    
   switch(event.keyCode){
    case 37:
    cX-=50;
    case 8:
        break;
}
}
}

//yarasa - kolonya ilk konumları
var nesne=[];
nesne[0]={
    x:-600,
    y:cvs.height
}

//Oyunun ana fonksiyonu
function draw(){

   ctx.drawImage(bg,0,0); //arka plan

    //yukardan inenlerin konumları ve hareketleri
    if(endOfGame!=1){
      
        button1.innerHTML="Tekrar Oyna";
        button1.disabled="true";
    
    for( var i=0;i<nesne.length;i++ ){ 
        ctx.drawImage(kolonya,nesne[i].x,-(nesne[i].y),90,100);
        ctx.drawImage(yarasa,nesne[i].x,-(nesne[i].y+gravity),120,120);
        nesne[i].y=nesne[i].y-3;
        
        // nesne belli bir yüksekliğe geldiğinde diğerinin oluşturulması
        if(nesne[i].y==z){
            nesne.push({
                x:Math.floor(Math.random()*800),
                y:cvs.height  
            }) 
            //zorlaştırma (daha sık nesne olusturmak için)
            if(z<=330){
                z=z+3; 
            }
            else z=180;
       }

        //Corona kolonyaya değdiğinde ölme. Kullanılan objenin boyutlarına göre işlemler yapılmıştır.
        if(-(nesne[i].y)==cY){ //Corona kolonya ile aynı yükseklikte mi kontrolü

            if(cX>= nesne[i].x){  //Kolonya coronanın solunda mı?
                if(50+nesne[i].x>cX){ //Kolonya coronaya değiyor mu?

                    endOfGame=1;
                    corona.src="images_voices/corona2sad.png";
                    die.play();
                }
            }
            else if(nesne[i].x>cX){ //Kolonya coronanın sağında mı?
                if(cX+80>nesne[i].x){ //Kolonya coronaya değiyor mu?

                  endOfGame=1;
                  corona.src="images_voices/corona2sad.png";
                  die.play();
                }
            }
        }

        //Corona yarasaya dokunduğunda
        //Tıpkı kolonyada olduğu gibi kontroller yapılır. Burada kullanılan objenin boyutlarına göre işlemler yapılmıştır.
        if(-(nesne[i].y+gravity)-1==cY){ 
            if(cX>= nesne[i].x){
                if(120+nesne[i].x>cX){
                   
                    score++;
                    ses.play();
                    // Corona yarasaya dokunduğunda yarasayı kaldırma
                    nesne.splice(i,1);
                }
            }
            else if(nesne[i].x>cX){
                if(cX+120>nesne[i].x){
                   
                    score++;
                    ses.play();
                    // Corona yarasaya dokunduğunda yarasayı kaldırma
                    nesne.splice(i,1); 
                }
            }
        }
    }
}
    else{
        //Oyun bittiğinde ekrana gelecekler
        button1.disabled="";
        ctx.fillStyle = "#000";
        ctx.font = "50px cursive";
        ctx.fillText("Oyun Bitti!",cvs.width/2-130,cvs.height/2);
        ctx.fillStyle = "#000";
        ctx.font = "30px cursive";
        ctx.fillText("Yakalanan Yarasa Sayısı : "+score,cvs.width/2-180,cvs.height/2+50);

        button1.onclick=function yenidenOyna(){
            location.reload();
        } 
    }

   ctx.drawImage(corona,cX,cY,120,120);
   ctx.fillStyle = "#000";
   ctx.font = "20px cursive";
   ctx.fillText("  Puan : "+score,10,cvs.height-15);
   requestAnimationFrame(draw);
   
}

function cagir(){
    
    button1.onclick=function animasyon(){
    
    startScreen.style.display="none";
    window.requestAnimationFrame(draw);
    draw();
}
}

cagir();


