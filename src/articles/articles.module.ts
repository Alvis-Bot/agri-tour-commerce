import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from '@/common/entities/article.entity';
import { ArticleCategoriesModule } from '@/article-categories/article-categories.module';

@Module({
	imports: [ArticleCategoriesModule, TypeOrmModule.forFeature([Article])],
	providers: [ArticlesService],
	controllers: [ArticlesController],
})
export class ArticlesModule {}
