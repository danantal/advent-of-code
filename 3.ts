import path from "path";
import fs from "fs";

const data = fs.readFileSync(path.resolve("3.txt"), {encoding: "utf-8"})

const rows = data.split(/\n/);

let pos = 0

const calculate = () => {
    let count = 0;

    rows.forEach((p, i) => {
        if (i % 2 !== 0) {
            return;
        }
        const row = Array.from(p).slice(0, 31).map(t => t === "." ? 0 : 1)

        console.log(`row ${i + 1}, hit: ${row[pos % row.length]}, pos: ${pos % row.length}, row.length: ${row.length}`)
        count += row[pos%row.length];
        pos+=1;
    })

    return count;
}



console.log("result", calculate());

