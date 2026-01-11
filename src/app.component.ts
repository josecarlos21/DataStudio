import { Component, ChangeDetectionStrategy, signal, computed, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleService } from './schedule.service';
import { Event, UserNearby, DistrictMoment } from './types';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private scheduleService = inject(ScheduleService);

  // App State
  activeTab = signal<'home' | 'explore' | 'schedule' | 'wallet' | 'map'>('home');
  selectedEvent = signal<Event | null>(null);
  
  // Schedule Filtering State
  scheduleSearchQuery = signal<string>('');
  selectedTrackFilter = signal<string>('ALL');
  selectedDateFilter = signal<string>('ALL');
  
  // Data
  itinerary = this.scheduleService.getItinerary();
  usersNearby = this.scheduleService.getUsersNearby();
  moments = this.scheduleService.getMoments();

  // Derived Filtered Schedule
  filteredSchedule = computed(() => {
    const query = this.scheduleSearchQuery().toLowerCase().trim();
    const track = this.selectedTrackFilter();
    const date = this.selectedDateFilter();
    
    return this.itinerary().filter(event => {
      // Search filter
      const matchesSearch = !query || 
        event.title.toLowerCase().includes(query) || 
        event.location.toLowerCase().includes(query);
      
      // Track filter
      const matchesTrack = track === 'ALL' || event.track === track;
      
      // Date filter (Extracting day from start ISO string for simplicity)
      // Format is '2026-01-23T...'
      const eventDay = event.start.split('T')[0].split('-')[2];
      const matchesDate = date === 'ALL' || eventDay === date;

      return matchesSearch && matchesTrack && matchesDate;
    });
  });

  // Track options for filtering
  trackOptions = ['ALL', 'community', 'beefdip', 'vip', 'social'];
  
  // Date options extracted from data
  dateOptions = computed(() => {
    const dates = new Set<string>();
    this.itinerary().forEach(e => {
      dates.add(e.start.split('T')[0].split('-')[2]);
    });
    return ['ALL', ...Array.from(dates).sort()];
  });

  // SOS Logic
  isSOS = signal(false);
  sosProgress = signal(0);
  private sosTimer: any;

  // Island Expansion
  islandExpanded = signal(false);

  // Computed State for Island
  islandState = computed(() => {
    if (this.isSOS()) return 'SOS';
    if (this.selectedEvent()) return 'EVENT';
    if (this.activeTab() === 'map') return 'NAV';
    if (this.activeTab() === 'wallet') return 'SECURE';
    return 'IDLE';
  });

  constructor() {
    // SOS effect for progression
    effect(() => {
      if (this.isSOS()) {
        this.sosTimer = setInterval(() => {
          this.sosProgress.update(p => {
            if (p >= 100) {
              clearInterval(this.sosTimer);
              // In a real device, this would call 911
              alert("Llamando a emergencias (911 Vallarta)...");
              return 100;
            }
            return p + 4;
          });
        }, 50);
      } else {
        clearInterval(this.sosTimer);
        this.sosProgress.set(0);
      }
    });

    // Auto-expand island on state change
    effect(() => {
      const state = this.islandState();
      if (state !== 'IDLE') {
        this.islandExpanded.set(true);
        setTimeout(() => this.islandExpanded.set(false), 3000);
      }
    });
  }

  setTab(tab: any) {
    this.activeTab.set(tab);
    this.selectedEvent.set(null);
  }

  onEventClick(event: Event) {
    this.selectedEvent.set(event);
  }

  closeDetail() {
    this.selectedEvent.set(null);
  }

  startSOS() {
    this.isSOS.set(true);
  }

  stopSOS() {
    this.isSOS.set(false);
  }

  onSearchInput(e: globalThis.Event) {
    const val = (e.target as HTMLInputElement).value;
    this.scheduleSearchQuery.set(val);
  }

  setTrackFilter(track: string) {
    this.selectedTrackFilter.set(track);
  }

  setDateFilter(date: string) {
    this.selectedDateFilter.set(date);
  }

  // Helper for rendering
  get liveEvent() {
    return this.itinerary()[1]; // Pre-party
  }

  get stats() {
    return [
      { label: 'Densidad Actual', value: 'ALTA', color: '#FF8C00' },
      { label: 'Clima Social', value: 'EXCELENTE', color: '#D2B48C' }
    ];
  }

  formatTime(iso: string) {
    const time = iso.split('T')[1].substring(0, 5);
    return time;
  }

  formatDay(iso: string) {
    const day = iso.split('T')[0].split('-')[2];
    return day;
  }
}