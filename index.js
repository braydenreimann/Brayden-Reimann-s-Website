// Event listener to ensure page elements have loaded
document.addEventListener("DOMContentLoaded", () => {


    // Get the user's preferred language
    const isEnglish = (document.documentElement.lang === "en");

    if (!localStorage.langCheck) {
        const preferredLang = navigator.language;
        let preferSpanish = false;
        if (preferredLang.charAt(0) === 'e' && preferredLang.charAt(1) === 's') {
            preferSpanish = true;
        }

        // Switch to the Spanish version of the site
        if (isEnglish && preferSpanish) {
            window.location.href = "https://braydenreimann.com/es/"
            localStorage.langCheck = 1;
        }
    }

    const toggle = document.getElementById("navbar-mobile-toggle");
    const bodyContent = document.getElementById("body-content");
    
    const mobileLinks = document.getElementById("navbar-mobile-links");
    toggle.addEventListener("click", () => {
        const isVisible = mobileLinks.style.display === "block";
        mobileLinks.style.display = isVisible ? "none" : "block";
        bodyContent.style.display = isVisible ? "none" : "block";
    });

    const mobileLinksButtons = document.querySelectorAll("a");

    mobileLinksButtons.forEach(link => {
        link.addEventListener("click", () => {
            mobileLinks.style.display = "none";
            bodyContent.style.display = "none";
        });
    });


    // Create a new HTMLAudioElement to manage and play audio
    const menuSelectSF = new Audio("Media/Audio/menu-select.wav");
    const youWonSF = new Audio("Media/Audio/you-won.wav");

    // Define the spaces on the Tic-Tac-Toe board
    const spaces = [
        document.getElementById("space-0"),
        document.getElementById("space-1"),
        document.getElementById("space-2"),
        document.getElementById("space-3"),
        document.getElementById("space-4"),
        document.getElementById("space-5"),
        document.getElementById("space-6"),
        document.getElementById("space-7"),
        document.getElementById("space-8")
    ]

    // Define the board (array of space objects)
    const board = [
        { space: spaces[0], value: null},
        { space: spaces[1], value: null},
        { space: spaces[2], value: null},
        { space: spaces[3], value: null},
        { space: spaces[4], value: null},
        { space: spaces[5], value: null},
        { space: spaces[6], value: null},
        { space: spaces[7], value: null},
        { space: spaces[8], value: null}
    ]

    const winningPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    function checkWin(player) {
        return winningPatterns.some(pattern => pattern.every(index => board[index].value === player));
    }

    const emptySpacesIndices = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    let numEmptySpaces = 9;

    // Define the game info text
    const gameInfo = document.getElementById("game-info");

    // Define variable that indicates the current turn
    let yourTurn = true;

    // Define variable that indicates if game is playing
    let isPlaying = true;

    // Event listener for the play again button
    const playAgainButton = document.getElementById("play-again-button");
    if (playAgainButton) {
        playAgainButton.addEventListener("click", () => {

            // Reset the game
            board[0].value = null;
            board[1].value = null;
            board[2].value = null;
            board[3].value = null;
            board[4].value = null;
            board[5].value = null;
            board[6].value = null;
            board[7].value = null;
            board[8].value = null;

            spaces.forEach((space, index) => {
                space.innerHTML = "";
            })

            isPlaying = true;
            yourTurn = true;

            playAgainButton.setAttribute("hidden", "hidden");
            gameInfo.innerHTML = "It's your turn.";
        })
    }

    spaces.forEach((space, index) => {

        // Event listener for mouse enter
        space.addEventListener("mouseenter", () => {
            // Highlight available spaces
            if (yourTurn && board[index].value === null && isPlaying) {
                space.style.backgroundColor = "LightGreen";
                menuSelectSF.play().then(r => null);
            }
        })

        // Event listener for mouse leave (initial state)
        space.addEventListener("mouseleave", () =>{
            if (yourTurn) {
                space.style.backgroundColor = "";
            }
        })

        // Event listener for mouse click
        space.addEventListener("click", () => {
            if (yourTurn && board[index].value === null) {
                // Once the user selects the space, immediately remove highlight on the space
                space.style.backgroundColor = ""
                markSpace(space, index, true);

                if (isPlaying) {
                    // Now it's the computer's turn
                    setTimeout(computerMove, 3000);
                    yourTurn = false;
                } else {
                    document.getElementById("play-again-button").removeAttribute("hidden");
                }
            }
        })
    })

    function markSpace(space, index, isX) {
        // Update the board
        if (isX) {
            board[index].value = 'X';
            space.innerHTML = 'X';

            const hasWon = checkIfWon(index, isX);
            if (hasWon) {
                gameInfo.innerHTML = "You won!";
                youWonSF.play().then(r => null);
                isPlaying = false;
            } else {
                gameInfo.innerHTML = "It's the computer's turn."
            }
        } else {
            board[index].value = 'O';
            space.innerHTML = 'O';


            const hasWon = checkIfWon(index, isX);
            if (hasWon) {
                gameInfo.innerHTML = "The computer won!";
                youWonSF.play().then(r => null);
                isPlaying = false;
                document.getElementById("play-again-button").removeAttribute("hidden");
            } else {
                gameInfo.innerHTML = "It's your turn."
            }
        }
    }

    function computerMove() {
        const emptySpaces = [];

        // Select a random empty space
        for (let i = 0; i < board.length; i++) {
            const item = board[i];

            if (item.value === null) {
                emptySpaces.push({ item, index: i});
            }
        }

        console.log(emptySpaces);
        if (emptySpaces.length > 0) {
            const randomIndex = Math.floor(Math.random() * emptySpaces.length);
            markSpace(emptySpaces[randomIndex].item.space, emptySpaces[randomIndex].index, false)
        }

        yourTurn = true;
    }

    function checkIfWon(index, isX) {
        let char = -1;
        if (isX) {
            char = 'X';
        } else {
            char = 'O';
        }

        switch(index) {
            case 0:
                if ((board[0].value === char)
                    && (board[3].value === char)
                    && (board[6].value === char)) {
                    return true;
                } else if ((board[0].value === char)
                    && (board[1].value === char)
                    && (board[2].value === char)) {
                    return true;
                } else if ((board[0].value === char)
                    && (board[4].value === char)
                    && (board[8].value === char)) {
                    return true;
                }
                return false;
            case 1:
                if ((board[1].value === char)
                    && (board[4].value === char)
                    && (board[7].value === char)) {
                    return true;
                } else if ((board[1].value === char)
                    && (board[0].value === char)
                    && (board[2].value === char)) {
                    return true;
                }
                return false;
            case 2:
                if ((board[2].value === char)
                    && (board[5].value === char)
                    && (board[8].value === char)) {
                    return true;
                } else if ((board[2].value === char)
                    && (board[0].value === char)
                    && (board[1].value === char)) {
                    return true;
                } else if ((board[2].value === char)
                    && (board[4].value === char)
                    && (board[6].value === char)) {
                    return true;
                }
                return false;
            case 3:
                if ((board[0].value === char)
                    && (board[3].value === char)
                    && (board[6].value === char)) {
                    return true;
                } else if ((board[3].value === char)
                    && (board[4].value === char)
                    && (board[5].value === char)) {
                    return true;
                }
                return false;
            case 4:
                if ((board[3].value === char)
                    && (board[4].value === char)
                    && (board[5].value === char)) {
                    return true;
                } else if ((board[1].value === char)
                    && (board[4].value === char)
                    && (board[7].value === char)) {
                    return true;
                } else if ((board[2].value === char)
                    && (board[4].value === char)
                    && (board[6].value === char)) {
                    return true;
                } else if ((board[0].value === char)
                    && (board[4].value === char)
                    && (board[8].value === char)) {
                    return true;
                }
                return false;
            case 5:
                if ((board[3].value === char)
                    && (board[4].value === char)
                    && (board[5].value === char)) {
                    return true;
                } else if ((board[2].value === char)
                    && (board[5].value === char)
                    && (board[8].value === char)) {
                    return true;
                }
                return false;
            case 6:
                if ((board[0].value === char)
                    && (board[3].value === char)
                    && (board[6].value === char)) {
                    return true;
                } else if ((board[6].value === char)
                    && (board[7].value === char)
                    && (board[8].value === char)) {
                    return true;
                }
                return false;
            case 7:
                if ((board[6].value === char)
                    && (board[7].value === char)
                    && (board[8].value === char)) {
                    return true;
                }
                else if ((board[1].value === char)
                    && (board[4].value === char)
                    && (board[7].value === char)) {
                    return true;
                }
                return false;
            case 8:
                if ((board[6].value === char)
                    && (board[7].value === char)
                    && (board[8].value === char)) {
                    return true;
                } else if ((board[2].value === char)
                    && (board[5].value === char)
                    && (board[8].value === char)) {
                    return true;
                } else if ((board[0].value === char)
                    && (board[4].value === char)
                    && (board[8].value === char)) {
                    return true;
                }
                return false;
        }
        return false;
    }
})
