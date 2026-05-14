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

  // Greetings
  if (/^(hi|hello|hey|good\s|bonjour|salut|bonsoir|salam|مرحب|اهلا|السلام|صباح|مساء)/.test(t)) {
    return pick(t,
      `مرحباً! 👋 أنا المساعد الذكي لشركة SARL STE FI S MAKDOUD.\nأنا هنا لتقديم معلومات دقيقة حول الشركة. هل تود معرفة تفاصيل حول خدماتنا، مشاريعنا المنجزة (150+ مشروع)، أو الرواتب والتوظيف؟`,
      `Bonjour! 👋 Je suis l'assistant intelligent de SARL STE FI S MAKDOUD.\nJe suis là pour fournir des informations précises sur l'entreprise. Souhaitez-vous des détails sur nos services, nos projets réalisés (150+ projets), ou sur les salaires et le recrutement?`,
      `Hello! 👋 I'm the smart assistant for SARL STE FI S MAKDOUD.\nI can provide detailed information about the company. Would you like to know about our services, completed projects (150+), or salaries and recruitment?`
    );
  }

  // Projects count
  if (/(projet|project|كم مشروع|مشاريع|réalis)/.test(t)) {
    return pick(t,
      `🏗️ **مشاريعنا:**\nلقد أنجزنا بنجاح **أكثر من 150 مشروعاً كبيراً** خلال أكثر من 30 عاماً من الخبرة. نحن نتعامل مع كبار العملاء مثل **Sonatrach** و **Schlumberger** بالإضافة إلى شركات البناء الوطنية في قطاعات البنية التحتية، الطرق، والنفط والغاز.`,
      `🏗️ **Nos Projets:**\nNous avons réalisé avec succès **plus de 150 grands projets** au cours de nos 30+ années d'expérience. Nous travaillons avec des clients majeurs comme **Sonatrach** et **Schlumberger**, ainsi que des entreprises nationales dans l'infrastructure, les routes et le secteur pétrolier.`,
      `🏗️ **Our Projects:**\nWe have successfully completed **over 150 major projects** over 30+ years. We work with major clients like **Sonatrach** and **Schlumberger**, as well as national construction companies in infrastructure, roads, and the oil & gas sector.`
    );
  }

  // Employees count / size
  if (/(عامل|عمال|موظف|employ|worker|staff|كم عمالكم|effectif)/.test(t)) {
    return pick(t,
      `👥 **فريق العمل:**\nتضم شركتنا حالياً **أكثر من 450 موظفاً وعاملاً** من ذوي الكفاءة، وندير أسطولاً يضم **أكثر من 85 آلة وشاحنة ثقيلة** لتنفيذ مشاريعنا بكفاءة عالية في جنوب الجزائر.`,
      `👥 **Notre Équipe:**\nNotre entreprise compte actuellement **plus de 450 employés et ouvriers** qualifiés. Nous gérons également un parc de **plus de 85 engins et camions lourds** pour exécuter nos projets efficacement dans le sud de l'Algérie.`,
      `👥 **Our Team:**\nOur company currently employs **over 450 skilled workers and staff**. We also manage a fleet of **over 85 heavy machines and trucks** to efficiently execute our projects in southern Algeria.`
    );
  }

  // Salaries / Pay
  if (/(راتب|رواتب|أجر|اجر|خلص|salary|salari|paye|rémunération|wage)/.test(t)) {
    return pick(t,
      `💰 **نطاق الرواتب التقريبي (دينار جزائري - DZD):**\nالرواتب تعتمد على الخبرة وموقع العمل (مثل قواعد الحياة في الصحراء):\n• **العمال البسطاء:** 35,000 - 50,000 د.ج\n• **العمال المؤهلون (بناء، لحام):** 50,000 - 80,000 د.ج\n• **سائقو الآليات الثقيلة:** 60,000 - 120,000 د.ج (ترتفع في حقول النفط)\n• **المهندسون والتقنيون:** 70,000 - 150,000 د.ج\n• **الإدارة والمهندسون الكبار:** 100,000 - 250,000+ د.ج`,
      `💰 **Fourchette de Salaires Estimée (DZD):**\nLes salaires dépendent de l'expérience et du lieu (ex: bases de vie au sud):\n• **Manoeuvres:** 35,000 - 50,000 DZD\n• **Ouvriers Qualifiés (Maçons, Soudeurs):** 50,000 - 80,000 DZD\n• **Conducteurs d'Engins:** 60,000 - 120,000 DZD (plus élevé sur champs pétroliers)\n• **Ingénieurs & Techniciens:** 70,000 - 150,000 DZD\n• **Management & Ingénieurs Seniors:** 100,000 - 250,000+ DZD`,
      `💰 **Estimated Salary Ranges (DZD):**\nSalaries depend on experience and location (e.g., desert bases):\n• **Simple Workers:** 35,000 - 50,000 DZD\n• **Skilled Workers:** 50,000 - 80,000 DZD\n• **Heavy Machine Drivers:** 60,000 - 120,000 DZD (higher in oil fields)\n• **Engineers & Technicians:** 70,000 - 150,000 DZD\n• **Management:** 100,000 - 250,000+ DZD`
    );
  }

  // Work Process
  if (/(طريق|كيف.*عمل|كيف.*تعمل|آلية|مراحل|خطوات|process|fonctionn|comment.*travail|étape|procédure|how.*work|اشرح لي عملكم)/.test(t)) {
    return pick(t,
      `⚙️ **طريقة عملنا المنهجية:**\n1️⃣ **التواصل وتقييم الاحتياجات:** نستمع إليك ونحلل متطلبات مشروعك بدقة.\n2️⃣ **الدراسة التقنية والمالية:** يقوم خبراؤنا بإعداد عرض متكامل.\n3️⃣ **التعاقد:** توقيع العقود بوضوح وشفافية.\n4️⃣ **التنفيذ:** عمل ميداني مع متابعة يومية لضمان الجودة ومعايير السلامة.\n5️⃣ **التسليم:** تسليم المشروع النهائي وفق المواعيد المحددة.`,
      `⚙️ **Notre Processus Méthodique:**\n1️⃣ **Contact & Évaluation:** Nous analysons vos besoins avec précision.\n2️⃣ **Étude Technique & Financière:** Nos experts préparent une offre complète.\n3️⃣ **Contrat:** Signature avec clarté et transparence.\n4️⃣ **Exécution:** Travail sur site avec suivi quotidien (Qualité/HSE).\n5️⃣ **Livraison:** Remise du projet final dans les délais impartis.`,
      `⚙️ **Our Methodical Process:**\n1️⃣ **Contact & Assessment:** We analyze your project needs accurately.\n2️⃣ **Technical & Financial Study:** Our experts prepare a comprehensive offer.\n3️⃣ **Contract:** Signing with clarity and transparency.\n4️⃣ **Execution:** On-site work with daily monitoring for quality and safety.\n5️⃣ **Delivery:** Handover of the final project on schedule.`
    );
  }

  // Locations / Regions
  if (/(ولاي|منطق|أين.*تعمل|أين.*تتواجد|region|wilaya|zone|couvert|où.*opér|where.*operat)/.test(t)) {
    return pick(t,
      `🗺️ **مناطق عملياتنا:**\nنحن نتمركز بشكل أساسي في **Cité Ayad, Teyissebsa, تقرت**، وننفذ عمليات واسعة النطاق في 6 ولايات رئيسية في الجنوب الجزائري:\n📍 تقرت | ورقلة | حاسي مسعود | أدرار | الوادي | المنيعة`,
      `🗺️ **Nos Zones d'Opération:**\nNotre siège est à **Cité Ayad, Teyissebsa, Touggourt**, et nous menons des opérations à grande échelle dans 6 wilayas majeures du sud algérien:\n📍 Touggourt | Ouargla | Hassi Messaoud | Adrar | El Oued | El Meniaa`,
      `🗺️ **Our Operating Areas:**\nWe are headquartered in **Cité Ayad, Teyissebsa, Touggourt**, and conduct large-scale operations across 6 major southern Algerian regions:\n📍 Touggourt | Ouargla | Hassi Messaoud | Adrar | El Oued | El Meniaa`
    );
  }

  // Services
  if (/(خدم|نشاط|تخصص|ماذا.*تقدم|service|activit|qu.*offrez|what.*offer)/.test(t)) {
    return pick(t,
      `🏗️ **خدماتنا الأساسية:**\nنحن شركة رائدة بخبرة تزيد عن 30 عاماً في مجالات البناء والأشغال العمومية:\n• إنشاء وتمهيد الطرق\n• الهندسة المدنية وتشييد المباني\n• تجهيز وصيانة منشآت النفط والغاز\n• التطوير والتهيئة الحضرية\n• شبكات المياه والأنابيب`,
      `🏗️ **Nos Services Principaux:**\nNous sommes une entreprise leader avec plus de 30 ans d'expérience dans le BTP:\n• Construction et revêtement de routes\n• Génie civil et construction de bâtiments\n• Préparation et maintenance des installations Pétrole & Gaz\n• Développement et aménagement urbain\n• Réseaux d'eau et pipelines`,
      `🏗️ **Our Core Services:**\nWe are a leading company with over 30 years of experience in construction and public works:\n• Road construction & paving\n• Civil engineering & building construction\n• Oil & Gas facilities preparation & maintenance\n• Urban development & landscaping\n• Water networks & pipelines`
    );
  }

  // Recruitment / Jobs
  if (/(توظيف|عمل|شغل|وظيفة|recrutement|emploi|job|hiring|cv|travail)/.test(t)) {
    return pick(t,
      `💼 **التوظيف والفرص:**\nنحن نبحث دائماً عن الكفاءات! نقوم بتوظيف:\n• مهندسين مدنيين ومعماريين\n• تقنيين متخصصين\n• سائقي آليات ثقيلة محترفين\n• عمال بناء ولحام\nللتسجيل في قاعدة بياناتنا أو تقديم طلب، يرجى إرسال سيرتك الذاتية (CV) إلى: Fils-Makdoud@gmail.com أو زيارة مقرنا في تقرت.`,
      `💼 **Recrutement & Opportunités:**\nNous sommes toujours à la recherche de talents! Nous recrutons:\n• Ingénieurs civils et architectes\n• Techniciens spécialisés\n• Conducteurs d'engins qualifiés\n• Maçons et soudeurs\nPour postuler, envoyez votre CV à: Fils-Makdoud@gmail.com ou visitez notre siège à Touggourt.`,
      `💼 **Recruitment & Opportunities:**\nWe are always looking for talent! We hire:\n• Civil engineers and architects\n• Specialized technicians\n• Professional heavy machinery drivers\n• Builders and welders\nTo apply, please send your CV to: Fils-Makdoud@gmail.com or visit our headquarters in Touggourt.`
    );
  }

  // Equipment / Machinery
  if (/(معدات|آلات|شاحنات|أسطول|équipement|engin|matériel|fleet|machines|véhicules)/.test(t)) {
    return pick(t,
      `🚜 **أسطول الآليات والمعدات:**\nنمتلك أسطولاً ضخماً وحديثاً يضم **أكثر من 85 آلة وشاحنة ثقيلة**، يشمل ذلك:\n• جرافات وحفارات (Caterpillar, Komatsu)\n• رافعات (Grues) بمختلف الحمولات\n• شاحنات نقل (Camions à benne)\n• آلات تسوية الطرق (Niveleuses و Compacteurs)\nتتم صيانة الأسطول دورياً لضمان عدم توقف العمل في المشاريع الكبرى.`,
      `🚜 **Parc d'Engins et Matériel:**\nNous possédons un parc moderne de **plus de 85 engins et camions**, incluant:\n• Pelles et bulldozers (Caterpillar, Komatsu)\n• Grues de différents tonnages\n• Camions à benne\n• Niveleuses et compacteurs\nNotre flotte est rigoureusement entretenue pour assurer la continuité des grands projets.`,
      `🚜 **Fleet and Machinery:**\nWe own a massive, modern fleet of **over 85 heavy machines and trucks**, including:\n• Bulldozers and excavators (Caterpillar, Komatsu)\n• Cranes of various capacities\n• Dump trucks\n• Motor graders and compactors\nOur fleet is regularly maintained to ensure zero downtime on major projects.`
    );
  }

  // Safety / HSE
  if (/(أمن|سلامة|صحة|وقاية|hse|sécurité|santé|safety|health)/.test(t)) {
    return pick(t,
      `🦺 **الصحة، السلامة، والبيئة (HSE):**\nسلامة عمالنا هي أولويتنا القصوى (Target Zero Incidents). نحن نلتزم بـ:\n• توفير معدات الوقاية الشخصية (EPI) لجميع العمال.\n• التدريب الدوري على السلامة في مواقع العمل.\n• الامتثال الصارم لمعايير السلامة الخاصة بقطاع النفط (خاصة في مشاريع Sonatrach).\n• تأمين شامل لجميع موظفينا.`,
      `🦺 **Santé, Sécurité et Environnement (HSE):**\nLa sécurité est notre priorité (Objectif Zéro Incident). Nous nous engageons à:\n• Fournir les Équipements de Protection Individuelle (EPI) à tous.\n• Assurer des formations continues sur la sécurité sur site.\n• Respecter strictement les normes HSE de l'industrie pétrolière (notamment pour Sonatrach).\n• Une couverture assurance complète pour nos employés.`,
      `🦺 **Health, Safety, and Environment (HSE):**\nSafety is our ultimate priority (Target Zero Incidents). We commit to:\n• Providing Personal Protective Equipment (PPE) to everyone.\n• Regular on-site safety training.\n• Strict compliance with oil industry safety standards (especially for Sonatrach projects).\n• Comprehensive insurance for all employees.`
    );
  }

  // Quality / Certifications
  if (/(جودة|معايير|شهادة|qualité|certif|quality|standard)/.test(t)) {
    return pick(t,
      `🎖️ **الجودة والمعايير:**\nنحرص في SARL Makdoud على تسليم مشاريع تتطابق مع أعلى المعايير الدولية والوطنية (Normes Algériennes et Internationales). نستخدم مواد بناء معتمدة وتخضع جميع مراحل البناء للفحص والتدقيق من قبل مكاتب دراسات مستقلة لضمان المتانة والصلابة.`,
      `🎖️ **Qualité et Normes:**\nChez SARL Makdoud, nous veillons à livrer des projets conformes aux normes nationales et internationales les plus strictes. Nous utilisons des matériaux certifiés et chaque étape de construction est contrôlée par des bureaux d'études indépendants pour garantir la durabilité.`,
      `🎖️ **Quality and Standards:**\nAt SARL Makdoud, we ensure all projects meet the highest national and international standards. We use certified materials, and every construction phase is inspected by independent engineering firms to guarantee durability and structural integrity.`
    );
  }

  // Partnerships / Suppliers
  if (/(شراكة|مورد|ممّون|partenariat|fournisseur|partner|supplier)/.test(t)) {
    return pick(t,
      `🤝 **الشراكات والموردين:**\nنحن منفتحون دائماً على بناء علاقات B2B قوية! إذا كنت مموناً لمواد البناء (إسمنت، حديد، زفت) أو تقدم خدمات لوجستية وتود العمل كشريك معنا، يرجى إرسال عرضك التجاري (Offre Commerciale) إلى البريد: Fils-Makdoud@gmail.com لتتم دراسته من قبل قسم المشتريات.`,
      `🤝 **Partenariats et Fournisseurs:**\nNous sommes ouverts aux relations B2B solides! Si vous êtes fournisseur de matériaux de construction (ciment, fer, bitume) ou offrez des services logistiques et souhaitez collaborer, envoyez votre offre commerciale à: Fils-Makdoud@gmail.com pour évaluation par notre service des achats.`,
      `🤝 **Partnerships and Suppliers:**\nWe are always open to building strong B2B relationships! If you are a supplier of construction materials (cement, steel, bitumen) or provide logistics services, please send your commercial offer to: Fils-Makdoud@gmail.com for review by our procurement department.`
    );
  }

  // Director / History
  if (/(مدير|مؤسس|تاريخ|directeur|fondateur|histoire|director|founder|history)/.test(t)) {
    return pick(t,
      `🏢 **تاريخ الشركة والإدارة:**\nتأسست شركة **SARL STE FI S MAKDOUD ENTREPRENEUR** في عام 1996، ولديها خبرة متراكمة تزيد عن 30 عاماً في بناء جنوب الجزائر.\nالشركة يديرها المدير العام السيد **سعيد مقدود (Saïd Makdoud)**، الذي قاد الشركة لتصبح واحدة من أبرز الأسماء في قطاع الأشغال العمومية والبناء بالمنطقة.`,
      `🏢 **Histoire et Direction:**\n**SARL STE FI S MAKDOUD ENTREPRENEUR** a été fondée en 1996, cumulant plus de 30 ans d'expertise dans le développement du sud algérien.\nL'entreprise est dirigée par le Directeur Général **M. Saïd Makdoud**, qui a hissé l'entreprise parmi les leaders du BTP dans la région.`,
      `🏢 **History and Management:**\n**SARL STE FI S MAKDOUD ENTREPRENEUR** was founded in 1996, bringing over 30 years of accumulated expertise to the development of southern Algeria.\nThe company is led by General Director **Mr. Saïd Makdoud**, who has guided the firm to become a leading name in the regional BTP sector.`
    );
  }

  // Contact Info
  if (/(اتصال|تواصل|رقم|هاتف|ايميل|contact|téléphone|téléphon|numéro|email|mail)/.test(t)) {
    return pick(t,
      `📞 **معلومات التواصل:**\nالمدير العام: سعيد مقدود\n• الهاتف: +213 795 101 097\n• الفاكس: 32 10 55 56\n• البريد الإلكتروني: Fils-Makdoud@gmail.com\n• المقر: Cité Ayad, Teyissebsa, تقرت، الجزائر`,
      `📞 **Informations de Contact:**\nDirecteur Général: Saïd Makdoud\n• Tél: +213 795 101 097\n• Fax: 32 10 55 56\n• Email: Fils-Makdoud@gmail.com\n• Siège: Cité Ayad, Teyissebsa, Touggourt, Algérie`,
      `📞 **Contact Information:**\nGeneral Director: Saïd Makdoud\n• Phone: +213 795 101 097\n• Fax: 32 10 55 56\n• Email: Fils-Makdoud@gmail.com\n• HQ: Cité Ayad, Teyissebsa, Touggourt, Algeria`
    );
  }

  // Default Fallback
  return pick(t,
    `شكراً لتواصلك. أنا المساعد الذكي، لست متأكداً من الإجابة الدقيقة على سؤالك. يرجى التواصل مع إدارتنا مباشرة للحصول على تفاصيل أكثر:\n📞 +213 795 101 097\n📧 Fils-Makdoud@gmail.com`,
    `Merci pour votre message. En tant qu'assistant IA, je n'ai pas la réponse précise à cette question. Veuillez contacter notre administration pour plus de détails:\n📞 +213 795 101 097\n📧 Fils-Makdoud@gmail.com`,
    `Thank you for reaching out. As an AI assistant, I don't have the exact answer to this. Please contact our management for more details:\n📞 +213 795 101 097\n📧 Fils-Makdoud@gmail.com`
  );
}
