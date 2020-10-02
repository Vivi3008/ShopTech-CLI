const program = require('commander')
const package = require('./package.json')
const produtos = require('./products.json')
const chalk = require('chalk');
let inquirer = require('inquirer')
const carrinho = require('./compras')
const figlet = require('figlet')
const Table = require('cli-table')


console.log(chalk.cyan(figlet.textSync('Shop Tech')))
console.log(chalk.blue('Escolha o produto pelo código'))


const table = new Table({
    head: ['Código', 'Produto', 'R$ Valor'],
    colWidths: [10,30,20]
})

produtos.forEach(prod => {
    table.push(
        [prod.cod, prod.Produto, `R$ ${prod.Valor}`]
    )
})

console.log(chalk.bgWhiteBright(chalk.black(table.toString())))

async function main() {
    program
        .version(package.version)
        .parse(process.argv)

    
    shop()


    async function shop() {
        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'res',
                    message: 'O que deseja fazer?',
                    choices: ['Comprar', 'Mostrar carrinho', 'Remover item', 'Finalizar Compra', 'Sair']
                }
            ])
            .then(async answer => {
                const { res } = answer

                switch (res) {
                    case 'Comprar':
                        questionShop()
                        break;

                    case 'Mostrar carrinho':
                        const result = await carrinho.mostrarCarrinho()
                        if (result.length === 0 ){
                            console.log(chalk.redBright('Carrinho vazio!'))
                        } else console.table(result)

                        setTimeout(() => shop(), 1000)
                        break;

                    case 'Remover item':
                        DeleteItem()
                        break;

                    case 'Finalizar Compra':
                        const total = await carrinho.FinalizarCompra()
                        console.log(chalk.blueBright(`Pagando o total de: R$ ${total}`))
                        msgExit()
                        break;

                    case 'Sair':
                       msgExit()
                    break;
                }
            })
    }


    async function questionShop() {
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'Cod',
                    message: 'Digite o código do produto que deseja comprar: '
                }
            ])
            .then(async cod => {
                const { Cod } = cod
                const id = parseInt(Cod)
                const result = await carrinho.addCarrinho(id)

                result ? console.log(chalk.green('Produto adicionado ao carrinho!')) : console.log(chalk.redBright('Código do produto inexistente!'))
                setTimeout(() => shop(), 1000)
            })
    }

    async function DeleteItem() {
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'res',
                    message: 'Digite o codigo do produto que será removido: '
                }
            ])
            .then(async answer => {
                const { res } = answer
                const id = parseInt(res)
                const result = await carrinho.RemoverItem(id)
                result ? console.log(chalk.green('Item removido com sucesso!')) : console.log(chalk.redBright('Código inexistente'))
                setTimeout(() => shop(), 1000)
            })
    }
}

main()

function msgExit(){
    setTimeout(() => {
        console.log(chalk.cyan(figlet.textSync('Volte sempre!')))
        console.log(chalk.bgRed(' Made with love by Vivi'))
    }, 700);
}