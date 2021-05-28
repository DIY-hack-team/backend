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
  name: 'prodteams',
  orderBy: {
    created: 'DESC',
  },
})
export class ProdTeam {
  @PrimaryColumn()
  product_team_id: string;

  @Column()
  product_team_name: string;

  @Column()
  product_team_rus: string;

  @Column()
  product_team_type: string;

  @Column()
  cost_center: string;

  @Column()
  status: string;

  @Column()
  domain_id: string;

  @Index()
  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @VersionColumn()
  version: number;
}
