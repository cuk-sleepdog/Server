require('dotenv').config(); // .env 파일에서 환경변수를 불러온다.

const Koa = require('koa');
const Router = require('koa-router');
const { ObjectID } = require('mongodb');
const app = new Koa();
const router = new Router();
const PetinfoAPI = require('./PetinfoAPI'); // PetinfoAPI 폴더에서 라우터 요청
const HealthAPI = require('./HealthAPI');


const mongoose = require('mongoose'); //MongoDB를 사용한다고 선언한다.
const bodyParser = require('koa-bodyparser'); // koa-bodyparser 사용하기위해 선언

const port = process.env.PORT || 3000; //PORT값이 설정 안되어있으면 4040쓴다.

mongoose.Promise = global.Promise // Node의 Promise를 사용하게 설정한다.
mongoose.set('useFindAndModify', false); //버젼오류메시지 안나게하는거

mongoose.connect(process.env.MONGO_URI, { //MonogDB연결
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then( //성공적으로 연결됐으면
    (response) => { //이렇게 응답해라
        console.log('성공적으로 DB연결이 되었습니다.');
    }
).catch(e => { //에러가 발생했으면
    console.error(e);
});

app.use(bodyParser()); // 바디파서 적용, 라우터 적용코드보다 위에있어야 한다. 

router.use('/PetinfoAPI',PetinfoAPI.routes()); //PetinfoAPI경로를 /PetinfoAPI 경로 하위 라우트로 설정
//걍 쉽게말해서 server에서 쓸수있게 연결해준거임
router.use('/HealthAPI',HealthAPI.routes());

app.use(router.routes()).use(router.allowedMethods);

app.listen(port, () => { // .env에서 설정된 포트번호로 연결한다.
    console.log(`Dog server is listening at ${port}`);
});