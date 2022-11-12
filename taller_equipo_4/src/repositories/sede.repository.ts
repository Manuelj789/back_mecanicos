import {inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Sede, SedeRelations, Usuario} from '../models';
import {UsuarioRepository} from './usuario.repository';

export class SedeRepository extends DefaultCrudRepository<
  Sede,
  typeof Sede.prototype.idSede,
  SedeRelations
> {

  public readonly usuario: HasManyRepositoryFactory<Usuario, typeof Sede.prototype.idSede>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Sede, dataSource);
  }
}
