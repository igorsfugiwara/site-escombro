
import React from 'react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ title, subtitle }) => {
  return (
    <div className="mb-12 border-l-8 border-amber-500 pl-6">
      <h2 className="text-5xl md:text-7xl font-oswald font-black leading-none tracking-tighter">
        {title}
      </h2>
      {subtitle && (
        <p className="text-amber-500 font-bold uppercase tracking-widest mt-2">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
