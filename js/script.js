let area = document.getElementById('draw-canva');
let pincel = area.getContext('2d');
let pattern = /^[A-Za-z]+$/;
let wordsGame = ["teste"];
let correctLetters = [];
let wrongLetters = [];
let pickedWord = "";
const EIGHT = 8;
const SIX = 6;
let i = 0;

function clearCanva() {
    pincel.clearRect(0, 0, area.width, area.height);
}

function hiddenPlayButton() {
    document
        .getElementById("play-btn")
        .style.display = "none";
}

function hiddenNewWordButton() {
    document
        .getElementById("newword-btn")
        .style.display = "none";
}

function showPlayButton() {
    document
        .getElementById("play-btn")
        .style.display = "block";
}

function showNewWordButton() {
    document
        .getElementById("newword-btn")
        .style.display = "block";
}

function showContainerFork() {
    document
        .getElementById("container-fork")
        .style.display = "block";
}

function showWonMessage() {
    document
        .getElementById("won-message")
        .style.display = "block";
}

function showWordMessage() {
    document
        .getElementById("word-message")
        .innerText = `A palavra é ${pickedWord.join('').toUpperCase()}`;
}

function hiddenWordMessage() {
    document
        .getElementById("word-message")
        .innerText = "";
}


function showFailMessage() {
    document
        .getElementById("fail-message")
        .style.display = "block";
}

function hiddenWonMessage() {
    document
        .getElementById("won-message")
        .style.display = "none";
}

function hiddenFailMessage() {
    document
        .getElementById("fail-message")
        .style.display = "none";
}

function randomWord() {
    return wordsGame[Math.floor(Math.random() * wordsGame.length)];
}

function showTotalCorrectUnderline(totalUnderline) {
    for(i=0;i<EIGHT;i++) {
        document
            .getElementById("C"+i)
            .innerHTML = "";
    }

    for(i=0;i<totalUnderline;i++) {
        document
            .getElementById("C"+i)
            .innerHTML = "_";
    }
}

function showTotalWrongUnderline() {
    for(i=0;i<SIX;i++) {
        document
            .getElementById("W"+i)
            .innerHTML = "";
        document
            .getElementById("W"+i)
            .innerHTML = "_";
    }
}

function draw(number) {
    
    switch(number) {
        case 1:
            pincel.fillStyle = 'blue';
            pincel.beginPath();
            pincel.arc(300, 50, 50, 0, 2 * 3.14);
            pincel.fill();
            break;
        case 2:
            pincel.fillStyle = 'lightgrey';
            pincel.fillRect(290, 100, 20, 150);
            break;
        case 3:
            pincel.fillStyle = 'purple';            
            pincel.fillRect(200, 110, 100, 10);
            break;
        case 4:
            pincel.fillStyle = 'red';
            pincel.fillRect(300, 110, 100, 10);
            break;
        case 5:
            pincel.fillStyle = 'green';
            pincel.fillRect(200, 250, 100, 10);
            break;
        case 6:
            pincel.fillStyle = 'yellow';
            pincel.fillRect(300, 250, 100, 10);
            break;
        default:
            "Sorry, the number not found."
    }
}

function cleanVariables() {    
    document.getElementById('input-letter').value = "";
    document.getElementById('input-newword').value = "";
    correctLetters = [];
    wrongLetters = [];
    pickedWord = "";
}

function playGame() {
    hiddenAddMessage();
    hiddenWordMessage();
    cleanVariables();
    hiddenWonMessage();
    hiddenFailMessage();
    showContainerFork();
    clearCanva();
    unblockInputLetter();
    pickedWord = randomWord();
    console.log(pickedWord);
    showTotalCorrectUnderline(pickedWord.length);
    showTotalWrongUnderline();
    pickedWord = pickedWord.split("");
}

function blockInputLetter() {
    document
        .getElementById("input-letter")
        .disabled = true;
}

function unblockInputLetter() {
    document
        .getElementById("input-letter")
        .disabled = false;
}

function showAddMessage() {
    document
        .getElementById("add-message")
        .style.display = "block";
}

function hiddenAddMessage() {
    document
        .getElementById("add-message")
        .style.display = "none";
}

function mainLogic(letter) {
    
    if(pickedWord.includes(letter)) {
        if(!correctLetters.includes(letter)) {
            pickedWord.forEach((eachLetter, index) => {
                if(eachLetter === letter) {
                    correctLetters.push(letter);
                    if(document.getElementById("C"+index).innerText === "_") {
                        document
                            .getElementById("C"+index)
                            .innerHTML = letter;
                    }
                }
            });
            if(correctLetters.length === pickedWord.length) {
                showWonMessage();
                blockInputLetter();
            }
        }
    }else {

        if(wrongLetters.length < SIX) {
            if(!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);
            }
            draw(wrongLetters.length);
            if(wrongLetters.length == SIX) {
                showFailMessage();
                showWordMessage();
                blockInputLetter();
                showPlayButton();
            }
            
            for(i=0;i<wrongLetters.length;i++) {
                if(document.getElementById("W"+i).innerText === "_") {
                    document
                        .getElementById("W"+i)
                        .innerHTML = wrongLetters[i];
                }
            }
        }
    }

}

function newWorld() {
    const newWord = document
                        .getElementById("input-newword")
                        .value
                        .toLowerCase()
                        .trim()
                        .normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, "");
                        
    if(newWord.length>1) {
        if(!wordsGame.includes(newWord)) {
            wordsGame.push(newWord);
        }
        showAddMessage();
    }
}

function pressLetter(event) {
    hiddenAddMessage();
    
    let letter = event
                    .target
                    .value
                    .trim()
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "");

    if(letter.match(pattern)) {
        mainLogic(letter);
    }
}

