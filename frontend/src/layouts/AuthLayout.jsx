
import { FaArrowRightLong } from "react-icons/fa6";

const AuthLayout = ({children,message,title,subtitle}) => {
    return (
        <div className="flex items-center justify-center w-screen h-screen ">
            <section className="w-1/2  h-full p-18">
            <h3 className="font-bold text-lg">Link Manager</h3>
            <div className="mt-20">
                <h1 className="text-4xl font-bold ">Every link,<br/>a little shorter.</h1>

                <p className="mt-6 text-lightext">Free to start. Custom back-halves, click analytics, <br/> and team link libraries whenever you need them.</p>
            </div>
            <div className="mt-20">
                <p className="text-lightext">https://docs.internal.company.com/onboarding/week-one/checklist</p>
                <br />
                <div className="flex items-center text-lightext gap-6"> <FaArrowRightLong /> <span className="px-4 py-2 font-bold rounded-full bg-accent text-bg">link.sh/w1chk</span></div>
            </div>
            </section>
            <section className="w-1/2  h-full border-l border-bd  px-40 py-18">
            <h3 className="text-accent">{message}</h3>
            <div >
                <h1 className="text-2xl font-bold mt-4">{title}</h1>
            <p className="text-lightext text-sm mt-4">{subtitle}</p>
            </div>

            {children}

            </section>
        </div>
    )
}

export default AuthLayout
