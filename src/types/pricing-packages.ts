export interface Package {
  id: number;
  name: string;
  duration: string;
  validity: string;
  price: number;
  isCustom?: boolean;
}
