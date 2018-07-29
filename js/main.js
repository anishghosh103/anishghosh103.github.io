let scrollTimer = null;
let dontScroll = false;
let lastScrollPosition = 0;

(function () {

  let skillShown = false;

  let createDiv = function (appendTo, className, text, style) {
    const div = document.createElement('div');
    if (className) {
      div.className = className;
    }
    if (text) {
      div.innerText = text;
    }
    if (style) {
      Object.keys(style).forEach(function (key) {
        div.style[key] = style[key];
      });
    }
    if (appendTo) {
      appendTo.appendChild(div);
    }
    return div;
  };

  particlesJS('particles-js', particles);

  let bars = document.getElementsByClassName('bar');
  [].forEach.call(bars, function (bar) {
    let skill = bar.dataset.skill;
    let value = bar.dataset.value;
    createDiv(bar, 'skill w-24 flex justify-center items-center py-1 px-2 rounded text-small font-bold', skill);
    createDiv(
      createDiv(bar, 'percentage flex-1 h-4 mt-1 bg-grey-lighter rounded-r overflow-hidden'),
      'value h-full ', null
    );
  });

  const grid = document.getElementById('grid');
  projects.forEach((project, i) => {
    const groups = project.groups.join(' ');
    const html = `
    <div class="project relative cursor-pointer ${groups}" onclick="showProject(${i})">
      <figure class="w-full h-full">
        <img class="w-full h-full" src="${project.imgSrc || 'https://via.placeholder.com/400x400'}" alt="Movie Explorer">
      </figure>
      <div class="content absolute pin-t pin-l w-full h-full p-12 bg-black text-white flex justify-center items-center">
        <span class="source-sans-pro font-bold text-xl text-center">
          ${project.name}
        </span>
      </div>
    </div>
    `;
    grid.innerHTML += html;
  });

  document.querySelectorAll('.page-link').forEach(link => {
    const dest = '.' + link.dataset.dest;
    link.addEventListener('click', () => {
      window.scroll({
        top: document.querySelector(dest).offsetTop,
        left: 0,
        behavior: 'smooth'
      });
      toggleNav();
    });
  });

  window.onscroll = function (event) {
    if (dontScroll) {
      window.scrollTo(0, lastScrollPosition);
      return;
    }
    lastScrollPosition = window.scrollY;
    showSkills();
    updateNavbar();
  };

  function showSkills() {
    if (skillShown) { return; }
    const skills = document.getElementById('skills');
    let skillTop = skills.offsetTop  - 2 * skills.scrollHeight;
    if (window.scrollY >= skillTop) {
      skillShown = true;
      (function showBar(index) {
        if (index >= bars.length) {
          return;
        }
        let value = bars[index].dataset.value;
        bars[index].children[1].children[0].style.width = value + '%';
        setTimeout(function () {
          showBar(index + 1);
        }, 25);
      })(0);
    }
  }
  
  function updateNavbar() {
    const header = document.querySelector('header');
    const about = document.querySelector('.about');
    const projects = document.querySelector('.projects');
    const contact = document.querySelector('.contact');
    if (window.scrollY >= about.offsetTop) {
      header.classList.add('show');
    } else {
      header.classList.remove('show');
    }
    const links = document.querySelectorAll('.page-link');
    links.forEach(link => link.classList.remove('active'));
    const centerY = window.scrollY + window.innerHeight / 2;
    if (centerY < about.offsetTop) {
      link = links[0];
    } else if (centerY < projects.offsetTop) {
      link = links[1];
    } else if (centerY < contact.offsetTop) {
      link = links[2];
    } else {
      link = links[3];
    }
    link.classList.add('active');
  }

  // Shuffle
  (function () {
    const filterOptions = document.querySelectorAll('#filters a');
    const iso = new Isotope('#grid', {
      itemSelector: '.project',
      layoutMode: 'fitRows'
    });
    filterOptions.forEach((btn, i) => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        let filter = btn.dataset.filter;
        filter = filter === '*' ? filter : '.' + filter;
        iso.arrange({ filter });
        filterOptions.forEach(b => {
          b.classList.remove('active');
        });
        btn.classList.add('active');
      });
    });
  })();

  updateNavbar();

})();

function scrollToAbout() {
  window.scroll({
    top: document.querySelector('.about').offsetTop,
    left: 0,
    behavior: 'smooth'
  });
}

function toggleNav() {
  const nav = document.querySelector('.nav');
  if (nav.classList.contains('hidden')) {
    nav.classList.remove('hidden');
  } else {
    nav.classList.add('hidden');
  }
}

function showProject(index) {
  dontScroll = true;
  const project = projects[index];
  const details = document.querySelector('.project-details');
  details.querySelector('figure').style.backgroundImage = `url('${project.imgSrc}')`;
  const link = details.querySelector('figure').querySelector('a');
  link.href = project.url;
  details.querySelector('.title').innerHTML = project.name;
  details.querySelector('.subtitle').innerHTML = project.groups.join(', ');
  details.querySelector('.description').innerHTML = project.description || '';
  details.style.display = 'block';
}

function hideProjectDetails() {
  document.querySelector('.project-details').style.display = 'none';
  dontScroll = false;
}