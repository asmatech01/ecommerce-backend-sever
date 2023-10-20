const express = require('express');
const router = express.Router();
const carouselController = require('../../controllers/CMS/carouselController') 


router.post('/',  carouselController.addCarousel); 
router.get('/',  carouselController.getCarousel);
router.put('/:id',  carouselController.updateCarousel);
router.delete('/:id', carouselController.deleteCarousel);

module.exports = router;