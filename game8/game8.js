document.addEventListener('DOMContentLoaded', function() {
    const COLORS =  ["#FF00A7", "#0028FF", "#00FF58", "#FFD700"];
    const BOARD = {
        length_board: 8,
        boxes: [ 
            { x: 1, y: 6, color: COLORS[Math.floor(Math.random() * 4)]}, 
            { x: 6, y: 1, color: COLORS[Math.floor(Math.random() * 4)]}
        ]
    }

    const board = document.querySelector('.board');
    function init() {
        board.innerHTML = '';
        initBoard();
    }

    // Put the elements on the board
    function initBoard() {
        board.style.width = `${Math.floor(board.offsetHeight/BOARD.length_board) * BOARD.length_board}px`;
        for (let i = 0; i < BOARD.length_board * BOARD.length_board; i++) {
            board.appendChild(createBox(i));
        }
    }

    // Create a div which will be a box in the board
    function createBox(indice) {
        const box = document.createElement('div');
        box.id = indice;
        box.style.width = `${Math.floor(board.offsetHeight/BOARD.length_board)}px`;
        box.style.height = `${board.offsetHeight/BOARD.length_board}px`;
        box.style.borderRadius = `5px`;
        colorBox(box);
        return box;
    }

    // Color the box if it is defined by the model
    function colorBox(box) {
        let indice = 0;
        BOARD.boxes.forEach(function(color_box) {
            if (box.id % BOARD.length_board === color_box.x && Math.floor(box.id / BOARD.length_board) === color_box.y) {
                box.style.backgroundColor = color_box.color;
                box.classList.add(indice);
                box.addEventListener('click', changeBoardState);
            }
            indice ++;
        });
    }

    // rgb(255, 255, 255) => #FFFFFF
    function rgbToHex(rgb) {
        return `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('').toUpperCase()}`;
    }

    // Move the box according to its color
    function changeBoardState() {
        const class_name = this.className;
        switch (rgbToHex(this.style.backgroundColor)) {
            case "#FF00A7":
                BOARD.boxes[class_name].x + 1 < BOARD.length_board ? BOARD.boxes[class_name].x ++ : null;
                break;
            case "#0028FF":
                BOARD.boxes[class_name].y + 1 < BOARD.length_board ? BOARD.boxes[class_name].y ++ : null;
                break;
            case "#00FF58":
                BOARD.boxes[class_name].x > 0 ? BOARD.boxes[class_name].x -- : null;
                break;
            case "#FFD700":
                BOARD.boxes[class_name].y > 0 ? BOARD.boxes[class_name].y -- : null;
                break;
        }
        BOARD.boxes.forEach(box => box.color = COLORS[Math.floor(Math.random() * 4)]);
        checkWin() ? win() : init();
    }

    let move = 0;
    // The player win if the boxes are juxtaposed
    function checkWin() {
        let x, y = -1;
        move ++;
        for (let i = 0; i < BOARD.boxes.length; i++) {
            
            if (x === -1 || y === -1) {
                x = BOARD.boxes[i].x;
                y = BOARD.boxes[i].y;
                continue;
            }

            if (x !== BOARD.boxes[i].x || y != BOARD.boxes[i].y) {
                return false;
            }
        }
        return true;
    }

    // Display end screen when winning
    function win() {
        document.querySelector('.win').style.visibility = "visible";
        window.setTimeout(function() { window.location = "../end/end.html" }, 2500);
    }

    window.addEventListener('resize', init);
    init();
});