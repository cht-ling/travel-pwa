export interface Traveler {
  id: string;
  fullNameEn: string; // Name as shown in passport
  fullNameLocal?: string;
  passportNumber?: string;
  nationality?: string; // e.g. TAIWAN (ROC)
  dateOfBirth?: string;
  gender?: string;
  contactPhone: string;
  email?: string;
  isPrimary: boolean;
  assignedFlightGroupId?: string;
}

export interface EmergencyContact {
  name?: string;
  relationship?: string;
  phone?: string;
  email?: string;
}

export interface FlightLeg {
  id?: string;
  airline: string;
  flightNumber: string;
  departureAirport: string;
  arrivalAirport: string;
  departureDate: string;
  departureTime?: string;
  arrivalDate?: string;
  arrivalTime?: string;
  terminal?: string;
  aircraft?: string;
  cabinClass?: string;
  duration?: string;
  status?: string;
}

export interface FlightInfo {
  type: 'inbound' | 'outbound' | 'transit';
  airline: string;
  flightNumber: string;
  departureAirport: string;
  arrivalAirport: string;
  departureDate: string;
  departureTime: string;
  arrivalDate: string;
  arrivalTime: string;
  bookingReference?: string;
  terminal?: string;
  transitAirport?: string;
  stops?: number;
  duration?: string;
  fareBasis?: string;
  baggage?: string;
  frequentFlyer?: string;
  status?: string;
  legs?: FlightLeg[];
}

export interface FlightGroup {
  id: string;
  groupName: string; // Human-readable passenger group label
  travelerNames: string[];
  airlineName: string;
  inboundFlight: FlightInfo;
  ukExitFlight?: FlightInfo; // 2026-09-26 London (LHR) -> Iceland (KEF)
  icelandToNlFlight?: FlightInfo; // 2026-10-08 Iceland (KEF) -> Amsterdam (AMS)
  outboundFlight: FlightInfo;
}

export interface Accommodation {
  id: string;
  hotelName: string;
  hotelNameLocal?: string;
  travelerLabel?: string;
  fullAddress: string;
  city: string;
  phoneNumber: string;
  bookingReference: string;
  checkInDate: string;
  checkOutDate: string;
  nights: number;
}

export interface TicketOption {
  name: string;
  onlinePrice?: string;
  onsitePrice?: string;
  note?: string;
}

export interface DayItinerary {
  dayNumber: number;
  date: string;
  dayOfWeek: string;
  cityOrArea: string;
  morningActivity: string;
  afternoonActivity: string;
  eveningActivity: string;
  notes?: string;
  ticketOptions?: TicketOption[];
  accommodationHotelName: string;
  transportationMode: string;
}

export interface FinancialAndInsurance {
  fundsCurrency: string;
  cashAmountApprox: string;
  creditCardsCount: string;
  insuranceCompany: string;
  insurancePolicyNumber: string;
}

export interface CustomsItinerary {
  id: string;
  tripTitle: string;
  tripTitleEn: string;
  destinationCountry: string;
  destinationCountryEn: string;
  mainCities: string;
  purposeOfVisit: 'Tourism' | 'Business' | 'Visiting Friends & Relatives' | 'Transit' | 'Conference';
  startDate: string;
  endDate: string;
  totalDays: number;
  totalNights: number;
  travelers: Traveler[];
  emergencyContact?: EmergencyContact;
  inboundFlight: FlightInfo;
  ukExitFlight?: FlightInfo; // 2026-09-26 UK departure to Iceland
  icelandToNlFlight?: FlightInfo; // 2026-10-08 Iceland to Netherlands
  outboundFlight: FlightInfo;
  flightGroups?: FlightGroup[];
  accommodations: Accommodation[];
  dailySchedule: DayItinerary[];
  financial: FinancialAndInsurance;
  additionalNotesEn?: string;
  lastUpdated: string;
}

export type ViewMode = 'trip-view' | 'officer-view' | 'qa-guide';
export type LanguageDisplay = 'bilingual' | 'english-only';

