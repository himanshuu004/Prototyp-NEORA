import Link from "next/link";
import Image from "next/image";
import ImageCarousel from "@/components/ImageCarousel";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Carousel */}
      <section className="relative">
        <ImageCarousel />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Welcome to NEORA
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Empowering Lives Through Therapy
            </p>
            <Link
              href="/booking"
              className="inline-block text-white px-8 py-3 rounded-lg text-lg font-semibold hover:opacity-90 transition-opacity"
              style={{ backgroundColor: 'rgba(230, 82, 139)' }}
            >
              Book a Session
            </Link>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-16 px-4 text-white" style={{ backgroundColor: 'rgba(160, 197, 70)' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">About NEORA</h2>
          <p className="text-lg leading-relaxed">
            NEORA is a dedicated therapy clinic providing comprehensive support for children and adults.
            Our experienced therapists offer personalized care in speech therapy, occupational therapy,
            special education, and behavior management. We are committed to helping individuals achieve
            their full potential through evidence-based interventions and compassionate care.
          </p>
        </div>
      </section>

      {/* Director Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
            Meet Our Director
          </h2>
          <p className="text-xl mb-12 font-semibold" style={{ color: 'rgba(37, 142, 203)' }}>
            BASLP Priyanka Rawat - Director & Lead Therapist
          </p>
          
          <div className="bg-gray-50 rounded-lg shadow-md p-8">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-shrink-0">
                <Image
                  src="/director.png"
                  alt="BASLP Priyanka Rawat - Director & Lead Therapist"
                  width={280}
                  height={360}
                  className="rounded-lg object-cover shadow-lg"
                />
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <p className="text-gray-600 leading-relaxed mb-4">
                  BASLP Priyanka Rawat is a passionate and dedicated speech and therapy professional 
                  with hands-on experience in working with children and adults across different 
                  developmental, communication, and learning needs.
                </p>
                
                <p className="text-gray-600 leading-relaxed mb-4">
                  She strongly believes that therapy should be ethical, compassionate, and result-oriented, 
                  with a clear focus on long-term growth rather than short-term fixes.
                </p>
                
                <div className="p-4 rounded mt-6 border-l-4" style={{ backgroundColor: 'rgba(37, 142, 203, 0.1)', borderColor: 'rgba(37, 142, 203)' }}>
                  <p className="text-gray-700 italic font-medium">
                    "Therapy should not only improve skills, but also improve quality of life."
                  </p>
                </div>
                
                <div className="mt-6">
                  <Link
                    href="/about"
                    className="inline-block font-semibold hover:opacity-80 transition-opacity"
                    style={{ color: 'rgba(231, 79, 137)' }}
                  >
                    Learn More About Our Director →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Our Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Speech Therapy", description: "Comprehensive speech and language intervention" },
              { title: "Occupational Therapy", description: "Enhancing daily living and functional skills" },
              { title: "Special Education", description: "Personalized educational support" },
              { title: "Behaviour & Life Skills", description: "Developing essential life and social skills" },
              { title: "Adult Speech & Voice", description: "Professional voice and speech therapy" },
            ].map((service, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-3" style={{ color: idx % 2 === 0 ? 'rgba(37, 142, 203)' : 'rgba(231, 79, 137)' }}>
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/services"
              className="inline-block font-semibold hover:opacity-80 transition-opacity"
              style={{ color: 'rgba(231, 79, 137)' }}
            >
              Learn More About Our Services →
            </Link>
          </div>
        </div>
      </section>

      {/* Disorders Overview */}
      <section className="py-16 px-4 text-white" style={{ backgroundColor: 'rgba(160, 197, 70)' }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">We Help With</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              "Autism",
              "Speech Delay",
              "ADHD",
              "Learning Disabilities",
              "Stuttering",
              "Voice Disorders",
              "Social Communication",
            ].map((disorder, idx) => (
              <div
                key={idx}
                className="bg-white bg-opacity-20 rounded-lg shadow-md p-4 text-center hover:bg-opacity-30 transition-all"
              >
                <p className="font-medium">{disorder}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/disorders"
              className="inline-block font-semibold hover:opacity-80 transition-opacity"
              style={{ color: 'rgba(231, 79, 137)' }}
            >
              Learn More About Disorders →
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Preview */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">What Our Clients Say</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                quote: "NEORA has been a game-changer for our child. The therapists are compassionate and professional.",
                author: "Parent",
              },
              {
                quote: "The progress we've seen in just a few months is remarkable. Highly recommended!",
                author: "Family Member",
              },
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-md p-6">
                <p className="text-gray-600 italic mb-4">&ldquo;{testimonial.quote}&rdquo;</p>
                <p className="text-gray-800 font-semibold">— {testimonial.author}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/testimonials"
              className="inline-block font-semibold hover:opacity-80 transition-opacity"
              style={{ color: 'rgba(231, 79, 137)' }}
            >
              Read More Testimonials →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 text-white" style={{ backgroundColor: 'rgba(160, 196, 73)' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Begin Your Journey?</h2>
          <p className="text-xl mb-8">Book a session with us today and take the first step towards positive change.</p>
          <Link
            href="/booking"
            className="inline-block bg-white px-8 py-3 rounded-lg text-lg font-semibold hover:opacity-90 transition-opacity"
            style={{ color: 'rgba(230, 82, 139)' }}
          >
            Book a Session Now
          </Link>
        </div>
      </section>
    </div>
  );
}


