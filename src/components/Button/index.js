import React from "react";

import { Button as PageButton } from './styles'

function Button({children, ...props }) {

    return <PageButton {...props}>{children}</PageButton>
}

export default Button