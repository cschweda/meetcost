<script setup lang="ts">
const { appName, aboutDescription, siteUrl } = useMeetingBurnConfig()
useSeoMeta({
  title: `About ${appName}`,
  description: aboutDescription,
  ogImage: `${siteUrl}/og-image.png`,
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div class="container mx-auto px-4 py-16 max-w-2xl">
    <h1 class="text-3xl font-bold text-highlighted mb-6">
      About {{ appName }}
    </h1>
    <div class="prose prose-neutral dark:prose-invert max-w-none">
      <!-- General overview -->
      <p id="privacy" class="text-muted leading-relaxed mb-4">
        {{ appName }} makes invisible meeting waste visible. A live-ticking counter shows dollar-per-second burn rates and creates shareable receipts that drive behavior change in corporate meeting culture.
      </p>
      <p class="text-muted leading-relaxed mb-4">
        <strong>Core value:</strong> Transform abstract meeting time into concrete financial data with shareability.
      </p>

      <!-- When remote/async makes sense -->
      <h2 class="text-xl font-semibold text-highlighted mt-10 mb-3">
        When remote beats in-person (and when it doesn't)
      </h2>
      <p class="text-muted leading-relaxed mb-4">
        Remote meetings (Zoom, Teams, Webex) can be <strong>more effective</strong> than in-person for many use cases: no commute, no room booking, easier to record and replay, and—crucially for makers and creatives—less disruption to flow state. In-person all-hands often require everyone to travel, sit in a room, and listen to updates that could have been a Slack message or a 5-minute async video. The cost is the same either way; the question is whether the format justifies it.
      </p>
      <p class="text-muted leading-relaxed mb-4">
        In-person still wins for team building, complex negotiations, and whiteboard brainstorming. But for status updates, standups, and one-way announcements, remote (or better yet, async Slack/Teams) is often more efficient and less draining. MeetingBurn helps you see the cost either way—so you can decide whether the meeting format is worth it.
      </p>

      <!-- Calculation details -->
      <h2 id="how-it-works" class="text-xl font-semibold text-highlighted mt-10 mb-3">
        How meeting cost is calculated
      </h2>
      <p class="text-muted leading-relaxed mb-4">
        MeetingBurn converts each participant's compensation into an hourly rate, sums those rates, and multiplies by meeting duration. All math runs in your browser—no data is sent anywhere.
      </p>

      <h3 class="text-lg font-medium text-highlighted mt-6 mb-2">
        Hourly rate per participant
      </h3>
      <ul class="text-muted leading-relaxed mb-4 list-disc list-inside space-y-1">
        <li><strong>Full-time (salary):</strong> Annual salary ÷ 2,080 hours/year. 2,080 is the standard working hours (40 hrs/week × 52 weeks).</li>
        <li><strong>Contractor (hourly):</strong> The hourly rate you enter is used.</li>
      </ul>

      <h3 class="text-lg font-medium text-highlighted mt-6 mb-2">
        Average rate
      </h3>
      <p class="text-muted leading-relaxed mb-4">
        The average rate is the sum of all participants' hourly rates divided by the number of participants. It represents the blended hourly cost of the meeting.
      </p>

      <h3 class="text-lg font-medium text-highlighted mt-6 mb-2">
        Total meeting cost
      </h3>
      <p class="text-muted leading-relaxed mb-4">
        Total cost = (sum of all hourly rates) × (duration in seconds) ÷ 3,600. The cost per second is the sum of hourly rates ÷ 3,600; multiply by elapsed seconds to get the total.
      </p>

      <h3 class="text-lg font-medium text-highlighted mt-6 mb-2">
        In-person “tax” (usually paid by employees)
      </h3>
      <p class="text-muted leading-relaxed mb-2">
        In-person meetings add hidden costs that most companies don’t cover: commute time, coffee, parking, childcare, etc. These are typically paid by employees, not the employer.
      </p>
      <p class="text-muted leading-relaxed mb-2">
        When you choose “In-person” and include this cost, we add:
      </p>
      <ul class="text-muted leading-relaxed mb-4 list-disc list-inside space-y-1">
        <li><strong class="text-highlighted">Included by default—commute time value:</strong> The dollar value of time spent commuting. Formula: sum of hourly rates × (round-trip minutes ÷ 60). Default is 30 minutes.</li>
        <li><strong class="text-highlighted">Extra cost (optional):</strong> Out-of-pocket expenses beyond commute time, e.g. coffee, parking, childcare, tolls. Add a per-person dollar amount if applicable.</li>
      </ul>
      <p class="text-muted leading-relaxed mb-6">
        The receipt itemizes <strong>Company pays</strong> (meeting time) vs <strong>Each employee pays (avg)</strong> (per-person average—not exact; commute, daycare, coffee, etc. vary) and <strong>All employees together pay</strong> (total), so it’s clear who bears which cost.
      </p>

      <h2 id="sharing" class="text-xl font-semibold text-highlighted mt-16 mb-3">
        Sharing & Privacy
      </h2>
      <p class="text-muted leading-relaxed mb-4">
        All data stays in your browser. No tracking, no servers, no accounts. Privacy-first by design.
      </p>
      <p class="text-muted leading-relaxed mb-4">
        <strong>History & storage:</strong> Meeting history is stored in your browser's local storage—local to your device and to your browser. You can clear it at any time. No data leaves your browser. Ever.
      </p>

      <h3 class="text-lg font-medium text-highlighted mt-6 mb-2">
        How sharing works (privacy-first)
      </h3>
      <p class="text-muted leading-relaxed mb-4">
        When you share a receipt, MeetingBurn creates a shareable link that contains only the <strong>summary data</strong> (total cost, duration, participant count, sector, meeting type)—no names, no salaries, no hourly rates. The link looks like this:
      </p>
      <p class="text-sm text-muted leading-relaxed mb-4 font-mono bg-muted/30 p-3 rounded">
        meetingburn.app/share?r=eyJ0IjoxNzM4ODk...
      </p>
      
      <h3 class="text-lg font-medium text-highlighted mt-6 mb-2">
        What is Base64 encoding?
      </h3>
      <p class="text-muted leading-relaxed mb-4">
        Base64 is a simple text format that converts data into a URL-safe string of letters, numbers, and a few symbols. It's <strong>not encryption</strong>—it's just a way to pack data into a link. Think of it like a ZIP file for URLs: it makes the data compact and safe to share in a web address.
      </p>
      <p class="text-muted leading-relaxed mb-4">
        <strong>Here's what happens:</strong>
      </p>
      <ul class="text-muted leading-relaxed mb-4 list-disc list-inside space-y-1">
        <li><strong>Step 1:</strong> Your browser (locally, on your device) takes the meeting summary and converts it to Base64 text.</li>
        <li><strong>Step 2:</strong> That text becomes part of the share link.</li>
        <li><strong>Step 3:</strong> When someone clicks your link, <em>their</em> browser decodes the Base64 text and displays the receipt.</li>
      </ul>

      <h3 class="text-lg font-medium text-highlighted mt-6 mb-2">
        You control who sees the data
      </h3>
      <p class="text-muted leading-relaxed mb-4">
        Base64 is not a secret code. Anyone with the link can decode it (it's just converting text back to numbers). But <strong>only people you send the link to can see the data</strong>. No one else has the link. MeetingBurn never stores your data on a server—there are no servers. The encoding and decoding both happen in your browser and the recipient's browser. It's entirely in your hands.
      </p>

      <h3 class="text-lg font-medium text-highlighted mt-6 mb-2">
        What's in the share link?
      </h3>
      <p class="text-muted leading-relaxed mb-4">
        The share URL contains only aggregated, anonymized data:
      </p>
      <ul class="text-muted leading-relaxed mb-4 list-disc list-inside space-y-1">
        <li>Meeting timestamp (date/time)</li>
        <li>Duration (seconds)</li>
        <li>Number of participants</li>
        <li>Total cost and average rate (calculated)</li>
        <li>Sector (public/private) and meeting type</li>
        <li>Breakdown (how many full-time/contractor/unknown—no individual details)</li>
      </ul>
      <p class="text-muted leading-relaxed mb-4">
        <strong>What's NOT shared:</strong> Individual participant salaries, hourly rates, names, roles, or any personally identifiable information. The recipient sees only the final cost summary.
      </p>
      <p class="text-muted leading-relaxed mb-4">
        <strong>Bottom line:</strong> Sharing is safe because you choose who gets the link, and the link contains only summary data—never individual compensation details.
      </p>

      <h2 id="examples" class="text-xl font-semibold text-highlighted mt-16 mb-3">
        Examples
      </h2>
      <p class="text-muted leading-relaxed text-sm mb-6 italic">
        All salary and hourly rates in these examples are best guesses. Actual costs may be higher depending on your organization's compensation.
      </p>

      <div class="space-y-8">
        <!-- Example 1 -->
        <div class="rounded-xl border border-default bg-muted/10 p-6 border-l-4 border-l-primary">
          <div class="flex items-start gap-4">
            <div class="shrink-0 flex items-center justify-center size-14 rounded-xl bg-primary/15 text-primary">
              <UIcon name="i-lucide-users-2" class="size-8" aria-hidden="true" />
            </div>
            <div class="min-w-0 flex-1">
              <h4 class="text-lg font-semibold text-highlighted mb-2">Example 1: The 30‑minute sync (Remote)</h4>
              <div class="text-muted text-sm mb-3 space-y-1">
                <p><strong>Format:</strong> Remote · <strong>Sector:</strong> Private · <strong>Preset:</strong> Tech / Software</p>
                <p><strong>Participants:</strong> 3 people at $97K/year · <strong>Duration:</strong> 30 minutes</p>
              </div>
              <ul class="text-muted text-sm mb-4 space-y-1 list-none">
                <li><strong>Meeting cost:</strong> 3 × ($97,000 ÷ 2,080) × 0.5 hr = <strong class="text-highlighted">$69.95</strong></li>
                <li>Company pays $69.95</li>
              </ul>
              <div class="rounded-lg bg-default/50 p-4 text-sm">
                <p class="font-medium text-highlighted mb-2">Business equivalent:</p>
                <ul class="text-muted space-y-1 text-sm list-disc list-inside">
                  <li>~25 minutes of consultant time ($175/hr)</li>
                  <li>1 enterprise software license per month</li>
                  <li>4 project management licenses for a year ($15/mo each)</li>
                </ul>
                <p class="font-medium text-highlighted mt-3 mb-2">Lunch-break equivalent:</p>
                <ul class="text-muted space-y-1 text-sm list-disc list-inside">
                  <li>~12 lattes or salads</li>
                  <li>~6 burritos</li>
                </ul>
                <p class="text-muted text-sm mt-2 italic">—Could this have been a Slack or Teams message? Async updates often work for status syncs.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Example 2 -->
        <div class="rounded-xl border border-default bg-muted/10 p-6 border-l-4 border-l-amber-500">
          <div class="flex items-start gap-4">
            <div class="shrink-0 flex items-center justify-center size-14 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400">
              <UIcon name="i-lucide-repeat" class="size-8" aria-hidden="true" />
            </div>
            <div class="min-w-0 flex-1">
              <h4 class="text-lg font-semibold text-highlighted mb-2">Example 2: The recurring meeting drain (Remote)</h4>
              <div class="text-muted text-sm mb-3 space-y-1">
                <p><strong>Format:</strong> Remote · <strong>Sector:</strong> Private · <strong>Preset:</strong> Pharma / Biotech</p>
                <p><strong>Participants:</strong> 6 people at $100K/year · <strong>Duration:</strong> 1 hour (weekly)</p>
              </div>
              <ul class="text-muted text-sm mb-4 space-y-1 list-none">
                <li><strong>Meeting cost:</strong> 6 × ($100,000 ÷ 2,080) × 1 hr = <strong class="text-highlighted">$288</strong> per meeting</li>
                <li>Per year (52 weeks): <strong class="text-highlighted">~$15,000</strong></li>
                <li>Company pays $288/meeting</li>
              </ul>
              <div class="rounded-lg bg-default/50 p-4 text-sm">
                <p class="font-medium text-highlighted mb-2">Business equivalent:</p>
                <p class="text-muted text-sm font-medium mt-2 mb-1">Per meeting:</p>
                <ul class="text-muted space-y-1 text-sm list-disc list-inside">
                  <li>1.5 hours of consultant time ($175/hr)</li>
                  <li>4 enterprise licenses per month ($75 each)</li>
                </ul>
                <p class="text-muted text-sm font-medium mt-2 mb-1">Per year:</p>
                <ul class="text-muted space-y-1 text-sm list-disc list-inside">
                  <li>20 training course seats ($750 each)</li>
                  <li>1 conference registration ($1,200)</li>
                  <li>86 hours of consultant time ($175/hr)</li>
                </ul>
                <p class="font-medium text-highlighted mt-3 mb-2">Lunch-break equivalent:</p>
                <ul class="text-muted space-y-1 text-sm list-disc list-inside">
                  <li>Per meeting: ~48 lattes or ~24 burritos</li>
                  <li>Per year: ~2,500 lattes or ~1,250 burritos</li>
                </ul>
                <p class="text-muted text-sm mt-2 italic">—Could this have been a Slack or Teams message? Weekly syncs often repeat the same info—a shared doc or async update might suffice.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Example 3 -->
        <div class="rounded-xl border border-default bg-muted/10 p-6 border-l-4 border-l-blue-500">
          <div class="flex items-start gap-4">
            <div class="shrink-0 flex items-center justify-center size-14 rounded-xl bg-blue-500/15 text-blue-600 dark:text-blue-400">
              <UIcon name="i-lucide-users" class="size-8" aria-hidden="true" />
            </div>
            <div class="min-w-0 flex-1">
              <h4 class="text-lg font-semibold text-highlighted mb-2">Example 3: Unit meeting with 15 attendees (In-person)</h4>
              <div class="text-muted text-sm mb-3 space-y-1">
                <p><strong>Format:</strong> In-person · <strong>Sector:</strong> Private · <strong>Preset:</strong> Corporate</p>
                <p><strong>Participants:</strong> 15 people at $88K/year · <strong>Duration:</strong> 1 hour</p>
                <p><strong>In-person:</strong> 30 min commute, $15/person coffee/parking</p>
              </div>
              <ul class="text-muted text-sm mb-4 space-y-1 list-none">
                <li><strong>Meeting cost:</strong> 15 × ($88,000 ÷ 2,080) × 1 hr = $635</li>
                <li><strong>In-person tax:</strong> Commute $635 × (30÷60) = $317; Extras 15 × $15 = $225 → <strong class="text-highlighted">$542</strong></li>
                <li><strong>Total:</strong> <strong class="text-highlighted">$1,177</strong> · Company $635; employees $542</li>
              </ul>
              <div class="rounded-lg bg-default/50 p-4 text-sm">
                <p class="font-medium text-highlighted mb-2">Business equivalent:</p>
                <ul class="text-muted space-y-1 text-sm list-disc list-inside">
                  <li>~7 hours of consultant time ($175/hr)</li>
                  <li>1 conference registration ($1,200)</li>
                  <li>16 enterprise software licenses per month ($75 each)</li>
                </ul>
                <p class="font-medium text-highlighted mt-3 mb-2">Lunch-break equivalent:</p>
                <ul class="text-muted space-y-1 text-sm list-disc list-inside">
                  <li>~196 lattes or salads</li>
                  <li>~98 burritos</li>
                </ul>
                <p class="text-muted text-sm mt-2 italic">—Could this have been a Slack or Teams message? Large meetings sap concentration from knowledge workers; a thread or announcement often reaches everyone without the cost.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Example 4 -->
        <div class="rounded-xl border border-default bg-muted/10 p-6 border-l-4 border-l-violet-500">
          <div class="flex items-start gap-4">
            <div class="shrink-0 flex items-center justify-center size-14 rounded-xl bg-violet-500/15 text-violet-600 dark:text-violet-400">
              <UIcon name="i-lucide-landmark" class="size-8" aria-hidden="true" />
            </div>
            <div class="min-w-0 flex-1">
              <h4 class="text-lg font-semibold text-highlighted mb-2">Example 4: Public agency quarterly full-day retreat (Remote)</h4>
              <div class="text-muted text-sm mb-3 space-y-1">
                <p><strong>Format:</strong> Remote · <strong>Sector:</strong> Public (taxpayer dollars) · <strong>Preset:</strong> Government / Public Sector</p>
                <p><strong>Participants:</strong> 75 people at $75K/year · <strong>Duration:</strong> 8am–4:30pm with 1 hr lunch = 7.5 hours</p>
              </div>
              <ul class="text-muted text-sm mb-4 space-y-1 list-none">
                <li><strong>Meeting cost:</strong> 75 × ($75,000 ÷ 2,080) × 7.5 hrs = <strong class="text-highlighted">~$20,253</strong> per meeting</li>
                <li>Quarterly (4×/year): <strong class="text-highlighted">~$81,000</strong> annually</li>
                <li>Agency pays $20,253/meeting</li>
              </ul>
              <div class="rounded-lg bg-default/50 p-4 text-sm">
                <p class="font-medium text-highlighted mb-2">Business equivalent:</p>
                <p class="text-muted text-sm font-medium mt-2 mb-1">Per meeting:</p>
                <ul class="text-muted space-y-1 text-sm list-disc list-inside">
                  <li>27 training course seats ($750 each)</li>
                  <li>17 laptop replacements ($1,200 each)</li>
                  <li>116 hours of consultant time ($175/hr)</li>
                </ul>
                <p class="text-muted text-sm font-medium mt-2 mb-1">Per year:</p>
                <ul class="text-muted space-y-1 text-sm list-disc list-inside">
                  <li>108 training course seats ($750 each)</li>
                  <li>68 laptop replacements ($1,200 each)</li>
                  <li>Full-time entry-level public-sector salary</li>
                </ul>
                <p class="font-medium text-highlighted mt-3 mb-2">Lunch-break equivalent:</p>
                <ul class="text-muted space-y-1 text-sm list-disc list-inside">
                  <li>Per meeting: ~4,500 lattes or ~2,130 burritos</li>
                  <li>Per year: ~18,000 lattes or ~8,500 burritos</li>
                </ul>
                <p class="text-muted text-sm mt-2 italic">—Retreats serve team-building. But routine "all hands" updates could often be a Slack or Teams message instead.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Example 5 -->
        <div class="rounded-xl border border-default bg-muted/10 p-6 border-l-4 border-l-emerald-500">
          <div class="flex items-start gap-4">
            <div class="shrink-0 flex items-center justify-center size-14 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
              <UIcon name="i-lucide-sunrise" class="size-8" aria-hidden="true" />
            </div>
            <div class="min-w-0 flex-1">
              <h4 class="text-lg font-semibold text-highlighted mb-2">Example 5: 15-minute daily standup (Remote)</h4>
              <div class="text-muted text-sm mb-3 space-y-1">
                <p><strong>Format:</strong> Remote · <strong>Sector:</strong> Private · <strong>Preset:</strong> Finance / Banking</p>
                <p><strong>Participants:</strong> 5 people at $110K/year · <strong>Duration:</strong> 15 minutes (daily)</p>
              </div>
              <ul class="text-muted text-sm mb-4 space-y-1 list-none">
                <li><strong>Meeting cost:</strong> 5 × ($110,000 ÷ 2,080) × 0.25 hr = <strong class="text-highlighted">$66</strong> per meeting</li>
                <li>Per year (~260 days): <strong class="text-highlighted">~$17,160</strong></li>
                <li>Company pays $66/meeting</li>
              </ul>
              <div class="rounded-lg bg-default/50 p-4 text-sm">
                <p class="font-medium text-highlighted mb-2">Business equivalent:</p>
                <p class="text-muted text-sm font-medium mt-2 mb-1">Per day:</p>
                <ul class="text-muted space-y-1 text-sm list-disc list-inside">
                  <li>23 minutes of consultant time ($175/hr)</li>
                </ul>
                <p class="text-muted text-sm font-medium mt-2 mb-1">Per year:</p>
                <ul class="text-muted space-y-1 text-sm list-disc list-inside">
                  <li>23 training course seats ($750 each)</li>
                  <li>14 laptop replacements ($1,200 each)</li>
                  <li>229 enterprise software licenses per month ($75 each)</li>
                  <li>98 hours of consultant time ($175/hr)</li>
                </ul>
                <p class="font-medium text-highlighted mt-3 mb-2">Lunch-break equivalent:</p>
                <ul class="text-muted space-y-1 text-sm list-disc list-inside">
                  <li>Per day: ~11 lattes or ~5 burritos</li>
                  <li>Per year: ~2,860 lattes or ~1,430 burritos</li>
                </ul>
                <p class="text-muted text-sm mt-2 italic">—Could this have been a Slack or Teams message? Daily standups often could—async updates can be just as effective without disrupting deep work for makers and creatives.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Example 6 -->
        <div class="rounded-xl border border-default bg-muted/10 p-6 border-l-4 border-l-rose-500">
          <div class="flex items-start gap-4">
            <div class="shrink-0 flex items-center justify-center size-14 rounded-xl bg-rose-500/15 text-rose-600 dark:text-rose-400">
              <UIcon name="i-lucide-map-pin" class="size-8" aria-hidden="true" />
            </div>
            <div class="min-w-0 flex-1">
              <h4 class="text-lg font-semibold text-highlighted mb-2">Example 6: 4-person in-person kickoff (In-person)</h4>
              <div class="text-muted text-sm mb-3 space-y-1">
                <p><strong>Format:</strong> In-person · <strong>Sector:</strong> Private · <strong>Preset:</strong> Energy / Utilities</p>
                <p><strong>Participants:</strong> 4 people at $90K/year · <strong>Duration:</strong> 1 hour</p>
                <p><strong>In-person:</strong> 30 min commute, $20/person coffee/parking</p>
              </div>
              <ul class="text-muted text-sm mb-4 space-y-1 list-none">
                <li><strong>Meeting cost:</strong> 4 × ($90,000 ÷ 2,080) × 1 hr = $173</li>
                <li><strong>In-person tax:</strong> Commute $173 × (30÷60) = $87; Extras 4 × $20 = $80 → <strong class="text-highlighted">$167</strong></li>
                <li><strong>Total:</strong> <strong class="text-highlighted">$340</strong> · Company $173; employees $167 (~$42/person avg)</li>
              </ul>
              <div class="rounded-lg bg-default/50 p-4 text-sm">
                <p class="font-medium text-highlighted mb-2">Business equivalent:</p>
                <ul class="text-muted space-y-1 text-sm list-disc list-inside">
                  <li>~2 hours of consultant time ($175/hr)</li>
                  <li>4–5 enterprise licenses per month ($75 each)</li>
                </ul>
                <p class="font-medium text-highlighted mt-3 mb-2">Lunch-break equivalent:</p>
                <ul class="text-muted space-y-1 text-sm list-disc list-inside">
                  <li>~57 lattes or ~28 burritos</li>
                </ul>
                <p class="text-muted text-sm mt-2 italic">—In-person has value for relationship-building. But the hidden employee cost (commute, parking, daycare) is real—often paid out of pocket.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Example 7 -->
        <div class="rounded-xl border border-default bg-muted/10 p-6 border-l-4 border-l-cyan-500">
          <div class="flex items-start gap-4">
            <div class="shrink-0 flex items-center justify-center size-14 rounded-xl bg-cyan-500/15 text-cyan-600 dark:text-cyan-400">
              <UIcon name="i-lucide-landmark" class="size-8" aria-hidden="true" />
            </div>
            <div class="min-w-0 flex-1">
              <h4 class="text-lg font-semibold text-highlighted mb-2">Example 7: 75-person in-person all-hands all-day (In-person)</h4>
              <div class="text-muted text-sm mb-3 space-y-1">
                <p><strong>Format:</strong> In-person · <strong>Sector:</strong> Public (taxpayer dollars) · <strong>Preset:</strong> Government / Public Sector</p>
                <p><strong>Participants:</strong> 75 people at $75K/year · <strong>Duration:</strong> 8:30am–5pm with 30-min lunch = 8 hours</p>
                <p><strong>In-person:</strong> 30 min commute, $15/person coffee/parking</p>
              </div>
              <ul class="text-muted text-sm mb-4 space-y-1 list-none">
                <li><strong>Meeting cost:</strong> 75 × ($75,000 ÷ 2,080) × 8 hrs = $21,635</li>
                <li><strong>In-person tax:</strong> Commute $2,704/hr × (30÷60) = $1,352; Extras 75 × $15 = $1,125 → <strong class="text-highlighted">$2,477</strong></li>
                <li><strong>Total:</strong> <strong class="text-highlighted">~$24,112</strong> · Agency $21,635; employees $2,477 (~$33/person avg)</li>
              </ul>
              <div class="rounded-lg bg-default/50 p-4 text-sm">
                <p class="font-medium text-highlighted mb-2">Business equivalent:</p>
                <ul class="text-muted space-y-1 text-sm list-disc list-inside">
                  <li>~138 hours of consultant time ($175/hr)</li>
                  <li>~32 training course seats ($750 each)</li>
                  <li>~20 laptop replacements ($1,200 each)</li>
                </ul>
                <p class="font-medium text-highlighted mt-3 mb-2">Lunch-break equivalent:</p>
                <ul class="text-muted space-y-1 text-sm list-disc list-inside">
                  <li>~5,360 lattes or ~2,540 burritos</li>
                </ul>
                <p class="text-muted text-sm mt-2 italic">—Full-day in-person gatherings at scale carry a steep cost. Much of the employee burden (commute, parking, lunch) is paid out of pocket—often by people who could have received the same updates remotely.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Example 8 -->
        <div class="rounded-xl border border-default bg-muted/10 p-6 border-l-4 border-l-indigo-500">
          <div class="flex items-start gap-4">
            <div class="shrink-0 flex items-center justify-center size-14 rounded-xl bg-indigo-500/15 text-indigo-600 dark:text-indigo-400">
              <UIcon name="i-lucide-briefcase" class="size-8" aria-hidden="true" />
            </div>
            <div class="min-w-0 flex-1">
              <h4 class="text-lg font-semibold text-highlighted mb-2">Example 8: 2-hour strategy session with consultants (Remote)</h4>
              <div class="text-muted text-sm mb-3 space-y-1">
                <p><strong>Format:</strong> Remote · <strong>Sector:</strong> Private · <strong>Preset:</strong> Consulting</p>
                <p><strong>Participants:</strong> 3 contractors at $150/hr · <strong>Duration:</strong> 2 hours</p>
              </div>
              <ul class="text-muted text-sm mb-4 space-y-1 list-none">
                <li><strong>Meeting cost:</strong> 3 × $150/hr × 2 hrs = <strong class="text-highlighted">$900</strong></li>
                <li>Client pays $900</li>
              </ul>
              <div class="rounded-lg bg-default/50 p-4 text-sm">
                <p class="font-medium text-highlighted mb-2">Business equivalent:</p>
                <ul class="text-muted space-y-1 text-sm list-disc list-inside">
                  <li>~5 hours of consultant time ($175/hr)</li>
                  <li>12 enterprise software licenses per month ($75 each)</li>
                  <li>1.2 training course seats ($750 each)</li>
                </ul>
                <p class="font-medium text-highlighted mt-3 mb-2">Lunch-break equivalent:</p>
                <ul class="text-muted space-y-1 text-sm list-disc list-inside">
                  <li>~150 lattes or ~75 burritos</li>
                </ul>
                <p class="text-muted text-sm mt-2 italic">—Strategy sessions have value. But with contractor rates, every minute counts—a concise agenda and clear deliverables maximize ROI.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Example 9 -->
        <div class="rounded-xl border border-default bg-muted/10 p-6 border-l-4 border-l-red-500">
          <div class="flex items-start gap-4">
            <div class="shrink-0 flex items-center justify-center size-14 rounded-xl bg-red-500/15 text-red-600 dark:text-red-400">
              <UIcon name="i-lucide-heart-pulse" class="size-8" aria-hidden="true" />
            </div>
            <div class="min-w-0 flex-1">
              <h4 class="text-lg font-semibold text-highlighted mb-2">Example 9: 45-minute healthcare staff huddle (Remote)</h4>
              <div class="text-muted text-sm mb-3 space-y-1">
                <p><strong>Format:</strong> Remote · <strong>Sector:</strong> Private · <strong>Preset:</strong> Healthcare</p>
                <p><strong>Participants:</strong> 8 people at $85K/year · <strong>Duration:</strong> 45 minutes</p>
              </div>
              <ul class="text-muted text-sm mb-4 space-y-1 list-none">
                <li><strong>Meeting cost:</strong> 8 × ($85,000 ÷ 2,080) × 0.75 hr = <strong class="text-highlighted">$245</strong></li>
                <li>Organization pays $245</li>
              </ul>
              <div class="rounded-lg bg-default/50 p-4 text-sm">
                <p class="font-medium text-highlighted mb-2">Business equivalent:</p>
                <ul class="text-muted space-y-1 text-sm list-disc list-inside">
                  <li>~1.4 hours of consultant time ($175/hr)</li>
                  <li>3 enterprise software licenses per month ($75 each)</li>
                </ul>
                <p class="font-medium text-highlighted mt-3 mb-2">Lunch-break equivalent:</p>
                <ul class="text-muted space-y-1 text-sm list-disc list-inside">
                  <li>~41 lattes or ~20 burritos</li>
                </ul>
                <p class="text-muted text-sm mt-2 italic">—Healthcare staff meetings coordinate care and compliance. But 45 minutes adds up across departments—a quick async huddle or shared doc can often capture handoffs without blocking clinical time.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Example 10 -->
        <div class="rounded-xl border border-default bg-muted/10 p-6 border-l-4 border-l-orange-500">
          <div class="flex items-start gap-4">
            <div class="shrink-0 flex items-center justify-center size-14 rounded-xl bg-orange-500/15 text-orange-600 dark:text-orange-400">
              <UIcon name="i-lucide-graduation-cap" class="size-8" aria-hidden="true" />
            </div>
            <div class="min-w-0 flex-1">
              <h4 class="text-lg font-semibold text-highlighted mb-2">Example 10: Nonprofit board meeting (In-person)</h4>
              <div class="text-muted text-sm mb-3 space-y-1">
                <p><strong>Format:</strong> In-person · <strong>Sector:</strong> Private (nonprofit) · <strong>Preset:</strong> Nonprofit / Education</p>
                <p><strong>Participants:</strong> 12 people at $68K/year · <strong>Duration:</strong> 1 hour</p>
                <p><strong>In-person:</strong> 30 min commute, $10/person coffee/parking</p>
              </div>
              <ul class="text-muted text-sm mb-4 space-y-1 list-none">
                <li><strong>Meeting cost:</strong> 12 × ($68,000 ÷ 2,080) × 1 hr = $392</li>
                <li><strong>In-person tax:</strong> Commute $392 × (30÷60) = $196; Extras 12 × $10 = $120 → <strong class="text-highlighted">$316</strong></li>
                <li><strong>Total:</strong> <strong class="text-highlighted">$708</strong> · Org $392; board members $316 (~$26/person avg)</li>
              </ul>
              <div class="rounded-lg bg-default/50 p-4 text-sm">
                <p class="font-medium text-highlighted mb-2">Business equivalent:</p>
                <ul class="text-muted space-y-1 text-sm list-disc list-inside">
                  <li>~4 hours of consultant time ($175/hr)</li>
                  <li>9 enterprise software licenses per month ($75 each)</li>
                  <li>1 conference registration ($1,200)</li>
                </ul>
                <p class="font-medium text-highlighted mt-3 mb-2">Lunch-break equivalent:</p>
                <ul class="text-muted space-y-1 text-sm list-disc list-inside">
                  <li>~118 lattes or ~59 burritos</li>
                </ul>
                <p class="text-muted text-sm mt-2 italic">—Board meetings drive governance. But nonprofits run lean—every dollar diverted to meetings is one less for mission. Hybrid or async options can trim cost without losing alignment.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p class="text-muted leading-relaxed mt-8">
        <NuxtLink to="/" class="text-primary hover:underline font-medium">
          ← Back to home
        </NuxtLink>
      </p>
    </div>
  </div>
</template>
