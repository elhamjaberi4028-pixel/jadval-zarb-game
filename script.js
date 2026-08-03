let playerName = "";
let score = 0;
let currentQuestion = 0;
let questions = [];
let goldMedals = 0;
let hasCertificate = false;
let musicOn = true;
let effectsOn = true;
let fullScores = 0;

let animals = [
"lion.png",
"tiger.png",
"elephant.png",
"giraffe.png",
"panda.png",
"monkey.png",
"zebra.png",
"rhino.png",
"hippo.png",
"kangaroo.png",
"fox.png",
"wolf.png",
"deer.png",
"bear.png",
"koala.png",
"penguin.png",
"crocodil.png",
"turtle.png",
"parrot.png",
"owl.png"
];

const applauseSound = new Audio("sounds/applause.mp3");
const wrongSound = new Audio("sounds/wrong.mp3");
const winSound = new Audio("sounds/win.mp3");

const backgroundMusic = new Audio();
backgroundMusic.src = "sounds/background.mp3";
backgroundMusic.loop = true;
backgroundMusic.volume = 0.15;

applauseSound.volume = 0.3;
wrongSound.volume = 0.3;
winSound.volume = 0.3;


function showMessage(text,type){

let msg=document.createElement("div");


msg.className="message "+type;


msg.innerHTML=text;

document.body.appendChild(msg);

setTimeout(function(){

msg.style.opacity="0";

setTimeout(function(){

msg.remove();

},300);

},1200);
}
function playSound(type){

let audio=new AudioContext();

let osc=audio.createOscillator();

let gain=audio.createGain();

osc.connect(gain);

gain.connect(audio.destination);

if(type=="correct"){

osc.frequency.value=450;

}else{

osc.frequency.value=250;

}

osc.type="sine";

gain.gain.value=0.1;

osc.start();

osc.stop(audio.currentTime+0.2);

}
function celebration(){

    for(let i=0;i<120;i++){

        let star=document.createElement("div");

        star.innerHTML=Math.random()>0.5 ? "🎊" : "⭐";

        star.style.position="fixed";
        star.style.left=Math.random()*100+"vw";
        star.style.top="-30px";
        star.style.fontSize=(20+Math.random()*25)+"px";
        star.style.pointerEvents="none";
        star.style.zIndex="9999";

        let duration=3000+Math.random()*2000;

        star.animate(
            [
                {
                    transform:"translateY(0) rotate(0deg)",
                    opacity:1
                },
                {
                    transform:`translateY(${window.innerHeight+100}px) rotate(${720+Math.random()*720}deg)`,
                    opacity:0
                }
            ],
            {
                duration:duration,
                easing:"linear"
            }
        );

        document.body.appendChild(star);

        setTimeout(function(){
            star.remove();
        },duration);

    }

}
function startGame(){

playerName=document.getElementById("playerName").value;

if(playerName==""){alert("نام را وارد کنید");return;}

let savedGold = localStorage.getItem(playerName + "_gold");

console.log("مقدار ذخیره شده طلا:", savedGold);

goldMedals = Number(savedGold) || 0;

hasCertificate = localStorage.getItem(playerName + "_certificate") === "yes";
fullScores = Number(localStorage.getItem(playerName + "_full20")) || 0;
score=0;
currentQuestion=0;

createQuestions();

backgroundMusic.currentTime = 0;
backgroundMusic.play().catch(function(error){
    console.log("پخش موزیک متوقف شد:", error);
});

showQuestion();

}
function createQuestions(){

    questions = [];

    let allQuestions = [];

    for(let a = 2; a <= 9; a++){

        for(let b = a; b <= 9; b++){

            allQuestions.push({
                a: a,
                b: b,
                answer: a * b
            });

        }

    }

    allQuestions.sort(() => Math.random() - 0.5);

    questions = allQuestions.slice(0,20);

}

