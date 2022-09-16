declare namespace AppData {
  interface Period {
    current: number;
    previous: number;
  }
  
  interface Activity {
    name: string;
    timeframes: {
      [period: string]: Period;
      daily: Period;
      weekly: Period;
      monthly: Period;
    }
  }
}