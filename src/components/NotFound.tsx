import { NavLink } from "react-router-dom"

const NotFound = () => {

    return (
        <div className="flex items-center flex-col" >
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight dark:text-white">You lost buddy?</h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-md mt-2">This doesn't seem like a valid address. </p>
            <NavLink to="/" className=" underline text-zinc-600 dark:text-zinc-400 text-md mt-2">Home</NavLink>
        </div>
    )
}

export default NotFound