function codeExtract(code) {
    let code_array = code.split('\n')
    let number_params = []
    let str_params = []
    let action_params = []
    let unknown_type_params = []
    for (let item of code_array) {
        if (item.indexOf('add_argument') !== -1) {
            let code_item = item.trim()
            code_item = code_item.replaceAll("'", "");
            code_item = code_item.replaceAll('"', "");
            let paramName = code_item.match(/(?<=--)([^,)]+)(?=,)/);
            let paramType = code_item.match(/(?<=type=)([^,)]+)(?=[),])/);
            let paramDefaultValue = code_item.match(/(?<=default=)([^,)]+)(?=[),])/);
            let paramAction = code_item.match(/(?<=action=)([^,)]+)(?=[),])/);
            let param = {
                name: paramName ? paramName[0] : '',
                type: paramType ? paramType[0] : '',
                default_value: paramDefaultValue ? paramDefaultValue[0] : '',
                action: paramAction ? paramAction[0] : '',
                value: paramDefaultValue ? paramDefaultValue[0] : '',
            }
            if (param.type === 'int' || param.type === 'float') {
                number_params.push(param)
            } else if (param.type === 'str') {
                str_params.push(param)
            } else if (param.action === 'store_true') {
                action_params.push(param)
            } else if (param.type === '') {
                unknown_type_params.push(param)
            }
        }
    }
    return {number_params, str_params, action_params, unknown_type_params}
}

export {codeExtract}