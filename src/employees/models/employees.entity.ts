import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity({
  name: 'employees',
  orderBy: {
    ldap: 'DESC',
  },
})
export class Employee {
  @PrimaryGeneratedColumn()
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
}
