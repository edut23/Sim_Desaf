import { CLICK_UPDATE_VALUE } from './actionTypes';
export const clickButton = value => ({
  type: CLICK_UPDATE_VALUE,
  nome: value,
  cpf: value,
  email: value
});