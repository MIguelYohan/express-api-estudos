import express from 'express';
import validateTask from '../middleware/taskValidate.js';

const data = [];
let proximoId = 0;

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json(data);
});

router.get('/:id', (req, res) => { // tarefas/id/1
    const taskId = Number(req.params.id);
    const task = data.find(task => task.id === taskId);

    if(!task) {
        return res.status(404).json({message: 'Tarefa não encontrada'});
    }

    res.status(200).json(task);
});

router.post('/', (req, res) => {
    let taskBody = {
        id: proximoId ++,
    }
    const { title, time_limit } = req.body;
    const r = validateTask(req.body);
    if(r.success){
        taskBody.title = title;
        taskBody.time_limit = time_limit;

        data.push(taskBody);
        return res.status(201).json(taskBody);
    }
    return res.status(400).json(r);
});

router.put('/:id', (req, res) => {
    let taskBody = data.find(task => task.id == req.params.id);
    if(taskBody){
        const idx = data.indexOf(taskBody);
        const { title, time_limit } = req.body;
        const r = validateTask(req.body);
        if(r.success){
            taskBody.title = title;
            taskBody.time_limit = time_limit;

            data[idx] = taskBody;
            return res.status(200).json(taskBody);
        }
        return res.status(400).json(r);
    }
    return res.status(204).json({message: 'Conteúdo não encontrado'});
});

router.delete('/:id', (req, res) => {
    let taskBody = data.find(task => task.id == req.params.id);
    if(taskBody){
        const idx = data.indexOf(taskBody);
        data.splice(idx, 1);

        return res.status(200).json({message: 'Tarefa excluída com sucesso'});
    }
    return res.status(204).json({message: 'Conteúdo não encontrado'});
});

router.patch('/:id', (req, res) => {
    const reqItems = Object.entries(req.body);
    const originalTask = data.find(task => task.id == req.params.id);
    if(originalTask) {
        const originalTaskIdx = data.indexOf(originalTask);
        let taskCopy = {...originalTask}; // Cria uma copia da task original
        reqItems.forEach(item => {
            let [ key, value ] = item; 
            if(key !== 'id'){
                taskCopy[key] = value;
            }
        });
        const r = validateTask(taskCopy);
        if(r.success){
            data[originalTaskIdx] = taskCopy;
            return res.status(200).json({message: 'Tarefa atualizada com sucesso'});
        }
        return res.status(400).json(r.message);
    }
    return res.status(204).json({message: 'Conteúdo não encontrado'});
});

export default router;