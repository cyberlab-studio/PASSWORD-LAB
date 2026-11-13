
const home = document.getElementById("home");
const game = document.getElementById("game");
const results = document.getElementById("results");

const content = document.getElementById("game-content");
const progress = document.getElementById("progress");
const scoreDisplay = document.getElementById("score");

let score = 0;
let currentActivity = 0;
let questionIndex = 0;

const activities = [
    {
        title: "¡Cuenta vulnerada!",
        description: "Tomás descubrió que alguien accedió a su cuenta. ¿Qué debería hacer?",
        questions: [
            {
                question: "Tomás utiliza 'tomás123' como contraseña. ¿Cuál es el problema?",
                options: [
                    "Es demasiado difícil",
                    "Contiene información personal y es predecible",
                    "Tiene demasiados símbolos"
                ],
                correct: 1,
                explanation: "Los nombres y datos personales hacen que una contraseña sea más fácil de adivinar."
            },
            {
                question: "¿Qué debería hacer ahora?",
                options: [
                    "Cambiarla por una contraseña única y segura",
                    "Usar la misma contraseña con otro número",
                    "Compartirla con un amigo"
                ],
                correct: 0,
                explanation: "Una contraseña nueva, única y difícil de adivinar ayuda a proteger la cuenta."
            },
            {
                question: "¿Qué otra medida puede ayudarlo?",
                options: [
                    "Desactivar todas las protecciones",
                    "Activar la verificación en dos pasos",
                    "Usar la misma contraseña en todas partes"
                ],
                correct: 1,
                explanation: "La autenticación en dos pasos agrega una capa extra de seguridad."
            }
        ]
    },

    {
        title: "¿Cuál elegirías?",
        description: "Elegí la opción que ofrece mayor seguridad.",
        questions: [
            {
                question: "¿Cuál de estas contraseñas es más segura?",
                options: [
                    "12233344455555",
                    "CoNtrASEÑA",
                    "Luna!Verde_82#Nube"
                ],
                correct: 2,
                explanation: "Una contraseña larga, única y menos predecible es una mejor elección."
            },
            {
                question: "¿Cuál es una mejor práctica?",
                options: [
                    "Usar la misma contraseña en todas las cuentas",
                    "Usar una contraseña diferente para cada cuenta",
                    "Usar siempre tu fecha de nacimiento"
                ],
                correct: 1,
                explanation: "Si una cuenta queda expuesta, las demás no estarán comprometidas por reutilizar la misma contraseña."
            },
            {
                question: "¿Qué contraseña sería más fácil de adivinar?",
                options: [
                    "Una frase larga y original",
                    "Una combinación aleatoria de palabras",
                    "El nombre de tu mascota y tu cumpleaños"
                ],
                correct: 2,
                explanation: "Los datos personales pueden conocerse mediante redes sociales u otras fuentes."
            }
        ]
    },

    {
        title: "Detectá el error",
        description: "Leé cada situación y encontrá la práctica insegura.",
        questions: [
            {
                question: "Lucía escribe su contraseña en un papel y lo deja pegado en su compu. ¿Qué está mal?",
                options: [
                    "Puede quedar expuesta a otras personas",
                    "La tinta se puede borrar",
                    "El papel bloquea la computadora"
                ],
                correct: 0,
                explanation: "Las contraseñas deben guardarse de forma segura. Un gestor de contraseñas confiable puede ayudar."
            },
            {
                question: "Un desconocido le pide su contraseña por mensaje. ¿Qué debería hacer?",
                options: [
                    "Enviársela",
                    "No compartirla y verificar el mensaje",
                    "Publicarla para pedir opiniones"
                ],
                correct: 1,
                explanation: "Nunca compartas tu contraseña. Los mensajes sospechosos pueden ser intentos de phishing."
            },
            {
                question: "Martín usa 'password123' en todas sus cuentas. ¿Qué riesgo tiene?",
                options: [
                    "Ninguno",
                    "Sus cuentas podrían quedar expuestas si descubren esa contraseña",
                    "Su computadora funcionará más lento"
                ],
                correct: 1,
                explanation: "Las contraseñas comunes y reutilizadas representan un riesgo importante."
            }
        ]
    },

    {
        title: "Creá tu contraseña",
        description: "Ahora te toca a vos. Inventá una contraseña ficticia y superá los requisitos.",
        passwordGame: true
    }
];

function showScreen(screen) {
    document.querySelectorAll(".screen").forEach(s => {
        s.classList.remove("active");
    });

    screen.classList.add("active");
}

document.getElementById("start-btn").addEventListener("click", () => {
    score = 0;
    currentActivity = 0;
    questionIndex = 0;

    showScreen(game);
    renderActivity();
});

document.getElementById("back-btn").addEventListener("click", () => {
    if (confirm("¿Querés salir del juego y volver al inicio?")) {
        showScreen(home);
    }
});

