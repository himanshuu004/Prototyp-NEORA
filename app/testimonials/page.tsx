const testimonials = [
  {
    quote: "NEORA has been a game-changer for our child. The therapists are compassionate, professional, and truly care about our child's progress. We've seen remarkable improvements in just a few months.",
    author: "Priya Sharma",
    role: "Parent",
  },
  {
    quote: "The progress we've seen in our daughter's speech and communication skills is remarkable. The personalized approach and attention to detail make all the difference.",
    author: "Rajesh Kumar",
    role: "Parent",
  },
  {
    quote: "As an adult client, I appreciate the respectful and professional approach. The voice therapy sessions have significantly improved my confidence in professional settings.",
    author: "Anita Desai",
    role: "Adult Client",
  },
  {
    quote: "The occupational therapy services have helped our child develop essential life skills. The therapists make each session engaging and productive.",
    author: "Meera Patel",
    role: "Parent",
  },
  {
    quote: "NEORA's special education support has been invaluable. Our child's academic performance has improved, and they now enjoy learning.",
    author: "Vikram Singh",
    role: "Parent",
  },
  {
    quote: "The behavior and life skills program has transformed our family dynamics. We're grateful for the support and guidance we've received.",
    author: "Sunita Reddy",
    role: "Parent",
  },
];

export default function Testimonials() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">Client Testimonials</h1>
        <p className="text-center text-gray-600 mb-12">
          Hear from families and clients who have experienced positive changes with NEORA
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="mb-4">
                <svg
                  className="w-8 h-8 text-primary-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.984zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                </svg>
              </div>
              <p className="text-gray-600 italic mb-4 leading-relaxed">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div>
                <p className="font-semibold text-gray-800">{testimonial.author}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


