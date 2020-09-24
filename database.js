const { writeFileSync, readFileSync } = require('fs')

class Database {
    constructor(){
        this.arquivo = 'produtos.json'
    }

    //pegar dados do arquivo
    async readFile(){
        const doc = await readFileSync(this.arquivo, 'utf-8')
        return JSON.parse(doc.toString())
    }

    async writeFile(data){
        await writeFileSync(this.arquivo, JSON.stringify(data))
        return true
    }

    async addData(product){
        const doc = await this.readFile()

        const prodFinal = [
            ...doc,
            product
        ]
         return await this.writeFile(prodFinal)  
    }

    async removeData(cod){
        //se nao passar cod o comando ira apagar todos os registros
        if (!cod) return this.writeFile([])

        const doc = await this.readFile()

        const index = doc.findIndex(index => index.cod === cod)

        if(!index) throw Error("O codigo não existe!");

        const dadoRemovido = doc.filter( item => item.cod !== cod)

        return this.writeFile(dadoRemovido)
    }

    async showData(cod){
        const data = await this.readFile()

        const dataFilter = data.filter( item => cod ? item.cod === cod : true )

        return dataFilter   
    }

}


const escrever = new Database

const dados = {
    cod: Math.floor(Math.random()*250),
    Produto: "Pen Drive 32Gb",
    Valor: 45
}

async function show(){
    const prodAdd = await escrever.showData()
    console.table(prodAdd)    
}

async function add(dados){
    const add = await escrever.writeFile(dados)
    const result = add ? console.log("Adicionado com sucesso!") : console.log("Erro ao adicionar")
    return result
}

add(dados)
/* console.table(escrever.showData()) */