import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity({
  name: 'employees',
  orderBy: {
    id: 'DESC',
  },
})
export class Employee {
  @PrimaryGeneratedColumn()
  ldap: number;

  @Column()
  userName: string;

  @Column()
  legalEntity: string;

  @Column()
  organisation: string;

  @Column()
  businessRole: string;

  @Column()
  costCenter: string;
}
