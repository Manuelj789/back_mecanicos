import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Vehiculo, VehiculoRelations, Usuario, Revision, Repuesto, Cita} from '../models';
import {UsuarioRepository} from './usuario.repository';
import {RevisionRepository} from './revision.repository';
import {RepuestoRepository} from './repuesto.repository';
import {CitaRepository} from './cita.repository';

export class VehiculoRepository extends DefaultCrudRepository<
  Vehiculo,
  typeof Vehiculo.prototype.idVehiculo,
  VehiculoRelations
> {

  public readonly usuario: BelongsToAccessor<Usuario, typeof Vehiculo.prototype.idVehiculo>;

  public readonly revisions: HasManyRepositoryFactory<Revision, typeof Vehiculo.prototype.idVehiculo>;

  public readonly repuestos: HasManyRepositoryFactory<Repuesto, typeof Vehiculo.prototype.idVehiculo>;

  public readonly citas: HasManyRepositoryFactory<Cita, typeof Vehiculo.prototype.idVehiculo>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>, @repository.getter('RevisionRepository') protected revisionRepositoryGetter: Getter<RevisionRepository>, @repository.getter('RepuestoRepository') protected repuestoRepositoryGetter: Getter<RepuestoRepository>, @repository.getter('CitaRepository') protected citaRepositoryGetter: Getter<CitaRepository>,
  ) {
    super(Vehiculo, dataSource);
    this.citas = this.createHasManyRepositoryFactoryFor('citas', citaRepositoryGetter,);
    this.registerInclusionResolver('citas', this.citas.inclusionResolver);
    this.repuestos = this.createHasManyRepositoryFactoryFor('repuestos', repuestoRepositoryGetter,);
    this.registerInclusionResolver('repuestos', this.repuestos.inclusionResolver);
    this.revisions = this.createHasManyRepositoryFactoryFor('revisions', revisionRepositoryGetter,);
    this.registerInclusionResolver('revisions', this.revisions.inclusionResolver);
    this.usuario = this.createBelongsToAccessorFor('usuario', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuario', this.usuario.inclusionResolver);
  }
}
