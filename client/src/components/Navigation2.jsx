import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Image} from "@nextui-org/react";

const Navigation= () => {
    return(
    <>
    <Navbar shouldHideOnScroll isBordered
    className="px-4 py-2 shadow-md fixed top-0 left-0 w-full z-50 h-30"
    >
    <NavbarBrand className="flex items-center gap-2">
        <Image width={50} alt="Logo Image" src="./public/3alegny_logo.jpg" />
        <Link
            href="/"
            className="text-gray-800 font-bold"
        >
            3alegny
        </Link>
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
            href="/about"
            className="text-gray-800 font-semibold"
            aria-current="page"
        >
            About
        </Link>
        </NavbarItem>
        <NavbarItem className="text-black bold transition-colors">
            Contact Us: 19090
        </NavbarItem>
    </NavbarContent>

    <NavbarContent justify="end" className="flex gap-4">
        {/* <NavbarItem className="hidden lg:flex">
        <Link
            href="/MyProfile"
            className="text-gray-600 hover:text-gray-800 transition-colors"
        >
            Profile
        </Link>
        </NavbarItem> */}

        <NavbarItem>
        <Button
            as={Link}
            href="/login"
            color="primary"
            variant="flat"
            className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md"
        >
            signOut
        </Button>
        </NavbarItem>
    </NavbarContent>
    </Navbar>
    </>
    );
}

export default Navigation;