
const Database = require('./database')
const Compras = require('./compras')



const dados = {
    Produto: "Mouse wireless microsoft",
    Valor: 100
}

//manipular o database
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


//testes compras


async function comprar(cod){
    const result = await Compras.addCarrinho(cod)
    return result ? console.log('Produto adicionado ao carrinho!') : console.log('Erro ao adicionar produto no carrinho!')
}

async function remover(cod){
    const result = await Compras.RemoverItem(cod)
    return result ? console.log('Item deletado!') : console.log('Erro ao deletar item!')
}

async function mostrar(){
    const result = await Compras.mostrarCarrinho()
    console.table(result)
}

async function finalizar(){
    const result = await Compras.FinalizarCompra()
    return result
}


comprar(105)

