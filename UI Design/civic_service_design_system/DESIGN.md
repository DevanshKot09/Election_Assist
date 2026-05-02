---
name: Civic Service Design System
colors:
  surface: '#fcf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fcf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae7e7'
  surface-container-highest: '#e5e2e1'
  on-surface: '#1b1b1b'
  on-surface-variant: '#43474f'
  inverse-surface: '#313030'
  inverse-on-surface: '#f3f0ef'
  outline: '#747781'
  outline-variant: '#c4c6d1'
  surface-tint: '#3e5e95'
  primary: '#00193c'
  on-primary: '#ffffff'
  primary-container: '#002d62'
  on-primary-container: '#7796d1'
  inverse-primary: '#abc7ff'
  secondary: '#5a5f62'
  on-secondary: '#ffffff'
  secondary-container: '#dce0e4'
  on-secondary-container: '#5e6367'
  tertiary: '#3e0002'
  on-tertiary: '#ffffff'
  tertiary-container: '#650006'
  on-tertiary-container: '#ff6156'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d7e2ff'
  primary-fixed-dim: '#abc7ff'
  on-primary-fixed: '#001b3f'
  on-primary-fixed-variant: '#24467c'
  secondary-fixed: '#dfe3e7'
  secondary-fixed-dim: '#c3c7cb'
  on-secondary-fixed: '#171c1f'
  on-secondary-fixed-variant: '#43474b'
  tertiary-fixed: '#ffdad6'
  tertiary-fixed-dim: '#ffb4ab'
  on-tertiary-fixed: '#410002'
  on-tertiary-fixed-variant: '#93000d'
  background: '#fcf9f8'
  on-background: '#1b1b1b'
  surface-variant: '#e5e2e1'
typography:
  h1:
    fontFamily: Public Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  h2:
    fontFamily: Public Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.25'
    letterSpacing: -0.01em
  h3:
    fontFamily: Public Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Public Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Public Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Public Sans
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1'
    letterSpacing: 0.05em
  button:
    fontFamily: Public Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: '1'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 16px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style

The design system is anchored in the principles of civic duty, transparency, and clarity. It is designed to evoke a sense of institutional stability and non-partisan reliability. The aesthetic follows a **Corporate Modern** approach with a heavy emphasis on **Minimalism** to ensure that critical information—such as voting deadlines and candidate platforms—is never obscured by visual noise.

The target audience ranges from first-time voters to elderly citizens, requiring a "safety-first" design language. The UI should feel like a trusted public utility: helpful, unobtrusive, and authoritative. Visual metaphors are kept to a minimum, favoring structured information architecture and high-legibility standards over decorative elements.

## Colors

The palette is designed to look official and grounded. 
- **Primary (Navy Blue):** Used for headers, navigation, and primary brand elements to establish authority and trust.
- **Secondary (Light Blue Grey):** Used for large background areas and container fills to reduce eye strain while maintaining a clean, professional look.
- **Accent (Civic Red):** Reserved strictly for high-urgency items, such as "Register Now" prompts or critical deadline warnings.
- **Functional Blue:** A lighter, vibrant blue used for interactive elements like links and active states to ensure they are distinct from static navy text.

Backgrounds primarily use white or the very light secondary grey to maintain a high-contrast environment for readability.

## Typography

This design system utilizes **Public Sans**, a typeface specifically designed for accessibility and institutional clarity. It is a neutral, sans-serif face that excels in both large headlines and dense body text. 

To assist with complex information digestion:
- **Vertical Rhythm:** Generous line heights (1.6 for body) are used to prevent "text crowding," which is essential for accessibility.
- **Hierarchy:** Strong weight differentiation is used to separate section headers from instructional text.
- **Categorization:** Small caps labels are used for metadata, such as "Election Date" or "Location," to differentiate data points from narrative content.

## Layout & Spacing

The layout follows a **Fixed Grid** model for desktop to ensure that line lengths for articles and ballot measures remain within a readable range (max 700px for text columns). 

- **Grid:** A 12-column system with a 24px gutter provides the structure for multi-column candidate comparisons.
- **Spacing Rhythm:** An 8px base unit drives all padding and margins. 
- **Content Density:** For "Assistant" or "Wizard" flows, use centered, single-column layouts to minimize distractions. For "Information Portals," use a 2/3 and 1/3 split for primary content and sidebar resources.

## Elevation & Depth

To maintain a formal and trustworthy appearance, the design system avoids heavy shadows and floating elements. Instead, it uses **Tonal Layers** and **Low-contrast outlines**.

- **Surface Levels:** The main background is white (#FFFFFF). Cards and secondary sections use a subtle light grey fill (#F0F4F8) with a 1px border (#D1D5DB).
- **Depth:** Active input fields or focused cards receive a slight, sharp stroke in the primary navy color rather than a shadow. This reinforces a "paper-form" metaphor that feels official and easy to process for users with visual impairments.
- **Z-Index:** Modals and sticky headers use a very soft, high-blur shadow (0px 4px 20px rgba(0,0,0,0.05)) to suggest they sit above the page without feeling "game-like" or overly modern.

## Shapes

The design system uses a **Soft (Level 1)** roundedness profile. This 4px (0.25rem) radius provides a subtle hint of modern UI friendliness without losing the "serious" nature of an official document. 

- **Buttons & Inputs:** Use the standard 4px radius. 
- **Cards:** May use up to 8px (rounded-lg) to clearly define content groupings. 
- **Icons:** Should be contained within square or slightly rounded frames to maintain a structured, grid-based appearance. Avoid circular or pill-shaped buttons for primary actions, as they can feel too casual for this context.

## Components

### Buttons
Primary buttons use the Navy Blue background with white text for maximum contrast. Secondary buttons use an outline style. All buttons must have a minimum height of 48px to ensure they are easy to tap for all users.

### Input Fields
Forms are the core of the election assistant. Labels must always be visible (never use placeholder-only labels). Active states are indicated by a 2px Navy Blue border. Error states use the Civic Red for both the border and a supporting text message below the field.

### Information Cards
Used for candidate profiles or ballot measures. These feature a structured header with a "label-caps" category, a bold H3 title, and a body-md summary. Use a subtle light-grey background to group related data points.

### Progress Steppers
Essential for registration flows. Use a horizontal bar with numbered steps. Completed steps use a checkmark icon; the current step is highlighted in Navy Blue; future steps are greyed out.

### Accordions
Used for "Frequently Asked Questions" or long ballot measure details. Ensure the chevron icon is large and clear, and the hit area covers the entire header width.

### Alert Banners
High-visibility strips at the top of the page for urgent updates (e.g., "Polls close in 2 hours"). These use the Civic Red background with white text and a clear close action.