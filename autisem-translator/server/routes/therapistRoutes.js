const express = require('express');
const { registerTherapist, getTherapistDetailes,getTherapistPatients,remove,create } = require('../controllers/therapistController') ;
const authenticateJWT = require('../middlewares/authentication');

const therapistRouter = express.Router();

//here i get the token
therapistRouter.post('/register', registerTherapist);
//here i use the token
therapistRouter.get('/get',authenticateJWT, getTherapistDetailes);

therapistRouter.get('/:therapistId/patients', getTherapistPatients);

therapistRouter.post('/create', create);

therapistRouter.delete('/',remove)


module.exports = therapistRouter;
