import { CSSProperties, useState, useEffect } from 'react';
import clsx from 'clsx';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './../../constants/articleProps';

import styles from './app.module.scss';

export const App = () => {
	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);

	// Initialize CSS variables on mount
	useEffect(() => {
		const root = document.documentElement;
		root.style.setProperty(
			'--font-family',
			defaultArticleState.fontFamilyOption.value
		);
		root.style.setProperty(
			'--font-size',
			defaultArticleState.fontSizeOption.value
		);
		root.style.setProperty('--font-color', defaultArticleState.fontColor.value);
		root.style.setProperty(
			'--container-width',
			defaultArticleState.contentWidth.value
		);
		root.style.setProperty(
			'--bg-color',
			defaultArticleState.backgroundColor.value
		);
	}, []);

	const handleApply = (newState: ArticleStateType) => {
		setArticleState(newState);

		// Update CSS variables when state changes
		const root = document.documentElement;
		root.style.setProperty('--font-family', newState.fontFamilyOption.value);
		root.style.setProperty('--font-size', newState.fontSizeOption.value);
		root.style.setProperty('--font-color', newState.fontColor.value);
		root.style.setProperty('--container-width', newState.contentWidth.value);
		root.style.setProperty('--bg-color', newState.backgroundColor.value);
	};

	const handleReset = () => {
		setArticleState(defaultArticleState);
		// Re-apply default values to CSS variables
		const root = document.documentElement;
		root.style.setProperty(
			'--font-family',
			defaultArticleState.fontFamilyOption.value
		);
		root.style.setProperty(
			'--font-size',
			defaultArticleState.fontSizeOption.value
		);
		root.style.setProperty('--font-color', defaultArticleState.fontColor.value);
		root.style.setProperty(
			'--container-width',
			defaultArticleState.contentWidth.value
		);
		root.style.setProperty(
			'--bg-color',
			defaultArticleState.backgroundColor.value
		);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				currentState={articleState}
				onApply={handleApply}
				onReset={handleReset}
			/>
			<Article />
		</main>
	);
};
