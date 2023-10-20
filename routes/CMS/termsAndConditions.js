const express = require('express');
const router = express.Router();
const termsAndConditionsController = require('../../controllers/CMS/termsAndConditionsController');

// Get the terms and conditions
router.get('/', termsAndConditionsController.getTermsAndConditions);

// Create new terms and conditions
router.post('/', termsAndConditionsController.createTermsAndConditions);

// Update the terms and conditions
router.put('/', termsAndConditionsController.updateTermsAndConditions);

module.exports = router;
