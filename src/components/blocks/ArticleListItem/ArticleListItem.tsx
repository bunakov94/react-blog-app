import React from 'react';

import { IArticle } from '../../../types/interfaces';
import Article from '../../layout/Article';

interface IProps {
  article: IArticle;
}

const ArticleListItem: React.FC<IProps> = ({ article }: IProps) => <Article {...article} />;

export default ArticleListItem;
