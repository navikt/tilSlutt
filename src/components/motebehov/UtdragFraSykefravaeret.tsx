import React from "react";
import EtikettBase from "nav-frontend-etiketter";
import Lenke from "nav-frontend-lenker";
import { OppfolgingsplanDTO } from "../../data/oppfolgingsplan/oppfoelgingsdialoger";
import SykmeldingMotebehovVisning from "./SykmeldingMotebehovVisning";
import {
  arbeidsgivernavnEllerArbeidssituasjon,
  erEkstraInformasjonISykmeldingen,
  stringMedAlleGraderingerFraSykmeldingPerioder,
  sykmeldingerGruppertEtterVirksomhet,
  sykmeldingerInnenforOppfolgingstilfellePerson,
  sykmeldingerInnenforOppfolgingstilfellet,
  sykmeldingerMedStatusSendt,
  sykmeldingerSortertNyestTilEldst,
  sykmeldingerUtenArbeidsgiver,
  sykmeldingperioderSortertEldstTilNyest,
} from "../../utils/sykmeldinger/sykmeldingUtils";
import { finnMiljoStreng } from "../../utils/miljoUtil";
import { OppfolgingstilfellePerson } from "../../data/oppfolgingstilfelle/types/OppfolgingstilfellePerson";
import { tilLesbarPeriodeMedArstall } from "../../utils/datoUtils";
import { senesteTom, tidligsteFom } from "../../utils/periodeUtils";
import Utvidbar from "../Utvidbar";
import styled from "styled-components";
import { OppfolgingstilfelleperioderMapState } from "../../data/oppfolgingstilfelle/oppfolgingstilfelleperioder";
import { SykmeldingOldFormat } from "../../data/sykmelding/types/SykmeldingOldFormat";
import { MerInformasjonImage } from "../../../img/ImageComponents";

const tekster = {
  header: "Utdrag fra sykefraværet",
  oppfolgingsplaner: {
    header: "Oppfølgingsplan",
    ingenPlanerDelt: "Ingen planer er delt med NAV",
  },
  sykmeldinger: {
    header: "Sykmeldinger",
    headerUtenArbeidsgiver: "Sykmeldinger uten arbeidsgiver",
    papirLabelText: "Papir",
  },
  samtalereferat: {
    header: "Samtalereferat",
    lenkeTekst: "Samtalereferat",
  },
};

export const UtdragFraSykefravaeretHeader = () => {
  return (
    <div className="utdragFraSykefravaeret__header">
      <h2>{tekster.header}</h2>
    </div>
  );
};

interface OppfolgingsplanerProps {
  fnr: string;
  aktiveDialoger: OppfolgingsplanDTO[];
}

export const Oppfolgingsplaner = ({
  aktiveDialoger,
  fnr,
}: OppfolgingsplanerProps) => (
  <div className="utdragFraSykefravaeret__oppfolgingsplaner">
    <h3>{tekster.oppfolgingsplaner.header}</h3>
    {aktiveDialoger?.length > 0 ? (
      aktiveDialoger.map((dialog, index) => {
        const virksomhetsNavn = dialog.virksomhet.navn;
        return (
          <div key={index} className="utdragFraSykefravaeret__oppfolgingsplan">
            <span>
              <Lenke
                className="lenke"
                href={`/sykefravaer/${fnr}/oppfoelgingsplaner/${dialog.id}`}
              >
                {virksomhetsNavn && virksomhetsNavn.length > 0
                  ? virksomhetsNavn.toLowerCase()
                  : dialog.virksomhet.virksomhetsnummer}
              </Lenke>
            </span>
            <span className="gyldighetsperiode">
              {tilLesbarPeriodeMedArstall(
                dialog.godkjentPlan.gyldighetstidspunkt.fom,
                dialog.godkjentPlan.gyldighetstidspunkt.tom
              )}
            </span>
          </div>
        );
      })
    ) : (
      <p>{tekster.oppfolgingsplaner.ingenPlanerDelt}</p>
    )}
  </div>
);

