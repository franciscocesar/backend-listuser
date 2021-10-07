import express, { request, response } from 'express'
import { v4 as uuid } from 'uuid'
import cors from 'cors'
const app = express() // Método que constroi o aplicativo 

app.use(express.json()) //ar o json para receber informações
app.use(cors({origin: '*'}))

//Métodos HTTP -> GET | POST | PUT | DELETE

// http://api.meusite.com/users

interface User{
    id:string
    name:string
    email:string
}
const users: User[] = []

app.get('/users', (req, res) => {
    
    return res.json(users)
}) //Definindo nome da Rota 

app.post('/users', (req,res) => {
    const { name, email} = req.body //Recebendo dados

    const user = {id:uuid(), name, email} //Criando dados

    users.push(user) //Enviando para o usuário

    return res.json(user) //retornar os dados
}) 

app.put('/users/:id', (req,res) => {
    const { id } = req.params 
    const { name, email} = req.body //Receber dados usuário

    const userIndex = users.findIndex((user) => user.id === id)

    if(userIndex < 0) {
        return res.status(404).json({ error: 'User not found.'})
    } //Retornando erro caso id seja diferente

    users[userIndex] = {id, name, email}//att dados do usuário

    return res.json({id, name, email})
})// Query Params

app.delete('/users/:id', (req,res) => {
    const { id } = req.params

    const userIndex = users.findIndex((user) => user.id === id)

    if(userIndex < 0) {
        return response.status(404).json({ error: 'User not found.'})
    }

    users.splice(userIndex,1)

    return res.status(204).send()
})



app.listen('3333',() =>{
    console.log("Backe-end Started")
}) //Ouvir o aplicativo e passar a porta que o aplicativo seja exibido

