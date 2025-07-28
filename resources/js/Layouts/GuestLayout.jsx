import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import backgroundLogin from '../../../public/img/bg-doodle.jpg'

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center justify-center items-center pt-6 sm:pt-0 bg-gray-100"
        style={{
            background: `url(${backgroundLogin})`,
            backgroundSize: "cover",
            backgroundColor: "#fff",
            position: "absolute",
            width: "100%",
            height: "100vh",
            zIndex: 0
            }}>
            {/* <div>
                <Link href="/">
                    <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                </Link>
            </div> */}

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-slate-300 shadow-md overflow-hidden sm:rounded-lg">
                <b className="flex justify-center mb-3 text-2xl">Elv-FLorist</b>
                {children}
            </div>
        </div>
    );
}
