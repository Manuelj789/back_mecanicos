import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Usuario} from './usuario.model';
import {Revision} from './revision.model';
import {Repuesto} from './repuesto.model';
import {Cita} from './cita.model';

@model({settings: {strict: false}})
export class Vehiculo extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idVehiculo: string;

  
  @property({
    type: 'string',
    required: true,
  })
  placa: string;

  @property({
    type: 'string',
  })
  tipo?: string;

  @property({
    type: 'string',
  })
  color?: string;

  @property({
    type: 'string',
  })
  marca?: string;

  @property({
    type: 'string',
  })
  modelo?: string;

  @property({
    type: 'string',
  })
  cilindraje?: string;

  @property({
    type: 'string',
  })
  capacidad?: string;

  @belongsTo(() => Usuario)
  usuarioId: string;

  @hasMany(() => Revision)
  revisions: Revision[];

  @hasMany(() => Repuesto)
  repuestos: Repuesto[];

  @hasMany(() => Cita)
  citas: Cita[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Vehiculo>) {
    super(data);
  }
}

export interface VehiculoRelations {
  // describe navigational properties here
}

export type VehiculoWithRelations = Vehiculo & VehiculoRelations;
