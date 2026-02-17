const express = require('express');

const router = express.Router();

router.post('/create-order', async (req, res) => {
  return res.status(501).json({
    success: false,
    error: 'Razorpay integration scaffolded but not configured yet. Add keys and implementation in backend/routes/payments.js.'
  });
});

module.exports = router;
