import { readDataFromFile, writeDataToFile } from "./utils/fileUtils.js";
import { sanitizeObject } from "./utils/sanitizer.js";

const main = function () {
    console.time('Execution finished');

    console.log('Starting execution');

    const data = readDataFromFile('data/mock_application.json');

    const sanitizedData = sanitizeObject(data);

    writeDataToFile(sanitizedData, 'clean_application.json');

    console.timeEnd('Execution finished');
};


// Execute main method
main();