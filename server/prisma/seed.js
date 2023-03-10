const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function seed() {
	await prisma.user.deleteMany({})
	await prisma.token.deleteMany({})

	const admin = await prisma.user.create({
		data: {
			id: '131e1ed4-e2c3-4f74-91b2-d93dd652ec9c',
			username: 'Admin',
			email: 'admin@localhost',
			password: '$2a$12$HSatSNIV0YIQMXAtPTMhs.EiniHXyPr3UqK87Ks8zlU.Un3G0R7sC', // '123456'
			isActivated: true,
			roles: ['ADMIN'],
		},
	})

	const victor = await prisma.user.create({
		data: {
			username: 'Victor',
			email: 'victor@ya.ru',
			password: '$2a$12$HSatSNIV0YIQMXAtPTMhs.EiniHXyPr3UqK87Ks8zlU.Un3G0R7sC', // '123456'
			isActivated: true,
			roles: ['USER', 'ADMIN'],
		},
	})

	const kyle = await prisma.user.create({
		data: {
			username: 'Kyle',
			email: 'kyle@ya.ru',
			password: '$2a$12$HSatSNIV0YIQMXAtPTMhs.EiniHXyPr3UqK87Ks8zlU.Un3G0R7sC', // '123456'
			roles: ['GUEST'],
			isActivated: false,
			activationLink: '33352e53-63e5-484f-bc22-f8043568ac77',
		},
	})

	const sally = await prisma.user.create({
		data: {
			username: 'Sally',
			email: 'sally@ya.ru',
			password: '$2a$12$HSatSNIV0YIQMXAtPTMhs.EiniHXyPr3UqK87Ks8zlU.Un3G0R7sC', // '123456'
			roles: ['GUEST'],
			isActivated: false,
			activationLink: 'fdddce36-93ef-49d4-9377-46aefcff711f',
		},
	})

	const pdd = await prisma.exercise.create({
		data: {
			title: 'Правила дорожного движения',
			isMultiple: false,
			questions: {
				create: [
					{
						text: 'Максимальная скорость движения в населённом пункте',
						answers: {
							create: [
								{
									text: '50 км/ч',
									isCorrect: false,
								},
								{
									text: '60 км/ч',
									isCorrect: true,
								},
								{
									text: '90 км/ч',
									isCorrect: false,
								},
							],
						},
					},
					{
						text: 'Максимальная скорость движения вне населённого пункта',
						answers: {
							create: [
								{
									text: '50 км/ч',
									isCorrect: false,
								},
								{
									text: '60 км/ч',
									isCorrect: false,
								},
								{
									text: '90 км/ч',
									isCorrect: true,
								},
							],
						},
					},
				],
			},
		},
	})

	const programm = await prisma.exercise.create({
		data: {
			title: 'Программирование',
			isMultiple: true,
			questions: {
				create: [
					{
						text: 'Объекто-ориентированные языки',
						answers: {
							create: [
								{
									text: 'С',
									isCorrect: false,
								},
								{
									text: 'С++',
									isCorrect: true,
								},
								{
									text: 'JavaScript',
									isCorrect: true,
								},
								{
									text: 'Pascal',
									isCorrect: false,
								},
							],
						},
					},
					{
						text: 'Языки программирования',
						answers: {
							create: [
								{
									text: 'JavaScript',
									isCorrect: true,
								},
								{
									text: 'HTML',
									isCorrect: false,
								},
								{
									text: 'TypeScript',
									isCorrect: false,
								},
								{
									text: 'Basic',
									isCorrect: true,
								},
							],
						},
					},
				],
			},
		},
	})
}

seed()
