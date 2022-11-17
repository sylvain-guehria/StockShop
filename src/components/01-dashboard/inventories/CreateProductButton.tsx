'use client';

import { PlusCircleIcon } from '@heroicons/react/20/solid';
import type { FC } from 'react';

import LinkButton from '@/components/04-lib/LinkButton/LinkButton';

const CreateProductButton: FC = () => {
  return (
    <LinkButton onClick={() => null} style="secondary">
      <div className="flex">
        Ajouter un produit
        <PlusCircleIcon className="ml-3 h-6 w-6 shrink-0 text-primary-100" />
      </div>
    </LinkButton>
  );
};

export default CreateProductButton;
