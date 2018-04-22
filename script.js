
let navItems = document.querySelectorAll('.nav-item');
let cbMenu = document.querySelector("#cb-menu");

for (let item of navItems) {
	item.addEventListener("click", e => {
		cbMenu.checked = !cbMenu.checked;
	});
}