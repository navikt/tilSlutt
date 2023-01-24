import React, { ReactElement } from "react";
import Side from "@/sider/Side";
import { Menypunkter } from "@/navigation/menypunkterTypes";
import Sidetopp from "@/components/Sidetopp";
import { useAktivitetskravQuery } from "@/data/aktivitetskrav/aktivitetskravQueryHooks";
import { useOppfolgingstilfellePersonQuery } from "@/data/oppfolgingstilfelle/person/oppfolgingstilfellePersonQueryHooks";
import SideLaster from "@/components/SideLaster";
import { AktivitetskravSide } from "@/components/aktivitetskrav/AktivitetskravSide";
import { useOppfolgingsplanerQuery } from "@/data/oppfolgingsplan/oppfolgingsplanQueryHooks";

const texts = {
  title: "Aktivitetskrav",
};

export const AktivitetskravContainer = (): ReactElement => {
  const {
    isInitialLoading: henterAktivitetskrav,
    isError: hentAktivitetskravFeilet,
  } = useAktivitetskravQuery();
  const {
    isInitialLoading: henterOppfolgingsplaner,
    isError: hentOppfolgingsplanerFeilet,
  } = useOppfolgingsplanerQuery();
  const {
    isInitialLoading: henterOppfolgingstilfeller,
    isError: hentOppfolgingstilfellerFeilet,
  } = useOppfolgingstilfellePersonQuery();

  const henter =
    henterAktivitetskrav ||
    henterOppfolgingstilfeller ||
    henterOppfolgingsplaner;
  const hentingFeilet =
    hentAktivitetskravFeilet ||
    hentOppfolgingstilfellerFeilet ||
    hentOppfolgingsplanerFeilet;

  return (
    <Side tittel={texts.title} aktivtMenypunkt={Menypunkter.AKTIVITETSKRAV}>
      <Sidetopp tittel={texts.title} />
      <SideLaster henter={henter} hentingFeilet={hentingFeilet}>
        <AktivitetskravSide />
      </SideLaster>
    </Side>
  );
};