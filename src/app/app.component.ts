import { Component } from '@angular/core';
import { Question } from '../entities/question';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'math';

  question: Question;
  questions: Question[];

  currentAnswer: number;
  score: number;
  constructor() {
    var score = parseInt(localStorage.getItem("score"));
    if (score) {
      this.score = score;
    }
    else {
      this.score = 0;
    }

    this.newQuestion();
    this.questions = [];
  }
  next() {
    this.question.userAnswer = this.currentAnswer;
    if (this.question.userAnswer == this.question.answer) {
      this.score++;
      localStorage.setItem("score", this.score.toString());
      this.question.isCorrect = true;
    }

    this.questions.push(this.question);
    this.newQuestion();
    this.currentAnswer = undefined;
  }
  private newQuestion() {

    var o = this.getRandom(1, 10);
    var o2 = this.getRandom(1, 10);

    this.question = { text: `${o} + ${o2} = `, answer: o + o2, isCorrect: false, userAnswer: 0 };
  }

  getRandom(from, to) {
    return Math.floor(Math.random() * to) + from
  }
  onKey(event: any) {
    console.log(event.target.value);

    if (event.keyCode === 13) {
      this.currentAnswer = event.target.value;
      this.next();
    }
  }
}
