import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  Index,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
@Entity({
  name: 'projects',
  orderBy: {
    created: 'DESC',
  },
})
export class Project {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  it_system: string;

  @Column()
  employee: string;

  @Column()
  status: string;

  @Index()
  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @VersionColumn()
  version: number;
}
