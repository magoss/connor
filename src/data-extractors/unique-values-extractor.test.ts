import { extractUnique } from "./unique-values-extractor";

describe("Unique values extractor", () => {
  it("picks values for specified key and returns array of the values", () => {
    const exampleData: {firstName: string, lastName: string}[] = [{
      firstName: "Saurabh",
      lastName: "Gupta",
    }, {
      firstName: "Jan",
      lastName: "Kowalski",
    }, {
      firstName: "John",
      lastName: "Doe",
      }];
    
    const result = extractUnique("firstName", exampleData);
    expect(result).toStrictEqual(["Saurabh", "Jan", "John"]);
  });

  it("omits falsy values", () => {
    const exampleData: {firstName: any, lastName: string}[] = [{
      firstName: undefined,
      lastName: "Gupta",
    }, {
      firstName: "Jan",
      lastName: "Kowalski",
    }, {
      firstName: "",
      lastName: "Doe",
    }, {
      firstName: false,
      lastName: "Smith",
    }];
    
    const result = extractUnique("firstName", exampleData);
    expect(result).toStrictEqual(["Jan"]);
  });

  it("falls back to empty collection for empty input", () => {
    const emptyCollection: any[] = [];
    
    const result = extractUnique("someProperty", emptyCollection);
    expect(result).toStrictEqual([]);
  });

  it("falls back to empty collection for nonexistent property name", () => {
    const exampleDate: any[] = [{ firstName: "John", lastName: "Doe" }];
    
    const result = extractUnique("middleName", exampleDate);
    expect(result).toStrictEqual([]);
  });
});
