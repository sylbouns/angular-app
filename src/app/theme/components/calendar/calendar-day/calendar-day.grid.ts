import { CalendarEvent } from '../calendar-event';
import { DateFsnService } from '@app/theme/services/date-fsn.service';

export const df = new DateFsnService();

/* GRID SCOPE */
export class GridScope {
    public min: number;
    public max: number;
    public length: number;
    public minLength: number;
    public cols: number;

    constructor(date: Date, minLength: number) {
        this.minLength = minLength;
        this.min = df.startOfDay(date).getTime();
        this.max = df.endOfDay(date).getTime();
        this.length = this.max - this.min;
    }
}

/* GRID EVENT */
export class GridEvent {
    public event: CalendarEvent;
    public start: number;
    public end: number;
    public col: number;
    public span: number = 1;

    constructor(event: CalendarEvent, scope: GridScope) {
        this.event = event;
        // Set min max 
        this.start = Math.max(event.start.getTime(), scope.min);
        this.end = event.end ? Math.min(event.end.getTime(), scope.max) : this.start + scope.minLength;
        if (this.end > scope.max) this.end = scope.max;
        // Set min length 
        let length = this.end - this.start;
        if (length < scope.minLength) {
            if (this.end == scope.max) this.start = this.start - (scope.minLength - length);
            else this.end = this.end + (scope.minLength - length);
        }
        length = this.end - this.start;
        // Set start end relative
        this.start = this.start - scope.min;
        this.end = this.end - scope.min;
    }

    get styles(): { [key: string]: string } {
        return {
            gridColumn: `${this.col + 1} / span ${this.span - this.col}`,
            gridRow: `time-${this.start} / time-${this.end}`,
        }
    }
}

/* GRID COL */
export class GridCol {
    private gridEvents: GridEvent[] = [];

    private findIndex(gridEvent: GridEvent): number {
        return this.gridEvents.findIndex((eventCurrent, index, gridEvents) => {
            let eventAfter = gridEvents[index + 1];
            if (eventCurrent.end <= gridEvent.start && (!eventAfter || (gridEvent.end <= eventAfter.start))) return true;
            let eventBefore = gridEvents[index - 1];
            if ((!eventBefore || (eventBefore.end <= gridEvent.start)) && gridEvent.end <= eventCurrent.start) return true;
        });
    }

    public insertEvent(gridEvent: GridEvent): boolean {
        this.gridEvents.sort((a, b) => a.start - b.start);
        let index = this.gridEvents.length ? this.findIndex(gridEvent) : 0;
        if (index != -1) this.gridEvents.splice(index, 0, gridEvent);
        return index != -1;
    }
}

/* GRID */
export class Grid {
    public gridEvents: GridEvent[] = [];
    private scope: GridScope;
    private rows: number[] = [];
    private cols: GridCol[] = [];

    constructor(date: Date, events: CalendarEvent[], minLength: number = 1800000) {
        this.scope = new GridScope(date, minLength);
        events.map(event => this.newGridEvent(event));
        this.gridEvents.map(gridEvent => gridEvent.col = this.getCol(gridEvent));
        this.scope.cols = this.cols.length;
        this.gridEvents.map(gridEvent => gridEvent.span = this.getSpan(gridEvent));
    }

    private newGridEvent(event: CalendarEvent): void {
        let gridEvent = new GridEvent(event, this.scope);
        this.gridEvents.push(gridEvent);
        this.rows.push(gridEvent.start);
        this.rows.push(gridEvent.end);
    }

    private getCol(gridEvent: GridEvent, col: number = 0): number {
        if (this.cols[col] == undefined) this.cols[col] = new GridCol();
        if (this.cols[col].insertEvent(gridEvent)) return col;
        else return this.getCol(gridEvent, col + 1);
    }

    private getSpan(gridEvent: GridEvent, col: number = undefined): number {
        if (!col) col = gridEvent.col + 1;
        if (this.cols[col] == undefined || !this.cols[col].insertEvent(gridEvent)) return col;
        else return this.getSpan(gridEvent, col + 1);
    }

    get styles(): { [key: string]: string } {
        return {
            gridTemplateRows: this.getGridTemplateRows(),
            gridTemplateColumns: this.getGridTemplateColumns(),
        }
    }

    private getGridTemplateRows(): string {
        let gridTemplateRows: string = '';
        this.rows.filter((row, index, rows) => rows.indexOf(row) == index)
            .sort((a, b) => a - b)
            .map((time, index, rows) => gridTemplateRows += `${this.rowPercent(time) - this.rowPercent(rows[index - 1])}% [time-${time}] `);
        return gridTemplateRows;
    }

    private getGridTemplateColumns(): string { 
        let gridTemplateColumns: string = '';
        this.cols.map(col => gridTemplateColumns += `${1 * 100 / this.cols.length}% `);
        return gridTemplateColumns;
    }

    private rowPercent(value) {
        return value ? Math.floor(value * 100000 / this.scope.length) / 1000 : 0;
    }
}
