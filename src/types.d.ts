declare namespace AppData {
  interface Period {
    current: number;
    previous: number;
  }
  
  interface Activity {
    name: string;
    timeframes: {
      [period: string]: Period;
      day: Period;
      week: Period;
      month: Period;
    }
  }
}