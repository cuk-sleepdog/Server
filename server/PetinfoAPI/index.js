const Router = require('koa-router');
const Petinfo = new Router();
const PetCtrl = require('./Petinfo.controller');

const handler = (ctx, next) =>{
    ctx.body = `${ctx.request.method} ${ctx.request.path}`; // 현재 쓰인 메소드와 경로 출력
};


//Name.get('/',handler); // handler 출력 

Petinfo.get('/',PetCtrl.Petlist); // Petinfo.controller.js의 저장된것을 출력
Petinfo.get('/:Petname',PetCtrl.Petget); // Petname값으로 골라와서 출력
Petinfo.post('/',PetCtrl.PetPost); // Petinfo 정보 입력
Petinfo.put('/:id',PetCtrl.PetPut); // Petinfo 정보 수정
Petinfo.delete('/:id',PetCtrl.Petdelete); // Petinfo 데이터 삭제

module.exports = Petinfo;

//여기서 설정된걸 server index.js 에서 가져다 쓴다.