import { call, put, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { log } from 'digisyfo-npm';
import { get } from '../api/index';
import * as actions from '../actions/behandlendeEnhet_actions';
import * as actiontype from '../actions/actiontyper';

export function* hentBehandlendeEnhetSaga(action) {
    yield put(actions.henterBehandlendeEnhet());
    try {
        const data = yield call(get, `${window.APP_SETTINGS.VEILEDEROPPGAVERREST_ROOT}/brukerinfo/${action.fnr}/behandlendeEnhet`);
        yield put(actions.behandlendeEnhetHentet(data));
    } catch (e) {
        log(e);
        yield put(actions.hentBehandlendeEnhetFeilet());
    }
}

function* watchHentBehandlendeEnhet() {
    yield* takeEvery(actiontype.HENT_BEHANDLENDE_ENHET_FORESPURT, hentBehandlendeEnhetSaga);
}

export default function* behandlendeEnhetSagas() {
    yield fork(watchHentBehandlendeEnhet);
}
