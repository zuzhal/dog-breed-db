export interface IDog {
  weight: {
    imperial: string;
    metric: string;
  };
  height: {
    imperial: string;
    metric: string;
  };
  id: number;
  name: string;
  bred_for: string;
  breed_group: string;
  life_span: string;
  temperament: string;
  origin: string;
  reference_image_id: string;
}

interface IBreedDetail {
  weight: {
    imperial: string;
    metric: string;
  };
  height: {
    imperial: string;
    metric: string;
  };
  id: number;
  name: string;
  bred_for: string;
  breed_group: string;
  life_span: string;
  temperament: string;
  origin: string;
  reference_image_id: string;
}

interface IDogImageDetail {
  id: string;
  url: string;
  width: number;
  height: number;
}

export interface IDogImageDetailAPI extends IDogImageDetail {
  breeds: IBreedDetail[];
}

export interface IDogImageDetailFE extends IDogImageDetail {
  breeds: IBreedDetail;
}