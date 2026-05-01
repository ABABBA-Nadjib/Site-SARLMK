import { db, auth } from './firebase';
import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  doc, 
  query, 
  where,
  getCountFromServer // ميزة التجميع لحساب العدد
} from 'firebase/firestore';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

// خدمات قاعدة البيانات (Firestore)
export const dbService = {
  // جلب العمال
  getWorkers: async () => {
    const querySnapshot = await getDocs(collection(db, "workers"));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },
  
  // إضافة عامل جديد
  addWorker: async (workerData) => {
    const docRef = await addDoc(collection(db, "workers"), workerData);
    return { id: docRef.id, ...workerData };
  },
  
  // جلب المشاريع
  getProjects: async () => {
    const querySnapshot = await getDocs(collection(db, "projects"));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  // حساب إحصائيات لوحة التحكم (Aggregation)
  getDashboardStats: async () => {
    const workersColl = collection(db, "workers");
    const projectsColl = collection(db, "projects");
    
    // حساب عدد العمال والمنتجات بسرعة وبأقل تكلفة (Aggregation Query)
    const workersCount = await getCountFromServer(workersColl);
    const projectsCount = await getCountFromServer(projectsColl);

    return {
      totalWorkers: workersCount.data().count,
      activeProjects: projectsCount.data().count,
      // يمكنك إضافة المزيد من الحسابات هنا
    };
  }
};

// خدمات المصادقة (Auth)
export const authService = {
  login: async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      throw new Error('فشل تسجيل الدخول: ' + error.message);
    }
  },
  
  logout: async () => {
    await signOut(auth);
  }
};
