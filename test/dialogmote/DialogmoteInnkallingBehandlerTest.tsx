import { expect } from "chai";
import React from "react";
import DialogmoteInnkallingBehandler, {
  texts,
} from "@/components/dialogmote/innkalling/DialogmoteInnkallingBehandler";
import {
  BehandlerDialogmeldingDTO,
  BehandlerType,
} from "@/data/behandlerdialogmelding/BehandlerDialogmeldingDTO";
import { QueryClient, QueryClientProvider } from "react-query";
import { arbeidstaker, mockStateBehandler } from "./testData";
import { behandlereDialogmeldingQueryKeys } from "@/data/behandlerdialogmelding/behandlereDialogmeldingQueryHooks";
import { MemoryRouter, Route } from "react-router-dom";
import { dialogmoteRoutePath } from "@/routers/AppRouter";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { createStore } from "redux";
import { rootReducer } from "@/data/rootState";
import { render, screen } from "@testing-library/react";

let queryClient;
const noOpMethod = () => {
  /*not empty*/
};
const store = configureStore([]);
const realState = createStore(rootReducer).getState();

describe("DialogmoteInnkallingBehandler", () => {
  const fastlege = {
    type: BehandlerType.FASTLEGE,
    behandlerRef: "123",
    fornavn: "Lego",
    mellomnavn: "Las",
    etternavn: "Legesen",
  };
  const behandlere: BehandlerDialogmeldingDTO[] = [fastlege];

  beforeEach(() => {
    queryClient = new QueryClient();
  });

  it("shows a list of behandlere", () => {
    queryClient.setQueryData(
      behandlereDialogmeldingQueryKeys.behandleredialogmelding(
        arbeidstaker.personident
      ),
      () => behandlere
    );
    renderDialogmoteInnkallingBehandler();

    expect(screen.getAllByRole("radio")).to.have.length(2);
    expect(screen.getByRole("radio", { name: "Ingen behandler" })).to.exist;
    expect(screen.getByRole("radio", { name: "Fastlege: Lego Las Legesen" })).to
      .exist;
    expect(screen.queryByText("Venter...")).to.not.exist;
  });
  it("displays an app spinner when loading", () => {
    renderDialogmoteInnkallingBehandler();

    expect(screen.getByText("Venter...")).to.exist;
    expect(screen.queryAllByRole("radio")).to.be.empty;
  });

  it("displays alert message when no behandlere", () => {
    queryClient.setQueryData(
      behandlereDialogmeldingQueryKeys.behandleredialogmelding(
        arbeidstaker.personident
      ),
      () => []
    );
    renderDialogmoteInnkallingBehandler();

    expect(screen.getByRole("img", { name: "advarsel-ikon" })).to.exist;
    expect(screen.getByText(texts.noBehandlerFound)).to.exist;
  });
});

const renderDialogmoteInnkallingBehandler = () => {
  return render(
    <MemoryRouter initialEntries={[dialogmoteRoutePath]}>
      <Route path={dialogmoteRoutePath}>
        <QueryClientProvider client={queryClient}>
          <Provider store={store({ ...realState, ...mockStateBehandler })}>
            <DialogmoteInnkallingBehandler setSelectedBehandler={noOpMethod} />
          </Provider>
        </QueryClientProvider>
      </Route>
    </MemoryRouter>
  );
};