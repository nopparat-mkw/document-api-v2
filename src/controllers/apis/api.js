import { Record } from 'immutable';


export const Api = new Record({
    key: null,
    title: null,
    url: null,
    method: null,
    url_params: null,
    data_params: null,
    success_response: null,
    error_response: null,
    sample_call: null,
    notes: null,
});
