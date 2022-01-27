const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

const validateParams =(arr , type )=>{
    if (type === 'string') return arr.every(item =>(typeof item === 'string' || item instanceof String) && (item.trim().length > 0))
    if (type === 'uuid' ) return arr.every( item => regexExp.test(item))
}

const errorHandler = (message , statusCode)=> {
    const error = new Error(message)
    error.code = statusCode
    throw error;
}


module.exports = {validateParams , errorHandler}