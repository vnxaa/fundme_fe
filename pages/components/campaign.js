export default function Campaign(props) {
  const truncate = (str, n) => {
    return str?.length > n
      ? str.substr(0, n - 1) +
          "..." +
          str.substr(str.length - n, str.length - 1)
      : str;
  };
  const urlExplore = "/campaignId/" + props.id;
  return (
    <div className="bg-slate-90 dark:bg-gray-800 flex relative z-20 items-center overflow-hidden">
      <div className="container mx-auto px-6 flex relative py-16">
        <div className=" sm:block sm:w-1/2 lg:w-3/4 relative">
        <div
            class="h-96 w-58 bg-contain bg-no-repeat bg-left"
            style={{ backgroundImage: `url(${props.image})` }}
          />
        </div>
        <div className="text-left sm:w-2/3 lg:w-2/5 flex flex-col justify-evenly relative z-20">
          <h1 className="text-xl  uppercase sm:text-6xl font-black flex flex-col leading-none text-white">
            {props.title}
            <br />
          </h1>
          <span className=" text-sm sm:text-base text-white">
            by @{truncate(props.author, 5)}
          </span>
          <br />
          <p className="text-sm sm:text-base text-white">
            {props.content.slice(0, 160) + "..."}
          </p>
          <div className="flex mt-8">
            <a
              href={urlExplore}
              className="py-4 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg "
            >
              Explore
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
