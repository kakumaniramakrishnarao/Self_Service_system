const express=require("express")
const ejs=require('ejs')
const cp=require('cookie-parser')
const app=express()

app.set("view engine","ejs")
app.use(express.urlencoded({extended:false}))
app.use(cp())

const data={rama:'rama',arjun:'arjun'}
const questions = {
    1: { "quesId": 1, "question": "What is your Nick Name", "answer": "vikky" },
    2: { "quesId": 2, "question": "What is your Marvel Character", "answer": "groot" },
    3: { "quesId": 3, "question": "What is your Pet name", "answer": "lovely" },
    4: { "quesId": 4, "question": "What is your Favorite colour", "answer": "red" },
    5: { "quesId": 5, "question": "What is your Favorite Palce", "answer": "paris" },
    6: { "quesId": 6, "question": "what is your Favorite movie", "answer": "rrr" },
    7: { "quesId": 7, "question": "what is your Favorite Food", "answer": "kfc" },
    8: { "quesId": 8, "question": "what is your First School", "answer": "doon" },
    9: { "quesId": 9, "question": "what is your Favorite game", "answer": "cricket" },
    10: { "quesId": 10, "question": "who is our Favorite Male Cricketer", "answer": "dhoni" },
    11: { "quesId": 11, "question": "who is our Favorite Female Cricketer", "answer": "mithaliraj" },
    12: { "quesId": 12, "question": "who is our Favorite Hero", "answer": "ntr" },
    13: { "quesId": 13, "question": "who is our Favorite Heroin", "answer": "kajal" },
    14: { "quesId": 14, "question": "What is your Best Friend Name", "answer": "ram" },
    15: { "quesId": 15, "question": "what is your Favorite Mobile Brand", "answer": "oneplus" },
    16: { "quesId": 16, "question": "what is your Favorite laptop Brand", "answer": "hp" },
    17: { "quesId": 17, "question": "what is your Favorite programming language", "answer": "python" },
    18: { "quesId": 18, "question": "what is your Favorite Music", "answer": "barbiegirl" },
    19: { "quesId": 19, "question": "what is your Favorite Singer", "answer": "dsp" },
    20: { "quesId": 20, "question": "what is your Favorite Book", "answer": "earlynight" }
}

function getRandomQuestions() {
    return Object.keys(questions).sort((a, b) => Math.random() > 0.5 ? -1 : 1).slice(0, 5).map(i => questions[i])
}

app.get('/',(req,res)=>{
    res.render("loginUsername.ejs")
})

app.post('/authUsername',(req,res)=>{
    var username=req.body.username

    if(username in data){
        res.cookie('username',username)
        res.render('loginPassword.ejs')
    }
    else{
        res.render('loginStatus.ejs',{status:'username is incorrect'})
    }
})

app.post('/authPassword',(req,res)=>{
    var password=req.body.Password
    var username=req.cookies.username
    if(data[username]==password){
        res.render('loginStatus.ejs',{status:'login sucess'})
    }
    else{
        res.render('loginStatus.ejs',{status:'password is incorrect'})
    }
})    

app.get('/forgetuser',(req,res)=>{
    var ques=getRandomQuestions()
    res.render("forgetQ.ejs",{ques})
})

app.post('/checkQ',(req,res)=>{
    var answered = 0;
    for(var i = 0; i < 5; i++)
    {
        qid = req.body[i + ".qid"]
        givenAns = req.body[i + ".ans"]
        if(questions[qid]["answer"] == givenAns.toLowerCase())
            answered = answered + 1;
    }
    if(answered < 5){
        res.render('loginStatus.ejs', { status: 'wrong answers' })
    }
    else{
        res.render('loginStatus.ejs', { status: 'we have emailed your username, please check' })
    }
    
})



app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000.");
});
