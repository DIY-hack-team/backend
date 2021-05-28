import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity({
  name: 'domains',
  orderBy: {
    domain_id: 'DESC',
  },
})
export class Domain {
  @PrimaryGeneratedColumn()
  domain_id: string;

  @Column()
  domain_tag: string;

  @Column()
  domain_name: string;

  @Column()
  domain_name_rus: string;

  @Column()
  status: string;
}
