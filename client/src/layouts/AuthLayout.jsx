import React from 'react';
import { Outlet } from 'react-router-dom';

export const AuthLayout = () => {
  return (
    <div className="flex min-h-screen w-screen items-center justify-center bg-slate-950 p-4">
      <div className="w-full max-w-md">
        <Outlet />
      </div>
    </div>
  );
};
