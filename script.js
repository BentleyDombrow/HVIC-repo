let resizeTimeout;
const underSpan = document.querySelector('.under');
const constructionSpan = document.querySelector('.construction');

function adjustTextSizes() {
    // Store current scroll position
    const scrollPosition = window.pageYOffset;

    // Target width for UNDER (1/3 of viewport width)
    const targetWidth = window.innerWidth / 3;

    // Adjust UNDER size
    let underSize = binarySearch(underSpan, targetWidth);
    underSpan.style.fontSize = `${underSize}px`;

    // Adjust CONSTRUCTION size
    let constructionSize = binarySearch(constructionSpan, underSpan.offsetWidth);
    constructionSpan.style.fontSize = `${constructionSize}px`;

    // Restore scroll position
    window.scrollTo(0, scrollPosition);
}

function binarySearch(element, targetWidth) {
    let min = 1;
    let max = 1000; // Arbitrary large number
    let mid;

    while (max - min > 0.5) {
        mid = (min + max) / 2;
        element.style.fontSize = `${mid}px`;
        
        if (element.offsetWidth < targetWidth) {
            min = mid;
        } else {
            max = mid;
        }
    }

    return min;
}

function debouncedResize() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(adjustTextSizes, 250);
}

// Run on load
window.addEventListener('load', adjustTextSizes);

// Run on resize, with debounce
window.addEventListener('resize', debouncedResize);