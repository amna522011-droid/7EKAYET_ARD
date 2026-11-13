
/* =========================================
   7EKAYET ARD - MAIN JAVASCRIPT
   HTML + CSS + VANILLA JS
========================================= */


/* =========================================
   01. HELPER FUNCTIONS
========================================= */

const getElement = (id) => document.getElementById(id);

const updateText = (id, value) => {
    const element = getElement(id);

    if (element) {
        element.textContent = value;
    }
};


/* =========================================
   02. MOBILE NAVIGATION
========================================= */

const menuToggle = getElement("menuToggle");
const navLinks = getElement("navLinks");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        const isOpen = navLinks.classList.toggle("active");

        menuToggle.setAttribute("aria-expanded", isOpen);

    });

    // Close menu after clicking a link

    navLinks.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");

        });

    });

    // Close menu when clicking outside

    document.addEventListener("click", (event) => {

        if (
            !navLinks.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {

            navLinks.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");

        }

    });

}


/* =========================================
   03. NAVBAR SCROLL EFFECT
========================================= */

const navbar = getElement("navbar");

if (navbar) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {

            navbar.style.boxShadow =
                "0 5px 30px rgba(0,0,0,0.25)";

        } else {

            navbar.style.boxShadow = "none";

        }

    });

}


/* =========================================
   04. STORY INTERACTION
========================================= */

const nextStoryButton = getElement("nextStory");
const storyExtra = getElement("storyExtra");

if (nextStoryButton && storyExtra) {

    nextStoryButton.addEventListener("click", () => {

        storyExtra.hidden = false;

        nextStoryButton.textContent = "الحكاية بدأت...";

        nextStoryButton.disabled = true;

        nextStoryButton.style.opacity = "0.6";

        storyExtra.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    });

}


/* =========================================
   05. GREENHOUSE SIMULATOR
========================================= */

const gasSlider = getElement("gasSlider");

const gasValue = getElement("gasValue");

const heatResult = getElement("heatResult");


function updateGreenhouse() {

    if (!gasSlider) return;

    const value = Number(gasSlider.value);

    // Update displayed percentage

    updateText("gasValue", value + "%");

    // Educational model indicator

    updateText("heatResult", value + "%");

    // Change the visual atmosphere according to slider

    const atmosphere = document.querySelector(".atmosphere-ring");

    const earth = document.querySelector(".greenhouse-earth");

    if (atmosphere) {

        atmosphere.style.boxShadow = `
            0 0 ${10 + value * 0.5}px
            rgba(255,100,46,${0.1 + value / 180}),
            inset 0 0 ${value * 0.3}px
            rgba(255,100,46,0.15)
        `;

        atmosphere.style.borderColor =
            `rgba(255, ${Math.max(80, 184 - value)}, 46, ${0.3 + value / 150})`;

    }

    if (earth) {

        earth.style.filter = `
            drop-shadow(
                0 0 ${15 + value * 0.4}px
                rgba(255,100,46,${0.1 + value / 180})
            )
        `;

    }

}

if (gasSlider) {

    gasSlider.addEventListener("input", updateGreenhouse);

    updateGreenhouse();

}


/* =========================================
   06. CITY SIMULATOR
========================================= */

const energySlider = getElement("energySlider");

const treesSlider = getElement("treesSlider");

const transportSlider = getElement("transportSlider");

const cityVisual = getElement("cityVisual");

const cityScore = getElement("cityScore");

const scoreProgress = getElement("scoreProgress");

const cityMessage = getElement("cityMessage");

const resetCityButton = getElement("resetCity");


