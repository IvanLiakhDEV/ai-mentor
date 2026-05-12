import { selectTheme } from '@/store/selectors/themeSelectors';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export const useTheme = () => {
    const theme = useSelector(selectTheme);
    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [theme]);
};
