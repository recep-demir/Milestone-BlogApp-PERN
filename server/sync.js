"use strict";

const { User, Category, Blog } = require('./src/models/index');

module.exports = async () => {
    try {
        // Tabloları temizle (Sıralama önemli: Önce Blog sonra Category/User)
        await Blog.destroy({ where: {}, cascade: true });
        await Category.destroy({ where: {}, cascade: true });
        await User.destroy({ where: {}, cascade: true });

        console.log(' - Eski veriler temizlendi.');

        // 1. Test Kullanıcısı Oluştur
        const user = await User.create({
            username: "testuser",
            password: "Password123", // passwordEncrypt hook'u ile şifrelenecek
            email: "test@test.com",
            firstName: "Recep",
            lastName: "Demir",
            isAdmin: true
        });

        // 2. Örnek Kategoriler
        const cats = await Category.bulkCreate([
            { name: 'Yazılım' },
            { name: 'Teknoloji' },
            { name: 'Gezi' }
        ]);

        // 3. Örnek Bloglar
        await Blog.bulkCreate([
            {
                title: 'PERN Stack Projem',
                content: 'MongoDBden PostgreSQLe geçiş yaptım!',
                image: 'https://picsum.photos/800/400',
                userId: user.id,
                categoryId: cats[0].id
            },
            {
                title: 'Docker ve Docker Compose',
                content: 'Docker ile postgres ayağa kaldırmak harika.',
                image: 'https://picsum.photos/800/401',
                userId: user.id,
                categoryId: cats[1].id
            }
        ]);

        console.log('* Örnek veriler başarıyla yüklendi.');
    } catch (error) {
        console.error('Senkronizasyon Hatası:', error);
    }
};