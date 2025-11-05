'use client';

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Map Section - Full Width */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full h-[400px] relative"
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3899.130893671664!2d109.18716859999999!3d12.239415399999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31705d006ccc0f39%3A0x3e48a7ce8f49a831!2sANT%20Wedding!5e0!3m2!1svi!2s!4v1761882159235!5m2!1svi!2s"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Ant Wedding Location - Nha Trang"
        ></iframe>
      </motion.div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Address */}
            <div>
              <h3 className="text-xl font-bold text-[#00bcd4] mb-3 uppercase">
                {t('officeAddress')}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {t('nhatrangAddress')}
                <br />
                <span className="text-sm text-gray-500">{t('makeAppointment')}</span>
              </p>
            </div>

            {/* Contact Details */}
            <div>
              <h3 className="text-xl font-bold text-[#00bcd4] mb-3 uppercase">
                {t('contactInfo')}
              </h3>
              <div className="space-y-2 text-gray-700">
                <p>
                  <span className="font-semibold">{t('consultant')}</span>{' '}
                  <a href="tel:0794672928" className="text-[#806a56] hover:text-[#cbb9a4] transition-colors">
                    079 467 2928
                  </a>
                </p>
                <p>
                  <span className="font-semibold">Email:</span>{' '}
                  <a href="mailto:antwedding79@gmail.com" className="text-[#806a56] hover:text-[#cbb9a4] transition-colors">
                    antwedding79@gmail.com
                  </a>
                </p>
                <p>
                  <span className="font-semibold">Page:</span>{' '}
                  <a href="https://www.facebook.com/antweddingteam" target="_blank" rel="noopener noreferrer" className="text-[#806a56] hover:text-[#cbb9a4] transition-colors">
                    https://www.facebook.com/antweddingteam
                  </a>
                </p>
                <p>
                  <span className="font-semibold">Instagram:</span>{' '}
                  <a href="https://www.instagram.com/ant_wedding_team" target="_blank" rel="noopener noreferrer" className="text-[#806a56] hover:text-[#cbb9a4] transition-colors">
                    https://www.instagram.com/ant_wedding_team
                  </a>
                </p>
                <p>
                  <span className="font-semibold">Tiktok:</span>{' '}
                  <a href="https://www.tiktok.com/@antweddingnhatrang" target="_blank" rel="noopener noreferrer" className="text-[#806a56] hover:text-[#cbb9a4] transition-colors">
                    https://www.tiktok.com/@antweddingnhatrang
                  </a>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;