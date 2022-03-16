import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const users = [
  {
    email: 'junior@gmail.com',
    password: '123',
    type: 'JUNIOR',
    name: 'Junior name',
    bio: 'Junior bio',
    ratings: {
      create: [
        { content: 'Test 1', score: 10 },
        { content: 'Test 2', score: 20 },
        { content: 'Test 3', score: 20 },
      ],
    },
  },
  {
    email: 'senior@gmail.com',
    password: '123',
    type: 'SENIOR',
    name: 'Senior name',
    bio: 'Senior bio',
  },

  {
    email: 'company@gmail.com',
    password: '123',
    type: 'COMPANY',
    name: 'Company name',
    bio: 'Company bio',
  },
]

async function main() {
  console.log(`Start seeding ...`)

  users.forEach(async (u) => {
    await prisma.user.create({
      data: u,
    })
  })

  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
