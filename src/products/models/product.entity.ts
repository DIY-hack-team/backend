import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity({
  name: 'products',
  orderBy: {
    productId: 'DESC',
  },
})
export class Product {
  @PrimaryGeneratedColumn()
  productId: string;

  @Column()
  productName: string;

  @Column()
  productTeamId: string;

  @Column()
  status: string;
}
