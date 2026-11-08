function errorsHendler(err, req, res, next) {
    res.status(500).json({
        error: err.message,
    });  

}
  
export default errorsHendler