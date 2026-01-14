
import React, { useState } from 'react';
import { Barber, Service } from '../types';
import { X, Calendar as CalendarIcon, Clock, CheckCircle } from 'lucide-react';

interface BookingModalProps {
  barber: Barber;
  service: Service;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (date: string, time: string) => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ barber, service, isOpen, onClose, onConfirm }) => {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState('Oct 24, 2023');
  const [selectedTime, setSelectedTime] = useState('');

  if (!isOpen) return null;

  const dates = [
    { label: 'Today', sub: 'Oct 23' },
    { label: 'Tue', sub: 'Oct 24' },
    { label: 'Wed', sub: 'Oct 25' },
    { label: 'Thu', sub: 'Oct 26' },
    { label: 'Fri', sub: 'Oct 27' },
  ];

  const times = ['09:00 AM', '10:30 AM', '11:15 AM', '01:00 PM', '02:30 PM', '04:00 PM'];

  const handleConfirm = () => {
    onConfirm(selectedDate, selectedTime);
    setStep(3); // Show success
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-slate-400 hover:text-black hover:bg-slate-100 rounded-full transition-all"
        >
          <X className="w-6 h-6" />
        </button>

        {step === 1 && (
          <div className="p-8">
            <h2 className="text-3xl font-serif font-bold mb-2">Book Appointment</h2>
            <p className="text-slate-500 mb-8">{service.name} with {barber.name}</p>

            <div className="mb-8">
              <label className="block text-sm font-bold text-slate-700 mb-4 uppercase tracking-widest flex items-center">
                <CalendarIcon className="w-4 h-4 mr-2" />
                Select Date
              </label>
              <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
                {dates.map((date) => (
                  <button
                    key={date.sub}
                    onClick={() => setSelectedDate(date.sub)}
                    className={`flex flex-col items-center min-w-[70px] p-4 rounded-2xl border-2 transition-all ${
                      selectedDate === date.sub 
                      ? 'border-black bg-slate-50 shadow-inner' 
                      : 'border-slate-100 hover:border-slate-200'
                    }`}
                  >
                    <span className="text-[10px] font-bold uppercase text-slate-400 mb-1">{date.label}</span>
                    <span className="text-lg font-bold">{date.sub.split(' ')[1]}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-10">
              <label className="block text-sm font-bold text-slate-700 mb-4 uppercase tracking-widest flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                Available Times
              </label>
              <div className="grid grid-cols-3 gap-3">
                {times.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`py-3 rounded-xl border-2 text-sm font-bold transition-all ${
                      selectedTime === time 
                      ? 'border-black bg-slate-50' 
                      : 'border-slate-100 hover:border-slate-200'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <button 
              disabled={!selectedTime}
              onClick={() => setStep(2)}
              className={`w-full py-4 rounded-2xl font-bold text-lg shadow-lg transition-all ${
                selectedTime 
                ? 'bg-black text-white hover:bg-slate-800 scale-[1.01]' 
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              Confirm Details
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="p-8">
            <h2 className="text-3xl font-serif font-bold mb-8">Confirm Booking</h2>
            
            <div className="space-y-6 mb-10">
              <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                <span className="text-slate-500">Service</span>
                <span className="font-bold">{service.name}</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                <span className="text-slate-500">Barber</span>
                <span className="font-bold">{barber.name}</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                <span className="text-slate-500">When</span>
                <span className="font-bold">{selectedDate} @ {selectedTime}</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-lg font-bold">Total</span>
                <span className="text-2xl font-bold">${service.price}</span>
              </div>
            </div>

            <div className="space-y-4">
              <button 
                onClick={handleConfirm}
                className="w-full bg-black text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:bg-slate-800 transition-all"
              >
                Complete Booking
              </button>
              <button 
                onClick={() => setStep(1)}
                className="w-full text-slate-500 py-2 font-bold hover:text-black transition-all"
              >
                Back to selection
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="p-12 text-center">
            <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-in zoom-in-50 duration-500">
              <CheckCircle className="w-12 h-12" />
            </div>
            <h2 className="text-3xl font-serif font-bold mb-4">Confirmed!</h2>
            <p className="text-slate-500 mb-8 leading-relaxed">
              Your appointment with <span className="text-black font-bold">{barber.name}</span> is set for <span className="text-black font-bold">{selectedDate}</span>. We've sent you a confirmation email.
            </p>
            <button 
              onClick={onClose}
              className="w-full bg-black text-white py-4 rounded-2xl font-bold text-lg shadow-lg transition-all"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingModal;
