import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { SkeletonArticle } from '../components';

const fetchPosts = async () => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
    const data = await res.json();
    return data;
}

function Articles() {
    const [articles, setArticles] = useState(null);
    const { data, isLoading } = useQuery('posts', fetchPosts, { keepPreviousData: true });

    // runs automatically after initial render
    useEffect(() => {
        setArticles(data);
    }, [data]);

    return (
        <div className="articles">
            <h2>All Articles</h2>

            {
                articles && articles.map(article => (
                    <div className="article" key={article.id}>
                        <h3>{article.title}</h3>
                        <p>{article.body}</p>
                    </div>
                ))
            }

            {isLoading && [1, 2, 3, 4, 5].map((n) => <SkeletonArticle key={n} theme="light" />)}
        </div>
    );
}

export default Articles;
