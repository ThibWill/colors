document.addEventListener('DOMContentLoaded', function() {

    const COLORS =  ["#FF00A7", "#0028FF", "#00FF58", "#FFD700"];
    const LETTERS = ['l', 'w', 'o', 'e', 'y', 'l'];

    const panels = document.querySelectorAll('.panel');
    function colorLetters() {
        for (let i = 0; i < panels.length; i++) {
            panels[i].innerHTML = LETTERS[i];
            panels[i].style.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        }
    }
    
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

    function checkAnswer() {
        for (let i = 0; i < panels.length; i++) {
            if (panels[i].style.backgroundColor !== 'rgb(255, 215, 0)') {
                return;
            }
        }
        win();
    }

    function win() {
        document.querySelector('.win').style.visibility = "visible";
        window.setTimeout(function() { window.location = "../game7/game7.html" }, 2500);
    }

    colorLetters();
});