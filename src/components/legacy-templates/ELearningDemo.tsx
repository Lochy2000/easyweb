import React, { useState } from 'react';
import { 
  Book, 
  PlayCircle, 
  Users, 
  Award, 
  Clock,
  Star,
  ArrowRight,
  Search,
  BookOpen,
  Palette,
  TrendingUp,
  Briefcase,
  CheckCircle
} from 'lucide-react';

const ELearningDemo = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeTab, setActiveTab] = useState('popular');

  const courses = [
    {
      id: 1,
      title: "Web Development Fundamentals",
      instructor: "Sarah Johnson",
      level: "Beginner",
      duration: "8 weeks",
      students: 1234,
      rating: 4.8,
      price: 89.99,
      image: `/assets/images/demo/webdevelopmentclass.avif`,
      category: "Programming",
      topics: ["HTML & CSS", "JavaScript", "Responsive Design"]
    },
    {
      id: 2,
      title: "Digital Marketing Masterclass",
      instructor: "Michael Chen",
      level: "Intermediate",
      duration: "6 weeks",
      students: 856,
      rating: 4.6,
      price: 79.99,
      image: `/assets/images/demo/degitalmarketing.avif`,
      category: "Marketing",
      topics: ["SEO", "Social Media", "Content Strategy"]
    },
    {
      id: 3,
      title: "UI/UX Design Principles",
      instructor: "Emma Davis",
      level: "All Levels",
      duration: "10 weeks",
      students: 2156,
      rating: 4.9,
      price: 99.99,
      image: `/assets/images/demo/ui&ux.avif`,
      category: "Design",
      topics: ["Design Theory", "User Research", "Prototyping"]
    }
  ];

  const categories = [
    { name: 'All', icon: Book },
    { name: 'Programming', icon: BookOpen },
    { name: 'Design', icon: Palette },
    { name: 'Marketing', icon: TrendingUp },
    { name: 'Business', icon: Briefcase }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black opacity-20" />
          {/* Decorative shapes */}
          <div className="absolute right-0 bottom-0 w-1/3 h-1/2 bg-white/10 rounded-tl-full transform translate-y-1/4" />
          <div className="absolute left-1/4 top-1/4 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm mb-8">
              <Star className="w-4 h-4 mr-2" />
              Over 1000+ courses from expert instructors
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-8">
              Unlock Your Potential with Online Learning
            </h1>

            <p className="text-xl text-blue-100 mb-12">
              Access world-class education from anywhere. Learn at your own pace 
              with expert-led courses in programming, design, and more.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl bg-white rounded-lg shadow-lg p-2 flex">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="What do you want to learn?"
                  className="w-full pl-12 pr-4 py-3 rounded-md focus:outline-none"
                />
              </div>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex overflow-x-auto space-x-4 pb-4">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`flex items-center px-6 py-3 rounded-full whitespace-nowrap transition-colors ${
                    selectedCategory === category.name
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-2" />
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Featured Courses
            </h2>
            <div className="flex gap-2">
              {['popular', 'newest', 'trending'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-md capitalize ${
                    activeTab === tab
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div 
                key={course.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow"
              >
                <div className="relative">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-white rounded-full text-sm font-medium text-blue-600">
                      {course.level}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {course.title}
                  </h3>
                  
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center text-gray-600">
                      <Users className="w-4 h-4 mr-1" />
                      {course.students.toLocaleString()} students
                    </div>
                    <div className="flex items-center text-yellow-500">
                      <Star className="w-4 h-4 mr-1 fill-current" />
                      {course.rating}
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    {course.topics.map((topic, index) => (
                      <div key={index} className="flex items-center text-gray-600">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                        {topic}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 text-gray-400 mr-1" />
                      <span className="text-gray-600">{course.duration}</span>
                    </div>
                    <span className="text-2xl font-bold text-blue-600">
                      ${course.price}
                    </span>
                  </div>

                  <button className="w-full mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                    Enroll Now
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="inline-flex items-center gap-2 px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
              Browse All Courses
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Why Choose Our Platform
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Award,
                title: "Expert Instructors",
                description: "Learn from industry professionals with years of experience"
              },
              {
                icon: PlayCircle,
                title: "Interactive Learning",
                description: "Engage with hands-on projects and real-world applications"
              },
              {
                icon: Users,
                title: "Community Support",
                description: "Join a community of learners and share your journey"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <feature.icon className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Start Your Learning Journey Today
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of learners already transforming their careers
          </p>
          <button className="px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
            Get Started Free
          </button>
        </div>
      </section>
    </div>
  );
};

export default ELearningDemo;