interface UtvidbarTittelProps {
  sykmelding: SykmeldingOldFormat;
}

const UtdragColumn = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-start;
`;

export const UtvidbarTittel = ({ sykmelding }: UtvidbarTittelProps) => {
  const erViktigInformasjon = erEkstraInformasjonISykmeldingen(sykmelding);
  const sykmeldingPerioderSortertEtterDato = sykmeldingperioderSortertEldstTilNyest(
    sykmelding.mulighetForArbeid.perioder
  );
  return (
    <div className="utdragFraSykefravaeret__utvidbarTittel">
      <UtdragColumn>
        <span className="utvidbarTittel__periode">{`${tilLesbarPeriodeMedArstall(
          tidligsteFom(sykmelding.mulighetForArbeid.perioder),
          senesteTom(sykmelding.mulighetForArbeid.perioder)
        )}: `}</span>
        <span className="utvidbarTittel__grad">
          {stringMedAlleGraderingerFraSykmeldingPerioder(
            sykmeldingPerioderSortertEtterDato
          )}
        </span>

        {sykmelding.diagnose.hoveddiagnose && (
          <span className="utvidbarTittel__diagnose">
            {`${sykmelding.diagnose.hoveddiagnose.diagnosekode} (${sykmelding.diagnose.hoveddiagnose.diagnose})`}
          </span>
        )}
        {sykmelding.erPapirsykmelding && (
          <EtikettBase className="utvidbarTittel__etikett" type="info">
            {tekster.sykmeldinger.papirLabelText}
          </EtikettBase>
        )}
      </UtdragColumn>
      {erViktigInformasjon && (
        <div className="utvidbarTittel__erViktig">
          <img alt="Mer" src={MerInformasjonImage} />
        </div>
      )}
    </div>
  );
};

interface SykmeldingerForVirksomhetProps {
  sykmeldinger: SykmeldingOldFormat[];
}

export const SykmeldingerForVirksomhet = ({
  sykmeldinger,
}: SykmeldingerForVirksomhetProps) => {
  return (
    <div className="utdragFraSykefravaeret__sykmeldingerForVirksomhet">
      <h4>
        {arbeidsgivernavnEllerArbeidssituasjon(sykmeldinger[0]).toLowerCase()}
      </h4>
      {sykmeldinger.map((sykmelding, index) => {
        return (
          <div key={index}>
            <Utvidbar
              tittel={<UtvidbarTittel sykmelding={sykmelding} />}
              visLukkLenke={false}
            >
              <SykmeldingMotebehovVisning sykmelding={sykmelding} />
            </Utvidbar>
          </div>
        );
      })}
    </div>
  );
};

interface SykmeldingerProps {
  oppfolgingstilfelleperioder: OppfolgingstilfelleperioderMapState;
  sykmeldinger: SykmeldingOldFormat[];
}

export const Sykmeldinger = ({
  sykmeldinger,
  oppfolgingstilfelleperioder,
}: SykmeldingerProps) => {
  const innsendteSykmeldinger = sykmeldingerMedStatusSendt(sykmeldinger);
  const sykmeldingerIOppfolgingstilfellet = sykmeldingerInnenforOppfolgingstilfellet(
    innsendteSykmeldinger,
    oppfolgingstilfelleperioder
  );
  const sykmeldingerSortertPaaUtstedelsesdato = sykmeldingerSortertNyestTilEldst(
    sykmeldingerIOppfolgingstilfellet
  );
  const sykmeldingerSortertPaaVirksomhet = sykmeldingerGruppertEtterVirksomhet(
    sykmeldingerSortertPaaUtstedelsesdato
  );
  return (
    <div className="utdragFraSykefravaeret__sykmeldinger">
      <h3>{tekster.sykmeldinger.header}</h3>
      {Object.keys(sykmeldingerSortertPaaVirksomhet).map((key, index) => (
        <SykmeldingerForVirksomhet
          key={index}
          sykmeldinger={sykmeldingerSortertPaaVirksomhet[key]}
        />
      ))}
    </div>
  );
};

interface SykmeldingerUtenArbeidsgiverProps {
  oppfolgingstilfelleUtenArbeidsgiver: OppfolgingstilfellePerson;
  sykmeldinger: SykmeldingOldFormat[];
}

export const SykmeldingerUtenArbeidsgiver = ({
  oppfolgingstilfelleUtenArbeidsgiver,
  sykmeldinger,
}: SykmeldingerUtenArbeidsgiverProps) => {
  const innsendteSykmeldinger = sykmeldingerUtenArbeidsgiver(sykmeldinger);
  const sykmeldingerIOppfolgingstilfellet = sykmeldingerInnenforOppfolgingstilfellePerson(
    innsendteSykmeldinger,
    oppfolgingstilfelleUtenArbeidsgiver
  );
  const sykmeldingerSortertPaUtstedelsesdato = sykmeldingerSortertNyestTilEldst(
    sykmeldingerIOppfolgingstilfellet
  );
  return (
    <div className="utdragFraSykefravaeret__sykmeldinger">
      <h3>{tekster.sykmeldinger.headerUtenArbeidsgiver}</h3>
      {sykmeldingerSortertPaUtstedelsesdato.length > 0 &&
        sykmeldingerSortertPaUtstedelsesdato.map((sykmelding, index) => {
          return (
            <div
              className="utdragFraSykefravaeret__sykmeldingerForVirksomhet"
              key={index}
            >
              <Utvidbar
                tittel={<UtvidbarTittel sykmelding={sykmelding} />}
                visLukkLenke={false}
              >
                <SykmeldingMotebehovVisning sykmelding={sykmelding} />
              </Utvidbar>
            </div>
          );
        })}
    </div>
  );
};

interface SamtalereferatProps {
  fnr: string;
}

export const Samtalereferat = ({ fnr }: SamtalereferatProps) => (
  <div className="utdragFraSykefravaeret__samtalereferat">
    <h3>{tekster.samtalereferat.header}</h3>
    <Lenke
      className="lenke"
      href={`https://modapp${finnMiljoStreng()}.adeo.no/modiabrukerdialog/person/${fnr}#!meldinger`}
      target="_blank"
    >
      {tekster.samtalereferat.lenkeTekst}
    </Lenke>
  </div>
);

