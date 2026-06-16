# 👑 Arihant Raaj — Royal Heritage Vastu, Astrology & Numerology

An elegant, premium, and interactive web application designed for a luxury spiritual consultancy practice. This platform seamlessly blends ancient wisdom with modern scientific guidance, providing clients with an immersive digital experience in Scientific Vastu, Vedic Astrology, and Sacred Numerology.

---

## 🌟 Key Features

*   **✨ Immersive Aesthetics**: Rich color palette (Ivory, Maroon, and Gold) with premium typography (*Cinzel*, *Cormorant Garamond*, and *Inter*), micro-animations, custom SVG frames (Palace Arch & Lotus motifs), and floating gold particles.
*   **🧭 Interactive Vastu Compass**: A beautifully animated, rotary brass compass face that displays details, elements, benefits, and practical remedies for the Cardinal directions (North, East, South, West).
*   **🎡 Interactive Zodiac Wheel**: A rotating astronomical wheel representing the 12 signs of the zodiac, enabling users to explore their celestial archetype, date range, and personality traits.
*   **🔮 Numerology Calculator**: A fully functional client-side engine that calculates the user's core cosmic numbers—**Life Path Number**, **Destiny Number**, and **Personality Number**—from their birth name and date of birth.
*   **📖 The Wisdom Library**: A stylized card collection mimicking the spines of antique leather-bound manuscripts with gold corners, summarizing core occult practices.
*   **💬 Patrons' Journey & Testimonials**: A stepped roadmap detailing the consultancy process alongside an auto-rotating patron review carousel.
*   **📅 Royal Invitation (Contact)**: An elegant, custom-designed communication portal featuring a responsive booking inquiry form and direct contact pathways (WhatsApp, Phone, Email, Jaipur Office details).

---

## 🛠️ Technology Stack

*   **Framework**: [TanStack Start](https://tanstack.com/router/v1/docs/start/overview) (React 19 + TypeScript + Vite)
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with a custom luxury heritage configuration
*   **Animations**: [Framer Motion / Motion](https://motion.dev/) for smooth transitions, compass rotation, and fade-in reveals
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **UI Components**: Customized Radix UI primitives via Shadcn UI

---

## 📂 Project Structure

```
├── .lovable/              # Lovable configuration
├── src/
│   ├── components/        # Reusable UI component library (Shadcn/Radix)
│   ├── hooks/             # Custom React hooks (e.g., mobile view detection)
│   ├── lib/               # Utility functions & error-reporting helpers
│   ├── routes/            # TanStack Router page routes
│   │   ├── __root.tsx     # Shell configuration (metadata, fonts, layout)
│   │   └── index.tsx      # Main application page (contains all sections)
│   ├── styles.css         # Custom Tailwind v4 styling system & animations
│   ├── router.tsx         # Router instantiation
│   └── start.ts           # Client-side entry point
├── package.json           # Scripts & dependency definitions
├── tsconfig.json          # TypeScript compilation options
└── vite.config.ts         # Vite bundler configuration
```

---

## 🚀 Getting Started

To launch the project locally:

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/mani1010dev/ARIHANT-RAAJ.git
    cd ARIHANT-RAAJ
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    ```

4.  **Open in your browser**:
    Navigate to `http://localhost:3000` (or the port specified in your terminal) to experience the application.

---

## 🏛️ Design System & Theme

The design system is defined in `src/styles.css` using Tailwind CSS v4 variables:

*   **Ivory (`#F8F3E8`)**: The primary canvas background, creating a soft, premium parchment feel.
*   **Maroon (`#6D1A1A`)**: Represents royalty, structure, and ancestral lineage.
*   **Gold (`#C89B3C`)**: Highlights elements, interactive controls, and represents abundance.
*   **Ink (`#2A2A2A`)**: Soft charcoal color used for highly legible serif typography.
