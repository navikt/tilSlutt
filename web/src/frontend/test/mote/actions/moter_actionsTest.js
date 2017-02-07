import { expect } from 'chai';
import * as actions from '../../../js/mote/actions/moter_actions';

describe("moter_actions", () => {

    it("Skal ha en opprettMote()-funksjon som returnerer riktig action", () => {
        const action = actions.opprettMote({
            test: 1,
            fnr: "123456"
        });
        expect(action).to.deep.equal({
            type: "OPPRETT_MOTE_FORESPURT",
            data: {
                fnr: "123456",
                test: 1
            }
        })
    }); 

    it("Skal ha en oppretterMote()-funksjon som rturnerer riktig action", () => {
        const action = actions.oppretterMote();
        expect(action).to.deep.equal({
            type: "OPPRETTER_MOTE"
        });
    });

    it("Skal ha en hentMoter()-funksjon som returnerer riktig action", () => {
        const action = actions.hentMoter("123");
        expect(action).to.deep.equal({
            type: "HENT_MOTER_FORESPURT",
            fnr: "123"
        })
    });

    it("Skal ha en moteOpprettet()-funksjon som returnerer riktig action", () => {
        const data = {
            test: 1,
            fnr: "1234",
        }
        const action = actions.moteOpprettet(data);
        expect(action).to.deep.equal({
            type: "MOTE_OPPRETTET",
            data: {
                test: 1,
                fnr: "1234"
            },
            fnr: "1234"
        })
    });

    it("Skal ha en avbrytMote()-funksjon som returnerer riktig action", () => {
        const action = actions.avbrytMote("fiskekake", "123");
        expect(action).to.deep.equal({
            type: "AVBRYT_MOTE_FORESPURT",
            uuid: "fiskekake",
            fnr: "123",
            varsle: true,
        })
    });

    it("Skal ha en avbrytMoteUtenVarsel()-funksjon som returnerer riktig action", () => {
        const action = actions.avbrytMoteUtenVarsel("fiskekake", "123");
        expect(action).to.deep.equal({
            type: "AVBRYT_MOTE_FORESPURT",
            uuid: "fiskekake",
            fnr: "123",
            varsle: false,
        })
    });

    it("Skal ha en bekreftMote()-funksjon som rturnerer riktig action", () => {
        const action = actions.bekreftMote("moteUuid", "valgtAlternativId", "998877");
        expect(action).to.deep.equal({
            type: "BEKREFT_MOTE_FORESPURT",
            moteUuid: "moteUuid",
            valgtAlternativId: "valgtAlternativId",
            fnr: "998877"
        });
    });

    it("Skal ha en bekrefterMote()-funksjon som rturnerer riktig action", () => {
        const action = actions.bekrefterMote();
        expect(action).to.deep.equal({
            type: "BEKREFTER_MOTE",
        });
    });

    it("Skal ha en moteBekreftet()-funksjon som rturnerer riktig action", () => {
        const action = actions.moteBekreftet("olsen", "valgtAlternativId");
        expect(action).to.deep.equal({
            type: "MOTE_BEKREFTET",
            moteUuid: "olsen",
            valgtAlternativId: "valgtAlternativId"
        });
    });

    it("Skal ha en bekreftMoteFeilet()-funksjon som returnerer riktig action", () => {
        const action = actions.bekreftMoteFeilet(); 
        expect(action).to.deep.equal({
            type: "BEKREFT_MOTE_FEILET",
        });
    })

});