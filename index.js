const { response } = require('express');
const express = require('express');
const { v4:uuidv4 } = require('uuid');

const app = express();

app.use(express.json());
const projects = [];
/**
 * 
 *  GET: Buscar informações do back-end
 *  POST: Criar uma informação no back-end
 *  PUT/PATCH: Alterar uma informação no back-end
 *  DELETE:  Deletar informações no back-end
 * 
 */

// app.get('/', (request,response) =>{
//     response.send('Olá, pessoal!');
// })

// app.get('/projects', (request,response) =>{
//     return response.json([
//         'Projeto 1',
//         'Projeto 2',
//     ])
// });

// app.post('/projects', (request,response) =>{
//     return response.json([
//         'Projeto 1',
//         'Projeto 2',
//         'Projeto 3',
//     ])
// });

// app.put('/projects/:id', (request,response) =>{
//     return response.json([
//         'Projeto 50',
//         'Projeto 2',
//         'Projeto 3',
//         'Projeto 4',
//         'Projeto 5',
//     ])
// });

app.delete('/projects/:id', (request, response) => {
    const {id} = request.params;

    const projectIndex = projects.findIndex(project => project.id === id);

    if(projectIndex < 0) {
        return response.status(400).json({error: 'Projeto não foi encontrado'});
    }

    projects.splice(projectIndex, 1);

    return response.status(204).send();
});


// app.delete('/projects/:id', (request,response) =>{
//     const { id } = request.params

//     const projectIndex = projects.findIndex(project => project.id === id);

//     if (projectIndex <0){
//         return response.status(400).json({ error: 'Projeto não foi encontrado'});
//     }

//     project.splice(projectIndex, 1);

//     return response.status(204).send();
//     // return response.json([
//     //     'Projeto 50',
//     //     'Projeto 2',
//     // ])
// });

/** 
 * 
 *   Query Params: Vamos usar principalmente para filtros e paginação
 *   Route Params: Identificar recursos na hora de atualizar ou deletar
 *   Request Params: 
 * 
 * 
 * 
*/
// app.get('/projects', (request,response) =>{
//     const query =request.query;

//     console.log(query)
    
//     return response.json([
//         'Projeto 1',
//         'Projeto 2',
//     ])
// });
app.get('/projects', (request,response) =>{
    
    // const {title, owner } =request.query;
    return response.json(projects)
    // // console.log(title);
    // // console.log(owner);
    
    // return response.json([
    //     'Projeto 1',
    //     'Projeto 2',
    //     'Projeto 100',
    // ])
});

app.post('/projects', (request,response) => {
    const { title, owner} = request.body;

    // console.log(title);
    // console.log(owner);
    const project = {id: uuidv4(), title, owner};

    projects.push(project); // Esse push vai jogar a criação do nosso projeto para o nosso array
    
    return response.json(project);  //sempre retornar o projeto recém criado e a nunca exibir a lista completa.

    // return response.json([
    //     'Projeto 1',
    //     'Projeto 2',
    //     'Projeto 3',
    // ])
});

app.put('/projects/:id', (request, response) => {
    const { id } = request.params; // aqui pegamos nosso ID
    const { title, owner } = request.body; // retornando uma nova informação

    const projectIndex = projects.findIndex(project => project.id === id);

    if (projectIndex < 0) {
        return response.status(400).json({ error: 'Projeto não foi encontrado' });
    }

    const project = {
        id,
        title,
        owner,
    }

    projects[projectIndex] = project;


    return response.json(project);
});


// app.put('/projects/:id', (request, response) =>{
//     const {id} = request.params; //aqui pegamos nosso ID
//     const {title, owner} = request.body; // retornando uma nova função

//     const projectIndex = projects.findIndex(project => project.id === id);
//     //aqui usamos o findIndex para percorrer todo o array atrás do id
//     //findIndex vai percorrer todos os projetos, e toda vez que ele percorre na variavel project
//     // caso ela satisfaça e retornar true, ela vai me retornar o id que estou passando (project => project.id === id)

//     if (projectIndex < 0) {
//         return response.status(400).json({ error: 'Projeto não foi encontrado'});
//     }

//     //agora que temos um indice, vamos criar uma nova informação do projeto
//     const project ={
//         id,
//         title,
//         owner,
//     };

//     project[projectIndex] = project;

//     return response.json(project);
// });

// app.put('/projects/:id', (request,response) => {
//  //   const params = request.params;
//     const {id} = request.params;  // aqui pegamos nosso ID
//     const { title, owner } = request.body  // retornando uma nova informação

//     // aqui usamos o findIndex para percorrer todo o array atrás do id
//     // findIndes vai percorrer todos os projetos, e toda vez que ele percorrer na variável project
//     // caso ela satisfeita e retornar true, ela vai me retornar o id que estou passando (project => project.id = = = id)
//     const projectIndex = projects.findIndex(project => project.id === id );
    
//     if (projectIndex < 0) {
//         return response.status(400).json({ error: 'Projeto não foi encontrado'});
//     }
//     const project = {
//         id,
//         title,
//         owner,
//     }
//     projects[projectIndex] = project;
//     return response.json(project);
//     // console.log(params)

//     // return response.json([
//     //     'Projeto 50',
//     //     'Projeto 2',
//     //     'Projeto 3',
//     //     'Projeto 4',
//     //     'Projeto 5',
//     // ])
// });


// app.post()

// http://localhost:3000/
app.listen(3000,() => {
    console.log('Serviço rodando!')
})