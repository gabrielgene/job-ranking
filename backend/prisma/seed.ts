import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const users = [
  {
    email: 'dev1@gmail.com',
    password: '123',
    type: 'JUNIOR',
    name: 'Dev 1',
    username: 'dev2',
    bio: 'Ola sou Dev1',
    occupation: 'DEV',
    preferences: {
      create: [
        { name: 'React' },
        { name: 'Frontend' },
        { name: 'Css' },
        { name: 'Javascript' },
      ],
    },
  },
  {
    email: 'dev2@gmail.com',
    password: '123',
    type: 'JUNIOR',
    name: 'Dev 2',
    username: 'dev1',
    bio: 'Ola sou Dev2',
    occupation: 'DEV',
    preferences: {
      create: [
        { name: 'React' },
        { name: 'Frontend' },
        { name: 'Css' },
        { name: 'Javascript' },
      ],
    },
  },
  {
    email: 'juli@gmail.com',
    password: '123',
    type: 'JUNIOR',
    name: 'Juliana',
    username: 'julijennifer',
    bio: 'Ola sou Juliana',
    occupation: 'DESIGNER',
    preferences: {
      create: [
        { name: 'UI/UX' },
        { name: 'Animações' },
        { name: 'Ilustração' },
      ],
    },
  },
  {
    email: 'seniords@gmail.com',
    password: '123',
    type: 'SENIOR',
    name: 'Senior name',
    username: 'senior_designer',
    bio: 'Senior Desginer bio',
    occupation: 'DESIGNER',
  },
  {
    email: 'seniordev@gmail.com',
    password: '123',
    type: 'SENIOR',
    name: 'Senior name',
    username: 'senior_dev',
    bio: 'Senior Dev bio',
    occupation: 'DEV',
  },
  {
    email: 'company@gmail.com',
    password: '123',
    type: 'COMPANY',
    name: 'Company name',
    username: 'company',
    bio: 'Company bio',
    occupation: 'COMPANY',
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
