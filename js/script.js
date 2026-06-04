const container = document.querySelector('.container');
container.focus();

document.querySelector("footer p").textContent = `© ${new Date().getFullYear()} Ismael Delgado Sancho`;

//--each section will fade in when it enters the viewport
const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            obs.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

//--script enables smooth scrolling when clicking on anchor links
document.addEventListener('wheel', function (e) {
    e.preventDefault();
    const container = document.querySelector('.container');
    container.scrollBy({
        top: e.deltaY,
        behavior: 'smooth'
    });
}, { passive: false });

//------carrousell-----
const track = document.querySelector(".carousel-track");

let current = 0;
let projects = [];

//---fecth the json and builds the project card-----
fetch("./projects.json")
    .then(res => res.json())
    .then(projects => {

        track.innerHTML = projects.map((project, index) => `
            <div class="project-card ${index === 0 ? "active" : ""}">

                <div class="project-gallery">
                    <img class="project-main-img" src="${project.images[0]}" alt="${project.title}">

                    <div class="project-thumbs">
                        <img src="${project.images[1]}" alt="${project.title}">
                        <img src="${project.images[2]}" alt="${project.title}">
                    </div>
                </div>

                <div class="project-content">
                    <h3>${project.title}</h3>
                    <h4>${project.tech}</h4>
                    <p>${project.description}</p>

                    <ul>
                        ${project.features.map(f => `<li>${f}</li>`).join("")}
                    </ul>

                    <a href="${project.github}" target="_blank" class="project-link">
                        View on GitHub
                    </a>
                </div>

            </div>
        `).join("");

        initializeCarousel()
    });


//---add function to the carrousell btn----
function initializeCarousel() {

    const cards = document.querySelectorAll(".project-card");
    
    document.querySelector(".next")
        .addEventListener("click", () => {
            cards[current].classList.remove("active");
            current = (current + 1) % cards.length;
            cards[current].classList.add("active");
        });

    document.querySelector(".prev")
        .addEventListener("click", () => {
            cards[current].classList.remove("active");
            current = (current - 1 + cards.length) % cards.length;
            cards[current].classList.add("active");
        });
}
