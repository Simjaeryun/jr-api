export class CreateCartDto {
  customer_id: number;
  product_id: number;
  unit_price: number;
  qty: number;
  created_at: Date;
  updated_at: Date;

  static to(dto: CreateCartDto) {
    return {
      customer_id: dto.customer_id,
      product_id: dto.product_id,
      unit_price: dto.unit_price,
      qty: dto.qty,
      created_at: new Date(dto.created_at),
      updated_at: new Date(dto.updated_at),
    };
  }
}
