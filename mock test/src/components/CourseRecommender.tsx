import { useState, useEffect } from 'react';
import { ModeToggle } from '@/components/mode-toggle';
import { CourseList } from '@/components/CourseList';
import { RecommendationList } from '@/components/RecommendationList';
import { getRecommendations } from '@/lib/utils/recommendations';
import type { courses } from '@/lib/constants';

export default function CourseRecommender() {
  const [ratings, setRatings] = useState<Record<number, number>>({});
  const [recommendations, setRecommendations] = useState<typeof courses>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    setRecommendations(getRecommendations(ratings));
  }, [ratings]);

  const handleRating = (courseId: number, [rating]: number[]) => {
    setRatings((prev) => ({
      ...prev,
      [courseId]: rating,
    }));
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setRecommendations(getRecommendations(ratings));
    setTimeout(() => setIsRefreshing(false), 500);
  };

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">Course Recommendations</h1>
          <p className="text-muted-foreground mt-2">
            Rate courses to get personalized recommendations
          </p>
        </div>
        <ModeToggle />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <CourseList ratings={ratings} onRate={handleRating} />
        <RecommendationList
          recommendations={recommendations}
          onRefresh={handleRefresh}
          isRefreshing={isRefreshing}
        />
      </div>
    </div>
  );
}