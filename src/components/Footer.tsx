import React from 'react';

export function Footer() {
  return (
    <footer className="w-full py-6 md:px-8 md:py-12 bg-background">
      <div className="container mx-auto text-center text-muted-foreground">
        <p className="text-sm">© {new Date().getFullYear()} TechCheck Navigator by Arteco Consulting. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