interface UtdragFraSykefravaeretProps {
  aktiveDialoger: OppfolgingsplanDTO[];
  fnr: string;
  oppfolgingstilfelleUtenArbeidsgiver?: OppfolgingstilfellePerson;
  oppfolgingstilfelleperioder: OppfolgingstilfelleperioderMapState;
  sykmeldinger: SykmeldingOldFormat[];
}

const UtdragFraSykefravaeret = ({
  aktiveDialoger,
  fnr,
  oppfolgingstilfelleUtenArbeidsgiver,
  oppfolgingstilfelleperioder,
  sykmeldinger,
}: UtdragFraSykefravaeretProps) => (
  <div>
    <UtdragFraSykefravaeretHeader />

    <div className="panel utdragFraSykefravaeret">
      <Oppfolgingsplaner aktiveDialoger={aktiveDialoger} fnr={fnr} />

      <Sykmeldinger
        oppfolgingstilfelleperioder={oppfolgingstilfelleperioder}
        sykmeldinger={sykmeldinger}
      />

      {oppfolgingstilfelleUtenArbeidsgiver && (
        <SykmeldingerUtenArbeidsgiver
          oppfolgingstilfelleUtenArbeidsgiver={
            oppfolgingstilfelleUtenArbeidsgiver
          }
          sykmeldinger={sykmeldinger}
        />
      )}

      <Samtalereferat fnr={fnr} />
    </div>
  </div>
);

export default UtdragFraSykefravaeret;
