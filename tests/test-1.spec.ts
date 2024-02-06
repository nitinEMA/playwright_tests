import { test, expect } from '@playwright/test';
import * as fs from 'fs';

const configFile = fs.readFileSync('config.json', 'utf-8');
const config = JSON.parse(configFile);

const username: string = config["username"];
const accountName: string = config["accountName"];
const buttonName: string = `${accountName} ${username}`;

test('test1', async ({ browser }) => {
  const context = await browser.newContext({ storageState: 'state.json' });
  const page = await context.newPage();
  await page.goto('https://dev.ema.co/');
  await page.waitForLoadState('networkidle'); 
  await page.getByRole('button', { name: '+ New Chat' }).click();
  await page.waitForTimeout(5000);
  await page.waitForLoadState('networkidle');
  await page.getByPlaceholder('Ask Ema anything...').click();
  await page.waitForLoadState();
  await page.getByPlaceholder('Ask Ema anything...').fill("Hey, Ema!");
  await page.waitForLoadState();
  await page.locator('div:nth-child(3) > svg').click();
  await page.waitForTimeout(10000);
  const element = page.locator('body > div.w-full.h-full.bg-onboarding > div > div.chat-header.w-4\\/6.\\32 xl\\:w-3\\/4.z-10.bg-white.shadow-\\[-5px_0px_11px_rgba\\(0\\,0\\,0\\,0\\.08\\)\\]');
  const innerText = await element.innerText();
  fs.writeFileSync('playwright-results/test-1-response.txt', innerText);
});