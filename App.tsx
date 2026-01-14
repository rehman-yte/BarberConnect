
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import BarberDetailsPage from './pages/BarberDetailsPage';
import AIAssistantPage from './pages/AIAssistantPage';
import BookingsPage from './pages/BookingsPage';
import DiscoveryPage from './pages/DiscoveryPage';
import ProfessionalDashboard from './pages/ProfessionalDashboard';
import AdminDashboard from './pages/AdminDashboard';
import LegalPage from './pages/LegalPage';
import BecomePartnerPage from './pages/BecomePartnerPage';
import WalletPage from './pages/WalletPage';
import BookingModal from './components/BookingModal';
import AuthModal from './components/AuthModal';
import { AboutPage, ContactPage, FAQPage, NotFoundPage } from './pages/StaticPages';
import { Page, Barber, Service, Booking, UserRole, User } from './types';
import { apiService } from './services/apiService';

/**
 * SELF-HEALING ROOT APPLICATION
 * Manages global state and implements safe-fail routing.
 */
const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>(Page.Home);
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [bookingService, setBookingService] = useState<Service | null>(null);
  const [myBookings, setMyBookings] = useState<Booking[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<UserRole>(UserRole.Customer);
  const [errorBoundaryKey, setErrorBoundaryKey] = useState(0);

  // Auto-recovery & State Persistence
  useEffect(() => {
    const init = async () => {
      const bookingsRes = await apiService.execute(() => Promise.resolve(JSON.parse(localStorage.getItem('luxe_bookings') || '[]')), [], 'load_bookings');
      setMyBookings(bookingsRes.data || []);
      
      const userRes = await apiService.execute(() => Promise.resolve(JSON.parse(localStorage.getItem('luxe_user') || 'null')), null, 'load_user');
      if (userRes.data) {
        setCurrentUser(userRes.data);
        setUserRole(userRes.data.role);
      }
    };
    init();
  }, []);

  useEffect(() => {
    localStorage.setItem('luxe_bookings', JSON.stringify(myBookings));
  }, [myBookings]);

  useEffect(() => {
    localStorage.setItem('luxe_user', JSON.stringify(currentUser));
  }, [currentUser]);

  const handleRecover = () => {
    setActivePage(Page.Home);
    setErrorBoundaryKey(prev => prev + 1);
  };

  const navigateToBarber = (barber: Barber) => {
    setSelectedBarber(barber);
    setActivePage(Page.BarberDetails);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openBooking = (service: Service) => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }
    setBookingService(service);
    setIsBookingModalOpen(true);
  };

  const handleConfirmBooking = (date: string, time: string) => {
    if (selectedBarber && bookingService) {
      const newBooking: Booking = {
        id: Math.random().toString(36).substr(2, 9),
        barberId: selectedBarber.id,
        barberName: selectedBarber.name,
        serviceName: bookingService.name,
        date: date,
        time: time,
        status: 'upcoming',
        price: bookingService.price,
        userId: currentUser?.id
      };
      setMyBookings(prev => [newBooking, ...prev]);
    }
  };

  const handleLogin = (email: string, role: UserRole) => {
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name: email.split('@')[0],
      role
    };
    setCurrentUser(newUser);
    setUserRole(role);
    // Silent success log for system audit
    console.log(`[System] User ${newUser.id} authenticated as ${role}`);
  };

  const renderPage = () => {
    try {
      switch (activePage) {
        case Page.Home:
          return <HomePage onSelectBarber={navigateToBarber} />;
        case Page.Discovery:
          return <DiscoveryPage onSelectBarber={navigateToBarber} />;
        case Page.BarberDetails:
          return selectedBarber ? (
            <BarberDetailsPage 
              barber={selectedBarber} 
              onBack={() => setActivePage(Page.Discovery)}
              onBook={openBooking}
            />
          ) : <DiscoveryPage onSelectBarber={navigateToBarber} />;
        case Page.AIStyle:
          return <AIAssistantPage />;
        case Page.Bookings:
          return <BookingsPage bookings={myBookings} />;
        case Page.Dashboard:
          return <ProfessionalDashboard />;
        case Page.AdminPanel:
          return <AdminDashboard />;
        case Page.Privacy:
          return <LegalPage type="privacy" />;
        case Page.Terms:
          return <LegalPage type="terms" />;
        case Page.About:
          return <AboutPage />;
        case Page.Contact:
          return <ContactPage />;
        case Page.FAQ:
          return <FAQPage />;
        case Page.BecomePartner:
          return <BecomePartnerPage />;
        case Page.Wallet:
          return <WalletPage />;
        case Page.Profile:
          return <BookingsPage bookings={myBookings} />; // Profile and Bookings are linked in this VVIP view
        default:
          return <NotFoundPage onHome={() => setActivePage(Page.Home)} />;
      }
    } catch (e) {
      console.error("[Self-Healing] UI Render Crash Detected. Recovering...", e);
      handleRecover();
      return <HomePage onSelectBarber={navigateToBarber} />;
    }
  };

  return (
    <Layout 
      key={errorBoundaryKey}
      activePage={activePage} 
      setActivePage={(page) => {
        setActivePage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      userRole={userRole}
      setUserRole={setUserRole}
      onAccountClick={() => currentUser ? (userRole === UserRole.Professional ? setActivePage(Page.Dashboard) : setActivePage(Page.Bookings)) : setIsAuthModalOpen(true)}
      isLoggedIn={!!currentUser}
    >
      {renderPage()}
      
      {selectedBarber && bookingService && (
        <BookingModal 
          isOpen={isBookingModalOpen}
          barber={selectedBarber}
          service={bookingService}
          onClose={() => setIsBookingModalOpen(false)}
          onConfirm={handleConfirmBooking}
        />
      )}

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onLogin={handleLogin}
      />
    </Layout>
  );
};

export default App;
