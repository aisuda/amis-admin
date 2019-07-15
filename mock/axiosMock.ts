import axios from 'axios';
import MockAdaptor  from 'axios-mock-adapter';

function wait(duration:number) {
    return new Promise((resovle) => {
        setTimeout(resovle, duration);
    });
}

export function init() {
    console.info('启用 纯前端 mock，所有 API 请求，直接前端返回');

    const mock = new MockAdaptor(axios);

    mock
        .onAny('/api/login')
        .reply(200, {
            status: 0,
            msg: ''
        });

    mock.onAny('/api/form/save')
        .reply(async () => {
            await wait(2000);

            return [200, {
                status: 0,
                msg: '保存成功'
            }];
        });


    mock.onAny('/api/saveWizard')
        .reply(async () => {
            await wait(2000);

            return [200, {
                status: 0,
                msg: '保存成功'
            }];
        });

    mock.onAny('/api/customer')
        .reply(async () => {
            await wait(2000);
            __inline('./customer.db.js');



            return [200, {
                status: 0,
                msg: '',
                data: db.index(1, 10)
            }];
        });

}