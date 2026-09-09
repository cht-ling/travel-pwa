import React from 'react';
import {
  ArrowRight,
  BedDouble,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  CloudSun,
  Copy,
  ExternalLink,
  MapPin,
  Moon,
  Navigation,
  Phone,
  Plane,
  Sun,
  Ticket,
  Users,
} from 'lucide-react';
import { SiAirbnb, SiBookingdotcom } from 'react-icons/si';
import { CustomsItinerary } from '../types';

interface TravelerTripViewProps {
  itinerary: CustomsItinerary;
  showPrivateDetails?: boolean;
}

const toLocalDate = (date: string) => new Date(`${date}T00:00:00`);

const formatShortDate = (date: string) =>
  new Intl.DateTimeFormat('zh-TW', { month: 'numeric', day: 'numeric' }).format(toLocalDate(date));

const formatLongDate = (date: string) =>
  new Intl.DateTimeFormat('zh-TW', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' }).format(
    toLocalDate(date),
  );

const getTodayIso = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const TravelerTripView: React.FC<TravelerTripViewProps> = ({ itinerary, showPrivateDetails = true }) => {
  const today = getTodayIso();
  const initialDayIndex = Math.max(
    0,
    itinerary.dailySchedule.findIndex((day) => day.date >= today),
  );
  const [selectedDayIndex, setSelectedDayIndex] = React.useState(initialDayIndex);
  const [copied, setCopied] = React.useState(false);
  const selectedDay = itinerary.dailySchedule[selectedDayIndex];
  const accommodation = itinerary.accommodations.find(
    (hotel) =>
      selectedDay.accommodationHotelName.includes(hotel.hotelName) ||
      Boolean(hotel.hotelNameLocal && selectedDay.accommodationHotelName.includes(hotel.hotelNameLocal)),
  );
  const stayName = accommodation?.hotelName.replace(/^(Airbnb|Booking):\s*/, '');
  const provider = accommodation?.hotelName.startsWith('Airbnb:')
    ? 'airbnb'
    : accommodation?.hotelName.startsWith('Booking:')
      ? 'booking'
      : null;

  const copyAddress = async () => {
    if (!accommodation) return;
    await navigator.clipboard.writeText(accommodation.fullAddress);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  const tripStatus = today < itinerary.startDate
    ? `距離出發 ${Math.ceil((toLocalDate(itinerary.startDate).getTime() - toLocalDate(today).getTime()) / 86_400_000)} 天`
    : today > itinerary.endDate
      ? '旅程已完成'
      : '旅程進行中';

  return (
    <div className="mx-auto max-w-6xl">
      <section className="relative overflow-hidden rounded-lg bg-[#132238] px-5 py-6 text-white shadow-lg sm:px-7 sm:py-7">
        <div className="absolute inset-x-0 top-0 h-1.5 bg-[linear-gradient(90deg,#0d9488_0_55%,#ef6b57_55%_82%,#e2b44f_82%)]" />
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase text-teal-300">
              <Navigation className="h-4 w-4" />
              我的旅程
            </div>
            <h1 className="max-w-2xl text-2xl font-extrabold leading-tight sm:text-3xl">
              英國．冰島．荷蘭
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-300">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4 text-teal-300" />
                2026 年 {formatShortDate(itinerary.startDate)} – {formatShortDate(itinerary.endDate)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Users className="h-4 w-4 text-amber-300" />
                {showPrivateDetails ? `${itinerary.travelers.length} 位旅客` : '個人旅程'}
              </span>
            </div>
          </div>
          <div className="border-l-2 border-teal-400 pl-3">
            <span className="block text-[10px] font-bold uppercase text-slate-400">旅程狀態</span>
            <strong className="text-sm text-white">{tripStatus}</strong>
          </div>
        </div>
      </section>

      <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <main className="min-w-0">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase text-teal-700">每日行程</span>
              <h2 className="text-lg font-extrabold text-slate-900">選擇日期</h2>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setSelectedDayIndex((index) => Math.max(0, index - 1))}
                disabled={selectedDayIndex === 0}
                className="grid h-8 w-8 place-items-center rounded border border-slate-300 bg-white text-slate-700 disabled:opacity-30"
                title="前一天"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setSelectedDayIndex((index) => Math.min(itinerary.dailySchedule.length - 1, index + 1))}
                disabled={selectedDayIndex === itinerary.dailySchedule.length - 1}
                className="grid h-8 w-8 place-items-center rounded border border-slate-300 bg-white text-slate-700 disabled:opacity-30"
                title="後一天"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mb-4 flex gap-2 overflow-x-auto pb-2">
            {itinerary.dailySchedule.map((day, index) => (
              <button
                key={day.dayNumber}
                type="button"
                onClick={() => setSelectedDayIndex(index)}
                className={`min-w-16 shrink-0 rounded border px-2.5 py-2 text-left transition-colors ${
                  selectedDayIndex === index
                    ? 'border-teal-700 bg-teal-700 text-white'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-teal-300'
                }`}
              >
                <span className="block text-[9px] font-bold uppercase opacity-70">第 {day.dayNumber} 天</span>
                <span className="text-xs font-extrabold">{formatShortDate(day.date)}</span>
              </button>
            ))}
          </div>

          <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            <header className="border-b border-slate-200 bg-[#eef5f5] px-4 py-4 sm:px-5">
              <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
                <div>
                  <p className="text-[10px] font-bold uppercase text-teal-700">第 {selectedDay.dayNumber} 天</p>
                  <h2 className="text-xl font-extrabold leading-tight text-[#132238]">{selectedDay.cityOrArea}</h2>
                </div>
                <time className="text-xs font-semibold text-slate-600">{formatLongDate(selectedDay.date)}</time>
              </div>
            </header>

            <div className="px-4 py-5 sm:px-5">
              <div className="relative space-y-5 before:absolute before:bottom-3 before:left-[15px] before:top-3 before:w-px before:bg-slate-200">
                {[
                  { label: '上午', text: selectedDay.morningActivity, icon: Sun, color: 'bg-amber-100 text-amber-700' },
                  { label: '下午', text: selectedDay.afternoonActivity, icon: CloudSun, color: 'bg-cyan-100 text-cyan-700' },
                  { label: '晚上', text: selectedDay.eveningActivity, icon: Moon, color: 'bg-indigo-100 text-indigo-700' },
                ].map(({ label, text, icon: Icon, color }) => (
                  <div key={label} className="relative grid grid-cols-[2rem_1fr] gap-3">
                    <span className={`z-10 grid h-8 w-8 place-items-center rounded-full ${color}`}>
                      <Icon className="h-4 w-4" />
                    </span>
                    <div className="pt-0.5">
                      <h3 className="text-xs font-extrabold text-slate-900">{label}</h3>
                      <p className="mt-0.5 text-sm leading-relaxed text-slate-600">{text || '自由活動'}</p>
                    </div>
                  </div>
                ))}
              </div>

              {selectedDay.ticketOptions && selectedDay.ticketOptions.length > 0 && (
                <div className="mt-5 rounded-xl border border-cyan-200 bg-cyan-50 p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <Ticket className="h-4 w-4 text-cyan-700" />
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.12em] text-cyan-800">門票與預算</h3>
                  </div>
                  <div className="space-y-3">
                    {selectedDay.ticketOptions.map((ticket) => (
                      <div key={ticket.name} className="border-b border-cyan-200/80 pb-3 last:border-0 last:pb-0">
                        <h4 className="text-sm font-extrabold text-slate-900">{ticket.name}</h4>
                        <div className="mt-1 grid gap-1 text-xs text-slate-700 sm:grid-cols-2">
                          {ticket.onlinePrice && <span><strong>線上：</strong>{ticket.onlinePrice}</span>}
                          {ticket.onsitePrice && <span><strong>現場：</strong>{ticket.onsitePrice}</span>}
                        </div>
                        {ticket.note && <p className="mt-1 text-xs leading-relaxed text-cyan-900">備註：{ticket.note}</p>}
                      </div>
                    ))}
                  </div>
                  <p className="mt-3 text-[11px] leading-relaxed text-cyan-800">價格為查詢時的估算，會依日期、票種、匯率與現場售價變動。</p>
                </div>
              )}

              {selectedDay.notes && (
                <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.12em] text-amber-800">Memo</h3>
                  </div>
                  <div className="divide-y divide-amber-200/80">
                    {selectedDay.notes.split('\n').map((note, index) => {
                      const separatorIndex = note.indexOf(':');
                      const title = separatorIndex >= 0 ? note.slice(0, separatorIndex) : '';
                      const content = separatorIndex >= 0 ? note.slice(separatorIndex + 1).trim() : note;

                      return (
                        <div key={`${selectedDay.dayNumber}-note-${index}`} className="py-2 first:pt-0 last:pb-0">
                          {title && <h4 className="text-xs font-extrabold text-amber-900">{title}</h4>}
                          <p className="mt-0.5 text-sm leading-relaxed text-amber-900/85">{content}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className="grid border-t border-slate-200 sm:grid-cols-2">
              <div className="p-4 sm:border-r sm:border-slate-200">
                <div className="flex items-start gap-2">
                  <Navigation className="mt-0.5 h-4 w-4 shrink-0 text-teal-700" />
                  <div>
                    <span className="block text-[9px] font-bold uppercase text-slate-500">交通</span>
                    <strong className="text-xs text-slate-800">{selectedDay.transportationMode}</strong>
                  </div>
                </div>
              </div>
              <div className="border-t border-slate-200 p-4 sm:border-t-0">
                <div className="flex items-start gap-2">
                  <BedDouble className="mt-0.5 h-4 w-4 shrink-0 text-teal-700" />
                  <div className="min-w-0 flex-1">
                    <span className="block text-[9px] font-bold uppercase text-slate-500">今晚住宿</span>
                    <div className="mt-0.5 flex items-center gap-1.5">
                      {provider === 'airbnb' && (
                        <span className="shrink-0 text-[#ff385c]">
                          <SiAirbnb size={14} />
                        </span>
                      )}
                      {provider === 'booking' && (
                        <span className="shrink-0 text-[#003580]">
                          <SiBookingdotcom size={14} />
                        </span>
                      )}
                      <strong className="text-xs text-slate-800">{stayName || selectedDay.accommodationHotelName}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {accommodation && (
              <div className="flex flex-col gap-3 border-t border-slate-200 bg-slate-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 items-start gap-2 text-xs text-slate-600">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#e85d4a]" />
                  <span>{accommodation.fullAddress}</span>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button
                    type="button"
                    onClick={copyAddress}
                    className="grid h-8 w-8 place-items-center rounded border border-slate-300 bg-white text-slate-600"
                    title="複製地址"
                  >
                    {copied ? <Check className="h-4 w-4 text-teal-700" /> : <Copy className="h-4 w-4" />}
                  </button>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(accommodation.fullAddress)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-8 items-center gap-1.5 rounded bg-[#132238] px-3 text-xs font-bold text-white"
                  >
                    地圖 <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            )}
          </section>
        </main>

        <aside className="space-y-4">
          {showPrivateDetails && <section className="overflow-hidden rounded-lg border border-slate-200 bg-white">
            <header className="flex items-center gap-2 border-b border-slate-200 px-4 py-3">
              <Plane className="h-4 w-4 text-teal-700" />
              <h2 className="text-sm font-extrabold text-slate-900">返程航班</h2>
            </header>
            <div className="divide-y divide-slate-100">
              {showPrivateDetails && itinerary.flightGroups?.map((group) => (
                <div key={group.id} className="px-4 py-3">
                  <p className="text-[10px] font-bold uppercase text-slate-500">{group.travelerNames.join(' · ')}</p>
                  <div className="mt-1 flex items-center gap-2 text-xs font-extrabold text-slate-900">
                    <span>{group.outboundFlight.departureAirport.match(/\(([A-Z]{3})\)/)?.[1] || 'AMS'}</span>
                    <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                    <span>{group.outboundFlight.arrivalAirport.match(/\(([A-Z]{3})\)/)?.[1] || '台灣'}</span>
                  </div>
                  <p className="mt-1 text-xs text-slate-600">
                    {formatShortDate(group.outboundFlight.departureDate)} · {group.outboundFlight.departureTime} · {group.outboundFlight.flightNumber}
                  </p>
                </div>
              ))}
            </div>
          </section>}

          {showPrivateDetails && <section className="overflow-hidden rounded-lg border border-slate-200 bg-white">
            <header className="flex items-center gap-2 border-b border-slate-200 px-4 py-3">
              <Phone className="h-4 w-4 text-[#e85d4a]" />
              <h2 className="text-sm font-extrabold text-slate-900">同行旅客</h2>
            </header>
            <div className="divide-y divide-slate-100">
              {itinerary.travelers.map((traveler) => (
                <a key={traveler.id} href={`tel:${traveler.contactPhone}`} className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-slate-50">
                  <span className="text-xs font-bold text-slate-800">{traveler.fullNameEn}</span>
                  <span className="text-[10px] text-slate-500">{traveler.contactPhone}</span>
                </a>
              ))}
            </div>
          </section>}
        </aside>
      </div>
    </div>
  );
};