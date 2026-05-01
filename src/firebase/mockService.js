// Mock Firebase Service
// This file will be replaced with real Firebase logic once config is provided.

export const db = {
  getWorkers: async () => {
    // Simulated fetch
    return [
      { id: 1, name: 'أحمد محمود', role: 'مهندس موقع', experience: '8 سنوات', project: 'برج الجوهرة', status: 'في الموقع' },
      // ...
    ];
  },
  
  addWorker: async (worker) => {
    console.log('Adding worker:', worker);
    return { id: Math.random(), ...worker };
  },
  
  getProjects: async () => {
    return [
      { id: 1, name: 'برج الجوهرة السكني', status: 'جاري التنفيذ' },
    ];
  }
};

export const auth = {
  login: async (email, password) => {
    if (email === 'admin@binaatech.com' && password === 'admin123') {
      return { uid: 'admin-1', email: 'admin@binaatech.com' };
    }
    throw new Error('بيانات الدخول غير صحيحة');
  },
  
  logout: async () => {
    console.log('Logged out');
  }
};
