export interface IProduct {
  id?: number;
  attributes: {
    title: string;
    description: string;
    price: number;
    thumbnail: { data: { attributes: { url: string } } };
    categories: { data: { attributes: { title: string } } };
  };
}
