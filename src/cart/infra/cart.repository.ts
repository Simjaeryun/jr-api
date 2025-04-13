import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/db/prisma.service';
import { cart, Prisma } from '@prisma/client';
import { CreateCartDto } from '../dto/create-cart.dto';
import { DeleteCartDto } from '../dto/delete-cart.dto';
import { UpdateCartDto } from '../dto/update-cart.dto';

@Injectable()
export class CartRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getCartById(id: number): Promise<cart> {
    const cartInfo = await this.prisma.cart.findUnique({
      where: { id: id },
    });

    if (!cartInfo) {
      throw new NotFoundException('Cart not found');
    }

    return cartInfo;
  }

  async createCart(cart: CreateCartDto): Promise<cart> {
    return this.prisma.cart.create({ data: CreateCartDto.to(cart) });
  }

  async updateCart(cart: UpdateCartDto): Promise<boolean> {
    const result = await this.prisma.cart.update({
      where: {
        id: cart.id,
      },
      data: {
        qty: cart.qty,
        unit_price: cart.unit_price,
        updated_at: new Date(),
      },
    });

    return result ? true : false;
  }

  // delete는 단일 레코드를 삭제하며 해당 레코드가 없으면 에러를 발생시킵니다.
  // deleteMany는 조건에 맞는 여러 레코드를 한 번에 삭제하며 삭제된 레코드 수를 반환합니다.
  async deleteCart(
    info: DeleteCartDto,
    tx: Prisma.TransactionClient = this.prisma,
  ): Promise<boolean> {
    const result = await this.prisma.cart.deleteMany({
      where: {
        customer_id: info.customer_id,
        product_id: info.product_id,
      },
    });

    return result ? true : false;
  }
}
