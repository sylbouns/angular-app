import { Event } from './event.model';
import { Guid } from 'guid-typescript';
import { addDays, addHours, addMinutes, setHours, setMinutes, setMilliseconds } from 'date-fns';
import { LoremIpsum } from "lorem-ipsum";

export const events: Event[] = [];

const quantity = 200;
const amplitude = 150;
const lorem = new LoremIpsum({
    sentencesPerParagraph: {
        max: 8,
        min: 4
    },
    wordsPerSentence: {
        max: 16,
        min: 4
    }
});


function random(max: number, min: number = 0) {
    return Math.round(Math.random() * (max - min)) + min;
}

let date = new Date();

for (let i = 0; i < quantity; i++) {
    let event = new Event();
    // id
    event.id = Guid.create();
    // label
    event.label = lorem.generateWords(random(6, 2));
    event.label = event.label.charAt(0).toUpperCase() + event.label.slice(1);
    // start
    event.start = new Date(date);
    event.start = setMilliseconds(event.start, 0);
    event.start = setMinutes(event.start, random(4) * 15);
    event.start = addDays(event.start, random(amplitude, -amplitude));
    event.start = addHours(event.start, random(24, -24));
    // end
    if (random(5) != 0) {
        event.end = event.start;
        if (random(5, 0) == 0) event.end = addDays(event.end, random(15));
        if (random(4, 0) == 0) event.end = addHours(event.end, random(24));
        if (random(0, 0) == 0) event.end = addMinutes(event.end, random(64) * 15);
    }
    // allday
    event.allday = random(4) == 0;
    // comment
    event.comment = lorem.generateSentences(random(6, 2));
    event.comment = event.comment.charAt(0).toUpperCase() + event.comment.slice(1);
    // PUSH !
    events.push(event);
}