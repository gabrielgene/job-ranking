import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const data = [
  {
    email: 'junior@gmail.com',
    password: '123',
    type: 'JUNIOR',
    junior: {
      create: {
        name: 'Junior name',
        bio: 'Junior bio',
      },
    },
  },
  {
    email: 'senior@gmail.com',
    password: '123',
    type: 'SENIOR',
    senior: {
      create: {
        name: 'Senior name',
        bio: 'Senior bio',
      },
    },
  },
  {
    email: 'company@gmail.com',
    password: '123',
    type: 'COMPANY',
    company: {
      create: {
        name: 'Company name',
        bio: 'Company bio',
      },
    },
  },
]

async function main() {
  console.log(`Start seeding ...`)
  for (const d of data) {
    const user = await prisma.user.create({
      data: d,
    })
    console.log(`Created user with id: ${user.id}`)
  }
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
