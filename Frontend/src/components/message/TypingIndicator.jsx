export const TypingIndicator = () => (
    <div className='flex items-center gap-1 p-3 bg-gray-100 rounded-lg w-fit'>
        <div
            className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'
            style={{ animationDelay: '0ms' }}
        />
        <div
            className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'
            style={{ animationDelay: '150ms' }}
        />
        <div
            className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'
            style={{ animationDelay: '300ms' }}
        />
    </div>
);
