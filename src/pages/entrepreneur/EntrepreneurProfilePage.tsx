import EntrepreneurLayout from '@/components/layout/EntrepreneurLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { skillCategories } from '@/data/mockData';
import { MapPin, Mail, Edit, Save } from 'lucide-react';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

const EntrepreneurProfilePage = () => {
  const { profile: authProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: authProfile?.name || 'Lakshmi Devi',
    email: authProfile?.email || 'lakshmi@example.com',
    location: authProfile?.location || 'Jaipur, Rajasthan',
    bio: authProfile?.bio || 'Third-generation weaver specializing in traditional Bandhani textiles. Started my journey 15 years ago.',
    skillCategory: authProfile?.skill_category || 'Textiles & Weaving',
  });

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: 'Profile updated',
      description: 'Your profile has been saved successfully.',
    });
  };

  return (
    <EntrepreneurLayout title="My Profile">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="card-elevated text-center">
            {/* Avatar */}
            <div className="w-24 h-24 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <span className="text-primary text-3xl font-bold">
                {profile.name.charAt(0)}
              </span>
            </div>

            <h2 className="text-xl font-semibold text-foreground mb-1">{profile.name}</h2>
            <p className="text-sm text-primary font-medium mb-2">{profile.skillCategory}</p>
            
            <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-4">
              <MapPin className="w-4 h-4" />
              {profile.location}
            </div>

            <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
              <Mail className="w-4 h-4" />
              {profile.email}
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-foreground">4</p>
                  <p className="text-xs text-muted-foreground">Products</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">30</p>
                  <p className="text-xs text-muted-foreground">Sales</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <div className="lg:col-span-2">
          <div className="card-elevated">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground">Profile Details</h3>
              {isEditing ? (
                <Button onClick={handleSave} className="gap-2">
                  <Save className="w-4 h-4" />
                  Save Changes
                </Button>
              ) : (
                <Button variant="outline" onClick={() => setIsEditing(true)} className="gap-2">
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </Button>
              )}
            </div>

            <div className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    disabled={!isEditing}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    disabled={!isEditing}
                    className="mt-2"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="location">Location (District, State)</Label>
                  <Input
                    id="location"
                    value={profile.location}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    disabled={!isEditing}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="skill">Skill Category</Label>
                  <select
                    id="skill"
                    value={profile.skillCategory}
                    onChange={(e) => setProfile({ ...profile, skillCategory: e.target.value })}
                    disabled={!isEditing}
                    className="mt-2 w-full h-10 rounded-lg border border-input bg-background px-3 text-sm disabled:opacity-50"
                  >
                    {skillCategories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <Label htmlFor="bio">Short Bio</Label>
                <Textarea
                  id="bio"
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  disabled={!isEditing}
                  rows={4}
                  className="mt-2"
                  placeholder="Tell us about yourself and your craft..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </EntrepreneurLayout>
  );
};

export default EntrepreneurProfilePage;
