import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesController } from './categories.controller';
import { CategoriesRepository } from './Repository/categories.Repository';
import { Category, CategorySchema } from './schemas/categories.schema';
import { CategoriesService } from './services/categories.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }]),HttpModule],
  controllers: [CategoriesController],
  providers: [CategoriesService,CategoriesRepository]
})
export class CategoryModule {}
