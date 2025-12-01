        let currentSlide = 0;
        const totalSlides = 8;
        let quizScore = 0;
        let answeredQuestions = new Set();
        let totalQuestions = 10;

        function updateSlideCounter() {
            document.getElementById('currentSlide').textContent = currentSlide;
            document.getElementById('totalSlides').textContent = totalSlides - 1;
        }

        function updateProgressBar() {
            const progress = (answeredQuestions.size / totalQuestions) * 100;
            document.getElementById('progressBar').style.width = progress + '%';
            document.getElementById('questionCounter').textContent = 
                `Вопрос ${answeredQuestions.size} из ${totalQuestions}`;
        }

        function showSlide(n) {
            const slides = document.querySelectorAll('.slide');
            slides.forEach(slide => slide.classList.remove('active'));
            
            if (n >= totalSlides) {
                currentSlide = totalSlides - 1;
            } else if (n < 0) {
                currentSlide = 0;
            } else {
                currentSlide = n;
            }
            
            slides[currentSlide].classList.add('active');
            
            document.getElementById('prevBtn').disabled = currentSlide === 0;
            document.getElementById('nextBtn').disabled = currentSlide === totalSlides - 1;
            
            updateSlideCounter();
        }

        function nextSlide() {
            if (currentSlide === 5 && answeredQuestions.size < totalQuestions) {
                alert('Пожалуйста, ответьте на все вопросы теста!');
                return;
            }
            if (currentSlide === 5) {
                showResults();
            }
            showSlide(currentSlide + 1);
        }

        function prevSlide() {
            showSlide(currentSlide - 1);
        }

        function checkAnswer(element, isCorrect, questionNum) {
            if (answeredQuestions.has(questionNum)) {
                return;
            }
            
            answeredQuestions.add(questionNum);
            
            const questionBox = element.parentElement;
            const allOptions = questionBox.querySelectorAll('.quiz-option');
            
            if (isCorrect) {
                element.classList.add('correct');
                quizScore++;
            } else {
                element.classList.add('incorrect');
                allOptions.forEach(opt => {
                    if (opt.onclick.toString().includes('true')) {
                        opt.classList.add('correct');
                    }
                });
            }
            
            allOptions.forEach(opt => opt.style.pointerEvents = 'none');
            
            updateProgressBar();
        }

        function showResults() {
            const percentage = (quizScore / totalQuestions) * 100;
            let grade = '';
            let message = '';
            let scoreColor = '';

            if (quizScore >= 9) {
                grade = '🏆 ОТЛИЧНО!';
                message = 'Поздравляем! Вы отлично разбираетесь в компьютерных сетях! Ваши знания на высшем уровне.';
                scoreColor = '#2ecc71';
            } else if (quizScore >= 7) {
                grade = '✅ ХОРОШО!';
                message = 'Отличный результат! У вас твердые знания по теме. Небольшая практика — и вы станете экспертом!';
                scoreColor = '#3498db';
            } else if (quizScore >= 5) {
                grade = '📚 УДОВЛЕТВОРИТЕЛЬНО';
                message = 'Неплохо! Базовые знания есть, но рекомендуем повторить материал и пройти презентацию еще раз.';
                scoreColor = '#f39c12';
            } else {
                grade = '📖 НУЖНО ПОДУЧИТЬ';
                message = 'Не расстраивайтесь! Вернитесь к началу презентации, внимательно изучите материал и попробуйте снова.';
                scoreColor = '#e74c3c';
            }

            document.getElementById('finalScore').textContent = quizScore + '/10';
            document.getElementById('finalScore').style.color = scoreColor;
            document.getElementById('gradeText').textContent = grade;
            document.getElementById('resultMessage').textContent = message;
        }

        function retryQuiz() {
            quizScore = 0;
            answeredQuestions.clear();
            
            const allQuestions = document.querySelectorAll('.quiz-question');
            allQuestions.forEach(question => {
                const options = question.querySelectorAll('.quiz-option');
                options.forEach(opt => {
                    opt.classList.remove('correct', 'incorrect');
                    opt.style.pointerEvents = 'auto';
                });
            });
            
            updateProgressBar();
            showSlide(5);
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') nextSlide();
            if (e.key === 'ArrowLeft') prevSlide();
        });

        showSlide(0);
