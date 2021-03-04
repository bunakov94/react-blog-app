import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Spinner from '../../blocks/Spinner';
import Error from '../../blocks/Error';
import * as actions from '../../../redux/actions/articles';
import blogApi from '../../../helpers/BlogApi';
import { IArticle, IState } from '../../../types/interfaces';
import Article from '../../layout/Article';

interface IArticleProps {
  setCurrentArticle: (payload: IArticle) => void;
  currentArticle: IArticle;
  slug: string;
}

const SingleArticlePage = ({ setCurrentArticle, currentArticle, slug }: IArticleProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        setCurrentArticle(await blogApi.getPost(slug));
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
      }
    })();
  }, [slug, setCurrentArticle]);

  const content = isError ? <Error /> : <Article {...currentArticle} isFullArticle />;

  return <>{isLoading ? <Spinner /> : content}</>;
};

const mapStateToProps = (state: IState) => ({
  currentArticle: state.articles.currentArticle,
});

export default connect(mapStateToProps, actions)(SingleArticlePage);
