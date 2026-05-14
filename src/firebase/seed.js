import { collection, doc, setDoc, writeBatch } from 'firebase/firestore';
import { db } from './firebase';

const MOCK_EMPLOYEES = [
  { name: 'علي بن سالم', role: 'مهندس مدني', phone: '0555123456', joinDate: '2015-03-10', salary: 120000, status: 'نشط' },
  { name: 'فاطمة الزهراء بوليفة', role: 'محاسبة', phone: '0555234567', joinDate: '2018-07-22', salary: 85000, status: 'نشط' },
  { name: 'خالد دراجي', role: 'سائق آلة ثقيلة', phone: '0555345678', joinDate: '2012-11-01', salary: 95000, status: 'نشط' },
  { name: 'سعيد معمري', role: 'كهربائي مواقع', phone: '0555456789', joinDate: '2020-02-15', salary: 65000, status: 'نشط' },
  { name: 'نور الدين حاجي', role: 'سباك', phone: '0555567890', joinDate: '2019-09-30', salary: 60000, status: 'في إجازة' },
  { name: 'أمينة خليفي', role: 'مسيرة مشاريع', phone: '0555678901', joinDate: '2016-05-18', salary: 140000, status: 'نشط' },
  { name: 'رابح عباسي', role: 'عامل بناء', phone: '0555789012', joinDate: '2021-01-10', salary: 45000, status: 'نشط' },
  { name: 'صليحة حمرون', role: 'أمينة مستودع', phone: '0555890123', joinDate: '2017-12-05', salary: 55000, status: 'نشط' },
  { name: 'كمال ناصري', role: 'مشغل خلاطة إسمنت', phone: '0555901234', joinDate: '2020-08-20', salary: 70000, status: 'نشط' },
  { name: 'جميلة ساحلي', role: 'مساعدة إدارية', phone: '0556012345', joinDate: '2019-04-12', salary: 50000, status: 'نشط' },
  { name: 'عبد الرحمان بن عودة', role: 'ميكانيكي آلات', phone: '0556123456', joinDate: '2014-06-25', salary: 90000, status: 'نشط' },
  { name: 'مليكة عوني', role: 'مسؤولة جودة', phone: '0556234567', joinDate: '2018-10-07', salary: 80000, status: 'في إجازة' },
  { name: 'ياسين مقران', role: 'جيولوجي مواقع', phone: '0556345678', joinDate: '2022-02-28', salary: 75000, status: 'نشط' },
  { name: 'حسيبة طيبي', role: 'مشرفة صحة وسلامة', phone: '0556456789', joinDate: '2015-09-14', salary: 88000, status: 'نشط' },
  { name: 'الطاهر بوجمعة', role: 'سائق شاحنة', phone: '0556567890', joinDate: '2016-11-20', salary: 70000, status: 'غير نشط' },
  { name: 'نادية شنتوف', role: 'محاسبة تكاليف', phone: '0556678901', joinDate: '2020-06-03', salary: 95000, status: 'نشط' },
  { name: 'يوسف بديدة', role: 'رئيس عمال', phone: '0556789012', joinDate: '2013-07-19', salary: 100000, status: 'نشط' },
  { name: 'حنان دحماني', role: 'كاتبة مشتريات', phone: '0556890123', joinDate: '2019-01-22', salary: 52000, status: 'نشط' },
  { name: 'مراد شيباني', role: 'مشغل حفارة', phone: '0556901234', joinDate: '2017-04-16', salary: 80000, status: 'نشط' },
  { name: 'نبيلة بوهالي', role: 'منسقة موارد بشرية', phone: '0557012345', joinDate: '2021-09-09', salary: 72000, status: 'نشط' }
];

