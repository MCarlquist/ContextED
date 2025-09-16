# Gemini Context: ContextED Mapper

This file provides context to the Gemini AI assistant to help it understand the **ContextED Mapper** project.

## Project Overview

ContextED Mapper is an innovative web application designed for educators, social workers, and community leaders in Helsingborg. It visualizes community resources and socio-political data on an interactive map to foster data-informed decision-making and improve educational outcomes. The project aims to bridge the gap where professionals lack accessible, localized data about the communities they serve.

## Key Features

*   **Interactive Geospatial Mapping:** A dynamic map interface using Leaflet.js to display multiple data layers (resources, demographics, school zones).
*   **Community Data Contribution:** Users can submit new resources, verify data, and add qualitative "Community Narratives."
*   **Gamification Strategy:** A gamification approach focused on collective effort through a "Community Impact Cup."
    *   **School Leaderboards:** Schools compete to enrich data. Leaderboard scores are a composite of data contribution (quantity/quality) and an aggregated metric of the school's average academic performance.
    *   User contributions count towards their associated school's score.
*   **Secure User Management & Content Moderation:** Robust authentication and systems for approving user-generated content.

## Technical Stack

### Frontend (`client/`)

- **Framework:** Angular
- **Mapping Library:** Leaflet.js
- **Language:** TypeScript
- **Styling:** SCSS and Less

### Backend (`backend/`)

- **Framework:** Node.js with Express.js
- **Language:** TypeScript
- **Database:** Supabase, leveraging its hosted PostgreSQL database with the PostGIS extension.
