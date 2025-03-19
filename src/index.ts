import fetch from "node-fetch";

// Задание #1

/* Напишите и типизируйте функцию, рассчитывающую стоимость с учетом скидки и рассрочки на заданное количество месяцев */

interface TotalPriceProps {
  price: number;
  discount: number;
  isInstallment: boolean;
  months: number;
}

const totalPrice = ({
  price,
  discount,
  isInstallment,
  months,
}: TotalPriceProps): number => {
  if (isInstallment) {
    let installment = Math.round(price / months);
    let sale = Math.round((discount * installment) / 100);
    return installment - sale;
  }
  return (discount * price) / 100;
};
const price = totalPrice({
  price: 100000,
  discount: 25,
  isInstallment: true,
  months: 12,
});
console.log(price); // 6250

// Задание #2

/* Напишите и типизируйте функцию, нормализующую входящие данные */

interface NormalizedData {
  id: string;
  title: string;
  body: string;
}

interface NormalizedDataReturn {
  byId: NormalizeDataById;
  allIds: string[];
}

type NormalizeDataById = {
  [key: string]: NormalizedData;
};

const posts = [
  {
    id: "62e69d5a5458aac0ed320b35",
    title: "id labore ex et quam laborum",
    body: "laudantium enim quasi est quidem magnam voluptate ipsam eostempora quo necessitatibusdolor quam autem quasireiciendis et nam sapiente accusantium",
  },
  {
    id: "62e69d5a5458aac0ed320b1c",
    title: "quo vero reiciendis velit similique earum",
    body: "est natus enim nihil est dolore omnis voluptatem numquamet omnis occaecati quod ullam at voluptatem error expedita pariaturnihil sint nostrum voluptatem reiciendis et",
  },
  {
    id: "62e69d5a5458aac0ed320b32",
    title: "odio adipisci rerum aut animi",
    body: "quia molestiae reprehenderit quasi aspernaturaut expedita occaecati aliquam eveniet laudantiumomnis quibusdam delectus saepe quia accusamus maiores nam estcum et ducimus et vero voluptates excepturi deleniti ratione",
  },
  {
    id: "62e69d5a5458aac0ed320b39",
    title: "alias odio sit",
    body: "non et atqueoccaecati deserunt quas accusantium unde odit nobis qui voluptatemquia voluptas consequuntur itaque doloret qui rerum deleniti ut occaecati",
  },
  {
    id: "62e69d5a5458aac0ed320b53",
    title: "vero eaque aliquid doloribus et culpa",
    body: "harum non quasi et rationetempore iure ex voluptates in rationeharum architecto fugit inventore cupiditatevoluptates magni quo et",
  },
  {
    id: "62e69d5a5458aac0ed320b19",
    title: "et fugit eligendi deleniti quidem qui sint nihil autem",
    body: "doloribus at sed quis culpa deserunt consectetur qui praesentiumaccusamus fugiat dictavoluptatem rerum ut voluptate autemvoluptatem repellendus aspernatur dolorem in",
  },
  {
    id: "62e69d5a5458aac0ed320b25",
    title: "repellat consequatur praesentium vel minus molestias voluptatum",
    body: "maiores sed dolores similique labore et inventore etquasi temporibus esse sunt id eteos voluptatem aliquamratione corporis molestiae mollitia quia et magnam dolor",
  },
];

const normalizeData = (
  unnormalizedData: NormalizedData[]
): NormalizedDataReturn => {
  return {
    byId: unnormalizedData.reduce<NormalizeDataById>((acc, post) => {
      acc[post.id] = { id: post.id, title: post.title, body: post.body };
      return acc;
    }, {}),
    allIds: unnormalizedData.reduce<string[]>((acc, post) => {
      acc.push(post.id);
      return acc;
    }, []),
  };
};

console.log(normalizeData(posts));
/**
 * {
 *    byId: {
 *      62e69d5a5458aac0ed320b35: { id: '...', title: '...', body: '...' },
 *      62e69d5a5458aac0ed320b1c: { id: '...', title: '...', body: '...' },
 *      ...
 *    },
 *    allIds: ['62e69d5a5458aac0ed320b35', '62e69d5a5458aac0ed320b1c', ...]
 * }
 */

// Задание #3

/* Напишите и типизируйте функцию, выполняющую запрос за данными по переданному URL. Выведите их в консоль в формате: "ID: id, Email: email" */

const COMMENTS_URL = "https://jsonplaceholder.typicode.com/comments";

interface CommentsData {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

const getData = async (url: string): Promise<CommentsData[]> => {
  const response = await fetch(url);
  return (await response.json()) as CommentsData[];
};

getData(COMMENTS_URL).then((data) => {
  const result = data.map((comment) => {
    return { ID: comment.id, Email: comment.email };
  });
  console.log(result);
});

/**
 * ID: 1, Email: Eliseo...
 * ID: 2, Email: Jayne_Kuhic...
 * ID: 3, Email: Nikita...
 * ID: 4, Email: Lew...
 * ...
 */
