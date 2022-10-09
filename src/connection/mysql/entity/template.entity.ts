import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
@Entity('_Template')
export class _Template {
  constructor(fields?: Partial<_Template> & Pick<_Template, 'name' | 'age'>) {
    Object.assign(this, fields)
  }

  @PrimaryGeneratedColumn({ type: 'int' })
  id!: number

  @Column('text')
  name!: string

  @Column('int')
  age!: number
}
