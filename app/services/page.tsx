const services = [
  {
    title: "Speech Therapy",
    for: "Children and adults with speech, language, and communication difficulties",
    benefits: [
      "Improved speech clarity and articulation",
      "Enhanced language comprehension and expression",
      "Better communication skills",
      "Increased confidence in social interactions",
    ],
    duration: "45 minutes",
  },
  {
    title: "Occupational Therapy (OT)",
    for: "Individuals needing support with daily living skills, motor skills, and sensory processing",
    benefits: [
      "Enhanced fine and gross motor skills",
      "Improved sensory processing",
      "Better daily living independence",
      "Support for developmental milestones",
    ],
    duration: "45 minutes",
  },
  {
    title: "Special Education",
    for: "Children with learning difficulties and special educational needs",
    benefits: [
      "Personalized learning strategies",
      "Academic skill development",
      "Learning disability support",
      "Improved educational outcomes",
    ],
    duration: "45 minutes",
  },
  {
    title: "Behaviour & Life Skills",
    for: "Children and adults requiring support with behavior management and essential life skills",
    benefits: [
      "Positive behavior modification",
      "Social skills development",
      "Life skills training",
      "Improved independence",
    ],
    duration: "45 minutes",
  },
  {
    title: "Adult Speech & Voice Therapy",
    for: "Adults with voice disorders, speech difficulties, or communication challenges",
    benefits: [
      "Voice quality improvement",
      "Speech clarity enhancement",
      "Communication confidence",
      "Professional voice support",
    ],
    duration: "45 minutes",
  },
];

export default function Services() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-12 text-center">Our Services</h1>

        <div className="space-y-8">
          {services.map((service, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-3xl font-semibold text-primary-600 mb-4">{service.title}</h2>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Who It Is For:</h3>
                <p className="text-gray-600">{service.for}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Benefits:</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  {service.benefits.map((benefit, bidx) => (
                    <li key={bidx}>{benefit}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-primary-50 rounded-md p-4">
                <p className="text-gray-700">
                  <span className="font-semibold">Session Duration:</span> {service.duration}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


