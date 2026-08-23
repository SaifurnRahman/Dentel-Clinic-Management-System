const Footer = () => {
  return (
    <footer className="bg-slate-900 py-8 text-slate-300">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <h3 className="mb-2 text-lg font-bold text-white">
              DentalCare BD
            </h3>

            <p className="text-sm">
              Simple and convenient dental care management for
              patients and clinics in Bangladesh.
            </p>
          </div>

          <div>
            <h3 className="mb-2 font-semibold text-white">
              Contact
            </h3>

            <p>Phone: +880 1XXX-XXXXXX</p>
            <p>Email: support@dentalcarebd.com</p>
            <p>Dhaka, Bangladesh</p>
          </div>

          <div>
            <h3 className="mb-2 font-semibold text-white">
              Opening Hours
            </h3>

            <p>Saturday – Thursday</p>
            <p>9:00 AM – 9:00 PM</p>
            <p>Friday: Limited Service</p>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-700 pt-4 text-center text-sm">
          © {new Date().getFullYear()} DentalCare BD. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;