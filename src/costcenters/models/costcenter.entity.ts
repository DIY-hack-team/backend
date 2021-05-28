import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity({
  name: 'costcenters',
  orderBy: {
    code: 'DESC',
  },
})
export class Costcenter {
  @PrimaryGeneratedColumn()
  code: string;

  @Column()
  name: string;

  @Column()
  domain: string;
}
