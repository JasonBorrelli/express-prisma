function notFound(req, res, next){
    res.status(404).json({
        status: 404,
        error: 'EndPoint Not Found',
    })
};

export default notFound

