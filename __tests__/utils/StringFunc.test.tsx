import { replaceNullWithEmptyString } from "@/utils/NulltoStringConver";
import { capitalizeFunc } from "@/utils/capitalizeFunc";
import { splitWordByCapitalLetter } from "@/utils/splitWordByCapitalLetter";

describe("replaceNullWithEmptyString function", () => {
  it("should replace null values with empty strings in the object", () => {
    // Given
    const inputObject = {
      key1: "value1",
      key2: null,
      key3: "value3",
      key4: null,
    };

    // When
    const result = replaceNullWithEmptyString(inputObject);

    // Then
    expect(result).toEqual({
      key1: "value1",
      key2: "",
      key3: "value3",
      key4: "",
    });
  });

  it("should return an empty object if the input object is empty", () => {
    // Given
    const inputObject = {};

    // When
    const result = replaceNullWithEmptyString(inputObject);

    // Then
    expect(result).toEqual({});
  });

  it("should return the same object if there are no null values", () => {
    // Given
    const inputObject = {
      key1: "value1",
      key2: "value2",
      key3: "value3",
    };

    // When
    const result = replaceNullWithEmptyString(inputObject);

    // Then
    expect(result).toEqual(inputObject);
  });
});

describe("splitWordByCapitalLetter function", () => {
  it("should split words by capital letters", () => {
    // Test cases with different input strings
    expect(splitWordByCapitalLetter("HelloWorld")).toBe("Hello World");
    expect(splitWordByCapitalLetter("CamelCase")).toBe("Camel Case");
    expect(splitWordByCapitalLetter("AnotherExample")).toBe("Another Example");
  });

  it("should return an empty string if input is empty", () => {
    // Test case with empty input string
    expect(splitWordByCapitalLetter("")).toBe("");
  });
  it("should return an empty string if input is null", () => {
    // Test case with null input
    expect(splitWordByCapitalLetter(null)).toBe("");
  });
  it("should return an empty string if input is undefined", () => {
    // Test case with undefined input
    expect(splitWordByCapitalLetter(undefined)).toBe("");
  });
  it("should return the same string if input is not a string", () => {
    // Test case with non-string input
    expect(splitWordByCapitalLetter("123")).toBe("123");
  });
});

describe("capitalizeFunc function", () => {
  it("should capitalize the first letter of a string", () => {
    // Test cases with different input strings
    expect(capitalizeFunc("hello")).toBe("Hello");
    expect(capitalizeFunc("world")).toBe("World");
    expect(capitalizeFunc("test")).toBe("Test");
  });

  it("should return an empty string if input is empty", () => {
    // Test case with empty input string
    expect(capitalizeFunc("")).toBe("");
  });

  it("should return an empty string if input is null", () => {
    // Test case with null input
    expect(capitalizeFunc(null)).toBe("");
  });

  it("should return an empty string if input is undefined", () => {
    // Test case with undefined input
    expect(capitalizeFunc(undefined)).toBe("");
  });
});
