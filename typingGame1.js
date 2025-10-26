
const texts = [
            "The blue cat danced under the rain while humming a forgotten tune.",
            "Golden sunlight filtered through ancient trees as birds sang their morning songs.",
            "Mountains stood tall against the horizon painting shadows across the valley floor.",
            "Waves crashed against the shore creating rhythms that echoed through time."
        ];

let letters = [];
let textInputed=[];
let indexs=0;
let counter=0;
let wrong_letters=0;
let currentTextIndex = 0;
let GameActive=false;

const timer=document.getElementById("timer");
const wpm=document.getElementById("wpm");
const mistakes=document.getElementById("mistakes");
const paragraph=document.getElementById("paragraph");
const writing_area=document.getElementById("writing_area");
const start=document.getElementById("start");
const accuracy=document.getElementById("accuracy");
const reset = document.getElementById("reset");


function initializeGame(){
    currentTextIndex = (currentTextIndex + 1) % texts.length;
    letters=texts[currentTextIndex].split('')
    timer.textContent=15;
    paragraph.innerHTML="";
    
    

    letters.forEach((letter,index)=>{
        const span=document.createElement("span");
        if(letter===" "){
            span.innerHTML="&nbsp";
        }else{
            span.textContent=letter;
        }
        span.classList.add(`letter`);
        span.classList.add(`letter-${index}`)
        paragraph.appendChild(span);
    })
    document.querySelector(`span.letter-${0}`).classList.add("typedBox");
};

let intervalId;
let timeRemaining=15;

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
    timer.textContent=timeRemaining;
    timeRemaining--;
    if(timeRemaining=== -1 || counter > letters.length - 1){
        endGame();   
    }
};

function endGame(){
    clearInterval(intervalId);
    writing_area.disabled=true;
    start.disabled=false;
    timeRemaining=15;
    accuracy.textContent=String(((counter-wrong_letters)*100/counter).toFixed(0)) + "%" ;
    wrong_letters=0;
    counter=-1;
}

function resetGame(){
    clearInterval(intervalId);
    timeRemaining=15;
    wrong_letters=0;
    counter=-1;
    GameActive=false;

    timer.textContent='15';
    wpm.textContent='0';
    mistakes.textContent='0';
    accuracy.textContent='100%';
    writing_area.value="";
    writing_area.disabled=true;
    start.disabled=false;

    paragraph.textContent = 'Press START to begin your test...';
}


writing_area.addEventListener("input",inputText);
function inputText(){
    let writing_area_text=writing_area.value;
    
    if(textInputed.length > writing_area_text.length){
        
        let span = document.querySelector(`span.letter-${counter+1}`);
        span.classList.remove("typedBox");
        span.style.backgroundColor="";
        span.style.color="";
        counter=writing_area_text.length-1;
        textInputed=writing_area_text.split('');
        
        
        
    }else if(textInputed.length <= writing_area_text.length){
        
        counter++;

        let currentChar=document.querySelector(`span.letter-${counter}`);
        currentChar.classList.remove("typedBox");
        let typedChar=writing_area_text.charAt(counter);
        textInputed.push(typedChar);
        
        
        if(typedChar === letters[counter]){
            currentChar.style.backgroundColor="green";
            currentChar.style.color="white";
            
        }else{
            currentChar.style.backgroundColor="red";
            wrong_letters++;
            mistakes.textContent=wrong_letters;
        }
        calculateWPM();   
        
    }
    
    
    document.querySelector(`span.letter-${counter+1}`).classList.add("typedBox");

}

function calculateWPM(){
    let timeElapsed = 15-Number(timer.textContent); // e.g., seconds elapsed
    if (timeElapsed > 0) {
        wpm.textContent = ((counter*5)/timeElapsed).toFixed(0);
    } else {
        wpm.textContent = 0;
    }
}



start.addEventListener('click',startGame);
reset.addEventListener("click",resetGame);



























    
    
    





































