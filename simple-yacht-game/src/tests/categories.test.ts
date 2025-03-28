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

test("full house", async (t) => {
  const c = categories["full house"];

  await tester([2, 3, 2, 3, 2], 25, c, t);
  await tester([4, 1, 1, 1, 4], 25, c, t);
  await tester([6, 6, 2, 2, 2], 25, c, t);
  await tester([1, 2, 2, 2, 2], 0, c, t);
  await tester([1, 1, 1, 1, 1], 0, c, t);
});

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

test("large straight", async (t) => {
  const c = categories["large straight"];

  await tester([1, 2, 3, 4, 5], 40, c, t);
  await tester([6, 2, 3, 4, 5], 40, c, t);
  await tester([4, 2, 6, 3, 5], 40, c, t);
  await tester([1, 2, 3, 5, 6], 0, c, t);
  await tester([1, 1, 1, 1, 1], 0, c, t);
});
