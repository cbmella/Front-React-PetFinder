import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();
    const { t } = useTranslation();

    return (
        <footer className="bg-white shadow dark:bg-gray-800 w-full ">
            <div className="mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400 ">
                    © {currentYear}
                    <a target='_blank' href="https://cbm3lla.me" className="hover:underline mx-2 underline">
                        cbm3lla.me
                    </a>
                    {t('footer.AllRightsReserved')}.
                </span>
            </div>
        </footer>
    );
};

export default Footer;