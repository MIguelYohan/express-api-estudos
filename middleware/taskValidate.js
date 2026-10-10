export default function validateTask(taskBody){
    const { title, time_limit } = taskBody;

    if(!title || !time_limit){
        return {
            success: false,
            message: 'Formato inválido.'
        };
    }

    if(typeof title !== 'string') {
        return {
            success: false, 
            message: 'campo title deve ser do tipo string'
        };
    }

    const dateTimeLimit = new Date(time_limit);
    if(isNaN(dateTimeLimit.getTime())){
        return {
            success: false,
            message: 'campo time_limit deve ser no formato YYYY-MM-DD'
        };
    }

    /* 
    {
        id: ...,
        title: ...,
        time_limit: ...
    }
    */
    for (const key of Object.keys(taskBody)) {
        if (!['id', 'title', 'time_limit'].includes(key)) {
            return {
                success: false,
                message: `${key} é um campo inválido`
            };
        }
    }
    return {success: true};
}

