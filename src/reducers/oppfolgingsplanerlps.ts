import { Reducer } from 'redux';
import {
    HENT_OPPFOLGINGSPLANER_LPS_FEILET,
    HENT_OPPFOLGINGSPLANER_LPS_HENTER,
    HENT_OPPFOLGINGSPLANER_LPS_HENTET,
} from '../actions/oppfolgingsplanerlps_actions';
import { VIRKSOMHET_HENTET } from "../actions/virksomhet_actions";
import { OppfolgingsplanLPS } from '../types/OppfolgingsplanLPS';
import { PersonOppgave } from "../types/PersonOppgave";

export interface OppfolgingsplanerlpsState {
    henter: boolean,
    hentet: boolean,
    hentingFeilet: boolean,
    hentingForsokt: boolean,
    data: OppfolgingsplanLPS[],
}

export const initialState: OppfolgingsplanerlpsState = {
    henter: false,
    hentet: false,
    hentingFeilet: false,
    hentingForsokt: false,
    data: [],
};

const oppfolgingsplanerlps: Reducer<OppfolgingsplanerlpsState> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case HENT_OPPFOLGINGSPLANER_LPS_HENTER: {
            return {
                ...state,
                henter: true,
                hentet: false,
                hentingFeilet: false,
                hentingForsokt: false,
            };
        }
        case HENT_OPPFOLGINGSPLANER_LPS_HENTET: {
            const data = [...action.data].map((oppfolgingsplan: OppfolgingsplanLPS) => {
                const personOppgave: PersonOppgave[] = action.personOppgaveList.filter((oppgave: PersonOppgave) => {
                    return oppgave.referanseUuid === oppfolgingsplan.uuid;
                })
                if (personOppgave && personOppgave.length > 0) {
                    return {
                        ...oppfolgingsplan,
                        personoppgave: {
                            ...personOppgave[0]
                        }
                    };
                }
                return oppfolgingsplan
            });
            return {
                ...state,
                henter: false,
                hentet: true,
                hentingForsokt: true,
                data,
            };
        }
        case HENT_OPPFOLGINGSPLANER_LPS_FEILET: {
            return {
                ...state,
                henter: false,
                hentingFeilet: true,
                hentingForsokt: true,
            };
        }
        case VIRKSOMHET_HENTET: {
            const data = state.data.map((oppfolgingsplan) => {
                if (oppfolgingsplan.virksomhetsnummer === action.orgnummer) {
                    return {
                        ...oppfolgingsplan,
                        virksomhetsnavn: action.data.navn,
                    };
                }
                return oppfolgingsplan
            });
            return {
                ...state,
                data,
            };
        }
        default:
            return state;
    }
};

export default oppfolgingsplanerlps;
