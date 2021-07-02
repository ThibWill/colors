const cookie_name = "level=";

// Redirect the user to the game he has to play
function redirect(current_level) {
    if (!document.cookie.split(';').some((cookie) => cookie.trim().startsWith(cookie_name))) {
        window.location.href = "../index.html";
    } 

    document.cookie.split(';').forEach(function(cookie) {
        if (cookie.includes(cookie_name) && !cookie.includes(current_level)) {
            const level_redirect = cookie.substring(cookie_name.length, cookie.length);
            window.location.href = `../game${level_redirect}/game${level_redirect}.html`;
        }
    });
}

// Save progression
function changeCookie(level) {
    document.cookie = cookie_name + level + "; path=/";
}