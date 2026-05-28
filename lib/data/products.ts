import type { Product } from "@/lib/types";

// O'lchamlar
const apparelSizes = [
  { id: "S", label: "S", inStock: true }, { id: "M", label: "M", inStock: true },
  { id: "L", label: "L", inStock: true }, { id: "XL", label: "XL", inStock: true },
  { id: "XXL", label: "XXL", inStock: false },
];
const womenSizes = [
  { id: "XS", label: "XS", inStock: true }, { id: "S", label: "S", inStock: true },
  { id: "M", label: "M", inStock: true }, { id: "L", label: "L", inStock: true },
  { id: "XL", label: "XL", inStock: false },
];
const oneSize = [{ id: "OS", label: "Yagona o'lcham", inStock: true }];


// ---- ERKAKLAR ----
const men: Product[] = [
  {
    id: "tayiba-thawb-noor", slug: "thawb-noor", collection: "men", category: "thawb",
    name: "Thawb Noor", arabicName: "نُور", price: 1850000, currency: "UZS",
    shortDescription: "Misr paxtasidan tikilgan har kunlik to'b — qo'lda tikilgan plaket bilan.",
    description: "Thawb Noor — atelyemizning sokin asosi. Uzun tolali Misr paxtasining bir to'pidan tikiladi va sekin vertikal qatorlarda tushadi. Yoqasi Toshkent atelyemizda qo'lda tikilib, ichki yorlig'ida sirli طَيْبَة yozuvi qoldiriladi.",
    story: "Noor — \"nur\" ma'nosini bildiradi. Mato to'rtinchi avlod to'quvchimiz bilan olti oyda ishlab chiqildi.",
    composition: ["100% Misr uzun-tolali paxtasi", "Qo'lda tikilgan ichki plaket", "Sadaf tugmalar"],
    care: ["Salqin suvda, ichki tomonga aylantirib yuving", "Soyada quriting", "Plaketni bug' bilan tozalang"],
    origin: "Toshkentda qo'lda tikilgan",
    colors: [
      { id: "noor-white", name: "Noor Oq", arabicName: "أبيض", hex: "#F6F3EC", swatch: "bg-gradient-to-br from-desert-50 via-desert-100 to-desert-200", stock: 12 },
      { id: "noor-sand", name: "Noor Qum", arabicName: "رمل", hex: "#E4DCCB", swatch: "bg-gradient-to-br from-desert-100 via-desert-200 to-desert-300", stock: 8 },
      { id: "noor-ink", name: "Noor Siyoh", arabicName: "حبر", hex: "#2A2319", swatch: "bg-gradient-to-br from-desert-800 via-desert-900 to-ink", stock: 5 },
    ],
    sizes: apparelSizes, defaultColorId: "noor-white", defaultSizeId: "M",
    swatch: "bg-gradient-to-br from-desert-100 via-desert-200 to-desert-300",
    // men.jpg — erkaklar kolleksiyasi uchun haqiqiy rasm
    gallery: [
      { kind: "image", url: "/products/men.jpg", swatch: "bg-gradient-to-br from-desert-50 via-desert-100 to-desert-200", alt: "Thawb Noor — erkaklar to'bi" },
      { kind: "image", swatch: "bg-gradient-to-br from-desert-100 via-desert-200 to-desert-300", alt: "Thawb Noor — plaket detali" },
      { kind: "image", swatch: "bg-gradient-to-br from-desert-200 via-desert-100 to-desert-50", alt: "Thawb Noor — orqa tomon" },
    ],
    isNew: true, isBestSeller: true,
  },
  {
    id: "tayiba-kaftan-rida", slug: "kaftan-rida", collection: "men", category: "kaftan",
    name: "Kaftan Rida", arabicName: "رِضا", price: 1650000, currency: "UZS",
    shortDescription: "Olijanob tuproq ranglarida bemalol kaftan — kechqurunlar, mehmonlar va uydagi sokinlik uchun.",
    description: "Rida \"qoniqish\" degan ma'noni anglatadi. Yelka qismi keng, bilakda ingichka, to'piqdan bir necha santimetr yuqorida tugaydi.",
    composition: ["70% jun, 30% zig'ir — atelye aralashmasi", "Yoqa paxta voile bilan ichki astarlangan"],
    care: ["Quruq tozalash", "Kiygandan keyin 24 soat shamollatib qo'ying"],
    origin: "Toshkentda qo'lda tikilgan",
    colors: [
      { id: "rida-earth", name: "Rida Tuproq", arabicName: "تراب", hex: "#825D2A", swatch: "bg-gradient-to-br from-earth-100 via-desert-100 to-earth-200", stock: 7 },
      { id: "rida-charcoal", name: "Rida Ko'mir", hex: "#2D2010", swatch: "bg-gradient-to-br from-earth-700 via-earth-800 to-ink", stock: 4 },
    ],
    sizes: apparelSizes, defaultColorId: "rida-earth", defaultSizeId: "L",
    swatch: "bg-gradient-to-br from-earth-100 via-desert-100 to-earth-50",
    gallery: [
      { kind: "image", url: "/products/men.jpg", swatch: "bg-gradient-to-br from-earth-50 via-desert-100 to-earth-100", alt: "Kaftan Rida" },
      { kind: "image", swatch: "bg-gradient-to-br from-earth-100 via-desert-200 to-earth-200", alt: "Kaftan Rida — yeng" },
    ],
    isLimited: true,
  },
  {
    id: "tayiba-thawb-sabr", slug: "thawb-sabr", collection: "men", category: "thawb",
    name: "Thawb Sabr", arabicName: "صَبر", price: 1450000, currency: "UZS",
    shortDescription: "Bizning sabrli har kunlik to'bimiz — yumshoqroq paxta, soddaroq plaket, kun bo'yi qulay.",
    description: "Sabr — sabrlilik. Bu — kun marosim so'ramaydigan paytda kiyadigan to'bingiz, lekin har joyda nafosat so'raydi.",
    composition: ["100% taranglangan paxta", "Kuchaytirilgan yelka tikuvi"],
    care: ["Salqin suvda yuvish", "Past haroratda quritish"],
    origin: "Toshkentda qo'lda tikilgan",
    colors: [
      { id: "sabr-bone", name: "Sabr Suyak", hex: "#FBFAF6", swatch: "bg-gradient-to-br from-desert-50 via-bone to-desert-100", stock: 18 },
      { id: "sabr-stone", name: "Sabr Tosh", hex: "#D6CAB1", swatch: "bg-gradient-to-br from-desert-200 via-desert-300 to-desert-200", stock: 14 },
    ],
    sizes: apparelSizes, defaultColorId: "sabr-bone", defaultSizeId: "M",
    swatch: "bg-gradient-to-br from-desert-50 via-desert-100 to-desert-200",
    gallery: [
      { kind: "image", url: "/products/men.jpg", swatch: "bg-gradient-to-br from-desert-50 via-desert-100 to-desert-200", alt: "Thawb Sabr" },
      { kind: "image", swatch: "bg-gradient-to-br from-desert-100 via-desert-50 to-desert-200", alt: "Thawb Sabr — mato" },
    ],
  },
  {
    id: "tayiba-shemagh-rawda", slug: "shemagh-rawda", collection: "men", category: "accessory",
    name: "Shemagh Rawda", arabicName: "روضة", price: 480000, currency: "UZS",
    shortDescription: "Marg'ilonda to'qilgan yumshoq shemagh — qo'lda eshilgan popuk bilan.",
    description: "Rawda — Madinaning yashil bog'i. Ushbu shemagh nozik paxtada to'qiladi va qo'lda asta eshilgan popuk bilan tugatiladi.",
    composition: ["100% Marg'ilon paxtasi", "Qo'lda eshilgan popuk"],
    care: ["Salqin suvda qo'lda yuvish", "Yotqizib quritish"],
    origin: "Marg'ilonda to'qilgan, Toshkentda tugatilgan",
    colors: [
      { id: "rawda-stone", name: "Rawda Tosh", hex: "#BD976C", swatch: "bg-gradient-to-br from-earth-50 via-desert-100 to-earth-100", stock: 22 },
      { id: "rawda-emerald", name: "Rawda Zumrad", hex: "#246342", swatch: "bg-gradient-to-br from-emerald-50 via-emerald-100 to-emerald-200", stock: 15 },
    ],
    sizes: oneSize, defaultColorId: "rawda-stone",
    swatch: "bg-gradient-to-br from-earth-50 via-desert-100 to-earth-100",
    gallery: [
      { kind: "image", swatch: "bg-gradient-to-br from-earth-50 via-desert-100 to-earth-100", alt: "Shemagh Rawda" },
    ],
  },
];


