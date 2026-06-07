require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/Admin');

async function updateAdmin() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('MongoDB connecté.');

  const existing = await Admin.findOne({ email: 'admin@proxima.digital' });
  if (existing) {
    existing.email = 'digitalproxima317@gmail.com';
    existing.password = 'khadija34@/com';
    await existing.save();
    console.log('Admin mis à jour :');
  } else {
    await Admin.create({
      name: 'Admin Proxima',
      email: 'digitalproxima317@gmail.com',
      password: 'khadija34@/com',
      role: 'superadmin',
    });
    console.log('Admin créé :');
  }
  console.log('   Email : digitalproxima317@gmail.com');
  console.log('   Mot de passe : khadija34@/com');

  await mongoose.disconnect();
}

updateAdmin().catch((err) => {
  console.error(err);
  process.exit(1);
});
