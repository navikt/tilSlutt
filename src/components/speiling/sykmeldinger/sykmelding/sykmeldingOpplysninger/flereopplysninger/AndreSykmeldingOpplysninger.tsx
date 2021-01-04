import React from "react";
import { SykmeldingOldFormat } from "../../../../../../data/sykmelding/types/SykmeldingOldFormat";
import { getSykmeldingOpplysning } from "../../../../../../utils/sykmeldingUtils";

const texts = {
  phone: "Telefon til lege/sykmelder",
};

interface AndreSykmeldingOpplysningerProps {
  sykmelding: SykmeldingOldFormat;
}

const AndreSykmeldingOpplysninger = (
  andreSykmeldingOpplysningerProps: AndreSykmeldingOpplysningerProps
) => {
  const { sykmelding } = andreSykmeldingOpplysningerProps;
  const visSeksjon =
    sykmelding.bekreftelse.sykmelderTlf ||
    sykmelding.bekreftelse.utstedelsesdato;
  if (!visSeksjon) {
    return <span />;
  }
  return (
    <div className="sykmeldingSeksjon">
      <h4 className="sykmeldingSeksjon__tittel">Annet</h4>
      {getSykmeldingOpplysning(
        sykmelding.bekreftelse,
        "sykmelderTlf",
        texts.phone
      )}
    </div>
  );
};

export default AndreSykmeldingOpplysninger;
