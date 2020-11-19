import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Column, Row } from 'nav-frontend-grid';
import Panel from 'nav-frontend-paneler';
import { Undertekst, Undertittel } from 'nav-frontend-typografi';
import { hentVedtak } from '../actions/vedtak_actions';
import Side from '../sider/Side';
import { VedtakDTO } from '../reducers/vedtak';
import { restdatoTildato } from '../utils/datoUtils';
import VedtakInfopanel from '../components/vedtak/VedtakInfopanel';
import styled from 'styled-components';
import { VEDTAK } from '../enums/menypunkter';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';

const texts = {
    pageTitle: 'Vedtak',
    comingSoon: `
       Dette er en tidlig versjon av vedtakshistorikken. 
       Feil og mangler kan forekomme. Maksdatoen er på vei! Bruk Yammer til å komme med forslag og Porten til å melde feil. 
    `,
};

const StyledPanel = styled(Panel)`
    margin-bottom: .5em;
`;

const StyledAlertStripe = styled(AlertStripeFeil)`
    margin: 0 .5em .5em .5em;
`;

const VedtakContainer = () => {
    const fnr = window.location.pathname.split('/')[2];

    const vedtak = useSelector((state: any) => state.vedtak);
    const [selectedVedtak, setSelectedVedtak] = useState<VedtakDTO>();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(hentVedtak(fnr));
    });

    useEffect(() => {
        if (vedtak && vedtak.hentet) {
            vedtak.data.reverse();
            setSelectedVedtak(() => vedtak.data[0]);
        }
    }, [vedtak]);

    return (
        <Side fnr={fnr} tittel={texts.pageTitle} aktivtMenypunkt={VEDTAK}>
            {vedtak && selectedVedtak &&
            <>
                <Row><StyledAlertStripe>{texts.comingSoon}</StyledAlertStripe></Row>
                <Row>
                    <Column className="col-xs-5">
                        {vedtak.data.map((v: VedtakDTO) => (
                            <StyledPanel>
                                <Undertittel>
                                    {restdatoTildato(v.vedtak.fom)} - {restdatoTildato(v.vedtak.tom)}
                                </Undertittel>
                                <Undertekst>
                                    {`Vedtaksdato: ${restdatoTildato(v.opprettet)} · Restdager: ${v.vedtak.gjenståendeSykedager}`}
                                </Undertekst>
                            </StyledPanel>
                        ))}
                    </Column>
                    <Column className="col-xs-7">
                        {vedtak.data.map((vedtak: VedtakDTO) => <VedtakInfopanel selectedVedtak={vedtak}/>)}
                    </Column>
                </Row>
            </>}
        </Side>);
};

export default VedtakContainer;