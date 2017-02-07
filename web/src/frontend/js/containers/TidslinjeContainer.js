import React, {Component, PropTypes} from "react";
import Side from "../sider/Side";
import SidetoppSpeilet from "../components/SidetoppSpeilet";
import * as tidslinjerActions from "../actions/tidslinjer_actions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Tidslinje, setHendelseData, getLedetekst, Varselstripe} from "digisyfo-npm";
import TidslinjeVelgArbeidssituasjonContainer from "./TidslinjeVelgArbeidssituasjonContainer";
import Feilmelding from "../components/Feilmelding";
import AppSpinner from "../components/AppSpinner";
import Brodsmuler from "../components/Brodsmuler";
import {TIDSLINJEN} from "../menypunkter";

export class TidslinjeSide extends Component {
    componentWillMount() {
        const { fnr, apneHendelseIder, arbeidssituasjon } = this.props;
        this.props.actions.hentTidslinjer(fnr, apneHendelseIder, arbeidssituasjon);
    }

    render() {
        const { hendelser, ledetekster, actions, valgtArbeidssituasjon, henter, hentingFeilet, brukernavn, ikkeTilgang } = this.props;
        const htmlIntro = {
            __html: `<p>${getLedetekst('tidslinje.introtekst', ledetekster)}</p>`,
        };
        const brodsmuler = [{
            tittel: 'Ditt sykefravær',
        }, {
            tittel: 'Tidslinjen',
        }];
        return (<Side tittel="Tidslinje" aktivtMenypunkt={TIDSLINJEN}>
        {
            (() => {
                if (henter) {
                    return <AppSpinner />;
                }
                if (hentingFeilet) {
                    return <Feilmelding />;
                }
                if (ikkeTilgang) {
                    return (<Feilmelding tittel="Under arbeid" melding="Du har foreløpig ikke tilgang til denne tjenesten. Vi jobber med å få på plass riktig tilgangsstyring.
                    Veiledere som jobber med sykefraværsoppfølging og veiledere på kontaktsenteret vil etter hver få tilgang. Takk for at du prøver igjen senere!" />);
                }
                return (<div>
                    <div className="panel">
                        <Varselstripe type="spesial" ikon="/sykefravaer/img/svg/speiling.svg">
                            <p>Dette er slik {brukernavn} ser det på nav.no</p>
                        </Varselstripe>
                    </div>
                    <div className="speiling">
                        <Brodsmuler brodsmuler={brodsmuler} />
                        <SidetoppSpeilet tittel="Tidslinjen" htmlTekst={htmlIntro} />
                        <TidslinjeVelgArbeidssituasjonContainer valgtArbeidssituasjon={valgtArbeidssituasjon} />
                        <Tidslinje arbeidssituasjon={valgtArbeidssituasjon} hendelser={hendelser} ledetekster={ledetekster} setHendelseData={actions.setHendelseData} />
                    </div>
                </div>);
            })()
        }
        </Side>);
    }
}

TidslinjeSide.propTypes = {
    fnr: PropTypes.string,
    apneHendelseIder: PropTypes.array,
    arbeidssituasjon: PropTypes.string,
    actions: PropTypes.object,
    valgtArbeidssituasjon: PropTypes.string,
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    ikkeTilgang: PropTypes.bool,
    hendelser: PropTypes.array,
    ledetekster: PropTypes.object,
    brukernavn: PropTypes.string,
};

export function mapDispatchToProps(dispatch) {
    const actions = Object.assign({}, tidslinjerActions, { setHendelseData });
    return {
        actions: bindActionCreators(actions, dispatch),
    };
}

export function getArbeidssituasjon(arbeidssituasjon) {
    if (arbeidssituasjon === 'uten-arbeidsgiver') {
        return 'UTEN_ARBEIDSGIVER';
    }
    return 'MED_ARBEIDSGIVER';
}

export function setHash(hendelser) {
    const apneHendelser = hendelser
        .filter((m) => {
            return m.erApen;
        })
        .map((m) => {
            return m.id;
        })
        .join('/');

    window.history.replaceState(null, null, `#${apneHendelser}`);
}

export function mapStateToProps(state, ownProps) {
    const fnr = state.navbruker.data.fnr;
    const hendelser = state.tidslinjer && state.tidslinjer.data && state.tidslinjer.data.length ? state.tidslinjer.data[0].hendelser : [];
    const valgtArbeidssituasjon = getArbeidssituasjon(ownProps.params.valgtArbeidssituasjon);
    if (hendelser.length) {
        setHash(hendelser);
    }
    const apneHendelseIder = (ownProps && ownProps.location) ? ownProps.location.hash.replace('#', '').split('/') : [];
    const henter = state.tidslinjer.henter || state.ledetekster.henter;
    const hentingFeilet = state.tidslinjer.hentingFeilet || state.ledetekster.hentingFeilet;
    const ikkeTilgang = state.tidslinjer.ikkeTilgang;
    return {
        brukernavn: state.navbruker.data.navn,
        fnr,
        hendelser,
        valgtArbeidssituasjon,
        apneHendelseIder,
        henter,
        hentingFeilet,
        ikkeTilgang,
        ledetekster: state.ledetekster.data,
    };
}

const TidslinjeContainer = connect(mapStateToProps, mapDispatchToProps)(TidslinjeSide);
export default TidslinjeContainer;