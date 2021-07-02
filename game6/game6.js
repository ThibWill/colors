document.addEventListener('DOMContentLoaded', function() {

    // Cookie gestion
    redirect(6);

    const COLORS =  ["#FF00A7", "#0028FF", "#00FF58", "#FFD700"];
    const LETTERS = ['l', 'w', 'o', 'e', 'y', 'l'];

    const panels = document.querySelectorAll('.panel');

    // Initialization of buttons
    const buttons = document.querySelector('.buttons').querySelectorAll('button');
    let indice = 0;
    buttons.forEach(function(button) {
        button.style.background = COLORS[indice];
        indice ++;
        button.addEventListener('click', changeColorPanels);
    });

    // Color the letters 
    function colorLetters() {
        for (let i = 0; i < panels.length; i++) {
            panels[i].innerHTML = LETTERS[i];
            panels[i].style.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        }
    }
    
    let numberPanel = 0;
    // Change the color of a panel when click on a button
    function changeColorPanels() {
        if (numberPanel == panels.length) {
            numberPanel = 0;
        }
        panels[numberPanel].style.background = this.style.background;
        numberPanel++;

        checkAnswer();
    }

    // Check if the pattern of color is right
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
        changeCookie(7);
        window.setTimeout(function() { window.location = "../game7/game7.html" }, 2500);
    }

    colorLetters();
});