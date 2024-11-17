declare type FeatureCardProps = {
  image: string;
  cardTitle: string;
  cardDesc: string;
  alt: string;
}

declare type LoginData = {
  email: string;
  password: string;
}

declare interface RegisterData extends LoginData {
  name: string;
  confirm_password: string;
}