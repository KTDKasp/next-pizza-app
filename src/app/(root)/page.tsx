import {
  Container,
  Filters,
  ProductsCardList,
  Title,
  TopBar,
} from '@/components/shared';
import { prisma } from '@/prisma/prisma-client';
import { Suspense } from 'react';

export default async function Home() {
  const categories = await prisma.category.findMany({
    include: {
      products: {
        include: {
          ingredients: true,
          variants: true,
        },
      },
    },
  });

  return (
    <>
      <Container>
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>

      <TopBar
        categories={categories.filter(
          (category) => category.products.length > 0
        )}
      />

      <Container className="pb-14">
        <div className="flex gap-12">
          {/* Filters */}
          <div className="w-[245px]">
            <Suspense>
              <Filters />
            </Suspense>
          </div>

          {/* Pizzas */}
          <div className="flex-1">
            <div className="flex flex-col gap-[50px]">
              {categories.map(
                (category) =>
                  category.products.length > 0 && (
                    <ProductsCardList
                      key={category.id}
                      categoryId={category.id}
                      title={category.name}
                      productItems={category.products}
                    />
                  )
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

// # TODO: Глобально исправить добавление товара в корзину и его рендер в корзине, 10:32:00
