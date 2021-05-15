const mongoose = require('mongoose');
const { Schema } = mongoose; // 몽구스 에서 스키마를 사용한다.
const Today = new Date();
const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");

const Health = new Schema({ //건강상태 데이터베이스
    Product: String,
    Bpm: Number,
    Temp: Number,
    CHK: Number,
    DATE: {
        type: String,
	default: moment(Today).format('YYYY-MM-DD')
    }, 
    Time: {
	type: String,
	default: moment(Today).format('HH:mm')
    }
},
{versionKey: false}

);

//스키마를 모델로 변환하여 내보내서 다른 파일에서 사용할수있게 한다.
// 첫번째는 스키마의 이름, 두번째는 스키마 객체가 필요하다.
// 세번쨰를 지정하지않으면 복수형으로 이름이 바뀌지만 세번째 이름을 지정하면 해당 이름으로 지정된다.
module.exports = mongoose.model('Health',Health,'Health');