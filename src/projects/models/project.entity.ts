import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity({
  name: 'projects',
  orderBy: {
    domainId: 'DESC',
  },
})
export class Project {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  itSystem: string;

  @Column()
  employee: string;

  @Column()
  status: string;
}
