import { useState, useEffect } from 'react';

const COMPANY_CONTEXT = `You are the official AI assistant for SARL STE FI S MAKDOUD ENTREPRENEUR, a leading Algerian BTP (public works & construction) company.

CRITICAL RULES FOR YOUR RESPONSES:
1. NO CUTOFFS: Always finish your sentences and complete your thoughts. Be concise if necessary to ensure you don't get cut off.
2. LANGUAGE: Always reply in the exact same language the user writes in (Arabic → Arabic, French → French, English → English).
3. STRUCTURE: Use clear, organized formatting. Use bullet points for lists, bold text for emphasis, and short paragraphs for readability.
4. PROFESSIONALISM: Be helpful, highly professional, and welcoming.

SALARY & PRICING GUIDELINES:
When asked about salaries, give dynamic, realistic estimates based on the user's described experience and the typical Algerian BTP sector in the South (Touggourt, Hassi Messaoud, etc.). Use these ranges (in Algerian Dinar - DZD):
- Simple Workers (Manoeuvres): 35,000 DZD - 50,000 DZD
- Skilled Workers (Maçons, Soudeurs, etc.): 50,000 DZD - 80,000 DZD
- Heavy Machine Drivers (Grue, Pelle, Niveleuse, etc.): 60,000 DZD - 120,000 DZD (Higher end is for desert/oil fields like Sonatrach projects with extensive experience).
- Engineers & Technicians: 70,000 DZD - 150,000 DZD (Varies greatly by experience and site difficulty).
- Management / Senior Engineers: 100,000 DZD - 250,000+ DZD.
*Note: Always explain that these are estimates. Actual salaries depend on the specific contract, mission location (base de vie vs. city), and the candidate's exact experience.*

COMPANY KNOWLEDGE BASE:
- Full Name: SARL STE FI S MAKDOUD ENTREPRENEUR
- Director / المدير العام: Saïd Makdoud (سعيد مقدود)
- Founded: 1996 | Experience: 30+ years
- Headquarters: Cité Ayad, Teyissebsa, Touggourt, Algérie
- Contact Info: Phone: +213 795 101 097 | Fax: 32 10 55 56 | Email: Fils-Makdoud@gmail.com
- Sector: BTP - Travaux Publics & Construction (civil engineering, roads, oil & gas infrastructure)
- Scale: 150+ major projects completed | 450+ employees | 85+ heavy machines & vehicles
- Operating Regions: Touggourt, Ouargla, Hassi Messaoud, Adrar, El Oued, El Meniaa
- Major Clients: Sonatrach, Schlumberger, national construction companies
- Core Services: 
  * Road construction & paving
  * Civil engineering & building construction
  * Oil & Gas facilities preparation & maintenance
  * Urban development
  * Pipelines & water networks
- Work Process: 1. Initial Contact & Needs Assessment → 2. Technical Study & Financial Offer → 3. Contract Signing → 4. Execution with Daily Monitoring → 5. Quality Delivery

If the user asks a general knowledge question outside of the company scope, you may answer it normally as a helpful AI, but keep it brief.`;

const STORAGE_KEY = 'gemini_api_key';

function getKey() {
  const envKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (envKey && envKey.length > 20 && envKey !== 'YOUR_KEY') return envKey;
  return localStorage.getItem(STORAGE_KEY) || '';
}

export function useAI() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apiKey, setApiKeyState] = useState(getKey);
  const [hasKey, setHasKey] = useState(() => getKey().length > 20);

  const saveKey = (key) => {
    localStorage.setItem(STORAGE_KEY, key);
    setApiKeyState(key);
    setHasKey(key.length > 20);
  };

  const clearKey = () => {
    localStorage.removeItem(STORAGE_KEY);
    setApiKeyState('');
    setHasKey(false);
  };

  const askQuestion = async (question, history = []) => {
    setLoading(true);
    setError(null);
    const key = localStorage.getItem(STORAGE_KEY) ||
      (import.meta.env.VITE_GEMINI_API_KEY !== 'YOUR_KEY' ? import.meta.env.VITE_GEMINI_API_KEY : '') || '';

    if (!key || key.length < 20) {
      setLoading(false);
      return '__NO_KEY__';
    }

    try {
      const contents = [
        ...history.map(m => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.text }]
        })),
        { role: 'user', parts: [{ text: question }] }
      ];

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: COMPANY_CONTEXT }] },
            contents,
            generationConfig: { maxOutputTokens: 1500, temperature: 0.7 },
          }),
        }
      );

      // 403 = key invalid/revoked, 401 = unauthorized → clear key
      // 400 = bad request (could be content policy, not key issue)
      if (res.status === 403 || res.status === 401) {
        clearKey();
        setLoading(false);
        return '__INVALID_KEY__';
      }
      if (res.status === 400) {
        const errData = await res.json().catch(() => ({}));
        const reason = errData?.error?.message || '';
        // Only clear key if explicitly about API key
        if (reason.toLowerCase().includes('api key')) {
          clearKey();
          return '__INVALID_KEY__';
        }
        // Otherwise treat as a temporary error and fallback
        setLoading(false);
        return ruleEngine(question);
      }

      if (!res.ok) {
        if (res.status === 429) {
          console.warn('Gemini Quota Exceeded (Free tier not available). Falling back to local AI.');
          return ruleEngine(question);
        }
        throw new Error(`Error ${res.status}`);
      }
      const data = await res.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || ruleEngine(question);
    } catch (err) {
      console.error('AI Error:', err);
      // Fallback to local rule engine instead of showing error
      return ruleEngine(question);
    } finally {
      setLoading(false);
    }
  };

  return { askQuestion, loading, error, hasKey, apiKey, saveKey, clearKey };
}

