"use client";

import React, { useState } from "react";

interface TechLogoProps {
  name: string;
  className?: string;
  size?: number;
}

function getOfficialIconUrl(norm: string): string | null {
  // Languages & Core
  if (norm.includes("javascript")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg";
  if (norm.includes("typescript")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg";
  if (norm === "html" || norm.includes("html5")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg";
  if (norm === "css" || norm.includes("css3")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg";
  if (norm.includes("scss") || norm.includes("sass")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg";
  if (norm.includes("bootstrap")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg";
  if (norm.includes("tailwind")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg";
  if (norm.includes("react") || norm.includes("context api")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg";
  if (norm.includes("redux")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg";
  if (norm.includes("next")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg";
  if (norm.includes("tanstack") || norm.includes("query")) return "https://cdn.simpleicons.org/reactquery";

  // Backend, APIs & Runtimes
  if (norm.includes("node")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg";
  if (norm.includes("express")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg";
  if (norm.includes("rest api") || norm.includes("rest")) return "https://cdn.simpleicons.org/openapiinitiative/6BA539";
  if (norm.includes("jwt") || norm.includes("json web token")) return "https://cdn.simpleicons.org/jsonwebtokens";
  if (norm.includes("rbac") || norm.includes("access control")) return "https://cdn.simpleicons.org/auth0/EB5424";
  if (norm.includes("worker") || norm.includes("threads")) return "https://cdn.simpleicons.org/webassembly/654FF0";
  if (norm.includes("multer")) return "https://cdn.simpleicons.org/uploadthing/E11D48";
  if (norm.includes("excel")) return "https://cdn.simpleicons.org/microsoftexcel/107C41";

  // Databases
  if (norm.includes("mongo")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg";
  if (norm.includes("postgres")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg";
  if (norm.includes("supabase")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg";
  if (norm.includes("redis")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg";

  // Real-Time & Integrations
  if (norm.includes("socket")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg";
  if (norm.includes("razorpay")) return "https://cdn.simpleicons.org/razorpay/0284C7";
  if (norm.includes("stripe")) return "https://cdn.simpleicons.org/stripe/635BFF";
  if (norm.includes("cloudinary")) return "https://cdn.simpleicons.org/cloudinary/3448C5";
  if (norm.includes("imagekit")) return "https://cdn.simpleicons.org/imagekit/0052CC";
  if (norm.includes("nodemailer")) return "https://cdn.simpleicons.org/mailgun/F05B48";

  // AI, Deployment & Tools
  if (norm.includes("gemini")) return "https://cdn.simpleicons.org/googlegemini/8E75B2";
  if (norm.includes("rag")) return "https://cdn.simpleicons.org/huggingface/FFD21E";
  if (norm.includes("pinecone")) return "https://cdn.simpleicons.org/pinecone/000000";
  if (norm.includes("aws")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg";
  if (norm.includes("docker")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg";
  if (norm.includes("linux")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg";
  if (norm.includes("nginx")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg";
  if (norm.includes("pm2")) return "https://cdn.simpleicons.org/pm2/2B037A";
  if (norm.includes("vercel")) return "https://cdn.simpleicons.org/vercel/000000";
  if (norm.includes("render")) return "https://cdn.simpleicons.org/render/46E3B7";
  if (norm === "git") return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg";
  if (norm.includes("github")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg";
  if (norm.includes("postman")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg";

  // Projects extras
  if (norm.includes("framer")) return "https://cdn.simpleicons.org/framer/0055FF";
  if (norm.includes("prisma")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg";
  if (norm.includes("python")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg";
  if (norm.includes("radix")) return "https://cdn.simpleicons.org/radixui/161618";
  if (norm.includes("stream")) return "https://cdn.simpleicons.org/apachekafka/231F20";

  return null;
}

export function TechLogo({ name, className = "", size = 24 }: TechLogoProps) {
  const [hasError, setHasError] = useState(false);
  const norm = name.trim().toLowerCase();
  const officialUrl = getOfficialIconUrl(norm);

  if (officialUrl && !hasError) {
    return (
      <img
        src={officialUrl}
        alt={name}
        width={size}
        height={size}
        loading="lazy"
        onError={() => setHasError(true)}
        className={`object-contain shrink-0 ${className}`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          minWidth: `${size}px`,
          minHeight: `${size}px`,
        }}
      />
    );
  }

  // Fallback inline SVGs
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

  // Default fallback badge
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label={name}>
      <rect width="24" height="24" rx="4" fill="#3B82F6" />
      <path fill="#FFFFFF" d="M8 7h8v2H8zm0 4h8v2H8zm0 4h5v2H8z" />
    </svg>
  );
}
