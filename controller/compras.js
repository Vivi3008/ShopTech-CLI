const { writeFile, readFile } = require('fs')
const { promisify } = require('util')
const [writeFileAsync, readFileAsync] = [
    promisify(writeFile),
    promisify(readFile),
]

class Compras {
    constructor() {
        this.arquivo = './data/products.json'
        this.compra = './data/compra.json'
    }

    async readFileProducts() {
        try {
            const doc = await readFileAsync(this.arquivo)
            return JSON.parse(doc.toString())

        } catch (error) {
            console.log('Erro!', error)
        }
    }

    async readFileCompra() {
        const compras = await readFileAsync(this.compra)
        return JSON.parse(compras.toString())
    }

    async writeFile(dados) {
        await writeFileAsync(this.compra, JSON.stringify(dados))
        return true
    }

    async addCarrinho(id) {

        const produtos = await this.readFileProducts()
        const compras = await this.readFileCompra()

        const index = produtos.findIndex(item => item.cod === id)

        if (index === -1) {
            return false
        } else {
            const produtoAdicionado = produtos.filter(item => item.cod === id)

            let objFinal = {}

            //extrair o objeto do array Produto
            produtoAdicionado.forEach(item => {
                for (var i in item) {
                    objFinal[i] = item[i]
                }
            })

            const compraFinal = [...compras, objFinal]

            return await this.writeFile(compraFinal)
        }
    }

    async RemoverItem(id) {
        const compra = await this.readFileCompra()

        const index = compra.findIndex(item => item.cod === id)

        if (index === -1) {
            return false
        }

        else {
            const produtosComDadoRemovido = compra.filter(item => item.cod !== id)

            return await this.writeFile(produtosComDadoRemovido)
        }
    }

    async mostrarCarrinho() {
        const compras = await this.readFileCompra()
        return compras
    }

    async FinalizarCompra() {
        const compras = await this.readFileCompra()

        if (compras.length === 0) {
            return 0
        }
        else {
            const valor = compras.map(item => parseInt(item.Valor))

            const total = valor.reduce((total, next) => total + next)

            await this.writeFile([])

            return total
        }

    }

}

module.exports = new Compras()