import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getLedetekst, getHtmlLedetekst } from 'digisyfo-npm';
import Side from '../sider/Side';
import SidetoppSpeilet from '../components/SidetoppSpeilet';
import * as actionCreators from '../actions/sykmeldinger_actions';
import Feilmelding from '../components/Feilmelding';
import AppSpinner from '../components/AppSpinner';
import DineSykmeldinger from '../sykmeldinger/sykmeldinger/DineSykmeldinger';
import Brodsmuler from '../components/Brodsmuler';
import { SYKMELDINGER } from '../menypunkter';
import Speilingvarsel from '../components/Speilingvarsel';
import { hentBegrunnelseTekst } from '../utils/tilgangUtils';

export class SykmeldingerSide extends Component {
    componentWillMount() {
        const { fnr } = this.props;
        this.props.actions.hentSykmeldinger(fnr);
    }

    render() {
        const { brukernavn, ledetekster, henter, hentingFeilet, tilgang, sykmeldinger, fnr } = this.props;
        const htmlIntro = {
            __html: `<p>${getLedetekst('dine-sykmeldinger.introduksjonstekst', ledetekster)}</p>`,
        };
        const brodsmuler = [{
            tittel: 'Ditt sykefravær',
        }, {
            tittel: 'Dine sykmeldinger',
        }];

        return (<Side fnr={fnr} tittel="Sykmeldinger" aktivtMenypunkt={SYKMELDINGER}>
            {
                (() => {
                    if (henter) {
                        return <AppSpinner />;
                    }
                    if (!tilgang.harTilgang) {
                        return (<Feilmelding
                            tittel={getLedetekst('sykefravaer.veileder.feilmelding.tittel', ledetekster)}
                            melding={getHtmlLedetekst(hentBegrunnelseTekst(tilgang.begrunnelse), ledetekster)}
                        />);
                    }
                    if (hentingFeilet) {
                        return <Feilmelding />;
                    }
                    return (<div>
                        <Speilingvarsel brukernavn={brukernavn} />
                        <div className="speiling">
                            <Brodsmuler brodsmuler={brodsmuler} />
                            <SidetoppSpeilet tittel="Dine sykmeldinger" htmlTekst={htmlIntro} />
                            <DineSykmeldinger fnr={fnr} sykmeldinger={sykmeldinger} ledetekster={ledetekster} />
                        </div>
                    </div>);
                })()
            }
        </Side>);
    }
}

SykmeldingerSide.propTypes = {
    fnr: PropTypes.string,
    brukernavn: PropTypes.string,
    actions: PropTypes.object,
    sykmeldinger: PropTypes.array,
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    tilgang: PropTypes.object,
    ledetekster: PropTypes.object,
};

export function mapDispatchToProps(dispatch) {
    const actions = Object.assign({}, actionCreators);
    return {
        actions: bindActionCreators(actions, dispatch),
    };
}


export function mapStateToProps(state, ownProps) {
    const henter = state.sykmeldinger.henter || state.ledetekster.henter || state.tilgang.henter;
    const hentingFeilet = state.sykmeldinger.hentingFeilet || state.ledetekster.hentingFeilet || state.tilgang.hentingFeilet;
    return {
        brukernavn: state.navbruker.data.navn,
        fnr: ownProps.params.fnr,
        henter,
        hentingFeilet,
        ledetekster: state.ledetekster.data,
        sykmeldinger: state.sykmeldinger.data,
        tilgang: state.tilgang.data,
    };
}

const SykmeldingerContainer = connect(mapStateToProps, mapDispatchToProps)(SykmeldingerSide);
export default SykmeldingerContainer;
