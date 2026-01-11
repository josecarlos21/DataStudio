import { Injectable, signal } from '@angular/core';
import { Event, UserNearby, DistrictMoment } from './types';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  private itinerary: Event[] = [
    { 
      id: 'bd_0', 
      location: 'Tryst Rooftop', 
      title: 'Llegada y Relax', 
      track: 'community', 
      start: '2026-01-23T20:00:00', 
      dress: 'Casual', 
      color: '#D2B48C', 
      image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=400&q=80',
      description: 'Check-in en el distrito y cócteles de bienvenida.'
    },
    { 
      id: 'bd_1', 
      location: 'Tryst Rooftop', 
      title: 'Pre-Party District', 
      track: 'beefdip', 
      start: '2026-01-24T21:00:00', 
      dress: 'Bear Gear', 
      color: '#8B1538', 
      image: 'https://images.unsplash.com/photo-1514525253361-bee8718a7439?auto=format&fit=crop&w=400&q=80',
      isFeatured: true
    },
    { 
      id: 'bd_2', 
      location: 'Blue Chairs', 
      title: 'Fiesta de Bienvenida', 
      track: 'beefdip', 
      start: '2026-01-25T15:00:00', 
      dress: 'Casual', 
      color: '#FF8C00', 
      image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=800&q=80',
      description: 'La gran apertura del festival frente al mar.'
    },
    { 
      id: 'bd_3', 
      location: 'Blue Chairs', 
      title: 'Fiesta de Espuma', 
      track: 'beefdip', 
      start: '2026-01-26T12:00:00', 
      dress: 'Traje de baño', 
      color: '#00E5FF', 
      image: 'https://images.unsplash.com/photo-1530103043960-ef38714abb15?auto=format&fit=crop&w=800&q=80' 
    },
    { 
      id: 'bd_4', 
      location: 'CC Slaughters', 
      title: 'Disco Infurno', 
      track: 'beefdip', 
      start: '2026-01-26T22:00:00', 
      dress: 'Glitter', 
      color: '#8B1538', 
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80' 
    },
    { 
      id: 'bd_5', 
      location: 'Hotel Delfín', 
      title: 'Splash Party', 
      track: 'beefdip', 
      start: '2026-01-27T11:00:00', 
      dress: 'Traje de baño', 
      color: '#FF8C00', 
      image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=400&q=80' 
    }
  ];

  private usersNearby: UserNearby[] = [
    { id: 1, name: 'Beto', age: 34, dist: 'AQUÍ', img: 'https://i.pravatar.cc/150?u=1', online: true },
    { id: 2, name: 'Carlos', age: 29, dist: '150m', img: 'https://i.pravatar.cc/150?u=2', online: true },
    { id: 3, name: 'Sergio', age: 41, dist: '300m', img: 'https://i.pravatar.cc/150?u=3', online: false },
    { id: 4, name: 'Marcus', age: 38, dist: '500m', img: 'https://i.pravatar.cc/150?u=4', online: true },
    { id: 5, name: 'David', age: 35, dist: '1km', img: 'https://i.pravatar.cc/150?u=5', online: false },
    { id: 6, name: 'Iván', age: 31, dist: '1.2km', img: 'https://i.pravatar.cc/150?u=6', online: true }
  ];

  private moments: DistrictMoment[] = [
    { id: 'r1', type: 'tip', title: 'Mejor Margarita', content: 'Prueba la de mango en "La Margarita". Tip del comité.', img: 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?auto=format&fit=crop&w=400&q=80' },
    { id: 'r2', type: 'moment', title: 'Atardecer District', content: 'Sunset en Los Muertos hace 10 min.', img: 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?auto=format&fit=crop&w=400&q=80' },
    { id: 'r3', type: 'info', title: 'Transporte Seguro', content: 'Usa los taxis oficiales afuera de Blue Chairs.', img: 'https://images.unsplash.com/photo-1556122071-e404970c7ff8?auto=format&fit=crop&w=400&q=80' }
  ];

  getItinerary() { return signal(this.itinerary); }
  getUsersNearby() { return signal(this.usersNearby); }
  getMoments() { return signal(this.moments); }
}