import { describe, test, expect } from "vitest";
import ApiClientBuilder from "./apiClientBuilder";

describe("apiClientBuilder", () => {
  test("should return an instance of the class", () => {
    expect(new ApiClientBuilder()).toBeInstanceOf(ApiClientBuilder);
  });
});
