const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function seed() {
	await prisma.user.deleteMany({})
	await prisma.token.deleteMany({})

	const victor = await prisma.user.create({
		data: {
			name: 'Victor',
			email: 'victor@ya.ru',
			password: '$2a$12$HSatSNIV0YIQMXAtPTMhs.EiniHXyPr3UqK87Ks8zlU.Un3G0R7sC', // '123456'
			isActivated: true,
			roles: ['USER', 'ADMIN'],
		},
	})

	const kyle = await prisma.user.create({
		data: {
			name: 'Kyle',
			email: 'kyle@ya.ru',
			password: '$2a$12$HSatSNIV0YIQMXAtPTMhs.EiniHXyPr3UqK87Ks8zlU.Un3G0R7sC', // '123456'
			roles: ['GUEST'],
			isActivated: false,
			activationLink: '33352e53-63e5-484f-bc22-f8043568ac77',
		},
	})

	const sally = await prisma.user.create({
		data: {
			name: 'Sally',
			email: 'sally@ya.ru',
			password: '$2a$12$HSatSNIV0YIQMXAtPTMhs.EiniHXyPr3UqK87Ks8zlU.Un3G0R7sC', // '123456'
			roles: ['GUEST'],
			isActivated: false,
			activationLink: 'fdddce36-93ef-49d4-9377-46aefcff711f',
		},
	})
}

seed()
