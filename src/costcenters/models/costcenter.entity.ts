import {
  Entity,
  Column,
  PrimaryColumn,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
@Entity({
  name: 'costcenters',
  orderBy: {
    сreated: 'DESC',
  },
})
export class Costcenter {
  @PrimaryColumn()
  code: string;

  @Column()
  name: string;

  @Column()
  domain: string;

  @Index()
  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @VersionColumn()
  version: number;
}
