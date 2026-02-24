export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-8 text-sm text-gray-400 flex flex-col md:flex-row gap-2 md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Vision AI Studio · by Karishma Kumari</p>
        <div className="flex gap-4">
          <a href="mailto:karishmakumaritk@gmail.com" className="hover:text-white">Email</a>
          <a href="https://wa.me/919818691915" target="_blank" rel="noreferrer" className="hover:text-white">WhatsApp</a>
          <a href="https://www.linkedin.com/in/karishma-kumari-1a2b65235/" target="_blank" rel="noreferrer" className="hover:text-white">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
