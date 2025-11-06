
const texts = JSON.parse(sessionStorage.getItem('texts')) ;

const timer=document.getElementById("timer");
const wpm=document.getElementById("wpm");
const mistakes=document.getElementById("mistakes");
const paragraph=document.getElementById("paragraph");
const writing_area=document.getElementById("writing_area");
const start=document.getElementById("start");
const accuracy=document.getElementById("accuracy");
const reset = document.getElementById("reset");
const back=document.getElementById("back");
const themeToggle = document.getElementById('themeToggle');
const timeToggle=document.getElementById("timeToggle");
const body=document.body;
const timeContainer=document.getElementById("timeContainer");

let letters = [];
let words=[];
let textInputed=[];
let indexs=0;
let counter=0;
let wrong_letters=0;
let currentTextIndex = 0;
let GameActive=false;
let defaultTime=30;
let time=defaultTime;
timer.textContent=time;


function initializeGame(){
    timeToggle.classList.add("disabled");
    currentTextIndex = (currentTextIndex + 1) % texts.length;
    letters=texts[currentTextIndex].split('');
    timer.textContent=time;
    paragraph.innerHTML="";
    
    
    
    let wordContainer=document.createElement("div");
    wordContainer.classList.add("wordContainer");
    letters.forEach((letter,index)=>{
        const span=document.createElement("span");
        span.classList.add(`letter`);
        span.classList.add(`letter-${index}`)
        if(letter===" "){
            // use proper HTML entity with semicolon so span content is correct
            span.innerHTML="&nbsp;";
            wordContainer.appendChild(span);
            paragraph.appendChild(wordContainer);
            wordContainer=document.createElement("div");
        }else{
            span.textContent=letter;
            wordContainer.appendChild(span);

        }
          
    })
    paragraph.appendChild(wordContainer);
    const firstSpan = document.querySelector('span.letter-0');
    if (firstSpan) firstSpan.classList.add("typedBox");
};

let intervalId;
let timeRemaining=time;

function startGame(){
    resetGame();
    initializeGame();
    writing_area.disabled=false;
    writing_area.value="";
    start.disabled=true;
    GameActive=true;

    intervalId =setInterval(timer_running,1000);
    
    
    
}
function timer_running(){
    timer.textContent=String(timeRemaining);
    timeRemaining--;
    if(timeRemaining=== -1 || counter > letters.length - 2){
        endGame();   
    }
};

function endGame(){
    clearInterval(intervalId);
    writing_area.disabled=true;
    start.disabled=false;
    timeRemaining=time;
    accuracy.textContent=String(((counter-wrong_letters)*100/counter).toFixed(0)) + "%" ;
    wrong_letters=0;
    counter=-1;
    timeToggle.classList.remove("disabled");
    
}

function resetGame(){
    clearInterval(intervalId);
    timeRemaining=time;
    wrong_letters=0;
    counter=-1;
    // clear previous typed input so the very first keystroke is handled correctly
    textInputed = [];
    GameActive=false;
    timeToggle.classList.remove("disabled");
    

    timer.textContent=time;
    wpm.textContent='0';
    mistakes.textContent='0';
    accuracy.textContent='100%';
    writing_area.value="";
    writing_area.disabled=true;
    start.disabled=false;

    paragraph.textContent = 'Press START to begin your test...';
    while(timeContainer.children.length>1){
            timeContainer.removeChild(timeContainer.lastElementChild);
        }
}


writing_area.addEventListener("input",inputText);
function inputText(){
    // safely remove typedBox from the first span if it exists
    const firstSpanRemove = document.querySelector('span.letter-0');
    if (firstSpanRemove) firstSpanRemove.classList.remove("typedBox");
    let writing_area_text=writing_area.value;
    

    if(textInputed.length > writing_area_text.length){
        
        let span = document.querySelector(`span.letter-${counter+1}`);
        if (span) {
            span.classList.remove("typedBox");
            span.classList.remove("correctBox","wrongBox");
        }
        counter=writing_area_text.length-1;
        textInputed=writing_area_text.split('');
        
        
        
    }else if(textInputed.length <= writing_area_text.length){
        
        counter++;

        let currentChar=document.querySelector(`span.letter-${counter}`);
        currentChar.classList.remove("typedBox");
        let typedChar=writing_area_text.charAt(counter);
        textInputed.push(typedChar);
        
        if(typedChar === letters[counter]){
            /*currentChar.style.backgroundColor="green";
            currentChar.style.color="white";*/
            currentChar.classList.add("correctBox")
            
        }else{
            /*currentChar.style.backgroundColor="red";*/
            currentChar.classList.add("wrongBox");
            wrong_letters++;
            mistakes.textContent=wrong_letters;
        }
        calculateWPM();   
        
    }
    
    
    const nextSpan = document.querySelector(`span.letter-${counter+1}`);
    if (nextSpan) nextSpan.classList.add("typedBox");

}


function calculateWPM() {
    
    let timeElapsed = (time - Number(timer.textContent)) / 60;
    if (timeElapsed <= 0) {
        wpm.textContent = 0;
        return;
    }
    let correctChars = counter - wrong_letters;
    let wordsTyped = correctChars / 5;
    let calculatedWPM = Math.round(wordsTyped / timeElapsed);
    wpm.textContent = Math.max(0, calculatedWPM);
}

function backToMain(){
    window.location.href="SelectTextPage.html";
}

const currentTheme = localStorage.getItem('theme') || 'light-theme';
body.className = currentTheme;
function changeTheme(){
    if (body.classList.contains('light-theme')) {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark-theme');
    } else {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        localStorage.setItem('theme', 'light-theme');
        }
    }

let timeTable=[30,60,120];
/*function changeTime(){

    timeTable.forEach((clock)=>{
        const newTime=document.createElement("div");
        newTime.textContent=clock;
        time=clock;
        timeToggle.appendChild(newTime);
        })
}*/

let isTimeToggleOpen=false;
timeToggle.addEventListener("click",()=>{
    if(isTimeToggleOpen ===false){
    timeTable.forEach((clock)=>{
        const newTime=document.createElement("a");
        newTime.textContent=clock;
        newTime.addEventListener("click",()=>{
            time=clock;
            timer.textContent=clock;
        });
        timeContainer.appendChild(newTime);
        isTimeToggleOpen=true
        });
    }else{
        while(timeContainer.children.length>1){
            timeContainer.removeChild(timeContainer.lastElementChild);
        }
        isTimeToggleOpen=false;
    }
});


start.addEventListener('click',startGame);
reset.addEventListener("click",resetGame);
back.addEventListener("click",backToMain);
themeToggle.addEventListener('click',changeTheme);




















    
    
    





































