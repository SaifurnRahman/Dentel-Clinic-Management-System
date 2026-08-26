const appointmentFaqs = [
  {
    index:0,
    question: "How can I book an appointment?",
    answer:
      "You can book an appointment by logging into your account, selecting a dentist, choosing an available date and time, and confirming the appointment.",
  },
  {
    index:1,
    question: "Can I cancel or reschedule my appointment?",
    answer:
      "Yes. You can cancel or reschedule your appointment from your appointment section, depending on the clinic's cancellation policy.",
  },
  {
    index:3,
    question: "How can I check my appointment status?",
    answer:
      "You can check your appointment status from your dashboard. The status may be shown as pending, confirmed, completed, or cancelled.",
  },
  {
    index:4,
    question: "Can I choose a specific dentist?",
    answer:
      "Yes. You can view the available dentists and select your preferred dentist while booking an appointment.",
  },
  {
    index:5,
    question: "What happens if I miss my appointment?",
    answer:
      "If you miss your appointment, you may need to book a new appointment. Please contact the clinic if you need further assistance.",
  },
];

const doctorFaqs = [
  {
    index:6,
    question: "How can I see the available dentists?",
    answer:
      "You can view the list of available dentists along with their specialties and available schedules from the dentist section.",
  },
  {
    index:7,
    question: "How can I know which dentist is suitable for my problem?",
    answer:
      "You can check each dentist's specialty and choose a dentist based on your dental needs. If you are unsure, you can contact the clinic for guidance.",
  },
  {
    index:8,
    question: "What are the clinic's doctor schedules?",
    answer:
      "Doctor schedules are displayed in the appointment section. Available times may vary depending on the dentist's schedule.",
  },
];

const patientFaqs = [
  {
    index:9,
    question: "How can I create a patient account?",
    answer:
      'Click the "Register" option and provide the required information. After completing registration, you can log in to your account.',
  },
  {
    index:10,
    question: "How can I update my personal information?",
    answer:
      'Log in to your account, open your profile, update the required information, and click "Save".',
  },
  {
    index:11,
    question: "Can I view my previous appointments?",
    answer:
      "Yes. Your previous and upcoming appointments can be viewed from your appointment history.",
  },
  {
    index:12,
    question: "Can I view my treatment history?",
    answer:
      "Yes. If the clinic has recorded your treatments in the system, you can view your treatment history from your patient dashboard.",
  },
];

const treatmentFaqs = [
  {
    index:13,
    question: "Can I view my prescription online?",
    answer:
      "Yes. Prescriptions uploaded or recorded by your dentist can be viewed from your patient dashboard.",
  },
  {
    index:14,
    question: "Can I see my previous treatment records?",
    answer:
      "Yes. Your recorded treatment information can be accessed from your treatment history.",
  },
  {
    index:15,
    question: "How can I get my dental reports?",
    answer:
      "If your reports are available in the system, you can view or download them from the reports section of your account.",
  },
];

const paymentFaqs = [
  {
    index:16,
    question: "What payment methods are available?",
    answer:
      "The supported options will be displayed during the payment process.",
  },
  {
    index:17,
    question: "How can I view my payment history?",
    answer:
      "You can view your previous payments and transaction details from the payment history section.",
  },
  {
    index:18,
    question: "How much does a particular treatment cost?",
    answer:
      "Treatment costs vary depending on the type of treatment. You can contact the clinic or check the treatment details for current pricing.",
  },
];

const clinicFaqs = [
  {
    index:19,
    question: "What are the clinic's opening hours?",
    answer:
      "The clinic's opening hours are displayed on the clinic information or contact page.",
  },
  {
    index:20,
    question: "How can I contact the clinic?",
    answer:
      "You can contact the clinic using the phone number, email address, or contact form provided on the Contact Us page.",
  },
  {
    index:21,
    question: "Do I need an appointment before visiting?",
    answer:
      "Appointments are recommended to ensure that a dentist is available at your preferred time.",
  },
  {
    index:22,
    question: "Does the clinic provide emergency dental services?",
    answer:
      "Please contact the clinic directly for urgent dental problems.",
  },
];

const accountFaqs = [
  {
    index:23,
    question: "I forgot my password. How can I reset it?",
    answer:
      'Click "Forgot Password" on the login page and follow the instructions to reset your password.',
  },
  {
    index:24,
    question: "Is my medical information secure?",
    answer:
      "The system is designed to protect patient information and restrict access to authorized users. You should also keep your account credentials private.",
  },
];

export const faqCategories = [
  {
    title: "Appointment",
    faqs: appointmentFaqs,
  },
  {
    title: "Doctor",
    faqs: doctorFaqs,
  },
  {
    title: "Patient",
    faqs: patientFaqs,
  },
  {
    title: "Treatment & Prescription",
    faqs: treatmentFaqs,
  },
  {
    title: "Payment",
    faqs: paymentFaqs,
  },
  {
    title: "Clinic",
    faqs: clinicFaqs,
  },
  {
    title: "Account",
    faqs: accountFaqs,
  },
];
