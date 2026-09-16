# خالد هشام | Khalid Hisham — Personal Website

موقع شخصي ثابت (Static Website)، مبني بـ HTML/CSS/JavaScript فقط بدون أي مكتبات أو أطر عمل إضافية، ومُستضاف على GitHub Pages.

## البنية / Project Structure

```
/
├── index.html            # الهيكل والمحتوى فقط — لا CSS ولا JS ولا ترجمة بداخله
├── css/
│   ├── theme.css          # نظام الألوان (Design Tokens) + Dark/Light Mode
│   ├── style.css          # كل التصميم: Layout, Navbar, Hero, Sections, Cards...
│   └── responsive.css     # كل الـ @media queries (موبايل/تابلت)
├── js/
│   ├── theme.js            # تبديل الوضع الليلي/النهاري (التطبيق الأول قبل أول رسم في <head>)
│   ├── language.js         # تبديل اللغة (عربي/إنجليزي) و RTL/LTR
│   ├── projects.js         # يرسم قسمي Skills و Projects من بيانات data/
│   ├── gallery.js          # صور الرحلة الشخصية + الـ Lightbox
│   ├── navigation.js       # Navbar, Mobile Menu, Scroll Spy, Scroll Progress, Back-to-top
│   ├── audio.js            # المشغل الصوتي المخصص لتلاوات القرآن والأناشيد
│   └── interactions.js     # بطاقة الوقفة الإيمانية, نسخ الأرقام, Toast
├── data/
│   ├── projects.js         # بيانات المشاريع فقط (بدون منطق عرض)
│   ├── skills.js           # بيانات المهارات فقط (بدون منطق عرض)
│   └── content.js          # نصوص الوقفة الإيمانية (آيات/أحاديث/أذكار)
├── locales/
│   ├── ar.js               # كل نصوص الواجهة العربية (اللغة الافتراضية)
│   └── en.js               # كل نصوص الواجهة الإنجليزية
├── images/                 # الصور المستخدمة فعليًا في الموقع + الـ favicons
├── audio/                  # ملفات القرآن والأناشيد
├── 404.html                # صفحة 404 بنفس هوية الموقع
├── robots.txt
├── sitemap.xml
└── README.md
```

## ترتيب تجربة الزائر / Page flow

```
Home → About → Projects → Skills → My Journey (Gallery)
     → Personal Side (Hobbies, Quran Journey, Faith, Media) → Contact
```

Projects و Skills لهما قسمان مستقلان الآن (بدل قسم واحد مدمج) لأنهما محور الموقع
المهني. أقسام Hobbies / Quran Journey / Faith / Media مجمّعة بصريًا بهوية أهدأ
قليلًا (لون ذهبي بدل الأخضر في العناوين) حتى لا تنافس Projects على أنها القسم
الرئيسي، مع الاحتفاظ الكامل بالمحتوى والوظائف.

## إضافة مشروع جديد / Adding a new project

افتح `data/projects.js` وأضف عنصرًا جديدًا داخل مصفوفة `projects` (عربي وإنجليزي معًا):

```js
{
    icon: 'fas fa-diagram-project',
    title: { ar: 'اسم المشروع', en: 'Project Name' },
    description: { ar: 'وصف قصير...', en: 'Short description...' },
    technologies: ['HTML', 'CSS', 'JavaScript'],
    demo: 'https://...', github: 'https://...', comingSoon: false
}
```

الموقع يعيد رسم قسم "مشاريعي" تلقائيًا بكلتا اللغتين (منطق العرض في `js/projects.js`).

## إضافة مهارة جديدة / Adding a new skill

المهارات مقسّمة في `data/skills.js` داخل `skillGroups` (اللغات والويب / أدوات / أخرى). أضف عنصرًا جديدًا داخل المجموعة المناسبة، أو أضف مجموعة جديدة بنفس الشكل:

```js
{ icon: 'fab fa-python', name: { ar: 'Python', en: 'Python' } }
```

## إضافة صورة / Adding images

