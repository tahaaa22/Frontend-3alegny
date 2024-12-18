import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Image, Input} from "@nextui-org/react";

export const SearchIcon = ({size = 24, strokeWidth = 1.5, width, height, ...props}) => {
    return (
      <svg
        aria-hidden="true"
        fill="none"
        focusable="false"
        height={height || size}
        role="presentation"
        viewBox="0 0 24 24"
        width={width || size}
        {...props}
      >
        <path
          d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
        />
        <path
          d="M22 22L20 20"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
        />
      </svg>
    );
  };

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
        <NavbarItem>
        <Link
            href="/departments"
            className="text-gray-800 font-semibold"
        >
            Departments
        </Link>
        </NavbarItem>
    </NavbarContent>
    <NavbarContent as="div" className="items-center" justify="end">
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[10rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="sm"
          startContent={<SearchIcon size={22} />}
          type="search"
        />
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