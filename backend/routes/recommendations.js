const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  console.log('Recommendations endpoint accessed');
  res.json({message: 'Recommendations endpoint is working'});
});

module.exports = router;