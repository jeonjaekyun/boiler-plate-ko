const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name:{
        type: String,
        maxlength: 50
    },
    email:{
        type: String,
        trim:true,
        unique:1
    },
    password:{
        type: String,
        minlength:5
    },
    lastname:{
        type: String,
        maxlength: 50
    },
    role:{
        type: Number,
        default:0
    },
    image: String,
    token:{
        type: String
    },
    tokenExp:{
        type: Number
    }
});

userSchema.pre('save',function(next){
    const user = this;
    if(user.isModified('password')){
        bcrypt.genSalt(saltRounds,function(err,salt){
            if(err) return next(err);
            bcrypt.hash(user.password,salt,function(err,hash){
                if(err) return next(err);
                user.password = hash;
                next();
            });
        });
    } else{
        next();
    }
});

userSchema.methods.comparePassword = function(inputPw, cb){
    bcrypt.compare(inputPw, this.password,function(err, isMatch){
        if(err) {
            return cb(err)
        }
        
        return cb(null, isMatch);
    });
}

userSchema.methods.generateToken = function(cb){
    var user = this;
    var token = jwt.sign(user._id.toHexString(), 'secretToken');
    user.token = token;
    user.save((err,user)=>{
        if(err) return cb(err);
        cb(null, user);
    });
}

//User의 인스턴스를 통한 접근이 아닌 
//User 자체에 대한 접근을 하는 함수는 statics로 정의한다.
userSchema.statics.findByToken = function(token, cb){
    var user = this;

    //토큰을 decode 한다.
    jwt.verify(token,'secretToken', function(err,decoded){
       //유저 아이디를 이용해서 유저를 찾은 다음에
       //클라이언트에서 가져온 토큰과 DB에 보관된 토큰이 일치하는지 확인
       user.findOne({"_id":decoded, "token":token},function(err,user){
        if(err) return cb(err);
        cb(null,user);
       });
    });
}

//Schema는 테이블과 어느 정도 비슷한 역할을 한다.
//스키마에 어긋나는 데이터가 있으면 에러를 발생시킨다.
//'User'에따라 <dbname>.users 라는 collection이 만들어 진다.
//MongoDB는 하나의 collection에서 document가 다른 Schema를 가질수 있다.
const User = mongoose.model('User',userSchema);

module.exports = User;