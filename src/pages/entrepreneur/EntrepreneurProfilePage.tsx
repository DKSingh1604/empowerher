import EntrepreneurLayout from '@/components/layout/EntrepreneurLayout';
import { useAuth } from '@/contexts/AuthContext';
import { useEntrepreneurProducts } from '@/hooks/useProducts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { skillCategories } from '@/data/mockData';
import { MapPin, Mail, Edit2, Save, Package, ShoppingBag, IndianRupee, CheckCircle, User, Briefcase } from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const EntrepreneurProfilePage = () => {
  const { profile: authProfile, refreshProfile } = useAuth();
  const { data: userProducts } = useEntrepreneurProducts(authProfile?.user_id);
  const productsCount = userProducts?.length || 0;
  const salesCount = userProducts?.reduce((sum, p) => sum + (p.sales || 0), 0) || 0;
  const revenue = userProducts?.reduce((sum, p) => sum + (p.price * (p.sales || 0)), 0) || 0;
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [profile, setProfile] = useState({ name: '', email: '', location: '', bio: '', skillCategory: 'Other' });

  useEffect(() => {
    if (authProfile) {
      setProfile({
        name: authProfile.name || '',
        email: authProfile.email || '',
        location: authProfile.location || '',
        bio: authProfile.bio || '',
        skillCategory: authProfile.skill_category || 'Other',
      });
    }
  }, [authProfile]);

  const handleSave = async () => {
    if (!authProfile?.user_id) return;
    setIsSaving(true);
    try {
      const { error } = await supabase.from('profiles').update({
        name: profile.name, location: profile.location,
        bio: profile.bio, skill_category: profile.skillCategory,
      }).eq('user_id', authProfile.user_id);
      if (error) throw error;
      await refreshProfile();
      setIsEditing(false);
      toast({ title: '✅ Profile updated', description: 'Your profile has been saved successfully.' });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to save profile changes.', variant: 'destructive' });
    } finally {
      setIsSaving(false);
    }
  };

  const initials = profile.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || '?';

  return (
    <EntrepreneurLayout title="My Profile">
      <div className="grid lg:grid-cols-3 gap-6">

        {/* ── Profile Card ── */}
        <div className="lg:col-span-1 space-y-5">

          {/* Avatar + identity */}
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            {/* Top gradient banner */}
            <div className="h-24 bg-gradient-to-br from-primary via-primary/80 to-accent/60 relative">
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
            </div>
            {/* Avatar overlapping the banner */}
            <div className="px-6 pb-6">
              <div className="flex justify-center -mt-12 mb-4">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center border-4 border-card shadow-xl">
                  <span className="text-white text-2xl font-bold">{initials}</span>
                </div>
              </div>
              <div className="text-center">
                <h2 className="text-xl font-bold text-foreground">{profile.name || 'Your Name'}</h2>
                <span className="inline-block mt-1 bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">
                  {profile.skillCategory}
                </span>
                <div className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground mt-3">
                  <MapPin className="w-4 h-4" />
                  {profile.location || 'Location not set'}
                </div>
                <div className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground mt-1">
                  <Mail className="w-4 h-4" />
                  {profile.email}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 mt-6 pt-6 border-t border-border text-center">
                <div>
                  <p className="text-xl font-bold text-foreground">{productsCount}</p>
                  <p className="text-xs text-muted-foreground">Products</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-foreground">{salesCount}</p>
                  <p className="text-xs text-muted-foreground">Sales</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-foreground">₹{(revenue/1000).toFixed(1)}k</p>
                  <p className="text-xs text-muted-foreground">Revenue</p>
                </div>
              </div>
            </div>
          </div>

          {/* Completeness checklist */}
          <div className="bg-card rounded-2xl border border-border p-5">
            <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-success" /> Profile Completeness
            </h3>
            <div className="space-y-2.5">
              {[
                { label: 'Name added',     done: !!profile.name },
                { label: 'Location set',   done: !!profile.location },
                { label: 'Bio written',    done: !!profile.bio },
                { label: 'Skill selected', done: profile.skillCategory !== 'Other' },
                { label: 'Product listed', done: productsCount > 0 },
              ].map(({ label, done }) => (
                <div key={label} className="flex items-center gap-2.5">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${done ? 'bg-success/15' : 'bg-secondary'}`}>
                    {done ? <CheckCircle className="w-3.5 h-3.5 text-success" /> : <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />}
                  </div>
                  <span className={`text-sm ${done ? 'text-foreground' : 'text-muted-foreground'}`}>{label}</span>
                </div>
              ))}
            </div>
            {/* Progress bar */}
            <div className="mt-4">
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-success transition-all duration-500 rounded-full"
                  style={{ width: `${([!!profile.name, !!profile.location, !!profile.bio, profile.skillCategory !== 'Other', productsCount > 0].filter(Boolean).length / 5) * 100}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1.5 text-right">
                {[!!profile.name, !!profile.location, !!profile.bio, profile.skillCategory !== 'Other', productsCount > 0].filter(Boolean).length}/5 complete
              </p>
            </div>
          </div>
        </div>

        {/* ── Edit Form ── */}
        <div className="lg:col-span-2">
          <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8 pb-5 border-b border-border">
              <div>
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" /> Profile Details
                </h3>
                <p className="text-sm text-muted-foreground mt-0.5">Keep your information up to date.</p>
              </div>
              {isEditing ? (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>Cancel</Button>
                  <Button size="sm" onClick={handleSave} disabled={isSaving} className="gap-2">
                    <Save className="w-4 h-4" />
                    {isSaving ? 'Saving…' : 'Save Changes'}
                  </Button>
                </div>
              ) : (
                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)} className="gap-2">
                  <Edit2 className="w-4 h-4" /> Edit Profile
                </Button>
              )}
            </div>

            <div className="space-y-6">
              {/* Section: Personal */}
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                  <User className="w-3.5 h-3.5" /> Personal Info
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} disabled={!isEditing} className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" value={profile.email} disabled className="mt-1.5 opacity-60" />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="location">Location (District, State)</Label>
                    <Input id="location" value={profile.location} onChange={e => setProfile({ ...profile, location: e.target.value })} disabled={!isEditing} placeholder="e.g. Jaipur, Rajasthan" className="mt-1.5" />
                  </div>
                </div>
              </div>

              {/* Section: Craft */}
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Briefcase className="w-3.5 h-3.5" /> Craft & Skills
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="skill">Primary Skill Category</Label>
                    <select id="skill" value={profile.skillCategory} onChange={e => setProfile({ ...profile, skillCategory: e.target.value })} disabled={!isEditing}
                      className="mt-1.5 w-full h-10 rounded-lg border border-input bg-background px-3 text-sm disabled:opacity-50 focus:outline-none focus:ring-1 focus:ring-primary">
                      {skillCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div>
                <Label htmlFor="bio" className="flex items-center justify-between">
                  <span>Short Bio</span>
                  <span className="text-xs text-muted-foreground font-normal">{profile.bio.length}/300</span>
                </Label>
                <Textarea id="bio" value={profile.bio} onChange={e => setProfile({ ...profile, bio: e.target.value.slice(0, 300) })} disabled={!isEditing} rows={4} className="mt-1.5" placeholder="Tell buyers about your craft, your story, and what makes your products special…" />
              </div>

              {!isEditing && (
                <div className="flex items-center gap-2 p-3 bg-secondary/50 rounded-xl text-sm text-muted-foreground">
                  <Edit2 className="w-4 h-4 flex-shrink-0" />
                  Click <strong className="text-foreground mx-1">"Edit Profile"</strong> above to update your information.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </EntrepreneurLayout>
  );
};

export default EntrepreneurProfilePage;
