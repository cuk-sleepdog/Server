const Petinfo = require('../DBmodel/Petinfo');
const mongoose = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId

exports.Petlist = async (ctx) => {

    //변수를 미리 만든다.

    let petsinfo;

    try {
        //데이터를 조회한다.
        // .exec() 를 뒤에 붙여줘야 실제로 데이터베이스에 요청이 된다.
        // 반환값은 Promise이므로 await를 사용할수있다.
        petsinfo = await Petinfo.find() // 데이터베이스에 find명령 요청
            .sort({ _id: 1 }) // _id의 역순으로 정렬한다.
            .limit(3) //3개만 보여지게 제한
            .exec(); //서버에 요청
    }
    catch (e) { //에러 처리
        return ctx.throw(500, e);
    }

    ctx.body = petsinfo; // 에러없을시 데이터 가져옴

};

exports.PetPost = async (ctx) => {
    // request body 에서 값들을 추출한다.
    const {
        User,
        Petname,
        Happy,
        Kind,
        Gender,
        Weight,
        Heat,
        Heart
    } = ctx.request.body;

    const petinfo = new Petinfo({
        User,
        Petname,
        Happy,
        Kind,
        Gender,
        Weight,
        Heat,
        Heart
    });

    try {
        await petinfo.save(); //몽고DB에 넣는작업
    } catch (e) {

        // http 상태 500(에러)와 error메시지 반환하고 에러를 기록한다.
        return ctx.throw(500, e);
    }

    //저장한 결과를 반환한다.
    ctx.body = petinfo;

};

exports.Petget = async (ctx) => {
    const { id } = ctx.params; //URL 파라미터에서 id값을 읽어온다.
    console.log(id);
    let petinfo;

    try {
        // petinfo = await Petinfo.find({PetId: new RegExp(id)}).exec(); string값으로 조회할때 사용
        petinfo = await Petinfo.find({ PetId: id }).exec(); //특정아이디 조회
    } catch (e) {
        if (e.name === 'CastError') {
            ctx.status = 400;
            return;
        }
        return ctx.throw(500, e);
    }

    if (!petinfo) {
        //일치하는 id가 없으면
        ctx.status = 404;
        ctx.body = { message: 'petinfo Not found' };
        return;
    }

    ctx.body = petinfo;
};

exports.Petdelete = async (ctx) => {
    const { id } = ctx.params;

    try {
        await Petinfo.findByIdAndRemove(id).exec();
    }
    catch (e) {
        if (e.name === 'CastError') {
            ctx.status = 400;
            return;
        }
    }
    ctx.status = 204; //정상처리됐다는 응답.
};

exports.UpdatePet = async (ctx) => {
    const { id } = ctx.params;
    mongoose.Types.ObjectId.isValid(id);

    if (!ObjectId.isValid(id)) {
        ctx.status = 400; // Bad Request
        return;
    }

    let Pet;

    try {
        // 아이디로 찾아서 업데이트를 합니다.
        // 파라미터는 (아이디, 변경 할 값, 설정) 순 입니다.
        Pet = await Petinfo.findByIdAndUpdate(id, ctx.request.body, {
            // upsert 의 기본값은 false이다. PUT과는 다르게 생성된 데이터를 수정하는 것이므로 true로 할 필요가없다.
            new: true
        });
    } catch (e) {
        return ctx.throw(500, e);
    }

    ctx.body = Pet;
};

// 이 파일이랑 PetinfoAPI안에있는 index.js랑 왔다리갔다리 하면서 쓰면된다.