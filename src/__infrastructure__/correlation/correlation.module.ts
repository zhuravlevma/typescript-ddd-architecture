import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ContextModule } from '../context/context.module';
import { CorrelationService } from './correlation.service';
import { CorrelationMiddleware } from './middleware';

@Global()
@Module({
  imports: [ContextModule],
  providers: [CorrelationService],
  exports: [CorrelationService],
})
export class CorrelationModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(CorrelationMiddleware).forRoutes('*');
  }
}
