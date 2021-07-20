import { PrismaClient } from "@prisma/client";
import axios from "axios";
const getNews = async (type: string) => {
  try {
    const res = await axios.get(
      `https://newsapi.org/v2/top-headlines?category=${type}&language=ar&pageSize=10&apiKey=ee6363597a774d4f84f9afe80b870206`
    );
    return res.data.articles;
  } catch (error) {
    return null;
  }
};

const prisma = new PrismaClient();

const addToData = (data: any, name: string) => {
  data.forEach(async (element: any) => {
    await prisma.post.createMany({
      data: {
        title: element.title,
        image: element.urlToImage,
        description: element.description,
        slug: element.title,
        categoryName: name,
      },
    });
  });
};

async function main() {
  await prisma.post.deleteMany();
  // await prisma.category.deleteMany();

  const sports = await getNews("sports");
  const business = await getNews("business");
  const science = await getNews("science");
  const health = await getNews("health");
  const technology = await getNews("technology");

  addToData(sports, "sports");
  addToData(business, "business");
  addToData(science, "science");
  addToData(health, "health");
  addToData(technology, "technology");

  // ["sports", "business", "science", "health", "technology"].forEach(
  //   async (cat) => {
  //     await prisma.category.create({
  //       data: {
  //         name: cat,
  //       },
  //     });
  //   }
  // );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
