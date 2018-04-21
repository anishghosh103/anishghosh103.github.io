
let btnMenu = document.getElementById('btn-menu');
let navbar = document.getElementsByClassName('navbar');
let navItems = document.getElementsByClassName('nav-item');

btnMenu.addEventListener('click', elem => {
	if(getComputedStyle(navbar[0]).display === "none") {
		navbar[0].style.display = "flex";
	} else {
		navbar[0].style.display = "none";
	}
});

window.addEventListener('resize', event => {
	if (window.innerWidth <= 600) {
		btnMenu.style.display = "block";
		navbar[0].style.display = "none";
	} else {
		btnMenu.style.display = "none";
		navbar[0].style.display = "flex";
	}
});

(function () {
	for (let item of navItems) {
		item.addEventListener('click', (elem) => {
			if (window.innerWidth <= 600) {
				navbar[0].style.display = "none";
			}
		});
	}
})();

if (window.innerWidth <= 600) {
	btnMenu.style.display = "block";
}