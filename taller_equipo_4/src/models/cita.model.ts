import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Vehiculo} from './vehiculo.model';
import {Usuario} from './usuario.model';

@model({settings: {strict: false}})
export class Cita extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idCita: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
    required: true,
  })
  hora: string;

  @belongsTo(() => Vehiculo)
  vehiculoId: string;

  @belongsTo(() => Usuario)
  usuarioId: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Cita>) {
    super(data);
  }
}

export interface CitaRelations {
  // describe navigational properties here
}

export type CitaWithRelations = Cita & CitaRelations;
