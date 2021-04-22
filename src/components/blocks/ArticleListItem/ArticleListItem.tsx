import React from 'react';

import { IArticle } from '../../../types/article';
import Article from '../../layout/Article';

interface ArticleListItemProps {
  article: IArticle;
}

const ArticleListItem: React.FC<ArticleListItemProps> = ({ article }: ArticleListItemProps) => <Article {...article} />;

export default ArticleListItem;
