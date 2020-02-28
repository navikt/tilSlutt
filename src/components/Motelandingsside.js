import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { tilDatoMedUkedagOgManedNavn } from '../utils/datoUtils';
import Sidetopp from './Sidetopp';

const texts = {
    pageHeader: 'Dialogmøter',
    moteElement: {
        titles: {
            confirmed: 'Bekreftet møte',
            seeStatus: 'Se møtestatus',
            requestMeeting: 'Forespør møte',
        },
        subtitles: {
            dialogmote: 'Dialogmøte',
            requestSent: 'Møteforespørsel sendt',
            noMeetings: 'Ingen møter planlagt',
        },
    },
    motebehovElement: {
        title: 'BEHOV FOR DIALOGMØTE',
        subtitle: 'Avklaring om møtebehov',
    },
};

const setTittel = (mote) => {
    if (mote) {
        if (mote.status === 'BEKREFTET') {
            return texts.moteElement.titles.confirmed;
        }
        return texts.moteElement.titles.seeStatus;
    }
    return texts.moteElement.titles.requestMeeting;
};

const setUndertittel = (mote) => {
    if (mote) {
        if (mote.status === 'BEKREFTET' && mote.bekreftetAlternativ) {
            return `${texts.moteElement.subtitles.dialogmote} ${tilDatoMedUkedagOgManedNavn(mote.bekreftetAlternativ.tid)}`;
        } else if (mote.opprettetTidspunkt) {
            return `${texts.moteElement.subtitles.requestSent} ${tilDatoMedUkedagOgManedNavn(mote.opprettetTidspunkt)}`;
        }
    }
    return texts.moteElement.subtitles.noMeetings;
};

export const MotelandingssideMoteElement = (
    {
        fnr,
        mote,
    }
) => {
    const undertittel = setUndertittel(mote);
    const tittel = setTittel(mote);
    return (<li className="motelandingssidepanel">
        <Link
            className="motelandingssidepanel__innhold"
            to={`/sykefravaer/${fnr}/mote`}>
            <img className="motelandingssidepanel__ikon" src="/sykefravaer/img/svg/moteikon_blaabg.svg" alt="moteikon" />
            <div className="motelandingssidepanel__tekst">
                <header className="motelandingssidepanel__tekst--tittel">
                    <h3 className="js-title" id="soknad-header-mote">
                        {tittel}
                    </h3>
                </header>
                <p className="inngangspanel__tekst--undertittel js-tekst">{undertittel}</p>
            </div>
        </Link>
    </li>);
};

MotelandingssideMoteElement.propTypes = {
    fnr: PropTypes.string,
    mote: PropTypes.object,
};

export const MotelandingssideMotebehovElement = (
    {
        fnr,
    }
) => {
    return (<li className="motelandingssidepanel">
        <Link
            className="motelandingssidepanel__innhold"
            to={`/sykefravaer/${fnr}/motebehov`}>
            <img className="motelandingssidepanel__ikon"
                src="/sykefravaer/img/svg/moteikon_blaabg.svg" alt="moteikon" />
            <div className="motelandingssidepanel__tekst">
                <header className="motelandingssidepanel__tekst--tittel">
                    <h3 className="js-title" id="soknad-header-mote">
                        {texts.motebehovElement.title}
                    </h3>
                </header>
                <p className="inngangspanel__tekst--undertittel js-tekst">{texts.motebehovElement.subtitle}</p>
            </div>
        </Link>
    </li>);
};

MotelandingssideMotebehovElement.propTypes = {
    fnr: PropTypes.string,
};

export const Motelandingsside = (
    {
        fnr,
        mote,
    }
) => {
    return (<div>
        <Sidetopp tittel={texts.pageHeader} />
        <ul>
            <MotelandingssideMoteElement
                fnr={fnr}
                mote={mote}
            />
            <MotelandingssideMotebehovElement
                fnr={fnr}
            />
        </ul>
    </div>);
};

Motelandingsside.propTypes = {
    fnr: PropTypes.string,
    mote: PropTypes.object,
};

export default Motelandingsside;