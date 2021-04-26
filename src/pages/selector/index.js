const selector = {
    getNome: state => state.clickReducer.nome,
    getCpf: state => state.clickReducer.cpf,
    getEmail: state => state.clickReducer.email
}

export {selector}