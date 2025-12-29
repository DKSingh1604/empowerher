import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, MapPin, Quote } from 'lucide-react';
import storyImage1 from '@/assets/story-woman-1.jpg';
import storyImage2 from '@/assets/story-woman-2.jpg';
import storyImage3 from '@/assets/story-woman-3.jpg';

const stories = [
  {
    id: '1',
    title: 'From Village Weaver to Business Owner',
    excerpt: 'EmpowerHer helped me reach customers I never imagined possible. Today, I run a cooperative of 25 women weavers.',
    authorName: 'Lakshmi Devi',
    location: 'Jaipur, Rajasthan',
    image: storyImage1,
  },
  {
    id: '2',
    title: 'Reviving Pottery Tradition',
    excerpt: 'Through EmpowerHer, I found eco-conscious buyers who value our sustainable products. Now 12 families depend on our collective.',
    authorName: 'Meena Kumari',
    location: 'Khurja, UP',
    image: storyImage2,
  },
  {
    id: '3',
    title: 'Heritage into Enterprise',
    excerpt: 'EmpowerHer connected me with an NGO that funded my first workshop. Today, I train 8 young women in Kundan work.',
    authorName: 'Sunita Sharma',
    location: 'Moradabad, UP',
    image: storyImage3,
  },
];

const StoriesPreviewSection = () => {
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
          <Link to="/stories">
            <Button variant="outline" className="gap-2">
              View All Stories
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {stories.map((story, index) => (
            <article
              key={story.id}
              className="card-interactive group overflow-hidden"
            >
              {/* Image */}
              <div className="relative h-48 md:h-56 -mx-6 -mt-6 mb-6 overflow-hidden">
                <img
                  src={story.image}
                  alt={story.authorName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                <Quote className="absolute bottom-4 right-4 w-8 h-8 text-primary/60" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                {story.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                "{story.excerpt}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-semibold text-sm">
                    {story.authorName.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">{story.authorName}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {story.location}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StoriesPreviewSection;
