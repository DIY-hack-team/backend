import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity({
  name: 'prodteams',
  orderBy: {
    product_team_id: 'DESC',
  },
})
export class ProdTeam {
  @PrimaryGeneratedColumn()
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
}
