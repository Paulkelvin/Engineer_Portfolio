# Civil Engineer Portfolio Website

A modern, responsive portfolio website built with Next.js, showcasing civil engineering projects, services, and professional experience. Features rich visuals, interactive elements, and smooth animations while maintaining fast performance and accessibility.

## 🚀 Features

### Core Features
- **Responsive Design**: Mobile-first approach with seamless desktop experience
- **Modern UI/UX**: Clean, professional design with earth tones and engineering aesthetics
- **Fast Performance**: Optimized for <1s load times with lazy loading and image optimization
- **SEO Ready**: Meta tags, semantic HTML, and structured content
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support

### Pages
- **Home**: Hero section, animated stats, featured projects teaser
- **About**: Professional journey, skills with progress bars, interests
- **Services**: 8 comprehensive service offerings with detailed modals
- **Projects**: Rich project showcase with filters, galleries, and detailed views
- **Resume**: Professional experience, education, certifications, and awards
- **Contact**: Interactive form, contact details, and testimonials

### Technical Features
- **Framer Motion**: Smooth scroll animations and micro-interactions
- **Tailwind CSS**: Utility-first styling with custom design system
- **TypeScript**: Full type safety and better development experience
- **Image Optimization**: Next.js Image component with lazy loading
- **Dark Mode**: Theme toggle with system preference detection
- **Form Handling**: Contact form with validation and success states

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Montserrat (Google Fonts)
- **Deployment**: Ready for Vercel, Netlify, or any hosting platform

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd civil-engineer-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🚀 Build & Deploy

### Build for Production
```bash
npm run build
# or
yarn build
```

### Start Production Server
```bash
npm start
# or
yarn start
```

### Deploy
The project is ready to deploy on:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- Any static hosting service

## 🎨 Customization

### Personal Information
Update the following files with your information:
- `app/layout.tsx` - Site metadata and title
- `components/Navigation.tsx` - Navigation links and logo
- `components/Footer.tsx` - Contact information and social links
- All page components - Replace "John Smith" with your name

### Colors & Styling
Modify `tailwind.config.js` to customize:
- Primary colors (blue accents)
- Secondary colors (green for sustainability)
- Background colors
- Custom animations

### Images
Replace placeholder images with your own:
- Update image URLs in all components
- Use high-quality engineering project photos
- Optimize images for web (WebP format recommended)

### Content
Customize content in each page component:
- Project details and descriptions
- Service offerings and benefits
- Professional experience and achievements
- Skills and certifications

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

## ♿ Accessibility Features

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- High contrast ratios
- Focus indicators

## 🚀 Performance Optimizations

- Image lazy loading
- Component code splitting
- Optimized bundle size
- CSS purging with Tailwind
- Next.js built-in optimizations

## 🔧 Configuration Files

- `next.config.js` - Next.js configuration
- `tailwind.config.js` - Tailwind CSS customization
- `tsconfig.json` - TypeScript configuration
- `package.json` - Dependencies and scripts

## 📁 Project Structure

```
civil-engineer-portfolio/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── about/             # About page
│   ├── services/          # Services page
│   ├── projects/          # Projects page
│   ├── resume/            # Resume page
│   └── contact/           # Contact page
├── components/             # Reusable components
│   ├── Navigation.tsx     # Navigation bar
│   ├── Footer.tsx         # Footer component
│   └── ThemeProvider.tsx  # Dark/light mode
├── public/                 # Static assets
└── package.json           # Dependencies
```

## 🎯 Key Components

### Navigation
- Sticky navigation with scroll effects
- Mobile-responsive hamburger menu
- Dark mode toggle
- Smooth scrolling to sections

### Hero Sections
- Full-viewport height designs
- Background image placeholders
- Animated text and CTA buttons
- Parallax scrolling effects

### Project Showcase
- Filterable project grid
- Interactive project modals
- Image galleries with navigation
- Project timeline and phases
- 3D model viewer placeholders

### Contact Form
- Form validation
- File upload support
- Success animations
- Responsive layout

## 🌟 Animation Features

- **Scroll-triggered animations** using Framer Motion
- **Hover effects** on cards and buttons
- **Page transitions** and micro-interactions
- **Loading states** and success animations
- **Parallax scrolling** on hero sections

## 📊 SEO Features

- Meta tags for all pages
- Open Graph tags for social sharing
- Semantic HTML structure
- Optimized image alt text
- Fast loading times
- Mobile-friendly design

## 🔒 Security Features

- Form input validation
- Secure file upload handling
- XSS protection
- CSRF protection ready

## 🚀 Future Enhancements

- **Blog integration** for engineering insights
- **Project case studies** with detailed analysis
- **Interactive 3D models** using Three.js
- **Real-time chat** for client communication
- **Multi-language support** for international clients
- **Advanced analytics** and tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

For support or questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first approach
- Framer Motion for smooth animations
- Unsplash for placeholder images
- Civil engineering community for inspiration

---

**Built with ❤️ for the civil engineering community**

*Transform your engineering portfolio into a powerful digital presence that showcases your expertise and attracts new opportunities.*
