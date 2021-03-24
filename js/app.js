/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
let sections,
    topSection;

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

/**
 * Helper function to return a list of all the sections within the main tag
 * @returns NodeList of sections within the main tag
 */
function getSectionsFromHTML() {
    return document.querySelectorAll('main section');
}

/**
 * Checks the sections within the main tag and returns the one at the top of the view port
 * @returns section at the top of the view port 
 */
function getTopSection() {
    let min, topSection;

    // takes navbar height into consideration
    const navHeight = document.querySelector('nav').offsetHeight;

    // loop through all sections and set topSection to the one with the minimum distance from the top
    for (let section of sections) {
        const boundingRect = section.getBoundingClientRect();
        if ((min === undefined && boundingRect.y > 0) || (boundingRect.y + navHeight >= 0 && boundingRect.y + navHeight < min)) {
            min = boundingRect.y + navHeight;
            topSection = section;
        }
    }
    return topSection;
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
/**
 * Builds the navigation bar's unordered list
 */
function buildNav() {

    // creates an HTML fragment to improve performance
    const fragment = document.createDocumentFragment();

    // loops through all the sections and adds a hyperlinked list item to the navbar corrosponding to every section 
    for (let section of sections) {
        const sectionElement = document.createElement('li');
        sectionElement.textContent = section.dataset.nav;
        sectionElement.id = `${section.id}_item`;

        const anchorElement = document.createElement('a');
        anchorElement.appendChild(sectionElement);
        anchorElement.href = `#${section.id}`;
        anchorElement.id = `${section.id}_link`;
        anchorElement.className = 'menu__link';

        fragment.appendChild(anchorElement);
    }

    document.querySelector('header nav ul#navbar__list').appendChild(fragment);
}


// Add class 'active' to section when near top of viewport

/**
 * updates the sections' classes according to which section is currently on the top
 */
function updateActiveSection() {
    const newTopSection = getTopSection();
    if (topSection) {
        if (newTopSection && newTopSection.id === topSection.id) return;
        topSection.classList.remove('your-active-class');
    }
    topSection = newTopSection;
    if (topSection)
        topSection.classList.add('your-active-class');
}


// Scroll to anchor ID using scrollTO event

/**
 * when list item is pressed this function is calles to scroll to the corrosponding section 
 */
function scrollToSection(evt) {
    evt.preventDefault();
    const sectionElement = document.querySelector(`#${evt.target.id.split('_')[0]}`);
    sectionElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
    });
}

// Scroll to top function
function scrollToTop() {
    const rootElement = document.documentElement;
    rootElement.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
}

function handleScroll() {
    const rootElement = document.documentElement;
    let scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;
    if ((rootElement.scrollTop / scrollTotal) > 0.6) {
        document.getElementById('scrollToTopBtn').classList.add('showBtn');
    } else {
        document.getElementById('scrollToTopBtn').classList.remove('showBtn');
    }
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// sets sections to a list of the sections in the page and then builds the nav bar
sections = getSectionsFromHTML();
buildNav();

// Scroll to section on link click

// adds an event listener to the navbar
document
    .querySelector('header nav ul#navbar__list')
    .addEventListener('click', scrollToSection);

// Set sections as active

// adds an event listener to the document to update the active section on scrolling
topSection = sections[0];
document.addEventListener('scroll', updateActiveSection);

// scroll to top button logic

let scrollToTopBtn = document.getElementById('scrollToTopBtn');
scrollToTopBtn.addEventListener('click', scrollToTop);

document.addEventListener('scroll', handleScroll);

