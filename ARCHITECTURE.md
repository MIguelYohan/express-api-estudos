
### Nível 1: Fundamentos do Express

1. **CRUD completo em memória** : crie um recurso (ex: `tarefas`) com `GET /tarefas`, `GET /tarefas/:id`, `POST`, `PUT`, `PATCH` e `DELETE`, guardando tudo em um array.
2. **Query params** : adicione filtros e paginação em `GET /tarefas?concluida=true&page=2&limit=10`.
3. **Códigos HTTP corretos** : faça o 201 no POST, 204 no DELETE, 404 quando não existir e 400 para dados inválidos.
4. **Router separado** : mova as rotas para `routes/tarefas.js` usando `express.Router()` e monte com `app.use('/tarefas', router)`.
