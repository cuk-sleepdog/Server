const Health = require('../DBmodel/Health');
const ObjectId = require('mongoose').Types.ObjectId

exports.AllDelete = async (ctx) => {

    try {
        await Health.remove({});
        return ctx.status = 204;
    }
    catch (e) {
        if (e.name === 'CastError') {
            return ctx.status = 400;
            
        }
    }
};

exports.CheckHealth = async (ctx) => {
    const { id } = ctx.params;
    let sleep;
    try {
        sleep = await Health.aggregate([
            { '$match': { 'Product': id } },
            {
                '$group': {
                    '_id': {
                        'Product': '$Product'
                    },
                    'CHK_avg': { '$avg': '$CHK' },
                    'Bpm_avg': { '$avg': '$Bpm' },
                    'Temp_avg': { '$avg': '$Temp' }
                }
            },
        ]);
    } //try 괄호
    catch (e) {
        return ctx.throw(500, e);
    }

    return ctx.body = sleep;
};


exports.ShowList = async (ctx) => {
    let healthInfo;

    try {
        healthInfo = await Health.find().exec();
    } catch (e) {
        return ctx.throw(500, e);
    }

    return ctx.body = healthInfo;
    
};

exports.HealthPost = async (ctx) => {
    // request body 에서 값들을 추출한다.
    const {
        Product,
        DATE,
        Time,
        Bpm,
        Temp,
        CHK
    } = ctx.request.body;

    const health = new Health({
        Product,
        DATE,
        Time,
        Bpm,
        Temp,
        CHK
    });

    try {
        await health.save(); //몽고DB에 넣는작업
    } catch (e) {

        // http 상태 500(에러)와 error메시지 반환하고 에러를 기록한다.
        return ctx.throw(500, e);
    }

    //저장한 결과를 반환한다.
    return ctx.body = health;
    
};

exports.HealthGet = async (ctx) => {
    const { id } = ctx.params; //URL 파라미터에서 id값을 읽어온다.
    // Users의 KakaoId로 조회할수있게 수정해야함.

    let healthInfo;

    try {
        healthInfo = await Health.find({ Product: id }).exec(); //특정아이디 조회
    } catch (e) {
        if (e.name === 'CastError') {
            ctx.status = 400;
            return;
        }
        return ctx.throw(500, e);
    }

    if (!healthInfo) {
        //일치하는 id가 없으면
        ctx.status = 404;
        return ctx.body = { message: 'healthInfo Not found' };
    }

    return ctx.body = healthInfo;
};

exports.Healthdelete = async(ctx) => {
    const {id} = ctx.params;

    try {
        await Health.findByIdAndRemove(id).exec();
    }
    catch(e){
        if(e.name === 'CastError'){
            return ctx.status = 400;
        }
    }
   ctx.status = 204; //정상처리됐다는 응답.
};

exports.InfoUpdate = async (ctx) => {
    const { id } = ctx.params;

    if (!ObjectId.isValid(id)) {
        return ctx.status = 400; // Bad Request
    }

    let info;

    try {
        // 아이디로 찾아서 업데이트 한다
        // 파라미터는 (아이디, 변경 할 값, 설정)
        info = await Health.findByIdAndUpdate(id, ctx.request.body, {
            // upsert 의 기본값은 false이다. PUT과는 다르게 생성된 데이터를 수정하는 것이므로 true로 할 필요가없다.
            new: true
        });
    } catch (e) {
        return ctx.throw(500, e);
    }

    return ctx.body = info;
};

