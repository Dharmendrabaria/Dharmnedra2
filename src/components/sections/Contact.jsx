import React, { memo, useState, useCallback, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { FaPaperPlane, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaLinkedin, FaGithub } from 'react-icons/fa';
import { SITE } from '../../utils/constants';
import { sendEmail } from '../../services/emailService';
import ParticleBackground from '../ui/ParticleBackground';

const ContactMethod = memo(({ icon: Icon, title, value, href, delay }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    className="group flex items-center gap-4 glass-premium p-4 rounded-2xl border border-white/6 hover:border-primary/30 transition-colors"
  >
    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-primary group-hover:scale-110 transition-all duration-300">
      <Icon size={20} />
    </div>
    <div>
      <div className="text-xs text-gray-500 font-jetbrains uppercase tracking-wider mb-1">{title}</div>
      <div className="text-white font-medium group-hover:text-gradient transition-colors">{value}</div>
    </div>
  </motion.a>
));
ContactMethod.displayName = 'ContactMethod';

const InputField = memo(({ name, type, placeholder, required, value, onChange }) => (
  <div className="relative group">
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      required={required}
      value={value}
      onChange={onChange}
      className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 focus:bg-white/[0.04] transition-all peer font-inter"
    />
    {/* Focus glow */}
    <div className="absolute inset-0 rounded-xl bg-primary/20 opacity-0 peer-focus:opacity-10 blur-xl pointer-events-none transition-opacity" />
  </div>
));
InputField.displayName = 'InputField';

const TextAreaField = memo(({ name, placeholder, required, value, onChange }) => (
  <div className="relative group">
    <textarea
      name={name}
      placeholder={placeholder}
      required={required}
      value={value}
      onChange={onChange}
      rows="5"
      className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 focus:bg-white/[0.04] transition-all peer font-inter resize-none"
    />
    <div className="absolute inset-0 rounded-xl bg-primary/20 opacity-0 peer-focus:opacity-10 blur-xl pointer-events-none transition-opacity" />
  </div>
));
TextAreaField.displayName = 'TextAreaField';

const Contact = memo(() => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const formY = useTransform(scrollYProgress, [0, 1], ['10%', '-10%']);

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, sending, success, error

  const handleChange = useCallback((e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setStatus('sending');
    const success = await sendEmail(form);
    if (success) {
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } else {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  }, [form]);

  return (
    <section id="contact" ref={sectionRef} className="relative py-28 md:py-40 overflow-hidden" style={{ background: '#0D0D0D' }}>
      <ParticleBackground />
      {/* Background Aurora */}
      <div className="absolute inset-0 pointer-events-none aurora-bg opacity-30" />

      {/* Divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent origin-center"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-5 gap-16 lg:gap-8 items-center">

          {/* Left Column */}
          <div className="lg:col-span-2">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-label mb-4"
            >
              10 — Contact
            </motion.p>
            <div className="overflow-hidden mb-6">
              <motion.h2
                initial={{ y: '100%' }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
                className="heading-lg"
              >
                Let's Build <br />
                <span className="text-gradient">Together.</span>
              </motion.h2>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-500 text-[15px] leading-relaxed mb-12 max-w-md"
            >
              Have a project in mind, looking for a developer, or just want to chat?
              I'm always open to discussing product design work or partnership opportunities.
            </motion.p>

            <div className="space-y-4">
              <ContactMethod icon={FaEnvelope} title="Email" value={SITE.email} href={`mailto:${SITE.email}`} delay={0.3} />
              <ContactMethod icon={FaWhatsapp} title="WhatsApp" value={SITE.phone} href={SITE.whatsapp} delay={0.4} />
              <ContactMethod icon={FaMapMarkerAlt} title="Location" value="Gujarat, India" href="#" delay={0.5} />
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="flex gap-4 mt-12"
            >
              <a href={SITE.github} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                <FaGithub size={18} />
              </a>
              <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400 hover:text-[#0a66c2] hover:bg-white/10 transition-colors">
                <FaLinkedin size={18} />
              </a>
            </motion.div>
          </div>

          {/* Right Column - Form */}
          <motion.div
            style={{ y: formY }}
            className="lg:col-span-3 relative"
          >
            {/* Glow under form */}
            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />

            <motion.form
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              onSubmit={handleSubmit}
              className="relative glass-premium rounded-3xl p-8 md:p-12 border border-white/10"
            >
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <InputField name="name" type="text" placeholder="Your Name" required value={form.name} onChange={handleChange} />
                <InputField name="email" type="email" placeholder="Your Email" required value={form.email} onChange={handleChange} />
              </div>
              <div className="mb-6">
                <InputField name="subject" type="text" placeholder="Subject" required value={form.subject} onChange={handleChange} />
              </div>
              <div className="mb-8">
                <TextAreaField name="message" placeholder="Project Details or Message" required value={form.message} onChange={handleChange} />
              </div>

              <button
                type="submit"
                disabled={status === 'sending' || status === 'success'}
                className="w-full btn-primary justify-center text-base py-4 relative overflow-hidden"
              >
                <AnimatePresence mode="wait">
                  {status === 'idle' && (
                    <motion.span key="idle" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex items-center gap-2">
                      Send Message <FaPaperPlane size={14} />
                    </motion.span>
                  )}
                  {status === 'sending' && (
                    <motion.span key="sending" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...
                    </motion.span>
                  )}
                  {status === 'success' && (
                    <motion.span key="success" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-green-300">
                      Message Sent Successfully!
                    </motion.span>
                  )}
                  {status === 'error' && (
                    <motion.span key="error" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-red-300">
                      Failed to send. Please try again.
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </section>
  );
});
Contact.displayName = 'Contact';

export default Contact;
