// import { DatabaseConnection } from '~/shared/application/database/contracts/database-conection';
// import { EntityManager } from 'typeorm';
// import { v4 as uuid } from 'uuid';
// import { BaseTransaction } from '../../contracts/base-transaction';
// import {
//   ReviewMapping,
//   DirectorMapping,
//   MovieMapping,
// } from '~/shared/infra/database/typeorm/mapping';
// import { Director, Movie, Review } from '~/catalog/domain';

// export class WriteReviewTransactionAdapter extends BaseTransaction<
//   WriteReviewTransactionAdapter.InputDTO,
//   WriteReviewTransactionAdapter.OutputDTO
// > {
//   constructor(connection: DatabaseConnection) {
//     super(connection);
//   }

//   async execute(
//     { authorName, text, movie }: WriteReviewTransactionAdapter.InputDTO,
//     manager: EntityManager,
//   ) {
//     const directorRepository = await manager.getRepository(DirectorMapping);
//     const directorExists = await directorRepository.findOne({
//       where: {
//         name: movie?.director?.name,
//         birthDate: movie?.director?.birthDate,
//       },
//     });

//     const directorInstance = Director.create(
//       directorExists ?? {
//         id: uuid(),
//         name: movie.director.name,
//         birthDate: movie.director.birthDate,
//         prizes: movie.director.prizes,
//       },
//     );
//     const movieRepository = manager.getRepository(MovieMapping);
//     const movieExists = await movieRepository.findOne({
//       where: {
//         name: movie.name,
//         premiereDate: movie.premiereDate,
//       },
//     });

//     const movieInstance = Movie.create(
//       movieExists ?? {
//         id: uuid(),
//         name: movie.name,
//         premiereDate: movie.premiereDate,
//         directorId: directorInstance.getState().id,
//       },
//     );
//     const reviewInstance = Review.create({
//       id: uuid(),
//       authorName,
//       text,
//       movieId: movieInstance.getState().id,
//     });

//     await manager.save(DirectorMapping, directorInstance.getState());
//     await manager.save(MovieMapping, movieInstance.getState());
//     await manager.upsert(ReviewMapping, reviewInstance.getState(), {
//       conflictPaths: ['authorName', 'movieId'],
//     });

//     return reviewInstance.getState();
//   }
// }

// export namespace WriteReviewTransactionAdapter {
//   export type InputDTO = {
//     authorName: string;
//     text: string;
//     movie: Movie;
//   };
//   export type Movie = {
//     name: string;
//     premiereDate: Date;
//     director: Director;
//   };
//   export type Director = {
//     name: string;
//     birthDate: Date;
//     prizes: string[];
//   };
//   export type OutputDTO = {
//     authorName: string;
//     text: string;
//     movieId: string;
//     id: string;
//   };
// }
