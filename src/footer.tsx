const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-100 text-gray-600 py-6 text-center text-sm">
            © {currentYear} All rights reserved •
            Made by{' '}
            <a
                href="https://www.realsatya.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:text-blue-900 font-medium underline underline-offset-2 hover:underline-offset-4 transition-all"
            >
                Satyanarayan Pattnayak
            </a>
        </footer>
    );
};

export default Footer;