import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity({
  name: 'prodteams',
  orderBy: {
    productTeamId: 'DESC',
  },
})
export class ProdTeam {
  @PrimaryGeneratedColumn()
  prodTeamId: string;

  @Column()
  prodTeamName: string;

  @Column()
  prodTeamRus: string;

  @Column()
  prodTeamType: string;

  @Column()
  costCenter: string;

  @Column()
  status: string;

  @Column()
  domainId: string;
}
