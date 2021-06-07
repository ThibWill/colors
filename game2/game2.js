document.addEventListener("DOMContentLoaded", function() {
    
    // Model
    const BOARD_INFOS = {
        nb_card_width: 9,
        nb_card_height: 7,
        cards: [
            { x: 1, y: 1, type: "obstacle" },
            { x: 7, y: 0, type: "obstacle" },
            { x: 3, y: 2, type: "obstacle" },
            { x: 8, y: 3, type: "obstacle" },
            { x: 2, y: 4, type: "obstacle" },
            { x: 0, y: 6, type: "obstacle" },
            { x: 6, y: 6, type: "obstacle" }
        ],
        indicator: { x: 0, y: 0 },
        settings: {
            animation_time: 1000,
            colors: ["#FF00A7", "#0028FF", "#00FF58", "#FFD700"],
            color_obstacle: "#222222"
        }
    }

    const header = document.querySelector('header');
    const board = document.querySelector('.board');
    const indicator = document.querySelector('.indicator');
    function generateBoard() {
        board.innerHTML = '';
        createCards();
        placeIndicator();
    }

    let widthCard = 0;
    let heightCard = 0;
    function createCards() {
        widthCard = board.offsetWidth/BOARD_INFOS.nb_card_width;
        heightCard = board.offsetHeight/BOARD_INFOS.nb_card_height;
        for (let i = 0; i < BOARD_INFOS.nb_card_height; i++) {
            for (let j = 0; j < BOARD_INFOS.nb_card_width; j++) {
                decideColor(j, i)    
            }
        }
    }

    function decideColor(x, y) {
        for (let card in BOARD_INFOS.cards) {

            if (BOARD_INFOS.cards[card].x === x && BOARD_INFOS.cards[card].y === y) {

                BOARD_INFOS.cards[card].type === "obstacle" ? 
                    createCard(BOARD_INFOS.settings.color_obstacle) :
                    createCard(BOARD_INFOS.cards[card].color);
                return;
            }
        }  
        createCard();
    }

    function createCard(color) {
        const card = document.createElement('div');
        card.style.width = `${widthCard}px`;
        card.style.height = `${heightCard}px`;
        color ? card.style.background = color : card.style.background = "white";
        card.classList.add('card');
        board.appendChild(card);
    }

    function placeIndicator(direction) {
        const indicator_length = indicator.offsetWidth;
        if (!direction) {
            indicator.style.left = `${BOARD_INFOS.indicator.x * widthCard + widthCard/2 - indicator_length/2}px`;
            indicator.style.top = `${header.offsetHeight + BOARD_INFOS.indicator.y * heightCard + heightCard/2 - indicator_length/2}px`;
        } else {
            moveIndicator(indicator, direction)
        }
    }

    function moveIndicator(indicator, direction) {
        let animation = '';
        if (direction === "UP") {
            animation = [
                { transform: `translateY(${BOARD_INFOS.indicator.y * heightCard - (indicator.getBoundingClientRect().top - header.offsetHeight) - indicator.offsetHeight/2 + heightCard/2}px)` }
            ]
        } else if (direction === "DOWN") {
            animation = [
                { transform: `translateY(${BOARD_INFOS.indicator.y * heightCard - (indicator.getBoundingClientRect().top - header.offsetHeight) - indicator.offsetHeight/2 + heightCard/2}px)` }
            ]
        } else if (direction === "RIGHT") {
            animation = [
                { transform: `translateX(${BOARD_INFOS.indicator.x * widthCard - indicator.getBoundingClientRect().left - indicator.offsetWidth/2 + widthCard/2}px)` }
            ]
        } else if (direction === "LEFT") {
            animation = [
                { transform: `translateX(${BOARD_INFOS.indicator.x * widthCard - indicator.getBoundingClientRect().left - indicator.offsetWidth/2 + widthCard/2}px)` }
            ]
        }

        indicator.animate(animation, {
            duration: BOARD_INFOS.settings.animation_time,
            iterations: 1,
        });
    }

    // Block arrow inputs when the ball is moving
    function blockInput() {
        document.removeEventListener('keydown', arrowPress, false);
        colorCardsOnOff(true); 
        setTimeout(function() {
            document.addEventListener('keydown', arrowPress);
            colorCardsOnOff(false);
            placeIndicator();
        }, BOARD_INFOS.settings.animation_time);
    }

    // Color the cards when the indicator is moving
    function colorCards() {
        const cards = board.querySelectorAll('.card');
        const indicator_bounds = indicator.getBoundingClientRect();
        for (let i = 0; i < cards.length; i++) {
            const card_bounds = cards[i].getBoundingClientRect();
            
            if (indicator_bounds.top > card_bounds.top && indicator_bounds.bottom < card_bounds.bottom && 
                indicator_bounds.left > card_bounds.left && indicator_bounds.right < card_bounds.right 
                && cards[i].style.backgroundColor === "white") {
                
                const color = BOARD_INFOS.settings.colors[Math.floor(Math.random() * 4)];
                cards[i].style.background = color;
                // Update the model with the new colored card
                BOARD_INFOS.cards.push({
                    x: Math.floor(indicator_bounds.left/widthCard), 
                    y: Math.floor((indicator_bounds.top - header.offsetHeight)/heightCard),
                    color
                });

                checkWin()
            }
        }
    }

    colorCardsInterval = '';
    function colorCardsOnOff(mode) {
        if (mode === true) {
            colorCardsInterval = setInterval(colorCards, 25);
        } else {
            clearInterval(colorCardsInterval)
        }
    }

    function checkWin() {
        console.log(BOARD_INFOS.cards.length, BOARD_INFOS.nb_card_height * BOARD_INFOS.nb_card_width);
        if (BOARD_INFOS.cards.length === (BOARD_INFOS.nb_card_height * BOARD_INFOS.nb_card_width)) {
            document.querySelector('.win').style.visibility = "visible";
            window.setTimeout(function() { window.location = "../game3/game3.html" }, 2500);
        }
    }

    // Handle arrow inputs
    function arrowPress(e) {
        let direction = "";
        // LEFT
        if (e.keyCode === 37) {
            let new_x = 0;
            BOARD_INFOS.cards.forEach(obstacle => {
                if (obstacle.type === "obstacle" && obstacle.x < BOARD_INFOS.indicator.x && obstacle.x >= new_x && obstacle.y === BOARD_INFOS.indicator.y) {
                    new_x = obstacle.x + 1;
                }
            });
            BOARD_INFOS.indicator.x = new_x;
            direction = "LEFT";
        } 
        // UP
        else if (e.keyCode === 38) {
            let new_y = 0;
            BOARD_INFOS.cards.forEach(obstacle => {
                if (obstacle.type === "obstacle" && obstacle.y < BOARD_INFOS.indicator.y && obstacle.y >= new_y && obstacle.x === BOARD_INFOS.indicator.x) {
                    new_y = obstacle.y + 1;
                }
            });
            BOARD_INFOS.indicator.y = new_y;
            direction = "UP";
        } 
        // RIGHT
        else if (e.keyCode === 39) {
            let new_x = BOARD_INFOS.nb_card_width - 1;
            BOARD_INFOS.cards.forEach(obstacle => {
                if (obstacle.type === "obstacle" && obstacle.x > BOARD_INFOS.indicator.x && obstacle.x <= new_x && obstacle.y === BOARD_INFOS.indicator.y) {
                    new_x = obstacle.x - 1;
                }
            });
            BOARD_INFOS.indicator.x = new_x;
            direction = "RIGHT";
        } 
        // DOWN
        else if (e.keyCode === 40) {
            let new_y = BOARD_INFOS.nb_card_height - 1;
            BOARD_INFOS.cards.forEach(obstacle => {
                if (obstacle.type === "obstacle" && obstacle.y > BOARD_INFOS.indicator.y && obstacle.y <= new_y && obstacle.x === BOARD_INFOS.indicator.x) {
                    new_y = obstacle.y - 1;
                }
            });
            BOARD_INFOS.indicator.y = new_y;
            direction = "DOWN";
        } else {
            return;
        }
        blockInput();
        placeIndicator(direction);
    }

    document.addEventListener('keydown', arrowPress);
    window.addEventListener('resize', generateBoard);

    generateBoard();
});