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
  name: 'products',
  orderBy: {
    created: 'DESC',
  },
})
export class Product {
  @PrimaryColumn()
  product_id: string;

  @Column()
  product_name: string;

  @Column()
  product_team_id: string;

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