// ─── Local Rule Engine Fallback ───────────────────────────────────────────────
const isAr  = (t) => /[\u0600-\u06FF]/.test(t);
const isFr  = (t) => /(^| )(le|la|les|je|vous|nous|est|que|comment|pourquoi|quand|bonjour|merci)\b/.test(t);
const lang  = (t) => isAr(t) ? 'ar' : isFr(t) ? 'fr' : 'en';
const pick  = (t, ar, fr, en) => ({ ar, fr, en }[lang(t)]);

function ruleEngine(input) {
  const t = input.toLowerCase();

  if (/^(hi|hello|hey|good\s|bonjour|salut|bonsoir|salam|مرحب|اهلا|السلام|صباح|مساء)/.test(t)) {
    return pick(t,
      `مرحباً! 👋 أنا المساعد الذكي لشركة SARL STE FI S MAKDOUD.\nيمكنني مساعدتك في: خدماتنا، مشاريعنا، طريقة العمل، أو التواصل. ما الذي تودّ معرفته؟`,
      `Bonjour! 👋 Je suis l'assistant de SARL STE FI S MAKDOUD.\nJe peux vous renseigner sur: nos services, projets, processus ou contact. Que souhaitez-vous savoir?`,
      `Hello! 👋 I'm the AI assistant for SARL STE FI S MAKDOUD.\nI can help you with: our services, projects, work process, or contact. What would you like to know?`
    );
  }

  if (/(طريق|كيف.*عمل|كيف.*تعمل|آلية|مراحل|خطوات|process|fonctionn|comment.*travail|étape|procédure|how.*work)/.test(t)) {
    return pick(t,
      `⚙️ **طريقة عملنا:**\n1️⃣ **التواصل** — تشرح متطلبات مشروعك\n2️⃣ **الدراسة** — نعدّ عرضاً تقنياً ومالياً\n3️⃣ **التعاقد** — توقيع العقد\n4️⃣ **التنفيذ** — العمل الميداني مع متابعة\n5️⃣ **التسليم** — التسليم النهائي`,
      `⚙️ **Processus:**\n1️⃣ **Contact** — Vous présentez vos besoins\n2️⃣ **Étude** — Nous préparons une offre\n3️⃣ **Contrat** — Signature\n4️⃣ **Exécution** — Travaux sur site\n5️⃣ **Livraison** — Remise finale`,
      `⚙️ **Process:**\n1️⃣ **Contact** — Present your needs\n2️⃣ **Study** — We prepare an offer\n3️⃣ **Contract** — Signing\n4️⃣ **Execution** — On-site work\n5️⃣ **Delivery** — Final handover`
    );
  }

  if (/(ولاي|منطق|أين.*تعمل|أين.*تتواجد|region|wilaya|zone|couvert|où.*opér|where.*operat)/.test(t)) {
    return pick(t,
      `🗺️ نعمل في 6 ولايات بالجنوب الجزائري:\n📍 تقرت | ورقلة | حاسي مسعود | أدرار | الوادي | المنيعة`,
      `🗺️ Nous opérons dans 6 wilayas du sud algérien:\n📍 Touggourt | Ouargla | Hassi Messaoud | Adrar | El Oued | El Meniaa`,
      `🗺️ We operate in 6 southern Algerian regions:\n📍 Touggourt | Ouargla | Hassi Messaoud | Adrar | El Oued | El Meniaa`
    );
  }

  if (/(خدم|نشاط|تخصص|ماذا.*تقدم|service|activit|qu.*offrez|what.*offer)/.test(t)) {
    return pick(t,
      `🏗️ خدماتنا:\n• إنشاء الطرق\n• الهندسة المدنية\n• خدمات البترول والغاز\n• التطوير الحضري\n• الأنابيب`,
      `🏗️ Nos services:\n• Construction de routes\n• Génie civil\n• Services pétrole & gaz\n• Développement urbain\n• Pipelines`,
      `🏗️ Our services:\n• Road construction\n• Civil engineering\n• Oil & Gas services\n• Urban development\n• Pipelines`
    );
  }

  return pick(t,
    `شكراً لسؤالك. للحصول على تفاصيل دقيقة، يرجى التواصل معنا مباشرة:\n📞 +213 795 101 097\n📧 Fils-Makdoud@gmail.com`,
    `Merci pour votre question. Pour des détails précis, veuillez nous contacter:\n📞 +213 795 101 097\n📧 Fils-Makdoud@gmail.com`,
    `Thanks for asking. For exact details, please contact us:\n📞 +213 795 101 097\n📧 Fils-Makdoud@gmail.com`
  );
}
