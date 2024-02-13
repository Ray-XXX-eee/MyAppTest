import { test, expect, Browser, Page, BrowserContext, chromium } from '@playwright/test';
import LoginPage from '../pages/loginPage';
require ("dotenv").config();



test.describe('Login page tests',()=>{

  let browser: Browser;
  let context : BrowserContext;
  let page: Page;
  const env = process.env
  //pages
  let loginPage : LoginPage;

  test.beforeAll(async ()=>{
    browser = await chromium.launch({headless: true});
    context = await browser.newContext();
    page = await context.newPage();
    loginPage = new LoginPage(page)
    
  })

  test.beforeEach(async ()=>{
   
    await page.goto(env.BASE_URL);
    })


  test('has title', async ({ page }) => {
    // await expect(page).toHaveTitle('Vite + React');
  });


  test('User login with button click', async ({ page }) => {
    //steps:
    //goto login page
    // Input email:
    loginPage.fill_eleEmailTxtField(env.EMAIL)
    // Input password:
    loginPage.fill_elePasswordField(env.PASSWORD)
    // Click Login: 
    loginPage.click_eleLoginBtn

    //assert
    // Expects Dashboard page
    await page.waitForLoadState()
    await expect(page.locator("a:has-text('home')").first()).toBeVisible();
  });

  test('User login with Enter key', async ({ page }) => {
    //steps:
    //goto login page
    await page.goto(env.BASE_URL);
    // Input email:
    await page.locator("input[name=email]").fill(env.EMAIL)
    // Input password:
    await page.locator("input[type=password]").fill(env.PASSWORD)
    // Click Login: 
    await page.keyboard.press('Enter')

    //assert
    // Expects Dashboard page
    await page.waitForLoadState()
    await expect(page.locator('a:has-text("Home")').first()).toBeVisible();
  });


  test.afterEach(async ()=>{
    // await page.close()
  })

  test.afterAll(async ()=>{
    await browser.close();
  })


})
