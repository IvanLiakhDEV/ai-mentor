import { fetchAchievements, fetchMyAchievements } from '@/api/achievement.api';
import { useQuery } from '@tanstack/react-query';

export const useMyAchievements = () => {
    return useQuery({
        queryKey: ['userAchievements'],
        queryFn: fetchMyAchievements,
    });
};
export const useAllAchievements = () => {
    return useQuery({
        queryKey: ['achievements'],
        queryFn: fetchAchievements,
    });
};
