# Technical Requirements Document (TRD)

## BornHere --- Personalized Birthday Time Capsule

-   **Repository:** https://github.com/Nag-017/birthday-present
-   **Branch reviewed:** `main`
-   **Document status:** Draft based on current repository files
-   **Current source files:** `index.html`, `style.css`, `script.js`

## 1. System summary

BornHere is currently a client-side static website. The browser loads
one HTML document, a stylesheet, and a vanilla JavaScript file. No build
pipeline, package manifest, server-side runtime, or backend API is
evident in the repository's three-file structure.

### Current architecture

``` text
Browser
  ├── index.html
  │    ├── Semantic page sections and static content
  │    ├── Inline SVG illustrations and card markup
  │    └── Links to style.css and script.js
  ├── style.css
  │    ├── Design tokens and typography
  │    ├── Responsive layout and components
  │    └── Animations, modal states, and visual effects
  ├── script.js
  │    ├── Animated starfield canvas
  │    ├── Certificate sky-map canvas
  │    ├── Life-counter calculations
  │    ├── Story-card selection and toast notifications
  │    ├── Share actions
  │    └── Simulated certificate/payment/reminder behavior
  └── External resources
       ├── Google Fonts
       ├── Spotify search
       ├── YouTube search
       └── WhatsApp / X share destinations
```

## 2. Technology stack

  -----------------------------------------------------------------------
  Component               Technology              Usage
  ----------------------- ----------------------- -----------------------
  Markup                  HTML5                   Page structure,
                                                  sections, forms, modals

  Styling                 CSS3                    Layout, theme tokens,
                                                  responsive behavior,
                                                  animations

  Client logic            Vanilla JavaScript      Counters, canvas,
                                                  interactions, sharing

  Graphics                HTML Canvas, inline     Starfield, sky-map
                          SVG, CSS                illustration, charts
                                                  and decorative graphics

  Typography              Google Fonts with local Cormorant Garamond, DM
                          fallbacks               Sans, JetBrains Mono,
                                                  Playfair Display

  Hosting candidate       GitHub Pages            Static site deployment

  Build tooling           None currently required Files can be served
                                                  directly

  Backend/database        None in current         Persistence and
                          implementation          server-side
                                                  integrations are not
                                                  provided
  -----------------------------------------------------------------------

## 3. Repository layout

``` text
birthday-present/
├── index.html
├── style.css
├── script.js
└── (recommended documentation)
    ├── PRD.md
    ├── TRD.md
    └── design.md
```

The documentation files can be added to the root without changing the
site's runtime behavior.

## 4. Runtime and hosting

### Local development

-   Open `index.html` directly in a modern browser for a basic smoke
    test.
-   Prefer VS Code Live Server or another local static HTTP server for
    consistent behavior, particularly clipboard APIs and browser
    security restrictions.
-   No `npm install` or compile step is required by the current file
    structure.

### GitHub Pages

-   Publish from branch `main`, folder `/ (root)`, if the repository is
    configured for branch-based Pages deployment.
-   Ensure `index.html`, `style.css`, and `script.js` remain in the
    selected publishing root.
-   External fonts and share links require internet access.
-   A static deployment cannot securely implement server-side payment
    verification, email sending, or durable form storage.

## 5. JavaScript modules and responsibilities

The current `script.js` is a single global script with functions
organized by comments. Responsibilities include:

1.  **Birth configuration:** A hard-coded birth timestamp is created
    with an explicit `+05:30` offset.
2.  **Starfield animation:** Creates approximately 140 stars, animates
    their opacity with `requestAnimationFrame`, and resizes the canvas
    on window resize.
3.  **Certificate sky map:** Draws decorative stars on a canvas if the
    target element exists.
4.  **Life counters:** Calculates elapsed days and a clock display;
    estimates heartbeats at about 72 beats per minute; updates the UI
    once per second.
5.  **Story-card picker:** Maintains the selected card style and updates
    active classes.
6.  **Share interactions:** Opens/closes a modal, attempts to copy a URL
    using `navigator.clipboard`, and creates WhatsApp/X share links.
7.  **Claim modal:** Changes visual state and shows a toast to simulate
    certificate unlocking.
8.  **Save-for-later form:** Prevents normal submission and displays a
    success message; it does not send email or persist data in the
    current implementation.

### Recommended code organization (future refactor)

``` text
script.js
  ├── config.js        (recipient profile and content configuration)
  ├── counters.js      (date math and estimated metrics)
  ├── effects.js       (canvas effects and reduced-motion handling)
  ├── sharing.js       (copy/share utilities)
  ├── cards.js         (selection and actual export)
  └── forms.js         (honest demo states or real service integration)
```

This is a proposed organization, not the current repository structure.

## 6. Data model

### Current model

Most story data is embedded directly in `index.html`, while the birth
timestamp and baseline heartbeat value are in `script.js`. This creates
duplication risk: changing a name or date in one place may leave another
instance unchanged.

### Recommended profile configuration

``` js
const profile = {
  recipientName: "Megha",
  birthDate: "2006-10-20",
  birthTime: null,
  timeZone: "Asia/Kolkata",
  birthLocation: {
    city: "Bidar",
    region: "Karnataka",
    country: "India"
  }
};
```

