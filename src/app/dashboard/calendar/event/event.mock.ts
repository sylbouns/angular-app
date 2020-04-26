import { Event } from './event.model';
import { Guid } from 'guid-typescript';
import { addDays } from 'date-fns';
import { LoremIpsum } from "lorem-ipsum";

export const events: Event[] = [];

const quantity = 200;
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

for (let i = 0; i < quantity; i++) {
    let event = new Event();
    event.id = Guid.create()
    event.start = new Date();
    event.start = addDays(event.start, random(250, -250));
    event.end = addDays(event.start, random(5));
    event.label = lorem.generateWords(random(5, 1));
    event.label = event.label.charAt(0).toUpperCase() + event.label.slice(1);
    events.push(event);
}