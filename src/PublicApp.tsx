import React from 'react';
import { TravelerTripView } from './components/TravelerTripView';
import { myTripChineseItinerary } from './data/myTripChinese';

export default function PublicApp() {
  return (
    <div className="min-h-screen bg-slate-100/70 px-3 py-4 text-slate-900 sm:px-6 sm:py-8">
      <header className="mx-auto mb-5 flex max-w-6xl items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-teal-700">My Trip</p>
          <h1 className="text-lg font-extrabold text-slate-900">英國．冰島．荷蘭</h1>
        </div>
        <span className="text-xs font-semibold text-slate-500">公開旅程版</span>
      </header>
      <main>
        <TravelerTripView itinerary={myTripChineseItinerary} showPrivateDetails={false} />
      </main>
    </div>
  );
}