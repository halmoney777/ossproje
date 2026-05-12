let totalRounds = 0;
let currentRound = 1;
let maxRound = 0;
let availableImages = [];
let timeLeft = 7;
let countdown;

function startGame(count) {
    totalRounds = count;
    maxRound = count;
    currentRound = 1;

    // 라운드 정보 업데이트
    document.getElementById("round-info").textContent = "라운드: " + currentRound + "/" + totalRounds;

    // 이미지 배열 준비
    availableImages = [];
    for (let i = 1; i <= maxRound; i++) {
        availableImages.push(`img/img${i}.jpg`);
    }

    // 화면 전환
    document.getElementById("setup").style.display = "none";
    document.getElementById("game-display").style.display = "block";

    // 첫 라운드 시작
    loadQuestion();
    startTimer();
}

function startTimer() {
    const timerElement = document.getElementById('timer');
    if (countdown) clearInterval(countdown);

    timeLeft = 7;
    timerElement.textContent = `남은 시간: ${timeLeft}초`;
    timerElement.style.color = "black";
    timerElement.style.fontWeight = "normal";

    countdown = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `남은 시간: ${timeLeft}초`;

        if (timeLeft < 4) {
            timerElement.style.color = "red";
            timerElement.style.fontWeight = "bold";
        }

        if (timeLeft <= 0) {
            clearInterval(countdown);
            nextRound();
        }
    }, 1000);
}

function nextRound() {
    const roundElement = document.querySelector('#room-info span');
    const timerElement = document.getElementById('timer');

    if (currentRound < maxRound) {
        currentRound++;
        roundElement.textContent = `라운드: ${currentRound}/${maxRound}`;
        loadQuestion();
        startTimer();
    } else {
        timerElement.textContent = "게임 종료";
    }
}

function loadQuestion() {
    const questionArea = document.getElementById("question-area");

    if (availableImages.length === 0) {
        questionArea.innerHTML = `<p>이미지가 모두 사용되었습니다!</p>`;
        return;
    }

    const randomIndex = Math.floor(Math.random() * availableImages.length);
    const selectedImage = availableImages[randomIndex];
    availableImages.splice(randomIndex, 1);

    questionArea.innerHTML = `<img src="${selectedImage}" alt="문제 이미지" style="max-width:100%; height:auto;">`;
}

document.addEventListener('DOMContentLoaded', () => {
    const answerButton = document.querySelector('#answer-section button');

    answerButton.addEventListener("click", () => {
        const userAnswer = document.getElementById("user-answer").value.trim();
        if (userAnswer === "") {
            alert("정답을 입력하세요!");
            return;
        }

        clearInterval(countdown);
        nextRound();
    });
});
