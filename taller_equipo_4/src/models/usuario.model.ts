import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Sede} from './sede.model';
import {Vehiculo} from './vehiculo.model';
import {Cita} from './cita.model';
import {Revision} from './revision.model';

@model({settings: {strict: false}})
export class Usuario extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idUsuario: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    default: "Falta diligenciar el telefono",
  })
  telefono?: string;

  @property({
    type: 'date',
    default: "Falta ingresar una fecha",
  })
  fechaNacimiento?: string;

  @property({
    type: 'string',
    required: true,
  })
  contrasena: string;

  @belongsTo(() => Sede)
  sedeId: string;

  @hasMany(() => Vehiculo)
  vehiculos: Vehiculo[];

  @hasMany(() => Cita)
  citas: Cita[];

  @hasMany(() => Revision)
  revisions: Revision[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Usuario>) {
    super(data);
  }
}

export interface UsuarioRelations {
  // describe navigational properties here
}

export type UsuarioWithRelations = Usuario & UsuarioRelations;
