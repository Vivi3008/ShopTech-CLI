const program = require('commander')
const package = require('./package.json')
const produtos = require('./products.json')
const chalk = require('chalk');
const carrinho = require('./compras')
const figlet = require('figlet')
let inquirer = require('inquirer')

console.log(chalk.cyan(figlet.textSync('Shop Tech')))
console.log(chalk.blue('Escolha o produto pelo código'))


async function main(){
    program
        .version(package.version)
        .parse(process.argv)

    console.table(produtos)
   
    continueShop()
   /*  inquirer
        .prompt([
            {
                type: 'list',
                name: 'resp',
                message: 'Deseja adicionar produtos? Digite S (sim) ou N (nao)',
                choices: ['Sim', 'Nao']
            }
        ])
        .then( answer => {
           const { resp } = answer
           if ( resp === 'Sim') questionShop()
             return        
        }) */

async function continueShop(){
    inquirer
        .prompt([
            {
                type:'list',
                name:'res',
                message: 'O que deseja fazer?',
                choices: ['Continuar comprando', 'Mostrar carrinho', ,'Remover item', 'Finalizar Compra', 'Sair']
            }
        ])
        .then( async answer => {
            const { res } = answer
            
            switch (res) {
                case 'Continuar comprando':
                    questionShop()
                    break;
                case 'Finalizar Compra':
                    const total =  await finalizarCompra()
                    console.log(chalk.blueBright(`Pagando o total de: R$ ${total}`))
                    break;
                case 'Remover item':
                    DeleteItem()
                    break;
                case 'Mostrar carrinho':
                    const result = await carrinho.mostrarCarrinho()
                    console.table(result)
                    setTimeout( () =>  continueShop(), 1000)   
                    break;
                case 'Sair':
                    break;
            }
        })
}
    

    async function questionShop(){
        inquirer
            .prompt([
                {
                    type: 'input',
                    name:'Cod',
                    message:'Digite o código do produto que deseja comprar: '
                }
            ])
            .then( async cod => {
                const { Cod } = cod
                const id = parseInt(Cod)
                const result = await comprar(id)
                
                result ? console.log(chalk.green('Produto adicionado ao carrinho!')) : console.log(chalk.red('Erro ao adicionar o produto!')) 
                setTimeout( () =>  continueShop(), 1000)  
            })
    }

    async function DeleteItem(){
        inquirer
            .prompt([
                {
                    type:'input',
                    name: 'res',
                    message: 'Digite o codigo do produto que será deletado: '
                }
            ])
            .then( async answer => {
                const { res } = answer
                const id = parseInt(res)
                const result = await removerItem(id)
                result ? console.log(chalk.green('Item removido com sucesso!')) : console.log(chalk.red('Erro ao remover item!'))
                setTimeout( () =>  continueShop(), 1000)  
            })
    }
}

main()

async function comprar(cod){
    const add = await carrinho.addCarrinho(cod)
    return add
}

async function finalizarCompra(){
    const result = await carrinho.FinalizarCompra()
    return result
}

async function removerItem(cod){
    const result = await carrinho.RemoverItem(cod)
    return result 
}

