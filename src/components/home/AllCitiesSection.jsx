import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight } from 'lucide-react';
import { cities } from '@/lib/cityCollegeData';

export default function AllCitiesSection() {
  return (
    <section className="py-16 border-t border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
              Nationwide
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold">All Cities</h2>
            <p className="text-muted-foreground text-sm mt-2 max-w-lg">
              Explore student housing in {cities.length} cities. Select a city to see available PGs, hostels, and rooms.
            </p>
          </div>
          <Link
            to="/listings#cities"
            className="hidden sm:flex items-center gap-1 text-sm font-semibold text-primary hover:underline shrink-0"
          >
            Browse all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="flex flex-wrap gap-2">
          {cities.map((city, i) => (
            <motion.div
              key={city}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: Math.min(i * 0.02, 0.5) }}
              viewport={{ once: true }}
            >
              <Link
                to={`/listings?city=${encodeURIComponent(city)}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium bg-card border border-border/60 hover:border-primary/50 hover:bg-primary/5 transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                {city}
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 sm:hidden">
          <Link
            to="/listings#cities"
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
          >
            Browse all properties <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
