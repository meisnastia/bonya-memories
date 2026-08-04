import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";

const root = new URL("../", import.meta.url);
const html = readFileSync(new URL("index.html", root), "utf8");

test("есть заголовок и мета-описание", () => {
  assert.match(html, /<title>[^<]*Боня[^<]*<\/title>/);
  assert.match(html, /<meta name="description"/);
});

test("подключены Open Graph и фавикон", () => {
  assert.match(html, /property="og:image"/);
  assert.match(html, /favicon-32\.png/);
});

test("в лайтбоксе нет пустого src", () => {
  assert.ok(!/src=""/.test(html), "найден пустой src");
});

test("все локальные ассеты существуют на диске", () => {
  const refs = [
    ...html.matchAll(/(?:src|href)="(images\/[^"]+|styles\.css|script\.js)"/g),
  ].map((m) => m[1]);
  const missing = refs.filter((r) => !existsSync(new URL(r, root)));
  assert.deepEqual(missing, [], "отсутствуют файлы: " + missing.join(", "));
});

test("у всех внутренних якорей есть цели", () => {
  const anchors = [...html.matchAll(/href="#([a-z][\w-]*)"/g)].map((m) => m[1]);
  const missing = anchors.filter((id) => !new RegExp(`id="${id}"`).test(html));
  assert.deepEqual(missing, [], "якоря без целей: " + missing.join(", "));
});

test("у каждого <img> есть атрибут alt", () => {
  const imgs = [...html.matchAll(/<img\b[^>]*>/g)].map((m) => m[0]);
  const noAlt = imgs.filter((tag) => !/\balt=/.test(tag));
  assert.deepEqual(noAlt, [], "изображения без alt: " + noAlt.length);
});
