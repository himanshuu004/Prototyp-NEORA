import Image from "next/image";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">About NEORA</h1>

        {/* Director Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6 text-center" style={{ color: 'rgba(37, 142, 203)' }}>
            DIRECTOR / FOUNDER INTRODUCTION
          </h2>
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Meet the Director</h3>
          
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-shrink-0 mx-auto md:mx-0">
              <Image
                src="/director.png"
                alt="BASLP Priyanka Rawat - Director & Lead Therapist"
                width={300}
                height={400}
                className="rounded-lg object-cover shadow-md"
              />
            </div>
            
            <div className="flex-1">
              <h4 className="text-xl font-bold mb-2" style={{ color: 'rgba(231, 79, 137)' }}>
                BASLP Priyanka Rawat
              </h4>
              <p className="text-lg font-semibold text-gray-700 mb-4">
                Director & Lead Therapist – NEORA
              </p>
              
              <p className="text-gray-600 leading-relaxed mb-6">
                BASLP Priyanka Rawat is a passionate and dedicated speech and therapy professional 
                with hands-on experience in working with children and adults across different 
                developmental, communication, and learning needs.
              </p>
              
              <p className="text-gray-600 leading-relaxed mb-6">
                She strongly believes that therapy should be ethical, compassionate, and result-oriented, 
                with a clear focus on long-term growth rather than short-term fixes.
              </p>
              
              <p className="text-gray-600 leading-relaxed">
                Her journey in the therapy field has been shaped by real clinical experience, where 
                she has worked closely with individuals, parents, and multidisciplinary teams.
              </p>
            </div>
          </div>
        </div>

        {/* About Her Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4" style={{ color: 'rgba(37, 142, 203)' }}>About Her</h2>
          
          <p className="text-gray-600 leading-relaxed mb-4">
            BASLP Priyanka Rawat has worked extensively in:
          </p>
          
          <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
            <li>Speech and language therapy</li>
            <li>Autism and developmental disorders</li>
            <li>Learning and attention difficulties</li>
            <li>Social communication challenges</li>
            <li>Adult speech, voice, and confidence-related issues</li>
          </ul>
          
          <p className="text-gray-600 leading-relaxed mb-4">
            Her key strength lies in understanding each individual deeply and designing therapy 
            plans that are personalised, practical, and achievable.
          </p>
          
          <p className="text-gray-600 leading-relaxed">
            She believes that every individual learns and grows at their own pace, and therapy 
            should respect that journey.
          </p>
        </div>

        {/* Vision Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4" style={{ color: 'rgba(37, 142, 203)' }}>Her Vision Behind NEORA</h2>
          
          <p className="text-gray-600 leading-relaxed mb-4">
            NEORA was founded by BASLP Priyanka Rawat with a clear vision — to provide quality-driven, 
            holistic therapy in a supportive and respectful environment.
          </p>
          
          <p className="text-gray-600 leading-relaxed mb-4">
            Her aim was to build a space where:
          </p>
          
          <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
            <li>Therapy is not rushed</li>
            <li>Progress is properly monitored</li>
            <li>Parents feel guided and supported</li>
            <li>Individuals feel safe, understood, and confident</li>
          </ul>
          
          <div className="p-4 rounded border-l-4" style={{ backgroundColor: 'rgba(160, 196, 73, 0.1)', borderColor: 'rgba(160, 196, 73)' }}>
            <p className="text-gray-700 italic font-medium">
              "Therapy should not only improve skills, but also improve quality of life."
            </p>
            <p className="text-gray-600 text-sm mt-2">
              This belief is the foundation of NEORA.
            </p>
          </div>
        </div>

        {/* Vision & Mission Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4" style={{ color: 'rgba(37, 142, 203)' }}>Our Vision</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            To be a leading therapy clinic that empowers individuals and families to achieve their
            fullest potential through compassionate, evidence-based interventions and personalized care.
          </p>

          <h2 className="text-2xl font-semibold mb-4" style={{ color: 'rgba(231, 79, 137)' }}>Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            NEORA is committed to providing exceptional therapy services for children and adults,
            fostering growth, independence, and well-being in a supportive and nurturing environment.
            We strive to make a positive difference in the lives of those we serve.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4" style={{ color: 'rgba(37, 142, 203)' }}>Experience & Qualifications</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Licensed and certified therapist with extensive training</li>
            <li>Years of experience in speech therapy and occupational therapy</li>
            <li>Specialized training in special education and behavior management</li>
            <li>Continuous professional development and certification updates</li>
            <li>Member of professional therapy associations</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold mb-4" style={{ color: 'rgba(231, 79, 137)' }}>Our Approach</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">For Children</h3>
              <p className="text-gray-600 leading-relaxed">
                We understand that each child is unique. Our child-centered approach focuses on
                creating a fun, engaging, and safe environment where children can learn and grow.
                We work closely with families to develop personalized therapy plans that address
                specific needs and goals.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">For Adults</h3>
              <p className="text-gray-600 leading-relaxed">
                Adult therapy at NEORA is designed to respect individual autonomy and goals.
                Whether addressing speech, voice, or life skills, we provide respectful,
                goal-oriented interventions that support independence and quality of life.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