// ---- AYOLLAR ----
const women: Product[] = [
  {
    id: "tayiba-abaya-sukoon", slug: "abaya-sukoon", collection: "women", category: "abaya",
    name: "Abaya Sukoon", arabicName: "سُكون", price: 2450000, currency: "UZS",
    shortDescription: "Bizning belgilangan abayamiz — zumrad rangli viskoza, eng yengil paxta bilan ichki astarlangan.",
    description: "Sukoon — sokinlik. Kesim bemalol va arxitektura, baland to'g'ri yoqa va terini ikkinchi po'st kabi yopishtiruvchi yumshoq ichki astar bilan.",
    story: "Sukoon mato'sini o'n bir marta tanladik. Har gal bir xil savol — sokin harakat qiladimi?",
    composition: ["Tashqi: og'ir viskoza", "Astar: 100% paxta voile", "Qo'lda tikilgan poy og'irliklari"],
    care: ["Quruq tozalash tavsiya etiladi", "Kiyimlar oralig'ida bug'lab tozalang"],
    origin: "Toshkentda qo'lda tikilgan",
    colors: [
      { id: "sukoon-emerald", name: "Sukoon Zumrad", arabicName: "زُمُرُّد", hex: "#1B4D33", swatch: "bg-gradient-to-br from-emerald-100 via-emerald-50 to-emerald-200", stock: 9 },
      { id: "sukoon-bone", name: "Sukoon Suyak", hex: "#F6F3EC", swatch: "bg-gradient-to-br from-desert-50 via-bone to-desert-100", stock: 11 },
      { id: "sukoon-ink", name: "Sukoon Siyoh", hex: "#15110A", swatch: "bg-gradient-to-br from-ink via-desert-900 to-ink", stock: 4 },
    ],
    sizes: womenSizes, defaultColorId: "sukoon-emerald", defaultSizeId: "M",
    swatch: "bg-gradient-to-br from-emerald-50 via-desert-100 to-emerald-100",
    // women.jpg — ayollar kolleksiyasi uchun haqiqiy rasm
    gallery: [
      { kind: "image", url: "/products/women.jpg", swatch: "bg-gradient-to-br from-emerald-50 via-desert-100 to-emerald-100", alt: "Abaya Sukoon — sokin siluet" },
      { kind: "image", swatch: "bg-gradient-to-br from-emerald-100 via-emerald-50 to-emerald-200", alt: "Abaya Sukoon — yoqa" },
      { kind: "image", swatch: "bg-gradient-to-br from-emerald-200 via-emerald-100 to-emerald-50", alt: "Abaya Sukoon — orqa tomon" },
    ],
    isNew: true, isBestSeller: true,
  },
  {
    id: "tayiba-abaya-sakina", slug: "abaya-sakina", collection: "women", category: "abaya",
    name: "Abaya Sakina", arabicName: "سَكينة", price: 2750000, currency: "UZS",
    shortDescription: "Yumshoq sahro ranglaridagi atelye abayasi — sekin tushish, sokin shakl.",
    description: "Sakina — tushadigan tinchlik. Mato — to'qima jun-viskoza aralashmasi, badanda kengroq, bilakda ingichka kesilgan.",
    composition: ["65% viskoza, 35% Avstraliya juni", "Qo'lda bog'langan mos kamar bilan"],
    care: ["Faqat quruq tozalash", "Yumshoq ilgakka osing"],
    origin: "Toshkentda qo'lda tikilgan",
    colors: [
      { id: "sakina-sand", name: "Sakina Qum", hex: "#D6CAB1", swatch: "bg-gradient-to-br from-desert-100 via-desert-200 to-desert-300", stock: 6 },
      { id: "sakina-emerald", name: "Sakina Zumrad", hex: "#246342", swatch: "bg-gradient-to-br from-emerald-100 via-desert-100 to-emerald-200", stock: 5 },
    ],
    sizes: womenSizes, defaultColorId: "sakina-sand", defaultSizeId: "S",
    swatch: "bg-gradient-to-br from-desert-100 via-desert-200 to-emerald-50",
    gallery: [
      { kind: "image", url: "/products/women.jpg", swatch: "bg-gradient-to-br from-desert-100 via-desert-200 to-desert-300", alt: "Abaya Sakina" },
      { kind: "image", swatch: "bg-gradient-to-br from-desert-200 via-desert-100 to-desert-300", alt: "Abaya Sakina — tushish" },
    ],
    isLimited: true,
  },
  {
    id: "tayiba-khimar-noor", slug: "khimar-noor", collection: "women", category: "khimar",
    name: "Khimar Noor", arabicName: "نُور", price: 850000, currency: "UZS",
    shortDescription: "Tukdek yengil viskoza hijobi — qo'lda tugatilgan poy bilan.",
    description: "Noor — tongning nuri. Bu hijob shu qadar nozik viskozadan kesilganki, cho'ntakka buklanadi.",
    composition: ["100% viskoza, 90gsm", "Qo'lda ag'darilgan poy"],
    care: ["Salqin suvda qo'lda yuvish", "Past haroratda dazmollang"],
    origin: "Toshkentda qo'lda tikilgan",
    colors: [
      { id: "noor-bone", name: "Noor Suyak", hex: "#FBFAF6", swatch: "bg-gradient-to-br from-desert-50 via-bone to-desert-100", stock: 28 },
      { id: "noor-stone", name: "Noor Tosh", hex: "#E4DCCB", swatch: "bg-gradient-to-br from-desert-100 via-desert-200 to-desert-300", stock: 22 },
      { id: "noor-emerald", name: "Noor Zumrad", hex: "#549B71", swatch: "bg-gradient-to-br from-emerald-50 via-emerald-100 to-emerald-200", stock: 17 },
    ],
    sizes: oneSize, defaultColorId: "noor-bone",
    swatch: "bg-gradient-to-br from-desert-50 via-desert-100 to-desert-200",
    gallery: [
      { kind: "image", url: "/products/women.jpg", swatch: "bg-gradient-to-br from-desert-50 via-bone to-desert-100", alt: "Khimar Noor" },
    ],
  },
  {
    id: "tayiba-set-fitra", slug: "set-fitra", collection: "women", category: "set",
    name: "Set Fitra", arabicName: "فِطرة", price: 3450000, currency: "UZS",
    shortDescription: "Atelye uch parchali to'plami — abaya, hijob va ichki ko'ylak bir til bilan.",
    description: "Fitra — tabiiy holat. To'plam bir qutida yetkaziladi: konstruksion abaya, tukdek hijob va mos rangdagi ichki ko'ylak.",
    composition: ["Abaya: viskoza-jun aralashmasi", "Hijob: 90gsm viskoza", "Ichki ko'ylak: paxta voile"],
    care: ["Har bir parcha o'z parvarish yorlig'iga ega", "Abayani quruq tozalang"],
    origin: "Toshkentda qo'lda tikilgan",
    colors: [
      { id: "fitra-emerald", name: "Fitra Zumrad", hex: "#246342", swatch: "bg-gradient-to-br from-emerald-50 via-desert-100 to-emerald-100", stock: 4 },
      { id: "fitra-gold", name: "Fitra Tilla", hex: "#C99E1F", swatch: "bg-gradient-to-br from-gold-50 via-desert-100 to-gold-100", stock: 3 },
    ],
    sizes: womenSizes, defaultColorId: "fitra-emerald", defaultSizeId: "M",
    swatch: "bg-gradient-to-br from-emerald-50 via-desert-100 to-gold-50",
    gallery: [
      { kind: "image", url: "/products/women.jpg", swatch: "bg-gradient-to-br from-emerald-50 via-desert-100 to-emerald-100", alt: "Set Fitra" },
    ],
    isLimited: true,
  },
];


