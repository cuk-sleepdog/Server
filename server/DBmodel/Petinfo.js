const { date, string } = require('joi');
const mongoose = require('mongoose');
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
    Happy : Date, // 생일
    Kind : String, // 종류
    Gender : String, // 성별
    Weight : Number, // 몸무게
    PetId : Number
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