function showQuestion(){

if(currentQuestion>=20){

let message="🌸 تلاش خوبی کردی.";
let medal="";

if(score>=17){

medal="images/gold-medal.png";

goldMedals = Number(localStorage.getItem(playerName + "_gold")) || 0;

goldMedals++;

localStorage.setItem(playerName + "_gold", goldMedals);


if(goldMedals == 1){

message="🥇 تبریک! مدال طلای قهرمانی را گرفتی.<br>چهار مدال دیگر تا دریافت لوح تقدیر باقی مانده است.";

}
else if(goldMedals == 2){

message="🥇 عالی! دومین مدال طلای قهرمانی را گرفتی.<br>سه مدال دیگر تا دریافت لوح تقدیر باقی مانده است.";

}
else if(goldMedals == 3){

message="🥇 عالی! سومین مدال طلای قهرمانی را گرفتی.<br>دو مدال دیگر تا دریافت لوح تقدیر باقی مانده است.";

}
else if(goldMedals == 4){

message="🥇 فوق‌العاده! چهارمین مدال طلای قهرمانی را گرفتی.<br>یک مدال دیگر تا دریافت لوح تقدیر باقی مانده است.";

}
else if(goldMedals >= 5){

hasCertificate=true;

localStorage.setItem(playerName + "_certificate","yes");

localStorage.setItem("certificate_name", playerName);

message="🏆 فوق‌العاده! پنج مدال طلای قهرمانی گرفتی و لوح تقدیر دریافت کردی.";

}


}
else if(score>=14){

medal="images/silver-medal.png";

message="🥈 آفرین! مدال نقره را گرفتی.";

}
else if(score>=11){

medal="images/bronze-medal.png";

message="🥉 خوب بود! مدال برنز را گرفتی.";

}


document.getElementById("app").innerHTML=`

<div class="result" style="
    width:100%;
    height:100vh;
    box-sizing:border-box;
    overflow:hidden;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:flex-start;
    padding:12px 10px 8px;
">


<h1 style="
    color:#ff9800;
    font-size:32px;
    margin:0 0 5px;
">
🎉 پایان بازی 🎉
</h1>


<h2 style="
    font-size:25px;
    margin:3px 0;
">
👦 ${playerName}
</h2>


<h2 style="
    font-size:27px;
    color:#4CAF50;
    margin:3px 0 8px;
">
⭐ امتیاز ${score} از 20
</h2>


${medal ? `
<img
    src="${medal}"
    class="result-medal"
    style="
        width:auto;
        height:auto;
        max-width:130px;
        max-height:130px;
        object-fit:contain;
        margin:2px 0 8px;
    "
>
` : ""}


<p style="
    font-size:21px;
    line-height:1.7;
    margin:3px 10px 8px;
    text-align:center;
    max-width:500px;
">
${message}
</p>


<div class="end-zoo" style="
    width:100%;
    max-width:470px;
    display:grid;
    grid-template-columns:repeat(7,1fr);
    gap:5px;
    justify-items:center;
    align-items:center;
    margin:3px auto 8px;
">


${animals.map(animal=>`
<img
    src="images/${animal}"
    class="end-animal"
    style="
        width:100%;
        max-width:58px;
        height:auto;
        max-height:58px;
        object-fit:contain;
    "
>
`).join("")}


</div>


${hasCertificate ? `

<button onclick="saveCertificate()" style="
    width:min(90%,420px);
    min-height:42px;
    padding:7px 15px;
    margin:3px 0;
    font-size:17px;
    font-weight:bold;
    border:none;
    border-radius:12px;
">
🏆 ذخیره لوح تقدیر
</button>

` : ""}


<button onclick="location.reload()" style="
    width:min(90%,420px);
    min-height:45px;
    padding:7px 15px;
    margin:3px 0;
    font-size:18px;
    font-weight:bold;
    border:none;
    border-radius:12px;
">
🔄 بازی دوباره
</button>


</div>

`;


if(effectsOn){

winSound.currentTime = 0;
winSound.play();

}

celebration();

return;

}



let q=questions[currentQuestion];

let options=[q.answer];


while(options.length<4){

let n=q.answer+Math.floor(Math.random()*10)-5;

if(n>0 && !options.includes(n)){
options.push(n);
}

}


options.sort(()=>Math.random()-0.5);


let zoo="";


for(let i=0;i<20;i++){

if(i<score){

zoo+=`
<div class="animal open">
<img src="images/${animals[i]}" class="animal-img">
</div>
`;

}else{

zoo+=`
<div class="animal lock">
🔒
</div>
`;

}

}



document.getElementById("app").innerHTML=`

<div class="game">


<div class="top">

<div>👦 ${playerName}</div>

<div>⭐ ${score} / 20</div>

<div>📖 ${currentQuestion+1} / 20</div>

<button id="musicBtn" onclick="toggleMusic()">
${musicOn ? "🎵" : "<span style='text-decoration:line-through'>🎵</span>"}
</button>

<button id="effectsBtn" onclick="toggleEffects()">
${effectsOn ? "🔊" : "<span style='text-decoration:line-through'>🔊</span>"}
</button>
</div>

<div class="progress">

<div class="progress-bar" style="width:${(currentQuestion/20)*100}%">

${Math.floor((currentQuestion/20)*100)}%

</div>

</div>



<div class="zoo">

${zoo}

</div>



<div class="question">

<span style="direction:ltr; unicode-bidi:isolate;">? = </span>
<span>${q.a.toLocaleString("fa-IR")} × ${q.b.toLocaleString("fa-IR")}</span>

</div>



<div class="answers">

${options.map(x=>`

<button onclick="checkAnswer(${x})">

${x}

</button>

`).join("")}

</div>


</div>

`;

}
function checkAnswer(answer){

let buttons=document.querySelectorAll(".answers button");

buttons.forEach(btn=>{
btn.disabled=true;

if(Number(btn.innerText)==questions[currentQuestion].answer){
btn.style.background="#4CAF50";
}

});

let clicked=[...buttons].find(b=>Number(b.innerText)==answer);

if(answer==questions[currentQuestion].answer){

score++;

let words=[
"آفرین! 🌟",
"عالی! 🎉",
"درست بود! 👏",
"آی‌کیو بالا! 🧠",
"قهرمان! 🏆"
];

showMessage(words[Math.floor(Math.random()*words.length)],"correct");

clicked.style.background="#4CAF50";

if(effectsOn){

applauseSound.currentTime = 0;
applauseSound.play();

}

}else{

clicked.style.background="#F44336";

showMessage("اشتباه بود! دوباره تلاش کن ❌","wrong");

if(effectsOn){

wrongSound.currentTime = 0;
wrongSound.play();

}

}

setTimeout(function(){

currentQuestion++;

showQuestion();

},800);

}

function saveCertificate(){

window.open("certificate.html","_blank");

}
function toggleMusic(){

    musicOn = !musicOn;

    const musicBtn = document.getElementById("musicBtn");

    if(musicOn){

        backgroundMusic.play().catch(function(error){
            console.log("پخش موسیقی انجام نشد:", error);
        });

        if(musicBtn){
            musicBtn.innerHTML = "🎵";
        }

    }else{

        backgroundMusic.pause();

        if(musicBtn){
            musicBtn.innerHTML = "<span style='text-decoration:line-through'>🎵</span>";
        }

    }

}


function toggleEffects(){

    effectsOn = !effectsOn;

    const effectsBtn = document.getElementById("effectsBtn");

    if(effectsBtn){

        if(effectsOn){

            effectsBtn.innerHTML = "🔊";

        }else{

            effectsBtn.innerHTML = "<span style='text-decoration:line-through'>🔊</span>";

        }

    }

}
