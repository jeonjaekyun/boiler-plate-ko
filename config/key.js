//개발환경이 Local인지 배포 후(production)인지 확인하여
//비밀 정보를 사용하는 코드
if(process.env.NODE_ENV === 'production'){
    module.exports = require('./prod');
}else{
    module.exports = require('./dev');
}