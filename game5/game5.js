document.addEventListener('DOMContentLoaded', function() {

    // Cookie gestion
    redirect(5);

    const COLORS =  ["#FF00A7", "#0028FF", "#00FF58", "#FFD700"];
    const COLOR_LETTER = ["#0028FF", "#FFD700", "#FF00A7", "#00FF58"]
    const LETTERS = ['a', 'b', 'c', 'd'];

    // Color the panels and the letters
    const panels = document.querySelectorAll('.panel');
    function setBoard() {
        for (let i = 0; i < panels.length; i++) {
            panels[i].style.backgroundColor = COLORS[i];
            panels[i].innerHTML = LETTERS[i];
            panels[i].style.color = COLOR_LETTER[i];
        }   
    }

    // Answer with the right inputs
    function *generatorAwnswer(){
        yield { number: "KeyC", win: false };
        yield { number: "KeyQ", win: false };
        yield { number: "KeyD", win: false };
        yield { number: "KeyB", win: true };
    }

    // Check if the user inputs are correct
    let answer = generatorAwnswer();
    function checkKeys(e) {
        let value = answer.next().value;
        if (e.code === value.number) {
            if (value.win) {
                win();
            }
        } else {
            answer = generatorAwnswer();
        }
    }

    function win() {
        document.querySelector('.win').style.visibility = "visible";
        changeCookie(6);
        window.setTimeout(function() { window.location = "../game6/game6.html" }, 2500);
    }

    document.addEventListener('keydown', checkKeys);
    
    setBoard();
});