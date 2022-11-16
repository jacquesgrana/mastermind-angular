import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { timeInterval } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  source = new BehaviorSubject<number>(0);
  interval: any;
  isPaused: boolean = false;

  constructor() {

  }


  public createTimer() {
    this.interval = setInterval(() => {
      if(!this.isPaused) {
        const newVal = this.source.getValue() + 1;
        this.source.next(newVal);
      }
    }, 1000);
  }

  public getObservable() {
    return this.source.asObservable();
  }

public resetObservable() {
  this.source = new BehaviorSubject<number>(0);
}

public pause() {
  this.isPaused = false;
  clearInterval(this.interval);
}
}
