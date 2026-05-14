import { collection, addDoc, writeBatch } from 'firebase/firestore';
import { db } from './firebase';

const MOCK_WORKERS = [
  { name: 'Ahmed Benali', role: 'Ingenieur Civil', site: 'Route Hassi Messaoud', status: 'Active', salary: 120000, joinDate: '2019-03-15' },
  { name: 'Youssef Mansouri', role: 'Chef de Chantier', site: 'Pipeline Adrar', status: 'Active', salary: 150000, joinDate: '2018-06-20' },
  { name: 'Karim Saidi', role: 'Conducteur d\'Engins', site: 'Facility Petroliere Ouargla', status: 'Active', salary: 90000, joinDate: '2020-01-10' },
  { name: 'Tarek Ziani', role: 'Macon Qualifie', site: 'Developpement Urbain Touggourt', status: 'Active', salary: 65000, joinDate: '2021-08-05' },
  { name: 'Omar Khelil', role: 'Soudeur', site: 'Pipeline Adrar', status: 'Active', salary: 85000, joinDate: '2020-11-12' },
  { name: 'Samir Brahimi', role: 'Manoeuvre', site: 'Route El Oued', status: 'Active', salary: 45000, joinDate: '2022-02-18' },
  { name: 'Nadir Belkacem', role: 'Ingenieur Topographe', site: 'Route El Meniaa', status: 'On Leave', salary: 110000, joinDate: '2019-09-01' },
  { name: 'Walid Haddad', role: 'Mecanicien', site: 'Atelier Central Touggourt', status: 'Active', salary: 75000, joinDate: '2017-05-30' },
  { name: 'Lamine Djabou', role: 'Conducteur Grue', site: 'Facility Petroliere Ouargla', status: 'Active', salary: 115000, joinDate: '2016-12-04' },
  { name: 'Ali Bougherra', role: 'Electricien', site: 'Developpement Urbain Touggourt', status: 'Active', salary: 70000, joinDate: '2021-04-14' },
  { name: 'Hassan Yebda', role: 'Manoeuvre', site: 'Route Hassi Messaoud', status: 'Terminated', salary: 40000, joinDate: '2023-01-10' },
  { name: 'Riyad Mahrez', role: 'Ingenieur HSE', site: 'Facility Petroliere Ouargla', status: 'Active', salary: 140000, joinDate: '2018-10-22' },
  // Additional Workers
  { name: 'Ismail Bennacer', role: 'Technicien Superieur', site: 'Route Hassi Messaoud', status: 'Active', salary: 85000, joinDate: '2021-07-15' },
  { name: 'Aissa Mandi', role: 'Conducteur Niveleuse', site: 'Route El Meniaa', status: 'Active', salary: 95000, joinDate: '2019-11-20' },
  { name: 'Baghdad Bounedjah', role: 'Macon', site: 'Developpement Urbain Touggourt', status: 'Active', salary: 55000, joinDate: '2022-05-05' },
  { name: 'Youcef Belaili', role: 'Manoeuvre', site: 'Pipeline Adrar', status: 'On Leave', salary: 42000, joinDate: '2023-02-11' },
  { name: 'Islam Slimani', role: 'Chef d\'Equipe', site: 'Route El Oued', status: 'Active', salary: 105000, joinDate: '2015-08-30' },
  { name: 'Ramiz Zerrouki', role: 'Soudeur Homologue', site: 'Facility Petroliere Ouargla', status: 'Active', salary: 110000, joinDate: '2020-03-25' },
  { name: 'Sofiane Feghouli', role: 'Ingenieur Qualite', site: 'Pipeline Adrar', status: 'Active', salary: 135000, joinDate: '2017-09-14' },
  { name: 'Djamel Benlamri', role: 'Agent de Securite', site: 'Atelier Central Touggourt', status: 'Active', salary: 45000, joinDate: '2021-01-05' },
  { name: 'Ramy Bensebaini', role: 'Conducteur Bulldozer', site: 'Route Hassi Messaoud', status: 'Terminated', salary: 98000, joinDate: '2018-12-10' },
  { name: 'Houcine Benayada', role: 'Mecanicien Engins', site: 'Atelier Central Touggourt', status: 'Active', salary: 80000, joinDate: '2019-04-18' },
  { name: 'Adem Zorgane', role: 'Aide Macon', site: 'Developpement Urbain Touggourt', status: 'Active', salary: 38000, joinDate: '2023-07-20' },
  { name: 'Haris Belkebla', role: 'Topographe', site: 'Route El Meniaa', status: 'Active', salary: 88000, joinDate: '2020-08-08' },
  { name: 'Said Benrahma', role: 'Peintre', site: 'Developpement Urbain Touggourt', status: 'Active', salary: 50000, joinDate: '2022-10-12' },
  { name: 'Amine Gouiri', role: 'Conducteur Compacteur', site: 'Route El Oued', status: 'On Leave', salary: 75000, joinDate: '2021-05-30' },
  { name: 'Houssem Aouar', role: 'Electricien Industriel', site: 'Facility Petroliere Ouargla', status: 'Active', salary: 95000, joinDate: '2019-02-14' },
  { name: 'Nabil Bentaleb', role: 'Ingenieur Planification', site: 'Pipeline Adrar', status: 'Active', salary: 145000, joinDate: '2016-11-05' },
  { name: 'Yassine Brahimi', role: 'Chef Magasinier', site: 'Atelier Central Touggourt', status: 'Active', salary: 70000, joinDate: '2018-04-22' },
  { name: 'Fares Chaibi', role: 'Manoeuvre', site: 'Route Hassi Messaoud', status: 'Active', salary: 45000, joinDate: '2023-09-01' },
];

