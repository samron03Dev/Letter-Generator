const generateLetters = {
    data: {
        genBtn: document.getElementById("generate-btn"),
        wordContainer: document.getElementById("word-container"),
        numCons: document.getElementById("consNum"),
        numVow: document.getElementById("vowNum"),
        consonantList: {
            b: {val: "B", weight: 3},
            c: {val: "C", weight: 3},
            d: {val: "D", weight: 6},
            f: {val: "F", weight: 3},
            g: {val: "G", weight: 4},
            h: {val: "H", weight: 5},
            j: {val: "J", weight: 1},
            k: {val: "K", weight: 2},
            l: {val: "L", weight: 5},
            m: {val: "M", weight: 3},
            n: {val: "N", weight: 8},
            p: {val: "P", weight: 3},
            q: {val: "Qu", weight: 1},
            r: {val: "R", weight: 9},
            s: {val: "S", weight: 8},
            t: {val: "T", weight: 9},
            v: {val: "V", weight: 2},
            w: {val: "W", weight: 3},
            x: {val: "X", weight: 2},
            y: {val: "Y", weight: 2},
            z: {val: "Z", weight: 1}
        }, //List of consonants with different odds for each
        vowelList: {
            a: {val: "A", weight: 9},
            e: {val: "E", weight: 8},
            i: {val: "I", weight: 5},
            o: {val: "O", weight: 5},
            u: {val: "U", weight: 2}
        }, //List of vowels with different odds for each
        chosenStr: ["XXX"] //Used to prevent any repeat word setups
    },
    functions: {
        initFunc: function() {
            generateLetters.data.genBtn.addEventListener('click', this.checkLetterInput);
        },
        checkLetterInput: function() {
            let numCons = generateLetters.data.numCons.value, numVow = generateLetters.data.numVow.value;
            numCons != "" && numVow != "" && (parseInt(numCons) + parseInt(numVow) < 11) ?
            generateLetters.functions.chooseLetters(numCons, numVow) : window.alert("Invalid!");
        },
        chooseLetters: function(numCons, numVow) {
            let consonantDeck = [], vowelDeck = [];
            for (const [val, key] of Object.entries(generateLetters.data.consonantList)) {
                for(let i=0;i<key.weight;i++) {
                    consonantDeck.push(key.val);
                }
            }
            for (const [val, key] of Object.entries(generateLetters.data.vowelList)) {
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
                wordContainer.append(myLetter);
            }
            console.log(wordContainer);
        }
    }
}

generateLetters.functions.initFunc();