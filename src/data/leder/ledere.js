import {
  HENTER_LEDERE,
  LEDERE_HENTET,
  HENT_LEDERE_FEILET,
} from "./ledere_actions";
import {
  currentLedere,
  formerLedere,
  mapTomDateToEarlierLedere,
} from "../../utils/ledereUtils";

const defaultState = {
  data: [],
  formerLedere: [],
  allLedere: [],
  henter: false,
  hentet: false,
  hentingFeilet: false,
};

const ledere = (state = defaultState, action = {}) => {
  switch (action.type) {
    case LEDERE_HENTET: {
      const ledereWithTomDate = mapTomDateToEarlierLedere(action.data);
      return {
        data: currentLedere(ledereWithTomDate),
        formerLedere: formerLedere(ledereWithTomDate),
        allLedere: ledereWithTomDate,
        henter: false,
        hentet: true,
        hentingFeilet: false,
      };
    }
    case HENTER_LEDERE: {
      return {
        henter: true,
        hentet: false,
        hentingFeilet: false,
        data: [],
        formerLedere: [],
        allLedere: [],
      };
    }
    case HENT_LEDERE_FEILET: {
      return {
        henter: false,
        hentet: false,
        hentingFeilet: true,
        data: [],
        formerLedere: [],
        allLedere: [],
      };
    }
    default: {
      return state;
    }
  }
};

export default ledere;