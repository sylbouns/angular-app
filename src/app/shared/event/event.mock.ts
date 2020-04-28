import { Event } from './event.model';
import { Guid } from 'guid-typescript';
import { addDays, addHours, addMinutes } from 'date-fns';
import { LoremIpsum } from "lorem-ipsum";

export const events: Event[] = [];

const quantity = 100;
const amplitude = 100;
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
    return Math.floor(Math.random() * Math.floor(max - min)) + min;
}

let date = new Date();

for (let i = 0; i < quantity; i++) {
    let event = new Event();
    event.id = Guid.create();
    event.start = new Date(date);
    event.start = addDays(event.start, random(amplitude, -amplitude));
    event.start = addHours(event.start, random(24, -24));
    event.start = addMinutes(event.start, random(60, -60));
    event.end = event.start;
    if (random(0, 5) == 0) {
        event.end = addDays(event.start, random(5));
        event.end = addHours(event.end, random(24));
        event.end = addMinutes(event.end, random(60));
    }
    event.label = lorem.generateWords(random(5, 1));
    event.label = event.label.charAt(0).toUpperCase() + event.label.slice(1);
    events.push(event);
}