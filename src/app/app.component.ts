import { Component, HostListener } from '@angular/core';
import { Question } from '../entities/question';
import { Level, Levels } from '../entities/level';
import { SlideInOutAnimation } from '../slideDown';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [SlideInOutAnimation]
})
export class AppComponent {
  title = 'math';
  animationState = 'out';
  question: Question;
  questions: Question[];

  currentAnswer: number;
  currentAnswerStr: string;
  currentLevel: Level;
  Levels: Level[];
  score: number;

  constructor() {
    var score = parseInt(localStorage.getItem("score"));
    var levelId = parseInt(localStorage.getItem("level"));
    this.currentAnswerStr = "";
    if (score) {
      this.score = score;
    }
    else {
      this.score = 0;
    }

    if (levelId) {
      this.currentLevel = Levels.filter(x => x.id == levelId)[0];
    }
    else {
      this.currentLevel = Levels[0];
    }

    this.newQuestion();
    this.questions = [];
    this.Levels = Levels;
  }
  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    var key = event.key;

    var number = parseInt(key);
    if (!isNaN(number)) {
      this.currentAnswerStr = this.currentAnswerStr + key;
    }
    if (key == "Enter") {
      this.currentAnswer = parseInt(this.currentAnswerStr);
      this.next();
    }
    if (key == "Backspace") {
      this.currentAnswerStr = this.currentAnswerStr.substr(0, this.currentAnswerStr.length - 1);
      this.currentAnswer = parseInt(this.currentAnswerStr);
    }

  }
  next() {
    this.question.userAnswer = this.currentAnswer;
    if (this.question.userAnswer == this.question.answer) {
      this.score++;
      localStorage.setItem("score", this.score.toString());
      this.question.isCorrect = true;
      this.setCurrentLevel()
    }

    this.questions.push(this.question);
    this.newQuestion();
    this.currentAnswer = undefined;
    this.currentAnswerStr = "";
  }
  private newQuestion() {

    var o = this.getRandom(1, 10);
    var o2 = this.getRandom(1, 10);

    this.question = { text: `${o} + ${o2} = `, answer: o + o2, isCorrect: false, userAnswer: 0 };
  }

  getRandom(from, to) {
    return Math.floor(Math.random() * to) + from
  }

  setCurrentLevel() {
    var nextLevelId = this.currentLevel.id + 1;
    if ((this.Levels.length) >= nextLevelId) {
      var nextLevel = this.Levels[nextLevelId - 1];
      if (this.score >= nextLevel.score) {
        this.currentLevel = nextLevel;
        localStorage.setItem("level", this.currentLevel.id.toString());
      }
    }
  }

  toggleShowDiv(divName: string) {
    if (divName === 'divA') {
      console.log(this.animationState);
      console.log(this.currentLevel.id);
      this.animationState = this.animationState === 'out' ? 'in' : 'out';
      console.log(this.animationState);
    }
  }
}
