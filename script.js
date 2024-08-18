const questions = [
    { 
        question: "Which technology company was the first to reach a market capitalization of $1 trillion?",
        answers: [
            {text: "amazon", correct: false},
            {text: "Google", correct: false},
            {text: "Apple", correct: true},
            {text: "Microsoft", correct: false},
        ]
    },
    { 
        question: "What was the first programming language designed specifically for artificial intelligence?",
        answers: [
            {text: "Lisp", correct: true},
            {text: "Python", correct: false},
            {text: "Java", correct: false},
            {text: "Fortan", correct: false},
        ]
    },
    { 
        question: "What does the 'S' in HTTPS stand for?",
        answers: [
            {text: "Standard", correct: false},
            {text: "Server", correct: false},
            {text: "System", correct: false},
            {text: "Secure", correct: true},
        ]
    },
    { 
        question: "Which technology was developed by IBM in 1980 that became a standard in personal computing?",
        answers: [
            {text: "Laptop", correct: false},
            {text: "PC", correct: true},
            {text: "Server", correct: false},
            {text: "Tablet", correct: false},
        ]
    },
    { 
        question: "What is the name of the first web browser ever created?",
        answers: [
            {text: "Internet Explorer", correct: false},
            {text: "Firefox", correct: false},
            {text: "Nexus", correct: true},
            {text: "Mosaic", correct: false},
        ]
    }
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}


function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});
startQuiz();