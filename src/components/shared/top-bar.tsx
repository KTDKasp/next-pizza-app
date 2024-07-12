import React from 'react';
import { cn } from '@/lib/utils';
import { Container } from './container';
import { Categories } from './categories';
import { SortPopup } from './sort-popup';

interface TopBarProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {

}

export const TopBar: React.FC<TopBarProps> = ({ className, ...props }) => {

  return (
    <div className={cn('sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10', className)} {...props}>
			<Container className='flex items-center justify-between'>
			<Categories />
			<SortPopup />
			</Container>
    </div>
  );
};
