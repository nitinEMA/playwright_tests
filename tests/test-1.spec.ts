import { test, expect } from '@playwright/test';
import * as fs from 'fs';

const configFile = fs.readFileSync('config.json', 'utf-8');
const config = JSON.parse(configFile);

const username: string = config["username"];
const accountName: string = config["accountName"];
const buttonName: string = `${accountName} ${username}`;

const stateJsonContent = process.env.STATE_JSON || "This didn't work";
// const stateJsonContent = "Nitin Teja"

test('login', async ({ browser }) => {
  const context = await browser.newContext({ storageState: 'state.json' });
  const page = await context.newPage();
  await page.goto('https://www.editpad.org/');
  await page.locator('#contentSec').getByRole('button').click();
  await page.locator('#textarea__editor').click();
  await page.locator('#textarea__editor').fill(stateJsonContent);
});