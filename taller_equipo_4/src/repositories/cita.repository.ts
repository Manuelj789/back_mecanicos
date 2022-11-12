import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Cita, CitaRelations, Vehiculo, Usuario} from '../models';
import {VehiculoRepository} from './vehiculo.repository';
import {UsuarioRepository} from './usuario.repository';

export class CitaRepository extends DefaultCrudRepository<
  Cita,
  typeof Cita.prototype.idCita,
  CitaRelations
> {

  public readonly vehiculo: BelongsToAccessor<Vehiculo, typeof Cita.prototype.idCita>;

  public readonly usuario: BelongsToAccessor<Usuario, typeof Cita.prototype.idCita>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>,
  ) {
    super(Cita, dataSource);
    this.usuario = this.createBelongsToAccessorFor('usuario', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuario', this.usuario.inclusionResolver);
    this.vehiculo = this.createBelongsToAccessorFor('vehiculo', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('vehiculo', this.vehiculo.inclusionResolver);
  }
}
