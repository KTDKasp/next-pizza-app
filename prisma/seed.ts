import { hashSync } from 'bcrypt';
import { prisma } from './prisma-client';
import { categories, ingredients, products } from './constants';
import { Prisma } from '@prisma/client';

const randomNumber = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

const generateProductVariant = ({
	productId,
	productType,
	productSize,
}: {
	productId: number;
	productType?: number;
	productSize?: number;
}) => {
	return {
		productId,
		price: randomNumber(190, 600),
		productType,
		productSize,
	} as Prisma.ProductVariantUncheckedCreateInput;
};

async function up() {
	await prisma.user.createMany({
		data: [
			{
				fullName: 'John Doe',
				email: 'primary@example.com',
				password: hashSync('123456', 10),
				varified: new Date(),
				role: 'USER',
			},
			{
				fullName: 'Michael Scarn',
				email: 'admin@google.com',
				password: hashSync('qwerty123', 10),
				varified: new Date(),
				role: 'ADMIN',
			},
		],
	});

	await prisma.category.createMany({
		data: categories,
	});

	await prisma.ingredient.createMany({
		data: ingredients,
	});

	await prisma.product.createMany({
		data: products,
	});

	const pizza1 = await prisma.product.create({
		data: {
			name: 'Пепперони фреш',
			imageUrl:
				'https://media.dodostatic.net/image/r:233x233/11EE7D61304FAF5A98A6958F2BB2D260.webp',
			categoryId: 1,
			ingredients: {
				connect: ingredients.slice(0, 5),
			},
		},
	});

	const pizza2 = await prisma.product.create({
		data: {
			name: 'Сырная',
			imageUrl:
				'https://media.dodostatic.net/image/r:233x233/11EE7D610CF7E265B7C72BE5AE757CA7.webp',
			categoryId: 1,
			ingredients: {
				connect: ingredients.slice(5, 10),
			},
		},
	});

	const pizza3 = await prisma.product.create({
		data: {
			name: 'Чоризо фреш',
			imageUrl:
				'https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp',
			categoryId: 1,
			ingredients: {
				connect: ingredients.slice(10, 40),
			},
		},
	});

	await prisma.productVariant.createMany({
		data: [
			// Пицца "Пепперони фреш"
			generateProductVariant({ productId: pizza1.id, productType: 1, productSize: 20 }),
			generateProductVariant({ productId: pizza1.id, productType: 2, productSize: 30 }),
			generateProductVariant({ productId: pizza1.id, productType: 2, productSize: 40 }),

			// Пицца "Сырная"
			generateProductVariant({ productId: pizza2.id, productType: 1, productSize: 20 }),
			generateProductVariant({ productId: pizza2.id, productType: 1, productSize: 30 }),
			generateProductVariant({ productId: pizza2.id, productType: 1, productSize: 40 }),
			generateProductVariant({ productId: pizza2.id, productType: 2, productSize: 20 }),
			generateProductVariant({ productId: pizza2.id, productType: 2, productSize: 30 }),
			generateProductVariant({ productId: pizza2.id, productType: 2, productSize: 40 }),

			// Пицца "Чоризо фреш"
			generateProductVariant({ productId: pizza3.id, productType: 1, productSize: 20 }),
			generateProductVariant({ productId: pizza3.id, productType: 2, productSize: 30 }),
			generateProductVariant({ productId: pizza3.id, productType: 2, productSize: 40 }),
		],
	});
}

async function down() {
	await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "ProductVariant" RESTART IDENTITY CASCADE`;
}

async function main() {
	try {
		await down();
		await up();
	} catch (e) {
		console.error(e);
	}
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
