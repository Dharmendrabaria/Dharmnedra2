import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaLinkedin, FaGithub, FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import { FiSend, FiCheck, FiAlertCircle } from 'react-icons/fi';
import { SITE } from '../../utils/constants';
import { sendEmail } from '../../services/emailService';
import { staggerContainer, fadeInLeft, fadeInRight, fadeInUp } from '../../utils/animations';

const CONTACT_CARDS = [
  { icon: FaWhatsapp,   label: 'WhatsApp', value: SITE.phone,     href: SITE.whatsapp,            color: '#25D366' },
  { icon: FaLinkedin,   label: 'LinkedIn', value: 'dharmendrabaria', href: SITE.linkedin,          color: '#0A66C2' },
  { icon: FaGithub,     label: 'GitHub',   value: 'dharmendrabaria', href: SITE.github,            color: '#ffffff' },
  { icon: FaEnvelope,   label: 'Email',    value: SITE.email,     href: `mailto:${SITE.email}`,    color: '#EF4444' },
];

const inputClass = `w-full glass border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-600 text-sm outline-none 
  focus:border-primary/50 transition-all duration-300 bg-transparent font-inter`;

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [shakeField, setShakeField] = useState('');

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = 'Name is required';
    if (!form.email.trim())   e.email   = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email address';
    if (!form.subject.trim()) e.subject = 'Subject is required';
    if (!form.message.trim()) e.message = 'Message is required';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      const firstKey = Object.keys(errs)[0];
      setShakeField(firstKey);
      setTimeout(() => setShakeField(''), 600);
      return;
    }
    setErrors({});
    setStatus('sending');
    try {
      const result = await sendEmail(form);
      if (result.success) {
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
    setTimeout(() => setStatus('idle'), 5000);
  };

  const handleChange = (field, val) => {
    setForm((f) => ({ ...f, [field]: val }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: '' }));
  };

  const shakeVariant = {
    shake: { x: [0, -8, 8, -8, 8, 0], transition: { duration: 0.5 } },
    normal: { x: 0 },
  };

  return (
    <section id="contact" className="relative py-24 md:py-36 bg-[#0A0A0A] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(37,99,235,0.08), transparent)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="text-center mb-20"
        >
          <motion.p variants={fadeInUp} className="text-primary font-fira text-sm mb-3 tracking-widest uppercase">10 — Contact</motion.p>
          <motion.h2 variants={fadeInUp} className="font-syne text-4xl md:text-6xl font-bold text-white">
            Let's Build <span className="text-gradient">Together.</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-gray-500 mt-4 max-w-xl mx-auto">
            Have a project in mind? I'd love to hear about it. Drop a message and I'll respond within 24 hours.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Left: contact info */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            <div>
              <h3 className="font-syne text-2xl font-bold text-white mb-2">Get in Touch</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Open to full-time opportunities, freelance projects, and collaborations. If it's exciting, I'm in.
              </p>
            </div>

            {/* Contact cards */}
            <div className="space-y-3">
              {CONTACT_CARDS.map(({ icon: Icon, label, value, href, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 glass-card rounded-2xl p-4 border border-white/5 hover:border-primary/30 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110" style={{ background: `${color}20` }}>
                    <Icon size={18} style={{ color }} />
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 uppercase tracking-wider">{label}</div>
                    <div className="text-white text-sm font-medium group-hover:text-primary transition-colors">{value}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* Availability */}
            <div className="glass-card rounded-2xl p-5 border border-green-500/20">
              <div className="flex items-center gap-3 mb-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
                </span>
                <span className="text-green-400 font-medium text-sm">Currently Available</span>
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                Open to full-time roles, internships, and freelance projects starting immediately.
              </p>
            </div>

            {/* Embedded map placeholder */}
            <div className="rounded-2xl overflow-hidden h-44 glass border border-white/5 flex items-center justify-center">
              <div className="text-center text-gray-600">
                <FaMapMarkerAlt size={28} className="mx-auto mb-2 text-primary/50" />
                <p className="text-sm">{SITE.location}</p>
                <p className="text-xs mt-1 text-gray-700">Available for remote work worldwide</p>
              </div>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} noValidate className="glass-card rounded-3xl p-8 md:p-10 border border-white/5 space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                {/* Name */}
                <div>
                  <motion.div variants={shakeVariant} animate={shakeField === 'name' ? 'shake' : 'normal'}>
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={form.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className={`${inputClass} ${errors.name ? 'border-red-500/50' : ''}`}
                    />
                  </motion.div>
                  {errors.name && <p className="text-red-400 text-xs mt-1 ml-1">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <motion.div variants={shakeVariant} animate={shakeField === 'email' ? 'shake' : 'normal'}>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className={`${inputClass} ${errors.email ? 'border-red-500/50' : ''}`}
                    />
                  </motion.div>
                  {errors.email && <p className="text-red-400 text-xs mt-1 ml-1">{errors.email}</p>}
                </div>
              </div>

              {/* Subject */}
              <div>
                <motion.div variants={shakeVariant} animate={shakeField === 'subject' ? 'shake' : 'normal'}>
                  <input
                    type="text"
                    placeholder="Subject"
                    value={form.subject}
                    onChange={(e) => handleChange('subject', e.target.value)}
                    className={`${inputClass} ${errors.subject ? 'border-red-500/50' : ''}`}
                  />
                </motion.div>
                {errors.subject && <p className="text-red-400 text-xs mt-1 ml-1">{errors.subject}</p>}
              </div>

              {/* Message */}
              <div>
                <motion.div variants={shakeVariant} animate={shakeField === 'message' ? 'shake' : 'normal'}>
                  <textarea
                    rows={6}
                    placeholder="Tell me about your project..."
                    value={form.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    className={`${inputClass} resize-none ${errors.message ? 'border-red-500/50' : ''}`}
                  />
                </motion.div>
                {errors.message && <p className="text-red-400 text-xs mt-1 ml-1">{errors.message}</p>}
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={status === 'sending' || status === 'success'}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-3 transition-all duration-300 ${
                  status === 'success'
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : status === 'error'
                    ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                    : 'bg-primary text-white shadow-glow-blue hover:bg-primary-light'
                }`}
              >
                <AnimatePresence mode="wait">
                  {status === 'idle' && (
                    <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                      <FiSend size={16} /> Send Message
                    </motion.span>
                  )}
                  {status === 'sending' && (
                    <motion.span key="sending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </motion.span>
                  )}
                  {status === 'success' && (
                    <motion.span key="success" initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-2">
                      <FiCheck size={16} /> Message Sent!
                    </motion.span>
                  )}
                  {status === 'error' && (
                    <motion.span key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                      <FiAlertCircle size={16} /> Something went wrong. Try again.
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
