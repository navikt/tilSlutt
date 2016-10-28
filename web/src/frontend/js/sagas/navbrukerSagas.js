import { call, put, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { get } from '../api';

export function* hentNavbruker(action) {
    yield put({ type: 'HENTER_NAVBRUKER' });
    try {
        const data = yield call(get, `${window.SYFO_SETTINGS.REST_ROOT}/brukerinfo?fnr=${action.fnr}`);
        yield put({ type: 'NAVBRUKER_HENTET', data });
    } catch (e) {
        yield put({ type: 'HENT_NAVBRUKER_FEILET' });
    }
}

export function* sjekkTilgangMoteadmin() {
    yield put({ type: 'SJEKKER_TILGANG_MOTEADMIN' });
    try {
        const data = yield call(get, `${window.SYFO_SETTINGS.REST_ROOT}/toggle/tilgangmoteadmin`);
        yield put({ type: 'TILGANG_MOTEMODUL_HENTET', data });
    } catch (e) {
        yield put({ type: 'TILGANG_MOTEMODUL_FEILET' });
    }
}

function* watchHentNavbruker() {
    yield* takeEvery('HENT_NAVBRUKER_FORESPURT', hentNavbruker);
}

function* watchSjekkTilgangMoteadmin() {
    yield* takeEvery('SJEKK_TILGANG_MOTEADMIN_FORESPURT', sjekkTilgangMoteadmin);
}

export default function* ledereSagas() {
    yield [
        fork(watchHentNavbruker),
        fork(watchSjekkTilgangMoteadmin),
    ];
}