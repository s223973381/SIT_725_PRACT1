const db = require('../config/db');

exports.getSlots = (callback) => {
  db.query('SELECT * FROM slots', callback);
};

exports.bookSlot = (name, email, slot_id, callback) => {
  db.query('INSERT INTO bookings (name, email, slot_id) VALUES (?, ?, ?)', [name, email, slot_id], (err, result) => {
    if (err) return callback(err);
    db.query('UPDATE slots SET is_booked = TRUE WHERE id = ?', [slot_id], callback);
  });
};
