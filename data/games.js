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
    url: 'road-rush.html',
    comingSoon: false
  }
];

export default games;
