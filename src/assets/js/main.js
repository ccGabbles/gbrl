const themes = ['orange', 'red', 'pink', 'blue', 'purple', 'green'];
if (localStorage.previousTheme) {
    themes.splice(themes.indexOf(localStorage.getItem("previousTheme")), 1);
}

const randomTheme = themes[Math.floor(Math.random() * themes.length)];
localStorage.setItem("previousTheme", randomTheme);

document.body.classList.add(randomTheme);