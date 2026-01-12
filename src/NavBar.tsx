// Navbar.jsx

const Navbar = () => {
    return (
        <nav className="bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">

                    {/* Logo + Brand */}
                    <div className="flex items-center gap-3">
                        {/* Simple logo - you can replace with your SVG/image */}
                        <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white font-bold text-xl">
                            <img
                                src='invoice-icons-logo.png'
                                alt="Satya's Invoice Generator Logo"
                                className="h-10 w-10 object-contain"
                            />
                        </div>

                        <div className="flex flex-col">
                            <span className="text-xl font-semibold text-gray-800">
                                Satya's Invoice Generator
                            </span>
                            <span className="text-xs text-gray-500 -mt-1">
                                Simple • Fast • Free
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;