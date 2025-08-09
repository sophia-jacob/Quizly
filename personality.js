const quizData = [
      {
        question: "What’s your ideal weekend?",
        answers: [
          { text: "Exploring nature", type: "Wolf" },
          { text: "Chilling with friends", type: "Dog" },
          { text: "Reading or learning something new", type: "Owl" },
          { text: "Leading a group adventure", type: "Lion" }
        ]
      },
      {
        question: "What best describes your personality?",
        answers: [
          { text: "Loyal & friendly", type: "Dog" },
          { text: "Wise & calm", type: "Owl" },
          { text: "Bold & confident", type: "Lion" },
          { text: "Independent & strong", type: "Wolf" }
        ]
      },
      {
        question: "Which would you rather do?",
        answers: [
          { text: "Solve a puzzle", type: "Owl" },
          { text: "Run through a forest", type: "Wolf" },
          { text: "Host a party", type: "Dog" },
          { text: "Win a competition", type: "Lion" }
        ]
      }
    ];

    let currentQuestion = 0;
    let scores = {
      Wolf: 0,
      Dog: 0,
      Owl: 0,
      Lion: 0
    };

    const questionEl = document.getElementById('question');
    const answersEl = document.getElementById('answers');
    const nextBtn = document.getElementById('nextBtn');
    const resultEl = document.getElementById('result');
    const resultText = document.getElementById('resultText');

    function loadQuestion() {
      const current = quizData[currentQuestion];
      questionEl.textContent = current.question;
      answersEl.innerHTML = '';
      nextBtn.disabled = true;

      current.answers.forEach(answer => {
        const btn = document.createElement('button');
        btn.textContent = answer.text;
        btn.onclick = () => {
          scores[answer.type]++;
          [...answersEl.children].forEach(b => b.disabled = true);
          btn.style.backgroundColor = '#aed581'; // green highlight
          nextBtn.disabled = false;
        };
        answersEl.appendChild(btn);
      });
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

      const topType = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
      const messages = {
        Wolf: "You’re a Wolf! Independent, strong, and intuitive.",
        Dog: "You’re a Dog! Loyal, friendly, and dependable.",
        Owl: "You’re an Owl! Wise, observant, and thoughtful.",
        Lion: "You’re a Lion! Bold, natural leader, and fearless."
      };

      resultText.textContent = messages[topType];
    }

    loadQuestion();