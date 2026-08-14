---
name: Clinical Precision
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#424751'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#737782'
  outline-variant: '#c2c6d3'
  surface-tint: '#235eac'
  primary: '#004287'
  on-primary: '#ffffff'
  primary-container: '#1e5aa8'
  on-primary-container: '#bed4ff'
  inverse-primary: '#aac7ff'
  secondary: '#005fac'
  on-secondary: '#ffffff'
  secondary-container: '#5fa6fd'
  on-secondary-container: '#003a6d'
  tertiary: '#3e444b'
  on-tertiary: '#ffffff'
  tertiary-container: '#555c62'
  on-tertiary-container: '#ced4dc'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d6e3ff'
  primary-fixed-dim: '#aac7ff'
  on-primary-fixed: '#001b3e'
  on-primary-fixed-variant: '#00458d'
  secondary-fixed: '#d4e3ff'
  secondary-fixed-dim: '#a4c9ff'
  on-secondary-fixed: '#001c39'
  on-secondary-fixed-variant: '#004884'
  tertiary-fixed: '#dde3eb'
  tertiary-fixed-dim: '#c1c7cf'
  on-tertiary-fixed: '#161c22'
  on-tertiary-fixed-variant: '#41474e'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  headline-xl:
    fontFamily: Public Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Public Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Public Sans
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  headline-md:
    fontFamily: Public Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Public Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Public Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Public Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Public Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style
The design system is engineered to evoke clinical trust, technological precision, and patient-centric care. The aesthetic sits at the intersection of **Corporate Modern** and **Soft Minimalism**, prioritizing clarity and ease of use to reduce user anxiety during medical screenings. 

The visual language utilizes generous whitespace to signify hygiene and focus. Every element is designed to feel intentional and reliable, using subtle depth and soft transitions rather than aggressive visual flair. The goal is to provide a seamless, professional experience that bridges the gap between high-end consumer technology and medical-grade diagnostic software.

## Colors
The palette is rooted in medical blues to reinforce authority and calmness. 
- **Primary Blue (#1E5AA8):** Used for primary actions, branding, and high-level navigation.
- **Sky Blue (#2D7DD2):** Used for active states, interactive icons, and focus indicators.
- **Tertiary Surface (#EBF1F9):** A soft blue-tinted background color used to differentiate sections without the harshness of pure white.
- **Alert Tones:** A semantic scale (Yellow/Orange/Red) is utilized strictly for indicating the severity of skin conditions and system alerts.

Backgrounds primarily use a mix of pure white (#FFFFFF) for cards and light grays (#F8FAFC) for global canvases to maintain a sterile, clean environment.

## Typography
This design system utilizes **Public Sans** for its institutional clarity and exceptional legibility in data-heavy environments. 

- **Hierarchies:** Headlines use semi-bold and bold weights with tighter letter spacing to command attention. 
- **Readability:** Body text maintains a generous line height (1.5x) to ensure medical descriptions and instructions are easily digestible for patients.
- **Labels:** Small labels use a medium weight to maintain legibility even at diminished scales, specifically for metadata and status badges.

## Layout & Spacing
The layout follows a **Fluid Grid** model with a 12-column structure for desktop and a 4-column structure for mobile.

- **Rhythm:** An 8px base unit governs all spatial relationships. 
- **Content Flow:** Use "Stack" spacing to separate logical sections. `stack-lg` is reserved for major page sections, while `stack-sm` handles internal component spacing.
- **Safe Areas:** On mobile, margins are reduced to 16px to maximize the screen real estate for high-resolution dermatological imagery. 
- **Alignment:** All diagnostic results and data tables should align to the grid gutters to maintain a rigorous, professional appearance.

## Elevation & Depth
Depth is conveyed through **Tonal Layering** and **Ambient Shadows**. 

- **Surface Levels:** The base canvas is at the lowest level. Content containers (cards) are elevated using a very soft, diffused shadow (Blur: 20px, Y: 4px, Opacity: 4%) with a subtle 1px border in a slightly darker neutral tone.
- **Interactive Depth:** Upon hover, interactive elements should slightly increase their shadow spread to simulate a "lift" effect. 
- **Floating Elements:** Modals and diagnostic overlays use a high-elevation shadow (Blur: 40px, Y: 12px, Opacity: 8%) to clear the background visual noise, focusing the user entirely on the medical task at hand.

## Shapes
The shape language is defined by **Rounded** geometry to feel approachable and modern.

- **Component Radius:** Buttons and input fields use a 0.5rem (8px) radius.
- **Card Radius:** Large containers and diagnostic cards utilize a "2xl" treatment (1.5rem / 24px) to create a friendly, soft-touch aesthetic that deviates from traditional, cold medical software.
- **Imagery:** Dermatological photos should be framed in containers with the same 24px radius to ensure visual consistency across the interface.

## Components
- **Buttons:** Primary buttons use a solid #1E5AA8 fill with white text. Secondary buttons use a #EBF1F9 tint with #1E5AA8 text. High-radius (24px) should be used for call-to-action buttons.
- **Diagnostic Cards:** Large cards containing skin analysis results. They must feature a 24px corner radius, a subtle border (#E2E8F0), and a status-colored header strip (e.g., Red for "Action Required").
- **Severity Chips:** Small, pill-shaped badges (rounded-full) used to label conditions. Colors must map strictly to the semantic palette (Success/Warning/Critical).
- **Input Fields:** Search and data entry fields use a 1px border. On focus, the border transitions to #2D7DD2 with a soft 4px outer glow.
- **Medical Iconography:** Icons should be "Linear" with a 2px stroke weight and rounded terminals to match the typography's softness. Use a consistent #2D7DD2 for active icons.
- **Progress Steppers:** For multi-step skin assessments, use a horizontal stepper with soft-transitioning blue fills to guide the user through the process without overwhelming them.