import { Component, OnInit } from '@angular/core';
import { Timer } from './models/timer.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  tasks: Timer[] = [
    {
      id: 0,
      label: 'Yogasana',
      action: 'Start',
      hours: 0,
      minutes: 0,
      seconds: 0,
      history: []
    }
  ];
  totalTimeSpend: number = 0;
  totalHours: number = 0;
  totalMinutes: number = 0;
  totalSeconds: number = 0;
  timerIds: any[] = [];
  apiSubscription!: Subscription; 

  constructor() {}

  /*
    Get data from mock server
  */
  ngOnInit(): void {
    // this.apiSubscription = this.timerService.getData().subscribe(
    //   (response) => {
    //     const data = response;
    //     if (Array.isArray(data)) {
    //       this.tasks = data.map((element, index) => {
    //         let task = new Timer(element.id, element.label, element.history);
    //         if (!!task.history[0]?.end) {
    //           this.timerIds.push({
    //             [index]: 0,
    //           });
    //         } else {
    //           if (task.history[0]?.start) {
    //             const { hours, minutes, seconds } = this.getTimeDiff(
    //               task.history[0].start,
    //               new Date()
    //             );
    //             task.hours = hours;
    //             task.minutes = minutes;
    //             task.seconds = seconds;
    //             task.action = 'Stop';
    //             this.timerIds.push({
    //               [index]: setInterval(() => {
    //                 task.seconds++;
    //                 if (task.seconds > 59) {
    //                   task.minutes++;
    //                   task.seconds = 0;
    //                 }
    //                 if (task.minutes > 59) {
    //                   task.hours++;
    //                   task.minutes = 0;
    //                   this.getTotalTimeSpend();
    //                 }
    //               }, 1000),
    //             });
    //           }
    //         }
    //         return task;
    //       });
    //       this.apiSubscription.unsubscribe();
    //     }
    //   },
    //   (error) => {
    //     alert(error.error);
    //   }
    // )
    this.getTotalTimeSpend();
  }

  /*
    Get total time spend on all task
  */
  getTotalTimeSpend() {
    this.totalTimeSpend = 0;
    this.totalHours = 0;
    this.totalMinutes = 0;
    this.totalSeconds = 0;
    this.tasks.forEach(element => {
      element.history.forEach(data => {
        if(!!data.end) {
          const {hours, minutes, seconds} = this.getTimeDiff(data.start, data.end);
          this.totalHours = this.totalHours + hours;
          this.totalMinutes = this.totalMinutes + minutes;
          this.totalSeconds = this.totalSeconds + seconds;
        } else {
          const {hours, minutes, seconds} = this.getTimeDiff(data.start, new Date());
          this.totalHours = this.totalHours + hours;
          this.totalMinutes = this.totalMinutes + minutes;
          this.totalSeconds = this.totalSeconds + seconds;
        }
      })
    })
    this.totalMinutes = this.totalMinutes + Math.floor(this.totalSeconds / 60);
    this.totalTimeSpend = this.totalHours + Math.floor(this.totalMinutes / 60);
  }

  /*
    Calculate the difference b/w start and end date
  */
  getTimeDiff(start: any, end: any): any {
    const diff = new Date(end).getTime() - new Date(start).getTime();
    const hours = Math.floor(diff / (60 * 60 * 1000));
    const minutes = Math.floor(diff / (60 * 1000)) - ((hours * 60));
    const seconds = Math.floor(diff / 1000) - ((hours * 60 * 60) + (minutes * 60));;
    return {hours, minutes, seconds};
  }

  /*
    Update actions(Start/Stop) of the task
  */
  changeAction(index: number) {
    let task = JSON.parse(JSON.stringify(this.tasks[index]));
    if(this.tasks[index].action === 'Start') {
      task.action = 'Stop';
      task.history.unshift(
        {
          start: new Date()
        }
      )
      // this.apiSubscription = this.timerService.update(task).subscribe(
      //   (response) => {
      //     // this.tasks[index] = response as Timer;
      //     // this.timerIds[index] = setInterval(() => {
      //     //   this.tasks[index].seconds++;
      //     //   if (this.tasks[index].seconds > 59) {
      //     //     this.tasks[index].minutes++;
      //     //     this.tasks[index].seconds = 0;
      //     //   }
      //     //   if (this.tasks[index].minutes > 59) {
      //     //     this.tasks[index].hours++;
      //     //     this.tasks[index].minutes = 0;
      //     //   }
      //     // }, 1000);
      //     this.apiSubscription.unsubscribe()
      //   },
      //   (error) => {
      //     alert(error.error);
      //   }
      // )
      this.tasks[index] = task as Timer;
      this.timerIds[index] = setInterval(() => {
        this.tasks[index].seconds++;
        if (this.tasks[index].seconds > 59) {
          this.tasks[index].minutes++;
          this.tasks[index].seconds = 0;
        }
        if (this.tasks[index].minutes > 59) {
          this.tasks[index].hours++;
          this.tasks[index].minutes = 0;
        }
      }, 1000);
    } else {
      task.history[0].end = new Date();
      task = new Timer(task.id, task.label, task.history);
      this.tasks[index] = task as Timer;
      clearInterval(this.timerIds[index]);
      this.getTotalTimeSpend();
      // this.apiSubscription = this.timerService.update(task).subscribe(
      //   (response) => {
      //     this.apiSubscription.unsubscribe();
      //   },
      //   (error) => {
      //     alert(error.error);
      //   }
      // )
    }
  }

  /*
    Delete task from list
  */
  deleteTask(id: number | null) {
    console.log(id);
    if(!!id || id === 0) {
      // const params = {
      //   id: id
      // }
      console.log(id)

      const index = this.tasks.findIndex(element => element.id === id);
      console.log("index", index);
      this.tasks.splice(index, 1);
      this.getTotalTimeSpend();
      // this.apiSubscription = this.timerService.delete(params).subscribe(
      //   (response) => {
      //     this.apiSubscription.unsubscribe();
      //   },
      //   (error) => {
      //     alert(error.error);
      //   }
      // )
    }
  }

  openModal() {
    const modal = document.getElementById('modal') as HTMLDialogElement;
    if(modal) {
      modal.showModal();
    }
  }

  closeModal() {
    const modal = document.getElementById('modal') as HTMLDialogElement;
    if(modal) {
      modal.close();
    }
  }

  /*
    Add task to the list
  */
  addTask() {
    const input = document.getElementById('taskName') as HTMLInputElement;
    if(!!input.value) {
      let id = this.tasks.find((object) => object.id === Math.max(...this.tasks.map((object) => object.id)))?.id;
      id = !!id || id === 0 ? id + 1: 0;
      let task = new Timer(id, input.value);
      this.tasks.push(task);
      input.value = '';
      // this.apiSubscription = this.timerService.add(task).subscribe(
      //   (response) => {
      //     this.apiSubscription.unsubscribe();
      //   },
      //   (error) => {
      //     alert(error.error);
      //   }
      // )
    }
    this.closeModal();
  }

  /*
    Format the display of template
  */
  format(num: number | undefined) {
    return (num + '').length === 1 ? '0' + num : num + '';
  }
}
