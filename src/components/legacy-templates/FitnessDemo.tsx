import React, { useState } from 'react';
import { Calendar, Clock, Dumbbell, Users, Play, ArrowRight, Heart } from 'lucide-react';

interface ClassItem {
    id: number;
    name: string;
    trainer: string;
    time: string;
    duration: string;
    intensity: string;
    spots: number;
    image: string;
  }

const FitnessDemo = () => {
    const [selectedClass, setSelectedClass] = useState<ClassItem | null>(null);
  const [activeTab, setActiveTab] = useState('classes');

  const classes = [
    {
      id: 1,
      name: "Power HIIT",
      trainer: "Alex Martinez",
      time: "6:00 AM",
      duration: "45 min",
      intensity: "High",
      spots: 8,
      image: `/assets/images/demo/power_hit.avif`
    },
    {
      id: 2,
      name: "Yoga Flow",
      trainer: "Sarah Chen",
      time: "7:30 AM",
      duration: "60 min",
      intensity: "Medium",
      spots: 12,
      image: `/assets/images/demo/yoga.avif`
    },
    {
      id: 3,
      name: "Strength & Core",
      trainer: "Mike Johnson",
      time: "5:30 PM",
      duration: "50 min",
      intensity: "High",
      spots: 6,
      image: `/assets/images/demo/strength.avif`
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-screen bg-black">
        <div className="absolute inset-0">
          <img
            src= {`/assets/images/demo/gym.avif`}
            alt="Fitness background"
            className="w-full h-full object-cover opacity-50"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-transparent" />
        </div>

        <div className="relative h-full max-w-7xl mx-auto px-6 flex items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center px-4 py-2 bg-green-500/20 backdrop-blur-sm rounded-full text-green-300 text-sm mb-6">
              <Heart className="w-4 h-4 mr-2" /> First Class Free
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Transform Your
              <br />
              <span className="text-green-400">Body & Mind</span>
            </h1>
            
            <p className="text-xl text-white/90 mb-8 max-w-xl">
              Join our community of fitness enthusiasts and experience 
              transformative workouts led by expert trainers.
            </p>

            <div className="flex gap-4">
              <button className="px-8 py-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                Start Free Trial
              </button>
              <button className="px-8 py-4 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors flex items-center gap-2">
                <Play className="w-4 h-4" /> Watch Video
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Class Schedule Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Today's Classes
            </h2>
            <p className="text-xl text-gray-600">
              Book your spot in our energizing group fitness classes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {classes.map((classItem) => (
              <div 
                key={classItem.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300"
              >
                <div className="relative">
                  <img
                    src={classItem.image}
                    alt={classItem.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => setSelectedClass(classItem)}
                      className="px-6 py-2 bg-green-500 text-white rounded-lg"
                    >
                      Book Now
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">
                        {classItem.name}
                      </h3>
                      <p className="text-gray-600">{classItem.trainer}</p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                      {classItem.time}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-green-500" />
                      {classItem.duration}
                    </div>
                    <div className="flex items-center gap-2">
                      <Dumbbell className="w-4 h-4 text-green-500" />
                      {classItem.intensity}
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-green-500" />
                      {classItem.spots} spots left
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="inline-flex items-center gap-2 px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
              View Full Schedule
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Membership Options */}
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Choose Your Journey
            </h2>
            <p className="text-xl text-gray-400">
              Flexible membership options to fit your lifestyle
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Basic",
                price: "59",
                features: [
                  "Access to gym equipment",
                  "2 classes per week",
                  "Basic fitness assessment",
                  "Locker room access"
                ]
              },
              {
                name: "Pro",
                price: "99",
                features: [
                  "Unlimited classes",
                  "Personal training session",
                  "Nutrition consultation",
                  "Progress tracking"
                ],
                popular: true
              },
              {
                name: "Elite",
                price: "149",
                features: [
                  "All Pro features",
                  "Weekly PT sessions",
                  "Recovery room access",
                  "Meal planning"
                ]
              }
            ].map((plan) => (
              <div 
                key={plan.name}
                className={`rounded-2xl p-8 ${
                  plan.popular 
                    ? 'bg-green-500 transform scale-105' 
                    : 'bg-gray-800'
                }`}
              >
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold mb-6">
                  ${plan.price}
                  <span className="text-base font-normal opacity-80">/month</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-300" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-lg transition-colors ${
                  plan.popular
                    ? 'bg-white text-green-500 hover:bg-gray-100'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}>
                  Choose Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FitnessDemo;