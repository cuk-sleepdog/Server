const Router = require('koa-router');
const Health = new Router();
const HealthCtrl = require('./Health.controller');

Health.get('/',HealthCtrl.list);
//Health.get('/:id',HealthCtrl.Healthget); // 원하는 id 건강상태 리스트 가져오기 
Health.post('/',HealthCtrl.HealthPost); // 건강상태 데이터 입력
Health.delete('/:id',HealthCtrl.Healthdelete); // 건강상태 데이터 삭제
Health.get('/:id',HealthCtrl.chk); // product가 1 인값의 평균값 가져오기. 


module.exports = Health;