import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import backgroundLogin from '../../../public/img/bg-doodle.jpg'

export default function Guest({ children }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen pt-6 bg-gray-100 sm:justify-center sm:pt-0"
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
                    <ApplicationLogo className="w-20 h-20 text-gray-500 fill-current" />
                </Link>
            </div> */}

            <div className="w-full px-6 py-4 mt-6 overflow-hidden shadow-md sm:max-w-md sm:rounded-lg" style={{ backgroundColor: "#f1d9e4", borderRadius: "10px" }}>
                <b className="flex justify-center mb-3 text-2xl">Elv-FLorist</b>
                {children}
            </div>
        </div>
    );
}