const MOCK_PROJECTS = [
  { title: 'ازدواجية الطريق الوطني رقم 1 (تقرت - حاسي مسعود)', client: 'وزارة النقل', startDate: '2023-02-01', deadline: '2025-06-30', budget: 3200000000, status: 'قيد التنفيذ' },
  { title: 'إنجاز سد تيلاتو (ولاية تقرت)', client: 'وزارة الموارد المائية', startDate: '2024-01-15', deadline: '2027-12-31', budget: 8500000000, status: 'قيد التنفيذ' },
  { title: 'ترميم قصر الحاج أحمد باي (عنابة)', client: 'وزارة الثقافة', startDate: '2023-09-01', deadline: '2024-08-31', budget: 450000000, status: 'قيد التنفيذ' },
  { title: 'بناء مجمع سكني 600 مسكن (ورقلة)', client: 'مؤسسة الترقية العقارية (AADL)', startDate: '2022-10-10', deadline: '2024-12-20', budget: 5000000000, status: 'قيد التنفيذ' },
  { title: 'تهيئة المنطقة الصناعية بحاسي مسعود', client: 'سوناطراك', startDate: '2024-03-01', deadline: '2025-09-15', budget: 2800000000, status: 'بدأ حديثاً' },
  { title: 'توسعة مطار تقرت', client: 'وزارة النقل', startDate: '2025-01-10', deadline: '2026-11-30', budget: 1900000000, status: 'في مرحلة الدراسات' },
  { title: 'رصف طرق بلدية تقرت', client: 'بلدية تقرت', startDate: '2024-05-20', deadline: '2024-10-15', budget: 180000000, status: 'قيد التنفيذ' },
  { title: 'إنجاز قنوات الصرف الصحي (حاسي مسعود)', client: 'شركة المياه والتطهير (SEACO)', startDate: '2023-11-01', deadline: '2025-02-28', budget: 620000000, status: 'قيد التنفيذ' },
  { title: 'تزويد المناطق النائية بالكهرباء (تقرت)', client: 'شركة سونلغاز', startDate: '2024-02-14', deadline: '2025-01-31', budget: 350000000, status: 'قيد التنفيذ' },
  { title: 'صيانة شبكة الطرقات الجهوية', client: 'مديرية التجهيزات العمومية', startDate: '2024-06-01', deadline: '2024-12-15', budget: 120000000, status: 'قيد التنفيذ' }
];

const MOCK_MACHINES = [
  { name: 'حفارة كاتربيلر', model: '320D', serialNumber: 'CAT-2381-K', purchaseDate: '2021-05-10', status: 'تشغيلية', location: 'موقع الطريق الوطني 1' },
  { name: 'جرافة كوماتسو', model: 'D65EX-16', serialNumber: 'KOM-9942-L', purchaseDate: '2020-09-22', status: 'تشغيلية', location: 'موقع سد تيلاتو' },
  { name: 'شاحنة مرسيدس أكتروس', model: '3344', serialNumber: 'MER-4512-A', purchaseDate: '2019-11-03', status: 'تشغيلية', location: 'مستودع تقرت' },
  { name: 'رافعة شوكية', model: 'Hyster H50FT', serialNumber: 'HYS-7823-B', purchaseDate: '2022-02-14', status: 'تحت الصيانة', location: 'ورشة صيانة حاسي مسعود' },
  { name: 'ضاغطة تربة', model: 'Bomag BW213', serialNumber: 'BOM-1147-C', purchaseDate: '2021-08-30', status: 'تشغيلية', location: 'موقع الطريق الوطني 1' },
  { name: 'خلاطة إسمنت ثابتة', model: 'Schwing Stetter M1', serialNumber: 'SCH-6612-D', purchaseDate: '2018-12-01', status: 'تشغيلية', location: 'مصنع الخرسانة - تقرت' },
  { name: 'حفارة هيتاشي', model: 'ZX200-6', serialNumber: 'HIT-8853-E', purchaseDate: '2023-01-15', status: 'تشغيلية', location: 'موقع المجمع السكني 600 مسكن' },
  { name: 'لودر كاتربيلر', model: '966M', serialNumber: 'CAT-3721-F', purchaseDate: '2020-06-18', status: 'تشغيلية', location: 'موقع الطريق الوطني 1' },
  { name: 'شاحنة قلاب إيفيكو', model: 'Trakker 720', serialNumber: 'IVE-2294-G', purchaseDate: '2017-10-10', status: 'متوقفة للإيجار', location: 'مستودع تقرت' },
  { name: 'مدحلة أسفلت', model: 'Hamm HD+ 90', serialNumber: 'HAM-5410-H', purchaseDate: '2022-03-27', status: 'تشغيلية', location: 'موقع تهيئة المنطقة الصناعية' },
  { name: 'جرار زراعي (للمساعدة)', model: 'New Holland T7.210', serialNumber: 'NEW-3681-I', purchaseDate: '2016-07-05', status: 'تحت الصيانة', location: 'ورشة الميكانيك' },
  { name: 'مولد كهربائي متنقل', model: 'Caterpillar XQP300', serialNumber: 'GEN-2569-J', purchaseDate: '2021-12-12', status: 'تشغيلية', location: 'موقع سد تيلاتو' },
  { name: 'شاحنة صهريج مياه', model: 'Mercedes-Benz 1823', serialNumber: 'TAN-9410-K', purchaseDate: '2019-04-25', status: 'تشغيلية', location: 'موقع الطريق الوطني 1' },
  { name: 'كسارة حجر متنقلة', model: 'Metso LT106', serialNumber: 'MET-6732-L', purchaseDate: '2020-08-19', status: 'تشغيلية', location: 'موقع مجمع السكني' },
  { name: 'رافعة برجية', model: 'Potain MD 560', serialNumber: 'POT-1174-M', purchaseDate: '2022-09-04', status: 'تشغيلية', location: 'موقع سكني 600 مسكن' }
];

