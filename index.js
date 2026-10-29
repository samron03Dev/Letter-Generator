const generateLetters = {
    data: {
        genBtn: document.getElementById("generate-btn"),
        wordContainer: document.getElementById("word-container"),
        numCons: document.getElementById("consNum"),
        numVow: document.getElementById("vowNum"),
        consonantList: [
            {val: "B", weight: 3, diff: "EASY"},
            {val: "C", weight: 3, diff: "EASY"},
            {val: "D", weight: 6, diff: "EASY"},
            {val: "F", weight: 3, diff: "MEDIUM"},
            {val: "G", weight: 4, diff: "EASY"},
            {val: "H", weight: 5, diff: "EASY"},
            {val: "J", weight: 1, diff: "HARD"},
            {val: "K", weight: 2, diff: "MEDIUM"},
            {val: "L", weight: 5, diff: "EASY"},
            {val: "M", weight: 3, diff: "EASY"},
            {val: "N", weight: 8, diff: "EASY"},
            {val: "P", weight: 3, diff: "MEDIUM"},
            {val: "Qu", weight: 1, diff: "HARD"},
            {val: "R", weight: 9, diff: "EASY"},
            {val: "S", weight: 8, diff: "EASY"},
            {val: "T", weight: 9, diff: "EASY"},
            {val: "V", weight: 2, diff: "HARD"},
            {val: "W", weight: 3, diff: "MEDIUM"},
            {val: "X", weight: 2, diff: "HARD"},
            {val: "Y", weight: 2, diff: "MEDIUM"},
            {val: "Z", weight: 1, diff: "HARD"}
        ], //List of consonants with different odds for each
        vowelList: [
            {val: "A", weight: 9, diff: "EASY"},
            {val: "E", weight: 8, diff: "EASY"},
            {val: "I", weight: 5, diff: "MEDIUM"},
            {val: "O", weight: 5, diff: "MEDIUM"},
            {val: "U", weight: 2, diff: "MEDIUM"}
        ], //List of vowels with different odds for each
        chosenStr: ["XXX"] //Used to prevent any repeat word setups
    },
    functions: {
        initFunc: function() {
            generateLetters.data.genBtn.addEventListener('click', this.checkLetterInput);
            generateLetters.data.wordContainer.addEventListener('click', this.revealLetters);
        },
        checkLetterInput: function() {
            let numCons = generateLetters.data.numCons.value, numVow = generateLetters.data.numVow.value;
            numCons != "" && numVow != "" && (parseInt(numCons) + parseInt(numVow) < 11) ?
            generateLetters.functions.chooseLetters(numCons, numVow) : window.alert("Invalid!");
        },
        chooseLetters: function(numCons, numVow) {
            let consonantDeck = [], vowelDeck = [];
            for (const key of generateLetters.data.consonantList) {
                for(let i=0;i<key.weight;i++) {
                    consonantDeck.push(key.val);
                }
            }
            for (const key of generateLetters.data.vowelList) {
                for(let i=0;i<key.weight;i++) {
                    vowelDeck.push(key.val);
                }
            }

            let currentStr = "XXX";
            function genWord() {
                let tempCDeck = consonantDeck, tempVDeck = vowelDeck;
                for(let i=0; i<numCons; i++) {
                    let randomIndex = Math.floor(Math.random() * tempCDeck.length);
                    currentStr+=tempCDeck[randomIndex];
                    tempCDeck.splice(randomIndex, 1);
                }
                for(let i=0; i<numVow; i++) {
                    let randomIndex = Math.floor(Math.random() * vowelDeck.length);
                    currentStr+=vowelDeck[randomIndex];
                    vowelDeck.splice(randomIndex, 1);
                }
            }
            do {
                currentStr = "";
                genWord();
            } while(generateLetters.data.chosenStr.includes(currentStr.split("").sort().join("")))
            generateLetters.data.chosenStr.push(currentStr);
            console.log(currentStr);
            this.printLetters(currentStr);
        },
        printLetters: function(myWord) {
            wordContainer = generateLetters.data.wordContainer;
            wordContainer.innerHTML = "";
                for(let i=0; i<myWord.length; i++) {
                let myLetter = document.createElement("div");
                myLetter.innerHTML = myWord[i];
                myLetter.classList.add("word-box");
                if(['A','E','I','O','U'].includes(myWord[i])) {
                    vowIndex = generateLetters.data.vowelList.findIndex(obj => obj.val === myWord[i]);
                    console.log(vowIndex);
                    if(generateLetters.data.vowelList[vowIndex].diff=="EASY") {
                        myLetter.style.backgroundColor = "lime"
                        myLetter.style.color = "lime";
                    }
                    else {
                        myLetter.style.backgroundColor = "orange"
                        myLetter.style.color = "orange";
                    }
                }
                else {
                    consIndex = generateLetters.data.consonantList.findIndex(obj => obj.val === myWord[i]);
                    console.log(consIndex);
                    if(generateLetters.data.consonantList[consIndex].diff=="EASY") {
                        myLetter.style.backgroundColor = "lime"
                        myLetter.style.color = "lime";
                    }
                    else if(generateLetters.data.consonantList[consIndex].diff=="MEDIUM") {
                        myLetter.style.backgroundColor = "orange"
                        myLetter.style.color = "orange";
                    }
                    else {
                        myLetter.style.backgroundColor = "red"
                        myLetter.style.color = "red";
                    }
                }
                wordContainer.append(myLetter);
            }
            console.log(wordContainer);
        },
        revealLetters: function() {
            for (const child of generateLetters.data.wordContainer.children) {
                child.style.backgroundColor = "white";
                child.style.color = "black";
            }
        }
    }
}

generateLetters.functions.initFunc();
