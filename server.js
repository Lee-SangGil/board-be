const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const PORT = 5000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(cors({
    origin: "http://localhost:8081", // 접근 권한을 부여하는 도메인
    credentials: true, // 응답 헤더에 Access-Control-Allow-Credentials 추가
    optionsSuccessStatus: 200, // 응답 상태 200으로 설정
}));

const db = [
    {name: '김길동', age:'29', id:'aaa', pwd:'aaa'},
    {name: '이길동', age:'49', id:'bbb', pwd:'bbb'},
    {name: '박길동', age:'40', id:'ccc', pwd:'ccc'},
    {name: '공길동', age:'11', id:'dd', pwd:'dd'},
    {name: '장길동', age:'19', id:'ee', pwd:'ee'},
    {name: '사길동', age:'24', id:'ff', pwd:'ff'},
    {name: '오길동', age:'52', id:'gg', pwd:'gg'},
    {name: '육길동', age:'34', id:'hh', pwd:'hh'},
];

app.listen(PORT, () => {
    console.log('Server is listening on PORT : '+ PORT);
});

app.get('/', (req, res)=>{
    res.send('hello world');
})

app.post('/register',(req, res)=>{
    let id = req.body.id;
    let pwd = req.body.pwd;
    let name = req.body.name;
    let age = req.body.age;

    console.log(id);   
    let flag = false; 

    const idCheck = db.find(v=>{
                        return v.id == id;
                    })

    console.log(idCheck);   

    if(idCheck == undefined || idCheck == null || idCheck == ''){
        console.log("여기왓다");
        db.push({name : name, age : age, id : id, pwd : pwd});
        flag = true;
    }

    console.log(db);
    console.log(flag);

    res.send(flag);

});

app.post('/login', (req, res)=>{
    console.log(req.body);
    let id = req.body.id;
    let pwd = req.body.pwd;

    let flag = false;
    let userName = {};

    for(let i=0; i<db.length; i++){
        if(id == db[i].id){
            if(pwd == db[i].pwd){
                flag = true;
                userName = {'name' : db[i].name};
            }
        }
    }
    res.send(userName);

})