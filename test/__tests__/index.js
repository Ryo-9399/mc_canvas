import { use, expect } from "chai";
import { matchSnapshot } from "chai-karma-snapshot";

// Instruct chai to use matchSnapshot plugin.
use(matchSnapshot);

describe("placeholder", () => {
  it("test", () => {
    expect({ foo: "bar" }).to.matchSnapshot();
  });
});
