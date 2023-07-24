import { BeforeInsert, Column, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity({ name: 'directors' })
export class DirectorMapping {
  @PrimaryColumn('uuid', { primary: true, name: 'id' })
  id: string;

  @Column('character varying', {
    name: 'name',
    length: 200,
  })
  name: string;

  @Column('character varying', { array: true, default: [], nullable: true })
  prizes: string[] | null;

  @Column('date', { name: 'birth_date' })
  birthDate: Date;

  @BeforeInsert()
  defaultUUID() {
    this.id = this.id || uuid();
  }
}
