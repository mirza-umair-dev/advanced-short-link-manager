const Button = ({value}) => {
    return (
        <div>
            <input type="submit"  value={value} className="mt-6 px-3 py-2 hover:bg-accent2h rounded-lg transition-all bg-accent2 outline-0 font-bold  font-sm w-full" />
        </div>
    )
}

export default Button
