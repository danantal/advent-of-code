import path from "path";
import fs, { access, link } from "fs";
import readline from "readline";

const data = fs.openSync(path.resolve("4.txt"), "r");

const reader = readline.createInterface({
    input: fs.createReadStream(path.resolve("4.txt"))
})

let current: string[] = [];
let count = 0;

reader.on("line", data => {
    if (data === "") {
        if (verify(current)) {
            count++;
        }
        current = []
    } else {
        current = current.concat(data.split(/\s/));
    }
})

reader.on("close", () => {
    console.log("result", count);
})

const mandatoryFields = {
    byr: (v: string) => parseInt(v, 10) >= 1920 && parseInt(v, 10) <= 2002,
    iyr: (v: string) => parseInt(v, 10) >= 2010 && parseInt(v, 10) <= 2020,
    eyr: (v: string) => parseInt(v, 10) >= 2020 && parseInt(v, 10) <= 2030,
    hgt: (v: string) => {
        const matches = v.match(/(\d{1,3})(cm|in)$/)
        if (!matches) {
            return false;
        }

        const value = parseInt(matches[1], 10);

        if (matches[2] === "cm") {
            console.log("height in cm", value);
            return value >= 150 && value <=193
        }

        if (matches[2] === "in") {
            console.log("height in in", value);
            return value >= 59 && value <=76
        }

        return false;
    },
    hcl: (v: string) => v.match(/#[a-fA-F0-9]{6}$/),
    ecl: (v: string) => v.match(/amb|blu|brn|gry|grn|hzl|oth$/),
    pid: (v: string) => v.match(/\d{9}$/),
}

const verify = (passportTokens: string[]) => {
    const fields = passportTokens.reduce((acc, c) => {
        const [f, v] = c.split(":");
        return {...acc, [f]: v}
    }, {});

    console.log("pf", fields)

    if (!Object.keys(mandatoryFields).every(f => Object.keys(fields).includes(f))) {
        return false;
    }

    for (const fieldName in fields) {
        const fieldValue = fields[fieldName as keyof typeof fields];
        const rule = mandatoryFields[fieldName as keyof typeof mandatoryFields];

        console.log(`checking rule for ${fieldName} with value: ${fieldValue}`)

        if (fieldName === "cid") {
            continue;
        }

        if (!rule(fieldValue)) {
            return false;
        }
    }

    console.log("valid");

    return true;
}
