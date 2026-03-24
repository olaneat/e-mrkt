import React from 'react';
import './style.scss';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number; // how many numbers to show on each side
  className?: string;
}

const PaginationComponent: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  className = '',
}) => {
    console.log(totalPages, 'total pages')
  if (totalPages <1) return null;
  const range = (start: number, end: number) => {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const getPaginationItems = () => {
    const totalNumbers = siblingCount * 2 + 3; // first + last + current + siblings
    const totalButtons = totalNumbers + 2; // +2 for ellipsis

    if (totalPages <= totalButtons) {
      return range(1, totalPages);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

    const firstPage = 1;
    const lastPage = totalPages;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      return [...range(1, leftItemCount), 'DOTS', lastPage];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      return [firstPage, 'DOTS', ...range(totalPages - rightItemCount + 1, totalPages)];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      return [
        firstPage,
        'DOTS',
        ...range(leftSiblingIndex, rightSiblingIndex),
        'DOTS',
        lastPage,
      ];
    }

    // Only one page range (very rare)
    return range(1, totalPages);
  };
  const items = getPaginationItems();

  return(
    <div  className="pagination-container">
      <span className={`pagination-btn ${currentPage==1 ? 'disabled ': ''}`}>Prev</span>
      {
        items.map((item, index)=>{
          if(item == 'DOTS'){
            return (
              <span key={`dots-${index}`} className="pagination-ellipsis">....</span>
            )
          }

          const page = item as number;
          return(
            <div
              key={page}
              onClick={() => onPageChange(page)}
              className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </div>
          )
        })

      }
      <div
       className={`pagination-btn${currentPage == totalPages ? 'disabled' : ''}`}
       onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </div>
    </div>
  )
}


export default PaginationComponent