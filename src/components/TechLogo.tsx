import React from "react";

interface TechLogoProps {
  name: string;
  className?: string;
  size?: number;
}

export function TechLogo({ name, className = "", size = 18 }: TechLogoProps) {
  const norm = name.trim().toLowerCase();

  // JavaScript
  if (norm.includes("javascript")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="JavaScript">
        <rect width="24" height="24" rx="3" fill="#F7DF1E" />
        <path
          fill="#000000"
          d="M6.7 18.2c.4.6.9 1.1 1.7 1.1 1 0 1.6-.5 1.6-1.7V11H12v6.6c0 2.3-1.4 3.4-3.7 3.4-2 0-3.2-1-3.7-2.2l2.1-1.2zm7.6-.3c.6.9 1.4 1.4 2.5 1.4 1 0 1.7-.5 1.7-1.3 0-.9-.7-1.3-1.9-1.8l-.7-.3c-1.9-.8-3.1-1.8-3.1-4 0-2 1.5-3.5 3.9-3.5 1.7 0 2.9.6 3.8 2.1l-1.9 1.2c-.4-.7-1-1-1.9-1-.9 0-1.5.5-1.5 1.2 0 .8.6 1.2 1.8 1.7l.6.3c2.2 1 3.3 2 3.3 4.2 0 2.4-1.9 3.7-4.3 3.7-2.4 0-3.9-1.1-4.6-2.6l2.1-1.3z"
        />
      </svg>
    );
  }

  // TypeScript
  if (norm.includes("typescript")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="TypeScript">
        <rect width="24" height="24" rx="3" fill="#3178C6" />
        <path
          fill="#FFFFFF"
          d="M12.8 10.8V8.5H5v2.3h2.6v8.7h2.6v-8.7h2.6zm5.5 3.2c-.7-.4-1.4-.8-2.2-1.1-.5-.2-.7-.5-.7-.8 0-.4.3-.7.8-.7.7 0 1.4.3 2 .8l1.3-1.6c-.9-.8-2-1.2-3.3-1.2-2 0-3.4 1.2-3.4 2.8 0 1.3.8 2.2 2.3 2.9 1 .4 1.5.7 1.5 1.2 0 .5-.5.8-1.2.8-.9 0-1.7-.4-2.4-1.1l-1.4 1.6c1 1.1 2.4 1.6 3.9 1.6 2.2 0 3.7-1.2 3.7-2.9 0-1.3-.9-2.2-2.4-2.8z"
        />
      </svg>
    );
  }

  // HTML
  if (norm === "html" || norm.includes("html5")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="HTML5">
        <path fill="#E34F26" d="M3 2l1.8 20.2L12 24l7.2-1.8L21 2H3z" />
        <path fill="#EF652A" d="M12 3.8v18.4l5.7-1.4 1.5-17H12z" />
        <path fill="#EBEBEB" d="M12 7.7H7.4l.2 2.3H12v-2.3zm0 4.6H7.8l.2 2.3H12V12.3zm0 5.4l-.1.02-2.5-.7-.2-1.8H7.3l.3 3.6 4.4 1.2V17.7z" />
        <path fill="#FFFFFF" d="M12 7.7v2.3h4.4l-.2-2.3H12zm0 4.6v2.3h-2.3l-.1-1.1H8.5l.2 2.3H12v.01l2.5-.7.3-3.6H12v-2.3h4.5l-.4 4.6-4.1 1.1z" />
      </svg>
    );
  }

  // CSS
  if (norm === "css" || norm.includes("css3")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="CSS3">
        <path fill="#1572B6" d="M3 2l1.8 20.2L12 24l7.2-1.8L21 2H3z" />
        <path fill="#33A9DC" d="M12 3.8v18.4l5.7-1.4 1.5-17H12z" />
        <path fill="#EBEBEB" d="M12 7.7H7.4l.2 2.3H12v-2.3zm0 4.6H7.8l.2 2.3H12V12.3zm0 5.4l-.1.02-2.5-.7-.2-1.8H7.3l.3 3.6 4.4 1.2V17.7z" />
        <path fill="#FFFFFF" d="M12 7.7v2.3h4.4l-.2-2.3H12zm0 4.6v2.3h-2.3l-.1-1.1H8.5l.2 2.3H12v.01l2.5-.7.3-3.6H12v-2.3h4.5l-.4 4.6-4.1 1.1z" />
      </svg>
    );
  }

  // SCSS / Sass
  if (norm.includes("scss") || norm.includes("sass")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="Sass">
        <rect width="24" height="24" rx="4" fill="#CF649A" />
        <path
          fill="#FFFFFF"
          d="M17.5 11.2c-.2-1.8-1.7-2.6-3.2-2.6-2.3 0-4.1 1.6-4.1 3.9 0 2.7 2.2 3.7 3.9 3.7 1.3 0 2.5-.6 3-1.6l-1.3-.8c-.3.6-1 .9-1.7.9-1.1 0-2-.6-2.2-1.8h5.9c0-.6 0-1.1-.3-1.7zm-4.4-.7c.8 0 1.5.5 1.7 1.3h-3.4c.2-.8.9-1.3 1.7-1.3z"
        />
      </svg>
    );
  }

  // Bootstrap
  if (norm.includes("bootstrap")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="Bootstrap">
        <rect width="24" height="24" rx="4" fill="#7952B3" />
        <path
          fill="#FFFFFF"
          d="M7.5 5.5h4.6c1.8 0 3 .8 3 2.3 0 1-.6 1.7-1.6 2 1.3.3 2 1.2 2 2.4 0 1.7-1.4 2.6-3.4 2.6H7.5V5.5zm2.5 3.8h2c.7 0 1.1-.3 1.1-.9 0-.6-.4-.9-1.1-.9H10v1.8zm0 3.3v2h2.2c.8 0 1.3-.3 1.3-1s-.5-1-1.3-1H10z"
        />
      </svg>
    );
  }

  // Tailwind CSS
  if (norm.includes("tailwind")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="Tailwind CSS">
        <path
          fill="#06B6D4"
          d="M12 4.5C8.8 4.5 6.8 6.1 6 9.3c1.2-1.6 2.6-2.2 4.2-1.8.9.2 1.6.9 2.3 1.6 1.2 1.2 2.5 2.6 5.5 2.6 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.9-.2-1.6-.9-2.3-1.6C16.3 5.9 15 4.5 12 4.5zM6 11.7C2.8 11.7.8 13.3 0 16.5c1.2-1.6 2.6-2.2 4.2-1.8.9.2 1.6.9 2.3 1.6 1.2 1.2 2.5 2.6 5.5 2.6 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.9-.2-1.6-.9-2.3-1.6-1.2-1.2-2.5-2.6-5.5-2.6z"
        />
      </svg>
    );
  }

  // React & Context API
  if (norm.includes("react") || norm.includes("context api")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="React">
        <ellipse cx="12" cy="12" rx="9" ry="3.5" fill="none" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(30 12 12)" />
        <ellipse cx="12" cy="12" rx="9" ry="3.5" fill="none" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(90 12 12)" />
        <ellipse cx="12" cy="12" rx="9" ry="3.5" fill="none" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(150 12 12)" />
        <circle cx="12" cy="12" r="1.8" fill="#61DAFB" />
      </svg>
    );
  }

  // Redux Toolkit
  if (norm.includes("redux")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="Redux">
        <rect width="24" height="24" rx="4" fill="#764ABC" />
        <path
          fill="#FFFFFF"
          d="M12 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zm-5 7a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zm10 0a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zm-7.6-4.3l3 4.2-1.6 1.1-3-4.2 1.6-1.1zm5.2 0l1.6 1.1-3 4.2-1.6-1.1 3-4.2zm-4.6 6.8h4v2h-4v-2z"
        />
      </svg>
    );
  }

  // Next.js
  if (norm.includes("next")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="Next.js">
        <circle cx="12" cy="12" r="11" fill="#000000" />
        <path fill="#FFFFFF" d="M15.5 7.5v9h-1.8l-5.4-7.2v7.2H6.5v-9h1.8l5.4 7.2V7.5z" />
        <path fill="url(#nextG)" d="M17.5 16.5l-6-8.5h-1.8l6.3 9h1.5z" />
        <defs>
          <linearGradient id="nextG" x1="12" y1="9" x2="16" y2="17" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFFFF" />
            <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  // TanStack Query
  if (norm.includes("tanstack") || norm.includes("query")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="TanStack Query">
        <circle cx="12" cy="12" r="10" fill="#FF4154" />
        <path fill="#FFD234" d="M12 5a7 7 0 0 1 7 7c0 2-.8 3.8-2.1 5.1L12 12V5z" />
        <circle cx="12" cy="12" r="4.5" fill="#FFA500" />
        <circle cx="12" cy="12" r="2" fill="#FFFFFF" />
      </svg>
    );
  }

  // Node.js
  if (norm.includes("node")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="Node.js">
        <path fill="#539E43" d="M12 2l9 5.2v10.4L12 23l-9-5.4V7.2L12 2z" />
        <path fill="#333333" d="M12 4.4L5.2 8.3v7.4l6.8 3.9 6.8-3.9V8.3L12 4.4zm0 2.6l4.5 2.6v5.2L12 17.4l-4.5-2.6V9.6L12 7z" />
        <path fill="#539E43" d="M12 9l2.5 1.5v3L12 15l-2.5-1.5v-3L12 9z" />
      </svg>
    );
  }

  // Express.js
  if (norm.includes("express")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="Express.js">
        <rect width="24" height="24" rx="4" fill="#1C1C1C" />
        <path
          fill="#FFFFFF"
          d="M5 8h4.5v1.8H7v1.8h2.2v1.8H7v2h2.5V17H5V8zm6 0h2.1l1.6 3.1 1.6-3.1h2.1l-2.7 4.5 2.9 4.5H16.4l-1.8-3.3-1.8 3.3H10.7l2.9-4.5L11 8z"
        />
      </svg>
    );
  }

  // REST APIs
  if (norm.includes("rest api") || norm === "rest") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="REST API">
        <rect width="24" height="24" rx="4" fill="#0284C7" />
        <path
          fill="#FFFFFF"
          d="M6 7h4c1.1 0 2 .9 2 2 0 .8-.5 1.5-1.2 1.8l1.4 3.2H10l-1.2-2.8H7.8V14H6V7zm1.8 4.2h2.2c.2 0 .4-.2.4-.4 0-.3-.2-.4-.4-.4H7.8v.8zM14 7h4v1.8h-2.2v1.3H18v1.8h-2.2V14H14V7z"
        />
      </svg>
    );
  }

  // JWT
  if (norm.includes("jwt") || norm.includes("json web token")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="JWT">
        <circle cx="12" cy="12" r="10" fill="#000000" />
        <path fill="#D63AFF" d="M12 4v8h8a8 8 0 0 0-8-8z" />
        <path fill="#00B9F1" d="M4 12a8 8 0 0 0 8 8v-8H4z" />
        <path fill="#EB5424" d="M12 12h8a8 8 0 0 1-8 8v-8z" />
      </svg>
    );
  }

  // RBAC
  if (norm.includes("rbac") || norm.includes("access control")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="RBAC">
        <rect width="24" height="24" rx="4" fill="#4F46E5" />
        <path
          fill="#FFFFFF"
          d="M12 4l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V7l7-3zm0 5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zm-3 8.5v-.5c0-1.7 2-2.5 3-2.5s3 .8 3 2.5v.5H9z"
        />
      </svg>
    );
  }

  // Worker Threads
  if (norm.includes("worker") || norm.includes("threads")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="Worker Threads">
        <rect width="24" height="24" rx="4" fill="#059669" />
        <path
          fill="#FFFFFF"
          d="M7 6h10v2H7V6zm0 5h10v2H7v-2zm0 5h10v2H7v-2zM4 6.5A1.5 1.5 0 1 1 4 9.5a1.5 1.5 0 0 1 0-3zm0 5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm0 5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z"
        />
      </svg>
    );
  }

  // Multer
  if (norm.includes("multer")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="Multer">
        <rect width="24" height="24" rx="4" fill="#EA580C" />
        <path
          fill="#FFFFFF"
          d="M12 5l5 5h-3v5h-4v-5H7l5-5zm-6 12h12v2H6v-2z"
        />
      </svg>
    );
  }

  // ExcelJS
  if (norm.includes("excel")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="ExcelJS">
        <rect width="24" height="24" rx="4" fill="#107C41" />
        <path
          fill="#FFFFFF"
          d="M14 6h4v12h-4v-2h2V8h-2V6zm-6.2 3.2l2.3 3.4-2.4 3.4h1.7l1.5-2.4 1.5 2.4h1.7l-2.4-3.4 2.3-3.4H13l-1.5 2.4-1.5-2.4H7.8z"
        />
      </svg>
    );
  }

  // MongoDB
  if (norm.includes("mongo")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="MongoDB">
        <path fill="#47A248" d="M12 2C11.5 2.5 7 8 7 13.5c0 3.2 2.3 5.8 5 6.4.2-1 .2-2.1.2-3.1 0-3.3-1.2-6.5-1.2-6.5s2.2 2.7 2.2 6.5c0 .9 0 1.8-.2 2.7 2.7-.6 5-3.2 5-6.4C18 8 13.5 2.5 12 2z" />
        <path fill="#3F9142" d="M12 21.8c-.3.4-.6.8-.8 1.2h1.6c-.2-.4-.5-.8-.8-1.2z" />
      </svg>
    );
  }

  // PostgreSQL
  if (norm.includes("postgres")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="PostgreSQL">
        <path fill="#4169E1" d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm3.8 6.6c.5 0 1 .3 1.2.7l.8 1.8c.2.4.1.9-.2 1.2-.6.7-1.4 1.2-2.3 1.5v3.2c0 .6-.5 1-1 1h-1.5c-.6 0-1-.4-1-1v-2.8c-.8-.1-1.6-.4-2.3-.9l-1 1c-.3.3-.8.3-1.1 0l-.8-.8c-.3-.3-.3-.8 0-1.1l1.1-1.1c-.5-.8-.8-1.8-.8-2.8 0-2.4 1.8-4.4 4.1-4.7 1.6-.2 3.3.4 4.9 1.9z" />
        <circle cx="10" cy="9.5" r="1" fill="#FFFFFF" />
      </svg>
    );
  }

  // Supabase
  if (norm.includes("supabase")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="Supabase">
        <rect width="24" height="24" rx="4" fill="#1C1C1C" />
        <path
          fill="#3ECF8E"
          d="M13.4 3.3a1 1 0 0 0-1.4.3L4.2 14.8a1 1 0 0 0 .8 1.5h6.5l-1.5 5.4a1 1 0 0 0 1.7.9l8.8-11.2a1 1 0 0 0-.8-1.5h-6.5l1.5-5.4a1 1 0 0 0-.8-1.2z"
        />
      </svg>
    );
  }

  // Redis
  if (norm.includes("redis")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="Redis">
        <path fill="#DC382D" d="M3 7.5L12 3l9 4.5-9 4.5L3 7.5zm0 5l9 4.5 9-4.5v2.5L12 19.5 3 15v-2.5zm0 5l9 4.5 9-4.5v2.5L12 24.5 3 20v-2.5z" />
      </svg>
    );
  }

  // Socket.IO
  if (norm.includes("socket")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="Socket.IO">
        <circle cx="12" cy="12" r="10" fill="#010101" />
        <path fill="#FFFFFF" d="M12 5a7 7 0 1 0 7 7 7 7 0 0 0-7-7zm0 12a5 5 0 1 1 5-5 5 5 0 0 1-5 5zm-1-7.5l-2.5 3.5h2.5v2.5l2.5-3.5h-2.5V9.5z" />
      </svg>
    );
  }

  // Razorpay
  if (norm.includes("razorpay")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="Razorpay">
        <rect width="24" height="24" rx="4" fill="#0C2340" />
        <path fill="#0284C7" d="M14.5 3H8l-3 8.5h4.2l-2.4 9.5 10.7-11h-4.8l1.8-7z" />
      </svg>
    );
  }

  // Stripe
  if (norm.includes("stripe")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="Stripe">
        <rect width="24" height="24" rx="4" fill="#635BFF" />
        <path
          fill="#FFFFFF"
          d="M14.3 10.4c0-.7-.6-1.1-1.6-1.1-1 0-2.2.4-3 .9V7.9c.9-.4 2-.6 3.1-.6 2.4 0 3.9 1.2 3.9 3.2 0 2.9-3.9 2.5-3.9 3.7 0 .8.7 1.1 1.7 1.1 1.1 0 2.5-.5 3.2-1v2.4c-1 .5-2.2.7-3.4.7-2.5 0-4.1-1.1-4.1-3.3 0-3.1 4.1-2.6 4.1-3.8V10.4z"
        />
      </svg>
    );
  }

  // Cloudinary
  if (norm.includes("cloudinary")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="Cloudinary">
        <path
          fill="#3448C5"
          d="M19.3 10.5C18.7 7.4 16 5 12.8 5c-3.1 0-5.7 2.2-6.4 5.2C3.9 10.8 2 12.8 2 15.3 2 18.2 4.3 20.5 7.2 20.5h11.6c2.9 0 5.2-2.3 5.2-5.2 0-2.6-1.9-4.7-4.7-4.8z"
        />
      </svg>
    );
  }

  // ImageKit
  if (norm.includes("imagekit")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="ImageKit">
        <rect width="24" height="24" rx="4" fill="#0052CC" />
        <path
          fill="#FFFFFF"
          d="M7 6h10a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2zm0 2v6.5l3.5-3.5 2.5 2.5 3-3L17 12V8H7zm2 2a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
        />
      </svg>
    );
  }

  // Nodemailer
  if (norm.includes("nodemailer")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="Nodemailer">
        <rect width="24" height="24" rx="4" fill="#22C55E" />
        <path
          fill="#FFFFFF"
          d="M4 6h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1zm8 6l6-4H6l6 4zm-6 4h12V9.5l-6 4-6-4V16z"
        />
      </svg>
    );
  }

  // Gemini API
  if (norm.includes("gemini")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="Gemini API">
        <path
          fill="url(#geminiGrad)"
          d="M12 2C12 7.5 7.5 12 2 12c5.5 0 10 4.5 10 10 0-5.5 4.5-10 10-10-5.5 0-10-4.5-10-10z"
        />
        <defs>
          <linearGradient id="geminiGrad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1BA1E3" />
            <stop offset="0.5" stopColor="#5B68F6" />
            <stop offset="1" stopColor="#D96570" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  // RAG
  if (norm.includes("rag")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="RAG">
        <rect width="24" height="24" rx="4" fill="#6366F1" />
        <path
          fill="#FFFFFF"
          d="M12 4a4 4 0 0 1 4 4c0 1.5-.8 2.8-2 3.5V13h-4v-1.5C8.8 10.8 8 9.5 8 8a4 4 0 0 1 4-4zm-1 11h2v2h-2zm-3 3h8v2H8z"
        />
      </svg>
    );
  }

  // Pinecone
  if (norm.includes("pinecone")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="Pinecone">
        <rect width="24" height="24" rx="4" fill="#040404" />
        <circle cx="12" cy="7" r="2.2" fill="#10B981" />
        <circle cx="7.5" cy="12" r="2.2" fill="#06B6D4" />
        <circle cx="16.5" cy="12" r="2.2" fill="#10B981" />
        <circle cx="12" cy="17" r="2.2" fill="#06B6D4" />
      </svg>
    );
  }

  // AWS
  if (norm.includes("aws")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="AWS">
        <rect width="24" height="24" rx="4" fill="#232F3E" />
        <path
          fill="#FF9900"
          d="M18.8 16.5c-2.4 1.7-5.9 2.5-8.9 2.5-4.3 0-8.1-1.5-11-4 .4 2.8 4.2 4.8 8.9 4.8 2.7 0 5.7-.6 8.3-2 .4-.3.7.2.4.5l2.3-1.8z"
        />
        <path
          fill="#FFFFFF"
          d="M7.4 10.6c0 1.5-.8 2.4-2.1 2.4-.7 0-1.3-.4-1.6-.9v3.4H2V8h1.6v.9c.4-.6 1.1-.9 1.8-.9 1.3 0 2 .9 2 2.6zm-1.7 0c0-1-.4-1.5-1.1-1.5-.6 0-1 .4-1.1 1v1c.1.6.5 1 1.1 1 .7 0 1.1-.5 1.1-1.5zm6.8 4.9h-1.6l-1.3-4.5-1.3 4.5H6.8L5.1 8h1.7l1 4.7L9 8h1.5l1.2 4.7 1-4.7h1.7l-1.9 7.5z"
        />
      </svg>
    );
  }

  // Docker
  if (norm.includes("docker")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="Docker">
        <path
          fill="#2496ED"
          d="M13 8h2v2h-2zm-3 0h2v2h-2zm-3 0h2v2H7zm6-3h2v2h-2zm-3 0h2v2h-2zm6 6h2v2h-2zm-3 0h2v2h-2zm-3 0h2v2H7zm-3 0h2v2H4zm17.6 1.7c-.3-.2-1.2-.5-2.2-.3-.5-1.1-1.4-1.7-1.4-1.7s-.4 1.4.2 2.6c-.6.4-1.4.5-2.2.5H2.2c-.4 1.5-.2 4.5 2.3 7 2.5 2.5 6.2 2.7 8.5 2.7 5.7 0 9.8-3.8 10.5-8.5.5 0 1.2-.2 1.6-.6.3-.3.4-.6.4-.6s-.6-.4-1.9-.1z"
        />
      </svg>
    );
  }

  // Linux
  if (norm.includes("linux")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="Linux">
        <path fill="#000000" d="M12 2c-2.8 0-4.2 2.4-4.2 5.5 0 1.4.3 3.3.8 4.7-.5.7-1.6 2.4-1.6 4.3 0 2.7 2.2 4.5 5 4.5s5-1.8 5-4.5c0-1.9-1.1-3.6-1.6-4.3.5-1.4.8-3.3.8-4.7C16.2 4.4 14.8 2 12 2z" />
        <ellipse cx="12" cy="15" rx="3.5" ry="4.5" fill="#FFFFFF" />
        <ellipse cx="10.5" cy="6.5" rx=".7" ry="1.2" fill="#FFFFFF" />
        <ellipse cx="13.5" cy="6.5" rx=".7" ry="1.2" fill="#FFFFFF" />
        <circle cx="10.5" cy="6.5" r=".4" fill="#000000" />
        <circle cx="13.5" cy="6.5" r=".4" fill="#000000" />
        <path fill="#FFA500" d="M10.5 8c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5c0-.4-.7-.8-1.5-.8s-1.5.4-1.5.8z" />
        <path fill="#FFA500" d="M7 20c0 1.1 1.3 2 3 2s2-.9 2-2H7zm10 0c0 1.1-1.3 2-3 2s-2-.9-2-2h5z" />
      </svg>
    );
  }

  // Nginx
  if (norm.includes("nginx")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="Nginx">
        <path fill="#009639" d="M12 2L3 7.2v9.6L12 22l9-5.2V7.2L12 2zm4.8 13.8l-5.6-7.8v7.8H9.4V8.2h1.8l5.6 7.8V8.2h1.8v7.6z" />
      </svg>
    );
  }

  // PM2
  if (norm.includes("pm2")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="PM2">
        <rect width="24" height="24" rx="4" fill="#2B037A" />
        <path fill="#2DE2B3" d="M7 6h5c2.2 0 4 1.8 4 4s-1.8 4-4 4H9.5v4H7V6zm2.5 5.5h2.5c.8 0 1.5-.7 1.5-1.5s-.7-1.5-1.5-1.5H9.5v3z" />
      </svg>
    );
  }

  // Vercel
  if (norm.includes("vercel")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="Vercel">
        <path fill="#000000" d="M12 2L23 21H1L12 2z" />
      </svg>
    );
  }

  // Render
  if (norm.includes("render")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="Render">
        <rect width="10" height="20" x="3" y="2" rx="2" fill="#46E3B7" />
        <rect width="10" height="12" x="11" y="10" rx="2" fill="#141923" />
      </svg>
    );
  }

  // Git
  if (norm === "git") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="Git">
        <path
          fill="#F05032"
          d="M21.7 10.6l-8.3-8.3a2.4 2.4 0 0 0-3.4 0L8.2 4.1l3 3a2.2 2.2 0 0 1 2.7 2.7l2.9 2.9a2.2 2.2 0 0 1 2.9 2.8 2.2 2.2 0 0 1-3.1 3.1 2.2 2.2 0 0 1-2.8-2.9l-2.8-2.8v4.5a2.2 2.2 0 1 1-1.7 0V12a2.2 2.2 0 0 1-1.2-2.9L5.8 7 2.3 10.6a2.4 2.4 0 0 0 0 3.4l8.3 8.3a2.4 2.4 0 0 0 3.4 0l7.7-7.7a2.4 2.4 0 0 0 0-3.4z"
        />
      </svg>
    );
  }

  // GitHub
  if (norm.includes("github")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="GitHub">
        <path
          fill="#181717"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        />
      </svg>
    );
  }

  // Framer Motion
  if (norm.includes("framer")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="Framer Motion">
        <path fill="#0055FF" d="M4 2h16v8h-8zM4 10h8l8 8H4zM4 18h8v6z" />
      </svg>
    );
  }

  // Prisma ORM
  if (norm.includes("prisma")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="Prisma">
        <path
          fill="#2D3748"
          d="M19.9 17.5L13.1 3.2a1.3 1.3 0 0 0-2.3 0L3.9 17.5a1.3 1.3 0 0 0 1.2 1.9h13.6a1.3 1.3 0 0 0 1.2-1.9z"
        />
        <path fill="#16A394" d="M12 5.5l5.5 11.5h-11L12 5.5z" />
      </svg>
    );
  }

  // Python
  if (norm.includes("python")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="Python">
        <path
          fill="#3776AB"
          d="M11.9 2c-3.1 0-2.9 1.3-2.9 1.3v2.8h5.9v.9H6.7S4 6.7 4 9.9s2.4 3 2.4 3h1.4v-2c0-1.5 1.3-1.4 1.3-1.4h5.8c1.4 0 1.3-1.3 1.3-1.3V3.3S16.5 2 11.9 2zm-1.6 1.8a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8z"
        />
        <path
          fill="#FFD438"
          d="M12.1 22c3.1 0 2.9-1.3 2.9-1.3v-2.8H9.1V17h8.2s2.7.3 2.7-2.9-2.4-3-2.4-3h-1.4v2c0 1.5-1.3 1.4-1.3 1.4H9.1c-1.4 0-1.3 1.3-1.3 1.3v4.9s-.3 1.3 4.3 1.3zm1.6-1.8a.9.9 0 1 1 0-1.8.9.9 0 0 1 0 1.8z"
        />
      </svg>
    );
  }

  // Radix UI
  if (norm.includes("radix")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="Radix UI">
        <circle cx="6" cy="12" r="3" fill="#111" />
        <path fill="#111" d="M12 4h6v16h-6z" />
      </svg>
    );
  }

  // Postman
  if (norm.includes("postman")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="Postman">
        <circle cx="12" cy="12" r="10" fill="#FF6C37" />
        <path
          fill="#FFFFFF"
          d="M14.5 7.5a2.5 2.5 0 0 0-2.5 2.5c0 .2 0 .4.1.6L9.6 13a2.5 2.5 0 0 0-2.6 2.3l-2.4 1.3.9 1.6 2.4-1.3a2.5 2.5 0 0 0 3.1-.7l2.8-2.3a2.5 2.5 0 1 0 .7-6.4zm0 3.8a1.3 1.3 0 1 1 0-2.6 1.3 1.3 0 0 1 0 2.6z"
        />
      </svg>
    );
  }

  // Default fallback icon with colorful modern gradient
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label={name}>
      <rect width="24" height="24" rx="4" fill="#3B82F6" />
      <path
        fill="#FFFFFF"
        d="M8 7h8v2H8zm0 4h8v2H8zm0 4h5v2H8z"
      />
    </svg>
  );
}
