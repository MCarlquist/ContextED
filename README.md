# ContextED Mapper

**An innovative web application to empower educators, social workers, and community leaders with data-informed insights for improving educational outcomes.**

---

## The Problem

Educators and social support professionals often lack accessible, localized, and easily digestible data to understand the broader socio-political context impacting their students and school communities. This gap can hinder targeted interventions, efficient resource allocation, and a holistic understanding of community needs.

## The Solution: ContextED Mapper

ContextED Mapper is a web application that bridges this gap by providing an intuitive platform to visualize community resources and socio-political data on an interactive map. It aims to foster data-informed decision-making, enhance resource allocation, and strengthen community collaboration.

## Key Features

*   **Interactive Geospatial Mapping:** Dynamic map interface displaying multiple data layers (resources, demographics, school zones).
*   **Community Data Contribution:** User-friendly tools for submitting new resources, verifying existing data, and adding qualitative "Community Narratives."
*   **Gamification ("Community Impact Cup"):** A collective, school-based leaderboard that encourages data contribution. Schools compete to enrich data, with scores based on data quantity/quality and aggregated academic performance metrics.
*   **Secure User Management:** Robust authentication and authorization for different user roles.
*   **Content Moderation:** A system for administrators to review and approve user-generated content.

## Technical Stack

*   **Frontend:** Angular, Leaflet.js for mapping
*   **Backend:** Node.js, Express.js
*   **Database:** Supabase (PostgreSQL) with the PostGIS extension for geospatial data.

## Getting Started

This project is a monorepo with a `client` and `backend` directory.

**Prerequisites:**
*   Node.js
*   Angular CLI

**Backend Setup:**
```bash
cd backend
npm install
# Add .env file with Supabase credentials
npm start
```

**Frontend Setup:**
```bash
cd client
npm install
ng serve
```

## Contributing

We are seeking passionate individuals who are eager to contribute to a project with significant social impact. We are looking for expertise in:

*   Backend Development (Node.js/Express.js/Supabase)
*   Frontend Development (Angular, Leaflet.js)
*   UI/UX Design
*   Data Science/Analysis
*   Educational or Social Sector Expertise

If you're excited by the vision of ContextED Mapper and want to help build a tool that can truly make a difference, please check out the issues and feel free to reach out!
