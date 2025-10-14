/* eslint-disable react-hooks/exhaustive-deps */

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const CusPagination = ({
  totalPages = 1,
  setCurrentPage,
  currentPage,
}: {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}) => {
  const pathname = usePathname();
  const router = useRouter();

  // remove: const searchParams = useSearchParams();

  const createPageURL = (pageNumber: number | string) => {
    // build URL manually without useSearchParams
    const params = new URLSearchParams();
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const pageLinksToShow = 5;
  const startPage = Math.max(1, currentPage - Math.floor(pageLinksToShow / 2));
  const endPage = Math.min(totalPages, startPage + pageLinksToShow - 1);

  const handlePageChange = (page: number) => {
    if (page === currentPage) return;
    setCurrentPage(page);
  };

  useEffect(() => {
    const newURL = createPageURL(currentPage);
    router.push(newURL);
  }, [currentPage]);

  return (
    <Pagination>
      <PaginationContent className="flex justify-between w-full">
        {/* previous */}
        <div>
          <PaginationItem>
            {currentPage === 1 ? (
              <PaginationPrevious className="border" />
            ) : (
              <PaginationPrevious
                className="border cursor-pointer"
                onClick={() => handlePageChange(currentPage - 1)}
              />
            )}
          </PaginationItem>
        </div>

        {/* number links */}
        <div className="flex gap-1">
          {startPage > 1 && (
            <>
              <PaginationItem>
                <PaginationLink
                  className="cursor-pointer"
                  onClick={() => handlePageChange(1)}
                  isActive={currentPage === 1}
                >
                  1
                </PaginationLink>
              </PaginationItem>
              {startPage > 2 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
            </>
          )}

          {Array.from({ length: endPage - startPage + 1 }).map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                className="cursor-pointer"
                onClick={() => handlePageChange(startPage + index)}
                isActive={currentPage === startPage + index}
              >
                {startPage + index}
              </PaginationLink>
            </PaginationItem>
          ))}

          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationLink
                  className="cursor-pointer"
                  onClick={() => handlePageChange(totalPages)}
                  isActive={currentPage === totalPages}
                >
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            </>
          )}
        </div>

        {/* next */}
        <div>
          <PaginationItem>
            {currentPage === totalPages ? (
              <PaginationNext className="border" />
            ) : (
              <PaginationNext
                className="border cursor-pointer"
                onClick={() => handlePageChange(currentPage + 1)}
              />
            )}
          </PaginationItem>
        </div>
      </PaginationContent>
    </Pagination>
  );
};

export default CusPagination;
