/**
 * [INPUT]:  All home components, lib/stats for real metrics, latest daily briefing content
 * [OUTPUT]: Scrollable homepage with a top briefing strip above the 3-column dashboard grid
 * [POS]:    Root page — assembles the Morty interface and allows full-page scroll when content grows
 * [PROTOCOL]: Update this header on any layout change, then check CLAUDE.md
 */

import { SystemHeader } from "@/components/home/SystemHeader";
import { MorningBriefing } from "@/components/home/MorningBriefing";
import { IdentityMatrix } from "@/components/home/IdentityMatrix";
import { WidgetPanel } from "@/components/home/WidgetPanel";
import ArcReactor from "@/components/home/ArcReactor";
import { Terminal } from "@/components/home/Terminal";
import { Diagnostics } from "@/components/home/Diagnostics";
import { CoreDirectives } from "@/components/home/CoreDirectives";
import { getSiteStats, getDiaryFragments } from "@/lib/stats";
import { getEntries } from "@/lib/content";

export default async function Home() {
  const stats = getSiteStats();
  const weeklyEntries = await getEntries("weekly");
  const dailyEntries = await getEntries("daily");
  const latestBriefing = dailyEntries[0] ?? null;
  const diaryFragments = getDiaryFragments();

  return (
    <div className="min-h-screen w-screen overflow-x-hidden flex flex-col">
      <div className="scanline-overlay" />
      <div className="scanner-bar" />

      <SystemHeader
        totalEntries={stats.totalEntries}
        totalWords={stats.totalWords}
        daysSinceLaunch={stats.daysSinceLaunch}
      />

      <main className="flex-1 flex flex-col gap-6 p-4 md:p-6 pb-8 relative z-10 overflow-visible">
        <MorningBriefing entry={latestBriefing} totalBriefings={dailyEntries.length} />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 overflow-visible mobile-column-layout">
          <div className="col-span-12 md:col-span-3 flex flex-col gap-6 order-2 md:order-1">
            <IdentityMatrix
              diaryCount={stats.diaryCount}
              weeklyCount={stats.weeklyCount}
              dailyCount={stats.dailyCount}
              lastEntryAge={stats.lastEntryAge}
            />
            <WidgetPanel
              dailyEntries={dailyEntries.map(({ slug, title, date, summary }) => ({ slug, title, date, summary }))}
              weeklyEntries={weeklyEntries.map(({ slug, title, date, summary, cover }) => ({ slug, title, date, summary, cover }))}
            />
          </div>

          <div id="session-column" className="col-span-12 md:col-span-6 flex flex-col relative order-1 md:order-2">
            <ArcReactor fragments={diaryFragments} />
            <Terminal stats={stats} />
          </div>

          <div className="col-span-12 md:col-span-3 flex flex-col gap-6 order-3">
            <Diagnostics
              thisWeekCount={stats.thisWeekCount}
              thisMonthCount={stats.thisMonthCount}
              dailyActivity={stats.dailyActivity}
              diaryCount={stats.diaryCount}
              weeklyCount={stats.weeklyCount}
              cachedUrls={stats.cachedUrls}
            />
            <CoreDirectives />
          </div>
        </div>
      </main>
    </div>
  );
}
