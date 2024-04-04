import { toogleSidebarHandler } from "@/utils/sideBarFunc";

describe("toogleSidebarHandler function", () => {
  it("should return the opposite boolean value", () => {
    // Test when input is true
    expect(toogleSidebarHandler(true)).toBe(false);

    // Test when input is false
    expect(toogleSidebarHandler(false)).toBe(true);
  });
});
