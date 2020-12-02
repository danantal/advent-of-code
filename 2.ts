import path from "path";
import fs from "fs";

const data = fs.readFileSync(path.resolve("2.txt"), {encoding: "utf-8"})

let count = 0;

const bools = (a: boolean, b: boolean) => {
    return (a || b) && (a !== b);
}

data.split(/\n/).forEach(p => {
    const [range, l, password] = p.split(" ")
    const [min, max] = range.split("-");
    const [letter] = l.split(":");

    const pos1 = parseInt(min, 10) - 1;
    const pos2 = parseInt(max, 10) - 1;

    const chars = password.split("");
    if (bools(chars[pos1] === letter, chars[pos2] === letter)) {
        console.log("correct", pos1, pos2, letter, password);
        count++;
    }
})

console.log("result", count);

