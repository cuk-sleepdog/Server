const Router = require('koa-router');
const Health = new Router();
const HealthCtrl = require('./healthController');

Health.get('/',HealthCtrl.ShowList);
Health.get('/:id',HealthCtrl.HealthGet); // 원하는 id 건강상태 리스트 가져오기 
Health.post('/',HealthCtrl.HealthPost); // 건강상태 데이터 입력
Health.delete('/all',HealthCtrl.AllDelete); // 건강상태 데이터 전체삭제
Health.delete('/:id',HealthCtrl.Healthdelete); // 해당 id 건강상태 데이터 삭제
Health.get('/avg/:id',HealthCtrl.CheckHealth); // 해당 id 평균값 가져오기. 


module.exports = Health;
