import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Vehiculo,
  Repuesto,
} from '../models';
import {VehiculoRepository} from '../repositories';

export class VehiculoRepuestoController {
  constructor(
    @repository(VehiculoRepository) protected vehiculoRepository: VehiculoRepository,
  ) { }

  @get('/vehiculos/{id}/repuestos', {
    responses: {
      '200': {
        description: 'Array of Vehiculo has many Repuesto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Repuesto)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Repuesto>,
  ): Promise<Repuesto[]> {
    return this.vehiculoRepository.repuestos(id).find(filter);
  }

  @post('/vehiculos/{id}/repuestos', {
    responses: {
      '200': {
        description: 'Vehiculo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Repuesto)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Vehiculo.prototype.idVehiculo,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Repuesto, {
            title: 'NewRepuestoInVehiculo',
            exclude: ['idRepuesto'],
            optional: ['vehiculoId']
          }),
        },
      },
    }) repuesto: Omit<Repuesto, 'idRepuesto'>,
  ): Promise<Repuesto> {
    return this.vehiculoRepository.repuestos(id).create(repuesto);
  }

  @patch('/vehiculos/{id}/repuestos', {
    responses: {
      '200': {
        description: 'Vehiculo.Repuesto PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Repuesto, {partial: true}),
        },
      },
    })
    repuesto: Partial<Repuesto>,
    @param.query.object('where', getWhereSchemaFor(Repuesto)) where?: Where<Repuesto>,
  ): Promise<Count> {
    return this.vehiculoRepository.repuestos(id).patch(repuesto, where);
  }

  @del('/vehiculos/{id}/repuestos', {
    responses: {
      '200': {
        description: 'Vehiculo.Repuesto DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Repuesto)) where?: Where<Repuesto>,
  ): Promise<Count> {
    return this.vehiculoRepository.repuestos(id).delete(where);
  }
}
