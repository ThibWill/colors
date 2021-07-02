const COLORS = ["#FF00A7", "#0028FF", "#00FF58", "#FFD700"];

document.addEventListener('DOMContentLoaded', function() {

    // Cookie gestion
    redirect(1);

    const panels = document.querySelectorAll('.panel');
    const letters = document.querySelectorAll('.letter');

    // Change the color of the panel and go to the next one
    let numberPanel = 0;
    function changeColorPanels() {
        if (numberPanel == panels.length) {
            numberPanel = 0;
        }
        panels[numberPanel].style.background = this.style.background;
        numberPanel++;

        checkAnswer();
    }

    // Initiate the buttons
    const buttons = document.querySelector('.buttons').querySelectorAll('button');
    let indice = 0;
    buttons.forEach(function(button) {
        button.style.background = COLORS[indice];
        indice ++;
        button.addEventListener('click', changeColorPanels);
    });

    // Generate the color code
    const answer = []
    function generateAnswer() {
        for (let i = 0; i < letters.length; i++) {
            answer.push(Math.floor(Math.random() * COLORS.length))
        }
        colorify();
    }

    // Color the letters
    function colorify() {
        for (let i = 0; i < letters.length; i++) {
            letters[i].style.color = COLORS[answer[i]];
        }
    }

    function rgbToHex(rgb) {
        return `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('').toUpperCase()}`;
    }

    function checkAnswer() {
        for (let i = 0; i < panels.length; i++) {
            if (!panels[i].style.backgroundColor || rgbToHex(panels[i].style.backgroundColor) != COLORS[answer[i]]) {
                break;
            }
            if (i === panels.length - 1) {
                win();
            }
        }
    }

    function win() {
        document.querySelector('.win').style.visibility = "visible";
        changeCookie(2);
        window.setTimeout(function() { window.location = "../game2/game2.html" }, 2500);
    }

    generateAnswer();
});