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
    url: '../road-rush.html',
    comingSoon: false
  },
  
  {
    id: 'Racing 3D',
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
    url: '../3D-Racing.html',
    comingSoon: false
}

  
];

export default games;
