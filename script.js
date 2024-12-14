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

let currentQuestionIndex = -1;
let score = 0;
let studentName = '';
let leaderboard = [];
let wheelRotation = 0;

let questionTimer = 10; // Per question timer
let overallTimer = 120; // Overall quiz timer
let questionTimerInterval;
let overallTimerInterval;
let startTime;

// Register function
function register() {
    studentName = document.getElementById("studentName").value;
    if (studentName) {
        document.getElementById("registration").style.display = "none";
        document.getElementById("quiz").style.display = "block";
        startOverallTimer();
        spinWheel();
        startTime = Date.now();
    } else {
        alert("Please enter your name.");
    }
}

// Overall timer
function startOverallTimer() {
    document.getElementById("overall-timer").style.display = "block";
    overallTimerInterval = setInterval(() => {
        overallTimer--;
        document.getElementById("overall-timer").innerText = `Total Time Left: ${overallTimer}s`;
        if (overallTimer <= 0) {
            clearInterval(overallTimerInterval);
            showResult();
        }
    }, 1000);
}

// Spin wheel function
function spinWheel() {
    wheelRotation += Math.floor(Math.random() * 360) + 720;
    document.getElementById("wheel").style.transform = `rotate(${wheelRotation}deg)`;
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            displayQuestion();
        } else {
            showResult();
        }
    }, 2000);
}

// Display question
function displayQuestion() {
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
    startQuestionTimer();
}

// Start per-question timer
function startQuestionTimer() {
    questionTimer = 10;
    document.getElementById("timer").innerText = `Time Left: ${questionTimer}s`;
    questionTimerInterval = setInterval(() => {
        questionTimer--;
        document.getElementById("timer").innerText = `Time Left: ${questionTimer}s`;
        if (questionTimer <= 0) {
            clearInterval(questionTimerInterval);
            nextQuestion();
        }
    }, 1000);
}

// Check answer
function checkAnswer(selectedIndex) {
    const correctIndex = questions[currentQuestionIndex].correct;
    if (selectedIndex === correctIndex) {
        score++;
    }
    nextQuestion();
}

// Next question
function nextQuestion() {
    clearInterval(questionTimerInterval);
    currentQuestionIndex++;
    if (currentQuestionIndex >= questions.length) {
        showResult();
    } else {
        spinWheel();
    }
}

// Show results
function showResult() {
    clearInterval(overallTimerInterval);
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    leaderboard.push({ name: studentName, score: score, time: timeTaken });
    leaderboard.sort((a, b) => b.score - a.score || a.time - b.time);
    document.getElementById("quiz").style.display = "none";
    document.getElementById("result").style.display = "block";
    document.getElementById("score").innerText = `Score: ${score} / ${questions.length}`;
    displayLeaderboard();
}

// Display leaderboard
function displayLeaderboard() {
    const leaderboardList = document.getElementById("leaderboard-list");
    leaderboardList.innerHTML = '';
    leaderboard.forEach((entry, index) => {
        const listItem = document.createElement("li");
        listItem.innerText = `${index + 1}. ${entry.name}: ${entry.score} points (${entry.time}s)`;
        leaderboardList.appendChild(listItem);
    });
    const highestScore = leaderboard[0];
    document.getElementById("highest-score").innerText = `🏆 Highest Score: ${highestScore.name} with ${highestScore.score} points in ${highestScore.time}s`;
}
