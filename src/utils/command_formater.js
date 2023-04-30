const intTypeRandomValue = String(Math.ceil(Math.random() * 10))
const floatTypeRandomValue = String((Math.random() * 10).toFixed(2))
const strTypeRandomValue = String(Math.random().toString(36).slice(-2))

function generateDemoCommand(main_entrance, params_array, params_order, is_run_in_back, is_show_param_name) {
    let date = new Date()
    let final_command = ''
    let command = `python ${main_entrance} `
    let log_name = ''
    // command
    for (let paramsArrayElement of params_array) {
        if (paramsArrayElement.action){
            command += `--${paramsArrayElement.name} `
        } else {
            command += `--${paramsArrayElement.name} ${getValueForDemoMode(paramsArrayElement.type, paramsArrayElement.action)} `
        }
    }
    // log_name
    for (let [index, paramsOrderElement] of params_order.entries()) {
        let paramType = params_array.find(item => item.name === paramsOrderElement.name).type
        let paramAction = params_array.find(item => item.name === paramsOrderElement.name).action

        if (is_show_param_name) {
            log_name += `${paramsOrderElement.name}@${getValueForDemoMode(paramType, paramAction)}`
        } else {
            log_name += `${getValueForDemoMode(paramType, paramAction)}`
        }
        if (index !== params_order.length - 1) log_name += '__'
    }
    if (is_run_in_back) {
        final_command = `nohup ${command} > ${date.getFullYear()}_${date.getMonth() + 1}_${date.getDate()}__${log_name}.out 2>&1 &`
    } else {
        final_command = command
    }
    return final_command
}

function generateExecCommand(main_entrance, params_array, params_order, is_run_in_back, is_show_param_name) {
    let date = new Date()
    let final_command = ''
    let command = `python ${main_entrance} `
    let log_name = ''
    // command
    for (let paramsArrayElement of params_array) {
        if (paramsArrayElement.action){
            command += `--${paramsArrayElement.name} `
        } else {
            command += `--${paramsArrayElement.name} ${getValueForExecMode(paramsArrayElement.action, paramsArrayElement.value)} `
        }
    }
    // log_name
    for (let [index, paramsOrderElement] of params_order.entries()) {
        let paramType = params_array.find(item => item.name === paramsOrderElement.name).type
        let paramAction = params_array.find(item => item.name === paramsOrderElement.name).action
        let paramValue = params_array.find(item => item.name === paramsOrderElement.name).value

        if (is_show_param_name) {
            log_name += `${paramsOrderElement.name}@${getValueForExecMode(paramAction,paramValue)}`
        } else {
            log_name += `${getValueForExecMode(paramAction,paramValue)}`
        }
        if (index !== params_order.length - 1) log_name += '__'
    }
    if (is_run_in_back) {
        final_command = `nohup ${command} > ${date.getFullYear()}_${date.getMonth() + 1}_${date.getDate()}__${log_name}.out 2>&1 &`
    } else {
        final_command = command
    }
    return final_command
}

function getValueForDemoMode(paramType, paramAction) {
    let value = ''
    if (paramType === 'int') {
        value = intTypeRandomValue
    } else if (paramType === 'float') {
        value = floatTypeRandomValue
    } else if (paramType === 'str') {
        value = strTypeRandomValue
    } else if (paramAction === 'store_true') {
        value = 'true'
    }
    return value
}

function getValueForExecMode(paramAction, paramValue) {
    if (paramAction === 'store_true') {
        console.log(paramValue)
        if (paramValue === true) {
            return ''
        } else {
            return null
        }
    } else {
        return paramValue ? paramValue : null
    }
}

export {generateExecCommand, generateDemoCommand}