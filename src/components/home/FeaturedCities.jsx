import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { ArrowRight, Building, Loader2 } from 'lucide-react';
import { listProperties } from '@/api/properties';

const featuredCityMeta = [
  { name: 'Mumbai', image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=600&q=80' },
  { name: 'Delhi', image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&q=80' },
  { name: 'Bangalore', image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=600&q=80' },
  { name: 'Pune', image: 'https://images.unsplash.com/photo-1572793084479-a2fdd73c5b89?w=600&q=80' },
  { name: 'Hyderabad', image: 'https://images.unsplash.com/photo-1572805665961-d041ebc48aba?w=600&q=80' },
  { name: 'Chennai', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&q=80' },
];

export default function FeaturedCities() {
  const { data: properties = [], isLoading } = useQuery({
    queryKey: ['properties'],
    queryFn: () => listProperties(300),
  });

  const countByCity = useMemo(() => {
    return properties.reduce((acc, p) => {
      if (p.city) acc[p.city] = (acc[p.city] || 0) + 1;
      return acc;
    }, {});
  }, [properties]);

  const featuredCities = featuredCityMeta.map((city) => ({
    ...city,
    properties: countByCity[city.name] || 0,
  }));

  return (
    <section className="py-20 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">Explore</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold">Popular Cities</h2>
          </div>
          <Link
            to="/listings#cities"
            className="hidden sm:flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
          >
            View all cities <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {featuredCities.map((city, i) => (
              <motion.div
                key={city.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Link
                  to={`/listings?city=${encodeURIComponent(city.name)}`}
                  className="group relative block aspect-[4/3] rounded-2xl overflow-hidden"
                >
                  <img
                    src={city.image}
                    alt={city.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="font-display text-xl font-bold text-white">{city.name}</h3>
                    <div className="flex items-center gap-1.5 mt-1 text-white/80 text-sm">
                      <Building className="w-3.5 h-3.5" />
                      {city.properties > 0
                        ? `${city.properties} ${city.properties === 1 ? 'property' : 'properties'}`
                        : 'View listings'}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
