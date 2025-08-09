  const quizData = [
      {
        question: "What is the capital of France?",
        answers: ["Paris", "London", "Berlin", "Madrid"],
        correct: 0
      },
      {
        question: "Which planet is known as the Red Planet?",
        answers: ["Earth", "Mars", "Jupiter", "Saturn"],
        correct: 1
      },
      {
        question: "What is the chemical symbol for gold?",
        answers: ["G", "Ag", "Au", "Go"],
        correct: 2
      },
      {
        question: "Which language is used for web development?",
        answers: ["Python", "HTML", "C++", "Java"],
        correct: 1
      },
      {
        question: "Who painted the Mona Lisa?",
        answers: ["Picasso", "Van Gogh", "Leonardo da Vinci", "Michelangelo"],
        correct: 2
      }
    ];

    const questionEl = document.getElementById('question');
    const answersEl = document.getElementById('answers');
    const nextBtn = document.getElementById('nextBtn');
    const resultEl = document.getElementById('result');
    const scoreEl = document.getElementById('score');

    let currentQuestion = 0;
    let score = 0;

    function loadQuestion() {
      const current = quizData[currentQuestion];
      questionEl.textContent = current.question;
      answersEl.innerHTML = '';
      nextBtn.disabled = true;

      current.answers.forEach((answer, index) => {
        const btn = document.createElement('button');
        btn.textContent = answer;
        btn.addEventListener('click', () => selectAnswer(btn, index));
        answersEl.appendChild(btn);
      });
    }

    function selectAnswer(button, index) {
      const isCorrect = index === quizData[currentQuestion].correct;
      if (isCorrect) {
        button.classList.add('correct');
        score++;
      } else {
        button.classList.add('wrong');
        answersEl.children[quizData[currentQuestion].correct].classList.add('correct');
      }
      [...answersEl.children].forEach(btn => btn.disabled = true);
      nextBtn.disabled = false;
    }

    nextBtn.addEventListener('click', () => {
      currentQuestion++;
      if (currentQuestion < quizData.length) {
        loadQuestion();
      } else {
        showResult();
      }
    });

    function showResult() {
      document.getElementById('quiz').classList.add('hidden');
      resultEl.classList.remove('hidden');
      scoreEl.textContent = `${score} / ${quizData.length}`;
    }

    loadQuestion();