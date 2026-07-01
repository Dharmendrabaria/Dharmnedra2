import emailjs from '@emailjs/browser';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

/**
 * Send email via EmailJS
 * @param {{ name: string, email: string, subject: string, message: string }} formData
 */
export const sendEmail = async (formData) => {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    // Simulate success in dev when keys not set
    await new Promise((r) => setTimeout(r, 1500));
    return { success: true };
  }

  const result = await emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
      to_name: 'Dharmendra Baria',
    },
    PUBLIC_KEY
  );

  return { success: result.status === 200 };
};
