const questions = [
  {
    text: 'Как по-английски будет «Привет»?',
    options: ['Goodbye', 'Hello', 'Please'],
    correct: 'Hello',
  },
  {
    text: 'Выберите перевод фразы: «My name is Anna»',
    options: ['Мне нравится Анна', 'Меня зовут Анна', 'Я вижу Анну'],
    correct: 'Меня зовут Анна',
  },
  {
    text: 'Как переводится «How are you?»',
    options: ['Сколько тебе лет?', 'Как дела?', 'Где ты живёшь?'],
    correct: 'Как дела?',
  },
  {
    text: 'Выберите правильный перевод: «See you later»',
    options: ['Увидимся позже', 'Добрый вечер', 'Спасибо большое'],
    correct: 'Увидимся позже',
  },
];

const quizForm = document.getElementById('quiz-form');
const resultNode = document.getElementById('result');
const submitBtn = document.getElementById('submit-btn');
const resetBtn = document.getElementById('reset-btn');

function renderQuiz() {
  quizForm.innerHTML = '';

  questions.forEach((question, index) => {
    const fieldset = document.createElement('fieldset');
    fieldset.className = 'question';

    const legend = document.createElement('legend');
    legend.textContent = `${index + 1}. ${question.text}`;
    fieldset.appendChild(legend);

    question.options.forEach((option) => {
      const label = document.createElement('label');
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = `q${index}`;
      input.value = option;

      label.appendChild(input);
      label.append(` ${option}`);
      fieldset.appendChild(label);
    });

    quizForm.appendChild(fieldset);
  });
}

function checkAnswers() {
  let score = 0;

  questions.forEach((question, index) => {
    const checked = quizForm.querySelector(`input[name="q${index}"]:checked`);
    if (checked && checked.value === question.correct) {
      score += 1;
    }
  });

  const percent = Math.round((score / questions.length) * 100);
  resultNode.className = 'result';

  if (percent >= 75) {
    resultNode.classList.add('ok');
    resultNode.textContent = `Отлично! ${score}/${questions.length} (${percent}%).`;
  } else if (percent >= 50) {
    resultNode.classList.add('mid');
    resultNode.textContent = `Хороший старт: ${score}/${questions.length} (${percent}%). Попробуй ещё раз!`;
  } else {
    resultNode.classList.add('bad');
    resultNode.textContent = `Пока сложно: ${score}/${questions.length} (${percent}%). Повтори урок и снова в бой!`;
  }
}

function resetQuiz() {
  quizForm.reset();
  resultNode.textContent = '';
  resultNode.className = 'result';
}

submitBtn.addEventListener('click', checkAnswers);
resetBtn.addEventListener('click', resetQuiz);

renderQuiz();