function renderActivity() {
    const activity = activities[currentActivity];

    progress.textContent = `DESAFÍO ${currentActivity + 1} DE 4`;
    scoreDisplay.textContent = `PUNTOS: ${score}`;

    if (activity.passwordGame) {
        renderPasswordGame();
        return;
    }

    const question = activity.questions[questionIndex];

    content.innerHTML = `
        <div class="activity-card">
            <span>ACTIVIDAD ${currentActivity + 1}</span>
            <h2>${activity.title}</h2>
            <p>${activity.description}</p>

            <h3 style="margin-top:25px">
                ${question.question}
            </h3>

            <div id="options" style="display:grid; gap:12px; margin-top:20px">
                ${question.options.map((option, index) => `
                    <button class="secondary-btn option-btn"
                    data-index="${index}">
                        ${option}
                    </button>
                `).join("")}
            </div>

            <div id="feedback" style="margin-top:20px"></div>
        </div>
    `;

    document.querySelectorAll(".option-btn").forEach(button => {
        button.addEventListener("click", () => {
            checkAnswer(Number(button.dataset.index));
        });
    });
}

function checkAnswer(selected) {
    const question = activities[currentActivity].questions[questionIndex];
    const correct = selected === question.correct;

    if (correct) score += 10;

    const feedback = document.getElementById("feedback");

    feedback.innerHTML = `
        <h3 style="color:${correct ? '#35d69a' : '#f87171'}">
            ${correct ? "¡Correcto! +10 puntos" : "No es correcto"}
        </h3>

        <p style="margin:12px 0; color:#94a3b8">
            ${question.explanation}
        </p>

        <button class="primary-btn" id="next-btn">
            CONTINUAR →
        </button>
    `;

    document.getElementById("next-btn").addEventListener("click", () => {
        questionIndex++;

        if (questionIndex >= activities[currentActivity].questions.length) {
            currentActivity++;
            questionIndex = 0;
        }

        if (currentActivity >= activities.length) {
            showResults();
        } else {
            renderActivity();
        }
    });

    document.querySelectorAll(".option-btn").forEach(button => {
        button.disabled = true;
    });
}


// ACTIVIDAD DE CREAR CONTRASEÑA


// ACTIVIDAD DE CREAR CONTRASEÑA

const requirements = [
    {
        text: "Tener al menos 12 caracteres",
        test: p => p.length >= 12
    },
    {
        text: "Contener una letra mayúscula",
        test: p => /[A-ZÁÉÍÓÚÑ]/.test(p)
    },
    {
        text: "Contener una letra minúscula",
        test: p => /[a-záéíóúñ]/.test(p)
    },
    {
        text: "Contener al menos dos números",
        test: p => (p.match(/[0-9]/g) || []).length >= 2
    },
    {
        text: "Contener dos símbolos diferentes",
        test: p => new Set(
            p.match(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s]/g) || []
        ).size >= 2
    },
    {
        text: "No contener secuencias predecibles",
        test: p => !/(0123|1234|2345|abcd|bcde|cdef)/i.test(p)
    },
    {
        text: "No repetir tres veces el mismo carácter seguido",
        test: p => !/(.)\1\1/.test(p)
    },
    {
        text: "No contener palabras comunes",
        test: p => !/(password|admin|qwerty)/i.test(p)
    }
];

let currentRequirement = 0;
let privacyChecked = false;

function renderPasswordGame() {
    currentRequirement = 0;
    privacyChecked = false;

    content.innerHTML = `
        <div class="activity-card">
            <span>ACTIVIDAD 4 / DESAFÍO FINAL</span>
            <h2>Construí una contraseña segura</h2>

            <p>
                Inventá una contraseña ficticia.
                Los requisitos aparecerán progresivamente.
                No utilices ninguna contraseña real.
            </p>

            <div style="margin:25px 0">
                <div style="display:flex; justify-content:space-between">
                    <span>PROGRESO</span>
                    <span id="password-progress-text">0/8</span>
                </div>

                <div style="background:#26364d; height:9px;
                border-radius:20px; margin-top:10px; overflow:hidden">
                    <div id="password-progress"
                    style="height:100%; width:0%; background:#35d69a;
                    transition:width .3s"></div>
                </div>
            </div>

            <input
                id="password-input"
                type="password"
                placeholder="Inventá tu contraseña..."
                autocomplete="off"
                style="width:100%; padding:15px;
                background:#080d18; color:white;
                border:1px solid #35d69a; border-radius:8px"
            >

            <div style="margin-top:12px">
                <label>
                    <input type="checkbox" id="show-password">
                    Mostrar contraseña
                </label>
            </div>

            <h3 style="margin-top:25px">Tus requisitos</h3>

            <div id="requirements-list"
            style="display:grid; gap:14px; margin-top:15px"></div>

            <div id="password-feedback" style="margin-top:20px"></div>
        </div>
    `;

    const input = document.getElementById("password-input");

    input.addEventListener("input", checkPassword);

    document.getElementById("show-password").addEventListener("change", e => {
        input.type = e.target.checked ? "text" : "password";
    });

    checkPassword();
}

