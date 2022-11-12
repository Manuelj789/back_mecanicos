import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Repuesto,
  Vehiculo,
} from '../models';
import {RepuestoRepository} from '../repositories';

export class RepuestoVehiculoController {
  constructor(
    @repository(RepuestoRepository)
    public repuestoRepository: RepuestoRepository,
  ) { }

  @get('/repuestos/{id}/vehiculo', {
    responses: {
      '200': {
        description: 'Vehiculo belonging to Repuesto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vehiculo)},
          },
        },
      },
    },
  })
  async getVehiculo(
    @param.path.string('id') id: typeof Repuesto.prototype.idRepuesto,
  ): Promise<Vehiculo> {
    return this.repuestoRepository.vehiculo(id);
  }
}
