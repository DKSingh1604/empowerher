# EmpowerHer

EmpowerHer is a comprehensive platform designed to empower women entrepreneurs by connecting them with NGOs, providing a marketplace for their products, and sharing inspiring success stories. The platform aims to bridge the gap between talent and opportunity, fostering a supportive community for growth and independence.

## 🚀 Features

- **Role-Based Access Control**: Tailored experiences for Entrepreneurs, NGOs, and Admins.
- **Marketplace**: A dedicated space for entrepreneurs to list and sell their products.
- **Entrepreneur Dashboard**: Tools for product management, profile customization, and growth tracking.
- **NGO Dashboard**: Features for NGOs to discover talent, manage funding, and provide support.
- **Success Stories**: A section highlighting inspiring journeys of women entrepreneurs.
- **Multilingual Support**: Built-in language switching capabilities to reach a wider audience.
- **Dark/Light Mode**: Theme toggle for better user accessibility and preference.
- **Secure Authentication**: Powered by Supabase for secure user management.

## 🛠️ Tech Stack

- **Frontend Framework**: [React](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Backend & Database**: [Supabase](https://supabase.com/)
- **State Management**: React Context & [TanStack Query](https://tanstack.com/query/latest)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) validation

## 📂 Project Structure

```
src/
├── assets/              # Static assets
├── components/          # Reusable UI components
│   ├── landing/         # Landing page specific components
│   ├── layout/          # Layout components (Header, Footer, etc.)
│   └── ui/              # shadcn-ui primitive components
├── contexts/            # Global state contexts (Auth, Theme, Language)
├── data/                # Mock data for development
├── hooks/               # Custom React hooks
├── integrations/        # Third-party integrations (Supabase)
├── lib/                 # Utility functions
├── pages/               # Application pages (Routes)
│   ├── entrepreneur/    # Entrepreneur-specific pages
│   ├── ngo/             # NGO-specific pages
│   └── ...              # General pages (Auth, Marketplace, Stories)
└── types/               # TypeScript type definitions
```

## 🏁 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/DKSingh1604/empowerher.git
    cd empowerher
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Environment Setup**

    Create a `.env` file in the root directory and add your Supabase credentials:

    ```env
    VITE_SUPABASE_URL=your_supabase_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

4.  **Start the development server**

    ```bash
    npm run dev
    ```

    The application will be available at `http://localhost:8080` (or the port shown in your terminal).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the project
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
