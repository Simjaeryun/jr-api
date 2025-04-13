import { PartialType } from '@nestjs/mapped-types';
import { CreateCartDto } from './create-cart.dto';

export class UpdateCartDto extends PartialType(CreateCartDto) {
  id: number; // 장바구니 ID
  customer_id: number; // 고객 ID
  product_id: number; // 상품 ID
  updated_at: Date; // 수정일
  qty: number; // 수량

  static to(dto: UpdateCartDto) {
    return {
      customer_id: dto.customer_id,
      product_id: dto.product_id,
      qty: dto.qty,
      updated_at: dto.updated_at,
    };
  }
}
