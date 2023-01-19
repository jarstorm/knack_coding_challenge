# My solution

I created a method called `sanitizeObject` in order to remove duplicate elements inside an object.

## How to run the app
`npm init` command to install all dependencies


`npm start` run the app to get **clean_application.json** file


`npm test`run all the unit test using Jest

## How it works
I created the `sanitizeObject(data, keyId)` where data is the JSON object and keyId is the key name to check if an object is a duplicate. By default keyId parameter value it's `_id`
It uses only one key for the whole object in order to know if two documents are the same. 
If different objects could contain different keys (like _id for `objects` id for `scenes`) you need to run twice the method.
Also using `JSON.parse` method we remove possible duplicate keys any object could have because Javascript cannot support multiple keys in an object.

Inside the method I think there could be 3 different cases:
<ol>
<li>The data could be an array: then we need to iterate over all the elements to check if there's any duplicate
<ol>
<li>Case array of primitives: just check the values and see if there are duplicates</li>
<li>Case array ob objects: we need to check that we use the key only once</li>
<li>Case array of array: just sanitize all the elements independently</li>
</ol>
</li>
<li> The data could be an object: check all the key-value pairs:
<ol>
<li>Case the value is a primitive: just use it, cannot be duplicates due to `JSON.parse` method we are using</li>
<li>Case the value it's an array: use the method to sanitize arrays (case 1)</li>
<li>Case the value it's ab object: use the method to sanitize objects (case 2)</li>
</ol>
</li>
<li>The data could be any other thing: then we need to use this value because if could be a string, a number, null and so on</li>
</ol>

## Remove Duplicates From Mock Knack Application Schema

Knack is a no-code platform that includes an online database. Knack users will at times, through unexpected API usage or an unknown bug, corrupt their application schemas. One common issue they may run into is having duplicate fields and/or objects in their application schema. These duplicates cannot be removed by the Knack UI and lead to TypeErrors and other problems.

The purpose of this coding exercise is to create a Node.js application that can programmatically remove all duplicate fields and objects from the given mock application schema and output a new sanitized version.

The "mock_application.json" file in this repository contains data which represents an actual Knack application schema including all currently existing properties. Your code should process the data, remove any duplicates, and output a new JSON file "clean_application.json" which retains all other properties of the Knack application.

Within a standard Knack application there is a `versions` property which has 2 collections:
1. `objects`: an array of Knack "objects" which contains "fields"
2. `scenes`: an array of Knack "scenes" which contains "views"

### Requirements
- The code should be written in JS and utilize the Node.js framework
- We expect tests (unit tests on business logic, etc. - whatever you are comfortable with)
- We expect to see documentation in the form of a README
- We're looking for code that would be easy to maintain
- We're looking for code that would scale

### Time
We understand that you are busy and programming projects can take a long time. We advise spending 2 hours on the exercise and seeing where you get. If there are still open requirements at the end of the 2 hour period, feel free to outline what it would take to complete those in TODO comments inline in the code, or a list of notes on what you'd need to do finish things up. If you want to keep working and take things over the finish line, great.

### Notes
- Leveraging 3rd party libraries/modules is perfectly fine

### How to submit your solution
- Please send us a zip or a tar of the `node-coding-exercise-master` directory which should include your application