function updateCity() {

    if (
        !energySlider ||
        !treesSlider ||
        !transportSlider
    ) return;

    const energy = Number(energySlider.value);

    const trees = Number(treesSlider.value);

    const transport = Number(transportSlider.value);


    // Update slider values

    updateText("energyValue", energy + "%");

    updateText("treesValue", trees + "%");

    updateText("transportValue", transport + "%");


    // Calculate the educational sustainability score

    const score = Math.round(
        energy * 0.4 +
        trees * 0.35 +
        transport * 0.25
    );


    updateText("cityScore", score + "%");


    // Update progress bar

    if (scoreProgress) {

        scoreProgress.style.width = score + "%";

    }


    // Change the city atmosphere

    if (cityVisual) {

        if (score >= 70) {

            cityVisual.style.background =
                "linear-gradient(180deg, #174B63, #237A60)";

        } else if (score >= 40) {

            cityVisual.style.background =
                "linear-gradient(180deg, #31506A, #557B70)";

        } else {

            cityVisual.style.background =
                "linear-gradient(180deg, #583F52, #805447)";

        }


        // Change green spaces appearance

        const treesContainer =
            cityVisual.querySelector(".city-trees");

        if (treesContainer) {

            treesContainer.style.opacity =
                0.35 + (trees / 100) * 0.65;

            treesContainer.style.transform =
                `scale(${0.75 + trees / 400})`;

        }


        // Change factory smoke visibility

        const smoke =
            cityVisual.querySelector(".factory-smoke");

        if (smoke) {

            smoke.style.opacity =
                1 - energy / 100;

            smoke.style.background =
                energy >= 70
                    ? "rgba(182,255,0,0.25)"
                    : "rgba(180,190,200,0.45)";

        }


        // Change car visibility according to sustainable transport

        const car =
            cityVisual.querySelector(".city-road span");

        if (car) {

            car.style.opacity =
                1 - transport / 130;

            car.style.transform =
                `translateX(${transport / 3}px)`;

        }

    }


    // Display a message according to the score

    if (cityMessage) {

        if (score >= 85) {

            cityMessage.textContent =
                "ممتاز! مدينتك بتتجه نحو مستقبل أكثر استدامة. 🌱";

        } else if (score >= 70) {

            cityMessage.textContent =
                "قرارك بيعمل فرق واضح! مدينتك بتتحسن.";

        } else if (score >= 50) {

            cityMessage.textContent =
                "بداية كويسة، لكن لسه فيه فرص لتحسين المدينة.";

        } else if (score >= 30) {

            cityMessage.textContent =
                "مدينتك محتاجة قرارات أفضل للطاقة والطبيعة.";

        } else {

            cityMessage.textContent =
                "المدينة بتواجه تحديات كبيرة. جرّب تغيّر اختياراتك!";

        }

    }

}


// Listen to all city controls

[energySlider, treesSlider, transportSlider].forEach(slider => {

    if (slider) {

        slider.addEventListener("input", updateCity);

    }

});


// Reset city

if (resetCityButton) {

    resetCityButton.addEventListener("click", () => {

        energySlider.value = 50;

        treesSlider.value = 50;

        transportSlider.value = 50;

        updateCity();

    });

}


// Initial city state

updateCity();


/* =========================================
   07. QUIZ DATA
========================================= */

