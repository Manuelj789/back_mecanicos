import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Vehiculo} from '../models';
import {VehiculoRepository} from '../repositories';

export class VehiculosController {
  constructor(
    @repository(VehiculoRepository)
    public vehiculoRepository : VehiculoRepository,
  ) {}

  @post('/vehiculos')
  @response(200, {
    description: 'Vehiculo model instance',
    content: {'application/json': {schema: getModelSchemaRef(Vehiculo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehiculo, {
            title: 'NewVehiculo',
            
          }),
        },
      },
    })
    vehiculo: Vehiculo,
  ): Promise<Vehiculo> {
    return this.vehiculoRepository.create(vehiculo);
  }

  @get('/vehiculos/count')
  @response(200, {
    description: 'Vehiculo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Vehiculo) where?: Where<Vehiculo>,
  ): Promise<Count> {
    return this.vehiculoRepository.count(where);
  }

  @get('/vehiculos')
  @response(200, {
    description: 'Array of Vehiculo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Vehiculo, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Vehiculo) filter?: Filter<Vehiculo>,
  ): Promise<Vehiculo[]> {
    return this.vehiculoRepository.find(filter);
  }

  @patch('/vehiculos')
  @response(200, {
    description: 'Vehiculo PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehiculo, {partial: true}),
        },
      },
    })
    vehiculo: Vehiculo,
    @param.where(Vehiculo) where?: Where<Vehiculo>,
  ): Promise<Count> {
    return this.vehiculoRepository.updateAll(vehiculo, where);
  }

  @get('/vehiculos/{id}')
  @response(200, {
    description: 'Vehiculo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Vehiculo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Vehiculo, {exclude: 'where'}) filter?: FilterExcludingWhere<Vehiculo>
  ): Promise<Vehiculo> {
    return this.vehiculoRepository.findById(id, filter);
  }



  // @get('/vehiculos/placa')
  // @response(200, {
  //   description: 'Vehiculo model instance',
  //   content: {
  //     'application/json': {
  //       schema: getModelSchemaRef(Vehiculo, {includeRelations: true}),
  //     },
  //   },
  // })
  // async findOne(
  //   @param.path.string('placa') placa: string,
  //   @param.filter(Vehiculo, {where{placa:placa}}) filter?: FilterExcludingWhere<Vehiculo>
  // ): Promise<Vehiculo> {
  //   return this.vehiculoRepository.findOne(filter ? : placa);
  // }




  @patch('/vehiculos/{id}')
  @response(204, {
    description: 'Vehiculo PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehiculo, {partial: true}),
        },
      },
    })
    vehiculo: Vehiculo,
  ): Promise<void> {
    await this.vehiculoRepository.updateById(id, vehiculo);
  }

  @put('/vehiculos/{id}')
  @response(204, {
    description: 'Vehiculo PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() vehiculo: Vehiculo,
  ): Promise<void> {
    await this.vehiculoRepository.replaceById(id, vehiculo);
  }

  @del('/vehiculos/{id}')
  @response(204, {
    description: 'Vehiculo DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.vehiculoRepository.deleteById(id);
  }
}
