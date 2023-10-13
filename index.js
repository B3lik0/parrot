import fs from 'fs';
import path from "path"
import colors from 'colors/safe.js';
let original;
let flipped
(() => {
    try {

        const framesPath = 'frames';
        const files = fs.readdirSync(framesPath, "utf-8");
        original = files.map(async (file) => {
            const frame = fs.readFileSync(path.join(framesPath, file), "utf-8");
            return frame.toString();
        })

        flipped = original.map(f => {
            return f
                .toString()
                .split('')
                .reverse()
                .join('')
        })

    } catch (e) {
        console.log('Error loading frames');
        console.log(e);
    }
})()
const colorsOptions = [
    'red',
    'yellow',
    'green',
    'blue',
    'magenta',
    'cyan',
    'white'
];
const selectColor = previousColor => {
    let color;
    do {
        color = Math.floor(Math.random() * colorsOptions.length);
    } while (color === previousColor);
    return color;
};
const streamer = () => {
    let index = 0;
    let lastColor;
    return setInterval(() => {
        const newColor = lastColor = selectColor(lastColor);
        console.log(colors[colorsOptions[newColor]](original[index]))
        index = (index + 1) % original.length;
    }, 70);
};

streamer()
