export const getFileNameByLanguage = lang => {
    if (lang === 'java') return 'Main.java';

    const extensions = {
        javascript: 'main.js',
        typescript: 'main.ts',
        python: 'main.py',
        cpp: 'main.cpp',
        c: 'main.c',
        csharp: 'main.cs',
        dart: 'main.dart',
        ruby: 'main.rb',
        php: 'main.php',
        sql: 'main.sql',
    };

    return extensions[lang] || 'main.js';
};
