const texts = [] ;
const personalTextBtn=document.getElementById("personalTextBtn");
    const randomtextBtn=document.getElementById("randomTextBtn");
    const customTimer=document.getElementById("customTimer");
    const input_area=document.getElementById("input_area");
    const inputControls=document.getElementById("inputControls");
const selectTextBtn=document.getElementById("selectTextBtn");
const selectTextArea=document.getElementById("selectTextArea");
const personalTextArea=document.getElementById("personalTextArea");
    function getPersonalText(){
        selectTables.innerHTML="";
        selectTextBtn.disabled=false;
        personalTextBtn.disabled=true;
        const personalTextInput=document.createElement("textarea");
        const submitPersonalTextBtn=document.createElement("button");
        const addNewTextBtn=document.createElement("button");
        
        personalTextInput.classList.add("input_area");
        submitPersonalTextBtn.textContent="submit";
        addNewTextBtn.textContent="add text";



        submitPersonalTextBtn.addEventListener("click",()=>{
            let personalText=personalTextInput.value;
            texts.push(personalText);

            sessionStorage.setItem('texts', JSON.stringify(texts));

            window.location.href="typingGame1.html";
        });
        addNewTextBtn.addEventListener("click",()=>{
            let personalText=personalTextInput.value;
            texts.push(personalText);

            sessionStorage.setItem('texts', JSON.stringify(texts));

            personalTextInput.value="";
            
        });
        input_area.appendChild(personalTextInput);
        inputControls.appendChild(submitPersonalTextBtn);
        inputControls.appendChild(addNewTextBtn);
    };


    const myLibrary = [
    "This is the first sentence of paragraph one. Here is the second sentence. Finally, this is the third sentence.",
    "Paragraph two starts here with its first sentence. The second sentence follows shortly after. It ends with the third sentence.",
    "In paragraph three, the opening sentence sets the context. The middle sentence provides more details. The final sentence concludes the thought.",
    "Fourth paragraph begins with an introductory sentence. Then comes the elaboration sentence. It finishes with a concluding sentence.",
    "The fifth paragraph's first sentence captures attention. The next sentence expands on the topic. The last sentence wraps up the ideas presented.",
    "Finally, paragraph six introduces the ending concept. The penultimate sentence reinforces the message. The last sentence provides closure."
];


    function selectTable(){
        personalTextBtn.disabled=false;
        selectTextBtn.disabled=true;
        input_area.innerHTML="";
        inputControls.innerHTML="";
        const selectTables=document.getElementById("selectTables");
        
        myLibrary.forEach(table=>{
            const tables=document.createElement("button");
            tables.textContent=table;
            tables.className="tables";
            selectTables.appendChild(tables);
            tables.addEventListener("click",()=>{
                texts.push(table);
                sessionStorage.setItem('texts', JSON.stringify(texts));
                window.location.href="typingGame1.html";
            });
        });
        
    };

    function randomText(){
        myLibrary.forEach(text=>{
            texts.push(text);
            sessionStorage.setItem('texts', JSON.stringify(texts));
        })
        window.location.href="typingGame1.html";
    };

    

    personalTextBtn.addEventListener("click",getPersonalText);
    selectTextBtn.addEventListener("click",selectTable);
    randomtextBtn.addEventListener("click",randomText);
