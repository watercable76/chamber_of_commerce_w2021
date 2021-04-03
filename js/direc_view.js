
var elements = document.getElementsByClassName('gallery_images');
console.log(elements);
var stuff = document.getElementsByClassName('cards')[0];

var medium = 32.5 * 16;
var large = 60 * 16;

// set the sizing of the directory page and the outline based off of the buttons
function listView() {
    // for (let i = 0; i < elements.length; i++) {
    //     elements[i].style.gridTemplateColumns = '1fr';
    //     // console.log(i);
    // }
    var stuff = document.getElementsByClassName('cards')[0];
    // stuff.style.gridTemplateColumns = '1fr 1fr 1fr';
    for (let i = 0; i < elements.length; i++) {
        elements[i].setAttribute('class', 'gallery_images');
        elements[i].classList.remove('directory_cards');
        // if screen bigger than 32.5em, set 5 columns. if bigger than 60em, set 9 cols
        // if (screen.width > medium) {
        //     stuff.style.gridTemplateColumns = '1fr 1fr 1fr 1fr 1fr';
        // } else if (screen.width > large) {
        //     stuff.style.gridTemplateColumns = '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr';
        // } else {
        //     stuff.style.gridTemplateColumns = '1fr 1fr';
        // }
        
    }
}

// set the gallery view for the items
function galleryView() {
    var stuff = document.getElementsByClassName('gallery_images')[0];
    for (let i = 0; i < elements.length; i++) {
        elements[i].setAttribute('class', 'directory_cards');
        elements[i].classList.remove('gallery_images');
        // if screen bigger than 32.5em, set 5 columns. if bigger than 60em, set 9 cols
        // if (screen.width > medium) {
        //     stuff.style.gridTemplateColumns = '1fr 1fr 1fr 1fr 1fr';
        // } else if (screen.width > large) {
        //     stuff.style.gridTemplateColumns = '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr';
        // } else {
        //     stuff.style.gridTemplateColumns = '1fr 1fr';
        // }
        
    }
}