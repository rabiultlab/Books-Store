

const Hero = () => {
    return (
        <div className="h-[75vh] flex items-center ">
            <div className="w-full lg:w-3/6 flex flex-col items-center lg:items-start justify-center ">
                <h1 className="text-4xl lg:text-6xl font-semibold text-yellow-100 text-center lg:text-left">Discover Your Next Great Ready</h1>
                <p className=" mt-4 text-center text-xl text-zinc-300 text-center lg:text-left">Uncover captivating stories, enriching knowledge, and endless inspiration in our curated collection of books </p>
                <div className="mt-8">
                    <button className="text-yellow-100 text-xl  lg:text-2xl font-semibold border border-y-red-100 px-10 py-3 hover:bg-zinc-800 rounded-full">Discover Books</button>
                </div>
            </div>
            <div className="w-full lg:w-3/6 h-auto lg:h-[100%] flex items-center justify-center">
            <img src="./Hero.png" alt="hero" />
            </div>
        </div>
    )
}

export default Hero