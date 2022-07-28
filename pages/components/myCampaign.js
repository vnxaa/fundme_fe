export default function MyCampaign(props) {
  const urlExplore = "/campaignId/" + props.id;

  return (
    <div class="flex w-full bg-white rounded-lg overflow-hidden">
      {/* <div class="w-1/3 bg-cover bg-landscape">

            </div> */}

      <div
        class="w-4/5 bg-contain bg-no-repeat bg-center"
        style={{ backgroundImage: `url(${props.image})` }}
      />

      <div class="w-2/3 p-4">
        <h1 class="text-gray-900 font-bold text-2xl">{props.title}</h1>

        <div class="flex item-center justify-between mt-3">
          <h1 class="text-gray-700 font-bold text-xl"></h1>

          <button
            type="button"
            className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold  focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
          >
            <a href={urlExplore}>Explore</a>
          </button>
        </div>
      </div>
    </div>
  );
}
