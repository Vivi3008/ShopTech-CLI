const { writeFile, readFile } = require('fs')
const { promisify } = require('util')
const [writeFileAsync, readFileAsync] = [
  promisify(writeFile),
  promisify(readFile),
]


class Database {
    constructor(){
        this.arquivo = './data/products.json'
    }

    //pegar dados do arquivo
    async readFile(){
        const doc = await readFileAsync(this.arquivo)
        return JSON.parse(doc.toString())
    }

    async writeFile(data){
        await writeFileAsync(this.arquivo, JSON.stringify(data))
        return true
    }

    async addData(product){
        const doc = await this.readFile()

        const cod = Math.floor(Math.random()*250)

        const Valor = parseFloat(product.Valor)
        const Produto = (product.Produto).toUpperCase()

        const prodCod = { cod, Produto, Valor }

        const prodFinal = [ ...doc, prodCod ]

        return await this.writeFile(prodFinal)  
        
    }

    async removeData(cod){
        //se nao passar cod o comando ira apagar todos os registros
        if (!cod) return this.writeFile([])

        const doc = await this.readFile()

        const index = doc.findIndex(index => index.cod === cod)

        if(index===-1) throw Error("O codigo não existe!");

        const dadoRemovido = doc.filter( item => item.cod !== cod)

        return this.writeFile(dadoRemovido)
    }

    async showData(cod){
        const data = await this.readFile()

        const dataFilter = data.filter( item => cod ? item.cod === cod : true )

        return dataFilter   
    }

    async update(cod, product){
        const data = await this.readFile()

        const productUpdate = data.filter( item => item.cod === cod)


        const prodActual = Object.assign(...productUpdate, product)

        //retorna o indice do array a ser alterado
        const index = data.findIndex( item => item.cod === parseInt(cod))

        if (!index) throw Error('O produto informado nao existe!');

        data.splice(index, 1)

        const prodFinal = [
            ...data,
            prodActual
        ]

        return await this.writeFile(prodFinal)
        
    }

}

module.exports = new Database()

