export const games = [
  {
    id: 'road-rush',
    icon: 'fas fa-car-side',
    title: { ar: '3D Road Rush', en: '3D Road Rush' },
    description: {
      ar: 'لعبة سباق سيارات ثلاثية الأبعاد على طريق لا ينتهي. غيّر المسار وتفادى السيارات وحاول تكسر أعلى مسافة.',
      en: 'A 3D endless highway racing game. Switch lanes, dodge traffic and try to beat your best distance.'
    },
    controls: {
      ar: 'التحكم: مفاتيح A / D أو الأسهم، و Space للفرامل، وأزرار الشاشة على الموبايل',
      en: 'Controls: A / D or arrow keys, Space to brake, on-screen buttons on mobile'
    },
    technologies: ['Three.js', 'JavaScript', 'WebGL'],
    url: 'games/road-rush.html',
    comingSoon: false
  },
  
  {
    id: 'racing-3d',
    icon: 'fas fa-car-side',
    title: { ar: 'سباق ثلاثي الأبعاد', en: 'Racing 3D' },
    description: {
        ar: 'لعبة سباق سيارات ثلاثية الأبعاد لا نهاية لها على الطريق السريع. قم بتغيير المسارات، وتفادي السيارات، واجمع النيترو والعملات الرقمية لكسر أعلى رقم قياسي لك.',
        en: 'A 3D endless highway racing game. Switch lanes, dodge traffic, collect nitro and coins, and try to beat your highest score.'
    },
    controls: {
        ar: 'التحكم: مفاتيح A / D أو الأسهم، زر المسافة (Space) للفرامل. تدعم أيضاً أزرار الشاشة وإيماءات السحب للهواتف المحمولة.',
        en: 'Controls: A / D or arrow keys, Space to brake, on-screen buttons for mobile, swipe gestures also supported on mobile'
    },
    technologies: ['Three.js', 'JavaScript', 'WebGL'],
    url: 'games/3D-Racing.html',
    comingSoon: false
  },

  {
    id: 'memory-game',
    icon: 'fas fa-brain',
    title: { ar: 'لعبة الذاكرة', en: 'Memory Game' },
    description: {
      ar: 'لعبة ذاكرة بثلاثة مستويات (سهل / متوسط / صعب) مع عدّاد للحركات والوقت وزر تلميح.',
      en: 'A memory game with three levels (easy / medium / hard), a moves and time counter, and a hint button.'
    },
    controls: {
      ar: 'التحكم: بالماوس أو باللمس',
      en: 'Controls: mouse or touch'
    },
    technologies: ['HTML', 'CSS', 'JavaScript'],
    url: 'games/memory-game.html',
    comingSoon: false
  }
];

export default games;
