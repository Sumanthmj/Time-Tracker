export class Timer {
    id: number | null = 0;
    label: string = '';
    action: string = 'Start';
    hours: number = 0;
    minutes: number = 0;
    seconds: number = 0;
    history: Time[] = [];
    constructor(id: number | null = 0, label: string = '', history: any[] = [], action = 'Start') {
        this.id = id;
        this.label = label;
        if(history.length > 0) {
            history.forEach((element) => {
                if(!!element?.start) {
                    element.start = element.start;
                }
                if(!!element?.end) {
                    element.end = element.end
                }
            });
        }
        this.history = history;
        this.action = action;
    }
}

class Time {
    start?: Date = new Date();
    end?: Date | undefined = new Date();
    constructor() {}
}