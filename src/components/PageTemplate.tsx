import React from 'react';

interface PageTemplateProps {
  pageName: string;
}

const PageTemplate: React.FC<PageTemplateProps> = ({ pageName }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800">{pageName}</h1>
    </div>
  );
};

export default PageTemplate;
