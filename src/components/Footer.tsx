function Footer() {
  return (
    <footer
      id="contact"
      className="bg-midnight-blue text-white py-12 border-t-2 border-midnight-blue"
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-black uppercase mb-4">KOSTKU</h3>
            <p className="text-lg">
              Platform #1 untuk mencari dan mengelola kost di Indonesia.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-bold uppercase mb-4">PRODUK</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-ocean-blue">
                  Cari Kost
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-ocean-blue">
                  Daftarkan Kost
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-ocean-blue">
                  Mobile App
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold uppercase mb-4">BANTUAN</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-ocean-blue">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-ocean-blue">
                  Panduan
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-ocean-blue">
                  Kontak
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold uppercase mb-4">PERUSAHAAN</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-ocean-blue">
                  Tentang Kami
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-ocean-blue">
                  Karir
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-ocean-blue">
                  Blog
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-600 mt-8 pt-8 text-center">
          <p className="text-lg font-medium">
            © 2024 Kostku. Made with ❤️ for Indonesian students.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
