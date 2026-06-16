import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { cities } from '@/lib/cityCollegeData';

export default function CityBrowse({ properties = [], activeCity = '', onSelectCity }) {
  const countByCity = properties.reduce((acc, p) => {
    if (p.city) acc[p.city] = (acc[p.city] || 0) + 1;
    return acc;
  }, {});

  const handleClick = (city) => {
    if (onSelectCity) {
      onSelectCity(city);
      return;
    }
  };

  return (
    <section id="cities" className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-display text-lg font-semibold">Browse by city</h2>
          <p className="text-sm text-muted-foreground">
            {cities.length} cities across India
          </p>
        </div>
        {activeCity && (
          <Link
            to="/listings"
            className="text-sm font-medium text-primary hover:underline shrink-0"
          >
            View all properties
          </Link>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => handleClick('')}
          className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium border transition-colors ${
            !activeCity
              ? 'bg-primary text-primary-foreground border-primary'
              : 'bg-secondary/50 border-border hover:border-primary/40 hover:bg-secondary'
          }`}
        >
          All cities
        </button>
        {cities.map((city) => {
          const count = countByCity[city] || 0;
          const isActive = activeCity === city;
          return (
            <button
              key={city}
              type="button"
              onClick={() => handleClick(city)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium border transition-colors ${
                isActive
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-secondary/50 border-border hover:border-primary/40 hover:bg-secondary'
              }`}
            >
              <MapPin className="w-3.5 h-3.5 shrink-0 opacity-70" />
              {city}
              {count > 0 && (
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-full ${
                    isActive ? 'bg-primary-foreground/20' : 'bg-primary/10 text-primary'
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
