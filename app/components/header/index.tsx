"use client";
import { FC, useState } from "react";
import NavigationHamburger from "./icons/navigation-hamburger";
import NavigationClosed from "./icons/navigation-closed";
import GitHubIcon from "./icons/github";
import LinkedInIcon from "./icons/linkedin";
import { environments } from "../../env";

const WideHeader: FC = () => {
    return (
        <ul className={"md:flex hidden"}>
            <li className={"flex items-center mx-4"}>
                <a
                    href={environments.linkedInProfileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <LinkedInIcon />
                </a>
            </li>
            <li className={"flex items-center mx-4"}>
                <a
                    href={environments.githubProfileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <GitHubIcon />
                </a>
            </li>
        </ul>
    );
};

const MobileView = () => {
    const [headerModalIsOpen, setHeaderModalIsOpen] = useState(false);
    return (
        <div className={"flex md:hidden"}>
            <button
                onClick={() => setHeaderModalIsOpen((prev) => !prev)}
                type="button"
            >
                {headerModalIsOpen ? (
                    <NavigationHamburger />
                ) : (
                    <NavigationClosed />
                )}
            </button>
        </div>
    );
};

const Header: FC = () => {
    return (
        <header className={"h-full"}>
            <nav className={"flex items-center justify-end h-full mx-20"}>
                <MobileView />
                <WideHeader />
            </nav>
        </header>
    );
};

export default Header;
