# InsightFlow 🚀

AI destekli veri analizi ve iş zekası platformu. CSV ve Excel dosyalarınızı yükleyin, güçlü analizler yapın ve yapay zeka ile otomatik içgörüler elde edin.

## ✨ Özellikler

- 📊 **Kolay Veri Yükleme**: CSV ve Excel dosyalarını sürükle-bırak ile yükleyin
- 🤖 **AI Destekli İçgörüler**: Google Gemini AI ile otomatik veri analizi
- 📈 **Görselleştirme**: İnteraktif grafikler ve tablolar
- 🔐 **Güvenli**: NextAuth.js ile modern kimlik doğrulama
- 🎨 **Modern UI**: Minimalist ve responsive tasarım
- 🚀 **Hızlı**: Next.js 16 + Turbopack ile optimize edilmiş

## 🛠️ Teknoloji Stack

- **Framework**: Next.js 16 + React 19
- **Database**: SQLite + Prisma ORM
- **Auth**: NextAuth.js
- **AI**: Google Gemini API
- **Styling**: Tailwind CSS 4
- **Charts**: Recharts + ECharts
- **File Processing**: Papa Parse (CSV) + xlsx (Excel)

## 🚀 Hızlı Başlangıç

### 1. Gereksinimler

- Node.js 20+
- npm

### 2. Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Veritabanını oluştur
npx prisma migrate dev

# Test verilerini yükle
npm run seed
```

### 3. Geliştirme Sunucusunu Başlat

```bash
npm run dev
```

Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

## 🧪 Test Hesabı

Landing page'den kayıt olabilir veya mevcut test hesabını kullanabilirsiniz:

```
Email: test@example.com
Şifre: test123
```

Test hesabında:
- 2 örnek veri seti (Satış Verileri & Müşteri Profilleri)
- 2 tamamlanmış analiz
- AI içgörüleri

## 🎯 Özellikler Detayları

### Veri Yükleme
- CSV ve Excel (.xlsx, .xls) desteği
- Vercel Blob ile bulut tabanlı depolama
- Otomatik veri önizleme
- Sütun tipi tespiti

### Veri Analizi
- Tanımlayıcı istatistikler (ortalama, medyan, std. sapma)
- Korelasyon analizi
- Regresyon analizi
- Zaman serisi analizi
- Kümeleme analizi

### AI İçgörüleri
- Google Gemini API entegrasyonu
- Otomatik içgörü üretimi
- Türkçe analiz raporları
- İş önerileri

### 14 Günlük Deneme
- Otomatik trial sistemi
- Premium özelliklere erişim
- Kredi kartı gerekmez

## 🔑 Ortam Değişkenleri

`.env` dosyası oluşturun:

```env
DATABASE_URL=file:./dev.db
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
GEMINI_API_KEY=your-gemini-api-key
```

## 📦 Build

```bash
# Production build
npm run build

# Production sunucusu
npm start
```

---

**InsightFlow** ile verilerinizi içgörülere dönüştürün! 🚀
