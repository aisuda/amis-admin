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


    mock.onAny('/api/saveWizard')
        .reply(async () => {
            await wait(2000);

            return [200, {
                status: 0,
                msg: '保存成功'
            }]
        });

}