// const Joi = require('joi');
const Health = require('../DBmodel/Health');
const ObjectId = require('mongoose').Types.ObjectId

exports.HealthPost = async (ctx) => {
    // request body 에서 값들을 추출한다.
    const {
        Product,
        Temp,
        Bpm,
        Sleep,
        date
    } = ctx.request.body; 

    const health = new Health({
        Product,
        Temp,
        Bpm,
        Sleep,
        date
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
        healthinfo = await Health.find({Product: id}).exec(); //특정아이디 조회
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

// exports.HealthPut = async (ctx) => {
//     const {id} = ctx.params; // URL 파라미터에서 id 값을 읽어온다.

//     if(!ObjectId.isValid(id)) {
//         ctx.status = 400; // Bad Request
//         return;
//     }


//     const schema = Joi.object().keys({

//         //required() 옵션은 필수 항목, NOT NULL과 동일
//         User: Joi.array().items(Joi.object().keys({
//             KakaoId: Joi.string().email().required(),
//             accessToken: Joi.string().required(),
//             Dogs: Joi.string().required()
//         })),
//         Heat: Joi.number().required(),
//         Heart: Joi.number().required()
//     });

//     const validation = schema.validate(ctx.request.body);

//     if(validation.error){
//         ctx.status = 400;
//         ctx.body = validation.error;
//         return;
//     }

//     let healthinfo;

//     try {
//         healthinfo = await Health.findByIdAndUpdate(id, ctx.request.body,
//         {
//             upsert: true, //데이터가 존재하지않을때 새로만듬
//             new: true // 업데이트 된 데이터를 반환
//         });
//     } catch(e){
//         return ctx.throw(500,e);
//     }
//     ctx.body = healthinfo;
//     };

    exports.Infoupdate = async (ctx) => {
        const {id} = ctx.params;
    
        if(!ObjectId.isValid(id)) {
            ctx.status = 400; // Bad Request
            return;
        }
    
        let Info;
    
        try {
            // 아이디로 찾아서 업데이트를 합니다.
            // 파라미터는 (아이디, 변경 할 값, 설정) 순 입니다.
            Info = await Health.findByIdAndUpdate(id, ctx.request.body, {
                // upsert 의 기본값은 false이다. PUT과는 다르게 생성된 데이터를 수정하는 것이므로 true로 할 필요가없다.
                new: true 
            });
        } catch (e) {
            return ctx.throw(500, e);
        }
    
        ctx.body = Info;
    };