const quizQuestions = [

    {
        question:
            "ما السبب الرئيسي لزيادة الاحتباس الحراري في العصر الحديث؟",

        options: [
            "زيادة انبعاثات الغازات الدفيئة بسبب الأنشطة البشرية",
            "ثقب الأوزون فقط",
            "اختفاء الغابات فقط",
            "تغير المسافة بين الأرض والشمس"
        ],

        correct: 0,

        explanation:
            "حرق الوقود الأحفوري وإزالة الغابات وأنشطة بشرية أخرى زادت تركيز الغازات الدفيئة."
    },

    {
        question:
            "أي غاز من التالي يساهم في الاحتباس الحراري؟",

        options: [
            "الأكسجين فقط",
            "ثاني أكسيد الكربون",
            "الهيليوم",
            "النيون"
        ],

        correct: 1,

        explanation:
            "ثاني أكسيد الكربون من أهم الغازات الدفيئة المرتبطة بالأنشطة البشرية."
    },

    {
        question:
            "ما الوظيفة الأساسية لطبقة الأوزون؟",

        options: [
            "زيادة حرارة الأرض",
            "منع سقوط الأمطار",
            "امتصاص جزء كبير من الأشعة فوق البنفسجية",
            "إنتاج الأكسجين"
        ],

        correct: 2,

        explanation:
            "طبقة الأوزون في الستراتوسفير تمتص جزءًا كبيرًا من الأشعة فوق البنفسجية الضارة."
    },

    {
        question:
            "أي من التالي يُعد من آثار تغير المناخ؟",

        options: [
            "اختفاء الجاذبية",
            "توقف دوران الأرض",
            "اختفاء الفصول تمامًا",
            "ارتفاع مستوى سطح البحر"
        ],

        correct: 3,

        explanation:
            "ذوبان الجليد وتمدد مياه المحيطات مع ارتفاع حرارتها يساهمان في ارتفاع مستوى سطح البحر."
    },

    {
        question:
            "أي اختيار يساعد في بناء مدينة أكثر استدامة؟",

        options: [
            "زيادة الاعتماد على الفحم",
            "زيادة استخدام الطاقة النظيفة والمواصلات المستدامة",
            "قطع الأشجار",
            "زيادة حرق النفايات"
        ],

        correct: 1,

        explanation:
            "الطاقة النظيفة والمواصلات المستدامة والمساحات الخضراء تساعد في تقليل التأثير البيئي."
    }

];


/* =========================================
   08. QUIZ VARIABLES
========================================= */

let currentQuestion = 0;

let quizScore = 0;

let questionAnswered = false;


const quizContainer = getElement("quizContainer");

const quizResult = getElement("quizResult");

const quizQuestion = getElement("quizQuestion");

const quizOptions = getElement("quizOptions");

const quizFeedback = getElement("quizFeedback");

const nextQuestionButton = getElement("nextQuestion");

const restartQuizButton = getElement("restartQuiz");


/* =========================================
   09. LOAD QUIZ QUESTION
========================================= */

function loadQuestion() {

    if (!quizQuestion || !quizOptions) return;

    questionAnswered = false;

    const question = quizQuestions[currentQuestion];


    // Update question number

    updateText(
        "quizQuestionNumber",
        `السؤال ${currentQuestion + 1} من ${quizQuestions.length}`
    );


    // Update progress

    const progress = getElement("quizProgress");

    if (progress) {

        progress.style.width =
            ((currentQuestion + 1) / quizQuestions.length) * 100 + "%";

    }


    // Display question

    quizQuestion.textContent = question.question;


    // Clear old options

    quizOptions.innerHTML = "";


    // Create new option buttons

    question.options.forEach((option, index) => {

        const button = document.createElement("button");

        button.className = "quiz-option";

        button.textContent = option;

        button.dataset.answer = index;

        button.addEventListener("click", () => {

            selectAnswer(index, button);

        });

        quizOptions.appendChild(button);

    });


    // Reset feedback

    if (quizFeedback) {

        quizFeedback.textContent = "";

        quizFeedback.style.color = "";

    }


    // Hide next button

    if (nextQuestionButton) {

        nextQuestionButton.hidden = true;

    }

}


/* =========================================
   10. SELECT QUIZ ANSWER
========================================= */

function selectAnswer(selectedIndex, selectedButton) {

    if (questionAnswered) return;

    questionAnswered = true;

    const question = quizQuestions[currentQuestion];

    const isCorrect = selectedIndex === question.correct;


    // Get all answer buttons

    const buttons =
        quizOptions.querySelectorAll(".quiz-option");


    // Disable all options

    buttons.forEach(button => {

        button.disabled = true;

        const answer = Number(button.dataset.answer);


        // Highlight correct answer

        if (answer === question.correct) {

            button.classList.add("correct");

        }

    });


    // Update score and feedback

    if (isCorrect) {

        quizScore++;

        if (quizFeedback) {

            quizFeedback.textContent =
                "إجابة صحيحة! أحسنت! 🌱 " + question.explanation;

            quizFeedback.style.color = "var(--green)";

        }

    } else {

        selectedButton.classList.add("wrong");

        if (quizFeedback) {

            quizFeedback.textContent =
                "مش بالضبط! " + question.explanation;

            quizFeedback.style.color = "var(--orange)";

        }

    }


    // Show next button

    if (nextQuestionButton) {

        nextQuestionButton.hidden = false;

        nextQuestionButton.textContent =
            currentQuestion === quizQuestions.length - 1
                ? "اعرض نتيجتي"
                : "السؤال التالي ←";

    }

}


