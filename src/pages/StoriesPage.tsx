import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { MapPin, Quote } from 'lucide-react';
import storyImage1 from '@/assets/story-woman-1.jpg';
import storyImage2 from '@/assets/story-woman-2.jpg';
import storyImage3 from '@/assets/story-woman-3.jpg';

const stories = [
  {
    id: '1',
    title: 'From Village Weaver to Business Owner',
    description: 'Lakshmi started weaving at age 12, learning from her grandmother in a small village in Rajasthan. For years, she sold her beautiful Bandhani textiles at local markets for meager prices. When she joined EmpowerHer, everything changed. Today, she runs a cooperative of 25 women weavers, exporting products to 5 countries. "I never thought my grandmother\'s craft could take me this far," she says with tears of joy.',
    image: storyImage1,
    authorName: 'Lakshmi Devi',
    location: 'Jaipur, Rajasthan',
  },
  {
    id: '2',
    title: 'Reviving My Village\'s Pottery Tradition',
    description: 'When plastic replaced terracotta in our village, I thought our centuries-old craft would die with my generation. The pottery wheels stood silent. Through EmpowerHer, I found eco-conscious buyers across India who value our sustainable products. The platform connected me with an NGO that provided a kiln upgrade. Now, 12 families depend on our pottery collective, and young people are learning the craft again.',
    image: storyImage2,
    authorName: 'Meena Kumari',
    location: 'Khurja, Uttar Pradesh',
  },
  {
    id: '3',
    title: 'Turning Heritage into Enterprise',
    description: 'My mother taught me Kundan jewelry work, and her mother taught her. It\'s been in our family for five generations. But I was about to give up when middlemen took most of my earnings and I couldn\'t find direct buyers. EmpowerHer connected me with a funding partner who helped me set up my first workshop. Today, I train 8 young women in the art of Kundan, ensuring our heritage lives on.',
    image: storyImage3,
    authorName: 'Sunita Sharma',
    location: 'Moradabad, UP',
  },
];

const StoriesPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-background via-secondary/30 to-primary/5">
          <div className="container-main text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 animate-slide-up">
              Community Stories
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-slide-up stagger-1">
              Real stories from real women. Get inspired by the journeys of entrepreneurs who transformed their lives and communities through EmpowerHer.
            </p>
          </div>
        </section>

        {/* Stories Grid */}
        <section className="py-12 md:py-16">
          <div className="container-main">
            <div className="space-y-12 md:space-y-16">
              {stories.map((story, index) => (
                <article
                  key={story.id}
                  className={`grid md:grid-cols-2 gap-8 md:gap-12 items-center ${
                    index % 2 === 1 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Image */}
                  <div className={`relative ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                    <div className="relative rounded-2xl overflow-hidden shadow-hover">
                      <img
                        src={story.image}
                        alt={story.authorName}
                        className="w-full h-80 md:h-96 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent" />
                    </div>
                    <Quote className="absolute -bottom-4 -right-4 w-16 h-16 text-primary/20" />
                  </div>

                  {/* Content */}
                  <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                      {story.title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {story.description}
                    </p>
                    
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary font-bold text-lg">
                          {story.authorName.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{story.authorName}</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {story.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default StoriesPage;