// ---- NAMOZ ----
const prayer: Product[] = [
  {
    id: "tayiba-rug-rawda", slug: "rug-rawda", collection: "prayer", category: "rug",
    name: "Joynamoz Rawda", arabicName: "روضة", price: 1950000, currency: "UZS",
    shortDescription: "Avloddan-avlodga qoladigan joynamoz — Marg'ilonda to'qilgan, ustozning imzosi bilan.",
    description: "Rawda — Madinaning yashil bog'i — yumshoq zumrad va ilohiy tilla rangda gavdalanadi. Burchakda ustozning atelye imzosi qo'lda kashtalangan.",
    story: "Har bir Rawda dastgohda 9 kun, tugatishda 2 kun oladi. Har bir joynamoz arabchada ustaning bosh harfini saqlaydi.",
    composition: ["Marg'ilon junidan qo'lda to'qilgan", "Toza paxta arqog'i", "Qo'lda kashtalangan atelye imzosi"],
    care: ["Eng past darajada changyutgich bilan", "Yiliga ikki marta ochiq havoda shamollatib qo'ying"],
    origin: "Marg'ilonda to'qilgan, Toshkentda tugatilgan",
    colors: [
      { id: "rawda-emerald-gold", name: "Zumrad va Tilla", hex: "#246342", swatch: "bg-gradient-to-br from-emerald-100 via-emerald-50 to-gold-50", stock: 6 },
      { id: "rawda-bone-emerald", name: "Suyak va Zumrad", hex: "#F6F3EC", swatch: "bg-gradient-to-br from-desert-50 via-emerald-50 to-desert-100", stock: 4 },
    ],
    sizes: oneSize, defaultColorId: "rawda-emerald-gold",
    swatch: "bg-gradient-to-br from-emerald-100 via-emerald-50 to-gold-50",
    gallery: [
      { kind: "image", swatch: "bg-gradient-to-br from-emerald-100 via-emerald-50 to-gold-50", alt: "Joynamoz Rawda — to'liq" },
      { kind: "image", swatch: "bg-gradient-to-br from-emerald-50 via-gold-50 to-desert-100", alt: "Rawda — burchak detali" },
    ],
    isNew: true, isLimited: true,
  },
  {
    id: "tayiba-tasbih-tayba", slug: "tasbih-tayba", collection: "prayer", category: "tasbih",
    name: "Tasbeh Tayba", arabicName: "تَسبيح", price: 580000, currency: "UZS",
    shortDescription: "Olijanob tuproq yog'ochidan tasbeh — qo'lda tugatilgan, tabiiy ipakda terilgan.",
    description: "Har bir Tayba tasbehi mavsumida quritilgan tuproq yog'ochining bir bo'lagidan o'rilib, kafti issiq bo'lguncha qo'lda silliqlanadi.",
    composition: ["Mavsumida quritilgan yong'oq yoki zaytun yog'ochi", "Tabiiy ipak ip", "Qo'lda tugatilgan ko'rsatkich don"],
    care: ["Quruq mato bilan arting", "Uzoq vaqt nam saqlamang"],
    origin: "Toshkentda qo'lda yo'nilgan",
    colors: [
      { id: "tayba-walnut", name: "Yong'oq", hex: "#624620", swatch: "bg-gradient-to-br from-earth-100 via-earth-200 to-earth-300", stock: 14 },
      { id: "tayba-olive", name: "Zaytun", hex: "#825D2A", swatch: "bg-gradient-to-br from-earth-50 via-emerald-50 to-earth-100", stock: 10 },
    ],
    sizes: [{ id: "33", label: "33 don", inStock: true }, { id: "99", label: "99 don", inStock: true }],
    defaultColorId: "tayba-walnut", defaultSizeId: "99",
    swatch: "bg-gradient-to-br from-gold-50 via-desert-100 to-emerald-50",
    gallery: [{ kind: "image", swatch: "bg-gradient-to-br from-earth-100 via-earth-50 to-earth-200", alt: "Tasbeh Tayba" }],
  },
  {
    id: "tayiba-rug-sukoon", slug: "rug-sukoon", collection: "prayer", category: "rug",
    name: "Joynamoz Sukoon", arabicName: "سُكون", price: 1450000, currency: "UZS",
    shortDescription: "Yengil har kunlik joynamoz — kichik buklanadi, yumshoq olib yuriladi.",
    description: "Sukoon — bizning safar joynamozimiz. Sumkaning cho'ntagiga buklanib qo'yiladi va qo'yilgan zahoti tekis yotadi.",
    composition: ["Paxta-aralashmali tuk", "Kuchaytirilgan chetlar"],
    care: ["Yumshoq mashina yuvish", "Osib quritish"],
    origin: "Toshkentda qo'lda tugatilgan",
    colors: [
      { id: "sukoon-desert", name: "Sahro", hex: "#E4DCCB", swatch: "bg-gradient-to-br from-desert-100 via-emerald-50 to-desert-200", stock: 18 },
      { id: "sukoon-emerald", name: "Zumrad", hex: "#246342", swatch: "bg-gradient-to-br from-emerald-50 via-emerald-100 to-emerald-200", stock: 12 },
    ],
    sizes: oneSize, defaultColorId: "sukoon-desert",
    swatch: "bg-gradient-to-br from-desert-100 via-emerald-50 to-desert-200",
    gallery: [{ kind: "image", swatch: "bg-gradient-to-br from-desert-100 via-emerald-50 to-desert-200", alt: "Joynamoz Sukoon" }],
  },
  {
    id: "tayiba-qiblah-piece", slug: "qiblah-piece", collection: "prayer", category: "home",
    name: "Qibla Belgisi", arabicName: "قِبلة", price: 1750000, currency: "UZS",
    shortDescription: "Qiblani belgilaydigan kichik devor buyumi — olijanob loy va guruchdan qo'lda quyilgan.",
    description: "28sm aylanasidagi devor buyumi — olijanob plaster aralashmasidan qo'lda quyilib, charxlangan guruchli oy bilan.",
    composition: ["Qo'lda quyilgan plaster + mineral pigment", "Charxlangan guruch oy"],
    care: ["Yumshoq mato bilan changini arting", "To'g'ridan-to'g'ri quyoshdan saqlang"],
    origin: "Toshkentda qo'lda quyilgan",
    colors: [
      { id: "qiblah-bone", name: "Suyak va Guruch", hex: "#F6F3EC", swatch: "bg-gradient-to-br from-desert-50 via-gold-50 to-desert-100", stock: 8 },
      { id: "qiblah-emerald", name: "Zumrad va Guruch", hex: "#1B4D33", swatch: "bg-gradient-to-br from-emerald-100 via-gold-50 to-emerald-200", stock: 6 },
    ],
    sizes: oneSize, defaultColorId: "qiblah-bone",
    swatch: "bg-gradient-to-br from-emerald-50 via-gold-50 to-desert-100",
    gallery: [{ kind: "image", swatch: "bg-gradient-to-br from-desert-50 via-gold-50 to-desert-100", alt: "Qibla Belgisi" }],
    isLimited: true,
  },
];


