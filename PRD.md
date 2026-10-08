# Product Requirements Document (PRD)

## BornHere --- Personalized Birthday Time Capsule

-   **Project:** `birthday-present`
-   **Repository:** https://github.com/Nag-017/birthday-present
-   **Document status:** Draft based on the current public repository
-   **Product type:** Static, responsive, single-page storytelling
    website
-   **Current implementation:** HTML, CSS, and vanilla JavaScript

## 1. Product overview

BornHere is a personalized birthday time capsule that tells the story of
the world around a person on the day they were born. It presents a
recipient-specific narrative using a cinematic starfield, birth-date
details, sky and moon information, weather, music charts, life counters,
historical events, people sharing the birthday, cost comparisons, market
context, shareable card concepts, and a keepsake certificate.

The current repository is a static front-end implementation. The page is
personalized in its source code for **Megha**, born on **20 October
2006** in **Bidar, Karnataka, India**. Much of the displayed historical
and contextual information is hard-coded rather than retrieved from live
data services.

## 2. Problem statement

Most birthday greetings are short-lived messages or generic cards.
BornHere aims to make a birthday feel like a personal historical moment
by turning a birth date into an immersive, scrollable story that can be
viewed and shared.

## 3. Goals

1.  Create a visually distinctive, emotionally resonant birthday
    experience.
2.  Tell a coherent story using date, place, culture, history, and
    time-based details.
3.  Make the experience easy to open on desktop and mobile without an
    account.
4.  Provide lightweight interactions such as live counters, card-style
    selection, and share actions.
5.  Present a certificate/keepsake concept at the end of the story.
6.  Keep the initial experience inexpensive to host as a static website.

## 4. Non-goals for the current version

-   User accounts, authentication, or a profile database.
-   A production payment or checkout system.
-   Actual email delivery or scheduled reminders.
-   A backend API, CMS, or live data ingestion pipeline.
-   Guaranteed scientific accuracy for every historical, astronomical,
    weather, market, or price data point.
-   A functioning card-export pipeline unless implemented separately.
-   A true AI chatbot; the current chat behavior is preset/keyword-based
    where present.

## 5. Target users

### Primary user

A birthday recipient opening a personalized link shared by a friend,
partner, or family member.

### Secondary user

The person creating and sharing a birthday experience.

### User needs

-   Understand immediately whose story it is.
-   Explore the story without instructions.
-   Enjoy a polished, atmospheric design.
-   Share the page with others.
-   Understand which actions are real and which are only visual
    demonstrations.

## 6. Product experience and current feature inventory

  -----------------------------------------------------------------------
  Area                    Purpose                 Current behavior /
                                                  status
  ----------------------- ----------------------- -----------------------
  Hero                    Introduce the recipient Static, hard-coded
                          and birth date/place    content

  Starfield               Establish a cinematic   Animated canvas in
                          night-sky atmosphere    JavaScript

  Sky and moon            Show weekday, moon      Displayed as fixed
                          phase, illumination,    values
                          sunrise and sunset      

  Weather                 Describe the weather    Static card and values
                          around the birth date   

  Soundtrack              Show a song associated  Static metadata with
                          with the period         Spotify/YouTube search
                                                  links

  Life counters           Show days alive,        Counters update in the
                          elapsed time,           browser from a
                          approximate heartbeats  hard-coded birth
                          and related metrics     timestamp

  Historical archive      Present events          Static list
                          associated with the     
                          date                    

  Shared birthdays        List public figures     Static list
                          with the same birthday  

  Cost receipt            Compare selected        Static figures and
                          historical and          source labels
                          present-day prices      

  Market section          Show a                  Static values and chart
                          historical/current      illustration
                          market comparison       

  Story cards             Select receipt,         Selection state
                          celestial, or star-map  updates; current "save"
                          visual style            action only shows a
                                                  toast

  Sharing                 Copy link or open       Browser clipboard and
                          social sharing          external share URLs
                          destinations            

  Certificate             Display a keepsake      Static preview; some UI
                          certificate preview     suggests unlocking

  Claim/payment modal     Simulate certificate    Simulated only; no
                          unlock                  payment processor or
                                                  server verification

  Save for later          Collect an email and    Simulated only; no
                          show a success state    email service or
                                                  persistent reminder
  -----------------------------------------------------------------------

Feature behavior should be re-tested against the live branch before
release because this document describes the code observed at drafting
time.

## 7. User stories

-   As a recipient, I want to see my name and birth details immediately
    so I know the page was made for me.
-   As a recipient, I want to explore the sky, music, history, and world
    context from my birthday.
-   As a recipient, I want to see a live counter that updates while I
    view the page.
-   As a recipient, I want to share the experience with friends.
-   As a recipient, I want a certificate/keepsake that I can save or
    print.
-   As a creator, I want to change the recipient's name, birth date, and
    location without hunting through many unrelated HTML strings.
