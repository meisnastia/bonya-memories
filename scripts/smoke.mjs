// Post-deploy smoke-тест: проверяет ЖИВОЙ сайт после деплоя.
// Базовый URL передаётся через переменную окружения SMOKE_BASE_URL.
import assert from "node:assert/strict";

const base = process.env.SMOKE_BASE_URL;
if (!base) {
  console.error("✗ SMOKE_BASE_URL не задан");
  process.exit(2);
}

const get = (path) => fetch(new URL(path, base), { redirect: "follow" });

let failures = 0;
const check = async (name, fn) => {
  try {
    await fn();
    console.log("  ✓", name);
  } catch (e) {
    failures++;
    console.error("  ✗", name, "—", e.message);
  }
};

console.log("Smoke-тест против:", base);

await check("главная отвечает 200 и содержит «Боня»", async () => {
  const r = await get("/");
  assert.equal(r.status, 200, `статус ${r.status}`);
  assert.match(await r.text(), /Боня/);
});
await check("styles.css доступен", async () =>
  assert.equal((await get("/styles.css")).status, 200),
);
await check("script.js доступен", async () =>
  assert.equal((await get("/script.js")).status, 200),
);
await check("favicon доступен", async () =>
  assert.equal((await get("/images/favicon-32.png")).status, 200),
);

if (failures) {
  console.error(`\nПровалено проверок: ${failures}`);
  process.exit(1);
}
console.log("\nВсе smoke-проверки пройдены ✅");
