import { User } from "@prisma/client";

export class Profile {
  id?: string;
  title: string;
  image: string;
  user?: User;
  createdAt?: Date;
  updatedAt?: Date;
}