// ---- SOV'GA ----
const gift: Product[] = [
  {
    id: "tayiba-set-hadiya", slug: "set-hadiya", collection: "gift", category: "set",
    name: "Sovg'a To'plami Hadiya", arabicName: "هَدِيَّة", price: 980000, currency: "UZS",
    shortDescription: "Safar uchun sovg'a qutisi — tasbeh, attar shishasi va atelye varaqasi.",
    description: "Hadiya — bizning eng kichik qutimiz. Qo'lda yo'nilgan tasbeh, kichik shisha bizning oud-attarimiz va qo'lda yozilgan atelye varaqasi.",
    composition: ["Yong'oq tasbehi (33)", "Oud attar 5ml", "Atelye varaqasi"],
    care: ["To'g'ridan-to'g'ri quyoshdan saqlang"],
    origin: "Toshkentda tanlangan",
    colors: [{ id: "hadiya-gold", name: "Tilla Zig'ir", hex: "#C99E1F", swatch: "bg-gradient-to-br from-gold-50 via-desert-100 to-gold-100", stock: 22 }],
    sizes: oneSize, defaultColorId: "hadiya-gold",
    swatch: "bg-gradient-to-br from-gold-50 via-desert-100 to-gold-100",
    gallery: [
      { kind: "image", swatch: "bg-gradient-to-br from-gold-50 via-desert-100 to-gold-100", alt: "Sovg'a To'plami Hadiya" },
      { kind: "image", swatch: "bg-gradient-to-br from-gold-100 via-desert-100 to-gold-50", alt: "Sovg'a To'plami Hadiya — ochiq" },
    ],
    isNew: true,
  },
  {
    id: "tayiba-set-noor", slug: "set-noor", collection: "gift", category: "set",
    name: "Sovg'a To'plami Noor", arabicName: "نُور", price: 1450000, currency: "UZS",
    shortDescription: "Kattaroq quti — Khimar Noor + tasbeh + attar — atelye zig'irli sumkasida.",
    description: "Khimar Noor atrofida tuzilgan: yong'oq tasbeh va oud-atirgul attar bilan birga.",
    composition: ["Khimar Noor", "Yong'oq tasbeh (33)", "Oud-atirgul attar 10ml"],
    care: ["Har bir parchaning yorlig'iga qarang"],
    origin: "Toshkentda tanlangan",
    colors: [{ id: "noor-bone", name: "Suyak Zig'ir", hex: "#FBFAF6", swatch: "bg-gradient-to-br from-desert-50 via-gold-50 to-desert-100", stock: 11 }],
    sizes: oneSize, defaultColorId: "noor-bone",
    swatch: "bg-gradient-to-br from-desert-100 via-gold-50 to-desert-200",
    gallery: [{ kind: "image", swatch: "bg-gradient-to-br from-desert-100 via-gold-50 to-desert-200", alt: "Sovg'a To'plami Noor" }],
  },
  {
    id: "tayiba-set-rawda", slug: "set-rawda", collection: "gift", category: "set",
    name: "Sovg'a To'plami Rawda", arabicName: "روضة", price: 1850000, currency: "UZS",
    shortDescription: "Atelye tomonidan tanlangan quti — Rawda safar joynamozi atrofida.",
    description: "Sukoon safar joynamozi atrofida tuzilgan: tasbeh, oud attar va qo'lda muqovalangan dua kitobi.",
    composition: ["Joynamoz Sukoon", "Zaytun tasbeh (99)", "Qo'lda muqovalangan dua kitobi"],
    care: ["Har bir parchaning yorlig'iga qarang"],
    origin: "Toshkentda tanlangan",
    colors: [{ id: "rawda-emerald", name: "Zumrad Zig'ir", hex: "#246342", swatch: "bg-gradient-to-br from-emerald-50 via-desert-100 to-gold-50", stock: 7 }],
    sizes: oneSize, defaultColorId: "rawda-emerald",
    swatch: "bg-gradient-to-br from-emerald-50 via-desert-100 to-gold-50",
    gallery: [{ kind: "image", swatch: "bg-gradient-to-br from-emerald-50 via-desert-100 to-gold-50", alt: "Sovg'a To'plami Rawda" }],
    isLimited: true,
  },
  {
    id: "tayiba-card-tayba", slug: "card-tayba", collection: "gift", category: "voucher",
    name: "Atelye Sertifikati", arabicName: "بِطاقة", price: 500000, currency: "UZS",
    shortDescription: "Qo'lda yozilgan atelye sertifikati — har qanday qiymatda, zig'irda yetkaziladi.",
    description: "Tanlash istamaganingizda. Sertifikat qo'lda yoziladi, zig'irda muhrlanib, ertasi tongda yuboriladi.",
    composition: ["Qo'lda yozilgan sertifikat", "Zig'ir ramka", "Mum muhri"],
    care: ["Tekis saqlang"],
    origin: "Toshkentda qo'lda yozilgan",
    colors: [{ id: "card-bone", name: "Suyak va Mum", hex: "#F6F3EC", swatch: "bg-gradient-to-br from-desert-50 via-gold-50 to-desert-100", stock: 99 }],
    sizes: [
      { id: "500", label: "500 000 so'm", inStock: true }, { id: "1000", label: "1 000 000 so'm", inStock: true },
      { id: "2500", label: "2 500 000 so'm", inStock: true }, { id: "5000", label: "5 000 000 so'm", inStock: true },
    ],
    defaultColorId: "card-bone", defaultSizeId: "1000",
    swatch: "bg-gradient-to-br from-desert-50 via-gold-50 to-desert-100",
    gallery: [{ kind: "image", swatch: "bg-gradient-to-br from-desert-50 via-gold-50 to-desert-100", alt: "Atelye Sertifikati" }],
  },
];

export const allProducts: Product[] = [...men, ...women, ...prayer, ...gift];