const MOCK_PROJECTS = [
  { name: 'Route Nationale Hassi Messaoud', client: 'Ministere des Travaux Publics', budget: 150000000, progress: 85, status: 'Active', startDate: '2023-01-15', deadline: '2024-12-30' },
  { name: 'Renovation Pipeline Adrar', client: 'Sonatrach', budget: 320000000, progress: 45, status: 'Active', startDate: '2023-06-01', deadline: '2025-06-01' },
  { name: 'Developpement Urbain Touggourt', client: 'Wilaya de Touggourt', budget: 85000000, progress: 95, status: 'Active', startDate: '2022-11-10', deadline: '2024-05-30' },
  { name: 'Facility Petroliere Ouargla', client: 'Schlumberger', budget: 450000000, progress: 30, status: 'Active', startDate: '2024-02-01', deadline: '2026-02-01' },
  { name: 'Route Secondaire El Oued', client: 'Direction TP', budget: 60000000, progress: 100, status: 'Completed', startDate: '2022-01-15', deadline: '2023-08-20' },
  { name: 'Pont El Meniaa', client: 'Ministere des Travaux Publics', budget: 120000000, progress: 15, status: 'On Hold', startDate: '2024-04-10', deadline: '2025-10-15' },
  { name: 'Base de Vie Hassi Berkine', client: 'Sonatrach', budget: 210000000, progress: 60, status: 'Active', startDate: '2023-09-01', deadline: '2025-03-30' },
  { name: 'Station Epuration Touggourt', client: 'ONA', budget: 180000000, progress: 10, status: 'Active', startDate: '2024-01-15', deadline: '2026-06-30' },
];

