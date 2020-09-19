const { date } = require('joi');
const mongoose = require('mongoose');
const { Schema } = mongoose; // 몽구스 에서 스키마를 사용한다.


const Petinfo = new Schema({ // 반려동물 정보
    Petname : String, // 이름
    Happy : Date, // 생일
    Kind : String, // 종류
    Gender : String, // 성별
    Weight : Number // 몸무게
});



module.exports = mongoose.model('Petinfo',Petinfo,'Petinfo');