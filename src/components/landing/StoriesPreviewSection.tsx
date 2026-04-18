import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, MapPin, Quote } from 'lucide-react';
import { useStories } from '@/hooks/useStories';
import { useState } from 'react';
import storyImg1 from '@/assets/story-woman-1.jpg';
import storyImg2 from '@/assets/story-woman-2.jpg';
import storyImg3 from '@/assets/story-woman-3.jpg';

// Cycle through local assets as fallbacks so every card always shows a real photo
const FALLBACK_IMAGES = [storyImg1, storyImg2, storyImg3];

const StoryCard = ({ story, index }: { story: any; index: number }) => {
  const [imgError, setImgError] = useState(false);
  // Use the story's DB image first; fall back to a local asset based on card position
  const displayImage = (story.image && !imgError) ? story.image : FALLBACK_IMAGES[index % 3];

  return (
    <article className="bg-card rounded-xl border border-border overflow-hidden flex flex-col group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Image — flush at top, no negative margin tricks */}
      <div className="relative h-48 md:h-56 w-full overflow-hidden bg-secondary flex-shrink-0">
        <img
          src={displayImage}
          alt={story.authorName}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
        <Quote className="absolute bottom-3 right-3 w-7 h-7 text-primary/60" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
          {story.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
          {story.description?.substring(0, 120)}{story.description?.length > 120 ? '...' : ''}
        </p>

        {/* Author */}
        <div className="flex items-center gap-3 pt-4 border-t border-border mt-auto">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <span className="text-primary font-semibold text-sm">
              {story.authorName?.charAt(0) || '?'}
            </span>
          </div>
          <div className="min-w-0">
            <p className="font-medium text-foreground text-sm truncate">{story.authorName}</p>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <MapPin className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">{story.location}</span>
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

const StoriesPreviewSection = () => {
  const { data: allStories, isLoading } = useStories();
  const stories = allStories?.slice(0, 3) || [];
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container-main">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Community Stories
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl">
              Real stories from real women. Get inspired by the journeys of entrepreneurs who transformed their lives.
            </p>
          </div>
          <Link to="/stories" className="flex-shrink-0">
            <Button variant="outline" className="gap-2">
              View All Stories
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
          {isLoading ? (
            <div className="col-span-full flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : stories.length > 0 ? stories.map((story, index) => (
            <StoryCard key={story.id} story={story} index={index} />
          )) : (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              No community stories yet. Be the first to share yours!
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default StoriesPreviewSection;
