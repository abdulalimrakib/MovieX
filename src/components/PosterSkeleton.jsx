// Placeholder shown in place of a Poster while data is loading.
const PosterSkeleton = () => (
    <div className="w-full animate-pulse" aria-hidden="true">
        <div className="w-full aspect-[1/1.5] rounded-[20px] bg-[#0a2955]" />
        <div className="h-3 md:h-4 mt-4 md:mt-6 mx-1 rounded-sm bg-[#0a2955]" />
        <div className="h-2 md:h-3 w-1/2 mt-3 mx-1 rounded-sm bg-[#0a2955]" />
    </div>
)

export default PosterSkeleton
