import Link from "next/link";
import { useRouter } from "next/router";

NavLink.defaultProps = {
  exact: true,
  className: "transition-all duration-150 hover:text-white ",
};

function NavLink({ href, children, exact, icon, ...props }) {
  const { pathname } = useRouter();
  const isActive = exact ? pathname === href : pathname.startsWith(href);
  if (isActive) {
    props.className += "rounded-lg bg-[#282828] text-white";
  }
  return (
    <li {...props}>
      <Link href={href} className="flex px-4 items-center h-10">
        <a className="flex px-4 items-center h-10">{children}</a>
      </Link>
    </li>
  );
}

export default NavLink;
