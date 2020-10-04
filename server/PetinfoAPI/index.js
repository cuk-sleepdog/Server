const Router = require('koa-router');
const Petinfo = new Router();
const PetCtrl = require('./Petinfo.controller');


Petinfo.get('/',PetCtrl.Petlist); // Petinfo.controller.js의 저장된것을 출력
Petinfo.get('/:id',PetCtrl.Petget); // Petname값으로 골라와서 출력
Petinfo.post('/',PetCtrl.PetPost); // Petinfo 정보 입력
Petinfo.delete('/:id',PetCtrl.Petdelete); // Petinfo 데이터 삭제
Petinfo.patch('/:id',PetCtrl.UpdatePet); // Petinfo 정보 수정

module.exports = Petinfo;

//여기서 설정된걸 server index.js 에서 가져다 쓴다.