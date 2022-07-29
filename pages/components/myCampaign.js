export default function MyCampaign(props) {
  const urlExplore = "/campaignId/" + props.id;

  return (
    <div class="flex w-full h-60 overflow-hidden rounded-lg text-white" style={{ backgroundColor: '#2C2C39', border: '5px solid #454452' }}>
      <div
        class="w-4/5 bg-contain bg-no-repeat bg-center my-4"
        style={{ backgroundImage: `url(${props.image})` }}
      />
      <div class="w-2/3 p-4 flex flex-col justify-between">
        <div>
          <h1 class="font-bold text-2xl">{props.title}</h1>
        </div>
        <div class="flex item-center justify-between mt-3">
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
