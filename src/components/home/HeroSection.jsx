import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, MapPin, GraduationCap, ChevronDown, Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cities, collegesByCity } from '@/lib/cityCollegeData';

export default function HeroSection() {
  const navigate = useNavigate();
  const [city, setCity] = useState('');
  const [college, setCollege] = useState('');
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [showCollegeDropdown, setShowCollegeDropdown] = useState(false);
  const [citySearch, setCitySearch] = useState('');
  const [collegeSearch, setCollegeSearch] = useState('');

  const filteredCities = useMemo(() => {
    if (!citySearch) return cities.slice(0, 12);
    return cities.filter(c => c.toLowerCase().includes(citySearch.toLowerCase()));
  }, [citySearch]);

  const colleges = useMemo(() => {
    const list = collegesByCity[city] || [];
    if (!collegeSearch) return list;
    return list.filter(c => c.toLowerCase().includes(collegeSearch.toLowerCase()));
  }, [city, collegeSearch]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (city) params.set('city', city);
    if (college) params.set('college', college);
    navigate(`/listings?${params.toString()}`);
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Trusted by 50,000+ students across India
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              Find Your Perfect
              <br />
              <span className="text-primary">Student Home</span>
              <br />
              Near Campus
            </h1>

            <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
              Discover verified PGs, hostels, and rooms near 500+ colleges across 50+ cities. 
              Move in with confidence.
            </p>
          </motion.div>

          {/* Search Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-10 bg-card rounded-2xl shadow-xl shadow-foreground/5 border border-border/60 p-3"
          >
            <div className="flex flex-col md:flex-row gap-3">
              {/* City Selector */}
              <div className="relative flex-1">
                <div
                  className="flex items-center gap-3 bg-secondary/50 rounded-xl px-4 py-3.5 cursor-pointer hover:bg-secondary transition-colors"
                  onClick={() => { setShowCityDropdown(!showCityDropdown); setShowCollegeDropdown(false); }}
                >
                  <MapPin className="w-5 h-5 text-primary shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground font-medium">City</p>
                    <p className="text-sm font-semibold truncate">{city || 'Select a city'}</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
                </div>

                {showCityDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-card rounded-xl shadow-2xl border border-border z-50 overflow-hidden">
                    <div className="p-3 border-b border-border">
                      <input
                        type="text"
                        placeholder="Search city..."
                        value={citySearch}
                        onChange={e => setCitySearch(e.target.value)}
                        className="w-full bg-secondary/50 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 ring-primary/30"
                        autoFocus
                      />
                    </div>
                    <div className="max-h-60 overflow-y-auto p-2">
                      {filteredCities.map(c => (
                        <button
                          key={c}
                          onClick={() => { setCity(c); setCollege(''); setShowCityDropdown(false); setCitySearch(''); }}
                          className="w-full text-left px-3 py-2.5 text-sm rounded-lg hover:bg-primary/10 hover:text-primary transition-colors font-medium"
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* College Selector */}
              <div className="relative flex-1">
                <div
                  className={`flex items-center gap-3 bg-secondary/50 rounded-xl px-4 py-3.5 cursor-pointer hover:bg-secondary transition-colors ${!city ? 'opacity-60 pointer-events-none' : ''}`}
                  onClick={() => { setShowCollegeDropdown(!showCollegeDropdown); setShowCityDropdown(false); }}
                >
                  <GraduationCap className="w-5 h-5 text-primary shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground font-medium">College</p>
                    <p className="text-sm font-semibold truncate">{college || 'Select a college'}</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
                </div>

                {showCollegeDropdown && city && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-card rounded-xl shadow-2xl border border-border z-50 overflow-hidden">
                    <div className="p-3 border-b border-border">
                      <input
                        type="text"
                        placeholder="Search college..."
                        value={collegeSearch}
                        onChange={e => setCollegeSearch(e.target.value)}
                        className="w-full bg-secondary/50 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 ring-primary/30"
                        autoFocus
                      />
                    </div>
                    <div className="max-h-60 overflow-y-auto p-2">
                      {colleges.length > 0 ? colleges.map(c => (
                        <button
                          key={c}
                          onClick={() => { setCollege(c); setShowCollegeDropdown(false); setCollegeSearch(''); }}
                          className="w-full text-left px-3 py-2.5 text-sm rounded-lg hover:bg-primary/10 hover:text-primary transition-colors font-medium"
                        >
                          {c}
                        </button>
                      )) : (
                        <p className="text-sm text-muted-foreground px-3 py-4 text-center">No colleges found</p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <Button
                onClick={handleSearch}
                size="lg"
                className="h-auto py-3.5 px-8 rounded-xl font-semibold text-base gap-2 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
              >
                <Search className="w-5 h-5" />
                Search
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-12 flex flex-wrap gap-8"
          >
            {[
              { value: '50+', label: 'Cities' },
              { value: '10K+', label: 'Properties' },
              { value: '500+', label: 'Colleges' },
              { value: '4.8★', label: 'Rating' },
            ].map(stat => (
              <div key={stat.label}>
                <p className="font-display font-bold text-2xl">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}