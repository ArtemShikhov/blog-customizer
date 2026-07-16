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
	defaultArticleState,
	ArticleStateType,
	OptionType,
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

	const handleFormChange = (
		field: keyof FormStateType,
		value: string | OptionType
	) => {
		setTempData((prev: FormStateType) => ({
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
		// Immediately update tempData to default values to ensure UI reflects the reset instantly
		setTempData(defaultArticleState);
		// Then call parent's reset function to update the main application state
		onReset();
		setIsOpen(false);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={togglePanel} />
			<aside
				ref={sidebarRef}
				data-testid='form-sidebar'
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
						data-testid='font-family-group'
					/>

					<div className={styles.spacing66}></div>

					<RadioGroup
						name='fontSize'
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={tempData.fontSizeOption}
						onChange={(value) => handleFormChange('fontSizeOption', value)}
						direction='column'
						data-testid='font-size-select'
					/>

					<div className={styles.spacing66}></div>

					<Select
						title='Цвет шрифта'
						selected={tempData.fontColor}
						options={fontColors}
						onChange={(value) => handleFormChange('fontColor', value)}
						data-testid='font-color-select'
					/>

					<div className={styles.spacing50}></div>

					<Separator />

					<div className={styles.spacing66}></div>

					<Select
						title='Цвет фона'
						selected={tempData.backgroundColor}
						options={backgroundColors}
						onChange={(value) => handleFormChange('backgroundColor', value)}
						data-testid='bg-color-select'
					/>

					<div className={styles.spacing66}></div>

					<Select
						title='Ширина контента'
						selected={tempData.contentWidth}
						options={contentWidthArr}
						onChange={(value) => handleFormChange('contentWidth', value)}
						data-testid='content-width-select'
					/>

					<div className={styles.spacing66}></div>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='button'
							type='clear'
							onClick={handleReset}
							data-testid='reset-button'
						/>
						<Button
							title='Применить'
							htmlType='submit'
							type='apply'
							data-testid='apply-button'
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
