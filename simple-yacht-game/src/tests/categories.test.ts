import test, { TestContext } from "node:test";
import { Calculator, categories, Dice } from "../categories";
import assert from "node:assert";

function tester(
  dice: Dice,
  expectedScore: number,
  calculator: Calculator,
  t: TestContext
) {
  return t.test(dice.join(",") + " == " + expectedScore, () => {
    const value = calculator(dice);
    assert.strictEqual(value, expectedScore);
  });
}

test("small straight", async (t) => {
  const c = categories["small straight"];

  await tester([1, 2, 3, 4, 6], 30, c, t);
  await tester([1, 2, 3, 4, 5], 30, c, t);
  await tester([1, 2, 3, 5, 6], 0, c, t);
  await tester([1, 2, 3, 4, 3], 30, c, t);
  await tester([2, 4, 1, 3, 6], 30, c, t);
  await tester([1, 1, 1, 1, 1], 0, c, t);
  await tester([1, 3, 4, 5, 6], 30, c, t);
});
