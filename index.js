const COLORS = ["#FF00A7", "#0028FF", "#00FF58", "#FFD700", "#FF00A7"];

document.addEventListener('DOMContentLoaded', function() {
    const panels = document.querySelectorAll('.panel');
    let numPanel = 0;
    panels.forEach(function(panel) {
        panel.style.left = `${-25 + numPanel * 25}%`;
        panel.style.background = COLORS[numPanel];
        numPanel++;
    });

    function movePanels() {
        panels.forEach(function(panel) {
            panel.style.left = `calc(${panel.style.left} + 1px)`;
            if (panel.getBoundingClientRect().left > window.innerWidth) {
                panel.style.left = `calc(${panel.style.left} - ${window.innerWidth}px - ${window.innerWidth/4}px)`;
                
                // Change Color
                for (let i = 0; i < panels.length; i++) {
                    if (panels[i] === panel) {
                        if(i === 0) {
                            panel.style.background = panels[panels.length - 1].style.background;
                        } else {
                            panel.style.background = panels[i - 1].style.background;
                        }
                        break;
                    }
                }
            }        
        });
        window.requestAnimationFrame(movePanels);
    }

    window.requestAnimationFrame(movePanels);
});