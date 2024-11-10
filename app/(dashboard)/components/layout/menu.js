import MetisMenu from "@metismenu/react";

const Menu = ({children}) => {
    return (
        <>
            <MetisMenu>
                {children}
            </MetisMenu>

        </>
    )
}

export default Menu