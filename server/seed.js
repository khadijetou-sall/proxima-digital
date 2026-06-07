require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Admin = require('./models/Admin');
const Project = require('./models/Project');
const NewsletterSubscriber = require('./models/NewsletterSubscriber');

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('MongoDB connecté pour le seed.');

  // Clear existing data
  await Promise.all([
    User.deleteMany({}),
    Admin.deleteMany({}),
    Project.deleteMany({}),
    NewsletterSubscriber.deleteMany({}),
  ]);

  // Create demo client
  const client = await User.create({
    name: 'Client Demo',
    email: 'demo@proxima.digital',
    password: '123456',
  });
  console.log('Client créé : demo@proxima.digital / 123456');

  // Create demo admin
  const admin = await Admin.create({
    name: 'Admin Proxima',
    email: 'digitalproxima317@gmail.com',
    password: 'khadija34@/com',
    role: 'superadmin',
  });
  console.log('Admin créé : digitalproxima317@gmail.com / khadija34@/com');

  // Create demo projects
  const projects = [
    {
      clientId: client._id,
      name: 'Branding Proxima',
      type: 'pack',
      pack: 'Premium',
      description: "Création complète de l'identité visuelle : logo, charte graphique, cartes de visite et templates.",
      status: 'in-progress',
      progress: 65,
      startDate: '01/05/2026',
      deadline: '15/06/2026',
      steps: [
        { label: 'Brief & Analyse', done: true },
        { label: 'Design', done: true },
        { label: 'Développement', done: false },
        { label: 'Finalisation', done: false },
      ],
      deliverables: [
        { name: 'Logo - Format PNG', type: 'image', size: '2.4 Mo', date: '15/05/2026' },
        { name: 'Logo - Format SVG', type: 'image', size: '1.1 Mo', date: '15/05/2026' },
        { name: 'Charte graphique PDF', type: 'file', size: '4.7 Mo', date: '15/05/2026' },
      ],
    },
    {
      clientId: client._id,
      name: 'Site vitrine e-commerce',
      type: 'custom',
      customDescription: 'Site e-commerce sur mesure',
      description: "Développement d'une boutique en ligne avec catalogue produits, panier et paiement intégré.",
      status: 'completed',
      progress: 100,
      startDate: '10/03/2026',
      deadline: '20/04/2026',
      steps: [
        { label: 'Brief & Analyse', done: true },
        { label: 'Design', done: true },
        { label: 'Développement', done: true },
        { label: 'Finalisation', done: true },
      ],
      deliverables: [
        { name: 'Maquette site - Accueil', type: 'image', size: '3.2 Mo', date: '10/04/2026' },
        { name: 'Maquette site - Produits', type: 'image', size: '2.8 Mo', date: '10/04/2026' },
        { name: 'Lien de démonstration', type: 'link', url: '#', date: '20/04/2026' },
        { name: 'Fichiers source (ZIP)', type: 'file', size: '12.5 Mo', date: '20/04/2026' },
      ],
    },
    {
      clientId: client._id,
      name: 'Stratégie réseaux sociaux',
      type: 'pack',
      pack: 'Starter',
      description: 'Mise en place et gestion des réseaux sociaux avec calendrier éditorial et création de contenu.',
      status: 'pending',
      progress: 10,
      startDate: '25/05/2026',
      deadline: '25/06/2026',
      steps: [
        { label: 'Brief & Analyse', done: true },
        { label: 'Design', done: false },
        { label: 'Développement', done: false },
        { label: 'Finalisation', done: false },
      ],
      deliverables: [],
    },
  ];

  await Project.insertMany(projects);
  console.log('3 projets démo créés.');

  // Create sample newsletter subscriber
  await NewsletterSubscriber.create({ email: 'contact@proxima.digital' });
  console.log('1 abonné newsletter créé.');

  console.log('\n✅ Base de données initialisée !');
  console.log('   Client : demo@proxima.digital / 123456');
  console.log('   Admin  : digitalproxima317@gmail.com / khadija34@/com');

  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
