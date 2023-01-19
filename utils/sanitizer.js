import _ from "lodash";

const DEFAULT_KEY = "_id";

export const sanitizeObject = (obj, idKey = DEFAULT_KEY) => {
    let newObj = {};
    obj && Object.keys(obj).forEach(key => {
        const value = obj[key];
        if (Array.isArray(value)) {
            newObj[key] = sanitizeArray(value, idKey);
        } else if (value && typeof value === "object") {
            newObj[key] = sanitizeObject(value, idKey);
        } else {
            newObj[key] = value;
        }
    });
    return newObj;
}

const sanitizeArray = (array, idKey) => {    
    if (_fieldsAreArray(array)) {                
        return _sanitizeArrayOfArray(array);
    } else if (_fieldsAreObject(array)) {
        return _sanitizeArrayOfObjects(array, idKey)
    } else {
        return _.uniq(array);
    }
}

const _fieldsAreObject = array => {
    return array.length && array[0] != null && typeof array[0] === "object";
}

const _fieldsAreArray = array => {
    return array.length && Array.isArray(array[0]);
}

const _sanitizeArrayOfArray = (array, idKey) => {    
    let newArray = [];
    array.forEach(entry => {        
        newArray.push(sanitizeArray(entry, idKey));
    });
    return newArray;
}

const _sanitizeArrayOfObjects = (array, idKey) => {
    let usedKeys = {};
    let newArray = [];
    array.forEach(entry => {
        const key = entry[idKey];
        // Don't use the key if you used it previously
        if (key && usedKeys[key]) {
            return;
        }
        newArray.push(sanitizeObject(entry, idKey));

        if (key) {
            usedKeys[key] = true;
        }
    });
    return newArray;
}