ضع الصورة داخل `images/` بنفس الاسم المستخدم في `index.html`:
- `images/khalid-avatar.jpg` — الصورة الشخصية في الـ Hero
- `images/young-khaled.jpg` — وأنا صغير
- `images/university-khaled.jpg` — في الجامعة
- `images/old-khaled.jpg` — وأنا كبير / الآن

إذا كانت الصورة غير موجودة، يعرض الموقع Placeholder هادئ بدل رابط مكسور — لا حاجة لأي تعديل إضافي.

## تعديل النصوص / Editing text

كل نصوص واجهة الموقع (عربي/إنجليزي) موجودة في `locales/ar.js` و `locales/en.js` فقط. عدّل القيمة المقابلة للمفتاح (key) الذي تريد تغييره، وسيظهر التعديل في الموقع مباشرة. نصوص الوقفة الإيمانية (آيات/أحاديث/أذكار) مصدرية وليست مترجمة، فهي في `data/content.js` بدلًا من ذلك.

## تجربة الموقع محليًا / Local preview

الموقع يستخدم JavaScript Modules (`type="module"`)، وهذه لا تعمل عند فتح `index.html` مباشرة من القرص (`file://`) بسبب قيود المتصفح على CORS. شغّل خادمًا محليًا بسيطًا داخل مجلد المشروع، مثل:

```
python3 -m http.server 8000
```

ثم افتح `http://localhost:8000`. على GitHub Pages هذا غير مطلوب — الموقع يعمل مباشرة.

## ملاحظات

- اللغة الافتراضية عند أول زيارة: **العربية** (RTL). اختيار المستخدم يُحفظ في `localStorage` ويُطبَّق فورًا بدون Flicker عند الزيارات التالية (وحتى لو تعطّل تحميل ملفات الترجمة لأي سبب، الموقع يظهر تلقائيًا بعد لحظة بدل أن يفضل صفحة فارغة).
- الوضع الافتراضي للثيم: **Dark**. يُحفظ اختيار المستخدم أيضًا في `localStorage`، ويُطبَّق على وسم `<html>` قبل أول رسم للصفحة (Inline Script داخل `<head>`) بنفس أسلوب اللغة، فلا يظهر أي Flash لثيم خاطئ عند إعادة الزيارة.
- الصور الشخصية (`khalid-avatar.jpg`, `young-khaled.jpg`, `university-khaled.jpg`, `old-khaled.jpg`) **تظهر افتراضيًا في الـ HTML/CSS بدون أي اعتماد على نجاح تحميل JavaScript** — الجافاسكريبت فقط يضيف تأثير التحميل الخفيف، ويُخفي الصورة ويعرض Placeholder فقط لو فشل تحميلها فعليًا (مثلاً لو اسم الملف مش مطابق تمامًا). لو صورة معينة مش ظاهرة، السبب شبه المؤكد هو أن اسم الملف في `images/` مش مطابق حرفيًا (بما فيها حالة الأحرف — GitHub Pages حساس لحالة الأحرف، على عكس ويندوز/ماك).
- Favicon مُولّد من الصورة الشخصية الحقيقية بأحجام متعددة (32px, 180px, 192px) لدعم كل الأجهزة.
- قسم "ذكريات ومناسبات" (Memories & Events) الذي كان موجودًا سابقًا تم حذفه بالكامل مع كل الصور والأكواد والترجمات المرتبطة به.
- لا يوجد قسم "Services" منفصل حاليًا — المحتوى الموجود فعليًا (مهارات + مشاريع لسه هتضاف) مش كافي لعرض خدمات احترافية بدون اختراع معلومات غير موجودة. لو حبيت تضيفه لاحقًا لما يبقى عندك مشاريع/خدمات فعلية، ابعتلي التفاصيل وهضيفه بنفس الأسلوب.
- متغيرات الألوان في `css/theme.css` تتبع نظام تصميم واحد (`--bg`, `--surface`, `--surface-secondary`, `--text`, `--text-muted`, `--primary`, `--border`, `--shadow`, `--radius`)، بالإضافة لتوكنز الهوية الذهبية (`--gold`) المستخدمة في محتوى القرآن والوقفة الإيمانية.
- الموقع يعمل بالكامل بدون أي Build step — فقط ارفع الملفات كما هي على GitHub Pages.
