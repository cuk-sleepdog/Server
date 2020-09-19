const Router = require('koa-router');
const Health = new Router();
const HealthCtrl = require('./Health.controller');

Health.get('/',HealthCtrl.Healthlist); // 
Health.get('/:id',HealthCtrl.Healthget); // 
Health.post('/',HealthCtrl.HealthPost); //
Health.put('/:id',HealthCtrl.HealthPut); // 
Health.delete('/:id',HealthCtrl.Healthdelete); //



module.exports = Health;