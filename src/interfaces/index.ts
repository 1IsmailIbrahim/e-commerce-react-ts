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
  // quantity?: number | undefined;
}

export interface IProductsResponse {
  data: IProduct[];
  meta: {
    pagination: {
      total: number;
    };
  };
}

export interface ICategoryResponse {
  data: ICategory[];
}

export interface IUser {
  id: number;
  attributes: {
    username: string;
    email: string;
  };
}

export interface IUsersResponse {
  data: IUser[];
  length: number;
}
