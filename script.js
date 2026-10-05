/* =====================================================
   NEXORA
   Website JavaScript
===================================================== */


/* ================= MOBILE NAV ================= */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        navMenu.classList.toggle("active");

        const icon = menuToggle.querySelector("i");

        if (navMenu.classList.contains("active")) {

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });


    /* Close mobile menu after clicking */

    navMenu.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("active");

            const icon = menuToggle.querySelector("i");

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        });

    });

}


/* ================= NAVBAR SCROLL ================= */

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 30) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});


/* ================= CURRENT YEAR ================= */

const currentYear = document.getElementById("currentYear");

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* ================= TOAST ================= */

function showToast(message) {

    const toast = document.getElementById("toast");
    const toastMessage = document.getElementById("toastMessage");

    if (!toast || !toastMessage) return;

    toastMessage.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 3500);

}


/* ================= CONTACT FORM ================= */

const contactForm =
    document.getElementById("contactForm");


if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const country =
            document.getElementById("country").value;

        const phone =
            document.getElementById("phone").value.trim();

        const business =
            document.getElementById("business").value.trim();

        const requirement =
            document.getElementById("requirement").value;

        const message =
            document.getElementById("message").value.trim();


        /* Basic validation */

        if (!name || !email || !country || !requirement) {

            showToast(
                "Please complete all required fields."
            );

            return;

        }


        /* Email validation */

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            showToast(
                "Please enter a valid email address."
            );

            return;

        }


        /*
            Replace this with your actual WhatsApp number.

            Example:
            const whatsappNumber = "919876543210";
        */

        const whatsappNumber =
            "61404919786";


        const whatsappMessage =

`Hello Nexora,

I would like to discuss a project.

Name: ${name}

Email: ${email}

Country: ${country}

Phone: ${phone || "Not provided"}

Business Name: ${business || "Not provided"}

Requirement: ${requirement}

Project Details:
${message || "Not provided"}

Thank you.`;


        const whatsappURL =

            "https://wa.me/" +
            whatsappNumber +
            "?text=" +
            encodeURIComponent(whatsappMessage);


        window.open(
            whatsappURL,
            "_blank"
        );


        showToast(
            "Opening WhatsApp..."
        );


        contactForm.reset();

    });

}


/* ================= REVIEW SYSTEM ================= */


/*
    IMPORTANT:

    This is a front-end review system.

    Reviews are saved in the visitor's browser
    using localStorage.

    That means this is suitable for testing/design.

    For a REAL public review system where one
    customer's review appears for everyone,
    you will later need a database/backend.
*/


const reviewForm =
    document.getElementById("reviewForm");

const reviewsContainer =
    document.getElementById("reviewsContainer");

const reviewRating =
    document.getElementById("reviewRating");


/* ================= STAR RATING ================= */

const ratingButtons =
    document.querySelectorAll(
        ".rating-selector button"
    );


ratingButtons.forEach(button => {

    button.addEventListener("click", () => {

        const selectedRating =
            Number(button.dataset.rating);


        reviewRating.value =
            selectedRating;


        ratingButtons.forEach(star => {

            const starRating =
                Number(star.dataset.rating);

            if (starRating <= selectedRating) {

                star.classList.add("active");

            } else {

                star.classList.remove("active");

            }

        });

    });

});


/* ================= SAVE REVIEW ================= */

if (reviewForm) {

    reviewForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document
                    .getElementById("reviewName")
                    .value
                    .trim();


            const role =
                document
                    .getElementById("reviewRole")
                    .value
                    .trim();


            const rating =
                Number(reviewRating.value);


            const message =
                document
                    .getElementById("reviewMessage")
                    .value
                    .trim();


            if (!name || !message) {

                showToast(
                    "Please enter your name and review."
                );

                return;

            }


            if (rating === 0) {

                showToast(
                    "Please select a rating."
                );

                return;

            }


            const newReview = {

                name: name,

                role:
                    role || "Nexora Client",

                rating: rating,

                message: message,

                date:
                    new Date().toISOString()

            };


            const existingReviews =
                JSON.parse(
                    localStorage.getItem(
                        "nexoraReviews"
                    )
                ) || [];


            existingReviews.push(
                newReview
            );


            localStorage.setItem(
                "nexoraReviews",
                JSON.stringify(
                    existingReviews
                )
            );


            /*
                For now the review is displayed
                locally.

                Later this can be replaced with
                a real database submission.
            */

            addReviewToPage(
                newReview
            );


            reviewForm.reset();

            reviewRating.value = 0;


            ratingButtons.forEach(star => {

                star.classList.remove("active");

            });


            showToast(
                "Thank you for your review!"
            );

        }

    );

}


/* ================= DISPLAY REVIEW ================= */

function addReviewToPage(review) {

    if (!reviewsContainer) return;


    const article =
        document.createElement("article");


    article.className =
        "review-card";


    const stars =
        "★".repeat(review.rating) +
        "☆".repeat(5 - review.rating);


    const firstLetter =
        review.name
            .charAt(0)
            .toUpperCase();


    article.innerHTML = `

        <div class="review-stars">
            ${stars}
        </div>

        <p>
            “${escapeHTML(review.message)}”
        </p>

        <div class="review-author">

            <div class="author-avatar">
                ${escapeHTML(firstLetter)}
            </div>

            <div>

                <strong>
                    ${escapeHTML(review.name)}
                </strong>

                <span>
                    ${escapeHTML(review.role)}
                </span>

            </div>

        </div>

    `;


    reviewsContainer.appendChild(
        article
    );

}


/* ================= LOAD SAVED REVIEWS ================= */

function loadSavedReviews() {

    const savedReviews =
        JSON.parse(
            localStorage.getItem(
                "nexoraReviews"
            )
        ) || [];


    savedReviews.forEach(review => {

        addReviewToPage(
            review
        );

    });

}


/* ================= HTML SAFETY ================= */

function escapeHTML(value) {

    const div =
        document.createElement("div");

    div.textContent =
        value;

    return div.innerHTML;

}


loadSavedReviews();


/* ================= SCROLL REVEAL ================= */

const revealElements =
    document.querySelectorAll(
        ".service-card, .work-card, .process-item, .review-card, .why-point, .student-item"
    );


const observer =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(25px)";

    element.style.transition =
        "opacity 0.6s ease, transform 0.6s ease";

    observer.observe(element);

});


/* ================= SMOOTH ANCHOR OFFSET ================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(anchor => {

        anchor.addEventListener(
            "click",
            function (event) {

                const targetID =
                    this.getAttribute("href");

                if (
                    targetID === "#" ||
                    !targetID
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        targetID
                    );


                if (!target) return;


                event.preventDefault();


                const navbarHeight =
                    navbar
                        ? navbar.offsetHeight
                        : 0;


                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    navbarHeight;


                window.scrollTo({

                    top: targetPosition,

                    behavior: "smooth"

                });

            }
        );

    });