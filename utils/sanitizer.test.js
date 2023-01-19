import { sanitizeObject } from "./sanitizer";

describe('sanitizer method', () => {
    test('sanitize empty object', () => {
        expect(sanitizeObject({})).toStrictEqual({});
    });

    test('sanitize basic object', () => {
        expect(sanitizeObject({ name: "Joe" })).toStrictEqual({ name: "Joe" });
    });

    test('sanitize basic object with null', () => {
        expect(sanitizeObject({ name: null })).toStrictEqual({ name: null });
    });

    test('sanitize empty array', () => {
        expect(sanitizeObject({ list: [] })).toStrictEqual({ list: [] });
    });

    test('sanitize array with two repeated objects using default key', () => {
        expect(sanitizeObject({ list: [{ _id: 1, name: "a" }, { _id: 1, name: "b" }] }))
            .toStrictEqual({ list: [{ _id: 1, name: "a" }] });
    });

    test('sanitize array with two repeated objects using custom key', () => {
        expect(sanitizeObject({ list: [{ _id: 1, name: "a", field: "1" }, { _id: 2, name: "b", field: "1" }] }, ["field"]))
            .toStrictEqual({ list: [{ _id: 1, name: "a", field: "1" }] });
    });

    test('sanitize array with two repeated objects using custom key that does not exist in object', () => {
        expect(sanitizeObject({ list: [{ _id: 1, name: "a", field: "1" }, { _id: 2, name: "b", field: "1" }] }, ["wrong"]))
            .toStrictEqual({ list: [{ _id: 1, name: "a", field: "1" }, { _id: 2, name: "b", field: "1" }] });
    });

    test('sanitize array with two repeated values using default key', () => {
        expect(sanitizeObject({ list: [1, 1] }))
            .toStrictEqual({ list: [1] });
    });

    test('sanitize array with two repeated values using custom key', () => {
        expect(sanitizeObject({ list: [1, 1] }, ["field"]))
            .toStrictEqual({ list: [1] });
    });

    test('sanitize array with two repeated values using custom key that does not exist', () => {
        expect(sanitizeObject({ list: [1, 1] }, ["wrong"]))
            .toStrictEqual({ list: [1] });
    });

    test('sanitize array two repeated values using default key first and then custom key', () => {
        const allData = sanitizeObject(sanitizeObject({ list: [{ _id: 1, name: "a", field: "1" }, { _id: 2, name: "b", field: "1" } , { _id: 1, name: "c", field: "2" }] }), "field");
        const sanitizedData = { list: [{ _id: 1, name: "a", field: "1" }] }
        expect(allData)
            .toStrictEqual(sanitizedData);
    });

    test('sanitize array of array', () => {
        expect(sanitizeObject({ list: [[1]] }))
            .toStrictEqual({ list: [[1]] });
    });

    test('sanitize array of array with multiple entries', () => {
        expect(sanitizeObject({ list: [[1], [2]] }))
            .toStrictEqual({ list: [[1], [2]] });
    });
});