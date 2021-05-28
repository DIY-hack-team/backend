import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity({
  name: 'domains',
  orderBy: {
    domainId: 'DESC',
  },
})
export class Domain {
  @PrimaryGeneratedColumn()
  domainId: string;

  @Column()
  domainTag: string;

  @Column()
  domainName: string;

  @Column()
  domainNameRus: string;

  @Column()
  status: string;
}
