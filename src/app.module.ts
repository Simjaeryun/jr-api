import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './order/order.module';
import { CartModule } from './cart/cart.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [OrderModule, CartModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
