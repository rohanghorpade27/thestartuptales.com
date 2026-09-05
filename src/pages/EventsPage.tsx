import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { EventItem } from '../types';
import EventCard from '../components/EventCard';
import { Filter, MapPin, ChevronDown, CalendarDays, Search, User, Tag, ChevronLeft, ChevronRight } from 'lucide-react';
import { deriveEventType, parseSafeDate } from '../utils/helpers';
import { fetchUnifiedEvents } from '../utils/fetchEvents';

interface CustomDropdownProps {
  icon?: React.FC<any>;
  value: string;
  onChange: (val: string) => void;
  options: string[];
  defaultLabel: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({ icon: Icon, value, onChange, options, defaultLabel }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        title={value || defaultLabel}
        className={`relative flex items-center justify-center w-[46px] h-[46px] rounded-xl transition-colors border focus:outline-none focus:ring-2 focus:ring-red-500 ${value ? 'bg-red-50 border-red-200 text-red-600' : 'bg-gray-50 border-gray-200 text-gray-400 hover:bg-gray-100'}`}
      >
        {Icon && <Icon className="w-5 h-5 shrink-0" />}
        {value && <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white translate-x-1/3 -translate-y-1/3"></span>}
      </button>
      
      {isOpen && (
        <div className="absolute z-10 w-56 mt-2 bg-white border border-gray-100 rounded-xl shadow-xl py-2 max-h-60 overflow-auto overflow-x-hidden origin-top-left animate-in fade-in zoom-in-95 duration-200">
          <button
            onClick={() => { onChange(''); setIsOpen(false); }}
            className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center justify-between group ${!value ? 'bg-red-50 text-red-700 font-bold' : 'text-gray-700 hover:bg-gray-50 hover:text-red-600'}`}
          >
            {defaultLabel}
            {!value && <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>}
          </button>
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => { onChange(opt); setIsOpen(false); }}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center justify-between group ${value === opt ? 'bg-red-50 text-red-700 font-bold' : 'text-gray-700 hover:bg-gray-50 hover:text-red-600'}`}
            >
              {opt}
              {value === opt && <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

interface MultiSelectSearchDropdownProps {
  icon?: React.FC<any>;
  values: string[];
  onChange: (vals: string[]) => void;
  options: string[];
  defaultLabel: string;
}

const MultiSelectSearchDropdown: React.FC<MultiSelectSearchDropdownProps> = ({ icon: Icon, values, onChange, options, defaultLabel }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = options.filter(opt => opt.toLowerCase().includes(searchTerm.toLowerCase()));

  const toggleOption = (opt: string) => {
    if (values.includes(opt)) {
      onChange(values.filter(v => v !== opt));
    } else {
      onChange([...values, opt]);
    }
  };

  return (
    <div className="relative w-full sm:flex-1" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between pl-4 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        <div className="flex items-center gap-2 overflow-hidden">
          {Icon && <Icon className="w-4 h-4 text-gray-400 shrink-0" />}
          <span className="truncate">
            {values.length > 0 ? `${values.length} Selected` : defaultLabel}
          </span>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl py-2 max-h-80 overflow-hidden flex flex-col origin-top animate-in fade-in zoom-in-95 duration-200">
          <div className="px-3 pb-2 pt-1 border-b border-gray-100 flex items-center gap-2">
            <div className="relative flex-grow">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search types..." 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-red-300 focus:ring-1 focus:ring-red-300"
              />
            </div>
            {values.length > 0 && (
              <button 
                onClick={() => onChange([])}
                className="text-xs text-red-600 hover:text-red-700 font-medium whitespace-nowrap px-2"
                title="Clear all"
              >
                Clear
              </button>
            )}
          </div>
          <div className="overflow-y-auto max-h-60 py-1">
            {filteredOptions.length === 0 ? (
              <div className="px-4 py-3 text-sm text-gray-500 text-center">No matches</div>
            ) : (
              filteredOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => toggleOption(opt)}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors flex items-center justify-between group ${values.includes(opt) ? 'bg-red-50 text-red-700 font-medium' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  <span className="truncate pr-2">{opt}</span>
                  {values.includes(opt) && <span className="w-4 h-4 rounded text-red-600 flex-shrink-0 flex items-center justify-center">✓</span>}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const EventsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Initialize state from URL params or default to empty
  const [locationFilter, setLocationFilter] = useState(searchParams.get('location') || '');
  const [dateFilter, setDateFilter] = useState(searchParams.get('date') || '');
  const [hostFilter, setHostFilter] = useState<string[]>(searchParams.get('hosts') ? searchParams.get('hosts')!.split(',') : []);
  const [typeFilter, setTypeFilter] = useState<string[]>(searchParams.get('types') ? searchParams.get('types')!.split(',') : []);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const gridTopRef = useRef<HTMLDivElement>(null);
  
  const EVENTS_PER_PAGE = 12;
  const FALLBACK_STRING = "data not provided/will be shared upon signup";

  useEffect(() => {

    fetchUnifiedEvents()
      .then((eventsData) => {
        setEvents(eventsData);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error fetching events:', err);
        setIsLoading(false);
      });
  }, []);
  
  // Extract unique locations for the filter dropdowns
  const uniqueLocations = Array.from(new Set(
    events
      .filter(e => (e.city || e.venue) && e.venue !== FALLBACK_STRING)
      .map(e => {
        if (e.city) return e.city.trim();
        const parts = e.venue.split(',');
        return parts[parts.length - 1].trim();
      })
  )).sort();
  
  const uniqueHosts = Array.from(new Set(
    events
      .filter(e => e.host && e.host !== FALLBACK_STRING)
      .map(e => e.host.trim())
  )).sort();
  
  // Extract unique types and top 4 trending topics
  const typeCounts: Record<string, number> = {};
  events.forEach(e => {
    const type = deriveEventType(e['event name']);
    if (type) {
      typeCounts[type] = (typeCounts[type] || 0) + 1;
    }
  });
  
  const sortedTypesByFreq = Object.entries(typeCounts)
    .sort((a, b) => b[1] - a[1]) // Sort by frequency descending
    .map(entry => entry[0]);
    
  const top4Types = sortedTypesByFreq.slice(0, 4);
  const remainingTypes = sortedTypesByFreq.slice(4).sort();
  
  // Update URL params when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (locationFilter) params.set('location', locationFilter);
    if (dateFilter) params.set('date', dateFilter);
    if (hostFilter.length > 0) params.set('hosts', hostFilter.join(','));
    if (typeFilter.length > 0) params.set('types', typeFilter.join(','));
    setSearchParams(params, { replace: true });
    
    // Reset to page 1 whenever filters change
    setCurrentPage(1);
  }, [locationFilter, dateFilter, hostFilter, typeFilter, setSearchParams]);

  // Handle changes in URL params from other navigation (e.g. Map clicks)
  useEffect(() => {
    const loc = searchParams.get('location');
    if (loc !== null && loc !== locationFilter) {
      setLocationFilter(loc);
    }
    
    const hosts = searchParams.get('hosts');
    if (hosts !== null) {
      const hostsArr = hosts.split(',');
      if (hostsArr.join(',') !== hostFilter.join(',')) {
        setHostFilter(hostsArr);
      }
    } else if (hostFilter.length > 0) {
      setHostFilter([]);
    }

    const types = searchParams.get('types');
    if (types !== null) {
      const typesArr = types.split(',');
      if (typesArr.join(',') !== typeFilter.join(',')) {
        setTypeFilter(typesArr);
      }
    } else if (typeFilter.length > 0) {
      setTypeFilter([]);
    }
  }, [searchParams]);

  // Filter the events
  const filteredEvents = events.filter(event => {
    let matchesLocation = true;
    if (locationFilter) {
      if (event.city) {
        matchesLocation = event.city.toLowerCase() === locationFilter.toLowerCase();
      } else {
        const parts = event.venue.split(',');
        const city = parts[parts.length - 1].trim();
        matchesLocation = city.toLowerCase() === locationFilter.toLowerCase();
      }
    }
    
    
    let matchesDate = true;
    if (dateFilter) {
      try {
        const eventDateObj = parseSafeDate(event['date and time']);
        if (!isNaN(eventDateObj.getTime())) {
          const eventDate = eventDateObj.toISOString().split('T')[0];
          matchesDate = eventDate === dateFilter;
        } else {
          matchesDate = false;
        }
      } catch (e) {
        matchesDate = false;
      }
    }
    
    let matchesHost = true;
    if (hostFilter.length > 0) {
      matchesHost = hostFilter.includes(event.host?.trim() || '');
    }
    
    let matchesType = true;
    if (typeFilter.length > 0) {
      const eventType = deriveEventType(event['event name']);
      matchesType = eventType !== null && typeFilter.includes(eventType);
    }
    
    return matchesLocation && matchesDate && matchesHost && matchesType;
  });

  const totalPages = Math.ceil(filteredEvents.length / EVENTS_PER_PAGE);
  const paginatedEvents = filteredEvents.slice((currentPage - 1) * EVENTS_PER_PAGE, currentPage * EVENTS_PER_PAGE);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    if (gridTopRef.current) {
      gridTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="pt-32 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">
            Discover <span className="text-red-600">Events</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Discover and register for the latest startup mixers, pitch circuits, and founder masterclasses across India.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 mb-8 flex flex-col md:flex-row gap-4 items-center">

          <div className="w-full flex flex-col sm:flex-row gap-4">
            {/* Left Icons: Location & Calendar */}
            <div className="flex gap-4 shrink-0">
              <CustomDropdown
                icon={MapPin}
                value={locationFilter}
                onChange={setLocationFilter}
                options={uniqueLocations}
                defaultLabel="All Locations"
              />

              <div className="relative group">
                <button
                  className={`relative flex items-center justify-center w-[46px] h-[46px] rounded-xl transition-colors border focus:outline-none focus:ring-2 focus:ring-red-500 ${dateFilter ? 'bg-red-50 border-red-200 text-red-600' : 'bg-gray-50 border-gray-200 text-gray-400 group-hover:bg-gray-100'}`}
                  title={dateFilter || 'All Dates'}
                >
                  <CalendarDays className="w-5 h-5 shrink-0" />
                  {dateFilter && <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white translate-x-1/3 -translate-y-1/3"></span>}
                </button>
                
                <input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-0"
                  title={dateFilter || 'All Dates'}
                />

                {dateFilter && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setDateFilter('');
                    }}
                    className="absolute right-0 top-0 translate-x-1/3 -translate-y-1/3 z-10 w-4 h-4 rounded-full bg-red-500 flex items-center justify-center text-white hover:bg-red-600 transition-colors shadow-sm"
                    title="Clear Date"
                  >
                    <span className="text-[10px] font-bold leading-none mb-[1px]">×</span>
                  </button>
                )}
              </div>
            </div>

            {/* Trending Types Pills */}
            <div className="flex flex-wrap gap-2 w-full items-center">
              {top4Types.map(type => (
                <button 
                  key={type}
                  onClick={() => {
                    if (typeFilter.includes(type)) {
                      setTypeFilter(typeFilter.filter(t => t !== type));
                    } else {
                      setTypeFilter([...typeFilter, type]);
                    }
                  }}
                  className={`px-4 h-[46px] rounded-xl font-medium text-sm transition-colors border shrink-0 flex items-center justify-center ${typeFilter.includes(type) ? 'bg-gray-900 border-gray-900 text-white shadow-sm' : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100 hover:border-gray-300'}`}
                >
                  {type}
                </button>
              ))}
              
              {/* More Types Dropdown */}
              {remainingTypes.length > 0 && (
                <div className="flex-1 min-w-[140px] max-w-[240px]">
                  <MultiSelectSearchDropdown
                    icon={Tag}
                    values={typeFilter}
                    onChange={setTypeFilter}
                    options={remainingTypes}
                    defaultLabel="More Types"
                  />
                </div>
              )}
            </div>
          </div>
          
          {(locationFilter || dateFilter || hostFilter.length > 0 || typeFilter.length > 0) && (
            <button 
              onClick={() => {
                setLocationFilter('');
                setDateFilter('');
                setHostFilter([]);
                setTypeFilter([]);
              }}
              className="text-sm font-medium text-red-600 hover:text-red-700 whitespace-nowrap bg-red-50 px-4 py-2.5 rounded-xl transition-colors hover:bg-red-100"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Events Grid */}
        <div ref={gridTopRef} className="scroll-mt-24">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-12 h-12 border-4 border-red-200 border-t-red-600 rounded-full animate-spin"></div>
            </div>
          ) : filteredEvents.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedEvents.map(event => (
                  <EventCard key={event.event_url} event={event} />
                ))}
              </div>
              
              {totalPages > 1 && (
                <div className="flex justify-center items-center mt-12 gap-6">
                  <button
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="p-2 bg-white border border-gray-200 rounded-full text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 hover:text-red-600 transition-colors shadow-sm"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <div className="text-gray-400 font-medium text-lg flex items-center gap-1.5">
                    <span className="text-red-600 font-bold">{currentPage}</span>
                    <span className="text-sm">/</span>
                    <span className="text-sm">{totalPages}</span>
                  </div>
                  <button
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 bg-white border border-gray-200 rounded-full text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 hover:text-red-600 transition-colors shadow-sm"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </>
          ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
            <h3 className="text-xl font-bold text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-500">We couldn't find any events matching your current filters.</p>
            <button 
              onClick={() => {
                setLocationFilter('');
                setDateFilter('');
                setHostFilter([]);
                setTypeFilter([]);
              }}
              className="mt-4 text-red-600 font-semibold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
