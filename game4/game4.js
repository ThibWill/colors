document.addEventListener('DOMContentLoaded', function() {

    const BOARD_INFOS = {
        nb_card_width: 4,
        nb_card_height: 4,
        color_shuffle: [],
        results: [],
        settings:{
            colors: ["#FF00A7", "#0028FF", "#00FF58", "#FFD700"],
        }
    }

    const board = document.querySelector('.board');

    // Decide the colors of the board
    function setModel() {
        // Put equals number of each color in the array
        for (let i = 0; i < Math.floor(BOARD_INFOS.nb_card_width * BOARD_INFOS.nb_card_height / BOARD_INFOS.settings.colors.length); i++) {
            BOARD_INFOS.color_shuffle = BOARD_INFOS.color_shuffle.concat(BOARD_INFOS.settings.colors);
        }
        BOARD_INFOS.color_shuffle = BOARD_INFOS.color_shuffle.concat(
            BOARD_INFOS.settings.colors.slice(0, (BOARD_INFOS.nb_card_width * BOARD_INFOS.nb_card_height) % BOARD_INFOS.settings.colors.length)
        );
        // Randomize color apparition
        BOARD_INFOS.color_shuffle = shuffleArray(BOARD_INFOS.color_shuffle);
        // Create the board
        createBoard();
    } 

    // Suffle the elements of an array
    function shuffleArray(array) {
        let currentIndex = array.length, randomIndex;
      
        while (currentIndex !== 0) {
      
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
    }

    // Initiate creation of the board
    function createBoard() {
        board.innerHTML= '';
        for (let i = 0; i < BOARD_INFOS.nb_card_width * BOARD_INFOS.nb_card_height; i++) {
            board.appendChild(createCard(i));
        }
    }

    // Create each card as an HTML element
    const test = clickCard();
    function createCard(indice_color) {
        const card = document.createElement('div');
        card.style.width = `${board.offsetWidth/BOARD_INFOS.nb_card_width}px`;
        card.style.height = `${board.offsetHeight/BOARD_INFOS.nb_card_height}px`;
        card.classList.add('card');
        card.id = indice_color;

        decideColor(card, BOARD_INFOS.color_shuffle[indice_color]);
        
        card.addEventListener('click', test);
        return card;
    }

    // Decide if the card remain white or take its color
    function decideColor(card, color) {
        if (BOARD_INFOS.results.includes(color)) {
            card.style.background = color;
        } else {
            card.style.background = 'white';
        }
    }

    // Event trigred when the card is clicked
    function clickCard() {
        let color = '';
        let count = 0;

        function changeColorClicked() {
            if (!checkColor(this.id)) { return; }
            count ++;
            color = BOARD_INFOS.color_shuffle[this.id];
            this.style.background = color;

            if (count === Math.floor(BOARD_INFOS.nb_card_height * BOARD_INFOS.nb_card_width / BOARD_INFOS.settings.colors.length)) {
                lockColor();
            }

            checkWin();
        }

        function checkColor(id_card) {
            if (color !== '' && color !== BOARD_INFOS.color_shuffle[id_card]) {
                createBoard();
                reset();
                return false;
            }
            return true;
        }

        function lockColor() {
            if (!BOARD_INFOS.results.includes(color)) {
                BOARD_INFOS.results.push(color);
                reset()
            }
        }

        function reset() {
            color = '';
            count = 0;
        }

        return changeColorClicked;
    }

    function checkWin() {
        if (BOARD_INFOS.results.length === BOARD_INFOS.settings.colors.length) {
            document.querySelector('.win').style.visibility = "visible";
            window.setTimeout(function() { window.location = "../game5/game5.html" }, 2500);
        }
    }

    setModel();

    window.addEventListener('resize', createBoard);
});