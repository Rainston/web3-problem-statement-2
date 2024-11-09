import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { courseCategories, courses } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { BookOpen } from 'lucide-react';

interface CourseListProps {
  ratings: Record<number, number>;
  onRate: (courseId: number, rating: number[]) => void;
}

export function CourseList({ ratings, onRate }: CourseListProps) {
  const averageRating =
    Object.values(ratings).reduce((acc, val) => acc + val, 0) /
    Object.values(ratings).length;

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Available Courses
        </CardTitle>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>
            {Object.keys(ratings).length} of {courses.length} courses rated
          </span>
          {Object.keys(ratings).length > 0 && (
            <span>• Average rating: {Math.round(averageRating)}%</span>
          )}
        </div>
        {Object.keys(ratings).length > 0 && (
          <Progress value={averageRating} className="mt-2" />
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        {courses.map((course) => {
          const CategoryIcon = courseCategories[course.category].icon;
          return (
            <div key={course.id} className="space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold flex items-center gap-2">
                    <CategoryIcon
                      className={cn(
                        'h-4 w-4',
                        courseCategories[course.category].color
                      )}
                    />
                    {course.title}
                  </h3>
                  <div className="flex gap-2 mt-1">
                    <Badge variant="secondary">{course.category}</Badge>
                    <Badge variant="outline">{course.difficulty}</Badge>
                  </div>
                </div>
                {ratings[course.id] && (
                  <span className="text-sm font-medium">
                    {ratings[course.id]}%
                  </span>
                )}
              </div>
              <Slider
                defaultValue={[ratings[course.id] || 0]}
                max={100}
                step={1}
                className="mt-2"
                onValueChange={(value) => onRate(course.id, value)}
                aria-label={`Rate ${course.title}`}
              />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}