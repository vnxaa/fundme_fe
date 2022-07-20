export default function Campaign(props) {
    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n - 1) + "..." +  str.substr(str.length - n, str.length - 1) : str;
    };
    const urlExplore = '/campaignId/' + props.id;
    return (
        <div className="bg-white dark:bg-gray-800 flex relative z-20 items-center overflow-hidden">
            <div className="container mx-auto px-6 flex relative py-16">
                <div className="sm:w-2/3 lg:w-2/5 flex flex-col justify-evenly relative z-20">
                    <span className="w-20 h-2 bg-gray-800 dark:bg-white mb-12">
                    </span>
                    <h1 className="font-bebas-neue uppercase text-4xl sm:text-6xl font-black flex flex-col leading-none dark:text-white text-gray-800">
                        {props.title}
                        <br/>
                        <span className="text-xl sm:text-3xl">
                            by @{truncate(props.author, 5)}
                        </span>
                    </h1>
                    <br/>
                    <p className="text-sm sm:text-base text-gray-700 dark:text-white">
                        {props.content}
                    </p>
                    <div className="flex mt-8">
                        <a href={urlExplore} className="uppercase py-2 px-4 rounded-lg bg-pink-500 border-2 border-transparent text-white text-md mr-4 hover:bg-pink-400">
                            Explore
                        </a>
                    </div>
                </div>
                <div className="hidden sm:block sm:w-1/2 lg:w-3/4 relative">
                    <img src={props.image} className="max-w-2xl md:max-w-2xl m-auto" />
                </div>
            </div>
        </div>
    )
}