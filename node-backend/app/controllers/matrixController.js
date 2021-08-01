const Matrix = require('../models/Matrix');

module.exports = {
    
    addMatrix: async(req,res,next) => {
        const {calcul,resultat} = req.body;
       
        const matrix = await Matrix.create({
            calcul,
            resultat
        });

        res.status(200).json({
            
            data: matrix
        });
    },
    getAllMatrix: async(req,res,next) => {
        const matrix = await Matrix.find();
        console.log(matrix);

        res.status(200).json({
           data: matrix
        });
    }
}