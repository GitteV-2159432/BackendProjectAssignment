# Introduction

This is a workout tracker web application with a `React` frontend and a `Node.js/Express` backend. It enables users to create and manage workouts and workout plans, as well as browse and bookmark existing ones. Additionally, users can explore and bookmark individual exercises.

This document describes how accessibility was considered and integrated during development of the app.

# Implemented Accessibility Features

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

- Associated labels with inputs using `<label for="">` and `id`
- Provided meaningful error messages and `aria-describedby` for validation
- Ensured submit buttons are reachable and operable via keyboard

# Testings Tools Used

### Evaluation Tool: WAVE

- Used the [WAVE – Browser Extension](https://wave.webaim.org/)

### Evaluation Tool: Lighthouse??


# Screen Reader Testing

### NVDA

Tested: 

# Team Responsibilities

- Gitte:
- Franziska:
- Elias:

# Video Demo

[Demonstration Video](https://memory.toys/classic/easy/)

# Conclusion

Accessibility was considered from early development. Testing with WAVE and VoiceOver helped improve usability for screen reader users. This will influence our future projects.