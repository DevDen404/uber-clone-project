const express = require('express')
const router = express.Router()
const tokenAuth = require('../middlewares/tokenAuth')
const mapController = require('../controllers/mapController')
const { query } = require('express-validator')


router.get('/getCoordinates',
    query('address').isString().isLength({ min: 3 }),
    tokenAuth.validateToken,
    mapController.getCoordinates)

router.get('/getDistanceTime',
    query('origin').isString().isLength({ min: 3 }),
    query('destination').isString().isLength({ min: 3 }),
    tokenAuth.validateToken,
    mapController.getDistanceTime
)

router.get('/getAddressSuggestions',
    query('input').isString().isLength({min:3}),
    tokenAuth.validateToken,
    mapController.getAddressSuggestions
)


module.exports = router;