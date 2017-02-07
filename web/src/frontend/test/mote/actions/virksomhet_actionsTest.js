import { expect } from 'chai';
import * as actions from '../../../js/mote/actions/virksomhet_actions';

describe("virksomhet_actions", () => {

    it("Har en hentVirksomhet()-funksjon som returnerer riktig action", () => {
        const action = actions.hentVirksomhet('orgnummer');
        expect(action).to.deep.equal({
            type: "HENT_VIRKSOMHET_FORESPURT",
            orgnummer: "orgnummer",
        });
    });

    it("Har en henterVirksomhet()-funksjon som returnerer riktig action", () => {
        const action = actions.henterVirksomhet();
        expect(action).to.deep.equal({
            type: "HENTER_VIRKSOMHET"
        });
    });

    it("Har en hentVirksomhetFeilet()-funksjon som returnerer riktig action", () => {
        const action = actions.hentVirksomhetFeilet();
        expect(action).to.deep.equal({
            type: "HENT_VIRKSOMHET_FEILET",
        });
    });

    it("Har en virksomhetHentet()-funksjon som returnerer riktig action", () => {
        const action = actions.virksomhetHentet("orgnummer", {
            navn: "test"
        });
        expect(action).to.deep.equal({
            type: "VIRKSOMHET_HENTET",
            orgnummer: "orgnummer",
            data: {
                navn: "test"
            }
        });
    })
});