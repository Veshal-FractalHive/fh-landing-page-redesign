# Site content plan

Status: draft for review, 2026-10-01. Source material: [current-site.md](current-site.md); articles now live in `src/content/insights/` (drafts).

## Where we are

- Three products (ElevateRM, V-Track, Nico), **no live clients yet**, **no security certifications**, no uptime
  or monitoring commitments.
- Real assets: deep banking knowledge (visible in the articles), working products to demo, one delivery story
  (a learning-industry operations platform built in 22 days), and the founding team.
- Main call to action: **Request a demo** (lighter than "Book"; decided 2026-10-01). The demo page and closing sections also mention that we take on a few early design partners.

So the site can't borrow trust from logos, case studies or badges. It earns trust by being specific: showing exactly
how each product works, writing like people who know Indian banking, and being transparent about where the company is.

## Claims policy

Every claim on the site must be true today and something we could defend in a bank's procurement review.

**Remove from the current site**

- "99.9% Uptime Guarantee", "24/7 AI Monitoring", "Enterprise Security" badges
- "Join leading organizations that trust FractalHive"
- "helping teams across industries" (we're banking-focused)
- "unprecedented efficiency", "transformative", "10×" and similar unmeasured superlatives
- AI-generated product images and placeholder stock photos

**Allowed**

- What the product does, shown in an interactive diagram
- Problems, backed by the articles' domain analysis (with sources, e.g. the Economic Times gold-loan figure)
- The 22-day delivery story, stated accurately (learning-industry client, not a bank, not one of the three products)
- Founder and team backgrounds
- Data-handling facts we can confirm (see Open items)

**Needs confirming before use** (these come from our own articles, so they must be true for the products)

- V-Track "integrates with existing lending systems" and gets institutions to "audit readiness within weeks rather than months"
- ElevateRM works across LOS, LMS, CBS and CRM

## Audience

Indian banks and NBFCs.

| Who                                                 | Cares about                                                                   | Product   |
| --------------------------------------------------- | ----------------------------------------------------------------------------- | --------- |
| Heads of commercial / retail banking, RM leadership | RM productivity, turnaround time, revenue                                     | ElevateRM |
| Credit, risk and collateral teams                   | Valuation accuracy, LTV, audit readiness, expiring documents                  | V-Track   |
| Operations leadership                               | Fragmented workflows, controls, lifecycle visibility                          | Nico      |
| CIO / CTO, procurement                              | Integration with existing systems, data handling, deployment, vendor maturity | All       |

## Message

**The products are the headline.** (Decided 2026-10-01.) Visitors should meet ElevateRM, V-Track and Nico
in the first screen and be able to see each one working within a scroll. The company story supports the products,
not the other way round.

**Supporting idea:** remove the friction from the lending lifecycle. It explains why the three products exist
together, and comes straight from our own writing ("Reimagining the RM's day is not about adding more tools—it
is about removing friction"). It maps onto the design language: work that is stuck (idle), moving (flowing),
done (success), problems surfacing early (warning).

**Each product gets its own name-level identity:** a one-line promise (the current taglines are good: "One
workspace. Every action. Complete control." / "Always current. Always correct." / "Agentic conductor for
enterprise operations"), an audience, and a signature interactive diagram that only that product has.

**Supporting points**

1. **Built by people who know banking.** Articles and founders show it.
2. **Works with what you have.** A layer on top of existing LOS, LMS, CBS and CRM, not a core replacement. _(confirm)_
3. **Continuous, visible control.** Problems surface before audits and renewals, not during them.
4. **Fast to deploy.** AI-native engineering; we've shipped an enterprise platform in 22 days.

**Home hero, draft directions** (to choose later). Each names the products in the first screen:

- Headline "Three platforms for the lending lifecycle", then the three products as the hero itself: a tab or
  switcher where each product's live diagram plays.
- Headline "See every deal, valuation and workflow move", where deal = ElevateRM, valuation = V-Track,
  workflow = Nico, each word linked to its product and lighting up its diagram.
- Headline "Less coordination. More banking.", with the three products as cards directly under it, above the fold.

## Sitemap

| Page                        | Job                                                                                 | Primary CTA                |
| --------------------------- | ----------------------------------------------------------------------------------- | -------------------------- |
| Home                        | Product showcase: meet all three products and see each one working                  | Request a demo             |
| ElevateRM                   | Show the RM's day before and after; interactive deal pipeline                       | Request a demo (ElevateRM) |
| V-Track                     | Show a valuation lifecycle with alerts; interactive collateral tracker              | Request a demo (V-Track)   |
| Nico                        | Show an AI agent running a controlled workflow; the "AI thinking" state             | Request a demo (Nico)      |
| Insights + article pages    | Prove expertise; bring LinkedIn articles onto the site for search                   | Related product, then demo |
| About                       | Story, one set of values, founders and team, how we build                           | Request a demo / Careers   |
| Careers + role pages        | Hire; roles as content entries                                                      | Apply                      |
| Request a demo / Contact    | Capture qualified leads                                                             | Submit                     |
| Privacy                     | Legal (existing text)                                                               | —                          |
| _Later:_ How we handle data | Deployment, data residency, access controls, roadmap. Only once facts are confirmed | Request a demo             |

No separate "Products overview" page: the home page is the overview.

Navigation puts the products first, by name, at the top level (no hidden menu):
**ElevateRM · V-Track · Nico** | Insights · About · Careers · **Request a demo** (button). On mobile the three
products stay first in the menu. Contact lives in the footer and on the demo page.

## Page outlines

### Home

The home page is a product showcase. Most of the page is the products.

1. **Hero = the products.** A short headline, then all three products in the first screen, each with its tagline
   and audience. The signature moment: selecting a product plays its live state diagram right there in the hero.
   Request a demo + the product's own page.
2. **ElevateRM section** (large): problem in one line (RMs spend most of their day coordinating, not selling),
   the deal-pipeline diagram running, three capabilities, link to the product page.
3. **V-Track section** (large): problem in one line (collateral gaps surface at renewal or audit, too late),
   the valuation-tracker diagram with an expiry warning, three capabilities, link.
4. **Nico section** (large): problem in one line (workflows scattered across teams and documents), the
   AI-thinking workflow diagram, three capabilities, link.
5. **How they fit together:** one strip showing the lending lifecycle (relationship → collateral → operations)
   with each product's place on it. This is where the "remove friction" idea lives.
6. **Why FractalHive** (short): works with existing systems _(confirm)_, fast deployment (22-day story),
   built by people who know banking. Three lines, not a section of cards.
7. **From the team:** latest two or three insights, each tagged with its product.
8. **Closing CTA:** Request a demo, product pre-selectable, with a plain line on what happens in a demo.

Each of the three product sections uses the same structure so they read as a family, but each diagram is
unique to its product. Removed: the four generic principles (merged into About), the "leading organizations
trust us" line.

### Product page template (ElevateRM, V-Track, Nico)

1. Hero: who it's for, what it changes, Request a demo.
2. The problem, in the reader's words (from the articles).
3. **How it works:** an interactive state diagram of the real workflow. This is the page's proof.
   - ElevateRM: a deal moving from lead → pricing → credit → approved, with pending actions surfacing.
   - V-Track: collateral mapped to facilities, an insurance expiry raising a warning, revaluation, approved.
   - Nico: unstructured input → AI thinking → routed through controls → completed, with an audit trail.
4. Capabilities: the three existing capability names, each with two or three plain sentences.
5. Fits your stack: systems it works alongside. _(confirm)_
6. Related insights.
7. Request a demo, with the product pre-selected.

### Insights

- Host articles on the site as MDX (`/insights/[slug]`) with the LinkedIn original linked as "Also on LinkedIn".
- Each article is tagged to a product, so product pages can list related reading.
- Launch with: Collateral valuation assurance, Gold loans ₹30 lakh crore, A day in the life of an RM,
  Catch 22, Small changes big gains _(text needed)_.

### About

1. Story, rewritten for banking focus (the current one says "across industries").
2. **One** set of values, merged from the three current sets. Proposed four: Simplicity over extravagance ·
   Honesty over profitability · Ethical AI · Built with the people who use it. _(to agree)_
3. Founders and team: name, role, short background, LinkedIn. _(details needed)_
4. How we build: AI-native engineering, the 22-day story.
5. Careers link.

### Careers

- Roles as a content collection (title, team, location, type, experience, summary, requirements, status).
- Apply goes to a shared address (e.g. careers@fractalhive.com), not an individual's inbox. _(to set up)_
- Keep the three current roles if still open. _(confirm)_

### Request a demo / Contact

Form: name, work email, institution, role, product interest (ElevateRM / V-Track / Nico / Not sure), message
(optional). Honeypot + server validation; goes through the Azure Function to email.
Beside it: what happens next (a 30-minute walkthrough of the product on sample data, _confirm format_), email,
phone, office address, LinkedIn.

## Open items

| Item                                                                          | From                           | Needed for                      |
| ----------------------------------------------------------------------------- | ------------------------------ | ------------------------------- |
| Founder and team names, titles, short bios, photos, LinkedIn URLs             | You (LinkedIn is behind login) | About                           |
| Full text of "Small Changes, Big Gains" and "Catch 22"                        | You                            | Insights                        |
| Check the other three article drafts against LinkedIn                         | You                            | Insights                        |
| Confirm integration claims (LOS/LMS/CBS/CRM, "weeks not months")              | Product team                   | Product pages, Home             |
| Real product screens or flows for each product                                | Product team                   | Product diagrams                |
| Office street address                                                         | You                            | Contact, footer                 |
| Data handling facts: deployment options, where data is stored, access control | Product/engineering            | Later "How we handle data" page |
| Careers inbox and which roles are still open                                  | You                            | Careers                         |
| What a demo looks like (length, format)                                       | Sales                          | Demo page                       |
| Offer an early-access / design-partner programme?                             | Leadership                     | Home, demo page                 |
