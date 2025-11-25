import { useContext } from "react";
import { PageContext } from "../utils/context.js";

const NavItem = ({ itemTitle }) => {
    const { setPage } = useContext(PageContext);

    return (
        <li
            onClick={() => setPage(itemTitle)}
            className="nav-item btn btn-danger mx-1 border-warning"
        >
            {itemTitle}
        </li>
    )
}

export default NavItem;
