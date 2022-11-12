import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Usuario, UsuarioRelations, Vehiculo, Cita, Revision, Sede} from '../models';
import {VehiculoRepository} from './vehiculo.repository';
import {CitaRepository} from './cita.repository';
import {RevisionRepository} from './revision.repository';
import {SedeRepository} from './sede.repository';

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype.idUsuario,
  UsuarioRelations
> {

  public readonly vehiculos: HasManyRepositoryFactory<Vehiculo, typeof Usuario.prototype.idUsuario>;

  public readonly citas: HasManyRepositoryFactory<Cita, typeof Usuario.prototype.idUsuario>;

  public readonly revisions: HasManyRepositoryFactory<Revision, typeof Usuario.prototype.idUsuario>;

  public readonly sedes: BelongsToAccessor<Sede, typeof Usuario.prototype.idUsuario>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>, @repository.getter('CitaRepository') protected citaRepositoryGetter: Getter<CitaRepository>, @repository.getter('RevisionRepository') protected revisionRepositoryGetter: Getter<RevisionRepository>,
  ) {
    super(Usuario, dataSource);
    this.revisions = this.createHasManyRepositoryFactoryFor('revisions', revisionRepositoryGetter,);
    this.registerInclusionResolver('revisions', this.revisions.inclusionResolver);
    this.citas = this.createHasManyRepositoryFactoryFor('citas', citaRepositoryGetter,);
    this.registerInclusionResolver('citas', this.citas.inclusionResolver);
    this.vehiculos = this.createHasManyRepositoryFactoryFor('vehiculos', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('vehiculos', this.vehiculos.inclusionResolver);
    
  }
}
