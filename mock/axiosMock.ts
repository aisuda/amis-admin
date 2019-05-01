import axios from 'axios';
import MockAdaptor  from 'axios-mock-adapter';

export function init() {
    const mock = new MockAdaptor(axios);

    mock
        .onAny('/api/login')
        .reply(200, {
            status: 0,
            msg: ''
        });

}