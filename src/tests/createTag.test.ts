import { createTag } from "../lib/createTag";

test("HTMLタグの作成", () => {
  expect(createTag("test", "test.png", 500, 400)).toEqual(`
    <picture>
        <source type="image/webp" srcset="test.webp" />
        <img src="test.png" width="500" height="400" decoding="async" alt=""  />
    </picture>
    `);
});
