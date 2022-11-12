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
  Usuario,
  Cita,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioCitaController {
  constructor(
    @repository(UsuarioRepository) protected usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/citas', {
    responses: {
      '200': {
        description: 'Array of Usuario has many Cita',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cita)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Cita>,
  ): Promise<Cita[]> {
    return this.usuarioRepository.citas(id).find(filter);
  }

  @post('/usuarios/{id}/citas', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Cita)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Usuario.prototype.idUsuario,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cita, {
            title: 'NewCitaInUsuario',
            exclude: ['idCita'],
            optional: ['usuarioId']
          }),
        },
      },
    }) cita: Omit<Cita, 'idCita'>,
  ): Promise<Cita> {
    return this.usuarioRepository.citas(id).create(cita);
  }

  @patch('/usuarios/{id}/citas', {
    responses: {
      '200': {
        description: 'Usuario.Cita PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cita, {partial: true}),
        },
      },
    })
    cita: Partial<Cita>,
    @param.query.object('where', getWhereSchemaFor(Cita)) where?: Where<Cita>,
  ): Promise<Count> {
    return this.usuarioRepository.citas(id).patch(cita, where);
  }

  @del('/usuarios/{id}/citas', {
    responses: {
      '200': {
        description: 'Usuario.Cita DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Cita)) where?: Where<Cita>,
  ): Promise<Count> {
    return this.usuarioRepository.citas(id).delete(where);
  }
}
