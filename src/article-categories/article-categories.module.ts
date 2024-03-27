import { Module } from '@nestjs/common';
import { ArticleCategoriesController } from './article-categories.controller';
import { ArticleCategoriesService } from './article-categories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleCategory } from '@/common/entities/article-category.entity';

@Module({
	imports: [TypeOrmModule.forFeature([ArticleCategory])],
	controllers: [ArticleCategoriesController],
	providers: [ArticleCategoriesService],
	exports: [ArticleCategoriesService],
})
export class ArticleCategoriesModule {}
