
const AnalyticsCard = ({title,count}) => {
    return (
        <div className=" flex flex-col gap-3 p-5 bg-surface border border-bd rounded-2xl">
            <h2 className="text-lightext">{title}</h2>
            <h1 className="text-2xl font-bold">{count?.toFixed(2)}</h1>
        </div>
    )
}

export default AnalyticsCard
