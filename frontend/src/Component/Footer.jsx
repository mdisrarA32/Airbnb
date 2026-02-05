import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-100 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-6 py-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Support Column */}
                    <div className="flex flex-col space-y-3">
                        <h4 className="font-semibold text-gray-900 text-sm">Support</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><a href="#" className="hover:underline">Help Centre</a></li>
                            <li><a href="#" className="hover:underline">Safety help</a></li>
                            <li><a href="#" className="hover:underline">Cancellation options</a></li>
                        </ul>
                    </div>

                    {/* Hosting Column */}
                    <div className="flex flex-col space-y-3">
                        <h4 className="font-semibold text-gray-900 text-sm">Hosting</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><a href="#" className="hover:underline">Airbnb your home</a></li>
                            <li><a href="#" className="hover:underline">Community forum</a></li>
                            <li><a href="#" className="hover:underline">Hosting resources</a></li>
                        </ul>
                    </div>

                    {/* Airbnb Column */}
                    <div className="flex flex-col space-y-3">
                        <h4 className="font-semibold text-gray-900 text-sm">Airbnb</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><a href="#" className="hover:underline">Newsroom</a></li>
                            <li><a href="#" className="hover:underline">Careers</a></li>
                            <li><a href="#" className="hover:underline">Investors</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-10 border-t border-gray-200 pt-6 text-center text-sm text-gray-500">
                    <p>&copy; 2026 Airbnb Clone Project by Alam </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
