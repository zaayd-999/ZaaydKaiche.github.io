function clearAllActive() {
    for (let selector of document.querySelectorAll(".active")) {
        selector.removeAttribute("class", "active");
    }
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            clearAllActive();
            this.setAttribute("class", "active");
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

window.onload = () => {
    document.getElementById('langToggle').click();
}

document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    highlightCurrentSection();
    window.addEventListener('scroll', highlightCurrentSection);
    function highlightCurrentSection() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
                if (current == "about2") current = "about";
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
});


const langToggle = document.getElementById('langToggle');
let currentLang = document.documentElement.lang;

function initializeContent() {
    currentLang = document.documentElement.lang;
    document.querySelectorAll('[data-tr]').forEach(element => {
        const key = element.getAttribute('data-tr');
        element.textContent = translations[currentLang][key];
    });
    //////////////////////////////////////////////////////////////////////////////////////////////////////
    document.querySelector('.hero h1').textContent = translations[currentLang].heroTitle;
    document.querySelector('.hero p').textContent = translations[currentLang].heroSubTitle;
    document.querySelector('#about h2').textContent = translations[currentLang].aboutTitle;
    document.querySelector('.about-text p').textContent = translations[currentLang].aboutText;
    document.querySelector('#skills h2').textContent = translations[currentLang].skillsTitle;
    document.querySelector('#projects h2').textContent = translations[currentLang].projectsTitle;
    document.querySelector('footer p').innerHTML = `${translations[currentLang].copyright} &copy; ${new Date().getFullYear()} ZAAYD KAICHE`;
    //////////////////////////////////////////////////////////////////////////////////////////////////////
    let about2Skillsp = document.querySelectorAll('#about2.skills p');
    let about2Skillsh3 = document.querySelectorAll('#about2.skills h3');
    let i = 0;
    for(let i = 0 ; i< about2Skillsp.length ; i++){
        about2Skillsp[i].textContent = translations[currentLang].aboutStats[i].value;
    }
    i=0;
    for(let i = 0 ; i< about2Skillsh3.length ; i++){
        about2Skillsh3[i].textContent = translations[currentLang].aboutStats[i].title;
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////
    let skillsp = document.querySelectorAll("#skills .skill-card p");
    let skillsh3 = document.querySelectorAll("#skills .skill-card h3");
    i = 0;
    for(let i = 0 ; i< skillsp.length ; i++){
        skillsp[i].textContent = translations[currentLang].skillsCards[i].description;
    }
    i=0;
    for(let i = 0 ; i< about2Skillsh3.length ; i++){
        skillsh3[i].textContent = translations[currentLang].skillsCards[i].title;
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////
    const projectsGrid = document.querySelector('.projects-grid');
    projectsGrid.innerHTML = translations[currentLang].projectsCards.map(project => `
            <div class="project-card">
                <img src="${project.image}" alt="${project.title}">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <a ${project.link ? `href="${project.link}" target="_blank"` : ``} class="project-link ${project.link ? `` : `dis-btn`}">${project.link ? translations[currentLang].projectLinkText : translations[currentLang].projectFixText}</a>
            </div>
    `).join('');
}
document.addEventListener('DOMContentLoaded', initializeContent);

function updateLanguage() {
    document.documentElement.lang = (document.documentElement.lang == "en" ? "fr" : "en");
    initializeContent();
}

document.getElementById('langToggle').addEventListener('click', () => {
    updateLanguage();
    document.getElementById('langToggle').innerHTML = `<i class="fas fa-globe"></i>${document.documentElement.lang.toUpperCase()}`;
});