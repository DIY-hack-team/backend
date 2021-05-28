import {
  Entity,
  Column,
  PrimaryColumn,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn,
  ManyToMany,
} from 'typeorm';
import { Employee } from '../../employees/models/employees.entity';

@Entity({
  name: 'domains',
  orderBy: {
    created: 'DESC',
  },
})
export class Domain {
  @PrimaryColumn()
  domain_id: string;

  @Column()
  domain_tag: string;

  @Column()
  domain_name: string;

  @Column()
  domain_name_rus: string;

  @Column()
  status: string;

  @Index()
  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @VersionColumn()
  version: number;

  @ManyToMany(() => Employee, (employee) => employee.domains)
  employees: Array<Employee>;
}
