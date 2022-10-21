import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'experimental-edge',
};

export default function () {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          width="256"
          height="256"
          src="https://barcellos-pedro-blogr-nextjs-prisma.vercel.app/images/logo.png"
          style={{
            borderRadius: '100%',
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 600,
    }
  );
}
