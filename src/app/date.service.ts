import { Injectable } from '@angular/core';

export type Day = {
  key: string,
  date: Date
};

export type Week = {
  days: Day[]
};

@Injectable({
  providedIn: 'root'
})
export class DateService {
  private now: Date = new Date();
  private days: string[] = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday','Saturday'
  ];

  getNextSevenDays(): Week {
    return {
      days: [
        {
          key: 'Today',
          date: this.now
        },
        {
          key: 'Tomorrow',
          date: this.getDateByAddingDays(1)
        },
        {
          key: this.getWeekDayBy(2),
          date: this.getDateByAddingDays(2)
        },
        {
          key: this.getWeekDayBy(3),
          date: this.getDateByAddingDays(3)
        },
        {
          key: this.getWeekDayBy(4),
          date: this.getDateByAddingDays(4)
        },
        {
          key: this.getWeekDayBy(5),
          date: this.getDateByAddingDays(5)
        },
        {
          key: this.getWeekDayBy(6),
          date: this.getDateByAddingDays(6)
        }
      ]
    };
  }

  private getWeekDayBy(n: number): string {
    const next = this.now.getDay() + (n - 1);
    if(next > this.days.length - 1) {
      const fixed = next - this.days.length;
      return this.days[fixed];
    }
    return this.days[next];
  }

  private getDateByAddingDays(n: number): Date {
    const date = new Date(this.now);
    date.setDate(date.getDate() + n);
    return date;
  }
}
