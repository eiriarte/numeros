import Quiz from '../libs/quiz';

describe('Quiz', function() {
  it('genera quizzes numéricos, con respuesta correcta y elecciones distintas', function() {
    const numChoices = 4;
    var quiz = Quiz.getNumberQuiz(1, 39, 10);
    expect(quiz.length).toBe(10);
    for (var i = 0; i < quiz.length; i++) {
      expect(quiz[i].choices.length).toBe(4);
      expect(quiz[i].choices).toContain(quiz[i].answer);
      for (var j = 1; j < numChoices; j++) {
        expect(quiz[i].choices[j]).not.toBe(quiz[i].choices[j-1]);
      }
    }
  });
});
