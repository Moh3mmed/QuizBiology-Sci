const questions = [
    { question: "What is the powerhouse of the cell?", options: ["Nucleus", "Mitochondria", "Ribosome", "Endoplasmic Reticulum"], correct: 1 },
    { question: "What is the process of photosynthesis?", options: ["Respiration", "Transpiration", "Fermentation", "Light energy to chemical energy"], correct: 3 },
    { question: "Which organ is responsible for pumping blood?", options: ["Brain", "Heart", "Lungs", "Liver"], correct: 1 },
    { question: "What is the chemical formula for water?", options: ["CO2", "O2", "H2O", "CH4"], correct: 2 },
    { question: "Who proposed the theory of evolution?", options: ["Newton", "Darwin", "Einstein", "Mendel"], correct: 1 },
    { question: "What is the genetic material in humans?", options: ["RNA", "DNA", "Proteins", "Carbohydrates"], correct: 1 },
    { question: "What is the main function of the white blood cells?", options: ["Transport oxygen", "Fight infections", "Digest food", "Produce energy"], correct: 1 },
    { question: "Which system controls voluntary actions?", options: ["Nervous system", "Digestive system", "Circulatory system", "Respiratory system"], correct: 0 }
];

let currentQuestionIndex = 0;
let score = 0;
let studentName = '';
let leaderboard = [];

function register() {
    studentName = document.getElementById("studentName").value;
    if (studentName) {
        document.getElementById("registration").style.display = "none";
        document.getElementById("quiz").style.display = "block";
        displayQuestion();
    } else {
        alert("Please enter your name.");
    }
}

function displayQuestion() {
    if (currentQuestionIndex >= questions.length) {
        showResult();
        return;
    }

    const question = questions[currentQuestionIndex];
    document.getElementById("questionText").innerText = question.question;
    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = '';
    question.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.innerText = option;
        button.onclick = () => checkAnswer(index);
        optionsDiv.appendChild(button);
    });
}

function checkAnswer(selectedIndex) {
    if (selectedIndex === questions[currentQuestionIndex].correct) {
        score++;
    }
    currentQuestionIndex++;
    displayQuestion();
}

function showResult() {
    document.getElementById("quiz").style.display = "none";
    document.getElementById("result").style.display = "block";
    document.getElementById("score").innerText = `${studentName}, you scored ${score} out of ${questions.length}.`;

    leaderboard.push({ name: studentName, score: score });
    leaderboard.sort((a, b) => b.score - a.score);

    const leaderboardList = document.getElementById("leaderboard-list");
    leaderboardList.innerHTML = leaderboard
        .map(entry => `<li>${entry.name}: ${entry.score} points</li>`)
        .join('');
}
