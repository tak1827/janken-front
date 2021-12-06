export const getErrorMessage = (errors) =>{
    const [error] = errors
    return error == undefined ? 'Something wrong' : error.message
}

export const isSuccess = (errors) =>{
    return errors == undefined ? true : false
}

export const getData = (data, moduleName) =>{
    return data.data[moduleName]
}