import { FC } from 'react';

export const Home: FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        {/* Hero badge */}
        <div className="mb-8 inline-flex items-center px-6 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 backdrop-blur-sm">
          <span className="text-sm font-medium text-purple-300">✨ CloudOps as a Service</span>
        </div>

        {/* Main heading */}
        <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent leading-tight">
          Template Hub
        </h1>
        
        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl">
          Manage cloud infrastructure like a professional
        </p>
        
        <p className="text-lg text-gray-400 mb-12 max-w-2xl">
          Automate deployment, monitoring, and scaling of your applications with our ready-made templates and tools
        </p>

        {/* CTA Button */}
        <div className="mb-16">
          <button className="px-8 py-4 border border-gray-600 hover:border-gray-500 rounded-lg font-semibold text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-300 backdrop-blur-sm">
            Watch Demo
          </button>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-3 gap-6 max-w-4xl">
          {[
            {
              icon: "🚀",
              title: "Rapid Deployment",
              description: "Deploy infrastructure in minutes, not hours"
            },
            {
              icon: "⚡",
              title: "Auto Scaling",
              description: "Automatic scaling based on demand"
            },
            {
              icon: "🔒",
              title: "Security",
              description: "Built-in security practices and monitoring"
            }
          ].map((feature, index) => (
            <div 
              key={index}
              className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="text-3xl mb-3">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
