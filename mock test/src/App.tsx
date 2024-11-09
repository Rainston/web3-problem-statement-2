import { ThemeProvider } from '@/components/theme-provider';
import CourseRecommender from '@/components/CourseRecommender';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <CourseRecommender />
    </ThemeProvider>
  );
}

export default App;