export interface ICategory {
  id: number;
  attributes: {
    title: string;
  };
}

export interface IThumbnail {
  data: {
    attributes: {
      url: string;
    };
  };
}

export interface IProductAttributes {
  title: string;
  description: string;
  price: number;
  stock?: number;
  thumbnail: IThumbnail;
  categories: {
    data: ICategory[];
  };
}

export interface IProduct {
  id: number;
  attributes: IProductAttributes;
}

export interface IProductsResponse {
  data: IProduct[];
  meta: {
    pagination: {
      total: number;
    };
  };
}
