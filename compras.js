const { writeFile, readFile } = require('fs')
const { promisify } = require('util')
const [writeFileAsync, readFileAsync] = [
  promisify(writeFile),
  promisify(readFile),
]

class Compras{
    constructor(){
        this.arquivo = 'products.json'
        this.compra = 'compra.json'
    }

    readFileProducts(){
       const produtos = require('./products.json')
       return produtos.toString()
   }

    async readFileCompra(){
        const compras = await readFileAsync(this.compra, 'utf-8')
        return JSON.parse(compras.toString())
    }

    async writeFile(dados){
         await writeFileAsync(this.compra, JSON.stringify(dados))
         return true
    }

    async addCarrinho(id){
         const produtos = this.readFileProducts()
        const compras = await this.readFileCompra()

        console.log(produtos)
       /*  const Produto = produtos.filter(item => item.cod === id)

        let objFinal = {}

        //extrair o objeto do array Produto
        Produto.forEach(item => {
            for (var i in item){
                objFinal[i] = item[i]
            }
        })
        
        const compraFinal = [ ...compras, objFinal ]
       
        return await this.writeFile(compraFinal)   */
    }

    async RemoverItem(id){
        const compra = await this.readFileCompra()

        const index = compra.findIndex( item => item.cod === id)

        try {
            if (index === -1) throw Error('O codigo do produto nao existe') 

            const produtosComDadoRemovido = compra.filter( item => item.cod !== id)

            return await this.writeFile(produtosComDadoRemovido)

        } catch (error) {
            console.error('Erro ao deletar! ', error)
        }
        
    }

    async mostrarCarrinho(){
        const compras = await this.readFileCompra()
        return compras
    }

    async FinalizarCompra(){
        const compras = await this.readFileCompra()

        try {
            if(compras === " ") throw Error('Carrinho Vazio!')

            const valor = compras.map( item => item.Valor)

            const total = valor.reduce( (total, next) => total + next)
            
            console.log(total)

        } catch (error) {
            console.error('Erro ao finalizar compra! ', error)
        }
        
    }

}

module.exports = new Compras()