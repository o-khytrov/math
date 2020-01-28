export class Level {
  id: number;
  picture: string;
  score: number;
  description: string;
}
export const Levels: Level[] = [
  { id: 1, picture: "assets/earth.png", score: 0, description: "Земля" },
  { id: 2, picture: "assets/mercury.png", score: 60, description: "Меркурій" },
  { id: 3, picture: "assets/venus.png", score: 150, description: "Венера" },
  { id: 4, picture: "assets/mars.png", score: 200, description: "Марс" },
  { id: 5, picture: "assets/jupiter.png", score: 300, description: "Юпітер" }
]
