// Faith section content — bilingual. The Qur'an verse text itself always stays
// in Arabic (in both language modes) since it must never be rendered in
// English; only the surah/ayah citation is localized. Hadith and Adhkar carry
// a proper English rendering of the meaning alongside the Arabic original.
export const faithData = {
    ayah: [
        {
            ar: { text: "﴿ فَاذْكُرُونِي أَذْكُرْكُمْ وَاشْكُرُوا لِي وَلَا تَكْفُرُونِ ﴾", source: "سورة البقرة - آية 152" },
            en: { text: "﴿ فَاذْكُرُونِي أَذْكُرْكُمْ وَاشْكُرُوا لِي وَلَا تَكْفُرُونِ ﴾", source: "Surah Al-Baqarah — 2:152" }
        },
        {
            ar: { text: "﴿ وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا * وَيَرْزُقْهُ مِنْ حَيْثُ لَا يَحْتَسِبُ ﴾", source: "سورة الطلاق - آية 2-3" },
            en: { text: "﴿ وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا * وَيَرْزُقْهُ مِنْ حَيْثُ لَا يَحْتَسِبُ ﴾", source: "Surah At-Talaq — 65:2-3" }
        },
        {
            ar: { text: "﴿ إِنَّ مَعَ الْعُسْرِ يُسْرًا ﴾", source: "سورة الشرح - آية 6" },
            en: { text: "﴿ إِنَّ مَعَ الْعُسْرِ يُسْرًا ﴾", source: "Surah Ash-Sharh — 94:6" }
        },
        {
            ar: { text: "﴿ وَبَشِّرِ الصَّابِرِينَ ﴾", source: "سورة البقرة - آية 155" },
            en: { text: "﴿ وَبَشِّرِ الصَّابِرِينَ ﴾", source: "Surah Al-Baqarah — 2:155" }
        },
        {
            ar: { text: "﴿ وَقُل رَّبِّ زِدْنِي عِلْمًا ﴾", source: "سورة طه - آية 114" },
            en: { text: "﴿ وَقُل رَّبِّ زِدْنِي عِلْمًا ﴾", source: "Surah Taha — 20:114" }
        }
    ],
    hadith: [
        {
            ar: { text: "«الْمُؤْمِنُ الْقَوِيُّ خَيْرٌ وَأَحَبُّ إِلَى اللَّهِ مِنَ الْمُؤْمِنِ الضَّعِيفِ، وَفِي كُلٍّ خَيْرٌ»", source: "رواه مسلم" },
            en: { text: "The strong believer is better and more beloved to Allah than the weak believer, though there is good in both.", source: "Narrated by Muslim" }
        },
        {
            ar: { text: "«مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ بِهِ طَرِيقًا إِلَى الْجَنَّةِ»", source: "رواه مسلم" },
            en: { text: "Whoever follows a path in pursuit of knowledge, Allah makes easy for him a path to Paradise.", source: "Narrated by Muslim" }
        },
        {
            ar: { text: "«إِنَّ اللَّهَ يُحِبُّ إِذَا عَمِلَ أَحَدُكُمْ عَمَلًا أَنْ يُتْقِنَهُ»", source: "رواه البيهقي" },
            en: { text: "Indeed, Allah loves that when one of you does a task, he does it with excellence.", source: "Narrated by Al-Bayhaqi" }
        },
        {
            ar: { text: "«خَيْرُ النَّاسِ أَنْفَعُهُمْ لِلنَّاسِ»", source: "حديث حسن" },
            en: { text: "The best of people are those most beneficial to others.", source: "Hasan hadith" }
        }
    ],
    zekr: [
        {
            ar: { text: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، سُبْحَانَ اللَّهِ الْعَظِيمِ", source: "ذكر - كلمتان خفيفتان على اللسان" },
            en: { text: "Glory be to Allah and praise Him; glory be to Allah, the Almighty.", source: "Dhikr — light on the tongue" }
        },
        {
            ar: { text: "حَسْبِيَ اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ", source: "ذكر الصباح والمساء" },
            en: { text: "Allah is sufficient for me; there is no god but Him. On Him I rely, and He is Lord of the Mighty Throne.", source: "Morning and evening dhikr" }
        },
        {
            ar: { text: "اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ", source: "دعاء مأثور" },
            en: { text: "O Allah, help me to remember You, thank You, and worship You in the best manner.", source: "Traditional supplication" }
        },
        {
            ar: { text: "رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي", source: "دعاء قرآني" },
            en: { text: "My Lord, expand for me my chest and ease for me my task.", source: "Qur'anic supplication" }
        }
    ]
};
