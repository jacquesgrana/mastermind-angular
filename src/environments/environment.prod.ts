import { Library } from "src/app/libraries/library";

export const environment = {
  production: true,
  MAX_TURN_NUMBER: 12,
 COLOR_NUMBER: 8,
 COMBI_COLOR_NUMBER: 4,
 LIMIT_MATCHING_COMBIS: 9,
 MAX_POSSIBLE_COMBI_NUMBER: Library.fact(8) / Library.fact(4)
};
