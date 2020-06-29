const express = require('express');
//const mongoose = require('mongoose');
//const config = require('./config/key');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const User = require('./models/User');
const db = require('./config/db');
const {auth} = require('./middlewares/auth');
const app = express();
const port = 5000;

//mongodb cloud를 사용하여 연결하는 방법
// mongoose.connect(config.mongoURI,
// {useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true, useFindAndModify:false})
// .then(() => console.log('MongoDB Connected...'))
// .catch(err => console.log(err));

db();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/', (req,res) => {
    res.send('Hello World!!');
});

app.get('/api/hello', (req,res) => {
    res.send("안녕하세요");
});

app.post('/api/users/register', (req,res) => {
    const user = new User(req.body);

    //req.body를 통해서 들어온 정보가 User 객체를 통해서 user에 저장됨
    //user.save()를 통해서 user가 저장됨(User.js에서 mongoose를 사용하여 User = mongoose.model()을 해줬기 때문에)
    user.save((err,userInfo) => {
        if(err) return res.json({success:false,err});
        return res.status(200).json({
            success:true
        });
    });
});

app.post('/api/users/login', (req, res)=>{
    //입력된 이메일이 DB에 있는지 검색
    User.findOne({email:req.body.email}, (err,userInfo) => {
        if(!userInfo){
            return res.json({
                loginSuccess:false,
                message:"email을 확인해 주세요!"
            });
        }
        //입력된 비밀번호와 검색된 이메일의 비밀번호가 일치하는지 검사
        userInfo.comparePassword(req.body.password, (err, isMatch)=>{
            if(!isMatch) {
                return res.json({
                    loginSuccess:false,
                    message:"비밀번호를 확인해 주세요!"
                });
            }
            //user 토큰 만들기
            userInfo.generateToken((err,user)=>{
                if(err){
                    return res.status(400).send(err);
                }
                res.cookie("x_auth", user.token)
                .status(200)
                .json({
                    loginSuccess:true, userId: user._id
                });
            });
        });
    });
});

app.get('/api/users/auth', auth , (req,res)=>{
    var user = req.user;

    res.status(200).json({
        _id:user._id,
        name:user.name,
        email:user.email,
        lastname:user.lastname,
        role: user.role === 0 ? false : true,
        image: user.image,
        token:user.token,
        tokenExp:user.tokenExp
    });
});

app.get('/api/users/logout',auth,(req,res) => {
    User.findOneAndUpdate({_id:req.user._id}, {token:""}, (err, user) => {
        if(err) return res.json({success:false});
        res.status(200).json({success:true});
    });
});

app.listen(port, () => console.log(`port : ${port}`));