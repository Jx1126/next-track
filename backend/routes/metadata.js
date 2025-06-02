const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  console.log('Metadata endpoint accessed');
  res.json({message: 'Metadata endpoint is working'});
});

module.exports = router;