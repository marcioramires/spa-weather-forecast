import React from "react";

import { H1 } from './styles'

function Title({children, ...props}){

    return <H1 {...props}>{children}</H1>
}

export default Title