function checkPassword() {
    const password = document.getElementById("password-input").value;

    // Desbloquear solamente un requisito por vez.
    while (
        currentRequirement < requirements.length &&
        requirements[currentRequirement].test(password)
    ) {
        currentRequirement++;
    }

    const list = document.getElementById("requirements-list");
    const feedback = document.getElementById("password-feedback");

    list.innerHTML = requirements.map((r, index) => {
        const passed = r.test(password);
        const unlocked = index < currentRequirement;
        const active = index === currentRequirement;

        let symbol = "🔒";
        let color = "#64748b";

        if (unlocked && passed) {
            symbol = "✓";
            color = "#35d69a";
        } else if (active) {
            symbol = "○";
            color = "#fbbf24";
        }

        return `
            <div style="color:${color}; padding:10px;
            background:#080d18; border-radius:7px">
                <strong>${symbol}</strong>
                ${unlocked ? r.text : active ? r.text : "Requisito bloqueado"}
            </div>
        `;
    }).join("");

    const completed = requirements.filter(r => r.test(password)).length;

    document.getElementById("password-progress").style.width =
        `${completed / requirements.length * 100}%`;

    document.getElementById("password-progress-text").textContent =
        `${completed}/${requirements.length}`;

    if (currentRequirement === requirements.length) {
        showPrivacyChallenge();
    } else {
        feedback.innerHTML = `
            <p style="color:#fbbf24">
                PRÓXIMO OBJETIVO:
                ${requirements[currentRequirement].text}
            </p>
            <p style="color:#94a3b8; margin-top:8px">
                ¡Seguí modificando tu contraseña para desbloquear
                el siguiente requisito!
            </p>
        `;
    }
}

function showPrivacyChallenge() {
    if (privacyChecked) return;

    const feedback = document.getElementById("password-feedback");

    feedback.innerHTML = `
        <div style="padding:18px; background:#172538;
        border:1px solid #35d69a; border-radius:10px">

            <h3 style="color:#35d69a">
                ¡Superaste los 8 requisitos!
            </h3>

            <p style="margin:12px 0">
                Antes de terminar, revisá la seguridad de tu contraseña.
            </p>

            <p style="color:#94a3b8; margin-bottom:15px">
                No necesitamos conocer tus datos personales.
                Respondé honestamente:
            </p>

            <label style="display:block; margin-bottom:12px">
                <input type="checkbox" id="personal-check">
                Mi contraseña no contiene información personal.
            </label>

            <label style="display:block; margin-bottom:18px">
                <input type="checkbox" id="unique-check">
                No reutilizaría esta contraseña en otras cuentas.
            </label>

            <button class="primary-btn" id="privacy-btn">
                REVISAR Y FINALIZAR →
            </button>

            <p id="privacy-message" style="margin-top:12px"></p>
        </div>
    `;

    document.getElementById("privacy-btn").addEventListener("click", () => {
        const personal = document.getElementById("personal-check").checked;
        const unique = document.getElementById("unique-check").checked;
        const message = document.getElementById("privacy-message");

        if (!personal || !unique) {
            message.style.color = "#fbbf24";
            message.textContent =
                "Revisá las dos recomendaciones antes de continuar.";
            return;
        }

        privacyChecked = true;
        score += 40;

        message.style.color = "#35d69a";
        message.textContent = "¡Excelente! Completaste el desafío.";

        setTimeout(showResults, 900);
    });
}


// RESULTADOS


function showResults() {
    showScreen(results);

    let message = "";
    let advice = "";

    if (score >= 100) {
        message = "¡Excelente trabajo!";
        advice = "Demostraste conocer muy buenas prácticas de seguridad digital. Seguí protegiendo tus cuentas.";
    } else if (score >= 70) {
        message = "¡Muy buen trabajo!";
        advice = "Tenés buenos conocimientos sobre contraseñas. Recordá seguir evitando patrones predecibles.";
    } else {
        message = "¡Buen intento!";
        advice = "Ahora sabés más que antes. Recordá usar contraseñas largas, únicas y evitar información personal.";
    }

    document.getElementById("final-score").innerHTML = `
        <strong>${message}</strong>
        <br><br>
        Puntuación: ${score} puntos
        <br><br>
        ${advice}
    `;
}


document.getElementById("restart-btn").addEventListener("click", () => {
    score = 0;
    currentActivity = 0;
    questionIndex = 0;

    showScreen(home);
});