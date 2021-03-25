// looks for all imgs with 'data-src' in their element
const images = document.querySelectorAll('img[data-src]');

function preloadImage(img) {
    const src = img.getAttribute("data-src");
    if (!src) {
        return;
    }
    img.src = src;
    img.removeAttribute('data-src');
}

const imgOptions = {
    threshold: 1,
    rootMargin: "0px 0px -75px 0px"
};

const imgObserver = new IntersectionObserver((entries, imgObserver) => {
    console.log("Data is in transit");
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            preloadImage(entry.target);
            imgObserver.unobserve(entry.target);
        }
    })

}, imgOptions);

images.forEach(image => {
    imgObserver.observe(image);
});


// adjusting the rating for the slider values
function adjustRating(severity) {
    document.getElementById("severity_value").innerHTML = severity;
}