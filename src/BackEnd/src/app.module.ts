import { Module, NestModule, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { ProjectsModule } from './modules/projects/projects.module';
import { UsersModule } from './modules/users/users.module';
import { UnsureAuthenticated } from './Common/middleware/unsureAuthenticated.middleware';

@Module({
  imports: [ProjectsModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UnsureAuthenticated)
      .forRoutes({ path: 'User/Info/:id', method: RequestMethod.GET });
  }
}
