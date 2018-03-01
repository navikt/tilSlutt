import React from 'react';
import { Panel } from 'nav-frontend-paneler';
import { Varselstripe } from 'digisyfo-npm';
import PropTypes from 'prop-types';

const S = ({ brukernavn }) => {
    return (<Panel className="blokk--s">
        <Varselstripe type="spesial" ikon="/sykefravaer/img/svg/speiling.svg">
            <p>Dette er slik {brukernavn} ser det på nav.no</p>
        </Varselstripe>
    </Panel>);
};

S.propTypes = {
    brukernavn: PropTypes.string,
};

export default S;