import { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { LaunchListItem } from '@/components/launch/LaunchListItem';
import { PremiumListing } from '@/components/launch/PremiumListing';
import { AnimatedHeader } from '@/components/launch/AnimatedHeader';
import { getLaunches, getWeeklyLaunches } from '@/lib/data/launches';
import { WeeklyCountdownTimer } from '@/components/WeeklyCountdownTimer';
import { Launch } from '@/lib/types/launch';

export function LaunchPage() {
  const [activeTab, setActiveTab] = useState('weekly');
  const [rotatedWeeklyLaunches, setRotatedWeeklyLaunches] = useState<Launch[]>([]);
  
  // Memoize these values to prevent unnecessary re-renders
  const allLaunches = getLaunches();
  const premiumLaunches = allLaunches.filter(launch => launch.listingType === 'premium');
  const boostedLaunches = allLaunches.filter(launch => launch.listingType === 'boosted');
  const regularLaunches = allLaunches.filter(launch => !launch.listingType || launch.listingType === 'regular');
  const weeklyRegularLaunches = getWeeklyLaunches().filter(
    launch => !launch.listingType || launch.listingType === 'regular'
  );

  const insertBoostedLaunches = (launches: Launch[], section: 'weekly' | 'all') => {
    if (!boostedLaunches.length || !launches.length) return launches;

    const result: Array<Launch & { uniqueKey: string }> = [];
    const spacing = Math.max(Math.floor(launches.length / boostedLaunches.length), 2);
    let boostedIndex = 0;

    launches.forEach((launch, index) => {
      result.push({
        ...launch,
        uniqueKey: `${section}-regular-${launch.id}-${index}`
      });
      
      if ((index + 1) % spacing === 0 && boostedIndex < boostedLaunches.length) {
        result.push({
          ...boostedLaunches[boostedIndex],
          uniqueKey: `${section}-boosted-${boostedLaunches[boostedIndex].id}-${index}`
        });
        boostedIndex++;
      }
    });

    while (boostedIndex < boostedLaunches.length) {
      result.push({
        ...boostedLaunches[boostedIndex],
        uniqueKey: `${section}-boosted-${boostedLaunches[boostedIndex].id}-remaining-${boostedIndex}`
      });
      boostedIndex++;
    }

    return result;
  };

  // Initialize rotated launches
  useEffect(() => {
    setRotatedWeeklyLaunches(weeklyRegularLaunches);
  }, []); // Run only once on mount

  // Handle rotation
  useEffect(() => {
    if (activeTab !== 'weekly') return;

    const rotateList = () => {
      setRotatedWeeklyLaunches(prevLaunches => {
        if (weeklyRegularLaunches.length <= 1) return weeklyRegularLaunches;
        
        // If arrays don't match, reset to initial state
        if (prevLaunches.length !== weeklyRegularLaunches.length) {
          return weeklyRegularLaunches;
        }

        // Rotate: move first item to end
        const rotated = [...prevLaunches];
        const firstItem = rotated.shift();
        if (firstItem) {
          rotated.push(firstItem);
        }
        return rotated;
      });
    };

    // Initial rotation
    rotateList();
    
    // Set up interval
    const intervalId = setInterval(rotateList, 10 * 60 * 1000); // 10 minutes
    
    return () => clearInterval(intervalId);
  }, [activeTab]); // Only depend on activeTab

  return (
    <div className="min-h-screen">
      <div className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          <AnimatedHeader />
          
          <h2 className="text-base sm:text-xl text-muted-foreground text-center mb-6 sm:mb-8">
            Submit today and receive quality traffic and backlink! Our unique rotation system ensures equal exposure for all startups by rotating listings every 10 minutes - no upvotes needed. 🔄✨
          </h2>

          <WeeklyCountdownTimer />

          {/* Premium listings */}
          <div className="space-y-8 mb-12">
            {premiumLaunches.map((launch, index) => (
              <PremiumListing 
                key={`premium-${launch.id}-${index}`} 
                launch={launch} 
              />
            ))}
          </div>

          <Tabs defaultValue="weekly" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full max-w-[300px] sm:max-w-[400px] grid-cols-2 mx-auto mb-6 sm:mb-8">
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="all">All</TabsTrigger>
            </TabsList>

            <TabsContent value="weekly" className="mt-4 sm:mt-6">
              <div className="space-y-4">
                {insertBoostedLaunches(rotatedWeeklyLaunches, 'weekly').map((launch) => (
                  <LaunchListItem 
                    key={launch.uniqueKey}
                    launch={launch}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="all" className="mt-4 sm:mt-6">
              <div className="space-y-4">
                {insertBoostedLaunches(regularLaunches, 'all').map((launch) => (
                  <LaunchListItem 
                    key={launch.uniqueKey}
                    launch={launch}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
