
import React from 'react';
import { Booking } from '../types';
import { Calendar, Clock, MapPin, Scissors, ChevronRight } from 'lucide-react';

interface BookingsPageProps {
  bookings: Booking[];
}

const BookingsPage: React.FC<BookingsPageProps> = ({ bookings }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-4xl font-serif font-bold mb-2">My Appointments</h1>
          <p className="text-slate-500">Manage your grooming schedule.</p>
        </div>
        <button className="bg-white border border-slate-200 px-6 py-2 rounded-full text-sm font-bold hover:border-black transition-all">
          History
        </button>
      </div>

      {bookings.length > 0 ? (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div 
              key={booking.id} 
              className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between space-y-6 md:space-y-0">
                <div className="flex items-center space-x-6">
                  <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-white">
                    <Scissors className="w-8 h-8" />
                  </div>
                  <div>
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-[10px] font-bold uppercase tracking-widest rounded-full mb-2">
                      {booking.status}
                    </span>
                    <h3 className="text-2xl font-bold">{booking.serviceName}</h3>
                    <p className="text-slate-500 font-medium">with {booking.barberName}</p>
                  </div>
                </div>

                <div className="flex flex-col md:items-end space-y-2">
                  <div className="flex items-center space-x-2 text-slate-600 font-medium">
                    <Calendar className="w-4 h-4" />
                    <span>{booking.date}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-400">
                    <Clock className="w-4 h-4" />
                    <span>{booking.time}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <span className="block text-2xl font-bold">${booking.price}</span>
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">At the shop</span>
                  </div>
                  <button className="p-3 bg-slate-50 text-slate-400 rounded-2xl group-hover:bg-black group-hover:text-white transition-all">
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
          <Calendar className="w-16 h-16 text-slate-200 mx-auto mb-6" />
          <h3 className="text-2xl font-bold mb-2">No bookings yet</h3>
          <p className="text-slate-400 mb-8 max-w-xs mx-auto">Discover top-rated barbers and schedule your first appointment today.</p>
          <button className="bg-black text-white px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-slate-300 transition-all">
            Find a Barber
          </button>
        </div>
      )}
    </div>
  );
};

export default BookingsPage;
