import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { courseCategories } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { BookOpen, RefreshCw } from 'lucide-react';

interface RecommendationListProps {
  recommendations: Array<{
    id: number;
    title: string;
    category: string;
    difficulty: string;
  }>;
  onRefresh: () => void;
  isRefreshing: boolean;
}

export function RecommendationList({
  recommendations,
  onRefresh,
  isRefreshing,
}: RecommendationListProps) {
  return (
    <Card className="h-fit">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Recommended Courses</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={onRefresh}
            className={cn(isRefreshing && 'animate-spin')}
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          Based on your highest-rated courses
        </p>
      </CardHeader>
      <CardContent>
        {recommendations.length > 0 ? (
          <div className="space-y-4">
            {recommendations.map((course) => {
              const CategoryIcon = courseCategories[course.category].icon;
              return (
                <div
                  key={course.id}
                  className="p-4 rounded-lg border bg-card hover:bg-accent transition-colors"
                >
                  <h3 className="font-semibold flex items-center gap-2">
                    <CategoryIcon
                      className={cn(
                        'h-4 w-4',
                        courseCategories[course.category].color
                      )}
                    />
                    {course.title}
                  </h3>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="secondary">{course.category}</Badge>
                    <Badge variant="outline">{course.difficulty}</Badge>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Rate some courses to get recommendations!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}