import { useState, useEffect, useRef } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group/RadioGroup';
import { Select } from 'src/ui/select/Select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	ArticleStateType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type FormStateType = ArticleStateType;

type ArticleParamsFormProps = {
	currentState: ArticleStateType;
	onApply: (newState: ArticleStateType) => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({
	currentState,
	onApply,
	onReset,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [tempData, setTempData] = useState<FormStateType>(currentState);
	const sidebarRef = useRef<HTMLElement>(null);

	// Update temp data when current state changes (e.g., when reset is triggered)
	useEffect(() => {
		setTempData(currentState);
	}, [currentState]);

	// Close sidebar when clicking outside
	useEffect(() => {
		if (!isOpen) {
			return;
		}

		const handleClickOutside = (event: MouseEvent) => {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	const togglePanel = () => {
		setIsOpen(!isOpen);
	};

	const handleFormChange = (field: keyof FormStateType, value: any) => {
		setTempData((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const handleApply = (e: React.FormEvent) => {
		e.preventDefault();
		onApply(tempData);
		setIsOpen(false);
	};

	const handleReset = () => {
		onReset();
		setIsOpen(false);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={togglePanel} />
			<aside
				ref={sidebarRef}
				className={`${styles.container} ${
					isOpen ? styles.container_open : ''
				}`}>
				<form className={styles.form} onSubmit={handleApply}>
					<Text as='h2' size={22} weight={800} uppercase>
						ЗАДАЙТЕ ПАРАМЕТРЫ
					</Text>

					<div className={styles.spacing66}></div>

					<Select
						title='Шрифт'
						selected={tempData.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(value) => handleFormChange('fontFamilyOption', value)}
					/>

					<div className={styles.spacing66}></div>

					<RadioGroup
						name='fontSize'
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={tempData.fontSizeOption}
						onChange={(value) => handleFormChange('fontSizeOption', value)}
						direction='column'
					/>

					<div className={styles.spacing66}></div>

					<Select
						title='Цвет шрифта'
						selected={tempData.fontColor}
						options={fontColors}
						onChange={(value) => handleFormChange('fontColor', value)}
					/>

					<div className={styles.spacing50}></div>

					<Separator />

					<div className={styles.spacing66}></div>

					<Select
						title='Цвет фона'
						selected={tempData.backgroundColor}
						options={backgroundColors}
						onChange={(value) => handleFormChange('backgroundColor', value)}
					/>

					<div className={styles.spacing66}></div>

					<Select
						title='Ширина контента'
						selected={tempData.contentWidth}
						options={contentWidthArr}
						onChange={(value) => handleFormChange('contentWidth', value)}
					/>

					<div className={styles.spacing66}></div>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='button'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
