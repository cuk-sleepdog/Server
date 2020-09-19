const Joi = require('joi');
const Health = require('../DBmodel/Health');
const ObjectId = require('mongoose').Types.ObjectId


exports.Healthlist = async (ctx) => {

//변수를 미리 만든다.

    let Healthinfo;

    try {
        //데이터를 조회한다.
        // .exec() 를 뒤에 붙여줘야 실제로 데이터베이스에 요청이 된다.
        // 반환값은 Promise이므로 await를 사용할수있다.
        Healthinfo = await Health.find() // 데이터베이스에 find명령 요청
                    .sort({_id: 1}) // _id의 역순으로 정렬한다.
                    .limit(3) //3개만 보여지게 제한
                    .exec(); //서버에 요청
    }
    catch(e) { //에러 처리
        return ctx.throw(500,e);
    }

    ctx.body = Healthinfo; // 에러없을시 데이터 가져옴

};

exports.HealthPost = async (ctx) => {
    // request body 에서 값들을 추출한다.
    const {
        Users,
        Heat,
        Heart,
        CreateAt
    } = ctx.request.body; 

    const health = new Health({
        Users,
        Heat,
        Heart,
        CreateAt
    });

    try {
        await health.save(); //몽고DB에 넣는작업
    } catch(e) {

        // http 상태 500(에러)와 error메시지 반환하고 에러를 기록한다.
        return ctx.throw(500,e);
    }

    //저장한 결과를 반환한다.
    ctx.body = health;

};

exports.Healthget = async (ctx) => {
    const {id} = ctx.params; //URL 파라미터에서 id값을 읽어온다.
     // Users의 KakaoId로 조회할수있게 수정해야함.
     
    let healthinfo;

    try {
        healthinfo = await Health.findById(id).exec(); //특정아이디 조회
    } catch(e){
        if(e.name === 'CastError'){
            ctx.status = 400;
            return;
        }
        return ctx.throw(500,e);
    }

    if(!healthinfo) {
        //일치하는 id가 없으면
        ctx.status = 404;
        ctx.body = { message: 'healthinfo Not found'};
        return;
    }

    ctx.body = healthinfo;
};

exports.Healthdelete = async(ctx) => {
    const {id} = ctx.params;

    try {
        await Health.findByIdAndRemove(id).exec();
    }
    catch(e){
        if(e.name === 'CastError'){
            ctx.status = 400;
            return;
        }
    }
    ctx.status = 204; //정상처리됐다는 응답.
};

exports.HealthPut = async (ctx) => {
    const {id} = ctx.params; // URL 파라미터에서 id 값을 읽어온다.

    if(!ObjectId.isValid(id)) {
        ctx.status = 400; // Bad Request
        return;
    }


    const schema = Joi.object().keys({

        //required() 옵션은 필수 항목, NOT NULL과 동일
        Users: Joi.array().items(Joi.object().keys({
            Kakao: Joi.string().email().required(),
            Dogs: Joi.string().required()
        })),
        Heat: Joi.date(),
        Heart: Joi.string().required(),
        CreateAt: Joi.string().required(),

    });

    const validation = schema.validate(ctx.request.body);

    if(validation.error){
        ctx.status = 400;
        ctx.body = validation.error;
        return;
    }

    let healthinfo;

    try {
        healthinfo = await Health.findByIdAndUpdate(id, ctx.request.body,
        {
            upsert: true, //데이터가 존재하지않을때 새로만듬
            new: true // 업데이트 된 데이터를 반환
        });
    } catch(e){
        return ctx.throw(500,e);
    }
    ctx.body = healthinfo;
    };

exports.update = (ctx) => {
    ctx.body = 'update';
};

