'use client';

import dynamic from 'next/dynamic';

const BackToTop = dynamic(() => import('./BackToTop').then(mod => ({ default: mod.BackToTop })), {
  ssr: false
});

const SocialMediaButtons = dynamic(() => import('./SocialMediaButtons'), {
  ssr: false
});

export { BackToTop, SocialMediaButtons };
