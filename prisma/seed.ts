import prisma from "src/prisma";
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

// const addToData = (data: any, name: string) => {
//   data.forEach(async (element: any) => {
//     await prisma.post.createMany({
//       data: {
//         title: element.title,
//         image: element.urlToImage,
//         description: element.description,
//         slug: element.title,
//         categoryName: name,
//       },
//     });
//   });
// };

const createUser = async () => {
  await prisma.user.create({
    data: {
      name: "Yaser",
      email: "yaser@gmail.com",
      password: "mm+202020",
    },
  });
};

const createCategory = async () => {
  await prisma.category.create({
    data: {
      name: "sports",
    },
  });
};

const createPost = async () => {
  await prisma.post.create({
    data: {
      title: "2 post title",
      image:
        "https://www.aljazeera.net/wp-content/uploads/2019/11/601b96e9-0c6b-44c9-861f-9ce08d0a0180.jpeg?w=770&resize=770%2C433",
      description: "post dis",
      slug: "sss2dd",
      categoryName: "sports",
      userName: "Yaser",
      userEmail: "yaser@gmail.com",
    },
  });
};
async function main() {
  // await createUser();
  await prisma.business.deleteMany();
  // await createCategory();
  // await createPost();
  // await prisma.post.deleteMany();
  // await prisma.category.deleteMany();

  // await prisma.post.create({
  //   data: {
  //     title: "post title",
  //     image:
  //       "https://www.aljazeera.net/wp-content/uploads/2019/11/601b96e9-0c6b-44c9-861f-9ce08d0a0180.jpeg?w=770&resize=770%2C433",
  //     description: "post dis",
  //     slug: "sssslug",
  //     categoryName: "sports",
  //     userName: "Mohamad aljamal",
  //     userEmail: "mom@m.com",
  //   },
  // });
  // const sports = await getNews("sports");
  // const business = await getNews("business");
  // const science = await getNews("science");
  // const health = await getNews("health");
  // const technology = await getNews("technology");

  // addToData(sports, "sports");
  // addToData(business, "business");
  // addToData(science, "science");
  // addToData(health, "health");
  // addToData(technology, "technology");

  // ["sports", "business", "science", "health", "technology"].forEach(
  //   async (cat) => {
  // await prisma.category.create({
  //   data: {
  //     name: "sports",
  //   },
  // });
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
