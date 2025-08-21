const express = require('express');
const { userVerified, Authentication } = require('../../middlewares/auth.middleware');
const { submitKycController } = require('../../controllers/kyc/kyc.controller');
const { kycUpload } = require('../../middlewares/fileUpload');
// const { kycUpload } = require('../../middlewares/cloudinaryUploads');


const kycRouter = express.Router();


// POST /kyc/documents - Submit KYC documents
kycRouter.post('/submit-documents',Authentication, kycUpload ,submitKycController );

module.exports = kycRouter;