/* =========================================
   11. NEXT QUESTION
========================================= */

function goToNextQuestion() {

    if (!questionAnswered) return;

    currentQuestion++;


    if (currentQuestion < quizQuestions.length) {

        loadQuestion();

    } else {

        showQuizResult();

    }

}


if (nextQuestionButton) {

    nextQuestionButton.addEventListener(
        "click",
        goToNextQuestion
    );

}


/* =========================================
   12. QUIZ RESULT
========================================= */

function showQuizResult() {

    if (quizContainer) {

        quizContainer.hidden = true;

    }

    if (quizResult) {

        quizResult.hidden = false;

    }


    updateText(
        "finalScore",
        `نتيجتك: ${quizScore} من ${quizQuestions.length}`
    );


    let message = "";


    if (quizScore === 5) {

        message =
            "رائع! أنت بطل الحكاية وعندك فهم ممتاز للمناخ. 🌍";

    } else if (quizScore >= 3) {

        message =
            "شاطر جدًا! عندك أساس كويس، وكمان شوية معرفة هتبقى خبير.";

    } else {

        message =
            "كل بداية محتاجة تعلم. ارجع للحكاية وجرب تاني!";

    }


    updateText("resultMessage", message);


    if (quizResult) {

        quizResult.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }

}


/* =========================================
   13. RESTART QUIZ
========================================= */

function restartQuiz() {

    currentQuestion = 0;

    quizScore = 0;

    questionAnswered = false;


    if (quizContainer) {

        quizContainer.hidden = false;

    }

    if (quizResult) {

        quizResult.hidden = true;

    }


    loadQuestion();


    if (quizContainer) {

        quizContainer.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }

}


if (restartQuizButton) {

    restartQuizButton.addEventListener(
        "click",
        restartQuiz
    );

}


/* =========================================
   14. START QUIZ
========================================= */

if (
    quizContainer &&
    quizQuestion &&
    quizOptions
) {

    loadQuestion();

}


/* =========================================
   15. SCROLL REVEAL EFFECT
========================================= */

const revealElements = document.querySelectorAll(
    ".section-heading, .impact-card, .timeline-card, .story-content, .greenhouse-intro, .ozone-content, .interactive-lab, .city-game, .quiz-container"
);


// Add initial reveal styling

revealElements.forEach(element => {

    element.style.opacity = "0";

    element.style.transform = "translateY(25px)";

    element.style.transition =
        "opacity 0.7s ease, transform 0.7s ease";

});


function revealOnScroll() {

    const windowHeight = window.innerHeight;

    revealElements.forEach(element => {

        const elementTop =
            element.getBoundingClientRect().top;

        if (elementTop < windowHeight - 70) {

            element.style.opacity = "1";

            element.style.transform = "translateY(0)";

        }

    });

}


// Run once on page load

revealOnScroll();


// Run on scroll

window.addEventListener("scroll", revealOnScroll);


/* =========================================
   16. CURRENT YEAR
========================================= */

const footerCopy = document.querySelector(".footer-copy");

if (footerCopy) {

    footerCopy.textContent =
        `© ${new Date().getFullYear()} 7EKAYET ARD | All Rights Reserved`;

}


/* =========================================
   17. CONSOLE MESSAGE
========================================= */

console.log(
    "%c🌍 Welcome to 7EKAYET ARD!",
    "color: #B6FF00; font-size: 20px; font-weight: bold;"
);

console.log(
    "%cA STORY YOU CAN CHANGE.",
    "color: #9B5CFF; font-size: 13px;"
);
