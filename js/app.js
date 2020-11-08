//Start: Global variables
const navbar = document.querySelector("#navbar__list");
const sections = Array.from(document.querySelectorAll(`[data-nav~="Section"]`));
const pageHeader = document.querySelector("#page__header");
let tick = false; //Variable used to throttle scroll event.
let isScrolling;
//End: Global Variables


//Start: Helper Functions
const highlightElements = (section) => {
    section.classList.add("your-active-class");

    //Grabing the section's number and using it as an index to highlight its item in the navigation bar.
    let sectionNum = section.getAttribute("data-nav").split(" ")[1];
    navbar.children[sectionNum - 1].setAttribute("id", "active-navItem");
}

const removeHighlight = (section) => {
    section.classList.remove("your-active-class");

    //Grabing the section's number and using it as an index to remove the highlight from its item in the navigation bar.
    let sectionNum = section.getAttribute("data-nav").split(" ")[1];
    navbar.children[sectionNum - 1].removeAttribute("id");
}

const scrollToSection = (event) => {
    let sectionNum = event.target.textContent.split(" ")[1];
    sections[sectionNum - 1].scrollIntoView();
}

const isElementInViewport = (element) => {
    const bounding = element.getBoundingClientRect();
    return (
        bounding.top >= 0 && bounding.left >= 0 &&
        bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)
        && bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
//End: Helper Functions


// build the navigation bar
for (let i = 1; i <= sections.length; i++) {
    const li = document.createElement('li');
    li.textContent = `Section ${i}`;
    navbar.appendChild(li);
    li.addEventListener("click", scrollToSection)
}


//Start: Main events and functions

window.addEventListener('scroll', () => {
    
    //Throttling the scroll event using setTimeout() because the event fires at a very high rate.
    if (!tick) {
        setTimeout(() => {
            //Check if any section is within the boundaries of the viewport.
            sections.forEach(section => {
                if (isElementInViewport(section)) highlightElements(section);
                else removeHighlight(section);
            })
            tick = false;
        }, 100);
    }
    tick = true;

    // Clear our timeout throughout the scroll
    window.clearTimeout(isScrolling);

    // Set a timeout to run after scrolling ends
    isScrolling = setTimeout(() => {
        // Run the callback
        pageHeader.classList.add("page__header_hide");
    }, 2000);

    pageHeader.classList.remove("page__header_hide");

}, false);

//End: Main events and functions


