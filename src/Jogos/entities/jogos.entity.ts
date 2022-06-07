import { Genero } from "src/Genero/entities/genero.entity";

export class Jogos {
    id?: string;
    title: string;
    description: string;
    year: number;
    imdbScore: number;
    gameplayYouTubeUrl: string;
    genres: Genero[];
    createdAt?: Date;
    updatedAt?: Date;
  }