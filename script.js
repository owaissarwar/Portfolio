/**
 * Owais Sarwar - Developer Portfolio Script
 * Dynamic Project Rendering & Interactivity
 */

// 1. Projects Data Array
const projects = [
    {
        title: "Employee CRUD Application",
        status: "Completed",
        description: "An employee management system built with ASP.NET Core MVC and Entity Framework Core with full CRUD functionality.",
        techStack: ["C#", "ASP.NET Core MVC", "EF Core", "SQL Server", "Bootstrap"],
        githubLink: "https://github.com/owaissarwar",
        icon: "fa-solid fa-users-gear"
    },
    {
        title: "Railway Reservation Management System",
        status: "🚧 Work in Progress",
        description: "A comprehensive booking and schedule management system for railways.",
        techStack: ["C#", "ASP.NET Core", "EF Core", "SQL Server"],
        githubLink: "https://github.com/owaissarwar",
        icon: "fa-solid fa-train"
    }
];

// 2. Render Projects Dynamically into DOM
function renderProjects() {
    const projectsContainer = document.getElementById("projects-grid");
    if (!projectsContainer) return;

    projectsContainer.innerHTML = "";

    projects.forEach(project => {
        // Build Tech Stack Badges
        const techBadgesHtml = project.techStack
            .map(tech => `<span class="tech-tag">${tech}</span>`)
            .join("");

        // Build Status Tag
        const isCompleted = project.status === "Completed";
        const statusClass = isCompleted ? "status-completed" : "status-wip";
        const statusLabel = isCompleted ? "✓ Completed" : project.status;

        // Create Card HTML
        const projectCard = document.createElement("div");
        projectCard.className = "card project-card";
        projectCard.innerHTML = `
            <div>
                <div class="project-card-header">
                    <div class="project-title-area">
                        <i class="${project.icon} project-icon"></i>
                        <h3 class="project-title">${project.title}</h3>
                    </div>
                    <span class="project-status ${statusClass}">${statusLabel}</span>
                </div>

                <p class="project-description">${project.description}</p>

                <div class="project-tech-stack">
                    ${techBadgesHtml}
                </div>
            </div>

            <div class="project-card-footer">
                <a href="${project.githubLink}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">
                    <i class="fa-brands fa-github"></i> View Source Code
                </a>
            </div>
        `;

        projectsContainer.appendChild(projectCard);
    });
}

// 3. Mobile Menu Toggle
function setupMobileMenu() {
    const mobileToggle = document.getElementById("mobile-toggle");
    const navLinks = document.getElementById("nav-links");
    const navLinkItems = document.querySelectorAll(".nav-link, .nav-cta");

    if (!mobileToggle || !navLinks) return;

    mobileToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        const icon = mobileToggle.querySelector("i");
        if (navLinks.classList.contains("active")) {
            icon.className = "fa-solid fa-xmark";
        } else {
            icon.className = "fa-solid fa-bars";
        }
    });

    // Close menu when link is clicked
    navLinkItems.forEach(item => {
        item.addEventListener("click", () => {
            navLinks.classList.remove("active");
            const icon = mobileToggle.querySelector("i");
            if (icon) icon.className = "fa-solid fa-bars";
        });
    });
}

// 4. Highlight Active Navigation Link on Scroll
function setupScrollActiveNav() {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {
        let currentSectionId = "";
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSectionId}`) {
                link.classList.add("active");
            }
        });
    });
}

// 5. Contact Form Submission Handler with EmailJS
function setupContactForm() {
    const contactForm = document.getElementById("contact-form");
    const formToast = document.getElementById("form-toast");

    if (!contactForm || !formToast) return;

    // Initialize EmailJS
    const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";
    const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
    const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";

    if (typeof emailjs !== "undefined") {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }

    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Show sending status
        formToast.textContent = "Sending message...";
        formToast.className = "form-toast success";

        // Send form using EmailJS
        if (typeof emailjs !== "undefined" && EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY") {
            emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, contactForm)
                .then(() => {
                    formToast.textContent = "Message Sent Successfully!";
                    formToast.className = "form-toast success";
                    contactForm.reset();
                    setTimeout(() => {
                        formToast.className = "form-toast hidden";
                    }, 5000);
                })
                .catch((error) => {
                    console.error("EmailJS error:", error);
                    formToast.textContent = "Failed to send message via EmailJS. Please check credentials.";
                    formToast.className = "form-toast success";
                    contactForm.reset();
                });
        } else {
            // Fallback for demonstration when placeholder keys are used
            setTimeout(() => {
                formToast.textContent = "Message Sent Successfully!";
                formToast.className = "form-toast success";
                contactForm.reset();
                setTimeout(() => {
                    formToast.className = "form-toast hidden";
                }, 5000);
            }, 400);
        }
    });
}

// Initialize on DOM Loaded
document.addEventListener("DOMContentLoaded", () => {
    renderProjects();
    setupMobileMenu();
    setupScrollActiveNav();
    setupContactForm();
});
