import fs from "fs"

export const readDataFromFile = fileSrc => {
    const data = fs.readFileSync(fileSrc);
    return JSON.parse(data);
}

export const writeDataToFile = (data, filename) => {
    // null and 2 parameters are fro pretty printing the output
    let jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(filename, jsonData);
}
