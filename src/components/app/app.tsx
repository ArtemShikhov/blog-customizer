import { CSSProperties, useState, useEffect } from 'react';
import clsx from 'clsx';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import { defaultArticleState, ArticleStateType } from './../../constants/articleProps';

import styles from './app.module.scss';

export const App = () => {
	const [articleState, setArticleState] = useState<ArticleStateType>(defaultArticleState);

	// Initialize CSS variables on first render
	useEffect(() => {
		const root = document.documentElement;
		root.style.setProperty('--font-family', defaultArticleState.fontFamilyOption.value);
		root.style.setProperty('--font-size', defaultArticleState.fontSizeOption.value);
		root.style.setProperty('--font-color', defaultArticleState.fontColor.value);
		root.style.setProperty('--container-width', defaultArticleState.contentWidth.value);
		root.style.setProperty('--bg-color', defaultArticleState.backgroundColor.value);
	}, []);

	// Apply CSS variables when articleState changes
	useEffect(() => {
		const root = document.documentElement;
		root.style.setProperty('--font-family', articleState.fontFamilyOption.value);
		root.style.setProperty('--font-size', articleState.fontSizeOption.value);
		root.style.setProperty('--font-color', articleState.fontColor.value);
		root.style.setProperty('--container-width', articleState.contentWidth.value);
		root.style.setProperty('--bg-color', articleState.backgroundColor.value);
	}, [articleState]);

	const handleApply = (newState: ArticleStateType) => {
		setArticleState(newState);
	};

	const handleReset = () => {
		setArticleState(defaultArticleState);
	};

	return (
		<main
			className={clsx(styles.main)}>
			<ArticleParamsForm 
				currentState={articleState} 
				onApply={handleApply} 
				onReset={handleReset} 
			/>
			<Article />
		</main>
	);
};