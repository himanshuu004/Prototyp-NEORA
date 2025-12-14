const disorders = [
  {
    name: "Autism",
    description: "Autism Spectrum Disorder (ASD) affects communication, social interaction, and behavior. Our therapy focuses on developing communication skills, social understanding, and adaptive behaviors.",
  },
  {
    name: "Speech Delay",
    description: "Children who are slow to develop speech and language skills benefit from early intervention to support communication development and prevent further delays.",
  },
  {
    name: "ADHD",
    description: "Attention Deficit Hyperactivity Disorder requires strategies for attention management, organization skills, and behavior regulation to support daily functioning.",
  },
  {
    name: "Learning Disabilities",
    description: "Difficulties with reading, writing, math, or other academic skills are addressed through specialized educational strategies and accommodations.",
  },
  {
    name: "Stuttering",
    description: "Speech fluency disorders are treated through evidence-based techniques to improve speech flow and communication confidence.",
  },
  {
    name: "Voice Disorders",
    description: "Issues with voice quality, pitch, or volume are addressed through vocal therapy techniques and vocal hygiene practices.",
  },
  {
    name: "Social Communication Issues",
    description: "Difficulties with social interaction, understanding social cues, and building relationships are supported through targeted interventions.",
  },
];

export default function Disorders() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
          Disorders We Help With
        </h1>
        <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          At NEORA, we provide specialized support for various disorders and conditions.
          Our experienced therapists develop personalized treatment plans for each individual.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {disorders.map((disorder, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <h2 className="text-2xl font-semibold text-primary-600 mb-3">{disorder.name}</h2>
              <p className="text-gray-600 leading-relaxed">{disorder.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-primary-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Need More Information?
          </h2>
          <p className="text-gray-600 mb-6">
            If you have questions about how we can help with a specific condition,
            please don't hesitate to contact us.
          </p>
          <a
            href="/contact"
            className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}


