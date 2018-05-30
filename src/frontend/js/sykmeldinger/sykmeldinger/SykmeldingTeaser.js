import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { toDatePrettyPrint, getLedetekst } from 'digisyfo-npm';
import SykmeldingPeriodeInfo from './SykmeldingPeriodeInfo';
import PilHoyre from '../../ikoner/PilHoyre';

const PeriodeListe = ({ perioder, arbeidsgiver, ledetekster }) => {
    return (<ul className="inngangspanel__punktliste js-perioder">
        { perioder.map((periode, index) => {
            return (<SykmeldingPeriodeInfo
                key={index}
                periode={periode}
                arbeidsgiver={arbeidsgiver}
                Element="li"
                ledetekster={ledetekster} />);
        })}
    </ul>);
};

PeriodeListe.propTypes = {
    arbeidsgiver: PropTypes.string,
    ledetekster: PropTypes.object,
    perioder: PropTypes.array,
};

class SykmeldingTeaser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ikon: 'sykmeldinger.svg',
            farge: '#3E3832',
        };
    }

    onMouseEnter() {
        this.setState({
            ikon: 'sykmeldinger_hover-blue.svg',
            farge: '#005B82',
        });
    }

    onMouseLeave() {
        this.setState({
            ikon: 'sykmeldinger.svg',
            farge: '#3E3832',
        });
    }

    render() {
        const { sykmelding, ledetekster, fnr } = this.props;
        const antallPerioder = sykmelding.mulighetForArbeid.perioder.length;
        const sistePeriodeIndex = antallPerioder - 1;
        const visStatus = sykmelding.status !== 'NY';

        return (<article aria-labelledby={`sykmelding-header-${sykmelding.id}`}>
            <Link
                className="inngangspanel"
                to={`/sykefravaer/${fnr}/sykmeldinger/${sykmelding.id}`}
                onMouseEnter={() => {
                    this.onMouseEnter();
                }}
                onMouseLeave={() => {
                    this.onMouseLeave();
                }}>
                <span className="inngangspanel__ikon">
                    <img src={`/sykefravaer/img/svg/${this.state.ikon}`} alt="inngangspanel" />
                </span>
                <div className="inngangspanel__innhold">
                    <header className="inngangspanel__header">
                        <h3 className="js-title" id={`sykmelding-header-${sykmelding.id}`}>
                            <small className="inngangspanel__meta">{getLedetekst('sykmelding.teaser.dato', ledetekster, {
                                '%FOM%': toDatePrettyPrint(sykmelding.mulighetForArbeid.perioder[0].fom),
                                '%TOM%': toDatePrettyPrint(sykmelding.mulighetForArbeid.perioder[sistePeriodeIndex].tom),
                            })} </small>
                            <span className="inngangspanel__tittel">
                                {getLedetekst('sykmelding.teaser.tittel', ledetekster)}
                            </span>
                        </h3>
                        {
                            visStatus && <p className="inngangspanel__status">{getLedetekst(`sykmelding.teaser.status.${sykmelding.status}`, ledetekster)}</p>
                        }
                    </header>
                    {antallPerioder === 1 ?
                        (<SykmeldingPeriodeInfo
                            periode={sykmelding.mulighetForArbeid.perioder[0]}
                            arbeidsgiver={sykmelding.innsendtArbeidsgivernavn}
                            ledetekster={ledetekster} />)
                        : (<PeriodeListe
                            perioder={sykmelding.mulighetForArbeid.perioder}
                            arbeidsgiver={sykmelding.innsendtArbeidsgivernavn}
                            ledetekster={ledetekster} />)
                    }
                </div>
                <PilHoyre farge={this.state.farge} />
            </Link>
        </article>);
    }
}

SykmeldingTeaser.propTypes = {
    sykmelding: PropTypes.object.isRequired,
    fnr: PropTypes.string,
    ledetekster: PropTypes.object,
};

export default SykmeldingTeaser;
