
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
const pointsBtn=document.getElementById("Points");

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
let pointsOnStatus=true;



function removePointsFromText(text){
    if (!text) return text;
    return text.split('').filter(letter => !['.','!','?',';',','].includes(letter)).join('');
}

function changePointsBtn(){
    pointsOnStatus = !pointsOnStatus;
    if(pointsOnStatus){
        pointsBtn.classList.remove("pointsOff");
        pointsBtn.textContent = "Points: On";
    }else{
        pointsBtn.classList.add("pointsOff");
        pointsBtn.textContent = "Points: Off";
    }
    
    // Re-render with current text to show/hide points
    const currentText = texts[currentTextIndex] || '';
    setLettersContent(currentText);
    
}

function initializeGame(){

    timeToggle.classList.add("disabled");
    const currentText = texts[currentTextIndex] || '';
    setLettersContent(currentText);
    renderParagraphFromLetters()
    
};


function setLettersContent(sourceText){
    if (!sourceText) {
        letters = [];
        return;
    }
    if(pointsOnStatus){
        letters = sourceText.split('');
    }else{
        letters = removePointsFromText(sourceText).split('');
    }
}


function renderParagraphFromLetters(){
    paragraph.innerHTML = '';
    let wordContainer=document.createElement("div");
    wordContainer.classList.add("wordContainer");
    letters.forEach((letter,index)=>{
        const span=document.createElement("span");
        span.classList.add(`letter`);
        span.classList.add(`letter-${index}`)
        if(letter===" "){
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
}

let intervalId;
let timeRemaining=time;

function startGame(){
    resetGame();
    initializeGame();
    pointsBtn.disabled=true;
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
    GameActive=false;
    setAccuracy();
    wrong_letters=0;
    counter=-1;
    timeToggle.classList.remove("disabled");
    currentTextIndex = (currentTextIndex + 1) % texts.length;
    pointsBtn.disabled=false;
    
    
}

function resetGame(){
    endGame();
    
    textInputed = [];
    timeToggle.classList.remove("disabled");
    timer.textContent=time;
    wpm.textContent='0';
    mistakes.textContent='0';
    accuracy.textContent='100%';
    writing_area.value="";
    paragraph.innerHTML="";
    paragraph.innerText="Press START to begin your test...";
    writing_area.disabled=true;
    start.disabled=false;
    while(timeContainer.children.length>1){
            timeContainer.removeChild(timeContainer.lastElementChild);
        }
}


writing_area.addEventListener("input",inputText);
function inputText(){
    
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
        if (currentChar) {
            currentChar.classList.remove("typedBox");
            currentChar.classList.remove("correctBox","wrongBox");
        }
        let typedChar=writing_area_text.charAt(counter);
        textInputed.push(typedChar);
        
        if(currentChar && typedChar === letters[counter]){
            currentChar.classList.add("correctBox");
            
        }else if (currentChar){
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


function setAccuracy() {

    let accuracyValue = ((counter - wrong_letters) / counter) * 100;
    if(isNaN(accuracyValue) || !isFinite(accuracyValue)) {
        accuracyValue = 100;
    }else{
        accuracyValue = accuracyValue.toFixed(0);
    }
    accuracy.textContent = `${accuracyValue}%`;


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
pointsBtn.addEventListener("click",changePointsBtn);






















    
    
    





