Treat this as a proposed schema. Do not assume that a birth time is
known. Use the IANA time zone (`Asia/Kolkata`) for future date
calculations rather than scattering fixed offsets throughout the code.

For a static site, this object can live in a small configuration file or
at the top of `script.js`. For multiple recipients, consider generating
separate pages or loading validated public JSON. Do not place secrets in
client-side configuration.

## 7. Date and counter calculations

-   Store a well-defined birth timestamp and define how dates without a
    birth time should be interpreted.
-   Calculate elapsed milliseconds from the current time and derive
    elapsed seconds/days.
-   Distinguish elapsed 24-hour periods from calendar-day anniversaries.
-   Label heartbeats as an estimate and make the assumed rate
    configurable.
-   Avoid using a fixed `365.25` divisor as the only method for calendar
    age; compare calendar dates in the chosen time zone when showing
    years and remaining days.
-   Test leap years, birthday boundaries, time-zone boundaries, and
    future/invalid birth dates.
-   Update the DOM only when the relevant elements exist.

## 8. Browser APIs and failure handling

  -----------------------------------------------------------------------
  API / behavior                      Requirement
  ----------------------------------- -----------------------------------
  Canvas 2D context                   Check that the canvas exists and a
                                      context is available before drawing

  `requestAnimationFrame`             Avoid unnecessary work when the
                                      page is hidden; respect
                                      reduced-motion preference

  `setInterval`                       Ensure only one counter interval is
                                      active

  Clipboard API                       Handle permission/security errors
                                      and provide a manual-copy fallback

  `window.open`                       Use safe link attributes for
                                      external destinations

  DOM selection                       Guard optional elements; use
                                      semantic buttons and accessible
                                      states

  Modal interactions                  Support Escape, focus management,
                                      focus return, and keyboard use
  -----------------------------------------------------------------------

## 9. Security and privacy

### Current constraints

The current site is client-side and does not provide server-side storage
or secure payment processing. Form fields and UI messages must not imply
that data has been transmitted unless a real service is integrated.

### Requirements

-   Never commit API keys, email-provider credentials, payment secrets,
    or private tokens.
-   Treat email addresses as personal data. Explain purpose, retention,
    and deletion before collecting or storing them.
-   Validate all form values on the server if a backend is introduced.
-   Use HTTPS for the deployed website.
-   For real payments, create payment sessions server-side and verify
    provider webhooks/signatures on the server before unlocking paid
    content.
-   Do not rely on a client-side function such as
    `simulatePaymentSuccess()` as proof of payment.
-   Use `rel="noopener noreferrer"` on new-tab external links.
-   Review third-party links and content sources.

## 10. Accessibility and responsive behavior

-   Maintain semantic landmarks (`header`, `main`, `section`, `footer`
    where appropriate).
-   Use proper heading hierarchy and meaningful link text.
-   All interactive controls must be keyboard accessible.
-   Modals must manage focus, expose dialog semantics, and close with
    Escape.
-   Ensure contrast for muted text and gold-on-dark combinations.
-   Provide visible focus styles.
-   Add `prefers-reduced-motion` support and consider pausing decorative
    animation when the tab is hidden.
-   Ensure the starfield canvas is decorative and hidden from assistive
    technology.
-   Test at mobile widths around 360px, tablet widths, and wide desktop
    screens.

## 11. Performance and quality

-   Preserve a no-build, static delivery path unless a clear need
    justifies a framework.
-   Minimize layout thrashing and unnecessary DOM updates.
-   Keep canvas work within viewport bounds and scale correctly for
    device pixel ratio if high-DPI sharpness is needed.
-   Lazy-load any future large images.
-   Test network-offline behavior for external fonts.
-   Run browser console checks and responsive visual checks before
    release.

## 12. Test plan

### Smoke tests

-   Load `index.html` through a local HTTP server.
-   Confirm the CSS and JS load with no 404s.
-   Confirm no uncaught JavaScript errors occur.
-   Confirm all main story sections render.

### Functional tests

-   Counter values update every second and match independently
    calculated sample dates.
-   Story-card selection updates the active state.
-   Share modal opens and closes.
-   Copy URL succeeds or presents a manual fallback.
-   External share links contain the current URL.
-   Demo-only payment/reminder buttons never claim a real payment or
    email was completed.
-   Optional canvas elements do not break the page when absent.

### Visual/accessibility tests

-   Mobile and desktop layouts.
-   Keyboard-only navigation.
-   Modal focus and Escape behavior.
-   Reduced-motion setting.
-   Contrast and zoom at 200%.
-   Browser tests in current Chrome, Edge, Firefox, and Safari.

## 13. Deployment checklist

-   [ ] Confirm the intended recipient profile and all dates.
-   [ ] Verify factual claims and cite data sources in the UI where
    appropriate.
-   [ ] Remove secrets and personal data not intended for publication.
-   [ ] Confirm all links and controls.
-   [ ] Clearly label demo-only features.
-   [ ] Test mobile layout and browser console.
-   [ ] Enable GitHub Pages for `main` / root if that is the chosen
    host.
-   [ ] Open the published URL and re-test after deployment.