const MOCK_EQUIPMENT = [
  { name: 'Excavatrice CAT 320', type: 'Terrassement', site: 'Route Hassi Messaoud', status: 'Operational', health: 85 },
  { name: 'Bulldozer Komatsu D155', type: 'Terrassement', site: 'Pipeline Adrar', status: 'Maintenance', health: 40 },
  { name: 'Grue Mobile Liebherr LTM', type: 'Grue Lourde', site: 'Facility Petroliere Ouargla', status: 'Operational', health: 92 },
  { name: 'Niveleuse CAT 140K', type: 'Voirie', site: 'Route El Meniaa', status: 'Operational', health: 78 },
  { name: 'Compacteur Bomag BW213', type: 'Compactage', site: 'Developpement Urbain Touggourt', status: 'Operational', health: 88 },
  { name: 'Camion Benne Renault K440', type: 'Transport', site: 'Route Hassi Messaoud', status: 'Operational', health: 95 },
  { name: 'Camion Benne Mercedes Arocs', type: 'Transport', site: 'Route El Oued', status: 'Maintenance', health: 35 },
  { name: 'Chargeuse Volvo L150H', type: 'Terrassement', site: 'Pipeline Adrar', status: 'Standby', health: 100 },
  { name: 'Generateur Electrique 500kVA', type: 'Energie', site: 'Facility Petroliere Ouargla', status: 'Operational', health: 90 },
  { name: 'Pompe a Beton Putzmeister', type: 'Logistique', site: 'Developpement Urbain Touggourt', status: 'Operational', health: 82 },
  // Additional Equipment
  { name: 'Excavatrice Hyundai 220LC', type: 'Terrassement', site: 'Route El Meniaa', status: 'Operational', health: 75 },
  { name: 'Bulldozer CAT D8T', type: 'Terrassement', site: 'Route Hassi Messaoud', status: 'Operational', health: 88 },
  { name: 'Grue a Tour Potain', type: 'Grue Lourde', site: 'Developpement Urbain Touggourt', status: 'Operational', health: 95 },
  { name: 'Chargeuse CAT 950 GC', type: 'Terrassement', site: 'Atelier Central Touggourt', status: 'Maintenance', health: 45 },
  { name: 'Camion Plateau MAN TGS', type: 'Transport', site: 'Pipeline Adrar', status: 'Operational', health: 80 },
  { name: 'Camion Citerne Mercedes', type: 'Transport', site: 'Facility Petroliere Ouargla', status: 'Operational', health: 70 },
  { name: 'Compresseur Atlas Copco', type: 'Energie', site: 'Route El Oued', status: 'Operational', health: 90 },
  { name: 'Niveleuse Komatsu GD655', type: 'Voirie', site: 'Route Hassi Messaoud', status: 'Standby', health: 98 },
  { name: 'Tractopelle JCB 3CX', type: 'Terrassement', site: 'Developpement Urbain Touggourt', status: 'Operational', health: 85 },
  { name: 'Chariot Elevateur Manitou', type: 'Logistique', site: 'Atelier Central Touggourt', status: 'Operational', health: 92 },
  { name: 'Poste a Souder Lincoln', type: 'Energie', site: 'Pipeline Adrar', status: 'Operational', health: 88 },
  { name: 'Compacteur Mixte Dynapac', type: 'Compactage', site: 'Route El Meniaa', status: 'Maintenance', health: 50 },
  { name: 'Finisseur Vögele Super 1800', type: 'Voirie', site: 'Route Hassi Messaoud', status: 'Operational', health: 82 },
  { name: 'Camion Malaxeur Iveco', type: 'Transport', site: 'Developpement Urbain Touggourt', status: 'Standby', health: 100 },
  { name: 'Excavatrice Mini Bobcat E50', type: 'Terrassement', site: 'Route El Oued', status: 'Operational', health: 89 }
];

export const seedDatabase = async () => {
  console.log("Seeding database with EXTREME data...");
  const batch = writeBatch(db);

  try {
    for (const worker of MOCK_WORKERS) {
      const docRef = collection(db, 'workers');
      addDoc(docRef, worker);
    }
    for (const project of MOCK_PROJECTS) {
      const docRef = collection(db, 'projects');
      addDoc(docRef, project);
    }
    for (const eq of MOCK_EQUIPMENT) {
      const docRef = collection(db, 'equipment');
      addDoc(docRef, eq);
    }
    console.log("Database seeded successfully!");
    alert("تم إضافة أكثر من 60 عنصر بنجاح! (عمال، آلات، مشاريع)");
  } catch (error) {
    console.error("Error seeding database: ", error);
    alert("حدث خطأ أثناء إضافة البيانات: " + error.message);
  }
};
