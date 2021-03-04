import React from 'react';

import { IArticle } from '../../../types/interfaces';
import Article from '../../layout/Article';

interface IArticleListItemProps {
  article: IArticle;
}

const ArticleListItem = ({ article }: IArticleListItemProps) => <Article {...article} />;

export default ArticleListItem;
