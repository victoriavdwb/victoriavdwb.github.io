import puppeteer from "puppeteer-core";

const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: "new",
  args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--hide-scrollbars"],
});

const page = await browser.newPage();
await page.setViewport({ width: 1300, height: 1100, deviceScaleFactor: 2 });

const logs = [];
page.on("console", (msg) => {
  if (["error", "warning"].includes(msg.type())) logs.push(`[${msg.type()}] ${msg.text()}`);
});
page.on("pageerror", (err) => logs.push(`[pageerror] ${err.message}`));

await page.goto("http://localhost:3000/de", { waitUntil: "networkidle0", timeout: 60000 });
await page.evaluate(() => {
  document.getElementById("koerper")?.scrollIntoView({ block: "start" });
});
await new Promise((r) => setTimeout(r, 6000));

const el = await page.$("#koerper canvas");
if (el) {
  await el.screenshot({ path: "/tmp/canvas.png" });
  console.log("canvas screenshot ok");
} else {
  await page.screenshot({ path: "/tmp/canvas.png" });
  console.log("no canvas found, full page shot");
}
console.log(logs.slice(0, 30).join("\n") || "no console errors");
await browser.close();
