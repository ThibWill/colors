const COLORS = ["#FF00A7", "#0028FF", "#00FF58", "#FFD700"];

document.addEventListener('DOMContentLoaded', function() {

    const panels = document.querySelectorAll('.panel');
    const letters = document.querySelectorAll('.letter');

    let numberPanel = 0;
    function changeColorPanels() {
        if (numberPanel == panels.length) {
            numberPanel = 0;
        }
        panels[numberPanel].style.background = this.style.background;
        numberPanel++;

        checkAnswer();
    }

    const buttons = document.querySelector('.buttons').querySelectorAll('button');
    let indice = 0;
    buttons.forEach(function(button) {
        button.style.background = COLORS[indice];
        indice ++;
        button.addEventListener('click', changeColorPanels);
    });

    const answer = []
    function generateAnswer() {
        for (let i = 0; i < letters.length; i++) {
            answer.push(Math.floor(Math.random() * COLORS.length))
        }
        colorify();
    }

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
            if (rgbToHex(panels[i].style.backgroundColor) != COLORS[answer[i]]) {
                break;
            }
            if (i === panels.length - 1) {
                win();
            }
        }
    }

    function win() {
        document.querySelector('.win').style.visibility = "visible";
        window.setTimeout(function() { window.location = "../game2/game2.html" }, 2500);
    }
    generateAnswer();
});