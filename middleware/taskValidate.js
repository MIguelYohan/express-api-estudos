export default function validateTask(taskBody){
    if(!taskBody || typeof taskBody !== 'object'){
        return {
            success: false,
            message: 'Formato inválido.'
        };
    }

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

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if(typeof time_limit !== 'string' || !dateRegex.test(time_limit)){
        return {
            success: false,
            message: 'campo time_limit deve ser no formato YYYY-MM-DD'
        };
    }

    const [year, month, day] = time_limit.split('-').map(Number);
    const dateTimeLimit = new Date(`${time_limit}T00:00:00.000Z`);
    if(
        isNaN(dateTimeLimit.getTime()) ||
        dateTimeLimit.getUTCFullYear() !== year ||
        dateTimeLimit.getUTCMonth() + 1 !== month ||
        dateTimeLimit.getUTCDate() !== day
    ){
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

