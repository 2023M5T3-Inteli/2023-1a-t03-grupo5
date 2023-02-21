import { Module } from '@nestjs/common';
import { ProjectsModule } from './modules/projects/projects.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [ProjectsModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
