// Navigation global variable
const nav = document.getElementById('navbar__list');

// Sections global variable
const allSections = document.querySelectorAll('section');

/**
 * Helper Functions
 */

// This function will create the nav__links
const createNavLinks = (listItem) => {
  return `<a class="menu__link" href="#${listItem.id}">${listItem.dataset.nav}</a>`;
};

// Checks if each section is within the viewport parameters
const getViewPortMeasurements = (section) => {
  // using .getBoundingClientRect() as reference to detecting the section
  const forBoundingClient = section.getBoundingClientRect();
  return (
    forBoundingClient.top >= -200 &&
    forBoundingClient.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) + 200
  );
};

/**
 * Main Functions
 */

// Maps over all sections and returns the entire nav bar
const buildNav = () => {
  // navLinks uses my allSections variable maps over all of the nav links to bring their functionality together
  const navLinks = Array.from(allSections).map(createNavLinks);
  // Every link appends to the nav bar "nav" is also another global variable
  nav.innerHTML = navLinks.join('');
};
// Invokes function to activate it 
buildNav();

// Uses the forEach loop that targets the 'section' class and applies the same viewport principles to each one including new sections that join the class. the getViewPortMeasurements function holds getBoundingClientByRect information. Refer to the helper function up top.
const setActiveSection = () => {
  allSections.forEach((section) => {
    // ternary operator that adds or removes the active class based on section detection as the page scrolls
    getViewPortMeasurements(section)
      ? section.classList.add('your-active-class')
      : section.classList.remove('your-active-class');
  });
};

// Listens for a scroll and uses using setActiveSection as a callback function
window.addEventListener('scroll', setActiveSection);

// When a link in the navbar is clicked, an event is "heard" on the href and triggers a smooth scroll function. Prevent default is used so the functionality won't be disrupted
const scrollToSection = (event) => {
  event.preventDefault();
  // tells event what to listen for
  const targetId = event.target.getAttribute('href');
  const targetSection = document.querySelector(targetId);
  targetSection.scrollIntoView({ behavior: 'smooth' });
};

// Applies this scrollToSection function to all nav links
const navLinks = document.querySelectorAll('.menu__link');
navLinks.forEach((link) => {
  link.addEventListener('click', scrollToSection);
});

setActiveSection;

// Sidenote: Notice that some functions are invoked and some are not. The invoked functions like buildNav() will run at all times. The other functions activate based on the activity of the user on the webpage. Other functions are what I like to call "developer friendly" with automating the designs of new sections that get added to the webpage.
