import React from "react";
import { Checkbox } from "nav-frontend-skjema";
import { erEkstraDiagnoseInformasjon } from "@/utils/sykmeldinger/sykmeldingUtils";
import { tilDatoMedUkedagOgManedNavn } from "@/utils/datoUtils";
import { SykmeldingOldFormat } from "@/data/sykmelding/types/SykmeldingOldFormat";

const tekster = {
  ekstraDiagnoseInformasjon: {
    fravaersgrunnLovfestet: {
      lovfestetGrunn: "Annen lovfestet fraværsgrunn",
      beskrivFravaeret: "Beskriv fraværet",
    },
    yrkesskade: {
      kanSkyldesYrkesskade:
        "Sykmeldingen kan skyldes en yrkesskade/yrkessykdom",
      skadedato: "Skadedato",
    },
    svangerskap: {
      svangerskapsrelatert: "Sykdommen er svangerskapsrelatert",
    },
  },
};

interface AnnenLovfestetFravaersgrunnProps {
  fravaersgrunn?: string;
  fravaersBeskrivelse?: string;
}

const AnnenLovfestetFravaersgrunn = ({
  fravaersgrunn,
  fravaersBeskrivelse,
}: AnnenLovfestetFravaersgrunnProps) => (
  <div className="annenLovfestetFravaersgrunn">
    <h6 className="sporsmal">
      {tekster.ekstraDiagnoseInformasjon.fravaersgrunnLovfestet.lovfestetGrunn}
    </h6>
    <p>{fravaersgrunn}</p>
    {fravaersBeskrivelse && [
      <h6 key={0} className="sporsmal">
        {
          tekster.ekstraDiagnoseInformasjon.fravaersgrunnLovfestet
            .beskrivFravaeret
        }
      </h6>,
      <p key={1} className="annenLovfestetFravaersgrunnBeskrivelse">
        {fravaersBeskrivelse}
      </p>,
    ]}
  </div>
);

interface YrkesskadeProps {
  dato?: Date;
}

const Yrkesskade = ({ dato }: YrkesskadeProps) => (
  <div className="yrkesskade">
    <Checkbox
      className="sykmeldingMotebehovVisning__checkbox"
      label={tekster.ekstraDiagnoseInformasjon.yrkesskade.kanSkyldesYrkesskade}
      checked
      disabled
    />
    {dato && [
      <h6 key={0} className="sporsmal">
        {tekster.ekstraDiagnoseInformasjon.yrkesskade.skadedato}
      </h6>,
      <p key={1} className="yrkesskadeDato">
        {tilDatoMedUkedagOgManedNavn(dato)}
      </p>,
    ]}
  </div>
);

interface EkstraDiagnoseInformasjonProps {
  sykmelding: SykmeldingOldFormat;
}

const EkstraDiagnoseInformasjon = ({
  sykmelding,
}: EkstraDiagnoseInformasjonProps) => {
  const diagnose = sykmelding.diagnose;
  const skalVise = erEkstraDiagnoseInformasjon(sykmelding);
  return (
    <>
      {skalVise && (
        <div className="sykmeldingMotebehovVisning__avsnitt">
          {diagnose.fravaersgrunnLovfestet && (
            <AnnenLovfestetFravaersgrunn
              fravaersgrunn={diagnose.fravaersgrunnLovfestet}
              fravaersBeskrivelse={diagnose.fravaerBeskrivelse}
            />
          )}

          {diagnose.svangerskap && (
            <Checkbox
              className="sykmeldingMotebehovVisning__checkbox"
              label={
                tekster.ekstraDiagnoseInformasjon.svangerskap
                  .svangerskapsrelatert
              }
              checked
              disabled
            />
          )}

          {diagnose.yrkesskade && <Yrkesskade dato={diagnose.yrkesskadeDato} />}
        </div>
      )}
    </>
  );
};

export default EkstraDiagnoseInformasjon;
