document.addEventListener('DOMContentLoaded', function() {

    // Cookie gestion
    redirect(7);

    const MAX_HEXA_VALUE = 255;

    const rgb = document.querySelector('.rgb');
    const container_bar = document.querySelector('#container-bar');
    const bars = document.querySelectorAll('.bar');
    const guess = document.querySelector('.guess');
    const color_guess = document.querySelector('.color-hexa');

    const colors_hexa = [MAX_HEXA_VALUE, MAX_HEXA_VALUE, MAX_HEXA_VALUE];
    const colors =  ["#0028FF", "#FFD700", "#96EA5E"];
    let authorized = true;

    // Initialize background and each bar
    let initialY = 0;
    let selected_bar;
    function init() {
        for (let i = 0; i < bars.length; i++) {
            initBar(i)
        };
        setBackground();
    }

    // Initialize each bar with drag, click event
    function initBar(i) {
        bars[i].style.top = `${container_bar.getBoundingClientRect().top + 6}px`;
        bars[i].addEventListener('mousedown', function(event) {
            if (event.buttons === 1) {
                initialY = event.layerY;
                selected_bar = this;
                document.addEventListener('mousemove', closureBar(i));
                event.preventDefault();
            };
        });
    }

    let currentColor;
    function setBackground() {
        currentColor = colors[0];
        rgb.style.background = currentColor;
        colors.splice(0, 1);
    }
    

    // Closure for each bar
    function closureBar(indice) {

        // Draggable event, allow to move the bar on the screen
        let container_bar_bounds;
        let selected_bar_bounds;
        function moveBar(event) {
            if (event.buttons !== 1) {
                document.removeEventListener('mousemove', moveBar);
            } else {
                container_bar_bounds = container_bar.getBoundingClientRect();
                selected_bar_bounds = selected_bar.getBoundingClientRect();
                if (event.clientY - initialY > container_bar_bounds.bottom - selected_bar_bounds.height - 6) {
                    selected_bar.style.top = `${container_bar_bounds.bottom - selected_bar_bounds.height - 6}px`;
                } else if (event.clientY - initialY < container_bar_bounds.top + 6) {
                    selected_bar.style.top = `${container_bar_bounds.top + 6}px`;
                } else {
                    selected_bar.style.top = `${event.clientY - initialY}px`;
                }
                changeColor();
            }
        }

        // Change the hexa color value
        function changeColor() {
            let length_container = container_bar_bounds.bottom - container_bar_bounds.top - 12 - selected_bar_bounds.height;
            let length_cursor = selected_bar_bounds.top - container_bar_bounds.top - 6;
            colors_hexa[indice] = Math.abs(Math.floor((length_cursor/length_container) * MAX_HEXA_VALUE - MAX_HEXA_VALUE));
            applyColor()
        }

        return moveBar;
    }

    function rgbToHex(rgb) {
        return `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('').toUpperCase()}`;
    }

    // Change the color of the right screen when the drag event is triggered 
    function applyColor() {
        if (authorized) {
            let rgb = `rgb(${colors_hexa[0]}, ${colors_hexa[1]}, ${colors_hexa[2]})`;
            guess.style.backgroundColor = rgb;
            color_guess.innerHTML = rgbToHex(rgb);
            colorTextGuess();
            checkColor();
        }
    }

    // Change the color hexa font to white if the background become too dark
    function colorTextGuess() {
        if (colors_hexa[0] + colors_hexa[1] + colors_hexa[2] < 180) {
            color_guess.style.color = "white";
        } else {
            color_guess.style.color = "black";
        }
    }

    // Check if the colors are the same on the right and left
    function checkColor() {
        const rgb_back = rgb.style.backgroundColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(value => parseInt(value, 10));

        for (let i = 0; i < rgb_back.length; i ++) {
            if (!(rgb_back[i] < colors_hexa[i] + 5) || !(rgb_back[i] > colors_hexa[i] - 5)) {
                break;
            }

            if (i === rgb_back.length - 1) {
                checkWin();
            }   
        }
    }

    function checkWin() {
        color_guess.innerHTML = '&#10004;';
        authorized = false;
        setTimeout(function() {
            authorized = true;
            if (colors.length === 0) {
                win();
            } else {
                setBackground();
            }
        }, 2000)
    }

    function win() {
        document.querySelector('.win').style.visibility = "visible";
        changeCookie(8);
        window.setTimeout(function() { window.location = "../game8/game8.html" }, 2500);
    }

    init();
});