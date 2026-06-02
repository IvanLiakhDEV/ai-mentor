export const calculateNewStreak = (lastActivityDate = null, currentStreak = 0, bestStreak = 0) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    let newStreak = currentStreak;
    let newBestStreak = bestStreak;
    if (!lastActivityDate) {
        newStreak = 1;
        newBestStreak = Math.max(1, newBestStreak);
    } else {
        const lastActivity = new Date(lastActivityDate);

        if (lastActivity >= today) {
        } else if (lastActivity >= yesterday && lastActivity < today) {
            newStreak += 1;
            newBestStreak = Math.max(newStreak, newBestStreak);
        } else {
            newStreak = 1;
        }
    }
    return {
        currentStreak: newStreak,
        bestStreak: newBestStreak,
        lastActivityDate: now,
    };
};
