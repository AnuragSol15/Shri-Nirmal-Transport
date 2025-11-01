<<<<<<< HEAD
// JavaScript file (script.js)

document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.getElementById('menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuLinks = document.querySelectorAll('#mobile-menu a');

    // Toggle the mobile menu visibility
    if (menuButton) {
        menuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Hide the menu after clicking a link (for smooth scrolling/navigation)
    mobileMenuLinks.forEach(item => {
        item.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
        });
    });
=======
// JavaScript file (script.js)

document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.getElementById('menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuLinks = document.querySelectorAll('#mobile-menu a');

    // Toggle the mobile menu visibility
    if (menuButton) {
        menuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Hide the menu after clicking a link (for smooth scrolling/navigation)
    mobileMenuLinks.forEach(item => {
        item.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
        });
    });
>>>>>>> a9e0fa41b725f1fc84bf7632a7c7bf18d26235ab
});