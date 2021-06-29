const COLORS = ["#FF00A7", "#0028FF", "#00FF58", "#FFD700", "#FFA500"];

document.addEventListener('DOMContentLoaded', function() {
    const panels = document.querySelectorAll('.panel');
    function initialize() {
        let numPanel = 0;
        // Initialize
        panels.forEach(function(panel) {
            panel.style.left = `${-25 + numPanel * 25}%`;
            panel.style.background = COLORS[numPanel];
            numPanel++;
        });
    }
    
    function movePanels() {
        panels.forEach(function(panel) {
            panel.style.left = `calc(${panel.style.left} + 1px)`;
            // Panel reached the end
            if (panel.getBoundingClientRect().left > window.innerWidth) {
                // Return the panel to the start
                panel.style.left = `calc(${panel.style.left} - ${window.innerWidth}px - ${window.innerWidth/4}px)`;
            }        
        });
        window.requestAnimationFrame(movePanels);
    }

    initialize();
    window.addEventListener('resize', initialize);
    window.requestAnimationFrame(movePanels);
});