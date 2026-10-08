export const tools = [
  {
    id: 'qr-generator',
    icon: 'fas fa-qrcode',
    title: { ar: 'مولّد QR', en: 'QR Generator' },
    description: {
      ar: 'أنشئ كود QR بألوان وأشكال مخصصة وحمّله كصورة PNG.',
      en: 'Create a custom-styled QR code and download it as a PNG.'
    },
    tags: ['QR', 'PNG', 'Canvas'],
    url: 'tools/qr-generator.html'
  },
  {
    id: 'color-generator',
    icon: 'fas fa-palette',
    title: { ar: 'استوديو الألوان', en: 'Color / CSS Generator' },
    description: {
      ar: 'ولّد لوحات ألوان وتدرجات واختبر التباين وانسخ الكود جاهزًا لـ CSS.',
      en: 'Generate palettes and gradients, check contrast, and copy ready-to-use CSS.'
    },
    tags: ['CSS', 'Palettes', 'Gradients'],
    url: 'tools/color-generator.html'
  },
  {
    id: 'Pomodoro',
    icon: 'fas fa-hourglass-half',
    title: { ar: 'بومودورو', en: 'Pomodoro' },
    description: {
      ar: 'مؤقت تركيز بجلسات واستراحات، مع قائمة مهام وإحصائيات وأصوات هادية.',
      en: 'A focus timer with sessions and breaks, a task list, stats and calm sounds.'
    },
    tags: ['Timer', 'Tasks', 'Focus'],
    url: 'tools/pomodoro.html'
  },
  {
    id: 'Arabic-Toolkit',
    icon: 'fas fa-language',
    title: { ar: 'Arabic Toolkit', en: 'Arabic Toolkit' },
    description: {
      ar: 'أدوات النص العربي : صفحة بسيطة فيها أربع أدوات. كتابة الأرقام والمبالغ بالعملات، وتنظيف النص من التشكيل والرموز، وتحويل التاريخ للهجري، وعمل رابط عربي للمواقع.',
      en: 'Arabic text tools: A simple page with four tools. It allows you to write numbers and amounts in various currencies, remove diacritics and symbols from text, convert dates to Hijri calendar, and create Arabic links to websites.'
    },
    tags: ['Arabic', 'Tools', 'Text', 'Converter', 'Language'],
    url: 'tools/Arabic-Toolkit.html'
  }
];

export default tools;
