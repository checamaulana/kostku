
import React from 'react';

const AuthLayout = ({ children, title, imageUrl }: { children: React.ReactNode, title: string, imageUrl: string }) => {
  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 bg-midnight-blue flex items-center justify-center p-12 text-white flex-col">
        <h1 className="text-5xl font-black uppercase tracking-tight mb-4">CHEKOST</h1>
        <p className="text-lg text-pale-sky text-center mb-8">Temukan Kost Impianmu, Tanpa Ribet.</p>
        <img src={imageUrl} alt="Auth Illustration" className="w-full max-w-md" />
      </div>
      <div className="w-1/2 bg-pale-sky flex items-center justify-center p-12">
        <div className="w-full max-w-md">
          <h2 className="text-4xl font-black text-midnight-blue mb-8">{title}</h2>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
