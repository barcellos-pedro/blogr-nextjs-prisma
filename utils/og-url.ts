export const ogURL =
  process.env.NODE_ENV === 'production'
    ? 'https://barcellos-pedro-blogr-nextjs-prisma.vercel.app/api/og'
    : 'http://localhost:3000/api/og';
