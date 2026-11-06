const os = require('node:os');
const { pathToFileURL } = require('node:url');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
let chromium;
try { ({ chromium } = require('playwright')); }
catch { ({ chromium } = require(path.join(os.homedir(),'.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright'))); }
(async () => {
  assert.ok(fs.existsSync(path.join(__dirname,'index.html')), 'Presentation entry must exist');
  const bundledBrowser = path.join(os.homedir(),'AppData/Local/ms-playwright/chromium-1248/chrome-win64/chrome.exe');
  const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || (fs.existsSync(bundledBrowser)?bundledBrowser:undefined);
  console.log('Launching Chromium');
  const browser = await chromium.launch({headless:true, executablePath,timeout:20000});
  const page = await browser.newPage({viewport:{width:1440,height:1000}});
  const errors=[]; page.on('pageerror',e=>errors.push(e.message));
  page.setDefaultTimeout(10000);
  console.log('Opening presentation');
  await page.goto(pathToFileURL(path.join(__dirname,'index.html')).href);
  assert.match(await page.title(),/исследование и план сайта/,'Presentation describes the research');
  await page.getByRole('heading',{name:'Что узнали о компании',exact:true}).waitFor();
  await page.getByRole('heading',{name:'Что показало исследование рынка',exact:true}).waitFor();
  await page.getByRole('heading',{name:'Как предлагаем позиционировать сайт',exact:true}).waitFor();
  assert.equal(await page.evaluate(()=>[...document.querySelectorAll('h1,h2,h3,.stage-question')].some(e=>getComputedStyle(e).fontStyle==='italic')),false,'No decorative italic headings');
  console.log('Checking persona / journey');
  assert.equal(await page.locator('[data-stage]').count(),8,'Each scenario has a complete eight-block route');
  await page.getByRole('button',{name:'Крупная компания',exact:true}).click();
  await page.getByRole('tab',{name:'06 Расчёт и документы',exact:true}).click();
  await page.getByRole('tabpanel').getByRole('heading',{name:'Индивидуальная смета после осмотра',exact:true}).waitFor();
  await page.getByRole('tabpanel').getByText('На чём основан ответ', {exact:true}).waitFor();
  await page.getByRole('button',{name:'Небольшой офис',exact:true}).click();
  await page.getByRole('tab',{name:'03 Стоимость',exact:true}).click();
  await page.getByRole('tabpanel').getByRole('heading',{name:'Понятная почасовая модель',exact:true}).waitFor();
  await page.locator('#audience-focus').getByText('На чём делаем акцент', {exact:true}).waitFor();
  await page.locator('#after-request').getByRole('heading',{name:'Что происходит после обращения',exact:true}).waitFor();
  for(let i=0;i<8;i++) await page.locator(`[data-stage="${i}"]`).click();
  console.log('Checking quiz');
  await page.locator('[data-open-quiz]').first().click();
  const dialog=page.getByRole('dialog');
  await dialog.getByRole('button',{name:'Далее',exact:true}).click();
  await dialog.getByRole('button',{name:'Далее',exact:true}).click();
  assert.equal(await dialog.locator('#from').count(),1,'Empty route must block next step');
  await dialog.getByLabel('Откуда переезжаем').fill('   ');
  await dialog.getByLabel('Куда переезжаем',{exact:true}).fill('Москва');
  await dialog.getByRole('button',{name:'Далее',exact:true}).click();
  assert.equal(await dialog.locator('#from').count(),1,'Whitespace route must block next step');
  await dialog.getByLabel('Откуда переезжаем').fill('Москва, офис А');
  await dialog.getByLabel('Куда переезжаем',{exact:true}).fill('Москва, офис Б');
  await dialog.getByRole('button',{name:'Далее',exact:true}).click();
  await dialog.getByLabel('Упаковка и маркировка').check();
  await dialog.getByRole('button',{name:'Назад',exact:true}).click();
  assert.equal(await dialog.getByLabel('Откуда переезжаем').inputValue(),'Москва, офис А');
  await dialog.getByRole('button',{name:'Далее',exact:true}).click();
  assert.equal(await dialog.getByLabel('Упаковка и маркировка').isChecked(),true);
  await dialog.getByRole('button',{name:'Посмотреть итог',exact:true}).click();
  await dialog.getByText('Сводка запроса', {exact:true}).waitFor();
  await dialog.getByText('Москва, офис А → Москва, офис Б', {exact:true}).waitFor();
  await page.keyboard.press('Escape'); assert.equal(await dialog.isVisible(),false);
  fs.mkdirSync(path.join(__dirname,'qa'),{recursive:true});
  await page.goto(pathToFileURL(path.join(__dirname,'index.html')).href);
  await page.screenshot({path:path.join(__dirname,'qa','desktop.png'),fullPage:true});
  for(const width of [360,390,768]) {
    await page.setViewportSize({width,height:844});
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`No overflow at ${width}`);
    for(const persona of ['small','large']) {
      await page.locator(`[data-persona="${persona}"]`).click();
      for(let i=0;i<8;i++) {
        await page.locator(`[data-stage="${i}"]`).click();
        assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`No stage overflow at ${width} / ${persona} / ${i}`);
      }
    }
    await page.locator('[data-open-quiz]').first().click();
    assert.equal(await dialog.isVisible(),true);
    await page.keyboard.press('Escape');
  }
  await page.screenshot({path:path.join(__dirname,'qa','mobile.png'),fullPage:true});
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.locator('[data-stage="2"]').click();
  await page.locator('[data-stage="2"]').focus();
  await page.keyboard.press('ArrowDown');
  assert.equal(await page.locator('[data-stage="3"]').getAttribute('aria-selected'),'true','Arrow-key tab navigation works');
  assert.deepEqual(errors,[],'No JavaScript errors');
  await browser.close(); console.log('PASS: research, plain typography, two audiences and eight blocks each, evidence/objections, post-request flow, form validation/back, summary, keyboard, mobile, no JS errors');
})().catch(e=>{console.error(e);process.exit(1)});
