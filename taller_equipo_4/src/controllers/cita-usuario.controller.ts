import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Cita,
  Usuario,
} from '../models';
import {CitaRepository} from '../repositories';

export class CitaUsuarioController {
  constructor(
    @repository(CitaRepository)
    public citaRepository: CitaRepository,
  ) { }

  @get('/citas/{id}/usuario', {
    responses: {
      '200': {
        description: 'Usuario belonging to Cita',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuario)},
          },
        },
      },
    },
  })
  async getUsuario(
    @param.path.string('id') id: typeof Cita.prototype.idCita,
  ): Promise<Usuario> {
    return this.citaRepository.usuario(id);
  }
}
