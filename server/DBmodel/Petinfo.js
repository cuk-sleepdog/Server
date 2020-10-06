const { date, string } = require('joi');
const mongoose = require('mongoose');
const moment = require('moment');
const Today = new Date();
const { Schema } = mongoose; // 몽구스 에서 스키마를 사용한다.
const autoIncrement = require('mongoose-auto-increment');
const connection = mongoose.createConnection("mongodb://localhost/Ju");
autoIncrement.initialize(connection);


const Petinfo = new Schema({ // 반려동물 정보

    User: [{
        KakaoId: String,
        Dogs: String
    }],
    Petname : String, // 이름
    Happy : String, // 생일
    Kind : String, // 종류
    Gender : String, // 성별
    Weight : Number, // 몸무게
    CreateAt:{ //기본값 설정할땐 꼭 객체로 , 생성날짜
        type: String,
        default: moment(Today).format('YYYY-MM-DD, h:mm:ss a')
    },
    PetId : Number,
},
{versionKey: false}

);

Petinfo.plugin(autoIncrement.plugin,{
    model: 'Petinfo',
    field: 'PetId',
    startAt: 1,
    incrementBy : 1
});

module.exports = mongoose.model('Petinfo',Petinfo,'Petinfo');