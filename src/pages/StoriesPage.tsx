import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MapPin, Quote, BookOpen, Users, Sparkles, Heart, ArrowRight, PenLine, X, CheckCircle } from 'lucide-react';
import { useStories, useAddStory } from '@/hooks/useStories';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import storyImg1 from '@/assets/story-woman-1.jpg';
import storyImg2 from '@/assets/story-woman-2.jpg';
import storyImg3 from '@/assets/story-woman-3.jpg';

const FALLBACK_IMAGES = [storyImg1, storyImg2, storyImg3];

// ─── Featured (first) story – large hero card ─────────────────────
const FeaturedStory = ({ story, index }: { story: any; index: number }) => {
  const [imgError, setImgError] = useState(false);
  const img = story.image && !imgError ? story.image : FALLBACK_IMAGES[index % 3];
  return (
    <article className="relative rounded-3xl overflow-hidden shadow-2xl min-h-[420px] flex items-end group">
      <img
        src={img}
        alt={story.authorName}
        onError={() => setImgError(true)}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      <div className="relative z-10 p-6 md:p-10 text-white max-w-2xl">
        <div className="inline-flex items-center gap-2 bg-primary/80 backdrop-blur-sm text-primary-foreground text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
          <Sparkles className="w-3 h-3" /> Featured Story
        </div>
        <h2 className="text-2xl md:text-4xl font-bold mb-3 leading-tight">{story.title}</h2>
        <p className="text-white/80 text-sm md:text-base leading-relaxed mb-6 line-clamp-3">
          {story.description}
        </p>
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-primary/30 border-2 border-white/30 flex items-center justify-center text-white font-bold text-lg">
            {story.authorName?.charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-white">{story.authorName}</p>
            <p className="text-white/70 text-xs flex items-center gap-1">
              <MapPin className="w-3 h-3" /> {story.location}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

// ─── Alternating full-width story layout ──────────────────────────
const StoryFeatureRow = ({ story, index }: { story: any; index: number }) => {
  const [imgError, setImgError] = useState(false);
  const img = story.image && !imgError ? story.image : FALLBACK_IMAGES[index % 3];
  const isReversed = index % 2 === 1;
  return (
    <article className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
      <div className={`relative ${isReversed ? 'md:order-2' : ''}`}>
        <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
          <img
            src={img}
            alt={story.authorName}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent" />
        </div>
        <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground rounded-2xl p-4 shadow-lg hidden md:block">
          <Quote className="w-8 h-8 opacity-80" />
        </div>
      </div>
      <div className={isReversed ? 'md:order-1' : ''}>
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-medium px-3 py-1.5 rounded-full mb-4">
          <BookOpen className="w-3 h-3" /> Success Story
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 leading-tight">{story.title}</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">{story.description}</p>
        <div className="flex items-center gap-4 p-4 bg-secondary/50 rounded-xl">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary font-bold text-xl">
            {story.authorName?.charAt(0)}
          </div>
          <div>
            <p className="font-bold text-foreground">{story.authorName}</p>
            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5" /> {story.location}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

// ─── Regular story card (grid) ─────────────────────────────────────
const StoryCard = ({ story, index }: { story: any; index: number }) => {
  const [imgError, setImgError] = useState(false);
  const img = story.image && !imgError ? story.image : FALLBACK_IMAGES[index % 3];
  const [expanded, setExpanded] = useState(false);
  return (
    <article className="bg-card rounded-2xl border border-border overflow-hidden flex flex-col group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-primary/20">
      <div className="relative h-52 w-full overflow-hidden bg-secondary flex-shrink-0">
        <img
          src={img}
          alt={story.authorName}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <Quote className="absolute bottom-3 right-3 w-7 h-7 text-white/60" />
      </div>
      <div className="flex flex-col flex-1 p-6">
        <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors leading-snug">
          {story.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-4">
          {expanded ? story.description : `${story.description?.substring(0, 140)}${story.description?.length > 140 ? '...' : ''}`}
          {story.description?.length > 140 && (
            <button onClick={() => setExpanded(!expanded)} className="ml-1 text-primary font-medium hover:underline">
              {expanded ? 'Show less' : 'Read more'}
            </button>
          )}
        </p>
        <div className="flex items-center gap-3 pt-4 border-t border-border mt-auto">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary font-bold text-sm">
            {story.authorName?.charAt(0)}
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-foreground text-sm truncate">{story.authorName}</p>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <MapPin className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">{story.location}</span>
            </p>
          </div>
          <Heart className="w-4 h-4 text-muted-foreground/40 group-hover:text-rose-400 transition-colors ml-auto" />
        </div>
      </div>
    </article>
  );
};

// ─── Share Your Story Form ─────────────────────────────────────────
const ShareStoryForm = ({ onClose }: { onClose: () => void }) => {
  const { profile } = useAuth();
  const addStory = useAddStory();
  const [form, setForm] = useState({ title: '', description: '', location: profile?.location || '', image: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addStory.mutateAsync({
        title: form.title, description: form.description,
        author_name: profile?.name || 'Anonymous',
        location: form.location || 'India', image: form.image || '',
      });
      setSubmitted(true);
      toast({ title: '🎉 Story Published!', description: 'Your story is now live in the community.' });
    } catch (err: any) {
      toast({ title: 'Error', description: err.message || 'Could not submit story.', variant: 'destructive' });
    }
  };

  if (submitted) return (
    <div className="text-center py-10">
      <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
      <h3 className="text-xl font-bold text-foreground mb-2">Your Story Is Live!</h3>
      <p className="text-muted-foreground mb-6">Thank you for inspiring the community.</p>
      <Button onClick={onClose} variant="outline">Close</Button>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <Label htmlFor="s-title">Story Headline *</Label>
        <Input id="s-title" className="mt-2" placeholder="e.g., How I Turned My Craft into a Business" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
      </div>
      <div>
        <Label htmlFor="s-body">Your Journey *</Label>
        <Textarea id="s-body" className="mt-2" rows={6} placeholder="Share your journey — the challenges, the turning points, and what EmpowerHer meant to you..." value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="s-loc">Your Location</Label>
          <Input id="s-loc" className="mt-2" placeholder="District, State" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} />
        </div>
        <div>
          <Label htmlFor="s-img">Story Photo URL (optional)</Label>
          <Input id="s-img" className="mt-2" placeholder="https://..." value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} />
        </div>
      </div>
      <div className="flex gap-3 pt-2">
        <Button type="submit" className="flex-1 gap-2" disabled={addStory.isPending}>
          <PenLine className="w-4 h-4" />
          {addStory.isPending ? 'Publishing…' : 'Publish My Story'}
        </Button>
        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
      </div>
    </form>
  );
};

// ─── Main Page ─────────────────────────────────────────────────────
const StoriesPage = () => {
  const { data: stories, isLoading } = useStories();
  const { isAuthenticated, role } = useAuth();
  const [showForm, setShowForm] = useState(false);

  const totalStories = stories?.length ?? 0;
  const states = [...new Set((stories || []).map((s: any) => s.location?.split(',').pop()?.trim()).filter(Boolean))];

  const featured = stories?.[0];
  const featureRows = stories?.slice(1, 3) || [];
  const gridStories = stories?.slice(3) || [];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">

        {/* ── HERO ─────────────────────────────────────── */}
        <section className="relative overflow-hidden py-20 md:py-28 bg-gradient-to-br from-primary via-primary/90 to-primary/60">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
          <div className="container-main relative text-center">
            <div className="inline-flex items-center gap-2 bg-white/15 text-primary-foreground px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <Heart className="w-4 h-4" /> Real Women. Real Journeys.
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-5 leading-tight">
              Community <span className="opacity-70">Stories</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-8">
              Every story here is a testament to courage, craft, and community. Be inspired — and share your own.
            </p>
            {!isLoading && (
              <div className="flex flex-wrap justify-center gap-4 mb-10">
                <span className="bg-white/10 border border-white/20 text-primary-foreground text-sm px-4 py-2 rounded-full">
                  📖 {totalStories} Stories
                </span>
                <span className="bg-white/10 border border-white/20 text-primary-foreground text-sm px-4 py-2 rounded-full">
                  📍 {states.length} States Represented
                </span>
              </div>
            )}
            {isAuthenticated && role === 'entrepreneur' && !showForm && (
              <Button onClick={() => setShowForm(true)} size="lg"
                className="gap-2 bg-white text-primary hover:bg-white/90 font-semibold shadow-xl">
                <PenLine className="w-5 h-5" /> Share Your Story
              </Button>
            )}
          </div>
        </section>

        {/* ── SHARE FORM ──────────────────────────────── */}
        {showForm && (
          <section className="py-12 bg-secondary/40 border-b border-border">
            <div className="container-main max-w-2xl">
              <div className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                      <PenLine className="w-5 h-5 text-primary" /> Share Your Story
                    </h2>
                    <p className="text-muted-foreground text-sm mt-1">Your journey can inspire thousands of women across India.</p>
                  </div>
                  <button onClick={() => setShowForm(false)} className="p-2 rounded-lg hover:bg-secondary transition-colors">
                    <X className="w-5 h-5 text-muted-foreground" />
                  </button>
                </div>
                <ShareStoryForm onClose={() => setShowForm(false)} />
              </div>
            </div>
          </section>
        )}

        {/* ── STATS BAR ───────────────────────────────── */}
        {!isLoading && (
          <section className="py-8 bg-secondary/40 border-b border-border">
            <div className="container-main">
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <p className="text-3xl font-bold text-primary">{totalStories}</p>
                  <p className="text-sm text-muted-foreground mt-1">Stories Shared</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">{states.length}</p>
                  <p className="text-sm text-muted-foreground mt-1">States Represented</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">∞</p>
                  <p className="text-sm text-muted-foreground mt-1">Lives Inspired</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {isLoading ? (
          <section className="py-20">
            <div className="container-main flex justify-center items-center gap-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
              <span className="text-muted-foreground">Loading stories…</span>
            </div>
          </section>
        ) : stories && stories.length > 0 ? (
          <>
            {/* ── FEATURED STORY ───────────────────────── */}
            {featured && (
              <section className="py-14">
                <div className="container-main">
                  <div className="flex items-center gap-3 mb-8">
                    <Sparkles className="w-5 h-5 text-primary" />
                    <h2 className="text-2xl font-bold text-foreground">Featured Story</h2>
                    <div className="flex-1 h-px bg-border" />
                  </div>
                  <FeaturedStory story={featured} index={0} />
                </div>
              </section>
            )}

            {/* ── ALTERNATING FEATURE ROWS ─────────────── */}
            {featureRows.length > 0 && (
              <section className="py-14 bg-secondary/20 border-t border-border">
                <div className="container-main space-y-20">
                  {featureRows.map((story, i) => (
                    <StoryFeatureRow key={story.id} story={story} index={i} />
                  ))}
                </div>
              </section>
            )}

            {/* ── CARD GRID ────────────────────────────── */}
            {gridStories.length > 0 && (
              <section className="py-14 border-t border-border">
                <div className="container-main">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                      <Users className="w-5 h-5 text-primary" /> More Inspiring Journeys
                    </h2>
                    <span className="text-sm text-muted-foreground">{gridStories.length} stories</span>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {gridStories.map((story, i) => (
                      <StoryCard key={story.id} story={story} index={i + 3} />
                    ))}
                  </div>
                </div>
              </section>
            )}
          </>
        ) : (
          <section className="py-24">
            <div className="container-main text-center">
              <BookOpen className="w-16 h-16 text-primary/30 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-foreground mb-3">No stories yet</h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Be the first woman entrepreneur to share your journey!
              </p>
              {isAuthenticated && role === 'entrepreneur' && (
                <Button onClick={() => setShowForm(true)} className="gap-2">
                  <PenLine className="w-4 h-4" /> Share the First Story
                </Button>
              )}
            </div>
          </section>
        )}

        {/* ── BOTTOM CTA ──────────────────────────────── */}
        <section className="py-16 bg-gradient-to-br from-primary/5 via-secondary/30 to-background border-t border-border">
          <div className="container-main text-center max-w-2xl mx-auto">
            <Heart className="w-10 h-10 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-foreground mb-4">Your Story Matters</h2>
            <p className="text-muted-foreground mb-8">
              Every woman entrepreneur on EmpowerHer has a unique journey worth sharing. Your story of struggle and success could be the spark that lights another woman's path.
            </p>
            {isAuthenticated && role === 'entrepreneur' && !showForm ? (
              <Button size="lg" className="gap-2"
                onClick={() => { setShowForm(true); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                <PenLine className="w-5 h-5" /> Share Your Story
                <ArrowRight className="w-5 h-5" />
              </Button>
            ) : !isAuthenticated ? (
              <a href="/auth?mode=register&role=entrepreneur">
                <Button size="lg" className="gap-2">
                  <Sparkles className="w-5 h-5" /> Join & Share Your Story
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </a>
            ) : null}
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default StoriesPage;
