const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const PORT = 5000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//cors 정책 에러 관련
app.use(cors({
    origin: "http://localhost:3000", // 접근 권한을 부여하는 도메인
    credentials: true, // 응답 헤더에 Access-Control-Allow-Credentials 추가
    optionsSuccessStatus: 200, // 응답 상태 200으로 설정
}));

const db = [
    {name: '김길동', age:'29', id:'aaa', pwd:'aaa', region:'서울', gender:'남'},
    {name: '이길동', age:'49', id:'bbb', pwd:'bbb', region:'부산', gender:'여'},
    {name: '박길동', age:'40', id:'ccc', pwd:'ccc', region:'대구', gender:'남'},
    {name: '공길동', age:'11', id:'dd', pwd:'dd', region:'제주', gender:'여'},
    {name: '장길동', age:'19', id:'ee', pwd:'ee', region:'서울', gender:'남'},
    {name: '사길동', age:'24', id:'ff', pwd:'ff', region:'인천', gender:'여'},
    {name: '오길동', age:'52', id:'gg', pwd:'gg', region:'안산', gender:'남'},
    {name: '육길동', age:'34', id:'hh', pwd:'hh', region:'안양', gender:'여'},
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

app.post('/loginCheck', (req, res)=>{
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

});

app.post('/selectUserData', (req, res)=>{
    res.send(db);
});