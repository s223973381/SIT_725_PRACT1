const Slot = require('../models/slotModel');

exports.homePage = (req, res) => {
  Slot.getSlots((err, results) => {
    if (err) throw err;
    res.render('index', { slots: results });
  });
};

exports.bookSlot = (req, res) => {
  const { name, email, slot_id } = req.body;
  Slot.bookSlot(name, email, slot_id, (err) => {
    if (err) throw err;
    res.render('confirm', { name, slot_id });
  });
};
