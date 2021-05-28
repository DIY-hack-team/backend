import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity({
  name: 'projects',
  orderBy: {
    id: 'DESC',
  },
})
export class Project {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  it_system: string;

  @Column()
  employee: string;

  @Column()
  status: string;
}
