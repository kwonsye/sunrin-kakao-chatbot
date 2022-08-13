const express = require('express');
const app = express();

app.use(express.json());    

app.post('/school-meal', (request, response)=>{
    const utterance = request.body.userRequest.utterance;
    
    if(utterance === "오늘의 급식"){
        const chatbotResponse = {
            "version": "2.0",
            "template": {
                "outputs": [
                    {
                        "simpleText": {
                            "text": "오늘 날짜를 알려주세요. 예) 1월 1일"
                        }
                    }
                ]
            }
        }

        response.json(chatbotResponse)
    }
});

app.listen(3000, ()=> console.log("node on 3000"));