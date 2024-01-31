import { test, expect } from '@playwright/test';
import * as fs from 'fs';

const configFile = fs.readFileSync('config.json', 'utf-8');
const config = JSON.parse(configFile);

const username: string = config["username"];
const accountName: string = config["accountName"];
const buttonName: string = `${accountName} ${username}`;

const stateJsonContent = process.env.STATE_JSON || '{}';
fs.writeFileSync('state.json', stateJsonContent);

test('login', async ({ browser }) => {
  const context = await browser.newContext({ storageState: 'state.json' });
  const page = await context.newPage();
  await page.goto('https://dev.ema.co/');
  await page.waitForLoadState('networkidle'); 
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.waitForTimeout(5000);
  await page.getByRole('button', { name: 'Auth Continue with Google' }).click();
  await page.waitForTimeout(8000);
  await page.getByRole('link', { name: buttonName }).click();
  await page.waitForTimeout(5000);
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.waitForTimeout(5000);
  await page.getByRole('button', { name: '+ New Chat' }).click();
  await page.waitForLoadState('networkidle');
});