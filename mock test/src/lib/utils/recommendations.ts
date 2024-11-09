import { courses } from '../constants';

type Rating = Record<number, number>;

export const getRecommendations = (ratings: Rating) => {
  const ratedCourses = Object.entries(ratings);
  if (ratedCourses.length === 0) return [];

  // Sort by rating (descending)
  ratedCourses.sort((a, b) => b[1] - a[1]);

  // Get top rated categories (could be multiple with same rating)
  const topRating = ratedCourses[0][1];
  const topRatedCourseIds = ratedCourses
    .filter(([, rating]) => rating === topRating)
    .map(([id]) => Number(id));

  // Get categories of top rated courses
  const topCategories = new Set(
    topRatedCourseIds.map(
      (id) => courses.find((course) => course.id === id)?.category
    )
  );

  // Get unrated courses from top categories
  const unratedCourses = courses.filter(
    (course) =>
      !ratings[course.id] && topCategories.has(course.category)
  );

  if (unratedCourses.length === 0) {
    // If no unrated courses in top categories, get random unrated courses
    return courses
      .filter((course) => !ratings[course.id])
      .sort(() => 0.5 - Math.random())
      .slice(0, 5);
  }

  // Get courses with similar difficulty levels
  const topCourseDifficulties = new Set(
    topRatedCourseIds.map(
      (id) => courses.find((course) => course.id === id)?.difficulty
    )
  );

  const recommendedCourses = unratedCourses
    .sort((a, b) => {
      const aMatchesDifficulty = topCourseDifficulties.has(a.difficulty) ? 1 : 0;
      const bMatchesDifficulty = topCourseDifficulties.has(b.difficulty) ? 1 : 0;
      return bMatchesDifficulty - aMatchesDifficulty;
    })
    .slice(0, 5);

  return recommendedCourses;
};