-   As a visitor, I want clear feedback after interacting with buttons.
-   As a visitor, I want forms and payment-related controls to be honest
    about whether an action actually happened.

## 8. Functional requirements

### FR-1: Personalized identity

The page shall display a recipient name, birth date, and birth location
in the hero and relevant story sections. **Current:** values are
hard-coded. **Recommended:** centralize these values in a configuration
object or data file.

### FR-2: Narrative sections

The page shall present the story in a readable vertical sequence, with
distinct sections and headings.

### FR-3: Life counter

The page shall calculate elapsed time from a configured birth timestamp
and update visible counters. Approximate metrics, such as heartbeats,
must be labelled as estimates.

### FR-4: Visual effects

The page shall render the starfield and certificate sky-map canvas where
those elements exist. Effects must not block content or interaction.

### FR-5: Card selection

The user shall be able to select a card style and see which style is
active. Until export is implemented, the UI must not claim a file has
been generated.

### FR-6: Sharing

The user shall be able to copy the current page URL and open supported
social sharing links. Clipboard failures must provide a usable fallback.

### FR-7: Certificate

The page shall show a certificate preview. A real download/print flow
should be implemented before the UI promises a downloadable artifact.

### FR-8: Save for later

If email reminders are not backed by a service, the page must describe
the feature as a demo or remove the submission/success claim. A
production implementation must validate input, obtain consent, securely
store the request, and use an email provider.

### FR-9: Payment

No payment must be represented as verified unless verified by a trusted
server-side payment integration. The current simulated unlock is for
demonstration only and must not be used to collect money.

### FR-10: Accessibility and responsive layout

The experience shall remain usable on narrow screens, support keyboard
navigation for controls, maintain readable contrast, and respect
reduced-motion preferences.

## 9. Non-functional requirements

-   **Performance:** Keep the page lightweight; avoid unnecessary
    libraries and excessive animation work.
-   **Compatibility:** Support current versions of Chrome, Edge,
    Firefox, and Safari.
-   **Responsive design:** Work on mobile, tablet, and desktop
    viewports.
-   **Reliability:** Missing optional elements should not crash the
    script.
-   **Accessibility:** Use semantic HTML, descriptive labels, focus
    indicators, and accessible modal behavior.
-   **Privacy:** Do not collect or transmit personal information without
    clear disclosure and consent.
-   **Security:** Do not put API keys or secrets in client-side files.
-   **Maintainability:** Separate structure, styling, and behavior;
    centralize recipient data.
-   **Content integrity:** Identify static/demo values and validate data
    before describing it as real-time or verified.

## 10. Success metrics

For a static personal gift, useful acceptance indicators are: - The page
loads successfully from the published URL. - All story sections render
on desktop and mobile. - No uncaught JavaScript errors occur during the
main journey. - Live counters update correctly for a known test date. -
Share-link copying succeeds or offers a fallback. - Every button's
behavior matches its label. - No demo payment or reminder flow falsely
claims a real transaction or email delivery.

Analytics should only be added if needed and with an appropriate privacy
notice.

## 11. Risks and assumptions

-   Many data points are hard-coded and may be outdated, illustrative,
    or inaccurate.
-   Date arithmetic using a fixed UTC offset and a 365.25-year
    approximation may not perfectly represent local calendar years or
    time zones.
-   Clipboard access may require HTTPS or a supported browser context.
-   Google Fonts require an internet connection; local fallback fonts
    are defined.
-   Static hosting cannot securely process payments, schedule emails, or
    store submissions by itself.
-   The current design appears to be built for one recipient, not a
    self-service multi-recipient product.

## 12. Recommended roadmap

### P0 --- Release correctness

-   Verify all buttons and links.
-   Remove or clearly label simulated payment and reminder success
    states.
-   Validate data and fix factual inaccuracies.
-   Check mobile layout, keyboard behavior, and console errors.
-   Publish via GitHub Pages or another static host.

### P1 --- Personalization and keepsakes

-   Centralize recipient name, date, location, and content.
-   Make certificate/card export actually download or print.
-   Add a configuration guide for creating another recipient page.
-   Improve accessible modal, form, and reduced-motion behavior.

### P2 --- Data-backed experience

-   Add a secure backend only for features that need persistence.
-   Integrate reputable sources for astronomy, weather, historical
    charts, and other changing facts.
-   Implement email reminders with consent and unsubscribe support.
-   Implement payment only if a real paid product is intended, using
    server-side verification.

## 13. Acceptance criteria

The current static version is acceptable for a personal demo when: 1.
The site loads without a build step. 2. The recipient and birth details
are consistent across the page. 3. Main sections are readable at 360px
mobile width and desktop width. 4. The life counter updates without
producing `NaN` or negative values. 5. Sharing controls either work or
show an accurate fallback. 6. Demo-only actions are not presented as
real payments, sent emails, or generated downloads. 7. No private
credentials are committed to the repository.
