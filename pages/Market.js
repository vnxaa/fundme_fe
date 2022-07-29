
import React from 'react'
import UsePagination from "./components/usePagination";
import useMarketSell from "./state/useMarketSell";

export default function Market() {

  const { marketSell, loading: loadingSell } = useMarketSell();

  return (
    <div>
      <h2 class="text-3xl font-extrabold text-white sm:text-4xl pt-10 flex justify-center">
        <span class="block">
          Let buy your own NFTs.
        </span>
      </h2>
      <div className="max-w-7xl mx-auto px-8 my-6">
        <div className="mt-10">
          {loadingSell ? (
            <div>loading...</div>
          ) : (
            <div>
              <UsePagination obj={'market'} list={marketSell} perpage={6} />
            </div>
          )}
        </div>
      </div>
    </div >
  )
}
