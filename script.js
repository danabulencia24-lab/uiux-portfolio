/* =====================================================
   NAVBAR
===================================================== */

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", function () {

    if (window.scrollY > 40) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});


/* =====================================================
   ELEMENTS
===================================================== */

const overlay = document.getElementById("caseOverlay");

const closeCaseButton =
    document.getElementById("closeCase");


/* =====================================================
   SMOOTH SCROLL NAVIGATION
===================================================== */

document
    .querySelectorAll("[data-scroll]")
    .forEach(function (element) {

        element.addEventListener("click", function (event) {

            event.preventDefault();

            const targetId =
                element.getAttribute("data-scroll");

            const target =
                document.getElementById(targetId);

            if (!target) {
                return;
            }

            /*
             * If a case study is currently open,
             * close it first.
             */

            closeOverlay(false);


            /*
             * Scroll to requested section.
             */

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


/* =====================================================
   OPEN CASE STUDY
===================================================== */

const caseButtons =
    document.querySelectorAll(".btn-case");

caseButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        /*
         * Get the project ID.
         *
         * Example:
         * data-case="fitness"
         */

        const caseId =
            button.getAttribute("data-case");


        /*
         * Hide every case study.
         */

        document
            .querySelectorAll(".case-content")
            .forEach(function (caseContent) {

                caseContent.classList.remove("active");

            });


        /*
         * Find the matching case study.
         */

        const selectedCase =
            document.querySelector(
                '[data-case-content="' +
                caseId +
                '"]'
            );


        /*
         * If the case study exists,
         * display it.
         */

        if (selectedCase) {

            selectedCase.classList.add("active");

        } else {

            console.error(
                "Case study not found:",
                caseId
            );

            return;

        }


        /*
         * Open overlay.
         */

        overlay.classList.add("open");

        overlay.setAttribute(
            "aria-hidden",
            "false"
        );


        /*
         * Prevent the main website
         * from scrolling.
         */

        document.body.classList.add(
            "lock-scroll"
        );


        /*
         * Start case study at top.
         */

        overlay.scrollTop = 0;

    });

});


/* =====================================================
   CLOSE CASE STUDY
===================================================== */

function closeOverlay(scrollToWork = true) {

    overlay.classList.remove("open");

    overlay.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove(
        "lock-scroll"
    );


    /*
     * Remove active case.
     */

    document
        .querySelectorAll(".case-content")
        .forEach(function (caseContent) {

            caseContent.classList.remove("active");

        });


    /*
     * Return to Work section.
     */

    if (scrollToWork) {

        const workSection =
            document.getElementById("work");

        if (workSection) {

            setTimeout(function () {

                workSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }, 100);

        }

    }

}


/* =====================================================
   CLOSE BUTTON
===================================================== */

closeCaseButton.addEventListener(
    "click",
    function () {

        closeOverlay(true);

    }
);


/* =====================================================
   ESC KEY
===================================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            if (
                overlay.classList.contains("open")
            ) {

                closeOverlay(true);

            }

        }

    }
);


/* =====================================================
   CLICK OUTSIDE CASE PANEL
===================================================== */

overlay.addEventListener(
    "click",
    function (event) {

        /*
         * Only close if the user clicks
         * the dark overlay itself.
         */

        if (event.target === overlay) {

            closeOverlay(true);

        }

    }
);


/* =====================================================
   PREVENT CASE PANEL CLICKS FROM CLOSING
===================================================== */

const casePanel =
    document.querySelector(".case-panel");

casePanel.addEventListener(
    "click",
    function (event) {

        event.stopPropagation();

    }
);


/* =====================================================
   IMAGE ERROR HANDLING
===================================================== */

document
    .querySelectorAll("img")
    .forEach(function (image) {

        image.addEventListener(
            "error",
            function () {

                console.warn(
                    "Image could not be loaded:",
                    image.src
                );

            }
        );

    });


/* =====================================================
   CONTACT BUTTON
===================================================== */

const contactButtons =
    document.querySelectorAll(
        ".nav-cta, .contact-section .btn-primary"
    );

contactButtons.forEach(function (button) {

    /*
     * The navigation contact button is
     * already handled by data-scroll.
     *
     * The contact "Say hello" button is
     * an email link, so we don't override it.
     */

    button.addEventListener(
        "mouseenter",
        function () {

            button.style.cursor = "pointer";

        }
    );

});


/* =====================================================
   PAGE LOADED
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        /*
         * Make sure no case study is open
         * when the page initially loads.
         */

        overlay.classList.remove("open");

        document.body.classList.remove(
            "lock-scroll"
        );

    }
);