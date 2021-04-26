import { CLICK_UPDATE_VALUE } from '../actions/actionTypes';
const initialState = {
    idnome: '',
    cpf: '',
    email: ''
};
export const clickReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLICK_UPDATE_VALUE:
    //console.log(state)
      return {
        ...state,
        nome: action.value,
        cpf: action.value2,
        email: action.value3
      };
    default:
    //console.log(state)
      return state;
  }
};