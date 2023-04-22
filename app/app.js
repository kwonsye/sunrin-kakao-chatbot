const express = require('express');
const puppeteer = require('puppeteer');

const app = express();

app.use(express.json());    

app.post('/school-meal', async (request, response)=>{
    const utterance = request.body.userRequest.utterance;
    
    if(utterance === "오늘의 급식"){
        const today = new Date();
        
        const menus = await crawlTodaysMenu(today.getDate());
        
        const chatbotResponse = {
            "version": "2.0",
            "template": {
                "outputs": [
                    {
                        "simpleText": {
                            "text": menus
                        }
                    }
                ]
            }
        }

        response.json(chatbotResponse)
    }
});

app.post('/school-schedule', async (request, response)=>{
    const utterance = request.body.userRequest.utterance;

    if(utterance === "오늘의 일정"){
        const today = new Date(2023, 3, 3);

        const schedules = await crawlTodaySchedule(today.getDate());
        
        const chatbotResponse = {
            "version": "2.0",
            "template": {
                "outputs": [
                    {
                        "simpleText": {
                            "text": schedules
                        }
                    }
                ]
            }
        }

        response.json(chatbotResponse)
    }
})

async function crawlTodaysMenu(day){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://sunrint.sen.hs.kr/65129/subMenu.do');
    
    const tds = await page.$$('.calendar_schedule > table > tbody > tr > td');

    for await (const td of tds){
        const tdDay = await td.evaluate(td=>td.innerText);
        
        if(tdDay == day+'\n점심'){
            const a = await td.$('ul > li > a');
            
            await a.click();
            await page.waitForSelector('.popup_contents');

            const popupContents = await page.$('.popup_contents');
            
            if(popupContents){
                const columns = await popupContents.$$('.ta_l')
                const menus = await columns[3].evaluate(column=>column.innerText);
                
                return menus;
            }
        }
    }
    
    await page.close();
    await browser.close();

    return "오늘은 급식이 없는 날입니다.";
}

async function crawlTodaySchedule(day) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://sunrint.sen.hs.kr/88411/subMenu.do');

    const tds = await page.$$('.calendar_schedule > table > tbody > tr > td');

    for await (const td of tds){
        const tdDay = await td.evaluate(td=>td.innerText);

        const splits = tdDay.split("\n");

        if(splits[0] == day){
            return splits[1];
        }
    }
    
    await page.close();
    await browser.close();

    return "오늘은 일정이 없는 날입니다.";

}

app.get('/crawling/test', async (request, response)=>{
    const month = 4;
    const day = 7;

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://sunrint.sen.hs.kr/65129/subMenu.do');
    
    const tds = await page.$$('.calendar_schedule > table > tbody > tr > td');

    for await (const td of tds){
        const tdDay = await td.evaluate(td=>td.innerText);
        
        if(tdDay == day+'\n점심'){
            const a = await td.$('ul > li > a');
            
            await a.click();
            await page.waitForSelector('.popup_contents');

            const popupContents = await page.$('.popup_contents');
            
            if(popupContents){
                const columns = await popupContents.$$('.ta_l')
                const menus = await columns[3].evaluate(column=>column.innerText);
                
                const chatbotResponse = {
                    "version": "2.0",
                    "template": {
                        "outputs": [
                            {
                                "simpleText": {
                                    "text": menus
                                }
                            }
                        ]
                    }
                }
            
                response.json(chatbotResponse)
            }
        }
    }

    const chatbotResponse = {
        "version": "2.0",
        "template": {
            "outputs": [
                {
                    "simpleText": {
                        "text": "점심이 없는 날짜입니다. 다른 날짜를 입력해주세요 :)"
                    }
                }
            ]
        }
    }
    response.json(chatbotResponse)

    await page.close();
    await browser.close();
});

app.listen(3001, ()=> console.log("node on 3001"));