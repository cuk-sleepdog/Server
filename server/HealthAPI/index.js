const Router = require('koa-router');
const Health = new Router();
const HealthCtrl = require('./Health.controller');

Health.get('/',HealthCtrl.Healthlist); // 건강상태 리스트 가져오기
Health.get('/:id',HealthCtrl.Healthget); // 원하는 id 건강상태 리스트 가져오기 
Health.post('/',HealthCtrl.HealthPost); // 건강상태 데이터 입력
Health.put('/:id',HealthCtrl.HealthPut); // 건강상태 데이터 수정(필드전체 수정할때)
Health.delete('/:id',HealthCtrl.Healthdelete); // 건강상태 데이터 삭제
Health.patch('/:id',HealthCtrl.Infoupdate); // 일부 필드만 따로 정보 수정가능


module.exports = Health;