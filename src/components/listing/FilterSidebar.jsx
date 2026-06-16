import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cities, collegesByCity, allFacilities } from '@/lib/cityCollegeData';
import { X } from 'lucide-react';

const propertyTypes = [
  { value: 'pg', label: 'PG' },
  { value: 'hostel', label: 'Hostel' },
  { value: 'room', label: 'Room' },
  { value: 'flat', label: 'Flat' },
];

const genderOptions = [
  { value: 'boys', label: 'Boys' },
  { value: 'girls', label: 'Girls' },
  { value: 'co-ed', label: 'Co-ed' },
];

const sharingOptions = ['Single', 'Double', 'Triple', 'Quad'];

const defaultFilters = {
  city: '',
  college: '',
  budget: [0, 25000],
  property_type: [],
  gender: [],
  sharing: [],
  facilities: [],
};

export default function FilterSidebar({ filters, setFilters, isMobile = false, onClose }) {
  const colleges = filters.city ? (collegesByCity[filters.city] || []) : [];

  const toggleArray = (key, value) => {
    setFilters((prev) => {
      const arr = prev[key];
      return {
        ...prev,
        [key]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
      };
    });
  };

  const clearFilters = () => {
    setFilters({ ...defaultFilters });
  };

  return (
    <div className="space-y-6">
      {isMobile && (
        <div className="flex items-center justify-between">
          <h2 className="font-display font-semibold text-lg">Filters</h2>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close filters">
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}

      <div>
        <Label className="mb-2 block">City</Label>
        <Select
          value={filters.city || 'all_cities'}
          onValueChange={(v) =>
            setFilters((prev) => ({
              ...prev,
              city: v === 'all_cities' ? '' : v,
              college: '',
            }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="All cities" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all_cities">All cities</SelectItem>
            {cities.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {colleges.length > 0 && (
        <div>
          <Label className="mb-2 block">College</Label>
          <Select
            value={filters.college || 'all_colleges'}
            onValueChange={(v) =>
              setFilters((prev) => ({
                ...prev,
                college: v === 'all_colleges' ? '' : v,
              }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="All colleges" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all_colleges">All colleges</SelectItem>
              {colleges.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div>
        <Label className="mb-3 block">
          Monthly budget: ₹{filters.budget[0].toLocaleString()} – ₹{filters.budget[1].toLocaleString()}
        </Label>
        <Slider
          min={0}
          max={25000}
          step={500}
          value={filters.budget}
          onValueChange={(value) => setFilters((prev) => ({ ...prev, budget: value }))}
        />
      </div>

      <div>
        <Label className="mb-3 block">Property type</Label>
        <div className="space-y-2">
          {propertyTypes.map(({ value, label }) => (
            <label key={value} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={filters.property_type.includes(value)}
                onCheckedChange={() => toggleArray('property_type', value)}
              />
              <span className="text-sm">{label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <Label className="mb-3 block">Gender</Label>
        <div className="space-y-2">
          {genderOptions.map(({ value, label }) => (
            <label key={value} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={filters.gender.includes(value)}
                onCheckedChange={() => toggleArray('gender', value)}
              />
              <span className="text-sm capitalize">{label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <Label className="mb-3 block">Sharing</Label>
        <div className="flex flex-wrap gap-2">
          {sharingOptions.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => toggleArray('sharing', opt)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                filters.sharing.includes(opt)
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-secondary/50 border-border hover:border-primary/40'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div>
        <Label className="mb-3 block">Facilities</Label>
        <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto">
          {allFacilities.map((f) => (
            <label key={f} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={filters.facilities.includes(f)}
                onCheckedChange={() => toggleArray('facilities', f)}
              />
              <span className="text-sm">{f}</span>
            </label>
          ))}
        </div>
      </div>

      <Button variant="outline" className="w-full" onClick={clearFilters}>
        Clear all filters
      </Button>
    </div>
  );
}
