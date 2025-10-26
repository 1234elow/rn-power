# RN Power Inc - Website Clone

A modern, responsive clone of the RN Power Inc website built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 🚀 Built with Next.js 14 and React 19
- 💎 TypeScript for type safety
- 🎨 Tailwind CSS for styling
- 📱 Fully responsive design
- ⚡ Fast performance with server-side rendering
- 📧 Contact form with validation
- 🎯 SEO optimized

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd rn-power-clone
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm start` - Start the production server
- `npm run lint` - Run ESLint for code linting

## Project Structure

```
rn-power-clone/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts          # Contact form API endpoint
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Homepage
├── components/
│   ├── Header.tsx                # Navigation header
│   ├── Hero.tsx                  # Hero section
│   ├── Services.tsx              # Services section
│   ├── About.tsx                 # About section
│   ├── Contact.tsx               # Contact form
│   └── Footer.tsx                # Footer
├── public/                       # Static assets
├── tailwind.config.ts            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
└── next.config.js                # Next.js configuration
```

## Customization

### Colors

The color scheme can be customized in `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    // Your primary colors
  },
  accent: {
    // Your accent colors
  }
}
```

### Content

- Update text content in the component files under `/components`
- Add your images to the `/public` folder
- Update contact information in `components/Contact.tsx` and `components/Footer.tsx`

### Contact Form

The contact form currently logs submissions to the console. To add email functionality:

1. Install an email service package (e.g., Resend, SendGrid, Nodemailer)
2. Update `app/api/contact/route.ts` with your email sending logic
3. Add your API keys to environment variables

Example with Resend:
```bash
npm install resend
```

Then update the API route to send emails.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Deploy with one click

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Digital Ocean
- Railway

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [React](https://react.dev/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [PostCSS](https://postcss.org/) - CSS processing

## License

This project is for educational/demonstration purposes.

## Notes

This is a clone/recreation built with placeholder content. Replace all content, images, and contact information with actual company details before deploying to production.
