
const Database = require('./database')


const dados = {
    Produto: "Tablet Pc",
    Valor: 2000
}

async function show(cod){
    const prodAdd = await Database.showData(cod)
    console.table(prodAdd)    
}

async function add(data){
    const add = await Database.addData(data)
    const result = add ? console.log("Adicionado com sucesso!") : console.log("Erro ao adicionar")
    return result
}

async function remove(cod){
    const result = await Database.removeData(cod)
    const response = result ? console.log("Removido com sucesso!") : console.error('Erro ao remover!')
    return response
}

async function update(cod, data){
    const result = await Database.update(cod, data)
    const response = result ? console.log('Alterado com sucesso!') : console.error('Erro ao atualizar!')
    return response
}

add(dados)