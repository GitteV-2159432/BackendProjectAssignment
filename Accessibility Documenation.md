# Introduction

This is a workout tracker web application with a `React` frontend and a `Node.js/Express` backend. It enables users to create and manage workouts and workout plans, as well as browse and bookmark existing ones. Additionally, users can explore and bookmark individual exercises.

This document describes how accessibility was considered and integrated during development of the app.

## Implemented Accessibility Features

Structure by feature/component:

### Navigation (e.g., Navbar)

- Used semantic HTML (`<nav>`, `<ul>`, `<li>`, `<button>`)
- Provided `aria-labels` or `title` attributes on navigation icons
- Ensured keyboard focus indicators and logical tab order

### Tab Component

- Used `role="tablist"` and `role="tab"` appropriately
- Used `aria-selected` and `aria-controls` to indicate active tab
- Enabled keyboard navigation using arrow keys and `Enter`

### Cards (Plans, Workouts, Exercises)

- Provided readable and structured headings (`<h2>` for names)
- Used descriptive `alt` text or `aria-label` on icons like the bookmark or "more" button
- Ensured proper focus for screen readers and tab navigation

### Forms

- Associated labels with inputs using `<label htmlFor="">` and `id`
- **Provided meaningful error messages and `aria-describedby` for validation**
- Ensured submit buttons are reachable and operable via keyboard

## Testing Tools Used

### Evaluation Tool: WAVE

- Used the [WAVE – Browser Extension](https://wave.webaim.org/)
  - Identified that some form inputs were missing associated `<label>` elements. Added appropriate labels to improve screen reader accessibility.
  - Noticed that the `<select>` element for exercise categories lacked a label. Added a label for better accessibility and usability.
  - Removed the top bar from the login and register screens to eliminate adjacent links pointing to the same destination, which helps reduce noise for screen reader users.

### Evaluation Tool: Lighthouse

- Ran audits using Lighthouse accessibility checks via Chrome DevTools.
- Used it to confirm color contrast, heading structure, and ARIA usage.

## Screen Reader Testing

### NVDA

## Additional Improvements

- Added `autocomplete` attributes to relevant input fields (e.g., name, email, password). While this did not trigger a warning in the WAVE tool, the browser console displayed an alert indicating the absence of these attributes, so they were added to enhance the user experience.

## Team Responsibilities

- Gitte:
- Franziska:
- Elias:

## Video Demo

[Demonstration Video](https://memory.toys/classic/easy/)

## Conclusion

Accessibility was considered from early development. Testing with WAVE and NVDA helped improve usability for screen reader users. These lessons will influence our future projects.
