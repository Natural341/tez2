import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Test kullanıcısı oluştur
  const hashedPassword = await bcrypt.hash('test123', 10)

  const trialEndsAt = new Date()
  trialEndsAt.setDate(trialEndsAt.getDate() + 14)

  const user = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      name: 'Test Kullanıcı',
      password: hashedPassword,
      trialEndsAt,
      isPremium: false,
    },
  })

  console.log('✅ Test kullanıcısı oluşturuldu:', user.email)

  // Örnek veri seti 1: Satış Verileri
  const salesData = {
    columns: [
      { name: 'Tarih', type: 'string' },
      { name: 'Ürün', type: 'string' },
      { name: 'Satış', type: 'number' },
      { name: 'Gelir', type: 'number' },
      { name: 'Kar', type: 'number' },
    ],
    preview: [
      { Tarih: '2024-01-01', Ürün: 'Laptop', Satış: 15, Gelir: 45000, Kar: 9000 },
      { Tarih: '2024-01-02', Ürün: 'Mouse', Satış: 45, Gelir: 2250, Kar: 900 },
      { Tarih: '2024-01-03', Ürün: 'Klavye', Satış: 32, Gelir: 4800, Kar: 1600 },
      { Tarih: '2024-01-04', Ürün: 'Monitor', Satış: 22, Gelir: 33000, Kar: 6600 },
      { Tarih: '2024-01-05', Ürün: 'Laptop', Satış: 18, Gelir: 54000, Kar: 10800 },
      { Tarih: '2024-01-06', Ürün: 'Mouse', Satış: 52, Gelir: 2600, Kar: 1040 },
      { Tarih: '2024-01-07', Ürün: 'Klavye', Satış: 28, Gelir: 4200, Kar: 1400 },
      { Tarih: '2024-01-08', Ürün: 'Monitor', Satış: 19, Gelir: 28500, Kar: 5700 },
      { Tarih: '2024-01-09', Ürün: 'Laptop', Satış: 21, Gelir: 63000, Kar: 12600 },
      { Tarih: '2024-01-10', Ürün: 'Mouse', Satış: 48, Gelir: 2400, Kar: 960 },
    ],
  }

  const dataset1 = await prisma.dataset.create({
    data: {
      name: 'Satış Verileri 2024',
      description: 'Ocak ayı ürün satış verileri ve gelir analizi',
      fileName: 'sales_2024.csv',
      filePath: '/uploads/demo/sales_2024.csv',
      fileType: 'text/csv',
      fileSize: 2048,
      rowCount: 250,
      columnCount: 5,
      columns: salesData.columns,
      preview: salesData.preview,
      userId: user.id,
    },
  })

  console.log('✅ Satış verileri oluşturuldu')

  // Örnek veri seti 2: Müşteri Verileri
  const customerData = {
    columns: [
      { name: 'Müşteri ID', type: 'number' },
      { name: 'Yaş', type: 'number' },
      { name: 'Şehir', type: 'string' },
      { name: 'Harcama', type: 'number' },
      { name: 'Memnuniyet', type: 'number' },
    ],
    preview: [
      { 'Müşteri ID': 1001, Yaş: 28, Şehir: 'İstanbul', Harcama: 5600, Memnuniyet: 4.5 },
      { 'Müşteri ID': 1002, Yaş: 35, Şehir: 'Ankara', Harcama: 3200, Memnuniyet: 4.2 },
      { 'Müşteri ID': 1003, Yaş: 42, Şehir: 'İzmir', Harcama: 7800, Memnuniyet: 4.8 },
      { 'Müşteri ID': 1004, Yaş: 31, Şehir: 'İstanbul', Harcama: 4500, Memnuniyet: 4.3 },
      { 'Müşteri ID': 1005, Yaş: 26, Şehir: 'Bursa', Harcama: 2900, Memnuniyet: 3.9 },
      { 'Müşteri ID': 1006, Yaş: 39, Şehir: 'Ankara', Harcama: 6200, Memnuniyet: 4.6 },
      { 'Müşteri ID': 1007, Yaş: 45, Şehir: 'İzmir', Harcama: 8100, Memnuniyet: 4.9 },
      { 'Müşteri ID': 1008, Yaş: 33, Şehir: 'Antalya', Harcama: 5300, Memnuniyet: 4.4 },
      { 'Müşteri ID': 1009, Yaş: 29, Şehir: 'İstanbul', Harcama: 4800, Memnuniyet: 4.1 },
      { 'Müşteri ID': 1010, Yaş: 37, Şehir: 'Ankara', Harcama: 5900, Memnuniyet: 4.7 },
    ],
  }

  const dataset2 = await prisma.dataset.create({
    data: {
      name: 'Müşteri Profilleri',
      description: 'Müşteri demografik bilgileri ve harcama alışkanlıkları',
      fileName: 'customers.csv',
      filePath: '/uploads/demo/customers.csv',
      fileType: 'text/csv',
      fileSize: 3072,
      rowCount: 500,
      columnCount: 5,
      columns: customerData.columns,
      preview: customerData.preview,
      userId: user.id,
    },
  })

  console.log('✅ Müşteri verileri oluşturuldu')

  // Örnek analiz 1
  const analysis1Results = {
    Satış: {
      count: 10,
      mean: 30.0,
      median: 28.5,
      min: 15,
      max: 52,
      stdDev: 12.45,
    },
    Gelir: {
      count: 10,
      mean: 23975.0,
      median: 19650.0,
      min: 2250,
      max: 63000,
      stdDev: 20348.78,
    },
    Kar: {
      count: 10,
      mean: 5100.0,
      median: 4500.0,
      min: 900,
      max: 12600,
      stdDev: 4012.56,
    },
  }

  const analysis1Viz = [
    {
      type: 'bar',
      title: 'Satış Dağılımı',
      data: salesData.preview.map((row, idx) => ({
        name: row.Ürün,
        value: row.Satış,
      })),
    },
    {
      type: 'bar',
      title: 'Gelir Analizi',
      data: salesData.preview.map((row, idx) => ({
        name: row.Ürün,
        value: row.Gelir,
      })),
    },
  ]

  await prisma.analysis.create({
    data: {
      name: 'Satış Performans Analizi',
      type: 'descriptive',
      datasetId: dataset1.id,
      userId: user.id,
      status: 'completed',
      results: analysis1Results,
      visualizations: analysis1Viz,
      insights: `📊 Satış Performans Analizi - Temel Bulgular

🔍 Genel Değerlendirme:
Analiz edilen 10 günlük dönemde toplam 250 ürün satışı gerçekleştirilmiş ve ortalama günlük satış 30 adet olarak hesaplanmıştır. Ortalama günlük gelir ₺23,975 seviyesindedir.

📈 Önemli Gözlemler:
1. En yüksek satış adedi: 52 adet (Mouse ürünü)
2. En düşük satış adedi: 15 adet (Laptop ürünü)
3. Kar marjı ortalama %21 civarındadır
4. Laptop ürünü birim başına en yüksek kar sağlamaktadır

💡 Öneriler:
• Mouse ürününde yüksek satış hacmi görülüyor, ancak kar marjı düşük - fiyatlandırma stratejisi gözden geçirilebilir
• Laptop satışları artırılabilir çünkü kar marjı en yüksek bu üründe
• Monitor satışları istikrarlı seyrediyor ve iyi bir kar marjı sunuyor

⚠️ Dikkat Edilmesi Gerekenler:
Standart sapma değerleri yüksek olduğundan satışlarda dalgalanmalar mevcut. Dönemsel kampanyalar ve pazarlama stratejileri optimize edilebilir.`,
    },
  })

  console.log('✅ Satış analizi oluşturuldu')

  // Örnek analiz 2
  const analysis2Results = {
    Yaş: {
      count: 10,
      mean: 34.5,
      median: 34.0,
      min: 26,
      max: 45,
      stdDev: 6.24,
    },
    Harcama: {
      count: 10,
      mean: 5430.0,
      median: 5450.0,
      min: 2900,
      max: 8100,
      stdDev: 1654.32,
    },
    Memnuniyet: {
      count: 10,
      mean: 4.44,
      median: 4.45,
      min: 3.9,
      max: 4.9,
      stdDev: 0.29,
    },
  }

  const analysis2Viz = [
    {
      type: 'bar',
      title: 'Şehir Bazlı Harcama',
      data: [
        { name: 'İstanbul', value: 5300 },
        { name: 'Ankara', value: 5100 },
        { name: 'İzmir', value: 7950 },
        { name: 'Bursa', value: 2900 },
        { name: 'Antalya', value: 5300 },
      ],
    },
  ]

  await prisma.analysis.create({
    data: {
      name: 'Müşteri Segmentasyon Analizi',
      type: 'descriptive',
      datasetId: dataset2.id,
      userId: user.id,
      status: 'completed',
      results: analysis2Results,
      visualizations: analysis2Viz,
      insights: `👥 Müşteri Segmentasyon Analizi - Detaylı İncelemeler

🎯 Demografik Profil:
Müşteri tabanımız ortalama 34.5 yaşında ve geniş bir yaş aralığına (26-45) yayılmış durumda. Bu, ürünlerimizin farklı yaş gruplarına hitap ettiğini gösteriyor.

💰 Harcama Davranışları:
• Ortalama müşteri harcaması: ₺5,430
• En yüksek harcama: ₺8,100 (İzmir, 45 yaş)
• En düşük harcama: ₺2,900 (Bursa, 26 yaş)
• Harcama tutarları nispeten dengeli dağılımlı

😊 Müşteri Memnuniyeti:
Genel memnuniyet skoru 4.44/5.0 ile oldukça yüksek seviyede. En yüksek memnuniyet İzmir müşterilerinde (4.9) gözlemleniyor.

🗺️ Bölgesel Analiz:
• İstanbul: En yüksek müşteri sayısı, ortalama harcama
• İzmir: En yüksek harcama ve memnuniyet
• Ankara: İstikrarlı performans
• Bursa: Gelişim potansiyeli var

📊 Stratejik Öneriler:
1. İzmir müşterilerinin yüksek memnuniyet ve harcama profili incelenmeli, bu başarı diğer şehirlere adapte edilmeli
2. Bursa'da düşük harcama görülüyor - hedefli kampanyalar düzenlenebilir
3. 35+ yaş grubunda daha yüksek harcama eğilimi var, bu segmente özel ürünler geliştirilebilir
4. Yüksek memnuniyet skorları korunmalı ve müşteri sadakati programları ile desteklenmeli`,
    },
  })

  console.log('✅ Müşteri analizi oluşturuldu')

  // Ek analiz - Beklemede
  await prisma.analysis.create({
    data: {
      name: 'Korelasyon Analizi',
      type: 'correlation',
      datasetId: dataset1.id,
      userId: user.id,
      status: 'pending',
    },
  })

  console.log('✅ Bekleyen analiz oluşturuldu')

  // Ek analiz - İşleniyor
  await prisma.analysis.create({
    data: {
      name: 'Gelecek Ay Satış Tahmini',
      type: 'regression',
      datasetId: dataset1.id,
      userId: user.id,
      status: 'processing',
    },
  })

  console.log('✅ İşlenen analiz oluşturuldu')

  // Ek dataset 3
  const productData = {
    columns: [
      { name: 'Ürün ID', type: 'number' },
      { name: 'Ürün Adı', type: 'string' },
      { name: 'Kategori', type: 'string' },
      { name: 'Stok', type: 'number' },
      { name: 'Fiyat', type: 'number' },
      { name: 'Satış Adedi', type: 'number' },
    ],
    preview: [
      { 'Ürün ID': 101, 'Ürün Adı': 'Laptop Pro', Kategori: 'Elektronik', Stok: 45, Fiyat: 12500, 'Satış Adedi': 234 },
      { 'Ürün ID': 102, 'Ürün Adı': 'Mouse RGB', Kategori: 'Aksesuar', Stok: 150, Fiyat: 350, 'Satış Adedi': 567 },
      { 'Ürün ID': 103, 'Ürün Adı': 'Klavye Mekanik', Kategori: 'Aksesuar', Stok: 89, Fiyat: 850, 'Satış Adedi': 345 },
      { 'Ürün ID': 104, 'Ürün Adı': 'Monitor 27"', Kategori: 'Elektronik', Stok: 67, Fiyat: 5600, 'Satış Adedi': 189 },
      { 'Ürün ID': 105, 'Ürün Adı': 'Webcam HD', Kategori: 'Aksesuar', Stok: 120, Fiyat: 780, 'Satış Adedi': 423 },
      { 'Ürün ID': 106, 'Ürün Adı': 'Kulaklık Bluetooth', Kategori: 'Aksesuar', Stok: 95, Fiyat: 450, 'Satış Adedi': 678 },
      { 'Ürün ID': 107, 'Ürün Adı': 'SSD 1TB', Kategori: 'Donanım', Stok: 156, Fiyat: 2300, 'Satış Adedi': 234 },
      { 'Ürün ID': 108, 'Ürün Adı': 'RAM 16GB', Kategori: 'Donanım', Stok: 203, Fiyat: 1850, 'Satış Adedi': 456 },
    ],
  }

  const dataset3 = await prisma.dataset.create({
    data: {
      name: 'Ürün Envanteri 2024',
      description: 'Güncel ürün stok durumu ve satış performansları',
      fileName: 'products_inventory.xlsx',
      filePath: '/uploads/demo/products_inventory.xlsx',
      fileType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      fileSize: 4096,
      rowCount: 150,
      columnCount: 6,
      columns: productData.columns,
      preview: productData.preview,
      userId: user.id,
    },
  })

  console.log('✅ Ürün envanteri oluşturuldu')

  // Ürün analizi
  const analysis3Results = {
    'Toplam Ürün': 8,
    'Toplam Stok Değeri': 2458650,
    'En Çok Satan': 'Kulaklık Bluetooth (678 adet)',
    'Düşük Stok': ['Laptop Pro (45 adet)', 'Monitor 27" (67 adet)'],
    'Kategori Dağılımı': {
      'Elektronik': 2,
      'Aksesuar': 4,
      'Donanım': 2,
    },
  }

  const analysis3Viz = [
    {
      type: 'bar',
      title: 'Kategori Bazlı Satışlar',
      data: [
        { name: 'Elektronik', value: 423 },
        { name: 'Aksesuar', value: 2013 },
        { name: 'Donanım', value: 690 },
      ],
    },
    {
      type: 'pie',
      title: 'Stok Dağılımı',
      data: [
        { name: 'Elektronik', value: 112 },
        { name: 'Aksesuar', value: 454 },
        { name: 'Donanım', value: 359 },
      ],
    },
  ]

  await prisma.analysis.create({
    data: {
      name: 'Ürün Envanter Analizi',
      type: 'descriptive',
      datasetId: dataset3.id,
      userId: user.id,
      status: 'completed',
      results: analysis3Results,
      visualizations: analysis3Viz,
      insights: `📦 Ürün Envanter Analizi - Stok ve Satış Değerlendirmesi

📊 Genel Durum:
Toplam 8 farklı ürün kategorisinde 925 adet stok bulunmaktadır. Toplam stok değeri ₺2,458,650 olarak hesaplanmıştır.

🏆 En İyi Performans:
• Kulaklık Bluetooth: 678 adet satışla lider
• Mouse RGB: 567 adet satışla ikinci sırada
• RAM 16GB: 456 adet ile üçüncü

⚠️ Stok Uyarıları:
• Laptop Pro: Kritik stok seviyesi (45 adet) - Acil tedarik gerekli
• Monitor 27": Düşük stok (67 adet) - Sipariş verilmeli

💡 Kategori İçgörüleri:
• Aksesuar kategorisi satışların %64'ünü oluşturuyor
• Elektronik ürünler yüksek değer, düşük hacim
• Donanım kategorisi dengeli performans gösteriyor

🎯 Öneriler:
1. Laptop Pro ve Monitor stokları acil artırılmalı
2. Aksesuar kategorisinde kampanyalar sürdürülmeli
3. Yüksek margin'li ürünlere (Laptop, Monitor) odaklanılmalı
4. Düşük performanslı ürünler için promosyon planlanmalı`,
    },
  })

  console.log('✅ Ürün envanter analizi oluşturuldu')

  console.log('\n🎉 Seed tamamlandı!')
  console.log('\n📊 Oluşturulan Veriler:')
  console.log('• 1 Test Kullanıcı')
  console.log('• 3 Dataset (Satış, Müşteri, Ürün)')
  console.log('• 5 Analiz (3 tamamlandı, 1 işleniyor, 1 bekliyor)')
  console.log('\n📝 Test Giriş Bilgileri:')
  console.log('Email: test@example.com')
  console.log('Şifre: test123')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
