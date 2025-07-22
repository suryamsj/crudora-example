import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Data dummy untuk 30 users
  const users = [
    { email: 'john.doe@example.com', password: 'password123', name: 'John Doe' },
    { email: 'jane.smith@example.com', password: 'password123', name: 'Jane Smith' },
    { email: 'mike.johnson@example.com', password: 'password123', name: 'Mike Johnson' },
    { email: 'sarah.wilson@example.com', password: 'password123', name: 'Sarah Wilson' },
    { email: 'david.brown@example.com', password: 'password123', name: 'David Brown' },
    { email: 'lisa.davis@example.com', password: 'password123', name: 'Lisa Davis' },
    { email: 'robert.miller@example.com', password: 'password123', name: 'Robert Miller' },
    { email: 'emily.garcia@example.com', password: 'password123', name: 'Emily Garcia' },
    { email: 'james.rodriguez@example.com', password: 'password123', name: 'James Rodriguez' },
    { email: 'maria.martinez@example.com', password: 'password123', name: 'Maria Martinez' },
    { email: 'william.anderson@example.com', password: 'password123', name: 'William Anderson' },
    { email: 'jennifer.taylor@example.com', password: 'password123', name: 'Jennifer Taylor' },
    { email: 'christopher.thomas@example.com', password: 'password123', name: 'Christopher Thomas' },
    { email: 'amanda.jackson@example.com', password: 'password123', name: 'Amanda Jackson' },
    { email: 'matthew.white@example.com', password: 'password123', name: 'Matthew White' },
    { email: 'ashley.harris@example.com', password: 'password123', name: 'Ashley Harris' },
    { email: 'joshua.martin@example.com', password: 'password123', name: 'Joshua Martin' },
    { email: 'jessica.thompson@example.com', password: 'password123', name: 'Jessica Thompson' },
    { email: 'andrew.garcia@example.com', password: 'password123', name: 'Andrew Garcia' },
    { email: 'stephanie.martinez@example.com', password: 'password123', name: 'Stephanie Martinez' },
    { email: 'daniel.robinson@example.com', password: 'password123', name: 'Daniel Robinson' },
    { email: 'michelle.clark@example.com', password: 'password123', name: 'Michelle Clark' },
    { email: 'anthony.rodriguez@example.com', password: 'password123', name: 'Anthony Rodriguez' },
    { email: 'kimberly.lewis@example.com', password: 'password123', name: 'Kimberly Lewis' },
    { email: 'mark.lee@example.com', password: 'password123', name: 'Mark Lee' },
    { email: 'donna.walker@example.com', password: 'password123', name: 'Donna Walker' },
    { email: 'steven.hall@example.com', password: 'password123', name: 'Steven Hall' },
    { email: 'carol.allen@example.com', password: 'password123', name: 'Carol Allen' },
    { email: 'kenneth.young@example.com', password: 'password123', name: 'Kenneth Young' },
    { email: 'betty.hernandez@example.com', password: 'password123', name: 'Betty Hernandez' }
  ];

  // Hapus data existing (opsional)
  await prisma.user.deleteMany({});
  console.log('🗑️  Cleared existing users');

  // Insert users satu per satu
  for (const userData of users) {
    const user = await prisma.user.create({
      data: userData
    });
    console.log(`✅ Created user: ${user.email}`);
  }

  console.log(`🎉 Successfully seeded ${users.length} users!`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
