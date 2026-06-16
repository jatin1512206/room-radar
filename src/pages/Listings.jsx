import React, { useState, useMemo, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { listProperties } from '@/api/properties';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, LayoutGrid, List, Loader2 } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import PropertyCard from '@/components/listing/PropertyCard';
import FilterSidebar from '@/components/listing/FilterSidebar';
import CityBrowse from '@/components/listing/CityBrowse';

export default function Listings() {
  const urlParams = new URLSearchParams(window.location.search);
  const initialCity = urlParams.get('city') || '';
  const initialCollege = urlParams.get('college') || '';

  const [filters, setFilters] = useState({
    city: initialCity,
    college: initialCollege,
    budget: [0, 25000],
    property_type: [],
    gender: [],
    sharing: [],
    facilities: [],
  });

  const [page, setPage] = useState(1);
  const perPage = 12;

  useEffect(() => {
    if (window.location.hash === '#cities') {
      document.getElementById('cities')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const { data: properties = [], isLoading } = useQuery({
    queryKey: ['properties'],
    queryFn: () => listProperties(300),
  });

  const filteredProperties = useMemo(() => {
    return properties.filter(p => {
      if (filters.city && filters.city !== 'all_cities' && p.city !== filters.city) return false;
      if (filters.college && p.nearest_college !== filters.college) return false;
      if (p.price_per_month < filters.budget[0] || p.price_per_month > filters.budget[1]) return false;
      if (filters.property_type.length > 0 && !filters.property_type.includes(p.property_type)) return false;
      if (filters.gender.length > 0 && !filters.gender.includes(p.gender)) return false;
      if (filters.sharing.length > 0) {
        const hasSharing = filters.sharing.some(s => p.sharing_options?.includes(s));
        if (!hasSharing) return false;
      }
      if (filters.facilities.length > 0) {
        const hasFacilities = filters.facilities.every(f => p.facilities?.includes(f));
        if (!hasFacilities) return false;
      }
      return true;
    });
  }, [properties, filters]);

  const paginatedProperties = filteredProperties.slice(0, page * perPage);
  const hasMore = paginatedProperties.length < filteredProperties.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold">
            {filters.city && filters.city !== 'all_cities' ? `Rooms in ${filters.city}` : 'All Properties'}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {filteredProperties.length} properties found
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Mobile filter button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="lg:hidden gap-2">
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 overflow-y-auto">
              <FilterSidebar filters={filters} setFilters={setFilters} isMobile onClose={() => {}} />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <CityBrowse
        properties={properties}
        activeCity={filters.city}
        onSelectCity={(city) => {
          setFilters((prev) => ({
            ...prev,
            city,
            college: '',
          }));
          setPage(1);
          const url = new URL(window.location.href);
          if (city) {
            url.searchParams.set('city', city);
          } else {
            url.searchParams.delete('city');
          }
          url.searchParams.delete('college');
          window.history.replaceState({}, '', url.pathname + url.search);
        }}
      />

      <div className="flex gap-8">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-72 shrink-0">
          <div className="bg-card rounded-2xl border border-border/60 p-5">
            <FilterSidebar filters={filters} setFilters={setFilters} />
          </div>
        </aside>

        {/* Properties Grid */}
        <div className="flex-1">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : paginatedProperties.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                <AnimatePresence>
                  {paginatedProperties.map((property, i) => (
                    <PropertyCard key={property.id} property={property} index={i} />
                  ))}
                </AnimatePresence>
              </div>

              {hasMore && (
                <div className="flex justify-center mt-10">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setPage(p => p + 1)}
                    className="font-medium"
                  >
                    Load More Properties
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <LayoutGrid className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">No properties found</h3>
              <p className="text-muted-foreground text-sm mb-4">
                {filters.city
                  ? `No listings in ${filters.city} yet. Try another city or view all properties.`
                  : 'Try adjusting your filters to see more results.'}
              </p>
              {filters.city && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setFilters((prev) => ({ ...prev, city: '', college: '' }));
                    setPage(1);
                    window.history.replaceState({}, '', '/listings');
                  }}
                >
                  View all properties
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}