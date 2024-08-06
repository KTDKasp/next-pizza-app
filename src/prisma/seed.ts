import { hashSync } from 'bcrypt';
import { categories, ingredients, products } from './constants';
import { Prisma } from '@prisma/client';
import { prisma } from './prisma-client';

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

			// Остальные продукты
      generateProductVariant({ productId: 1 }),
      generateProductVariant({ productId: 2 }),
      generateProductVariant({ productId: 3 }),
      generateProductVariant({ productId: 4 }),
      generateProductVariant({ productId: 5 }),
      generateProductVariant({ productId: 6 }),
      generateProductVariant({ productId: 7 }),
      generateProductVariant({ productId: 8 }),
      generateProductVariant({ productId: 9 }),
      generateProductVariant({ productId: 10 }),
      generateProductVariant({ productId: 11 }),
      generateProductVariant({ productId: 12 }),
      generateProductVariant({ productId: 13 }),
      generateProductVariant({ productId: 14 }),
      generateProductVariant({ productId: 15 }),
      generateProductVariant({ productId: 16 }),
      generateProductVariant({ productId: 17 }),
		],
	});

	await prisma.cart.createMany({
		data: [
			{
				userId: 1,
				tokenId: "111111",
				totalAmount: 0,
			},
			{
				userId: 2,
				tokenId: "22222222",
				totalAmount: 0,
			}
		]
	});

	await prisma.cartItem.create({
		data: {
				productVariantId: 1,
				cartId: 1,
				quantity: 2,
				ingredients: {
					connect: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
				}
			}
		
	})
}

async function down() {
	await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
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
