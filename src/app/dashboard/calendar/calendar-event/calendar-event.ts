export class CalendarEvent {
    start: Date;
    end: Date;
    label: string;

    constructor() {
        this.randomize();
    }

    private randomize() {
        this.start = new Date();
        this.label = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
}
