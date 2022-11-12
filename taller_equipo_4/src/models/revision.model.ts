import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Vehiculo} from './vehiculo.model';
import {Usuario} from './usuario.model';

@model({settings: {strict: false}})
export class Revision extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idRevision?: string;

  @property({
    type: 'string',
  })
  nivelAceite?: string;

  @property({
    type: 'string',
  })
  nivelRefrig?: string;

  @property({
    type: 'string',
  })
  nivelFrenos?: string;

  @property({
    type: 'string',
  })
  nivelDireccion?: string;

  @belongsTo(() => Vehiculo)
  vehiculoId: string;

  @belongsTo(() => Usuario)
  usuarioId: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Revision>) {
    super(data);
  }
}

export interface RevisionRelations {
  // describe navigational properties here
}

export type RevisionWithRelations = Revision & RevisionRelations;
