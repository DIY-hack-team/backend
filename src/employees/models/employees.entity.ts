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
  name: 'employees',
  orderBy: {
    created: 'DESC',
  },
})
export class Employee {
  @PrimaryColumn()
  ldap: number;

  @Column()
  name: string;

  @Column()
  legal_entity: string;

  @Column()
  organisation: string;

  @Column()
  business_role: string;

  @Column()
  cost_center: string;

  @Index()
  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @VersionColumn()
  version: number;
}
