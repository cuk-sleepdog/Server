const mongoose = require('mongoose');
const { Schema } = mongoose; // 몽구스 에서 스키마를 사용한다.
const autoIncrement = require('mongoose-auto-increment');

const connection = mongoose.createConnection("mongodb://localhost/Ju");
autoIncrement.initialize(connection);


const Health = new Schema({ //건강상태 데이터베이스
    //서브다큐먼트 사용
    HealthId: Number,
    Heat: Number,
    Heart: Number,
    CreateAt:{ //기본값 설정할땐 꼭 객체로 , 생성날짜
        type: Date,
        default: Date.now()
    },
},
{versionKey: false}

);

Health.plugin(autoIncrement.plugin,{
    model: 'Health',
    field: 'HealthId',
    startAt: 0,
    incrementBy : 1
});

 /*
******************************************
과연 이 User와 Health를 합치는게 맞는가? 
분리하는게 더 낫지 않을까?
****************************************
 */

//스키마를 모델로 변환하여 내보내서 다른 파일에서 사용할수있게 한다.
module.exports = mongoose.model('Health',Health,'Health');

// 첫번째는 스키마의 이름, 두번째는 스키마 객체가 필요하다.
// mongoose.model('Book', Book, 'Book'); 이라고하면 몽고디비의 컨벤션을 따르지않고 Book으로 만들수있다.

//이 파일은 몽고DB에 데이터를 쓸수있도록 만든 파일이다.