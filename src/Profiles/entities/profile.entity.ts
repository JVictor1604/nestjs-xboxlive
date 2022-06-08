import { Jogos, User } from "@prisma/client";

export class Profile {
  id?: string;
  title: string;
  image: string;
  user?: User;
  jogos?: Jogos;
  createdAt?: Date;
  updatedAt?: Date;
}
