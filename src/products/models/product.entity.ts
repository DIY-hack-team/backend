import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity({
  name: 'products',
  orderBy: {
    product_id: 'DESC',
  },
})
export class Product {
  @PrimaryGeneratedColumn()
  product_id: string;

  @Column()
  product_name: string;

  @Column()
  product_team_id: string;

  @Column()
  status: string;
}
