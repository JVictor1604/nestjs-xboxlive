import { Genero } from "src/Genero/entities/genero.entity";

export class Jogos {
    id?: string;
    title: string;
    coverimgUrl: string;
    description: string;
    year: number;
    imdbScore: number;
    gameplayYouTubeUrl: string;
    trailerYouTubeUrl: string;
    genres: Genero[];
    createdAt?: Date;
    updatedAt?: Date;
  }