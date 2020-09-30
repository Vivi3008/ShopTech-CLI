const program = require('commander')
const package = require('./package.json')
const produtos = require('./products.json')
const chalk = require('chalk');

const Produtos = require('./produto');




async function main(){
    program
        .version(package.version)
        //listando produtos
           .option('-l, --listar', "Listar Produtos")
           .option('-c, --comprar [value]', "Comprar Produto pelo Codigo")



        .parse(process.argv)

        const prod = new Produtos(Commander)

        try {
            if(program.listar){
                console.table(produtos)
            }

            if(program.comprar){
                console.log(chalk.yellow(`Produto: ${prod}`))
            }




        } catch (error) {
            console.error('Erro ao digitar comando!', error)
        }

        

}

main()