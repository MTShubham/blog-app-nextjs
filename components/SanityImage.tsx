import { ReactElement } from 'react';
import Image from 'next/image';
import { getImageDimensions } from '@sanity/asset-utils';
import { urlFor } from '../lib/sanity';

const SanityImage = ({asset}): ReactElement => {
  const alt = asset?.alt ?? "An image without an alt, whoops";
  return (
    <div>
      {asset && (
        <Image
          src={urlFor(asset).url()}
          alt={alt}
          width={getImageDimensions(asset).width}
          height={getImageDimensions(asset).height}
          placeholder="blur"
          blurDataURL={urlFor(asset).width(24).height(24).blur(10).url()}
          sizes="
            (max-width: 768px) 100vw,
            (max-width: 1200px) 50vw,
            40vw"
        />
      )}
    </div>
  );
};

export default SanityImage;