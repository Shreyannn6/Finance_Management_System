const errorHandler = (error,req,res,next)=>{
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statusCode)
    res.json({
        message:error?.message,
        stack:process.env.NODE_ENV === 'production' ? 'null' : error?.stack
    })
}

const pageNotFound = (req,res,next)=>{
    const error = new Error(`Page Not Found ${req?.originalUrl}`)
    res.status(404)
    next(error)
}

module.exports = { errorHandler,pageNotFound }