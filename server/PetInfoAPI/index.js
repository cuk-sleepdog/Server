const Router = require('koa-router');
const petInfo = new Router();
const PetCtrl = require('./petInfoController');


petInfo.get('/',PetCtrl.PetList); // petInfo.controller.js의 저장된것을 출력
petInfo.get('/:id',PetCtrl.PetGet); // id값으로 골라와서 출력
petInfo.post('/',PetCtrl.PetPost); // petInfo 정보 입력
petInfo.delete('/:id',PetCtrl.PetDelete); // petInfo 데이터 삭제
petInfo.patch('/:id',PetCtrl.UpdatePet); // petInfo 정보 수정

module.exports = petInfo;
