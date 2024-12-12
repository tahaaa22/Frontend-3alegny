import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import {Image} from "@nextui-org/react";

const Navigation= () => {
    return(
    <>
    <Navbar
    className="px-4 py-2 shadow-md fixed top-0 left-0 w-full z-50"
    >
    <NavbarBrand className="flex items-center gap-2">
        <Image width={50} alt="Logo Image" src="/logo.png" />
        <p className="font-bold text-lg text-gray-800">3alegny</p>
    </NavbarBrand>

    <NavbarContent
        className="hidden sm:flex gap-6"
        justify="center"
    >
        <NavbarItem>
        <Link
            href="/"
            className="text-gray-800 font-semibold"
        >
            Home
        </Link>
        </NavbarItem>
        <NavbarItem isActive>
        <Link
            href="/About"
            className="text-gray-800 font-semibold"
            aria-current="page"
        >
            About
        </Link>
        </NavbarItem>
        <NavbarItem>
        <Link
            href="/doctors"
            className="text-gray-800 font-semibold"
        >
            Doctors
        </Link>
        </NavbarItem>
    </NavbarContent>

    <NavbarContent justify="end" className="flex gap-4">
        <NavbarItem className="hidden lg:flex">
        <Link
            href="/login"
            className="text-gray-600 hover:text-gray-800 transition-colors"
        >
            Login
        </Link>
        </NavbarItem>

        <NavbarItem>
        <Button
            as={Link}
            href="/signup"
            color="primary"
            variant="flat"
            className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md"
        >
            Sign Up
        </Button>
        </NavbarItem>
    </NavbarContent>
    </Navbar>
    </>
    );
}

export default Navigation;