const MOCK_MATERIALS = [
  { name: 'إسمنت بورتلاندي', unit: 'طن', currentQuantity: 850, minQuantity: 120, supplier: 'مجمع الإسمنت الجزائر (GICA)', lastDelivery: '2025-04-10' },
  { name: 'حديد تسليح (فئة 500)', unit: 'طن', currentQuantity: 270, minQuantity: 40, supplier: 'شركة حديد الجزائر (IMETAL)', lastDelivery: '2025-04-05' },
  { name: 'الرمل النظيف', unit: 'متر مكعب', currentQuantity: 1600, minQuantity: 200, supplier: 'مقاولة الرمال البيضاء - تقرت', lastDelivery: '2025-04-12' },
  { name: 'وقود الديزل', unit: 'لتر', currentQuantity: 6200, minQuantity: 800, supplier: 'سوناطراك', lastDelivery: '2025-04-08' },
  { name: 'زيت المحركات 15W40', unit: 'لتر', currentQuantity: 380, minQuantity: 60, supplier: 'موبيليس', lastDelivery: '2025-03-25' },
  { name: 'قوالب صب الخرسانة', unit: 'قطعة', currentQuantity: 1200, minQuantity: 300, supplier: 'الشركة الوطنية للصناعة المعدنية', lastDelivery: '2025-04-01' },
  { name: 'مسامير وبراغي (متنوعة)', unit: 'كيلوغرام', currentQuantity: 520, minQuantity: 80, supplier: 'مؤسسة مستودعات البناء - حاسي مسعود', lastDelivery: '2025-03-28' },
  { name: 'أنابيب PVC للصرف', unit: 'متر طولي', currentQuantity: 3400, minQuantity: 500, supplier: 'مصنع الأنابيب الجزائري (ANAB)', lastDelivery: '2025-04-03' }
];

export const seedDatabase = async (adminEmail) => {
  console.log("Seeding database with realistic Arabic data...");
  const batch = writeBatch(db);

  try {
    // 1. Add admin to 'admins' collection
    if (adminEmail) {
      const adminRef = doc(db, 'admins', adminEmail);
      batch.set(adminRef, { email: adminRef.id, createdAt: new Date().toISOString() });
    }

    // 2. Add Employees
    MOCK_EMPLOYEES.forEach(emp => {
      const docRef = doc(collection(db, 'employees'));
      batch.set(docRef, emp);
    });

    // 3. Add Projects
    MOCK_PROJECTS.forEach(proj => {
      const docRef = doc(collection(db, 'projects'));
      batch.set(docRef, proj);
    });

    // 4. Add Machines
    MOCK_MACHINES.forEach(machine => {
      const docRef = doc(collection(db, 'machines'));
      batch.set(docRef, machine);
    });

    // 5. Add Materials
    MOCK_MATERIALS.forEach(material => {
      const docRef = doc(collection(db, 'materials'));
      batch.set(docRef, material);
    });

    await batch.commit();
    console.log("Database seeded successfully!");
    alert("تم إضافة أكثر من 50 عنصر بنجاح! (عمال، آلات، مشاريع، مواد)");
  } catch (error) {
    console.error("Error seeding database: ", error);
    alert("حدث خطأ أثناء إضافة البيانات: " + error.message);
  }
};
