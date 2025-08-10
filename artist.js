 const quizData = [
      {
        question: "Which activity sounds most fun to you?",
        answers: [
          { text: "Painting a landscape", type: "Painter" },
          { text: "Writing poetry", type: "Writer" },
          { text: "Playing an instrument", type: "Musician" },
          { text: "Taking artistic photos", type: "Photographer" }
        ]
      },
      {
        question: "Which tool would you grab first?",
        answers: [
          { text: "A brush", type: "Painter" },
          { text: "A pen", type: "Writer" },
          { text: "A guitar", type: "Musician" },
          { text: "A camera", type: "Photographer" }
        ]
      },
      {
        question: "How do you express your emotions?",
        answers: [
          { text: "Through colors and shapes", type: "Painter" },
          { text: "Through melodies and rhythm", type: "Musician" },
          { text: "Through words and stories", type: "Writer" },
          { text: "Through capturing moments", type: "Photographer" }
        ]
      },
      {
        question: "Your creative space is:",
        answers: [
          { text: "Covered in sketches and paint", type: "Painter" },
          { text: "Filled with books and journals", type: "Writer" },
          { text: "Stacked with instruments", type: "Musician" },
          { text: "Lit perfectly with cool props", type: "Photographer" }
        ]
      }
    ];

    let currentQuestion = 0;
    let scores = {
      Painter: 0,
      Musician: 0,
      Writer: 0,
      Photographer: 0
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
          btn.style.backgroundColor = '#aed581';
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
        Painter: "🎨 Painter — You express emotion through visuals, color, and form. You're imaginative, intuitive, and see the world in shapes and shades.",
        Musician: "🎵 Musician — Rhythm flows in your soul. You feel deeply and channel those emotions through sound.",
        Writer: "📝 Writer — Words are your canvas. You love expressing ideas, stories, and emotions through language.",
        Photographer: "📸 Photographer — You have an eye for moments. You capture beauty, emotion, and narrative through a lens."
      };

      resultText.textContent = messages[topType];
    }

    loadQuestion();