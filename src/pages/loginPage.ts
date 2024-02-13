require ("dotenv").config();
import { Page } from "@playwright/test";
import { error } from "console";

export default class LoginPage{
    private page: Page

    constructor(page:Page){
        this.page = page;
    }

// Get Locators
    public get eleEmailTxtField(){
        const ele = this.page.locator('input[name=email]')
        if (ele != null){
            return ele
        }
        else throw new error('element not found')
        
    }

    public get elePasswordField(){
        return this.page.locator('input[type=password]')
    }

    public get eleLoginBtn(){
        return this.page.locator('button[type=submit]')
    }


//Actions
    public async fill_eleEmailTxtField(email:string){
        const ele = await this.eleEmailTxtField;
         await ele?.fill(email);
    }

    public async fill_elePasswordField(pass:string){
        await this.elePasswordField?.fill(pass)
    }

    public async click_eleLoginBtn(){
        await this.eleLoginBtn?.click()
    }
    
}

// exports.default = LoginPage;
