document.addEventListener('DOMContentLoaded', function() {

    // Cookie gestion
    redirect(3);

    const COLORS = ["#FF00A7", "#0028FF", "#00FF58", "#FFD700"];
    const nb_letters = 6;

    const main = document.querySelector('main');
    const number = document.querySelector('.number');

    // Draw the panels with random colors
    const results = [];
    const draw_colors = [];
    function drawColors() {
        for (let i = 0; i < nb_letters; i++) {
            draw_colors.push(COLORS[Math.floor(Math.random() * COLORS.length)]);
        }
    }

    // Change the panel
    let nb_main = -1;
    function changeColorMain() {
        changeNbMain()
        main.style.backgroundColor = draw_colors[nb_main];
        number.innerHTML = nb_main + 1;
    }

    // Get the number of the next panel
    function changeNbMain() {
        if (nb_main === nb_letters - 1) {
            nb_main = 0;
            return;
        }
        nb_main ++;
    }

    // Put a click event on all the letters COLORS
    function setEventLetters() {
        const letters = document.querySelectorAll('.letter');
        for (let i = 0; i < letters.length; i++) {
            letters[i].addEventListener('click', colorLetter(i));
        }
    }

    // Color a letter when it is clicked
    function colorLetter(indice_result) {
        let indice = 0;

        function changeColorLetter() {
            changeIndice();
            results[indice_result] = COLORS[indice];
            this.style.color = COLORS[indice];
            checkWin();
        };

        function changeIndice() {
            if (indice === COLORS.length - 1) {
                indice = 0;
                return;
            }
            indice ++;
        }

        return changeColorLetter;
    }

    function checkWin() {
        if (JSON.stringify(results) === JSON.stringify(draw_colors)) {
            document.querySelector('.win').style.visibility = "visible";
            changeCookie(4);
            window.setTimeout(function() { window.location = "../game4/game4.html" }, 2500);
        }
    }

    drawColors();
    main.addEventListener('click', changeColorMain);
    setEventLetters();
});