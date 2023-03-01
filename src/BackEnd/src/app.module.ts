import { Module, NestModule, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { ProjectsModule } from './modules/projects/projects.module';
import { UsersModule } from './modules/users/users.module';
import { UnsureAuthenticated } from './Common/middleware/unsureAuthenticated.middleware';
import { UnsureAdmin } from './Common/middleware/unsureAdmin.middleware';

@Module({
  imports: [ProjectsModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UnsureAuthenticated)
      .forRoutes(
        { path: 'User/Info/:id', method: RequestMethod.GET },
        { path: 'User/Update/:id', method: RequestMethod.PUT },
        { path: 'User/getByName/:name', method: RequestMethod.GET },
        { path: 'User/getAll', method: RequestMethod.GET },
        { path: 'User/Auth', method: RequestMethod.GET },
      );

    consumer
      .apply(UnsureAdmin)
      .forRoutes(
        { path: 'User/Delete/:id', method: RequestMethod.DELETE },
      );
  }
}
